# From Nani With Love

React, Vite, and Tailwind CSS storefront for handcrafted baby buntings and birthday keepsakes.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Product Images

Product images live in `public/products/`. Replace the files there with the original product photos using the same filenames to update the storefront without changing code.

## Add A New Product (Step By Step)

1. Copy the product image into `public/products/`.
2. Choose a file name in lowercase with hyphens, for example: `new-bunting.jpg`.
3. Open `src/data/products.json`.
4. Copy an existing product object and paste it at the end of the list (before the closing `]`).
5. Update these fields in that new object:
   - `slug`: unique URL key, for example `new-bunting`
   - `name`: product name shown to customers
   - `subtitle`: short supporting line
   - `tagline`: short emotional quote
   - `description`: full product description (shown on product page)
   - `price`: for example `INR 1,299`
   - `badge`: small label shown on image
   - `image`: image path, for example `/products/new-bunting.jpg`
   - `alt`: accessibility text for the image
   - `points`: 3 short bullet points
6. Optional: add `secondaryImage` and `secondaryAlt` if a second photo is needed.
7. Save the file.
8. Run `npm run dev` and check:
   - New product appears on homepage grid
   - Clicking the card opens its own product page
9. Run `npm run build` to verify production build.