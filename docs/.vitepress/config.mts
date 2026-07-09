import { defineConfig } from 'vitepress'

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
      { text: '1. Introduction', link: '/rad/introduction' },
      { text: '2. Current System', link: '/rad/current-system' },
      {
        text: '3. Proposed System',
        items: [
          { text: 'Overview & Functional', link: '/rad/proposed-system/functional' },
          { text: '3.3 Non-Functional', link: '/rad/proposed-system/non-functional' },
          { text: '3.4 System Models', link: '/rad/proposed-system/models' }
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

export default defineConfig({
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
})