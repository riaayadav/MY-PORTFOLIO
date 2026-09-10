# Riya Kumari — personal portfolio

A responsive, single-page portfolio made with semantic HTML, CSS, and vanilla JavaScript. Vite supplies development and production builds. The supplied resume is the source for education, contact details, skills, and projects; no project URLs, employment history, or performance metrics have been invented.

## Run

Install with `pnpm install`, then use `pnpm dev`. Build with `pnpm build`; `pnpm start` previews the build. The deployment output is `dist/`.

## Edit

- `index.html`: content, links, and all seven portfolio sections.
- `style.css`, `tech.css`, and `reference-layout.css`: charcoal-and-purple theme, floating numbered navigation, textured monochrome portrait, responsive layouts, and reduced-motion support.
- `script.js`: scroll reveals, navigation, cursor states, 3D tilt, project expansion, and clipboard feedback.
- `public/assets/`: original portrait and downloadable resume.

LinkedIn, email, phone, and resume links are live. Contact buttons open the visitor's email app; there is no server-side contact form. Project diagrams illustrate the workflow and are not screenshots or measured results. Project details are available through native disclosure controls, with keyboard-operable preview cards as an enhancement. Touch users retain native pointers and all content remains accessible when motion is reduced or JavaScript is unavailable.

The starter's component dependencies remain available for future development; the portfolio itself uses no client framework.

## Portrait

The minimal hero displays the original full square photo with a monochrome, dotted visual treatment. There is no robotic transformation, dragging, or rotation. The layout is inspired by the user-provided reference at https://legend-akshat.vercel.app/ and retains Riya's own content and assets.
