const githubAuthUrl = "https://github.com/login/oauth/authorize";
const githubTokenUrl = "https://github.com/login/oauth/access_token";

const decodeState = (value) => {
  try {
    return JSON.parse(atob(value));
  } catch {
    return null;
  }
};

const encodeState = (data) => btoa(JSON.stringify(data));

const normalizeOrigin = (candidate) => {
  if (!candidate) {
    return null;
  }

  const hasProtocol = /^https?:\/\//i.test(candidate);
  const value = hasProtocol ? candidate : `https://${candidate}`;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const resolveOrigin = (searchParams) => {
  const explicitOrigin = normalizeOrigin(searchParams.get("origin"));
  if (explicitOrigin) {
    return explicitOrigin;
  }

  return normalizeOrigin(searchParams.get("site_id"));
};

const isAllowedOrigin = (origin, allowList) => {
  if (!origin) {
    return false;
  }

  const allowedOrigins = allowList
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  return allowedOrigins.includes(origin);
};

const authResponse = (message, status = 400) => {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

const callbackHtml = (origin, payload) => {
  const encodedPayload = JSON.stringify(payload).replace(/</g, "\\u003c");

  return `<!doctype html>
<html>
  <body>
    <script>
      (function () {
        const payload = ${encodedPayload};
        const message = "authorization:github:success:" + JSON.stringify(payload);
        window.opener.postMessage(message, "${origin}");
        window.close();
      })();
    </script>
  </body>
</html>`;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/auth") {
      const provider = url.searchParams.get("provider") ?? "github";
      const origin = resolveOrigin(url.searchParams);

      if (provider !== "github") {
        return authResponse("Unsupported OAuth provider.");
      }

      if (!origin || !isAllowedOrigin(origin, env.ALLOWED_ORIGINS)) {
        return authResponse("Origin is missing or not allowed.");
      }

      if (!env.GITHUB_CLIENT_ID) {
        return authResponse("Missing GITHUB_CLIENT_ID secret.", 500);
      }

      const state = encodeState({
        origin,
        provider,
        nonce: crypto.randomUUID(),
        createdAt: Date.now(),
      });

      const redirectUrl = new URL(githubAuthUrl);
      redirectUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      redirectUrl.searchParams.set("redirect_uri", `${url.origin}/callback`);
      redirectUrl.searchParams.set("scope", "repo");
      redirectUrl.searchParams.set("state", state);

      return Response.redirect(redirectUrl.toString(), 302);
    }

    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      const stateRaw = url.searchParams.get("state");
      const parsedState = stateRaw ? decodeState(stateRaw) : null;

      if (!code || !parsedState?.origin || !isAllowedOrigin(parsedState.origin, env.ALLOWED_ORIGINS)) {
        return authResponse("Invalid callback payload.");
      }

      if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
        return authResponse("Missing GitHub OAuth worker secrets.", 500);
      }

      const tokenResponse = await fetch(githubTokenUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      if (!tokenResponse.ok) {
        const details = await tokenResponse.text();
        return authResponse(`GitHub token exchange failed: ${details}`, 502);
      }

      const tokenData = await tokenResponse.json();
      if (!tokenData.access_token) {
        return authResponse("No access token returned by GitHub.", 502);
      }

      return new Response(
        callbackHtml(parsedState.origin, {
          token: tokenData.access_token,
          provider: "github",
        }),
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    if (url.pathname === "/") {
      return new Response("Decap OAuth worker is running.", { status: 200 });
    }

    return authResponse("Not found.", 404);
  },
};
