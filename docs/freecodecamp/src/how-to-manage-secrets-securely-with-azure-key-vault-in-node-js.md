---
lang: en-US
title: "How to Manage Secrets Securely with Azure Key Vault in Node.js"
description: "Article(s) > How to Manage Secrets Securely with Azure Key Vault in Node.js"
icon: iconfont icon-microsoftazure
category:
  - Node.js
  - Express.js
  - DevOps
  - Docker
  - Microsoft
  - Azure
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
  - microsoft
  - azure
  - microsoft-azure
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Manage Secrets Securely with Azure Key Vault in Node.js"
    - property: og:description
      content: "How to Manage Secrets Securely with Azure Key Vault in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-secrets-securely-with-azure-key-vault-in-node-js.html
prev: /programming/js-express/articles/README.md
date: 2026-07-20
isOriginal: false
author:
  - name: Zia Ullah
    url: https://freecodecamp.org/news/author/ziaullahzia/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5491b408-9c6b-4d4d-a53e-215119fb2d97.png
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
  "title": Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": Azure > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/azure/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Manage Secrets Securely with Azure Key Vault in Node.js"
  desc="Last year a client called me about exactly this. Someone ran git log -p on a hunch and found a .env committed two years earlier, never caught. Database password, Stripe secret, JWT signing key — all s"
  url="https://freecodecamp.org/news/how-to-manage-secrets-securely-with-azure-key-vault-in-node-js"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/5491b408-9c6b-4d4d-a53e-215119fb2d97.png"/>

Last year a client called me about exactly this. Someone ran `git log -p` on a hunch and found a <VPIcon icon="iconfont icon-dotenv"/>`.env` committed two years earlier, never caught. Database password, Stripe secret, JWT signing key — all still active. All still in production.

IBM's 2024 breach cost report put the average data breach at **$4.88 million** — and that's the average, not the worst cases.

Exposed credentials are consistently near the top of root causes. GitHub found over a million secrets leaked in public repos in 2023 alone, before you even count the private ones nobody ever discovered.

It's not a people problem. The developers I've worked with aren't careless — the architecture is just set up to fail them. A <VPIcon icon="iconfont icon-dotenv"/>`.env` file gets committed once by accident. Credentials get copied and pasted into a Slack message to unblock a teammate. A Docker image gets published with secrets baked into a layer. A server gets shut down, and nobody rotates the credentials it was holding.

Azure Key Vault solves this differently. Your application fetches credentials at runtime from a centralized, encrypted service — the <VPIcon icon="iconfont icon-dotenv"/>`.env` file stops being a liability because it stops holding anything worth stealing.

What you'll build is a Node.js Express API that fetches every secret from Azure Key Vault at startup. No passwords in the code. When someone quits, there's nothing in the repo to rotate. The <VPIcon icon="iconfont icon-dotenv"/>`.env` ends up with one line — the vault name.

::: note Prerequisites

- Node.js 18+
- An Azure account (free tier works)
- Azure CLI installed and logged in (`az login`)
- Basic knowledge of Express.js
- Docker (optional — only needed for the local database test section)

:::

::: info What We Will Build

A Node.js Express API that:

1. Connects to PostgreSQL using credentials fetched from Key Vault at startup
2. Uses Managed Identity for authentication — no client secrets or passwords anywhere
3. Caches secrets in memory, so Key Vault isn't called on every request
4. Works locally via Azure CLI auth and in production via Managed Identity — same code, zero changes

---

## How the Architecture Works

Before writing any code, it helps to see the full picture:

```plaintext
 LOCAL DEVELOPMENT
.-------------------------------------------------------.
|                                                        |
|   [Node.js App]                                        |
|        |                                               |
|        v                                               |
|   [DefaultAzureCredential] ---> az login session       |
|        |                                               |
|        v                                               |
|   [Azure Key Vault]  ---> Returns secrets              |
|        |                                               |
|        v                                               |
|   [In-memory cache]  ---> App uses secrets at runtime  |
'-------------------------------------------------------'

 PRODUCTION (Azure)
.-------------------------------------------------------.
|                                                        |
|   [Azure App Service]                                  |
|        |                                               |
|        v                                               |
|   [DefaultAzureCredential] ---> Managed Identity       |
|        |                                               |
|        v                                               |
|   [Azure Key Vault]  ---> Returns secrets              |
|        |                                               |
|        v                                               |
|   [In-memory cache]  ---> App uses secrets at runtime  |
'-------------------------------------------------------'
```
<!-- TODO: mermaid화 -->

Both environments run the exact same code. `DefaultAzureCredential` figures out where it is — locally it picks up your `az login` session, on Azure it uses Managed Identity. You don't switch config files and you don't manage credentials. It just works.

---

## What Is Azure Key Vault?

Azure Key Vault is Microsoft's managed secret store — it handles secrets, keys, and certificates. For this tutorial, we're only using the secrets part: database passwords, API keys, JWT signing keys, anything your app needs to run but has no business being in your Git history.

Compared to <VPIcon icon="iconfont icon-dotenv"/>`.env` files, the practical differences are worth understanding before you write any code.

Rotation is the one I notice most on real projects. Update a secret in Key Vault and every app picks it up on the next restart — no hunting down five different environment configs across staging and production.

Access control is the other big one. Each application only gets permission to read the secrets it actually needs. If one service gets compromised, it can't read credentials belonging to other services.

And every read gets logged. When something goes wrong — and eventually something will — you can see exactly which app accessed which secret, and when. That log is what auditors actually want to see.

I've sat in enough security reviews to know that "we use <VPIcon icon="iconfont icon-dotenv"/>`.env` files and tell people not to commit them" doesn't satisfy an auditor. SOC 2, HIPAA, GDPR — they all want demonstrable controls. A vault with an access log is demonstrable.

---

## Set Up the Key Vault

Run these commands. The vault name has to be globally unique across all of Azure — not just your own subscription — so pick something specific. Letters, numbers, and hyphens, 3 to 24 characters.

```sh
# Create a resource group (skip if you already have one)
az group create \
--name keyvault-demo-rg \
--location eastus

# Create the Key Vault (RBAC enabled by default — required for the role assignment later)
az keyvault create \
--name your-vault-name \
--resource-group keyvault-demo-rg \
--location eastus

# Grant yourself permission to manage secrets (required with RBAC — creators are not auto-assigned)
az role assignment create \
--role "Key Vault Secrets Officer" \
--assignee-object-id $(az ad signed-in-user show --query id -o tsv) \
--scope $(az keyvault show \
  --name your-vault-name \
  --resource-group keyvault-demo-rg \
  --query id -o tsv)

# Add your secrets
az keyvault secret set \
--vault-name your-vault-name \
--name "DB-HOST" \
--value "your-db-host.postgres.database.azure.com"

az keyvault secret set \
--vault-name your-vault-name \
--name "DB-PASSWORD" \
--value "your-super-secret-password"

az keyvault secret set \
--vault-name your-vault-name \
--name "JWT-SECRET" \
--value "your-jwt-signing-secret"
```

Verify the secrets were stored:

```sh
az keyvault secret list --vault-name your-vault-name --query "[].name" -o tsv
#
# DB-HOST
# DB-PASSWORD
# JWT-SECRET
```

---

## Create the Node.js Project

Set up the project structure:

```sh
mkdir nodejs-azure-keyvault
cd nodejs-azure-keyvault
npm init -y
npm install express pg jsonwebtoken @azure/keyvault-secrets @azure/identity dotenv
```

The two Azure packages do all the work:

- `@azure/keyvault-secrets` — connects to your vault and pulls secrets out
- `@azure/identity` — handles auth. Locally, it uses your `az login` session, in production, it switches to Managed Identity automatically

Add a start script to `package.json`:

```sh
npm pkg set scripts.start="node server.js"
```

Create the following file structure:

```sh title="file structure"
nodejs-azure-keyvault/
|-- src/
|   |-- config/
|   |   `-- secrets.js   # Key Vault client and secret loader
|   |-- db/
|   |   `-- index.js     # PostgreSQL pool using secrets
|   `-- routes/
|       `-- users.js     # Example route
|-- app.js               # Express app
`-- server.js            # Entry point -- loads secrets first
```

---

## Connect to Key Vault with Managed Identity

Create the secrets config file:

```js title="src/config/secrets.js"
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const VAULT_URL = `https://${process.env.KEY_VAULT_NAME}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(VAULT_URL, credential);

async function getSecret(name) {
  const secret = await client.getSecret(name);
  return secret.value;
}

module.exports = { getSecret };
```

`DefaultAzureCredential` is the most important part of this setup. It tries a chain of authentication methods in order:

1. Environment variables (for CI/CD pipelines)
2. Azure CLI credentials (for local development — `az login`)
3. Managed Identity (for deployed apps on Azure)

This means the exact same code works locally and in production with zero changes. Locally, it uses your `az login` session. In production, it uses the app's Managed Identity. You never touch credentials.

---

## Cache Secrets at Startup

Calling Key Vault on every request adds latency and costs money. Load all secrets once at startup and cache them in memory. Replace <VPIcon icon="fas fa-folder-open"/>`src/config/`<VPIcon icon="fa-brands fa-js"/>`secrets.js` with this complete version:

```js :collapsed-lines title="src/config/secrets.js"
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

const VAULT_URL = `https://${process.env.KEY_VAULT_NAME}.vault.azure.net`;

const credential = new DefaultAzureCredential();
const client = new SecretClient(VAULT_URL, credential);

// In-memory cache
const cache = {};

async function getSecret(name) {
  if (cache[name]) return cache[name];
  const secret = await client.getSecret(name);
  cache[name] = secret.value;
  return secret.value;
}

async function loadAllSecrets() {
  console.log('Loading secrets from Azure Key Vault...');
  const secretNames = ['DB-HOST', 'DB-PASSWORD', 'JWT-SECRET'];

  await Promise.all(
    secretNames.map(async (name) => {
      cache[name] = await getSecret(name);
      console.log(`  ✓ ${name} loaded`);
    })
  );

  console.log('All secrets loaded successfully.');
}

function getFromCache(name) {
  if (!cache[name]) throw new Error(`Secret "${name}" not loaded. Did loadAllSecrets() run?`);
  return cache[name];
}

module.exports = { loadAllSecrets, getFromCache };
```

The `loadAllSecrets` function runs once when the application starts. After that, all secrets are served from the in-memory cache with zero latency and zero Key Vault calls.

---

## Use Secrets in Your Express API

Set up the database connection using the cached secrets:

```js title="src/db/index.js"
const { Pool } = require('pg');
const { getFromCache } = require('../config/secrets');

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      host:     getFromCache('DB-HOST'),
      database: process.env.DB_NAME || 'myapp',
      user:     process.env.DB_USER || 'dbadmin',
      password: getFromCache('DB-PASSWORD'),
      port:     parseInt(process.env.DB_PORT || '5432'),
      ssl:      process.env.NODE_ENV === 'production'
                  ? { rejectUnauthorized: false }
                  : false,
    });

    pool.on('error', (err) => {
      console.error('Unexpected database pool error:', err.message);
    });
  }

  return pool;
}

module.exports = { getPool };
```

Notice the distinction: `DB-HOST` and `DB-PASSWORD` come from Key Vault because they're sensitive. The database name, username, and port are not — they don't need to be protected, so they use environment variables with sensible defaults. Key Vault is for credentials, not all configuration.

The SSL flag is environment-aware: forced on in production, off locally so Docker connections work without a certificate. The `rejectUnauthorized: false` setting accepts Azure Database for PostgreSQL's certificate without verifying the CA chain — this is standard for Azure-managed databases. For stricter environments, you can download the Azure root CA and pass it via the `ca` option in the pool config instead.

Create a sample route that uses JWT verification with the secret from Key Vault:

```js :collapsed-lines title="src/routes/users.js"
const express = require('express');
const jwt     = require('jsonwebtoken');
const { getFromCache } = require('../config/secrets');
const { getPool }      = require('../db');

const router = express.Router();

// Auth middleware — JWT secret comes from Key Vault, not process.env
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = jwt.verify(token, getFromCache('JWT-SECRET'));
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// GET /api/users — list users (authenticated)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await getPool().query(
      'SELECT id, email, created_at FROM users ORDER BY created_at DESC LIMIT 20'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/users/:id — single user (authenticated)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const result = await getPool().query(
      'SELECT id, email, created_at FROM users WHERE id = $1',
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

Notice the error handler returns `'Internal server error'` instead of `err.message`. Database errors are surprisingly chatty — they'll hand an attacker your table names, column names, and query structure if you let them through.

Set up the Express application. Both files define `authMiddleware` locally — yes, it's duplicated. In production, I'd pull this into a shared middleware file. For this tutorial, keeping it local means you can read either file without bouncing between three others:

```js :collapsed-lines title="app.js"
const express = require('express');
const jwt = require('jsonwebtoken');
const { getFromCache } = require('./src/config/secrets');
const usersRouter = require('./src/routes/users');

const app = express();
app.use(express.json());

// Auth middleware — JWT secret comes from Key Vault, not process.env
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, getFromCache('JWT-SECRET'));
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Health check — no auth required
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Status endpoint — proves Key Vault integration without needing a database
app.get('/api/status', authMiddleware, (req, res) => {
  res.json({
    message: 'All secrets loaded from Azure Key Vault',
    vault: process.env.KEY_VAULT_NAME,
    secrets_loaded: ['DB-HOST', 'DB-PASSWORD', 'JWT-SECRET'],
    authenticated_as: req.user.email,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/users', usersRouter);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
```

The entry point loads secrets before starting the server. The server doesn't start unless all secrets load successfully:

```js title="server.js"
require('dotenv').config();
const app = require('./app');
const { loadAllSecrets } = require('./src/config/secrets');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await loadAllSecrets();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    console.error('Hint: Run "az login" for local development, or check Managed Identity for Azure deployments.');
    process.exit(1);
  }
}

start();
```

That `process.exit(1)` is deliberate. I'd rather the app crash loudly at startup than limp along with missing credentials and fail on the first real request two hours later.

---

## Test Locally

Create a <VPIcon icon="iconfont icon-dotenv"/>`.env` file for local development. This only contains the Key Vault name, nothing sensitive:

```sh title=".env"
KEY_VAULT_NAME=your-vault-name
PORT=3000
```

Add <VPIcon icon="iconfont icon-dotenv"/>`.env` and the deployment zip to `.gitignore`:

```sh
echo ".env" >> .gitignore
echo "app.zip" >> .gitignore
```

Make sure you're logged into Azure CLI:

```sh
az login
```

Start the application:

```sh
npm start
#
# Loading secrets from Azure Key Vault...
#   ✓ JWT-SECRET loaded
#   ✓ DB-PASSWORD loaded
#   ✓ DB-HOST loaded
# All secrets loaded successfully.
# Server running on port 3000
```

The order secrets load may vary — `Promise.all` fetches them in parallel and resolves as each one completes. What matters is that all three are confirmed before the server starts.

Test the health endpoint:

```sh
curl http://localhost:3000/health
# {"status":"healthy","timestamp":"2026-07-14T19:38:11.659Z"}
```

Now prove the integration end-to-end. Grab the value you stored as `JWT-SECRET` and use it to sign a test token — paste it in for `YOUR-JWT-SECRET-VALUE`. Then hit `/api/status` with it:

```sh
node -e "const jwt = require('jsonwebtoken'); console.log(jwt.sign({id:1, email:'test@test.com'}, 'YOUR-JWT-SECRET-VALUE', {expiresIn:'1h'}));"
```

::: tabs

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/status
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/status" -Headers @{Authorization = "Bearer YOUR_TOKEN"}
```

:::

You should see:

```json
{
  "message": "All secrets loaded from Azure Key Vault",
  "vault": "your-vault-name",
  "secrets_loaded": ["DB-HOST", "DB-PASSWORD", "JWT-SECRET"],
  "authenticated_as": "test@test.com",
  "timestamp": "2026-07-14T19:50:08.687Z"
}
```

If you got that response, the whole chain worked. The JWT was signed and verified using a secret that lived only in Key Vault — not in your code, not in your<VPIcon icon="iconfont icon-dotenv"/>`.env`, not anywhere in the repo. Your `az login` session handled the auth locally. In production, Managed Identity takes over. Same code, nothing changes.

### Test the Full Database Flow with Docker

The app reads `DB-HOST` and `DB-PASSWORD` from Key Vault, so those secrets need to match your local Docker container. Update them now:

```sh
az keyvault secret set \
--vault-name your-vault-name \
--name "DB-HOST" --value "localhost"

az keyvault secret set \
--vault-name your-vault-name \
--name "DB-PASSWORD" --value "demopassword123"
```

Docker up a Postgres container. The password has to match `demopassword123` — that's what you just put in Key Vault:

```sh
docker run --name pg-demo \
-e POSTGRES_USER=dbadmin \
-e POSTGRES_PASSWORD=demopassword123 \
-e POSTGRES_DB=myapp \
-p 5432:5432 \
-d postgres:15
```

Get the table created and throw in some test rows:

```sh
docker exec -it pg-demo psql -U dbadmin -d myapp -c \
"CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW());"

docker exec -it pg-demo psql -U dbadmin -d myapp -c \
"INSERT INTO users (email) VALUES ('alice@example.com'), ('bob@example.com'), ('carol@example.com');"
```

Kill the server and bring it back up — secrets load at startup, so it needs a fresh run to pick up what you just changed in Key Vault:

```sh
npm start
```

Call the users endpoint with a valid JWT:

```sh
# Generate a token (use the same value you stored as JWT-SECRET in Key Vault)
node -e "const jwt = require('jsonwebtoken'); console.log(jwt.sign({id:1, email:'test@test.com'}, 'YOUR-JWT-SECRET-VALUE', {expiresIn:'1h'}));"
```

::: tabs

@tab:active <VPIcon icon="fa-brands fa-linux"/>,<VPIcon icon="iconfont icon-macos"/>

```sh
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:3000/api/users
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Headers @{Authorization = "Bearer YOUR_TOKEN"}
```

:::

You should see:

```json
[
  { "id": 1, "email": "alice@example.com", "created_at": "2026-07-14T19:59:21.064Z" },
  { "id": 2, "email": "bob@example.com",   "created_at": "2026-07-14T19:59:21.064Z" },
  { "id": 3, "email": "carol@example.com", "created_at": "2026-07-14T19:59:21.064Z" }
]
```

That query ran using a password that came straight from Key Vault. It's not in your <VPIcon icon="iconfont icon-dotenv"/>`.env`, not hardcoded anywhere, and not in a local variable. The repo has nothing worth stealing.

Before you deploy, put the real production values back in Key Vault:

```sh
az keyvault secret set \
--vault-name your-vault-name \
--name "DB-HOST" \
--value "your-db-host.postgres.database.azure.com"

az keyvault secret set \
--vault-name your-vault-name \
--name "DB-PASSWORD" \
--value "your-super-secret-password"
```

If you skip this, the deployed app will try to connect to `localhost` and fail immediately — `localhost` doesn't exist on App Service.

---

## Deploy to Azure App Service

::: note

This section creates the App Service infrastructure. The actual code deployment (zip upload) happens at the end of the next section — the app must have Key Vault access configured before its first startup, or it will fail immediately and exit.

:::

Create the App Service:

```sh
# Create an App Service Plan (B1 is the cheapest paid tier)
az appservice plan create \
--name keyvault-demo-plan \
--resource-group keyvault-demo-rg \
--sku B1 \
--is-linux

# Create the Web App
az webapp create \
--name my-keyvault-node-app \
--resource-group keyvault-demo-rg \
--plan keyvault-demo-plan \
--runtime "NODE:18-lts"

# Set app settings — KEY_VAULT_NAME tells the app which vault to use
# NODE_ENV=production enables SSL for the database connection
az webapp config appsettings set \
--name my-keyvault-node-app \
--resource-group keyvault-demo-rg \
--settings KEY_VAULT_NAME=your-vault-name NODE_ENV=production
```

---

## Grant Key Vault Access to the App

Enable Managed Identity on the app. This gives it an identity in Microsoft Entra ID that Key Vault can trust:

```sh
# Enable system-assigned managed identity
az webapp identity assign \
--name my-keyvault-node-app \
--resource-group keyvault-demo-rg
```

The following commands capture the `principalId` automatically and use it to grant the role:

```sh
# Get the principal ID
PRINCIPAL_ID=$(az webapp identity show \
  --name my-keyvault-node-app \
  --resource-group keyvault-demo-rg \
  --query principalId \
  --output tsv)

# Get the Key Vault resource ID
KV_ID=$(az keyvault show \
  --name your-vault-name \
  --resource-group keyvault-demo-rg \
  --query id \
  --output tsv)

# Grant the app the "Key Vault Secrets User" role
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee-object-id $PRINCIPAL_ID \
  --scope $KV_ID
```

The `Key Vault Secrets User` role allows the app to read secrets. It can't create, update, or delete them. This is the principle of least privilege — the application can only do what it needs to do.

Time to ship it. Linux/macOS can run this directly — Windows users, open Git Bash (it ships with Git for Windows):

```sh
zip -r app.zip . -x "node_modules/*" ".git/*" ".env" "app.zip"
```

Then deploy:

```sh
az webapp deployment source config-zip \
  --name my-keyvault-node-app \
  --resource-group keyvault-demo-rg \
  --src app.zip
```

The deployed application authenticates to Key Vault using its Managed Identity automatically. No passwords, no client secrets, no credentials of any kind in the deployment.

Check the health endpoint to confirm it's running:

```sh
curl https://my-keyvault-node-app.azurewebsites.net/health
# {"status":"healthy","timestamp":"..."}
```

If it won't start, pull the logs:

```sh
az webapp log tail --name my-keyvault-node-app --resource-group keyvault-demo-rg
```

Nine times out of ten, it's that the Key Vault role assignment has not been propagated yet. Give it 2–3 minutes, then restart:

```sh
az webapp restart --name my-keyvault-node-app --resource-group keyvault-demo-rg
```

---

## Rotate Secrets Without Redeploying

One of the biggest practical benefits of Key Vault is secret rotation. When a database password needs to change, you update it in Key Vault — not in your app:

```sh
az keyvault secret set \
--vault-name your-vault-name \
--name "DB-PASSWORD" \
--value "new-rotated-password"
```

The cache builds at startup, so you don't need a redeploy — a restart is enough:

```sh
az webapp restart \
--name my-keyvault-node-app \
--resource-group keyvault-demo-rg
```

No code change. No new deployment. The secret is rotated, and the app is using the new value in seconds.

If you need zero-downtime rotation, add a `/refresh-secrets` endpoint behind admin auth that clears the cache and then calls `loadAllSecrets()`. The order matters — `loadAllSecrets()` uses `getSecret()` which returns cached values if they exist, so you must clear the cache first, or it will reload nothing. This is optional but useful for long-running processes that can't afford a restart.

---

## Troubleshooting

```plaintext
CredentialUnavailableError: DefaultAzureCredential failed to retrieve a token
```

You're not logged into Azure CLI. Run `az login` and try again. On Azure App Service, check that Managed Identity is enabled and the role assignment was created correctly.

```plaintext
RestError: Forbidden — The user does not have secrets get permission
```

The Managed Identity isn't wired up to Key Vault yet. Go back and run the `az role assignment create` command. If you already did, it might just need time. Azure can take 2–3 minutes to propagate role assignments, so give it a moment before you dig further.

```plaintext
Error: Secret "DB-PASSWORD" not loaded. Did loadAllSecrets() run?
```

`getFromCache()` ran before `loadAllSecrets()` finished, meaning the startup sequence is out of order. Open `server.js` and confirm `await loadAllSecrets()` comes before `app.listen()`. If the order's fine, the secret might just not be in the vault yet. Run `az keyvault secret list --vault-name YOUR_VAULT` to double-check. (A name mismatch — wrong case, typo — throws `SecretNotFound` instead, which is the entry below.)

**App starts locally but fails on Azure App Service**

Almost always, the app setting. Either `KEY_VAULT_NAME` isn't in App Service configuration at all, or the vault name has a typo. Run `az webapp log tail` to see the actual startup error — that'll tell you which one.

```plaintext
AuthorizationFailed when running 'az role assignment create'
```

You are a guest user in your Azure tenant and lack the Owner role needed to assign roles. Switch the existing vault to the access policy model — no need to recreate it or lose your secrets:

```sh
az keyvault update \
--name your-vault-name \
--resource-group keyvault-demo-rg \
--enable-rbac-authorization false
```

If this happened during **Set Up the Key Vault** (granting yourself access), run:

```sh
az keyvault set-policy \
--name your-vault-name \
--object-id $(az ad signed-in-user show --query id -o tsv) \
--secret-permissions get set list delete
```

If this happened during **Grant Key Vault Access to the App** (granting the Managed Identity access), run:

```sh
az keyvault set-policy \
--name your-vault-name \
--object-id $PRINCIPAL_ID \
--secret-permissions get list
```

**Key Vault returns `SecretNotFound`**

The secret was never added, was deleted, or its name doesn't match exactly what your code requests — Key Vault secret names are case-sensitive. A secret named `db-password` and a request for `DB-PASSWORD` are different names. Run `az keyvault secret list --vault-name YOUR_VAULT` and compare what's actually in the vault against what `loadAllSecrets()` is asking for in <VPIcon icon="fas fa-folder-open"/>`src/config/secrets.js`. Usually, it's a casing issue or a stray hyphen.

---

## Wrapping Up

The <VPIcon icon="iconfont icon-dotenv"/>`.env` file in this project contains exactly one value: the Key Vault name. That's not sensitive. Every actual secret — database passwords, API keys, signing secrets — lives in Key Vault and never touches your codebase or your deployment pipeline.

This is the pattern I use on Azure projects now. The startup check is the part I find most useful in practice: if Key Vault is unreachable or a secret is missing, the server exits immediately with a clear error instead of starting up broken and failing on the first real request. You find out right away, rather than getting an obscure database connection error two hours later.

To add another secret, put it in Key Vault and drop its name into the `secretNames` array — that's it. Everything else scales with it.

::: info

The full working code is on GitHub

<SiteInfo
  name="ziaongit/nodejs-azure-keyvault"
  desc="Contribute to ziaongit/nodejs-azure-keyvault development by creating an account on GitHub."
  url="https://github.com/ziaongit/nodejs-azure-keyvault/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/352dcc833a450285554a783408ff806672a8c03a4446bc55825753b7bf280393/ziaongit/nodejs-azure-keyvault"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Manage Secrets Securely with Azure Key Vault in Node.js",
  "desc": "Last year a client called me about exactly this. Someone ran git log -p on a hunch and found a .env committed two years earlier, never caught. Database password, Stripe secret, JWT signing key — all s",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-manage-secrets-securely-with-azure-key-vault-in-node-js.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
