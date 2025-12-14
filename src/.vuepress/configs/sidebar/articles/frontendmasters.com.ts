import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "container-queries-and-units", // 2023-12-21
    "light-dom-only", // 2023-12-08
    "vanilla-javascript-reactivity", // 2023-08-21
    "what-is-sql-database-definition-for-beginners", // 2023-01-13
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "typescript-without-build-tools", // 2024-12-30
    "baseline-data-choices", // 2024-12-26
    "scroll-driven-fixed", // 2024-12-20
    "introducing-tanstack-start", // 2024-12-18
    "react-19-and-web-component-examples", // 2024-12-16
    "introducing-fly-io", // 2024-12-12
    "responsive-tables-readable-paragraphs", // 2024-12-11
    "drizzle-database-migrations", // 2024-12-09
    "cant-seem-to-remove-the-formatting-from-a-string-of-text", // 2024-12-06
    "multi-state-buttons", // 2024-12-05
    "pure-css-halftone-effect-in-3-declarations", // 2024-12-03
    "the-logical-border-radius-equivalents", // 2024-12-02
    "tweaking-one-set-of-colors-for-light-dark-modes", // 2024-11-25
    "tanstack-router-data-loading-2", // 2024-11-21
    "tanstack-router-data-loading-1", // 2024-11-20
    "no-fuss-light-dark-modes", // 2024-11-18
    "showing-browser-support-for-web-platform-features-on-your-own-blog", // 2024-11-15
    "custom-progress-element-using-anchor-positioning-scroll-driven-animations", // 2024-11-13
    "scoped-scroll-timelines", // 2024-11-11
    "why-alpine-is-the-new-jquery-and-why-that-is-an-awesome-thing", // 2024-11-07
    "mastering-interaction-to-next-paint-inp", // 2024-11-05
    "named-scroll-view-timelines", // 2024-11-04
    "edge-to-edge-text", // 2024-10-31
    "scroll-driven-sections", // 2024-10-29
    "9-16", // 2024-10-24
    "view-transitions-staggering", // 2024-10-22
    "simple-typographic-email-template", // 2024-10-17
    "fanout-with-grid-and-view-transitions", // 2024-10-14
    "handling-paste-events-in-javascript", // 2024-10-11
    "css-fan-out-with-grid-and-property", // 2024-10-09
    "reminder-that-scope-and-html-style-blocks-are-a-potent-combo", //2024-10-07
    "whats-the-difference-between-htmls-dialog-element-and-popovers", // 2024-09-30
    "you-might-not-need-that-framework", // 2024-09-27
    "what-software-developer-skills-should-you-focus-on-leading-into-2025", // 2024-09-25
    "keeping-pixely-images-pixely-and-performant", // 2024-09-23
    "gradient-text-with-a-drop-shadow", // 2024-09-20
    "introducing-tanstack-router", // 2024-09-13
    "split-effects-with-no-content-duplication", // 2024-09-11
    "what-does-hydration-mean", // 2024-09-09
    "a-complete-guide-to-beginning-with-typescript", // 2024-09-06
    "a-complete-guide-to-beginning-with-javascript", // 2024-09-04
    "backgrounds-for-the-box-model-and-why-it-can-be-useful", // 2024-09-02
    "java-optionals", // 2024-08-30
    "the-dialog-element-with-entry-and-exit-animations", // 2024-08-28
    "what-skills-should-you-focus-on-as-junior-web-developer-in-2024", // 2024-08-26
    "writing-to-the-clipboard-in-javascript", // 2024-08-23
    "custom-range-slider-using-anchor-positioning-scroll-driven-animations", // 2024-08-21
    "the-css-contain-property", // 2024-08-19
    "letting-ios-text-size-setting-affect-font-size-on-the-web", // 2024-08-16
    "fine-grained-reactivity-in-svelte-5", // 2024-08-14
    "relative-color-syntax-basic-use-cases", // 2024-08-12
    "exploring-the-possibilities-of-native-javascript-decorators", // 2024-08-09
    "snippets-in-svelte-5", // 2024-08-07
    "figma-typography-variables", // 2024-08-05
    "what-if-you-used-container-units-for-everything", // 2024-08-02
    "reading-from-the-clipboard-in-javascript", // 2024-07-31
    "patterns-for-memory-efficient-dom-manipulation", // 2024-07-29
    "how-to-get-the-width-height-of-any-element-in-only-css", // 2024-07-25
    "clip-pathing-color-changes", // 2024-07-23
    "introducing-svelte-5", // 2024-07-19
    "the-pitfalls-of-in-app-browsers", // 2024-07-17
    "css-does-need-mixins", // 2024-07-12
    "single-directionally-allowed-overflow", // 2024-07-10
    "how-keyboard-navigation-works-in-a-css-game", // 2024-07-08
    "script-integrity", // 2024-07-05
    "why-is-this-thing-in-dark-mode", // 2024-07-03
    "youtube-embeds-are-bananas-heavy-and-its-fixable", // 2024-07-01
    "browser-support-tests-in-javascript-for-modern-web-features", // 2024-06-28
    "text-reveal-with-conic-gradient", // 2024-06-26
    "popovers-work-pretty-nicely-as-slide-out-drawers", // 2024-06-24
    "pure-css-circular-text-without-requiring-a-monospace-font", // 2024-06-21
    "footnotes-progressively-enhanced-to-popovers", // 2024-06-19
    "introducing-drizzle", // 2024-06-17
    "one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto", // 2024-06-12
    "masonry-and-reading-order", // 2024-06-10
    "playing-with-the-speculation-rules-api-in-the-console", // 2024-06-07
    "live-demos-of-stand-alone-web-components", // 2024-06-06
    "control-javascript-promises-from-anywhere-using-promise-withresolvers", // 2024-06-05
    "fast-and-budget-friendly-user-research-and-testing", // 2024-06-04
    "testing-types-in-typescript", // 2024-06-04
    "how-to-make-a-css-timer", // 2024-05-29
    "combining-react-server-components-with-react-query-for-easy-data-management", // 2024-05-24
    "animating-dialog", // 2024-05-23
    "danger-preventing-zoom-from-changing-text-size", // 2024-05-22
    "weve-got-container-queries-now-but-are-we-actually-using-them", // 2024-05-21
    "exactly-how-to-deploy-local-files-to-make-a-live-website", // 2024-05-17
    "prefetching-when-server-loading-wont-do", // 2024-05-15
    "the-classic-border-radius-advice-plus-an-unusual-trick", // 2024-05-13
    "using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators", // 2024-05-10
    "5-things-designers-can-do-with-javascript", // 2024-05-08
    "using-the-popover-api-for-html-tooltips", // 2024-05-06
    "multiplexed-fonts-have-a-cool-superpower", // 2024-05-03
    "popover-api-is-here", // 2024-04-30
    "using-nextauth-now-auth-js-with-sveltekit", // 2024-04-29
    "the-html-css-and-svg-for-a-classic-search-form", // 2024-04-25
    "feedback-on-masonry-layout", // 2024-04-24
    "dark-and-light", // 2024-04-18
    "things-that-can-break-aspect-ratio-in-css", // 2024-04-16
    "a-css-powered-add-remove-tags-ui", // 2024-04-11
    "drawing-a-line-to-connect-elements-with-css-anchor-positioning", // 2024-04-02
    "creating-flower-shapes-using-css-mask-trigonometric-functions", // 2024-02-29
   
    "the-color-input-the-color-picker", // 2024-01-18
    "we-can-has-it-all", // 2024-01-10
  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "exploring-multi-brand-systems-with-tokens-and-composability", // 2025-12-19
    "different-page-transitions-for-different-circumstances", // 2025-12-16
    "thoughts-on-native-css-mixins", // 2025-12-11
    "the-deep-card-conundrum", // 2025-12-04
    "the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick", // 2025-12-03
    "non-square-image-blur-extensions", // 2025-12-01
    "how-to-add-and-remove-items-from-a-native-css-carousel-with-css", // 2025-11-26
    "web-monetization-is-still-inching-along-but-still-too-difficult", // 2025-11-24
    "how-to-create-3d-images-in-css-with-the-layered-pattern", // 2025-11-20
    "more-css-random-learning-through-experiments", // 2025-11-18
    "browserslist-baseline", // 2025-11-13
    "perfectly-pointed-tooltips-to-the-corners", // 2025-11-10
    "staggered-animation-with-css-sibling-functions", // 2025-11-07
    "the-weird-parts-of-position-sticky", // 2025-11-05
    "perfectly-pointed-tooltips-all-four-sides", // 2025-11-03
    "super-simple-full-bleed-breakout-styles", // 2025-10-31
    "perfectly-pointed-tooltips-a-foundation", // 2025-10-28
    "introducing-tanstack-start-middleware", // 2025-10-24
    "the-two-button-problem", // 2025-10-21
    "modern-css-round-out-tabs", // 2025-10-13
    "css-counters-in-action", // 2025-10-09
    "numbers-that-fall-scroll-driven-animations-sibling-index", // 2025-10-07
    "a-progressive-enhancement-challenge", // 2025-10-03
    "inset-shadows-directly-on-img-elements-part-1", // 2025-10-01
    "learn-media-queries", // 2025-09-29
    "the-coyier-css-starter", // 2025-09-24
    "what-you-need-to-know-about-modern-css-2025-edition", // 2025-09-19
    "css-offset-and-animation-composition-for-rotating-menus", // 2025-09-17
    "choosing-the-right-model-in-cursor", // 2025-09-09
    "getting-started-with-cursor", // 2025-09-08
    "advanced-postgresql-indexing", // 2025-09-03
    "intro-to-postgres-indexes", // 2025-09-01
    "the-path-of-least-resistance-part-2", // 2025-08-30
    "the-path-of-least-resistance-part-1", // 2025-08-27
    "opening-a-details-element-from-the-url", // 2025-08-26
    "very-early-playing-with-random-in-css", // 2025-08-25
    "quick-dark-mode-toggles", // 2025-08-22
    "obsessing-over-smooth-radial-gradient-disc-edges", // 2025-08-20
    "web-design-what-is-the-web-capable-of-that-is-hard-to-express-in-design-software", // 2025-08-18
    "architecture-through-component-colocation", // 2025-08-11
    "using-the-custom-highlight-api", // 2025-08-07
    "count-auto-fill-columns", // 2025-08-06
    "infinite-marquee-animation-using-modern-css", // 2025-08-04
    "should-we-never-use-non-logical-properties", // 2025-07-31
    "the-figcaption-problem", // 2025-07-24
    "introducing-zustand", // 2025-07-21
    "adaptive-alerts-a-css-scroll-state-use-case", // 2025-07-16
    "stacked-transforms", // 2025-07-15
    "deploy-a-site-with-a-build-process-a-custom-domain-name", // 2025-07-12
    "view-transition-list-reordering-with-a-kick-flip", // 2025-07-08
    "satisfies-in-typescript", // 2025-07-03
    "custom-select-that-comes-up-from-the-bottom-on-mobile", // 2025-07-01
    "step-gradients-with-a-given-number-of-steps", // 2025-06-30
    "quantity-query-carousel", // 2025-06-25
    "understanding-css-corner-shape-and-the-power-of-the-superellipse", // 2025-06-23
    "drawing-css-shapes-using-corner-shape", // 2025-06-18
    "scope-in-css", // 2025-06-17
    "grainy-gradients", // 2025-06-13
    "1fr-1fr-vs-auto-auto-vs-50-50", // 2025-06-11
    "scroll-driven-letter-grid", // 2025-06-09
    "firstchild-can-be-white-space", // 2025-06-05
    "the-simplest-way-to-deploy", // 2025-05-29
    "css-spotlight-effect", // 2025-05-26
    "move-modal-in-on-a-shape", // 2025-05-22
    "chatgpt-and-old-and-broken-code", // 2025-05-20
    "creating-blob-shapes-using-clip-path-shape", // 2025-05-19
    "to-flip-or-not-to-flip", // 2025-05-16
    "container-query-for-is-there-enough-space-outside-this-element", // 2025-05-13
    "creating-flower-shapes-using-clip-path-shape", // 2025-05-12
    "shape-a-new-powerful-drawing-syntax-in-css", // 2025-05-07
    "using-container-query-units-relative-to-an-outer-container", // 2025-05-06
    "curved-box-cutouts-in-css", // 2025-05-01
    "seeking-an-answer-why-cant-html-alone-do-includes", // 2025-04-29
    "react-internals-which-useeffect-runs-first", // 2025-04-28
    "am-i-a-sadistic-developer-are-you", // 2025-04-24
    "newfangled-browser-alternatives", // 2025-04-22
    "lessons-learned-from-recreating-a-styled-dialog", // 2025-04-16
    "the-latest-in-the-how-are-we-going-to-do-masonry-debate-apple-says-item-flow", // 2025-04-11
    "using-currentcolor-in-2025", // 2025-04-10
    "custom-progress-element-using-the-attr-function", // 2025-04-09
    "css-bursts-with-conic-gradients", // 2025-04-03
    "reanimating-the-css-day-buttons", // 2025-03-31
    "expanding-css-shadow-effects", // 2025-03-28
    "layered-text-headers", // 2025-03-24
    "one-thing-scope-can-do-is-reduce-concerns-about-source-order", // 2025-03-20
    "overlapping-inline-backgrounds", // 2025-03-18
    "chilled-out-text-underlines", // 2025-03-12
    "the-moment-you-need-a-database", // 2025-03-10
    "movies-as-images", // 2025-03-05
    "custom-property-fallbacks", // 2025-02-28
    "examples-of-why-the-web-needs-anchored-popovers", // 2025-02-26
    "how-to-use-attr-in-css-for-columns-colors-and-font-size", // 2025-02-25
    "a-color-input-that-also-shows-the-value", // 2025-02-18
    "rainbow-selection-in-css", // 2025-02-14
    "optimizing-images-for-web-performance", // 2025-02-10
    "three-approaches-to-the-ampersand-selector-in-css", // 2025-02-07
    "html-css-for-a-one-time-password-input", // 2025-02-05
    "notes-on-the-code-editors-with-ai-landscape", // 2025-02-03
    "mapping-with-leaflet", // 2025-01-29
    "full-bleed-layout-with-modern-css", // 2025-01-27
    "creating-an-angled-slider", // 2025-01-22
    "simplify-lazy-loading-with-intersection-observers-scrollmargin", // 2025-01-20
    "css-wishlist-for-2025", // 2025-01-14
    "sharing-a-variable-across-html-css-and-javascript", // 2025-01-08
    "bone-up-html-2025", // 2025-01-06
    "containers-context", // 2025-01-03
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'frontendmasters.com',
  faviconPath: 'https://frontendmasters.com/favicon.ico',
  linksMap: new Map([
    [
    "java", [
      "java-optionals", // 2024-08-30
      // END: java
    ]],[
    "js", [
      "vanilla-javascript-reactivity", // 2023-08-21
      // END: 2023js
      "the-color-input-the-color-picker", // 2024-01-18
      "5-things-designers-can-do-with-javascript", // 2024-05-08
      "control-javascript-promises-from-anywhere-using-promise-withresolvers", // 2024-06-05
      "playing-with-the-speculation-rules-api-in-the-console", // 2024-06-07
      "popovers-work-pretty-nicely-as-slide-out-drawers", // 2024-06-24
      "browser-support-tests-in-javascript-for-modern-web-features", // 2024-06-28
      "script-integrity", // 2024-07-05
      "clip-pathing-color-changes", // 2024-07-23
      "patterns-for-memory-efficient-dom-manipulation", // 2024-07-29
      "reading-from-the-clipboard-in-javascript", // 2024-07-31
      "exploring-the-possibilities-of-native-javascript-decorators", // 2024-08-09
      "writing-to-the-clipboard-in-javascript", // 2024-08-23
      "a-complete-guide-to-beginning-with-javascript", // 2024-09-04
      "you-might-not-need-that-framework", // 2024-09-27
      "whats-the-difference-between-htmls-dialog-element-and-popovers", // 2024-09-30
      "reminder-that-scope-and-html-style-blocks-are-a-potent-combo", //2024-10-07
      "css-fan-out-with-grid-and-property", // 2024-10-09
      "handling-paste-events-in-javascript", // 2024-10-11
      "why-alpine-is-the-new-jquery-and-why-that-is-an-awesome-thing", // 2024-11-07
      // END: 2024js
      "sharing-a-variable-across-html-css-and-javascript", // 2025-01-08
      "simplify-lazy-loading-with-intersection-observers-scrollmargin", // 2025-01-20
      "mapping-with-leaflet", // 2025-01-29
      "css-spotlight-effect", // 2025-05-26
      "view-transition-list-reordering-with-a-kick-flip", // 2025-07-08
      "using-the-custom-highlight-api", // 2025-08-07
      "a-progressive-enhancement-challenge", // 2025-10-03
      // END: 2025js
      // END: js
    ]],[
    "ts", [
      "testing-types-in-typescript", // 2024-06-04
      "a-complete-guide-to-beginning-with-typescript", // 2024-09-06
      "typescript-without-build-tools", // 2024-12-30
      // END: 2024ts
      "satisfies-in-typescript", // 2025-07-03
      // END: 2025ts
      // END: ts
    ]],[
    "js-node", [
      "introducing-drizzle", // 2024-06-17
      "the-pitfalls-of-in-app-browsers", // 2024-07-17
      
      "drizzle-database-migrations", // 2024-12-09
      "baseline-data-choices", // 2024-12-26
      // END: 2024js-node
      "architecture-through-component-colocation", // 2025-08-11
      // END: 2025js-node
      // END: js-node
    ]],[
    "js-react", [
      "prefetching-when-server-loading-wont-do", // 2024-05-15
      "combining-react-server-components-with-react-query-for-easy-data-management", // 2024-05-24
      "what-does-hydration-mean", // 2024-09-09
      "introducing-tanstack-router", // 2024-09-13

      "tanstack-router-data-loading-1", // 2024-11-20
      "tanstack-router-data-loading-2", // 2024-11-21
      "react-19-and-web-component-examples", // 2024-12-16
      "introducing-tanstack-start", // 2024-12-18
      // END: 2024js-react
      "react-internals-which-useeffect-runs-first", // 2025-04-28
      "introducing-zustand", // 2025-07-21
      "css-counters-in-action", // 2025-10-09
      "introducing-tanstack-start-middleware", // 2025-10-24
      // END: 2025js-react
      // END: js-react
    ]],[
    "js-next", [
      "introducing-fly-io", // 2024-12-12
      // END: 2024js-react
      // END: 2025js-react
      // END: js-next
    ]],[
    "js-vue", [
      "exploring-multi-brand-systems-with-tokens-and-composability", // 2025-12-19
      // END: 2025js-vue
      // END: js-vue
    ]],[
    "js-svelte", [
      "using-nextauth-now-auth-js-with-sveltekit", // 2024-04-29
      "introducing-svelte-5", // 2024-07-19
      "snippets-in-svelte-5", // 2024-08-07
      "fine-grained-reactivity-in-svelte-5", // 2024-08-14
      // END: js-svelte
    ]],[
    "css", [
      "light-dom-only", // 2023-12-08
      // END: 2023css
      "we-can-has-it-all", // 2024-01-10

      "creating-flower-shapes-using-css-mask-trigonometric-functions", // 2024-02-29
      "drawing-a-line-to-connect-elements-with-css-anchor-positioning", // 2024-04-02
      "a-css-powered-add-remove-tags-ui", // 2024-04-11 
      "things-that-can-break-aspect-ratio-in-css", // 2024-04-16
      "dark-and-light", // 2024-04-18
      "feedback-on-masonry-layout", // 2024-04-24
      "the-html-css-and-svg-for-a-classic-search-form", // 2024-04-25
      "popover-api-is-here", // 2024-04-30
      "multiplexed-fonts-have-a-cool-superpower", // 2024-05-03
      "using-the-popover-api-for-html-tooltips", // 2024-05-06
      "using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators", // 2024-05-10
      "the-classic-border-radius-advice-plus-an-unusual-trick", // 2024-05-13
      "weve-got-container-queries-now-but-are-we-actually-using-them", // 2024-05-21
      "danger-preventing-zoom-from-changing-text-size", // 2024-05-22
      "animating-dialog", // 2024-05-23
      "how-to-make-a-css-timer", // 2024-05-29
      "live-demos-of-stand-alone-web-components", // 2024-06-06
      "masonry-and-reading-order", // 2024-06-10
      "one-of-the-boss-battles-of-css-is-almost-won-transitioning-to-auto", // 2024-06-12
      "footnotes-progressively-enhanced-to-popovers", // 2024-06-19
      "pure-css-circular-text-without-requiring-a-monospace-font", // 2024-06-21
      "popovers-work-pretty-nicely-as-slide-out-drawers", // 2024-06-24
      "text-reveal-with-conic-gradient", // 2024-06-26
      "youtube-embeds-are-bananas-heavy-and-its-fixable", // 2024-07-01
      "how-keyboard-navigation-works-in-a-css-game", // 2024-07-08
      "single-directionally-allowed-overflow", // 2024-07-10
      "css-does-need-mixins", // 2024-07-12
      "how-to-get-the-width-height-of-any-element-in-only-css", // 2024-07-25
      "what-if-you-used-container-units-for-everything", // 2024-08-02
      "relative-color-syntax-basic-use-cases", // 2024-08-12
      "letting-ios-text-size-setting-affect-font-size-on-the-web", // 2024-08-16
      "the-css-contain-property", // 2024-08-19
      "custom-range-slider-using-anchor-positioning-scroll-driven-animations", // 2024-08-21
      "the-dialog-element-with-entry-and-exit-animations", // 2024-08-28
      "backgrounds-for-the-box-model-and-why-it-can-be-useful", // 2024-09-02
      "split-effects-with-no-content-duplication", // 2024-09-11
      "gradient-text-with-a-drop-shadow", // 2024-09-20
      "keeping-pixely-images-pixely-and-performant", // 2024-09-23

      "fanout-with-grid-and-view-transitions", // 2024-10-14
      "simple-typographic-email-template", // 2024-10-17
      "view-transitions-staggering", // 2024-10-22
      "9-16", // 2024-10-24
      "scroll-driven-sections", // 2024-10-29
      "edge-to-edge-text", // 2024-10-31
      "named-scroll-view-timelines", // 2024-11-04
      "mastering-interaction-to-next-paint-inp", // 2024-11-05
      "scoped-scroll-timelines", // 2024-11-11
      "custom-progress-element-using-anchor-positioning-scroll-driven-animations", // 2024-11-13
      "showing-browser-support-for-web-platform-features-on-your-own-blog", // 2024-11-15
      "no-fuss-light-dark-modes", // 2024-11-18
      "tweaking-one-set-of-colors-for-light-dark-modes", // 2024-11-25
      "the-logical-border-radius-equivalents", // 2024-12-02
      "pure-css-halftone-effect-in-3-declarations", // 2024-12-03
      "multi-state-buttons", // 2024-12-05
      "cant-seem-to-remove-the-formatting-from-a-string-of-text", // 2024-12-06
      "responsive-tables-readable-paragraphs", // 2024-12-11
      "scroll-driven-fixed", // 2024-12-20
      // END: 2024css
      "containers-context", // 2025-01-03
      "bone-up-html-2025", // 2025-01-06
      "sharing-a-variable-across-html-css-and-javascript", // 2025-01-08
      "css-wishlist-for-2025", // 2025-01-14
      "creating-an-angled-slider", // 2025-01-22
      "full-bleed-layout-with-modern-css", // 2025-01-27
      "html-css-for-a-one-time-password-input", // 2025-02-05
      "three-approaches-to-the-ampersand-selector-in-css", // 2025-02-07
      "optimizing-images-for-web-performance", // 2025-02-10
      "rainbow-selection-in-css", // 2025-02-14
      "a-color-input-that-also-shows-the-value", // 2025-02-18
      "how-to-use-attr-in-css-for-columns-colors-and-font-size", // 2025-02-25
      "examples-of-why-the-web-needs-anchored-popovers", // 2025-02-26
      "custom-property-fallbacks", // 2025-02-28
      "movies-as-images", // 2025-03-05
      "chilled-out-text-underlines", // 2025-03-12
      "overlapping-inline-backgrounds", // 2025-03-18
      "one-thing-scope-can-do-is-reduce-concerns-about-source-order", // 2025-03-20
      "layered-text-headers", // 2025-03-24
      "expanding-css-shadow-effects", // 2025-03-28
      "reanimating-the-css-day-buttons", // 2025-03-31
      "css-bursts-with-conic-gradients", // 2025-04-03
      "custom-progress-element-using-the-attr-function", // 2025-04-09
      "using-currentcolor-in-2025", // 2025-04-10
      "the-latest-in-the-how-are-we-going-to-do-masonry-debate-apple-says-item-flow", // 2025-04-11
      "seeking-an-answer-why-cant-html-alone-do-includes", // 2025-04-29
      "curved-box-cutouts-in-css", // 2025-05-01
      "using-container-query-units-relative-to-an-outer-container", // 2025-05-06
      "shape-a-new-powerful-drawing-syntax-in-css", // 2025-05-07
      "creating-flower-shapes-using-clip-path-shape", // 2025-05-12
      "container-query-for-is-there-enough-space-outside-this-element", // 2025-05-13
      "to-flip-or-not-to-flip", // 2025-05-16
      "creating-blob-shapes-using-clip-path-shape", // 2025-05-19
      "chatgpt-and-old-and-broken-code", // 2025-05-20
      "move-modal-in-on-a-shape", // 2025-05-22
      "css-spotlight-effect", // 2025-05-26
      "firstchild-can-be-white-space", // 2025-06-05
      "grainy-gradients", // 2025-06-13
      "scope-in-css", // 2025-06-17
      "drawing-css-shapes-using-corner-shape", // 2025-06-18
      "understanding-css-corner-shape-and-the-power-of-the-superellipse", // 2025-06-23
      "quantity-query-carousel", // 2025-06-25
      "step-gradients-with-a-given-number-of-steps", // 2025-06-30
      "custom-select-that-comes-up-from-the-bottom-on-mobile", // 2025-07-01
      "view-transition-list-reordering-with-a-kick-flip", // 2025-07-08
      "stacked-transforms", // 2025-07-15
      "adaptive-alerts-a-css-scroll-state-use-case", // 2025-07-16
      "the-figcaption-problem", // 2025-07-24
      "should-we-never-use-non-logical-properties", // 2025-07-31
      "infinite-marquee-animation-using-modern-css", // 2025-08-04
      "obsessing-over-smooth-radial-gradient-disc-edges", // 2025-08-20
      "very-early-playing-with-random-in-css", // 2025-08-25
      "opening-a-details-element-from-the-url", // 2025-08-26
      "the-path-of-least-resistance-part-1", // 2025-08-27
      "the-path-of-least-resistance-part-2", // 2025-08-30
      
      "css-offset-and-animation-composition-for-rotating-menus", // 2025-09-17
      "what-you-need-to-know-about-modern-css-2025-edition", // 2025-09-19
      "the-coyier-css-starter", // 2025-09-24
      "learn-media-queries", // 2025-09-29
      "a-progressive-enhancement-challenge", // 2025-10-03
      "numbers-that-fall-scroll-driven-animations-sibling-index", // 2025-10-07
      "css-counters-in-action", // 2025-10-09
      "modern-css-round-out-tabs", // 2025-10-13
      "the-two-button-problem", // 2025-10-21
      "super-simple-full-bleed-breakout-styles", // 2025-10-31
      "perfectly-pointed-tooltips-all-four-sides", // 2025-11-03
      "the-weird-parts-of-position-sticky", // 2025-11-05
      "staggered-animation-with-css-sibling-functions", // 2025-11-07
      "perfectly-pointed-tooltips-to-the-corners", // 2025-11-10
      "browserslist-baseline", // 2025-11-13
      "more-css-random-learning-through-experiments", // 2025-11-18
      "how-to-add-and-remove-items-from-a-native-css-carousel-with-css", // 2025-11-26
      "non-square-image-blur-extensions", // 2025-12-01
      "the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick", // 2025-12-03
      "the-deep-card-conundrum", // 2025-12-04
      "thoughts-on-native-css-mixins", // 2025-12-11
      "different-page-transitions-for-different-circumstances", // 2025-12-16
      // END: 2025css
      // END: css
    ]],[
    "devops", [
      "exactly-how-to-deploy-local-files-to-make-a-live-website", // 2024-05-17
      // END: 2024devops
      "deploy-a-site-with-a-build-process-a-custom-domain-name", // 2025-07-12
      // END: 2025devops
      // END: devops
    ]],[
    "macos", [
      "quick-dark-mode-toggles", // 2025-08-22
      // END: 2025chrome
      // END: chrome
    ]],[
    "github", [
      "the-simplest-way-to-deploy", // 2025-05-29
      // END: 2025github
      // END: github
    ]],[
    "netlify", [
      "deploy-a-site-with-a-build-process-a-custom-domain-name", // 2025-07-12
      // END: 2025netlify
      // END: netlify
    ]],[
    "cloudflare", [
      "deploy-a-site-with-a-build-process-a-custom-domain-name", // 2025-07-12
      // END: 2025cloudflare
      // END: cloudflare
    ]],[
    "docker", [
      "drizzle-database-migrations", // 2024-12-09
      "introducing-fly-io", // 2024-12-12
      // END: 2024docker
      // END: 2025docker
      // END: docker
    ]],[
    "fly", [
      "introducing-fly-io", // 2024-12-12
      // END: 2024fly
      // END: 2025fly
      // END: fly
    ]],[
    "vscode", [
      // END: 2024vscode
      "notes-on-the-code-editors-with-ai-landscape", // 2025-02-03
      // END: 2025vscode
      // END: vscode
    ]],[
    "chrome", [
      "playing-with-the-speculation-rules-api-in-the-console", // 2024-06-07
      "why-is-this-thing-in-dark-mode", // 2024-07-03
      // END: 2024chrome
      "newfangled-browser-alternatives", // 2025-04-22
      "quick-dark-mode-toggles", // 2025-08-22
      // END: 2025chrome
      // END: chrome
    ]],[
    "firefox", [
      "quick-dark-mode-toggles", // 2025-08-22
      // END: 2025chrome
      // END: chrome
    ]],[
    "safari", [
      "quick-dark-mode-toggles", // 2025-08-22
      // END: 2025chrome
      // END: chrome
    ]],[
    "figma", [
      "figma-typography-variables", // 2024-08-05
      // END: 2024figma
      // END: figma
    ]],[
    "cursor", [
      // END: 2024cursor
      "getting-started-with-cursor", // 2025-09-08
      "choosing-the-right-model-in-cursor", // 2025-09-09
      // END: 2025cursor
      // END: cursor
    ]],[
    "data-science", [
      "what-is-sql-database-definition-for-beginners", // 2023-01-13
      // END: 2023data-science
      // END: 2024data-science
      "the-moment-you-need-a-database", // 2025-03-10
      // END: 2025data-science
      // END: data-science
    ]],[
    "postgres", [
      "drizzle-database-migrations", // 2024-12-09
      // END: 2024postgres
      "intro-to-postgres-indexes", // 2025-09-01
      "advanced-postgresql-indexing", // 2025-09-03
      // END: 2025postgres
      // END: postgres
    ]],[
    "openai", [
      "chatgpt-and-old-and-broken-code", // 2025-05-20
      // END: 2025openai
      // END: openai
    ]],[
    "system-design", [
      "web-design-what-is-the-web-capable-of-that-is-hard-to-express-in-design-software", // 2025-08-18
      // END: 2025system-design
      // END: system-design
    ]],[
    "career", [
      "fast-and-budget-friendly-user-research-and-testing", // 2024-06-04
      "what-skills-should-you-focus-on-as-junior-web-developer-in-2024", // 2024-08-26
      "what-software-developer-skills-should-you-focus-on-leading-into-2025", // 2024-09-25
      // END: 2024career
      "am-i-a-sadistic-developer-are-you", // 2025-04-24
      // END: 2025career
      // END: career
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
    ]]
  ])
}