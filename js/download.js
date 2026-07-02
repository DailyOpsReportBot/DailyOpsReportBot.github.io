
async function sha256Hex(value){
  const enc = new TextEncoder();
  const data = enc.encode(value.trim().toUpperCase());
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
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
  const config = window.DORB_SITE_CONFIG || {};
  if(appName) appName.textContent = config.appName || 'Daily Ops Report Bot';
  if(version) version.textContent = config.latestVersion || '1.0.0';
  if(platform) platform.textContent = config.platform || 'Windows Desktop';
  if(downloadLink) downloadLink.href = config.downloadUrl || '#';
  if(releaseNotes) releaseNotes.href = config.releaseNotesUrl || '#';
  if(!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(error) error.classList.remove('visible');
    if(result) result.classList.remove('visible');
    const code = (input && input.value ? input.value : '').trim();
    if(!code){
      if(error){ error.textContent = 'Enter a download code to continue.'; error.classList.add('visible'); }
      return;
    }
    const normalized = code.toUpperCase();
    const hash = await sha256Hex(normalized);
    const valid = (window.DORB_DOWNLOAD_CODE_HASHES || []).some(x => x.hash === hash);
    if(valid){
      localStorage.setItem('dorb-download-unlocked','true');
      if(result) result.classList.add('visible');
      if(input) input.value = '';
    }else{
      if(error){ error.textContent = 'That download code was not recognized. Check the code and try again.'; error.classList.add('visible'); }
    }
  });
})();
