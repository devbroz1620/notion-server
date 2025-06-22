NOTION SERVER - QUICK DOCS (v3)
===============================

This server exposes your Notion content as a category-based API for your website frontend, including Money Basics, ETFs, Debts, and Mind Over Money.

---

FOLDER STRUCTURE
----------------
src/
  app/api/money-basics/route.ts                # GET: List all article categories
  app/api/money-basics/category/[cat]/route.ts # GET: Articles for a specific category
  app/api/money-basics/posts/[id]/route.ts     # GET: Markdown content for a single Money Basics article
  app/api/etfs/route.ts                        # GET: List all published ETFs
  app/api/etfs/[id]/route.ts                   # GET: Markdown content for a single ETF
  app/api/debts/route.ts                       # GET: List all published Debts
  app/api/debts/[id]/route.ts                  # GET: Markdown content for a single Debt
  app/api/mind-over-money/route.ts             # GET: List all published Mind Over Money articles
  app/api/mind-over-money/[id]/route.ts        # GET: Markdown content for a single Mind Over Money article
  app/money-basics/[id]/page.tsx                # Markdown preview page (uses API or sample)
  components/markdown-components.tsx             # Custom React components for markdown
  components/ui/table.tsx, badge.tsx             # UI components (shadcn/ui)
  lib/utils.ts                                  # Utility (cn function)
  app/globals.css                               # Tailwind/global styles
  app/layout.js                                 # Imports globals.css

tailwind.config.js                              # Tailwind config
postcss.config.mjs                              # PostCSS config

---

API ENDPOINTS
-------------

### Money Basics
1. List Categories:
   GET /api/money-basics
   - Returns: { "categories": ["Budgeting_and_Money_Management", ...] }

2. List Articles by Category:
   GET /api/money-basics/category/[categoryName]
   - [categoryName] uses underscores instead of spaces (e.g., "Budgeting_and_Money_Management").
   - Returns: [{ id, title, category, readingTime, slug, published }, ...]

3. Article Markdown Content:
   GET /api/money-basics/posts/[id]
   - Returns: { "id": "...", "title": "...", "content": "markdown string..." }

### ETFs
1. List all ETFs:
   GET /api/etfs
   - Returns: [{ id, name, description, slug, readingTime, published }, ...]

2. ETF Markdown Content:
   GET /api/etfs/[id]
   - Returns: { "id": "...", "name": "...", "content": "markdown string..." }

### Debts
1. List all Debts:
   GET /api/debts
   - Returns: [{ id, name, category, slug, readingTime, published }, ...]

2. Debt Markdown Content:
   GET /api/debts/[id]
   - Returns: { "id": "...", "name": "...", "content": "markdown string..." }

### Mind Over Money
1. List all Mind Over Money articles:
   GET /api/mind-over-money
   - Returns: [{ id, name, slug, readingTime, published }, ...]

2. Mind Over Money Markdown Content:
   GET /api/mind-over-money/[id]
   - Returns: { "id": "...", "name": "...", "content": "markdown string..." }

---

FRONTEND USAGE
--------------
- Fetch categories from `/api/money-basics` (names use underscores for spaces).
- Fetch articles for a category from `/api/money-basics/category/[categoryName]`.
- Fetch a single article's markdown from `/api/money-basics/posts/[id]`.
- Fetch all ETFs, Debts, or Mind Over Money articles from their respective endpoints.
- Fetch markdown content for any single item from its `[id]` endpoint.
- Render markdown with `react-markdown` and your custom components.

---

TAILWIND CSS
------------
- Configured via tailwind.config.js, postcss.config.mjs, and imported in app/globals.css.
- All UI uses Tailwind utility classes.

---

SETUP
-----
1. npm install
2. npm run dev
3. If styles don't work: check configs, delete node_modules/.next, reinstall, restart.

---

ENV VARS
--------
- NOTION_TOKEN: Notion integration token
- NOTION_DB_ID: Money Basics DB
- NOTION_ETF_DB_ID: ETFs DB
- NOTION_DEBT_DB_ID: Debts DB
- NOTION_MIND_DB_ID: Mind Over Money DB
- NEXT_PUBLIC_BASE_URL: (optional) for SSR fetches

---

For more, see code comments or contact the backend maintainer. 