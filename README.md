# carloleonardi.co.uk

Personal academic website of **Carlo Leonardi**, postdoctoral researcher at the Wellcome Sanger Institute, working on machine learning for single-cell and spatial genomics, the tumour microenvironment and tumour immunology.

🌐 **Live:** https://carloleonardi.co.uk

## Contents

- **About**: background and current research
- **Interests**: main research areas
- **Ambitions**: what I aim to build across academia and industry
- **Papers**: selected publications with links to the papers and preprints
- **Collaborate**: how to get in touch and work together
- **Resume**: short academic CV

## Editing the content

Almost all text on the site lives in a single file:

```
data/portfolio.json
```

Edit it directly on GitHub and commit to `main`. Netlify rebuilds and publishes the site automatically within a minute or two. Images go in `public/images` and are referenced as `/images/filename.png`.

## Running locally

```bash
yarn
yarn dev
```

Then open http://localhost:3000.

## Tech stack

- [Next.js](https://nextjs.org/) 14
- [Tailwind CSS](https://tailwindcss.com/)
- Hosted on [Netlify](https://www.netlify.com/), with continuous deployment from this repository
- Domain registered with names.co.uk

## Credits

Based on the open-source [react-portfolio-template](https://github.com/chetanverma16/react-portfolio-template) by [Chetan Verma](https://www.chetanverma.com/), adapted and updated for an academic profile.
