async function sha256Hex(value){
  const enc = new TextEncoder();
  const data = enc.encode(normalizeDownloadCode(value));
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}

function normalizeDownloadCode(value){
  return (value || '')
    .normalize('NFKC')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, '')
    .trim()
    .toUpperCase();
}

function compactDownloadCode(value){
  return normalizeDownloadCode(value).replace(/-/g, '');
}

function getConfiguredHashes(){
  const entries = window.DORB_DOWNLOAD_CODE_HASHES || [];
  return entries
    .map(entry => {
      if(typeof entry === 'string') return entry;
      if(entry && typeof entry.hash === 'string') return entry.hash;
      return '';
    })
    .map(hash => hash.trim().toLowerCase())
    .filter(hash => /^[a-f0-9]{64}$/.test(hash));
}

(function(){
  const form = document.querySelector('[data-download-form]');
  const input = document.querySelector('[data-download-code]');
  const result = document.querySelector('[data-unlock-result]');
  const error = document.querySelector('[data-unlock-error]');
  const appName = document.querySelector('[data-app-name]');
  const version = document.querySelector('[data-version]');
  const platform = document.querySelector('[data-platform]');
  const downloadLink = document.querySelector('[data-download-link]');
  const releaseNotes = document.querySelector('[data-release-notes]');
  const codeCount = document.querySelector('[data-code-count]');
  const config = window.DORB_SITE_CONFIG || {};

  if(appName) appName.textContent = config.appName || 'Daily Ops Report Bot';
  if(version) version.textContent = config.latestVersion || '1.0.0';
  if(platform) platform.textContent = config.platform || 'Windows Desktop';
  if(downloadLink) downloadLink.href = config.downloadUrl || '#';
  if(releaseNotes) releaseNotes.href = config.releaseNotesUrl || '#';
  if(codeCount) codeCount.textContent = String(getConfiguredHashes().length);

  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(error) error.classList.remove('visible');
    if(result) result.classList.remove('visible');

    const rawCode = input && input.value ? input.value : '';
    const normalized = normalizeDownloadCode(rawCode);
    if(!normalized){
      if(error){
        error.textContent = 'Enter a download code to continue.';
        error.classList.add('visible');
      }
      return;
    }

    const configuredHashes = getConfiguredHashes();
    if(configuredHashes.length === 0){
      if(error){
        error.textContent = 'No download-code hashes are configured yet. Check assets/js/download-codes.js.';
        error.classList.add('visible');
      }
      return;
    }

    const exactHash = await sha256Hex(normalized);
    const compactHash = await sha256Hex(compactDownloadCode(normalized));
    const valid = configuredHashes.includes(exactHash) || configuredHashes.includes(compactHash);

    if(valid){
      localStorage.setItem('dorb-download-unlocked','true');
      if(result) result.classList.add('visible');
      if(input) input.value = '';
    }else{
      if(error){
        error.textContent = 'That download code was not recognized. Check the code and try again.';
        error.classList.add('visible');
      }
    }
  });
})();
