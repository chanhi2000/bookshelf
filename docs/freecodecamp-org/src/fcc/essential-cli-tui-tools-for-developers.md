---
lang: en-US
title: "Essential CLI/TUI Tools for Developers"
description: "Article(s) > Essential CLI/TUI Tools for Developers"
icon: iconfont icon-shell
category:
  - Shell
  - DevOps
  - Kubernetes
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - sh
  - shell
  - devops
  - kubernetes
  - k8s
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Essential CLI/TUI Tools for Developers"
    - property: og:description
      content: "Essential CLI/TUI Tools for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/essential-cli-tui-tools-for-developers.html
prev: /programming/sh/articles/README.md
date: 2025-01-29
isOriginal: false
author:
  - name: Alex Pliutau
    url : https://freecodecamp.org/news/author/pltvs/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738077620615/22e3c744-d609-4469-ae10-ef8ad4b515a1.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/sh/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="Essential CLI/TUI Tools for Developers"
  desc="As developers, we spend a lot of time in our terminals. And there are tons of great CLI/TUI tools that can boost our productivity (as well as some that are just fun to use). From managing Git repositories and navigating file systems to monitoring sys..."
  url="https://freecodecamp.org/news/essential-cli-tui-tools-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738077620615/22e3c744-d609-4469-ae10-ef8ad4b515a1.png"/>

As developers, we spend a lot of time in our terminals. And there are tons of great CLI/TUI tools that can boost our productivity (as well as some that are just fun to use). From managing Git repositories and navigating file systems to monitoring system performance and even playing retro games, the command line offers a powerful and versatile environment.

In this article, we’ll go through a collection of CLI / TUI tools that have been widely adopted in the developer community, spanning various categories such as version control, system utilities, text editors, and more. I wanted to give you a diverse selection that caters to different needs and workflows.

For each tool, I’ll include an overview, highlighting its key features and use cases, along with clear and concise installation instructions for various operating systems, ensuring you can quickly get up and running with these valuable command-line companions.

---

## Kubernetes Tools

### [<VPIcon icon="iconfont icon-github"/>`derailed/k9s`](https://github.com/derailed/k9s)

<SiteInfo
  name="derailed/k9s"
  desc="🐶 Kubernetes CLI To Manage Your Clusters In Style!"
  url="https://github.com/derailed/k9s/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/167596393/6dd20780-5c0e-11ea-8e26-7754ad171192"/>

K9s is a must-have tool for anyone working with Kubernetes. Its intuitive terminal-based UI, real-time monitoring capabilities, and powerful command options make it a standout in the world of Kubernetes management tools.

The K9s project is designed to continually watch Kubernetes cluster for changes and offer subsequent commands to interact with observed resources. This makes it easier to manage applications, especially in a complex, multi-cluster environment. The project’s aim is to make Kubernetes management more accessible and less daunting, especially for those who are not Kubernetes experts.

Just launch k9s in your terminal and start exploring the Kubernetes resources with ease.

![K9s interface](https://miro.medium.com/v2/resize:fit:700/0*tkfwKS01NCnUBE-N.png)

To install K9s:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install derailed/k9s/k9s
```

@tab <VPIcon icon="fa-brands fa-ubuntu"/>

```sh
# via snap for Linux
snap install k9s --devmode
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install k9s
```

@tab <VPIcon icon="fa-brands fa-golang"/>

```sh
# via go install
go install github.com/derailed/k9s@latest
```

:::

### [<VPIcon icon="iconfont icon-github"/>`ahmetb/kubectx`](https://github.com/ahmetb/kubectx)

<SiteInfo
  name="ahmetb/kubectx"
  desc="Faster way to switch between clusters and namespaces in kubectl"
  url="https://github.com/ahmetb/kubectx/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3eca62f8e48cd2df399025c40e0dd540af9dd7aa0177f011ed658fa0f43869f2/ahmetb/kubectx"/>

Kubectx is the most popular tool for switching Kubernetes contexts, but it has the fewest features! It displays all the contexts in your Kubernetes config as a selectable list and lets you pick one. That’s it!

This project comes with 2 tools:

- **kubectx** is a tool that helps you switch between contexts (clusters) on kubectl faster.
- **kubens** is a tool to switch between Kubernetes namespaces (and configure them for kubectl) easily.

These tools make it very easy to switch between Kubernetes clusters and namespaces if you work with many of them daily.

![Here you can see it in action:](https://miro.medium.com/v2/resize:fit:700/0*g442WF-cXW-z1dKQ.gif)

To install kubectx:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install kubectx
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo apt install kubectx
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
sudo pacman -S kubectx
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install kubens kubectx
```

:::

### [<VPIcon icon="iconfont icon-github"/>`kubescape/kubescape`](https://github.com/kubescape/kubescape)

<SiteInfo
  name="kubescape/kubescape"
  desc="Kubescape is an open-source Kubernetes security platform for your IDE, CI/CD pipelines, and clusters. It includes risk analysis, security, compliance, and misconfiguration scanning, saving Kubernet..."
  url="https://github.com/kubescape/kubescape/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/395283401/8b597a65-306c-496e-bc3e-9a7c1e21620f"/>

I hope you take the security of your Kubernetes clusters seriously. If so, **kubescape** is really great for testing if your Kubernetes cluster is deployed securely according to multiple frameworks.

Kubescape can scan clusters, YAML files, and Helm charts and detects the misconfigurations according to multiple sources.

![I usually use it in my CI/CD to scan for vulnerabilities automatically when changing Kubernetes manifests or Helm templates.](https://miro.medium.com/v2/resize:fit:700/0*Ft2r01ij9Rxj2-V0.png)

To install kubescape:

::: tabs

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install kubescape
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo add-apt-repository ppa:kubescape/kubescape
sudo apt update
sudo apt install kubescape
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install kubescape
```

:::

---

## Container Tools

### [<VPIcon icon="iconfont icon-github"/>`bcicen/ctop`](https://github.com/bcicen/ctop)

<SiteInfo
  name="bcicen/ctop"
  desc="Top-like interface for container metrics."
  url="https://github.com/bcicen/ctop/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/deaa28ed6faf1703ace6ebc4819088e2b4bdd2d6759bcb6f8211bf65ca4a1d57/bcicen/ctop"/>

**ctop** is basically a better version of `docker stats`. It provides a concise and condensed overview of real-time metrics for multiple containers. It comes with built-in support for Docker and runC, and connectors for other container and cluster systems are planned for future releases.

Using ctop is simple.

![Once you have the tool open, you’ll see all of your currently active containers listed.](https://miro.medium.com/v2/resize:fit:700/0*EJ5kdlEs5M5QxDBy.gif)

To install ctop:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install ctop
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
sudo pacman -S ctop
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via scoop for Windows
scoop install ctop
```

:::

### [<VPIcon icon="iconfont icon-github"/>`jesseduffield/lazydocker`](https://github.com/jesseduffield/lazydocker)

<SiteInfo
  name="jesseduffield/lazydocker"
  desc="The lazier way to manage everything docker."
  url="https://github.com/jesseduffield/lazydocker/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/187335810/d5cecc00-9b1c-11e9-8abf-5649b23bce13"/>

While Docker's command-line interface is powerful, sometimes you might want a more visual approach without the overhead of a full GUI. This is especially true when managing Docker containers on a headless Linux server where installing a web-based GUI might be undesirable.

Lazydocker was created by [Jesse Duffield (<VPIcon icon="iconfont icon-github"/>`jesseduffield`)](https://github.com/jesseduffield) to help make managing docker containers a bit easier.

![Simply put, Lazydocker is a terminal UI (written in Golang) for the docker and docker-compose commands.](https://miro.medium.com/v2/resize:fit:700/0*Cbmx4ShRSO7ccVy2.gif)

To install lazydocker:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macso"/>

```sh
# via Homebrew for macOS
brew install lazydocker
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install lazydocker
```

@tab <VPIcon icon="fa-brands fa-golang"/>

```sh
# via go install
go install github.com/jesseduffield/lazydocker@latest
```

:::

### [<VPIcon icon="iconfont icon-github"/>`wagoodman/dive`](https://github.com/wagoodman/dive)

<SiteInfo
  name="wagoodman/dive"
  desc="A tool for exploring each layer in a docker image."
  url="https://github.com/wagoodman/dive/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/5be25520dc2684062ca23ffdee0f0fcfba6201c7544f9bbc5ad5cbf4228490e8/wagoodman/dive"/>

A Docker image is made up of layers, and with every layer you add on, more space will be taken up by the image. Therefore, the more layers in the image, the more space the image will require.

That’s where **dive** shines, it helps you explore your Docker image and layer contents.

![It can also help you find ways to shrink the size of your Docker/OCI image.](https://miro.medium.com/v2/resize:fit:700/0*swo_hrKJ9EV7hyMs.gif)

To install dive:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install dive
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S dive
```

@tab <VPIcon icon="fa-brands fa-golang"/>

```sh
# via go install
go get github.com/wagoodman/dive
```

:::

---

## File and Text Tools

### [<VPIcon icon="iconfont icon-github"/>`jqlang/jq`](https://github.com/jqlang/jq)

<SiteInfo
  name="jqlang/jq"
  desc="Command-line JSON processor"
  url="https://github.com/jqlang/jq/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/dc4d137a6fa415f15218bb604f686d941e7343415ea01a48ced00f36aba27f79/jqlang/jq"/>

You may be aware of this one already as it’s well known in the developer community.

Unfortunately, shells such as Bash can’t interpret and work with JSON directly. That’s where you can use **jq** as a command-line JSON processor that’s similar to sed, awk, grep, and so on for JSON data. It’s written in portable C and doesn’t have any runtime dependencies.

![This lets you slice, filter, map, and transform structured data with ease.](https://miro.medium.com/v2/resize:fit:700/0*uwysqWprpmrLrJQP.png)

To install jq, you can download the latest releases from the [GitHub release page. (<VPIcon icon="iconfont icon-github"/>`jqlang/jq`)](https://github.com/jqlang/jq/releases)

### [<VPIcon icon="iconfont icon-github"/>`sharkdp/bat`](https://github.com/sharkdp/bat)

<SiteInfo
  name="sharkdp/bat"
  desc="A cat(1) clone with wings."
  url="https://github.com/sharkdp/bat/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/130464961/20727580-dd13-11e9-8f03-0789a00a3b64"/>

This is the most used CLI on my machine currently. A few years ago it was **cat**, which is great but doesn’t provide syntax highlighting, or Git integration

Bat’s syntax highlighting supports many programming and markup languages, helping you make your code more readable directly in the terminal. Git integration lets you see modifications in relation to the index, highlighting the lines you’ve added or changed.

![Simply run `bat filename` and enjoy its output.](https://miro.medium.com/v2/resize:fit:656/0*L02HhsqDcq2_G_z4.png)

To install bat:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install bat
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo apt install bat
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S bat
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install bat
```

:::

### [<VPIcon icon="iconfont icon-github"/>`BurntSushi/ripgrep`](https://github.com/BurntSushi/ripgrep)

<SiteInfo
  name="BurntSushi/ripgrep"
  desc="ripgrep recursively searches directories for a regex pattern while respecting your gitignore"
  url="https://github.com/BurntSushi/ripgrep/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c9edeb66643dbb19bd35558011887a7e05e204c016c66e71f59e1ad76ddad4c0/BurntSushi/ripgrep"/>

**ripgrep** is definitely becoming a popular alternative (if not the most popular) to the **grep** command. Even some editors like [<VPIcon icon="iconfont icon-vscode"/>Visual Studio Code](https://code.visualstudio.com/updates/v1_11) are using ripgrep to power their search offerings.

The major selling point is its default behavior for recursive search and speed.

I now rarely use grep on my personal machine, as ripgrep is much faster.

To install ripgrep:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install ripgrep
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo apt-get install ripgrep
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S ripgrep
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install ripgrep
```

:::

---

## Git Tools

### [<VPIcon icon="iconfont icon-github"/>`jesseduffield/lazygit`](https://github.com/jesseduffield/lazygit)

<SiteInfo
  name="jesseduffield/lazygit"
  desc="simple terminal UI for git commands."
  url="https://github.com/jesseduffield/lazygit/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e6e849429df7fcd71ff7189558de09d017dcf668d0b9279a848ab4070b2ecbcb/jesseduffield/lazygit"/>

**lazygit** is another great terminal UI for Git commands developed by [Jesse Duffield (<VPIcon icon="iconfont icon-github"/>`jesseduffield`)](https://github.com/jesseduffield) using Go.

I don’t mind using the Git CLI directly for simple things, but it is famously verbose for more advanced use cases. I am just too lazy to memorize longer commands.

![And lazigit has made me a more productive Git user than ever.](https://miro.medium.com/v2/resize:fit:700/0*ykEtn2HQ9QgU40jx.png)

To install lazygit:

::: code-tabs#sh

@tab:active <VPIcon icon="fas fa-macos"/>

```sh
# via Homebrew for macOS
brew install jesseduffield/lazygit/lazygit
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S lazygit
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via scoop for Windows
scoop install lazygit
```

:::

---

## Development Tools

### [<VPIcon icon="iconfont icon-github"/>`Julien-cpsn/ATAC`](https://github.com/Julien-cpsn/ATAC)

<SiteInfo
  name="Julien-cpsn/ATAC"
  desc="A simple API client (postman like) in your terminal"
  url="https://github.com/Julien-cpsn/ATAC/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/075bbca14588a93e7f4bd9362678ce86a5982340b2020160893191378ed3a4b4/Julien-cpsn/ATAC"/>

ATAC stands for Arguably a Terminal API Client. It’s based on popular clients like Postman, Insomnia, and Bruno, but it runs inside your terminal without needing any particular graphical environment.

![It works best for developers who need an offline, cross-platform API client right at their fingertips (terminal).](https://miro.medium.com/v2/resize:fit:700/0*NoOMeMxkELNFI9RS.png)

To install ATAC:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew tap julien-cpsn/atac
brew install atac
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S atac
```

:::

### [<VPIcon icon="iconfont icon-github"/>`grafana/k6`](https://github.com/grafana/k6)

<SiteInfo
  name="grafana/k6"
  desc="A modern load testing tool, using Go and JavaScript - https://k6.io"
  url="https://github.com/grafana/k6/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/54400687/29992200-7069-11ea-85c9-3824e56625b2"/>

I’ve used many load-testing tools in my career, such as [<VPIcon icon="iconfont icon-github"/>`tsenart/vegeta`](https://github.com/tsenart/vegeta) or even [<VPIcon icon="fas fa-globe"/>`ab`](https://httpd.apache.org/docs/2.4/programs/ab.html) in the past. But now I mostly use **k6s** as it has everything I need and has a great GUI and TUI.

Why it works well for me:

- k6 has really good [documentation](https://k6.io/docs/)
- Many integrations available: Swagger, JMeter scripts, and so on.
- Results reporting is quite good

![K6 interface](https://cdn.hashnode.com/res/hashnode/image/upload/v1737552000859/df5af273-3706-4d41-9dbe-717d2f2d18b7.webp)

To install k6:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install k6
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo apt-get install k6
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install k6
```

:::

### [<VPIcon icon="iconfont icon-github"/>`httpie/cli`](https://github.com/httpie/cli)

<SiteInfo
  name="httpie/cli"
  desc="🥧 HTTPie CLI  — modern, user-friendly command-line HTTP client for the API era. JSON support, colors, sessions, downloads, plugins & more."
  url="https://github.com/httpie/cli/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/3544424/71668a1d-1b65-42c4-b8ac-981b8fd46dee"/>

Don’t get me wrong, curl is great, but not very human-friendly.

![HTTPie has a simple and expressive syntax, supports JSON and form data, handles authentication and headers, and displays colorized and formatted output.](https://miro.medium.com/v2/resize:fit:700/0*Bqi3gBKgIkeEPEI_.gif)

To install httpie:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install httpie
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo apt install httpie
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -Syu httpie
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install httpie
```

:::

### [<VPIcon icon="iconfont icon-github"/>`asciinema/asciinema`](https://github.com/asciinema/asciinema)

<SiteInfo
  name="asciinema/asciinema"
  desc="Terminal session recorder 📹."
  url="https://github.com/asciinema/asciinema/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bdbe801b4ad18a03eb0987d3abea97004515f05b58e454007f65bff98505beb3/asciinema/asciinema"/>

I call it a terminal YouTube

asciinema is a great tool when you want to share your terminal sessions with someone else, instead of recording heavy videos.

![I use it often when I develop some CLI tools and want to share the demo of how they work (on GitHub, for example).](https://miro.medium.com/v2/resize:fit:700/0*Exg2XuZlIPaJJ-iB.png)

To install asciinema:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install asciinema
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
sudo apt install asciinema
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
sudo pacman -S asciinema
```

:::

---

## Networking

### [<VPIcon icon="iconfont icon-github"/>`mr-karan/doggo`](https://github.com/mr-karan/doggo)

<SiteInfo
  name="mr-karan/doggo"
  desc=":dog: Command-line DNS Client for Humans. Written in Golang"
  url="https://github.com/mr-karan/doggo/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/8a9d48ac8d43c5f2f8376b6cfd9dd7ffbe37b4eb80998b11ede60efa709d818f/mr-karan/doggo"/>

It's totally inspired by **dog** which is written in Rust.

In the past I would use **dig** to inspect the DNS, but its output is often verbose and difficult to parse visually.

**doggo** addresses these shortcomings by offering two key improvements:

- doggo provides the JSON output support for easy scripting and parsing.
- doggo offers a human-readable output format that uses color-coding and a tabular layout to present DNS information clearly and concisely.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737552264803/bb902365-bc0d-4a56-9a87-6b065ee5608a.png)

To install doggo:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install doggo
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via scoop for Windows
scoop install doggo
```

@tab <VPIcon icon="fa-brands fa-golang"/>

```sh
# via go install
go install github.com/mr-karan/doggo/cmd/doggo@latest
```

:::

### [<VPIcon icon="iconfont icon-github"/>`orf/gping`](https://github.com/orf/gping)

<SiteInfo
  name="orf/gping"
  desc="Ping, but with a graph"
  url="https://github.com/orf/gping/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3d063793c228dabbeb1499e9f02610571cc26d330f417b8fbd48cc7cbe67e514/orf/gping"/>

The well-known **ping** command is not the most interesting to look at, and interpreting its output in a useful way can be difficult.

![**gping** gives a plot of the ping latency to a host, and the most useful feature is the ability to run concurrent pings to multiple hosts and plot all of them on the same graph.](https://miro.medium.com/v2/resize:fit:700/0*IPi1TOpiMnWPN1VU.gif)

To install gping:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install gping
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
# via Chocolatey for Windows
choco install gping
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
apt install gping
```

:::

---

## Workstation

### [<VPIcon icon="iconfont icon-github"/>`tmux/tmux`](https://github.com/tmux/tmux/wiki)

<SiteInfo
  name="tmux/tmux"
  desc="tmux source code."
  url="https://github.com/tmux/tmux/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4d96ab2d321c036eabeb376ca7db422bffd537d82ca4c1184bd060937ee1f102/tmux/tmux"/>

Why is tmux such a big deal?

You may have run into situations where you need to view multiple terminal consoles at the same time. For example, you may have a few servers running (for example, web, database, debugger) and you might want to monitor all the output coming from these servers in real-time to validate behavior or run commands.

Before tmux, you might have just opened a few different tabs in the terminal and switched between them to see the output.

Thankfully, there’s an easier way — **tmux**.

In a nutshell, here are some of its most popular features:

- Window/Pane management
- Session management with persistence
- Sharable sessions with other users
- Scriptable configurations

![](https://miro.medium.com/v2/resize:fit:700/0*u8o0WxutrPXxg6FG.png)

To install tmux:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install tmux
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
apt install tmux
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S tmux
```

:::

### [<VPIcon icon="iconfont icon-github"/>`zellij-org/zellij`](https://github.com/zellij-org/zellij)

<SiteInfo
  name="zellij-org/zellij"
  desc="A terminal workspace with batteries included."
  url="https://github.com/zellij-org/zellij/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/292014229/b8e9df2e-3a36-4642-9e54-2edffb3a59ef"/>

Since I listed tmux here, it also makes sense to include a new competitor, **Zellij**, which has been gaining traction in the developer community. Both have their own unique features and purposes.

Compared to traditional terminal multiplexers, zellij offers a more user-friendly interface, modern design elements, built-in layout systems, and a plugin system, making it easier for newcomers to get started.

I still like tmux. It has a special place in my heart because it has served a great purpose for years.

![But zellij is another good option.](https://miro.medium.com/v2/resize:fit:700/0*VwAit4tO1IjxH9dp.gif)

To install zellij:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install zellij
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via apt for Debian
apt install zellij
```

@tab <VPIcon icon="iconfont icon-archlinux"/>

```sh
# via pacman for Arch Linux
pacman -S zellij
```

:::

### [<VPIcon icon="iconfont icon-github"/>`aristocratos/btop`](https://github.com/aristocratos/btop)

<SiteInfo
  name="aristocratos/btop"
  desc="A monitor of resources."
  url="https://github.com/aristocratos/btop/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/365005377/83a11b00-90f4-4b9b-a658-0ce7eb88e67a"/>

I can’t live without btop, and it’s installed on all my machines via my personal [<VPIcon icon="iconfont icon-github"/>`plutov/dotfiles`](https://github.com/plutov/dotfiles). I rarely use now built-in OS GUIs to check the resource utilization on my host machine, because **btop** can do it much better.

![I use to to quickly explore what uses the most memory, monitor and kill some processes, and more.](https://miro.medium.com/v2/resize:fit:700/0*HbuJrCbT6xVApLoh.png)

To install btop:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>

```sh
# via Homebrew for macOS
brew install btop
```

@tab <VPIcon icon="fa-brands fa-debian"/>

```sh
# via snap for Debian
sudo snap install btop
```

:::

---

## Conclusion

These CLIs/TUIs should work well in any modern terminal. I personally use [<VPIcon icon="fas fa-globe"/>Ghostty](https://ghostty.org/) currently and it works great, but other popular options like **iTerm2, Kitty**, and the default terminal applications on macOS and Linux should also provide a seamless experience. The key is to ensure your terminal supports features like 256-color palettes and UTF-8 encoding for optimal display of these tools.

There’s a huge amount of CLIs/TUIs out there, and I couldn’t list them all (though I tried to list some of the best). This selection represents a starting point for exploring the rich ecosystem of command-line tools available to developers. I encourage you to explore further, discover new tools that fit your specific needs, and contribute back to the community by sharing your findings.

<SiteInfo
  name="packagemain.tech | Alex Pliutau | Substack"
  desc="Welcome to packagemain.tech, your one-stop shop for mastering Backend, Cloud, Kubernetes, Microservices, APIs, and more. We'll provide you with hands-on, practical and real-world tutorials that you can use to build your software development skills. Click to read packagemain.tech, a Substack publication with thousands of subscribers."
  url="https://packagemain.tech/"
  logo="https://substack-post-media.s3.amazonaws.com/public/images/2ea54e25-eaa6-4630-bfc0-10b8cfdce894/apple-touch-icon-1024x1024.png"
  preview="https://substack-post-media.s3.amazonaws.com/public/images/9bcf6f54-70e1-498f-b291-3fb402eccaad_2743x1457.jpeg"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Essential CLI/TUI Tools for Developers",
  "desc": "As developers, we spend a lot of time in our terminals. And there are tons of great CLI/TUI tools that can boost our productivity (as well as some that are just fun to use). From managing Git repositories and navigating file systems to monitoring sys...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/essential-cli-tui-tools-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
