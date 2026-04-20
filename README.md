# Portfolio Website (React + Vite)

A modern single-page portfolio built with React and Vite, including two switchable visual themes:

- Cyber Mode: layered gradients, neon accents, and a more expressive visual style
- Violet Mode: darker, cleaner, and simpler purple-forward style

## What is Included

- Sticky top navigation with section links
- Hero and intro section
- About section with focus areas
- Experience section
- Education section
- Project highlights with optional screenshots, tags, and links
- Workflow section
- Contact and social links
- Theme toggle in the top bar
- Header-aware anchor scrolling offset for section links
- Theme preference saved in localStorage
- Responsive layout for desktop and mobile

## Getting Started

Install dependencies:

npm install

Start development server:

npm run dev

Build for production:

npm run build

Lint code:

npm run lint

## Where to Edit Content

Primary content is in:

- src/data/portfolioData.js

Update the following there:

- profile details (name, role, location, email)
- about text
- project cards (including optional image objects)
- work experience entries
- education entries
- workflow steps
- social links

## Project Images and Scaling

- Each project can include an optional image object:

	image: {
		src: '/project-image.svg',
		alt: 'Accessible image description'
	}

- The home page displays up to 5 featured projects.
- Add as many projects as needed to the data model; you can move the remainder to a dedicated all-projects page later.

## Where to Edit Layout and Styling

- src/App.jsx for structure and section composition
- src/App.css for full visual system and both themes
- src/index.css for global resets and base styles

## Theme Toggle Behavior

The toggle is in the top bar and switches between:

- cyber
- violet

Selected theme is stored using localStorage key:

portfolio-theme

## Next Iteration Ideas

- Add real project screenshots and case study pages
- Add resume download and metadata for SEO/social sharing
- Add animations with intersection observers per section
- Replace placeholder links with production URLs
