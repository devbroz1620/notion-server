NOTION API SERVER - QUICK DOCS (v4)
===================================

This is a pure API server that exposes your Notion content as REST endpoints for your website frontend.

---

FOLDER STRUCTURE
----------------
src/
  app/api/money-basics/route.ts                # GET: List all article categories
  app/api/money-basics/category/[cat]/route.ts # GET: Articles for a specific category
  app/api/money-basics/posts/[id]/route.ts     # GET: Single Money Basics article with content
  app/api/etfs/route.ts                        # GET: List all published ETFs
  app/api/etfs/[id]/route.ts                   # GET: Single ETF with content
  app/api/debts/route.ts                       # GET: List all published Debts
  app/api/debts/[id]/route.ts                  # GET: Single Debt with content
  app/api/debts/category/[cat]/route.ts        # GET: Debts for a specific category
  app/api/mind-over-money/route.ts             # GET: List all published Mind Over Money articles
  app/api/mind-over-money/[id]/route.ts        # GET: Single Mind Over Money article with content
  app/page.js                                   # Simple API server info page
  app/layout.js                                 # Basic layout
  app/globals.css                               # Minimal CSS

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

3. Single Article with Content:
   GET /api/money-basics/posts/[id]
   - Returns: { id, title, category, readingTime, slug, published, content }

### ETFs
1. List all ETFs:
   GET /api/etfs
   - Returns: [{ id, name, description, slug, readingTime, published }, ...]

2. Single ETF with Content:
   GET /api/etfs/[id]
   - Returns: { id, name, description, slug, readingTime, published, content }

### Debts
1. List all Debts:
   GET /api/debts
   - Returns: [{ id, name, category, slug, readingTime, published }, ...]

2. List Debts by Category:
   GET /api/debts/category/[categoryName]
   - [categoryName] uses underscores instead of spaces.
   - Returns: [{ id, name, category, slug, readingTime, published }, ...]

3. Single Debt with Content:
   GET /api/debts/[id]
   - Returns: { id, name, category, slug, readingTime, published, content }

### Mind Over Money
1. List all Mind Over Money articles:
   GET /api/mind-over-money
   - Returns: [{ id, name, slug, readingTime, published }, ...]

2. Single Mind Over Money with Content:
   GET /api/mind-over-money/[id]
   - Returns: { id, name, slug, readingTime, published, content }

---

FRONTEND USAGE
--------------
- All endpoints return JSON data suitable for frontend consumption.
- Single-item endpoints ([id]) return both metadata and markdown content.
- Category endpoints use underscores in URLs for spaces.
- All endpoints support CORS for cross-origin requests.

---

SETUP & ENV VARS
----------------
- Run `npm install` and `npm run dev`.
- Required ENV VARS:
  - `NOTION_TOKEN`: Notion integration token
  - `NOTION_DB_ID`: Money Basics DB
  - `NOTION_ETF_DB_ID`: ETFs DB
  - `NOTION_DEBT_DB_ID`: Debts DB
  - `NOTION_MIND_DB_ID`: Mind Over Money DB

---

DEPLOYMENT
----------
This is a pure API server with minimal dependencies. No UI components or styling frameworks are included.

---

For more, see code comments or contact the backend maintainer. 