# Definition of Done & SEO-Checkliste für HTML/CSS/JS Landingpage

## HTML

- [ ] Semantische Struktur mit `header`, `main`, `nav`, `section`, `article`, `footer`, `button`, `form`.
- [ ] Genau ein `h1` pro Seite, logisch gestaffelte `h2`/`h3`-Überschriften.
- [ ] Keine übermäßig tiefe DOM-Struktur, unnötige Wrapper entfernt.
- [ ] Kein Inline-CSS oder Inline-JS.
- [ ] Alle Bilder haben sinnvolle `alt`-Texte.
- [ ] Formularelemente korrekt gelabelt (`label` + `for`, ARIA wo nötig).
- [ ] Fokusreihenfolge logisch, Fokuszustände sichtbar.
- [ ] HTML valide geprüft.

## Sass/CSS

- [ ] Verabredete Architektur (z. B. BEM, ITCSS) eingehalten.
- [ ] Projektstruktur: z. B. `base/`, `layout/`, `components/`, `utilities/`.
- [ ] Mobile-first, sinnvolle Breakpoints, Layout via Flexbox/Grid.
- [ ] Design Tokens/Variablen für Farben, Typografie, Abstände.
- [ ] Keine tief verschachtelten Selektoren, Spezifität niedrig gehalten.
- [ ] `!important` nur in Ausnahmefällen.
- [ ] Unbenutzte Styles entfernt, finaler CSS-Output minifiziert.

## JavaScript

- [ ] Code in ES-Modulen organisiert (DOM, Logik, Utilities).
- [ ] Nur notwendige Funktionalität per JS umgesetzt (Progressive Enhancement).
- [ ] Event-Listener zentral organisiert und bei Bedarf wieder entfernt.
- [ ] Netzwerk-Requests mit Fehlerhandling (Timeout, Fallback, User-Feedback).
- [ ] Keine „God Files“, Funktionen klein, Namen sprechend.
- [ ] Konfiguration (API-URLs, Limits) zentral definiert.

## Performance

- [ ] Initiale Page-Weight geprüft und im Zielrahmen.
- [ ] CSS und JS minifiziert, Gzip/Brotli-Kompression aktiv.
- [ ] Nicht-kritische Skripte mit `defer` oder `async` eingebunden.
- [ ] Bilder optimiert (WebP/AVIF, `srcset`/`sizes`, Lazy-Loading).
- [ ] Webfonts sparsam, Fallback-Fonts definiert.
- [ ] Lighthouse-/WebPageTest-Audit durchgeführt, Performance-Score im Zielbereich.

## Skalierbarkeit & Struktur

- [ ] Klare Projektstruktur (z. B. `src/html`, `src/styles`, `src/js`, `assets/`).
- [ ] UI-Pattern als wiederverwendbare Komponenten umgesetzt.
- [ ] Keine hartkodierten Werte, die spätere Erweiterung erschweren.
- [ ] Struktur erlaubt einfaches Hinzufügen weiterer Sektionen/Varianten.

## Qualitätssicherung & Sicherheit

- [ ] ESLint/Stylelint/Prettier konfiguriert und im CI integriert.
- [ ] Mindestens Smoke-/E2E-Test für kritische Flows vorhanden.
- [ ] Accessibility-Check ohne kritische Blocker.
- [ ] Kein Secret oder sensibler Wert im Client-JS hinterlegt.
- [ ] Kein unkontrolliertes `innerHTML` oder vergleichbare XSS-Risiken.
- [ ] Sicherheits-Header gesetzt (CSP, X-Frame-Options, X-XSS-Protection).
- [ ] Sichere Kommunikation (HTTPS, HSTS).
- [ ] Schutz vor gängigen Angriffen (XSS, CSRF, SQL-Injection, wenn Backend im Spiel ist).

## Infrastruktur & Deployment

- [ ] Deployment-Pipeline (CI/CD) konfiguriert (z. B. GitHub Actions, GitLab CI, Jenkins).
- [ ] Automatisierte Builds und Deployments für verschiedene Umgebungen (Dev, Staging, Prod).
- [ ] Monitoring und Logging eingerichtet (z. B. Sentry, LogRocket, Google Analytics).
- [ ] Fehlermeldungen und Ausnahmen werden protokolliert und an ein Monitoring-Tool gesendet.

## Barrierefreiheit & Internationalisierung

- [ ] Barrierefreiheit von Anfang an berücksichtigt (WCAG-2.1, aXe-Tests).
- [ ] Internationalisierung (i18n) und Lokalisierung (l10n) vorbereitet (Sprachdateien, dynamische Texte).

## Dokumentation & Wartung

- [ ] Projektstruktur und wichtige Entscheidungen dokumentiert (README, Wiki, Architekturdiagramme).
- [ ] Wartbarkeit und Erweiterbarkeit im Blick (klare Modulstruktur, gute Kommentare, Design-System).

## Benutzererfahrung

- [ ] Benutzerfreundlichkeit und Usability von Anfang an berücksichtigt (klare Navigation, intuitive Bedienung).
- [ ] Feedback-Mechanismen für Nutzer (Formularbestätigungen, Fehlermeldungen).

## Rechtliche Aspekte

- [ ] Datenschutz (DSGVO) und Cookie-Consent umgesetzt.
- [ ] Impressum und Datenschutzerklärung vorhanden.

## SEO-Optimierung

- [ ] Keyword-Recherche durchgeführt.
- [ ] Logische Seitenstruktur und sinnvolle URL-Struktur.
- [ ] Einzigartiger, hochwertiger Content mit echtem Mehrwert.
- [ ] Überschriften (H1, H2, H3) sinnvoll strukturiert.
- [ ] Aussagekräftiger Titel (max. 60 Zeichen) pro Seite.
- [ ] Meta-Beschreibung (max. 160 Zeichen) mit Hauptkeyword.
- [ ] Hauptkeyword strategisch in Titel, H1, ersten 100 Wörtern, URL, Bildernamen und Alt-Texten platziert.
- [ ] Interne Verlinkung zwischen relevanten Seiten.
- [ ] Mobile-Optimierung (mobile-first).
- [ ] Ladezeiten optimiert (minimiertes HTML, CSS, JS, komprimierte Bilder, CDN).
- [ ] SSL-Zertifikat aktiviert (HTTPS).
- [ ] Sitemap und Robots.txt erstellt und hinterlegt.
- [ ] Schema-Markup (strukturierte Daten) für Rich Snippets hinzugefügt.
- [ ] Google Search Console angelegt und Website verifiziert.
- [ ] Google Analytics eingerichtet.
- [ ] Regelmäßige SEO-Audits mit Tools wie Screaming Frog oder SEMrush geplant.
