# Daily Ops Report Bot Website

This is a professional static HTML website for **Daily Ops Report Bot**. It is designed to be hosted on GitHub Pages.

## Included pages

- `index.html` - homepage
- `features.html` - feature overview
- `pricing.html` - package pricing
- `about.html` - story and creator information
- `download.html` - download-code protected download page
- `support.html` - setup/support page
- `privacy.html` - starter privacy page
- `terms.html` - starter terms page
- `tools/code-generator.html` - local download code generator

## Logo

The logo has been processed into:

`assets/images/daily-ops-report-bot-logo-transparent.png`

The checkered background was removed and replaced with transparency.

## Screenshot placeholders

Placeholder screenshot files are in:

`assets/images/screenshots/`

Replace those SVG files with real screenshots when you have them.

## Download link setup

Open:

`assets/js/config.js`

Change this line to your real GitHub release download URL:

```js
  downloadUrl: "https://github.com/YOUR_USERNAME/DailyOpsReportBot/releases/latest",
```

Example for a release asset:

```js
  downloadUrl: "https://github.com/YOUR_USERNAME/DailyOpsReportBot/releases/latest/download/DailyOpsReportBot_Setup.exe",
```

## Download codes

The download page checks SHA-256 hashes stored in:

`assets/js/download-codes.js`

Three starter test codes are included for testing:

- `DORB-DEMO-2026`
- `LAGRANGE-SMALLBIZ`
- `TIM-CLIENT-001`

Remove or replace these before publishing publicly.

To generate your own codes, open:

`tools/code-generator.html`

Then generate a code, copy the hash entry, and paste it into `assets/js/download-codes.js`.

## Important security note

GitHub Pages is a static website host. Static websites cannot truly hide download links or securely protect files because users can inspect JavaScript and source files. The included download-code system is good for simple gating, demos, pilot customers, or low-risk access.

For stronger protection, use one of these options:

1. Keep release files private and send download links manually after payment.
2. Use a backend service to validate codes and generate temporary download links.
3. Use a customer portal, Stripe customer portal, or license server.

## Suggested GitHub Pages setup

1. Create a repository such as `DailyOpsReportBot-Website`.
2. Upload all files from this folder.
3. Go to repository **Settings**.
4. Click **Pages**.
5. Set Source to **Deploy from a branch**.
6. Select branch `main` and folder `/root`.
7. Save.

Your site will publish to your GitHub Pages URL.

## Pricing Request Access Form

The Pricing page now opens a tier-specific Request Access form instead of sending visitors directly to the download page. The form asks for Name, Business Name, and Email Address, and automatically includes a message saying the visitor is interested in purchasing the selected package.

Configure where requests go in `assets/js/config.js` by setting either `requestAccessEmail` for a prefilled email request or `requestAccessSubmitUrl` for a static-form service such as FormSubmit. See `REQUEST_ACCESS_SETUP.md`.
