---
lang: en-US
title: "How to Extend CRUD Operations to Align with Business Workflows"
description: "Article(s) > How to Extend CRUD Operations to Align with Business Workflows"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Extend CRUD Operations to Align with Business Workflows"
    - property: og:description
      content: "How to Extend CRUD Operations to Align with Business Workflows"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/extend-crud-operations-to-align-with-business-workflows.html
prev: /academics/system-design/articles/README.md
date: 2025-09-11
isOriginal: false
author:
  - name: Tim Kleier
    url : https://freecodecamp.org/news/author/timkleier/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1757518255485/8e727e36-d22a-42d9-b1a7-98d3ca5eae35.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Extend CRUD Operations to Align with Business Workflows"
  desc="Most developers are introduced to databases and APIs through a simple pattern: CRUD—Create, Read, Update, Delete. It seems like the perfect abstraction. With just four operations, you can model almost anything. Tutorials use it. Frameworks generate i..."
  url="https://freecodecamp.org/news/extend-crud-operations-to-align-with-business-workflows"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1757518255485/8e727e36-d22a-42d9-b1a7-98d3ca5eae35.png"/>

Most developers are introduced to databases and APIs through a simple pattern: CRUD—Create, Read, Update, Delete. It seems like the perfect abstraction. With just four operations, you can model almost anything. Tutorials use it. Frameworks generate it. We teach it to beginners as the foundation of working with data.

But once you move beyond basic apps, CRUD starts to fall apart.

Real-world systems don’t just “update” or “delete” things. In a loan application system, for example, borrowers “submit” applications, loan officers “approve” or “reject” them, and applications are eventually “archived”. These aren’t generic CRUD operations—they’re **domain-specific actions** that carry meaning.

And that’s the problem: CRUD hides the meaning of our systems behind vague verbs. REST APIs inherit the same issue, mapping HTTP verbs onto CRUD but still failing to express real workflows clearly.

In this article, we’ll explore:

- Why CRUD works fine for simple apps but becomes an anti-pattern at scale
- How concepts like **upsert**, **archive**, and **bulk operations** reveal its cracks
- Why REST doesn’t solve these issues
- How to design APIs around domain actions and workflows instead.

By the end, you’ll see CRUD for what it really is—a teaching tool, not a design philosophy.

---

## What is CRUD?

**Create, Read, Update, Delete**—these are the four basic operations we perform on data in a database.

- **Create**: adds a new record.
- **Read**: fetches an existing record (or list of records).
- **Update**: changes one or more fields in a record.
- **Delete**: removes a record.

For example, in a typical Node.js + Express app managing users:

```js
// Create a user
app.post('/users', createUser);

// Read a user
app.get('/users/:id', getUser);

// Update a user
app.put('/users/:id', updateUser);

// Delete a user
app.delete('/users/:id', deleteUser);
```

This maps directly to the underlying SQL:

```sql
INSERT INTO users (...);
SELECT * FROM users WHERE id = ...;
UPDATE users SET ... WHERE id = ...;
DELETE FROM users WHERE id = ...;
```

And that’s CRUD in its purest form—four operations that can describe almost any database interaction.

---

## Stretching CRUD: Upsert, Archive, Bulk

Developers quickly realize CRUD isn’t enough, so they invent extensions:

- **Upsert**: a mix of “update” and “insert.” If the record exists, update it; if not, create it.
- **Archive**: instead of deleting a record, we “soft delete” or mark it as inactive so the history stays intact.
- **Bulk operations**: run create, update, or delete on many records at once for efficiency.

These solve real problems, but they stretch CRUD’s simple model. We now need to distinguish between single and bulk resource actions. And we also need to factor in the technical concerns of upsertions and soft deletions.

---

## Breaking CRUD: Domain Actions

The technical domain itself stretches CRUD substantially, but business domain concerns break it entirely. Take a loan application system:

- A borrower doesn’t “create” and “update” an application—they start, submit, or withdraw it.
- A loan officer doesn’t “update” an application—they review, approve, or reject it.
- Applications don’t get “deleted”—they’re usually archived so there’s a record for compliance.

If we try to model these as plain CRUD, the meaning gets lost:

```http
PATCH /applications/123 { "status": "approved" }
```

Technically, it works. But what does “update” really mean here? Was the application submitted, rejected, or archived? You can’t tell from the API call.

The core problem: CRUD hides intent behind generic, technical language. Real business processes are expressed as domain-specific actions, not generic updates or deletes.

---

## Breaking CRUD: Domain Authorization

CRUD not only obscures intent—it also creates authorization gaps. Using the same loan application example:

- Only loan officers should approve applications.
- Borrowers should only edit their own information or withdraw their applications.

If “approve” is just modeled as a generic update, the system can’t distinguish between roles without additional checks. A naive authorization rule like “can this user update?” suddenly lets borrowers perform actions reserved for officers.

This mismatch between technical verbs and business rules can lead to:

- Security issues—unauthorized actions performed by the wrong user.
- Audit problems—it’s unclear who did what, and when.
- Workflow confusion—state transitions get lost in generic updates.

The solution: treat each domain action as its own API call with explicit authorization rules:

```http
POST /applications/123/approve   # Only accessible to loan officers
POST /applications/123/withdraw  # Only accessible to the borrower
```

By modeling actions instead of CRUD operations, intent and permissions are clear, reducing both bugs and security risks.

---

## CRUD Alternative: Align to Workflows

Real-world applications follow workflows—sequences of states that a resource moves through. Take our loan application example:

![Loan Application Workflow Diagram](https://cdn.hashnode.com/res/hashnode/image/upload/v1757257665063/f26ce4c4-afee-4b03-8ddc-bdb724aa9850.png)

Here’s what the corresponding API endpoints might look like:

```http
# Borrower actions
POST /applications/123/submit       # Draft → Submitted
POST /applications/123/withdraw     # Draft/Submitted → Closed

# Loan officer actions
POST /applications/123/approve      # Submitted → Approved
POST /applications/123/reject       # Submitted → Rejected

# System/Admin actions
POST /applications/123/close        # Approved/Rejected → Closed

# Side effect: spawning a Loan (after Approved)
POST /loans
{
  "applicationId": "123",
  "amount": 50000,
  "borrowerId": "456",
  "terms": { ... }
}
```

At this point, our API calls are almost entirely outside the CRUD pattern—the only one that resembles a CRUD action is the spawning of a loan, which looks like a “create”. Behind the scenes, we’ll still use `INSERT`, `SELECT`, and `UPDATE` statements in SQL, but at the API level we’re aligning to the actual business workflow. Because of it, we’re able to easily support the following:

1. **Actions reflect business intent** — each API call maps to a real-world task like submit, approve, or withdraw.
2. **Built-in authorization** — endpoints clearly separate borrower, loan officer, and admin responsibilities.
3. **Auditability and workflow enforcement** — state transitions are explicit and invalid transitions are prevented.
4. **Controlled side effects** — spawning loans, notifications, and downstream processes are handled deliberately.

---

## Conclusion

By moving away from CRUD and modeling domain actions instead, our API aligns with real business workflows, clearly communicates intent, and enforces rules and authorization naturally. State transitions, side effects, and auditing become explicit, reducing errors and security risks. While CRUD still powers the underlying database operations, thinking in terms of actions and workflows ensures that the system behaves the way the business expects.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Extend CRUD Operations to Align with Business Workflows",
  "desc": "Most developers are introduced to databases and APIs through a simple pattern: CRUD—Create, Read, Update, Delete. It seems like the perfect abstraction. With just four operations, you can model almost anything. Tutorials use it. Frameworks generate i...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/extend-crud-operations-to-align-with-business-workflows.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
