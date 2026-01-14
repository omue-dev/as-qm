# Claude Multi-Agent-Workflow für neue Webprojekte

> **📌 HANDOFF-DOKUMENT**
>
> Diese Datei kannst du morgen in dein neues Projekt-Verzeichnis kopieren als `claude-multi-agent-workflow.md`.
> Dann startest du mit dem Prompt: **"Lies claude-multi-agent-workflow.md und lass uns step-by-step den Workflow implementieren"**

---

## 📖 Context (warum wir das machen)

**Ausgangssituation:**
- Du hast das A&S QM Projekt mit Bootstrap 5.3, Sass, PostHTML
- Du willst viele weitere Webseiten mit gleichem Tech-Stack erstellen
- Jedes Mal manuell Setup + SEO + Content-Planung dauert 4-6 Stunden

**Ziel:**
- Automatisierter Workflow: Website-URL → Fertiges Projekt (in ~2 Minuten)
- Mit CLAUDE.md, SEO-Docs, Initial-Content
- Wiederverwendbar für ALLE zukünftigen Projekte

**Beispiel-Projekt:** https://tausendundeinwort.de/ (Traurednerin-Website)

**Ansatz:**
- Multi-Agent-Workflow (6 spezialisierte Agents)
- Template-basiert (65% universal, 35% projekt-spezifisch)
- SEO-first (Keyword-Recherche integriert)

---

## 🎯 Ziel

Vollständig automatisierter Setup-Workflow für neue Webprojekte basierend auf dem A&S QM Tech-Stack.

**Input:** Website-URL (z.B. `https://tausendundeinwort.de/`)
**Output:** Fertiges Projekt mit CLAUDE.md, SEO-Dokumentation, Projekt-Struktur, Initial-Content

---

## 📋 Übersicht

Der Workflow nutzt **6 spezialisierte Agents**, die sequenziell arbeiten:

```
1. Website Analyzer     → Extrahiert Business-Context
2. SEO Researcher       → Generiert Keyword-Strategie
3. Project Generator    → Erstellt Projekt-Struktur
4. CLAUDE.md Generator  → Erstellt projektspezifische CLAUDE.md
5. Docs Generator       → Erstellt SEO/Content-Dokumentation
6. Content Generator    → Erstellt Initial-HTML
```

**Orchestrator** koordiniert alle Agents und managed Datenfluss.

---

## 🏗️ Implementation-Struktur

### Phase 1: Template-Repository Setup (im A&S QM Projekt)

```
as-qm/
├── .automation/                  # NEU: Automation-Verzeichnis
│   ├── templates/               # Template-Dateien
│   │   ├── CLAUDE.template.md   # 65% universal, 35% Platzhalter
│   │   ├── docs/
│   │   │   ├── keyword-recherche.template.md
│   │   │   ├── text-generierung-prompt.template.md
│   │   │   └── definition-of-done.md  (1:1 kopierbar)
│   │   ├── project-structure/
│   │   │   ├── package.template.json
│   │   │   ├── README.template.md
│   │   │   └── .gitignore
│   │   └── partials/
│   │       ├── navbar.template.html
│   │       └── footer.template.html
│   ├── agents/                  # Agent-Implementierungen
│   │   ├── orchestrator.js      # Master-Orchestrator
│   │   ├── agent-1-website-analyzer.js
│   │   ├── agent-2-seo-researcher.js
│   │   ├── agent-3-project-generator.js
│   │   ├── agent-4-claude-md-generator.js
│   │   ├── agent-5-docs-generator.js
│   │   └── agent-6-content-generator.js
│   ├── prompts/                 # Agent-Prompt-Templates
│   ├── schemas/                 # JSON Schemas für Validierung
│   ├── config/
│   └── cli/
│       └── setup-project.js     # CLI Entry Point
```

### Phase 2: Generierte Projekt-Struktur (Output)

```
tausendundeinwort/              # NEU: Generiertes Projekt
├── docs/
│   ├── website-context.json         (Output Agent 1)
│   ├── keyword-recherche.md         (GENERIERT Agent 5)
│   ├── text-generierung-prompt.md   (GENERIERT Agent 5)
│   └── definition-of-done.md        (KOPIERT)
├── src/
│   ├── assets/scss/                 (KOPIERT komplett)
│   ├── partials/
│   │   ├── navbar.html              (GENERIERT Agent 6)
│   │   └── footer.html              (GENERIERT Agent 6)
│   └── index.html                   (GENERIERT Agent 6)
├── scripts/                         (KOPIERT: build-site.js, etc.)
├── CLAUDE.md                        (GENERIERT Agent 4)
├── SPACING-GUIDELINE.md             (KOPIERT)
├── package.json                     (GENERIERT Agent 3)
└── README.md                        (GENERIERT Agent 3)
```

---

## 🤖 Agent-Details

### Agent 1: Website Analyzer

**Input:** Website-URL
**Output:** `docs/website-context.json`

**Aufgaben:**
- Website scrapen (Homepage, About, Services, Contact)
- Business-Context extrahieren:
  - Business Name, Industry, Services
  - Target Audience (B2B/B2C, Demographics, Pain Points)
  - USPs, Tone of Voice
  - Kontaktdaten
  - Existierende SEO-Keywords

**Tools:** WebFetch, WebSearch

**Output-Format:**
```json
{
  "businessName": "Tausendundeinwort",
  "industry": "Copywriting",
  "services": ["Website-Texte", "SEO-Texte"],
  "targetAudience": {
    "type": "B2B",
    "description": "Kleine bis mittelständische Unternehmen",
    "painPoints": ["Fehlende professionelle Texte"]
  },
  "toneOfVoice": "Professionell, verständlich, kreativ",
  "usps": ["Erfahrene Texterin", "SEO-Expertise"],
  "contact": { "email": "...", "phone": "..." }
}
```

---

### Agent 2: SEO & Keyword Researcher

**Input:** `website-context.json` (Agent 1)
**Output:** `keyword-research.json`, `seo-strategy.json`

**Aufgaben:**
- Seed-Keywords generieren (aus Business-Context)
- Keywords expandieren (30-50 Keywords)
- Themencluster erstellen (4-6 Cluster)
- Keywords priorisieren (Volumen, Wettbewerb, Intent)
- Keywords zu Seiten mappen

**Tools:** WebSearch (für Volumen-Schätzung), Read

**Output-Format:**
```json
{
  "seedKeywords": [...],
  "expandedKeywords": [...],
  "clusters": [
    {
      "name": "Services",
      "keywords": ["Website-Texte", "SEO-Texte", ...]
    }
  ],
  "topKeywords": [
    {
      "keyword": "Website-Texte",
      "volume": "high",
      "competition": "medium",
      "priority": "⭐⭐⭐⭐⭐"
    }
  ],
  "pageMapping": {
    "homepage": {
      "mainKeyword": "Website-Texte",
      "secondaryKeywords": ["SEO-Texte", ...]
    }
  }
}
```

---

### Agent 3: Project Structure Generator

**Input:** `website-context.json`, `seo-strategy.json`
**Output:** Komplette Projekt-Struktur

**Aufgaben:**
- Verzeichnisse erstellen (src/, dist/, docs/, scripts/)
- Build-Scripts kopieren (1:1 von A&S QM)
- SCSS-Architektur kopieren (1:1)
- `package.json` generieren (Name, Description anpassen)
- `README.md` generieren
- `.gitignore` kopieren

**Tools:** File operations

---

### Agent 4: CLAUDE.md Generator

**Input:** `CLAUDE.template.md`, `website-context.json`, `seo-strategy.json`
**Output:** `CLAUDE.md` (projektspezifisch)

**Aufgaben:**
- Template laden
- Universelle Sections (65%) 1:1 übernehmen
- Projekt-spezifische Sections (35%) generieren:
  - Content Guidelines (Positionierung, Tone of Voice, Zielgruppe)
  - SEO-Vorgaben (Top Keywords, Meta-Templates)
  - Call-to-Action (generiert aus Services)

**Tools:** Handlebars (für Template-Rendering)

**Template-Platzhalter:**
- `{{PROJECT_NAME}}` → `context.businessName`
- `{{INDUSTRY}}` → `context.industry`
- `{{context.toneOfVoice}}` → Tone of Voice
- `{{#each context.usps}}` → Liste USPs
- `{{#each seoStrategy.topKeywords}}` → Top Keywords

---

### Agent 5: Documentation Generator

**Input:** `keyword-research.json`, `website-context.json`
**Output:** `docs/keyword-recherche.md`, `docs/text-generierung-prompt.md`, `docs/definition-of-done.md`

**Aufgaben:**
- `keyword-recherche.md` generieren (Cluster, Priorisierung, Top Keywords)
- `text-generierung-prompt.md` generieren (Business Context, Tone, Zielgruppe)
- `definition-of-done.md` kopieren (1:1 von Template)

**Tools:** Template-Rendering, File operations

---

### Agent 6: Initial Content Generator

**Input:** `CLAUDE.md`, `docs/*`, `website-context.json`
**Output:** `src/index.html`, `src/partials/*.html`

**Aufgaben:**
- `index.html` generieren:
  - Hero Section (H1 mit Main Keyword)
  - Feature Cards (Services)
  - SEO: Meta Title, Meta Description
  - Include Partials (navbar, footer)
- `navbar.html` generieren (Business Name, Navigation)
- `footer.html` generieren (Kontaktdaten, Copyright)

**Guidelines:**
- Tone of Voice aus Context befolgen
- Top Keywords natürlich integrieren
- SPACING-GUIDELINE.md Rules befolgen
- Bootstrap 5.3.3 Klassen verwenden

**Tools:** Template-Rendering, Content-Generation (Claude API)

---

## 🔄 Orchestrator-Workflow

```javascript
class ProjectSetupOrchestrator {
  async run() {
    console.log('🚀 Starting Project Setup Workflow...\n');

    // Sequential Execution (Agents warten aufeinander)
    const context = await this.runAgent1();          // ~15s
    const { keywords, seo } = await this.runAgent2(context);  // ~22s
    await this.runAgent3(context, seo);              // ~5s
    await this.runAgent4(context, seo);              // ~8s
    await this.runAgent5(keywords, context);         // ~6s
    await this.runAgent6(context, keywords);         // ~12s

    // Finalization
    await this.finalize();  // npm install, git init, commit

    console.log('\n✅ Project Setup Complete!');
    this.printSummary();
  }
}
```

**Dependency-Management:**
- Agent 2 wartet auf Agent 1 (braucht `website-context.json`)
- Agent 3, 4 warten auf Agent 1 + 2
- Agent 5 wartet auf Agent 2
- Agent 6 wartet auf Agent 4 + 5

**Shared State:**
```javascript
{
  "projectName": "tausendundeinwort",
  "websiteUrl": "https://tausendundeinwort.de/",
  "outputDir": "/path/to/new-project",
  "context": { /* website-context.json */ },
  "keywords": { /* keyword-research.json */ },
  "seoStrategy": { /* seo-strategy.json */ },
  "status": { "agent1": "completed", ... }
}
```

---

## 🛠️ Implementation-Schritte

### 1. Template-Setup erstellen

**Dateien:**
```
.automation/templates/
├── CLAUDE.template.md               (Basis: aktuelles CLAUDE.md)
├── docs/
│   ├── keyword-recherche.template.md
│   └── text-generierung-prompt.template.md
├── project-structure/
│   ├── package.template.json
│   └── README.template.md
└── partials/
    ├── navbar.template.html
    └── footer.template.html
```

**CLAUDE.template.md Struktur:**
```markdown
# Claude Rules – {{PROJECT_NAME}} Website

## 📐 Spacing & Layout
[... UNIVERSAL CONTENT - 1:1 von A&S QM ...]

## 📝 Content Guidelines
**Positionierung:**
{{#each context.usps}}
- {{this}}
{{/each}}

**Tone of Voice:** {{context.toneOfVoice}}

**Top Keywords:**
{{#each seoStrategy.topKeywords}}
{{@index}}. {{this.keyword}} ({{this.priority}})
{{/each}}

[... REST OF UNIVERSAL CONTENT ...]
```

### 2. Agent-Scripts implementieren

**Neue Dependencies:**
```json
{
  "devDependencies": {
    "handlebars": "^4.7.8",
    "yargs": "^17.7.2",
    "ajv": "^8.12.0",
    "cheerio": "^1.0.0-rc.12",
    "puppeteer": "^21.6.1"
  }
}
```

**Agent-Files:**
```
.automation/agents/
├── orchestrator.js                  (Master-Koordinator)
├── agent-1-website-analyzer.js      (WebFetch + Parsing)
├── agent-2-seo-researcher.js        (Keyword-Expansion)
├── agent-3-project-generator.js     (File-Copy + Generation)
├── agent-4-claude-md-generator.js   (Handlebars-Rendering)
├── agent-5-docs-generator.js        (Markdown-Generation)
└── agent-6-content-generator.js     (HTML-Generation)
```

### 3. CLI Entry Point

```javascript
// .automation/cli/setup-project.js
#!/usr/bin/env node

const { ProjectSetupOrchestrator } = require('../agents/orchestrator');
const yargs = require('yargs');

const argv = yargs
  .option('url', {
    alias: 'u',
    description: 'Website URL to analyze',
    type: 'string',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    description: 'Output directory for new project',
    type: 'string',
    demandOption: true
  })
  .help()
  .argv;

(async () => {
  const orchestrator = new ProjectSetupOrchestrator(argv.url, argv.output);
  await orchestrator.run();
})();
```

**package.json Script:**
```json
{
  "scripts": {
    "setup:project": "node .automation/cli/setup-project.js"
  }
}
```

### 4. JSON Schemas für Validierung

```javascript
// .automation/schemas/website-context.schema.json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["businessName", "industry", "services"],
  "properties": {
    "businessName": { "type": "string" },
    "industry": { "type": "string" },
    "services": { "type": "array" },
    "targetAudience": { "type": "object" },
    "usps": { "type": "array" },
    "toneOfVoice": { "type": "string" }
  }
}
```

---

## 🚀 Usage-Workflow (für User)

### Schritt 1: Setup ausführen

```bash
cd /home/omue72/code/omue-dev/website/as-qm

npm run setup:project -- \
  --url https://tausendundeinwort.de \
  --output ../tausendundeinwort
```

### Schritt 2: Workflow beobachten

```
🚀 Starting Project Setup Workflow...

📊 Agent 1: Analyzing Website...
  ✓ Fetching homepage...
  ✓ Extracting business name: Tausendundeinwort
  ✓ Identifying industry: Copywriting
  ✓ Saved to docs/website-context.json
✅ Agent 1 completed (15s)

🔍 Agent 2: Generating SEO Strategy...
  ✓ Generating seed keywords: 9 keywords
  ✓ Expanding keywords: 45 keywords
  ✓ Creating clusters: 5 clusters
  ✓ Saved to docs/keyword-research.json
✅ Agent 2 completed (22s)

🏗️  Agent 3: Creating Project Structure...
  ✓ Creating directories
  ✓ Copying build scripts
  ✓ Generating package.json
✅ Agent 3 completed (5s)

📝 Agent 4: Generating CLAUDE.md...
  ✓ Filling project-specific sections
✅ Agent 4 completed (8s)

📚 Agent 5: Generating Documentation...
  ✓ Generating keyword-recherche.md
  ✓ Generating text-generierung-prompt.md
✅ Agent 5 completed (6s)

🎨 Agent 6: Generating Initial Content...
  ✓ Generating index.html with SEO
  ✓ Generating navbar.html
  ✓ Generating footer.html
✅ Agent 6 completed (12s)

🎉 Finalizing Project...
  ✓ Running npm install...
  ✓ Initializing git repository
  ✓ Creating initial commit

✅ Project Setup Complete! (Total: 68s)

📋 Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Name:       Tausendundeinwort
Industry:          Copywriting & Content
Top Keyword:       Website-Texte
Total Keywords:    45
Files Created:     23
Output Directory:  ../tausendundeinwort
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 Next Steps:
1. cd ../tausendundeinwort
2. npm run dev:site
3. Review CLAUDE.md
4. Review docs/
5. Customize content
```

### Schritt 3: Development starten

```bash
cd ../tausendundeinwort
npm run dev:site
# → http://localhost:8080
```

### Schritt 4: Review & Customize

**1. CLAUDE.md lesen:**
```bash
cat CLAUDE.md | grep -A 10 "Content Guidelines"
```

**2. SEO-Docs prüfen:**
```bash
cat docs/keyword-recherche.md | head -50
cat docs/text-generierung-prompt.md
```

**3. Generated HTML prüfen:**
```bash
cat src/index.html | head -50
```

**4. Im Browser testen:**
- Hero-Section prüfen
- Meta-Tags prüfen (DevTools)
- Spacing prüfen (DevTools)

### Schritt 5: Build & Deploy

```bash
npm run build:site
npm run serve:site

git add .
git commit -m "Initial setup + customization"
git push
```

---

## 🧪 Testing-Strategie

### Unit Tests (pro Agent)

```javascript
// .automation/agents/__tests__/agent-1.test.js
describe('Agent 1: Website Analyzer', () => {
  it('should extract business name', async () => {
    const context = await analyzeWebsite('https://example.com');
    expect(context.businessName).toBeDefined();
  });

  it('should classify industry', async () => {
    const context = await analyzeWebsite('https://copywriting-example.com');
    expect(context.industry).toContain('Copywriting');
  });
});
```

### Integration Test (Full Workflow)

```javascript
describe('Full Workflow', () => {
  it('should create complete project', async () => {
    const orchestrator = new ProjectSetupOrchestrator(
      'https://example.com',
      '/tmp/test-project'
    );

    await orchestrator.run();

    expect(fs.existsSync('/tmp/test-project/CLAUDE.md')).toBe(true);
    expect(fs.existsSync('/tmp/test-project/docs/keyword-recherche.md')).toBe(true);
    expect(fs.existsSync('/tmp/test-project/src/index.html')).toBe(true);
  });
});
```

### Manual Test: tausendundeinwort.de

**1. Setup ausführen:**
```bash
npm run setup:project -- \
  --url https://tausendundeinwort.de \
  --output ../test-projects/tausendundeinwort
```

**2. Agent 1 Output validieren:**
```bash
cat ../test-projects/tausendundeinwort/docs/website-context.json
# Expected: businessName, industry, services, toneOfVoice
```

**3. Agent 2 Output validieren:**
```bash
cat ../test-projects/tausendundeinwort/docs/keyword-research.json | jq '.topKeywords[0:5]'
# Expected: "Website-Texte", "SEO-Texte", etc.
```

**4. Build testen:**
```bash
cd ../test-projects/tausendundeinwort
npm install
npm run build:site
# Expected: No errors, dist/ exists
```

**5. Development Server:**
```bash
npm run dev:site
# Expected: Page loads, Hero shows business name, H1 contains keyword
```

---

## 📂 Kritische Dateien für Implementation

### 1. `.automation/templates/CLAUDE.template.md`
**Warum:** Kern-Template - definiert 65% universelle + 35% projekt-spezifische Sections

### 2. `.automation/agents/orchestrator.js`
**Warum:** Master-Koordinator - managed alle 6 Agents + Datenfluss

### 3. `.automation/agents/agent-1-website-analyzer.js`
**Warum:** Erster Agent - extrahiert Business-Context (Basis für alle anderen)

### 4. `.automation/agents/agent-2-seo-researcher.js`
**Warum:** SEO-Strategie - kritisch für Keywords + Content

### 5. `.automation/cli/setup-project.js`
**Warum:** CLI Entry Point - macht Workflow ausführbar

### 6. `.automation/agents/agent-4-claude-md-generator.js`
**Warum:** CLAUDE.md Generator - erstellt KI-Gedächtnis für neues Projekt

---

## 🎯 Key Takeaways

**Was dieser Workflow automatisiert:**
- ✅ Website-Analyse (Business Context, Zielgruppe, Tone of Voice)
- ✅ SEO-Keyword-Recherche (45 Keywords, 5 Cluster, Priorisierung)
- ✅ Projekt-Setup (Verzeichnisse, package.json, Build-Scripts)
- ✅ CLAUDE.md Generierung (projekt-spezifisch)
- ✅ Dokumentation (keyword-recherche.md, text-generierung-prompt.md)
- ✅ Initial-Content (index.html, navbar.html, footer.html mit SEO)

**Was du noch manuell machen musst:**
- Content-Verfeinerung (generierter Content ist Basis)
- Design-Anpassungen (Farben, Fonts - wird in SCSS-Variables gesetzt)
- Bilder hinzufügen (Platzhalter werden generiert)
- Weitere Seiten erstellen (mit Multi-Agent-Workflow aus CLAUDE.md)

**Zeit-Ersparnis:**
- ❌ Manuell: ~4-6 Stunden (Setup + SEO + Content-Planung)
- ✅ Automatisiert: ~1-2 Minuten (Workflow) + 30 Min (Review + Customize)
- **Ersparnis: ~90%**

---

## 🔄 Nächste Schritte

### Option 1: Implementation starten
1. Templates erstellen (`.automation/templates/`)
2. Agent 1-6 implementieren
3. Orchestrator implementieren
4. CLI erstellen
5. Mit tausendundeinwort.de testen

### Option 2: Prototyp bauen
1. Nur Agent 1 + 4 implementieren (minimal)
2. Testen mit tausendundeinwort.de
3. Iterativ erweitern

### Option 3: Step-by-Step lernen
Ich führe dich durch jeden Implementierungs-Schritt einzeln, erklärend.

---

## 🌅 MORGEN: So geht's weiter (Step-by-Step Implementation)

### Vorbereitung (heute Abend)

1. **Diese Datei kopieren:**
   ```bash
   # Im A&S QM Projekt
   cd /home/omue72/code/omue-dev/website/as-qm

   # Neue Projekt-Struktur vorbereiten
   mkdir -p .automation/docs

   # Diese Plan-Datei kopieren
   cp ~/.claude/plans/prancy-wiggling-peacock.md \
      .automation/docs/claude-multi-agent-workflow.md
   ```

2. **Git Commit (optional):**
   ```bash
   git add .automation/docs/claude-multi-agent-workflow.md
   git commit -m "docs: Add multi-agent workflow plan for new projects"
   ```

### Start morgen

**Prompt für Claude morgen:**

```
Lies .automation/docs/claude-multi-agent-workflow.md vollständig.

Wir implementieren jetzt step-by-step den automatisierten Multi-Agent-Workflow
für neue Webprojekte.

Ich möchte bei jedem Schritt verstehen, was passiert.
Fang mit Schritt 1 an und warte nach jedem Schritt auf mein "weiter".

Los geht's!
```

### Implementation-Reihenfolge (morgen)

**Phase 1: Template-Setup (Schritte 1-4)**
1. `.automation/` Verzeichnisstruktur erstellen
2. `CLAUDE.template.md` erstellen (vom aktuellen CLAUDE.md)
3. Weitere Templates erstellen (docs/, partials/)
4. JSON Schemas definieren

**Phase 2: Minimal-Prototyp (Schritte 5-7)**
5. Dependencies installieren (handlebars, yargs, etc.)
6. Agent 1 implementieren (Website Analyzer)
7. Testen mit tausendundeinwort.de

**Phase 3: CLAUDE.md Generator (Schritte 8-9)**
8. Agent 4 implementieren (CLAUDE.md Generator)
9. Testen: URL → website-context.json → CLAUDE.md

**Phase 4: Erweitern (Schritte 10-15)**
10. Agent 2 implementieren (SEO Researcher)
11. Agent 3 implementieren (Project Generator)
12. Agent 5 implementieren (Docs Generator)
13. Agent 6 implementieren (Content Generator)
14. Orchestrator implementieren (koordiniert alle)
15. CLI Entry Point erstellen

**Phase 5: Testing & Finalisierung (Schritte 16-17)**
16. Full-Workflow-Test mit tausendundeinwort.de
17. Dokumentation + Usage Guide

### Was du morgen lernen wirst

**Bei jedem Schritt erkläre ich:**
- 🎯 Was wir machen (Ziel)
- 🧠 Warum wir es so machen (Reasoning)
- 💻 Wie wir es implementieren (Code)
- 🔍 Wie wir es testen (Verification)
- 🎓 Wie du das auf andere Projekte überträgst (Pattern)

**Beispiel Schritt 1:**
```
🎯 Ziel: .automation/ Verzeichnisstruktur erstellen

🧠 Warum:
- Trennung von Projekt-Code und Automation-Code
- Übersichtlich für zukünftige Wartung
- Kopierbar in andere Master-Template-Projekte

💻 Implementation:
[Code zum Erstellen der Struktur]

🔍 Verification:
[Wie wir prüfen, dass es funktioniert]

🎓 Pattern:
[Wie du das in anderen Projekten nutzen kannst]
```

### Erwartete Dauer (morgen)

- **Minimal-Prototyp (Phase 1-3):** ~2-3 Stunden
  - Du hast: Website Analyzer + CLAUDE.md Generator
  - Du kannst: URL → CLAUDE.md automatisch erstellen

- **Full Implementation (Phase 1-5):** ~4-6 Stunden
  - Du hast: Kompletten 6-Agent-Workflow
  - Du kannst: URL → Fertiges Projekt in 68 Sekunden

**Empfehlung:** Starte mit Minimal-Prototyp, teste, dann erweitere.

---

## 📝 Notizen für morgen

**Was du heute schon hast:**
- ✅ A&S QM Projekt mit Tech-Stack (Bootstrap, Sass, PostHTML)
- ✅ CLAUDE.md (als Referenz für Template)
- ✅ SPACING-GUIDELINE.md (kopierbar)
- ✅ docs/ mit definition-of-done.md, keyword-recherche.md, text-generierung-prompt.md
- ✅ Build-Scripts (build-site.js, sync-site.js, dev-site.js)
- ✅ SCSS-Architektur (abstracts/, components/, etc.)

**Was wir morgen erstellen:**
- 🔨 `.automation/templates/` (CLAUDE.template.md, etc.)
- 🔨 `.automation/agents/` (6 Agents + Orchestrator)
- 🔨 `.automation/cli/setup-project.js` (CLI Entry Point)
- 🔨 `.automation/schemas/` (JSON Validation)

**Was du danach hast:**
- 🎉 Wiederverwendbares Template-System für ALLE zukünftigen Projekte
- 🎉 Automatisierter Workflow: URL → Fertiges Projekt
- 🎉 90% Zeit-Ersparnis bei jedem neuen Projekt

---

## 🤝 Support

**Wenn morgen etwas unklar ist:**
- Sag einfach "Erkläre Schritt X nochmal"
- Oder "Zeige mir ein Beispiel für Y"
- Oder "Warum machen wir Z so?"

Ich bin hier, um jeden Schritt verständlich zu machen!

---

**Bis morgen! 🚀**
