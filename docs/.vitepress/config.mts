import { defineConfig } from 'vitepress'

// Definiamo una singola sidebar per tutti i documenti di progetto.
// In questo modo, l'utente vede l'intero progetto (RAD, SDD, ODD) 
// navigando in qualsiasi di queste sezioni.
const projectDocsSidebar = [
  {
    text: 'RAD - Requirements Analysis',
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
    text: 'SDD - System Design',
    items: [
      { text: 'Architecture & Subsystems', link: '/sdd/architecture' },
      { text: 'Hardware & Software Mapping', link: '/sdd/mapping' },
      { text: 'Persistent Data', link: '/sdd/data' }
    ]
  },
  {
    text: 'ODD - Object Design',
    items: [
      { text: 'Class Diagrams', link: '/odd/classes' },
      { text: 'Object Interfaces', link: '/odd/interfaces' }
    ]
  }
];

export default defineConfig({
  title: "TravelMate",
  description: "A Flutter app to find your potential travel companion",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Project Docs', link: '/rad/overview' },
      { text: 'Flutter Guide', link: '/flutter/architecture' },
      { text: 'API Reference', link: '/api/index.html', target: '_blank' }
    ],

    sidebar: {
      // Assegniamo la stessa sidebar condivisa a tutte le cartelle di ingegneria
      '/rad/': projectDocsSidebar,
      '/sdd/': projectDocsSidebar,
      '/odd/': projectDocsSidebar,
      
      // La sidebar di Flutter rimane isolata solo per il codice
      '/flutter/': [
        {
          text: 'Application Development',
          items: [
            { text: 'Architecture', link: '/flutter/architecture' },
            { text: 'State Management', link: '/flutter/state-management' },
            { text: 'Dependencies', link: '/flutter/dependencies' },
            { text: 'Code Documentation (API)', link: '/api/index.html', target: '_blank' }
          ]
        }
      ]
    },

    footer: { 
      message: 'Released under the MIT License - Icons by <a href="https://www.streamlinehq.com/">Streamline</a>',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Simo-2004/TravelMate' }
    ]
  }
})