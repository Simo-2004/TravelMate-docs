import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// Definiamo un'UNICA sidebar sequenziale che mostra l'intero Ciclo di Vita a Cascata (Waterfall).
// L'utente vedrà tutte le 5 fasi del progetto in ordine cronologico.
const waterfallSidebar = [
  {
    text: 'Phase 1: Feasibility Study',
    collapsed: false,
    items: [
      // Assicurati che feasibility-study.md sia nella stessa cartella base (es. docs/)
      { text: 'Feasibility Study & Gantt', link: '/feasibility-study' }
    ]
  },
  {
    text: 'Phase 2: Requirements (RAD)',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/rad/overview' },
      {
        text: '1. Introduction',
        link: '/rad/introduction/',
        collapsed: false,
        items: [
          { text: '1.1 Purpose of the System', link: '/rad/introduction/purpose' },
          { text: '1.2 Scope of the System', link: '/rad/introduction/scope' },
          { text: '1.3 Objectives & Success Criteria', link: '/rad/introduction/objectives' },
          { text: '1.4 Definitions, Acronyms & Abbreviations', link: '/rad/introduction/definitions' },
          { text: '1.5 References', link: '/rad/introduction/references' },
          { text: '1.6 Overview', link: '/rad/introduction/overview' }
        ]
      },
      { text: '2. Current System', link: '/rad/current-system' },
      {
        text: '3. Proposed System',
        link: '/rad/proposed-system/',
        collapsed: false,
        items: [
          { text: '3.1 Overview', link: '/rad/proposed-system/overview' },
          { text: '3.2 Functional Requirements', link: '/rad/proposed-system/functional' },
          {
            text: '3.3 Non-Functional Requirements',
            link: '/rad/proposed-system/non-functional/',
            collapsed: false,
            items: [
              { text: '3.3.1 Usability', link: '/rad/proposed-system/non-functional/usability' },
              { text: '3.3.2 Reliability', link: '/rad/proposed-system/non-functional/reliability' },
              { text: '3.3.3 Performance', link: '/rad/proposed-system/non-functional/performance' },
              { text: '3.3.4 Supportability', link: '/rad/proposed-system/non-functional/supportability' },
              { text: '3.3.5 Implementation', link: '/rad/proposed-system/non-functional/implementation' },
              { text: '3.3.6 Interface', link: '/rad/proposed-system/non-functional/interface' },
              { text: '3.3.7 Packaging', link: '/rad/proposed-system/non-functional/packaging' },
              { text: '3.3.8 Legal', link: '/rad/proposed-system/non-functional/legal' }
            ]
          },
          {
            text: '3.4 System Models',
            link: '/rad/proposed-system/system-models/',
            collapsed: false,
            items: [
              { text: '3.4.1 Scenarios', link: '/rad/proposed-system/system-models/scenarios' },
              { text: '3.4.2 Use Case Model', link: '/rad/proposed-system/system-models/use-case-model' },
              { text: '3.4.3 Object Model', link: '/rad/proposed-system/system-models/object-model' },
              { text: '3.4.4 Dynamic Model', link: '/rad/proposed-system/system-models/dynamic-model' },
              { text: '3.4.5 UI-Navigational Paths & Screen Mockups', link: '/rad/proposed-system/system-models/ui-navigational-paths' }
            ]
          }
        ]
      },
      { text: '4. Glossary', link: '/rad/glossary' }
    ]
  },
  {
    text: 'Phase 3: System Design',
    collapsed: false,
    items: [
      // SDD
      { text: 'SDD - Architecture & Subsystems', link: '/sdd/architecture' },
      { text: 'SDD - Hardware & Software Mapping', link: '/sdd/mapping' },
      { text: 'SDD - Persistent Data', link: '/sdd/data' },
      // ODD
      { text: 'ODD - Class Diagrams (UML)', link: '/odd/classes' },
      { text: 'ODD - Object Interfaces', link: '/odd/interfaces' }
    ]
  },
  {
    text: 'Phase 4: Implementation',
    collapsed: false,
    items: [
      // Inseriamo la documentazione Flutter direttamente nella cascata!
      { text: 'Flutter Architecture', link: '/flutter/architecture' },
      { text: 'State Management', link: '/flutter/state-management' },
      { text: 'Dependencies', link: '/flutter/dependencies' },
      { text: 'Code Documentation (API)', link: '/api/index.html', target: '_blank' }
    ]
  },
  {
    text: 'Phase 5: Testing & Integration',
    collapsed: false,
    items: [
      // Assicurati che system-testing.md sia nella stessa cartella base (es. docs/)
      { text: 'System Testing (SonarCloud)', link: '/system-testing' }
    ]
  },
  {
    text: 'Phase 6: Deployment',
    collapsed: false,
    items: [
      { text: 'Release 1.0 (APK)', link: '/deployment' }
    ]
  }
];

export default withMermaid(defineConfig({
  title: "TravelMate",
  description: "A Flutter app to find your potential travel companion",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // Modificato: il link principale ora punta all'inizio della cascata (Fase 1)
      { text: 'Waterfall Lifecycle', link: '/feasibility-study' }, 
      { text: 'API Reference', link: '/api/index.html', target: '_blank' }
    ],

    sidebar: {
      // Applichiamo la STESSA sidebar universale a tutte le sezioni del sito.
      // Così, ovunque si trovi l'utente, vedrà l'intero processo a cascata.
      '/rad/': waterfallSidebar,
      '/sdd/': waterfallSidebar,
      '/odd/': waterfallSidebar,
      '/flutter/': waterfallSidebar,
      
      // Serve per mappare correttamente anche i due file nuovi se li hai messi nella root
      '/feasibility-study': waterfallSidebar,
      '/system-testing': waterfallSidebar,
    },

    footer: { 
      message: 'Released under the MIT License - Icons by <a href="https://www.streamlinehq.com/">Streamline</a>',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Simo-2004/TravelMate' }
    ]
  }
}))