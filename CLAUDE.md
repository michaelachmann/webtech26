# WebTech26 — Übungsblätter

Interactive exercise sheets (Übungsblätter) for the course **Webtechnologien**, SoSe 2026.
Lehrstuhl für Medieninformatik · Universität Regensburg
Kursleitung: Michael Achmann-Denkler & Clara Helmig
Audience: Digital Humanities and Digital Law students.

Hosted as a static site on GitHub Pages (no build step).

---

## Repository structure

```
/
├── index.html              Landing page — lists all Übungsblätter
├── .nojekyll               Prevents Jekyll processing on GitHub Pages
├── assets/
│   ├── css/main.css        Shared design system (tokens, layout, all components)
│   └── js/main.js          Shared behaviour (slide nav, progress, copy buttons)
└── blatt1/
    └── index.html          Übungsblatt 1 — HTML-Grundlagen
```

Each Übungsblatt lives in its own folder (`blatt1/`, `blatt2/`, …) as `index.html`, so URLs are clean (`/blatt1/`).

---

## Design system (`assets/css/main.css`)

### CSS custom properties (tokens)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FDFCFA` | Page background |
| `--surface` | `#FFFFFF` | Card / component background |
| `--ink` | `#0F172A` | Primary text |
| `--ink-soft` | `#334155` | Body text, task content |
| `--muted` | `#64748B` | Labels, metadata |
| `--rule` | `#E2E8F0` | Borders, dividers |
| `--navy` | `#1E3A8A` | Primary accent (links, progress, active) |
| `--navy-soft` | `#EFF3FB` | Light navy background (refs bar) |
| `--navy-ink` | `#1E2761` | Dark navy for display type |
| `--accent` | `#B85042` | Warm accent (eyebrow, hint callouts) |
| `--accent-soft` | `#FBEFEC` | Light accent background |
| `--success` | `#047857` | Checked / completed state |
| `--success-bg` | `#ECFDF5` | Done list item background |
| `--code-bg` | `#0F172A` | Dark code block background |
| `--code-fg` | `#E2E8F0` | Code block text |
| `--font-display` | Fraunces, Georgia, serif | Headings, large type |
| `--font-body` | IBM Plex Sans, system-ui | Body text |
| `--font-mono` | JetBrains Mono, monospace | Code, labels, metadata |

### Key layout classes

- `.app` — max-width 1100px centered column, full viewport height
- `header.top` — site header; flex row, brand left, progress right
- `.brand-group` — wraps `.brand` + `.brand-sub` in a column
- `.brand` — course/page name; use as `<a href="../">` on subpages, `<div>` on root
- `.brand-sub` — mono small text for institution/instructor info
- `main.stage` — flex `1`, holds `.slide` elements
- `footer.nav` — bottom nav row (prev/dots/next on blatt pages)

---

## HTML patterns

### Page shell (every Übungsblatt)

```html
<body data-storage-key="webtech-TOPIC-ub-progress-v1">
<div class="app">
  <header class="top">
    <div class="brand-group">
      <a href="../" class="brand">
        <span class="course">Webtechnologien</span>
        <span class="sep">·</span>
        <span>SoSe 2026</span>
        <span class="sep">·</span>
        <span>Übungsblatt TOPIC</span>
      </a>
      <span class="brand-sub">Lehrstuhl für Medieninformatik · Universität Regensburg · M. Achmann-Denkler &amp; C. Helmig</span>
    </div>
    <div class="progress-readout">
      <span id="progress-text">0 / 0 Aufgaben</span>
      <div class="progress-bar"><div class="progress-fill" id="progress-fill"></div></div>
    </div>
  </header>

  <main class="stage">
    <!-- slides here -->
  </main>

  <footer class="nav">
    <button class="nav-btn" id="prev-btn">← Zurück</button>
    <div class="dots" id="dots"></div>
    <button class="nav-btn" id="next-btn">Weiter →</button>
  </footer>
</div>
<script src="../assets/js/main.js"></script>
</body>
```

### Slide types

Every `<section>` gets `class="slide"` and a unique `data-slide="N"` (zero-indexed) plus a short `data-title` (shown in the dot tooltip).

**Title slide** (slide 0, always):
```html
<section class="slide title-slide active" data-slide="0" data-title="Übersicht">
  <div class="kicker">Sitzung N · Hands-on</div>
  <h1>Thema<br><em>„Subtitle"</em></h1>
  <p class="lede">...</p>
  <div class="title-meta">
    <div class="meta-item">
      <div class="meta-key">Navigation</div>
      <div class="meta-val"><span class="keyhint">←</span> <span class="keyhint">→</span> oder die Punkte unten</div>
    </div>
    <!-- more meta-items -->
  </div>
</section>
```

**Task slide** (slides 1–N):
```html
<section class="slide" data-slide="1" data-title="A · Thema">
  <div class="eyebrow">Aufgabe A</div>
  <div class="task-letter">A</div>
  <h1 class="slide-title">Titel der Aufgabe</h1>
  <p class="subtitle">Kurze Beschreibung.</p>
  <div class="slide-body">
    <!-- refs, tasks, callouts here -->
  </div>
</section>
```

**End slide** (last slide):
```html
<section class="slide end-slide" data-slide="N" data-title="Geschafft">
  <div class="eyebrow">Ziel der Sitzung</div>
  <h1 class="slide-title">Was ihr jetzt könnt</h1>
  <div class="end-grid">
    <div class="end-card"><div class="check">✓</div><p>...</p></div>
  </div>
  <div style="margin-top: 32px;">
    <button class="reset-link" id="reset-btn">Fortschritt zurücksetzen</button>
  </div>
</section>
```

### References bar

Links to W3Schools (or MDN) at the top of a task slide.

```html
<div class="refs">
  <span class="refs-label">W3Schools</span>
  <a href="https://www.w3schools.com/..." target="_blank" rel="noopener">Topic</a>
</div>
```

### Task checklist

```html
<ol class="tasks" data-task="A">
  <li>
    <input type="checkbox" class="task-check" id="A-a">
    <label for="A-a" class="task-label">a)</label>
    <span class="task-content">
      Task description. Use <code>inline code</code> and <strong>bold</strong> freely.
    </span>
  </li>
</ol>
```

- Checkbox IDs must be unique across the whole page (e.g. `A-a`, `A-b`, `B-a`).
- The `data-task` attribute on `<ol>` is informational only.

### Code block with copy button

```html
<div class="code-wrap">
  <button class="copy-btn" type="button">copy</button>
  <pre>code here — use HTML entities for &lt; and &gt;</pre>
</div>
```

### Callout boxes

```html
<!-- Hint / warning (warm accent) -->
<div class="callout hint">
  <span class="callout-label">Hinweis</span>
  Text here.
</div>

<!-- Reflection prompt (neutral) -->
<div class="callout reflect">
  <span class="callout-label">Mini-Reflexion</span>
  Text here.
</div>
```

---

## JavaScript (`assets/js/main.js`)

A single IIFE — no dependencies, no build needed.

- **Storage key**: read from `data-storage-key` on `<body>`. Use the pattern `webtech-TOPIC-ub-progress-vN`. Each Blatt must have a unique key to keep progress isolated.
- **Navigation**: arrow keys, Page Up/Down, Home, End all work.
- **Progress**: counts slides where *all* checkboxes are checked; shown in header.
- **Dot indicators**: auto-generated from slides; turn green when a slide is fully done.
- **Copy buttons**: use `navigator.clipboard` with `execCommand` fallback.
- **Reset**: `id="reset-btn"` on last slide; guarded by `confirm()`.
- The script exits early (`return`) if no `.slide` elements exist — safe to include on the index page too (though currently it is not included there).

---

## Adding a new Übungsblatt

1. Create `blatt2/index.html` (copy `blatt1/index.html` as a starting point).
2. Update `<title>`, `data-storage-key`, and the brand span to reflect the new topic.
3. Replace all slides with the new content. Ensure slide indices are contiguous from 0.
4. Add a new `.sheet-card` entry to the `<div class="sheet-grid">` in `index.html`.

---

## GitHub Pages

Deployed from the `main` branch root. The `.nojekyll` file disables Jekyll so asset paths with underscores or other characters are served as-is.

No CI workflow is needed — GitHub Pages detects the static site automatically when configured to deploy from branch `main` / `/(root)` in repository Settings → Pages.
