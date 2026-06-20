# Iterate — PM Growth Platform

A Next.js app for the Iterate PM growth platform: AI coaching, a visual "PM Brain" skill map, and a kanban-style growth tracker.

This is currently a ported prototype — the UI/UX is fully built out, but auth, the AI coach, and data persistence are mocked (no backend yet).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `app/page.js` — mounts the app shell and loads `public/iterate-app.js`, which drives all screen routing/interactivity
- `app/app-markup.js` — the screen markup (landing, onboarding, org setup, PM Brain map, dashboard, tracker)
- `app/globals.css` — design tokens and styles
- `public/iterate-app.js` — client-side app logic (routing, state, canvas map, kanban, mock AI coach)

## Deploying

Connected to Vercel for continuous deployment — push to `main` to deploy.
