---
lang: en-US
title: "How to Create a GPU-Optimized Machine Image with HashiCorp Packer on GCP"
description: "Article(s) > How to Create a GPU-Optimized Machine Image with HashiCorp Packer on GCP"
icon: iconfont icon-packer
category:
  - DevOps
  - Packer
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - packer
  - gcp
  - google
  - google-cloud
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create a GPU-Optimized Machine Image with HashiCorp Packer on GCP"
    - property: og:description
      content: "How to Create a GPU-Optimized Machine Image with HashiCorp Packer on GCP"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-gpu-optimized-machine-image-with-hashicorp-packer-on-gcp.html
prev: /devops/packer/articles/README.md
date: 2026-04-23
isOriginal: false
author:
  - name: Rasheedat Atinuke Jamiu
    url: https://freecodecamp.org/news/author/Rash_RAJ/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fd393878-fe7c-458a-addf-7cd22d8280ac.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Packer > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/packer/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a GPU-Optimized Machine Image with HashiCorp Packer on GCP"
  desc="Every time you spin up GPU infrastructure, you do the same thing: install CUDA drivers, DCGM, apply OS‑level GPU tuning, and fight dependency issues. Same old ritual every single time, wasting expensi"
  url="https://freecodecamp.org/news/how-to-create-a-gpu-optimized-machine-image-with-hashicorp-packer-on-gcp"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fd393878-fe7c-458a-addf-7cd22d8280ac.png"/>

Every time you spin up GPU infrastructure, you do the same thing: install CUDA drivers, DCGM, apply OS‑level GPU tuning, and fight dependency issues. Same old ritual every single time, wasting expensive cloud credits and getting frustrated before actual work begins.

In this article, you'll build a reusable GPU-optimized machine image using Packer, pre-loaded with NVIDIA drivers, CUDA Toolkit, NVIDIA Container Toolkit, DCGM, and system-level GPU tuning like persistence mode.

::: note Prerequisites

- [<VPIcon icon="fas fa-globe"/>HashiCorp Packer](https://packer.io/) >= 1.9
- [Google Compute Packer plugin (<VPIcon icon="iconfont icon-github"/>`hashicorp/packer-plugin-googlecompute`)](https://github.com/hashicorp/packer-plugin-googlecompute) (installed via `packer init`)
- Optionally, the [AWS Packer plugin (<VPIcon icon="iconfont icon-github"/>`hashicorp/packer-plugin-amazon`)](https://github.com/hashicorp/packer-plugin-amazon) can be used for EC2 builds by adding an `amazon-ebs` source to `node.pkr.hcl`
- GCP project with Compute Engine API enabled (or AWS account with EC2 access)
- GCP authentication (`gcloud auth application-default login`) or AWS credentials
- Access to an NVIDIA GPU instance type (For example, A100, H100, L4 on GCP; p4d, p5, G6 on AWS)

:::

---

## Project Setup

### Step 1: Install Packer

To get started, you'll install Packer with the steps below if you're on macOS (or you can follow the official documentation for Linux and Windows installation [guides](https://developer.hashicorp.com/packer/tutorials/docker-get-started/get-started-install-cli#:~:text=Chocolatey%20on%20Windows-,Linux,-HashiCorp%20officially%20maintains)).

First, you'll install the official Packer formula from the terminal.

Install the HashiCorp tap, a repository of all Hashicorp packages.

```sh
brew tap hashicorp/tap
```

Now, install Packer with `hashicorp/tap/packer`.

```sh
brew install hashicorp/tap/packer
```

### Step 2: Set Up Project Directory

With Packer installed, you'll create your project directory. For clean code and separation of concerns, your project directory should look like the below. Go ahead and create these files in your <VPIcon icon="fas fa-folder-open"/>`packer_demo` folder using the command below:

```sh
mkdir -p packer_demo/script && touch packer_demo/{build.pkr.hcl,source.pkr.hcl,variable.pkr.hcl,local.pkr.hcl,plugins.pkr.hcl,values.pkrvars.hcl} packer_demo/script/base.sh
```

Your file directory should look like this:

```sh title="file structure"
packer_demo
├── build.pkr.hcl                 # Build pipeline — provisioner ordering
├── source.pkr.hcl                # GCP source definition (googlecompute)
├── variable.pkr.hcl              # Variable definitions with defaults
├── local.pkr.hcl                 # Local values
├── plugins.pkr.hcl               # Packer plugin requirements
├── values.pkrvars.hcl            # variable values (copy and customize)
├── script/
│   ├── base.sh                   # requirement script 
```

### Step 3: Install Packer's Plugins

In your `plugins.pkr.hcl file,`, define your plugins in the `packer block.` The `packer {}` block contains Packer settings, including specifying a required plugin version. You'll find the `required_plugins` block in the Packer block, which specifies all the plugins required by the template to build your image. If you're on Azure or AWS, you can check for the latest plugin [<VPIcon icon="iconfont icon-hashicorp"/>here](https://developer.hashicorp.com/packer/integrations).

```hcl
packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = "~> 1"
    }
  }
}
```

Then, initialize your Packer plugin with the command below:

```sh
packer init .
```

### Step 4: Define Your Source

With your plugin initialized, you can now define your source block. The source block configures a specific builder plugin, which is then invoked by a build block. Source blocks contain your `project ID`, the zone where your machine will be created, the `source_image_family` (think of this as your base image, such as Debian, Ubuntu, and so on), and your `source_image_project_id`.

In GCP, each has an image project ID, such as "ubuntu-os-cloud" for Ubuntu. You'll set the `machine type` to a GPU machine type because you're building your base image for a GPU machine, so the machine on which it will be created needs to be able to run your commands.

```hcl
source "googlecompute" "gpu-node" {
  project_id              = var.project_id
  zone                    = var.zone
  source_image_family     = var.image_family
  source_image_project_id = var.image_project_id
  ssh_username            = var.ssh_username
  machine_type            = var.machine_type



  image_name        = var.image_name
  image_description = var.image_description

  disk_size           = var.disk_size
  on_host_maintenance = "TERMINATE"

  tags = ["gpu-node"]

}
```

Setting `on_host_maintenance = "TERMINATE"` on Google Cloud Compute Engine ensures that a VM instance stops instead of live-migrating during infrastructure maintenance. This is important when using GPUs or specialized hardware that can't migrate, preventing data corruption.

You'll define all your variables in the <VPIcon icon="iconfont icon-hashicorp"/>`variable.pkr.hcl` file, and set the values in the <VPIcon icon="iconfont icon-hashicorp"/>`values.pkrvars.hcl`. Remember to always add your <VPIcon icon="iconfont icon-hashicorp"/>`values.pkrvars.hcl` file to Gitignore.

```hcl :collapsed-lines title="values.pkr.hcl"
variable "image_name" {
  type        = string
  description = "The name of the resulting image"
}

variable "image_description" {
  type        = string
  description = "Description of the image"
}

variable "project_id" {
  type        = string
  description = "The GCP project ID where the image will be created"
}

variable "image_family" {
  type        = string
  description = "The image family to which the resulting image belongs"
}

variable "image_project_id" {
  type        = list(string)
  description = "The project ID(s) to search for the source image"
}

variable "zone" {
  type        = string
  description = "The GCP zone where the build instance will be created"
}

variable "ssh_username" {
  type        = string
  description = "The SSH username to use for connecting to the instance"
}
variable "machine_type" {
  type        = string
  description = "The machine type to use for the build instance"
}

variable "cuda_version" {
  type        = string
  description = "CUDA toolkit version"
  default     = "13.1"
}

variable "driver_version" {
  type        = string
  description = "NVIDIA driver version"
  default     = "590.48.01"
}

variable "disk_size" {
  type        = number
  description = "Boot disk size in GB"
  default     = 50
}
```

```hcl title="values.pkrvars.hcl"
image_name        = "base-gpu-image-{{timestamp}}"
image_description = "Ubuntu 24.04 LTS with gpu drivers and health checks"
project_id        = "your gcp project id"
image_family      = "ubuntu-2404-lts-amd64"
image_project_id  = ["ubuntu-os-cloud"]
zone              = "us-central1-a"
ssh_username      = "packer"
machine_type      = "g2-standard-4"
disk_size        = 50
driver_version   = "590.48.01"
cuda_version      = "13.1" 
```

### Step 5: Writing the Build Template

Create <VPIcon icon="iconfont icon-hashicorp"/>`build.pkr.hcl`. The `build` block creates a temporary instance, runs provisioners, and produces an image.

Provisioners in this template are organized as follows:

- **First provisioner** runs system updates and upgrades.
- **Second provisioner** reboots the instance (`expect_disconnect = true`).
- **Third provisioner** waits for the instance to come back (`pause_before`), then runs <VPIcon icon="fas fa-folder-open"/>`script/`<VPIcon icon="iconfont icon-shell"/>`base.sh`. This provisioner sets `max_retries` to handle transient SSH timeouts and pass environment variables for `DRIVER_VERSION` and `CUDA_VERSION`.

Lastly, you have the post-processor to tell you the image ID and completion status:

```hcl :collapsed-lines title="build.pkr.hcl"
build {
  sources = ["source.googlecompute.gpu-node"]

  provisioner "shell" {
    inline = [
      "set -e",
      "sudo apt update",
      "sudo apt -y dist-upgrade"
    ]
  }

  provisioner "shell" {
    expect_disconnect = true
    inline            = ["sudo reboot"]
  }

  # Base: NVIDIA drivers, CUDA, DCGM
  provisioner "shell" {
    pause_before = "60s"
    script       = "script/base.sh"
    max_retries  = 2
    environment_vars = [
      "DRIVER_VERSION=${var.driver_version}",
      "CUDA_VERSION=${var.cuda_version}"
    ]
  }

  post-processor "shell-local" {
    inline = [
      "echo '=== Image Build Complete ==='",
      "echo 'Image ID: ${build.ID}'",
      "date"
    ]
  }
}
```

### Step 6: Writing the GPU Provisioning Script

Now we'll go through the base script, and break down some parts of it.

### Section 1: Pre-Installation (Kernel Headers)

Before installing NVIDIA drivers, the system needs kernel headers and build tools. The NVIDIA driver compiles a kernel module during installation via DKMS, so if the headers for your running kernel aren't present, the build will fail silently, and the driver won't load on boot.

```sh
log "Installing kernel headers and build tools..."
sudo apt-get install -qq -y \
"linux-headers-$(uname -r)" \
build-essential \
dkms \
curl \
wget
```

### Section 2: Installing NVIDIA's Apt Repository

This snippet downloads and installs NVIDIA’s official keyring package based on your OS Linux distribution, which adds the trusted signing keys needed for the system to verify CUDA packages.

```sh
log "Adding NVIDIA CUDA apt repository (${DISTRO})..."
wget -q "https://developer.download.nvidia.com/compute/cuda/repos/\({DISTRO}/\){ARCH}/cuda-keyring_1.1-1_all.deb" \
-O /tmp/cuda-keyring.deb
sudo dpkg -i /tmp/cuda-keyring.deb
rm /tmp/cuda-keyring.deb
sudo apt-get update -qq
```

### Section 3: Pinning NVIDIA Drivers Version

Pinning the NVIDIA driver to a specific version ensures that the system always installs and keeps using exactly that driver version, even when newer drivers appear in the repository.

NVIDIA drivers are tightly coupled with CUDA toolkit versions, Kernel versions, and container runtimes like Docker or NVIDIA Container Toolkit

A mismatch, such as the system auto‑upgrading to a newer driver, can cause CUDA to stop working, break GPU acceleration, or make the machine image inconsistent across deployments.

```sh
log "Pinning driver to version ${DRIVER_VERSION}..."
sudo apt-get install -qq -y "nvidia-driver-pinning-${DRIVER_VERSION}"
```

### Section 4: Installing the Driver

The `libnvidia-compute` installs only the compute‑related user‑space libraries (CUDA driver components), while the `nvidia-dkms-open;` installs the **open‑source NVIDIA kernel module**, built locally via DKMS.

Together, these two packages give you a fully functional CUDA driver environment without any GUI or graphics dependencies.

Here, we're using **NVIDIA’s compute‑only driver stack using the open‑source kernel modules**, as it deliberately avoids installing any display-related components, which you don't need.

This method provides an installation module based on DKMS that's better aligned with Linux distros, as it's lightweight, and compute-focused.

```sh
log "Installing NVIDIA compute-only driver (open kernel modules)..."
sudo apt-get -V install -y \
libnvidia-compute \
nvidia-dkms-open
```

### Section 5: CUDA Toolkit Installation

This part of the script installs the **CUDA Toolkit** for the specified version and then makes sure that CUDA’s executables and libraries are available system‑wide for every user and every shell session.

It adds CUDA binaries to PATH, so commands like `nvcc`, `cuda-gdb`, and `cuda-memcheck` work without specifying full paths. It also adds CUDA libraries to LD_LIBRARY_PATH, so applications can find CUDA’s shared libraries at runtime.

```sh
log "Installing CUDA Toolkit ${CUDA_VERSION}..."
sudo apt-get install -qq -y "cuda-toolkit-${CUDA_VERSION}"

# Persist CUDA paths for all users and sessions
cat <<'EOF' | sudo tee /etc/profile.d/cuda.sh
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:${LD_LIBRARY_PATH:-}
EOF
echo "/usr/local/cuda/lib64" | sudo tee /etc/ld.so.conf.d/cuda.conf
sudo ldconfig
```

### Section 6: NVIDIA Container Toolkit

This block installs the NVIDIA Container Toolkit and configures it so that containers (Docker or containerd) can access the GPU safely and correctly. It’s a critical step for Kubernetes GPU nodes, Docker GPU workloads, and any system that needs GPU acceleration inside containers.

```sh
log "Installing NVIDIA Container Toolkit..."
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -fsSL https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update -qq
sudo apt-get install -qq -y nvidia-container-toolkit

# Configure for containerd (primary Kubernetes runtime)
sudo nvidia-ctk runtime configure --runtime=containerd

# Configure for Docker if present on this image
if systemctl list-unit-files | grep -q "^docker.service"; then
  sudo nvidia-ctk runtime configure --runtime=docker
fi
```

### Section 7: Installing DCGM (Data Center GPU Manager)

This section covers the installation and validation of NVIDIA DCGM (Data Center GPU Manager), which is NVIDIA’s official management and telemetry framework for data center GPUs.

It offers health monitoring and diagnostics, telemetry (including temperature, clocks, power, and utilization), error reporting, and integration with Kubernetes, Prometheus, and monitoring agents. Your GPU monitoring stack relies on this.

The script extracts the installed version and checks that it meets the **minimum required version** for NVIDIA driver 590+. Then it enforces the version requirement. This prevents a mismatch between the GPU driver and DCGM, which would break monitoring and health checks. It also enables fabric manager for NVLink/NVswitches, if you're on a Multi‑GPU topologies like A100/H100 DGX or multi‑GPU servers.

```sh
log "Installing DCGM..."
sudo apt-get install -qq -y datacenter-gpu-manager

DCGM_VER=\((dpkg -s datacenter-gpu-manager 2>/dev/null | awk '/^Version:/{print \)2}' | sed 's/^[0-9]*://')
DCGM_MAJOR=\((echo "\){DCGM_VER}" | cut -d. -f1)
DCGM_MINOR=\((echo "\){DCGM_VER}" | cut -d. -f2)
if [[ "\({DCGM_MAJOR}" -lt 4 ]] || { [[ "\){DCGM_MAJOR}" -eq 4 ]] && [[ "${DCGM_MINOR}" -lt 3 ]]; }; then
  error "DCGM ${DCGM_VER} is below the 4.3 minimum required for driver 590+. Check your CUDA repo."
fi
log "DCGM installed: ${DCGM_VER}"

sudo systemctl enable nvidia-dcgm
sudo systemctl start  nvidia-dcgm

# Fabric Manager — only needed for NVLink/NVSwitch GPUs (A100/H100 multi-GPU nodes)
if systemctl list-unit-files | grep -q "^nvidia-fabricmanager.service"; then
  log "Enabling nvidia-fabricmanager for NVLink GPUs..."
  sudo systemctl enable nvidia-fabricmanager
  sudo systemctl start  nvidia-fabricmanager
fi
```

### Section 8: Enabling Persistence Mode

The NVIDIA driver normally unloads itself when the GPU is idle. When a new workload starts, the driver must reload, reinitialize the GPU, and set up memory mappings. This adds a delay of a few hundred milliseconds to several seconds, depending on the GPU and system.

Enabling nvidia‑persistenced keeps the NVIDIA driver loaded in memory even when no GPU workloads are running.

```sh
log "Enabling nvidia-persistenced..."
sudo systemctl enable nvidia-persistenced
sudo systemctl start  nvidia-persistenced
```

### Section 9: System Tuning for GPU Compute Workloads

This block applies a set of **system‑level performance and stability tunings** that are standard for high‑performance GPU servers, Kubernetes GPU nodes, and ML/AI workloads.

Each line targets a specific bottleneck or instability pattern that appears in real GPU production environments.

- Swap and memory behavior: Disabling swap and setting `vm.swappiness=0` prevents the kernel from pushing GPU‑bound processes into swap. GPU workloads are extremely sensitive to latency, and swapping can cause CUDA context resets and GPU driver timeouts.
- Hugepages for large memory allocations: Setting `vm.nr_hugepages=2048` allocates a pool of hugepages, which reduces TLB pressure for large contiguous memory allocations. CUDA, NCCL, and deep‑learning frameworks frequently allocate large buffers, and hugepages reduce page‑table overhead, improving memory bandwidth and lowering latency for large tensor operations. This is especially useful on multi‑GPU servers.
- CPU frequency governor: Installing `cpupower` and forcing the CPU governor to `performance` ensures the CPU stays at maximum frequency instead of scaling down. GPU workloads often become CPU‑bound during Data preprocessing, Kernel launches, and NCCL communication. Keeping CPUs at full speed reduces jitter and improves throughput.
- NUMA and topology tools: Installing `numactl`, `libnuma-dev`, and `hwloc` provides tools for pinning processes to NUMA nodes, understanding CPU–GPU affinity, and optimizing multi‑GPU placement.
- Disabling irqbalance: Stopping and disabling `irqbalance` it lets the NVIDIA driver manage interrupt affinity. For GPU servers, irqbalance can incorrectly move GPU interrupts to suboptimal CPUs, causing higher latency and lower throughput.

```sh
log "Applying system tuning..."

# Disable swap (critical for Kubernetes scheduler and ML stability)
sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab
echo "vm.swappiness=0"     | sudo tee /etc/sysctl.d/99-gpu-swappiness.conf

# Hugepages — reduces TLB pressure for large memory allocations
echo "vm.nr_hugepages=2048" | sudo tee /etc/sysctl.d/99-gpu-hugepages.conf

# CPU performance governor
sudo apt-get install -qq -y linux-tools-common "linux-tools-$(uname -r)" || true
sudo cpupower frequency-set -g performance || true

# NUMA and topology tools for GPU affinity tuning
sudo apt-get install -qq -y numactl libnuma-dev hwloc

# Disable irqbalance — let NVIDIA driver manage interrupt affinity
sudo systemctl disable irqbalance || true
sudo systemctl stop    irqbalance || true

# Apply all sysctl settings now
sudo sysctl --system
```

Full base.sh script here:

```sh :collapsed-lines title="base.sh"
#!/bin/bash
set -euo pipefail

log()   { echo "[BASE] $1"; }
error() { echo "[BASE][ERROR] $1" >&2; exit 1; }

###############################################################
###############################################################
[[ -z "${DRIVER_VERSION:-}" ]] && error "DRIVER_VERSION is not set."
[[ -z "${CUDA_VERSION:-}"   ]] && error "CUDA_VERSION is not set."

log "DRIVER_VERSION : ${DRIVER_VERSION}"
log "CUDA_VERSION   : ${CUDA_VERSION}"

DISTRO=\((. /etc/os-release && echo "\){ID}${VERSION_ID}" | tr -d '.')
ARCH="x86_64"

export DEBIAN_FRONTEND=noninteractive

###############################################################
# 1. System update
###############################################################
log "Updating system packages..."
sudo apt-get update -qq
sudo apt-get upgrade -qq -y

###############################################################
# 2. Pre-installation — kernel headers
#    Source: https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/ubuntu.html
###############################################################
log "Installing kernel headers and build tools..."
sudo apt-get install -qq -y \
  "linux-headers-$(uname -r)" \
  build-essential \
  dkms \
  curl \
  wget

###############################################################
# 3. NVIDIA CUDA Network Repository
###############################################################
log "Adding NVIDIA CUDA apt repository (${DISTRO})..."
wget -q "https://developer.download.nvidia.com/compute/cuda/repos/\({DISTRO}/\){ARCH}/cuda-keyring_1.1-1_all.deb" \
  -O /tmp/cuda-keyring.deb
sudo dpkg -i /tmp/cuda-keyring.deb
rm /tmp/cuda-keyring.deb
sudo apt-get update -qq

###############################################################
# 4. Pin driver version BEFORE installation (590+ requirement)
###############################################################
log "Pinning driver to version ${DRIVER_VERSION}..."
sudo apt-get install -qq -y "nvidia-driver-pinning-${DRIVER_VERSION}"

###############################################################
# 5. Compute-only (headless) driver — Open Kernel Modules
#    Source: NVIDIA Driver Installation Guide — Compute-only System (Open Kernel Modules)
#
#    libnvidia-compute  = compute libraries only (no GL/Vulkan/display)
#    nvidia-dkms-open   = open-source kernel module built via DKMS
#
#    Open kernel modules are the NVIDIA-recommended choice for
#    Ampere, Hopper, and Blackwell data centre GPUs (A100, H100, etc.)
###############################################################
log "Installing NVIDIA compute-only driver (open kernel modules)..."
sudo apt-get -V install -y \
  libnvidia-compute \
  nvidia-dkms-open

###############################################################
# 6. CUDA Toolkit
###############################################################
log "Installing CUDA Toolkit ${CUDA_VERSION}..."
sudo apt-get install -qq -y "cuda-toolkit-${CUDA_VERSION}"

# Persist CUDA paths for all users and sessions
cat <<'EOF' | sudo tee /etc/profile.d/cuda.sh
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:${LD_LIBRARY_PATH:-}
EOF
echo "/usr/local/cuda/lib64" | sudo tee /etc/ld.so.conf.d/cuda.conf
sudo ldconfig

###############################################################
# 7. NVIDIA Container Toolkit
#    Required for GPU workloads in Docker / containerd / Kubernetes
###############################################################
log "Installing NVIDIA Container Toolkit..."
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey \
  | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

curl -fsSL https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
  | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update -qq
sudo apt-get install -qq -y nvidia-container-toolkit

# Configure for containerd (primary Kubernetes runtime)
sudo nvidia-ctk runtime configure --runtime=containerd

# Configure for Docker if present on this image
if systemctl list-unit-files | grep -q "^docker.service"; then
  sudo nvidia-ctk runtime configure --runtime=docker
fi

###############################################################
# 8. DCGM — DataCenter GPU Manager
###############################################################
log "Installing DCGM..."
sudo apt-get install -qq -y datacenter-gpu-manager
 
DCGM_VER=\((dpkg -s datacenter-gpu-manager 2>/dev/null | awk '/^Version:/{print \)2}' | sed 's/^[0-9]*://')
DCGM_MAJOR=\((echo "\){DCGM_VER}" | cut -d. -f1)
DCGM_MINOR=\((echo "\){DCGM_VER}" | cut -d. -f2)
if [[ "\({DCGM_MAJOR}" -lt 4 ]] || { [[ "\){DCGM_MAJOR}" -eq 4 ]] && [[ "${DCGM_MINOR}" -lt 3 ]]; }; then
  error "DCGM ${DCGM_VER} is below the 4.3 minimum required for driver 590+. Check your CUDA repo."
fi
log "DCGM installed: ${DCGM_VER}"

sudo systemctl enable nvidia-dcgm
sudo systemctl start  nvidia-dcgm

# Fabric Manager — only needed for NVLink/NVSwitch GPUs (A100/H100 multi-GPU nodes)
if systemctl list-unit-files | grep -q "^nvidia-fabricmanager.service"; then
  log "Enabling nvidia-fabricmanager for NVLink GPUs..."
  sudo systemctl enable nvidia-fabricmanager
  sudo systemctl start  nvidia-fabricmanager
fi

###############################################################
# 9. NVIDIA Persistence Daemon
#    Keeps the driver loaded between jobs — reduces cold-start
#    latency on the first CUDA call in each new workload
###############################################################
log "Enabling nvidia-persistenced..."
sudo systemctl enable nvidia-persistenced
sudo systemctl start  nvidia-persistenced

###############################################################
# 10. System tuning for GPU compute workloads
###############################################################
log "Applying system tuning..."

# Disable swap (critical for Kubernetes scheduler and ML stability)
sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab
echo "vm.swappiness=0"     | sudo tee /etc/sysctl.d/99-gpu-swappiness.conf

# Hugepages — reduces TLB pressure for large memory allocations
echo "vm.nr_hugepages=2048" | sudo tee /etc/sysctl.d/99-gpu-hugepages.conf

# CPU performance governor
sudo apt-get install -qq -y linux-tools-common "linux-tools-$(uname -r)" || true
sudo cpupower frequency-set -g performance || true

# NUMA and topology tools for GPU affinity tuning
sudo apt-get install -qq -y numactl libnuma-dev hwloc

# Disable irqbalance — let NVIDIA driver manage interrupt affinity
sudo systemctl disable irqbalance || true
sudo systemctl stop    irqbalance || true

# Apply all sysctl settings now
sudo sysctl --system

###############################################################
# Done
###############################################################
log "============================================"
log "Base layer provisioning complete."
log "  OS      : ${DISTRO}"
log "  Driver  : ${DRIVER_VERSION} (open kernel modules, compute-only)"
log "  CUDA    : cuda-toolkit-${CUDA_VERSION}"
log "  DCGM    : ${DCGM_VER}"
log "============================================"
```

---

## Step 7: Assembling and Running the Build

Validate the template first, then run the build. Validation catches syntax or variable errors early, so the build doesn’t start on a broken config.

```sh
packer validate -var-file=values.pkrvars.hcl .
```

If validation succeeds, you’ll see a short confirmation like `The configuration is valid.`. After that, start the build. You should expect the process to create a temporary VM, run your provisioners, and produce an image:

```sh
packer build -var-file=values.pkrvars.hcl .
```

The build typically takes **15–20 minutes,** depending on network speed and package installs. Watch the Packer log for three key checkpoints:

- **Instance creation** — confirms the temporary VM was provisioned.
- **Provisioner output** — shows each script step (updates, reboot, <VPIcon icon="fas fa-folder-open"/>`script/`<VPIcon icon="iconfont icon-shell"/>`base.sh`) and any errors.
- **Image creation** — indicates the build finished and an image artifact was written.

If the build fails, copy the failing provisioner’s log lines and re-run the build after fixing the script or variables. For quick troubleshooting, re-run the failing provisioner locally on a matching test VM to iterate faster.

```plaintext :collapsed-lines
googlecompute.gpu-node: output will be in this color.

==> googlecompute.gpu-node: Checking image does not exist...
==> googlecompute.gpu-node: Creating temporary RSA SSH key for instance...
==> googlecompute.gpu-node: no persistent disk to create
==> googlecompute.gpu-node: Using image: ubuntu-2404-noble-amd64-v20260225
==> googlecompute.gpu-node: Creating instance...
==> googlecompute.gpu-node: Loading zone: us-central1-a
==> googlecompute.gpu-node: Loading machine type: g2-standard-4
==> googlecompute.gpu-node: Requesting instance creation...
==> googlecompute.gpu-node: Waiting for creation operation to complete...
==> googlecompute.gpu-node: Instance has been created!
==> googlecompute.gpu-node: Waiting for the instance to become running...
==> googlecompute.gpu-node: IP: 34.58.58.214
==> googlecompute.gpu-node: Using SSH communicator to connect: 34.58.58.214
==> googlecompute.gpu-node: Waiting for SSH to become available...
systemd-logind.service
==> googlecompute.gpu-node:  systemctl restart unattended-upgrades.service
==> googlecompute.gpu-node:
==> googlecompute.gpu-node: No containers need to be restarted.
==> googlecompute.gpu-node:
==> googlecompute.gpu-node: User sessions running outdated binaries:
==> googlecompute.gpu-node:  packer @ session #1: sshd[1535]
==> googlecompute.gpu-node:  packer @ user manager service: systemd[1540]
==> googlecompute.gpu-node: Pausing 1m0s before the next provisioner...
==> googlecompute.gpu-node: Provisioning with shell script: script/base.sh
==> googlecompute.gpu-node: [BASE] DRIVER_VERSION : 590.48.01
==> googlecompute.gpu-node: [BASE] CUDA_VERSION   : 13.1
==> googlecompute.gpu-node: [BASE] Updating system packages...
==> googlecompute.gpu-node: [BASE] Installing kernel headers and build tools...
==> googlecompute.gpu-node: [BASE] Installing CUDA Toolkit 13.1...
==> googlecompute.gpu-node: [BASE] Installing DCGM...
==> googlecompute.gpu-node: [BASE] Enabling nvidia-persistenced...
==> googlecompute.gpu-node: [BASE] Applying system tuning...
==> googlecompute.gpu-node: vm.swappiness=0
==> googlecompute.gpu-node: vm.nr_hugepages=2048
==> googlecompute.gpu-node: Setting cpu: 0
==> googlecompute.gpu-node: Error setting new values. Common errors:
==> googlecompute.gpu-node: [BASE] ============================================
==> googlecompute.gpu-node: [BASE] Base layer provisioning complete.
==> googlecompute.gpu-node: [BASE]   OS      : ubuntu2404
==> googlecompute.gpu-node: [BASE]   Driver  : 590.48.01 (open kernel modules, compute-only)
==> googlecompute.gpu-node: [BASE]   CUDA    : cuda-toolkit-13.1
==> googlecompute.gpu-node: [BASE]   DCGM    : 1:3.3.9
==> googlecompute.gpu-node: [BASE] ============================================
==> googlecompute.gpu-node: Deleting instance...
==> googlecompute.gpu-node: Instance has been deleted!
==> googlecompute.gpu-node: Creating image...
==> googlecompute.gpu-node: Deleting disk...
==> googlecompute.gpu-node: Disk has been deleted!
==> googlecompute.gpu-node: Running post-processor:  (type shell-local)
==> googlecompute.gpu-node (shell-local): Running local shell script: 
==> googlecompute.gpu-node (shell-local): === Image Build Complete ===
==> googlecompute.gpu-node (shell-local): Image ID: packer-69b6c2ee-883a-3602-7bb5-059f1ba27c8b
==> googlecompute.gpu-node (shell-local): Sun Mar 15 15:50:09 WAT 2026
Build 'googlecompute.gpu-node' finished after 17 minutes 55 seconds.

==> Wait completed after 17 minutes 55 seconds

==> Builds finished. The artifacts of successful builds are:
--> googlecompute.gpu-node: A disk image was created in the 'my_project-00000' project: base-gpu-image-1773585134
```

### Step 8: Test the Image and Verify the GPU Stack

Confirm the image exists in the GCP Console: **Compute → Storage → Images** and locate your newly created OS image.

![Your Image information on GCP](https://cdn.hashnode.com/uploads/covers/5eacc4c926e78ca711dfbbdc/90f304eb-3fe7-4304-b2ad-d86701dde607.png)

Create a test VM from the image:

```sh
gcloud compute instances create my-gpu-vm \
--machine-type=g2-standard-4 \
--accelerator=count=1,type=nvidia-l4 \
--image=base-gpu-image-1772718104 \
--image-project=YOUR_PROJECT_ID \
--boot-disk-size=50GB \
--maintenance-policy=TERMINATE \
--restart-on-failure \
--zone=us-central1-a
#
# Created [https://www.googleapis.com/compute/v1/projects/my-project-000/zones/us-central1-a/instances/my-gpu-vm].
# NAME       ZONE           MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP    EXTERNAL_IP      STATUS
# my-gpu-vm  us-central1-a  g2-standard-4               10.128.15.227  104.154.184.217  RUNNING
```

Once the instance is `RUNNING`, verify the NVIDIA driver and GPU are visible:

![Output from the Nvidia-SMI command showing Driver and CUDA Version](https://cdn.hashnode.com/uploads/covers/5eacc4c926e78ca711dfbbdc/364df8fc-7584-40df-8ab7-b3fe349d5065.png)

![Image verifying the persistence mode is enabled](https://cdn.hashnode.com/uploads/covers/5eacc4c926e78ca711dfbbdc/0912c303-3bb0-47fa-aa34-1c91ff26874f.png)

**The** `nvidia-smi` **output confirms:**

- Driver 590.48.01 loaded
- CUDA 13.1 available
- Persistence Mode is `On`
- The L4 GPU is detected with 23GB VRAM
- Zero ECC errors
- No running processes (clean idle state).

This is exactly what a healthy base image should look like. Notice `Disp.A: Off`? That confirms our compute-only driver choice is working — no display adapter is active.

Confirm the installed CUDA toolkit by running. `nvcc --version`. You can see that version 13.1 was installed as specified.

![Output from the NVCC -Version command](https://cdn.hashnode.com/uploads/covers/5eacc4c926e78ca711dfbbdc/cc744624-9408-4348-88d7-61da04b5e1d0.png)

Let's confirm DCGM installation by running `dcgmi discovery -l`. Successful output indicates DCGM is running and communicating with the driver.

![Output from the DCGMI dicovery -l command showing device information](https://cdn.hashnode.com/uploads/covers/5eacc4c926e78ca711dfbbdc/114996c6-1f28-43d4-a3fa-13aa7ccd2c82.png)

---

## Conclusion

You now have a production‑grade, GPU‑optimized base image that includes the NVIDIA compute‑only driver built with open kernel modules, DCGM for monitoring, and the CUDA Toolkit. You also applied OS‑level tuning tailored to GPU compute workloads, providing a consistent, reproducible environment with no manual setup.

From here, you can extend the build by adding an application‑layer script to install frameworks such as PyTorch, TensorFlow, or vLLM, or create an instance template that uses this image to scale your GPU infrastructure.

The full Packer project includes additional scripts for training and inference workloads that you can use to extend your image.

::: info References

```component VPCard
{
  "title": "Driver Installation Guide — NVIDIA Driver Installation Guide",
  "desc": "NVIDIA Driver Installation Guide for Linux",
  "link": "https://docs.nvidia.com/datacenter/tesla/driver-installation-guide/latest/",
  "logo": "https://docs.nvidia.com/_static/favicon.ico",
  "background": "rgba(118,185,0,0.2)"
}
```

```component VPCard
{
  "title": "CUDA Toolkit Documentation 13.2 Update 1",
  "desc": "The NVIDIA® CUDA® Toolkit provides a development environment for creating high performance GPU-accelerated applications. With the CUDA Toolkit, you can develop, optimize, and deploy your applications on GPU-accelerated embedded systems, desktop workstations, enterprise data centers, cloud-based platforms and HPC supercomputers. The toolkit includes GPU-accelerated libraries, debugging and optimization tools, a C/C++ compiler, and a runtime library to deploy your application.",
  "link": "https://docs.nvidia.com/cuda/",
  "logo": "https://docs.nvidia.com/_static/favicon.ico",
  "background": "rgba(118,185,0,0.2)"
}
```

```component VPCard
{
  "title": "Installing the NVIDIA Container Toolkit — NVIDIA Container Toolkit",
  "desc": "Read this section about platform support. Install the NVIDIA GPU driver for your Linux distribution. NVIDIA recommends installing the driver by using the package manager for your distribution. For information about installing the driver with a package manager, refer to the NVIDIA Driver Installation Quickstart Guide. Alternatively, you can install the driver by downloading a .run installer.",
  "link": "https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html/",
  "logo": "https://docs.nvidia.com/_static/favicon.ico",
  "background": "rgba(118,185,0,0.2)"
}
```

```component VPCard
{
  "title": "Welcome — NVIDIA DCGM Documentation latest documentation",
  "desc": "This documentation repository contains the product documentation for NVIDIA Data Center GPU Manager (DCGM).",
  "link": "https://docs.nvidia.com/datacenter/dcgm/latest/index.html/",
  "logo": "_static/nvidia.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Driver Persistence — Driver Persistence",
  "desc": "",
  "link": "https://docs.nvidia.com/deploy/driver-persistence/index.html/",
  "logo": "https://docs.nvidia.com/_static/favicon.ico",
  "background": "rgba(118,185,0,0.2)"
}
```

<SiteInfo
  name="Packer documentation | Packer | HashiCorp Developer"
  desc="The Packer documentation describes how to use Packer and providers reference information for configuring Packer templates."
  url="https://developer.hashicorp.com/packer/docs/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/packer.jpg"/>

<SiteInfo
  name="Google Cloud Platform | Integrations | Packer | HashiCorp Developer"
  desc="The googlecompute plugin can be used with HashiCorp Packer to create custom images on GCE."
  url="https://developer.hashicorp.com/packer/integrations/hashicorp/googlecompute/"
  logo="https://developer.hashicorp.com/favicon.svg"
  preview="https://developer.hashicorp.com/og-image/packer.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a GPU-Optimized Machine Image with HashiCorp Packer on GCP",
  "desc": "Every time you spin up GPU infrastructure, you do the same thing: install CUDA drivers, DCGM, apply OS‑level GPU tuning, and fight dependency issues. Same old ritual every single time, wasting expensi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-gpu-optimized-machine-image-with-hashicorp-packer-on-gcp.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
