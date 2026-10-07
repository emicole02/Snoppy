# Base44 Dev Environment

## Project Overview
This is a minimal static HTML project — a single `Index.html` file (note the capital "I") serving a "ColLab" landing page. No build system, no dependencies, no backend.

## Running the App
```
docker compose -f docker-compose.base44.yml up -d
```
- Served by nginx:alpine on host port 3000.
- The repo is bind-mounted read-only at `/usr/share/nginx/html`.
- nginx is configured to use `Index.html` (capital I) as the directory index.
- nginx runs as root so it can read the bind-mounted source regardless of host directory permissions.

## Editing
Edit `Index.html` directly — changes appear on browser refresh. There is no live-reload/HMR; call `reload_preview` after edits if needed.

## Verification
- `curl http://localhost:3000/` should return the HTML with `<title>ColLab</title>`.
- Healthcheck uses `127.0.0.1` (not `localhost`) because nginx listens on IPv4 only and `localhost` resolves to IPv6 `::1` inside the container.

## No Secrets Required
This project has no external service dependencies.
