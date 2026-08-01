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
      {
        // SDD — the architecture: how the system is organised as a whole.
        text: 'SDD — System Design Document',
        link: '/sdd/overview',
        collapsed: false,
        items: [
          {
            text: '1. Introduction',
            link: '/sdd/introduction/',
            collapsed: true,
            items: [
              { text: '1.1 Purpose of the System', link: '/sdd/introduction/purpose' },
              { text: '1.2 Design Goals', link: '/sdd/introduction/design-goals' },
              { text: '1.3 Definitions, Acronyms & Abbreviations', link: '/sdd/introduction/definitions' },
              { text: '1.4 References', link: '/sdd/introduction/references' },
              { text: '1.5 Overview', link: '/sdd/introduction/overview' }
            ]
          },
          { text: '2. Current Software Architecture', link: '/sdd/current-architecture' },
          {
            text: '3. Proposed Software Architecture',
            link: '/sdd/proposed-architecture/',
            collapsed: true,
            items: [
              { text: '3.1 Overview', link: '/sdd/proposed-architecture/overview' },
              { text: '3.2 Subsystem Decomposition', link: '/sdd/proposed-architecture/subsystem-decomposition' },
              { text: '3.3 Hardware/Software Mapping', link: '/sdd/proposed-architecture/hardware-software-mapping' },
              { text: '3.4 Persistent Data Management', link: '/sdd/proposed-architecture/persistent-data' },
              { text: '3.5 Access Control & Security', link: '/sdd/proposed-architecture/access-control' },
              { text: '3.6 Global Software Control', link: '/sdd/proposed-architecture/global-control-flow' },
              { text: '3.7 Boundary Conditions', link: '/sdd/proposed-architecture/boundary-conditions' }
            ]
          },
          { text: '4. Subsystems & Services', link: '/sdd/subsystem-services' },
          { text: '5. Glossary', link: '/sdd/glossary' }
        ]
      },
      {
        // ODD — the object design: how each subsystem is built from classes.
        text: 'ODD — Object Design Document',
        link: '/odd/overview',
        collapsed: false,
        items: [
          {
            text: '1. Introduction',
            link: '/odd/introduction/',
            collapsed: true,
            items: [
              { text: '1.1 Object Design Trade-offs', link: '/odd/introduction/trade-offs' },
              { text: '1.2 Interface Documentation Guidelines', link: '/odd/introduction/interface-guidelines' },
              { text: '1.3 Definitions, Acronyms & Abbreviations', link: '/odd/introduction/definitions' },
              { text: '1.4 References', link: '/odd/introduction/references' }
            ]
          },
          { text: '2. Packages', link: '/odd/packages' },
          {
            text: '3. Class Interfaces',
            link: '/odd/class-interfaces/',
            collapsed: true,
            items: [
              { text: '3.1 Presentation', link: '/odd/class-interfaces/presentation' },
              { text: '3.2 Application State', link: '/odd/class-interfaces/application-state' },
              { text: '3.3 Domain Logic', link: '/odd/class-interfaces/domain-logic' },
              { text: '3.4 Persistence', link: '/odd/class-interfaces/persistence' },
              { text: '3.5 Data Access', link: '/odd/class-interfaces/data-access' },
              { text: '3.6 Security', link: '/odd/class-interfaces/security' },
              { text: '3.7 Media Storage', link: '/odd/class-interfaces/media-storage' }
            ]
          },
          { text: '4. Glossary', link: '/odd/glossary' }
        ]
      }
    ]
  },
  {
    text: 'Phase 4: Implementation',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/implementation/overview' },
      { text: '4.1 Development Environment & Toolchain', link: '/implementation/environment' },
      { text: '4.2 Coding Standards & Static Analysis', link: '/implementation/coding-standards' },
      { text: '4.3 Design-to-Code Traceability', link: '/implementation/traceability' },
      { text: '4.4 Build & Execution Process', link: '/implementation/build-process' },
      { text: '4.5 Quality Criteria', link: '/implementation/quality-criteria' },
      { text: '4.6 API Code Documentation', link: '/implementation/api-documentation' },
      { text: 'API Reference (generated)', link: '/api/index.html', target: '_blank' }
    ]
  },
  {
    text: 'Phase 5: Testing & Integration',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/testing/overview' },
      { text: '5.1 System Quality', link: '/testing/system-quality' },
      { text: '5.2 System Testing', link: '/testing/system-testing' },
      { text: '5.3 Requirements Traceability', link: '/testing/requirements-traceability' }
    ]
  },
  {
    text: 'Phase 6: Deployment',
    collapsed: false,
    items: [
      { text: 'Release & Distribution', link: '/deployment' }
    ]
  }
];

// Sidebar del manuale utente. Volutamente separata da quella del ciclo a
// cascata: il manuale si rivolge a chi usa l'app, non a chi la costruisce.
const userManualSidebar = [
  {
    text: 'User Manual',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/user-manual/' },
      { text: '1. Getting Started', link: '/user-manual/getting-started' },
      { text: '2. Moving Around the App', link: '/user-manual/navigation' },
      { text: '3. Finding Trips and Companions', link: '/user-manual/search' },
      { text: '4. Saving Trips and Companions', link: '/user-manual/saved' },
      { text: '5. Conversations', link: '/user-manual/conversations' },
      { text: '6. Your Profile', link: '/user-manual/profile' },
      { text: '7. Settings and Privacy', link: '/user-manual/settings' }
    ]
  }
];

export default withMermaid({
  // Render diagram labels as native SVG <text> instead of HTML in <foreignObject>.
  // The foreignObject path clips class-diagram multiplicity labels ("0..*", "1..*")
  // into unreadable slivers; SVG text is not clipped and sizes correctly.
  mermaid: {
    htmlLabels: false,
    flowchart: { htmlLabels: false },
  },
  ...defineConfig({
  title: "TravelMate",
  description: "A Flutter app to find your potential travel companion",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // Il link principale punta all'inizio della cascata (Fase 1)
      { text: 'Waterfall Lifecycle', link: '/feasibility-study' },
      { text: 'User Manual', link: '/user-manual/' },
      { text: 'API Reference', link: '/api/index.html', target: '_blank' }
    ],

    // Il manuale utente ha una sidebar propria: non fa parte del ciclo a
    // cascata e non deve comparire fra le sue fasi. Il percorso più specifico
    // va dichiarato per primo.
    // La voce '/' applica la sidebar del ciclo a OGNI altra pagina, comprese
    // quelle nella root (/deployment, /feasibility-study, ...): elencare i
    // singoli percorsi lasciava senza sidebar qualsiasi pagina dimenticata.
    // La home usa layout: home e non mostra comunque la sidebar.
    sidebar: {
      '/user-manual/': userManualSidebar,
      '/': waterfallSidebar,
    },

    footer: { 
      message: 'Released under the MIT License - Icons by <a href="https://www.streamlinehq.com/">Streamline</a>',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Simo-2004/TravelMate' }
    ]
  }
  }),
})