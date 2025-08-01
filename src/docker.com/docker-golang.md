---
lang: en-US
title: "Docker + Golang ="
description: "Article(s) > Docker + Golang ="
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Go
  - Article(s)
tag:
  - blog
  - docker.com
  - devops
  - docker
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Docker + Golang ="
    - property: og:description
      content: "Docker + Golang ="
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/docker-golang.html
prev: /devops/docker/articles/README.md
date: 2016-09-15
isOriginal: false
author:
  - name: Jérôme Petazzoni
    url : https://docker.com/author/jerome/
cover: https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png
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
  name="Docker + Golang ="
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/docker-golang"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

This is a short collection of tips and tricks showing how Docker can be useful when working with Go code. For instance, I’ll show you how to compile Go code with different versions of the Go toolchain, how to cross-compile to a different platform (and test the result!), or how to produce really small container images.

The following article assumes that you have Docker installed on your system. It doesn’t have to be a recent version (we’re not going to use any fancy feature here).

---

## Go without go

> … And by that, we mean “Go without installing `go`”.

If you write Go code, or if you have even the slightest interest into the Go language, you certainly have the Go compiler and toolchain installed, so you might be wondering “what’s the point?”; but there are a few scenarios where you want to compile Go without installing Go.

- You still have this old Go 1.2 on your machine (that you can’t or won’t upgrade), and you have to work on this codebase that requires a newer version of the toolchain.
- You want to play with cross compilation features of Go 1.5 (for instance, to make sure that you can create OS X binaries from a Linux system).
- You want to have multiple versions of Go side-by-side, but don’t want to completely litter your system.
- You want to be 100% sure that your project and all its dependencies download, build, and run fine on a clean system.

If any of this is relevant to you, then let’s call Docker to the rescue!

### Compiling a program in a container

When you have installed Go, you can do `go get -v github.com/user/repo`to download, build, and install a library. (The `-v`flag is just here for verbosity, you can remove it if you prefer your toolchain to be swift and silent!)

You can also do `go get github.com/user/repo/...`(yes, that’s three dots) to download, build, and install all the things in that repo (including libraries and binaries).

We can do that in a container!

Try this:

```sh
docker run golang go get -v github.com/golang/example/hello/...
```

This will pull the golangimage (unless you have it already; then it will start right away), and create a container based on that image. In that container, gowill download a little “hello world” example, build it, and install it. But it will install it in the container … So how do we run that program now?

### Running our program in a container

One solution is to committhe container that we just built, i.e. “freeze” it into a new image:

```sh
docker commit $(docker ps -lq)awesomeness
```

Note: `docker ps -lq`outputs the ID (and only the ID!) of the last container that was executed. If you are the only uesr on your machine, and if you haven’t created another container since the previous command, that container should be the one in which we just built the “hello world” example.

Now, we can run our program in a container based on the image that we just built:

```sh
docker run awesomeness hello
```

The output should be `Hello, Go examples!`.

::: tip Bonus points

When creating the image with `docker commit`, you can use the `--change`flag to specify arbitrary [<FontIcon icon="fa-brands fa-docker"/>`Dockerfile`](https://docs.docker.com/engine/reference/builder/)commands. For instance, you could use a `CMD`or `ENTRYPOINT`command so that `docker run awesomeness`automatically executes hello.

:::

### Running in a throwaway container

What if we don’t want to create an extra image just to run this Go program?

We got you covered:

```sh
docker run --rm golang sh -c \  
"go get github.com/golang/example/hello/... && exec hello"
```

Wait a minute, what are all those bells and whistles?

- `--rm`tells to the Docker CLI to automatically issue a `docker rm`command once the container exits. That way, we don’t leave anything behind ourselves.
- We chain together the build step (`go get`) and the execution step (`exec hello`) using the shell logical operator `&&`. If you’re not a shell aficionado, `&&`means “and”. It will run the first part `go get...`, and if (and only if!) that part is successful, it will run the second part (`exec hello`). If you wonder why this is like that: it works like a lazy `and`evaluator, which needs to evaluate the right hand side only if the left hand side evaluates to `true`.
- We pass our commands to `sh -c`, because if we were to simply do `docker run golang "go get ... && hello"`, Docker would try to execute the program named `go SPACE get SPACE etc`.and that wouldn’t work. So instead, we start a shell and instruct the shell to execute the command sequence.
- We use `exec hello`instead of `hello`: this will replace the current process (the shell that we started) with the `hello`program. This ensures that `hello`will be PID 1 in the container, instead of having the shell as PID 1 and `hello`as a child process. This is totally useless for this tiny example, but when we will run more useful programs, this will allow them to receive external signals properly, since external signals are delivered to PID 1 of the container. What kind of signal, you might be wondering? A good example is `docker stop`, which sends `SIGTERM`to PID 1 in the container.

### Using a different version of Go

When you use the `golang` image, Docker expands that to `golang:latest,` which (as you might guess) will map to the latest version available on the Docker Hub.

If you want to use a specific version of Go, that’s very easy: specify that version as a tagafter the image name.

For instance, to use Go 1.5, change the example above to replace `golang`with `golang:1.5`:

```sh
docker run --rm golang:1.5 sh -c \
"go get github.com/golang/example/hello/... && exec hello"
```

You can see all the versions (and variants) available on the [<FontIcon icon="fa-brands fa-docker"/>Golang image page](https://hub.docker.com/r/library/golang/tags/)on the Docker Hub.

### Installing on our system

OK, so what if we want to run the compiled program on our system, instead of in a container?

We could copy the compiled binary out of the container. Note, however, that this will work only if our container architecture matches our host architecture; in other words, if we run Docker on Linux. (I’m leaving out people who might be running Windows Containers!)

The easiest way to get the binary out of the container is to map the `$GOPATH/bin`directory to a local directory. In the `golang`container, `$GOPATH`is `/go.` So we can do the following:

```sh
docker run -v /tmp/bin:/go/bin \
golang go get github.com/golang/example/hello/...
/tmp/bin/hello
```

If you are on Linux, you should see the `Hello, Go examples!`message. But if you are, for instance, on a Mac, you will probably see:

```plaintext title="output"
-bash:  
/tmp/test/hello: cannot execute binary file
```

What can we do about it?

### Cross-compilation

Go 1.5 comes with [<FontIcon icon="fas fa-globe"/>outstanding out-of-the-box cross-compilation abilities](http://dave.cheney.net/2015/08/22/cross-compilation-with-go-1-5), so if your container operating system and/or architecture doesn’t match your system’s, it’s no problem at all!

To enable cross-compilation, you need to set `GOOS`and/or `GOARCH`.

For instance, assuming that you are on a 64 bits Mac:

```sh
docker run -e GOOS=darwin -e GOARCH=amd64 -v /tmp/crosstest:/go/bin \
golang go get github.com/golang/example/hello/...
```

The output of cross-compilation is not directly in `$GOPATH/bin`, but in `$GOPATH/bin/$GOOS_$GOARCH.` In other words, to run the program, you have to execute `/tmp/crosstest/darwin_amd64/hello.`

### Installing straight to the $PATH

If you are on Linux, you can even install directly to your system <FontIcon icon="fas fa-folder-open"/>`bin`directories:

```sh
docker run -v /usr/local/bin:/go/bin \
golang get github.com/golang/example/hello/...
```

However, on a Mac, trying to use <FontIcon icon="fas fa-folder-open"/>`/usr`as a volume will not mount your Mac’s filesystem to the container. It will mount the <FontIcon icon="fas fa-folder-open"/>`/usr`directory of the Moby VM (the small Linux VM hidden behind the Docker whale icon in your toolbar).

You can, however, use <FontIcon icon="fas fa-folder-open"/>`/tmp` or something in your home directory, and then copy it from there.

---

## Building lean images

The Go binaries that we produced with this technique are statically linked. This means that they embed all the code that they need to run, including all dependencies. This contrasts withdynamically linkedprograms, which don’t contain some basic libraries (like the “libc”) and use a system-wide copy which is resolved at run time.

This means that we can drop our Go compiled program in a container, without anything else, and it should work.

Let’s try this!

### The scratch image

There is a special image in the Docker ecosystem: `scratch`. This is an empty image. It doesn’t need to be created or downloaded, since by definition, it is empty.

Let’s create a new, empty directory for our new Go lean image.

In this new directory, create the following Dockerfile:

```dockerfile title="Dockerfile"
FROM scratch
COPY ./hello /hello
ENTRYPOINT ["/hello"]
```

This means:

- start from scratch(an empty image),
- add the `hello`file to the root of the image, 
- define this `hello`program to be the default thing to execute when starting this container.

Then, produce our `hello`binary as follows:

```sh
docker run -v $(pwd):/go/bin --rm \
golang go get github.com/golang/example/hello/...
```

Note: we don’t need to set `GOOS`and `GOARCH`here, because precisely, we want a binary that will run in a Docker container, not on our host system. So leave those variables alone!

Then, we can build the image:

```sh
docker build -t hello .
```

And test it:

::: note

```sh
docker run hello
```

This should display Hello, Go examples!.

:::

Last but not least, check the image’s size:

```sh
docker images hello
```

If we did everything right, this image should be about 2 MB. Not bad!

### Building something without pushing to GitHub

Of course, if we had to push to GitHub each time we wanted to compile, we would waste a lot of time.

When you want to work on a piece of code and build it within a container, you can mount a local directory to <FontIcon icon="fas fa-folder-open"/>`/go`in the `golang`container, so that the `$GOPATH`is persisted across invocations: `docker run -v $HOME/go:/go golang ....`

But you can also mount local directories to specific paths, to “override” some packages (the ones that you have edited locally). Here is a complete example:

```sh
# Adapt the two following environment variables if you are not running on a Mac
export GOOS=darwin GOARCH=amd64
mkdir go-and-docker-is-love
cd go-and-docker-is-love
git clone git://github.com/golang/example
cat example/hello/hello.go
sed -i .bak s/olleH/eyB/ example/hello/hello.go

docker run --rm \
-v $(pwd)/example:/go/src/github.com/golang/example \
-v $(pwd):/go/bin/${GOOS}_${GOARCH}\
-e GOOS -e GOARCH \
golang go get github.com/golang/example/hello/...
./hello
# Should display "Bye, Go examples!"
```

---

## The special case of the net package and CGo

Before diving into real-world Go code, we have to confess something: we lied a little bit about the static binaries. If you are using CGo, or if you are using the `net`package, the Go linker will generate a dynamic binary. In the case of the `net` package (which a lotof useful Go programs out there are using indeed!), the main culprit is the DNS resolver. Most systems out there have a fancy, modular name resolution system (like the Name Service Switch) which relies on plugins which are, technically, dynamic libraries. By default, Go will try to use that; and to do so, it will produce dynamic libraries.

How do we work around that?

### Re-using another distro’s `libc`

One solution is to use a base image that hasthe essential libraries needed by those Go programs to function. Almost any “regular” Linux distro based on the GNU `libc` will do the trick. So instead of `FROM scratch`, you would use `FROM debian`or `FROM fedora`, for instance. The resulting image will be much bigger now; but at least, the bigger bits will be shared with other images on your system.

Note: you cannotuse Alpine in that case, since Alpine is using the musl library instead of the GNU `libc`.

### Bring your own `libc`

Another solution is to surgically extract the files needed, and place them in your container with `COPY.` The resulting container will be small. However, this extraction process leaves the author with the uneasy impression of a really dirty job, and they would rather not go into more details.

If you want to see for yourself, look around `ldd`and the Name Service Switch plugins mentioned earlier.

### Producing static binaries with netgo

We can also instruct Go to notuse the system’s `libc`, and substitute Go’s `netgo` library, which comes with a native DNS resolver.

To use it, just add `-tags netgo -installsuffix netgo`to the `go get`options.

- `-tags netgo`instructs the toolchain to use netgo.
- `-installsuffix netgo`will make sure that the resulting libraries (if any) are placed in a different, non-default directory. This will avoid conflicts between code built with and without netgo, if you do multiple `go get`(or `go build`) invocations. If you build in containers like we have shown so far, this is not strictly necessary, since there will be no other Go code compiled in this container, ever; but it’s a good idea to get used to it, or at least know that this flag exists.

---

## The special case of SSL certificates

There is one more thing that you have to worry about if your code has to validate SSL certificates; for instance if it will connect to external APIs over HTTPS. In that case, you need to put the root certificates in your container too, because Go won’t bundle those into your binary.

### Installing the SSL certificates

Three again, there are multiple options available, but the easiest one is to use a package from an existing distribution.

Alpine is a good candidate here because it’s so tiny. The following <FontIcon icon="fa-brands fa-docker"/>`Dockerfile`will give you a base image that is small, but has an up-to-date bundle of root certificates:

```sh
FROM alpine:3.4
RUN apk add --no-cache ca-certificates apache2-utils
```

Check it out; the resulting image is only 6 MB!

Note: the `--no-cache`option tells `apk`(the Alpine package manager) to get the list of available packages from Alpine’s distribution mirrors, without saving it to disk. You might have seen Dockerfiles doing something like `apt-get update && apt-get install ... && rm -rf /var/cache/apt/*`; this achieves something equivalent (i.e. not leave package caches in the final image) with a single flag.

As an added bonus,putting your application in a container based on the Alpine image gives you access to a ton of really useful tools: now you can drop a shell into your container and poke around while it’s running, if you need to!

---

## Wrapping it up

We saw how Docker can help us to compile Go code in a clean, isolated environment; how to use different versions of the Go toolchain; and how to cross-compile between different operating systems and platforms.

We also saw how Go can help us to build small, lean container images for Docker, and described a number of associated subtleties linked (no pun intended) to static libraries and network dependencies.

Beyond the fact that Go is really good fit for a project that Docker, we hope that we showed you how Go and Docker can benefit from each other and work really well together!

::: note Acknowledgements

This was initially presented during the hack day at GopherCon 2016. I would like to thank all the people who proofread this material and gave ideas and suggestions to make it better; including but not limited to:

- [Aaron Lehmann (<FontIcon icon="fa-brands fa-x-twitter"/>`aaronlehmann`)](https://github.com/aaronlehmann)
- [Stephen Day (<FontIcon icon="fa-brands fa-x-twitter"/>`stevvooe`)](https://twitter.com/stevvooe)
- [AJ Bowen (<FontIcon icon="fa-brands fa-x-twitter"/>`s0ulshake`)](https://twitter.com/s0ulshake)

:::

All mistakes and typos are my own; all the good stuff is theirs! ☺

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Docker + Golang =",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/docker-golang.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
