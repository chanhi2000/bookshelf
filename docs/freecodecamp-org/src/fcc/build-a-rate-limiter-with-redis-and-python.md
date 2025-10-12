---
lang: en-US
title: "How to Build a Rate Limiter with Redis and Python to Scale Your Apps"
description: "Article(s) > How to Build a Rate Limiter with Redis and Python to Scale Your Apps"
icon: iconfont icon-flask
category:
  - Python
  - Flask
  - DevOps
  - Proxmox
  - Terraform
  - Data Science
  - Redis
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - flask
  - py-flask
  - devops
  - proxmox
  - terraform
  - data-science
  - redis
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Rate Limiter with Redis and Python to Scale Your Apps"
    - property: og:description
      content: "How to Build a Rate Limiter with Redis and Python to Scale Your Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-rate-limiter-with-redis-and-python/
prev: /programming/py-flask/articles/README.md
date: 2025-10-04
isOriginal: false
author:
  - name: Sravan Karuturi
    url : https://freecodecamp.org/news/author/sravankaruturi/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759503803144/4d974610-95dc-4db8-989a-0d705dc4d431.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Proxmox > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/proxmox/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Terraform > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/terraform/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Redis > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/redis/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Rate Limiter with Redis and Python to Scale Your Apps"
  desc="If you've ever built a web application, you know that without a proper mechanism to control traffic, your application can become overwhelmed, leading to slow response times, server crashes, and a poor user experience. Even worse, it can leave you vul..."
  url="https://freecodecamp.org/news/build-a-rate-limiter-with-redis-and-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759503803144/4d974610-95dc-4db8-989a-0d705dc4d431.png"/>

If you've ever built a web application, you know that without a proper mechanism to control traffic, your application can become overwhelmed, leading to slow response times, server crashes, and a poor user experience. Even worse, it can leave you vulnerable to Denial-of-Service (DoS) attacks. This is where rate limiting comes in.

In this tutorial, you’ll build a distributed rate limiter. This is the kind of system you need when your application is deployed across multiple servers or virtual machines, and you need to enforce a global limit on all incoming requests.

You’ll build a simple URL shortener application and then implement a robust rate limiter for it using a powerful and efficient combination of tools:

- Python and Flask for your web application.
- Redis as your high-speed, centralized data store for tracking requests.
- Terraform and Proxmox to define and provision your virtual machine infrastructure.
- Docker to containerize your application for easy deployment.
- Nginx as a load balancer to distribute traffic across your app servers.
- k6 to load-test your system and prove that your rate limiter actually works.

This is intended for new developers learning about various system design concepts or for experts who just want a refresher.

By the end of this guide, you'll understand not just the code, but the complete system architecture required to deploy a scalable, resilient application.

Let's get started!

::: note Prerequisites

While not absolutely required to follow along, I’d recommend setting up a Proxmox server on an old laptop to implement the topics you learn and code along with the article. I recommend this [<FontIcon icon="fa-brands fa-youtube"/>YouTube playlist](https://youtu.be/5j0Zb6x_hOk&list=PLT98CRl2KxKHnlbYhtABg6cF50bYa8Ulo) for getting started. Please note that I am in no way affiliated with this channel. I just found it helpful for me.

:::

However, If you do not have a local Proxmox server, you can skip that part and just follow along to understand how a rate limiter is built and how it is set up to properly work with multiple servers.

---

## Table of Contents

- [The Big Picture: Our System Architecture](#heading-the-big-picture-our-system-architecture)
- [Step 1: How to Define the Infrastructure with Terraform](#heading-step-1-how-to-define-the-infrastructure-with-terraform)
- [Step 2: How to Implement the Rate Limiter Logic in Python](#heading-step-2-how-to-implement-the-rate-limiter-logic-in-python)
- [Step 3: Containerizing and Testing](#heading-step-3-containerizing-and-testing)
- [Conclusion](#heading-conclusion)

---

## The Big Picture: Our System Architecture

Before we dive into the code, let's look at the architecture we're building. I will be using [<FontIcon icon="iconfont icon-proxmox"/>Proxmox Virtual Environment](https://proxmox.com/en/products/proxmox-virtual-environment/overview) to setup a server cluster just like you would have in a datacenter.

### How to Set Up Proxmox

`Proxmox Virtual Environment` is an open source platform for virtualization. It lets you manage multiple VMs, ccontainers and other clusters with ease. For instance, I turned my old gaming computer into a Proxmox server which lets me run more than 20 virtual machines on it at the same time, making it similar to my very own datacenter. This lets me experiment with distributed applications by simulating datacenter environments.

To setup your own cluster, all you need is an old computer. You can download the ISO image from [<FontIcon icon="iconfont icon-proxmox"/>here](https://proxmox.com/en/downloads) and boot from the USB drive. Once you install it, you can configure the host machine via a web browser on any other computer on the same network.

For example, my proxmox server is located at `10.0.0.108` and I can access it via the browser on my laptop.

![Example Proxmox cluster](https://cdn.hashnode.com/res/hashnode/image/upload/v1759194790299/35e9363f-b739-4085-a589-c1bafbac0504.png)

We define all our virtual machines in our <FontIcon icon="iconfont icon-terraform"/>`main.tf` file. And run a simple command `terraform apply` to spin these servers up. For more reading on how to use Terraform with Proxmox, I recommend this [<FontIcon icon="fas fa-globe"/>blog post](https://spacelift.io/blog/terraform-proxmox-provider)

Back to our use case, we’ll have a few virtual machines that will serve as different kinds of servers:

1. A Load balancer
2. A Rate Limiter (A Redis Cache)
3. Two Web Servers
4. A Postgres database
5. One Virtual Machine that will test the load by simulating hundreds of calls per minute.

If all of this seems daunting, don’t worry too much about it. You don’t need to set all this up to follow along.

### Centralized Rate Limiter

Since our application will run on multiple servers (or "nodes"), we can't store request counts in memory on each individual server. Why? Because each server would have its own separate count, and we wouldn't have a *global* rate limit.

The solution is to use a centralized data store that all our application nodes can access. This is where Redis comes in.

Here’s a diagram of our setup:

![A Small diagram depicting the architecture we'll form with all these virtual nodes](https://cdn.hashnode.com/res/hashnode/image/upload/v1758476002871/1d70ce5b-e19c-4d7d-9c0b-cc18840a07bf.png)

1. User requests first hit our Nginx load balancer.
2. The load balancer distributes the traffic evenly between our two web server VMs. The configuration is simple, using an upstream block to define the servers.
3. Each web server runs our Python Flask application inside a Docker container.
4. Before processing any request, the Flask app communicates with the central Redis rate limiter VM to check if the user has exceeded the rate limit.
5. If the user is within the limit, the app processes the request and interacts with the PostgreSQL Database. If they're over the limit, it sends back a “429 Too Many Requests” error.

This architecture ensures that no matter which web server handles the request, the rate limit is checked against the same, shared data source.

---

## Step 1: How to Define the Infrastructure with Terraform

Manually setting up multiple virtual machines can be tedious and prone to errors. That's why we use Terraform, an Infrastructure as Code (IaC) tool. It lets us define our entire infrastructure in configuration files.

::: note

You can skip this section if you just want to see the rate limiter in action and how it’s used.

:::

Our [<FontIcon icon="iconfont icon-terraform"/>`main.tf` (<FontIcon icon="iconfont icon-github"/>`sravankaruturi/system-design`)](https://github.com/sravankaruturi/system-design/blob/main/infra/main.tf) file defines all the components of our system. Let's look at a key piece: the Redis VM.

```tf :collapsed-lines title="main.tf"
# --- Redis Cache for Rate Limiter ---
resource "proxmox_vm_qemu" "redis_cache" {

    vmid        = 130
    name        = "redis-cache-rate-limiter"
    target_node = "pve"
    agent       = 1
    cores       = 1
    memory      = 1024
    # ... cloud-init config ...
    ipconfig0  = "ip=10.0.0.130/24,gw=10.0.0.1"
    # ... disk and network config ...

    # 1. Install Docker
    provisioner "remote-exec" {
        inline = [
            "sleep 30; sudo apt-get update -y",
            "sudo apt-get install -y docker.io docker-compose",
            "sudo mkdir -p /opt/redis"
        ]
    }

    # 2. Upload docker-compose file
    provisioner "file" {
         source      = "files/redis-docker-compose.yml"
         destination = "/home/${var.ssh_user}/docker-compose.yml"
    }

    # 3. Move file and run docker-compose
    provisioner "remote-exec" {
        inline = [
            "sudo mv /home/${var.ssh_user}/docker-compose.yml /opt/redis/docker-compose.yml",
            "cd /opt/redis && sudo docker-compose up -d"
        ]
    }
}
```

This block tells Terraform to create a `Proxmox QEMU virtual machine` with a specific IP address `(10.0.0.130)`. After the VM is created, it uses provisioners to connect via SSH and run commands. Here, it installs Docker, uploads our <FontIcon icon="iconfont icon-yaml"/>`redis-docker-compose.yml` file, and starts the Redis container.

The <FontIcon icon="iconfont icon-yaml"/>`redis-docker-compose.yml` itself is very straightforward:

```yaml title="redis-docker-compose.yml"
version: '3.8'
services:
  redis:
    image: redis:latest
    container_name: redis_cache
    restart: always
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

volumes:
  redisdata:
```

This ensures we have a persistent, containerized Redis instance ready to serve our application. The Terraform configuration similarly defines our web servers, load balancer, and databases.

---

## Step 2: How to Implement the Rate Limiter Logic in Python

Now, for the heart of our system: the Python code that implements the rate limiting logic. We're using a sophisticated and memory-efficient algorithm called the Sliding Window Log.

The idea is simple: for each user, we keep a log of the timestamps of their recent requests. We store this log in a Redis Sorted Set.

Let's break down the code from [<FontIcon icon="fa-brands fa-python"/>`app.py` (<FontIcon icon="iconfont icon-github"/>`sravankaruturi/system-design`)](https://github.com/sravankaruturi/system-design/blob/main/web-servers/app.py).

### The Flask `@app.before_request` Hook

Flask allows us to run code before any request is handled by its intended view function. This is the perfect place to put our rate limiter.

```py :coolapsed-lines
import psycopg2
import string
import random
import redis
import time
from flask import Flask, request, redirect, jsonify

app = Flask(__name__)

# --- Database Connection Details ---
DB_HOST = "10.0.0.200" 
DB_NAME = "urldb"
DB_USER = "myuser"
DB_PASS = "mypassword"

REDIS_HOST = "10.0.0.130" # IP of your redis-cache-lxc

# --- Rate Limiter Settings ---
RATE_LIMIT_COUNT = 10  # 10 requests
RATE_LIMIT_WINDOW = 60 # per 60 seconds

# Establish a reusable Redis connection
redis_client = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)

@app.before_request
def rate_limiter():
    # Use the user's IP address as the key
    # In a real app, you'd handle proxies via request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
    key = f"rate_limit:{request.remote_addr}"
    now = time.time()

    # Use a Redis pipeline for atomic operations
    pipe = redis_client.pipeline()
    # 1. Add current request timestamp. The score and member are the same.
    pipe.zadd(key, {str(now): now})
    # 2. Remove all timestamps older than our window
    pipe.zremrangebyscore(key, 0, now - RATE_LIMIT_WINDOW)
    # 3. Get the count of remaining timestamps
    pipe.zcard(key)
    # 4. Set an expiration on the key so it cleans itself up
    pipe.expire(key, RATE_LIMIT_WINDOW)

    # Execute the pipeline and get the results
    results = pipe.execute()
    request_count = results[2] # The result of the zcard command

    if request_count > RATE_LIMIT_COUNT:
        # Return a 429 Too Many Requests error
        return jsonify(error="Rate limit exceeded"), 429

def get_db_connection():
    conn = psycopg2.connect(host=DB_HOST, dbname=DB_NAME, user=DB_USER, password=DB_PASS)
    return conn

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS urls (
            id SERIAL PRIMARY KEY,
            short_code VARCHAR(6) UNIQUE NOT NULL,
            original_url TEXT NOT NULL
        );
    ''')
    # Check if the index exists before creating it
    cur.execute('''
        SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'idx_original_url' AND n.nspname = 'public';
    ''')
    if cur.fetchone() is None:
        cur.execute('CREATE INDEX idx_original_url ON urls (original_url);')
    conn.commit()
    cur.close()
    conn.close()

def generate_short_code(length=6):
    chars = string.ascii_letters + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

@app.route("/", methods=['GET'])
def index():
    return "URL Shortener is running!\n", 200

@app.route('/shorten', methods=['POST'])
def shorten_url():
    original_url = request.form['url']
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT short_code FROM urls WHERE original_url = %s", (original_url,))
    existing_url = cur.fetchone()

    if existing_url:
        short_code = existing_url[0]
    else:
        short_code = generate_short_code()
        cur.execute("INSERT INTO urls (short_code, original_url) VALUES (%s, %s)", (short_code, original_url))
        conn.commit()

    cur.close()
    conn.close()

    return jsonify(short_url=f"/{short_code}")

@app.route('/<short_code>')
def redirect_to_url(short_code):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT original_url FROM urls WHERE short_code = %s", (short_code,))
    url_record = cur.fetchone()
    cur.close()
    conn.close()

    if url_record:
        return redirect(url_record[0])
    else:
        return "URL not found", 404

if __name__ == '__main__':
    init_db() 
    app.run(host='0.0.0.0', port=5000)
```

### How It Works, Step-by-Step

1. **Identify the User:** We create a unique Redis key for each user based on their IP address: `rate_limit:1.2.3.4`.
2. **Use a Pipeline:** Network latency can be a bottleneck. A Redis pipeline bundles multiple commands into a single request-response cycle. This is much more efficient than sending them one by one. It also ensures the sequence of commands runs without being interrupted by commands from other clients.
3. **Log the Current Request (ZADD):** We add the current timestamp (as a Unix epoch) to a sorted set. We use the timestamp for both the "member" and the "score," which allows us to easily filter by time.
4. **Clean Up Old Requests (ZREMRANGEBYSCORE):** This is the "sliding window" part. We remove any timestamps from the set that are older than our `RATE_LIMIT_WINDOW` (60 seconds). This efficiently discards requests that are no longer relevant to the current rate limit period.
5. **Count the Recent Requests (ZCARD):** We get the cardinality (the number of items) in the set. After the previous step, this number is our count of requests within the last 60 seconds.
6. **Mark the current record to expire (EXPIRE):** We set an expiration on the key itself. If a user stops making requests, Redis will automatically delete their rate limit data after 60 seconds, preventing memory from filling up with old keys.
7. **Execute and Check:** The `pipe.execute()` command sends all our bundled commands to Redis. We then check the result of our ZCARD command. If the count exceeds our `RATE_LIMIT_COUNT`, we immediately return a 429 error.

This approach is incredibly fast and efficient. All the heavy lifting is done inside Redis, which is optimized for these kinds of operations.

---

## Step 3: Containerizing and Testing

To deploy our application consistently across multiple VMs, we use Docker. Our Dockerfile is standard for a Python application: it starts from a Python image, installs dependencies from <FontIcon icon="fas fa-file-lines"/>`requirements.txt`, copies the application code, and defines the command to run the app.

But how do we know it works? We test it!

We use `k6`, a modern load testing tool, to simulate heavy traffic. Our test script, <FontIcon icon="fa-brands fa-js"/>`rate-test.js`, is designed specifically to verify the rate limiter.

```js title="rate-test.js"
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    // Ramp up to 20 users. This is more than the 10 req/min limit
    // and should trigger the rate limiter.
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '10s', target: 0 },
  ],
};

export default function () {
  const url = 'http://10.0.0.100/shorten'; // The Load Balancer IP
  const payload = { url: `https://www.test-ratelimit-${Math.random()}.com` };

  const res = http.post(url, payload);

  // Check if the request was successful OR if it was correctly rate-limited
  check(res, {
    'status is 200 (OK)': (r) => r.status === 200,
    'status is 429 (Too Many Requests)': (r) => r.status === 429,
  });

  sleep(1);
}
```

The stages array configures the test to gradually increase the number of virtual users to 20. Since our rate limit is 10 requests per minute, this load is guaranteed to trigger the limiter.

The `check` function is the crucial part. It verifies that the server's response code is either 200 (meaning the request was successful) or 429 (meaning our rate limiter correctly blocked the request).

We should see about 10 of our requests go through of the around 1600 requests per minute that we send from the same IP address.

![A gif showing the test run of the load testing script](https://cdn.hashnode.com/res/hashnode/image/upload/v1758477504110/3a2f3f0f-8db0-453d-8900-42a6d0966a11.gif)

We can also check the logs on our webserver to see all the requests that were sent to it.

![A small gif demonstrating Web Server Logs](https://cdn.hashnode.com/res/hashnode/image/upload/v1758477959201/80a39d07-1c4e-4d45-8a42-9ac2ce6f360d.gif)

And if we look at the Redis cache/database itself, we’ll see all the keys and the TTL at which they expire.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1758478780827/6a07a2ee-0ad0-4b60-899f-d6a0453edbe7.png)

This is how we rate limit applications using a Redis Cache Server.

Here are the complete files used in the project.

::: details

```tf :collapsed-lines title="main.tf"
terraform {
    required_providers {
        proxmox = {
        source  = "telmate/proxmox"
        version = "3.0.2-rc04"
        }
    }
    }

    provider "proxmox" {
    pm_api_url          = var.proxmox_api_url
    pm_api_token_id     = var.proxmox_api_token_id
    pm_api_token_secret = var.proxmox_api_token_secret
    pm_tls_insecure     = true
    }

    # --- Shared Provisioner Connection Settings ---
    locals {
        connection_settings = {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
        }
    }

    # --- Database LXC Containers ---
    resource "proxmox_lxc" "postgres_db" {
    hostname     = "postgres-db-lxc"
    target_node  = var.target_node
    ostemplate   = var.lxc_template

    rootfs {
        storage = "local-lvm"
        size = "8G"
    }

    password     = "admin"
    unprivileged = true
    start        = true

    features {
        nesting = true
        # keyctl = true
    }

    network {
        name   = "eth0"
        bridge = "vmbr0"
        ip     = "10.0.0.200/24"
        gw     = "10.0.0.1"
    }

    provisioner "remote-exec" {
        connection {
        type        = "ssh"
        user        = var.ssh_user
        private_key = file(var.ssh_private_key_path)
        host        = split("/", self.network[0].ip)[0]
        }
        inline = [
        "sudo apt-get update",
        "sudo apt-get install -y docker.io docker-compose python3-setuptools",
        "sudo usermod -aG docker ${var.ssh_user}",
        "sudo mkdir -p /opt/postgres",
        "sudo chown ${var.ssh_user}:${var.ssh_user} /opt/postgres"
        ]
    }

    provisioner "file" {
        connection {
        type        = "ssh"
        user        = var.ssh_user
        private_key = file(var.ssh_private_key_path)
        host        = split("/", self.network[0].ip)[0]
        }
        source      = "../databases/pg-docker-compose.yml"
        destination = "/opt/postgres/docker-compose.yml"
    }

    provisioner "remote-exec" {
        inline     = ["cd /opt/postgres && sudo docker-compose up -d"]

        connection {
        type        = "ssh"
        user        = var.ssh_user
        private_key = file(var.ssh_private_key_path)
        host        = split("/", self.network[0].ip)[0]
        }
    }
    }

    resource "proxmox_lxc" "mongo_db" {
        hostname    = "mongo-db-lxc"
        target_node = var.target_node
        ostemplate  = var.lxc_template

        rootfs {
            storage = "local-lvm"
            size = "8G"
        }

        password    = "admin"
        unprivileged = true
        start       = true

        features {
            nesting = true
        # keyctl = true # Somehow this is blocking the apply command
        }

        network {
            name   = "eth0"
            bridge = "vmbr0"
            ip     = "10.0.0.210/24"
            gw     = "10.0.0.1"
        }

        # Provisioners similar to postgres_db
        provisioner "remote-exec" {
            connection {
                type        = "ssh"
                user        = var.ssh_user
                private_key = file(var.ssh_private_key_path)
                host        = split("/", self.network[0].ip)[0]
            }
            inline = [
            "sudo apt-get update",
            "sudo apt-get install -y docker.io docker-compose python3-setuptools",
            "sudo usermod -aG docker ${var.ssh_user}",
            "sudo mkdir -p /opt/mongo",
            "sudo chown ${var.ssh_user}:${var.ssh_user} /opt/mongo"
            ]
        }

        provisioner "file" {
            connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = split("/", self.network[0].ip)[0]
            }
            source      = "../databases/mongo-docker-compose.yml"
            destination = "/opt/mongo/docker-compose.yml"
        }

        provisioner "remote-exec" {
            connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = split("/", self.network[0].ip)[0]
            }
            inline     = ["cd /opt/mongo && docker-compose up -d"]
        }
    }

    # --- Redis Cache for Rate Limiter ---
    resource "proxmox_vm_qemu" "redis_cache" {

        vmid        = 130
        name        = "redis-cache-rate-limiter"
        target_node = "pve"
        agent       = 1
        cpu {
            cores       = 1
        }

        memory      = 1024
        boot        = "order=scsi0" # has to be the same as the OS disk of the template
        clone       = "debian12-cloudinit" # The name of the template
        scsihw      = "virtio-scsi-single"
        vm_state    = "running"
        automatic_reboot = true

        # Cloud-Init configuration
        cicustom   = "vendor=local:snippets/qemu-guest-agent.yml" # /var/lib/vz/snippets/qemu-guest-agent.yml
        ciupgrade  = true
        nameserver = "1.1.1.1 8.8.8.8"
        ipconfig0  = "ip=10.0.0.130/24,gw=10.0.0.1"
        skip_ipv6  = true
        ciuser     = var.ssh_user
        cipassword = var.ssh_password
        sshkeys    = var.ssh_key

        # Most cloud-init images require a serial device for their display
        serial {
            id = 0
        }

        disks {
            scsi {
            scsi0 {
                # We have to specify the disk from our template, else Terraform will think it's not supposed to be there
                disk {
                storage = "local-lvm"
                # The size of the disk should be at least as big as the disk in the template. If it's smaller, the disk will be recreated
                size    = "5G" 
                }
            }
            }
            ide {
            # Some images require a cloud-init disk on the IDE controller, others on the SCSI or SATA controller
            ide1 {
                cloudinit {
                storage = "local-lvm"
                }
            }
            }
        }

        network {
            id = 0
            bridge = "vmbr0"
            model  = "virtio"
        }

        connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = "10.0.0.130"
        }

        # 1. Install Docker and create the final app directory
        provisioner "remote-exec" {
            inline = [
                # Wait for cloud-init to finish before doing anything else
                "echo 'Waiting for cloud-init to finish...'",
                "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Still waiting...' && sleep 1; done",
                "echo 'Cloud-init finished.'",

                # Now, safely install packages
                "sudo apt-get update -y",
                "sudo apt-get install -y docker.io docker-compose",
                "sudo mkdir -p /opt/redis",
            ]
        }

        provisioner "file" {
            source      = "../caching/redis-docker-compose.yml"
            destination = "/home/${var.ssh_user}/docker-compose.yml"
        }

        provisioner "remote-exec" {
            inline = [ "sudo mv /home/${var.ssh_user}/docker-compose.yml /opt/redis/docker-compose.yml" ]
        }

        provisioner "remote-exec" {
            inline = [ "cd /opt/redis && sudo docker-compose up -d" ]
        }
    }

    resource "proxmox_vm_qemu" "web-servers" {

        count = 2

        vmid        = count.index + 150
        name        = "web-server-tf-${count.index + 1}"
        target_node = "pve"
        agent       = 1
        cpu {
            cores       = 1
        }
        memory      = 1024
        boot        = "order=scsi0" # has to be the same as the OS disk of the template
        clone       = "debian12-cloudinit" # The name of the template
        scsihw      = "virtio-scsi-single"
        vm_state    = "running"
        automatic_reboot = true

        # Cloud-Init configuration
        cicustom   = "vendor=local:snippets/qemu-guest-agent.yml" # /var/lib/vz/snippets/qemu-guest-agent.yml
        ciupgrade  = true
        nameserver = "1.1.1.1 8.8.8.8"
        ipconfig0  = "ip=10.0.0.${111 + count.index}/24,gw=10.0.0.1"
        skip_ipv6  = true
        ciuser     = var.ssh_user
        cipassword = var.ssh_password
        sshkeys    = var.ssh_key

        # Most cloud-init images require a serial device for their display
        serial {
            id = 0
        }

        disks {
            scsi {
            scsi0 {
                # We have to specify the disk from our template, else Terraform will think it's not supposed to be there
                disk {
                storage = "local-lvm"
                # The size of the disk should be at least as big as the disk in the template. If it's smaller, the disk will be recreated
                size    = "5G" 
                }
            }
            }
            ide {
            # Some images require a cloud-init disk on the IDE controller, others on the SCSI or SATA controller
            ide1 {
                cloudinit {
                storage = "local-lvm"
                }
            }
            }
        }

        network {
            id = 0
            bridge = "vmbr0"
            model  = "virtio"
        }

        connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = "10.0.0.${111 + count.index}"
        }

        # 1. Install Docker and create the final app directory
        provisioner "remote-exec" {
            inline = [
                # Wait for cloud-init to finish before doing anything else
                "echo 'Waiting for cloud-init to finish...'",
                "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Still waiting...' && sleep 1; done",
                "echo 'Cloud-init finished.'",

                # Now, safely install packages
                "sudo apt-get update -y",
                "sudo apt-get install -y docker.io",
                "sudo mkdir -p /opt/app",
            ]
        }

        # 2. Upload ONLY the necessary files to the user's home directory
        provisioner "file" {
            source      = "../web-servers/app.py"
            destination = "/home/${var.ssh_user}/app.py"
        }
        provisioner "file" {
            source      = "../web-servers/Dockerfile"
            destination = "/home/${var.ssh_user}/Dockerfile"
        }
        provisioner "file" {
            source      = "../web-servers/requirements.txt"
            destination = "/home/${var.ssh_user}/requirements.txt"
        }

        # 4. Move files from the home directory, build the image, and run the container
        provisioner "remote-exec" {
            inline = [
                # Move each file individually to be compatible with all shells
                "sudo mv /home/${var.ssh_user}/app.py /opt/app/",
                "sudo mv /home/${var.ssh_user}/Dockerfile /opt/app/",
                "sudo mv /home/${var.ssh_user}/requirements.txt /opt/app/",

                # Build the Docker image
                "sudo docker build -t my-python-app /opt/app",

                # Stop and remove any old containers to prevent conflicts
                "sudo docker stop $(sudo docker ps -q --filter ancestor=my-python-app) 2>/dev/null || true",
                "sudo docker rm $(sudo docker ps -aq --filter ancestor=my-python-app) 2>/dev/null || true",

                # Run the new container
                "sudo docker run -d --restart always -p 80:5000 my-python-app"
            ]
        }

        # In your proxmox_vm_qemu "web_servers" resource
        depends_on = [
            proxmox_lxc.postgres_db,
            proxmox_vm_qemu.redis_cache
        ]
    }

    # --- Load Balancer VM ---
    resource "proxmox_vm_qemu" "load_balancer" {
        name        = "lb-1"
        target_node = var.target_node
        clone       = var.vm_template
        agent       = 1
        cpu {
            cores       = 1
        }
        memory      = 512
        boot        = "order=scsi0" # has to be the same as the OS disk of the template
        scsihw      = "virtio-scsi-single"
        vm_state    = "running"
        automatic_reboot = true

        # --- Add these lines for Cloud Init Drive ---
                # --- Add these lines for Cloud Init Drive ---
        cicustom   = "vendor=local:snippets/qemu-guest-agent.yml" # /var/lib/vz/snippets/qemu-guest-agent.yml
        ciupgrade  = true
        nameserver = "1.1.1.1 8.8.8.8"
        ipconfig0  = "ip=10.0.0.100/24,gw=10.0.0.1"
        skip_ipv6  = true
        ciuser     = var.ssh_user
        cipassword = var.ssh_password
        sshkeys    = var.ssh_key

        # Most cloud-init images require a serial device for their display
        serial {
            id = 0
        }

        disks {
            scsi {
            scsi0 {
                # We have to specify the disk from our template, else Terraform will think it's not supposed to be there
                disk {
                storage = "local-lvm"
                # The size of the disk should be at least as big as the disk in the template. If it's smaller, the disk will be recreated
                size    = "5G" 
                }
            }
            }
            ide {
            # Some images require a cloud-init disk on the IDE controller, others on the SCSI or SATA controller
            ide1 {
                cloudinit {
                storage = "local-lvm"
                }
            }
            }
        }

        network {
            id = 0
            bridge = "vmbr0"
            model  = "virtio"
        }

        connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = "10.0.0.100"
        }

        # Step 1: Install Nginx
        provisioner "remote-exec" {
            inline = [
                # Wait for cloud-init to finish before doing anything else
                "echo 'Waiting for cloud-init to finish...'",
                "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Still waiting...' && sleep 1; done",
                "echo 'Cloud-init finished.'",

                # Now, safely install packages
                "sudo apt-get update -y",
                "sudo apt-get install -y nginx"
            ]
        }

        # Step 2: Upload config to a temporary location
        provisioner "file" {
            source      = "../web-servers/nginx.conf"
            destination = "/tmp/nginx.conf" # Use /tmp instead
        }

        # Step 3: Use sudo to move the file to its final destination and reload nginx
        provisioner "remote-exec" {
            inline = [
                "sudo mv /tmp/nginx.conf /etc/nginx/sites-available/default",
                "sudo systemctl reload nginx"
            ]
        }
    }


    # --- Load Tester VM ---
    resource "proxmox_vm_qemu" "load_tester" {
        name        = "load-tester-vm"
        target_node = var.target_node
        clone       = var.vm_template
        agent       = 1
        cpu {
            cores       = 1
        }
        memory      = 1024
        boot        = "order=scsi0" # has to be the same as the OS disk of the template
        scsihw      = "virtio-scsi-single"
        vm_state    = "running"
        automatic_reboot = true

        # --- Add these lines for Cloud Init Drive ---
        cicustom   = "vendor=local:snippets/qemu-guest-agent.yml" # /var/lib/vz/snippets/qemu-guest-agent.yml
        ciupgrade  = true
        nameserver = "1.1.1.1 8.8.8.8"
        ipconfig0  = "ip=10.0.0.160/24,gw=10.0.0.1"
        skip_ipv6  = true
        ciuser     = var.ssh_user
        cipassword = var.ssh_password
        sshkeys    = var.ssh_key

        # Most cloud-init images require a serial device for their display
        serial {
            id = 0
        }

        disks {
            scsi {
                scsi0 {
                    # We have to specify the disk from our template, else Terraform will think it's not supposed to be there
                    disk {
                    storage = "local-lvm"
                    # The size of the disk should be at least as big as the disk in the template. If it's smaller, the disk will be recreated
                    size    = "5G" 
                    }
                }
            }

            ide {
            # Some images require a cloud-init disk on the IDE controller, others on the SCSI or SATA controller
                ide1 {
                    cloudinit {
                    storage = "local-lvm"
                    }
                }
            }
        }

        network {
            id = 0
            bridge = "vmbr0"
            model  = "virtio"
        }

        provisioner "remote-exec" {
            connection {
                type        = "ssh"
                user        = var.ssh_user
                private_key = file(var.ssh_private_key_path)
                host        = "10.0.0.160"
            }
            inline = [
                # Wait for cloud-init to finish
                "echo 'Waiting for cloud-init to finish...'",
                "while [ ! -f /var/lib/cloud/instance/boot-finished ]; do echo 'Still waiting...' && sleep 1; done",
                "echo 'Cloud-init finished.'",

                # Install prerequisites
                "sudo apt-get update -y",
                "sudo apt-get install -y gnupg curl",

                # Add the k6 repository and key
                "curl -sL https://dl.k6.io/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg",
                "echo 'deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main' | sudo tee /etc/apt/sources.list.d/k6.list",

                # Install k6
                "sudo apt-get update",
                "sudo apt-get install -y k6"
            ]
        }

        provisioner "file" {
            connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = "10.0.0.160"
            }
            source      = "../load-testing/script.js"
            destination = "/home/${var.ssh_user}/script.js"
        }

        provisioner "file" {
            connection {
            type        = "ssh"
            user        = var.ssh_user
            private_key = file(var.ssh_private_key_path)
            host        = "10.0.0.160"
            }
            source      = "../load-testing/rate-test.js"
            destination = "/home/${var.ssh_user}/rate-test.js"
        }

    }
```

:::

---

## Conclusion

You've now seen how to build a complete, scalable, and resilient system that includes a crucial component for modern web applications: a distributed rate limiter.

We've covered the entire stack:

- **Infrastructure as Code** with Terraform to define our virtual machines. (check out my repo [here (<FontIcon icon="iconfont icon-github"/>`sravankaruturi/system-design`)](https://github.com/sravankaruturi/system-design) for all the code and any updates I make).
- A **centralized, high-speed cache** with Redis to store our rate limiting data.
- An efficient **Sliding Window Log algorithm** implemented in Python with Flask.
- **Containerization** with Docker for consistent deployment.
- **Load balancing** with Nginx to distribute traffic.
- **Load testing** with k6 to validate our implementation.

::: info

If you’d like to learn more of the concepts that are used when building large scale systems please follow me at [<FontIcon icon="fas fa-globe"/>Sravan Karuturi](https://hashnode.com/@sravankaruturi).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Rate Limiter with Redis and Python to Scale Your Apps",
  "desc": "If you've ever built a web application, you know that without a proper mechanism to control traffic, your application can become overwhelmed, leading to slow response times, server crashes, and a poor user experience. Even worse, it can leave you vul...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-rate-limiter-with-redis-and-python/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
