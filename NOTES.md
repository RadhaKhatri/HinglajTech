# Hinglaj Tech website — setup & hosting guide

Your real contact details are already wired into every page:
- Phone: **+91 83799 22302**
- Email: **hinglajtech2026@gmail.com**
- Office: **Shree Ram Adarsh Colony (Tupe Galli) Ramanandnagar, Maharashtra 416308, India**

Two things you must do before this is fully live and useful — both free,
both take under 10 minutes total.

---

## STEP 1 — Get contact-form emails (5 minutes)

Right now the enquiry form on `contact.html` validates input but has nowhere
to send it (a static site has no server of its own). It's wired to
**Web3Forms** — a free service that emails you form submissions with zero
backend code and no monthly limit.

1. Go to **https://web3forms.com** 
2. Enter your email: `hinglajtech2026@gmail.com`
3. Click "Create Access Key" — Web3Forms emails you a key immediately (no
   account/signup required)
4. Open `contact.html`, find this line near the top of the form:
   ```html
   <input type="hidden" name="access_key" value="REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY">
   ```
5. Replace `REPLACE_WITH_YOUR_WEB3FORMS_ACCESS_KEY` with the key you received
6. Save, re-upload/redeploy

That's it. From then on, every form submission arrives in your Gmail inbox
within seconds, with the visitor's name, email, phone, service interest and
message. A hidden honeypot field is already built in to silently filter out
spam bots without needing a CAPTCHA.

**Until you do this step**, the form will show a friendly message telling
the visitor it isn't connected yet, instead of pretending to succeed — so
you'll never lose an enquiry silently.

---

## STEP 2 — Host it for free (5 minutes)

Recommended: **Cloudflare Pages** or **Netlify** — both are genuinely free
for a site like this (no traffic limits that matter at your stage), both give
you free HTTPS automatically, and both automatically apply the `_headers`
file already in this project for security.

### Option A — Netlify (easiest, drag-and-drop)
1. Go to **https://app.netlify.com/drop**
2. Drag your whole `hinglaj-tech` folder onto the page
3. Netlify gives you a live URL immediately (e.g. `random-name.netlify.app`)
4. To make it permanent: create a free Netlify account (so the site doesn't
   expire), then optionally connect your own domain under
   Site settings → Domain management

### Option B — Cloudflare Pages (best free performance + security)
1. Create a free account at **https://dash.cloudflare.com**
2. Go to Workers & Pages → Create → Pages → Upload assets
3. Upload the `hinglaj-tech` folder
4. Cloudflare gives you a live `.pages.dev` URL with free HTTPS, global CDN,
   and DDoS protection included automatically

### Option C — GitHub Pages (if you're already using GitHub)
1. Create a new GitHub repository, push this folder's contents to it
2. Repo → Settings → Pages → Deploy from branch → `main` / root
3. Your site is live at `yourusername.github.io/reponame`
   (Note: GitHub Pages doesn't read the `_headers` file — see the header
   note below if you use this option)

### A real domain name (optional, ~INR 700-1200/year)
`hinglajtech.com` or similar isn't free, but it's cheap and worth it for a
business. Buy it from any registrar (Namecheap, GoDaddy, Cloudflare
Registrar), then point it at Netlify/Cloudflare Pages by following their
"Custom domain" instructions — both have simple guided steps for this.
Once you have a real domain, update every `https://www.hinglajtech.com`
reference in the `<head>` of each page (canonical/OG tags), plus
`robots.txt` and `sitemap.xml`, to match it.

---

## Is this actually safe once hosted this way?

Yes — and here's why plainly:
- **No database, no server code you manage** -> nothing for an attacker to
  break into or run malicious code on. This is the biggest category of "my
  website got hacked" incidents for small businesses, and it doesn't apply
  to a static site.
- **Free HTTPS** on all three hosts above -> traffic between visitors and your
  site is encrypted automatically.
- **Security headers already configured** in the `_headers` file (Content
  Security Policy, HSTS, clickjacking protection, etc.) — Netlify and
  Cloudflare Pages read this file automatically with zero extra setup.
- **Form spam** is filtered by the honeypot field and by Web3Forms' own spam
  detection — you won't need to moderate anything manually in normal use.
- **Your real exposure** is account security: use a strong, unique password
  and enable 2-factor authentication on your Netlify/Cloudflare account,
  your domain registrar, and your Gmail (since that's where form
  notifications and account-recovery emails land). That's genuinely the
  main thing worth locking down.

If you later add a login system, payments, or a database-backed admin panel,
that's a different, more involved security conversation — flag it when you
get there and we'll handle it properly rather than bolting it onto a static
site.

---

## Everything else you've asked for — where it lives

- **College projects** (mini/major/final year, BE/B.Tech, Diploma, MCA/MSc/
  BCA, Java, Python, web, Android, AI/ML, cloud, IoT, database, full-stack,
  custom academic projects) -> new dedicated page `college-projects.html`,
  linked in the main navigation and homepage, plus summarized in
  `services.html`
- **Full "We Build" list** (AI chatbots, e-commerce, cloud apps, API
  integration, secure auth, dashboards, maintenance) -> `services.html`,
  section "We Build"
- **Business Management Solutions** (ERP, CRM, HRMS, payroll, inventory,
  billing, stock, accounting, appointment booking, logistics, vehicle,
  real estate, event management, office automation, banking & finance) ->
  `services.html`, section "Business Management Solutions"
- **Industry-specific software** (hospital, medical store, restaurant,
  hotel, library) -> `services.html`
- **Education solutions** (school, college, LMS, attendance, results,
  online learning portals) -> `services.html`
- Mobile apps now say **Android & iOS** (was Android-only before)

---

## Remaining placeholders to personalize later
- `privacy.html` / `terms.html` — replace `[Insert Date]` and have both
  reviewed by a professional for India's DPDP Act compliance before you
  rely on them
- A real Open Graph image (`assets/img/og-cover.jpg`, 1200x630px) for how
  the site looks when shared on WhatsApp/social media — currently there
  isn't one, which just means shared links show text only, no preview image
- Once you have completed college projects or client testimonials, they can
  be added as short case studies to build trust further

---

## File map (unchanged from before, plus one new page)
```
index.html              Home (now includes College Projects teaser)
about.html               About
services.html            Full service catalogue (restructured, expanded)
projects.html             Business portfolio
college-projects.html     NEW — student/academic projects page
process.html               Process + pricing + FAQ
contact.html                Consultation form (now sends real email via Web3Forms)
privacy.html / terms.html    Legal pages (template — needs review)
404.html                      Not-found page
robots.txt / sitemap.xml       Search engine files
_headers                        Security headers (Netlify/Cloudflare Pages)
assets/css/style.css              Design system
assets/js/main.js                  Nav, animations, FAQ, form submission logic
assets/img/favicon.svg
```
