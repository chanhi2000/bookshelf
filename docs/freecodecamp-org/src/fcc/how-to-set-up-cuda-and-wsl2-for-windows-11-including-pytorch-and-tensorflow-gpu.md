---
lang: en-US
title: "How to Set Up CUDA and WSL2 for Windows 11 (including PyTorch and TensorFlow GPU)"
description: "Article(s) > How to Set Up CUDA and WSL2 for Windows 11 (including PyTorch and TensorFlow GPU)"
icon: iconfont icon-pytorch
category:
  - Python
  - PyTorch
  - Tensorflow
  - DevOps
  - Debian
  - Ubuntu
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - pytorch
  - py-torch
  - tensorflow
  - py-tensorflow
  - devops
  - debian
  - ubuntu
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Set Up CUDA and WSL2 for Windows 11 (including PyTorch and TensorFlow GPU)"
    - property: og:description
      content: "How to Set Up CUDA and WSL2 for Windows 11 (including PyTorch and TensorFlow GPU)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-cuda-and-wsl2-for-windows-11-including-pytorch-and-tensorflow-gpu.html
prev: /programming/py-torch/articles/README.md
date: 2025-12-04
isOriginal: false
author:
  - name: Md. Fahim Bin Amin
    url : https://freecodecamp.org/news/author/FahimFBA/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764786287487/f0c28401-ce77-4873-b238-59fc6b737ce7.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PyTorch > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-torch/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Tensorflow > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-tensorflow/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Linux - Debian > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-debian/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Set Up CUDA and WSL2 for Windows 11 (including PyTorch and TensorFlow GPU)"
  desc="If you’re working on complex Machine Learning projects, you’ll need a good Graphics Processing Unit (or GPU) to power everything. And Nvidia is a popular option these days, as it has great compatibility and widespread support. If you’re new to Machin..."
  url="https://freecodecamp.org/news/how-to-set-up-cuda-and-wsl2-for-windows-11-including-pytorch-and-tensorflow-gpu"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764786287487/f0c28401-ce77-4873-b238-59fc6b737ce7.png"/>

If you’re working on complex Machine Learning projects, you’ll need a good Graphics Processing Unit (or GPU) to power everything. And Nvidia is a popular option these days, as it has great compatibility and widespread support.

If you’re new to Machine Learning and are just getting started, then a free [<VPIcon icon="iconfont icon-kaggle"/>Kaggle](https://kaggle.com/) or [<VPIcon icon="fa-brands fa-google"/>Colab](https://colab.research.google.com/) might be enough for you. But that won’t be the case when you want to go deeper. You’ll need a GPU, which can get costly if you’re continuously using it on the cloud.

But there’s some good news: you can utilize your computer’s Nvidia GPU (GTX/RTX) quite easily and perform machine learning-related tasks right on your local machine. The cool thing is, it won’t cost you anything other than the electricity it uses!

When you’re running Machine Learning models on your local machines, the most suitable operating system is a Linux-based one, like Ubuntu. But Windows has improved a lot for this purpose. If you’re using the latest Windows 11, you can leverage Windows Subsystem for Linux (WSL) and use your GPU directly for Machine Learning-related workflows.

This process can be quite tricky, though, as can making two popular Machine Learning frameworks, TensorFlow and PyTorch, compatible with your system GPU in Windows 11. That’s why I have written this comprehensive guide to ease your pain.

In it, I’ll help you set up CUDA on Windows Subsystem for Linux 2 (WSL2) so you can leverage your Nvidia GPU for machine learning tasks.

By following these steps, you’ll be able to run ML frameworks like TensorFlow and PyTorch with GPU acceleration on Windows 11. Keep in mind that this guide assumes you have a compatible Nvidia GPU. Make sure to check [<VPIcon icon="iconfont icon-nvidia"/>Nvidia's official compatibility list](https://developer.nvidia.com/cuda-gpus) before proceeding.

I have also prepared a video for you that’ll help you follow proper guidelines throughout this article.

<VidStack src="youtube/qOJ49nkU4rY" />

Also, if this tutorial helps you, then don’t forget to add a star to the GitHub repository [<VPIcon icon="iconfont icon-github"/>`FahimFBA/CUDA-WSL2-Ubuntu-v2`](https://github.com/FahimFBA/CUDA-WSL2-Ubuntu-v2). If you face any issues or have any suggestions/improvements, then please raise an issue in the GitHub repository. Currently, the live website is available at [<VPIcon icon="fas fa-globe"/>ml-win11-v2.fahimbinamin.com](https://ml-win11-v2.fahimbinamin.com/).

::: note Prerequisites

Before you begin, make sure you have the following requirements met:

- Windows 11 operating system
- Nvidia GPU (GTX/RTX series)
- Administrator access to your PC
- At least 30 GB of free disk space
- Internet connection for downloads
- Latest Nvidia drivers installed

:::

---

## Windows Terminal

First, you’ll need to ensure that you have Windows Terminal installed properly in your operating system. It is the newest terminal application for users of command-line tools and shells like Command Prompt, PowerShell, and WSL. You can download it from the [Microsoft Store](https://apps.microsoft.com/detail/9N0DX20HK701?hl=en-us&gl=BD&ocid=pdpshare).

![Preview of Windows Terminal on Windows 11](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094104150/c73ae561-6888-4eea-9419-186c6659a62f.png)

After ensuring that it’s installed properly, you can proceed to the next steps.

---

## Windows PowerShell (Latest & Greatest)

Windows PowerShell is a modern and updated command-line shell from Microsoft. You can use some Linux specific commands directly on it. It comes with built-in command suggestions. You can download it from the [official GitHub page (<VPIcon icon="iconfont icon-github"/>`PowerShell/PowerShell`)](https://github.com/PowerShell/PowerShell/releases/).

![Preview of Windows PowerShell on GitHub](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094138179/78315197-f4f2-4df4-b022-37cb9e74cda2.png)

Download the latest x64 installer and install it. After ensuring that it is installed properly, you can proceed to the next steps.

### Configure Windows Terminal

Now you’ll need to configure your Windows Terminal to use PowerShell as the default shell. It’s optional and you might skip this step. But I recommend doing it for a better experience.

Open Windows Terminal. Click on the down arrow icon in the title bar and select "Settings".

![Preview of Windows PowerShell settings window](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094162440/6ea767c8-da3b-4280-84f8-0eb2b0647a46.png)

In the Settings tab, under "Startup", find the "Default profile" dropdown menu. Select "PowerShell" from the list.

Now for the "Default terminal application", select "Windows Terminal".

By default, Windows PowerShell always shows the version number in the title bar. If you want to disable it, select the "PowerShell" profile from the left sidebar. Click on the "Command Line" field and add an `--nologo` argument at the end of the command. After this, the line becomes `"C:\Program Files\PowerShell\7\pwsh.exe" --nologo`.

![Preview of Windows PowerShell --nologo setting](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094185648/3641d5f0-ba34-44b9-8a63-86b53068d02e.png)

If you don’t use other shells frequently and want to hide them in the dropdown, then you’ll need to select those profiles one by one from the left sidebar. Scroll down to the bottom and find the "Hide profile from dropdown" toggle and enable it. It will hide that specific shell from the dropdown menu.

For example, I am hiding the **Azure Cloud Shell** profile as I don't use it frequently:

![Preview of hiding profiles in Windows Terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094214632/73add1b7-bcdd-4368-86a6-975fa2f72b54.png)

Now click on the "Save" button at the bottom right corner to apply the changes. Close the Windows Terminal for now.

### Configuration of My Computer

I figured it’d be helpful to share my current computer’s configuration so you can have a clear idea of which setup I’m using in this guide. Here are the details:

| **Component** | **Specification** |
| --- | --- |
| **Processor** | AMD Ryzen 7 7700 8-Core Processor (8 Core 16 Threads) |
| **RAM** | 64GB DDR5 6000MHz |
| **Storage** | 1 TB Samsung 980 NVMe SSD, 4 TB HDD, 2 TB SATA SSD |
| **GPU** | NVIDIA GeForce RTX 3060 12GB GDDR6 |
| **Operating System** | Windows 11 Pro Version 25H2 |

Now that you have an idea about my computer’s configuration, we can proceed to the next steps.

---

## CPU Virtualization

As we are going to use WSL2, we’ll need to make sure that the CPU virtualization is enabled. To check whether virtualization is enabled or not from Windows, simply open the Windows Task Manager. Go to the Performance tab and select CPU from the left sidebar. In the bottom right corner, you will see the Virtualization status. If it shows "Enabled", then you are good to go. If it shows "Disabled", then you need to enable it from the BIOS.

![Preview of Virtualization enabled status in Windows Task Manager](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094252181/29efa40c-ec0a-4d99-adb7-50596348a1aa.png)

::: note

You have to ensure that CPU Virtualization is enabled in your BIOS settings. Different manufacturers have different ways to access the BIOS. Usually, you can access the BIOS by pressing the Delete or F2 key during the boot process. Once in BIOS, look for settings related to "Virtualization Technology" or "Intel VT-x"/"AMD-V" and make sure it is enabled. Save the changes and exit the BIOS.

:::

---

## Install WSL2

Open the Windows Terminal or Windows PowerShell as an administrator. Run the following command to install WSL2 along with the latest Ubuntu LTS distribution:

```powershell
wsl.exe --install
```

It will install Windows Subsystem for Linux 2 (WSL2). After the installation is complete, you will be prompted to restart your computer. Do so to finalize the installation.

![Preview of WSL installation in Windows PowerShell](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094306994/41db30c0-ecb9-4436-a425-8a059b199c42.png)

::: note

If you encounter any issues during installation, refer to the [<VPIcon icon="fa-brands fa-microsoft"/>official Microsoft documentation](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting) for troubleshooting WSL installation problems.

:::

---

## Install Latest LTS Ubuntu via WSL2

Open the Windows Terminal or Windows PowerShell again with the administrator privileges. If you want to check the available Linux distributions to install via WSL, run the following command:

```powershell
wsl.exe --list --online
```

![Preview of available WSL distributions in Windows PowerShell](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094455888/8f1f2382-41cc-410f-a7b9-a47d3bb634b6.png)

For installing any specific distribution, run the following command:

```powershell
wsl.exe --install <DistroName>
```

We are going to install the latest LTS Ubuntu distribution. As of now, the latest LTS version is Ubuntu 24.04. But I prefer to install the `Ubuntu` directly as it always points to the latest LTS version. So, run the following command:

```powershell
wsl.exe --install Ubuntu
```

You need to give it a default user account name. For me, I am going with `fahim`.

![Preview of Ubuntu installation in Windows PowerShell](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094505280/9beb24de-54da-4e0c-993d-b15f985867e3.png)

It also comes with a nice GUI management tool for WSL.

![Preview of WSL GUI management tool](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094530944/89073fb9-881f-48bd-b5ef-a0b08f74e4c5.png)

You can configure a lot of stuff in it including restricting core, RAM, disk space and a lot of specifications from the settings GUI window.

![Preview of WSL GUI settings window (Memory & Processor)](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094551095/66aea1e1-e204-4115-80e0-b3dea2d7a2ac.png)

---

## Update & Upgrade Ubuntu Packages

Open your Ubuntu terminal from Windows Terminal. First, we need to update and upgrade the existing packages to their latest versions.

To update the Ubuntu system, simply use the following command:

```sh
sudo apt update -y
```

![Preview of apt update command in Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094594281/be41e056-7e55-4139-b84b-6b7921a2d435.png)

To upgrade all the packages at once, simply use the following command:

```sh
sudo apt upgrade -y
```

![Preview of apt upgrade command in Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094627958/b1c17b1c-5290-470b-aafe-5b89bb03bd01.png)

::: note

Make sure that you have a stable internet connection during the update and upgrade process to avoid any interruptions.

:::

---

## Install and Configure Miniconda

In Machine Learning, we need to manage multiple environments with different package versions. Conda is a popular package and environment management system that makes it easy to create and manage isolated environments for different projects. We will install Miniconda, a minimal installer for Conda, to manage our Python environments. But if you prefer Anaconda, you can install it instead.

Go to the official website of Miniconda. Currently the Miniconda installer is inside Anaconda [<VPIcon icon="iconfont icon-anaconda"/>here](https://anaconda.com/docs/getting-started/miniconda/install). If the official website gets updated, you can always search for "Miniconda installer" on Google to find the latest version. Also, you can create an issue in the [official GitHub repository of this project (<VPIcon icon="iconfont icon-github"/>`FahimFBA/CUDA-WSL2-Ubuntu-v2`)](https://github.com/FahimFBA/CUDA-WSL2-Ubuntu-v2/issues) to notify me about it.

![Preview of Miniconda official website](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094667031/7ee2c854-88b6-49ce-8c04-41bf0a052c90.png)

As we are installing it inside WSL, we have to select the macOS/Linux Installation. Then select Linux Terminal Installer and choose Linux x86 for downloading the installer.

```sh
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

It will download the installer to your WSL directory. Then use the following command to install it properly:

```sh
bash ~/Miniconda3-latest-Linux-x86_64.sh
```

::: note

Make sure that you are in the correct directory where the installer is downloaded. If you downloaded it to a different location, adjust the path accordingly. Also, replace bash with zsh or sh if you are using a different shell.

![Preview of Miniconda installation in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094706995/3a317eb9-0340-4a84-8826-45324c93dd2f.png)

Make sure to choose the initialization option properly. I prefer to keep the conda env active whenever I open a new shell. Therefore, I chose "Yes".

![Preview of Miniconda initialization option during installation](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094727839/f3fc8902-0c37-432c-a912-a92810e89fd1.png)

Make sure that the installation succeeds without any errors.

![Preview of successful Miniconda installation in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094754454/53dfd998-62c9-4c2a-a71e-0d33e123e027.png)

For the changes to take effect, you can close and reopen the current shell. But you can also do that without closing and reopening the shell by applying the command below.

```sh
source ~/.bashrc
```

::: note

If you’re using a different shell like `zsh` or `fish`, make sure to source the appropriate configuration file (e.g., `~/.zshrc` for `zsh`).

:::

---

## Install Jupyter & Ipykernel

I prefer to use Jupyter Notebook for running my machine learning experiments. It provides an interactive environment for coding and data analysis. We’ll install Jupyter Notebook and Ipykernel to run Jupyter notebooks in our conda environment. We will do that in all conda environments starting with the **base** environment. It also helps us to keep the conda environment kernel inside Jupyter Notebook.

First, make sure that you are in the base conda environment. You will see (base) on the left side of the terminal.

![Preview of conda base environment in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094812122/66ad5de8-7553-42da-b920-78d20c3bdc9a.png)

Now install Jupyter and Ipykernel both by applying the following command:

```sh
conda install jupyter ipykernel -y
```

Make sure that you accept the terms of service of Conda.

![Preview of Jupyter and Ipykernel installation in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094839808/90fe3dcf-053d-4bc7-a031-22f81eb706ca.png)

Now, I will create a separate conda environment for both TensorFlow and the PyTorch GPU. You can directly install them in the base environment or in any other environment as per your preference. I am not specifying any specific Python version while creating the environment. It will automatically install the latest stable version of Python.

```sh
conda create -name ml -y
```

![Preview of creating a new conda environment named 'ml' in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094865498/ac9ef1f1-4494-4221-8376-5e257c4f9243.png)

To activate any specific conda environment, you have to use the following command:

```sh
conda activate <conda-env-name>
```

For example, if I want to activate my newly created **ml** environment, I will use this command:

```sh
conda activate ml
```

If you’re not sure which conda environments are installed in your system, you can check all available and installed conda environments in your system by running the following command:

```sh
conda env list
```

---

## Nvidia Driver

Ensure that you have the latest Nvidia drivers installed on Windows. WSL2 uses the Windows driver, so no separate driver installation is needed in Ubuntu. You can download the latest drivers from the [<VPIcon icon="iconfont icon-nvidia"/>official Nvidia website](https://nvidia.com/Download/index.aspx).

![Preview of Nvidia driver download page](https://cdn.hashnode.com/res/hashnode/image/upload/v1764094915617/cd9b0bfc-77a1-45f1-9dab-4349c8f489ef.png)

If you are just installing the latest GPU driver, then after installing the drivers, restart your computer to ensure the changes take effect. You can either use the GeForce Game Ready Driver or the NVIDIA Studio Driver. But I recommend using the Studio Driver for better stability with creative and ML applications.

---

## Install CUDA Dependencies

You might face some issues if you do not have the CUDA dependencies installed properly. I recommend that you install the required dependencies before proceeding further:

```sh
sudo apt install gcc g++ build-essential
```

After installing the dependencies, you can then verify the CUDA installation if you had any issues earlier.

---

## CUDA Toolkit

TensorFlow GPU is very picky about the CUDA version. So we need to install a specific version of CUDA Toolkit that is compatible with the TensorFlow version we are going to install.

To understand exactly which CUDA version is compatible with which TensorFlow version, you can check the official TensorFlow GPU support matrix [<VPIcon icon="iconfont icon-tensorflow"/>here](https://tensorflow.org/install/pip).

![Preview of TensorFlow GPU support in official docs](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095089103/87a44961-9426-4d20-95ac-cde06961b41a.png)

At the time I’m writing this article, the TensorFlow GPU documentation says that we should have CUDA Toolkit 12.3. So I will ensure that I install exactly that version. You can simply click on that version link in the official docs and it will redirect you to the official Nvidia CUDA Toolkit download page. But if the link gets updated in the future, you can always search for "Nvidia CUDA Toolkit" on Google to find the latest version.

![Preview of Nvidia CUDA Toolkit official website](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095106589/19689d63-5ebd-4783-8da4-e3dedd277efb.png)

As TensorFlow GPU is asking for exact Version 12.3, I will select version 12.3.0 exactly.

In the CUDA Toolkit download page, make sure to choose the operating system as Linux, Architecture as x86_64, Distribution as WSL-Ubuntu, Version as 2.0 and the Installer type as runfile(local).

::: note

As we are using Ubuntu in our WSL2, you can also choose Ubuntu as your operating system. But I prefer to choose WSL-Ubuntu for better compatibility.

![Preview of CUDA Toolkit 12.3 download page for WSL-Ubuntu](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095151533/b6996611-d4ce-4e07-9c73-30bdc93dbf19.png)

:::

After selecting those, it will give you the download commands. You have to apply them sequentially. Make sure that you **don't keep the checkmark in "Kernel Objects" during installing CUDA**.

![Preview of CUDA Toolkit 12.3 download commands for WSL-Ubuntu](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095169368/c2f81594-536f-4788-b765-1aab3b040fa7.png)

::: note

Make sure to copy and paste the commands one by one in your WSL Ubuntu terminal to download and install the CUDA Toolkit properly. If you face any issues related to CUDA dependency, then quickly go through the [Install CUDA dependencies](#install-cuda-dependencies) section, where I have explained how to install the CUDA dependencies properly.

:::

---

## Add Path to Shell Profile for CUDA

After installing CUDA Toolkit, we need to add the CUDA binaries to our shell profile for easy access. This will allow us to run CUDA commands from any directory in the terminal.

Note that, depending on the shell you are using (bash, zsh, and so on), you need to add the CUDA path to the appropriate configuration file. Make sure to replace **.bashrc** with **.zshrc** or other configuration files if you are using a different shell.

To add the CUDA binary path, follow the command below:

```sh
echo 'export PATH=/usr/local/cuda-12.3/bin:$PATH' >> ~/.bashrc
```

You have to use the updated path where you installed it. Your terminal will show it after installing the CUDA:

![Preview of CUDA installation path in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095215437/15768563-c956-472e-9633-95b3dd1cb7a3.png)

Now, you need to add the path inside the Library path. Just use the exact path where you installed CUDA. Your terminal will list the path properly.

```sh
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-12.3/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
```

![Preview of CUDA library path in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095242744/3c708db4-d267-4043-aa11-d04d890904f9.png)

After adding those paths, you need to source the shell profile for the changes to take effect. You can do that by running the following command:

```sh
source ~/.bashrc
```

---

## nvcc Version

NVCC stands for Nvidia CUDA Compiler. It is basically a compiler driver for the CUDA platform that allows developers to write parallel programs to run on Nvidia GPUs. As we have already installed the CUDA toolkit, we need to see whether the compiler is also properly activated. To check that, we need to verify the version.

Verify that CUDA is properly installed by checking the version:

```sh
nvcc --version
```

![Preview of nvcc version check in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095277858/2d1ded0a-01ac-4f78-9f6c-ac499d623207.png)

If the output shows the correct CUDA version, then you have successfully installed CUDA Toolkit in your WSL2 Ubuntu environment.

---

## cuDNN SDK

The cuDNN (CUDA Deep Neural Network) SDK is a [<VPIcon icon="iconfont icon-nvidia"/>GPU accelerated library of primitives for deep neural networks](https://developer.nvidia.com/cudnn), developed by Nvidia. It provides highly optimized building blocks for common deep learning operations, significantly speeding up the training and inference processes of AI models on Nvidia GPUs.

Note: Even though TensorFlow GPU suggests a specific cuDNN version, it’s often compatible with multiple versions. Because of this, I recommend downloading the latest cuDNN version that is compatible with your installed CUDA version. You can find the cuDNN download page [<VPIcon icon="iconfont icon-nvidia"/>here](https://developer.nvidia.com/cudnn-downloads).

Select the Operating System as Linux, Architecture as x86_64, Distribution as Ubuntu, Version as 24.04, Installer Type as deb (local), Configuration as FULL. After selecting those, it will give you the download commands. You have to apply them sequentially.

![Preview of cuDNN download commands for Ubuntu 24.04](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095312370/1fca5959-f492-4160-8027-deec0674863b.png)

::: note

Make sure to copy and paste the commands one by one in your WSL Ubuntu terminal to download and install the cuDNN SDK properly. If you face any issues related to CUDA dependency, then quickly go through the [Install CUDA dependencies](#install-cuda-dependencies) section, where I have explained how to install the CUDA dependencies properly.

:::

---

## TensorFlow GPU

Now, we are going to install TensorFlow GPU in our conda environment. Make sure that you have activated the conda environment where you want to install it. I’m going to install it in my previously created **ml** environment. To activate it, I’ll use the following command:

```sh
conda activate ml
```

::: note

Make sure that you have activated the correct conda environment before installing TensorFlow GPU. You will see the environment name in the terminal prompt.

![Preview of activating 'ml' conda environment in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095398777/0c7d8813-eb6c-4e2e-bad9-1fc7d344d7a2.png)

:::

I will install ipykernel and jupyter in this new environment.

```sh
conda install jupyter ipykernel -y
```

Now, to install TensorFlow GPU, I will simply use the following command:

```sh
pip install tensorflow[and-cuda]
```

It might take a couple of minutes depending on the internet speed you have. Just have patience and wait for it to finish the installation.

### Check TensorFlow GPU

After installing TensorFlow GPU, we need to verify that it is working properly with GPU support. Open a Python shell in your Ubuntu terminal and run the following commands:

```sh
python3 -c "import tensorflow as tf; print(tf.config.list_physical_devices('GPU'))"
```

If the output shows a list of available GPU devices, then TensorFlow GPU is successfully installed and working properly.

![Preview of TensorFlow GPU check in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095453933/ccda58fc-9ae9-4185-9c78-6196c98d8b7c.png)

---

## PyTorch GPU

Now, we’re going to install PyTorch GPU in our conda environment. Make sure that you have activated the conda environment where you want to install it. I’m going to install it in my previously created ml environment. To activate it, I will use the following command:

```sh
conda activate ml
```

Installing PyTorch GPU is very straightforward. You can use the official PyTorch installation command generator [<VPIcon icon="iconfont icon-pytorch"/>here](https://pytorch.org/get-started/locally/).

Make sure to select PyTorch Build as the latest Stable one, Your OS as Linux, Package as Pip, Language as Python. For the Compute Platform, select the CUDA version that matches your installed CUDA Toolkit. For me, it is CUDA 12.3. But, if you can not find the exact one then choose the closest. As CUDA 12.3 is not available for me now, I am choosing CUDA 12.6. After selecting those, it will give you the installation command. You have to apply it in your WSL Ubuntu terminal.

![Preview of PyTorch installation command generator](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095511862/6f631369-c8db-4681-9d1c-669ad88df69d.png)

It might take a couple of minutes depending on the internet speed you have. Just have patience and wait for it to finish the installation.

![Preview of PyTorch GPU installation in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095532246/56232263-36ea-4043-9881-df162965c514.png)

### Check PyTorch GPU

After installing PyTorch GPU, verify that it is working properly with GPU support. Open a Python shell in your Ubuntu terminal and run the following commands:

```sh
python3 - << 'EOF'
import torch
print(torch.cuda.is_available())
print(torch.cuda.device_count())
print(torch.cuda.current_device())
print(torch.cuda.device(0))
print(torch.cuda.get_device_name(0))
EOF
```

The output should look similar to the screenshot, showing:

- **True**: GPU is available for PyTorch
- **1**: Number of detected CUDA devices
- **0**: Index of the current active CUDA device
- A device object representation
- **NVIDIA GeForce RTX 3060** (or your GPU name)

![Preview of PyTorch GPU check in WSL Ubuntu terminal](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095584921/69269152-7ea6-404b-b1ca-8534b51f2491.png)

### Check PyTorch & TensorFlow GPU inside Jupyter Notebook

Now that the environment is fully configured, we will verify GPU support directly inside Jupyter Notebook. This ensures both PyTorch and TensorFlow can successfully detect and use your GPU.

#### 1. Test PyTorch GPU

Create a new Jupyter Notebook and run the following commands one by one:

```py
import torch

print(torch.cuda.is_available())
print(torch.cuda.device_count())
print(torch.cuda.current_device())
print(torch.cuda.device(0))
print(torch.cuda.get_device_name(0))
```

If everything is configured correctly, you will see your GPU (for example **NVIDIA GeForce RTX 3060**) detected properly:

![Preview of PyTorch GPU check inside Jupyter Notebook](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095624229/f94c97a0-2e44-45ad-a2a8-52f40c922482.png)

#### 2. Test TensorFlow GPU

Next, run the following code to check whether TensorFlow detects your GPU:

```py
import tensorflow as tf

print(tf.config.list_physical_devices('GPU'))
```

You can also check the number of GPUs detected:

```py
print("Num GPUs Available:", len(tf.config.list_physical_devices('GPU')))
```

Finally, run TensorFlow’s built-in GPU validation (warnings are normal):

```py
import tensorflow as tf

assert tf.test.is_gpu_available()
assert tf.test.is_built_with_cuda()
```

![TensorFlow GPU initialization and CUDA validation output](https://cdn.hashnode.com/res/hashnode/image/upload/v1764095666216/f9017979-b5c9-4b86-9f60-d9aaa2fe8ac1.png)

If TensorFlow logs show your GPU model (such as **RTX 3060**), then TensorFlow GPU is successfully installed and fully working inside Jupyter Notebook.

---

## Conclusion

Thank you so much for reading all the way through. I hope you have been able to configure your Windows 11 computer properly for running almost any kind of Machine Learning-based experiments.

::: info

To get more content like this, you can follow me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`fahimfba`)](https://linkedin.com/in/fahimfba/) and [X (<VPIcon icon="fa-brands fa-x-twitter"/>`Fahim_FBA`)](https://x.com/Fahim_FBA). You can also check [<VPIcon icon="fas fa-globe"/>my website](https://fahimbinamin.com/) and follow me on [GitHub (<VPIcon icon="iconfont icon-github"/>`fahimfba`)](https://github.com/FahimFBA) if you are into open source and development.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Set Up CUDA and WSL2 for Windows 11 (including PyTorch and TensorFlow GPU)",
  "desc": "If you’re working on complex Machine Learning projects, you’ll need a good Graphics Processing Unit (or GPU) to power everything. And Nvidia is a popular option these days, as it has great compatibility and widespread support. If you’re new to Machin...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-set-up-cuda-and-wsl2-for-windows-11-including-pytorch-and-tensorflow-gpu.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
