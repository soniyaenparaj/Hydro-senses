# AquaPulse IoT — water monitoring

A responsive, installable PWA prototype for monitoring water at multiple locations. It includes an overview dashboard, turbidity, temperature and water-level readings, simulated sensor connection status, illustrative analytics, incident register, a multi-location sensor view placeholder, reports/audit view, theme preferences, and a local CSV download.

## Run locally

This is a static site; no package installation or build step is required.

1. Open the project directory in a terminal.
2. Start any static web server, for example `python3 -m http.server 8000`.
3. Visit `http://localhost:8000`.

Opening `index.html` directly also renders the app, but PWA installation and offline caching require HTTP(S).

## Deploy to GitHub Pages

1. Create or open the GitHub repository that will host the site.
2. Put `index.html`, `styles.css`, `site.css`, `app.js`, `manifest.json`, `service-worker.js`, and `icon.svg` at the published site root (this directory is ready to commit as a static site).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select the branch containing the files and `/ (root)` (or the folder where the files live), then save.
5. Open the published Pages URL. HTTPS is enabled by GitHub Pages; use the browser’s install option to add the PWA where supported.

For a project site published from a subdirectory, the relative links and service-worker scope are configured to work at that subpath. If you later change the asset paths, update `FILES` in `service-worker.js` too.

## What this prototype does and does not do

All displayed sensor readings, trends, sensor details, incidents, analytics, user identity, and activity events are simulated sample data. The location selector is a front-end illustration; it does not connect to multiple real sites. The app has no server, database, secrets, or live sensor connection. Theme preference is stored in local browser storage; incident acknowledgements only change the current page state; CSV export downloads a small bundled sample dataset.

GitHub Pages serves static files only. It cannot host the required private API, database, MQTT broker, scheduled jobs, or device command service. A production system should add a secured backend/API and persistent database, a gateway for the water sensors (MQTT/WebSockets), authentication and access controls, audit storage, and notification delivery before exposing real telemetry. Keep sensor credentials and signing secrets on the server. Integrations not implemented here include OAuth2/JWT sign-in, biometric authentication, real-time sensor telemetry, ML/anomaly forecasting, SMS/email/push, PDF reports, live location mapping, and equipment controls. No control actions are present in this prototype.

## Structure

- `index.html` — application screens and layout
- `styles.css`, `site.css` — responsive light and dark dashboard themes and location illustrations
- `app.js` — navigation, local theme preference, sample interactions and CSV export
- `manifest.json`, `service-worker.js`, `icon.svg` — PWA metadata, offline shell and icon
