# Diether Besa Portfolio

A React and Tailwind CSS portfolio based on the Meridian design direction, with content drawn from Diether's resume.

## Run locally

```sh
npm install
npm run dev
```

Create a production build and run the checks:

```sh
npm run build
npm test
```

## Edit the content

Edit contact details, projects, experience, skills, education, and certification in `src/data.js`. The introductory and about-section copy is in `src/App.jsx`. Project artwork is deliberately presented as a placeholder until real project images are available.

To replace a project's placeholder, place an image in `public/projects/` and set that project's `image` in `src/data.js` to its public path, for example:

```js
image: '/projects/hr-management.webp',
```

No image component changes are needed. Use images you have permission to share; no project URLs or performance claims have been invented.

The contact form opens the visitor's mail app with a prepared message. It does not send email directly and has no backend.

Skill logos are mapped in `src/data.js` and served locally from `public/skills/`. Source credits and licenses are stored alongside the images. The current skill list includes only technologies with logos.

Section headings and content cards fade and slide into view once while scrolling. The effect respects reduced-motion preferences, keeps content visible if animation APIs are unavailable, and also applies to expanded projects. Its behavior is in `src/scrollReveal.js`.

Use the palette button at the bottom-left to switch between seven light palettes, seven dark palettes, and Neon. The selection is remembered in this browser. Palette definitions are in `src/themes.js`; if browser storage is blocked, switching still works for the current visit.

The resume download serves the original PDF at `public/Diether-Besa-Resume.pdf`. It includes the phone number, email address, and other contact details from the source resume.

Design and implementation notes are in `docs/superpowers/`.
