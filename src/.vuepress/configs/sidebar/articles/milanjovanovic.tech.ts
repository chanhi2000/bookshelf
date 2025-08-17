import { SidebarInfoTemplate, SidebarInfoSubgroupTemplate, SidebarYeargroupTemplate } from ".";

const REST_APIS_IN_ASPNETCORE: SidebarInfoSubgroupTemplate = {
  text: 'The Complete Guide to REST APIs in ASP.NET Core',
  collapsible: true,
  icon: 'iconfont icon-csharp',
  subPath: 'rest-apis-in-aspnetcore',
  children: [
    'README',
  ]
}

const Y2025: SidebarYeargroupTemplate = { 
  text: '2025',
  collapsible: true,
  children: [
    // END: 2025
    "standalone-aspire-dashboard-setup-for-distributed-dotnet-applications", // 2025-08-30
    "the-real-cost-of-abstractions-in-dotnet", // 2025-08-23
    "building-generative-ai-applications-with-github-models-and-dotnet-aspire", // 2025-08-16
    "the-5-most-common-rest-api-design-mistakes-and-how-to-avoid-them", // 2025-08-08
    "how-to-keep-your-data-boundaries-intact-in-a-modular-monolith", // 2025-08-02
    "named-query-filters-in-ef-10-multiple-query-filters-per-entity", // 2025-07-26 
    "pdf-reporting-in-dotnet-with-html-templates-and-puppeteersharp", // 2025-07-19
    "global-error-handling-in-aspnetcore-from-middleware-to-modern-handlers", // 2025-07-12
    "using-dotnet-aspire-with-the-docker-publisher", // 2025-07-05
    "testcontainers-best-practices-dotnet-integration-testing", // 2025-06-28
    "monitoring-dotnet-applications-with-opentelemetry-and-grafana", // 2025-06-21
    "run-csharp-scripts-with-dotnet-run-app-no-project-files-neede", // 2025-06-14
    "debunking-the-filter-early-join-later-sql-performance-myth", // 2025-06-07
    "yarp-vs-nginx-a-quick-performance-comparison", // 2025-05-31
    "building-a-custom-domain-events-dispatcher-in-dotnet", // 2025-05-24
    "cqrs-pattern-the-way-it-should-have-been-from-the-start", // 2025-05-17
    "from-anemic-models-to-behavior-driven-models-a-practical-ddd-refactor-in-csharp", // 2025-05-10
    "event-driven-architecture-in-dotnet-with-rabbitmq", // 2025-05-03
    "refactoring-overgrown-bounded-contexts-in-modular-monoliths", // 2025-04-26
    "understanding-microservices-core-concepts-and-benefits", // 2025-04-19
    "what-is-vector-search-a-concise-guide", // 2025-04-12
    "mediatr-and-masstransit-going-commercial-what-this-means-for-you", // 2025-04-05
    "how-dotnet-aspire-simplifies-service-discovery", // 2025-03-29
    "options-pattern-validation-in-aspnetcore-with-fluentvalidation", // 2025-03-22
    "streamlining-dotnet-9-deployment-with-github-actions-and-azure", // 2025-03-15
    "better-request-tracing-with-user-context-in-asp-net-core", // 2025-03-08
    "introduction-to-dapr-for-dotnet-developers", // 2025-03-01
    "building-a-better-mediatr-publisher-with-channels-and-why-you-shouldnt", // 2025-02-22
    "understanding-cursor-pagination-and-why-its-so-fast-deep-dive", // 2025-02-15
    "stop-conflating-cqrs-and-mediatr", // 2025-02-08
    "overriding-default-http-resilience-handlers-in-dotnet", // 2025-02-01
    "implementing-aes-encryption-with-csharp", // 2025-01-25
    "scaling-monoliths-a-practical-guide-for-growing-systems", // 2025-01-18
    "working-with-llms-in-dotnet-using-microsoft-extensions-ai", // 2025-01-11
    "unit-testing-clean-architecture-use-cases", // 2025-01-04
  ]
}

const Y2024: SidebarYeargroupTemplate = { 
  text: '2024',
  collapsible: true,
  children: [
    // END: 2024
    "what-rewriting-a-40-year-old-project-taught-me-about-software-development", // 2024-12-28
    "scheduling-background-jobs-with-quartz-in-dotnet-advanced-concepts", // 2024-12-21
    "internal-vs-public-apis-in-modular-monoliths", // 2024-12-14
    "central-package-management-in-net-simplify-nuget-dependencies", // 2024-12-07
    "implementing-the-saga-pattern-with-masstransit", // 2024-11-30
    "building-async-apis-in-aspnetcore-the-right-way", // 2024-11-23
    "hybrid-cache-in-aspnetcore-new-caching-library", // 2024-11-16
    "functional-programming-in-csharp-the-practical-parts", // 2024-11-09
    "clean-architecture-the-missing-chapter", // 2024-11-02
    "implementing-idempotent-rest-apis-in-aspnetcore", // 2024-10-26
    "problem-details-for-aspnetcore-apis", // 2024-10-19
    "scaling-the-outbox-pattern", // 2024-10-12
    "implementing-the-outbox-pattern", // 2024-10-05
    "breaking-it-down-how-to-migrate-your-modular-monolith-to-microservices", // 2024-09-28
    "how-i-implemented-full-text-search-on-my-website", // 2024-09-21
    "dotnet-aspire-a-game-changer-for-cloud-native-development", // 2024-09-14
    "refit-in-dotnet-building-robust-api-clients-in-csharp", // 2024-09-07
    "introduction-to-event-sourcing-for-net-developers", // 2024-08-31
    "screaming-architecture", // 2024-08-24
    "complete-guide-to-amazon-sqs-and-amazon-sns-with-masstransit", // 2024-08-17
    "5-ef-core-features-you-need-to-know", // 2024-08-10
    "improving-code-quality-in-csharp-with-static-code-analysis", // 2024-08-03
    "simple-messaging-in-dotnet-with-redis-pubsub", // 2024-07-27
    "testing-modular-monoliths-system-integration-testing", // 2024-07-20
    "building-your-first-use-case-with-clean-architecture", // 2024-07-13
    "service-discovery-in-microservices-with-net-and-consul", // 2024-07-06
    "flexible-pdf-reporting-in-net-using-razor-views", // 2024-06-29
    "what-you-need-to-know-about-ef-core-bulk-updates", // 2024-06-22
    "from-transaction-scripts-to-domain-models-a-refactoring-journey", // 2024-06-15
    "caching-in-aspnetcore-improving-application-performance", // 2024-06-08
    "vertical-slice-architecture-structuring-vertical-slices", // 2024-06-01
    "shift-left-with-architecture-testing-in-dotnet", // 2024-05-25
    "efcore-migrations-a-detailed-guide", // 2024-05-18
    "building-resilient-cloud-applications-with-dotnet", // 2024-05-11
    "implementing-api-gateway-authentication-with-yarp", // 2024-05-04
    "request-response-messaging-pattern-with-masstransit", // 2024-04-27
    "introduction-to-distributed-tracing-with-opentelemetry-in-dotnet", // 2024-04-20
    "a-clever-way-to-implement-pessimistic-locking-in-ef-core", // 2024-04-13
    "master-claims-transformation-for-flexible-aspnetcore-authorization", // 2024-04-06
    "horizontally-scaling-aspnetcore-apis-with-yarp-load-balancing", // 2024-03-30
    "fast-sql-bulk-inserts-with-csharp-and-ef-core", // 2024-03-23
    "implementing-soft-delete-with-ef-core", // 2024-03-16
    "what-is-a-modular-monolith", // 2024-03-09
    "lightweight-in-memory-message-bus-using-dotnet-channels", // 2024-03-02
    "automatically-register-minimal-apis-in-aspnetcore", // 2024-02-24
    "using-scoped-services-from-singletons-in-aspnetcore", // 2024-02-17
    "getting-the-current-user-in-clean-architecture", // 2024-02-10
    "how-i-made-my-efcore-query-faster-with-batching", // 2024-02-03
    "how-to-build-a-url-shortener-with-dotnet", // 2024-01-27
    "balancing-cross-cutting-concerns-in-clean-architecture", // 2024-01-20
    "extending-httpclient-with-delegating-handlers-in-aspnetcore", // 2024-01-13
    "using-masstransit-with-rabbitmq-and-azure-service-bus", // 2024-01-06
  ]
}

const Y2023: SidebarYeargroupTemplate = { 
  text: '2023',
  collapsible: true,
  children: [
    // END: 2023
    "api-versioning-in-aspnetcore", // 2023-12-30
    "value-objects-in-dotnet-ddd-fundamentals", // 2023-12-23
    "5-serilog-best-practices-for-better-structured-logging", // 2023-12-16
    "modular-monolith-data-isolation", // 2023-12-09
    "global-error-handling-in-aspnetcore-8", // 2023-12-02
    "5-awesome-csharp-refactoring-tips", // 2023-11-25
    "how-to-use-ef-core-interceptors", // 2023-11-18
    "how-to-easily-create-pdf-documents-in-aspnetcore", // 2023-11-11
    "vertical-slice-architecture", // 2023-11-04
    "functional-error-handling-in-dotnet-with-the-result-pattern", // 2023-10-28
    "cqrs-pattern-with-mediatr", // 2023-10-21
    "improving-aspnetcore-dependency-injection-with-scrutor", // 2023-10-14
    "getting-started-with-nservicebus-in-dotnet", // 2023-10-07
    "cqrs-validation-with-mediatr-pipeline-and-fluentvalidation", // 2023-09-30
    "monolith-to-microservices-how-a-modular-monolith-helps", // 2023-09-23
    "feature-flags-in-dotnet-and-how-i-use-them-for-ab-testing", // 2023-09-16
    "solving-race-conditions-with-ef-core-optimistic-locking", // 2023-09-09
    "testcontainers-integration-testing-using-docker-in-dotnet", // 2023-09-02
    "orchestration-vs-choreography", // 2023-08-26
    "advanced-rate-limiting-use-cases-in-dotnet", // 2023-08-19
    "mastering-dapper-relationship-mappings", // 2023-08-12
    "modular-monolith-communication-patterns", // 2023-08-05
    "why-clean-architecture-is-great-for-complex-projects", // 2023-07-29
    "how-to-use-domain-events-to-build-loosely-coupled-systems", // 2023-07-22
    "8-tips-to-write-clean-code", // 2023-07-15
    "implementing-an-api-gateway-for-microservices-with-yarp", // 2023-07-08
    "response-compression-in-aspnetcore", // 2023-07-01
    "adding-real-time-functionality-to-dotnet-applications-with-signalr", // 2023-06-24
    "refactoring-from-an-anemic-domain-model-to-a-rich-domain-model", // 2023-06-17
    "the-right-way-to-use-httpclient-in-dotnet", // 2023-06-10
    "scheduling-background-jobs-with-quartz-net", // 2023-06-03
    "how-to-build-ci-cd-pipeline-with-github-actions-and-dotnet", // 2023-05-27
    "multi-tenant-applications-with-ef-core", // 2023-05-20
    "visualize-your-software-architecture-with-the-c4-model", // 2023-05-13
    "enforcing-software-architecture-with-architecture-tests", // 2023-05-06
    "health-checks-in-asp-net-core", // 2023-04-29
    "idempotent-consumer-handling-duplicate-messages", // 2023-04-22
    "ef-core-raw-sql-queries", // 2023-04-15
    "how-to-use-rate-limiting-in-aspnet-core", // 2023-04-08
    "implementing-the-saga-pattern-with-rebus-and-rabbitmq", // 2023-04-01
    "how-to-publish-mediatr-notifications-in-parallel", // 2023-03-25
    "creating-data-driven-tests-with-xunit", // 2023-03-18
    "using-multiple-ef-core-dbcontext-in-single-application", // 2023-03-11
    "how-to-apply-functional-programming-in-csharp", // 2023-03-04
    "outbox-pattern-for-reliable-microservices-messaging", // 2023-02-25
    "structured-logging-in-asp-net-core-with-serilog", // 2023-02-18
    "messaging-made-easy-with-azure-service-bus", // 2023-02-11
    "working-with-transactions-in-ef-core", // 2023-02-04
    "how-to-implement-api-key-authentication-in-aspnet-core", // 2023-01-28
    "csharp-yield-return-statement", // 2023-01-21
    "unleash-ef-core-performance-with-compiled-queries", // 2023-01-14
    "adding-validation-to-the-options-pattern-in-asp-net-core", // 2023-01-07
  ]
}

const Y2022: SidebarYeargroupTemplate = { 
  text: '2022',
  collapsible: true,
  children: [
    // END: 2022
    "how-to-be-a-better-software-engineer-in-2023", // 2022-12-31
    "clean-architecture-and-the-benefits-of-structured-software-design", // 2022-12-24
    "fast-document-database-in-net-with-marten", // 2022-12-17
    "how-to-structure-minimal-apis", // 2022-12-10
    "running-background-tasks-in-asp-net-core", // 2022-12-03,
    "how-to-use-the-new-bulk-update-feature-in-ef-core-7", // 2022-11-26
    "how-to-use-the-options-pattern-in-asp-net-core-7", // 2022-11-19
    "whats-new-in-dotnet-7", // 2022-11-12
    "5-ways-to-check-for-duplicates-in-collections", // 2022-11-05,
    "how-to-use-global-query-filters-in-ef-core", // 2022-10-29
    "introduction-to-locking-and-concurrency-control-in-dotnet-6", // 2022-10-22
    "how-i-optimized-an-api-endpoint-to-make-it-15x-faster", // 2022-10-15
    "decorator-pattern-in-asp-net-core", // 2022-10-08
    "3-ways-to-create-middleware-in-asp-net-core", // 2022-10-01
    "clean-architecture-folder-structure", // 2022-09-24
    "how-to-improve-performance-with-ef-core-query-splitting", // 2022-09-17
    "records-anonymous-types-non-destructive-mutation", // 2022-09-10
    "why-i-write-tall-linq-queries", // 2022-09-03
  ]
}

export const template: SidebarInfoTemplate = {
  name: 'milanjovanovic.tech',
  faviconPath: 'https://milanjovanovic.tech/profile_favicon.png',
  linksMap: new Map([
    [
    "pwsh", [
      "central-package-management-in-net-simplify-nuget-dependencies", // 2024-12-07
      // END: pwsh
    ]],[
    "cs", [
      "why-i-write-tall-linq-queries", // 2022-09-03
      "records-anonymous-types-non-destructive-mutation", // 2022-09-10
      "how-to-improve-performance-with-ef-core-query-splitting", // 2022-09-17
      "3-ways-to-create-middleware-in-asp-net-core", // 2022-10-01
      "decorator-pattern-in-asp-net-core", // 2022-10-08
      "how-i-optimized-an-api-endpoint-to-make-it-15x-faster", // 2022-10-15
      "introduction-to-locking-and-concurrency-control-in-dotnet-6", // 2022-10-22
      "how-to-use-global-query-filters-in-ef-core", // 2022-10-29
      "5-ways-to-check-for-duplicates-in-collections", // 2022-11-05,
      "whats-new-in-dotnet-7", // 2022-11-12
      "how-to-use-the-options-pattern-in-asp-net-core-7", // 2022-11-19
      "how-to-use-the-new-bulk-update-feature-in-ef-core-7", // 2022-11-26
      "running-background-tasks-in-asp-net-core", // 2022-12-03,
      "how-to-structure-minimal-apis", // 2022-12-10
      "fast-document-database-in-net-with-marten", // 2022-12-17
      "clean-architecture-and-the-benefits-of-structured-software-design", // 2022-12-24
      "adding-validation-to-the-options-pattern-in-asp-net-core", // 2023-01-07
      "unleash-ef-core-performance-with-compiled-queries", // 2023-01-14
      "csharp-yield-return-statement", // 2023-01-21
      "how-to-implement-api-key-authentication-in-aspnet-core", // 2023-01-28
      "working-with-transactions-in-ef-core", // 2023-02-04
      "messaging-made-easy-with-azure-service-bus", // 2023-02-11
      "structured-logging-in-asp-net-core-with-serilog", // 2023-02-18
      "outbox-pattern-for-reliable-microservices-messaging", // 2023-02-25
      "how-to-apply-functional-programming-in-csharp", // 2023-03-04
      "using-multiple-ef-core-dbcontext-in-single-application", // 2023-03-11
      "creating-data-driven-tests-with-xunit", // 2023-03-18
      "how-to-publish-mediatr-notifications-in-parallel", // 2023-03-25
      "implementing-the-saga-pattern-with-rebus-and-rabbitmq", // 2023-04-01
      "how-to-use-rate-limiting-in-aspnet-core", // 2023-04-08
      "ef-core-raw-sql-queries", // 2023-04-15
      "idempotent-consumer-handling-duplicate-messages", // 2023-04-22
      "health-checks-in-asp-net-core", // 2023-04-29
      "enforcing-software-architecture-with-architecture-tests", // 2023-05-06
      "multi-tenant-applications-with-ef-core", // 2023-05-20
      "scheduling-background-jobs-with-quartz-net", // 2023-06-03
      "the-right-way-to-use-httpclient-in-dotnet", // 2023-06-10
      "refactoring-from-an-anemic-domain-model-to-a-rich-domain-model", // 2023-06-17
      "adding-real-time-functionality-to-dotnet-applications-with-signalr", // 2023-06-24
      "response-compression-in-aspnetcore", // 2023-07-01
      "implementing-an-api-gateway-for-microservices-with-yarp", // 2023-07-08
      "8-tips-to-write-clean-code", // 2023-07-15
      "how-to-use-domain-events-to-build-loosely-coupled-systems", // 2023-07-22
      "mastering-dapper-relationship-mappings", // 2023-08-12
      "advanced-rate-limiting-use-cases-in-dotnet", // 2023-08-19
      "testcontainers-integration-testing-using-docker-in-dotnet", // 2023-09-02
      "solving-race-conditions-with-ef-core-optimistic-locking", // 2023-09-09
      "feature-flags-in-dotnet-and-how-i-use-them-for-ab-testing", // 2023-09-16
      "monolith-to-microservices-how-a-modular-monolith-helps", // 2023-09-23
      "cqrs-validation-with-mediatr-pipeline-and-fluentvalidation", // 2023-09-30
      "getting-started-with-nservicebus-in-dotnet", // 2023-10-07
      "improving-aspnetcore-dependency-injection-with-scrutor", // 2023-10-14
      "cqrs-pattern-with-mediatr", // 2023-10-21
      "functional-error-handling-in-dotnet-with-the-result-pattern", // 2023-10-28
      "vertical-slice-architecture", // 2023-11-04
      "how-to-easily-create-pdf-documents-in-aspnetcore", // 2023-11-11
      "how-to-use-ef-core-interceptors", // 2023-11-18
      "5-awesome-csharp-refactoring-tips", // 2023-11-25  
      "global-error-handling-in-aspnetcore-8", // 2023-12-02
      "modular-monolith-data-isolation", // 2023-12-09
      "5-serilog-best-practices-for-better-structured-logging", // 2023-12-16
      "value-objects-in-dotnet-ddd-fundamentals", // 2023-12-23
      "api-versioning-in-aspnetcore", // 2023-12-30
      "using-masstransit-with-rabbitmq-and-azure-service-bus", // 2024-01-06
      "extending-httpclient-with-delegating-handlers-in-aspnetcore", // 2024-01-13
      "balancing-cross-cutting-concerns-in-clean-architecture", // 2024-01-20
      "how-to-build-a-url-shortener-with-dotnet", // 2024-01-27
      "how-i-made-my-efcore-query-faster-with-batching", // 2024-02-03
      "getting-the-current-user-in-clean-architecture", // 2024-02-10
      "using-scoped-services-from-singletons-in-aspnetcore", // 2024-02-17
      "automatically-register-minimal-apis-in-aspnetcore", // 2024-02-24
      "lightweight-in-memory-message-bus-using-dotnet-channels", // 2024-03-02
      "implementing-soft-delete-with-ef-core", // 2024-03-16
      "fast-sql-bulk-inserts-with-csharp-and-ef-core", // 2024-03-23
      "horizontally-scaling-aspnetcore-apis-with-yarp-load-balancing", // 2024-03-30
      "master-claims-transformation-for-flexible-aspnetcore-authorization", // 2024-04-06
      "a-clever-way-to-implement-pessimistic-locking-in-ef-core", // 2024-04-13
      "introduction-to-distributed-tracing-with-opentelemetry-in-dotnet", // 2024-04-20
      "request-response-messaging-pattern-with-masstransit", // 2024-04-27
      "implementing-api-gateway-authentication-with-yarp", // 2024-05-04
      "building-resilient-cloud-applications-with-dotnet", // 2024-05-11
      "efcore-migrations-a-detailed-guide", // 2024-05-18
      "shift-left-with-architecture-testing-in-dotnet", // 2024-05-25
      "vertical-slice-architecture-structuring-vertical-slices", // 2024-06-01
      "caching-in-aspnetcore-improving-application-performance", // 2024-06-08
      "from-transaction-scripts-to-domain-models-a-refactoring-journey", // 2024-06-15
      "what-you-need-to-know-about-ef-core-bulk-updates", // 2024-06-22
      "service-discovery-in-microservices-with-net-and-consul", // 2024-07-06
      "building-your-first-use-case-with-clean-architecture", // 2024-07-13
      "testing-modular-monoliths-system-integration-testing", // 2024-07-20
      "simple-messaging-in-dotnet-with-redis-pubsub", // 2024-07-27
      "improving-code-quality-in-csharp-with-static-code-analysis", // 2024-08-03
      "5-ef-core-features-you-need-to-know", // 2024-08-10
      "complete-guide-to-amazon-sqs-and-amazon-sns-with-masstransit", // 2024-08-17
      "introduction-to-event-sourcing-for-net-developers", // 2024-08-31
      "refit-in-dotnet-building-robust-api-clients-in-csharp", // 2024-09-07
      "dotnet-aspire-a-game-changer-for-cloud-native-development", // 2024-09-14
      "breaking-it-down-how-to-migrate-your-modular-monolith-to-microservices", // 2024-09-28
      "implementing-the-outbox-pattern", // 2024-10-05
      "scaling-the-outbox-pattern", // 2024-10-12
      "problem-details-for-aspnetcore-apis", // 2024-10-19
      "implementing-idempotent-rest-apis-in-aspnetcore", // 2024-10-26
      "clean-architecture-the-missing-chapter", // 2024-11-02
      "functional-programming-in-csharp-the-practical-parts", // 2024-11-09
      "hybrid-cache-in-aspnetcore-new-caching-library", // 2024-11-16
      "building-async-apis-in-aspnetcore-the-right-way", // 2024-11-23
      "implementing-the-saga-pattern-with-masstransit", // 2024-11-30
      "internal-vs-public-apis-in-modular-monoliths", // 2024-12-14
      "scheduling-background-jobs-with-quartz-in-dotnet-advanced-concepts", // 2024-12-21
      // END: 2024cs
      "unit-testing-clean-architecture-use-cases", // 2025-01-04
      "working-with-llms-in-dotnet-using-microsoft-extensions-ai", // 2025-01-11
      "implementing-aes-encryption-with-csharp", // 2025-01-25
      "overriding-default-http-resilience-handlers-in-dotnet", // 2025-02-01
      "stop-conflating-cqrs-and-mediatr", // 2025-02-08
      "understanding-cursor-pagination-and-why-its-so-fast-deep-dive", // 2025-02-15
      "building-a-better-mediatr-publisher-with-channels-and-why-you-shouldnt", // 2025-02-22
      "introduction-to-dapr-for-dotnet-developers", // 2025-03-01
      "better-request-tracing-with-user-context-in-asp-net-core", // 2025-03-08
      "options-pattern-validation-in-aspnetcore-with-fluentvalidation", // 2025-03-22
      "how-dotnet-aspire-simplifies-service-discovery", // 2025-03-29
      "mediatr-and-masstransit-going-commercial-what-this-means-for-you", // 2025-04-05
      "refactoring-overgrown-bounded-contexts-in-modular-monoliths", // 2025-04-26
      "event-driven-architecture-in-dotnet-with-rabbitmq", // 2025-05-03
      "from-anemic-models-to-behavior-driven-models-a-practical-ddd-refactor-in-csharp", // 2025-05-10
      "cqrs-pattern-the-way-it-should-have-been-from-the-start", // 2025-05-17
      "building-a-custom-domain-events-dispatcher-in-dotnet", // 2025-05-24
      "yarp-vs-nginx-a-quick-performance-comparison", // 2025-05-31
      "run-csharp-scripts-with-dotnet-run-app-no-project-files-neede", // 2025-06-14
      "monitoring-dotnet-applications-with-opentelemetry-and-grafana", // 2025-06-21
      "testcontainers-best-practices-dotnet-integration-testing", // 2025-06-28
      "using-dotnet-aspire-with-the-docker-publisher", // 2025-07-05
      "global-error-handling-in-aspnetcore-from-middleware-to-modern-handlers", // 2025-07-12
      "how-to-keep-your-data-boundaries-intact-in-a-modular-monolith", // 2025-08-02
      "building-generative-ai-applications-with-github-models-and-dotnet-aspire", // 2025-08-16
      "the-real-cost-of-abstractions-in-dotnet", // 2025-08-23
      "standalone-aspire-dashboard-setup-for-distributed-dotnet-applications", // 2025-08-30
      // END: 2025cs
      // END: cs
    ]],[
    "cs-razor", [
      "flexible-pdf-reporting-in-net-using-razor-views", // 2024-06-29
      // END: 2024cs-razor
      // END: cs-razor
    ]],[
    "js-node", [
      "horizontally-scaling-aspnetcore-apis-with-yarp-load-balancing", // 2024-03-30
      "how-i-implemented-full-text-search-on-my-website", // 2024-09-21
      // END: 2024js-node
      "yarp-vs-nginx-a-quick-performance-comparison", // 2025-05-31
      // END: 2025js-node
      // END: js-node
    ]],[
    "go-grafana", [
      "monitoring-dotnet-applications-with-opentelemetry-and-grafana", // 2025-06-21
      // END: 2025go-grafana
      // END: go-grafana
    ]],[
    "go-prometheus", [
      "standalone-aspire-dashboard-setup-for-distributed-dotnet-applications", // 2025-08-30
      // END: 2025go-prometheus
      // END: go-prometheus
    ]],[
    "erl-rabbitmq", [
      "implementing-the-saga-pattern-with-rebus-and-rabbitmq", // 202404-01
      // END: 2024erl-rabbitmq
      "event-driven-architecture-in-dotnet-with-rabbitmq", // 2025-05-03
      // END: 2025erl-rabbitmq
      // END: erl-rabbitmq
    ]],[
    "docker", [
      "horizontally-scaling-aspnetcore-apis-with-yarp-load-balancing", // 2024-03-30
      "simple-messaging-in-dotnet-with-redis-pubsub", // 2024-07-27
      "dotnet-aspire-a-game-changer-for-cloud-native-development", // 2024-09-14
      // END: 2024docker
      "yarp-vs-nginx-a-quick-performance-comparison", // 2025-05-31
      "testcontainers-best-practices-dotnet-integration-testing", // 2025-06-28
      "using-dotnet-aspire-with-the-docker-publisher", // 2025-07-05
      "standalone-aspire-dashboard-setup-for-distributed-dotnet-applications", // 2025-08-30
      // END: 2025docker
      // END: docker
    ]],[
    "github", [
      "how-to-build-ci-cd-pipeline-with-github-actions-and-dotnet", // 2023-05-27
      "testcontainers-integration-testing-using-docker-in-dotnet", // 2023-09-02
      // END: 2023github
      "streamlining-dotnet-9-deployment-with-github-actions-and-azure", // 2025-03-15
      "building-generative-ai-applications-with-github-models-and-dotnet-aspire", // 2025-08-16
      // END: 2025github
      // END: github
    ]],[
    "aws", [
      "complete-guide-to-amazon-sqs-and-amazon-sns-with-masstransit", // 2024-08-17
      // END: 2024aws
      // END: aws
    ]],[
    "azure", [
      "messaging-made-easy-with-azure-service-bus", // 2023-02-11
      // END: 2023azure
      // END: 2024azure
      "streamlining-dotnet-9-deployment-with-github-actions-and-azure", // 2025-03-15
      // END: 2025azure
      // END: azure
    ]],[
    "nginx", [
      "yarp-vs-nginx-a-quick-performance-comparison", // 2025-05-31
      // END: 2025nginx
      // END: nginx
    ]],[
    "data-science", [
      "debunking-the-filter-early-join-later-sql-performance-myth", // 2025-06-07
      // END: 2025data-science
      // END: data-science
    ]],[
    "postgres", [
      "hybrid-cache-in-aspnetcore-new-caching-library", // 2024-11-16
      // END: 2024postgres
      "understanding-cursor-pagination-and-why-its-so-fast-deep-dive", // 2025-02-15
      "how-to-keep-your-data-boundaries-intact-in-a-modular-monolith", // 2025-08-02
      // END: 2025postgres
      // END: postgres
    ]],[
    "redis", [
      "caching-in-aspnetcore-improving-application-performance", // 2024-06-08
      "simple-messaging-in-dotnet-with-redis-pubsub", // 2024-07-27
      // END: 2024redis
      // END: redis
    ]],[
    "nginx", [
      "yarp-vs-nginx-a-quick-performance-comparison", // 2025-05-31
      // END: 2025nginx
      // END: nginx
    ]],[
    "system-design", [
      "clean-architecture-folder-structure", // 2022-09-24
      "visualize-your-software-architecture-with-the-c4-model", // 2023-05-13
      "why-clean-architecture-is-great-for-complex-projects", // 2023-07-29
      "modular-monolith-communication-patterns", // 2023-08-05
      "orchestration-vs-choreography", // 2023-08-26
      "what-is-a-modular-monolith", // 2024-03-09
      "screaming-architecture", // 2024-08-24
      "clean-architecture-the-missing-chapter", // 2024-11-02
      "internal-vs-public-apis-in-modular-monoliths", // 2024-12-14
      // END: 2024system-design
      "scaling-monoliths-a-practical-guide-for-growing-systems", // 2025-01-18
      "understanding-microservices-core-concepts-and-benefits", // 2025-04-19
      "refactoring-overgrown-bounded-contexts-in-modular-monoliths", // 2025-04-26
      "how-to-keep-your-data-boundaries-intact-in-a-modular-monolith", // 2025-08-02
      "the-5-most-common-rest-api-design-mistakes-and-how-to-avoid-them", // 2025-08-08
      // END: 2025system-design
      // END: system-design
    ]],[
    "career", [
      "how-to-be-a-better-software-engineer-in-2023", // 2022-12-31
      "what-rewriting-a-40-year-old-project-taught-me-about-software-development", // 2024-12-28
    ]],[
    "llama", [
      "what-is-vector-search-a-concise-guide", // 2025-04-12
      // END: 2025llm
      // END: llm
    ]],[
    "llama", [
      "working-with-llms-in-dotnet-using-microsoft-extensions-ai", // 2025-01-11
      // END: 2025llama
      // END: llama
    ]],[
    "all", [
      Y2025,
      Y2024,
      Y2023,
      Y2022,
    ]]
  ])
};