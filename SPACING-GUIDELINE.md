# Spacing Guideline - A&S QM Beratung

> **Konsistente, Bootstrap-basierte Spacing-Standards für das gesamte Projekt**
>
> Version 1.0 | Letzte Aktualisierung: Januar 2026

---

## 📐 Spacing Foundation

Dieses Projekt verwendet **Bootstrap's Spacing Scale** als Foundation für alle Abstände (Margins, Paddings, Gaps).

### Die `$spacer` Variable

```scss
$spacer: 1rem; // 16px bei Standard-Browser-Settings
```

Alle Spacings basieren auf dieser Variable für **maximale Konsistenz** und einfache, projektweite Anpassungen.

---

## 🎯 Spacing Scale

### Bootstrap Standard Scale

| Level | Wert | Berechnung | Pixels | Verwendung |
|-------|------|------------|--------|-----------|
| **0** | `0` | `0` | 0px | Kein Spacing |
| **1** | `0.25rem` | `$spacer * 0.25` | 4px | Sehr eng (Icons, Fine-Tuning) |
| **2** | `0.5rem` | `$spacer * 0.5` | 8px | Eng (kleine Gaps) |
| **3** | `1rem` | `$spacer * 1` | 16px | Standard (Default Spacing) |
| **4** | `1.5rem` | `$spacer * 1.5` | 24px | Mittel (Cards, Abschnitte) |
| **5** | `3rem` | `$spacer * 3` | 48px | Groß (Sections, Hero) |

### Projekt-spezifische Erweiterungen

Für spezielle Anforderungen verwenden wir Multiplikatoren:

```scss
// Beispiele
padding: $spacer * 0.75;  // 0.75rem = 12px
gap: $spacer * 1.25;      // 1.25rem = 20px
padding: $spacer * 2;     // 2rem = 32px
padding: $spacer * 2.5;   // 2.5rem = 40px
padding: $spacer * 3.5;   // 3.5rem = 56px
```

---

## 🛠️ Wann welche Methode?

### 1. **Component-Level CSS** (SCSS-Dateien)

✅ **Verwenden für:**
- Wiederkehrende Components (Cards, Buttons, Navbars)
- Komplexe Komponenten mit festen Spacings
- Responsive Spacing-Anpassungen innerhalb eines Components

```scss
// Beispiel: Card Component
.feature-card {
  padding: $spacer * 2;        // 2rem
  margin-bottom: $spacer * 1.5; // 1.5rem
  gap: $spacer;                 // 1rem
}
```

**Vorteile:**
- Semantische Klassennamen
- Zentrale Wartung
- Konsistenz über ähnliche Komponenten

---

### 2. **Bootstrap Utility Classes** (HTML)

✅ **Verwenden für:**
- Layout-Spacing (Container, Rows, Cols)
- One-off Adjustments
- Prototyping und schnelle Iterationen
- Margin/Padding Overrides

```html
<!-- Beispiele -->
<div class="mt-5">           <!-- margin-top: 3rem -->
<div class="p-4">            <!-- padding: 1.5rem -->
<div class="mb-3">           <!-- margin-bottom: 1rem -->
<div class="px-2 py-4">      <!-- padding-x: 0.5rem, padding-y: 1.5rem -->
<div class="g-4">            <!-- gap: 1.5rem (Grid) -->
```

**Verfügbare Utilities:**
- `m-{size}` = margin all sides
- `mt-`, `mb-`, `ms-`, `me-` = margin top, bottom, start, end
- `mx-`, `my-` = margin x-axis, y-axis
- `p-{size}` = padding all sides
- `pt-`, `pb-`, `ps-`, `pe-` = padding sides
- `px-`, `py-` = padding x-axis, y-axis
- `g-{size}` = gap (für Grid/Flexbox)

**Responsive Variants:**
```html
<div class="p-2 p-lg-4">     <!-- padding: 0.5rem mobile, 1.5rem desktop -->
<div class="mb-3 mb-md-5">   <!-- margin-bottom responsive -->
```

---

### 3. **Global Custom Utilities** (utilities/_custom.scss)

✅ **Verwenden für:**
- Projektweite, wiederverwendbare Patterns
- Semantic Spacing-Names
- Spacing, das nicht in Bootstrap's Standard-Scale passt

```scss
// Beispiel: Section Spacing Utility
.py-section {
  padding-top: 5.5rem;
  padding-bottom: 5.5rem;

  @media (min-width: 992px) {
    padding-top: 9rem;
    padding-bottom: 9rem;
  }
}
```

**Aktuelle Custom Utilities:**
- `.py-section` - Standard Section Spacing
- `.bg-section-soft` - Soft background color für Sections
- `.row-spacious` - Luftige Content-Rows mit horizontalem Whitespace

### .row-spacious

Utility für luftige Content-Rows mit horizontalem Whitespace - für atmendes, luftiges Design.

**Verwendung:**
```html
<div class="row row-spacious g-4">
  <!-- Content -->
</div>
```

**Werte:**
- **Mobile:** `0.5rem` (8px) horizontal margin
- **Desktop (≥992px):** `3rem` (48px) horizontal margin

**Wann verwenden:**
- Content Sections mit Cards/Grid
- Sections, die "atmen" sollen
- Überall wo visueller Whitespace gewünscht
- Nur auf äußeren Rows, nicht auf nested inner rows

**Wann NICHT verwenden:**
- Hero Sections (nutzen stattdessen Column-Padding: `ps-lg-5 pe-xl-5`)
- Full-Width Sections ohne Whitespace-Bedarf
- Footer
- Nested inner rows (nur outer rows)

---

## 📦 Spacing Patterns im Projekt

### Section Spacings

```html
<!-- Standard Section mit Spacing -->
<section class="py-section">
  <div class="container">
    <div class="row mx-2 mx-lg-5">
      <!-- Content -->
    </div>
  </div>
</section>

<!-- Section mit Soft Background -->
<section class="bg-section-soft py-section">
  <!-- Content -->
</section>
```

**Werte:**
- **Mobile:** `5.5rem` top/bottom (88px)
- **Desktop (≥992px):** `9rem` top/bottom (144px)

---

### Card Components

```scss
// Standard Card Padding
.feature-card {
  padding: $spacer * 2;  // 2rem (32px)
}

// Large Card Padding
.philosophie-card {
  padding: $spacer * 2.5;  // 2.5rem (40px)
}

// Mobile Responsive
@media (max-width: 991.98px) {
  .philosophie-card {
    padding: $spacer * 2;  // 2rem (32px)
  }
}
```

---

### Grid Gaps

```html
<!-- Standard Grid Gap -->
<div class="row g-4">  <!-- gap: 1.5rem -->

<!-- Large Grid Gap -->
<div class="row g-5">  <!-- gap: 3rem -->
```

**Empfohlene Gap-Größen:**
- `g-2` (0.5rem) - Sehr eng, z.B. Icon-Listen
- `g-3` (1rem) - Standard, kompakte Grids
- `g-4` (1.5rem) - Standard Cards, Features
- `g-5` (3rem) - Luftige Layouts, große Components

---

### Typography Spacing

```scss
// Heading Margins
.philosophie-card-title {
  margin-bottom: $spacer;  // 1rem
}

.philosophie-pillar-title {
  margin-bottom: $spacer * 0.75;  // 0.75rem
}

// Paragraph Spacing (nutze Bootstrap Utilities)
<p class="mb-3">   <!-- margin-bottom: 1rem -->
<p class="mb-4">   <!-- margin-bottom: 1.5rem -->
```

---

## ✅ Do's and Don'ts

### ✅ DO

1. **Nutze $spacer Multiplikatoren in SCSS**
   ```scss
   padding: $spacer * 2.5;  // ✅ Gut
   ```

2. **Nutze Bootstrap Utilities für Layout**
   ```html
   <div class="mt-5 px-4">  <!-- ✅ Gut -->
   ```

3. **Halte dich an die Spacing Scale**
   ```scss
   gap: $spacer * 1.5;  // ✅ entspricht spacing-4
   ```

4. **Kommentiere non-standard Werte**
   ```scss
   padding: $spacer * 2.75;  // 2.75rem - Custom für Hero-CTA
   ```

5. **Verwende responsive Utilities**
   ```html
   <div class="p-2 p-lg-4">  <!-- ✅ Responsive -->
   ```

---

### ❌ DON'T

1. **❌ Hardcode keine Pixel-Werte**
   ```scss
   padding: 24px;  // ❌ Schlecht
   padding: $spacer * 1.5;  // ✅ Gut
   ```

2. **❌ Nutze keine nicht-Bootstrap rem-Werte ohne Kommentar**
   ```scss
   margin: 1.7rem;  // ❌ Warum 1.7rem? Unklar
   ```

3. **❌ Überschreibe nicht Bootstrap utilities in CSS**
   ```scss
   .my-component {
     .mt-5 {  // ❌ Schlecht - überschreibt global
       margin-top: 2rem !important;
     }
   }
   ```

4. **❌ Erstelle keine redundanten Utilities**
   ```scss
   .my-spacing-3 {  // ❌ Bootstrap hat bereits .p-3
     padding: 1rem;
   }
   ```

5. **❌ Nutze kein `!important` für Spacings**
   ```scss
   margin: $spacer !important;  // ❌ Code Smell
   ```

---

## 📚 Component Spacing Reference

### Philosophie Page Components

| Component | Padding | Gap/Margin | Responsive |
|-----------|---------|------------|------------|
| `.philosophie-card` | `2.5rem` → `2rem` (mobile) | `margin-bottom: 1.5rem` (icon) | ✅ |
| `.philosophie-visual-card` | `3rem` → `2rem` (mobile) | `gap: 2.5rem` | ✅ |
| `.philosophie-statement` | `2.5rem` → `2rem` (mobile) | - | ✅ |
| `.philosophie-quote` | `3rem 2.5rem` → `2rem 1.5rem` | - | ✅ |
| `.philosophie-difference-card` | `2.5rem` → `2rem` (mobile) | - | ✅ |

### Card Components

| Component | Padding | Responsive |
|-----------|---------|------------|
| `.feature-card` | `2rem` | ❌ |
| `.metric-card` | `1.5rem` | ❌ |

### Footer & Contact

| Component | Padding | Gap | Responsive |
|-----------|---------|-----|------------|
| `.footer-panel` | `2rem` | - | ❌ |
| `.footer-contact` | - | `1rem` | ❌ |
| `.contact-card` | `2.5rem` | - | ❌ |
| `.contact-info-card` | `2rem` | - | ❌ |
| `.contact-hero-inner` | `3.25rem 2.5rem` → `2.5rem 1.75rem` | - | ✅ |

---

## 🎨 Spacing Decision Tree

```
Brauche ich Spacing?
│
├─ Ist es ein Layout-Spacing (Margin zwischen Elementen)?
│  └─ ✅ Nutze Bootstrap Utility Classes (mt-*, mb-*, etc.)
│
├─ Ist es ein Component-internes Spacing (Card Padding)?
│  └─ ✅ Definiere in Component SCSS mit $spacer
│
├─ Ist es ein globales, wiederverwendbares Pattern?
│  └─ ✅ Erstelle Custom Utility in utilities/_custom.scss
│
└─ Ist es ein einmaliges, nicht-standard Spacing?
   └─ ⚠️ Verwende $spacer Multiplikator mit Kommentar
```

---

## 🚀 Neue Seiten/Components entwickeln

### Schritt-für-Schritt

1. **Plane das Layout mit Bootstrap Grid**
   ```html
   <section class="py-section">
     <div class="container">
       <div class="row g-4">  <!-- Bootstrap Gap -->
   ```

2. **Nutze Bootstrap Utilities für Spacing**
   ```html
   <h2 class="mb-4">Title</h2>
   <p class="mb-3">Text</p>
   ```

3. **Erstelle Component SCSS mit $spacer**
   ```scss
   .my-card {
     padding: $spacer * 2;
     margin-bottom: $spacer * 1.5;
   }
   ```

4. **Teste Responsive**
   ```scss
   @media (max-width: 991.98px) {
     .my-card {
       padding: $spacer * 1.5;
     }
   }
   ```

---

## 🔍 Debugging Spacing Issues

### Häufige Probleme

**Problem:** Spacing sieht inkonsistent aus
- ✅ **Lösung:** Prüfe, ob alle Werte auf $spacer basieren
- ✅ **Tool:** Suche nach hardcoded Werten: `grep -r "padding.*px" src/`

**Problem:** Mobile Spacing zu groß/klein
- ✅ **Lösung:** Nutze responsive Utilities oder Media Queries
- ✅ **Beispiel:** `<div class="p-2 p-lg-4">`

**Problem:** Vertikaler Rhythm nicht konsistent
- ✅ **Lösung:** Verwende konsequent `mb-3`, `mb-4`, `mb-5` für Sections
- ✅ **Pattern:** Heading (`mb-4`) → Content (`mb-3`) → Section end

---

## 📖 Ressourcen

### Interne Dateien
- **Spacing Variables:** `src/assets/scss/abstracts/_variables.scss`
- **Custom Utilities:** `src/assets/scss/utilities/_custom.scss`
- **Component Styles:** `src/assets/scss/components/`, `src/assets/scss/pages/`

### Bootstrap Dokumentation
- [Bootstrap Spacing Utilities](https://getbootstrap.com/docs/5.3/utilities/spacing/)
- [Bootstrap Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Bootstrap Breakpoints](https://getbootstrap.com/docs/5.3/layout/breakpoints/)

---

## 📝 HTML Structure Patterns

### Standard Section Structure

**✅ Richtig:**
```html
<section class="py-section" id="section-id">
  <div class="container">
    <div class="row">  <!-- ❌ KEINE mx-2 mx-lg-5 oder andere Row-Level Margins -->
      <div class="col-lg-12">
        <!-- Content -->
      </div>
    </div>
  </div>
</section>
```

**❌ Falsch:**
```html
<section class="py-section">
  <div class="container">
    <div class="row mx-2 mx-lg-5">  <!-- ❌ Nicht konsistent, nicht Bootstrap-Standard -->
      <!-- Content -->
    </div>
  </div>
</section>
```

### Wichtige Regeln

1. **Keine Row-Level Margins**
   - ❌ Niemals `mx-2`, `mx-lg-5` oder ähnliche Margins auf Rows
   - ✅ Container und Columns handhaben Spacing automatisch

2. **Nutze Container-Padding**
   - Bootstrap Container haben bereits responsive Paddings
   - Keine zusätzlichen Margins auf Rows nötig

3. **Column-Level Spacing für Feintuning**
   - Wenn nötig: Padding auf Columns (`ps-lg-5`, `pe-xl-5`)
   - Nur bei speziellen Layouts wie Hero Sections

---

## 🎯 Grid Gap Semantic Guide

### Gap Hierarchie & Verwendung

| Gap Class | Wert | Verwendung | Beispiel |
|-----------|------|------------|----------|
| `g-2` | `0.5rem` | **Sehr eng** - Icon-Listen, kompakte UI-Elemente | Social Media Icons |
| `g-3` | `1rem` | **Kompakt** - Kleinere Card-Grids, Form-Elemente | Training Cards, Checkmarks |
| **`g-4`** | **`1.5rem`** | **Standard Card-Grids** (DEFAULT) | Feature Cards, Content Cards |
| `g-5` | `3rem` | **Großzügig** - Hero Sections, große Components | Approach Section, Hero |

### gy-5 gx-5 vs g-5

**Für Hero Sections & 2-Column-Layouts:**
```html
<!-- ✅ Empfohlen: Separate Kontrolle über Y- und X-Gap -->
<div class="row gy-5 gx-5">
  <div class="col-lg-7">...</div>
  <div class="col-lg-5">...</div>
</div>

<!-- ❌ Vermeiden: g-5 allein -->
<div class="row g-5">  <!-- Funktioniert, aber weniger explizit -->
```

**Warum `gy-5 gx-5`?**
- Explizite Kontrolle über vertikale und horizontale Gaps
- Konsistente Lesbarkeit des Codes
- Einfachere responsive Anpassungen

### Default-Empfehlungen

- **Card-Grids (3-4 Spalten):** `g-4`
- **Hero Sections:** `gy-5 gx-5`
- **Form Elements:** `g-3`
- **Icon-Listen:** `g-2`

---

## 📐 Heading Margin Hierarchie

### Margin-Bottom Regeln

```html
<!-- Main Section Heading -->
<h2 class="mb-5">Hauptüberschrift der Section</h2>

<!-- Sub-Heading / Lead Paragraph -->
<h3 class="mb-4">Unterüberschrift</h3>
<p class="h5 mb-4">Lead-Paragraph</p>

<!-- Card Heading -->
<h5 class="mb-3">Card-Titel</h5>

<!-- Standard Paragraph -->
<p class="mb-4">Standard-Text zwischen Sections</p>

<!-- Last Paragraph in Card -->
<p class="mb-0">Letzter Absatz (kein Margin)</p>
```

### Visuelle Hierarchie

```
┌─────────────────────────────────────┐
│ <h2 class="mb-5">                   │  Main Section Heading
│                                     │  ↓ 3rem spacing
│ <h3 class="mb-4">                   │  Sub-Heading
│                                     │  ↓ 1.5rem spacing
│ <p class="mb-4">                    │  Content
│                                     │  ↓ 1.5rem spacing
│ <div class="card">                  │
│   <h5 class="mb-3">                 │  Card Heading
│                                     │  ↓ 1rem spacing
│   <p class="mb-0">                  │  Card Content
│ </div>                              │
└─────────────────────────────────────┘
```

### Best Practices

1. **Konsistenz über Hierarchie**
   - `mb-5` nur für Main Section Headings (h2)
   - `mb-4` für Sub-Headings (h3, h5 Lead)
   - `mb-3` für Card Headings (h5 in Cards)

2. **Letztes Element ohne Margin**
   - Immer `mb-0` für letztes Element in Container
   - Verhindert ungewollten Whitespace

3. **Responsive nicht auf Heading-Level**
   - Heading-Margins bleiben fix
   - Responsive Spacing auf Section-Level (`.py-section`)

---

## 📦 HTML Templates

### 1. Standard Section mit Card Grid

```html
<section class="py-section" id="section-id">
  <div class="container">
    <div class="row row-spacious">  <!-- ✅ row-spacious für luftiges Design -->
      <div class="col-lg-12">
        <h2 class="text-strong text-center mb-5">
          <strong>Section Heading</strong>
        </h2>
        <p class="text-center text-muted mb-5">
          Optional: Lead paragraph oder Einleitung
        </p>
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <div class="feature-card bg-white h-100">
              <h5 class="mb-3">Card Title</h5>
              <p class="text-muted mb-0">Card content text here.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card bg-white h-100">
              <h5 class="mb-3">Card Title</h5>
              <p class="text-muted mb-0">Card content text here.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="feature-card bg-white h-100">
              <h5 class="mb-3">Card Title</h5>
              <p class="text-muted mb-0">Card content text here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### 2. Hero Section Standard

```html
<header class="hero hero--qm">
  <include src="partials/navbar.html"></include>
  <div class="container hero-body min-vh-100" id="start">
    <div class="row hero-row align-items-stretch gy-5 gx-5">
      <!-- Content Column -->
      <div class="col-lg-7 order-2 order-lg-1 pe-lg-5 pe-xl-5">
        <span class="hero-tag">Tag / Eyebrow</span>
        <h1 class="hero-title mt-4">
          Hero Heading
        </h1>
        <p class="lead text-muted-strong mt-4">
          Hero lead paragraph text.
        </p>
        <div class="d-flex flex-wrap gap-4 mt-5">
          <a class="btn btn-primary btn-hero-primary" href="#">
            Primary CTA
          </a>
          <a class="btn btn-outline-light btn-hero-outline" href="#">
            Secondary CTA
          </a>
        </div>
      </div>

      <!-- Media Column -->
      <div class="col-lg-5 order-1 order-lg-2 ps-lg-5 ps-xl-5">
        <div class="hero-media hero-media--bg" role="img" aria-label="Description"></div>
      </div>
    </div>
  </div>
</header>
```

**Hero Section Regeln:**
- Immer `gy-5 gx-5` (nicht nur `g-5`)
- Symmetrisches Column-Padding: `pe-lg-5 pe-xl-5` links, `ps-lg-5 ps-xl-5` rechts
- Order-Classes für Mobile: Content zuerst (`order-2 order-lg-1`), Media zweite (`order-1 order-lg-2`)

---

### 3. Two-Column Content Section

```html
<section class="bg-section-soft py-section" id="approach">
  <div class="container">
    <div class="row align-items-center g-5 row-spacious">  <!-- ✅ row-spacious -->
      <div class="col-lg-7 order-2 order-lg-1">
        <h2 class="text-strong mb-4">
          <strong>Section Heading</strong>
        </h2>
        <p class="h5 text-strong mt-4 mb-4">
          Lead paragraph or introduction.
        </p>
        <p class="mb-4">
          Content paragraph text here.
        </p>
      </div>
      <div class="col-lg-5 order-1 order-lg-2">
        <img class="img-fluid rounded-4 shadow-sm" src="..." alt="..." />
      </div>
    </div>
  </div>
</section>
```

---

### 4. Text-Only Section mit CTA

```html
<section class="py-section" id="cta">
  <div class="container">
    <div class="row justify-content-center row-spacious">  <!-- ✅ row-spacious -->
      <div class="col-lg-10 text-center">
        <h2 class="text-strong mb-4">
          <strong>Call-to-Action Heading</strong>
        </h2>
        <p class="h5 text-strong mb-4">
          Sub-heading or lead text.
        </p>
        <p class="text-muted mb-5">
          Supporting paragraph text.
        </p>
        <div class="d-flex flex-wrap gap-4 justify-content-center">
          <a class="btn btn-primary btn-lg px-5" href="#">
            Primary Action
          </a>
          <a class="btn btn-outline-primary btn-lg px-5" href="#">
            Secondary Action
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

## ✅ Validation Checklists

### Spacing Audit Checklist

Nutze diese Checkliste, um bestehende Seiten auf Spacing-Konsistenz zu prüfen:

**Section-Level:**
- [ ] Alle Sections nutzen `.py-section`
- [ ] Sections mit Soft-Background nutzen `.bg-section-soft`
- [ ] Keine Custom Section-Paddings in CSS

**Row-Level:**
- [ ] KEINE `mx-2`, `mx-lg-5` oder andere Margins auf Rows
- [ ] Rows innerhalb von Containers (keine direkten Container-Margins)
- [ ] Hero-Sections: `gy-5 gx-5` (nicht nur `g-5`)

**Grid Gaps:**
- [ ] Card-Grids nutzen `g-4` als Standard
- [ ] Hero-Sections nutzen `gy-5 gx-5`
- [ ] Form-Grids nutzen `g-3`
- [ ] Icon-Listen nutzen `g-2`

**Heading Margins:**
- [ ] Main h2 Headings: `mb-5`
- [ ] Sub h3/Lead Headings: `mb-4`
- [ ] Card h5 Headings: `mb-3`
- [ ] Standard Paragraphs: `mb-4`
- [ ] Letzte Elemente in Cards: `mb-0`

**Column-Level:**
- [ ] KEINE `ps-3 ps-md-0` auf einzelnen Elementen
- [ ] Column-Padding nur bei Hero Sections (symmetrisch!)
- [ ] Responsive Padding: `ps-lg-5 pe-xl-5` Muster

**SCSS Files:**
- [ ] Alle Spacings nutzen `$spacer` Multiplikatoren
- [ ] Keine hardcoded Pixel-Werte
- [ ] Non-standard Werte sind kommentiert

---

### Neue Seite Checklist

Nutze diese Checkliste beim Erstellen einer neuen Seite:

**1. Planung**
- [ ] Wireframe mit Section-Struktur erstellt
- [ ] Spacing-Pattern identifiziert (Card Grid, Hero, Text, etc.)
- [ ] Templates aus Guideline ausgewählt

**2. HTML Struktur**
- [ ] Section mit `.py-section` begonnen
- [ ] Container und Row korrekt verschachtelt
- [ ] KEINE Row-Level Margins (`mx-*`)
- [ ] Grid Gaps nach Hierarchie gewählt

**3. Headings & Content**
- [ ] Main h2 mit `mb-5`
- [ ] Sub h3/Lead mit `mb-4`
- [ ] Card h5 mit `mb-3`
- [ ] Paragraphs mit `mb-4` oder `mb-0`

**4. Components**
- [ ] Cards nutzen `.feature-card` oder `.philosophie-card`
- [ ] Cards mit `h-100` für gleiche Höhe
- [ ] Letzte Elemente in Cards: `mb-0`

**5. Responsive**
- [ ] Mobile-first Approach (col-, col-md-, col-lg-)
- [ ] Hero Sections: Order-Classes gesetzt
- [ ] Keine Element-Level Responsive-Margins (`ps-3 ps-md-0`)

**6. Testing**
- [ ] Visual QA auf Mobile (<768px)
- [ ] Visual QA auf Tablet (768-991px)
- [ ] Visual QA auf Desktop (≥992px)
- [ ] Spacing konsistent mit anderen Seiten

**7. SCSS (falls Custom Components)**
- [ ] Alle Spacings mit `$spacer`
- [ ] Responsive mit Media Queries
- [ ] Non-standard Werte kommentiert

---

## ✨ Best Practices Summary

1. ✅ **Verwende $spacer** für alle SCSS Spacings
2. ✅ **Nutze Bootstrap Utilities** für HTML Layout
3. ✅ **Halte dich an die Scale** (0.25, 0.5, 1, 1.5, 2, 2.5, 3, 3.5rem)
4. ✅ **Kommentiere** non-standard Werte
5. ✅ **Teste responsive** auf Mobile & Desktop
6. ✅ **Konsistenz** > Perfektion

---

**Bei Fragen oder Anpassungswünschen:**
Dokumentation aktualisieren und Team informieren! 🎯
