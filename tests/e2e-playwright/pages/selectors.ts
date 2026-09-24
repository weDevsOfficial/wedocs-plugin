export const Selectors = {
  login: {
    emailField: '#user_login',
    passwordField: '#user_pass',
    submit: '#wp-submit',
    dashboardLoaded: '#wpadminbar',
  },

  wpAdmin: {
    menuRoot: '#toplevel_page_wedocs',
    menuLabel: '#toplevel_page_wedocs .wp-menu-name',
    menuIcon: '#toplevel_page_wedocs .wp-menu-image',
    submenuLink: (label: string) => `#toplevel_page_wedocs a:has-text("${label}")`,
    notice: '.notice, .updated, .error',
  },

  // The docs/settings SPA and the FAQ app mount into different containers.
  spaRoot: '#wedocs-app',
  faqRoot: '#wedocs-faq-app',

  docs: {
    newDocButton: 'button:has-text("New doc")',
    // Doc titles render as links inside the listing rows.
    docByTitle: (title: string) => `#wedocs-app a:has-text("${title}")`,
    titleInput: 'input[placeholder*="doc" i], input[type="text"]',
  },

  settings: {
    tab: (label: string) => `#wedocs-app button:has-text("${label}"), #wedocs-app a:has-text("${label}")`,
    heading: '#wedocs-app h2',
    saveButton: 'button:has-text("Save Settings")',
    shortcodeCard: '#wedocs-app section .border.border-gray-300.rounded-md',
    shortcodeCardTitle: 'h3',
    shortcodeCardBadge: 'h3 + span',
    shortcodeExample: 'code',
    shortcodeCopyButton: 'button[aria-label="Copy shortcode"]',
    attributeRows: 'tbody tr',
  },

  faq: {
    root: '#wedocs-faq-app',
    heading: '#wedocs-faq-app h1',
    newGroupButton: 'button:has-text("New FAQ Group")',
    // Every group row is a bordered card; scope by the title it contains.
    groupRow: (title: string) => `#wedocs-faq-app div.border.border-gray-300:has-text("${title}")`,
    // Group titles are text-black; FAQ item titles inside an expanded group are
    // text-gray-700, so the colour class is what keeps the count to groups only.
    groupTitles: '#wedocs-faq-app div.border.border-gray-300 .text-base.font-medium.text-black',
    faqItemTitles: '#wedocs-faq-app .text-base.font-medium.text-gray-700',
    editGroup: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") button[aria-label="Edit FAQ group"]`,
    duplicateGroup: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") button[aria-label="Duplicate FAQ group"]`,
    deleteGroup: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") button[aria-label="Delete FAQ group"]`,
    // One button drives both directions. Its aria-label is fixed at "Expand FAQ
    // group" and it carries no aria-expanded, so the label cannot tell us which
    // way it will go; the specs read the actual open state from the rows.
    toggleExpand: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") button[aria-label="Expand FAQ group"]`,
    // A FAQ row inside a group, keyed on the row title. The per-row edit and
    // delete controls only exist while that row is in edit mode, and a bare
    // input[type=text] would also match the add-FAQ form that stays open after
    // a save, so neither can stand in for "the group is expanded".
    faqRows: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") .text-base.font-medium.text-gray-700`,
    groupToggle: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") button[aria-label="Deactivate FAQ group"], #wedocs-faq-app div.border.border-gray-300:has-text("${title}") button[aria-label="Activate FAQ group"]`,
    addFaqButton: (title: string) =>
      `#wedocs-faq-app div.border.border-gray-300:has-text("${title}") button:has-text("Add a New FAQ")`,

    // Create / edit group modal.
    modal: '[role="dialog"]',
    modalTitleInput: '[role="dialog"] input[placeholder="FAQ Group Title..."]',
    modalCreate: '[role="dialog"] button:has-text("Create FAQ Group")',
    modalSave: '[role="dialog"] button:has-text("Save Changes")',
    modalCancel: '[role="dialog"] button:has-text("Cancel")',

    // Inline add-FAQ form. Everything is scoped to the form container: an
    // expanded group already has one Tiptap editor per existing FAQ, so an
    // unscoped [contenteditable] would type the new answer into whichever FAQ
    // happened to render first and leave the new one empty.
    addForm: 'div:has(> div > input[placeholder="Add New Question"])',
    questionInput: 'input[placeholder="Add New Question"]',
    answerInput: 'div:has(> div > input[placeholder="Add New Question"]) [contenteditable="true"]',
    createFaq: 'div:has(> div > input[placeholder="Add New Question"]) button:has-text("Create")',

    // Shared confirm dialog.
    confirmDialog: '[role="dialog"]',
    confirmDelete: '[role="dialog"] button:has-text("Delete")',
    confirmDuplicate: '[role="dialog"] button:has-text("Duplicate")',
    confirmOk: '[role="dialog"] button:has-text("OK")',

    // SweetAlert2 toast the FAQ actions report through.
    toast: '.swal2-container',
    toastTitle: '.swal2-title',
  },

  frontend: {
    docsWrap: '.wedocs-shortcode-wrap',
    docsList: 'ul.wedocs-docs-list',
    docCard: 'li.wedocs-docs-single',
    docMoreLink: '.wedocs-doc-link a',
    docSections: 'ul.wedocs-doc-sections > li',
    pagination: '.wedocs-pagination',
    paginationInfo: '.wedocs-pagination__info',
    paginationNext: '.wedocs-pagination__next',
    paginationPrev: '.wedocs-pagination__prev',
    paginationDisabled: '.wedocs-pagination__disabled',

    faqSection: '.wedocs-faq-section',
    faqGroup: '.wedocs-faq-group',
    faqGroupTitle: '.wedocs-faq-group__title',
    faqGroupIcon: '.wedocs-faq-group__icon',
    faqItem: '.wedocs-faq-item',
    faqQuestion: '.wedocs-faq-item__question',
    faqAnswer: '.wedocs-faq-item__answer-inner',
  },
};
