# Download Code Troubleshooting

If a valid download code is not accepted:

1. Open `tools/code-generator.html` from the published website, not an older local copy.
2. Generate or enter the code and copy the generated line.
3. Paste the generated line inside the array in `assets/js/download-codes.js`.
4. Keep the surrounding `window.DORB_DOWNLOAD_CODE_HASHES = [` and `];` lines.
5. Keep commas between each entry.
6. Commit the file to GitHub and wait for GitHub Pages to finish publishing.
7. Hard refresh the Download page with `Ctrl + F5`.
8. The Download page now shows how many valid hashes were loaded. If it shows `0`, the codes file is not loading or has a JavaScript syntax error.

Supported entries:

```js
window.DORB_DOWNLOAD_CODE_HASHES = [
  { label: "Client Code", hash: "64-character-sha256-hash" },
  "64-character-sha256-hash"
];
```

Codes are normalized before checking: uppercase, leading/trailing spaces removed, internal spaces removed, and common dash characters converted to normal hyphens.
