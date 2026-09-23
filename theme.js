/* Shared, first-paint theme preference for standalone pages and channel frames. */
(() => {
 const key='jfn-theme';
 function saved(){try{return localStorage.getItem(key)==='midnight'?'midnight':'day';}catch{return 'day';}}
 function apply(theme){
  theme=theme==='midnight'?'midnight':'day';
  document.documentElement.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='midnight'?'#141120':'#eeedf5');
  document.querySelectorAll('.theme-toggle').forEach(b=>{b.setAttribute('aria-pressed',String(theme==='midnight'));b.setAttribute('aria-label','Midnight theme');b.innerHTML=theme==='midnight'?'<span aria-hidden="true">☀</span> Daylight':'<span aria-hidden="true">☾</span> Midnight';});
  window.dispatchEvent(new Event('jfn-theme'));
  document.querySelectorAll('iframe').forEach(f=>f.contentWindow?.postMessage({type:'jfn-theme',theme},location.origin));
 }
 apply(saved());
 addEventListener('storage',e=>{if(e.key===key||e.key===null)apply(saved());});
 addEventListener('message',e=>{if(e.origin===location.origin&&e.source===parent&&e.data?.type==='jfn-theme')apply(e.data.theme);});
 document.addEventListener('DOMContentLoaded',()=>{
  // A frame inherits the host theme even when browser storage is unavailable.
  try{if(parent!==window)apply(parent.document.documentElement.dataset.theme);}catch{}
  if(!new URLSearchParams(location.search).has('embedded')){
   const header=document.querySelector('.site-header,.tool-top');
   if(header){const b=document.createElement('button');b.type='button';b.className='theme-toggle';header.append(b);b.onclick=()=>{const next=document.documentElement.dataset.theme==='midnight'?'day':'midnight';try{localStorage.setItem(key,next);}catch{}apply(next);};}
  }
  apply(document.documentElement.dataset.theme);
 });
})();
