# Diether Besa portfolio

Build a local React and Tailwind portfolio in the supplied empty workspace, based on the user's Meridian reference and resume. The user supplied the visual direction, stack, content source, and image-placeholder requirement; routine design choices are implementation decisions.

## Approach
Use a Vite single-page React app: fixed desktop sidebar, compact mobile navigation, warm off-white surfaces, violet accents, rounded cards, restrained motion, and a monogram in place of an unprovided portrait. A server framework or hosted site service adds no needed behavior to this source-code project.

## Content and behavior
Sections: Home, About, Skills, Experience, Projects, Education, Contact. Only resume-supported professional claims; Ayahtek dates remain Oct 2024–Oct 2026. No invented testimonials, GitHub, live project URLs, or availability claims. Use all seven real projects with four initially featured and an accessible expansion control. Images stay intentional placeholders until configured in one data file. Contact links and a validated form open an email draft; never claim to send a message. Include the supplied PDF as a downloadable resume.

## Constraints and quality
ReactJS and Tailwind CSS, no backend or unnecessary dependencies. Responsive at 375px and desktop sizes, keyboard navigation, visible focus, labels, reduced-motion support, and no horizontal overflow. Keep local source editable and document image replacement. Scope includes app source, styling, package/build configuration, resume asset, contact helper tests, and README. No existing callers or fixtures exist.

## Verification
Test mailto encoding using Node's built-in test runner, build for production, inspect the rendered page, exercise navigation and project expansion, and independently review accessibility and content. Publishing is outside this local source implementation.
