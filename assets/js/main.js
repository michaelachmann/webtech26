(function () {
  'use strict';

  // Per-sheet storage key: set data-storage-key on <body>, or falls back to page title
  const STORAGE_KEY = document.body.dataset.storageKey
    || ('webtech-ub-' + document.title.replace(/\s+/g, '-').toLowerCase());

  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!slides.length) return; // not a sheet page

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsEl  = document.getElementById('dots');
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');
  const resetBtn = document.getElementById('reset-btn');
  const allChecks = Array.from(document.querySelectorAll('.task-check'));

  let currentIdx = 0;

  // ---------- Dot indicator ----------
  slides.forEach((s, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', 'Gehe zu Aufgabe ' + (s.dataset.title || i));
    const tip = document.createElement('span');
    tip.className = 'tooltip';
    tip.textContent = s.dataset.title || ('Slide ' + i);
    dot.appendChild(tip);
    dot.addEventListener('click', () => go(i));
    dotsEl.appendChild(dot);
  });

  // ---------- Navigation ----------
  function go(idx) {
    if (idx < 0 || idx >= slides.length) return;
    slides[currentIdx].classList.remove('active');
    slides[idx].classList.add('active');
    currentIdx = idx;
    updateNavState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateNavState() {
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === slides.length - 1;
    Array.from(dotsEl.children).forEach((d, i) => {
      d.classList.toggle('active', i === currentIdx);
    });
  }

  prevBtn.addEventListener('click', () => go(currentIdx - 1));
  nextBtn.addEventListener('click', () => go(currentIdx + 1));

  // ---------- Keyboard ----------
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, button')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { go(currentIdx + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { go(currentIdx - 1); e.preventDefault(); }
    else if (e.key === 'Home') { go(0); e.preventDefault(); }
    else if (e.key === 'End') { go(slides.length - 1); e.preventDefault(); }
  });

  // ---------- Checkbox state ----------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (e) { return {}; }
  }
  function saveState(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { /* quota / private mode: silently ignore */ }
  }

  const state = loadState();

  allChecks.forEach(cb => {
    if (state[cb.id]) cb.checked = true;
    updateItemDoneClass(cb);
    cb.addEventListener('change', () => {
      state[cb.id] = cb.checked;
      saveState(state);
      updateItemDoneClass(cb);
      updateProgress();
      updateDotsDone();
    });
  });

  function updateItemDoneClass(cb) {
    const li = cb.closest('li');
    if (li) li.classList.toggle('done', cb.checked);
  }

  // ---------- Progress ----------
  function updateProgress() {
    const taskSlides = slides.filter(s => s.querySelector('ol.tasks'));
    let completedTasks = 0;
    taskSlides.forEach(s => {
      const boxes = s.querySelectorAll('.task-check');
      const allDone = boxes.length > 0 && Array.from(boxes).every(b => b.checked);
      if (allDone) completedTasks++;
    });
    progressText.textContent = completedTasks + ' / ' + taskSlides.length + ' Aufgaben';
    progressFill.style.width = (taskSlides.length ? (completedTasks / taskSlides.length * 100) : 0) + '%';
  }

  function updateDotsDone() {
    slides.forEach((s, i) => {
      const boxes = s.querySelectorAll('.task-check');
      const allDone = boxes.length > 0 && Array.from(boxes).every(b => b.checked);
      dotsEl.children[i].classList.toggle('done', allDone);
    });
  }

  // ---------- Copy buttons ----------
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.parentElement.querySelector('pre');
      if (!pre) return;
      const text = pre.textContent;
      const done = () => {
        const original = btn.textContent;
        btn.textContent = '✓ copied';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(() => {
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); done(); } catch (e) {}
          document.body.removeChild(ta);
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  // ---------- Reset ----------
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!confirm('Alle Häkchen entfernen und Fortschritt zurücksetzen?')) return;
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      allChecks.forEach(cb => {
        cb.checked = false;
        updateItemDoneClass(cb);
      });
      updateProgress();
      updateDotsDone();
    });
  }

  // ---------- Init ----------
  updateNavState();
  updateProgress();
  updateDotsDone();
})();
