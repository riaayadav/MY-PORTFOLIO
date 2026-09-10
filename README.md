# Riya Kumari — personal portfolio

A responsive, single-page portfolio made with semantic HTML, CSS, and vanilla JavaScript. Vite supplies development and production builds. The supplied resume is the source for education, contact details, skills, and projects; no project URLs, employment history, or performance metrics have been invented.

## Run

Install with `pnpm install`, then use `pnpm dev`. Build with `pnpm build`; `pnpm start` previews the build. The deployment output is `dist/`.

## Edit

- `index.html`: content, links, and all seven portfolio sections.
- `style.css` and `tech.css`: charcoal, cyan and electric-blue theme, responsive layouts, keyframes, and reduced-motion support.
- `portrait.js`: hover reveal, touch/keyboard toggle, and safe fallback if the futuristic image fails to load.
- `script.js`: scroll reveals, navigation, cursor states, 3D tilt, project expansion, and clipboard feedback.
- `public/assets/`: original portrait, futuristic visor-and-shirt portrait, and downloadable resume.

LinkedIn, email, phone, and resume links are live. Contact buttons open the visitor's email app; there is no server-side contact form. Project diagrams illustrate the workflow and are not screenshots or measured results. Project details are available through native disclosure controls, with keyboard-operable preview cards as an enhancement. Touch users retain native pointers and all content remains accessible when motion is reduced or JavaScript is unavailable.

The starter's component dependencies remain available for future development; the portfolio itself uses no client framework.

## Portrait effect

The hero contains only the name, one introductory line, and the portrait interaction. Hover over the portrait to reveal the reflective visor and silver-and-charcoal shirt; moving away restores the original. On touch screens, tap to toggle. Keyboard users can focus the photo and press Enter or Space; Escape restores the original. Reduced-motion mode removes the scan animation. The complete square photo is displayed without cropping or spinning.

The edited portrait was made using built-in Image Generation. The final edit prompt requested: “Change the entire pink shirt to charcoal-black futuristic fabric with prominent brushed silver shoulder and collar panels like the reference video; preserve the natural face, mirrored visor, gray background, composition, and identity. No segmented robotic face or pink shirt fabric.” Asset: `public/assets/riya-futuristic.png`.
