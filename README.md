# Anniversary Greeting App

Mobile-first romantic interactive web app with:
- Passcode gate
- Swipe story chapters
- Memory timeline
- 5-question mini quiz
- Surprise gift + envelope + video

## Stack

- Vite + React + TypeScript
- Framer Motion
- Swiper.js
- Decap CMS (`/admin`)
- GitHub Pages deployment via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Optional passcode override:

```bash
VITE_PASSCODE=1206 npm run dev
```

Default passcode is `1206`.

## Content editing

Primary editable file:
- `src/content/content.json`

Uploaded assets:
- `public/uploads`

The app includes a safe loader (`src/content/loadContent.ts`) that falls back to defaults if content fields are missing.

## Decap CMS setup

1. Update `public/admin/config.yml`:
- `repo: <your-github-username>/<your-repo-name>`
- `base_url: https://<your-worker-domain>.workers.dev`

2. Deploy OAuth worker from `oauth-worker/` (see `oauth-worker/README.md`).

3. Open admin:
- `https://<your-username>.github.io/<repo-name>/admin/`

## GitHub Pages deployment

Workflow file:
- `.github/workflows/deploy.yml`

Steps:
1. Push to `main`.
2. In GitHub repo settings, enable Pages with source: GitHub Actions.
3. Wait for workflow completion and open:
   `https://<your-username>.github.io/<repo-name>/`

## Notes

- Replace placeholder image `/public/uploads/placeholder-love.svg` with your own photos.
- Upload your MP4 video under `/public/uploads` and set `surprise.videoUrl` in `content.json`.
