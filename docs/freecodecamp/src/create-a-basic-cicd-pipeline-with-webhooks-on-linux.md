---
lang: en-US
title: "How to Create a Basic CI/CD Pipeline with Webhooks on Linux"
description: "Article(s) > How to Create a Basic CI/CD Pipeline with Webhooks on Linux"
icon: fa-brands fa-debian
category:
  - DevOps
  - Linux
  - Debian
  - Python
  - Flask
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - debian
  - py
  - python
  - flask
  - py-flask
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a Basic CI/CD Pipeline with Webhooks on Linux"
    - property: og:description
      content: "How to Create a Basic CI/CD Pipeline with Webhooks on Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/create-a-basic-cicd-pipeline-with-webhooks-on-linux.html
prev: /devops/linux-debian/articles/README.md
date: 2025-01-29
isOriginal: false
author:
  - name: Juan P. Romano
    url : https://freecodecamp.org/news/author/jpromanonet/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737640144719/9035597c-0a69-4146-93cc-8bd659384169.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Basic CI/CD Pipeline with Webhooks on Linux"
  desc="In the fast-paced world of software development, delivering high-quality applications quickly and reliably is crucial. This is where CI/CD (Continuous Integration and Continuous Delivery/Deployment) comes into play. CI/CD is a set of practices and to..."
  url="https://freecodecamp.org/news/create-a-basic-cicd-pipeline-with-webhooks-on-linux"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737640144719/9035597c-0a69-4146-93cc-8bd659384169.png"/>

In the fast-paced world of software development, delivering high-quality applications quickly and reliably is crucial. This is where **CI/CD** (Continuous Integration and Continuous Delivery/Deployment) comes into play.

CI/CD is a set of practices and tools designed to automate and streamline the process of integrating code changes, testing them, and deploying them to production. By adopting CI/CD, your team can reduce manual errors, speed up release cycles, and ensure that your code is always in a deployable state.

In this tutorial, we’ll focus on a beginner-friendly approach to setting up a basic CI/CD pipeline using Bitbucket, a Linux server, and Python with Flask. Specifically, we’ll create an automated process that pulls the latest changes from a Bitbucket repository to your Linux server whenever there’s a push or merge to a specific branch.

This process will be powered by Bitbucket webhooks and a simple Flask-based Python server that listens for incoming webhook events and triggers the deployment.

It’s important to note that CI/CD is a vast and complex field, and this tutorial is designed to provide a foundational understanding rather than to be an exhaustive guide.

We’ll cover the basics of setting up a CI/CD pipeline using tools that are accessible to beginners. Just keep in mind that real-world CI/CD systems often involve more advanced tools and configurations, such as containerization, orchestration, and multi-stage testing environments.

By the end of this tutorial, you’ll have a working example of how to automate deployments using Bitbucket, Linux, and Python, which you can build upon as you grow more comfortable with CI/CD concepts.

---

## Why is CI/CD Important?

CI/CD has become a cornerstone of modern software development for several reasons. First and foremost, it accelerates the development process. By automating repetitive tasks like testing and deployment, developers can focus more on writing code and less on manual processes. This leads to faster delivery of new features and bug fixes, which is especially important in competitive markets where speed can be a differentiator.

Another key benefit of CI/CD is reduced errors and improved reliability. Automated testing ensures that every code change is rigorously checked for issues before it’s integrated into the main codebase. This minimizes the risk of introducing bugs that could disrupt the application or require costly fixes later. Automated deployment pipelines also reduce the likelihood of human error during the release process, ensuring that deployments are consistent and predictable.

CI/CD also fosters better collaboration among team members. In traditional development workflows, integrating code changes from multiple developers can be a time-consuming and error-prone process. With CI/CD, code is integrated and tested frequently, often multiple times a day. This means that conflicts are detected and resolved early, and the codebase remains in a stable state. As a result, teams can work more efficiently and with greater confidence, even when multiple contributors are working on different parts of the project simultaneously.

Finally, CI/CD supports continuous improvement and innovation. By automating the deployment process, teams can release updates to production more frequently and with less risk. This enables them to gather feedback from users faster and iterate on their products more effectively.

::: info What We’ll Cover in This Tutorial

In this tutorial, we’ll walk through the process of setting up a simple CI/CD pipeline that automates the deployment of code changes from a Bitbucket repository to a Linux server. Here’s what you’ll learn:

1. How to configure a Bitbucket repository to send webhook notifications whenever there’s a push or merge to a specific branch.
2. How to set up a Flask-based Python server on your Linux server to listen for incoming webhook events.
3. How to write a script that pulls the latest changes from the repository and deploys them to the server.
4. How to test and troubleshoot your automated deployment process.

:::

By the end of this tutorial, you’ll have a working example of a basic CI/CD pipeline that you can customize and expand as needed. Let’s get started!

---

## Step 1: Set Up a Webhook in Bitbucket

Before starting with the setup, let’s briefly explain what a **webhook** is and how it fits into our CI/CD process.

A webhook is a mechanism that allows one system to notify another system about an event in real-time. In the context of Bitbucket, a webhook can be configured to send an HTTP request (often a POST request with payload data) to a specified URL whenever a specific event occurs in your repository, such as a push to a branch or a pull request merge.

In our case, the webhook will notify our Flask-based Python server (running on your Linux server) whenever there’s a push or merge to a specific branch. This notification will trigger a script on the server to pull the latest changes from the repository and deploy them automatically. Essentially, the webhook acts as the bridge between Bitbucket and your server, enabling seamless automation of the deployment process.

Now that you understand the role of a webhook, let’s set one up in Bitbucket:

1. Log in to Bitbucket and navigate to your repository.
2. On the left-hand sidebar, click on **Settings**.
3. Under the **Workflow** section, find and click on **Webhooks**.
4. Click the **Add webhook** button.
5. Enter a name for your webhook (for example, "Automatic Pull").
6. In the **URL** field, provide the URL to your server where the webhook will send the request. If you’re running a Flask app locally, this would be something like `http://your-server-ip/pull-repo`. (For production environments, it’s highly recommended to use HTTPS to secure the communication between Bitbucket and your server.)
7. In the **Triggers** section, choose the events you want to listen to. For this example, we will select **Push** (and optionally, **Pull Request Merged** if you want to deploy after merges, too).
8. Save the webhook with a self-explanatory name so it’s easy to identify later.

Once the webhook is set up, Bitbucket will send a POST request to the specified URL every time the selected event occurs. In the next steps, we’ll set up a Flask server to handle these incoming requests and trigger the deployment process.

Here is what you should see when you setup up the Bitbucket webhook

![Bitbucket screen showing the user the creation of a webhook, where your server will pull the modifications when you push or merge in your reposiroty.](https://cdn.hashnode.com/res/hashnode/image/upload/v1738092826221/e0d96fd3-d843-4064-a08d-4de95b985800.png)

---

## Step 2: Set Up the Flask Listener on Your Linux Server

In the next step, you’ll set up a simple web server on your Linux machine that will listen for the webhook from Bitbucket. When it receives the notification, it will execute a `git pull` or a force pull (in case of local changes) to update the repository.

### Install Flask:

To create the Flask application, first install Flask by running:

```sh
pip install flask
```

### Create the Flask App:

Create a new Python script (for example, <VPIcon icon="fa-brands fa-python"/>`app_repo_pull.py`) on your server and add the following code:

```py :collapsed-lines title="app_repo_pull.py"
from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/pull-repo', methods=['POST'])
def pull_repo():
    try:
        # Fetch the latest changes from the remote repository
        subprocess.run(["git", "-C", "/path/to/your/repository", "fetch"], check=True)
        # Force reset the local branch to match the remote 'test' branch
        subprocess.run(["git", "-C", "/path/to/your/repository", "reset", "--hard", "origin/test"], check=True)  # Replace 'test' with your branch name
        return "Force pull successful", 200
    except subprocess.CalledProcessError:
        return "Failed to force pull the repository", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

Here’s what this code does:

- `subprocess.run (["git", "-C", "/path/to/your/repository", "fetch"])`: This command fetches the latest changes from the remote repository without affecting the local working directory.
- `subprocess.run (["git", "-C", "/path/to/your/repository", "reset", "--hard", "origin/test"])`: This command performs a hard reset, forcing the local repository to match the remote <VPIcon icon="fas fa-code-branch"/>`test` branch. Replace <VPIcon icon="fas fa-code-branch"/>`test` with the name of your branch.

Make sure to replace `/path/to/your/repository` with the actual path to your local Git repository.

---

## Step 3: Expose the Flask App (Optional)

If you want the Flask app to be accessible from outside your server, you need to expose it publicly. For this, you can set up a reverse proxy with NGINX. Here's how to do that:

First, install NGINX if you don't have it already by running this command:

```sh
sudo apt-get install nginx
```

Next, you’ll need to configure NGINX to proxy requests to your Flask app. Open the NGINX configuration file:

```sh
sudo nano /etc/nginx/sites-available/default
```

Modify the configuration to include this block:

```conf title="default"
server {
    listen 80;
    server_name your-server-ip;

    location /pull-repo {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Now just reload NGINX to apply the changes:

```sh
sudo systemctl reload nginx
```

---

## Step 4: Test the Setup

Now that everything is set up, go ahead and start the Flask app by executing this Python script:

```sh
python3 app_repo_pull.py
```

Now to test if everything is working:

1. **Make a commit**: Push a commit to the <VPIcon icon="fas fa-code-branch"/>`test` branch in your Bitbucket repository. This action will trigger the webhook.
2. **Webhook trigger**: The webhook will send a POST request to your server. The Flask app will receive this request, perform a force pull from the <VPIcon icon="fas fa-code-branch"/>`test` branch, and update the local repository.
3. **Verify the pull**: Check the log output of your Flask app or inspect the local repository to verify that the changes have been pulled and applied successfully.

---

## Step 5: Security Considerations

When exposing a Flask app to the internet, securing your server and application is crucial to protect it from unauthorized access, data breaches, and attacks. Here are the key areas to focus on:

### 1. Use a Secure Server with Proper Firewall Rules

A secure server is one that is configured to minimize exposure to external threats. This involves using firewall rules, minimizing unnecessary services, and ensuring that only required ports are open for communication.

::: tip Example of a secure server setup:

- **Minimal software**: Only install the software you need (for example, Python, Flask, NGINX) and remove unnecessary services.
- **Operating system updates**: Ensure your server's operating system is up-to-date with the latest security patches.
- **Firewall configuration**: Use a firewall to control incoming and outgoing traffic and limit access to your server.

For example, a basic **UFW (Uncomplicated Firewall)** configuration on Ubuntu might look like this:

```sh
# Allow SSH (port 22) for remote access
sudo ufw allow ssh

# Allow HTTP (port 80) and HTTPS (port 443) for web traffic
sudo ufw allow http
sudo ufw allow https

# Enable the firewall
sudo ufw enable

# Check the status of the firewall
sudo ufw status
```

In this case:

- The firewall allows incoming SSH connections on port 22, HTTP on port 80, and HTTPS on port 443.
- Any unnecessary ports or services should be blocked by default to limit exposure to attacks.

:::

::: tip Additional Firewall Rules:

- **Limit access to webhook endpoint**: Ideally, only allow traffic to the webhook endpoint from Bitbucket's IP addresses to prevent external access. You can set this up in your firewall or using your web server (for example, NGINX) by only accepting requests from Bitbucket's IP range.
- **Deny all other incoming traffic**: For any service that does not need to be exposed to the internet (for example, database ports), ensure those ports are blocked.

:::

### 2. Add Authentication to the Flask App

Since your Flask app will be publicly accessible via the webhook URL, you should consider adding authentication to ensure only authorized users (such as Bitbucket's servers) can trigger the pull.

#### Basic Authentication Example:

You can use a simple token-based authentication to secure your webhook endpoint. Here’s an example of how to modify your Flask app to require an authentication token:

```py :collapsed-lines
from flask import Flask, request, abort
import subprocess

app = Flask(__name__)

# Define a secret token for webhook verification
SECRET_TOKEN = 'your-secret-token'

@app.route('/pull-repo', methods=['POST'])
def pull_repo():
    # Check if the request contains the correct token
    token = request.headers.get('X-Hub-Signature')
    if token != SECRET_TOKEN:
        abort(403)  # Forbidden if the token is incorrect

    try:
        subprocess.run(["git", "-C", "/path/to/your/repository", "fetch"], check=True)
        subprocess.run(["git", "-C", "/path/to/your/repository", "reset", "--hard", "origin/test"], check=True)
        return "Force pull successful", 200
    except subprocess.CalledProcessError:
        return "Failed to force pull the repository", 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

::: tip How it works:

- The `X-Hub-Signature` is a custom header that you add to the request when setting up the webhook in Bitbucket.
- Only requests with the correct token will be allowed to trigger the pull. If the token is missing or incorrect, the request is rejected with a `403 Forbidden` response.

:::

You can also use more complex forms of authentication, such as OAuth or HMAC (Hash-based Message Authentication Code), but this simple token approach works for many cases.

### 3. Use HTTPS for Secure Communication

It’s crucial to encrypt the data transmitted between your Flask app and the Bitbucket webhook, as well as any sensitive data (such as tokens or passwords) being transmitted over the network. This ensures that attackers cannot intercept or modify the data.

#### Why HTTPS?

- **Data encryption**: HTTPS encrypts the communication, ensuring that sensitive data like your authentication token is not exposed to man-in-the-middle attacks.
- **Trust and integrity**: HTTPS helps ensure that the data received by your server hasn’t been tampered with.

#### Using Let’s Encrypt to Secure Your Flask App with SSL:

1. **Install Certbot** (the tool for obtaining Let’s Encrypt certificates):

```sh
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

**Obtain a free SSL certificate for your domain**:

```sh
sudo certbot --nginx -d your-domain.com
```

- This command will automatically configure Nginx to use HTTPS with a free SSL certificate from Let’s Encrypt.
- **Ensure HTTPS is used**: Make sure that your Flask app or Nginx configuration forces all traffic to use HTTPS. You can do this by setting up a redirection rule in Nginx:

```conf title="default"
server {
    listen 80;
    server_name your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Other Nginx configuration...
}
```

**Automatic Renewal**: Let’s Encrypt certificates are valid for 90 days, so it’s important to set up automatic renewal:

```sh
sudo certbot renew --dry-run
```

This command tests the renewal process to make sure everything is working.

### 4. Logging and Monitoring

Implement logging and monitoring for your Flask app to track any unauthorized attempts, errors, or unusual activity:

- **Log requests**: Log all incoming requests, including the IP address, request headers, and response status, so you can monitor for any suspicious activity.
- **Use monitoring tools**: Set up tools like **Prometheus**, **Grafana**, or **New Relic** to monitor server performance and app health.

---

## Wrapping Up

In this tutorial, we explored how to set up a simple, beginner-friendly CI/CD pipeline that automates deployments using Bitbucket, a Linux server, and Python with Flask. Here’s a recap of what you’ve learned:

1. **CI/CD Fundamentals**: We discussed the basics of Continuous Integration (CI) and Continuous Delivery/Deployment (CD), which are essential practices for automating the integration, testing, and deployment of code. You learned how CI/CD helps speed up development, reduce errors, and improve collaboration among developers.
2. **Setting Up Bitbucket Webhooks**: You learned how to configure a Bitbucket webhook to notify your server whenever there’s a push or merge to a specific branch. This webhook serves as a trigger to initiate the deployment process automatically.
3. **Creating a Flask-based Webhook Listener**: We showed you how to set up a Flask app on your Linux server to listen for incoming webhook requests from Bitbucket. This Flask app receives the notifications and runs the necessary Git commands to pull and deploy the latest changes.
4. **Automating the Deployment Process**: Using Python and Flask, we automated the process of pulling changes from the Bitbucket repository and performing a force pull to ensure the latest code is deployed. You also learned how to configure the server to expose the Flask app and accept requests securely.
5. **Security Considerations**: We covered critical security steps to protect your deployment process:
    - **Firewall Rules**: We discussed configuring firewall rules to limit exposure and ensure only authorized traffic (from Bitbucket) can access your server.
    - **Authentication**: We added token-based authentication to ensure only authorized requests can trigger deployments.
    - **HTTPS**: We explained how to secure the communication between your server and Bitbucket using SSL certificates from Let's Encrypt.
    - **Logging and Monitoring**: Lastly, we recommended setting up logging and monitoring to keep track of any unusual activity or errors.

### Next Steps

By the end of this tutorial, you now have a working example of an automated deployment pipeline. While this is a basic implementation, it serves as a foundation you can build on. As you grow more comfortable with CI/CD, you can explore advanced topics like:

- Multi-stage deployment pipelines
- Integration with containerization tools like Docker
- More complex testing and deployment strategies
- Use of orchestration tools like Kubernetes for scaling

CI/CD practices are continually evolving, and by mastering the basics, you’ve set yourself up for success as you expand your skills in this area. Happy automating and thank you for reading!

You can [fork the code from here (<VPIcon icon="iconfont icon-github"/>`jpromanonet/ci_cd_fcc`)](https://github.com/jpromanonet/ci_cd_fcc/tree/main).

<SiteInfo
  name="jpromanonet/ci_cd_fcc"
  desc="Free Code Camp example of CI/CD using python, flask and nginx"
  url="https://github.com/jpromanonet/ci_cd_fcc/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bdc9e559fbd4b77bbed1459b135ba772c7267cfc85ce5846b11239192f2ecf10/jpromanonet/ci_cd_fcc"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Basic CI/CD Pipeline with Webhooks on Linux",
  "desc": "In the fast-paced world of software development, delivering high-quality applications quickly and reliably is crucial. This is where CI/CD (Continuous Integration and Continuous Delivery/Deployment) comes into play. CI/CD is a set of practices and to...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/create-a-basic-cicd-pipeline-with-webhooks-on-linux.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
