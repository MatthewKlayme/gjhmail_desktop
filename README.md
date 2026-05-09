# GJH Mail — Desktop App

Electron + React frontend for the Elite Title Settlement Service. Lets users authenticate via Google or Microsoft, attach deed documents, and send them to a configured recipient.

---

## Running in Development

Run these alongside the backend server. See the server `README.md` for the full four-terminal setup.

### Vite Dev Server

```
npm run dev
```

Starts the renderer on `http://localhost:5173`.

### Electron

```
npm run dev:electron
```

Builds the Electron main process and opens the app window pointed at the Vite dev server.

---

## Environment Variables

Create a `.env.local` file (gitignored, overrides `.env`) to point at your local backend instead of production:

```
VITE_API_BASE_URL=http://localhost:8080
```

Without this, API calls go to the production Cloud Run instance.

---

## Building for Distribution

```
npm run dist
```

Produces a Windows NSIS installer in `dist/`. Auto-update is configured via GitHub Releases (`MatthewKlayme/gjhmail_desktop`).
