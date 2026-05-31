---
lang: en-US
title: "How Attribute-Based Access Control Helps You Write Better Authorization Rules"
description: "Article(s) > How Attribute-Based Access Control Helps You Write Better Authorization Rules"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Attribute-Based Access Control Helps You Write Better Authorization Rules"
    - property: og:description
      content: "How Attribute-Based Access Control Helps You Write Better Authorization Rules"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-attribute-based-access-control-helps-you-write-better-authorization-rules.html
prev: /programming/js-express/articles/README.md
date: 2026-06-05
isOriginal: false
author:
  - name: Aiyedogbon Abraham
    url: https://freecodecamp.org/news/author/abrahamaiyedogbon/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1bcd9989-cf38-4375-a0ed-03cf1bd3c3b8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Attribute-Based Access Control Helps You Write Better Authorization Rules"
  desc="Every application that handles user data eventually hits the same problem: not all users should see the same things. A junior nurse should not be able to access every patient record in the hospital. A"
  url="https://freecodecamp.org/news/how-attribute-based-access-control-helps-you-write-better-authorization-rules"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1bcd9989-cf38-4375-a0ed-03cf1bd3c3b8.png"/>

Every application that handles user data eventually hits the same problem: not all users should see the same things.

A junior nurse should not be able to access every patient record in the hospital. A contractor should not be able to read internal financial reports. An employee logged in from an unrecognized device at 2AM probably should not be editing production configuration files.

Simple role-based systems handle obvious cases well. But as applications grow and access rules become more nuanced, those systems start to crack. You end up creating more and more specific roles, like `finance_viewer`, `finance_viewer_us_only`, `finance_viewer_us_only_readonly`, until the roles themselves become unmanageable.

Attribute-Based Access Control (ABAC) was designed to solve exactly this problem. It shifts from "what role does this user have?" to "what do we know about this user, this resource, and this situation?" and makes access decisions based on all of those factors together.

In this guide, you'll learn how ABAC works, how it evolved from earlier access control models, how policies are structured, how to implement it in code, and when to use it.

::: note Prerequisites

To get the most from this article, you should have:

- A basic understanding of web authentication (logins, sessions, tokens)
- Familiarity with how users and resources relate in applications
- Some experience reading JavaScript or pseudocode

No prior knowledge of access control theory is required.

:::

---

## How Access Control Has Evolved

To understand why ABAC exists, it helps to understand what came before it and why each generation fell short.

### Discretionary and Mandatory Access Control

Early access control models emerged from Department of Defense applications in the 1960s and 1970s. According to NIST Special Publication 800-162, these were Discretionary Access Control (DAC) and Mandatory Access Control (MAC).

In DAC, the owner of a resource decides who can access it. Think of a file on your computer where you choose who can read or edit it. In MAC, access is governed by a central authority using labels like "Classified" or "Top Secret." The system enforces these labels, not individual owners.

Both worked for their original purposes but didn't scale well to the complexity of modern networked systems.

### Identity-Based Access Control and Access Control Lists

As networks grew, identity-based access control (IBAC) became common. The most familiar implementation is the Access Control List (ACL), a list of users or groups attached to a resource, specifying what each can do.

ACLs are simple and transparent, but they create a management burden as systems grow. Every new user needs to be added to every relevant list. Every permission change means hunting through lists across multiple resources. And when someone leaves the organization, you need to find and remove them everywhere.

Failure to do this consistently leads to users accumulating privileges they should no longer have.

### Role-Based Access Control

Role-Based Access Control (RBAC) was a major step forward. Instead of assigning permissions directly to users, RBAC assigns them to roles. Users are then assigned roles. A hospital might have roles like `nurse`, `doctor`, `admin`, and `billing_staff`, each with different permissions.

This made administration much more manageable. Adding a new employee means assigning them appropriate roles. Removing an employee means removing their roles. Changing what nurses can do means updating the nurse role once.

RBAC became widely adopted and is still the right choice for many applications. But it has a structural weakness: as permission requirements become more granular, you have to create more specific roles. A nurse who can only see patients on their floor, only during their shift, or only for certain record types, needs a very specific role, or a combination of roles that interacts in complicated ways.

This proliferation is called "role explosion." The roles multiply until they are as difficult to manage as the individual permissions RBAC was supposed to replace.

### Attribute-Based Access Control

ABAC emerged as a response to role explosion. Instead of assigning roles that bundle fixed permissions, ABAC evaluates the actual characteristics of the user, the resource, and the context at the moment of every access request.

A nurse gets access to a patient record not because they have the `nurse` role, but because their job title is "Nurse Practitioner," the patient is on their assigned floor, it's currently their shift, and the record type is within their scope of care. Change any of those facts, and the access decision changes accordingly.

As NIST SP 800-162 defines it, ABAC is:

> "an access control method where subject requests to perform operations on objects are granted or denied based on assigned attributes of the subject, assigned attributes of the object, environment conditions, and a set of policies that are specified in terms of those attributes and conditions."

---

## What is Attribute-Based Access Control?

ABAC is a logical access control model where every access decision is made by evaluating a set of rules against the current values of attributes. Nothing is pre-computed or cached in role assignments. Every time a user tries to do something, the system asks: given what we know about this user, this resource, and this moment, should this be allowed?

This makes ABAC highly precise and highly dynamic. Permissions don't accumulate over time. They don't need manual cleanup when someone's role changes. The system simply evaluates the current state of attributes every time.

The model is formally described in NIST's guide to ABAC as being capable of enforcing both Discretionary Access Control and Mandatory Access Control concepts, making it more expressive than models that only support one or the other.

Companies like Axiomatics, major government agencies, and large enterprises managing cross-organizational data sharing all rely on ABAC for its ability to scale security policies across complex environments.

---

## The Four Building Blocks of ABAC

Every ABAC system is built from four types of information. Understanding these clearly is the key to understanding how ABAC works.

### 1. Subject Attributes

The subject is whoever or whatever is requesting access. This is usually a user, but it can also be a service, an application, or an automated system, what NIST calls a Non-Person Entity (NPE).

Subject attributes describe who the subject is:

```plaintext
user.jobTitle         = "Nurse Practitioner"
user.department       = "Cardiology"
user.clearanceLevel   = "Confidential"
user.employmentStatus = "Active"
user.location         = "Floor 3"
user.shiftActive      = true
```

These attributes are typically sourced from an identity provider, HR system, or user directory. They're facts about the user that can be used in policies.

### 2. Object Attributes (Resource Attributes)

The object is whatever the subject is trying to access. This could be a file, a database record, an API endpoint, a service, or any other protected resource.

Object attributes describe what the resource is:

```plaintext
record.type           = "PatientMedical"
record.floor          = "Floor 3"
record.sensitivity    = "High"
record.owner          = "Dr. Williams"
record.department     = "Cardiology"
```

Object attributes are typically assigned when a resource is created and updated throughout its lifecycle. They're facts about the resource that determine who should be able to access it.

### 3. Action Attributes

The action is what the subject is trying to do to the object. Common actions include read, write, edit, delete, copy, execute, and share.

In many ABAC implementations, the action itself has attributes:

```plaintext
action.type           = "read"
action.bulk           = false
```

Policies can restrict which actions are allowed independently of the other attributes. A user might be able to read a document but not delete it, even if all their other attributes match.

### 4. Environment Conditions

Environment conditions are contextual factors that don't belong to either the subject or the object, but that should influence the access decision. NIST describes these as "dynamic factors, independent of subject and object, that may be used as attributes at decision time to influence an access decision."

Examples include:

```plaintext
environment.time           = "14:30"
environment.dayOfWeek      = "Wednesday"
environment.userLocation   = "Corporate Office"
environment.ipAddress      = "192.168.1.10"
environment.deviceStatus   = "compliant"
environment.threatLevel    = "low"
```

Environment conditions are what make ABAC truly dynamic. The same user, the same resource, and the same action might be allowed during business hours on a trusted device but denied at midnight from an unknown IP address.

---

## How an ABAC Decision is Made

When a subject tries to perform an action on an object, the ABAC system runs through a specific process:

### Step 1: Collect Attributes

The system gathers current attributes for the subject, object, action, and environment. This might involve querying a user directory, reading resource metadata, and checking current time and location.

### Step 2: Find Applicable Policies

The system identifies which policies apply to this particular request. A request to read a patient record might have several policies that apply: one about clinical staff access, one about after-hours access, and one about record sensitivity levels.

### Step 3: Evaluate Each Policy

Each applicable policy evaluates the collected attributes and returns permit or deny.

### Step 4: Reconcile Conflicts

If multiple policies apply and they conflict, the system uses predefined combining rules. Common approaches are "deny overrides" (if any policy says deny, the request is denied) or "permit overrides" (if any policy says permit, the request is permitted).

### Step 5: Enforce the Decision

The system grants or denies access based on the final decision.

This process happens every time an access request is made. There's no caching of role assignments or pre-computed permission tables. The decision reflects the current state of all attributes at the moment of the request.

---

## How to Write ABAC Policies

Policies are the logic at the heart of ABAC. They're written as conditional rules that reference attributes. A well-written policy reads like a business rule, because that's exactly what it is.

### Simple Boolean Policy

The most basic form evaluates whether certain attributes match:

```js
// Policy: Only active employees can access internal resources
function canAccessInternalResource(user) {
  return user.employmentStatus === "Active";
}
```

::: info What this does

Checks a single attribute, employment status, before allowing access. Any inactive, suspended, or terminated user is denied, regardless of their roles or past access history.

:::

### Multi-Attribute Policy

Real policies typically combine multiple attributes:

```js
// Policy: A nurse can read a patient record
// if the patient is on their assigned floor
// and during their active shift

function canReadPatientRecord(user, record, environment) {
  const isNurse = user.jobTitle === "Nurse Practitioner";
  const isAssignedFloor = user.assignedFloor === record.floor;
  const isActiveDuty = user.shiftActive === true;

  return isNurse && isAssignedFloor && isActiveDuty;
}
```

::: info What this does

Combines three conditions using AND logic. All three must be true for access to be granted. Change the nurse's floor assignment, and they immediately lose access to records on the previous floor, without any manual intervention.

:::

### Environment-Aware Policy

Adding environment conditions makes policies context-sensitive:

```js
// Policy: Users can only access sensitive financial records
// during business hours from the corporate network

function canAccessSensitiveFinancialRecord(user, record, environment) {
  const isFinanceStaff = user.department === "Finance";
  const isHighSensitivity = record.sensitivity === "High";
  
  // If this is a high-sensitivity record, apply time and location controls
  if (isHighSensitivity) {
    const currentHour = new Date(environment.timestamp).getHours();
    const isBusinessHours = currentHour >= 9 && currentHour < 17;
    const isCorporateNetwork = environment.ipRange === "corporate";

    return isFinanceStaff && isBusinessHours && isCorporateNetwork;
  }

  // Lower sensitivity records only require finance department membership
  return isFinanceStaff;
}
```

::: info What this does

Applies stricter controls to higher-sensitivity resources. The same user gets access to low-sensitivity records at any time, but high-sensitivity records require them to be on the corporate network during business hours. The policy logic mirrors the actual business rule: sensitive data needs more protection.

:::

### Ownership-Based Policy

ABAC can also implement discretionary ownership rules:

```js
// Policy: A user can edit a document
// if they own it, or if they have editor permissions
// and the document isn't locked

function canEditDocument(user, document, action) {
  const isOwner = document.ownerId === user.id;
  const hasEditorPermission = user.permissions.includes("document.edit");
  const isUnlocked = document.status !== "locked";

  return (isOwner || hasEditorPermission) && isUnlocked;
}
```

::: info What this does

Combines ownership (an attribute of the relationship between user and document) with explicit permissions and resource state. An editor can't edit a locked document even if they have the edit permission. An owner can edit their own documents but not locked ones.

:::

---

## How to Implement ABAC in Code

Let's build a simple ABAC evaluation engine that puts these pieces together.

### Step 1: Define the Attribute Structure

First, define clear data structures for your attributes:

```js
// A user (subject) requesting access
const user = {
  id: "user-123",
  name: "Sarah Chen",
  department: "Cardiology",
  jobTitle: "Nurse Practitioner",
  clearanceLevel: 2,
  assignedFloor: "Floor 3",
  shiftActive: true,
  employmentStatus: "Active"
};

// A resource (object) being accessed
const patientRecord = {
  id: "record-456",
  type: "PatientMedical",
  floor: "Floor 3",
  sensitivity: 2,
  ownerId: "doctor-789",
  department: "Cardiology"
};

// Environment conditions
const environment = {
  timestamp: new Date().toISOString(),
  ipAddress: "10.0.1.25",
  ipRange: "corporate",
  deviceCompliant: true
};
```

### Step 2: Write Policy Functions

Write individual policies as pure functions that take attributes and return boolean values:

```js title="policies/patientRecord.js"
// Policy 1: User must be active and clinical staff
function isClinicalStaff(user) {
  const clinicalTitles = [
    "Nurse Practitioner",
    "Physician",
    "Resident",
    "Medical Assistant"
  ];
  return (
    user.employmentStatus === "Active" &&
    clinicalTitles.includes(user.jobTitle)
  );
}

// Policy 2: Record must be within the user's assigned area
function isAssignedToRecord(user, record) {
  return (
    user.department === record.department &&
    user.assignedFloor === record.floor
  );
}

// Policy 3: User must be on active shift
function isOnActiveShift(user) {
  return user.shiftActive === true;
}

// Policy 4: High-sensitivity records require compliant devices
function meetsDeviceRequirements(record, environment) {
  if (record.sensitivity >= 3) {
    return environment.deviceCompliant === true;
  }
  return true; // No device requirement for lower sensitivity
}
```

::: info What this does

Each policy is a small, focused function. This makes policies easy to test individually, easy to read, and easy to reuse across different access decisions. A policy for "is this user clinical staff" can be applied to many different resource types.

:::

### Step 3: Build an Evaluation Engine

Combine your policies into a decision engine:

```js title="abac/engine.js"
function evaluateAccess(user, resource, action, environment, policies) {
  // Collect all policy results
  const results = policies.map(policy => {
    try {
      return policy(user, resource, action, environment);
    } catch (error) {
      console.error(`Policy evaluation error: ${error.message}`);
      return false; // Fail closed: deny on error
    }
  });

  // Deny-overrides: if any policy denies, access is denied
  return results.every(result => result === true);
}

// Assemble policies for reading patient records
const readPatientRecordPolicies = [
  (user) => isClinicalStaff(user),
  (user, record) => isAssignedToRecord(user, record),
  (user) => isOnActiveShift(user),
  (user, record, action, environment) => meetsDeviceRequirements(record, environment)
];

// Make an access decision
const canRead = evaluateAccess(
  user,
  patientRecord,
  "read",
  environment,
  readPatientRecordPolicies
);

console.log(`Access ${canRead ? "granted" : "denied"}`);
// → Access granted (all conditions met)
```

::: info What this does

The engine loops through each policy function, passing in the relevant attributes. If all policies return true, access is granted. If any returns false, access is denied. This is called "deny-overrides combining". The `try-catch` ensures that if a policy throws an error, access is denied rather than granted, following the security principle of fail-closed.

:::

### Step 4: Add Attribute Collection

In a real application, attributes come from multiple sources:

```js title="attributes/collector.js"
async function collectAttributes(userId, resourceId) {
  // Collect in parallel for performance
  const [user, resource, environment] = await Promise.all([
    fetchUserAttributes(userId),      // From identity provider or HR system
    fetchResourceAttributes(resourceId), // From resource metadata store
    collectEnvironmentConditions()    // Time, IP, device status
  ]);

  return { user, resource, environment };
}

async function fetchUserAttributes(userId) {
  // This would query your user directory, LDAP, or identity provider
  const user = await userDirectory.findById(userId);
  const shift = await shiftService.getActiveShift(userId);
  
  return {
    ...user,
    shiftActive: shift !== null,
    assignedFloor: shift?.floor || null
  };
}

async function collectEnvironmentConditions() {
  return {
    timestamp: new Date().toISOString(),
    ipAddress: request.ip,
    ipRange: await networkService.classifyIP(request.ip),
    deviceCompliant: await deviceService.checkCompliance(request.deviceId)
  };
}
```

::: info What this does

Attribute collection is separated from policy evaluation. This is an important design decision: it means you can test policies with any attribute values without needing real users or resources. It also means you can swap out the source of attributes (say, moving from an on-premise directory to a cloud identity provider) without changing your policies.

:::

### Step 5: Integrate with Your API

Use the evaluation engine in your API handlers:

```js title="middleware/abac.js"
function requireAccess(action, resourceType) {
  return async (req, res, next) => {
    try {
      const { user, resource, environment } = await collectAttributes(
        req.user.id,
        req.params.id
      );

      const policies = getPoliciesFor(resourceType, action);
      const allowed = evaluateAccess(user, resource, action, environment, policies);

      if (!allowed) {
        // Log the denial for audit purposes
        auditLog.record({
          userId: req.user.id,
          resourceId: req.params.id,
          action,
          decision: "denied",
          timestamp: new Date()
        });

        return res.status(403).json({ error: "Access denied" });
      }

      next();
    } catch (error) {
      // Fail closed: deny access on unexpected errors
      return res.status(403).json({ error: "Access denied" });
    }
  };
}

// Use in route definitions
app.get(
  "/patient-records/:id",
  authenticate(),                               // First verify identity
  requireAccess("read", "patientRecord"),       // Then evaluate ABAC
  patientRecordController.getById               // Then handle the request
);
```

::: info What this does

The ABAC check lives in middleware that runs between authentication and the route handler. Authentication establishes who the user is. ABAC decides whether that user can do what they're trying to do. This separation keeps authorization logic out of your business logic.

:::

---

## ABAC vs RBAC: When to Use Which

RBAC isn't obsolete. It's genuinely the right choice for many applications. The question is which model fits your specific access requirements.

### RBAC Strengths

RBAC is simple to understand, simple to implement, and simple to audit. If you can describe your access requirements as a list of roles with fixed permissions, RBAC works well. Most SaaS applications start with RBAC and it serves them fine for years.

A typical RBAC check looks like:

```js
// Simple RBAC: does the user have the required role?
function canAccess(user, requiredRole) {
  return user.roles.includes(requiredRole);
}
```

It's fast, clear, and easy to debug. When something goes wrong, you check which roles the user has and which roles the resource requires.

### Where RBAC Breaks Down

RBAC struggles when permissions need to depend on factors that aren't captured by a role. If you need to express "finance managers can view financial records, but only for their own region, and only during business hours," you're outside what a role alone can express cleanly.

You either need an extremely specific role (`finance_manager_us_east_business_hours`) that creates the role explosion problem, or you add conditional logic to your application code that effectively recreates ABAC, just in a less organized way.

### RBAC vs ABAC Comparison

| Factor | RBAC | ABAC |
| --- | --- | --- |
| Logic | Permissions assigned to roles, roles assigned to users | Policies evaluate attributes at decision time |
| Granularity | Coarse-grained | Fine-grained and context-aware |
| Flexibility | Low, new rules require new roles | High, update policies without changing roles |
| Scalability | Role explosion under complexity | Scales with policy complexity, not role count |
| Auditability | Simple, check role assignments | Requires logging attributes at decision time |
| Complexity | Low | Higher, more moving parts |
| Best for | Simple, stable permission structures | Complex, dynamic, or context-dependent permissions |

### Combining Both Models

RBAC and ABAC work well together. A common pattern is to use RBAC for coarse-grained access control (which sections of your application can this user see?) and ABAC for fine-grained control within those sections (which specific records can they access?).

For example, a role might grant access to the patient records section of a hospital system. Within that section, ABAC policies determine which specific records a user can view or edit based on their department, assigned floor, and active shift.

---

## Real-World Use Cases

### Healthcare Records Management

Healthcare is one of the clearest examples of why ABAC matters. Patient privacy regulations require precise access control, and patient care requires that the right staff can access records quickly when they need them.

An ABAC policy in a hospital might allow a nurse to view a patient's record only when:

1. the patient is currently admitted to the nurse's assigned floor,
2. the nurse is on an active shift,
3. the access occurs from within the hospital network,
4. and the record type is within the nurse's care scope.

According to WorkOS's ABAC analysis, in emergency situations ABAC systems can automatically expand access rights. For example, an ER doctor automatically gains broader access to patient records to provide immediate care, with this access being time-bound and closely monitored.

All of these rules would require dozens of roles in an RBAC system, and those roles would still struggle to handle the emergency access scenario dynamically.

### Corporate Data Access

Large enterprises typically have employees across departments, roles, locations, and clearance levels who need different views of the same underlying data. A document might be accessible to finance managers in the US region during business hours, accessible to executives globally at any time, but inaccessible to contractors entirely.

ABAC expresses all of these rules in policies. As employees change departments, go on leave, or change roles, their attributes update in the identity system and their access changes automatically, with no manual ACL updates required.

### Government and Classified Information

The US federal government's adoption of ABAC is described in NIST SP 800-162, which was developed to address the Federal Identity, Credential, and Access Management (FICAM) requirements. Federal agencies deal with information shared across organizational boundaries, with varying classification levels and need-to-know requirements.

ABAC allows an analyst in one agency to access information from another agency without requiring the second agency to pre-provision an account for them. The analyst's clearance attributes, organizational affiliation, and project assignments are evaluated against the resource's classification and access rules at the time of the request.

### Multi-Tenant SaaS Applications

SaaS applications that serve multiple organizations need to ensure strict data isolation between tenants while supporting complex permission structures within each tenant.

ABAC handles this naturally. A resource attribute like `record.tenantId` is evaluated against the user attribute `user.tenantId`, and no cross-tenant access is possible through policy. Within a tenant, ABAC supports as much complexity as the tenant's policies require.

---

## Enterprise ABAC Considerations

Deploying ABAC at enterprise scale introduces several challenges that don't exist in smaller implementations.

### Policy Administration

Policies need to be authored, reviewed, tested, and deployed. According to NIST SP 800-162, this requires a Policy Administration Point (PAP), an interface for creating and managing policies. Without proper tooling, policies become difficult to audit and maintain.

In practice, this means treating policies like code: version control, code review, and automated testing.

### Attribute Quality and Freshness

ABAC is only as good as the attributes it evaluates. If user attributes are stale, for example, for a user who changed departments but whose directory entry hasn't been updated, the access decisions will be wrong.

NIST warns that "attributes that are not refreshed as often will ultimately be less secure than attributes that are refreshed in real time." Building reliable attribute pipelines from authoritative sources is often the hardest part of ABAC deployment.

### Performance

Evaluating policies on every request has a performance cost. Each evaluation may require fetching attributes from multiple sources. To manage this, many implementations use attribute caching, but caching introduces the staleness problem described above.

The solution is to cache with appropriate TTLs (time-to-live values) based on how quickly each attribute type can change. A user's department changes rarely and can be cached for hours. A user's active shift status might change every 8 hours and needs a shorter cache. Real-time location might not be cacheable at all.

### Audit Logging

Because ABAC makes decisions dynamically, auditing requires logging the attributes used in each decision, not just the decision itself. A log entry that says "access denied" is only useful if it also captures why access was denied and which attributes failed to satisfy which policies.

NIST notes that without tracking attribute values at decision time, accountability requirements can't be met.

---

## Limitations and Challenges

ABAC is powerful, but it's not the right solution for every access control problem. It's worth being honest about its limitations before committing to an implementation.

**Complexity**: According to NIST SP 800-162, "an ABAC system is more complicated, and therefore more costly to implement and maintain, than simpler access control systems." The flexibility that makes ABAC powerful also makes it harder to reason about. A user asking "why can't I access this?" requires examining all the attributes that were evaluated and which conditions weren't met.

**Policy Conflicts**: In complex systems with many policies, conflicts between policies can occur. Two policies might individually seem correct but together produce unexpected results. Resolving these conflicts requires clear precedence rules and careful policy design.

**Attribute Management Overhead**: Maintaining accurate attributes across large user populations requires investment in identity infrastructure. Attributes from different systems need to be normalized, validated, and kept synchronized. As NIST describes it, organizations need an entire attribute management infrastructure, not just a policy engine.

**Testing is Hard**: Because access depends on the combination of potentially dozens of attributes, testing edge cases comprehensively requires thought. A policy that works correctly for typical cases might behave unexpectedly for unusual attribute combinations.

**Not Always Worth the Investment**: For applications with straightforward access requirements, ABAC introduces unnecessary complexity. If your needs can be expressed cleanly as a set of roles with fixed permissions, RBAC is the better choice.

---

## Conclusion

Attribute-Based Access Control represents a genuine evolution in how applications manage authorization. Rather than maintaining ever-growing lists of roles and permissions, ABAC evaluates the actual characteristics of users, resources, and context at the moment of every request.

It solves the role explosion problem that plagues complex RBAC implementations. It enables access rules that reflect real business policies rather than technical approximations of them. It handles dynamic scenarios, emergencies, time-based restrictions, and cross-organizational access that are difficult or impossible to express with static roles.

But ABAC isn't universally better. It's more complex to build, harder to debug, and requires investment in attribute management infrastructure that simpler models don't need. Many applications are well-served by RBAC, and some use RBAC and ABAC together.

The right question isn't "should I use ABAC?" It's "are my access requirements complex enough that the investment in ABAC pays off?" If your access rules change frequently, depend on resource or environment context, or need to scale across organizational boundaries, ABAC is worth serious consideration.

Start by identifying where your current access control model is breaking down. If you're creating roles to represent every edge case, if you're writing conditional logic inside route handlers that checks specific attribute values, or if users are accumulating permissions they should no longer have, those are signals that a more expressive model would help.

ABAC is the tool for when roles aren't enough.

---

## Glossary

**ABAC (Attribute-Based Access Control)**: An access control method where authorization decisions are made by evaluating policies against the attributes of subjects, objects, actions, and environment conditions. Defined by NIST as the approach where "subject requests to perform operations on objects are granted or denied based on assigned attributes."

**Subject**: The entity requesting access to a resource. Usually a human user, but can also be a service, automated process, or device. Also called the "requestor."

**Object**: The resource being protected, such as a file, database record, API endpoint, service, or any system resource whose access is managed by the ABAC system.

**Attribute**: A characteristic of a subject, object, action, or environment expressed as a name-value pair. For example, `user.department = "Finance"` or `record.sensitivity = "High"`.

**Subject Attributes**: Properties describing the user or service making the request, such as job title, department, clearance level, or current location.

**Object Attributes**: Properties describing the resource being accessed, such as its type, owner, sensitivity level, or department.

**Environment Conditions**: Contextual factors independent of both subject and object that influence access decisions. Examples include time of day, day of week, IP address, device compliance status, or current threat level.

**Policy**: A rule or set of rules that evaluates attribute values to determine whether a specific access request should be permitted or denied. ABAC policies are typically written as logical conditions.

**Policy Decision Point (PDP)**: The component of an ABAC system that evaluates policies and attributes to compute an access decision.

**Policy Enforcement Point (PEP)**: The component that intercepts access requests and enforces the decisions made by the PDP.

**Policy Information Point (PIP)**: The component that retrieves attribute values needed by the PDP to make decisions.

**Policy Administration Point (PAP)**: The component that provides an interface for creating, testing, and managing policies.

**RBAC (Role-Based Access Control)**: An access control model that assigns permissions to roles and users to roles. Simpler than ABAC but less expressive for complex, dynamic access requirements.

**Role Explosion**: The proliferation of increasingly specific roles in an RBAC system as access requirements become more granular, eventually making the roles as difficult to manage as individual permissions.

**DAC (Discretionary Access Control)**: An access control model where resource owners control who can access their resources. Common in file systems.

**MAC (Mandatory Access Control)**: An access control model where access is governed by a central authority using classification labels, independent of resource owner preferences.

**ACL (Access Control List)**: A list associated with a resource that specifies which users or groups have which permissions. Common in identity-based access control systems.

**Non-Person Entity (NPE)**: A subject that is not a human user, such as an automated service, application, or network device, that can request access to resources.

**Attribute Caching**: Storing previously retrieved attribute values to improve performance, at the cost of potentially using stale data for access decisions.

**Deny-Overrides Combining**: A policy combining rule where if any applicable policy returns deny, the overall decision is deny, regardless of other policies that may return permit.

**Fail-Closed**: A security design principle where unexpected errors or missing information result in access being denied rather than granted, reducing the risk of unauthorized access.

::: info Source

Definitions adapted from NIST Special Publication 800-162, Guide to Attribute Based Access Control (ABAC) Definition and Considerations, January 2014 (with updates through August 2019).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Attribute-Based Access Control Helps You Write Better Authorization Rules",
  "desc": "Every application that handles user data eventually hits the same problem: not all users should see the same things. A junior nurse should not be able to access every patient record in the hospital. A",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-attribute-based-access-control-helps-you-write-better-authorization-rules.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
