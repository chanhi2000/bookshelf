import type { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const Y2016: SidebarYeargroupTemplate = {
  text: '2016',
  collapsible: true,
  children: [
    // END: 2016
  ]
}

const Y2017: SidebarYeargroupTemplate = {
  text: '2017',
  collapsible: true,
  children: [
    // END: 2017
  ]
}

const Y2018: SidebarYeargroupTemplate = {
  text: '2018',
  collapsible: true,
  children: [
    // END: 2018
  ]
}

const Y2019: SidebarYeargroupTemplate = {
  text: '2019',
  collapsible: true,
  children: [
    // END: 2019
  ]
}

const Y2020: SidebarYeargroupTemplate = {
  text: '2020',
  collapsible: true,
  children: [
    // END: 2020
  ]
}

const Y2021: SidebarYeargroupTemplate = {
  text: '2021',
  collapsible: true,
  children: [
    // END: 2021
  ]
}

const Y2022: SidebarYeargroupTemplate = {
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
  ]
}

const Y2023: SidebarYeargroupTemplate = {
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
  ]
}

const Y2024: SidebarYeargroupTemplate = {
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
  ]
}

const Y2025: SidebarYeargroupTemplate = {
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
  ]
}

export const template: SidebarGroupOptions = {
    text: 'hackingwithswift.com',
    collapsible: true,
    icon: 'https://hackingwithswift.com/favicon.svg',
    children: [
      {
        text: "What's new in Swift?",
        collapsible: true,
        icon: 'fa-brands fa-swift',
        children: [
          '/hackingwithswift.com/swift/README.md',
          {
            text: "Changes in Swift 6.0",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/6.0/concurrency.md',
              '/hackingwithswift.com/swift/6.0/count-where.md',
              '/hackingwithswift.com/swift/6.0/typed-throws.md',
              '/hackingwithswift.com/swift/6.0/pack-iteration.md',
              '/hackingwithswift.com/swift/6.0/rangeset.md',
              '/hackingwithswift.com/swift/6.0/access-level-import.md',
              '/hackingwithswift.com/swift/6.0/noncopyable-upgrades.md',
              '/hackingwithswift.com/swift/6.0/int128.md',
              '/hackingwithswift.com/swift/6.0/bitwisecopyable.md',
            ]
          }, {
            text: "Changes in Swift 5.10",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.10/complete-concurrency.md',
              '/hackingwithswift.com/swift/5.10/nested-protocols.md',
              '/hackingwithswift.com/swift/5.10/deprecate-uiapplicationmain.md',
              '/hackingwithswift.com/swift/5.10/actor-initialization.md',
            ]
          }, {
            text: "Changes in Swift 5.9",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.9/if-switch-expressions.md',
              '/hackingwithswift.com/swift/5.9/variadic-generics.md',
              '/hackingwithswift.com/swift/5.9/macros.md',
              '/hackingwithswift.com/swift/5.9/noncopyable-structs-and-enums.md',
              '/hackingwithswift.com/swift/5.9/consume-operator.md',
              '/hackingwithswift.com/swift/5.9/convenience-asyncthrowingstream-makestream.md',
              '/hackingwithswift.com/swift/5.9/sleep-for-clock.md',
              '/hackingwithswift.com/swift/5.9/discarding-task-groups.md',
            ]
          }, {
            text: "Changes in Swift 5.8",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.8/lift-result-builder-limitations.md',
              '/hackingwithswift.com/swift/5.8/function-back-deployment.md',
              '/hackingwithswift.com/swift/5.8/implicit-self-weak-capture.md',
              '/hackingwithswift.com/swift/5.8/concise-magic-file-names.md',
              '/hackingwithswift.com/swift/5.8/opening-existential-optional.md',
              '/hackingwithswift.com/swift/5.8/collection-downcasts.md',
            ]
          }, {
            text: "Changes in Swift 5.7",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.7/if-let-shorthand.md',
              '/hackingwithswift.com/swift/5.7/multi-statement-inference.md',
              '/hackingwithswift.com/swift/5.7/clock.md',
              '/hackingwithswift.com/swift/5.7/regexes.md',
              '/hackingwithswift.com/swift/5.7/default-type-inference.md',
              '/hackingwithswift.com/swift/5.7/top-level-concurrency.md',
              '/hackingwithswift.com/swift/5.7/opaque-parameter-declarations.md',
              '/hackingwithswift.com/swift/5.7/structural-opaque-result-types.md',
              '/hackingwithswift.com/swift/5.7/unlock-existentials.md',
              '/hackingwithswift.com/swift/5.7/primary-associated-types.md',
              '/hackingwithswift.com/swift/5.7/constrained-existentials.md',
              '/hackingwithswift.com/swift/5.7/distributed-actors.md',
              '/hackingwithswift.com/swift/5.7/buildpartialblock.md',
              '/hackingwithswift.com/swift/5.7/implicitly-opened-existentials.md',
              '/hackingwithswift.com/swift/5.7/noasync.md',
            ]
          }, {
            text: "Changes in Swift 5.6",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.6/existential-any.md',
              '/hackingwithswift.com/swift/5.6/type-placeholders.md',
              '/hackingwithswift.com/swift/5.6/codingkeyrepresentable.md',
              '/hackingwithswift.com/swift/5.6/unavailable.md',
              '/hackingwithswift.com/swift/5.6/preconcurrency.md',
              '/hackingwithswift.com/swift/5.6/swiftpm-plugins.md',
            ]
          }, {
            text: "Changes in Swift 5.5",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.5/async-await.md',
              '/hackingwithswift.com/swift/5.5/async-sequences.md',
              '/hackingwithswift.com/swift/5.5/effectful-read-only-properties.md',
              '/hackingwithswift.com/swift/5.5/structured-concurrency.md',
              '/hackingwithswift.com/swift/5.5/async-let-bindings.md',
              '/hackingwithswift.com/swift/5.5/continuations.md',
              '/hackingwithswift.com/swift/5.5/actors.md',
              '/hackingwithswift.com/swift/5.5/global-actors.md',
              '/hackingwithswift.com/swift/5.5/sendable.md',
              '/hackingwithswift.com/swift/5.5/postfix-if.md',
              '/hackingwithswift.com/swift/5.5/interchangeable-cgfloat-double.md',
              '/hackingwithswift.com/swift/5.5/codable-enums.md',
              '/hackingwithswift.com/swift/5.5/local-lazy.md',
              '/hackingwithswift.com/swift/5.5/property-wrapper-function-parameters.md',
              '/hackingwithswift.com/swift/5.5/static-member-generic.md',
            ]
          }, {
            text: "Changes in Swift 5.4",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.4/improved-implicit-member-syntax.md',
              '/hackingwithswift.com/swift/5.4/multiple-variadic-parameters-in-functions.md',
              '/hackingwithswift.com/swift/5.4/local-functions-now-support-overloading.md',
              '/hackingwithswift.com/swift/5.4/local-variables-same-name.md',
              '/hackingwithswift.com/swift/5.4/result-builders.md',
              '/hackingwithswift.com/swift/5.4/local-property-wrappers.md',
              '/hackingwithswift.com/swift/5.4/spm-executable-targets.md',
            ]
          }, {
            text: "Changes in Swift 5.3",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.3/multipattern-catch.md',
              '/hackingwithswift.com/swift/5.3/multiple-trailing-closures.md',
              '/hackingwithswift.com/swift/5.3/synthesized-comparable-enum.md',
              '/hackingwithswift.com/swift/5.3/removing-self.md',
              '/hackingwithswift.com/swift/5.3/atmain.md',
              '/hackingwithswift.com/swift/5.3/where-clauses.md',
              '/hackingwithswift.com/swift/5.3/enum-protocol-witnesses.md',
              '/hackingwithswift.com/swift/5.3/refined-didset.md',
              '/hackingwithswift.com/swift/5.3/float16.md',
              '/hackingwithswift.com/swift/5.3/spm-improvements.md',
            ]
          }, {
            text: "Changes in Swift 5.2",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.2/keypath-expressions.md',
              '/hackingwithswift.com/swift/5.2/callasfunction.md',
              '/hackingwithswift.com/swift/5.2/subscript-default-arguments.md',
              '/hackingwithswift.com/swift/5.2/lazy-filtering.md',
              '/hackingwithswift.com/swift/5.2/new-diagnostics.md',
            ]
          }, {
            text: "Changes in Swift 5.1",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.1/improved-memberwise-initializers.md',
              '/hackingwithswift.com/swift/5.1/implicit-returns.md',
              '/hackingwithswift.com/swift/5.1/universal-self.md',
              '/hackingwithswift.com/swift/5.1/opaque-return-types.md',
              '/hackingwithswift.com/swift/5.1/static-subscripts.md',
              '/hackingwithswift.com/swift/5.1/ambiguous-none-enum.md',
              '/hackingwithswift.com/swift/5.1/matching-optional-enums.md',
              '/hackingwithswift.com/swift/5.1/ordered-collection-diffing.md',
              '/hackingwithswift.com/swift/5.1/creating-uninitialized-arrays.md',
            ]
          }, {
            text: "Changes in Swift 5.0",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/5.0/raw-strings.md',
              '/hackingwithswift.com/swift/5.0/result.md',
              '/hackingwithswift.com/swift/5.0/string-interpolation.md',
              '/hackingwithswift.com/swift/5.0/dynamically-callable-types.md',
              '/hackingwithswift.com/swift/5.0/handling-future-enum-cases.md',
              '/hackingwithswift.com/swift/5.0/flattening-optionals.md',
              '/hackingwithswift.com/swift/5.0/integer-multiples.md',
              '/hackingwithswift.com/swift/5.0/compactmapvalues.md',
            ]
          }, {
            text: "Changes in Swift 4.2",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/4.2/caseiterable.md',
              '/hackingwithswift.com/swift/4.2/warning-error.md',
              '/hackingwithswift.com/swift/4.2/dynamic-member-lookup.md',
              '/hackingwithswift.com/swift/4.2/conditional-conformance.md',
              '/hackingwithswift.com/swift/4.2/random.md',
              '/hackingwithswift.com/swift/4.2/hashable.md',
              '/hackingwithswift.com/swift/4.2/allsatisfy.md',
              '/hackingwithswift.com/swift/4.2/remove-where.md',
              '/hackingwithswift.com/swift/4.2/toggle.md',
            ]
          }, {
            text: "Changes in Swift 4.1",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/4.1/synthesized-protocols.md',
              '/hackingwithswift.com/swift/4.1/key-decoding-strategies.md',
              '/hackingwithswift.com/swift/4.1/conditional-conformance.md',
              '/hackingwithswift.com/swift/4.1/recursive-constraints.md',
              '/hackingwithswift.com/swift/4.1/import-testing.md',
              '/hackingwithswift.com/swift/4.1/target-environment.md',
              '/hackingwithswift.com/swift/4.1/compactmap.md',
            ]
          }, {
            text: "Changes in Swift 4.0",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/4.0/codable.md',
              '/hackingwithswift.com/swift/4.0/multiline-strings.md',
              '/hackingwithswift.com/swift/4.0/keypaths.md',
              '/hackingwithswift.com/swift/4.0/dictionaries.md',
              '/hackingwithswift.com/swift/4.0/strings.md',
              '/hackingwithswift.com/swift/4.0/one-sided-ranges.md',
            ]          
          }, {
            text: "Changes in Swift 3.1",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/3.1/concrete-constrained-extensions.md',
              '/hackingwithswift.com/swift/3.1/generic-nested-types.md',
              '/hackingwithswift.com/swift/3.1/prefix-drop.md',
            ]
          }, {
            text: "Changes in Swift 3.0",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/3.0/function-parameters.md',
              '/hackingwithswift.com/swift/3.0/omit-needless-words.md',
              '/hackingwithswift.com/swift/3.0/lower-camel-case.md',
              '/hackingwithswift.com/swift/3.0/c-functions.md',
              '/hackingwithswift.com/swift/3.0/verbs-and-nouns.md',
            ]
          }, {
            text: "Changes in Swift 2.2",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/2.2/increment-decrement.md',
              '/hackingwithswift.com/swift/2.2/c-loops.md',
              '/hackingwithswift.com/swift/2.2/comparing-tuples.md',
              '/hackingwithswift.com/swift/2.2/tuple-splat.md',
              '/hackingwithswift.com/swift/2.2/more-keywords.md',
              '/hackingwithswift.com/swift/2.2/variable-parameters.md',
              '/hackingwithswift.com/swift/2.2/renamed-identifiers.md',
              '/hackingwithswift.com/swift/2.2/stringified-selectors.md',
              '/hackingwithswift.com/swift/2.2/version-checking.md',
            ]
          }, {
            text: "Changes in Swift 2.1",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/2.1/string-interpolation.md',
            ]
          }, {
            text: "Changes in Swift 2.0",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/2.0/try.md',
              '/hackingwithswift.com/swift/2.0/guard.md',
              '/hackingwithswift.com/swift/2.0/strings.md',
              '/hackingwithswift.com/swift/2.0/defer.md',
              '/hackingwithswift.com/swift/2.0/mutability.md',
              '/hackingwithswift.com/swift/2.0/api-availability.md',
            ]
          }, {
            text: "Changes in Swift 1.2",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/1.2/zip.md',
              '/hackingwithswift.com/swift/1.2/flatmap.md',
              '/hackingwithswift.com/swift/1.2/noescape.md',
              '/hackingwithswift.com/swift/1.2/static.md',
              '/hackingwithswift.com/swift/1.2/constants.md',
              '/hackingwithswift.com/swift/1.2/set.md',
              '/hackingwithswift.com/swift/1.2/bridging.md',
              '/hackingwithswift.com/swift/1.2/if-let.md',
              '/hackingwithswift.com/swift/1.2/typecasting.md',
            ]
          }, {
            text: "Changes in Swift 1.1",
            collapsible: true,
            children: [
              '/hackingwithswift.com/swift/1.1/countelements.md',
              '/hackingwithswift.com/swift/1.1/nsapplicationmain.md',
            ]
          },
        ]
      }, {
        text: 'Hacking with iOS',
        collapsible: true,
        icon: 'iconfont icon-ios',
        children: [
          '/hackingwithswift.com/read/README.md',
          {
            text: 'Introduction: Swift for Complete Beginners',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/00/overview.md',
              '/hackingwithswift.com/read/00/01-how-to-install-xcode-and-create-a-playground.md',
              '/hackingwithswift.com/read/00/02-variables-and-constants.md',
              '/hackingwithswift.com/read/00/03-types-of-data.md',
              '/hackingwithswift.com/read/00/04-operators.md',
              '/hackingwithswift.com/read/00/05-string-interpolation.md',
              '/hackingwithswift.com/read/00/06-arrays.md',
              '/hackingwithswift.com/read/00/07-dictionaries.md',
              '/hackingwithswift.com/read/00/08-conditional-statements.md',
              '/hackingwithswift.com/read/00/09-loops.md',
              '/hackingwithswift.com/read/00/10-switch-case.md',
              '/hackingwithswift.com/read/00/11-functions.md',
              '/hackingwithswift.com/read/00/12-optionals.md',
              '/hackingwithswift.com/read/00/13-optional-chaining.md',
              '/hackingwithswift.com/read/00/14-enumerations.md',
              '/hackingwithswift.com/read/00/15-structs.md',
              '/hackingwithswift.com/read/00/16-classes.md',
              '/hackingwithswift.com/read/00/17-properties.md',
              '/hackingwithswift.com/read/00/18-static-properties-and-methods.md',
              '/hackingwithswift.com/read/00/19-access-control.md',
              '/hackingwithswift.com/read/00/20-polymorphism-and-typecasting.md',
              '/hackingwithswift.com/read/00/21-closures.md',
              '/hackingwithswift.com/read/00/22-protocols.md',
              '/hackingwithswift.com/read/00/23-extensions.md',
              '/hackingwithswift.com/read/00/24-protocol-extensions.md',
              '/hackingwithswift.com/read/00/25-wrap-up.md',
            ]
          }, {
            text: 'Project 1: Storm Viewer',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/01/overview.md',
              '/hackingwithswift.com/read/01/01-setting-up.md',
              '/hackingwithswift.com/read/01/02-listing-images-with-filemanager.md',
              '/hackingwithswift.com/read/01/03-designing-our-interface.md',
              '/hackingwithswift.com/read/01/04-building-a-detail-screen.md',
              '/hackingwithswift.com/read/01/05-loading-images-with-uiimage.md',
              '/hackingwithswift.com/read/01/06-final-tweaks-hidesbarsontap-and-large-titles.md',
              '/hackingwithswift.com/read/01/07-wrap-up.md',
            ]
          }, {
            text: 'Project 2: Guess the Flag',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/02/overview.md',
              '/hackingwithswift.com/read/02/01-setting-up.md',
              '/hackingwithswift.com/read/02/02-designing-your-layout.md',
              '/hackingwithswift.com/read/02/03-making-the-basic-game-work-uibutton-and-calayer.md',
              '/hackingwithswift.com/read/02/04-guess-which-flag-random-numbers.md',
              '/hackingwithswift.com/read/02/05-from-outlets-to-actions-creating-an-ibaction.md',
              '/hackingwithswift.com/read/02/06-wrap-up.md',
            ]
          }, {
            text: 'Project 3: Social Media',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/03/overview.md',
              '/hackingwithswift.com/read/03/01-about-technique-projects.md',
              '/hackingwithswift.com/read/03/02-uiactivityviewcontroller-explained.md',
              '/hackingwithswift.com/read/03/03-wrap-up.md',
            ]
          }, {
            text: 'Project 4: Easy Browser',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/04/overview.md',
              '/hackingwithswift.com/read/04/01-setting-up.md',
              '/hackingwithswift.com/read/04/02-creating-a-simple-browser-with-wkwebview.md',
              '/hackingwithswift.com/read/04/03-choosing-a-website-uialertcontroller-action-sheets.md',
              '/hackingwithswift.com/read/04/04-monitoring-page-loads-uitoolbar-and-uiprogressview.md',
              '/hackingwithswift.com/read/04/05-refactoring-for-the-win.md',
              '/hackingwithswift.com/read/04/06-wrap-up.md',
            ]
          }, {
            text: 'Project 5: Word Scramble',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/05/overview.md',
              '/hackingwithswift.com/read/05/01-setting-up.md',
              '/hackingwithswift.com/read/05/02-reading-from-disk-contentsof.md',
              '/hackingwithswift.com/read/05/03-pick-a-word-any-word-uialertcontroller.md',
              '/hackingwithswift.com/read/05/04-prepare-for-submission-lowercased-and-indexpath.md',
              '/hackingwithswift.com/read/05/05-checking-for-valid-answers.md',
              '/hackingwithswift.com/read/05/06-or-else-what.md',
              '/hackingwithswift.com/read/05/07-wrap-up.md',
            ]
          }, {
            text: 'Project 6: Auto Layout',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/06/overview.md',
              '/hackingwithswift.com/read/06/01-setting-up.md',
              '/hackingwithswift.com/read/06/02-advanced-auto-layout.md',
              '/hackingwithswift.com/read/06/03-auto-layout-in-code-addconstraints-with-visual-format-language.md',
              '/hackingwithswift.com/read/06/04-auto-layout-metrics-and-priorities-constraintswithvisualformat.md',
              '/hackingwithswift.com/read/06/05-auto-layout-anchors.md',
              '/hackingwithswift.com/read/06/06-wrap-up.md',
            ]
          }, {
            text: 'Project 7: Whitehouse Petitions',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/07/overview.md',
              '/hackingwithswift.com/read/07/01-setting-up.md',
              '/hackingwithswift.com/read/07/02-creating-the-basic-ui-uitabbarcontroller.md',
              '/hackingwithswift.com/read/07/03-parsing-json-using-the-codable-protocol.md',
              '/hackingwithswift.com/read/07/04-rendering-a-petition-loadhtmlstring.md',
              '/hackingwithswift.com/read/07/05-finishing-touches-didfinishlaunchingwithoptions.md',
              '/hackingwithswift.com/read/07/06-wrap-up.md',
            ]
          }, {
            text: 'Project 8: 7 Swifty Words',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/08/overview.md',
              '/hackingwithswift.com/read/08/01-setting-up.md',
              '/hackingwithswift.com/read/08/02-building-a-uikit-user-interface-programmatically.md',
              '/hackingwithswift.com/read/08/03-loading-a-level-and-adding-button-targets.md',
              '/hackingwithswift.com/read/08/04-its-play-time-firstindexof-and-joined.md',
              '/hackingwithswift.com/read/08/05-property-observers-didset.md',
              '/hackingwithswift.com/read/08/06-wrap-up.md',
            ]
          }, {
            text: 'Project 9: Grand Central Dispatch',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/09/overview.md',
              '/hackingwithswift.com/read/09/01-setting-up.md',
              '/hackingwithswift.com/read/09/02-why-is-locking-the-ui-bad.md',
              '/hackingwithswift.com/read/09/03-gcd-101-async.md',
              '/hackingwithswift.com/read/09/04-back-to-the-main-thread-dispatchqueuemain.md',
              '/hackingwithswift.com/read/09/05-easy-gcd-using-performselectorinbackground.md',
              '/hackingwithswift.com/read/09/06-wrap-up.md',
            ]
          }, {
            text: 'Project 10: Names to Faces',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/10/overview.md',
              '/hackingwithswift.com/read/10/01-setting-up.md',
              '/hackingwithswift.com/read/10/02-designing-uicollectionview-cells.md',
              '/hackingwithswift.com/read/10/03-uicollectionview-data-sources.md',
              '/hackingwithswift.com/read/10/04-importing-photos-with-uiimagepickercontroller.md',
              '/hackingwithswift.com/read/10/05-custom-subclasses-of-nsobject.md',
              '/hackingwithswift.com/read/10/06-connecting-up-the-people.md',
              '/hackingwithswift.com/read/10/07-wrap-up.md',
            ]
          }, {
            text: 'Project 11: Pachinko',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/11/overview.md',
              '/hackingwithswift.com/read/11/01-setting-up.md',
              '/hackingwithswift.com/read/11/02-falling-boxes-skspritenode-uitouch-skphysicsbody.md',
              '/hackingwithswift.com/read/11/03-bouncing-balls-circleofradius.md',
              '/hackingwithswift.com/read/11/04-spinning-slots-skaction.md',
              '/hackingwithswift.com/read/11/05-collision-detection-skphysicscontactdelegate.md',
              '/hackingwithswift.com/read/11/06-scores-on-the-board-sklabelnode.md',
              '/hackingwithswift.com/read/11/07-special-effects-skemitternode.md',
              '/hackingwithswift.com/read/11/08-wrap-up.md',
            ]
          }, {
            text: 'Project 12: UserDefaults',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/12/overview.md',
              '/hackingwithswift.com/read/12/01-setting-up.md',
              '/hackingwithswift.com/read/12/02-reading-and-writing-basics-userdefaults.md',
              '/hackingwithswift.com/read/12/03-fixing-project-10-nscoding.md',
              '/hackingwithswift.com/read/12/04-fixing-project-10-codable.md',
              '/hackingwithswift.com/read/12/05-wrap-up.md',
            ]
          }, {
            text: 'Project 13: Instafilter',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/13/overview.md',
              '/hackingwithswift.com/read/13/01-setting-up.md',
              '/hackingwithswift.com/read/13/02-designing-the-interface.md',
              '/hackingwithswift.com/read/13/03-importing-a-picture.md',
              '/hackingwithswift.com/read/13/04-applying-filters-cicontext-cifilter.md',
              '/hackingwithswift.com/read/13/05-saving-to-the-ios-photo-library.md',
              '/hackingwithswift.com/read/13/06-wrap-up.md',
            ]
          }, {
            text: 'Project 14: Whack-a-Penguin',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/14/overview.md',
              '/hackingwithswift.com/read/14/01-setting-up.md', 
              '/hackingwithswift.com/read/14/02-getting-up-and-running-skcropnode.md', 
              '/hackingwithswift.com/read/14/03-penguin-show-thyself-skaction-movebyxyduration.md', 
              '/hackingwithswift.com/read/14/04-whack-to-win-skaction-sequences.md', 
              '/hackingwithswift.com/read/14/05-wrap-up.md', 
            ]
          }, {
            text: 'Project 15: Animation',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/15/overview.md',
              '/hackingwithswift.com/read/15/01-setting-up.md',
              '/hackingwithswift.com/read/15/02-preparing-for-action.md',
              '/hackingwithswift.com/read/15/03-switch-case-animate-animatewithduration.md',
              '/hackingwithswift.com/read/15/04-transform-cgaffinetransform.md',
              '/hackingwithswift.com/read/15/05-wrap-up.md',
            ]
          }, {
            text: 'Project 16: Capital Cities',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/16/overview.md',
              '/hackingwithswift.com/read/16/01-setting-up.md',
              '/hackingwithswift.com/read/16/02-up-and-running-with-mapkit.md',
              '/hackingwithswift.com/read/16/03-annotations-and-accessory-views-mkpinannotationview.md',
              '/hackingwithswift.com/read/16/04-wrap-up.md',
            ]
          }, {
            text: 'Project 17: Space Race',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/17/overview.md',
              '/hackingwithswift.com/read/17/01-setting-up.md',
              '/hackingwithswift.com/read/17/02-space-the-final-frontier.md',
              '/hackingwithswift.com/read/17/03-bring-on-the-enemies-timer-lineardamping-angulardamping.md',
              '/hackingwithswift.com/read/17/04-making-contact-didbegin.md',
              '/hackingwithswift.com/read/17/05-wrap-up.md',
            ]
          }, {
            text: 'Project 18: Debugging',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/18/overview.md',
              '/hackingwithswift.com/read/18/01-setting-up.md',
              '/hackingwithswift.com/read/18/02-basic-swift-debugging-using-print.md',
              '/hackingwithswift.com/read/18/03-debugging-with-assert.md',
              '/hackingwithswift.com/read/18/04-debugging-with-breakpoints.md',
              '/hackingwithswift.com/read/18/05-view-debugging.md',
              '/hackingwithswift.com/read/18/06-wrap-up.md',
            ]
          }, {
            text: 'Project 19: JavaScript Injection',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/19/overview.md',
              '/hackingwithswift.com/read/19/01-setting-up.md',
              '/hackingwithswift.com/read/19/02-making-a-shell-app.md',
              '/hackingwithswift.com/read/19/03-adding-an-extension-nsextensionitem.md',
              '/hackingwithswift.com/read/19/04-what-do-you-want-to-get.md',
              '/hackingwithswift.com/read/19/05-establishing-communication.md',
              '/hackingwithswift.com/read/19/06-editing-multiline-text-with-uitextview.md',
              '/hackingwithswift.com/read/19/07-fixing-the-keyboard-notificationcenter.md',
              '/hackingwithswift.com/read/19/08-wrap-up.md',
            ]
          }, {
            text: 'Project 20: Fireworks Night',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/20/overview.md',
              '/hackingwithswift.com/read/20/01-setting-up.md',
              '/hackingwithswift.com/read/20/02-ready-aim-fire-timer-and-follow.md',
              '/hackingwithswift.com/read/20/03-swipe-to-select.md',
              '/hackingwithswift.com/read/20/04-making-things-go-bang-skemitternode.md',
              '/hackingwithswift.com/read/20/05-wrap-up.md',
            ]
          }, {
            text: 'Project 21: Local Notifications',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/21/overview.md',
              '/hackingwithswift.com/read/21/01-setting-up.md',
              '/hackingwithswift.com/read/21/02-scheduling-notifications-unusernotificationcenter-and-unnotificationrequest.md',
              '/hackingwithswift.com/read/21/03-acting-on-responses.md',
              '/hackingwithswift.com/read/21/04-wrap-up.md',
            ]
          }, {
            text: 'Project 22: Detect-a-Beacon',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/22/overview.md',
              '/hackingwithswift.com/read/22/01-setting-up.md',
              '/hackingwithswift.com/read/22/02-requesting-location-core-location.md',
              '/hackingwithswift.com/read/22/03-hunting-the-beacon-clbeaconregion.md',
              '/hackingwithswift.com/read/22/04-wrap-up.md',
            ]
          }, {
            text: 'Project 23: Swifty Ninja',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/23/overview.md',
              '/hackingwithswift.com/read/23/01-setting-up.md',
              '/hackingwithswift.com/read/23/02-basics-quick-start-skshapenode.md',
              '/hackingwithswift.com/read/23/03-shaping-up-for-action-cgpath-and-uibezierpath.md',
              '/hackingwithswift.com/read/23/04-enemy-or-bomb-avaudioplayer.md',
              '/hackingwithswift.com/read/23/05-follow-the-sequence.md',
              '/hackingwithswift.com/read/23/06-slice-to-win.md',
              '/hackingwithswift.com/read/23/07-game-over-man-sktexture.md',
              '/hackingwithswift.com/read/23/08-wrap-up.md',
            ]
          }, {
            text: 'Project 24: Swift Strings',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/24/overview.md',
              '/hackingwithswift.com/read/24/01-setting-up.md',
              '/hackingwithswift.com/read/24/02-strings-are-not-arrays.md',
              '/hackingwithswift.com/read/24/03-working-with-strings-in-swift.md',
              '/hackingwithswift.com/read/24/04-formatting-strings-with-nsattributedstring.md',
              '/hackingwithswift.com/read/24/05-wrap-up.md',
            ]
          }, {
            text: 'Project 25: Selfie Share',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/25/overview.md',
              '/hackingwithswift.com/read/25/01-setting-up.md',
              '/hackingwithswift.com/read/25/02-importing-photos-again.md',
              '/hackingwithswift.com/read/25/03-going-peer-to-peer-mcsession-mcbrowserviewcontroller.md',
              '/hackingwithswift.com/read/25/04-invitation-only-mcpeerid.md',
              '/hackingwithswift.com/read/25/05-wrap-up.md',
            ]
          }, {
            text: 'Project 26: Marble Maze',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/26/overview.md',
              '/hackingwithswift.com/read/26/01-setting-up.md',
              '/hackingwithswift.com/read/26/02-loading-a-level-categorybitmask-collisionbitmask-contacttestbitmask.md',
              '/hackingwithswift.com/read/26/03-tilt-to-move-cmmotionmanager.md',
              '/hackingwithswift.com/read/26/04-contacting-but-not-colliding.md',
              '/hackingwithswift.com/read/26/05-wrap-up.md',
            ]
          }, {
            text: 'Project 27: Core Graphics',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/27/overview.md',
              '/hackingwithswift.com/read/27/01-setting-up.md',
              '/hackingwithswift.com/read/27/02-creating-the-sandbox.md',
              '/hackingwithswift.com/read/27/03-drawing-into-a-core-graphics-context-with-uigraphicsimagerenderer.md',
              '/hackingwithswift.com/read/27/04-ellipses-and-checkerboards.md',
              '/hackingwithswift.com/read/27/05-transforms-and-lines.md',
              '/hackingwithswift.com/read/27/06-images-and-text.md',
              '/hackingwithswift.com/read/27/07-wrap-up.md',
            ]
          }, {
            text: 'Project 28: Secret Swift',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/28/overview.md',
              '/hackingwithswift.com/read/28/01-setting-up.md',
              '/hackingwithswift.com/read/28/02-creating-a-basic-text-editor.md',
              '/hackingwithswift.com/read/28/03-writing-somewhere-safe-the-ios-keychain.md',
              '/hackingwithswift.com/read/28/04-touch-to-activate-touch-id-face-id-and-localauthentication.md',
              '/hackingwithswift.com/read/28/05-wrap-up.md',
            ]
          }, {
            text: 'Project 29: Exploding Monkeys',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/29/overview.md',
              '/hackingwithswift.com/read/29/01-setting-up.md',
              '/hackingwithswift.com/read/29/02-building-the-environment-sktexture-and-filling-a-path.md',
              '/hackingwithswift.com/read/29/03-mixing-uikit-and-spritekit-uislider-and-skview.md',
              '/hackingwithswift.com/read/29/04-unleash-the-bananas-spritekit-texture-atlases.md',
              '/hackingwithswift.com/read/29/05-destructible-terrain-presentscene.md',
              '/hackingwithswift.com/read/29/06-wrap-up.md',
            ]
          }, {
            text: 'Project 30: Instruments',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/30/overview.md',
              '/hackingwithswift.com/read/30/01-setting-up.md',
              '/hackingwithswift.com/read/30/02-what-are-we-working-with.md',
              '/hackingwithswift.com/read/30/03-what-can-instruments-tell-us.md',
              '/hackingwithswift.com/read/30/04-fixing-the-bugs-slow-shadows.md',
              '/hackingwithswift.com/read/30/05-fixing-the-bugs-wasted-allocations.md',
              '/hackingwithswift.com/read/30/06-fixing-the-bugs-running-out-of-memory.md',
              '/hackingwithswift.com/read/30/07-wrap-up.md',
            ]
          }, {
            text: 'Project 31: Multibrowser',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/31/overview.md',
              '/hackingwithswift.com/read/31/01-setting-up.md',
              '/hackingwithswift.com/read/31/02-uistackview-by-example.md',
              '/hackingwithswift.com/read/31/03-adding-views-to-uistackview-with-addarrangedsubview.md',
              '/hackingwithswift.com/read/31/04-removing-views-from-a-uistackview-with-removearrangedsubview.md',
              '/hackingwithswift.com/read/31/05-ipad-multitasking.md',
              '/hackingwithswift.com/read/31/06-wrap-up.md',
            ]
          }, {
            text: 'Project 32: SwiftSearcher',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/32/overview.md',
              '/hackingwithswift.com/read/32/01-setting-up.md',
              '/hackingwithswift.com/read/32/02-automatically-resizing-uitableviewcells-with-dynamic-type-and-nsattributedstring.md',
              '/hackingwithswift.com/read/32/03-how-to-use-sfsafariviewcontroller-to-browse-a-web-page.md',
              '/hackingwithswift.com/read/32/04-how-to-add-core-spotlight-to-index-your-app-content.md',
              '/hackingwithswift.com/read/32/05-wrap-up.md',
            ]
          }, {
            text: 'Project 33: What\'s that Whistle?',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/33/overview.md',
              '/hackingwithswift.com/read/33/01-setting-up.md',
              '/hackingwithswift.com/read/33/02-recording-from-the-microphone-with-avaudiorecorder.md',
              '/hackingwithswift.com/read/33/03-animating-uistackview-subview-layout.md',
              '/hackingwithswift.com/read/33/04-writing-to-icloud-with-cloudkit-ckrecord-and-ckasset.md',
              '/hackingwithswift.com/read/33/05-a-hands-on-guide-to-the-cloudkit-dashboard.md',
              '/hackingwithswift.com/read/33/06-reading-from-icloud-with-cloudkit-ckqueryoperation-and-nspredicate.md',
              '/hackingwithswift.com/read/33/07-working-with-cloudkit-records-ckrecordreference-fetchwithrecordid-and-save.md',
              '/hackingwithswift.com/read/33/08-delivering-notifications-with-cloudkit-push-messages-ckquerysubscription.md',
              '/hackingwithswift.com/read/33/09-wrap-up.md',
            ]
          }, {
            text: 'Project 34: Four in a Row',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/34/overview.md',
              '/hackingwithswift.com/read/34/01-setting-up.md',
              '/hackingwithswift.com/read/34/02-creating-the-interface-with-uistackview.md',
              '/hackingwithswift.com/read/34/03-preparing-for-basic-play.md',
              '/hackingwithswift.com/read/34/04-adding-in-players-gkgamemodelplayer.md',
              '/hackingwithswift.com/read/34/05-detecting-wins-and-draws-in-four-in-a-row.md',
              '/hackingwithswift.com/read/34/06-how-gameplaykit-ai-works-gkgamemodel-gkgamemodelplayer-and-gkgamemodelupdate.md',
              '/hackingwithswift.com/read/34/07-implementing-gkgamemodel-gamemodelupdatesfor-and-apply.md',
              '/hackingwithswift.com/read/34/08-creating-a-gameplaykit-ai-using-gkminmaxstrategist.md',
              '/hackingwithswift.com/read/34/09-wrap-up.md',
            ]
          }, {
            text: 'Project 35: Generating random numbers',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/35/overview.md',
              '/hackingwithswift.com/read/35/01-setting-up.md',
              '/hackingwithswift.com/read/35/02-generating-random-numbers-without-gameplaykit.md',
              '/hackingwithswift.com/read/35/03-generating-random-numbers-with-gameplaykit-gkrandomsource.md',
              '/hackingwithswift.com/read/35/04-choosing-a-random-number-source-gkarc4randomsource-and-other-gameplaykit-options.md',
              '/hackingwithswift.com/read/35/05-shaping-gameplaykit-random-numbers-gkrandomdistribution-gkshuffleddistribution-and-gkgaussiandistribution.md',
              '/hackingwithswift.com/read/35/06-shuffling-an-array-with-gameplaykit-arraybyshufflingobjectsin.md',
              '/hackingwithswift.com/read/35/07-wrap-up.md',
            ]
          }, {
            text: 'Project 36: Crashy Plane',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/36/overview.md',
              '/hackingwithswift.com/read/36/01-setting-up.md',
              '/hackingwithswift.com/read/36/02-creating-a-player-resizefill-vs-aspectfill.md',
              '/hackingwithswift.com/read/36/03-sky-background-and-ground-parallax-scrolling-with-spritekit.md',
              '/hackingwithswift.com/read/36/04-creating-collisions.md',
              '/hackingwithswift.com/read/36/05-pixel-perfect-physics-in-spritekit-plus-explosions-and-more.md',
              '/hackingwithswift.com/read/36/06-background-music-with-skaudionode-an-intro-plus-game-over.md',
              '/hackingwithswift.com/read/36/07-optimizing-spritekit-physics.md',
              '/hackingwithswift.com/read/36/08-wrap-up.md',
            ]
          }, {
            text: 'Project 37: Psychic Tester',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/37/overview.md',
              '/hackingwithswift.com/read/37/01-setting-up.md',
              '/hackingwithswift.com/read/37/02-laying-out-the-cards-addchildviewcontroller.md',
              '/hackingwithswift.com/read/37/03-animating-a-3d-flip-effect-using-transitionwith.md',
              '/hackingwithswift.com/read/37/04-adding-a-cagradientlayer-with-ibdesignable-and-ibinspectable.md',
              '/hackingwithswift.com/read/37/05-creating-a-particle-system-using-caemitterlayer.md',
              '/hackingwithswift.com/read/37/06-wiggling-cards-and-background-music-with-avaudioplayer.md',
              '/hackingwithswift.com/read/37/07-how-to-measure-touch-strength-using-3d-touch.md',
              '/hackingwithswift.com/read/37/08-communicating-between-ios-and-watchos-wcsession.md',
              '/hackingwithswift.com/read/37/09-designing-a-simple-watchos-app-to-receive-data.md',
              '/hackingwithswift.com/read/37/10-wrap-up.md',
            ]
          }, {
            text: 'Project 38: GitHub Commits',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/38/overview.md',
              '/hackingwithswift.com/read/38/01-setting-up.md',
              '/hackingwithswift.com/read/38/02-designing-a-core-data-model.md',
              '/hackingwithswift.com/read/38/03-adding-core-data-to-our-project-nspersistentcontainer.md',
              '/hackingwithswift.com/read/38/04-creating-an-nsmanagedobject-subclass-with-xcode.md',
              '/hackingwithswift.com/read/38/05-loading-core-data-objects-using-nsfetchrequest-and-nssortdescriptor.md',
              '/hackingwithswift.com/read/38/06-how-to-make-a-core-data-attribute-unique-using-constraints.md',
              '/hackingwithswift.com/read/38/07-examples-of-using-nspredicate-to-filter-nsfetchrequest.md',
              '/hackingwithswift.com/read/38/08-adding-core-data-entity-relationships-lightweight-vs-heavyweight-migration.md',
              '/hackingwithswift.com/read/38/09-how-to-delete-a-core-data-object.md',
              '/hackingwithswift.com/read/38/10-optimizing-core-data-performance-using-nsfetchedresultscontroller.md',
              '/hackingwithswift.com/read/38/11-wrap-up.md',
            ]
          }, {
            text: 'Project 39: Unit testing with XCTest',
            collapsible: true,
            children: [
              '/hackingwithswift.com/read/39/overview.md',
              '/hackingwithswift.com/read/39/01-setting-up.md',
              '/hackingwithswift.com/read/39/02-creating-our-first-unit-test-using-xctest.md',
              '/hackingwithswift.com/read/39/03-loading-our-data-and-splitting-up-words-filter.md',
              '/hackingwithswift.com/read/39/04-counting-unique-strings-in-an-array.md',
              '/hackingwithswift.com/read/39/05-measure-how-to-optimize-our-slow-code-and-adjust-the-baseline.md',
              '/hackingwithswift.com/read/39/06-filtering-using-functions-as-parameters.md',
              '/hackingwithswift.com/read/39/07-updating-the-user-interface-with-filtering.md',
              '/hackingwithswift.com/read/39/08-user-interface-testing-with-xctest.md',
              '/hackingwithswift.com/read/39/09-wrap-up.md',
            ]
          }, 
        ]
      }, {
        text: 'Swift Concurrency by Example',
        collapsible: true,
        icon: 'fa-brands fa-swift',
        children: [
          '/hackingwithswift.com/concurrency/README.md',
          {
            text: 'Introduction',
            collapsible: true,
            children: [
              '/hackingwithswift.com/concurrency/this-stuff-is-hard.md',
              '/hackingwithswift.com/concurrency/how-to-follow-this-guide.md',
              '/hackingwithswift.com/concurrency/concurrency-vs-parallelism.md',
              '/hackingwithswift.com/concurrency/understanding-threads-and-queues.md',
              '/hackingwithswift.com/concurrency/main-thread-and-main-queue-whats-the-difference.md',
              '/hackingwithswift.com/concurrency/where-is-swift-concurrency-supported.md',
              '/hackingwithswift.com/concurrency/dedication.md',
            ]
          }, {
            text: 'Async/await',
            collapsible: true,
            children: [
              '/hackingwithswift.com/concurrency/what-is-a-synchronous-function.md',
              '/hackingwithswift.com/concurrency/what-is-an-asynchronous-function.md',
              '/hackingwithswift.com/concurrency/how-to-create-and-call-an-async-function.md',
              '/hackingwithswift.com/concurrency/how-to-call-async-throwing-functions.md',
              '/hackingwithswift.com/concurrency/what-calls-the-first-async-function.md',
              '/hackingwithswift.com/concurrency/whats-the-performance-cost-of-calling-an-async-function.md',
              '/hackingwithswift.com/concurrency/how-to-create-and-use-async-properties.md',
              '/hackingwithswift.com/concurrency/how-to-call-an-async-function-using-async-let.md',
              '/hackingwithswift.com/concurrency/whats-the-difference-between-await-and-async-let.md',
              '/hackingwithswift.com/concurrency/why-cant-we-call-async-functions-using-async-var.md',
              '/hackingwithswift.com/concurrency/how-to-use-continuations-to-convert-completion-handlers-into-async-functions.md',
              '/hackingwithswift.com/concurrency/how-to-create-continuations-that-can-throw-errors.md',
              '/hackingwithswift.com/concurrency/how-to-store-continuations-to-be-resumed-later.md',
              '/hackingwithswift.com/concurrency/how-to-fix-the-error-async-call-in-a-function-that-does-not-support-concurrency.md',
            ]
          }, {
            text: 'Sequences and streams',
            collapsible: true,
            children: [
              '/hackingwithswift.com/concurrency/whats-the-difference-between-sequence-asyncsequence-and-asyncstream.md',
              '/hackingwithswift.com/concurrency/how-to-loop-over-an-asyncsequence-using-for-await.md',
              '/hackingwithswift.com/concurrency/how-to-manipulate-an-asyncsequence-using-map-filter-and-more.md',
              '/hackingwithswift.com/concurrency/how-to-create-a-custom-asyncsequence.md',
              '/hackingwithswift.com/concurrency/how-to-convert-an-asyncsequence-into-a-sequence.md',
            ]
          }, {
            text: 'Tasks and task groups',
            collapsible: true,
            children: [
              '/hackingwithswift.com/concurrency/what-are-tasks-and-task-groups.md',
              '/hackingwithswift.com/concurrency/how-to-create-and-run-a-task.md',
              '/hackingwithswift.com/concurrency/whats-the-difference-between-a-task-and-a-detached-task.md',
              '/hackingwithswift.com/concurrency/how-to-get-a-result-from-a-task.md',
              '/hackingwithswift.com/concurrency/how-to-control-the-priority-of-a-task.md',
              '/hackingwithswift.com/concurrency/understanding-how-priority-escalation-works.md',
              '/hackingwithswift.com/concurrency/how-to-cancel-a-task.md',
              '/hackingwithswift.com/concurrency/how-to-make-a-task-sleep.md',
              '/hackingwithswift.com/concurrency/how-to-voluntarily-suspend-a-task.md',
              '/hackingwithswift.com/concurrency/how-to-create-a-task-group-and-add-tasks-to-it.md',
              '/hackingwithswift.com/concurrency/how-to-cancel-a-task-group.md',
              '/hackingwithswift.com/concurrency/how-to-handle-different-result-types-in-a-task-group.md',
              '/hackingwithswift.com/concurrency/whats-the-difference-between-async-let-tasks-and-task-groups.md',
              '/hackingwithswift.com/concurrency/how-to-make-async-command-line-tools-and-scripts.md',
              '/hackingwithswift.com/concurrency/how-to-create-and-use-task-local-values.md',
              '/hackingwithswift.com/concurrency/how-to-run-tasks-using-swiftuis-task-modifier.md',
              '/hackingwithswift.com/concurrency/is-it-efficient-to-create-many-tasks.md',
            ]
          }, {
            text: 'Actors',
            collapsible: true,
            children: [
              '/hackingwithswift.com/concurrency/what-is-an-actor-and-why-does-swift-have-them.md',
              '/hackingwithswift.com/concurrency/how-to-create-and-use-an-actor-in-swift.md',
              '/hackingwithswift.com/concurrency/how-to-make-function-parameters-isolated.md',
              '/hackingwithswift.com/concurrency/how-to-make-parts-of-an-actor-nonisolated.md',
              '/hackingwithswift.com/concurrency/how-to-use-mainactor-to-run-code-on-the-main-queue.md',
              '/hackingwithswift.com/concurrency/understanding-how-global-actor-inference-works.md',
              '/hackingwithswift.com/concurrency/what-is-actor-hopping-and-how-can-it-cause-problems.md',
              '/hackingwithswift.com/concurrency/whats-the-difference-between-actors-classes-and-structs.md',
              '/hackingwithswift.com/concurrency/important-do-not-use-an-actor-for-your-swiftui-data-models.md',
            ]
          },  {
            text: 'Solutions',
            collapsible: true,
            children: [
              '/hackingwithswift.com/concurrency/how-to-download-json-from-the-internet-and-decode-it-into-any-codable-type.md',
            ]
          },
        ]
      }, {
        text: 'SwiftData by Example',
        collapsible: true,
        icon: 'fa-brands fa-swift',
        children: [
          '/hackingwithswift.com/swiftdata/README.md',
          {
            text: 'Introduction',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/what-is-swiftdata.md',
              '/hackingwithswift.com/swiftdata/swiftdata-vs-core-data.md',
              '/hackingwithswift.com/swiftdata/should-you-learn-swiftdata-core-data-or-both.md',
              '/hackingwithswift.com/swiftdata/frequently-asked-questions-about-swiftdata.md',
              '/hackingwithswift.com/swiftdata/how-to-follow-this-quick-start-guide.md',
              '/hackingwithswift.com/swiftdata/migrating-from-core-data-to-swiftdata.md',
              '/hackingwithswift.com/swiftdata/dedication.md',
            ]
          }, {
            text: 'Building a complete project',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/swiftdata-tutorial-building-a-complete-project.md',
              '/hackingwithswift.com/swiftdata/defining-a-data-model-with-swiftdata.md',
              '/hackingwithswift.com/swiftdata/querying-swiftdata-objects-in-swiftui.md',
              '/hackingwithswift.com/swiftdata/creating-editing-and-deleting-model-objects.md',
              '/hackingwithswift.com/swiftdata/sorting-query-results.md',
              '/hackingwithswift.com/swiftdata/filtering-the-results-from-a-swiftdata-query.md',
              '/hackingwithswift.com/swiftdata/working-with-relationships.md',
              '/hackingwithswift.com/swiftdata/wrap-up-our-swiftdata-project-is-complete.md',
            ]
          }, {
            text: 'Containers and context',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/whats-the-difference-between-modelcontainer-modelcontext-and-modelconfiguration.md',
              '/hackingwithswift.com/swiftdata/how-to-configure-a-custom-modelcontainer-using-modelconfiguration.md',
              '/hackingwithswift.com/swiftdata/how-to-add-multiple-configurations-to-a-modelcontainer.md',
              '/hackingwithswift.com/swiftdata/how-to-change-swiftdatas-underlying-storage-filename.md',
              '/hackingwithswift.com/swiftdata/when-does-swiftdata-autosave-data.md',
              '/hackingwithswift.com/swiftdata/how-to-enable-or-disable-autosave-for-a-modelcontext.md',
            ]
          }, {
            text: 'Defining your data model',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/how-to-define-swiftdata-models-using-the-model-macro.md',
              '/hackingwithswift.com/swiftdata/why-are-swiftdata-models-created-as-classes.md',
              '/hackingwithswift.com/swiftdata/what-kind-of-data-can-be-a-swiftdata-property.md',
              '/hackingwithswift.com/swiftdata/using-structs-and-enums-in-swiftdata-models.md',
              '/hackingwithswift.com/swiftdata/how-to-make-unique-attributes-in-a-swiftdata-model.md',
              '/hackingwithswift.com/swiftdata/how-to-make-transient-attributes-in-a-swiftdata-model.md',
              '/hackingwithswift.com/swiftdata/how-to-store-swiftdata-attributes-in-an-external-file.md',
              '/hackingwithswift.com/swiftdata/how-to-index-swiftdata-objects-in-spotlight.md',
              '/hackingwithswift.com/swiftdata/how-to-encrypt-swiftdata.md',
              '/hackingwithswift.com/swiftdata/how-to-create-derived-attributes-with-swiftdata.md',
              '/hackingwithswift.com/swiftdata/how-to-index-swiftdata-properties-for-faster-searching.md',
            ]
          }, {
            text: 'Creating relationships',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/inferred-vs-explicit-relationships.md',
              '/hackingwithswift.com/swiftdata/how-to-create-one-to-one-relationships.md',
              '/hackingwithswift.com/swiftdata/how-to-create-one-to-many-relationships.md',
              '/hackingwithswift.com/swiftdata/how-to-create-many-to-many-relationships.md',
              '/hackingwithswift.com/swiftdata/how-to-create-cascade-deletes-using-relationships.md',
              '/hackingwithswift.com/swiftdata/how-to-add-minimum-and-maximum-constraints-to-relationships.md',
            ]
          }, {
            text: 'Working with data',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/how-to-find-a-swiftdata-object-by-its-identifier.md',
              '/hackingwithswift.com/swiftdata/how-to-save-a-swiftdata-object.md',
              '/hackingwithswift.com/swiftdata/how-to-delete-a-swiftdata-object.md',
              '/hackingwithswift.com/swiftdata/how-to-create-a-custom-fetchdescriptor.md',
              '/hackingwithswift.com/swiftdata/how-to-filter-swiftdata-results-with-predicates.md',
              '/hackingwithswift.com/swiftdata/how-to-sort-swiftdata-queries-using-key-paths-or-sortdescriptor.md',
              '/hackingwithswift.com/swiftdata/how-to-get-natural-string-sorting-for-swiftdata-queries.md',
              '/hackingwithswift.com/swiftdata/how-to-count-results-without-loading-them.md',
              '/hackingwithswift.com/swiftdata/how-to-delete-all-instances-of-a-particular-model.md',
              '/hackingwithswift.com/swiftdata/how-to-create-a-background-context.md',
              '/hackingwithswift.com/swiftdata/how-to-add-support-for-undo-and-redo.md',
              '/hackingwithswift.com/swiftdata/how-to-completely-reset-a-swiftdata-modelcontainer.md',
              '/hackingwithswift.com/swiftdata/how-to-enumerate-a-fetch-request-to-handle-lots-of-data-efficiently.md',
              '/hackingwithswift.com/swiftdata/how-to-merge-two-model-contexts.md',
              '/hackingwithswift.com/swiftdata/how-to-make-swiftdata-models-conform-to-codable.md',
              '/hackingwithswift.com/swiftdata/how-to-rollback-changes-without-saving.md',
            ]
          }, {
            text: 'Handling migration',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/lightweight-vs-complex-migrations.md',
              '/hackingwithswift.com/swiftdata/how-to-rename-properties-without-losing-data.md',
              '/hackingwithswift.com/swiftdata/how-to-create-a-complex-migration-using-versionedschema.md',
            ]
          }, {
            text: 'Building with SwiftData',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/how-to-connect-swiftdata-to-swiftui.md',
              '/hackingwithswift.com/swiftdata/how-to-use-query-to-read-swiftdata-objects-from-swiftui.md',
              '/hackingwithswift.com/swiftdata/how-to-dynamically-change-a-querys-sort-order-or-predicate.md',
              '/hackingwithswift.com/swiftdata/whats-the-difference-between-bindable-and-binding.md',
              '/hackingwithswift.com/swiftdata/how-to-animate-changes-to-swiftdata-queries.md',
              '/hackingwithswift.com/swiftdata/how-to-use-swiftdata-in-swiftui-previews.md',
              '/hackingwithswift.com/swiftdata/how-swiftui-tracks-changes-in-swiftdata-objects.md',
              '/hackingwithswift.com/swiftdata/how-to-use-swiftdata-with-uikit.md',
              '/hackingwithswift.com/swiftdata/how-to-migrate-an-app-from-core-data-to-swiftdata.md',
              '/hackingwithswift.com/swiftdata/how-to-make-core-data-and-swiftdata-coexist-in-the-same-app.md',
              '/hackingwithswift.com/swiftdata/how-to-create-a-document-based-app-with-swiftdata.md',
              '/hackingwithswift.com/swiftdata/how-to-sync-swiftdata-with-icloud.md',
              '/hackingwithswift.com/swiftdata/how-to-stop-swiftdata-syncing-with-cloudkit.md',
              '/hackingwithswift.com/swiftdata/how-to-access-a-swiftdata-container-from-widgets.md',
            ]
          }, {
            text: 'Architecture',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/how-to-use-mvvm-to-separate-swiftdata-from-your-views.md',
              '/hackingwithswift.com/swiftdata/how-to-discard-changes-to-a-swiftdata-object.md',
              '/hackingwithswift.com/swiftdata/how-to-pre-populate-an-app-with-an-existing-swiftdata-database.md',
              '/hackingwithswift.com/swiftdata/how-to-pre-load-an-app-with-json.md',
              '/hackingwithswift.com/swiftdata/how-to-transfer-an-object-between-a-background-context-and-the-main-context.md',
              '/hackingwithswift.com/swiftdata/how-swiftdata-works-with-swift-concurrency.md',
              '/hackingwithswift.com/swiftdata/how-to-batch-insert-large-amounts-of-data-efficiently.md',
              '/hackingwithswift.com/swiftdata/how-to-write-unit-tests-for-your-swiftdata-code.md',
              '/hackingwithswift.com/swiftdata/how-to-write-ui-tests-for-your-swiftdata-code.md',
              '/hackingwithswift.com/swiftdata/how-to-optimize-the-performance-of-your-swiftdata-apps.md',
              '/hackingwithswift.com/swiftdata/how-to-use-swiftdata-to-store-singletons.md',
            ]
          }, {
            text: 'Solving problems',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftdata/how-to-read-the-list-of-objects-that-have-been-inserted-edited-or-deleted.md',
              '/hackingwithswift.com/swiftdata/how-to-check-whether-a-swiftdata-model-object-has-been-deleted.md',
              '/hackingwithswift.com/swiftdata/using-launch-arguments-to-debug-swiftdata-and-core-data.md',
              '/hackingwithswift.com/swiftdata/how-to-read-the-contents-of-a-swiftdata-database-store.md',
              '/hackingwithswift.com/swiftdata/common-swiftdata-errors-and-their-solutions.md',
            ]
          }
        ]
      }, {
        text: 'SwiftUI by Example',
        collapsible: true,
        icon: 'fa-brands fa-swift',
        children: [
          '/hackingwithswift.com/swiftui/README.md',
          {
            text: 'Introduction',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/what-is-swiftui.md',
              '/hackingwithswift.com/swiftui/swiftui-vs-interface-builder-and-storyboards.md',
              '/hackingwithswift.com/swiftui/frequently-asked-questions-about-swiftui.md',
              '/hackingwithswift.com/swiftui/answering-the-big-question-should-you-learn-swiftui-uikit-or-both.md',
              '/hackingwithswift.com/swiftui/how-to-follow-this-quick-start-guide.md',
              '/hackingwithswift.com/swiftui/migrating-from-uikit-to-swiftui.md',
              '/hackingwithswift.com/swiftui/whats-in-the-basic-template.md',
              '/hackingwithswift.com/swiftui/dedication.md',
            ]
          }, {
            text: 'Building a complete project',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/swiftui-tutorial-building-a-complete-project.md',
              '/hackingwithswift.com/swiftui/building-a-menu-using-list.md',
              '/hackingwithswift.com/swiftui/composing-views-to-create-a-list-row.md',
              '/hackingwithswift.com/swiftui/polishing-designs-with-fonts-and-colors.md',
              '/hackingwithswift.com/swiftui/displaying-a-detail-screen-with-navigationlink.md',
              '/hackingwithswift.com/swiftui/observable-objects-environment-objects-and-published.md',
              '/hackingwithswift.com/swiftui/adding-items-to-an-order-with-environmentobject.md',
              '/hackingwithswift.com/swiftui/adding-tabview-and-tabitem.md',
              '/hackingwithswift.com/swiftui/bindings-and-forms.md',
              '/hackingwithswift.com/swiftui/two-way-bindings-in-swiftui.md',
              '/hackingwithswift.com/swiftui/formatting-interpolated-strings-in-swiftui.md',
              '/hackingwithswift.com/swiftui/presenting-an-alert.md',
              '/hackingwithswift.com/swiftui/adding-swipe-to-delete-and-editbutton.md',
              '/hackingwithswift.com/swiftui/wrap-up-our-swiftui-project-is-complete.md'
            ]
          }, {
            text: 'Working with static text',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-create-static-labels-with-a-text-view.md',
              '/hackingwithswift.com/swiftui/how-to-style-text-views-with-fonts-colors-line-spacing-and-more.md',
              '/hackingwithswift.com/swiftui/how-to-add-advanced-text-styling-using-attributedstring.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-text-alignment-using-multilinetextalignment.md',
              '/hackingwithswift.com/swiftui/how-to-format-text-inside-text-views.md',
              '/hackingwithswift.com/swiftui/how-to-add-spacing-between-letters-in-text.md',
              '/hackingwithswift.com/swiftui/how-to-format-dates-inside-text-views.md',
              '/hackingwithswift.com/swiftui/how-to-make-textfield-uppercase-or-lowercase-using-textcase.md',
              '/hackingwithswift.com/swiftui/how-to-show-text-and-an-icon-side-by-side-using-label.md',
              '/hackingwithswift.com/swiftui/how-to-mark-content-as-a-placeholder-using-redacted.md',
              '/hackingwithswift.com/swiftui/how-to-mark-content-as-private-using-privacysensitive.md',
              '/hackingwithswift.com/swiftui/how-to-render-markdown-content-in-text.md',
              '/hackingwithswift.com/swiftui/how-to-customize-the-way-links-are-opened.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-select-text.md',
            ]
          }, {
            text: 'Images, shapes, and media',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-draw-images-using-image-views.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-the-way-an-image-is-fitted-to-its-space.md',
              '/hackingwithswift.com/swiftui/how-to-tile-an-image.md',
              '/hackingwithswift.com/swiftui/how-to-render-images-using-sf-symbols.md',
              '/hackingwithswift.com/swiftui/how-to-render-a-gradient.md',
              '/hackingwithswift.com/swiftui/how-to-use-images-and-other-views-as-backgrounds.md',
              '/hackingwithswift.com/swiftui/how-to-display-solid-shapes.md',
              '/hackingwithswift.com/swiftui/how-to-fill-and-stroke-shapes-at-the-same-time.md',
              '/hackingwithswift.com/swiftui/how-to-draw-part-of-a-solid-shape-using-trim.md',
              '/hackingwithswift.com/swiftui/when-should-you-use-containerrelativeshape.md',
              '/hackingwithswift.com/swiftui/how-to-play-movies-with-videoplayer.md',
              '/hackingwithswift.com/swiftui/how-to-integrate-spritekit-using-spriteview.md',
              '/hackingwithswift.com/swiftui/how-to-load-a-remote-image-from-a-url.md',
              '/hackingwithswift.com/swiftui/how-to-get-custom-colors-and-transparency-with-sf-symbols.md',
              '/hackingwithswift.com/swiftui/how-to-dynamically-adjust-the-color-of-an-sf-symbol.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-select-pictures-using-photospicker.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-import-videos-using-photospicker.md',
              '/hackingwithswift.com/swiftui/how-to-animate-sf-symbols.md',
              '/hackingwithswift.com/swiftui/how-to-read-the-red-green-and-blue-values-from-a-color.md',
              '/hackingwithswift.com/swiftui/how-to-combine-shapes-to-create-new-shapes.md',
              '/hackingwithswift.com/swiftui/how-to-load-custom-colors-from-an-asset-catalog.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-mesh-gradient.md',
            ]
          }, {
            text: 'View layout',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-give-a-view-a-custom-frame.md',
              '/hackingwithswift.com/swiftui/how-to-control-spacing-around-individual-views-using-padding.md',
              '/hackingwithswift.com/swiftui/how-to-provide-relative-sizes-using-geometryreader.md',
              '/hackingwithswift.com/swiftui/how-to-place-content-outside-the-safe-area.md',
              '/hackingwithswift.com/swiftui/how-to-return-different-view-types.md',
              '/hackingwithswift.com/swiftui/how-to-create-views-in-a-loop-using-foreach.md',
              '/hackingwithswift.com/swiftui/how-to-control-layout-priority-using-layoutpriority.md',
              '/hackingwithswift.com/swiftui/how-to-make-two-views-the-same-width-or-height.md',
              '/hackingwithswift.com/swiftui/how-to-provide-visual-structure-using-foreground-styles.md',
              '/hackingwithswift.com/swiftui/how-to-inset-the-safe-area-with-custom-content.md',
              '/hackingwithswift.com/swiftui/how-to-hide-the-home-indicator-and-other-system-ui.md',
              '/hackingwithswift.com/swiftui/how-to-stop-system-gestures-from-interfering-with-your-own.md',
              '/hackingwithswift.com/swiftui/how-to-dynamically-change-between-vstack-and-hstack.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-custom-layout-using-the-layout-protocol.md',
              '/hackingwithswift.com/swiftui/how-to-create-an-adaptive-layout-with-viewthatfits.md',
              '/hackingwithswift.com/swiftui/how-to-add-extra-padding-to-the-safe-area.md',
              '/hackingwithswift.com/swiftui/how-to-dynamically-adjust-the-appearance-of-a-view-based-on-its-size-and-location.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-the-size-of-a-view-relative-to-its-container.md',
              '/hackingwithswift.com/swiftui/how-to-detect-when-the-size-or-position-of-a-view-changes.md'
            ]
          }, {
            text: 'Stacks, grids, scrollviews',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-create-stacks-using-vstack-and-hstack.md',
              '/hackingwithswift.com/swiftui/how-to-customize-stack-layouts-with-alignment-and-spacing.md',
              '/hackingwithswift.com/swiftui/how-to-force-views-to-one-side-inside-a-stack-using-spacer.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-fixed-size-spacer.md',
              '/hackingwithswift.com/swiftui/how-to-layer-views-on-top-of-each-other-using-zstack.md',
              '/hackingwithswift.com/swiftui/how-to-change-the-order-of-view-layering-using-z-index.md',
              '/hackingwithswift.com/swiftui/how-to-create-different-layouts-using-size-classes.md',
              '/hackingwithswift.com/swiftui/how-to-automatically-switch-between-hstack-and-vstack-based-on-size-class.md',
              '/hackingwithswift.com/swiftui/how-to-add-horizontal-and-vertical-scrolling-using-scrollview.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-scroll-view-move-to-a-location-using-scrollviewreader.md',
              '/hackingwithswift.com/swiftui/how-to-create-3d-effects-like-cover-flow-using-scrollview-and-geometryreader.md',
              '/hackingwithswift.com/swiftui/how-to-lazy-load-views-using-lazyvstack-and-lazyhstack.md',
              '/hackingwithswift.com/swiftui/how-to-position-views-in-a-fixed-grid.md',
              '/hackingwithswift.com/swiftui/how-to-position-views-in-a-grid-using-lazyvgrid-and-lazyhgrid.md',
              '/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-when-the-user-scrolls.md',
              '/hackingwithswift.com/swiftui/how-to-hide-the-scroll-indicators-in-scrollview-list-and-more.md',
              '/hackingwithswift.com/swiftui/how-to-create-multi-column-lists-using-table.md',
              '/hackingwithswift.com/swiftui/how-to-indent-the-content-or-scroll-indicators-in-a-scrollview.md',
              '/hackingwithswift.com/swiftui/how-to-flash-the-scroll-bar-indicators-of-a-scrollview-or-list.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-scrollview-snap-with-paging-or-between-child-views.md',
              '/hackingwithswift.com/swiftui/how-to-make-views-scroll-with-a-custom-transition.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-scrollview-start-at-the-bottom.md',
              '/hackingwithswift.com/swiftui/how-to-disable-scrollview-clipping-so-contents-overflow.md',
              '/hackingwithswift.com/swiftui/how-to-read-the-size-and-position-of-a-scrollview.md',
              '/hackingwithswift.com/swiftui/how-to-scroll-to-exact-locations-inside-a-scrollview.md',
              '/hackingwithswift.com/swiftui/how-to-detect-whether-a-scrollview-is-currently-moving-or-is-idle.md',
            ]          
          }, {
            text: 'User interface controls',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/working-with-state.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-tappable-button.md',
              '/hackingwithswift.com/swiftui/how-to-disable-the-overlay-color-for-images-inside-button-and-navigationlink.md',
              '/hackingwithswift.com/swiftui/how-to-get-bordered-buttons-that-stand-out.md',
              '/hackingwithswift.com/swiftui/how-to-group-views-together-with-controlgroup.md',
              '/hackingwithswift.com/swiftui/how-to-read-text-from-a-textfield.md',
              '/hackingwithswift.com/swiftui/how-to-take-action-when-the-user-submits-a-textfield.md',
              '/hackingwithswift.com/swiftui/how-to-customize-the-submit-button-for-textfield-securefield-and-texteditor.md',
              '/hackingwithswift.com/swiftui/how-to-add-a-border-to-a-textfield.md',
              '/hackingwithswift.com/swiftui/how-to-add-a-placeholder-to-a-textfield.md',
              '/hackingwithswift.com/swiftui/how-to-disable-autocorrect-in-a-textfield.md',
              '/hackingwithswift.com/swiftui/how-to-dismiss-the-keyboard-for-a-textfield.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-textfield-or-texteditor-have-default-focus.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-textfield-expand-vertically-as-the-user-types.md',
              '/hackingwithswift.com/swiftui/how-to-format-a-textfield-for-numbers.md',
              '/hackingwithswift.com/swiftui/how-to-create-secure-text-fields-using-securefield.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-toggle-switch.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-slider-and-read-values-from-it.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-picker-and-read-values-from-it.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-date-picker-and-read-values-from-it.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-segmented-control-and-read-values-from-it.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-stepper-and-read-values-from-it.md',
              '/hackingwithswift.com/swiftui/how-to-create-multi-line-editable-text-with-texteditor.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-select-a-color-with-colorpicker.md',
              '/hackingwithswift.com/swiftui/how-to-show-progress-on-a-task-using-progressview.md',
              '/hackingwithswift.com/swiftui/how-to-show-indeterminate-progress-using-progressview.md',
              '/hackingwithswift.com/swiftui/how-to-show-a-map-view.md',
              '/hackingwithswift.com/swiftui/how-to-show-annotations-in-a-map-view.md',
              '/hackingwithswift.com/swiftui/how-to-open-web-links-in-safari.md',
              '/hackingwithswift.com/swiftui/how-to-let-the-user-select-multiple-dates.md',
              '/hackingwithswift.com/swiftui/how-to-hide-the-label-of-a-picker-stepper-toggle-and-more-using-labelshidden.md',
              '/hackingwithswift.com/swiftui/how-to-make-buttons-that-repeat-their-action-when-pressed.md',
            ]
          }, {
            text: 'Responding to events',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-detect-when-your-app-moves-to-the-background-or-foreground-with-scenephase.md',
              '/hackingwithswift.com/swiftui/how-to-respond-to-view-lifecycle-events-onappear-and-ondisappear.md',
              '/hackingwithswift.com/swiftui/how-to-add-keyboard-shortcuts-using-keyboardshortcut.md',
              '/hackingwithswift.com/swiftui/how-to-control-which-view-is-shown-when-your-app-launches.md',
              '/hackingwithswift.com/swiftui/how-to-run-code-when-your-app-launches.md',
              '/hackingwithswift.com/swiftui/how-to-add-an-appdelegate-to-a-swiftui-app.md',
              '/hackingwithswift.com/swiftui/how-to-detect-device-rotation.md',
              '/hackingwithswift.com/swiftui/how-to-add-a-toolbar-to-the-keyboard.md',
              '/hackingwithswift.com/swiftui/how-to-run-an-asynchronous-task-when-a-view-is-shown.md',
              '/hackingwithswift.com/swiftui/how-to-let-the-user-paste-data-into-your-app.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-share-content-using-the-system-share-sheet.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-find-and-replace-text.md',
              '/hackingwithswift.com/swiftui/how-to-support-drag-and-drop-in-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-detect-and-respond-to-key-press-events.md',
              '/hackingwithswift.com/swiftui/how-to-add-haptic-effects-using-sensory-feedback.md',
            ]
          }, {
            text: 'Taps and gestures',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-add-a-gesture-recognizer-to-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-read-tap-and-double-tap-gestures.md',
              '/hackingwithswift.com/swiftui/how-to-force-one-gesture-to-recognize-before-another-using-highprioritygesture.md',
              '/hackingwithswift.com/swiftui/how-to-make-two-gestures-recognize-at-the-same-time-using-simultaneousgesture.md',
              '/hackingwithswift.com/swiftui/how-to-create-gesture-chains-using-sequencedbefore.md',
              '/hackingwithswift.com/swiftui/how-to-detect-the-user-hovering-over-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-detect-shake-gestures.md',
              '/hackingwithswift.com/swiftui/how-to-control-the-tappable-area-of-a-view-using-contentshape.md',
              '/hackingwithswift.com/swiftui/how-to-disable-taps-for-a-view-using-allowshittesting.md',
              '/hackingwithswift.com/swiftui/how-to-detect-the-location-of-a-tap-inside-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-handle-pinch-to-zoom-for-views.md'
            ]
          }, {
            text: 'Advanced state',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/whats-the-difference-between-observedobject-state-and-environmentobject.md',
              '/hackingwithswift.com/swiftui/how-to-use-stateobject-to-create-and-monitor-external-objects.md',
              '/hackingwithswift.com/swiftui/how-to-use-observedobject-to-manage-state-from-external-objects.md',
              '/hackingwithswift.com/swiftui/how-to-use-environmentobject-to-share-data-between-views.md',
              '/hackingwithswift.com/swiftui/how-to-send-state-updates-manually-using-objectwillchange.md',
              '/hackingwithswift.com/swiftui/how-to-create-constant-bindings.md',
              '/hackingwithswift.com/swiftui/how-to-create-custom-bindings.md',
              '/hackingwithswift.com/swiftui/how-to-use-a-timer-with-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-run-some-code-when-state-changes-using-onchange.md',
              '/hackingwithswift.com/swiftui/how-to-show-different-images-and-other-views-in-light-or-dark-mode.md',
              '/hackingwithswift.com/swiftui/how-to-create-and-use-custom-environment-values.md'
            ]
          }, {
            text: 'Lists',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/working-with-lists.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-list-of-static-items.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-list-of-dynamic-items.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-delete-rows-from-a-list.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-move-rows-in-a-list.md',
              '/hackingwithswift.com/swiftui/how-to-add-sections-to-a-list.md',
              '/hackingwithswift.com/swiftui/how-to-enable-editing-on-a-list-using-editbutton.md',
              '/hackingwithswift.com/swiftui/how-to-set-the-background-color-of-list-rows-using-listrowbackground.md',
              '/hackingwithswift.com/swiftui/how-to-create-grouped-and-inset-grouped-lists.md',
              '/hackingwithswift.com/swiftui/how-to-create-expanding-lists.md',
              '/hackingwithswift.com/swiftui/how-to-scroll-to-a-specific-row-in-a-list.md',
              '/hackingwithswift.com/swiftui/how-to-allow-row-selection-in-a-list.md',
              '/hackingwithswift.com/swiftui/how-to-use-implicit-stacking.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-list-row-separator-visibility-and-color.md',
              '/hackingwithswift.com/swiftui/how-to-enable-pull-to-refresh.md',
              '/hackingwithswift.com/swiftui/how-to-add-custom-swipe-action-buttons-to-a-list-row.md',
              '/hackingwithswift.com/swiftui/how-to-add-a-search-bar-to-filter-your-data.md',
              '/hackingwithswift.com/swiftui/how-to-add-search-tokens-to-a-search-field.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-list-or-a-foreach-from-a-binding.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-list-row-separator-insets.md',
              '/hackingwithswift.com/swiftui/how-to-change-the-tint-color-for-individual-list-rows.md',
            ]
          }, {
            text: 'Forms',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/working-with-forms.md',
              '/hackingwithswift.com/swiftui/basic-form-design.md',
              '/hackingwithswift.com/swiftui/breaking-forms-into-sections.md',
              '/hackingwithswift.com/swiftui/pickers-in-forms.md',
              '/hackingwithswift.com/swiftui/enabling-and-disabling-elements-in-forms.md',
              '/hackingwithswift.com/swiftui/showing-and-hiding-form-rows.md',
              '/hackingwithswift.com/swiftui/how-to-align-form-text-and-controls-neatly-with-labeledcontent.md',
            ]
          }, {
            text: 'Containers',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/working-with-containers.md',
              '/hackingwithswift.com/swiftui/how-to-embed-views-in-a-tab-bar-using-tabview.md',
              '/hackingwithswift.com/swiftui/how-to-create-scrolling-pages-of-content-using-tabviewstyle.md',
              '/hackingwithswift.com/swiftui/how-to-group-views-together.md',
              '/hackingwithswift.com/swiftui/how-to-hide-and-show-the-status-bar.md',
              '/hackingwithswift.com/swiftui/how-to-hide-and-reveal-content-using-disclosuregroup.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-toolbar-and-add-buttons-to-it.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-customize-toolbar-buttons.md',
              '/hackingwithswift.com/swiftui/how-to-add-a-badge-to-tabview-items-and-list-rows.md',
              '/hackingwithswift.com/swiftui/how-to-group-views-visually-using-groupbox.md',
              '/hackingwithswift.com/swiftui/how-to-hide-the-tab-bar-navigation-bar-or-other-toolbars.md',
              '/hackingwithswift.com/swiftui/how-to-customize-the-background-color-of-navigation-bars-tab-bars-and-toolbars.md',
              '/hackingwithswift.com/swiftui/how-to-position-and-style-subviews-that-come-from-a-different-view.md'
            ]
          }, {
            text: 'Navigation',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/introduction-to-navigation.md',
              '/hackingwithswift.com/swiftui/how-to-embed-a-view-in-a-navigation-view.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-edit-your-navigation-title.md',
              '/hackingwithswift.com/swiftui/how-to-add-bar-items-to-a-navigation-view.md',
              '/hackingwithswift.com/swiftui/how-to-push-a-new-view-onto-a-navigationstack.md',
              '/hackingwithswift.com/swiftui/how-to-push-a-new-view-when-a-list-row-is-tapped.md',
              '/hackingwithswift.com/swiftui/how-to-use-programmatic-navigation-in-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-save-and-load-navigationstack-paths-using-codable.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-two-column-or-three-column-layout-with-navigationsplitview.md',
              '/hackingwithswift.com/swiftui/how-to-hide-and-show-the-sidebar-programmatically.md',
              '/hackingwithswift.com/swiftui/how-to-customize-a-views-width-in-navigationsplitview.md',
              '/hackingwithswift.com/swiftui/how-to-customize-the-display-mode-of-navigationsplitview.md',
              '/hackingwithswift.com/swiftui/how-to-control-which-navigationsplitview-column-is-shown-in-compact-layouts.md',
              '/hackingwithswift.com/swiftui/how-to-add-an-inspector-to-any-view.md',
              '/hackingwithswift.com/swiftui/how-to-create-zoom-animations-between-views.md',
            ]
          }, {
            text: 'Alerts and menus',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/working-with-presentations.md',
              '/hackingwithswift.com/swiftui/how-to-show-an-alert.md',
              '/hackingwithswift.com/swiftui/how-to-add-a-textfield-to-an-alert.md',
              '/hackingwithswift.com/swiftui/how-to-add-actions-to-alert-buttons.md',
              '/hackingwithswift.com/swiftui/how-to-show-multiple-alerts-in-a-single-view.md',
              '/hackingwithswift.com/swiftui/how-to-show-an-action-sheet.md',
              '/hackingwithswift.com/swiftui/how-to-show-a-context-menu.md',
              '/hackingwithswift.com/swiftui/how-to-recommend-another-app-using-appstoreoverlay.md',
              '/hackingwithswift.com/swiftui/how-to-show-a-menu-when-a-button-is-pressed.md',
              '/hackingwithswift.com/swiftui/how-to-let-users-pick-options-from-a-menu.md',
              '/hackingwithswift.com/swiftui/how-to-add-in-app-purchases-in-swiftui.md',
            ]
          }, {
            text: 'Presenting views',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-present-a-new-view-using-sheets.md',
              '/hackingwithswift.com/swiftui/how-to-present-multiple-sheets.md',
              '/hackingwithswift.com/swiftui/how-to-make-a-view-dismiss-itself.md',
              '/hackingwithswift.com/swiftui/how-to-present-a-full-screen-modal-view-using-fullscreencover.md',
              '/hackingwithswift.com/swiftui/how-to-show-a-popover-view.md',
              '/hackingwithswift.com/swiftui/how-to-prevent-a-sheet-from-being-dismissed-with-a-swipe.md',
              '/hackingwithswift.com/swiftui/how-to-display-a-bottom-sheet.md',
              '/hackingwithswift.com/swiftui/how-to-ask-the-user-to-review-your-app.md',
              '/hackingwithswift.com/swiftui/how-to-tell-the-user-that-no-content-is-available.md',
              '/hackingwithswift.com/swiftui/how-to-control-the-size-of-presented-views.md'
            ]
          }, {
            text: 'Transforming views',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-adjust-the-position-of-a-view-using-its-offset.md',
              '/hackingwithswift.com/swiftui/how-to-color-the-padding-around-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-stack-modifiers-to-create-more-advanced-effects.md',
              '/hackingwithswift.com/swiftui/how-to-draw-a-border-around-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-draw-a-border-inside-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-marching-ants-border-effect.md',
              '/hackingwithswift.com/swiftui/how-to-draw-a-shadow-around-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-clip-a-view-so-only-part-is-visible.md',
              '/hackingwithswift.com/swiftui/how-to-rotate-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-rotate-a-view-in-3d.md',
              '/hackingwithswift.com/swiftui/how-to-scale-a-view-up-or-down.md',
              '/hackingwithswift.com/swiftui/how-to-round-the-corners-of-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-the-opacity-of-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-the-accent-color-of-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-mask-one-view-with-another.md',
              '/hackingwithswift.com/swiftui/how-to-blur-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-blend-views-together.md',
              '/hackingwithswift.com/swiftui/how-to-adjust-views-by-tinting-desaturating-and-more.md',
              '/hackingwithswift.com/swiftui/customizing-button-with-buttonstyle.md',
              '/hackingwithswift.com/swiftui/customizing-progressview-with-progressviewstyle.md',
              '/hackingwithswift.com/swiftui/customizing-toggle-with-togglestyle.md',
              '/hackingwithswift.com/swiftui/how-to-change-the-background-color-of-list-texteditor-and-more.md',
              '/hackingwithswift.com/swiftui/how-to-create-new-colors-by-blending-two-other-swiftui-colors.md',
            ]
          }, {
            text: 'Drawing',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/swiftuis-built-in-shapes.md',
              '/hackingwithswift.com/swiftui/how-to-draw-a-custom-path.md',
              '/hackingwithswift.com/swiftui/how-to-draw-polygons-and-stars.md',
              '/hackingwithswift.com/swiftui/how-to-draw-a-checkerboard.md',
              '/hackingwithswift.com/swiftui/how-to-use-uibezierpath-and-cgpath-in-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-convert-a-swiftui-view-to-an-image.md',
              '/hackingwithswift.com/swiftui/how-to-render-a-swiftui-view-to-a-pdf.md',
              '/hackingwithswift.com/swiftui/how-to-add-visual-effect-blurs.md',
              '/hackingwithswift.com/swiftui/how-to-create-custom-animated-drawings-with-timelineview-and-canvas.md',
              '/hackingwithswift.com/swiftui/how-to-add-metal-shaders-to-swiftui-views-using-layer-effects.md',
              '/hackingwithswift.com/swiftui/how-to-create-custom-text-effects-and-animations.md',
            ]
          }, {
            text: 'Animation',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-create-basic-animations.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-spring-animation.md',
              '/hackingwithswift.com/swiftui/how-to-animate-changes-in-binding-values.md',
              '/hackingwithswift.com/swiftui/how-to-create-an-explicit-animation.md',
              '/hackingwithswift.com/swiftui/how-to-delay-an-animation.md',
              '/hackingwithswift.com/swiftui/how-to-start-an-animation-immediately-after-a-view-appears.md',
              '/hackingwithswift.com/swiftui/how-to-apply-multiple-animations-to-a-view.md',
              '/hackingwithswift.com/swiftui/how-to-synchronize-animations-from-one-view-to-another-with-matchedgeometryeffect.md',
              '/hackingwithswift.com/swiftui/how-to-add-and-remove-views-with-a-transition.md',
              '/hackingwithswift.com/swiftui/how-to-combine-transitions.md',
              '/hackingwithswift.com/swiftui/how-to-create-asymmetric-transitions.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-custom-transition.md',
              '/hackingwithswift.com/swiftui/how-to-animate-the-size-of-text.md',
              '/hackingwithswift.com/swiftui/how-to-override-animations-with-transactions.md',
              '/hackingwithswift.com/swiftui/how-to-run-a-completion-callback-when-an-animation-finishes.md',
              '/hackingwithswift.com/swiftui/how-to-create-multi-step-animations-using-phase-animators.md',
            ]
          }, {
            text: 'Composing View',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-create-and-compose-custom-views.md',
              '/hackingwithswift.com/swiftui/how-to-combine-text-views-together.md',
              '/hackingwithswift.com/swiftui/how-to-store-views-as-properties.md',
              '/hackingwithswift.com/swiftui/how-to-create-custom-modifiers.md',
              '/hackingwithswift.com/swiftui/how-to-wrap-a-custom-uiview-for-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-create-modifiers-for-a-uiviewrepresentable-struct.md',
              '/hackingwithswift.com/swiftui/how-to-insert-images-into-text.md',
            ]
          }, {
            text: 'Cross-platform SwiftUI',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/learn-once-apply-anywhere.md',
              '/hackingwithswift.com/swiftui/how-to-get-translucent-lists-on-macos.md',
              '/hackingwithswift.com/swiftui/how-to-make-carousel-lists-on-watchos.md',
              '/hackingwithswift.com/swiftui/how-to-read-the-digital-crown-on-watchos-using-digitalcrownrotation.md',
              '/hackingwithswift.com/swiftui/how-to-open-a-new-window.md',
              '/hackingwithswift.com/swiftui/how-to-enable-vertical-page-scrolling.md',
              '/hackingwithswift.com/swiftui/how-to-lets-users-drag-anywhere-to-move-a-window.md',
              '/hackingwithswift.com/swiftui/how-to-activate-different-button-behaviors-when-a-modifier-key-is-pressed.md'
            ]
          }, {
            text: 'Data',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/introduction-to-using-core-data-with-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-configure-core-data-to-work-with-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-access-a-core-data-managed-object-context-from-a-swiftui-view.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-core-data-fetch-request-using-fetchrequest.md',
              '/hackingwithswift.com/swiftui/how-to-filter-core-data-fetch-requests-using-a-predicate.md',
              '/hackingwithswift.com/swiftui/how-to-add-core-data-objects-from-swiftui-views.md',
              '/hackingwithswift.com/swiftui/how-to-delete-core-data-objects-from-swiftui-views.md',
              '/hackingwithswift.com/swiftui/how-to-limit-the-number-of-items-in-a-fetch-request.md',
              '/hackingwithswift.com/swiftui/how-to-create-a-document-based-app-using-filedocument-and-documentgroup.md',
              '/hackingwithswift.com/swiftui/how-to-export-files-using-fileexporter.md',
              '/hackingwithswift.com/swiftui/how-to-continue-an-nsuseractivity-in-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-read-the-users-location-using-locationbutton.md',
              '/hackingwithswift.com/swiftui/how-to-read-user-contacts-with-contactaccessbutton.md',
            ]
          }, {
            text: 'Accessibility',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/introduction-to-accessibility-with-swiftui.md',
              '/hackingwithswift.com/swiftui/how-to-set-custom-accessibility-labels-and-hints.md',
              '/hackingwithswift.com/swiftui/how-to-use-dynamic-type-with-a-custom-font.md',
              '/hackingwithswift.com/swiftui/how-to-specify-the-dynamic-type-sizes-a-view-supports.md',
              '/hackingwithswift.com/swiftui/how-to-detect-the-reduce-motion-accessibility-setting.md',
              '/hackingwithswift.com/swiftui/how-to-detect-dark-mode.md',
              '/hackingwithswift.com/swiftui/how-to-use-decorative-images-to-reduce-screen-reader-clutter.md',
              '/hackingwithswift.com/swiftui/how-to-reduce-animations-when-requested.md',
              '/hackingwithswift.com/swiftui/how-to-make-voiceover-read-characters-individually.md',
              '/hackingwithswift.com/swiftui/how-to-add-custom-activation-commands-for-voice-control.md',
            ]
          }, {
            text: 'Tooling',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/how-to-make-swiftui-modifiers-safer-to-use-with-warn-unqualified-access.md',
              '/hackingwithswift.com/swiftui/how-to-preview-your-layout-at-different-dynamic-type-sizes.md',
              '/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-light-and-dark-mode.md',
              '/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-different-devices.md',
              '/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-a-navigation-view.md',
              '/hackingwithswift.com/swiftui/how-to-preview-your-layout-in-portrait-or-landscape.md',
              '/hackingwithswift.com/swiftui/how-to-find-which-data-change-is-causing-a-swiftui-view-to-update.md',
              '/hackingwithswift.com/swiftui/how-to-use-instruments-to-profile-your-swiftui-code-and-identify-slow-layouts.md',
              '/hackingwithswift.com/swiftui/how-to-use-state-inside-swiftui-previews-using-previewable.md',
            ]
          }, {
            text: 'What now?',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/swiftui-tips-and-tricks.md',
              '/hackingwithswift.com/swiftui/how-to-become-a-swiftui-expert.md',
            ]
          }, {
            text: 'Appendix A',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/understanding-property-wrappers-in-swift-and-swiftui.md',
              '/hackingwithswift.com/swiftui/all-swiftui-property-wrappers-explained-and-compared.md',
              '/hackingwithswift.com/swiftui/what-is-the-state-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-stateobject-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-published-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-observedobject-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-environmentobject-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-environment-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-binding-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-focusstate-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-gesturestate-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-fetchrequest-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-appstorage-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-scenestorage-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-scaledmetric-property-wrapper.md',
              '/hackingwithswift.com/swiftui/what-is-the-uiapplicationdelegateadaptor-property-wrapper.md',
            ]
          }, {
            text: 'Appendix B',
            collapsible: true,
            children: [
              '/hackingwithswift.com/swiftui/common-swiftui-errors-and-how-to-fix-them.md',
              '/hackingwithswift.com/swiftui/how-to-fix-cannot-assign-to-property-self-is-immutable.md',
              '/hackingwithswift.com/swiftui/how-to-fix-initializer-init-rowcontent-requires-that-sometype-conform-to-identifiable.md',
              '/hackingwithswift.com/swiftui/how-to-fix-ambiguous-reference-to-member-buildblock.md',
              '/hackingwithswift.com/swiftui/how-to-fix-function-declares-an-opaque-return-type-but-has-no-return-statements-in-its-body-from-which-to-infer-an-underlying-type.md',
              '/hackingwithswift.com/swiftui/how-to-fix-property-declares-an-opaque-return-type-but-has-no-initializer-expression-from-which-to-infer-an-underlying-type.md',
              '/hackingwithswift.com/swiftui/how-to-fix-modifying-state-during-view-update-this-will-cause-undefined-behavior.md',
              '/hackingwithswift.com/swiftui/how-to-fix-protocol-view-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements.md',
              '/hackingwithswift.com/swiftui/how-to-fix-fatal-error-no-observableobject-of-type-sometype-found.md',
              '/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-binding-string.md',
              '/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-string-to-expected-argument-type-text.md',
              '/hackingwithswift.com/swiftui/how-to-fix-referencing-initializer-initwrappedvalue-on-observedobject-requires-that-sometype-conform-to-observableobject.md',
              '/hackingwithswift.com/swiftui/how-to-fix-cannot-convert-value-of-type-to-expected-argument-type.md',
              '/hackingwithswift.com/swiftui/how-to-fix-missing-argument-for-parameter-content-in-call.md',
              '/hackingwithswift.com/swiftui/how-to-fix-images-not-resizing.md',
              '/hackingwithswift.com/swiftui/how-to-fix-a-form-picker-or-a-navigationlink-that-isnt-tappable.md',
            ]
          }
        ]
      }, {
        text: 'Swift Knowledge Base',
        collapsible: true,
        icon: 'fa-brands fa-swift',
        children: [
          '/hackingwithswift.com/example-code/README.md',
          {
            text: 'Accessibility',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/accessibility/README.md',
              '/hackingwithswift.com/example-code/accessibility/how-to-fix-incorrect-voiceover-pronunciations.md',
              '/hackingwithswift.com/example-code/accessibility/how-to-help-voiceover-read-specific-kinds-of-text-using-accessibilitytextualcontext.md',
            ]
          }, {
            text: 'ARKit',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/arkit/README.md',
              '/hackingwithswift.com/example-code/arkit/how-to-detect-images-using-arimagetrackingconfiguration.md',
            ]
          }, {
            text: 'Array',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/arrays/README.md',
              '/hackingwithswift.com/example-code/arrays/how-to-count-objects-in-a-set-using-nscountedset.md',
              '/hackingwithswift.com/example-code/arrays/how-to-enumerate-items-in-an-array.md',
              '/hackingwithswift.com/example-code/arrays/how-to-find-an-item-in-an-array-using-firstindexof.md',
              '/hackingwithswift.com/example-code/arrays/how-to-join-an-array-of-strings-into-a-single-string.md',
              '/hackingwithswift.com/example-code/arrays/how-to-loop-through-an-array-in-reverse.md',
              '/hackingwithswift.com/example-code/arrays/how-to-loop-through-items-in-an-array.md',
              '/hackingwithswift.com/example-code/arrays/how-to-randomize-the-order-of-an-array-shuffle-and-shuffled.md',
              '/hackingwithswift.com/example-code/arrays/how-to-shuffle-an-array-using-arc4random-uniform.md',
              '/hackingwithswift.com/example-code/arrays/how-to-sort-an-array-using-sort.md',
              '/hackingwithswift.com/example-code/arrays/how-to-tell-if-an-array-contains-an-object.md',
            ]
          }, {
            text: 'CALayer',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/calayer/README.md',
              '/hackingwithswift.com/example-code/calayer/how-to-add-a-border-outline-color-to-a-uiview.md',
              '/hackingwithswift.com/example-code/calayer/how-to-change-a-views-anchor-point-without-moving-it.md',
              '/hackingwithswift.com/example-code/calayer/how-to-create-a-marching-ants-effect-using-linedashphase.md',
              '/hackingwithswift.com/example-code/calayer/how-to-create-keyframe-animations-using-cakeyframeanimation.md',
              '/hackingwithswift.com/example-code/calayer/how-to-draw-color-gradients-using-cagradientlayer.md',
              '/hackingwithswift.com/example-code/calayer/how-to-draw-shapes-using-cashapelayer.md',
              '/hackingwithswift.com/example-code/calayer/how-to-emit-particles-using-caemitterlayer.md',
              '/hackingwithswift.com/example-code/calayer/how-to-make-a-shape-draw-itself-using-strokeend.md',
              '/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-fade-out.md',
              '/hackingwithswift.com/example-code/calayer/how-to-make-a-uiview-glow-using-shadowcolor.md',
              '/hackingwithswift.com/example-code/calayer/how-to-round-only-specific-corners-using-maskedcorners.md',
              '/hackingwithswift.com/example-code/calayer/how-to-round-the-corners-of-a-uiview.md',
              '/hackingwithswift.com/example-code/calayer/what-is-calayer.md',
            ]
          }, {
            text: 'Catalyst',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/catalyst/README.md',
              '/hackingwithswift.com/example-code/catalyst/how-to-detect-your-ios-app-is-running-on-macos-catalyst.md',
            ]
          }, {
            text: 'Core Graphics',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/core-graphics/README.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-distance-between-two-cgpoints.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-manhattan-distance-between-two-cgpoints.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-calculate-the-point-where-two-lines-intersect.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-compare-two-cgrects-with-equalto.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-draw-a-circle-using-core-graphics-addellipsein.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-draw-a-square-using-core-graphics-addrect.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-draw-a-text-string-using-core-graphics.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-draw-lines-in-core-graphics-moveto-and-addlineto.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-find-the-rotation-from-a-cgaffinetransform.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-find-the-scale-from-a-cgaffinetransform.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-find-the-translation-from-a-cgaffinetransform.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-render-a-pdf-to-an-image.md',
              '/hackingwithswift.com/example-code/core-graphics/how-to-use-core-graphics-blend-modes-to-draw-a-uiimage-differently.md',
            ]
          }, {
            text: 'Core Haptics',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/core-haptics/README.md',
              '/hackingwithswift.com/example-code/core-haptics/how-to-detect-whether-haptic-event-playback-is-supported.md',
              '/hackingwithswift.com/example-code/core-haptics/how-to-modify-haptic-events-over-time-using-chhapticparametercurve.md',
              '/hackingwithswift.com/example-code/core-haptics/how-to-play-custom-vibrations-using-core-haptics.md',
            ]
          }, {
            text: 'CryptoKit',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/cryptokit/README.md',
              '/hackingwithswift.com/example-code/cryptokit/how-to-calculate-the-sha-hash-of-a-string-or-data-instance.md',
            ]
          }, {
            text: 'Games',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/games/README.md',
              '/hackingwithswift.com/example-code/games/how-to-add-a-fragment-shader-to-an-skspritenode-using-skshader.md',
              '/hackingwithswift.com/example-code/games/how-to-add-physics-to-an-skspritenode.md',
              '/hackingwithswift.com/example-code/games/how-to-add-pixel-perfect-physics-to-an-skspritenode.md',
              '/hackingwithswift.com/example-code/games/how-to-advance-time-in-an-skemitternode-using-advancesimulationtime.md',
              '/hackingwithswift.com/example-code/games/how-to-change-a-sprites-texture-using-sktexture.md',
              '/hackingwithswift.com/example-code/games/how-to-change-skscene-with-a-transition-presentscene.md',
              '/hackingwithswift.com/example-code/games/how-to-color-an-skspritenode-using-colorblendfactor.md',
              '/hackingwithswift.com/example-code/games/how-to-create-3d-audio-sound-using-skaudionode.md',
              '/hackingwithswift.com/example-code/games/how-to-create-a-random-terrain-tile-map-using-sktilemapnode-and-gkperlinnoisesource.md',
              '/hackingwithswift.com/example-code/games/how-to-create-a-spritekit-texture-atlas-in-xcode.md',
              '/hackingwithswift.com/example-code/games/how-to-create-shapes-using-skshapenode.md',
              '/hackingwithswift.com/example-code/games/how-to-crop-a-sprite-using-skcropnode.md',
              '/hackingwithswift.com/example-code/games/how-to-debug-physics-in-a-spritekit-scene-using-showsphysics.md',
              '/hackingwithswift.com/example-code/games/how-to-emit-particles-using-skemitternode.md',
              '/hackingwithswift.com/example-code/games/how-to-find-a-touchs-location-in-a-node-using-locationin.md',
              '/hackingwithswift.com/example-code/games/how-to-generate-a-random-number-with-gkrandomsource.md',
              '/hackingwithswift.com/example-code/games/how-to-generate-fair-random-numbers-using-gkshuffleddistribution.md',
              '/hackingwithswift.com/example-code/games/how-to-generate-shaped-random-numbers-using-gkgaussiandistribution.md',
              '/hackingwithswift.com/example-code/games/how-to-made-an-skspritenode-render-faster-using-blendmode.md',
              '/hackingwithswift.com/example-code/games/how-to-make-a-sprite-follow-a-path.md',
              '/hackingwithswift.com/example-code/games/how-to-make-one-sprite-draw-in-front-of-another-using-zposition.md',
              '/hackingwithswift.com/example-code/games/how-to-roll-a-dice-using-gameplaykit-and-gkrandomdistribution.md',
              '/hackingwithswift.com/example-code/games/how-to-run-skactions-in-a-group.md',
              '/hackingwithswift.com/example-code/games/how-to-run-skactions-in-a-sequence.md',
              '/hackingwithswift.com/example-code/games/how-to-simulate-gravity-in-a-spritekit-scene.md',
              '/hackingwithswift.com/example-code/games/how-to-stop-an-skphysicsbody-responding-to-physics-using-its-dynamic-property.md',
              '/hackingwithswift.com/example-code/games/how-to-warp-a-sprite-using-skwarpgeometrygrid.md',
              '/hackingwithswift.com/example-code/games/how-to-write-text-using-sklabelnode.md',
            ]
          }, {
            text: 'Language',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/language/README.md',
              '/hackingwithswift.com/example-code/language/check-whether-all-items-in-an-array-match-a-condition.md',
              '/hackingwithswift.com/example-code/language/checking-all-array-elements-match-a-condition-allsatisfy.md',
              '/hackingwithswift.com/example-code/language/fixing-ambiguous-reference-to-member-when-using-ceil-or-round.md',
              '/hackingwithswift.com/example-code/language/fixing-class-viewcontroller-has-no-initializers.md',
              '/hackingwithswift.com/example-code/language/how-to-add-a-custom-initializer-to-a-struct-without-losing-its-memberwise-initializer.md',
              '/hackingwithswift.com/example-code/language/how-to-add-associated-values-to-enums.md',
              '/hackingwithswift.com/example-code/language/how-to-add-markdown-comments-to-your-code.md',
              '/hackingwithswift.com/example-code/language/how-to-add-raw-values-to-enums.md',
              '/hackingwithswift.com/example-code/language/how-to-add-warnings-and-errors-to-your-code-using-warning-and-error.md',
              '/hackingwithswift.com/example-code/language/how-to-append-one-array-to-another-array.md',
              '/hackingwithswift.com/example-code/language/how-to-break-out-of-multiple-loop-levels-using-labeled-statements.md',
              '/hackingwithswift.com/example-code/language/how-to-calculate-division-remainder-using-modulo.md',
              '/hackingwithswift.com/example-code/language/how-to-check-for-valid-method-input-using-the-guard-keyword.md',
              '/hackingwithswift.com/example-code/language/how-to-check-the-swift-version-at-compile-time.md',
              '/hackingwithswift.com/example-code/language/how-to-check-whether-a-date-is-inside-a-date-range.md',
              '/hackingwithswift.com/example-code/language/how-to-check-whether-a-module-is-available-using-canimport.md',
              '/hackingwithswift.com/example-code/language/how-to-check-whether-an-integer-lies-inside-a-range.md',
              '/hackingwithswift.com/example-code/language/how-to-check-your-program-state-using-precondition.md',
              '/hackingwithswift.com/example-code/language/how-to-compare-dates.md',
              '/hackingwithswift.com/example-code/language/how-to-compare-two-tuples-for-equality.md',
              '/hackingwithswift.com/example-code/language/how-to-conform-to-the-comparable-protocol.md',
              '/hackingwithswift.com/example-code/language/how-to-conform-to-the-equatable-protocol.md',
              '/hackingwithswift.com/example-code/language/how-to-conform-to-the-hashable-protocol.md',
              '/hackingwithswift.com/example-code/language/how-to-constrain-a-protocol-associated-type.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-float-to-a-cgfloat.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-float-to-an-int.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-multidimensional-array-to-a-single-dimensional-array.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-string-to-a-double.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-string-to-a-float.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-string-to-an-int.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-string-to-an-nsstring.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-string-to-data.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-a-substring-to-a-string.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-an-int-to-a-float.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-an-int-to-a-string.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-an-nsrange-to-a-swift-string-index.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-data-to-a-string.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-degrees-to-radians.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-json-into-swift-objects-using-codable.md',
              '/hackingwithswift.com/example-code/language/how-to-convert-radians-to-degrees.md',
              '/hackingwithswift.com/example-code/language/how-to-count-element-frequencies-in-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-count-matching-items-in-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-create-a-custom-debug-description.md',
              '/hackingwithswift.com/example-code/language/how-to-create-a-custom-optionset.md',
              '/hackingwithswift.com/example-code/language/how-to-create-an-array-by-repeating-an-item.md',
              '/hackingwithswift.com/example-code/language/how-to-create-an-objective-c-bridging-header-to-use-code-in-swift.md',
              '/hackingwithswift.com/example-code/language/how-to-create-hash-values-from-objects-using-hasher.md',
              '/hackingwithswift.com/example-code/language/how-to-create-multi-line-string-literals.md',
              '/hackingwithswift.com/example-code/language/how-to-create-quick-look-debug-previews-for-your-custom-types.md',
              '/hackingwithswift.com/example-code/language/how-to-delay-execution-of-code-using-the-defer-keyword.md',
              '/hackingwithswift.com/example-code/language/how-to-detect-when-the-system-is-under-pressure-and-you-should-reduce-your-work.md',
              '/hackingwithswift.com/example-code/language/how-to-filter-a-loop-using-a-where-clause.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-difference-between-two-arrays.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-first-matching-element-in-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-highest-value-in-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-index-of-the-first-matching-array-element.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-longest-initial-sequence-in-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-maximum-of-three-numbers.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-maximum-of-two-numbers.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-minimum-of-three-numbers.md',
              '/hackingwithswift.com/example-code/language/how-to-find-the-minimum-of-two-numbers.md',
              '/hackingwithswift.com/example-code/language/how-to-fix-argument-of-selector-refers-to-instance-method-that-is-not-exposed-to-objective-c.md',
              '/hackingwithswift.com/example-code/language/how-to-fix-the-error-expression-was-too-complex-to-be-solved-in-reasonable-time.md',
              '/hackingwithswift.com/example-code/language/how-to-fix-the-error-protocol-can-only-be-used-as-a-generic-constraint-because-it-has-self-or-associated-type-requirements.md',
              '/hackingwithswift.com/example-code/language/how-to-force-a-crash-using-fatalerror.md',
              '/hackingwithswift.com/example-code/language/how-to-force-your-program-to-crash-with-assert.md',
              '/hackingwithswift.com/example-code/language/how-to-format-json-using-codable-and-pretty-printing.md',
              '/hackingwithswift.com/example-code/language/how-to-generate-a-random-number.md',
              '/hackingwithswift.com/example-code/language/how-to-get-a-random-element-from-an-array-using-randomelement.md',
              '/hackingwithswift.com/example-code/language/how-to-group-arrays-using-dictionaries.md',
              '/hackingwithswift.com/example-code/language/how-to-handle-unknown-properties-and-methods-using-dynamicmemberlookup.md',
              '/hackingwithswift.com/example-code/language/how-to-ignore-return-values-using-discardableresult.md',
              '/hackingwithswift.com/example-code/language/how-to-install-a-beta-version-of-swift.md',
              '/hackingwithswift.com/example-code/language/how-to-list-all-cases-in-an-enum-using-caseiterable.md',
              '/hackingwithswift.com/example-code/language/how-to-loop-over-non-nil-items-in-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-make-a-custom-sequence.md',
              '/hackingwithswift.com/example-code/language/how-to-make-a-number-positive-using-abs.md',
              '/hackingwithswift.com/example-code/language/how-to-make-a-variadic-function.md',
              '/hackingwithswift.com/example-code/language/how-to-make-array-access-safer-using-a-custom-subscript.md',
              '/hackingwithswift.com/example-code/language/how-to-make-custom-types-from-strings-using-expressiblebystringliteral.md',
              '/hackingwithswift.com/example-code/language/how-to-make-optional-protocol-methods.md',
              '/hackingwithswift.com/example-code/language/how-to-multiply-an-int-and-a-double.md',
              '/hackingwithswift.com/example-code/language/how-to-pass-the-fizz-buzz-test.md',
              '/hackingwithswift.com/example-code/language/how-to-print-debug-text-in-swift.md',
              '/hackingwithswift.com/example-code/language/how-to-remove-duplicate-items-from-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-remove-items-from-an-array-using-filter.md',
              '/hackingwithswift.com/example-code/language/how-to-remove-the-first-or-last-item-from-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-restrict-a-protocol-to-classes.md',
              '/hackingwithswift.com/example-code/language/how-to-reverse-sort-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-run-code-when-an-object-is-destroyed.md',
              '/hackingwithswift.com/example-code/language/how-to-safely-use-reference-types-inside-value-types-with-isknownuniquelyreferenced.md',
              '/hackingwithswift.com/example-code/language/how-to-sort-the-keys-of-your-json-using-codable.md',
              '/hackingwithswift.com/example-code/language/how-to-specify-default-values-for-dictionary-keys.md',
              '/hackingwithswift.com/example-code/language/how-to-specify-your-own-date-format-with-codable-and-jsonencoder.md',
              '/hackingwithswift.com/example-code/language/how-to-split-an-array-into-chunks.md',
              '/hackingwithswift.com/example-code/language/how-to-split-an-integer-into-an-array-of-its-digits.md',
              '/hackingwithswift.com/example-code/language/how-to-store-nscoding-data-using-codable.md',
              '/hackingwithswift.com/example-code/language/how-to-sum-an-array-of-numbers-using-reduce.md',
              '/hackingwithswift.com/example-code/language/how-to-swap-two-items-in-an-array-using-swapat.md',
              '/hackingwithswift.com/example-code/language/how-to-throw-errors-using-strings.md',
              '/hackingwithswift.com/example-code/language/how-to-toggle-a-boolean-value.md',
              '/hackingwithswift.com/example-code/language/how-to-transform-a-dictionary-using-mapvalues.md',
              '/hackingwithswift.com/example-code/language/how-to-unwrap-an-optional-in-swift.md',
              '/hackingwithswift.com/example-code/language/how-to-use-available-to-deprecate-old-apis.md',
              '/hackingwithswift.com/example-code/language/how-to-use-available-to-check-for-api-availability.md',
              '/hackingwithswift.com/example-code/language/how-to-use-codable-to-load-and-save-custom-data-types.md',
              '/hackingwithswift.com/example-code/language/how-to-use-compactmap-to-transform-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-use-compiler-directives-to-detect-the-ios-simulator.md',
              '/hackingwithswift.com/example-code/language/how-to-use-conditional-conformance-in-swift.md',
              '/hackingwithswift.com/example-code/language/how-to-use-flatmap-with-an-optional-value.md',
              '/hackingwithswift.com/example-code/language/how-to-use-iso-8601-dates-with-jsondecoder-and-codable.md',
              '/hackingwithswift.com/example-code/language/how-to-use-local-variable-observers.md',
              '/hackingwithswift.com/example-code/language/how-to-use-map-to-transform-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-use-map-with-an-optional-value.md',
              '/hackingwithswift.com/example-code/language/how-to-use-one-sided-ranges.md',
              '/hackingwithswift.com/example-code/language/how-to-use-operator-overloading.md',
              '/hackingwithswift.com/example-code/language/how-to-use-reduce-to-condense-an-array-into-a-single-value.md',
              '/hackingwithswift.com/example-code/language/how-to-use-reflection-to-inspect-type-data.md',
              '/hackingwithswift.com/example-code/language/how-to-use-the-foreach-method-to-loop-over-an-array.md',
              '/hackingwithswift.com/example-code/language/how-to-use-the-rethrows-keyword.md',
              '/hackingwithswift.com/example-code/language/how-to-use-the-zip-function-to-join-two-arrays.md',
              '/hackingwithswift.com/example-code/language/how-to-use-try-catch-in-swift-to-handle-exceptions.md',
              '/hackingwithswift.com/example-code/language/how-to-use-typealias-to-make-it-easier-to-use-complex-types.md',
              '/hackingwithswift.com/example-code/language/how-to-write-a-closure-that-returns-a-value.md',
              '/hackingwithswift.com/example-code/language/optional-vs-implicitly-unwrapped-optional-whats-the-difference.md',
              '/hackingwithswift.com/example-code/language/private-vs-fileprivate-whats-the-difference.md',
              '/hackingwithswift.com/example-code/language/remove-all-instances-of-an-object-from-an-array.md',
              '/hackingwithswift.com/example-code/language/removing-matching-elements-from-a-collection-removeallwhere.md',
              '/hackingwithswift.com/example-code/language/self-vs-self-whats-the-difference.md',
              '/hackingwithswift.com/example-code/language/tips-for-android-developers-switching-to-swift.md',
              '/hackingwithswift.com/example-code/language/using-stride-to-loop-over-a-range-of-numbers.md',
              '/hackingwithswift.com/example-code/language/what-are-class-and-subtype-existentials.md',
              '/hackingwithswift.com/example-code/language/what-are-convenience-initializers.md',
              '/hackingwithswift.com/example-code/language/what-are-designated-initializers.md',
              '/hackingwithswift.com/example-code/language/what-are-generics.md',
              '/hackingwithswift.com/example-code/language/what-are-implicitly-unwrapped-optionals.md',
              '/hackingwithswift.com/example-code/language/what-are-indirect-enums.md',
              '/hackingwithswift.com/example-code/language/what-are-inout-parameters.md',
              '/hackingwithswift.com/example-code/language/what-are-keypaths.md',
              '/hackingwithswift.com/example-code/language/what-are-keyvaluepairs.md',
              '/hackingwithswift.com/example-code/language/what-are-lazy-variables.md',
              '/hackingwithswift.com/example-code/language/what-are-property-observers.md',
              '/hackingwithswift.com/example-code/language/what-are-protocol-extensions.md',
              '/hackingwithswift.com/example-code/language/what-are-sets.md',
              '/hackingwithswift.com/example-code/language/what-are-static-methods-and-variables.md',
              '/hackingwithswift.com/example-code/language/what-are-the-changes-in-swift-12.md',
              '/hackingwithswift.com/example-code/language/what-are-the-changes-in-swift-20.md',
              '/hackingwithswift.com/example-code/language/what-are-the-changes-in-swift-22.md',
              '/hackingwithswift.com/example-code/language/what-are-the-changes-in-swift-3.md',
              '/hackingwithswift.com/example-code/language/what-does-an-exclamation-mark-mean.md',
              '/hackingwithswift.com/example-code/language/what-does-override-mean.md',
              '/hackingwithswift.com/example-code/language/what-does-the-appdelegate-class-do.md',
              '/hackingwithswift.com/example-code/language/what-does-the-open-keyword-do.md',
              '/hackingwithswift.com/example-code/language/what-does-unowned-mean.md',
              '/hackingwithswift.com/example-code/language/what-does-weak-mean.md',
              '/hackingwithswift.com/example-code/language/what-is-a-cgfloat.md',
              '/hackingwithswift.com/example-code/language/what-is-a-closure.md',
              '/hackingwithswift.com/example-code/language/what-is-a-computed-property.md',
              '/hackingwithswift.com/example-code/language/what-is-a-delegate-in-ios.md',
              '/hackingwithswift.com/example-code/language/what-is-a-dictionary.md',
              '/hackingwithswift.com/example-code/language/what-is-a-double.md',
              '/hackingwithswift.com/example-code/language/what-is-a-float.md',
              '/hackingwithswift.com/example-code/language/what-is-a-functor.md',
              '/hackingwithswift.com/example-code/language/what-is-a-lazy-sequence.md',
              '/hackingwithswift.com/example-code/language/what-is-a-monad.md',
              '/hackingwithswift.com/example-code/language/what-is-a-nested-class-or-nested-struct.md',
              '/hackingwithswift.com/example-code/language/what-is-a-nib.md',
              '/hackingwithswift.com/example-code/language/what-is-a-protocol-associated-type.md',
              '/hackingwithswift.com/example-code/language/what-is-a-protocol.md',
              '/hackingwithswift.com/example-code/language/what-is-a-selector.md',
              '/hackingwithswift.com/example-code/language/what-is-a-singleton.md',
              '/hackingwithswift.com/example-code/language/what-is-a-storyboard.md',
              '/hackingwithswift.com/example-code/language/what-is-a-throwing-function.md',
              '/hackingwithswift.com/example-code/language/what-is-a-tuple.md',
              '/hackingwithswift.com/example-code/language/what-is-an-enum.md',
              '/hackingwithswift.com/example-code/language/what-is-an-escaping-closure.md',
              '/hackingwithswift.com/example-code/language/what-is-an-optional-value-in-swift.md',
              '/hackingwithswift.com/example-code/language/what-is-anyobject.md',
              '/hackingwithswift.com/example-code/language/what-is-automatic-reference-counting-arc.md',
              '/hackingwithswift.com/example-code/language/what-is-class-inheritance.md',
              '/hackingwithswift.com/example-code/language/what-is-copy-on-write.md',
              '/hackingwithswift.com/example-code/language/what-is-destructuring.md',
              '/hackingwithswift.com/example-code/language/what-is-function-composition.md',
              '/hackingwithswift.com/example-code/language/what-is-key-value-observing.md',
              '/hackingwithswift.com/example-code/language/what-is-mvc.md',
              '/hackingwithswift.com/example-code/language/what-is-mvvm.md',
              '/hackingwithswift.com/example-code/language/what-is-nsnumber.md',
              '/hackingwithswift.com/example-code/language/what-is-optional-chaining.md',
              '/hackingwithswift.com/example-code/language/what-is-protocol-oriented-programming.md',
              '/hackingwithswift.com/example-code/language/what-is-the-objc-attribute.md',
              '/hackingwithswift.com/example-code/language/what-is-the-objcmembers-attribute.md',
              '/hackingwithswift.com/example-code/language/what-is-the-autoclosure-attribute.md',
              '/hackingwithswift.com/example-code/language/what-is-the-never-return-type.md',
              '/hackingwithswift.com/example-code/language/what-is-the-nil-coalescing-operator.md',
              '/hackingwithswift.com/example-code/language/what-is-the-result-type.md',
              '/hackingwithswift.com/example-code/language/what-is-the-ternary-operator.md',
              '/hackingwithswift.com/example-code/language/what-is-trailing-closure-syntax.md',
              '/hackingwithswift.com/example-code/language/what-is-typecasting.md',
              '/hackingwithswift.com/example-code/language/what-is-whole-module-optimization.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-let-and-var.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-equalsequals-and-equalsequalsequals.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-a-class-and-a-struct.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-a-function-and-a-closure.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-a-function-and-a-method.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-a-protocol-and-a-class.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-a-static-variable-and-a-class-variable.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-any-and-anyobject.md',
              '/hackingwithswift.com/example-code/language/whats-the-difference-between-init-and-init.md',
              '/hackingwithswift.com/example-code/language/when-is-it-safe-to-force-unwrap-optionals.md',
              '/hackingwithswift.com/example-code/language/when-to-use-a-set-rather-than-an-array.md',
              '/hackingwithswift.com/example-code/language/why-is-immutability-important.md',
            ]
          }, {
            text: 'Libraries',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/libraries/README.md',
              '/hackingwithswift.com/example-code/libraries/how-to-convert-speech-to-text-using-sfspeechrecognizer.md',
              '/hackingwithswift.com/example-code/libraries/how-to-display-pdfs-using-pdfview.md',
              '/hackingwithswift.com/example-code/libraries/how-to-extract-text-from-a-pdf-using-pdfkit.md',
              '/hackingwithswift.com/example-code/libraries/how-to-get-a-cover-flow-effect-on-ios.md',
              '/hackingwithswift.com/example-code/libraries/how-to-make-empty-uitableviews-look-more-attractive-using-dznemptydataset.md',
              '/hackingwithswift.com/example-code/libraries/how-to-parse-json-using-swiftyjson.md',
              '/hackingwithswift.com/example-code/libraries/how-to-preview-files-using-quick-look-and-qlpreviewcontroller.md',
              '/hackingwithswift.com/example-code/libraries/how-to-scan-nfc-tags-using-core-nfc.md',
              '/hackingwithswift.com/example-code/libraries/how-to-search-your-apps-spotlight-index.md',
              '/hackingwithswift.com/example-code/libraries/how-to-show-pdf-thumbnails-using-pdfthumbnailview.md',
              '/hackingwithswift.com/example-code/libraries/how-to-watermark-pdfs-inside-a-pdfview.md',
              '/hackingwithswift.com/example-code/libraries/what-is-cloudkit.md',
            ]
          }, {
            text: 'Location',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/location/README.md',
              '/hackingwithswift.com/example-code/location/adding-places-to-mkmapview-using-mkplacemark.md',
              '/hackingwithswift.com/example-code/location/how-to-add-a-button-to-an-mkmapview-annotation.md',
              '/hackingwithswift.com/example-code/location/how-to-add-an-mkmapview-using-mapkit.md',
              '/hackingwithswift.com/example-code/location/how-to-add-annotations-to-mkmapview-using-mkpointannotation-and-mkpinannotationview.md',
              '/hackingwithswift.com/example-code/location/how-to-detect-ibeacons.md',
              '/hackingwithswift.com/example-code/location/how-to-find-directions-using-mkmapview-and-mkdirectionsrequest.md',
              '/hackingwithswift.com/example-code/location/how-to-look-up-a-location-with-mklocalsearchrequest.md',
              '/hackingwithswift.com/example-code/location/how-to-make-an-iphone-transmit-an-ibeacon.md',
              '/hackingwithswift.com/example-code/location/how-to-read-the-users-location-while-your-app-is-in-the-background.md',
              '/hackingwithswift.com/example-code/location/how-to-request-a-users-location-only-once-using-requestlocation.md',
            ]
          }, {
            text: 'Media',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/media/README.md',
              '/hackingwithswift.com/example-code/media/cidetectortypeface-how-to-detect-faces-in-a-uiimage.md',
              '/hackingwithswift.com/example-code/media/how-to-choose-a-photo-from-the-camera-roll-using-uiimagepickercontroller.md',
              '/hackingwithswift.com/example-code/media/how-to-control-the-pitch-and-speed-of-audio-using-avaudioengine.md',
              '/hackingwithswift.com/example-code/media/how-to-convert-text-to-speech-using-avspeechsynthesizer-avspeechutterance-and-avspeechsynthesisvoice.md',
              '/hackingwithswift.com/example-code/media/how-to-create-a-barcode.md',
              '/hackingwithswift.com/example-code/media/how-to-create-a-pdf417-barcode.md',
              '/hackingwithswift.com/example-code/media/how-to-create-a-qr-code.md',
              '/hackingwithswift.com/example-code/media/how-to-desaturate-an-image-to-make-it-black-and-white.md',
              '/hackingwithswift.com/example-code/media/how-to-filter-images-using-core-image-and-cifilter.md',
              '/hackingwithswift.com/example-code/media/how-to-highlight-text-to-speech-words-being-read-using-avspeechsynthesizer.md',
              '/hackingwithswift.com/example-code/media/how-to-loop-audio-using-avaudioplayer-and-numberofloops.md',
              '/hackingwithswift.com/example-code/media/how-to-make-resizable-images-using-resizableimagewithcapinsets.md',
              '/hackingwithswift.com/example-code/media/how-to-pixellate-a-uiimage.md',
              '/hackingwithswift.com/example-code/media/how-to-play-sounds-using-avaudioplayer.md',
              '/hackingwithswift.com/example-code/media/how-to-play-videos-using-avplayerviewcontroller.md',
              '/hackingwithswift.com/example-code/media/how-to-read-the-average-color-of-a-uiimage-using-ciareaaverage.md',
              '/hackingwithswift.com/example-code/media/how-to-record-audio-using-avaudiorecorder.md',
              '/hackingwithswift.com/example-code/media/how-to-record-user-videos-using-replaykit.md',
              '/hackingwithswift.com/example-code/media/how-to-render-a-uiview-to-a-uiimage.md',
              '/hackingwithswift.com/example-code/media/how-to-save-a-uiimage-to-a-file-using-jpegdata-and-pngdata.md',
              '/hackingwithswift.com/example-code/media/how-to-scan-a-barcode.md',
              '/hackingwithswift.com/example-code/media/how-to-scan-a-qr-code.md',
              '/hackingwithswift.com/example-code/media/how-to-turn-on-the-camera-flashlight-to-make-a-torch.md',
              '/hackingwithswift.com/example-code/media/uiimagewritetosavedphotosalbum-how-to-write-to-the-ios-photo-album.md',
            ]
          }, {
            text: 'NaturalLanguage',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/naturallanguage/README.md',
              '/hackingwithswift.com/example-code/naturallanguage/how-to-find-similar-words-for-a-search-term.md',
              '/hackingwithswift.com/example-code/naturallanguage/how-to-lemmatize-text-using-nltagger.md',
              '/hackingwithswift.com/example-code/naturallanguage/how-to-perform-sentiment-analysis-on-a-string-using-nltagger.md',
            ]
          }, {
            text: 'Networking',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/networking/README.md',
              '/hackingwithswift.com/example-code/networking/how-to-check-for-internet-connectivity-using-nwpathmonitor.md',
              '/hackingwithswift.com/example-code/networking/how-to-create-a-peer-to-peer-network-using-the-multipeer-connectivity-framework.md',
              '/hackingwithswift.com/example-code/networking/how-to-download-files-with-urlsession-and-downloadtask.md',
              '/hackingwithswift.com/example-code/networking/how-to-make-a-network-request-wait-for-an-internet-connection-using-waitsforconnectivity.md',
              '/hackingwithswift.com/example-code/networking/how-to-support-low-data-mode-networking-using-allowsconstrainednetworkaccess.md',
            ]
          }, {
            text: 'Strings',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/strings/README.md',
              '/hackingwithswift.com/example-code/strings/how-do-you-make-raw-strings-in-swift.md',
              '/hackingwithswift.com/example-code/strings/how-to-calculate-the-rot13-of-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-capitalize-the-first-letter-of-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-capitalize-words-in-a-string-using-capitalized.md',
              '/hackingwithswift.com/example-code/strings/how-to-check-whether-a-string-contains-any-words-from-an-array.md',
              '/hackingwithswift.com/example-code/strings/how-to-concatenate-strings-to-make-one-joined-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-a-safe-format-for-url-slugs-and-filenames.md',
              '/hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-lowercase-letters.md',
              '/hackingwithswift.com/example-code/strings/how-to-convert-a-string-to-uppercase-letters.md',
              '/hackingwithswift.com/example-code/strings/how-to-detect-a-url-in-a-string-using-nsdatadetector.md',
              '/hackingwithswift.com/example-code/strings/how-to-display-different-strings-based-on-available-space-using-variantfittingpresentationwidth.md',
              '/hackingwithswift.com/example-code/strings/how-to-get-the-length-of-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-get-the-lines-in-a-string-as-an-array.md',
              '/hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-file-in-your-bundle.md',
              '/hackingwithswift.com/example-code/strings/how-to-load-a-string-from-a-website-url.md',
              '/hackingwithswift.com/example-code/strings/how-to-loop-through-letters-in-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-measure-a-string-for-objective-c-code.md',
              '/hackingwithswift.com/example-code/strings/how-to-parse-a-sentence-using-nslinguistictagger.md',
              '/hackingwithswift.com/example-code/strings/how-to-read-a-single-character-from-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-remove-a-prefix-from-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-repeat-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-reverse-a-string-using-reversed.md',
              '/hackingwithswift.com/example-code/strings/how-to-run-a-case-insensitive-search-for-one-string-inside-another.md',
              '/hackingwithswift.com/example-code/strings/how-to-save-a-string-to-a-file-on-disk-with-writeto.md',
              '/hackingwithswift.com/example-code/strings/how-to-specify-floating-point-precision-in-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-split-a-string-into-an-array-componentsseparatedby.md',
              '/hackingwithswift.com/example-code/strings/how-to-test-localization-by-setting-a-debug-locale-and-double-length-pseudolanguage.md',
              '/hackingwithswift.com/example-code/strings/how-to-trim-whitespace-in-a-string.md',
              '/hackingwithswift.com/example-code/strings/how-to-use-string-interpolation-to-combine-strings-integers-and-doubles.md',
              '/hackingwithswift.com/example-code/strings/nsregularexpression-how-to-match-regular-expressions-in-strings.md',
              '/hackingwithswift.com/example-code/strings/replacing-text-in-a-string-using-replacingoccurrencesof.md',
            ]
          }, {
            text: 'System',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/system/README.md',
              '/hackingwithswift.com/example-code/system/how-do-you-read-from-the-command-line.md',
              '/hackingwithswift.com/example-code/system/how-to-cache-data-using-nscache.md',
              '/hackingwithswift.com/example-code/system/how-to-cancel-a-delayed-perform-call.md',
              '/hackingwithswift.com/example-code/system/how-to-check-whether-one-date-is-similar-to-another.md',
              '/hackingwithswift.com/example-code/system/how-to-check-whether-your-other-apps-are-installed.md',
              '/hackingwithswift.com/example-code/system/how-to-compress-and-decompress-data.md',
              '/hackingwithswift.com/example-code/system/how-to-convert-between-camel-case-and-snake-case-with-codable-and-keyencodingstrategy.md',
              '/hackingwithswift.com/example-code/system/how-to-convert-dates-and-times-to-a-string-using-dateformatter.md',
              '/hackingwithswift.com/example-code/system/how-to-convert-html-to-an-nsattributedstring.md',
              '/hackingwithswift.com/example-code/system/how-to-convert-units-using-unit-and-measurement.md',
              '/hackingwithswift.com/example-code/system/how-to-copy-objects-in-swift-using-copy.md',
              '/hackingwithswift.com/example-code/system/how-to-copy-text-to-the-clipboard-using-uipasteboard.md',
              '/hackingwithswift.com/example-code/system/how-to-create-rich-formatted-text-strings-using-nsattributedstring.md',
              '/hackingwithswift.com/example-code/system/how-to-decode-json-from-your-app-bundle-the-easy-way.md',
              '/hackingwithswift.com/example-code/system/how-to-detect-low-power-mode-is-enabled.md',
              '/hackingwithswift.com/example-code/system/how-to-detect-the-dominant-language-of-a-text-string.md',
              '/hackingwithswift.com/example-code/system/how-to-detect-when-your-app-moves-to-the-background.md',
              '/hackingwithswift.com/example-code/system/how-to-detect-which-country-a-user-is-in.md',
              '/hackingwithswift.com/example-code/system/how-to-find-the-path-to-a-file-in-your-bundle.md',
              '/hackingwithswift.com/example-code/system/how-to-find-the-users-documents-directory.md',
              '/hackingwithswift.com/example-code/system/how-to-format-dates-with-an-ordinal-suffix-using-numberformatters-ordinalstyle.md',
              '/hackingwithswift.com/example-code/system/how-to-generate-a-random-identifier-using-uuid.md',
              '/hackingwithswift.com/example-code/system/how-to-group-user-notifications-using-threadidentifier-and-summaryargument.md',
              '/hackingwithswift.com/example-code/system/how-to-handle-the-https-requirements-in-ios-with-app-transport-security.md',
              '/hackingwithswift.com/example-code/system/how-to-identify-an-ios-device-uniquely-with-identifierforvendor.md',
              '/hackingwithswift.com/example-code/system/how-to-insert-images-into-an-attributed-string-with-nstextattachment.md',
              '/hackingwithswift.com/example-code/system/how-to-join-an-array-of-strings-in-a-natural-way.md',
              '/hackingwithswift.com/example-code/system/how-to-load-and-save-a-struct-in-userdefaults-using-codable.md',
              '/hackingwithswift.com/example-code/system/how-to-make-an-action-repeat-using-timer.md',
              '/hackingwithswift.com/example-code/system/how-to-make-one-operation-wait-for-another-to-complete-using-adddependency.md',
              '/hackingwithswift.com/example-code/system/how-to-make-tappable-links-in-nsattributedstring.md',
              '/hackingwithswift.com/example-code/system/how-to-make-the-device-vibrate.md',
              '/hackingwithswift.com/example-code/system/how-to-make-your-app-open-with-a-custom-url-scheme.md',
              '/hackingwithswift.com/example-code/system/how-to-open-a-url-in-safari.md',
              '/hackingwithswift.com/example-code/system/how-to-parse-json-using-jsonserialization.md',
              '/hackingwithswift.com/example-code/system/how-to-pass-data-between-two-view-controllers.md',
              '/hackingwithswift.com/example-code/system/how-to-post-messages-using-notificationcenter.md',
              '/hackingwithswift.com/example-code/system/how-to-read-names-in-a-string-using-nslinguistictagger.md',
              '/hackingwithswift.com/example-code/system/how-to-read-the-contents-of-a-directory-using-filemanager.md',
              '/hackingwithswift.com/example-code/system/how-to-read-your-apps-version-from-your-infoplist-file.md',
              '/hackingwithswift.com/example-code/system/how-to-run-an-external-program-using-process.md',
              '/hackingwithswift.com/example-code/system/how-to-run-code-after-a-delay-using-asyncafter-and-perform.md',
              '/hackingwithswift.com/example-code/system/how-to-run-code-asynchronously-using-gcd-async.md',
              '/hackingwithswift.com/example-code/system/how-to-run-code-at-a-specific-time.md',
              '/hackingwithswift.com/example-code/system/how-to-run-code-on-the-main-thread-using-gcd-async.md',
              '/hackingwithswift.com/example-code/system/how-to-run-code-when-your-app-is-terminated.md',
              '/hackingwithswift.com/example-code/system/how-to-save-and-load-objects-with-nskeyedarchiver-and-nskeyedunarchiver.md',
              '/hackingwithswift.com/example-code/system/how-to-save-user-settings-using-userdefaults.md',
              '/hackingwithswift.com/example-code/system/how-to-send-notifications-asynchronously-using-notificationqueue.md',
              '/hackingwithswift.com/example-code/system/how-to-set-local-alerts-using-unnotificationcenter.md',
              '/hackingwithswift.com/example-code/system/how-to-show-a-relative-date-and-time-using-relativedatetimeformatter.md',
              '/hackingwithswift.com/example-code/system/how-to-show-the-price-of-an-skproduct.md',
              '/hackingwithswift.com/example-code/system/how-to-spell-out-numbers-using-numberformatters-spellout-style.md',
              '/hackingwithswift.com/example-code/system/how-to-stop-the-screen-from-going-to-sleep.md',
              '/hackingwithswift.com/example-code/system/how-to-store-userdefaults-options-in-icloud.md',
              '/hackingwithswift.com/example-code/system/how-to-synchronize-code-to-drawing-using-cadisplaylink.md',
              '/hackingwithswift.com/example-code/system/how-to-use-core-motion-to-read-accelerometer-data.md',
              '/hackingwithswift.com/example-code/system/how-to-use-core-spotlight-to-index-content-in-your-app.md',
              '/hackingwithswift.com/example-code/system/how-to-use-multithreaded-operations-with-operationqueue.md',
              '/hackingwithswift.com/example-code/system/how-to-use-touch-id-to-authenticate-users-by-fingerprint.md',
              '/hackingwithswift.com/example-code/system/measuring-execution-speed-using-cfabsolutetimegetcurrent.md',
              '/hackingwithswift.com/example-code/system/nstexteffectletterpressstyle-how-to-add-a-letterpress-effect-to-text.md',
              '/hackingwithswift.com/example-code/system/what-is-the-first-responder.md',
            ]
          }, {
            text: 'Testing',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/testing/README.md',
              '/hackingwithswift.com/example-code/testing/how-to-benchmark-app-launch-time-using-xctossignpostmetricapplicationlaunch.md',
              '/hackingwithswift.com/example-code/testing/how-to-check-and-unwrap-optionals-in-tests-using-xctunwrap.md',
              '/hackingwithswift.com/example-code/testing/how-to-do-conditional-test-tear-down-using-addteardownblock.md',
              '/hackingwithswift.com/example-code/testing/how-to-do-one-time-setup-for-your-tests.md',
              '/hackingwithswift.com/example-code/testing/how-to-set-baselines-for-your-performance-tests.md',
              '/hackingwithswift.com/example-code/testing/how-to-test-asynchronous-functions-using-expectation.md',
              '/hackingwithswift.com/example-code/testing/how-to-test-throwing-functions.md',
              '/hackingwithswift.com/example-code/testing/how-to-write-performance-tests-using-measure.md',
            ]
          }, {
            text: 'UIColor',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/uicolor/README.md',
              '/hackingwithswift.com/example-code/uicolor/how-to-convert-a-hex-color-to-a-uicolor.md',
              '/hackingwithswift.com/example-code/uicolor/how-to-convert-a-html-name-string-into-a-uicolor.md',
              '/hackingwithswift.com/example-code/uicolor/how-to-create-custom-colors-using-uicolor-rgb-and-hues.md',
              '/hackingwithswift.com/example-code/uicolor/how-to-read-the-red-green-blue-and-alpha-color-components-from-a-uicolor.md',
              '/hackingwithswift.com/example-code/uicolor/how-to-use-an-image-for-your-background-color-with-uicolorpatternimage.md',
              '/hackingwithswift.com/example-code/uicolor/how-to-use-semantic-colors-to-help-your-ios-app-adapt-to-dark-mode.md',
            ]
          }, {
            text: 'UIKit',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/uikit/README.md',
              '/hackingwithswift.com/example-code/uikit/changing-which-uitabbarcontroller-tabs-can-be-edited.md',
              '/hackingwithswift.com/example-code/uikit/fixing-failed-to-obtain-a-cell-from-its-datasource.md',
              '/hackingwithswift.com/example-code/uikit/fixing-unable-to-dequeue-a-cell-with-identifier.md',
              '/hackingwithswift.com/example-code/uikit/how-do-you-show-a-modal-view-controller-when-a-uitabbarcontroller-tab-is-tapped.md',
              '/hackingwithswift.com/example-code/uikit/how-set-different-widths-for-a-uisegmentedcontrols-elements.md',
              '/hackingwithswift.com/example-code/uikit/how-to-activate-multiple-auto-layout-constraints-using-activate.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-badge-to-your-uitabbaritem.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-bar-button-to-a-navigation-bar.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-button-to-a-navigation-bar-using-storyboards.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-button-to-a-uitableviewcell.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-custom-view-to-a-uibarbuttonitem.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-flexible-space-to-a-uibarbuttonitem.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-number-over-your-app-icon-using-applicationiconbadgenumber.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-section-header-to-a-table-view.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-shadow-to-a-uiview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-toolbar-above-the-keyboard-using-inputaccessoryview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-uiapplicationshortcutitem-quick-action-for-3d-touch.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-a-uitextfield-to-a-uialertcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-blur-and-vibrancy-using-uivisualeffectview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-custom-spacing-to-uistackview-items.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-drag-and-drop-to-your-app.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-multiple-uibarbuttonitem-to-a-navigation-bar-using-rightbarbuttonitems.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-peek-and-pop-to-a-uitableview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-retina-and-retina-hd-graphics-to-your-project.md',
              '/hackingwithswift.com/example-code/uikit/how-to-add-scopes-to-a-uisearchcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-adjust-a-uiscrollview-to-fit-the-keyboard.md',
              '/hackingwithswift.com/example-code/uikit/how-to-adjust-image-content-mode-using-aspect-fill-aspect-fit-and-scaling.md',
              '/hackingwithswift.com/example-code/uikit/how-to-animate-a-blur-effect-using-uivisualeffectview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-animate-views-using-animatewithduration.md',
              '/hackingwithswift.com/example-code/uikit/how-to-animate-views-using-uiviewpropertyanimator.md',
              '/hackingwithswift.com/example-code/uikit/how-to-animate-views-with-spring-damping-using-animatewithduration.md',
              '/hackingwithswift.com/example-code/uikit/how-to-animate-when-your-size-class-changes-willtransitionto.md',
              '/hackingwithswift.com/example-code/uikit/how-to-ask-users-to-review-your-app-using-skstorereviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-bring-a-subview-to-the-front-of-a-uiview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-center-a-view-in-its-container.md',
              '/hackingwithswift.com/example-code/uikit/how-to-change-the-scroll-indicator-inset-for-a-uiscrollview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-change-your-app-icon-dynamically-with-setalternateiconname.md',
              '/hackingwithswift.com/example-code/uikit/how-to-check-a-string-is-spelled-correctly-using-uitextchecker.md',
              '/hackingwithswift.com/example-code/uikit/how-to-check-whether-an-iphone-or-ipad-is-upside-down-or-face-up.md',
              '/hackingwithswift.com/example-code/uikit/how-to-check-whether-users-have-enabled-the-reduced-motion-setting.md',
              '/hackingwithswift.com/example-code/uikit/how-to-control-a-uiprogressviews-animation.md',
              '/hackingwithswift.com/example-code/uikit/how-to-control-which-screen-edges-trigger-system-gestures-using-preferredscreenedgesdeferringsystemgestures.md',
              '/hackingwithswift.com/example-code/uikit/how-to-convert-a-cgpoint-in-one-uiview-to-another-view-using-convert.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-a-page-curl-effect-using-uipageviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-a-parallax-effect-in-uikit.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-auto-layout-constraints-in-code-constraintswithvisualformat.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-custom-menus-using-uimenucontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-custom-text-input-using-uikeyinput.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-keyframe-animations-using-animatekeyframes.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-live-playgrounds-in-xcode.md',
              '/hackingwithswift.com/example-code/uikit/how-to-create-popover-menus-using-uipopoverpresentationcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-customize-a-view-controllers-back-button-on-a-navigation-bar-backbarbuttonitem.md',
              '/hackingwithswift.com/example-code/uikit/how-to-customize-swipe-edit-buttons-in-a-uitableview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-deselect-a-uitableviewcell-using-clearsselectiononviewwillappear.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-a-double-tap-gesture.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-dark-mode-in-ios.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-edge-swipes.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-keyboard-input-using-pressesbegan-and-pressesended.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-long-presses-using-uilongpressgesturerecognizer.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-when-the-back-button-is-tapped.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-when-the-user-takes-a-screenshot.md',
              '/hackingwithswift.com/example-code/uikit/how-to-detect-when-your-size-class-changes.md',
              '/hackingwithswift.com/example-code/uikit/how-to-dim-the-screen.md',
              '/hackingwithswift.com/example-code/uikit/how-to-disable-interactive-swipe-to-dismiss-for-view-controllers.md',
              '/hackingwithswift.com/example-code/uikit/how-to-disable-undo-redo-copy-and-paste-gestures-using-editinginteractionconfiguration.md',
              '/hackingwithswift.com/example-code/uikit/how-to-draw-custom-views-in-interface-builder-using-ibdesignable.md',
              '/hackingwithswift.com/example-code/uikit/how-to-draw-shapes-using-uibezierpath.md',
              '/hackingwithswift.com/example-code/uikit/how-to-enable-large-titles-in-your-navigation-bar.md',
              '/hackingwithswift.com/example-code/uikit/how-to-find-a-touchs-location-in-a-view-with-locationin.md',
              '/hackingwithswift.com/example-code/uikit/how-to-find-a-uiview-subview-using-viewwithtag.md',
              '/hackingwithswift.com/example-code/uikit/how-to-find-an-aspect-fit-images-size-inside-an-image-view.md',
              '/hackingwithswift.com/example-code/uikit/how-to-find-the-view-controller-responsible-for-a-view.md',
              '/hackingwithswift.com/example-code/uikit/how-to-fix-auto-layout-problems.md',
              '/hackingwithswift.com/example-code/uikit/how-to-fix-the-error-failed-to-instantiate-the-default-view-controller-for-uimainstoryboardfile.md',
              '/hackingwithswift.com/example-code/uikit/how-to-flip-a-uiview-with-a-3d-effect-transitionwith.md',
              '/hackingwithswift.com/example-code/uikit/how-to-force-a-uiview-to-redraw-setneedsdisplay.md',
              '/hackingwithswift.com/example-code/uikit/how-to-force-a-view-controller-to-use-light-or-dark-mode.md',
              '/hackingwithswift.com/example-code/uikit/how-to-generate-haptic-feedback-with-uifeedbackgenerator.md',
              '/hackingwithswift.com/example-code/uikit/how-to-give-a-uinavigationbar-a-background-image-setbackgroundimage.md',
              '/hackingwithswift.com/example-code/uikit/how-to-give-a-uistackview-a-background-color.md',
              '/hackingwithswift.com/example-code/uikit/how-to-give-uitableviewcells-a-selected-color-other-than-gray.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-passwords-in-a-uitextfield.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-the-home-indicator-on-iphone-x.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-the-navigation-bar-using-hidesbarsonswipe.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-the-navigation-bar-using-hidesbarsontap.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-the-status-bar.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-the-tab-bar-when-a-view-controller-is-shown.md',
              '/hackingwithswift.com/example-code/uikit/how-to-hide-your-navigation-bar-when-the-keyboard-shows-hidesbarswhenkeyboardappears.md',
              '/hackingwithswift.com/example-code/uikit/how-to-identify-your-auto-layout-constraints.md',
              '/hackingwithswift.com/example-code/uikit/how-to-let-users-choose-a-font-with-uifontpickerviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-let-users-tap-on-a-uitableviewcell-while-editing-is-enabled.md',
              '/hackingwithswift.com/example-code/uikit/how-to-limit-the-number-of-characters-in-a-uitextfield-or-uitextview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-load-a-html-string-into-a-wkwebview-or-uiwebview-loadhtmlstring.md',
              '/hackingwithswift.com/example-code/uikit/how-to-load-a-remote-image-url-into-uiimageview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-localize-your-ios-app.md',
              '/hackingwithswift.com/example-code/uikit/how-to-lock-a-view-controllers-orientation-using-supportedinterfaceorientations.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-a-background-image-run-under-the-safe-area.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-a-button-glow-when-tapped-with-showstouchwhenhighlighted.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-a-clear-button-appear-in-a-textfield.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-a-uiview-fill-the-screen-using-auto-layout-anchors.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-gesture-recognizers-work-together-using-requiretofail.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-the-master-pane-always-visible-in-a-uisplitviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-uicollectionview-headers-stay-fixed-using-sectionheaderspintovisiblebounds.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcell-separators-go-edge-to-edge.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-uitableviewcells-auto-resize-to-their-content.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-uiviewpropertyanimator-scrub-with-a-custom-curve-scrubslinearly.md',
              '/hackingwithswift.com/example-code/uikit/how-to-make-your-user-interface-in-code.md',
              '/hackingwithswift.com/example-code/uikit/how-to-mask-one-uiview-using-another-uiview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-measure-touch-strength-using-3d-touch.md',
              '/hackingwithswift.com/example-code/uikit/how-to-move-to-the-next-uitextfield-when-the-user-presses-return.md',
              '/hackingwithswift.com/example-code/uikit/how-to-pad-a-uitextview-by-setting-its-text-container-inset.md',
              '/hackingwithswift.com/example-code/uikit/how-to-perform-a-segue-programmatically-using-performsegue.md',
              '/hackingwithswift.com/example-code/uikit/how-to-position-a-view-using-auto-layout-anchors.md',
              '/hackingwithswift.com/example-code/uikit/how-to-print-using-uiactivityviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-put-a-background-picture-behind-uitableviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-read-a-title-from-a-uipickerview-using-titleforrow.md',
              '/hackingwithswift.com/example-code/uikit/how-to-read-the-battery-level-of-an-iphone-or-ipad.md',
              '/hackingwithswift.com/example-code/uikit/how-to-read-the-interface-orientation-portrait-or-landscape.md',
              '/hackingwithswift.com/example-code/uikit/how-to-recolor-uiimages-using-template-images-and-withrenderingmode.md',
              '/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uicollectionview-reuse.md',
              '/hackingwithswift.com/example-code/uikit/how-to-register-a-cell-for-uitableviewcell-reuse.md',
              '/hackingwithswift.com/example-code/uikit/how-to-reload-a-uitableview-while-preserving-selections.md',
              '/hackingwithswift.com/example-code/uikit/how-to-remove-a-uiview-from-its-superview-with-removefromsuperview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-remove-cells-from-a-uitableview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-render-an-nsattributedstring-to-a-pdf.md',
              '/hackingwithswift.com/example-code/uikit/how-to-render-pdfs-using-uigraphicspdfrenderer.md',
              '/hackingwithswift.com/example-code/uikit/how-to-render-shadows-using-nsshadow-and-setshadow.md',
              '/hackingwithswift.com/example-code/uikit/how-to-resize-a-custom-font-using-uifontmetrics.md',
              '/hackingwithswift.com/example-code/uikit/how-to-respond-to-the-device-being-shaken.md',
              '/hackingwithswift.com/example-code/uikit/how-to-run-javascript-on-a-uiwebview-with-stringbyevaluatingjavascriptfrom.md',
              '/hackingwithswift.com/example-code/uikit/how-to-scale-stretch-move-and-rotate-uiviews-using-cgaffinetransform.md',
              '/hackingwithswift.com/example-code/uikit/how-to-send-an-email.md',
              '/hackingwithswift.com/example-code/uikit/how-to-set-a-custom-title-view-in-a-uinavigationbar.md',
              '/hackingwithswift.com/example-code/uikit/how-to-set-prompt-text-in-a-navigation-bar.md',
              '/hackingwithswift.com/example-code/uikit/how-to-set-the-tabs-in-a-uitabbarcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-set-the-tint-color-of-a-uiview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-share-content-with-the-social-framework-and-slcomposeviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-share-content-with-uiactivityviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-show-and-hide-a-toolbar-inside-a-uinavigationcontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-stop-auto-layout-and-autoresizing-masks-conflicting-translatesautoresizingmaskintoconstraints.md',
              '/hackingwithswift.com/example-code/uikit/how-to-stop-empty-row-separators-appearing-in-uitableview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-stop-users-selecting-text-in-a-uiwebview-or-wkwebview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-stop-your-uisearchcontroller-bar-hiding-when-you-scroll.md',
              '/hackingwithswift.com/example-code/uikit/how-to-stop-your-view-going-under-the-navigation-bar-using-edgesforextendedlayout.md',
              '/hackingwithswift.com/example-code/uikit/how-to-style-the-font-in-a-uinavigationbars-title.md',
              '/hackingwithswift.com/example-code/uikit/how-to-subclass-uiapplication-using-uiapplicationmain.md',
              '/hackingwithswift.com/example-code/uikit/how-to-support-pinch-to-zoom-in-a-uiscrollview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-support-right-to-left-languages.md',
              '/hackingwithswift.com/example-code/uikit/how-to-swipe-to-delete-uitableviewcells.md',
              '/hackingwithswift.com/example-code/uikit/how-to-take-a-photo-using-the-camera-and-uiimagepickercontroller.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-dependency-injection-with-storyboards.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-dynamic-type-to-resize-your-apps-text.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-ibinspectable-to-adjust-values-in-interface-builder.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-light-text-color-in-the-status-bar.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-sfsafariviewcontroller-to-show-web-pages-in-your-app.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-system-icons-in-your-app.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-uiactivityindicatorview-to-show-a-spinner-when-work-is-happening.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-uikeycommand-to-add-keyboard-shortcuts.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-uipickerview.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-uisearchcontroller-to-let-users-enter-search-words.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-uistepper-to-let-users-change-number-values.md',
              '/hackingwithswift.com/example-code/uikit/how-to-use-view-controller-containment.md',
              '/hackingwithswift.com/example-code/uikit/showing-dictionary-definitions-using-uireferencelibraryviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/what-are-size-classes.md',
              '/hackingwithswift.com/example-code/uikit/what-are-the-different-uistackview-distribution-types.md',
              '/hackingwithswift.com/example-code/uikit/what-does-the-message-simulator-user-has-requested-new-graphics-quality-100-mean.md',
              '/hackingwithswift.com/example-code/uikit/what-is-a-segue.md',
              '/hackingwithswift.com/example-code/uikit/what-is-a-uiviewcontroller.md',
              '/hackingwithswift.com/example-code/uikit/what-is-a-views-intrinsic-content-size.md',
              '/hackingwithswift.com/example-code/uikit/what-is-an-indexpath.md',
              '/hackingwithswift.com/example-code/uikit/what-is-content-compression-resistance.md',
              '/hackingwithswift.com/example-code/uikit/what-is-the-safe-area-layout-guide.md',
              '/hackingwithswift.com/example-code/uikit/what-is-the-uiappearance-proxy.md',
              '/hackingwithswift.com/example-code/uikit/whats-the-difference-between-frame-and-bounds.md',
              '/hackingwithswift.com/example-code/uikit/whats-the-difference-between-leading-trailing-left-and-right-anchors.md',
              '/hackingwithswift.com/example-code/uikit/why-can-i-not-register-for-push-notifications.md',
            ]
          }, {
            text: 'Vision',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/vision/README.md',
              '/hackingwithswift.com/example-code/vision/how-to-detect-documents-using-vndocumentcameraviewcontroller.md',
              '/hackingwithswift.com/example-code/vision/how-to-use-vnrecognizetextrequests-optical-character-recognition-to-detect-text-in-an-image.md',
            ]
          }, {
            text: 'WKWebView',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/wkwebview/README.md',
              '/hackingwithswift.com/example-code/wkwebview/how-to-control-the-sites-a-wkwebview-can-visit-using-wknavigationdelegate.md',
              '/hackingwithswift.com/example-code/wkwebview/how-to-control-the-user-interface-of-a-wkwebview-using-wkuidelegate.md',
              '/hackingwithswift.com/example-code/wkwebview/how-to-enable-back-and-forward-swiping-gestures-in-wkwebview.md',
              '/hackingwithswift.com/example-code/wkwebview/how-to-load-http-content-in-wkwebview-and-uiwebview.md',
              '/hackingwithswift.com/example-code/wkwebview/how-to-monitor-wkwebview-page-load-progress-using-key-value-observing.md',
              '/hackingwithswift.com/example-code/wkwebview/how-to-run-javascript-on-a-wkwebview-with-evaluatejavascript.md',
              '/hackingwithswift.com/example-code/wkwebview/whats-the-difference-between-uiwebview-and-wkwebview.md',
            ]
          }, {
            text: 'Xcode',
            collapsible: true,
            children: [
              '/hackingwithswift.com/example-code/xcode/README.md',
              '/hackingwithswift.com/example-code/xcode/how-to-add-conditions-to-a-breakpoint.md',
              '/hackingwithswift.com/example-code/xcode/how-to-add-markers-to-the-jump-bar.md',
              '/hackingwithswift.com/example-code/xcode/how-to-create-a-project-using-swift-package-manager.md',
              '/hackingwithswift.com/example-code/xcode/how-to-create-exception-breakpoints-in-xcode.md',
              '/hackingwithswift.com/example-code/xcode/how-to-debug-view-layouts-in-xcode.md',
              '/hackingwithswift.com/example-code/xcode/how-to-fix-the-error-view-controller-is-unreachable-because-it-has-no-entry-points-and-no-identifier-for-runtime-access.md',
              '/hackingwithswift.com/example-code/xcode/how-to-load-assets-from-xcode-asset-catalogs.md',
              '/hackingwithswift.com/example-code/xcode/how-to-lock-interface-builder-controls-to-stop-accidental-changes.md',
              '/hackingwithswift.com/example-code/xcode/how-to-make-xcode-play-sounds-while-debugging.md',
              '/hackingwithswift.com/example-code/xcode/how-to-render-example-content-using-prepareforinterfacebuilder.md',
              '/hackingwithswift.com/example-code/xcode/how-to-repeat-code-when-debugging-using-the-instruction-pointer.md',
              '/hackingwithswift.com/example-code/xcode/how-to-set-the-clock-in-the-ios-simulator.md',
              '/hackingwithswift.com/example-code/xcode/how-to-use-storyboard-references-to-simplify-your-storyboards.md',
              '/hackingwithswift.com/example-code/xcode/how-to-use-vector-images-in-your-asset-catalog.md',
              '/hackingwithswift.com/example-code/xcode/how-to-used-a-named-uicolor-in-code-and-interface-builder.md',
              '/hackingwithswift.com/example-code/xcode/what-are-breakpoints.md',
              '/hackingwithswift.com/example-code/xcode/what-are-swift-error-breakpoints.md',
              '/hackingwithswift.com/example-code/xcode/what-are-watchpoints.md',
              '/hackingwithswift.com/example-code/xcode/what-is-an-iboutlet.md',
            ]
          }
        ]
      },
      '/hackingwithswift.com/swift2.md', // 2015-06-08
      '/hackingwithswift.com/ios9.md', // 2015-06-11
      '/hackingwithswift.com/new-features-swift-2.md', // 2015-06-11
      '/hackingwithswift.com/safari-content-blocking-ios9.md', // 2015-06-12
      '/hackingwithswift.com/safari-content-blocking-ios9-install.md', // 2015-06-12
      '/hackingwithswift.com/ios9-tutorials.md', // 2015-06-11
      '/hackingwithswift.com/swift2-2.md', // 2016-03-21
      '/hackingwithswift.com/ios10.md', // 2016-06-13
      '/hackingwithswift.com/swift3.md', // 2016-06-13
      '/hackingwithswift.com/whats-new-in-ios-11.md', // 2016-06-20
      '/hackingwithswift.com/swift3-1.md', // 2017-01-26
      '/hackingwithswift.com/swift4.md', // 2017-06-05
      '/hackingwithswift.com/swift-4-1-improves-codable-with-keydecodingstrategy.md', // 2018-02-05
      '/hackingwithswift.com/learn-whats-new-in-swift-4-1-with-a-playground.md', // 2018-04-04
      '/hackingwithswift.com/whats-new-in-swift-4-1.md', // 2018-06-13
      '/hackingwithswift.com/how-to-use-dynamiccallable-in-swift.md', // 2018-11-27
      '/hackingwithswift.com/whats-new-in-swift-4-2.md', // 2018-12-17
      '/hackingwithswift.com/whats-new-in-swift-5-0.md', // 2019-03-28
      '/hackingwithswift.com/how-to-use-dynamic-member-lookup-in-swift.md', // 2019-03-29
      '/hackingwithswift.com/whats-new-in-swift-5-1.md', // 2019-09-18
      '/hackingwithswift.com/new-syntax-swift-2-error-handling-try-catch', // 2019-09-23
      '/hackingwithswift.com/new-syntax-swift-2-guard', // 2019-09-23
      '/hackingwithswift.com/new-syntax-swift-2-defer', // 2019-09-23
      '/hackingwithswift.com/new-syntax-swift-2-availability-checking.md', // 2019-09-23
      '/hackingwithswift.com/learn-essential-swift-in-one-hour.md',
      '/hackingwithswift.com/i-screwed-up-one-key-accessibility-behavior-and-now-i-m-on-a-mission-to-do-better.md', // 2023-06-23
      '/hackingwithswift.com/whats-new-in-swift-6.md', // 2024-06-10
      '/hackingwithswift.com/whats-new-in-swiftui-for-ios-18.md', // 2024-06-21
    ]
};