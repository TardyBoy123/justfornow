/* Native scrolling, progressive links, and a single accessible channel window. */
(() => {
  const chapters = [...document.querySelectorAll('.chapter')];
  const links = [...document.querySelectorAll('.chapter-nav a')];
  const label = document.querySelector('#chapter-label');
  const names = ['INTRODUCTION','INSTRUMENTS','EXPERIMENTS','TRANSMISSIONS','CONNECTIONS'];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let queued = false;
  function update() {
    queued = false;
    let active = 0, closest = Infinity;
    chapters.forEach((chapter, i) => {
      const rect = chapter.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
      if (Math.abs(offset) < closest) { closest = Math.abs(offset); active = i; }
      const content = chapter.firstElementChild;
      if (!reduced.matches) {
        const distance = Math.max(0, Math.abs(offset) - .27);
        content.style.opacity = Math.max(.12, 1 - distance * 1.1);
        content.style.transform = `translate3d(${offset * (i % 2 ? -28 : 28)}px,${offset * 35}px,0) scale(${1 - Math.min(.1, distance * .09)})`;
      } else { content.style.opacity = ''; content.style.transform = ''; }
    });
    links.forEach((link,i) => i === active ? link.setAttribute('aria-current','step') : link.removeAttribute('aria-current'));
    label.textContent = `0${active} / ${names[active]}`;
    window.jfnProgress = Math.max(0, Math.min(4, (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 4));
    window.dispatchEvent(new Event('jfn-scroll'));
  }
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
  addEventListener('scroll',schedule,{passive:true}); addEventListener('resize',schedule); reduced.addEventListener('change',schedule); update();
  function time() { document.querySelector('#clock').textContent = new Intl.DateTimeFormat('en-GB',{timeZone:'America/Toronto',hour:'2-digit',minute:'2-digit'}).format(new Date()) + ' / TORONTO'; }
  time(); setInterval(time,30000);
  const directory = document.querySelector('#directory'), toggle = document.querySelector('.index-toggle');
  function setDirectory(open) {
    directory.classList.toggle('open',open); toggle.setAttribute('aria-expanded',String(open));
    directory.inert = !open;
    if (open) directory.querySelector('a').focus();
    else if (location.hash === '#directory') history.replaceState(null,'',location.pathname + location.search);
  }
  directory.inert = true;
  toggle.onclick = () => setDirectory(!directory.classList.contains('open'));
  document.querySelector('.directory-close').onclick = () => { setDirectory(false); toggle.focus(); };
  document.querySelector('.skip-link').onclick = e => { e.preventDefault(); setDirectory(true); };
  if (location.hash === '#directory') setDirectory(true);
  const dialog = document.querySelector('#channel-dialog'), frame = document.querySelector('#channel-frame');
  let opener;
  document.querySelectorAll('[data-panel]').forEach(link => link.addEventListener('click',e => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || !dialog.showModal) return;
    e.preventDefault(); opener = link;
    const title = link.querySelector('small') ? link.children[1].childNodes[0].textContent : link.childNodes[0].textContent;
    document.querySelector('#panel-title').textContent = title.trim();
    document.querySelector('#standalone-link').href = link.getAttribute('href');
    frame.title = title.trim(); frame.src = link.getAttribute('href') + '?embedded=1';
    setDirectory(false); dialog.showModal(); document.body.classList.add('panel-open');
  }));
  const close = () => dialog.close();
  document.querySelector('#close-panel').onclick = close;
  dialog.addEventListener('click',e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) close(); } });
  dialog.addEventListener('close',() => { frame.src = 'about:blank'; document.body.classList.remove('panel-open'); if (opener && !opener.closest('.directory')) opener.focus({preventScroll:true}); else toggle.focus({preventScroll:true}); });
  addEventListener('message',e => { if (e.source === frame.contentWindow && e.data === 'jfn-close') close(); });
  addEventListener('keydown',e => { if (e.key === 'Escape' && directory.classList.contains('open')) { setDirectory(false); toggle.focus(); } });
})();
