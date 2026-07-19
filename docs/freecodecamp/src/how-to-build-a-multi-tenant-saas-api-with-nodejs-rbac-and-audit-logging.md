---
lang: en-US
title: "How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging"
description: "Article(s) > How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
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
  - devops
  - docker
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging"
    - property: og:description
      content: "How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-multi-tenant-saas-api-with-nodejs-rbac-and-audit-logging.html
prev: /programming/js-express/articles/README.md
date: 2026-07-21
isOriginal: false
author:
  - name: Zia Ullah
    url: https://freecodecamp.org/news/author/ziaullahzia/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/69793fe0-fe0e-4c9c-839d-12a134f65287.png
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

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging"
  desc="A colleague asked me to help debug what looked like a permissions issue in their SaaS project management tool. Users were seeing resources they hadn't created. I pulled up the query logs expecting som"
  url="https://freecodecamp.org/news/how-to-build-a-multi-tenant-saas-api-with-nodejs-rbac-and-audit-logging"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/69793fe0-fe0e-4c9c-839d-12a134f65287.png"/>

A colleague asked me to help debug what looked like a permissions issue in their SaaS project management tool. Users were seeing resources they hadn't created.

I pulled up the query logs expecting something subtle. It was not. The list endpoint had no `tenant_id` filter at all. Every tenant in the database could read every other tenant's projects. The application never threw an error. It just returned whatever was there.

Missing tenant filters don't throw errors. They return the wrong data without any complaint, and nothing in your logs will flag it. I've seen this run in production for weeks before a support ticket pointed anyone at the query logs.

When it does surface, who finds it first matters a lot. A customer noticing it is bad. A compliance auditor noticing it during a SOC 2 review is a different kind of problem.

Isolation built in from the start is a day of work. The time I spent helping a team retrofit it after a compliance review was considerably longer than that, and involved more customer emails than anyone wanted to write.

The stack is Node.js with PostgreSQL. CRUD is the easy part. Tenant isolation, RBAC, and audit logging take more care, and where those checks run in the stack matters. I put all three in middleware, before any route handler fires. A handler that never calls the isolation logic directly can't accidentally skip it.

::: note Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Basic knowledge of Express.js and JWT

:::

::: info What We Will Build

A multi-tenant Express REST API that enforces:

1. **Tenant isolation:** every database query scopes to the `tenant_id` from the verified JWT. The client can't influence which tenant the query runs against.
2. **RBAC:** four roles, each with a numeric level (SuperAdmin is highest, Viewer lowest). Middleware checks the level before the handler runs.
3. **Audit logging:** any write or sensitive read appends a row to the audit table. The app can't modify those rows afterward. The database enforces this directly. If a bug in the app tries to UPDATE an audit row, the database refuses it. Application-level enforcement alone can't give you that guarantee.
4. **Per-tenant rate limiting:** request counts in Redis, keyed to the tenant. I've seen IP-based limiting break an enterprise rollout when fifty users came through a single corporate proxy.
5. **Tenant isolation tests:** a dedicated test file that proves cross-tenant data can't leak. Wire it into CI and it catches broken isolation before it ships.

:::

---

## How Multi-Tenancy Works

This tutorial uses a **shared database with row-level isolation**: a `tenant_id` column on every table, a filter on every query. The database holds everyone's data together. The application decides what each tenant can see.

Two other approaches exist: schema-per-tenant and database-per-tenant. I've talked to teams on schema-per-tenant who ended up spending more engineering time on migration tooling than on their actual product. Database-per-tenant gives stronger guarantees but a connection pool that balloons with every new customer signup.

Neither scales cheaply. Row-level isolation scales further than most teams expect. The ones I know who moved off it did so years in, usually under specific regulatory pressure, not because the approach stopped working.

The one thing in this design that can't be optional: `tenant_id` **must always come from the verified JWT.** Not from the request body, not from the URL. Users control what they put in both of those. They don't control what gets signed into a JWT on your server.

---

## Architecture Overview

```plaintext
HTTP Request
     │
     ▼
┌─────────────────────────────────────────┐
│           Express Middleware Stack       │
│                                         │
│  1. Rate Limiter (per tenant_id)        │
│  2. Auth Middleware (verify JWT)        │
│     └─► Extracts: userId, tenantId,    │
│          role, permissions              │
│  3. RBAC Middleware (check role)        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│           Route Handler                  │
│                                         │
│  1. Call Repository (tenant-safe query) │
│  2. Call Audit Service (fire & forget)  │
│  3. Return response                     │
└──────────────┬──────────────────────────┘
               │
     ┌─────────┴──────────┐
     ▼                    ▼
┌─────────┐        ┌────────────┐
│ Projects│        │ Audit Logs │
│  Table  │        │   Table    │
│(+tenant)│        │(append only│
└─────────┘        └────────────┘
```
<!-- TODO: mermaid화 -->

Rate limiting, auth, and RBAC all run before any handler sees the request. Writes pass through the audit service. The repository takes `tenantId` from `req.user` and the handler never touches tenant scoping directly, so there's no path around it.

---

## Database Schema Design

```sql :collapsed-lines
-- Tenants table
CREATE TABLE tenants (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  plan        VARCHAR(50) NOT NULL DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email       VARCHAR(255) NOT NULL,
  role        VARCHAR(50) NOT NULL DEFAULT 'Member', -- 'SuperAdmin','TenantAdmin','Member','Viewer'
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(tenant_id, email)
);

CREATE INDEX idx_users_tenant ON users(tenant_id);

-- Projects table (example resource — replace with your domain entity)
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  description TEXT,
  created_by  UUID NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_tenant ON projects(tenant_id);

-- Audit log table (append-only — never UPDATE or DELETE rows here)
CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id   UUID NOT NULL,
  user_id     UUID NOT NULL,
  user_email  TEXT NOT NULL,
  user_role   TEXT NOT NULL,        -- role at time of action
  action      TEXT NOT NULL,        -- 'CREATE', 'UPDATE', 'DELETE', 'VIEW'
  resource    TEXT NOT NULL,        -- table name
  resource_id TEXT,
  old_values  JSONB,
  new_values  JSONB,
  ip_address  INET,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);

-- Protect audit log at database level
-- Use a DO block so this runs safely in Docker where app_user is the superuser
DO $$
BEGIN
  IF current_user <> 'app_user' THEN
    REVOKE DELETE, UPDATE ON audit_logs FROM app_user;
  END IF;
END $$;
```

The `REVOKE` matters. Application bugs happen. If something in your codebase accidentally tries to UPDATE an audit row, you want the database to refuse it outright, not silently comply.

---

## Project Setup

```sh
mkdir nodejs-multitenant-saas-api
cd nodejs-multitenant-saas-api
npm init -y
npm install express pg jsonwebtoken bcryptjs express-rate-limit rate-limit-redis ioredis dotenv
npm install --save-dev jest supertest
```

### Starting PostgreSQL and Redis with Docker

Skip the local installs. One <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` in the project root brings up both PostgreSQL and Redis:

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: saas_api
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: app_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./schema.sql:/docker-entrypoint-initdb.d/01_schema.sql

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

That `schema.sql` mount runs your SQL automatically when the container first starts. No psql required.

```sh
docker compose up -d
```

<VPIcon icon="iconfont icon-dotenv"/>`.env` in the project root:

```sh title=".env"
DATABASE_URL=postgresql://app_user:app_password@localhost:5432/saas_api
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_random_secret_here
PORT=3000
NODE_ENV=development
```

Don't type a `JWT_SECRET` by hand. Run this to generate one:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

File structure:

```sh title="file structure"
nodejs-multitenant-saas-api/
├── src/
│   ├── middleware/
│   │   ├── auth.js          # JWT verification + tenant extraction
│   │   ├── rbac.js          # Role enforcement
│   │   └── rateLimiter.js   # Per-tenant rate limiting
│   ├── services/
│   │   └── auditService.js  # Append-only audit logger
│   ├── repositories/
│   │   └── projectRepo.js   # Tenant-safe DB queries
│   ├── routes/
│   │   └── projects.js      # Route handlers
│   └── utils/
│       └── token.js         # JWT token generation
├── db/
│   ├── index.js             # PostgreSQL pool
│   └── redis.js             # Redis client
├── docker-compose.yml
├── app.js
├── server.js
└── tests/
    └── tenantIsolation.test.js
```

### Boilerplate Files

There are four files the tutorial doesn't cover in detail, but the test file needs all of them to run:

```js title="db/index.js"
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('error', (err) => console.error('PostgreSQL error:', err.message));

module.exports = { pool };
```

```js title="db/redis.js"
const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on('error', (err) => console.error('Redis error:', err.message));

module.exports = { redisClient };
```

```js title="app.js"
require('dotenv').config();
const express = require('express');
const projectsRouter = require('./src/routes/projects');

const app = express();
app.use(express.json());

app.use('/api/projects', projectsRouter);

// Global error handler — must have 4 parameters to be recognised by Express
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
```

```js title="server.js"
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

`bcryptjs` is included for a login endpoint with proper password hashing. That part isn't covered here, but the GitHub repo has a working `/api/auth/login` example.

---

## JWT Design for Multi-Tenancy

Both `tenantId` and `role` go into the JWT payload. Everything downstream reads from these two fields. Get them wrong, and nothing behaves correctly.

```json
// Example JWT payload
{
  "userId": "usr_abc123",
  "tenantId": "ten_xyz789",
  "email": "alice@acme.com",
  "role": "TenantAdmin",
  "iat": 1720000000,
  "exp": 1720086400
}
```

The roles in order of privilege:

- **SuperAdmin:** cross-tenant access for your internal team only
- **TenantAdmin:** full access within their tenant
- **Member:** read and write within their tenant
- **Viewer:** read-only within their tenant

Generate a token (used for testing and your auth endpoint):

```js title="src/utils/token.js"
const jwt = require('jsonwebtoken');

function generateToken({ userId, tenantId, email, role }) {
  return jwt.sign(
    { userId, tenantId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

module.exports = { generateToken };
```

---

## Auth and RBAC Middleware

The auth middleware does two things: verifies the JWT signature and extracts the tenant context into `req.user`.

That second part is what the entire system depends on. Every query downstream reads `req.user.tenantId`. The client has no say in what that value is. They send a token the server signed, and the server reads back what it put in.

```js title="src/middleware/auth.js"
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // tenantId always comes from the verified token — never req.body or req.params
    req.user = {
      userId:   decoded.userId,
      tenantId: decoded.tenantId,
      email:    decoded.email,
      role:     decoded.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { authMiddleware };
```

The RBAC middleware is separate from auth by design. Auth runs on every route. Role enforcement only applies where a minimum role is required. You pass the allowed roles to `requireRole()` and it compares the user's level against the hierarchy. A Viewer trying to delete something hits the 403 before the handler ever runs.

```js title="src/middleware/rbac.js"
const ROLE_HIERARCHY = {
  SuperAdmin:   4,
  TenantAdmin:  3,
  Member:       2,
  Viewer:       1,
};

// requireRole('TenantAdmin') — user must be TenantAdmin or higher
function requireRole(...roles) {
  return (req, res, next) => {
    const userLevel = ROLE_HIERARCHY[req.user?.role] ?? 0;
    const requiredLevel = Math.min(...roles.map(r => ROLE_HIERARCHY[r] ?? 999));

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        required: roles,
        current: req.user?.role,
      });
    }

    next();
  };
}

module.exports = { requireRole };
```

---

## The Tenant-Safe Repository Layer

Isolation lives here. Every function takes `tenantId` as a required argument, pulled from `req.user` by the handler. There's no way to call these without providing a tenant scope. I've watched teams try to handle this with a URL parameter instead (`GET /api/projects?tenantId=xyz`) and call it isolated. It is not. Any client sends whatever it wants in a query string.

```js :collapsed-lines title="src/repositories/projectRepo.js"
const { pool } = require('../../db');

// List all projects for a tenant — tenantId is ALWAYS from the JWT
async function listProjects(tenantId) {
  const result = await pool.query(
    `SELECT id, name, description, created_by, created_at
     FROM projects
     WHERE tenant_id = $1
     ORDER BY created_at DESC`,
    [tenantId]
  );
  return result.rows;
}

// Get a single project — returns null if it belongs to a different tenant
// NOTE: Returns 404 (not 403) intentionally — don't reveal the resource exists
async function getProject(id, tenantId) {
  const result = await pool.query(
    `SELECT id, name, description, created_by, created_at
     FROM projects
     WHERE id = $1 AND tenant_id = $2`,
    [id, tenantId]
  );
  return result.rows[0] || null;
}

async function createProject({ tenantId, name, description, createdBy }) {
  const result = await pool.query(
    `INSERT INTO projects (tenant_id, name, description, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [tenantId, name, description, createdBy]
  );
  return result.rows[0];
}

async function updateProject(id, tenantId, updates) {
  const result = await pool.query(
    `UPDATE projects
     SET name = COALESCE($3, name),
         description = COALESCE($4, description),
         updated_at = NOW()
     WHERE id = $1 AND tenant_id = $2
     RETURNING *`,
    [id, tenantId, updates.name, updates.description]
  );
  return result.rows[0] || null;
}

async function deleteProject(id, tenantId) {
  const result = await pool.query(
    `DELETE FROM projects WHERE id = $1 AND tenant_id = $2 RETURNING id`,
    [id, tenantId]
  );
  return result.rows[0] || null;
}

module.exports = { listProjects, getProject, createProject, updateProject, deleteProject };
```

Notice what `getProject` does when Tenant A tries to fetch a Tenant B resource. The query runs with Tenant A's `tenantId`. The condition `id = $1 AND tenant_id = $2` matches nothing, `null` comes back, and the handler sends a `404`. Not a `403`. A 403 tells the caller the resource exists, but they can't access it, which is information they shouldn't have.

---

## Audit Logging Service

```js title="src/services/auditService.js"
const { pool } = require('../../db');

async function log({
  tenantId,
  userId,
  userEmail,
  userRole,          // role at time of action — roles change, log should not
  action,            // 'CREATE' | 'UPDATE' | 'DELETE' | 'VIEW'
  resource,          // table name
  resourceId = null,
  oldValues = null,
  newValues = null,
  ipAddress = null,
  userAgent = null,
}) {
  const query = `
    INSERT INTO audit_logs
      (tenant_id, user_id, user_email, user_role, action, resource,
       resource_id, old_values, new_values, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `;

  const values = [
    tenantId, userId, userEmail, userRole, action, resource,
    resourceId,
    oldValues  ? JSON.stringify(oldValues)  : null,
    newValues  ? JSON.stringify(newValues)  : null,
    ipAddress,
    userAgent,
  ];

  // Fire-and-forget — audit logging must never block or fail a user request
  pool.query(query, values).catch((err) => {
    console.error('[AuditService] Failed to write log:', err.message);
  });
}

module.exports = { log };
```

Capturing `userRole` at write time matters more than it looks. User roles change after the fact: someone gets demoted, a permission is revoked. If the log only records the user ID, you lose the context of what privilege they held when the action happened. Store the role at the time of the action, and you always know.

---

## Per-Tenant Rate Limiting

IP-based rate limiting breaks down in SaaS. A corporate customer might route hundreds of users through a single NAT gateway, sharing one IP address. One heavy tenant throttles everyone else on that address.

I've watched teams discover this the hard way when an enterprise customer suddenly floods the API, and their other tenants start getting 429s with no explanation. Scope limits to `tenant_id` instead.

```js title="src/middleware/rateLimiter.js"
const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { redisClient } = require('../../db/redis');

// Rate limits by plan — extend as needed
const PLAN_LIMITS = {
  free:       { max: 100,  windowMs: 15 * 60 * 1000 }, // 100 req / 15 min
  pro:        { max: 500,  windowMs: 15 * 60 * 1000 }, // 500 req / 15 min
  enterprise: { max: 2000, windowMs: 15 * 60 * 1000 }, // 2000 req / 15 min
};

function createTenantRateLimiter(plan = 'free') {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;

  return rateLimit({
    windowMs: limits.windowMs,
    max: limits.max,
    // Key = tenant_id from verified JWT — NOT the IP address
    keyGenerator: (req) => `tenant:${req.user?.tenantId || req.ip}`,
    store: new RedisStore({
      sendCommand: (...args) => redisClient.call(...args),
    }),
    handler: (req, res) => {
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil(limits.windowMs / 1000),
      });
    },
  });
}

// Default limiter for all API routes
const defaultLimiter = createTenantRateLimiter('free');

module.exports = { defaultLimiter, createTenantRateLimiter };
```

---

## Building the Routes

This is where everything connects. Auth and rate limiting apply to the whole router. Role checks go on individual routes. The audit log fires after every write. `tenantId` never comes from the request body or URL. `req.user.tenantId` is the only source, set by the auth middleware from the verified token, so there's no path around it.

One practical detail for Express 4: it doesn't catch async errors automatically. Every handler wraps its logic in try/catch and passes failures to `next(err)`. Skip that and an unhandled promise rejection returns a blank 500 with no log entry and no audit trail. The comment at the top of the router is a reminder that the pattern is intentional.

```js :collapsed-lines title="src/routes/projects.js"
const express = require('express');
const { authMiddleware }  = require('../middleware/auth');
const { requireRole }     = require('../middleware/rbac');
const { defaultLimiter }  = require('../middleware/rateLimiter');
const audit               = require('../services/auditService');
const repo                = require('../repositories/projectRepo');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);
router.use(defaultLimiter);

// Express 4 does not catch async errors automatically.
// Every handler must wrap await calls in try/catch and pass errors to next().
// Without this, an unhandled promise rejection silently returns 500
// with no useful message and no audit log entry.

// GET /api/projects — list all (Viewer and above)
router.get('/', async (req, res, next) => {
  try {
    const projects = await repo.listProjects(req.user.tenantId);

    audit.log({
      tenantId:   req.user.tenantId,
      userId:     req.user.userId,
      userEmail:  req.user.email,
      userRole:   req.user.role,
      action:     'VIEW',
      resource:   'projects',
      ipAddress:  req.ip,
      userAgent:  req.headers['user-agent'],
    });

    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:id — single project (Viewer and above)
router.get('/:id', async (req, res, next) => {
  try {
    const project = await repo.getProject(req.params.id, req.user.tenantId);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects — create (Member and above)
router.post('/', requireRole('Member', 'TenantAdmin', 'SuperAdmin'), async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'name is required' });

    const project = await repo.createProject({
      tenantId:    req.user.tenantId,
      name,
      description,
      createdBy:   req.user.userId,
    });

    audit.log({
      tenantId:    req.user.tenantId,
      userId:      req.user.userId,
      userEmail:   req.user.email,
      userRole:    req.user.role,
      action:      'CREATE',
      resource:    'projects',
      resourceId:  project.id,
      newValues:   project,
      ipAddress:   req.ip,
      userAgent:   req.headers['user-agent'],
    });

    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
});

// PUT /api/projects/:id — update (Member and above)
router.put('/:id', requireRole('Member', 'TenantAdmin', 'SuperAdmin'), async (req, res, next) => {
  try {
    const oldProject = await repo.getProject(req.params.id, req.user.tenantId);
    if (!oldProject) return res.status(404).json({ error: 'Not found' });

    const updated = await repo.updateProject(req.params.id, req.user.tenantId, req.body);

    audit.log({
      tenantId:    req.user.tenantId,
      userId:      req.user.userId,
      userEmail:   req.user.email,
      userRole:    req.user.role,
      action:      'UPDATE',
      resource:    'projects',
      resourceId:  req.params.id,
      oldValues:   oldProject,
      newValues:   updated,
      ipAddress:   req.ip,
      userAgent:   req.headers['user-agent'],
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/projects/:id — TenantAdmin and above only
router.delete('/:id', requireRole('TenantAdmin', 'SuperAdmin'), async (req, res, next) => {
  try {
    const project = await repo.getProject(req.params.id, req.user.tenantId);
    if (!project) return res.status(404).json({ error: 'Not found' });

    await repo.deleteProject(req.params.id, req.user.tenantId);

    audit.log({
      tenantId:    req.user.tenantId,
      userId:      req.user.userId,
      userEmail:   req.user.email,
      userRole:    req.user.role,
      action:      'DELETE',
      resource:    'projects',
      resourceId:  req.params.id,
      oldValues:   project,
      ipAddress:   req.ip,
      userAgent:   req.headers['user-agent'],
    });

    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
```

---

## Testing Tenant Isolation

Skip the isolation tests and you're flying blind. The application keeps running, nothing throws an error, but two customers are reading each other's data.

I've watched this sit undetected in production for months because nothing actually broke. The wrong data just showed up quietly. Automated tests on every pull request are the only reliable way to catch it early.

```js :collapsed-lines title="tests/tenantIsolation.test.js"
require('dotenv').config();  // must be first — loads DATABASE_URL and REDIS_URL
const request = require('supertest');
const app     = require('../app');
const { generateToken } = require('../src/utils/token');
const { pool }        = require('../db');
const { redisClient } = require('../db/redis');

// Test fixture: two isolated tenants, one project in Tenant B
async function seedTestData() {
  // Clean up from any previous run to avoid unique-constraint failures
  await pool.query(`DELETE FROM projects WHERE name LIKE 'TEST-%'`);
  await pool.query(`DELETE FROM tenants WHERE name IN ('Tenant A', 'Tenant B')`);

  const tenantA = (await pool.query(
    `INSERT INTO tenants (name, plan) VALUES ('Tenant A', 'pro') RETURNING id`
  )).rows[0].id;

  const tenantB = (await pool.query(
    `INSERT INTO tenants (name, plan) VALUES ('Tenant B', 'pro') RETURNING id`
  )).rows[0].id;

  const userA = (await pool.query(
    `INSERT INTO users (tenant_id, email, role) VALUES ($1, 'usera@a.com', 'Member') RETURNING id`,
    [tenantA]
  )).rows[0].id;

  // userB owns the project in Tenant B — satisfies the created_by FK constraint
  const userB = (await pool.query(
    `INSERT INTO users (tenant_id, email, role) VALUES ($1, 'userb@b.com', 'Member') RETURNING id`,
    [tenantB]
  )).rows[0].id;

  const projectB = (await pool.query(
    `INSERT INTO projects (tenant_id, name, created_by)
     VALUES ($1, 'TEST-Secret Project', $2) RETURNING id`,
    [tenantB, userB]
  )).rows[0].id;

  return { tenantA, tenantB, userA, projectB };
}

describe('Tenant Isolation', () => {
  let data;

  beforeAll(async () => {
    data = await seedTestData();
  });

  afterAll(async () => {
    await pool.query(`DELETE FROM tenants WHERE name IN ('Tenant A', 'Tenant B')`);
    await pool.end();
    await redisClient.quit();  // close Redis connection so Jest exits cleanly
  });

  test('Tenant A user cannot read Tenant B project', async () => {
    const token = generateToken({
      userId:   data.userA,
      tenantId: data.tenantA,   // ← Tenant A token
      email:    'usera@a.com',
      role:     'Member',
    });

    const res = await request(app)
      .get(`/api/projects/${data.projectB}`)  // ← Tenant B's project ID
      .set('Authorization', `Bearer ${token}`);

    // Must be 404, not 200 or 403
    expect(res.status).toBe(404);
  });

  test('Tenant A user cannot list Tenant B projects', async () => {
    const token = generateToken({
      userId:   data.userA,
      tenantId: data.tenantA,
      email:    'usera@a.com',
      role:     'TenantAdmin',
    });

    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    // Response must contain zero Tenant B projects
    const names = res.body.map(p => p.name);
    expect(names).not.toContain('TEST-Secret Project');
  });

  test('Viewer cannot delete a project', async () => {
    const token = generateToken({
      userId:   data.userA,
      tenantId: data.tenantA,
      email:    'usera@a.com',
      role:     'Viewer',         // ← Viewer role
    });

    const res = await request(app)
      .delete(`/api/projects/${data.projectB}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(403);
  });
});
```

Run the tests:

```sh
npm test
```

Three tests, three boundaries confirmed. Wire these into CI so they run on every pull request. A future refactor that quietly drops the `tenant_id` filter will get caught before it ships.

---

## Troubleshooting

### Tenant A can see Tenant B's data

One query is missing the `AND tenant_id = $N` clause. Search every repository file for `SELECT` statements and check each one. It's almost always this.

### `403 Forbidden` on a route that should be accessible

The role string in the JWT doesn't match what `requireRole()` is checking. Check the exact string in the token payload. `'member'` and `'Member'` aren't the same thing. Paste your token into jwt.io and look at the role field directly.

### Rate limiter isn't working

Redis is probably not connected. Log `redisClient.status` before the server starts. If it's not `ready`, the limiter has fallen back to in-memory, which means restarts reset all counters and tenant-scoped limiting stops working.

### Audit log table growing very large

Expected behaviour. Audit tables grow, that's the point. Once it gets large, ship rows older than a year to S3 or Azure Blob and keep querying against a smaller hot table. Most compliance requirements want at least 12 months of accessible logs anyway. Just don't DELETE from the table itself.

### `jwt.verify` throws `JsonWebTokenError: invalid signature`

The secret that signed the token doesn't match `JWT_SECRET` in the environment where you're verifying it. This comes up most when switching between environments or when a second service has a different value in its <VPIcon icon="iconfont icon-dotenv"/>`.env`. Every service that calls `jwt.verify` needs the exact same secret. Copy it across, don't retype it.

---

## Wrapping Up

The system you've built: row-level isolation in the repository, role checks before the handler runs, an audit table the app can't touch, and rate limits per tenant. That's the whole thing.

The tests are what I see dropped most often. Teams build the isolation, ship it, and never write something that actually proves cross-tenant data can't leak. Then a query gets refactored six months later and the `tenant_id` filter quietly disappears. CI catches it. Manual code review rarely does.

Schema-per-tenant comes up eventually if your product grows large enough. But not at the start. Row-level isolation handles more scale than most teams will ever hit, and it costs a fraction of the operational overhead.

::: info

The full working code is available on GitHub

<SiteInfo
  name="ziaongit/nodejs-multitenant-saas-api"
  desc="Source code for ”How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging”"
  url="https://github.com/ziaongit/nodejs-multitenant-saas-api/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0b36b69896953febbd6e5359c470822853e4034344ea7766883675b64453a868/ziaongit/nodejs-multitenant-saas-api"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Multi-Tenant SaaS API with Node.js, RBAC, and Audit Logging",
  "desc": "A colleague asked me to help debug what looked like a permissions issue in their SaaS project management tool. Users were seeing resources they hadn't created. I pulled up the query logs expecting som",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-multi-tenant-saas-api-with-nodejs-rbac-and-audit-logging.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
