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

The production release manifest is the public `latest.json` object in
DigitalOcean Spaces:

```text
https://torren-app-downloads.sfo3.cdn.digitaloceanspaces.com/latest.json
```

That object is the production website's single source of truth for the current
version, release date, supported Windows versions, architecture, installer size,
download URL, SHA-256 checksum, and release notes. The React application starts
one manifest-loading operation when the page loads; it does not poll or refetch.
Every download control and the release card use the validated response.

The Space/CDN must allow cross-origin `GET` requests from the public website
origin. Without an `Access-Control-Allow-Origin` response header, browsers cannot
read the public JSON and production will remain on its generic fallback state.

[`public/latest.json`](public/latest.json) remains a documented example and a
local-development fallback. A development session attempts the remote manifest
once and reads this local copy only when the remote request or validation fails.
Production never falls back to the bundled example; it retains the existing
generic UI fallback values when the remote manifest is unavailable or malformed.

To publish a future release:

1. Build and locally verify the new Windows installer in the private desktop-app
   repository.
2. Upload the installer to the Torren DigitalOcean Space. Uploading is a separate
   release operation and is not performed by this website build.
3. Calculate the installer's SHA-256 checksum and record its public size.
4. Update the public `latest.json` object in DigitalOcean Spaces, including its
   `downloadUrl`, to describe the uploaded installer.
5. Update `public/latest.json` to keep the development example aligned with the
   published object.
6. Run `npm run lint` and `npm run build` when the website source itself changes.

Changing the production installer URL requires editing only `downloadUrl` in the
DigitalOcean `latest.json` object. Publishing a new version does not require a
React code change or website redeploy. Keep the manifest valid JSON, use the
human-readable release date and download size shown in the release card, and
never place Spaces credentials or private application source in this public
repository.
