# Decap OAuth Worker (Cloudflare)

This worker provides `/auth` and `/callback` for Decap CMS GitHub login when the app is hosted on GitHub Pages.

## 1) Create GitHub OAuth App

Set in GitHub:
- Homepage URL: `https://<your-username>.github.io/<repo-name>/`
- Authorization callback URL: `https://<your-worker-subdomain>.workers.dev/callback`

## 2) Configure worker

```bash
cd oauth-worker
npm init -y
npm install -D wrangler
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET
```

Edit `wrangler.toml`:
- `ALLOWED_ORIGINS` should include your GitHub Pages admin origin, e.g. `https://your-username.github.io`.

## 3) Deploy worker

```bash
npx wrangler deploy
```

Use the deployed URL in `/public/admin/config.yml`:
- `base_url: https://<your-worker-subdomain>.workers.dev`
- `auth_endpoint: /auth`

## 4) Final Decap config values

In `/public/admin/config.yml` set:
- `repo: your-github-username/your-repo-name`
- `base_url` to your worker URL.

Then open `https://<your-username>.github.io/<repo-name>/admin/` and sign in.
