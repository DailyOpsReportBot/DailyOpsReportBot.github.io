
async function sha256Hex(value){
  const enc = new TextEncoder();
  const data = enc.encode(value.trim().toUpperCase());
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function randomCode(){
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s='DORB-';
  for(let group=0; group<3; group++){
    for(let i=0;i<4;i++) s += chars[Math.floor(Math.random()*chars.length)];
    if(group<2) s+='-';
  }
  return s;
}
(function(){
  const codeInput=document.querySelector('[data-code-source]');
  const hashOut=document.querySelector('[data-hash-output]');
  const blockOut=document.querySelector('[data-block-output]');
  const make=document.querySelector('[data-make-code]');
  const hashBtn=document.querySelector('[data-hash-code]');
  async function update(){
    const code=(codeInput.value||'').trim().toUpperCase();
    if(!code) return;
    const hash=await sha256Hex(code);
    hashOut.value=hash;
    blockOut.value=`{ label: "Client Code", hash: "${hash}" }`;
  }
  if(make){ make.addEventListener('click',()=>{ codeInput.value=randomCode(); update(); }); }
  if(hashBtn){ hashBtn.addEventListener('click',update); }
  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const target=document.querySelector(btn.getAttribute('data-copy'));
      if(target){ target.select(); document.execCommand('copy'); btn.textContent='Copied'; setTimeout(()=>btn.textContent='Copy',1200); }
    });
  });
})();
