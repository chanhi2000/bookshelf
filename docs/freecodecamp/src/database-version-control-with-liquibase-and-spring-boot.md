---
lang: en-US
title: "Database Version Control with Liquibase and Spring Boot"
description: "Article(s) > Database Version Control with Liquibase and Spring Boot"
icon: iconfont icon-spring
category:
  - Java
  - Spring
  - Liquidbase
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - spring
  - java-spring
  - springframework
  - liquidbase
  - java-liquidbase
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Database Version Control with Liquibase and Spring Boot"
    - property: og:description
      content: "Database Version Control with Liquibase and Spring Boot"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/database-version-control-with-liquibase-and-spring-boot.html
prev: /programming/java-spring/articles/README.md
date: 2026-06-09
isOriginal: false
author:
  - name: Ashutosh Krishna
    url: https://freecodecamp.org/news/author/ashutoshkrris/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dbadec79-8248-4ef4-aa9c-126250db7a64.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Liquidbase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-liquidbase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Database Version Control with Liquibase and Spring Boot"
  desc="Picture this familiar scenario: you're working on a new feature that requires a new database column. You open your local database client, write an ALTER TABLE statement, and execute it. Your code work"
  url="https://freecodecamp.org/news/database-version-control-with-liquibase-and-spring-boot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/dbadec79-8248-4ef4-aa9c-126250db7a64.png"/>

Picture this familiar scenario: you're working on a new feature that requires a new database column. You open your local database client, write an `ALTER TABLE` statement, and execute it. Your code works perfectly. You commit the Java code, push it to the repository, and go grab a coffee.

A few hours later, a teammate pulls your branch, runs the application, and everything crashes.

"Hey," they ask across the room (or in a Slack channel), "did you change the database?"

You quickly realize you forgot to share the SQL script. You paste it into the chat. They run it. Everything works. Then, a week later, the deployment to the staging environment fails for the exact same reason. By the time this code reaches production, everyone is asking a variation of the same terrified question: "Which SQL script should I run?"

This situation is called schema drift. It happens when the state of your database diverges across different environments. Staging has one schema, production has another, and every developer's local machine is a unique snowflake of untested database modifications.

Managing database changes manually is a recipe for deployment headaches and team collaboration challenges. Application code is stateless and easy to replace. Databases are stateful. Databases have surprisingly good memories, and they rarely forget a bad migration.

Liquibase solves this problem by bringing version-control discipline to your database changes. Instead of passing around SQL files and hoping people remember to run them, you define your database changes in code. These changes travel with your application repository and execute automatically.

Here is a high-level look at how this architecture works:

![Architecture diagram showing code flowing from a developer to a database via Git, Spring Boot, and Liquibase.](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/41202410-4d42-4343-98df-912420dbfb15.png)
<!-- TODO: mermaid화 -->

Think about the journey of a single database change. A developer commits their database migration alongside their Java code into Git. When the CI/CD pipeline (or a teammate) pulls that code, the Spring Boot application starts. But before the app fully boots up and accepts web traffic, Liquibase intercepts the process. It acts as a gatekeeper, connecting to the database and applying the required schema changes. This ensures the database exactly matches the code's expectations before a single user makes a request.

---

## Why Database Version Control Matters

If you've spent any time working on team-based applications, you've probably seen a folder structure that looks exactly like this:

```sh title="file structure"
project-sql-scripts/
├── create_employee_table.sql
├── create_employee_table_final.sql
├── create_employee_table_final_v2.sql
├── add_email_column.sql
├── latest.sql
└── definitely_latest_use_this_one.sql
```

The phrase "just run this SQL script manually" has launched many memorable incidents.

When you rely on manual database updates, you guarantee failure at scale. Onboarding a new developer becomes an archeological expedition to figure out how to build the local schema. Deployments become stressful events requiring a checklist of manual queries that must be run in a highly specific order.

Version-controlled database changes treat your schema as code. When your database changes live alongside your application logic, you gain several immediate benefits:

- **Consistency:** Every environment (local, staging, production) applies the exact same changes in the exact same order.
- **Safety:** You eliminate the human error of skipping a script or running an outdated query.
- **Visibility:** You can look at a Git commit and see exactly how the Java code and the database schema changed together to support a new feature.

Git solved version control for code. Liquibase helps prevent databases from becoming the rebellious sibling.

---

## What is Liquibase?

At its core, Liquibase is a database migration tool that tracks and applies schema changes in a predictable and repeatable way.

Instead of writing loose SQL scripts, you write "migrations" (also called changeSets). Liquibase reads these files, compares them against a tracking table inside your actual database, and figures out exactly what needs to be executed to bring the database up to date.

To use Liquibase effectively, you only need to understand a few conceptual terms:

- **changeLog:** The master file. This is essentially a list that tells Liquibase which migration files to execute and in what order.
- **changeSet:** A single, atomic change to your database. Creating a table is one changeSet. Adding a column is another.
- **Migration History:** A table Liquibase automatically creates in your database (called `DATABASECHANGELOG`) to remember which changeSets have already been executed.
- **Checksums:** A unique hash generated for every changeSet. Liquibase uses this to detect if someone secretly modified a file after it was already executed.

When you integrate Liquibase with Spring Boot, the migration process happens completely automatically during the application startup phase.

![Sequence diagram of Spring Boot startup where Liquibase checks the tracking table, locks the database, runs migrations, and releases the lock before allowing HTTP traffic.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/410e7bdb-da2f-4c48-a5b2-20a45fb20956.png)
<!-- TODO: mermaid화 -->

During startup, Liquibase takes control before your web server is allowed to receive HTTP traffic. It reaches into the database and checks the tracking table to see which migrations have already run. If it finds new migrations in your local files, it locks the database to prevent concurrent updates, executes the changes, records the new history, and finally releases the lock. Only after this entire process completes does Spring Boot finish booting up.

Because Liquibase runs before Spring Boot fully initializes the web server, your application will never serve traffic with an outdated database schema. If a migration fails, the application fails to start, protecting your system from entering a broken state.

---

## Project Setup

Now that you understand the theory, let's build something real. We're going to build the database layer for an Employee Management API.

For this project we'll use:

- Java 17+
- Spring Boot 3.x
- Maven
- Liquibase
- H2 Database

We're using H2 because it's an in-memory database that requires zero installation. You can run this project immediately without configuring Docker containers or installing database servers. But everything you learn here applies exactly the same way to PostgreSQL, MySQL, SQL Server, or Oracle.

If you're generating this project via [<VPIcon icon="iconfont icon-spring"/>Spring Initializr](https://start.spring.io/), select the following dependencies: Spring Web, Spring Data JPA, Liquibase Migration, and H2 Database.

In your <VPIcon icon="iconfont icon-code"/>`pom.xml`, you'll see the critical dependencies that make this work:

```xml title="pom.xml"
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>

    <dependency>
        <groupId>org.liquibase</groupId>
        <artifactId>liquibase-core</artifactId>
    </dependency>
</dependencies>
```

Next, configure Spring Boot to talk to H2 and find your Liquibase files. Open your <VPIcon icon="fas fa-folder-open"/>`src/main/resources/`<VPIcon icon="fas fa-gears"/>`application.properties` file and add the following:

```conf title="src/main/resources/application.properties"
# H2 Database Configuration
spring.datasource.url=jdbc:h2:file:./data/employeedb;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Enable H2 Console to inspect the database in your browser
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Liquibase Configuration
spring.liquibase.change-log=classpath:db/changelog/db.changelog-master.xml
```

That last line is the most important. It tells Spring Boot exactly where to find the "master list" of your database changes.

Note: We're using a file-based H2 database instead of an in-memory database. The problem with an in-memory database is that it completely wipes itself clean every time you restart Spring Boot.

While Liquibase will happily rebuild the schema from scratch on every boot, a **file-based** database is much better for this tutorial (and for real-world local development). With a file-based database, your data, and more importantly, your Liquibase history, will actually persist between application restarts.

---

## Understanding Core Liquibase Concepts

Before we write our first table, we need to understand how Liquibase organizes files. Liquibase uses a hierarchical structure.

Think of it like a book. The `changeLog` is the table of contents, and the `changeSets` are the actual chapters.

1. **The Master ChangeLog:** This is the entry point. It rarely contains actual database changes. Instead, its only job is to include other files in a specific order.
2. **Child ChangeLogs:** These group related changes together.
3. **ChangeSets:** These are the actual, atomic database commands (like creating a table or adding a column).

Here's a visual breakdown of how this hierarchy works in a real Spring Boot project:

![File structure diagram showing a master changelog XML file pointing to three child migration files in strict chronological order.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/2cbd3054-d0e4-4129-b0a4-015b08c7258c.png)
<!-- TODO: mermaid화 -->

Liquibase organizes migrations hierarchically. You maintain a single master file that acts as a table of contents. This master file rarely holds actual SQL commands. Instead, it explicitly includes child XML files in a strict execution order. Each of those child files (like <VPIcon icon="iconfont icon-code"/><VPIcon icon="iconfont icon-code"/>`01-create-employees.xml`) contains one or more individual database commands, which Liquibase calls changeSets.

A `changeSet` is uniquely identified by three things:

- **id:** A unique string (often a number or a Jira ticket ID).
- **author:** The person who wrote the migration.
- **file path:** Where the file is located.

When Liquibase runs, it looks at a `changeSet`, calculates a cryptographic hash of its contents (a checksum), and records the id, author, and checksum in the database. If it sees that exact combination of id, author, and file path in the database again on the next startup, it skips it.

---

## Create the Initial Employee Schema (Version 1)

Let's write our first version. We need a table to store employees.

First, create the master file at <VPIcon icon="fas fa-folder-open"/>`src/main/resources/db/changelog/`<VPIcon icon="iconfont icon-code"/>`db.changelog-master.xml`:

```xml title='src/main/resources/db/changelog/db.changelog-master.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <include file="db/changelog/changes/01-create-employees.xml"/>

</databaseChangeLog>
```

Next, create the actual migration file at <VPIcon icon="fas fa-folder-open"/>`src/main/resources/db/changelog/changes/`<VPIcon icon="iconfont icon-code"/><VPIcon icon="iconfont icon-code"/>`01-create-employees.xml`:

```xml title="src/main/resources/db/changelog/changes/01-create-employees.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="1" author="ashutoshkrris">
        <createTable tableName="employees">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="first_name" type="VARCHAR(50)">
                <constraints nullable="false"/>
            </column>
            <column name="last_name" type="VARCHAR(50)">
                <constraints nullable="false"/>
            </column>
        </createTable>
    </changeSet>

</databaseChangeLog>
```

Let's look at what we just did. We defined a `changeSet` with an `id` of "1" and an `author` of "ashutoshkrris". Inside, we used Liquibase's XML syntax to define a table.

Why use XML instead of plain SQL? Because Liquibase is database-agnostic. This exact XML will generate the correct auto-increment syntax for PostgreSQL (`SERIAL`), MySQL (`AUTO_INCREMENT`), or Oracle (`IDENTITY`). You define the structure, and Liquibase translates it to the specific database dialect.

Now, run your Spring Boot application. Watch your terminal output. You'll see logs similar to this:

![Terminal Logs for Liquibase Startup](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/69171f93-d54b-487b-a09a-9fd49cad6b6a.png)

Liquibase realized the database was empty. It automatically created its tracking table (`DATABASECHANGELOG`), read our `changeSet`, executed the table creation, and recorded the event.

If you restart the application right now, Liquibase will run again. But this time, it'll check the `DATABASECHANGELOG` table, see that `id="1"` and `author="ashutoshkrris"` has already been executed, and silently skip it. Your database is now safely version-controlled.

---

## What Just Happened?

Up to this point, Liquibase might feel a bit like magic. You dropped an XML file into a folder, started Spring Boot, and your database schema transformed.

But understanding how Liquibase actually works under the hood is critical. If you understand the startup sequence, you'll know exactly how to debug deployments when things eventually go wrong.

When your Spring Boot application starts, it doesn't immediately begin accepting web requests. First, it initializes its internal components. When it creates the Liquibase component, the migration process begins.

Here's exactly what happens during that startup phase:

![Detailed sequence diagram showing Liquibase checking the lock table, acquiring the lock, running unexecuted migrations, and releasing the lock before Tomcat starts.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/4625b403-3f12-4015-9f46-2d0966c35e30.png)
<!-- TODO: mermaid화 -->

Let's trace the exact sequence. When Spring Boot initializes Liquibase, the very first thing the tool does is query the lock table to ensure no other application instance is currently migrating the database. If the coast is clear, it claims the lock. It then calculates cryptographic checksums for your local XML files, compares them against the database history, executes any missing changes, and logs them. Finally, it releases the lock so the Tomcat web server can safely start.

This sequence guarantees that your application will never serve a user request before the database schema is completely ready to handle it.

---

## Inspecting the Database: Liquibase Metadata Tables

Let's look at what this history and locking actually looks like inside the database itself. Since we configured the H2 Console earlier, we can inspect the raw tables.

While your Spring Boot application is running, open your browser and navigate to `http://localhost:8080/h2-console`. Connect using the JDBC URL `jdbc:h2:file:./data/employeedb` with the username `sa` and a blank password.

Inside, you'll see your `employees` table. You'll also see two extra tables created automatically by Liquibase: `DATABASECHANGELOG` and `DATABASECHANGELOGLOCK`.

### The `DATABASECHANGELOG` Table

This table is the brain of your migration strategy. It acts as the permanent ledger of every database change ever applied to this environment.

If you run `SELECT * FROM DATABASECHANGELOG;`, you'll see output that looks like this:

| ID | AUTHOR | FILENAME | DATEEXECUTED | ORDEREXECUTED | EXECTYPE | MD5SUM | DESCRIPTION | COMMENTS | TAG | LIQUIBASE | CONTEXTS | LABELS | DEPLOYMENT_ID |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ashutoshkrris | db/changelog/changes/01-create-employees.xml | 2026-05-30 13:11:35.937919 | 1 | EXECUTED | 9:66e7dcffb2b1902a4e9f01670cb5f192 | createTable tableName=employees |  | *null* | 4.31.1 | *null* | *null* | 0126894849 |

Let's break down the most important columns:

- **ID, AUTHOR, FILENAME:** These three columns form a composite key. Together, they uniquely identify a single migration.
- **DATEEXECUTED & ORDEREXECUTED:** Tells you exactly when a script ran and in what sequence.
- **MD5SUM:** This is the cryptographic hash of your XML file. When Liquibase starts, it hashes your local XML file and compares it to this column. If you secretly edit a file after it's been executed, this hash won't match, and Liquibase will crash the startup to protect your database.
- **EXECTYPE:** Most of the time, this simply says `EXECUTED`. But it provides a crucial audit trail: if you use Liquibase commands to intentionally skip a migration but record it as finished, you'll see `MARK_RAN`. If a migration was skipped because its preconditions failed, you'll see `SKIPPED`.
- **TAG:** Think of this as a Git tag for your database schema. Before a major, high-risk deployment, you can configure Liquibase to "tag" the current state of the database (for example, `v1.4.0`). If the deployment fails catastrophically, you can trigger a rollback command telling Liquibase to undo every change applied after the `v1.4.0` tag.
- **CONTEXTS:** This is how you manage environment-specific changes. By adding a context attribute to your changeSet (for example, `<changeSet id="7" author="ashutoshkrris" context="dev, qa">`), that migration will only execute if Spring Boot passes "dev" or "qa" to Liquibase on startup. Production will safely ignore it.
- **LABELS:** While Contexts target environments, Labels target categories of work. You can label a changeSet with a Jira ticket number (`issue-842`) or a release train (`Q3-release`). This allows advanced teams to selectively execute or roll back specific subsets of features without affecting the rest of the database.

### The `DATABASECHANGELOGLOCK` Table

This table is tiny, but it plays a massive role in modern deployments.

If you run `SELECT * FROM DATABASECHANGELOGLOCK;`, you'll see a single row:

| ID | LOCKED | LOCKGRANTED | LOCKEDBY |
| --- | --- | --- | --- |
| 1 | FALSE | *null* | *null* |

Imagine you're deploying your Spring Boot application to a Kubernetes cluster. You tell Kubernetes to spin up three identical instances simultaneously. All three instances connect to the exact same database.

If all three instances try to run the `CREATE TABLE` migration at the exact same millisecond, your database will throw concurrency errors. The lock table prevents this. The very first instance to reach the database sets `LOCKED` to `TRUE`. The other two instances check the table, see the lock, and politely wait.

**Practical Troubleshooting Tip:** Sometimes, a deployment fails catastrophically mid-migration (perhaps the server lost power). When this happens, Liquibase might die before it can set `LOCKED` back to `FALSE`.

The next time you start the application, the logs will hang indefinitely, repeating: `Waiting for changelog lock....`

If you're absolutely certain no other applications are currently running migrations, you can manually fix this by running a simple SQL command in your database client:

```sql
UPDATE DATABASECHANGELOGLOCK SET LOCKED = FALSE;
```

This forces the lock open, allowing your application to resume.

---

## Evolving the Employee API

Software is never finished. Two weeks after your successful Version 1 deployment, the business team comes back with new requirements.

Because you now understand how Liquibase tracks history, evolving the database is simple. You just append new files to your master list.

### Version 2: Adding an Email Field

The HR team needs to contact employees. You need an email column.

Create a new file at <VPIcon icon="fas fa-folder-open"/>`src/main/resources/db/changelog/changes/`<VPIcon icon="iconfont icon-code"/>`02-add-employee-email.xml`:

```xml title="src/main/resources/db/changelog/changes/02-add-employee-email.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="2" author="ashutoshkrris">
        <addColumn tableName="employees">
            <column name="email" type="VARCHAR(100)">
                <constraints nullable="false" unique="true"/>
            </column>
        </addColumn>
    </changeSet>

</databaseChangeLog>
```

Add this to your `db.changelog-master.xml` file immediately below your first include:

```xml
<include file="db/changelog/changes/02-add-employee-email.xml"/>
```

When you restart the application, Liquibase checks the `DATABASECHANGELOG` table. It sees that `id="1"` is already there, so it skips it. It sees `id="2"` is missing, so it executes it and adds a new row to the tracking table.

### Version 3: Adding Departments Support

The company is growing. Employees now belong to departments. You need a `departments` table and a foreign key constraint linking the two.

Create <VPIcon icon="iconfont icon-code"/>`03-add-departments.xml`:

```xml title="src/main/resources/db/changelog/changes/03-add-departments.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="3" author="ashutoshkrris">
        <createTable tableName="departments">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="VARCHAR(50)">
                <constraints nullable="false" unique="true"/>
            </column>
        </createTable>
    </changeSet>

    <changeSet id="4" author="ashutoshkrris">
        <addColumn tableName="employees">
            <column name="department_id" type="BIGINT"/>
        </addColumn>
        <addForeignKeyConstraint baseTableName="employees"
                                 baseColumnNames="department_id"
                                 constraintName="fk_employee_department"
                                 referencedTableName="departments"
                                 referencedColumnNames="id"/>
    </changeSet>

</databaseChangeLog>
```

Notice that we used two separate changeSets in one file. This is a best practice. Each changeSet represents one logical operation. If the foreign key creation (id="4") fails, the department table creation (id="3") will still be recorded as successful, and only id="4" will roll back.

### Version 4 & 5: Employee Status and Performance Indexes

Finally, HR wants to track active versus inactive staff, and the database team noticed that searching by last name is getting slow.

Create <VPIcon icon="iconfont icon-code"/>`04-status-and-indexes.xml`:

```xml title="src/main/resources/db/changelog/changes/04-status-and-indexes.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="3" author="ashutoshkrris">
        <createTable tableName="departments">
            <column name="id" type="BIGINT" autoIncrement="true">
                <constraints primaryKey="true" nullable="false"/>
            </column>
            <column name="name" type="VARCHAR(50)">
                <constraints nullable="false" unique="true"/>
            </column>
        </createTable>
    </changeSet>

    <changeSet id="4" author="ashutoshkrris">
        <addColumn tableName="employees">
            <column name="department_id" type="BIGINT"/>
        </addColumn>
        <addForeignKeyConstraint baseTableName="employees"
                                 baseColumnNames="department_id"
                                 constraintName="fk_employee_department"
                                 referencedTableName="departments"
                                 referencedColumnNames="id"/>
    </changeSet>

</databaseChangeLog>
```

Remember to add all new files to your <VPIcon icon="iconfont icon-code"/>`db.changelog-master.xml`. The order of your include statements is the exact order Liquibase will execute them.

---

## The Golden Rule: Never Modify Executed ChangeSets

Eventually, a developer on your team will look at your <VPIcon icon="iconfont icon-code"/><VPIcon icon="iconfont icon-code"/>`01-create-employees.xml` file and notice a mistake. Perhaps they spot a typo in a column name, or perhaps they realize a column is missing a strict non-null constraint.

Their instinct, based on years of writing standard Java code, will be to open that XML file, fix the mistake, save the file, and restart the application.

Let's actually do this and see what happens.

Open your <VPIcon icon="fas fa-folder-open"/>`src/main/resources/db/changelog/changes/`<VPIcon icon="iconfont icon-code"/><VPIcon icon="iconfont icon-code"/>`01-create-employees.xml` file. Change the `first_name` column to `given_name`:

```xml title="src/main/resources/db/changelog/changes/01-create-employees.xml"
<column name="given_name" type="VARCHAR(50)">
    <constraints nullable="false"/>
</column>
```

Save the file and restart your Spring Boot application.

Instead of a smooth startup, your application will instantly crash, and your terminal will vomit a massive stack trace. Look closely at the top of the error logs. You should see this exact message:

```plaintext
Caused by: liquibase.exception.ValidationFailedException: Validation Failed:
     1 changesets check sum
          db/changelog/changes/01-create-employees.xml::1::ashutoshkrris was: 9:66e7dcffb2b1902a4e9f01670cb5f192 but is now: 9:2bd3ef21343d3b5c9448cc50bc35deef
```

Here's why this happens. Once a changeSet runs against an environment, it becomes immutable history. You can't change the past.

When Liquibase starts up, it calculates a cryptographic hash (an MD5 checksum) of your local XML file. It then queries the `DATABASECHANGELOG` table and compares the freshly calculated hash against the hash that was recorded when the file originally executed.

If you change even a single character in a file that has already been executed, the hash changes. Liquibase detects the tampering and refuses to start. It does this to protect your data. If your XML code says a column is named `first_name` but the database was originally built using `fist_name`, your Spring Data JPA repositories are going to fail anyway.

### How to Fix It (The Right Way)

If you made this mistake locally, you might be tempted to go into your database, delete the row from the `DATABASECHANGELOG` table, and try again. Don't do this. If this code reaches staging or production, you can't manually delete rows on production servers.

The correct way to fix a schema mistake is to **roll forward**.

First, undo your change in <VPIcon icon="iconfont icon-code"/>`01-create-employees.xml` so the hash matches the database again. Then, write a brand new changeSet to apply the fix:

```xml title="src/main/resources/db/changelog/changes/01-create-employees.xml"
<changeSet id="7" author="ashutosh">
    <renameColumn tableName="employees" 
                  oldColumnName="first_name" 
                  newColumnName="given_name" 
                  columnDataType="VARCHAR(50)"/>
</changeSet>
```

Include it in your master changelog, restart the application, and the database will safely evolve to the correct state.

---

## Working with Seed Data

Sometimes, a schema change requires initial data to be useful.

For example, in Version 3, we created a `departments` table. Right now, that table is completely empty. When a new developer clones the repository and spins up the project locally, they have to manually write SQL `INSERT` statements just to test the API.

We can automate this by making baseline data insertion part of our migration strategy.

Create a new file at <VPIcon icon="fas fa-folder-open"/>`src/main/resources/db/changelog/changes/`<VPIcon icon="iconfont icon-code"/>`05-seed-departments.xml`:

```xml title="src/main/resources/db/changelog/changes/05-seed-departments.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="8" author="ashutoshkrris">
        <insert tableName="departments">
            <column name="name" value="Engineering"/>
        </insert>
        <insert tableName="departments">
            <column name="name" value="Human Resources"/>
        </insert>
        <insert tableName="departments">
            <column name="name" value="Finance"/>
        </insert>
    </changeSet>

</databaseChangeLog>
```

Add the include statement to your <VPIcon icon="iconfont icon-code"/>`db.changelog-master.xml` file. When you restart the application, Liquibase will insert these rows. Your API is now instantly usable out of the box.

### The Danger of Data Migrations

While seeding data is powerful, it requires discipline. Here is a practical engineering rule of thumb:

**Do use Liquibase for:**

- Static lookup tables (status codes, country lists, default departments).
- System configuration flags required for the application to boot.

**Do NOT use Liquibase for:**

- Generating thousands of fake users for testing.
- Migrating massive amounts of transactional data (for example, moving 5 million records from one table to another).

Large data migrations can lock up database tables for hours. If you lock a core table during a deployment, your application will experience a massive outage. Keep your changeSets focused on schema structure and essential baseline data. Use dedicated scripts or background jobs for heavy data manipulation.

---

## Rollbacks

In a perfect world, code always works. In reality, you'll eventually deploy a database change that breaks a critical production query or corrupts data. When this happens, you need a way to hit the undo button.

Liquibase supports rollbacks, but you have to understand how it interprets them.

### Automatic vs. Explicit Rollbacks

Many Liquibase commands are automatically reversible. For example, if you write a changeSet to `<createTable>` or `<addColumn>`, Liquibase implicitly knows that the opposite of adding a column is dropping a column. You don't have to tell it how to undo these actions.

But some operations are inherently destructive or ambiguous. If you use custom `<sql>` tags, or if you use `<dropTable>`, Liquibase has no idea how to put the data back. In these cases, you must provide explicit rollback instructions.

Let's simulate a scenario where we add a temporary access code column, but we want to ensure we know exactly how to remove it safely.

Create <VPIcon icon="iconfont icon-code"/>`06-temporary-access.xml`:

```xml title="src/main/resources/db/changelog/changes/06-temporary-access.xml"
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
        http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.20.xsd">

    <changeSet id="9" author="ashutosh">
        <addColumn tableName="employees">
            <column name="temp_access_code" type="VARCHAR(10)"/>
        </addColumn>
        
        <rollback>
            <dropColumn tableName="employees" columnName="temp_access_code"/>
        </rollback>
    </changeSet>

</databaseChangeLog>
```

Add this to your master file and run the application. The column is added.

If you were deploying this via a CI/CD pipeline and the deployment failed, you could trigger a Liquibase Maven command to roll back by a specific number of steps (for example, `mvn liquibase:rollback -Dliquibase.rollbackCount=1`), or roll back to a specific tag we discussed earlier.

### The Reality Check on Rollbacks

While it's important to know how rollbacks work, here's a practical reality from the trenches of backend engineering: **Rollbacks are often discussed but rarely executed cleanly in production.**

Dropping a column is mathematically easy. Recovering the customer data that was written to that column during the 15 minutes the bad code was live is incredibly difficult.

Because of this, modern engineering teams often prefer a "roll forward" strategy. If a migration causes an issue, instead of running a scary database rollback command, they quickly write a new changeSet that fixes the issue (for example, adding a missing index or relaxing a constraint) and deploy the application again.

It's highly recommended to design your database changes to be additive and non-destructive to avoid needing complex rollbacks in the first place.

---

## Common Beginner Mistakes

Adopting database version control is a massive step forward for any engineering team, but it comes with a learning curve. When developers transition from writing loose SQL scripts to using Liquibase, they tend to fall into a few predictable traps.

Here are the most common beginner mistakes and exactly how to avoid them.

### 1. The "Mega" ChangeSet

When starting out, it's tempting to dump your entire initial schema into a single XML file under a single `changeSet`. You might put 15 `createTable` statements and 20 `addForeignKeyConstraint` statements into `id="1"`.

This is a terrible idea for one simple reason: transaction failure.

If your database engine fails on table number 14 (perhaps due to a syntax error), what happens to the first 13 tables? Some database engines support transactional DDL (Data Definition Language), meaning it will roll back all 13 tables automatically. But many databases do not.

If it fails halfway through, your database is now in a fractured state. Liquibase didn't record `id="1"` as successful, so the next time you start the app, it will try to create all 15 tables again. It will immediately crash because table 1 already exists.

::: tip The Fix

Stick to the rule of "one logical operation per changeSet." If you're creating three tables, write three separate changeSets. If one fails, the successful ones are permanently recorded, and you only have to fix the broken one.

:::

### 2. Manual Database Tweaking (The Phantom Menace)

This is the most dangerous habit to break. A developer spots a missing index in production. Instead of writing a Liquibase migration, going through code review, and deploying, they log directly into the production database and run `CREATE INDEX` manually to save time.

A week later, another developer writes a proper Liquibase migration to create that exact same index and deploys it. The application crashes on startup. Liquibase tries to execute the `CREATE INDEX` command, but the database throws an error saying the index already exists.

When you adopt Liquibase, you must accept a fundamental rule: **Liquibase is the absolute source of truth for your schema.** Human hands should never touch the database structure directly.

::: tip The Fix

If someone accidentally does this, you have two options to fix the deployment pipeline. You can manually drop the index from the database so Liquibase can recreate it properly, or you can use the `<preConditions>` tag in Liquibase to check if the index exists before trying to create it.

:::

### 3. Ignoring the "From Scratch" Build

When you work on a project for months, your local database accumulates a lot of history. You write migrations assuming certain tables or test data already exist.

Then, a new developer joins the team. They pull the code, spin up an empty database, start Spring Boot, and the migrations crash halfway through.

This happens because the migrations rely on an assumed state (like expecting a specific row to exist before creating a foreign key) rather than a guaranteed state.

::: tip The Fix

You should regularly test your migrations against a completely blank database. If you're using Docker, tear down your database container and rebuild it. If you're using a file-based H2 database like we set up earlier, simply delete the `./data/employeedb.mv.db` file from your project folder and restart Spring Boot. If the application can't boot successfully from a completely empty state, your migration history is broken.

:::

### 4. Hardcoding Environment Details

Beginners sometimes hardcode environment-specific details directly into their XML files. For example, they might hardcode a specific schema name (schemaName="dev_schema") or grant permissions to a specific local user (GRANT ALL ON employees TO my_local_user).

When this code goes to staging, the staging database uses a different schema name, and the deployment fails.

The Fix: Keep your migrations abstract. Let Spring Boot handle the connection details via application.properties. If you absolutely must use dynamic values inside your Liquibase files, use property substitution. You can define variables in Liquibase and pass them in from Spring Boot during startup.

### 5. Messing Up Migration Ordering

Liquibase executes files in the exact order they're listed in your `db.changelog-master.xml` file.

If developer A creates the `departments` table in a branch, and developer B creates a foreign key linking to `departments` in another branch, whoever merges their code first dictates the order. If developer B's code gets included in the master file *before* developer A's code, Liquibase will try to create the foreign key before the target table exists.

::: tip The Fix

The master changelog is the ultimate chokepoint for database changes. During code reviews, always verify that the `<include>` statements are ordered chronologically and that dependencies make sense.

:::

---

## Liquibase vs Flyway vs Manual SQL Scripts

When you decide to implement database version control, you'll immediately face a choice. Liquibase isn't the only tool in the Java ecosystem. The three most common approaches to managing schema evolution are Liquibase, Flyway, and manual SQL scripts.

You should understand the practical tradeoffs of each so you can choose the right tool for your specific team and project.

### 1. Manual SQL Scripts (The Baseline)

This is the default approach for most beginners. You write a script.sql file and execute it directly against the database using a tool like DBeaver, pgAdmin, or DataGrip.

- **Strengths:** There is zero setup required. You have total control over the exact syntax, and every backend developer already knows how to write SQL.
- **Weaknesses:** There's absolutely no execution tracking. This approach practically guarantees schema drift across environments. Deployments become stressful because they rely on humans remembering to execute the right scripts in the exact right order.
- **The Verdict:** Manual scripts are perfectly fine for solo weekend projects or rapid prototyping where you don't care if the database gets destroyed. But they become a massive liability the moment a second developer joins the team or a staging environment is created.

### 2. Flyway (The SQL Purist)

Flyway is the most popular alternative to Liquibase. Instead of using XML or YAML abstractions, Flyway embraces raw SQL. You write pure SQL files with a strict naming convention (for example, V1__Create_employee_table.sql).

- **Strengths:** There's no new syntax to learn. If you know SQL, you already know how to use Flyway. It's incredibly fast to set up, highly opinionated, and integrates flawlessly with Spring Boot.
- **Weaknesses:** Because you write raw SQL, your migrations are intimately tied to your specific database dialect. If you write Flyway scripts for MySQL and later decide to migrate the project to PostgreSQL, you have to manually rewrite your migration history. Furthermore, seamless automated rollbacks are a paid feature in Flyway's commercial tier.
- **The Verdict:** Flyway is excellent for teams that are highly skilled in SQL, are permanently committed to a single database vendor, and prefer strict conventions over flexible configurations.

### 3. Liquibase (The Abstraction Layer)

As we have seen throughout this tutorial, Liquibase takes a different approach by abstracting database changes into XML, YAML, or JSON.

1. **Strengths:** It's truly database-agnostic. You define the logical structure, and Liquibase automatically translates that into the correct SQL dialect for H2, PostgreSQL, or Oracle. It supports powerful automatic rollbacks, preconditions, contexts, and deployment labels out of the box for free.
2. **Weaknesses:** It has a steeper learning curve than Flyway. The XML syntax is undeniably verbose and can feel heavy for very simple, single-table applications.
3. **The Verdict:** Liquibase shines in complex applications, multi-tenant systems, projects that support multiple database vendors, and enterprise environments that require fine-grained control over CI/CD deployment pipelines.

---

## Liquibase Best Practices

Now that you understand the mechanics of Liquibase, you need to know how to use it in a professional environment. Writing a migration that works on your local machine is only half the battle. Writing a migration that your entire team can safely deploy to production requires discipline.

Here are the engineering best practices you should adopt when managing database changes.

### 1. One Logical Change Per ChangeSet (The Atomic Rule)

We discussed this in the common mistakes section, but it's important enough to repeat. Never bundle a table creation, an index creation, and a data insertion into a single changeSet.

If you're adding a salary column and an idx_employee_salary index, put them in two separate changeSets within the same file. This ensures that if the index creation fails, the column creation is still safely recorded, and you don't end up in a fractured database state.

### 2. Meaningful File Organization and Naming

Don't name your files `update1.xml` or `new_changes.xml`. Your file names should tell a story about how your database evolved.

Adopt a strict prefix system. In our project, we used <VPIcon icon="iconfont icon-code"/>`01-create-employees.xml` and `02-add-employee-email.xml`. In a real team, you might use Jira ticket numbers or release versions (for example, `v1.2.0_ticket-482_add_email.xml`). Whatever convention you choose, enforce it rigorously during code reviews.

### 3. Treat Database Changes Like Application Code

Database migrations belong in source control right next to your Java code. They should be reviewed with the exact same level of scrutiny.

When reviewing a pull request that includes a Liquibase file, engineers should ask:

- Does this column need an index?
- Is this a destructive change (like renaming a column) that will break the currently running application?
- Did the author include explicit rollback instructions for custom SQL?

### 4. Integrate Migrations into CI/CD

Human hands should never run database migrations against a production server. Your deployment pipeline should handle this automatically.

When you merge code into your main branch, your CI/CD pipeline (like GitHub Actions or GitLab CI) should build your Spring Boot application and deploy it. Because we bundled Liquibase into our Spring Boot startup sequence, the application will automatically migrate the production database before it starts accepting web traffic.

Here's what a safe, automated deployment pipeline looks like:

![CI/CD pipeline architecture showing code moving from Git to testing, deploying to a staging environment where Liquibase runs, and then promoting to production.](https://cdn.hashnode.com/uploads/covers/61c1acb4a90dea775da8262b/7a9323e6-c44a-4ee5-8307-3ee8a696c3a9.png)
<!-- TODO: mermaid화 -->

In a mature deployment pipeline, human hands never touch the production database. When you merge a pull request, the CI/CD pipeline builds the code and runs unit tests. It deploys the Spring Boot application to a staging environment, where Liquibase automatically acquires a lock and runs the migrations during startup. Once validated, that exact same artifact is promoted to production, triggering the identical automated migration process.

### 5. Never Fix Forward by Deleting History

If a migration fails in an upper environment (like staging or production), never log into the database to delete the `DATABASECHANGELOG` row so you can try again.

You must respect the immutability of the changelog. If you made a mistake, write a new changeSet that drops the broken table or fixes the data type, and push it through your Git workflow just like you would a Java bug fix.

---

## Final Thoughts

Managing database schema changes doesn't have to be a source of anxiety.

By treating your database schema as code, you eliminate the chaos of manual SQL scripts. You prevent the dreaded "schema drift" where every developer's local machine behaves differently. Most importantly, you make your deployments predictable and boring (which is exactly what you want deployments to be).

In this tutorial, you built a practical Spring Boot application from scratch. You learned how Liquibase intercepts the application startup, locks the database, calculates cryptographic checksums, and safely applies incremental changes. You evolved a single table into a relational schema, added seed data, and learned how to avoid the most common traps beginners fall into.

The next time you start a Spring Boot project, don't reach for a manual SQL client. Add the Liquibase dependency, create your master changelog, and start version controlling your database from day one. Your future self (and your team) will thank you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Database Version Control with Liquibase and Spring Boot",
  "desc": "Picture this familiar scenario: you're working on a new feature that requires a new database column. You open your local database client, write an ALTER TABLE statement, and execute it. Your code work",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/database-version-control-with-liquibase-and-spring-boot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
