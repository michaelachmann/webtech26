# Webtechnologien — Übungsblätter SoSe 2026

Interaktive Übungsblätter für die Lehrveranstaltung **Webtechnologien** an der Universität Regensburg.

**Kursleitung:** Michael Achmann-Denkler & Clara Helmig
**Lehrstuhl:** Medieninformatik · Universität Regensburg
**Studiengänge:** Digital Humanities M. A. & Digital Law LL.B.

Live: **[webtech26.github.io](https://webtech26.github.io)** *(URL nach Deployment anpassen)*

---

## Übungsblätter

| Nr. | Thema | Datum |
|-----|-------|-------|
| 01 | HTML-Grundlagen | 24. April 2026 |
| 02 | HTML & CSS | 15. Mai 2026 |
| 03 | JavaScript I | 5. Juni 2026 |
| 04 | JavaScript II | 26. Juni 2026 |

## Struktur

```
/
├── index.html              Kursübersicht (Landing Page)
├── impressum.html          Impressum & Datenschutz
├── assets/
│   ├── css/main.css        Gemeinsames Design-System
│   └── js/main.js          Gemeinsame Logik (Navigation, Fortschritt, Copy)
├── blatt1/index.html       Übungsblatt 01 — HTML-Grundlagen
└── .github/workflows/
    └── pages.yml           GitHub Actions Deployment
```

## Technisches

- Reines HTML/CSS/JS — kein Build-Schritt, keine Abhängigkeiten
- Deployment über GitHub Actions auf GitHub Pages (Branch `main`)
- Lernfortschritt wird per `localStorage` im Browser gespeichert (kein Server, keine Cookies)
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces), [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

## Neues Übungsblatt anlegen

1. `blattN/index.html` erstellen — `blatt1/index.html` als Vorlage kopieren
2. `<title>`, `data-storage-key` (Body-Attribut) und den Brand-Span (Datum + Thema) anpassen
3. Slides durch neue Inhalte ersetzen (Index fortlaufend ab 0)
4. In `index.html` die passende `.sheet-row.upcoming`-Zeile in einen aktiven `<a>`-Link umwandeln (Klasse `upcoming` entfernen, `href` setzen)

Vollständige Dokumentation der Design-Patterns und HTML-Strukturen: siehe [`CLAUDE.md`](CLAUDE.md).

## Lokale Vorschau

Da es sich um statische Dateien handelt, genügt ein einfacher HTTP-Server:

```bash
# Python
python3 -m http.server 8000

# Node.js (npx)
npx serve .
```

Dann im Browser: `http://localhost:8000`

> Direkt per `file://` öffnen funktioniert ebenfalls für die meisten Features —
> nur `navigator.clipboard` (Copy-Button) benötigt einen echten HTTP-Kontext.
