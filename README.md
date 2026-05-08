# Document Solutions — New Website

Modern, AI-search-optimized marketing site for Document Solutions (Jim Cross, Beverly MA).

## What's here

```
new-website/
├── index.html                          ← Home (single-scroll with anchor sections + lead form)
├── about.html                          ← Jim Cross story, 30-year timeline, company values
├── tco-calculator.html                 ← Interactive 3-year TCO calculator (lead magnet)
├── services/
│   ├── managed-print.html              ← Managed Print Services SEO/AEO page
│   └── workflow-consulting.html        ← NJM Consulting / uniFLOW SEO/AEO page
├── assets/
│   ├── css/styles.css                  ← Full design system
│   ├── js/main.js                      ← Reveal animations, sticky nav, form handler, smooth scroll
│   └── images/                         ← Real assets pulled from current site (logos, BBB, Canon, testimonials)
├── robots.txt                          ← Explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.)
├── llms.txt                            ← AI agent index — markdown summary of the whole site
├── sitemap.xml
└── README.md
```

## Design system

- **Brand blue:** `#1F4FA8` — pulled from Jim's actual logo (the cowork demo's `#0f2240` was darker; this matches the real brand)
- **Accent orange:** `#F97316` — vibrant, modern, ties back to the cowork demo
- **Typography:** Inter / Inter Tight (display) / Fraunces (editorial italic accents)
- **Motion:** subtle fade-up reveals on scroll, hover lift on cards, smooth anchor scroll
- **Responsive:** breakpoints at 1100px, 820px, 540px

## AI search optimization (AEO / GEO / LLMO) — what's baked in

This is not just a Google SEO site — it's structured to be cited by ChatGPT, Claude, Perplexity, Google AI Overviews, and Gemini.

1. **AI crawlers explicitly allowed** in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended, Bytespider, CCBot, Mistral-AI-User, Meta-ExternalAgent, etc.)
2. **`llms.txt` at the root** — emerging convention, gives AI agents a hand-curated markdown index of the site
3. **Schema.org JSON-LD on every page**:
   - `LocalBusiness` with full NAP, geo, opening hours, area served (every North Shore city)
   - `Person` (Jim Cross)
   - `Service` (each service has its own structured offer)
   - `AggregateRating` + three `Review` entries (real testimonials with named authors)
   - `FAQPage` with structured Q&A (these get pulled directly into AI Overviews)
   - `BreadcrumbList`
   - `WebApplication` for the TCO calculator
4. **Factual, attribute-rich copy** — written so AI engines can quote and cite
5. **FAQ blocks on every major page** — direct, quotable answers to common buyer questions
6. **Local long-tail keywords** — "Canon dealer Beverly MA," "managed print North Shore," "uniFLOW consulting Salem MA," etc.
7. **Real testimonials with full attribution** — Jim Damico (Century 21 NE), Carol Cannon (MAC), Scott Milbury (Excel Paving) — schema-tagged
8. **Speed** — static HTML, no framework, system fonts fall-back, Google Fonts preconnected
9. **Semantic HTML** — proper heading hierarchy, `<article>`, `<section>`, `<details>`/`<summary>` for FAQ
10. **NAP consistency** across every page (8 Garfield Avenue, Beverly MA 01915 / 978-750-0444 / jim@documentsolution.org)

## Lead capture

The form on `index.html#contact` posts to a placeholder Formspree endpoint:

```html
<form action="https://formspree.io/f/REPLACE_WITH_FORM_ID" method="POST">
```

**Before deploying**, replace `REPLACE_WITH_FORM_ID` with one of:

- A free Formspree form ID (free tier supports 50 submissions/month; recommend for MVP)
- A Netlify Forms `data-netlify="true"` attribute (free, unlimited)
- A Smartsheet Forms URL (so leads land directly in a Smartsheet pipeline)
- A simple `mailto:jim@documentsolution.org` action (works zero-setup, no analytics)

Lead destination is currently a TBD per the project memo. Update once Jim confirms.

## Deployment — GitHub Pages (Phase 1)

We're using the same workflow as the cowork demo. Recommended steps:

1. Create a new GitHub repo: `document-solutions-website` (or push into the existing `document-solutions-kit` repo under a subfolder).
2. Copy the contents of `new-website/` into the repo root.
3. Enable GitHub Pages from the repo settings → Pages → Source: `main` branch, root.
4. Add a custom domain when ready — point `documentsolution.org` DNS at GitHub Pages:
   - Apex `documentsolution.org` → A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www.documentsolution.org` → CNAME to `<username>.github.io`
   - Add `documentsolution.org` in the Pages → Custom domain field. Enable Enforce HTTPS once the cert provisions.

Custom domain DNS will need access to the registrar that currently points the domain at DUDA — confirm with Jim who controls that before cutover.

## Outstanding before launch

- [ ] **Real photos from Jim**: headshot, team / technician photo, exterior of 8 Garfield Ave
- [ ] **Higgsfield-generated imagery**: hero ambient shot, lifestyle scenes for industries section, North Shore territory illustration. (Use higgsfield-generate or higgsfield-product-photoshoot skills. Do NOT generate fake photos of Jim or his team.)
- [ ] **OG image** (`assets/images/og-image.jpg`): 1200×630 social-share card. Right now meta tags reference it but the file isn't present yet.
- [ ] **Lead form endpoint**: replace Formspree placeholder per Jim's preference (Smartsheet pipeline most likely)
- [ ] **Logo SVG**: the current `logo-original.jpg` is rasterized — should re-export Jim's logo as SVG for crisp scaling
- [ ] **Confirm testimonial usage rights**: Jim Damico, Carol Cannon, Scott Milbury — all currently on the live site, but worth a courtesy check before re-publishing
- [ ] **DUDA migration plan**: cancel the DUDA subscription once GitHub Pages is live and DNS has cut over

## Site map (for Jim / sales)

| Page | Purpose | Primary CTA |
|------|---------|-------------|
| Home | First impression, full-funnel | Free Print Assessment form |
| About | Trust / credibility | Free Assessment |
| Managed Print | SEO depth + lead magnet for "managed print MA" | Free Assessment |
| Workflow Consulting | NJM Consulting positioning, uniFLOW | Discovery Call |
| TCO Calculator | Lead magnet + differentiator | Email Me My Report |
