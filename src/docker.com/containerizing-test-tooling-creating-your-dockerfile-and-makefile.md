---
lang: en-US
title: "Containerizing Test Tooling: Creating your file and Makefile"
description: "Article(s) > Containerizing Test Tooling: Creating your file and Makefile"
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
      content: "Article(s) > Containerizing Test Tooling: Creating your file and Makefile"
    - property: og:description
      content: "Containerizing Test Tooling: Creating your file and Makefile"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/docker.com/containerizing-test-tooling-creating-your-dockerfile-and-makefile.html
prev: /devops/docker/articles/README.md
date: 2019-06-05
isOriginal: false
author:
  - name: Veronika Alex
    url : https://docker.com/author/veronika-alex/
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
  name="Containerizing Test Tooling: Creating your file and Makefile"
  desc="Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version"
  url="https://docker.com/blog/containerizing-test-tooling-creating-your-dockerfile-and-makefile"
  logo="https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png"
  preview="https://docker.com/app/uploads/2024/02/docker-default-meta-image-1110x583.png"/>

We hear a lot about the benefits of containerizing applications, but we do not often hear about the benefits of containerizing the tests of those applications or applications whose purpose is to test an entire system. Running an application’s tests inside containers allows us a greater sense of assurance that our applications are running as expected. Furthermore, packaging tests as a Docker image allows us to quickly run tests across multiple machines and ensure a consistent environment. In this post we’ll go through containerizing a test tooling application as well as containerizing the tooling’s unit and integration tests to demonstrate these benefits.

---

## The Tooling

The test tooling to be containerized is a set of tools used to stress test the Docker EE stack, which includes the Docker Engine, Universal Control Pane, and Docker Trusted Registry across a current matrix of five operating systems with different configurations. The tooling itself has several key properties:

1. Written in Python 3 in its own virtual Python environment
2. Uses 2 external client binaries
3. Has 3 dependencies on external config files to run the system tests
4. Passes its own unit and integration tests
5. Collects logs on all system tests

These properties exist whether the tooling is containerized or not, but we’ll see how containerizing this tooling makes development, code management, and collaboration easier. There is a lot of “test” lingo in this post, so to start from a common base I’ll explain what each type of testing represents for our purposes.

### System toolbox

The actual application/tooling. You can think of this as the full application we are going to containerize.

### Unit tests

These are the unit tests for our application. Any external dependencies are mocked; we are going to run our unit tests inside of a container.

### Integration tests

These are the integration tests that rely on a live system. These tests will also be run inside of a container.

---

## Creating the Dockerfile

```dockerfile title="Dockerfile"
FROM python:3.7.1
 
COPY ./client-binaries/Linux/<binary_1> /usr/local/bin/<binary_1>
COPY ./client-binaries/Linux/docker-18.09.4 /usr/bin/docker

WORKDIR /system_toolbox
COPY ./pip-requirements/requirements.txt ./proj/requirements.txt
RUN pip install -r ./proj/requirements.txt

COPY ./integration-tests ./integration-tests
COPY ./test-cases ./test-cases

COPY ./sut-configs ./sut-configs
COPY ./<binary_1>-configs ./<binary_1>-configs

COPY ./toolbox ./toolbox

COPY ./Makefile ./Makefile
COPY ./README.md ./README.md
COPY ./setup.py ./setup.py
RUN make install-dev
```

In order to run any application in a container, it needs to be based off of an image. Since the current project we are working with is written in Python 3, we will build off of the official maintained Python image by using the `FROM python:3.7.1` directive. This is our parent, sometimes referred to as the base, image. We are using the 3.7.1 version of the image which gives us a Debian Linux — also known as stretch — OS. This is because part of our tooling relies on an SSH client which the Alpine Linux version does not include, and because we would like to have the convenience of being able to install Paramiko, the Python SSH module, via Python’s package manager pip.

As mentioned previously, our project relies on two external client binaries. We include these in our Dockerfile using the `COPY <src> <dst>` directive. This command will copy the binaries to the filesystem of the image at the specified destination path. A note here about the difference between using `COPY` and its alternative command `ADD`. Using `COPY` is the Docker best-practices approach, whereas `ADD` has some additional functionality such as moving a tar archive from the source path which will be automatically unpacked as a directory inside of the Docker image. So for our purposes of copying over files or directories and not over-engineering our Dockerfile, `COPY` is the appropriate command.

All of our commands beyond adding the client binaries are going to be inside  `/system_toolbox`; therefore, we add a `WORKDIR` directive set to `/system_toolbox`. This will set the current working directory in the container to be `/system_toolbox` and it allows us to clean up some additional text in our Dockerfile. For example, we could write lines 6-16 of the Dockerfile like so:

```dockerfile title="Dockerfile"
COPY ./integration-tests /system_toolbox/integration-tests
COPY ./test-cases /system_toolbox/test-cases
 
COPY ./sut-configs /system_toolbox/sut-configs
COPY ./<binary_1>-configs /system_toolbox/<binary_1>-configs

COPY ./toolbox /system_toolbox/toolbox
```

This will work; however, it’s difficult to read and if there is a change to the parent directory structure, you will have to go in and change this path in every line. Instead we can use the `WORKDIR` directive to shorten each statement like so:

```dockerfile title="Dockerfile"
WORKDIR /system_toolbox
COPY ./pip-requirements/requirements.txt ./proj/requirements.txt
RUN pip install -r ./proj/requirements.txt

COPY ./integration-tests ./integration-tests
COPY ./test-cases ./test-cases

COPY ./sut-configs ./sut-configs
COPY ./<binary_1>-configs ./<binary_1>-configs

COPY ./toolbox ./toolbox
```

Once the working directory is set, all of the following commands will be executed from that directory unless the working directory is changed. The next two lines in the Dockerfile:

```dockerfile title="Dockerfile"
COPY ./pip-requirements/requirements.txt ./proj/requirements.txt
RUN pip install -r ./proj/requirements.txt
```

copy over the Python requirements file and install all of these requirements using the `RUN` directive. By invoking RUN in this manner, the command following `RUN` is executed in a shell, which will default to `/bin/sh -c` in a Linux container.

The following Dockerfile lines are used by our tooling to set up tests, library code, and necessary configuration files:

```dockerfile title="Dockerfile"
# integration tests to test the tool’s code accuracy
COPY ./integration-tests ./integration-tests

# system test cases that our tooling runs
COPY ./test-cases ./test-cases

# config files for our tooling
COPY ./sut-configs ./sut-configs

# config files for our tooling
COPY ./<binary_1>-configs ./<binary_1>-configs

# the tooling library
COPY ./toolbox ./toolbox
```

And finally, the last two lines of the Dockerfile:

```dockerfile title="Dockerfile"
COPY ./setup.py ./setup.py
RUN make install-dev
```

copy over the Python setup script to package our tooling and run `make install-dev`, the details of which will be explained in the `Makefile` section.

---

## Creating the Makefile

Creating a `Makefile` is often an adventure. In this section we will walk through some of the major components that allow us to run our tooling. We will also look at the unit and integration tests that test our tooling inside of containers. This portion of our `Makefile` is broken into four sections: Install targets, Docker targets, Test targets, and Utilities. The `Makefile` excerpt below is followed by an explanation of the first three sections since Utilities target does a version check.

```makefile :collapsed-lines title="Makefile"
MAJOR?=0
MINOR?=1
 
VERSION=$(MAJOR).$(MINOR)

APP_NAME = "system-toolbox"

# Our docker Hub account name
# HUB_NAMESPACE = "<hub_name<"

# location of Dockerfiles
DOCKER_FILE_DIR = "dockerfiles"
DOCKERFILE = "${DOCKER_FILE_DIR}/Dockerfile"

IMAGE_NAME = "${APP_NAME}"
CUR_DIR = $(shell echo "${PWD}")

# For python format checker. Default is 78
PEP8_MAX_LINE_LENGTH = 99

# unit testing options
NOSETEST_OPTS = --verbosity=2 --include='.*_test.py' --detailed-errors --where=toolbox
COVERAGE_OPTS = --with-coverage --cover-package=toolbox --cover-html --cover-inclusive --cover-tests --cover-erase \ 
--cover-html-dir=../test-results/unit-test-code-coverage

#################################
# Install targets
#################################
.PHONY: install-dev
install-dev:
  @echo "+ $@"
  @pip install -e .

.PHONY: pip-freeze
  @echo "+ $@"
  @pip freeze | grep -v system_toolbox < pip-requirements/requirements.txt


#################################
# Docker targets
#################################
.PHONY: clean-image
clean-image: version-check
  @echo "+ $@"
  @docker rmi ${HUB_NAMESPACE}/${IMAGE_NAME}:latest  || true
  @docker rmi ${HUB_NAMESPACE}/${IMAGE_NAME}:${VERSION}  || true

.PHONY: image
image: version-check
  @echo "+ $@"
  @docker build -t ${HUB_NAMESPACE}/${IMAGE_NAME}:${VERSION} -f ./${DOCKERFILE} .
  @docker tag ${HUB_NAMESPACE}/${IMAGE_NAME}:${VERSION} ${HUB_NAMESPACE}/${IMAGE_NAME}:latest
  @echo 'Done.'
  @docker images --format '{{.Repository}}:{{.Tag}}\t\t Built: {{.CreatedSince}}\t\tSize: {{.Size}}' | \ 
    grep ${IMAGE_NAME}:${VERSION}

.PHONY: push
push: clean-image image
  @echo "+ $@"
  @docker push ${HUB_NAMESPACE}/${IMAGE_NAME}:${VERSION}
  @docker push ${HUB_NAMESPACE}/${IMAGE_NAME}:latest

#################################
# test targets
#################################
.PHONY: test-unit
test-unit:
  @echo "+ $@"
  nosetests ${NOSETEST_OPTS}

.PHONY: check-fmt
#check-fmt: image
check-fmt:
  @echo "+ $@"
  pycodestyle --filename='*.py' --exclude='*.sh,*.md,*.txt,Makefile,*.swp' --max-line-length=${PEP8_MAX_LINE_LENGTH} *

.PHONY: test-static
test-static:
  @echo "+ $@"
  pylint -d duplicate-code test-cases
  pylint  toolbox
  pylint integration-tests

.PHONY: test-all
test-all: check-fmt test-static test-unit

.PHONY: test-container
test-container: image
  @echo "+ $@"
  @docker run --rm --name toolbox-unit-tests ${HUB_NAMESPACE}/${IMAGE_NAME}:latest make test-all
  @docker run --rm --name toolbox-int --volume ${CUR_DIR}/results:/root/logs -e REGISTRY_USERNAME=foo -e REGISTRY_PASSWORD=bar \ 
    ${HUB_NAMESPACE}/${IMAGE_NAME}:latest python ./integration-tests/testbed_validation.py

.PHONY: integration-static
integration-static: image
  @echo "+ $@"
  @docker run --rm --name toolbox-int --volume ${CUR_DIR}/results:/root/logs -e REGISTRY_USERNAME=foo -e REGISTRY_PASSWORD=bar \ 
    ${HUB_NAMESPACE}/${IMAGE_NAME}:latest python ./integration-tests/testbed_validation.py
    #@python ./integration-tests/testbed_validation.py

.PHONY: integration-testbed-survey
integration-testbed-survey:
  @echo "+ $@"
  @python ./integration-tests/testbed_validation.py --topology-filter=poc_ --sut-filter=${TESTBED_SURVEY_SUT} \ 
    --create-system ${INTEGRATION_PERSONA} ${DRY_RUN}


#################################
# Utilities
#################################

.PHONY: version-check
version-check:
  @echo "+ $@"
  if [ -z "${VERSION}" ]; then \
    echo "VERSION is not set" ; \
    false ; \
  else \
    echo "VERSION is ${VERSION}"; \
    fi
```

---

## Install Targets

The install target has two components. The first, `install-dev`, is executed from the Dockerfile. When `RUN make install-dev` is executed in the Dockerfile it runs `pip install -e .` inside of the container. This is a fun command, and it took me some digging to really grasp the details.

We will take a little aside into Python virtual environments here in order to grasp the convenience of this command. When you’re creating a Python application, it’s common to have a <FontIcon icon="fa-brands fa-python"/>`setup.py` file that provides a description of your application that can be consumed by Distutils, which is a mechanism to distribute Python packages and extensions. More specifically from the Python docs “The setup script is the centre of all activity in building, distributing, and installing modules using the Distutils. The main purpose of the setup script is to describe your module distribution to the Distutils, so that the various commands that operate on your modules do the right thing.”

But often when using Python, you want to set everything up to run in a virtual environment. It can be a bit cumbersome to have to repeat `python setup.py install` after every code change to link your working directory back to your virtual environment, so you can run `pip install -e .`  in the directory where <FontIcon icon="fa-brands fa-python"/>`setup.py` lives. This creates a sudo-symlink between the files where you are making changes and the package in the virtual environment so you have the up-to-date version of your Python application to run.

The second portion of the Install target, `pip-freeze`, is fun and slightly easier to grasp. Not necessary to run tests inside of a container, but a handy command to know when developing in Python. When your application accumulates a decent number of packages, it can sometimes be difficult to manage all of the versions on your own in <FontIcon icon="fas fa-file-lines"/>`requirements.txt`. This command is a great way to obtain all of the package versions that are compatible with your application and automatically update the <FontIcon icon="fas fa-file-lines"/>`requirements.txt` for your application.

---

## Docker Targets

The Docker targets will walk through creating and maintaining your image. The first `clean-image` will run the `version-check` as a prerequisite and then remove both the latest and chosen version. Getting an error that the image does not exists when we try to remove it should not result in our test tooling shutting down here; therefore, we use the `command  || true` syntax. This boolean function will always return true, which protects against our script from unnecessarily aborting.

For building and tagging our image we use the `image` target. This will also perform a prerequisite version check then build the image with the specified `HUB_NAMESPACE`, `IMAGE_NAME`, and `VERSION` from the Dockerfile we created earlier. Then the image is tagged and then `docker images` is run to confirm that the image was built and tagged correctly.

And finally, for pushing our image, both `clean-image` and `image` are prerequisites. Then both the most recent version as well as the latest tagged images are pushed to Docker Hub. If you are logged into Docker Hub then the push will complete automatically, otherwise you will have to enter your login credentials during this step.

---

## Test Targets

The test targets section covers the targets for unit tests, integration tests, and the system tooling for running the application locally and running it in a container.

The first target `test-unit` runs our unit tests against our system test code using the Nose testing package for Python, `check-fmt` uses the Python format-checking package Pycodestyle to check our toolbox code for style conventions, and `test-static` will run a run the Python linter, Pylint, against our system test cases, our system toolbox code, and our integration tests.

The last two targets are the ones that will run our tests in a container using the image we created earlier with our Dockerfile. The target `test-container` will run our unit tests followed by our integration tests. The command:

```sh
docker run --rm --name toolbox-unit-tests ${HUB_NAMESPACE}/${IMAGE_NAME}:latest make test-all
```

uses `docker run` with the `--rm` flag to remove the container once the process completes, the `--name` flag to provide the container with a specific name, `:latest` to select the latest version of our image `${HUB_NAMESPACE}/${IMAGE_NAME}`, and sends the command `make test-all`, which from our `Makefile` will run `check-fmt`, `test-static`, and `test-unit`.

The integration tests are run by calling:

```sh
docker run --rm --name toolbox-int --volume ${CUR_DIR}/results:/root/logs -e REGISTRY_USERNAME=foo -e REGISTRY_PASSWORD=bar \
${HUB_NAMESPACE}/${IMAGE_NAME}:latest python ./integration-tests/testbed_validation.py
```

This will run the integration tests against the system toolbox. It will also create a Docker volume to transfer any log files created from our application to our local machine to be viewed once the container is removed. Lastly, running `integration-static` will run solely the static integration tests inside of a container while `integration-testbed-survey` will run the integration tests with a live system.

---

## How to Run the Containerized Tests

After this setup we are now able to reap the rewards of our work. We’ll walk through how to run all of our tests inside containers. Let’s say we want to run some system tests against our toolbox. If someone happened to make some toolbox library changes during this time as well, maybe a version of a package changed or they added some library functionality that unknowingly conflicts with another PR in the pipeline, this could lead to the always-fun “…. well it works on my machine” response.

In order to mitigate this, we can run `make test-container` which will first run the unit tests from an image that we are confident is fully functioning since it is pushed to our Docker Hub repository. Secondly it will run our integration tests also against a reliable image. This ensures that our tests are run in the same environment across machines which generally leads to faster development and a more enjoyable coding experience. We can also access all of the log files produced by the application while it was running in a container since we have created a volume to link the `/root/logs` directory to `${CUR_DIR}/results`.

Going forward, the ability to run different tests in containers gives us a lot of flexibility. In addition to being able to run tests in consistent environments across different machines and avoid potential conflicts, it fits well into setting up an automatic Jenkins job to run these tests routinely while maintaining consistency in the source code as well as the test code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Containerizing Test Tooling: Creating your file and Makefile",
  "desc": "Learn from Docker experts to simplify and advance your app development and management with Docker. Stay up to date on Docker events and new version",
  "link": "https://chanhi2000.github.io/bookshelf/docker.com/containerizing-test-tooling-creating-your-dockerfile-and-makefile.html",
  "logo": "https://docker.com/app/uploads/2024/02/cropped-docker-logo-favicon-192x192.png",
  "background": "rgba(29,99,237,0.2)"
}
```
