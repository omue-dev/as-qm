# Claude Rules – A&S QM Website

> **KI-Gedächtnis für das A&S QM Beratungs-Projekt**
> Diese Regeln gelten für JEDE Code-Session und JEDEN Code-Change.

---

## 📐 Spacing & Layout (KRITISCH – NIEMALS IGNORIEREN)

**Pflichtlektüre:** `SPACING-GUIDELINE.md` (21 KB Dokumentation)

### Absolute Regeln

1. **Nur $spacer-Multiplikatoren in SCSS**
   ```scss
   // ✅ RICHTIG
   padding: $spacer * 2.5;    // 2.5rem = 40px
   gap: $spacer * 1.5;        // 1.5rem = 24px

   // ❌ FALSCH
   padding: 40px;
   padding: 2.5rem;  // nur mit $spacer!
   ```

2. **KEINE Row-Level Margins (außer .row-spacious)**
   ```html
   <!-- ❌ FALSCH -->
   <div class="row mx-2 mx-lg-5">

   <!-- ✅ RICHTIG -->
   <div class="row">                    <!-- Standard -->
   <div class="row row-spacious g-4">   <!-- Mit Whitespace -->
   ```

3. **Hero Sections: immer gy-5 gx-5**
   ```html
   <!-- ❌ FALSCH -->
   <div class="row g-5">

   <!-- ✅ RICHTIG -->
   <div class="row gy-5 gx-5">  <!-- Explizit Y und X -->
   ```

4. **Heading Margin Hierarchie (niemals abweichen)**
   - `<h2>` → `mb-5` (Main Section Headings)
   - `<h3>`, `<p class="h5">` → `mb-4` (Sub-Headings)
   - `<h5>` in Cards → `mb-3`
   - Standard Paragraphs → `mb-4`
   - Letztes Element in Container → `mb-0`

5. **Grid Gaps nach Semantic Guide**
   - Card-Grids (Standard): `g-4`
   - Hero Sections: `gy-5 gx-5`
   - Form Elements: `g-3`
   - Icon-Listen: `g-2`

### Bootstrap Spacing Scale (ausschließlich verwenden)

| Level | Wert | Pixels | Verwendung |
|-------|------|--------|-----------|
| 0 | 0 | 0px | Kein Spacing |
| 1 | 0.25rem | 4px | Icons, Fine-Tuning |
| 2 | 0.5rem | 8px | Kleine Gaps |
| 3 | 1rem | 16px | Standard |
| 4 | 1.5rem | 24px | Cards, Sections |
| 5 | 3rem | 48px | Große Sections |

**Projekt-Extensions:**
- `$spacer * 0.75` = 0.75rem (12px)
- `$spacer * 2` = 2rem (32px)
- `$spacer * 2.5` = 2.5rem (40px)
- `$spacer * 3.5` = 3.5rem (56px)

---

## 🏗️ HTML Struktur & Architektur

### Framework & Build

- **Bootstrap 5.3.3** (via npm)
- **PostHTML** für Partials: `<include src="partials/navbar.html"></include>`
- **Sass** für Styles (nicht plain CSS)
- **Build-System:** Node.js Scripts

### Semantische HTML-Regeln

```html
<!-- ✅ RICHTIG: Standard Section -->
<section class="py-section" id="section-id">
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="text-strong text-center mb-5">
          <strong>Heading</strong>
        </h2>
        <div class="row g-4">
          <!-- Content Cards -->
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ✅ RICHTIG: Hero Section -->
<header class="hero hero--qm">
  <include src="partials/navbar.html"></include>
  <div class="container hero-body min-vh-100" id="start">
    <div class="row hero-row align-items-stretch gy-5 gx-5">
      <div class="col-lg-7 order-2 order-lg-1 pe-lg-5 pe-xl-5">
        <!-- Content -->
      </div>
      <div class="col-lg-5 order-1 order-lg-2 ps-lg-5 ps-xl-5">
        <!-- Media -->
      </div>
    </div>
  </div>
</header>
```

### Partials (immer verwenden)

- `src/partials/navbar.html` – Navigation
- `src/partials/footer.html` – Footer

**Nie** Navigation/Footer direkt in Seiten duplizieren!

### Bilder & Assets

- Bilder: `src/assets/images/`
- Ausgabe: `dist/assets/images/`
- **Immer** sinnvolle `alt`-Texte
- Responsive Images: `<img class="img-fluid">`

---

## 🎨 SCSS Architektur

### Verzeichnisstruktur

```
src/assets/scss/
├── abstracts/
│   └── _variables.scss    # $spacer, Farben, Breakpoints
├── base/
│   ├── _reset.scss
│   └── _typography.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   └── _navbar.scss
├── pages/
│   ├── _home.scss
│   ├── _philosophie.scss
│   └── _contact.scss
├── utilities/
│   └── _custom.scss        # .py-section, .row-spacious
└── main.scss               # Imports
```

### SCSS Coding Rules

1. **Immer $spacer verwenden**
   ```scss
   // ✅ RICHTIG
   .feature-card {
     padding: $spacer * 2;
     margin-bottom: $spacer * 1.5;
   }

   // ❌ FALSCH
   .feature-card {
     padding: 32px;
     margin-bottom: 24px;
   }
   ```

2. **Keine tief verschachtelten Selektoren (max 3 Ebenen)**
   ```scss
   // ❌ FALSCH
   .section {
     .container {
       .row {
         .col {
           .card { } // zu tief!
         }
       }
     }
   }

   // ✅ RICHTIG
   .feature-card {
     padding: $spacer * 2;

     .card-title {
       margin-bottom: $spacer;
     }
   }
   ```

3. **Responsive: Mobile-first**
   ```scss
   .philosophie-card {
     padding: $spacer * 2;  // Mobile default

     @media (min-width: 992px) {
       padding: $spacer * 2.5;  // Desktop
     }
   }
   ```

4. **Keine !important (außer begründet)**
   ```scss
   // ❌ FALSCH
   margin: $spacer !important;

   // ✅ RICHTIG (mit Kommentar wenn nötig)
   margin: $spacer !important;  // Override Bootstrap utility
   ```

### Custom Utilities (bereits vorhanden)

- `.py-section` – Standard Section Spacing (5.5rem mobile, 9rem desktop)
- `.bg-section-soft` – Soft Background für Sections
- `.row-spacious` – Luftige Content-Rows (0.5rem mobile, 3rem desktop)

---

## ✅ Definition of Done (vor JEDEM Commit)

**Pflichtlektüre:** `docs/definition-of-done.md`

### Pre-Commit Checklist

#### HTML
- [ ] Semantische Struktur (header, main, section, article, footer)
- [ ] Genau ein `<h1>` pro Seite
- [ ] Alle Bilder haben `alt`-Texte
- [ ] Kein Inline-CSS oder Inline-JS
- [ ] Fokusreihenfolge logisch

#### SCSS/CSS
- [ ] Alle Spacings mit `$spacer`
- [ ] Mobile-first Breakpoints
- [ ] Keine px-Werte (außer border-width)
- [ ] SPACING-GUIDELINE.md befolgt

#### Build & Test
- [ ] `npm run build:site` läuft ohne Fehler
- [ ] Visueller Test auf Mobile (<768px)
- [ ] Visueller Test auf Desktop (≥992px)

#### SEO
- [ ] Meta Title (max 60 Zeichen)
- [ ] Meta Description (max 160 Zeichen)
- [ ] H1-H6 Hierarchie korrekt
- [ ] Keywords natürlich eingebaut (siehe docs/keyword-recherche.md)

#### Accessibility
- [ ] Alt-Texte vorhanden
- [ ] Fokuszustände sichtbar
- [ ] Farbkontrast ausreichend

---

## 📝 Content Guidelines (Text & SEO)

**Pflichtlektüre:** `docs/text-generierung-prompt.md`

### Positionierung (muss rüberkommen)

- **Praktischer Macher**, kein Theoretiker
- **Hands-on:** Zeigt Schwachstellen + setzt Lösungen mit um
- **Pragmatisch, verständlich, auditfest**
- **Bundesweit verfügbar**

### Tone of Voice

**✅ DO:**
- Fachlich, klar, verständlich
- Konkrete Probleme benennen
- Konkrete Lösungen zeigen
- Nutzen klar machen

**❌ DON'T:**
- Kein Geschwafel, keine leeren Phrasen
- Kein Motivationsquatsch
- Keine Garantien ("Audit bestehen garantiert")
- Kein Keyword-Stuffing

### SEO-Vorgaben (pro Seite)

- **1 Hauptkeyword** (in H1, Meta Title, ersten 100 Wörtern)
- **2-4 Nebenkeywords** (natürlich im Text verteilt)
- **Meta Title:** max 55-60 Zeichen
- **Meta Description:** max 150-160 Zeichen

### Top Keywords (priorisiert)

1. Lebensmittelaudits
2. HACCP
3. HACCP Schulung
4. QM Lebensmittel
5. Lebensmittelqualität
6. Lebensmittelsicherheit
7. QM-Software Lebensmittel

**Vollständige Liste:** `docs/keyword-recherche.md`

### Call-to-Action (Standard)

Immer sachlich, nie aufdringlich:

```html
<a class="btn btn-primary" href="/kontakt">
  Unverbindliches Erstgespräch vereinbaren
</a>
```

Varianten:
- "Jetzt Kontakt aufnehmen"
- "Kostenlose Beratung anfragen"
- "Unverbindlich beraten lassen"

**Niemals:**
- "JETZT ZUSCHLAGEN!"
- "Nicht verpassen!"
- Countdown-Timer oder FOMO-Tactics

---

## 🚀 Build & Deploy

### NPM Scripts

```bash
# Development (Sass watch + Live Server)
npm run dev:site

# Production Build
npm run build:site

# Nur Sass kompilieren
sass src/assets/scss/main.scss dist/assets/css/main.css

# Server starten (für dist/)
npm run serve:site
```

### Build-Prozess

1. **Sass Compilation:** `src/assets/scss/main.scss` → `dist/assets/css/main.css`
2. **PostHTML:** Partials in HTML-Dateien einfügen
3. **Font/Asset Copy:** FontAwesome, Roboto, DM Serif

### Deployment Workflow

```bash
# 1. Änderungen machen (src/)
# 2. Build
npm run build:site

# 3. Testen
npm run serve:site
# → http://localhost:8080

# 4. Prüfen
# - Visuell testen
# - Definition of Done checken
# - HTML validieren

# 5. Commit
git add .
git commit -m "feat: neue Section XY"
```

---

## ⛔️ Verboten (NIEMALS tun)

### HTML
- ❌ Inline-CSS: `<div style="padding: 20px">`
- ❌ Inline-JS: `<button onclick="...">`
- ❌ Row-Margins: `<div class="row mx-2">`
- ❌ Mehrere H1 pro Seite

### SCSS
- ❌ Pixel-Werte: `padding: 24px;`
- ❌ Hardcoded rem ohne $spacer: `margin: 1.5rem;`
- ❌ !important ohne Kommentar
- ❌ Tiefe Verschachtelung (>3 Ebenen)
- ❌ Bootstrap Utilities überschreiben

### Content
- ❌ Keyword-Stuffing
- ❌ Marketing-Geschwafel
- ❌ Leere Versprechen
- ❌ Garantien ("Audit bestehen garantiert")

### Build
- ❌ Direkt in `dist/` editieren (wird überschrieben!)
- ❌ Committen ohne Build-Test
- ❌ Node_modules committen

---

## 📚 Projektstruktur (Quick Reference)

```
as-qm/
├── docs/                          # Dokumentation
│   ├── definition-of-done.md     # DoD Checklist
│   ├── keyword-recherche.md      # SEO Keywords
│   └── text-generierung-prompt.md # Content Guidelines
├── src/                           # Source Files
│   ├── assets/
│   │   ├── scss/                 # Sass Styles
│   │   ├── images/               # Bilder
│   │   ├── fonts/                # Custom Fonts
│   │   └── webfonts/             # FontAwesome
│   ├── partials/                 # HTML Partials
│   │   ├── navbar.html
│   │   └── footer.html
│   ├── index.html                # Landingpage
│   ├── philosophie.html          # Philosophie-Seite
│   ├── kontakt.html              # Kontakt-Seite
│   └── send.php                  # Contact Form Handler
├── dist/                          # Build Output (NICHT EDITIEREN!)
├── scripts/                       # Build Scripts
│   ├── build-site.js
│   ├── sync-site.js
│   └── dev-site.js
├── SPACING-GUIDELINE.md          # Spacing Rules (21KB!)
├── CLAUDE.md                     # Diese Datei
├── package.json
└── README.md
```

---

## 🎯 Workflow Summary

### Neue Seite erstellen

1. **Datei anlegen:** `src/neue-seite.html`
2. **Template verwenden:** Hero + Sections aus SPACING-GUIDELINE.md
3. **Partials einbinden:** `<include src="partials/navbar.html">`
4. **Content Guidelines:** docs/text-generierung-prompt.md
5. **Build:** `npm run build:site`
6. **Test:** Visuell + Definition of Done
7. **Commit:** Mit aussagekräftiger Message

### Spacing ändern

1. **SPACING-GUIDELINE.md konsultieren**
2. **Nur $spacer-Multiplikatoren verwenden**
3. **SCSS editieren** (nicht HTML-Klassen überschreiben)
4. **Responsive testen**
5. **Build + Test**

### Content aktualisieren

1. **docs/text-generierung-prompt.md lesen**
2. **Tone of Voice einhalten**
3. **Keywords natürlich einbauen**
4. **SEO-Meta prüfen**
5. **Definition of Done checken**

---

## 🔍 Debugging & Troubleshooting

### Build schlägt fehl

```bash
# Sass-Fehler?
sass src/assets/scss/main.scss dist/assets/css/main.css

# Node Scripts?
node scripts/build-site.js

# Dependencies fehlen?
npm install
```

### Spacing sieht falsch aus

1. DevTools öffnen, computed styles prüfen
2. Suchen nach hardcoded Werten: `grep -r "padding.*px" src/assets/scss/`
3. SPACING-GUIDELINE.md Hierarchie prüfen

### HTML nicht valid

1. W3C Validator: https://validator.w3.org/
2. Häufige Fehler:
   - Fehlende Alt-Texte
   - Falsche Verschachtelung
   - Doppelte IDs

---

## 📖 Wichtige Dateien (immer zuerst lesen)

1. **SPACING-GUIDELINE.md** (21KB) – Bei JEDEM Layout-Task
2. **docs/definition-of-done.md** – Vor JEDEM Commit
3. **docs/text-generierung-prompt.md** – Bei JEDEM Content-Task
4. **docs/keyword-recherche.md** – Für SEO-Optimierung

---

## 💡 Quick Wins

- **Neue Section?** → Templates aus SPACING-GUIDELINE.md kopieren
- **Spacing fix?** → Suche nach px-Werten, ersetze mit $spacer
- **SEO-Check?** → docs/definition-of-done.md Checkliste
- **Content-Frage?** → docs/text-generierung-prompt.md

---

**Version:** 1.0
**Letzte Aktualisierung:** Januar 2026
**Projekt:** A&S QM Beratung Website

🎯 **Diese Datei ist dein KI-Gedächtnis. Bei Unsicherheit: HIER NACHSCHAUEN!**
