# Ashok Kumar — Java Backend Developer Portfolio
https://ashok-kumar-portfolio-jo51nn7on-aky3003s-projects.vercel.app/

A production-ready React portfolio with:
- **Framer Motion** scroll-triggered animations
- **ReactFlow** interactive architecture diagram
- **Tailwind CSS** utility-first styling
- **Sora + JetBrains Mono** typography pairing
- Dark terminal aesthetic with Java-orange accent

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Deploy to Vercel (Recommended — Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (follow prompts — framework: Vite)
vercel

# Production deploy
vercel --prod
```

Or connect your GitHub repo at **vercel.com/new** — auto-deploys on every push.

---

## Deploy to GitHub Pages

```bash
# 1. Add to package.json scripts:
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d dist"

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Add to vite.config.js:
#    base: '/your-repo-name/'

# 4. Deploy
npm run deploy
```

---

## Customise

| File | What to change |
|------|---------------|
| `src/App.jsx` | All content: bio, skills, experience, projects |
| `src/index.css` | Global styles and scrollbar |
| `tailwind.config.js` | Fonts, colors, theme |
| `index.html` | Page title, meta description, OG tags |

To change accent color: search `orange` in `App.jsx` and `index.css` and replace with your preferred Tailwind color.

---

## Project Structure

```
portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json          ← SPA routing for Vercel
└── src/
    ├── main.jsx
    ├── index.css
    └── App.jsx          ← All components in one file
```

---

Built with React 18 · Vite 5 · Tailwind 3 · Framer Motion 11 · ReactFlow 11
