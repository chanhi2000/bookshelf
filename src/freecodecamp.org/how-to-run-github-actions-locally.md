---
lang: en-US
title: "How to Run GitHub Actions Locally Using the act CLI Tool"
description: "Article(s) > How to Run GitHub Actions Locally Using the act CLI Tool"
icon: iconfont icon-github-actions
category:
  - DevOps
  - Github
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - github-actions
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Run GitHub Actions Locally Using the act CLI Tool"
    - property: og:description
      content: "How to Run GitHub Actions Locally Using the act CLI Tool"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-github-actions-locally.html
prev: /devops/github/articles/README.md
date: 2024-03-12
isOriginal: false
author:
  - name: Rajdeep Singh
    url : https://freecodecamp.org/news/author/officialrajdeepsingh/
cover: https://cdn-media-0.freecodecamp.org/2024/02/How-to-run-GitHub-actions-locally.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Run GitHub Actions Locally Using the act CLI Tool"
  desc="GitHub Actions help automate tasks like building, testing, and deploying in your GitHub repository.  With one click, you can publish your production-ready code or package on npm, GitHub pages, docker images, deploy your production code on a cloud pro..."
  url="https://freecodecamp.org/news/how-to-run-github-actions-locally"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-0.freecodecamp.org/2024/02/How-to-run-GitHub-actions-locally.png"/>

GitHub Actions help automate tasks like building, testing, and deploying in your GitHub repository.

With one click, you can publish your production-ready code or package on npm, GitHub pages, docker images, deploy your production code on a cloud provider, and so on.

The problem starts when you're testing GitHub Actions. It can be time-consuming and painful. First, you have to change the GitHub Actions file locally, push your local code into your GitHub repository, and wait for the result.

To solve this issue, You can use [<FontIcon icon="iconfont icon-github"/>`nektos/act`](https://github.com/nektos/act) CLI tool to test and write the GitHub action locally. With `act` CLI, you do not need to commit/push your local code to the GitHub Repository. You test GitHub action locally on your laptop or machine.

---

## How to Install `act` for GitHub Actions

The [<FontIcon icon="iconfont icon-github"/>`nektos/act` CLI](https://github.com/nektos/act) tool works with Docker. Before starting with `act` CLI, First, [<FontIcon icon="fa-brands fa-docker"/>install Docker](https://docker.com/) on your system or laptop.

To install the `act` CLI, you need to run the following command:

::: tabs

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```powershell
choco install act-cli
```

@tab <FontIcon icon="fa-brands fa-macos"/>

```sh
brew install act
```

@tab <FontIcon icon="fa-brands fa-linux"/>

```sh
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

:::

---

## How to Configure and Initialize the `act` CLI

After the `act` CLI installation is successful on your laptop or machine, the next step is to run it in your project.

`act` CLI asks which Docker image size—large, medium, or micro—must be installed during installation.

There are various Docker image sizes:

1. The Docker Micro image size is 200 MB, and small projects use it.
2. The Docker Medium image size is 500 MB, and Big Project uses it.
3. The Docker Large image size is 17 GB, and Enterprise uses it.

The `act` CLI uses the Docker image to run the GitHub action locally.

```sh
act
```

The command output in the terminal looks like this:

```plaintext title="output"
test-github-actions git:(main) ✗ act
? Please choose the default image you want to use with act:
   - Large size image: ca. 17GB download + 53.1GB storage, you will need 75GB of free disk space, snapshots of GitHub Hosted Runners without snap and pulled docker images
   - Medium size image: ~500MB, includes only necessary tools to bootstrap actions and aims to be compatible with most actions
   - Micro size image: <200MB, contains only NodeJS required to bootstrap actions, doesn't work with all actions
 
Default image and other options can be changed manually in ~/.actrc (please refer to https://github.com/nektos/act#configuration for additional information about file structure) Micro
[Build Ghost and test theme/install] 🚀  Start image=node:16-buster-slim
INFO[0023] Parallel tasks (0) below minimum, setting to 1 
[Build Ghost and test theme/install]   🐳  docker pull image=node:16-buster-slim platform= username= forcePull=true
INFO[0031] Parallel tasks (0) below minimum, setting to 1 
[Build Ghost and test theme/install]   🐳  docker create image=node:16-buster-slim platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[] network="host"
[Build Ghost and test theme/install]   🐳  docker run image=node:16-buster-slim platform= entrypoint=["tail" "-f" "/dev/null"] cmd=[] network="host"
[Build Ghost and test theme/install]   ☁  git clone 'https://github.com/vimtor/action-zip' # ref=v1.2
[Build Ghost and test theme/install]   ☁  git clone 'https://github.com/softprops/action-gh-release' # ref=v0.1.15
[Build Ghost and test theme/install] ⭐ Run Main actions/checkout@v4
[Build Ghost and test theme/install]   🐳  docker cp src=/home/officialrajdeepsingh/medium/test-github-actions/. dst=/home/officialrajdeepsingh/medium/test-github-actions
[Build Ghost and test theme/install]   ✅  Success - Main actions/checkout@v4
[Build Ghost and test theme/install] ⭐ Run Main Easy Zip Files
[Build Ghost and test theme/install]   🐳  docker cp src=/home/officialrajdeepsingh/.cache/act/vimtor-action-zip@v1.2/ dst=/var/run/act/actions/vimtor-action-zip@v1.2/
[Build Ghost and test theme/install]   🐳  docker exec cmd=[node /var/run/act/actions/vimtor-action-zip@v1.2/dist/index.js] user= workdir=
| Ready to zip "build/ home.txt" into example.zip
|   - build/
|   - home.txt
| 
| Zipped file example.zip successfully
[Build Ghost and test theme/install]   ✅  Success - Main Easy Zip Files
[Build Ghost and test theme/install] Cleaning up container for job install
[Build Ghost and test theme/install] 🏁  Job succeeded
```

After downloading the image from the Docker repository, the `act` CLI runs the GitHub action.

`act` CLI generates the <FontIcon icon="fas fa-file-lines"/>`~/.actrc` file in the laptop for configuration. The <FontIcon icon="fas fa-file-lines"/>`~/.actrc` file contains the Docker image name.

```sh title=".actrc"
-P ubuntu-latest=node:16-buster-slim
-P ubuntu-22.04=node:16-bullseye-slim
-P ubuntu-20.04=node:16-buster-slim
-P ubuntu-18.04=node:16-buster-slim
```

To install other Docker images, remove the <FontIcon icon="fas fa-file-lines"/>`~/.actrc` file and re-run the `act` CLI to install the different Docker images.

### Error

Due to dependence on Docker, we may face some errors when initializing an `act` CLI for the first time.

```sh
act
```

The error should look like this:

```plaintext :collapsed-lines
test-github-actions git:(main) ✗ act
 
ERRO[0000] daemon Docker Engine socket not found and containerDaemonSocket option was not set 
? Please choose the default image you want to use with act:
  - Large size image: ca. 17GB download + 53.1GB storage, you will need 75GB of free disk space, snapshots of GitHub Hosted Runners without snap and pulled docker images
  - Medium size image: ~500MB, includes only necessary tools to bootstrap actions and aims to be compatible with most actions
  - Micro size image: <200MB, contains only NodeJS required to bootstrap actions, doesn't work with all actions

Default image and other options can be changed manually in ~/.actrc (please refer to https://github.com/nektos/act#configuration for additional information about file structure) Micro
[Build Ghost and test theme/install] 🚀  Start image=node:16-buster-slim
INFO[0305] Parallel tasks (0) below minimum, setting to 1 
[Build Ghost and test theme/install]   🐳  docker pull image=node:16-buster-slim platform= username= forcePull=true
Error: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
```

You're seeing the `Cannot connect to the Docker daemon` error in the above code. This issue occurs due to the Docker daemon. In simple words, the Docker daemon is not running. You can resolve this issue by starting your Docker and re-running your `act` command.

There are two ways to run Docker services.

1. Open Docker desktop in your window, and your Docker service is started.
2. Run Docker with the `systemctl start docker` command on Linux.

You can verify whether your Docker is running or not with the following command:

```sh :collapsed-lines
systemctl status docker
# 
# ● docker.service - Docker Application Container Engine
#      Loaded: loaded (/etc/systemd/system/docker.service; enabled; preset: enabled)
#     Drop-In: /nix/store/fibzdkfv6in4xw39rm0c7bq4nadzisas-system-units/docker.service.d
#              └─overrides.conf
#      Active: active (running) since Mon 2024-02-26 12:38:37 IST; 3h 39min ago
# TriggeredBy: ● docker.socket
#        Docs: https://docs.docker.com
#    Main PID: 1186 (dockerd)
#          IP: 0B in, 0B out
#          IO: 109.0M read, 152.0K written
#       Tasks: 40
#      Memory: 148.5M
#         CPU: 1min 40.817s
#      CGroup: /system.slice/docker.service
#              ├─1186 /nix/store/7pzis8dkhs461kl1bg2fp0202dw6r5i5-moby-24.0.5/libexec/docker/dockerd --config-file=/nix/store/3rlv5f0zldcc120b01szywidl0qz9x4p-daemon.json
#              └─1256 containerd --config /var/run/docker/containerd/containerd.toml
# 
# Feb 26 12:38:37 nixos dockerd[1256]: time="2024-02-26T12:38:37.532987858+05:30" level=info msg="containerd successfully booted in 0.016901s"
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.562515048+05:30" level=info msg="[graphdriver] using prior storage driver: overlay2"
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.564062690+05:30" level=info msg="Loading containers: start."
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.778478313+05:30" level=info msg="Default bridge (docker0) is assigned with an IP address 172.17.0.0/16. Daemon option --bip can be used to set a preferred IP address"
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.805931545+05:30" level=info msg="Loading containers: done."
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.828589904+05:30" level=info msg="Docker daemon" commit=v24.0.5 graphdriver=overlay2 version=24.0.5
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.828929197+05:30" level=info msg="Daemon has completed initialization"
# Feb 26 12:38:37 nixos systemd[1]: Started Docker Application Container Engine.
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.841992729+05:30" level=info msg="API listen on /run/docker.sock"
# Feb 26 12:38:37 nixos dockerd[1186]: time="2024-02-26T12:38:37.841993669+05:30" level=info msg="API listen on /run/docker.sock"
```

---

## How to Use the `act` CLI Tool

`act` CLI has many options, but we'll look at some important ones. You can check all the options by running the `act --help` command.

### Syntax

```sh
act --job <name-of-your-job>
```

For example, we run a specific show job.

```sh
act --job 'show'
```

### `act` CLI Options

Here are some `act` CLI options:

::: tabs

@tab:active Events

`act` CLI's default action is the push action, which triggers only push events by default.

```sh
act
```

You can change the event after passing the second argument, which is the name of your action. In our case, we'll pass pull_request.

```sh
act pull_request
```

There is a long list available to trigger workflows. You can [<FontIcon icon="iconfont icon-github"/>read it on the GitHub action](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows) documentation.

@tab Lists

The list option prints all the available jobs that you write in <FontIcon icon="fas fa-folder-open"/>`.github/workflows`.

```sh
act -l
```

The command output in the terminal looks like this.

```sh
act -l
# 
# Stage  Job ID             Job name           Workflow name                  Workflow file      Events      
# 0      zip                zip                Convert files into Zip         build-project.yml  release     
# 0      request_test       request_test       Pull Request                   fork.yml           fork        
# 0      pull_request_test  pull_request_test  Pull Request                   issues.yml         issues      
# 0      show               show               Convert files into Zip folder  test.yml           pull_request
```

@tab Running Specific Jobs

You use the `--job` option command to run specific jobs from your workflows.

Make sure your job name is unique – otherwise, it runs all jobs containing the same in your workflow. Whenever you can not pass an event by default, trigger the push event.

@tab Graph

The graph option draws the available workflow jobs structure in your terminal as a graph.

```sh
act --graph
```

The command output in the terminal looks like this:

```sh
act --graph
#
# ╭─────╮ ╭──────────────╮ ╭───────────────────╮ ╭──────╮
# │ zip │ │ request_test │ │ pull_request_test │ │ show │
# ╰─────╯ ╰──────────────╯ ╰───────────────────╯ ╰──────╯
```

@tab Environment Variables

Using environment variables with the `act` CLI is easy. You only need to create a new <FontIcon icon="fas fa-file-lines"/>`.env` file. `act` CLI automatically loads the environment that is available in the <FontIcon icon="fas fa-file-lines"/>`.env` file. For example, we add a `ENV_ID` variables.

```yaml
# .env
ENV_ID='My Env'
```

To use the `ENV_ID` environment variables, use the following syntax `${{ env.ENV_ID }}` in your GitHub action:

```yaml title=".github/workflows/test.yml"
name: Convert files into Zip folder

on: pull_request

jobs:
  show:
    runs-on: ubuntu-latest
    steps:
      - name: Show Env
        run: echo "Env ${{ env.ENV_ID }}"
```

With the `--env-file` option, you can change the default <FontIcon icon="fas fa-file-lines"/>`.env` file name to <FontIcon icon="fas fa-file-lines"/>`my-custom.env` file.

```sh
act --env-file=my-custom.env
```

@tab Secrets

You must create a new <FontIcon icon="fas fa-file-lines"/>`.secrets` file to load the environment secrets with the `act` CLI. This automatically loads the environment secrets that are available in the `secrets` file. For example, we add a `APP_SECRET` and `APP_ID` variables.

```properties title=".secrets"
APP_SECRET='7824jurd789gyu45esxgfgf48822166974gtredsyujn'
APP_ID='7878974561587'
```

To use the `APP_SECRET` environment variables, use the following syntax `${{ secrets.APP_SECRE}}` in your GitHub action:

```yaml title=".github/workflows/test.yml"
name: Learn environment secrets 

on: pull_request

jobs:
  show:
    runs-on: ubuntu-latest
    steps:
      - name: Show env
        run: echo "App SECRET ${{ secrets.APP_SECRET }}"
      - name: Show varibale
        run: echo "App ID ${{ secrets.APP_ID }}"
```

You can load your custom `my-custom.secrets` file containing all your secrets with the `--secret-file` option.

```sh
act --secret-file=my-custom.secrets
```

:::

---

## Conclusion

`act` CLI helps save time and energy when working and testing GitHub locally. Currently, there is no alternative to `act` CLI, which allows us to run GitHub actions locally.

`act` CLI isn't fully compatible with GitHub actions. Some features are not implemented, for example, concurrency, no `vars` context, incomplete `github` context, and so on.

You can hire me as a freelance developer with [<FontIcon icon="fas fa-globe"/>Upwork](https://upwork.com/freelancers/~01a4e8ba7a41795229) and other updates. Follow me on [Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`Official_R_deep`)](https://twitter.com/Official_R_deep) and [Medium (<FontIcon icon="fa-brands fa-medium"/>`officialrajdeepsingh`)](https://officialrajdeepsingh.medium.com/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Run GitHub Actions Locally Using the act CLI Tool",
  "desc": "GitHub Actions help automate tasks like building, testing, and deploying in your GitHub repository.  With one click, you can publish your production-ready code or package on npm, GitHub pages, docker images, deploy your production code on a cloud pro...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-run-github-actions-locally.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
