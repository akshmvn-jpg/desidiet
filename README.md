# DesiDiet

A polished web app showcasing a broad Indian food macro database with search, category/diet filters, sorting, and a live macro plate calculator.

## Features

- 132 Indian foods across breakfast, mains, snacks, breads, dairy, desserts, beverages, fruits, and healthy options.
- Search by food name or category.
- Filter by category and diet preference.
- Sort by name, protein, or calories.
- Add foods to a personal plate and see instant macro totals.

## Run locally

### Option A (fastest)
Open `index.html` in your browser.

### Option B (recommended)
Use a local HTTP server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages (fix for "README page showing")

If you see a plain page like `desidiet | indian diet`, GitHub Pages is serving your `README.md` instead of the app.

Do this exactly:

1. Push this branch to GitHub.
2. Go to **Repo → Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Set **Branch** to `main` (or your default branch) and **Folder** to `/ (root)`.
5. Save and wait 1–2 minutes.
6. Open: `https://<your-username>.github.io/desidiet/`.

### Important checks

- `index.html` must be at repository root.
- `styles.css`, `app.js`, and `data/` must also be committed and pushed.
- Hard refresh browser (`Ctrl+Shift+R`) after deployment.

## Other static hosts

You can also deploy by uploading all files (`index.html`, `styles.css`, `app.js`, `data/`) to:

- Netlify
- Vercel
- Cloudflare Pages
