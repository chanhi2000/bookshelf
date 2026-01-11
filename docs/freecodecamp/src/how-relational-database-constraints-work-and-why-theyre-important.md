---
lang: en-US
title: "How Relational Database Constraints Work and Why They're Important"
description: "Article(s) > How Relational Database Constraints Work and Why They're Important"
icon: fas fa-database
category:
  - Data Science
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - data-science
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Relational Database Constraints Work and Why They're Important"
    - property: og:description
      content: "How Relational Database Constraints Work and Why They're Important"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-relational-database-constraints-work-and-why-theyre-important.html
prev: /data-science/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Zubair Idris Aweda
    url : https://freecodecamp.org/news/author/Zubs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768416017042/66390973-a4cb-4e7a-9161-2d737045bf7b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Data Science > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Relational Database Constraints Work and Why They're Important"
  desc="Databases are a crucial tool because they store the data that power our day-to-day lives. Databases are designed to match the real world as much as possible, so they store data of different forms, about different things, just as it is in the world. T..."
  url="https://freecodecamp.org/news/how-relational-database-constraints-work-and-why-theyre-important"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768416017042/66390973-a4cb-4e7a-9161-2d737045bf7b.png"/>

Databases are a crucial tool because they store the data that power our day-to-day lives. Databases are designed to match the real world as much as possible, so they store data of different forms, about different things, just as it is in the world.

There are many rules that govern how entities interact with each other, to make things work. For example, a student can’t take a course that the school doesn’t offer. A soccer player can’t have a jersey number less than 1 or greater than 99. And a car must always have a plate number.

Relational databases are also able to represent and enforce these rules using **constraints**. And in this article, I’ll explain how constraints work with practical examples.

Whether you’re a beginner or just looking to refresh your knowledge, this article will help you learn the essentials. If you need some more background, you can read this article on the [**basics of relational databases**](/freecodecamp.org/learn-relational-database-basics-key-concepts-for-beginners.md) before continuing.

---

## What is a Relational Database Constraint?

Relational database constraints are a set of database rules that are used to define or determine what set of values are acceptable or valid in a database. They’re usually based on the many rules of the real world.

They are put in place to:

- Ensure data accuracy: only values that would be acceptable in real life should be acceptable in the database. Learn more about data accuracy [<VPIcon icon="iconfont icon-ibm"/>here](https://ibm.com/think/topics/data-accuracy).
- Ensure data integrity: values in the database remain correct, accurate, complete, and valid as long as the database exists. Learn more about data integrity [<VPIcon icon="fas fa-globe"/>here](https://fortinet.com/uk/resources/cyberglossary/data-integrity).
- Ensure data consistency: values always maintain same agreed form throughout their lifetime.

These rules limit what can be entered into a database or what can be deleted from it. They also limit data update to ensure validity after original creation.

::: info AWS (<VPIcon icon="fa-brands fa-aws"/><code>aws.amazon.com</code>)

> These integrity constraints help enforce business rules on data in the tables to ensure the accuracy and reliability of the data.

```component VPCard
{
  "title": "What is a Relational Database?",
  "desc": "Learn about the important aspects of relational databases and review the relational database engines available on Amazon Aurora and Amazon RDS.",
  "link": "https://aws.amazon.com/rds/what-is-a-relational-database//",
  "logo": "https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
  "background": "rgba(22,29,38,0.2)"
}
```

:::

---

## Types of Relational Database Constraints

There are many ways to group or categorise database constraints, depending on how they’re applied or what they’re preventing. This article focuses on three popular types:

- Inherent model-based constraints (implicit constraints)
- Schema-based constraints (explicit constraints)
- Application-based constraints (semantic constraints)

### Inherent Model-based Constraints (Implicit Constraints)

These rules are the base rules that come with the database and are enforced by the DMBS. Some of these rules are:

- Each row must be unique. This is with or without a `UNIQUE` or `PRIMARY KEY` constraint.
- Columns can only store one value at a time. The value of a field like `age` will always be one value like 23, not 23 and 35.
- Each column name in a table must be unique.
- Columns exist for all rows. Every row will have the same number of columns. For some of the rows, the data might be empty, but the column will always be there.

### Schema-based Constraints (Explicit Constraints)

These constraints are expressed by the developer or database designer on database creation. They’re expressed directly in the database schemas, using the [<VPIcon icon="fa-brands fa-wikipedia-w"/>DDL](https://en.wikipedia.org/wiki/Data_definition_language).

These can be further broken down into:

- Domain constraints
- Key constraints
  - Entity integrity constraint (Primary key)
  - Unique constraint (Unique key)
  - Referential integrity constraint (Foreign key)

#### 1. Domain Constraints

These are used to define a range or set of possible values for an attribute of a database table. They help ensure that column values are valid and consistent by defining acceptable data types, formats, and ranges for an attribute. This prevents incorrect or illogical data entry and maintains data integrity.

You can define them simply by specifying a data type that the values must follow. For example, the `age` of a person can only be a number, or could be a number between 18-60 if the database is for a company, or a number between 5-65 if it’s for an amusement park.

The database will enforce this rule by rejecting age values outside of the given range or type. The DDL for the age would look like this:

```sql
CREATE TABLE people (
    age INT, -- Any integer value is allowed
    age INT CHECK (age BETWEEN 18 AND 60), -- Only allows ages between 18 and 60
    age INT CHECK (age BETWEEN 5 AND 65) -- Only allows ages between 5 and 65
);
```

The `INT` means only integer values are accepted, and the `CHECK` is used with the `BETWEEN` and `AND` keywords to specify the sub-domain or range of values.

Other [<VPIcon icon="fas fa-globe"/>data types in SQL](https://w3schools.com/sql/sql_datatypes.asp) include: `CHAR`, `BIT`, `DATE`, `VARCHAR` and so on. You can use all of them to define the acceptable domain for database values.

```sql
CREATE TABLE employees (
    employee_id INT,
    name VARCHAR(100),
    age INT CHECK (age BETWEEN 18 AND 60)
);
```

As well as defining a range of acceptable values, you can also define the optionality of an attribute using the `NOT NULL` keyword. You’d use this in cases where the data must exist and must also be within the given range.

```sql
CREATE TABLE employees (
    employee_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age BETWEEN 18 AND 60)
);
```

In this example, every employee record needs to have an `employee_id` and a `name` but not an `age`. This works for real life situations where, although the range of values is known, the actual value is either unknown or doesn’t exist. An example would be the minor course of study of a student at a university – many students only have majors, and as such, the minor course of study will be empty (NULL) for those students.

#### 2. Entity integrity constraint (Primary key)

This ensures that no primary key is NULL. The primary key is the one attribute or set of attributes that must be unique to each row in the database. It’s the primary value that uniquely identifies the rest of the data. This means that every row in the database will remain uniquely identifiable with a primary key.

A NULL primary key means that rows will not be unique, or identifiable, and the database can contain duplicates. Without the primary key, we can’t have data consistency.

For example, in a school, every student will have a unique student id number with which they can always be distinguished from other students. The government uses methods like passport numbers or tax ids to uniquely identify citizens.

In our example, it’s impossible to be a student without a student id number. You can implement this constraint by using the `PRIMARY KEY` keyword.

```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT CHECK (age BETWEEN 18 AND 60)
);
```

#### 3. Unique constraint (Unique key)

This is similar to the **Entity integrity constraint** in that it only accepts unique values – but it’s different in that it accepts NULL values.

An example of this would be in a students table, every student must have a student id number that uniquely identifies them. This number cannot be NULL, and it must the unique. Students can also have an email address that the school can reach them on. This email must be unique for each student. But, not every student has to have an email. So the condition is: **“If the value exists, it must be unique”**.

You can implement this constraint using the `UNIQUE` keyword, like this:

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY, -- Must exist and must be unique
    email VARCHAR(255) UNIQUE -- Can be NULL, but must be unique if provided
);
```

#### 4. Referential integrity constraint (Foreign key)

This constraint guards the relationship between two related tables. It is used to maintain consistency in the relationship. It requires that data from one table, A, being referenced in another table, B, must exist in the original table, A. For example, a student can’t register for a course the school doesn’t have.

To enforce this, the `FOREIGN KEY` keyword is used with the `REFERENCES` to define the table being referenced, and what attribute is being referred to.

```sql
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
```

In this example, every value provided in the `course_id` of the `students` must be in the `courses` table.

### Application-based constraints (Semantic constraints)

These can also be called **business rules**. They can’t be directly expressed in the database schema, so they’re often implemented the application layer instead.

These are logical constraints, like saying **“a course cannot have more than 30 students enrolled”** or **“a customer cannot place an order if it would exceed their credit limit”**.

These rules are best implemented in the application, because it would be too complex (or sometimes impossible) to implement them on the database itself.

---

## Testing Constraints

To demonstrate the constraints we’ve discussed here, let’s look at this sample school database setup:

```sql
CREATE TABLE courses (course_id INT PRIMARY KEY, course_name VARCHAR(100) NOT NULL, max_students INT CHECK (max_students > 0));

CREATE TABLE students (student_id INT PRIMARY KEY, student_name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE, age INT CHECK (age BETWEEN 5 AND 25));

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    enrollment_date DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students (student_id),
    FOREIGN KEY (course_id) REFERENCES courses (course_id)
);
```

This shows the creation of a sample school database with three tables: `courses`, `students`, and `enrollments`.

The `courses` table includes a primary key for course IDs, course names, and a constraint ensuring that the maximum number of students is greater than zero. The `students` table contains a primary key for student IDs, student names, unique email addresses, and an age constraint between 5 and 25. The `enrollments` table links students to courses with primary keys for enrollment IDs and foreign keys referencing the `students` and `courses` tables, along with a non-null enrollment date.

![DDL to create database tables](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410057148/ffe42706-4540-4ddb-8394-c157fe999b96.png)

At this point, the tables are created, and setup with the constraints guiding them.

Now we’ll test a few queries:

### 1. Insert courses, Mathematics and History, into the `courses` table:

```sql
INSERT INTO courses (course_id, course_name, max_students) VALUES (1, 'Mathematics', 30);
INSERT INTO
    courses (course_id, course_name, max_students)
VALUES
    (2, 'History', 25);
```

![Query to insert courses](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410234586/bb08fb52-9573-4f57-88d2-6383138ddc7f.png)

![Result of insert query](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410261770/f974693c-25fc-4952-80c7-6db7f4959236.png)

The query works perfectly, as the records get inserted.

### 2. Insert students, Alice and Bob, into the `students` table:

```sql
INSERT INTO
    students (student_id, student_name, email, age)
VALUES
    (101, 'Alice', 'alice@example.com', 20);

INSERT INTO
    students (student_id, student_name, email, age)
VALUES
    (102, 'Bob', NULL, 18);
```

![Query to insert students](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410360967/92aee819-63fe-4b3c-af2b-b579d66e58a9.png)

![Result of query](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410407790/ec9893cf-ded6-4ec2-bac1-c78d430a84fb.png)

The query works perfectly, as the records get inserted.

### 3. Enroll Alice into Mathematics:

```sql
INSERT INTO
    enrollments (enrollment_id, student_id, course_id, enrollment_date)
VALUES
    (1001, 101, 1, '2026-01-14');
```

![Query to insert enrollment](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410510198/be229077-028c-4048-836c-fb7796b02f7d.png)

![Result of query](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410543235/f546d371-da31-4f42-be3d-20bd2bb1aa3a.png)

The query works perfectly, as the record gets inserted.

### 4. Insert a new student, Charlie, into the `students` table:

```sql
INSERT INTO
    students (student_id, student_name, email, age)
VALUES
    (103, 'Charlie', 'charlie@example.com', 30);
```

![Failed query to insert student](https://cdn.hashnode.com/res/hashnode/image/upload/v1768410642880/0b9f038d-fb4f-49e1-a92f-3c1fd01c3fae.png)

This fails because Charlie has an `age` value of 30, which is outside of the specified range of `age INT CHECK (age BETWEEN 5 AND 25)`. The record of Charlie never gets added.

Here’s a list of some other queries that will fail:

```sql
INSERT INTO
    students (student_id, student_name, email, age)
VALUES
    (104, 'David', 'alice@example.com', 19); -- Fails for duplicate email

INSERT INTO
    students (student_id, student_name, email, age)
VALUES
    (NULL, 'Evra', 'evra@example.com', 20); -- Fails for NULL primary key

INSERT INTO
    enrollments (enrollment_id, student_id, course_id, enrollment_date)
VALUES
    (1002, 999, 1, '2026-01-14'); -- Fails for invalid student reference
```

In each case, the DBMS will provide a reason for the rejection or failure.

### 5. Delete Bob from the `students` table:

```sql
DELETE FROM students
WHERE student_id = 102;
```

![Query to delete student](https://cdn.hashnode.com/res/hashnode/image/upload/v1768411198451/3e33efdb-68e9-4cf5-a809-d2053059c29d.png)

![Result of query](https://cdn.hashnode.com/res/hashnode/image/upload/v1768411236739/50b24978-2612-4232-8169-3a24377b39a0.png)

The query works perfectly, as the record gets deleted.

6. Delete Alice from the `students` table:

```sql
DELETE FROM students
WHERE student_id = 101; -- Fails for referential integrity constraint
```

![Failed query to delete students](https://cdn.hashnode.com/res/hashnode/image/upload/v1768411336408/8fc634c2-1f10-41f2-b413-4c6b5af22369.png)

This fails because Alice, with `student_id` of 101, has an enrollment record in the `enrollments` table. Deleting the record would mean there will be an enrollment record for a non-existent student which should not be possible.

### How to Delete a Record

In some cases, you do want to delete a record, even though it has records tied to it. There are two main ways to go about this:

#### CASCADE

You can use this to define situations where, when a parent record is deleted, the child records cannot exist. All dependent (child) records in other tables are **automatically deleted**. You can use this to ensure that all enrollment records are deleted when the course is no longer available, or when a student is no longer in the school.

```sql
CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES courses (course_id) ON DELETE CASCADE
);

DELETE FROM courses
WHERE course_id = 1;
```

#### SET NULL or SET DEFAULT

You can use these methods to define situations where child records can still exist without the parent. All dependent (child) records in other tables are **automatically set to null** or **automatically set to a defined default.**

A useful example is if a school had a mentor assigned to students, when the mentor leaves the school, you don’t want to delete the students – you want to set the mentor to NULL or a default staff.

```sql
CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY, 
    teacher_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id INT PRIMARY KEY, 
    student_name VARCHAR(100) NOT NULL,
    mentor_id INT,
    FOREIGN KEY (mentor_id) REFERENCES teachers (teacher_id) ON DELETE SET NULL
);
```

7. Update Alice’s details. Change her email to a new one, and increase her age:

```sql
UPDATE students
SET
    email = 'alice.new@example.com',
    age = 22
WHERE
    student_id = 101;
```

![Query to update student](https://cdn.hashnode.com/res/hashnode/image/upload/v1768411782761/0fe14052-2bbd-4c44-952d-a13ce30947ce.png)

![Result of query](https://cdn.hashnode.com/res/hashnode/image/upload/v1768411806702/651e9694-5821-4aa0-b606-98ab361a9637.png)

The query works perfectly, as the record gets updated.

8. Update Alice’s age to 30:

```sql
UPDATE students
SET
    age = 30
WHERE
    student_id = 101;
```

This fails just like the 4th test for the same reason: the `age` is out of the stated range.

Here’s another query that will fail:

```sql
UPDATE enrollments
SET
    course_id = 999
WHERE
    enrollment_id = 1001;
```

This will fail because the new `course_id` does not exist in the `courses` table.

---

## Summary

Databases are a pivotal part of everyday modern technology, and understanding their fundamental concepts can open doors to building and managing more accurate databases.

This article introduced you to what relational database constraints are, some of the different types, and how they’re enforced and violated. You should now have the essential knowledge to navigate the world of database constraints confidently.

If you’re curious to learn more, connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`idris-aweda-zubair-5433121a3`)](https://linkedin.com/in/idris-aweda-zubair-5433121a3/), [Twitter (<VPIcon icon="fa-brands fa-x-twitter" />`greatzubs`)](https://twitter.com/greatzubs), or [GitHub (<VPIcon icon="iconfont icon-github"/>`Zubs`)](https://github.com/Zubs). Let’s continue this journey together toward mastering database systems!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Relational Database Constraints Work and Why They're Important",
  "desc": "Databases are a crucial tool because they store the data that power our day-to-day lives. Databases are designed to match the real world as much as possible, so they store data of different forms, about different things, just as it is in the world. T...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-relational-database-constraints-work-and-why-theyre-important.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
