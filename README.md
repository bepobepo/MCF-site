# Mooncow Fest 2026 website

A single-file static site for Mooncow Fest 2026 (5–7 June, South Downs).

## Files
- `index.html` — the entire site (HTML + CSS, no build step)

## Quick deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `mooncow-fest`).
2. Upload `index.html` to the repo (drag-and-drop in the browser works fine).
3. Repo → Settings → Pages → Source: `Deploy from a branch`, Branch: `main` / `/root`. Save.
4. After ~1 minute your site will be live at `https://<username>.github.io/<repo-name>/`.
5. To use your own domain: Settings → Pages → Custom domain, then add a `CNAME` record at your DNS provider pointing to `<username>.github.io`.

## Adding a friend as a collaborator

Repo → Settings → Collaborators → Add people. They'll get an invite email. Once accepted, they can edit too.

## Edits without Git
Edit `index.html` directly on github.com — click the pencil icon, make your changes, scroll down, hit "Commit changes". The site auto-redeploys in a minute or two.

## Adding the poster

Save the Mooncow Fest poster as `photos/poster.jpg` (or `.png`) and it will appear in the hero. Until you do, the hero shows a placeholder.

## Adding photos later

If you want a photo gallery, drop more images into the `photos/` folder (use `.jpg` or `.png` — convert HEICs first) and ask Claude to add a gallery section that pulls from that folder.
