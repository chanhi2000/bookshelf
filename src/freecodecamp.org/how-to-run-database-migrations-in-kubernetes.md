---
lang: en-US
title: "How to Run Database Migrations in Kubernetes - Different Approaches with Examples"
description: "Article(s) > How to Run Database Migrations in Kubernetes - Different Approaches with Examples"
icon: fa-brands fa-golang
category:
  - Go
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - go
  - golang
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run Database Migrations in Kubernetes - Different Approaches with Examples"
    - property: og:description
      content: "How to Run Database Migrations in Kubernetes - Different Approaches with Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-database-migrations-in-kubernetes.html
prev: /programming/go/articles/README.md
date: 2024-10-03
isOriginal: false
author: Alex Pliutau
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727685813983/f4672022-9a38-49c9-a252-96f40181fac1.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Run Database Migrations in Kubernetes - Different Approaches with Examples"
  desc="In the era of Microservices and Kubernetes, managing database migrations has become more complex than ever. Traditional methods of running migrations during application startup are no longer sufficient. This article explores various approaches to han..."
  url="https://freecodecamp.org/news/how-to-run-database-migrations-in-kubernetes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727685813983/f4672022-9a38-49c9-a252-96f40181fac1.jpeg"/>

In the era of Microservices and Kubernetes, managing database migrations has become more complex than ever. Traditional methods of running migrations during application startup are no longer sufficient.

This article explores various approaches to handling database migrations in a Kubernetes environment, with a focus on Go tooling. You'll get the most out of this article if you already have some experience with Go, Kubernetes, and relational databases.

---

## The Challenge of Migrations in Kubernetes

Kubernetes introduces new challenges for database migrations:

- Multiple replicas starting simultaneously. These can span the same migration twice which may introduce some database locks.
- Separation of concerns between application and migration logic. This means it’s good to be able to run or rollback migrations without redeploying your application.

---

## Popular Migration Tools for Golang

As I mentioned in another [<FontIcon icon="fas fa-globe"/>post](https://packagemain.tech/i/149097592/database-migrations), there are a few different tools you can use to manage your migrations. They are quite similar, so I personally don’t have a strong preference between once or another. I just wanted to provide a few options so you know what the popular tools are.

### 1. [<FontIcon icon="iconfont icon-github"/>`golang-migrate/nigrate`](https://github.com/golang-migrate/migrate)

<SiteInfo
  name="golang-migrate/migrate"
  desc="Database migrations. CLI and Golang library."
  url="https://github.com/golang-migrate/migrate"
  logo="https://avatars.githubusercontent.com/u/35595841?s=88&v=4"
  preview="https://opengraph.githubassets.com/1f35d2451b1c5abfa1f8eb4826ff658d5da9cad0be1585ebbf4f6e7be7c95011/golang-migrate/migrate"/>

- Widely used and supports numerous databases.
- Simple CLI and API.
- Supports various migration sources (local files, S3, Google Storage).

### 2. [<FontIcon icon="iconfont icon-github"/>`pressly/goose`](https://github.com/pressly/goose)

<SiteInfo
  name="pressly/goose"
  desc="A database migration tool. Supports SQL migrations and Go functions."
  url="https://github.com/pressly/goose"
  logo="https://avatars.githubusercontent.com/u/18835?s=88&v=4"
  preview="https://repository-images.githubusercontent.com/52555254/91019174-ec6c-4690-be08-2cfbcb2a030b"/>

- Supports main SQL databases.
- Allows migrations written in Go for complex scenarios.
- Flexible versioning schemas.

### 3. [<FontIcon icon="fas fa-globe"/>atlas](https://atlasgo.io/)

<SiteInfo
  name="Atlas | Manage your database schema as code"
  desc="manage your database schema as code"
  url="https://atlasgo.io/"
  logo="https://atlasgo.io/favicon.ico"
  preview="https://og.atlasgo.io/image?title=Schema%20Migration%20Tool%20for%20any%20Language"/>

- Powerful database schema management tool.
- Supports declarative and versioned migrations.
- Offers integrity checks and migration linting.
- Provides GitHub Actions and Terraform provider.

---

## Run Migrations Inside the Application

A naïve implementation would be to run the code of the migration directly inside your main function before you start your server.

::: info Example using <code>golang-migrate</code>

```go
package main

import (
    "database/sql"
    "fmt"
    "log"
    "net/http"

    "github.com/golang-migrate/migrate/v4"
    "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/file"
    _ "github.com/lib/pq"
)

func main() {
    // Database connection parameters
    url := "postgres://user:pass@localhost:5432/dbname"

    // Connect to the database
    db, err := sql.Open("postgres", url)
    if err != nil {
        log.Fatalf("could not connect to database: %v", err)
    }
    defer db.Close()

    // Run migrations
    if err := runMigrations(db); err != nil {
        log.Fatalf("could not run migrations: %v", err)
    }

    // Run the application, for example start the server
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("server failed to start: %v", err)
    }
}

func runMigrations(db *sql.DB) error {
    driver, err := postgres.WithInstance(db, &postgres.Config{})
    if err != nil {
        return fmt.Errorf("could not create database driver: %w", err)
    }

    m, err := migrate.NewWithDatabaseInstance(
        "file://migrations", // Path to your migration files
        "postgres",          // Database type
        driver,
    )
    if err != nil {
        return fmt.Errorf("could not create migrate instance: %w", err)
    }

    if err := m.Up(); err != nil && err != migrate.ErrNoChange {
        return fmt.Errorf("could not run migrations: %w", err)
    }

    log.Println("migrations completed successfully")
    return nil
}
```

:::

However, these could cause different issues like your migrations being slow and Kubernetes considering that the pod didn’t start successfully and therefore killing it. You could run those migrations in a Go routine, but how do you handle failures then?

In cases when multiple pods are created at the same time, you would have a potential concurrency problem.

It also means your migrations need to be inside your Docker image.

Even with its downsides, this approach might work well for quick and stable database changes and small projects.

---

## Run Migrations in initContainers

By using [<FontIcon icon="iconfont icon-k8s"/>initContainers](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) in your Kubernetes Deployment, it will run the migration before the main application container starts. This is a good first solution for when scaling is not a problem yet.

If the initContainer fails, the blue/green deployment from Kubernetes won’t go further and your previous pods stay where they are. This prevents having a newer version of the code without the planned migration.

::: info Example

```yml
    initContainers:
      - name: migrations
        image: migrate/migrate:latest
        command: ['/migrate']
        args: ['-source', 'file:///migrations', '-database','postgres://user:pass@db:5432/dbname', 'up']
```

:::

This approach might work well for quick and stable database changes for deployments with a single Pod. And it already separates the application and migration layers.

---

## Run Migrations as a Kubernetes Job

You could create a [<FontIcon icon="iconfont icon-k8s"/>Kubernetes Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) that runs your migrations, and trigger that job during the deployment process before rolling out the application.

::: info Example

```yml
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migrate
spec:
  template:
    spec:
      containers:
      - name: migrate
        image: your-migration-image:latest
        command: ['/app/migrate']
```

You can also combine it with initContainers, making sure that the pod starts only when the job is successful.

```yml
initContainers:
  - name: migrations-wait
    image: ghcr.io/groundnuty/k8s-wait-for:v2.0
    args:
      - "job"
      - "my-migration-job"
```

:::

This approach can solve the problems related to multiple replicas mentioned above.

---

## Helm Hooks

If you use Helm, it has [<FontIcon icon="iconfont icon-k8s"/>hooks](https://helm.sh/docs/topics/charts_hooks/) that you can use for running migrations during chart installation/upgrade. You just define a pre-install or pre-upgrade hook in your Helm chart.

> <FontIcon icon="iconfont icon-yaml"/>`pre-install-hook.yaml`

```yml
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ include "mychart.fullname" . }}-migrations
  annotations:
    "helm.sh/hook": pre-install,pre-upgrade
    "helm.sh/hook-weight": "-5"
    "helm.sh/hook-delete-policy": hook-succeeded
spec:
  template:
    spec:
      containers:
        - name: migrations
          image: your-migrations-image:tag
          command: ["./run-migrations.sh"]
```

In this example, the pre-install hook executes after templates are rendered, but before any resources are created in Kubernetes.

This of course works only when you use Helm, meaning you need to find something else if you decide not to use Helm.

---

## Best Practices for Kubernetes Migrations

### Decouple migrations from application code

1. Create a separate Docker image for migrations. This ensures that migration logic is encapsulated and doesn't interfere with the application codebase.
2. Use tools like Atlas to manage migrations independently. Tools like Atlas provide features for automating migration processes, scheduling, and rollback.

### Use version control for migrations

1. Store migration files in your Git repository. This ensures a complete history of migration changes, making it easier to track and revert changes.
2. Use sequential or timestamp-based versioning. Sequential versioning guarantees the correct order of migrations which is very important for relational databases.

### Ensure idempotent migrations

1. Ensure migrations can be run multiple times without side effects. Idempotent migrations prevent accidental data corruption or inconsistencies if a migration is run multiple times.

### Have a rollback strategy

1. Implement and test rollback procedures for each migration. Having a rollback strategy ensures that you can revert changes if a migration fails or causes unexpected issues.

### Perform monitoring and logging

1. Use tools like Atlas Cloud for visibility into migration history. Atlas Cloud provides detailed logs and history of migrations, making it easy to track changes and troubleshoot issues.

---

## Conclusion

Managing database migrations in a Kubernetes environment requires careful planning and execution.

By leveraging tools like golang-migrate, goose, or atlas, and following best practices, you can create robust, scalable, and maintainable migration strategies.

Remember to decouple migrations from application code, use version control, and implement proper monitoring to ensure smooth database evolution in your Kubernetes-based architecture.

### Resources

- [Discover more articles from packagemain.tech](https://packagemain.tech/p/database-migrations-in-kubernetes)
- [Helm Hooks](https://helm.sh/docs/topics/charts_hooks/)

<!-- TODO: SiteInfo 생성 -->