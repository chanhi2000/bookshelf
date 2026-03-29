---
lang: en-US
title: "How to Build a Local DevOps HomeLab with Docker, Kubernetes, and Ansible"
description: "Article(s) > How to Build a Local DevOps HomeLab with Docker, Kubernetes, and Ansible"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Kubernetes
  - Virtualbox
  - Vagrant
  - Ansible
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - k8s
  - kubernetes
  - virtualbox
  - vagrant
  - ansible
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Local DevOps HomeLab with Docker, Kubernetes, and Ansible"
    - property: og:description
      content: "How to Build a Local DevOps HomeLab with Docker, Kubernetes, and Ansible"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-local-devops-homelab-with-docker-kubernetes-and-ansible.html
prev: /devops/docker/articles/README.md
date: 2026-04-14
isOriginal: false
author:
  - name: Osomudeya Zudonu
    url: https://freecodecamp.org/news/author/Osomudeya/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1e970f8b-eb52-4582-9c98-13cbce867c89.png
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
  "title": "Kubernetes > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/k8s/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Vagrant > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vagrant/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Ansible > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/ansible/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Local DevOps HomeLab with Docker, Kubernetes, and Ansible"
  desc="The first time I tried to follow a DevOps tutorial, it told me to sign up for AWS. I did. I spun up an EC2 instance, followed along for an hour, and then forgot to shut it down. A week later I had a $"
  url="https://freecodecamp.org/news/how-to-build-a-local-devops-homelab-with-docker-kubernetes-and-ansible"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1e970f8b-eb52-4582-9c98-13cbce867c89.png"/>

The first time I tried to follow a DevOps tutorial, it told me to sign up for AWS.

I did. I spun up an EC2 instance, followed along for an hour, and then forgot to shut it down. A week later I had a $34 bill for a machine running nothing.

That was the last time I practiced on someone else's infrastructure.

Everything in this guide runs on your laptop. No cloud account, no credit card, no bill at the end of the month. By the end, you'll be able to spin up a multi-server environment from scratch, configure it automatically with Ansible, serve a site you wrote yourself, and diagnose what breaks when you intentionally destroy it.

That last part is where the actual learning happens.

::: note Prerequisites

Before you start, make sure you have:

- A laptop with at least 8GB of RAM (16GB is better)
- At least 20GB of free disk space
- Windows, macOS, or Linux operating system
- Administrator access to your computer
- Virtualization enabled in your BIOS/UEFI settings
- A stable internet connection for the initial downloads

Knowledge and comfort level:

- You should be comfortable using a terminal (running commands, changing directories, and editing small text files with whatever editor you like).
- Basic familiarity with concepts like “a server,” “SSH,” and “a port” helps, but you don't need prior experience with Docker, Kubernetes, Vagrant, or Ansible. This guide introduces them as you go.

If you can follow step-by-step instructions and read error output without panicking, you're ready.

:::

---

## What is DevOps?

DevOps is the practice of breaking down the wall between software development and IT operations teams.

Traditionally, developers write code and hand it off to operations teams to deploy and maintain. That handoff causes delays, misunderstandings, and outages. DevOps is what happens when both teams work together from the start.

The tools you'll install in this guide each solve a specific part of that process:

- **Docker** packages your application and everything it needs into a portable container that runs the same way on any machine.
- **Kubernetes** manages multiple containers at scale, handling restarts, networking, and load balancing automatically.
- **Vagrant** creates and manages virtual machine environments so your whole team always works on identical setups.
- **Ansible** automates repetitive configuration tasks across many servers without writing a script for each one.

---

## Why Build a Local Lab?

A local lab gives you a safe place to break things, fix them, and learn from that process without any cost or risk.

Here's what you get with a local setup:

- **Zero cost.** No cloud bills, no surprise charges, and no credit card required.
- **Works offline.** Practice anywhere, even without internet after the initial setup.
- **Full control.** You manage every layer from the OS up to the application.
- **Safe experimentation.** Break things freely. Nothing here affects production.
- **Fast feedback.** No waiting for cloud resources to spin up. Everything runs on your machine.

The tradeoff is resource limits. Your laptop's CPU and RAM are the ceiling. You can't simulate large-scale deployments, and some cloud-native services like AWS Lambda or S3 have no direct local equivalent. But for learning core DevOps workflows, none of that matters.

---

## How to Set Up Docker

Docker is the foundation of this lab. Every other tool in this guide either runs inside Docker containers or works alongside them.

### How to Install Docker on Windows

First, enable virtualization in your BIOS:

1. Restart your computer and enter BIOS/UEFI setup. The key is usually F2, F10, Del, or Esc during boot.
2. Find the virtualization setting. It's usually listed as Intel VT-x, AMD-V, SVM, or Virtualization Technology.
3. Enable it, save your changes, and exit.

Then install Docker Desktop:

1. Download Docker Desktop from [<VPIcon icon="fa-brands fa-docker"/>Docker's official website](https://docker.com/products/docker-desktop/).
2. Run the installer and follow the prompts.
3. Enable WSL 2 (Windows Subsystem for Linux) when asked.
4. Restart your computer.
5. Open Docker Desktop from the Start menu and wait for the whale icon in the taskbar to stop animating.

::: note Troubleshooting

If Docker fails to start, run this in PowerShell as Administrator to verify virtualization is active:

```powershell
systeminfo | findstr "Hyper-V Requirements"
```

All items should show "Yes". If they don't, revisit your BIOS settings.

:::

### How to Install Docker on Mac

1. Download Docker Desktop for Mac from [<VPIcon icon="fa-brands fa-docker"/>Docker's website](https://docker.com/products/docker-desktop/).
2. Open the downloaded `.dmg` file and drag Docker to your Applications folder.
3. Open Docker from Applications.
4. Enter your password when prompted.
5. Wait for the whale icon in the menu bar to stop animating.

### How to Install Docker on Linux

Run these commands in order:

```sh
# Update your package lists
sudo apt-get update

# Install prerequisites
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add the Docker repository
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Update and install Docker
sudo apt-get update
sudo apt-get install docker-ce

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group
sudo usermod -aG docker $USER
```

Log out and back in for the group change to take effect.

### How to Test Docker

Run this command:

```sh
docker run hello-world
```

If you see "Hello from Docker!" then Docker is working correctly.

Docker is set up. Next, you'll install Kubernetes to manage containers at scale.

---

## How to Set Up Kubernetes

Kubernetes manages containers at scale. For a local lab, you have four options. Here's how to choose:

| Tool | Best for | RAM needed |
| --- | --- | --- |
| **Minikube** | Beginners. Easiest setup, built-in dashboard | 2GB+ |
| **Kind** | Faster startup, works well inside CI pipelines | 1GB+ |
| **k3s** | Low-resource machines. Lightweight but production-like | 512MB+ |
| **kubeadm** | Learning how clusters are actually bootstrapped in production | 2GB+ per node |

If you're just starting out, use Minikube. It has the simplest setup and a visual dashboard that helps you understand what's happening inside the cluster.

If your laptop has 8GB RAM or less, use k3s. It runs lean and behaves closer to a real cluster than Minikube does.

Use kubeadm only if you want to understand how Kubernetes nodes join a cluster — it requires more manual steps and isn't beginner-friendly.

### How to Install Minikube (Recommended for Beginners)

Minikube creates a single-node Kubernetes cluster on your laptop.

::: tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

1. Download the Minikube installer from [Minikube's GitHub releases page (<VPIcon icon="iconfont icon-github"/>`kubernetes/minikube`)](https://github.com/kubernetes/minikube/releases).
2. Run the `.exe` installer.
3. Open Command Prompt as Administrator and start Minikube:

```sh
minikube start --driver=docker
```

@tab <VPIcon icon="iconfont icon-macos"/>

```sh
brew install minikube
minikube start --driver=docker
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
chmod +x minikube-linux-amd64
sudo mv minikube-linux-amd64 /usr/local/bin/minikube
minikube start --driver=docker
```

:::

Test your cluster:

```sh
minikube status
minikube dashboard
```

### How to Install k3s (Recommended for Low-RAM Machines)

k3s is a lightweight version of Kubernetes that installs in under a minute. It runs lean and behaves like a real cluster — not a simplified demo version.

On Linux (and Mac via Multipass):

```sh
curl -sfL https://get.k3s.io | sh -
```

That single command installs k3s and runs it automatically in the background. Check that it is running:

```sh
sudo k3s kubectl get nodes
```

You should see one node with status `Ready`.

On Mac directly — k3s doesn't run natively on macOS. Use [<VPIcon icon="fas fa-globe"/>Multipass](https://multipass.run) to spin up a lightweight Ubuntu VM first, then run the install command inside it.

On Windows — use WSL2 (Ubuntu), then run the install command inside your WSL2 terminal.

### How to Install Kind (Kubernetes IN Docker)

Kind runs a full Kubernetes cluster inside Docker containers. It starts faster than Minikube and is useful if you want to run multiple clusters simultaneously.

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
brew install kind
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
choco install kind
```

:::

Create a cluster:

```sh
kind create cluster --name my-local-lab
```

### How to Install kubeadm (For Understanding Cluster Bootstrap)

kubeadm is the tool Kubernetes uses to initialize and join nodes in a real cluster. Use this when you want to understand what happens under the hood — not as your daily driver.

It requires at least two machines (or VMs). The setup is more involved than the options above. Follow the [<VPIcon icon="iconfont icon-k8s"/>official kubeadm installation guide](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/) for your OS, then initialize your cluster:

```sh
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

After init, join worker nodes using the command kubeadm prints at the end of the output.

### How to Install kubectl

kubectl is the command-line tool you use to interact with any Kubernetes cluster.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

Download `kubectl.exe` from [<VPIcon icon="iconfont icon-k8s"/>Kubernetes' website](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/) and place it in a directory that is in your PATH. Or install with Chocolatey:

```sh
choco install kubernetes-cli
```

@tab <VPIcon icon="iconfont icon-macos"/>

```sh
brew install kubectl
```

@tab <VPIcon icon="fa-brands fa-linux"/>

```sh
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/kubectl
```

:::

Test it:

```sh
kubectl get pods --all-namespaces
```

On a fresh cluster, you'll see system pods running in the `kube-system` namespace — things like `coredns` and `storage-provisioner`. That's the expected output. It means your cluster is up and kubectl can talk to it.

Kubernetes is running. Next is Vagrant. But before that, there's one important distinction worth making.

#### Docker vs Vagrant — they aren't the same thing

Docker creates containers: lightweight processes that share your operating system's kernel. Vagrant creates full virtual machines: isolated computers with their own OS running inside your laptop.

Containers are fast and small. VMs are heavier but behave exactly like real servers. You'll use both in this lab for different reasons.

---

## How to Set Up Vagrant

Vagrant lets you create and manage reproducible virtual machine environments. It is ideal for simulating multi-server setups on a single laptop.

### How to Install Vagrant on Windows

1. Download and install [<VPIcon icon="iconfont icon-virtualbox"/>VirtualBox](https://virtualbox.org/wiki/Downloads) with default options.
2. Download and install [<VPIcon icon="iconfont icon-vagrant"/>Vagrant](https://developer.hashicorp.com/vagrant/downloads).
3. Restart your computer if prompted.

::: note

VirtualBox and Hyper-V can't run at the same time on Windows. Check if Hyper-V is active:

```sh
systeminfo | findstr "Hyper-V"
```

If it's enabled, you have two options: switch to the Hyper-V Vagrant provider, or disable Hyper-V with:

```powershell
Disable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

Restart after disabling.

:::

### How to Install Vagrant on Mac and Linux

On Mac:

1. Download and install [<VPIcon icon="iconfont icon-virtualbox"/>VirtualBox](https://virtualbox.org/wiki/Downloads).
2. After installation, open **System Preferences > Security & Privacy > General**. You will see a message saying system software from Oracle was blocked. Click **Allow** and restart your Mac. Without this step, VirtualBox will not run.
3. Download and install [<VPIcon icon="iconfont icon-vagrant"/>Vagrant](https://developer.hashicorp.com/vagrant/downloads).

**Note for Apple Silicon (M1/M2/M3) Macs:** VirtualBox support on Apple Silicon is still limited. If you're on an M-series Mac, use [<VPIcon icon="fas fa-globe"/>UTM](https://mac.getutm.app/) as your VM provider instead, or use Multipass which works natively on Apple Silicon.

On Linux:

1. Download and install [<VPIcon icon="iconfont icon-virtualbox"/>VirtualBox](https://virtualbox.org/wiki/Downloads).
2. Download and install [<VPIcon icon="iconfont icon-vagrant"/>Vagrant](https://developer.hashicorp.com/vagrant/downloads).

Verify both are installed:

```sh
vboxmanage --version
vagrant --version
```

### How to Create Your First Vagrant Environment

Create a new directory for your project. Inside it, create a file named <VPIcon icon="iconfont icon-vagrant"/>`Vagrantfile` with this content:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  # Create a private network between VMs
  config.vm.network "private_network", type: "dhcp"

  # Forward port 8080 on your laptop to port 80 on the VM
  config.vm.network "forwarded_port", guest: 80, host: 8080

  # Install Nginx when the VM starts
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
    echo "Hello from Vagrant!" > /var/www/html/index.html
  SHELL
end
```

Start the VM:

```sh
vagrant up
```

![screnshot showing VB server and terminal installation processes](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/342f11ad-7c7d-40d2-a810-113b8c71edac.png)

Visit `http://localhost:8080` in your browser. You should see "Hello from Vagrant!"

![screenshot showing "Hello from Vagrant!" in browser](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/bcd66a76-4a5b-4f26-bb7e-e203672968d8.png)

#### Troubleshooting SSH on Windows

If `vagrant ssh` fails, try:

```sh
vagrant ssh -- -v
```

Or connect manually:

```sh
ssh -i .vagrant/machines/default/virtualbox/private_key vagrant@127.0.0.1 -p 2222
```

### How to Create a Local Vagrant Box Without Internet

::: note

Most readers can skip this. Only do this if you want to work fully offline after the initial setup.

1. Download [<VPIcon icon="fa-brands fa-ubuntu"/>Ubuntu 20.04 LTS](https://ubuntu.com/download/server) and save the `.iso` file locally.
2. Open VirtualBox and create a new VM: Name it `ubuntu-devops`, Type: Linux, Version: Ubuntu (64-bit).
3. Assign 2048MB RAM and a 20GB VDI disk.
4. Attach the `.iso` under Storage > Optical Drive.
5. Start the VM and complete the Ubuntu installation.
6. Once installed, shut down the VM and run:

```sh
VBoxManage list vms
vagrant package --base "ubuntu-devops" --output ubuntu2004.box
vagrant box add ubuntu2004 ubuntu2004.box
```

You now have a reusable local box that works without internet.

You can spin up virtual machines. Next is Ansible, which automates what goes inside them.

:::

---

## How to Install Ansible

Ansible automates configuration and software installation across multiple servers. Instead of SSH-ing into ten machines and running the same commands manually, you write a playbook once and Ansible handles the rest.

### How to Install Ansible

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

Ansible doesn't run natively on Windows. You need to use it through WSL (Windows Subsystem for Linux).

1. Open PowerShell as Administrator and enable WSL:

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

1. Restart your computer.
2. Install Ubuntu from the Microsoft Store.
3. Open Ubuntu and install Ansible:

```sh
sudo apt update
sudo apt install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

@tab <VPIcon icon="iconfont icon-macos"/>

```sh
brew install ansible
```

@tab <VPIcon icon="fa-brands fa-debian"/>,<VPIcon icon="fa-brands fa-ubuntu"/>

```sh
sudo apt update
sudo apt install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

@tab <VPIcon icon="fa-brands fa-redhat"/>,<VPIcon icon="fa-brands fa-fedora"/>

```sh
sudo yum install ansible
```

:::

### How to Install Ansible on Linux

### How to Test Ansible

Create a file called `hosts` in your current directory:

```toml
[local]
localhost ansible_connection=local
```

Create a file called <VPIcon icon="iconfont icon-yaml"/>`playbook.yml` in the same directory:

```yaml title="playbook.yaml"
---
- name: Test playbook
  hosts: local
  tasks:
    - name: Print a message
      debug:
        msg: "Ansible is working!"
```

Run the playbook, passing the local `hosts` file with `-i`:

```sh
ansible-playbook -i hosts playbook.yml
```

You should see the message "Ansible is working!" in the output.

![screenshot showing ansible playbook complete terminal installation](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/081e6ff3-b983-42a0-960e-5340bbd24e3b.png)

Alright, all your tools are installed. Now you'll use them together to build something real.

---

## How to Build Your First DevOps Project

You can find the entire code for this lab in this repo: [<VPIcon icon="iconfont icon-github"/>`Osomudeya/homelab-demo-article`](https://github.com/Osomudeya/homelab-demo-article)

Now you'll put these tools together in one project. Each tool will perform its actual job, and nothing is forced.

**Before you start,** create a fresh directory for this project. Don't run it inside the directory you used to test Vagrant earlier, as the Vagrantfile here is different and will conflict.

You'll be building a two-VM environment: one machine serves a web page you write yourself inside a Docker container, and the other runs a MariaDB database. Vagrant creates the machines and Ansible configures them. The page you see at the end is yours.

### Step 1: Create the Project Directory

```sh
mkdir devops-lab-project && cd devops-lab-project
```

### Step 2: Write Your Site Content

Create a file called <VPIcon icon="fa-brands fa-html5"/>`index.html` in the project directory. Write whatever you want on this page — it's what you'll see in your browser at the end:

```html title="index.html"
<!DOCTYPE html>
<html>
  <head><title>My DevOps Lab</title></head>
  <body>
    <h1>My DevOps Lab</h1>
    <p>Provisioned by Vagrant. Configured by Ansible. Served by Docker.</p>
    <p>Built on a laptop. No cloud account needed.</p>
  </body>
</html>
```

Change the text to whatever you like. This is your page.

### Step 3: Write the <VPIcon icon="iconfont icon-vagrant"/>`Vagrantfile`

Create a file called <VPIcon icon="iconfont icon-vagrant"/>`Vagrantfile` in the same directory:

```ruby title="Vagrantfile"
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  config.vm.define "web" do |web|
    web.vm.network "private_network", ip: "192.168.33.10"
    web.vm.network "forwarded_port", guest: 80, host: 8080
  end

  config.vm.define "db" do |db|
    db.vm.network "private_network", ip: "192.168.33.11"
  end
end
```

### Step 4: Start the Virtual Machines

```sh
vagrant up
```

The first run downloads the `ubuntu/focal64` box, which is around 500MB.

![screenshot showing virtualbox installation processes in terminal](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/264866b0-9977-490e-96a3-69b3070be589.png)

Expect this to take 10–30 minutes depending on your connection. Subsequent runs will be much faster since the box is cached locally.

![screenshot showing 2 virtualbox servers "running" in VB manager](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/118d2fb2-70f6-41e8-afb2-6f45fb895e98.png)

### Step 5: Create the Ansible Inventory

Create a file called `inventory` in the same directory:

```toml
[webservers]
192.168.33.10 ansible_user=vagrant ansible_ssh_private_key_file=.vagrant/machines/web/virtualbox/private_key

[dbservers]
192.168.33.11 ansible_user=vagrant ansible_ssh_private_key_file=.vagrant/machines/db/virtualbox/private_key
```

Ansible uses the Vagrant-generated private keys so it can SSH in as the `vagrant` user. Host key checking for this lab is turned off in <VPIcon icon="iconfont icon-ansible"/>`ansible.cfg` (next step), not in the inventory.

### Step 6: Create the Ansible Config File

Before running the playbook, create a file called <VPIcon icon="iconfont icon-ansible"/>`ansible.cfg` in the same directory:

```toml title="ansible.cfg
[defaults]
inventory = inventory
host_key_checking = False
```

The inventory line tells Ansible to use the inventory file in this folder by default. host_key_checking = False tells Ansible not to verify SSH host keys when connecting to your Vagrant VMs. Without it, Ansible will fail with a Host key verification failed error on first connection because the VM's key is not yet in your known_hosts file.

These settings are for a local lab only. Do not use host_key_checking = False for production systems.

### Step 7: Create the Ansible Playbook

Create a file called <VPIcon icon="iconfont icon-yaml"/>`playbook.yml`:

```yaml :collapsed-lines title="playbook.yml"
---
- name: Configure web server
  hosts: webservers
  become: yes
  tasks:

    - name: Install Docker
      apt:
        name: docker.io
        state: present
        update_cache: yes

    - name: Start Docker service
      service:
        name: docker
        state: started
        enabled: yes

    # Create the directory that will hold your site content
    - name: Create web content directory
      file:
        path: /var/www/html
        state: directory
        mode: '0755'

    # This copies your index.html from your laptop into the VM
    - name: Copy site content to web server
      copy:
        src: index.html
        dest: /var/www/html/index.html

    # This mounts that file into the Nginx container so it serves your page
    # The -v flag connects /var/www/html on the VM to /usr/share/nginx/html inside the container
    - name: Run Nginx serving your content
      shell: |
        docker rm -f webapp 2>/dev/null || true
        docker run -d --name webapp --restart always -p 80:80 \
          -v /var/www/html:/usr/share/nginx/html:ro nginx

- name: Configure database server
  hosts: dbservers
  become: yes
  tasks:

    # Hash sum mismatch on .deb downloads is often stale lists, a flaky mirror, or apt pipelining
    # behind NAT; fresh indices + Pipeline-Depth 0 usually fixes it on lab VMs.
    - name: Disable apt HTTP pipelining (mirror/proxy hash mismatch workaround)
      copy:
        dest: /etc/apt/apt.conf.d/99disable-pipelining
        content: 'Acquire::http::Pipeline-Depth "0";'
        mode: "0644"

    - name: Clear apt package index cache
      shell: apt-get clean && rm -rf /var/lib/apt/lists/* /var/lib/apt/lists/auxfiles/*
      changed_when: true

    - name: Update apt cache after reset
      apt:
        update_cache: yes

    - name: Install MariaDB
      apt:
        name: mariadb-server
        state: present
        update_cache: no

    - name: Start MariaDB service
      service:
        name: mariadb
        state: started
        enabled: yes
```

::: info Two lines worth paying attention to:

- `src: index.html` — Ansible looks for this file in the same directory as the playbook. That is the file you wrote in Step 2.
- `-v /var/www/html:/usr/share/nginx/html:ro` — this mounts the directory from the VM into the Nginx container. The `:ro` means read-only. Nginx serves whatever is in that folder.

:::

### Step 8: Run the Playbook

```sh
ansible-playbook -i inventory playbook.yml
```

You'll see task-by-task output as Ansible connects to each VM over SSH and configures it. A green `ok` or yellow `changed` next to each task means it worked. Red `fatal` means something failed.

![terminal screenshot of A green ok or yellow changed next to each task means it worked. Red fatal means something failed.](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/91241b41-981c-4e23-9dc4-8531e551c39e.png)

![terminal screenshot of playbook run completion](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/c02db252-8aff-42e5-b937-d812d070a75b.png)

### Step 9: Verify the Setup

Open `http://localhost:8080` in your browser. You should see the page you wrote in Step 2 served from inside a Docker container, running on a Vagrant VM, configured automatically by Ansible.

If you see the page, every tool in this lab is working together.

![Browser showing localhost:8082 with the heading "My DevOps Lab" and the text "Provisioned by Vagrant. Configured by Ansible. Served by Docker."](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/0d3d897b-3f51-46fb-b548-832cc5ec3272.png)

### Step 9: Clean Up (Optional)

When you're done:

```sh
vagrant destroy -f
```

This shuts down and deletes both VMs. Your <VPIcon icon="iconfont icon-vagrant"/>`Vagrantfile`, `inventory`, `playbook.yml`, and <VPIcon icon="fa-brands fa-html5"/>`index.html` stay on disk — run `vagrant up` followed by `ansible-playbook -i inventory playbook.yml` any time to bring it all back.

Now that you have a working lab, let's use it properly.

---

## How to Break Your Lab on Purpose

Following these steps has gotten you a running lab. Breaking things teaches you how everything actually works.

Here are five things to break and what to look for when you do.

### Break 1: Crash the Main Process Inside the Container (and Watch It Come Back)

Doing this just proves that something inside the container can die (like a real bug or OOM), Docker can restart the container because of `--restart always`, and your site can come back without re-running Ansible.

After `vagrant ssh web`, every `docker` command below runs **on the web VM**. So keep your browser on your laptop at `http://localhost:8080` (Vagrant forwards your host port to the VM’s port 80).

#### Troubleshooting: If Your Lab Isn't Ready

From your project folder on the host (your laptop) – unless the step says to run it on the VM:

- You ran `vagrant destroy -f`. Run `vagrant up`, then `ansible-playbook -i inventory playbook.yml`.
- `docker ps` shows `webapp` but status is Exited. On the web VM, run `sudo docker start webapp`, then `sudo docker ps` again.
- There's no `webapp` row in `docker ps -a`**.** Re-run `ansible-playbook -i inventory playbook.yml` on the host.

If the playbook is already applied and `webapp` is Up, skip this section and start at step 1 under Steps (happy path) below. (Don't skip SSH or `docker ps`. You need the VM shell and a quick check before you run `docker exec`.)

#### Steps (happy path)

::: tabs

@tab:active SSH into the web VM:

```sh
vagrant ssh web
```

@tab Confirm `webapp` is **Up**:

```sh
sudo docker ps
```

@tab Break it on purpose

kill the container’s main process **from inside** (PID 1). That ends the container the same way a crashing app would, not the same as `docker stop` on the host:

```sh
sudo docker exec webapp sh -c 'sleep 5 && kill 1'
```

The `sleep` 5 gives you a moment to switch to the browser. Right after you run the command, open or refresh [`http://localhost:8080`](http://localhost:8080). You may catch a brief error or blank page while nothing is listening on port 80. 

![Browser showing ERR_CONNECTION_RESET on localhost:8082 after the Nginx container process was killed](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/3ac89703-63f3-45d8-954f-35adbd2c7dec.png)

@tab Watch Docker restart the container:

```sh
watch sudo docker ps -a
```

![Terminal running watch docker ps showing webapp container status as Up 10 seconds after automatic restart](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/5c61d90d-61d6-4023-b3f5-e3eb427e8492.png)

Within a few seconds you should see **Exited (137)** become **Up** again. (Press <kbd>Ctrl</kbd>+<kbd>C</kbd> to exit `watch`.)

@tab Refresh the browser

You should see the same HTML as before, because the files live on the VM under <VPIcon icon="fas fa-folder-open"/>`/var/www/html` and are bind-mounted into the container; restarting only replaced the Nginx process, not those files.

:::

#### Why not `docker stop` or `docker kill` on the host for this demo?

Those commands go through Docker’s API. On many setups (including recent Docker), Docker treats them as you choosing to stop the container (`hasBeenManuallyStopped`), and `--restart always` may not bring the container back until you `docker start` it or similar.

Killing PID 1 from inside the container is treated more like an internal crash, so the restart policy you set in the playbook is the one you actually get to observe here.

**Kubernetes analogy:** A pod whose containers exit can be restarted by the kubelet; a pod you delete does not come back by itself.

::: important hat to observe (three separate checks):

1. **Exit code:** After `kill 1`, `docker ps -a` should show the container exited with code 137, meaning the main process was killed by a signal. That confirms the container really died, not that you ran `docker stop` on the host.
2. **Restart delay vs browser:** Watch how many seconds pass between Exited and Up in `docker ps -a`; that interval is Docker applying `--restart always`. That's separate from what you see in the browser: the browser only shows whether something is accepting connections on port 80 on the VM, so it may show an error or blank page during the gap even while Docker is about to restart the container.
3. **Content after recovery:** After status is Up again, refresh the page. You should see the same HTML as before. That shows your content lives on the VM disk (mounted into the container with `-v`), not inside a file that vanishes when the container process restarts. The process was replaced, not your <VPIcon icon="fa-brands fa-html5"/>`index.html` on the host path.


:::

### Break 2: Cause a Container Name Conflict

On a single Docker daemon (here, on your web VM), a container name is a **unique label**. Two running (or stopped) containers can't share the same name. Scripts and playbooks that always use `docker run --name webapp` without cleaning up first hit this error constantly and recognizing it saves time in real work.

**Before you start:** Ansible already created one container named `webapp`.  
Stay on the web VM (for example still inside `vagrant ssh web`) so the commands below run where that container lives.

So now, try to start a second container and also call it `webapp`. The image is plain `nginx` here on purpose – the point is the **name clash**, not matching your site’s ports or volume mounts.

```sh
sudo docker run -d --name webapp nginx
```

What actually happens here is that Docker **doesn't** create a second container. It returns an error immediately. Your original `webapp` is unchanged.

This is because the name `webapp` is already registered to the existing container (the error shows that container’s ID). Docker refuses to reuse the name until the old container is removed or renamed.

Example error (your ID will differ):

```plaintext title="output"
docker: Error response from daemon: Conflict. The container name "/webapp" is already in use by container "2e48b81a311c4b71cdc1e25e0df75a22296845c7eb53aab82f9ae739fb6410ec". You have to remove (or rename) that container to be able to reuse that name.
See 'docker run --help'.
```

![container name conflict terminal error screenshot](https://cdn.hashnode.com/uploads/covers/698d563262d4ce66226a844a/1fd42c16-c28e-4539-9290-3583206eb8ff.png)

To fix it, free the name, then create `webapp` again the same way the playbook does (publish port 80, mount your HTML, restart policy):

```sh
sudo docker rm -f webapp
sudo docker run -d --name webapp --restart always -p 80:80 \
  -v /var/www/html:/usr/share/nginx/html:ro nginx
```

After that, your site should behave as before (refresh `http://localhost:8080` from your laptop).

#### What to observe

Read Docker’s Conflict message end to end. You should see that the name `/webapp` is already in use and a container ID pointing at the existing box. In production, that pattern means “something already claimed this name. Just remove it, rename it, or pick a different name before you run `docker run` again.”

### Break 3: Make Ansible Fail to Reach a VM

Ansible separates “could not connect” from “connected, but a task broke.” The first is **UNREACHABLE**, the second is **FAILED**. Knowing which one you have tells you whether to fix network / SSH or playbook / packages / permissions.

On your laptop, in the project folder, edit `inventory` and change the web server address from `192.168.33.10` to an IP **no VM uses**, for example `192.168.33.99`. Save the file.

```toml
[webservers]
192.168.33.99 ansible_user=vagrant ansible_ssh_private_key_file=.vagrant/machines/web/virtualbox/private_key
```

What you run (from the same project folder on the host):

```sh
ansible-playbook -i inventory playbook.yml
```

After this, Ansible tries to SSH to `192.168.33.99`. Nothing on your lab network answers as that host (or SSH never succeeds), so Ansible **never runs tasks** on the web server. It stops that host with UNREACHABLE:

```plaintext
fatal: [192.168.33.99]: UNREACHABLE! => {"msg": "Failed to connect to the host via ssh"}
```

This is realistic because the same message shape appears when the IP is wrong, the VM isn't running, a firewall blocks port 22, or the network is misconfigured. The common thread is **no working SSH session**.

Now it's time to put it back: restore `192.168.33.10` in `inventory` and run `ansible-playbook -i inventory playbook.yml` again. The web play should reach the VM and complete (assuming your lab is up).

::: warning UNREACHABLE vs FAILED – what to observe

- If Ansible prints UNREACHABLE, you should assume it never opened SSH on that host and never ran tasks there. Go ahead and fix the connection (IP, VM up, firewall, key path) before you debug playbook logic.
- If Ansible prints FAILED, you should assume SSH worked and a task returned an error. Read the task output for the real cause (package name, permissions, syntax), not the network first.

When you debug later, you should look at the keyword Ansible prints: **UNREACHABLE** points to reachability while **FAILED** points to task output and the first failed task under that host.

:::

### Break 4: Fill the VM's Disk

Databases and other services need free disk for logs, temp files, and data. When the filesystem is full or nearly full, a service may fail to start or fail at runtime. This break walks through the same diagnosis habit you would use on a real server: check space, then read systemd and journal output for the service.

All commands below run **on the db VM** after `vagrant ssh db`. MariaDB was installed there by your playbook.

#### What you do:

1. Open a shell on the db VM:

```sh
vagrant ssh db
```

2. Allocate a large file full of zeros (here 1GB) to simulate something eating disk space:

```sh
sudo dd if=/dev/zero of=/tmp/bigfile bs=1M count=1024

df -h
```

Use `df -h` to see how full the root filesystem (or relevant mount) is. Your Vagrant disk may be large enough that 1GB only raises usage. If MariaDB still starts, you still practiced the checks. To see a stronger effect, you can repeat with a larger `count=` **only in a lab** (never fill production disks on purpose without a plan).

3. Ask systemd to restart MariaDB and show status:

```sh
sudo systemctl restart mariadb
sudo systemctl status mariadb
```

If the disk is critically full, restart may fail or the service may show failed or not running.

4. If something looks wrong, read recent logs for the MariaDB unit:

```sh
sudo journalctl -u mariadb --no-pager | tail -20
```

Errors often mention disk, space, read-only filesystem, or InnoDB being unable to write.

5. Clean up so your VM stays usable:

```sh
sudo rm /tmp/bigfile
```

Optionally run `sudo systemctl restart mariadb` again and confirm it is active (running).

::: info What to observe

- You should use `df -h` first to confirm whether the filesystem is actually tight. That avoids blaming the database when disk space is fine.
- You should read `systemctl status mariadb` to see whether systemd thinks the service is active, failed, or flapping.
- You should read `journalctl -u mariadb` when status is bad, so you can tie the failure to concrete errors from MariaDB or the kernel (often mentioning disk, space, or read-only filesystem). **Space + status + logs** is the same order you would use on a production server.

:::

### Break 5: Run Minikube Out of Resources

Kubernetes schedules pods onto nodes that have enough CPU and memory. If you ask for more than the cluster can place, some pods stay **Pending** and **Events** explain why (for example *Insufficient cpu*). That is not the same as a pod that starts and then crashes.

To do this, you'll need a local cluster (we're using [<VPIcon icon="iconfont icon-minikube"/>Minikube](https://minikube.sigs.k8s.io/docs/start/?arch=%2Fmacos%2Fx86-64%2Fstable%2Fbinary+download) in this guide) and `kubectl` on your laptop. This break doesn't use the Vagrant VMs. If you haven't installed Minikube yet, complete the "How to Set Up Kubernetes" section first, or skip this break until you do.

You'll run this on your **Mac, Linux, or Windows terminal** (host), not inside `vagrant ssh`. If you're still inside a VM, type `exit` until your prompt is back on the host.

#### What you do:

1. Check Minikube:

```sh
minikube status
```

If it's stopped, start it (Docker driver matches earlier sections):

```sh
minikube start --driver=docker
```

2. Create a deployment with many replicas so your single Minikube node can't run them all at once:

```sh
kubectl create deployment stress --image=nginx --replicas=20

# watch pods start
kubectl get pods -w
```

Press <kbd>Ctrl</kbd>+<kbd>C</kbd> when you're done watching. Some pods may stay **Pending** while others are **Running**.

3. Pick one Pending pod name from `kubectl get pods` and inspect it:

```sh
kubectl describe pod <pod-name>
```

Under Events, look for FailedScheduling and a line similar to:

```plaintext
Warning  FailedScheduling  0/1 nodes are available: 1 Insufficient cpu.
```

You might see **Insufficient memory** instead, depending on your machine.

4. Fix the lab by scaling back so the cluster can catch up:

```sh
kubectl scale deployment stress --replicas=2
```

You can delete the deployment entirely when finished: `kubectl delete deployment stress`.

**What to observe:**

- You should see Pending pods stay unscheduled until capacity frees up. That means the scheduler hasn't placed them on any **node** yet, usually because the node is out of CPU or memory for that workload.
- You should read `kubectl describe pod <pod-name>` and scroll to **Events**. Messages like Insufficient cpu or Insufficient memory mean the cluster ran out of schedulable capacity, not that the container image image is corrupt.
- You should contrast that with a pod that reaches Running and then CrashLoopBackOff, which usually means the process inside the container keeps exiting. that is an application or config problem, not a “nowhere to run” problem.

---

## What You Can Now Do

You didn't just install tools in this tutorial. You also used them.

You can now spin up two servers from a single file. You can write a playbook that installs software and deploys a container without touching either machine manually.

You can serve a page you wrote from inside a Docker container running on a Vagrant VM, and bring the whole thing back from scratch in one command.

You also broke it. You saw what a container conflict looks like, what Ansible prints when it can't reach a machine, what disk pressure does to a running service, and what a Kubernetes scheduler says when it runs out of resources. Those error messages aren't unfamiliar anymore.

That's the difference between someone who has read about DevOps and someone who has run it.

::: info

**Here are four free projects you can run in this same lab to go further:**

- **DevOps Home-Lab 2026** — Build a multi-service app (frontend, API, PostgreSQL, Redis) end-to-end with Docker Compose, Kubernetes, Prometheus/Grafana monitoring, GitOps with ArgoCD, and Cloudflare for global exposure.
- **KubeLab** — Trigger real Kubernetes failure scenarios, pod crashes, OOMKills, node drains, cascading failures, and watch how the cluster responds using live metrics.
- **K8s Secrets Lab** — Build a full secret management pipeline from AWS Secrets Manager into your cluster, including rotation behavior and IRSA.
- **DevOps Troubleshooting Toolkit** — Structured debugging guides across Linux, containers, Kubernetes, cloud, databases, and observability with copy-paste commands for real incidents.

All free and open source: [<VPIcon icon="iconfont icon-github"/>`Osomudeya/List-Of-DevOps-Projects`](https://github.com/Osomudeya/List-Of-DevOps-Projects).

<SiteInfo
  name="Osomudeya/List-Of-DevOps-Projects"
  desc="Contribute to Osomudeya/List-Of-DevOps-Projects development by creating an account on GitHub."
  url="https://github.com/Osomudeya/List-Of-DevOps-Projects/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f0351b92f55f108cd62788534a9b4d86444d8e9c7da1c95d07c8dfe64a955f93/Osomudeya/List-Of-DevOps-Projects"/>

If you want to go deeper, you can find six full chapters covering Terraform, Ansible, monitoring, CI/CD, and a simulated three-VM production environment at [<VPIcon icon="fas fa-globe"/>Build Your Own DevOps Lab](https://osomudeya.gumroad.com/l/BuildYourOwnDevOpsLab).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Local DevOps HomeLab with Docker, Kubernetes, and Ansible",
  "desc": "The first time I tried to follow a DevOps tutorial, it told me to sign up for AWS. I did. I spun up an EC2 instance, followed along for an hour, and then forgot to shut it down. A week later I had a $",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-local-devops-homelab-with-docker-kubernetes-and-ansible.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
