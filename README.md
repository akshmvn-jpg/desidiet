# DesiDiet

A polished web app showcasing a broad Indian food macro database with search, category/diet filters, sorting, and a live macro plate calculator.

## Features

- 70+ Indian foods across breakfast, mains, snacks, breads, dairy, desserts, beverages, fruits, and healthy options.
- Search by food name or category.
- Filter by category and diet preference.
- Sort by name, protein, or calories.
- Add foods to a personal plate and see instant macro totals.

## Run locally

### Option A (fastest)
Just open `index.html` in your browser. The app now loads food data from a local JS file and works without a server.

### Option B (recommended)
Use a local HTTP server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy (upload)

Because this is a static app, upload all files in this repo (`index.html`, `styles.css`, `app.js`, `data/`) to any static host:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
