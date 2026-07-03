# Request Access Form Setup

The Pricing page now opens a Request Access form when a visitor clicks a package's **Request Access** button.

Each button passes the selected package into the form:

- Basic
- Intermediate
- Advanced

The form includes these required fields:

- Name
- Business Name
- Email Address

The message field is automatically filled with text stating that the visitor is interested in purchasing the selected Daily Ops Report Bot package.

## File changed

- `pricing.html`
- `assets/js/config.js`
- `assets/js/request-access.js`
- `assets/css/styles.css`

## Option 1: Use email / mailto

Open this file:

```text
assets/js/config.js
```

Change this line:

```javascript
requestAccessEmail: "YOUR_EMAIL@example.com",
```

To your real business email:

```javascript
requestAccessEmail: "yourbusiness@email.com",
```

When the visitor submits the form, their email app opens with a prefilled message.

## Option 2: Use FormSubmit

For a more website-like form submission, set `requestAccessSubmitUrl` to a FormSubmit endpoint.

Example:

```javascript
requestAccessEmail: "",
requestAccessSubmitUrl: "https://formsubmit.co/yourbusiness@email.com"
```

The first time you use FormSubmit, it may send a confirmation email to activate the address.

## Important

GitHub Pages is static hosting. It does not process form submissions by itself. The form must use either:

- `mailto:` through `requestAccessEmail`, or
- a form service endpoint through `requestAccessSubmitUrl`.

## Configured FormSubmit Endpoint

This website package is configured to send Pricing page Request Access submissions to:

```text
https://formsubmit.co/DailyOpsReportBot@gmail.com
```

On the first live submission, FormSubmit may send an activation email to DailyOpsReportBot@gmail.com. Open that email and confirm the form so future submissions are delivered.
