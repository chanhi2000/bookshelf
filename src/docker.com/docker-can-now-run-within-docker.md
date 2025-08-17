---
lang: en-US
title: "Docker can now run within DockerDocker"
description: "Article(s) > Docker can now run within DockerDocker"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker can now run within DockerDocker"
    - property: og:description
      content: "Docker can now run within DockerDocker"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-can-now-run-within-docker.html
prev: /devops/docker/articles/README.md
date: 2013-09-06
isOriginal: false
author:
  - name: Jérôme Petazzoni
    url : https://docker.com/author/jerome/
cover: https://docker.com/app/uploads/2013/09/docker-meme.jpg
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

[[toc]]

---

<SiteInfo
  name="Docker can now run within DockerDocker"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-can-now-run-within-docker"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2013/09/docker-meme.jpg"/>

![docker-meme](https://docker.com/app/uploads/2013/09/docker-meme.jpg)

One of the (many!) features of Docker 0.6 is the new “privileged” mode for containers. It allows you to run some containers with (almost) all the capabilities of their host machine, regarding kernel features and device access.

Among the (many!) possibilities of the “privileged” mode, you can now run Docker within Docker itself. First, we will see how to make that happen; next, we will explain what is involved under the hood, and finally, we will show something even more powerful than Docker in Docker!

---

## See Docker-in-Docker in action

If you have Docker 0.6, all you have to do is:

```sh
docker run -privileged -t -i jpetazzo/dind
```

This will download my special Docker image (we will see later why it is special), and execute it in the new privileged mode. By default, it will run a local `docker` daemon, and drop you into a shell. In that shell, let’s try a classical “Docker 101” command:

```sh
docker run -t -i ubuntu bash
```

Note how the container ID changes as you transition from the container running Docker, to the innermost container!

---

## What’s special in my `dind` image?

Almost nothing! It is built with a regular [Dockerfile (<FontIcon icon="iconfont icon-github"/>`jpetazzo/dind`)](https://github.com/jpetazzo/dind/blob/master/Dockerfile). Let’s see what is in that Dockerfile.

First, it installs a few packages: `lxc` and `iptables` (because Docker needs them), and `ca-certificates` (because when communicating with the Docker index and registry, Docker needs to validate their SSL certificates).

The Dockerfile also indicates that `/var/lib/docker` should be a volume. This is important, because the filesystem of a container is an AUFS mountpoint, composed of multiple *branches*; and those branches have to be “normal” filesystems (i.e. not AUFS mountpoints). In other words, `/var/lib/docker`, the place where Docker stores its containers, cannot be an AUFS filesystem. Therefore, we instruct Docker that this path should be a *volume*. Volumes have many purposes, but in this scenario, we use them as a pass-through to the “normal” filesystem of the host machine. The`/var/lib/docker` directory of the nested Docker will live somewhere in `/var/lib/docker/volumes` on the host system.

And of course, the Dockerfile injects the Docker binary in the image, as well as a [helper script (<FontIcon icon="iconfont icon-github"/>`jpetazzo/dind`)](https://github.com/jpetazzo/dind/blob/master/wrapdocker). The helper script deals with three things.

1. It ensures that the cgroup pseudo-filesystems are properly mounted, because Docker (or, more accurately, `lxc-start`) needs them.
2. It closes extraneous file descriptors which might have been leaked from the parent process. This is not strictly necessary, but you might notice weird side effects if you don’t do it; so I took care of it for you.
3. It checks if you specified a `PORT` environment variable through the `-e PORT=...` command-line option. If you did, the Docker daemon starts in the foreground, and listens for API requests on the specified TCP port. If you did not specify a `PORT` variable, it will start Docker in the background, and give you an interactive shell.

In the next section, I’ll tell you why I think that this `PORT` environment variable can be *very* useful.

---

## Docker-as-a-Service

If you just want to experiment with Docker-in-Docker, just start the image interactively, as shown above. Now, let’s pretend that you want to provide Docker-as-a-Service. I’m not speaking about Containers-as-a-Service here, but whole Docker instances. Well, each time someone wants their own private Docker instance, just run this:

```sh
docker run -privileged -d -p 1234 -e PORT=1234 jpetazzo/dind
```

Then use `docker inspect` to retrieve the public port allocated to that container, and give it to your user. They will be able to create containers on this “private Docker” by pointing their Docker client to the IP address and port that you gave them. (See [<FontIcon icon="fas fa-globe"/>Memcached-as-a-Service](http://memcachedasaservice.com/) for a similar example.)

Note, however, that there are serious security implications there: since the private Docker instances run in privileged mode, they can easily escalate to the host, and you probably don’t want this! If you really want to run something like this and expose it to the public, you will have to fine-tune the LXC template file, to restrict the capabilities and devices available to the Docker instances. In the future, Docker will allow fine-grained permission management; but for now, we think that the ability to switch between “locked down” and “privileged” is a great first step.

---

## Docker-in-Docker-in-Docker-in…

[![SONY DSC](https://docker.com/app/uploads/2013/08/DSC03438.jpg "- DSC03438")](https://docker.com/app/uploads/2013/08/DSC03438.jpg)

Can I Run Docker-in-Docker-in-Docker? Yes. When you are inside a privileged container, you can always nest one more level:

```sh
docker run -t -i -privileged jpetazzo/dind
```

And in the resulting container, you can repeat the process, *ad lib*.

Also, as you exit nested Docker containers, this will happen (note the root prompts):

```sh
root@975423921ac5:/# exit
root@6b2ae8bf2f10:/# exit
root@419a67dfdf27:/# exit
root@bc9f450caf22:/# exit
jpetazzo@tarrasque:~/Work/DOTCLOUD/dind$
```

At that point, you should blast Hans Zimmer’s [<FontIcon icon="fa-brands fa-youtube"/>Dream Is Collapsing](http://youtu.be/_IdA7aV4ftY) on your loudspeakers while twirling a spinning top 😀

---

## It doesn’t work!

While testing Docker-in-Docker in various environments, I found two possible problems.

It looks like the LXC tools cannot start nested containers if the devices control group is not in its own hierarchy. Check the content of `/proc/1/cgroup`: if `devices` is standing on a line on its own, you’re good. If you see that another control group is on the same line, Docker-in-Docker won’t work. The wrapper script will detect this situation and issue a warning. To work around the issue, you should stop all running containers, unmount all the control groups, and remount them one by one, each in its own hierarchy.

Also, if you use AppArmor, you need a special policy to support nested containers. If Docker-in-Docker doesn’t work, check your kernel log (with `dmesg`); if you see messages related to AppArmor, you can start Docker in unconfined mode, like this:

```sh
docker run -privileged -lxc-conf="aa_profile=unconfined" -t -i dind
```

---

## Take Me To Your Repo

The Dockerfile, the wrapper, and some extra documentation is available on my github repository:

<SiteInfo
  name="jpetazzo/dind"
  desc="Docker in Docker."
  url="https://github.com/jpetazzo/dind/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ccdf7e84b1db9d4e9b952072e3ae466c345238f1745ae54933842a6b382c222f/jpetazzo/dind"/>

::: info About Jérôme Petazzoni

![Jérôme Petazzoni](https://docker.com/app/uploads/2013/08/jerome_docker_in_docker_squ.jpg)

Jérôme is a senior engineer at dotCloud, where he rotates between Ops, Support and Evangelist duties and has earned the nickname of “master Yoda”. In a previous life he built and operated large scale Xen hosting back when EC2 was [<FontIcon icon="fa-brands fa-wikipedia-w"/>just the name of a plane](http://en.wikipedia.org/wiki/Cessna_EC-2), supervized the deployment of fiber interconnects through the French subway, built a specialized GIS to visualize fiber infrastructure, specialized in commando deployments of large-scale computer systems in bandwidth-constrained environments such as conference centers, and various other feats of technical wizardry. He cares for the servers powering dotCloud, helps our users feel at home on the platform, and documents the many ways to use dotCloud in articles, tutorials and sample applications. He’s also an avid dotCloud power user who has deployed just about anything on dotCloud - look for one of his many custom services on our Github repository.

*Connect with Jérôme on Twitter! [<FontIcon icon="fa-brands fa-x-twitter"/>`@jpetazzo`](https://x.com/jpetazzo)*

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker can now run within DockerDocker",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-can-now-run-within-docker.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
