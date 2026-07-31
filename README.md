# Torren landing page

The standalone public website for Torren, built with React, TypeScript, Vite,
Tailwind CSS, and Lucide React. The current design is a compact light-mode page
with four parts: hero, animated dark product story, latest release with FAQ,
and footer.

## Development

```powershell
npm install
npm run dev
```

## Checks and production build

```powershell
npm run lint
npm run build
npm run preview
```

## Publishing a Torren release

The public release manifest lives at [`public/latest.json`](public/latest.json).
It is the website's single source of truth for the current version, release
date, supported Windows versions, architecture, installer size, download URL,
SHA-256 checksum, and release notes. The React application fetches it once when
the page loads; every download control and the release card use that response.

To publish a future release:

1. Build and locally verify the new Windows installer in the private desktop-app
   repository.
2. Upload the installer to the public download location. Uploading is a separate
   release operation and is not performed by this website build.
3. Calculate the installer's SHA-256 checksum and record its public size.
4. Update every field in `public/latest.json`, including `downloadUrl`, to point
   to the uploaded installer.
5. Run `npm run lint` and `npm run build`, then deploy the landing page.

Changing the installer URL requires editing only `downloadUrl` in
`public/latest.json`. Publishing a new version should never require a React code
change. Keep the manifest valid JSON, use the human-readable release date and
download size shown in the release card, and never place storage credentials or
private application source in this public repository.
