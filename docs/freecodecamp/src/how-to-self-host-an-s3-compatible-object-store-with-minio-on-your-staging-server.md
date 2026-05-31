---
lang: en-US
title: "How to Self‑Host an S3‑Compatible Object Store with MinIO on Your Staging Server (and Save Hundreds of Dollars a Month)"
description: "Article(s) > How to Self‑Host an S3‑Compatible Object Store with MinIO on Your Staging Server (and Save Hundreds of Dollars a Month)"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Traefik
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - traefik
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Self‑Host an S3‑Compatible Object Store with MinIO on Your Staging Server (and Save Hundreds of Dollars a Month)"
    - property: og:description
      content: "How to Self‑Host an S3‑Compatible Object Store with MinIO on Your Staging Server (and Save Hundreds of Dollars a Month)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-self-host-an-s3-compatible-object-store-with-minio-on-your-staging-server.html
prev: /devops/docker/articles/README.md
date: 2026-06-01
isOriginal: false
author:
  - name: Md Tarikul Islam
    url: https://freecodecamp.org/news/author/Tarikul001/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a7e1dd1d-2e31-4d80-ae9b-10242588a5e1.png
---

# {{ $frontmatter.title }} 관련

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
  "title": "Traefik > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/traefik/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Self‑Host an S3‑Compatible Object Store with MinIO on Your Staging Server (and Save Hundreds of Dollars a Month)"
  desc="This article is a complete copy‑paste guide to running MinIO behind Traefik with HTTPS, custom domains, and pre-signed upload/download URLs — using only Docker Compose. Your production will keep using"
  url="https://freecodecamp.org/news/how-to-self-host-an-s3-compatible-object-store-with-minio-on-your-staging-server"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a7e1dd1d-2e31-4d80-ae9b-10242588a5e1.png"/>

This article is a complete copy‑paste guide to running MinIO behind Traefik with HTTPS, custom domains, and pre-signed upload/download URLs — using only Docker Compose.

Your production will keep using a managed S3 / Cloudflare R2 / Hetzner Object Storage, while every staging upload, download, and pre-signed URL goes to your **own** server for free.

---

## Why Self‑Host Object Storage on Staging?

If your app handles documents — PDFs, profile pictures, application transcripts, recordings — every test upload your QA team makes costs real money on AWS S3, Cloudflare R2, or Hetzner Object Storage. The price isn't huge per file, but staging is where you:

- run automated end‑to‑end tests that upload thousands of dummy files,
- reset databases nightly (which leaves orphan objects behind),
- let developers experiment with broken code that re‑uploads the same files,
- and hold months of test data nobody ever deletes.

In production those costs are justified. Managed storage gives you replication, availability, and someone else's pager. In staging, those costs are pure waste.

[<VPIcon icon="fas fa-globe"/>MinIO](https://min.io/) is a free, open‑source, S3‑compatible object server. Same API, same SDKs, same presigned URLs, same `mc`/`aws s3` CLIs — but running on your own VPS, billed at $0 per gigabyte. Point your staging app at MinIO, point your production app at S3/R2, and the only thing that changes is an environment variable.

::: note The result

identical code paths in both environments, zero storage bill on staging, and a nice fallback if your cloud provider ever has an outage.

:::

---

## The Architecture: Production vs. Staging

In real-world applications, you usually don’t want your development or staging environment writing directly to production storage.

A common and cost-effective setup is:

- **Production**: managed cloud object storage
- **Staging / Development**: self-hosted S3-compatible storage

The good part is that your application code doesn't need to change.

As long as both services are S3-compatible, the same SDK and upload logic work everywhere. Only the environment variables differ.

### High-Level Architecture

![High-level architecture showing a Next.js application uploading files to Cloudflare R2 in production and MinIO in staging through the same S3-compatible API.](https://cdn.hashnode.com/uploads/covers/66cb39fcaa2a09f9a8d691c1/01ddeefd-8a67-42e3-a3af-9b1d3664bdb2.png)

The above diagram illustrates how the same application can communicate with different storage providers depending on the deployment environment.

In the **production environment**, uploads are stored in a managed object storage service such as AWS S3, Cloudflare R2, or Hetzner Object Storage. These services handle durability, scalability, backups, and infrastructure management.

In the **staging environment**, uploads are directed to a self-hosted MinIO instance running inside Docker on a VPS. MinIO implements the S3 API, making it behave similarly to production storage while keeping costs low.

Because both storage systems are S3-compatible, the application uses the same upload logic in every environment. The only difference is the configuration provided through environment variables.

::: important Why This Architecture Is Useful

This setup gives you:

- A cheap staging environment
- Production-like testing
- Zero storage vendor lock-in
- The ability to switch providers without rewriting application code

Because both environments speak the S3 protocol, your upload logic remains identical.

:::

::: tip Example Environment Variables

Your application only reads environment variables like these:

```sh
S3_ENDPOINT=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_BUCKET=
```

Switch the values, and the exact same application now uploads files to a different backend.

:::

::: tip Production Storage Example

In production, you typically use managed object storage providers such as:

- AWS S3
- Cloudflare R2
- Hetzner Object Storage

```sh title="Example"
S3_ENDPOINT=https://<region>.r2.cloudflarestorage.com
```

The benefits are that it's highly scalable, globally available, durable, has managed backups, and doesn't have infrastructure maintenance.

:::

::: tip Staging Environment Example

For staging, a lightweight self-hosted MinIO container is often enough.

```plaintext
Next.js App
     ↓
MinIO Container (inside Docker on VPS)
```
<!-- TODO: mermaid화 -->

Example domains:

| Service | Domain | Internal Port |
| --- | --- | --- |
| MinIO S3 API | [`minio-staging.domain.com`](http://minio-staging.domain.com) | `9000` |
| MinIO Web Console | [`minio-console-staging.domain.com`](http://minio-console-staging.domain.com) | `9001` |

This allows you to:

- Test uploads safely
- Avoid production storage costs
- Reproduce production-like behavior locally

:::

::: note Prerequisites

You'll need:

- A Linux VPS (Hetzner, DigitalOcean, Contabo, OVH — anything with a public IP).
- Two A records pointing at that IP (we'll register them next).
- Docker + Docker Compose v2.
- [<VPIcon icon="iconfont icon-traefik"/>Traefik](https://traefik.io/) v2 in front, with Let's Encrypt configured (any reverse proxy works – the labels below are Traefik's flavor).
- Open ports `80` and `443` on the firewall for Let's Encrypt + HTTPS.
- ~10 GB free disk for the MinIO data volume to start.

If Docker isn't installed:

```sh
curl -fsSL https://get.docker.com | sh
sudo apt-get install -y docker-compose-plugin
docker --version && docker compose version
```

:::

---

## Step 1 — DNS: Point Your Domains to the Staging Server

In your DNS provider (Cloudflare, Route 53, Namecheap, and so on), create two **A records** pointing at your staging server's public IP:

```plaintext
minio-staging.domain.com           A    203.0.113.45
minio-console-staging.domain.com   A    203.0.113.45
```

If you use Cloudflare, set the proxy status to **DNS only** (gray cloud) for `minio-staging.*`. Cloudflare's free plan caps uploads at 100 MB, and you don't want it stripping S3 signing headers. The console subdomain can stay proxied if you want a WAF in front of it.

Wait a minute and verify:

```sh
dig +short minio-staging.domain.com
# 203.0.113.45
```

---

## Step 2 — Run MinIO with Docker Compose

Add this service to your staging compose file (<VPIcon icon="iconfont icon-yaml"/>`docker-compose.staging.yml`). MinIO is just one container — the disk is mounted as a Docker volume so data survives upgrades.

```yaml :collapsed-lines title="docker-compose.staging.yml"
networks:
  proxy:
    external: true
    name: proxy
  internal:
    name: internal

volumes:
  minio-data:

services:
  minio:
    image: minio/minio:latest
    container_name: minio-staging
    restart: unless-stopped
    environment:
      - MINIO_ROOT_USER=${MINIO_ROOT_USER:-admin}
      - MINIO_ROOT_PASSWORD=${MINIO_ROOT_PASSWORD:-change-me-please}
      # Tell MinIO which public domain to sign URLs with
      - MINIO_SERVER_URL=https://minio-staging.domain.com
      - MINIO_BROWSER_REDIRECT_URL=https://minio-console-staging.domain.com
    command: server /data --console-address ":9001"
    volumes:
      - minio-data:/data
    networks:
      - proxy
      - internal
    ports:
      - "9000:9000"  # S3 API
      - "9001:9001"  # Web console
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 10s
      timeout: 5s
      retries: 3
      start_period: 30s
```

Two things deserve attention:

- `MINIO_SERVER_URL` is the secret sauce. Without it, MinIO signs presigned URLs using its internal hostname (`http://minio:9000`), which then fails verification when the browser hits the public domain. Set it to the exact HTTPS URL clients will use.
- `MINIO_BROWSER_REDIRECT_URL` does the same for the web console (login redirects, OIDC callbacks, and so on).

Bring it up:

```sh
docker compose -f docker-compose.staging.yml up -d minio
docker compose -f docker-compose.staging.yml logs -f minio
```

You should see `API: http://...` and `Console: http://...` lines.

---

## Step 3 — Expose MinIO over HTTPS with Traefik

We don't expose ports `9000`/`9001` to the world directly — Traefik does that for us, terminating TLS with a free Let's Encrypt certificate.

Add these labels to the `minio` service:

```yaml
    labels:
      - "traefik.enable=true"
      - "traefik.docker.network=proxy"

      # ---- S3 API (port 9000) ----
      - "traefik.http.routers.minio-staging.rule=Host(`minio-staging.domain.com`)"
      - "traefik.http.routers.minio-staging.entrypoints=websecure"
      - "traefik.http.routers.minio-staging.tls.certresolver=letsencrypt"
      - "traefik.http.routers.minio-staging.service=minio-staging"
      - "traefik.http.services.minio-staging.loadbalancer.server.port=9000"

      # ---- Web Console (port 9001) ----
      - "traefik.http.routers.minio-console-staging.rule=Host(`minio-console-staging.domain.com`)"
      - "traefik.http.routers.minio-console-staging.entrypoints=websecure"
      - "traefik.http.routers.minio-console-staging.tls.certresolver=letsencrypt"
      - "traefik.http.routers.minio-console-staging.service=minio-console-staging"
      - "traefik.http.services.minio-console-staging.loadbalancer.server.port=9001"
```

You also need an `entrypoint` for `:443` and a `certificatesresolver` named `letsencrypt`. Here's the minimum Traefik config (<VPIcon icon="iconfont icon-yaml"/>`traefik.staging.yml`):

```yaml title="traefik.staging.yml"
api:
  dashboard: true

entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      httpChallenge:
        entryPoint: web
      email: admin@domain.com
      storage: /etc/traefik/acme.json

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    network: proxy
```

Restart and watch the cert get issued:

```sh
docker compose -f docker-compose.staging.yml up -d
docker compose -f docker-compose.staging.yml logs -f traefik | grep -i acme
```

Sanity check from your laptop:

```sh
curl -I https://minio-staging.domain.com/minio/health/live
# HTTP/2 200
```

You can now log in to the **web console** at `https://minio-console-staging.domain.com` with `admin` / `change-me-please`.

::: important Important upload size tweak

If you're behind Cloudflare or NGINX in front of Traefik, raise the request body limit. Traefik itself has no default limit, but Cloudflare's free plan refuses anything over 100 MB. For self‑hosted edge proxies, set `client_max_body_size 0;` (NGINX) or the equivalent.

:::

---

## Step 4 — Create the Bucket and Access Keys

Anything that speaks S3 can talk to MinIO. The easiest tool is `mc` (the official MinIO client), shipped inside the same image.

### Connect mc to your server

```sh
docker exec -it minio-staging \
  mc alias set local http://localhost:9000 admin change-me-please
```

### Create a bucket

```sh
docker exec -it minio-staging mc mb local/domain-files-staging
```

### Choose a bucket policy

You have three choices, so just pick based on what you store:

| Policy | When to use |
| --- | --- |
| `private` (default) | Anything sensitive — student transcripts, contracts, internal docs. Reads only via presigned URL. |
| `download` | Public read, no listing. Good for CDN‑style assets like avatars. |
| `public` | Anyone can read AND list. Use only for truly public content. |

Set one:

```sh
# Private (recommended for documents)
docker exec -it minio-staging \
mc anonymous set none local/domain-files-staging

# OR public read for static assets only:
docker exec -it minio-staging \
mc anonymous set download local/domain-files-staging
```

### Create a dedicated app user (don't use root keys!)

The `admin` account can wipe everything. Make a least‑privilege user for your app:

```sh
docker exec -it minio-staging mc admin user add local \
domain-app a-long-random-secret-key

# Attach the built-in read/write policy, scoped to one bucket via JSON:
cat > /tmp/policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": [
        "arn:aws:s3:::domain-files-staging",
        "arn:aws:s3:::domain-files-staging/*"
      ]
    }
  ]
}
EOF

docker cp /tmp/policy.json minio-staging:/tmp/policy.json
docker exec -it minio-staging \
mc admin policy create local domain-rw /tmp/policy.json
docker exec -it minio-staging \
mc admin policy attach local domain-rw --user domain-app
```

Save those two values — they are your `S3_ACCESS_KEY` and `S3_SECRET_KEY`.

---

## Step 5 — Configure Your App to Use MinIO on Staging Only

The trick to "MinIO in staging, real S3 in prod" is to use the **same S3 client** in your code and only swap the env vars.

Your <VPIcon icon="iconfont icon-dotenv"/>`.env.staging` (loaded by your staging compose stack):

```sh title=".env.staging"
# ---- Staging: self-hosted MinIO ----
STORAGE_ENABLED=true
S3_ENDPOINT=https://minio-staging.domain.com
S3_PUBLIC_ENDPOINT=https://minio-staging.domain.com
S3_BUCKET=domain-files-staging
S3_ACCESS_KEY=domain-app
S3_SECRET_KEY=a-long-random-secret-key
S3_REGION=us-east-1
S3_FORCE_PATH_STYLE=true
```

Your <VPIcon icon="iconfont icon-dotenv"/>`.env.production`:

```sh title=".env.production"
# ---- Production: Cloudflare R2 ----
STORAGE_ENABLED=true
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
S3_PUBLIC_ENDPOINT=https://files.domain.com
S3_BUCKET=domain-files
S3_ACCESS_KEY=<r2-access-key>
S3_SECRET_KEY=<r2-secret-key>
S3_REGION=auto
S3_FORCE_PATH_STYLE=true
```

`S3_FORCE_PATH_STYLE=true` is critical for both MinIO **and** R2/Hetzner. Without it, the SDK tries `https://bucket.minio-staging.domain.com` (virtual‑host style), which won't resolve.

Now in your application code (Node.js example using AWS SDK v3):

```js title="src/lib/s3.js"
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
});

export const BUCKET = process.env.S3_BUCKET;
export const PUBLIC_ENDPOINT = process.env.S3_PUBLIC_ENDPOINT;
```

The same `s3` instance now talks to MinIO on staging and to R2 in production with no code change.

---

## Step 6 — Upload Files (3 Ways)

### From a server (best for trusted backends)

```js
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3, BUCKET } from "./lib/s3.js";
import { readFile } from "node:fs/promises";

export async function uploadDocument(localPath, key, contentType) {
  const Body = await readFile(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body,
    ContentType: contentType,
    // Optional: per-object metadata, useful for audits
    Metadata: { uploadedBy: "system", env: process.env.NODE_ENV },
  }));
  return key;
}
```

### With the mc CLI (good for one‑off uploads / migrations)

```sh
mc alias set staging https://minio-staging.domain.com domain-app a-long-random-secret-key
mc cp ./report.pdf staging/domain-files-staging/reports/2026/report.pdf
mc ls staging/domain-files-staging --recursive
```

### Directly from the browser via a presigned PUT URL

The recommended pattern for user uploads is: the file goes from the browser to MinIO with **zero** bytes touching your API server.

We'll cover this in detail next.

---

## Step 7 — Generate Presigned URLs (PUT and GET)

A **presigned URL** is a regular HTTPS URL with a time‑limited signature in the query string. Anyone with the URL can do exactly the action it was signed for (PUT this object, or GET that object) for the next N minutes — and nothing else.

This is what makes "users upload directly to storage" safe.

### Presigned PUT (for uploads)

```js title="src/lib/presign.js"
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3, BUCKET } from "./s3.js";
import { randomUUID } from "node:crypto";

export async function presignUpload({ filename, contentType, userId }) {
  const key = `users/\({userId}/\){randomUUID()}-${filename}`;
  const cmd = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  });
  const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 }); // 5 min
  return { uploadUrl, key };
}
```

Wire it to your API:

```js
// POST /api/uploads/presign
app.post("/api/uploads/presign", requireAuth, async (req, res) => {
  const { filename, contentType } = req.body;
  const result = await presignUpload({
    filename,
    contentType,
    userId: req.user.id,
  });
  res.json(result); // { uploadUrl, key }
});
```

The browser uploads straight to MinIO:

```js
// In your frontend
async function uploadFile(file) {
  const { uploadUrl, key } = await fetch("/api/uploads/presign", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  }).then(r => r.json());

  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  // Persist `key` in your DB so you can retrieve it later
  await fetch("/api/documents", {
    method: "POST",
    body: JSON.stringify({ key, originalName: file.name }),
  });
}
```

The `Content-Type` you send during PUT **must match** the one you signed with, or MinIO will reject the request with `SignatureDoesNotMatch`. This catches everyone the first time.

### Presigned GET (for downloads)

Same idea, but with `GetObjectCommand`:

```js
export async function presignDownload(key, expiresIn = 60 * 10) {
  const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3, cmd, { expiresIn });
}
```

A typical "view document" endpoint:

```js
app.get("/api/documents/:id/url", requireAuth, async (req, res) => {
  const doc = await db.documents.findById(req.params.id);
  if (!doc || !canUserSee(req.user, doc)) return res.sendStatus(403);
  const url = await presignDownload(doc.key, 600);
  res.json({ url });
});
```

The frontend just opens that URL — the file streams from MinIO directly to the user.

### Why presigned URLs beat "proxy through the API"

|  | Proxy through API | Presigned URL |
| ---: | :---: | :---: |
| Bytes through your app | All of them | Zero |
| API CPU/RAM cost | High | None |
| Throughput limit | Your API | MinIO's NIC |
| Auth check | Your code | Your code (still — check before signing) |

---

## Step 8 — Get Public URLs for Documents

Sometimes you want a permanent, unauthenticated URL — for example public profile pictures.

If the bucket policy allows anonymous reads (`mc anonymous set download …`), the public URL pattern is:

```plaintext
https://minio-staging.domain.com/<bucket>/<key>
```

So `users/42/avatar.png` becomes:

```plaintext
https://minio-staging.domain.com/domain-files-staging/users/42/avatar.png
```

In code:

```js
export function publicUrl(key) {
  return `\({process.env.S3_PUBLIC_ENDPOINT}/\){BUCKET}/${key}`;
}
```

For **private** buckets (most documents), don't use public URLs at all — always go through `presignDownload(key)` so you can re‑check authorization on every request and expire links.

---

## 12. Step 9 — Lock Down CORS, Lifecycle, and Security

### 12.1 Allow your frontend origins (CORS)

Browser uploads need CORS rules on the bucket. Drop this JSON via `mc`:

```sh
cat > /tmp/cors.json <<'EOF'
{
  "CORSRules": [
    {
      "AllowedOrigins": [
        "https://crm-staging.domain.com",
        "http://localhost:3000"
      ],
      "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}
EOF

docker cp /tmp/cors.json minio-staging:/tmp/cors.json
docker exec -it minio-staging \
mc cors set local/domain-files-staging /tmp/cors.json
```

### 12.2 Auto‑delete old test files (lifecycle)

Staging accumulates junk. Tell MinIO to expire anything older than 30 days:

```sh
docker exec -it minio-staging \
mc ilm rule add --expire-days 30 local/domain-files-staging
```

### 12.3 Encrypt at rest

```sh
docker exec -it minio-staging \
mc encrypt set sse-s3 local/domain-files-staging
```

### 12.4 Hard rules

- **Never** ship `MINIO_ROOT_USER=admin` / `MINIO_ROOT_PASSWORD=admin123` to a server reachable from the internet. Generate strong values and store them in your secret manager.
- The root account should be used only by `mc admin`, never by your app. The app uses a scoped IAM user (Step 7.4).
- Keep the **console** subdomain behind an IP allow‑list or basic auth via Traefik middleware if it's truly public.
- Rotate the app access keys at least every 90 days.

---

## Step 10 — Backups and Monitoring

### Backups: mirror to a cheap cold bucket weekly

Set up a tiny cron job that uses `mc mirror` to push to Backblaze B2, R2, or another cheap S3 endpoint:

```sh
mc alias set b2 https://s3.us-east-005.backblazeb2.com \(B2_KEY \)B2_SECRET
mc mirror --overwrite --remove \
staging/domain-files-staging \
b2/domain-staging-backup
```

Even at $6/TB/month this is essentially free for staging volumes.

### Monitoring with Prometheus

MinIO exposes Prometheus metrics out of the box at `/minio/v2/metrics/cluster`. Scrape with:

```yaml
scrape_configs:
  - job_name: minio
    metrics_path: /minio/v2/metrics/cluster
    scheme: https
    static_configs:
      - targets: ["minio-staging.domain.com"]
```

If you have Grafana, import dashboard ID **13502** for an instant overview (capacity, request rates, latency, error counts).

---

## Troubleshooting Cheat Sheet

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `SignatureDoesNotMatch` on presigned PUT | Browser sent a different `Content-Type` than what was signed | Send the exact same `Content-Type` header during PUT |
| Presigned URL works locally but not in browser | `MINIO_SERVER_URL` not set, so URLs are signed for `minio:9000` | Set `MINIO_SERVER_URL=https://minio-staging.domain.com` and restart |
| `403 SignatureDoesNotMatch` after going through Cloudflare | Cloudflare strips/modifies headers | Set the DNS record to **DNS‑only** (gray cloud) |
| `NoSuchBucket` | App pointing at the wrong endpoint or bucket | Re‑check `S3_ENDPOINT` and `S3_BUCKET` in env |
| Browser CORS preflight fails | No CORS rule on the bucket | Apply the CORS JSON from §12.1 |
| Upload works for small files, fails at 100 MB | Cloudflare free plan body limit | Use Cloudflare paid plan, or skip CF proxy |
| `x509: certificate signed by unknown authority` from your app | App container doesn't trust Let's Encrypt | Update CA bundle (`apt install ca-certificates`) or use HTTP inside the Docker network |
| Web console redirects to `http://minio:9001/login` | `MINIO_BROWSER_REDIRECT_URL` missing | Set it to `https://minio-console-staging.domain.com` |

Useful diagnostics:

```sh
# Check MinIO health
curl -I https://minio-staging.domain.com/minio/health/live

# List all objects in a bucket
docker exec -it minio-staging mc ls --recursive local/domain-files-staging

# Tail MinIO logs
docker compose -f docker-compose.staging.yml logs -f minio

# Decode a presigned URL to see what it was signed for
echo "<paste url>" | tr '&' '\n'
```

---

## Wrapping Up

Here's what you have now:

- A free, S3‑compatible object store running on your own staging server.
- Real HTTPS on a real domain (`https://minio-staging.domain.com`), thanks to Traefik + Let's Encrypt.
- A scoped, least‑privilege application user — root keys stay locked away.
- The same exact code paths in staging and production. Switching between MinIO / R2 / Hetzner / AWS S3 is a four‑variable change in the env file.
- Presigned PUT URLs so users upload straight to storage, bypassing your API.
- Presigned GET URLs so private documents are short‑lived and authorization‑gated.
- Lifecycle rules that nuke old test files automatically.
- Optional weekly mirror to a cold backup bucket.

Production keeps running on managed storage where the SLA matters. Staging now costs you exactly **$0 per month per gigabyte uploaded** — and you can finally stop telling QA to "delete the test files when you're done."

::: info Further Reading

```component VPCard
{
  "title": "Container",
  "desc": "MinIO AIStor supports deploying resources as a container for local development and evaluation. Setting up MinIO AIStor as a container involves these steps: Deploy MinIO AIStor as a container Set up network encryption (optional) Performance The following table shows areas that have the greatest impact on MinIO AIStor performance, listed in order of importance.",
  "link": "https://docs.min.io/aistor/installation/container//",
  "logo": "https://docs.min.io/aistor/favicon/favicon-16x16.png",
  "background": "rgba(207,22,62,0.2)"
}
```

```component VPCard
{
  "title": "@aws-sdk/s3-request-presigner - AWS SDK for JavaScript v3",
  "desc": "Package readme and API index for the @aws-sdk/s3-request-presigner package in the AWS SDK for JavaScript v3",
  "link": "https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-request-presigner//",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

```component VPCard
{
  "title": "Traefik Docker Documentation - Traefik",
  "desc": "Learn how to achieve configuration discovery in Traefik through Docker. Read the technical documentation.",
  "link": "https://doc.traefik.io/traefik/reference/install-configuration/providers/docker/",
  "logo": "https://doc.traefik.io/assets/images/logo-traefik-proxy-icon.svg",
  "background": "rgba(41,48,71,0.2)"
}
```

```component VPCard
{
  "title": "Bucket policies for Amazon S3 - Amazon Simple Storage Service",
  "desc": "Learn what Amazon S3 bucket policies are and when to use them.",
  "link": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html/",
  "logo": "https://docs.aws.amazon.com/assets/images/favicon.ico",
  "background": "rgba(241,158,56,0.2)"
}
```

:::

If this guide saved your team a few dollars, share it with another team that's still uploading test PDFs to a $90/month S3 bucket. Happy shipping.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Self‑Host an S3‑Compatible Object Store with MinIO on Your Staging Server (and Save Hundreds of Dollars a Month)",
  "desc": "This article is a complete copy‑paste guide to running MinIO behind Traefik with HTTPS, custom domains, and pre-signed upload/download URLs — using only Docker Compose. Your production will keep using",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-self-host-an-s3-compatible-object-store-with-minio-on-your-staging-server.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
