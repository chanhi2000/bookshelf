---
lang: en-US
title: "Deploy Your Python Web Application"
description: "Article(s) > (3/5) Python Web Applications: Deploy Your Script as a Flask App"
category:
  - Python
  - Flask
  - DevOps
  - Google
  - Google Cloud
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
  - devops
  - google
  - google-cloud
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (3/5) Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:description
      content: "Deploy Your Python Web Application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications/deploy-your-python-web-application.html
date: 2021-02-01
isOriginal: false
author:
  - name: Martin Breuss
    url : https://realpython.com/team/mbreuss/
cover: https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Web Applications: Deploy Your Script as a Flask App",
  "desc": "In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world.",
  "link": "/realpython.com/python-web-applications/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Web Applications: Deploy Your Script as a Flask App"
  desc="In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world."
  url="https://realpython.com/python-web-applications#deploy-your-python-web-application"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

It’s finally time to bring your app online. But first, your code needs a place to live on Google’s servers, and you need to make sure that it gets there safely. In this section of the tutorial, you’ll work on completing the necessary deployment setups both in the cloud and locally.

---

## Set Up on Google App Engine

Read through the setup process below step by step. You can compare what you see in your browser with the screenshots. The project name used in the example screenshots is `hello-app`.

Start by signing in to the [<FontIcon icon="iconfont icon-gcp"/>Google Cloud Platform](https://console.cloud.google.com/). Navigate to the [<FontIcon icon="iconfont icon-gcp"/>dashboard view](https://console.cloud.google.com/home/dashboard), where you’ll see a toolbar at the top of the window. Select the downward-facing arrow button toward the left side of the toolbar. This will pop up a modal containing a list of your Google projects:

![Dropdown for viewing all of your Google projects](https://files.realpython.com/media/gae-all-projects.96d8de4948a3.png)

The modal displays a list of your projects. The list may be empty if you haven’t created any projects yet. On the top right of that modal, find the *NEW PROJECT* button and click it:

![Button to create a new project on Google App Engine](https://files.realpython.com/media/gae-new-project.cd55698e84c3.png)

Clicking *NEW PROJECT* will redirect you to a new page where you can decide on a name for your project. This name will appear in the URL of your application, which will look similar to `http://your-application-name.nw.r.appspot.com`. Use `hello-app` as the name for this project to stay consistent with the tutorial:

![Input field for assigning a project name to a GAE project](https://files.realpython.com/media/gae-name-project.a9bcfb8d956a.png)

You can see your project ID below the *Project name* input field. The project ID consists of the name you entered and a number that Google App Engine adds. In the case of this tutorial, you can see that the project ID is `hello-app-295110`. Copy your personal project ID since you’ll need it later on for deploying.

::: note

As the project ID needs to be unique, your number will be different than the one shown in this tutorial.

:::

You can now click *CREATE* and wait for the project to be set up on Google App Engine’s side. Once that’s done, a notification will pop up telling you that a new project has been created. It also gives you the option to select it. Go ahead and do that by clicking *SELECT PROJECT*:

![Screenshot showing the option to Select Project](https://files.realpython.com/media/gae-select-project.b302432f452b.png)

Clicking *SELECT PROJECT* will redirect you to the main page of your new Google Cloud Platform project. It looks like this:

![Google Cloud Platform dashboard view](https://files.realpython.com/media/gae-cloud-dashboard.3233e5d08f26.png)

From here, you want to switch to the dashboard of Google App Engine. You can do that by clicking the hamburger menu on the top left, scrolling down to select *App Engine* in the first list, then selecting *Dashboard* on the top of the next pop-up list:

![Visual instructions on how to get from the Cloud Platform dashboard to the App Engine dashboard](https://files.realpython.com/media/gae-appengin-dashboard.4c9dee7fc4cb.png)

This will finally redirect you to the Google App Engine dashboard view of your new project. Since the project is empty so far, the page will look similar to this:

![New project page on GAE after successfully creating a new project](https://files.realpython.com/media/gae-04-new-project-page.281c177aae52.png)

When you see this page, it means you have completed setting up a new project on Google App Engine. You’re now ready to head back to the terminal on your computer and complete the local steps necessary to deploy your app to this project.

---

## Set Up Locally for Deployment

After successfully [<FontIcon icon="iconfont icon-gcp"/>installing the Google Cloud SDK](https://cloud.google.com/sdk/docs/install), you have access to the `gcloud` command-line interface. This program comes with helpful instructions that guide you through deploying your web app. Start by typing the command that was suggested to you when you created a new project on the Google App Engine website:

![New project page with gcloud CLI command suggested highlighted](https://files.realpython.com/media/gae-05-command.ed682136cd05.png)

As you can see in the bottom-right corner of the page, Google App Engine suggests a terminal command to deploy your code to this project. Open up your terminal, navigate to your project folder, then run the suggested command:

```sh
gcloud app deploy
```

When you execute this command without any previous setup, the program will respond with an error message:

```plaintext
ERROR: (gcloud.app.deploy)
You do not currently have an active account selected.
Please run:

  $ gcloud auth login

to obtain new credentials.

If you have already logged in with a different account:

    $ gcloud config set account ACCOUNT

to select an already authenticated account to use.
```

You receive this error message because you can’t deploy any code to your Google App Engine account unless you prove to Google that you’re the owner of that account. You’ll need to authenticate with your Google App Engine account from your local computer.

The `gcloud` command-line app already provided you with the command that you need to run. Type it into your terminal:

```sh
gcloud auth login
```

This will start the authentication process by generating a validation URL and opening it up in your browser. Complete the process by selecting your Google account in the browser window and granting Google Cloud SDK the necessary privileges. After you do this, you can return to your terminal, where you’ll see some information about the authentication process:

```plaintext
Your browser has been opened to visit:

    https://accounts.google.com/o/oauth2/auth?client_id=<yourid>

You are now logged in as [<your@email.com>].
Your current project is [None].  You can change this setting by running:
  $ gcloud config set project PROJECT_ID
```

If you see this message, then the authentication was successful. You can also see that the command-line program again offers you helpful information about your next step.

It tells you that there is currently no project set, and that you can set one by running `gcloud config set project PROJECT_ID`. Now you’ll need the project ID that you noted earlier.

::: note

You can always get your project ID by heading to the Google App Engine website and clicking the downward-facing arrow that brings up the modal showing all your Google projects. The project ID is listed to the right of your project’s name and usually consists of the project name and a six-digit number.

:::

Be sure to replace `hello-app-295110` with your own project ID when running the suggested command:

```sh
gcloud config set project hello-app-295110
```

Your terminal will print out a short feedback message that the project property has been updated. After successfully authenticating and setting the default project to your project ID, you have completed the necessary setup steps.

---

## Run the Deployment Process

Now you’re ready to try the initial deployment command a second time:

```sh
gcloud app deploy
```

The `gcloud` app fetches your authentication credentials as well as the project ID information from the default configuration that you just set up and allows you to proceed. Next, you need to select a region where your application should be hosted:

```plaintext :collapsed-lines
You are creating an app for project [hello-app-295110].
WARNING: Creating an App Engine application for a project is
irreversible and the region cannot be changed.
More information about regions is at
<https://cloud.google.com/appengine/docs/locations>.

Please choose the region where you want your App Engine application
located:

 [1] asia-east2
 [2] asia-northeast1
 [3] asia-northeast2
 [4] asia-northeast3
 [5] asia-south1
 [6] asia-southeast2
 [7] australia-southeast1
 [8] europe-west
 [9] europe-west2
 [10] europe-west3
 [11] europe-west6
 [12] northamerica-northeast1
 [13] southamerica-east1
 [14] us-central
 [15] us-east1
 [16] us-east4
 [17] us-west2
 [18] us-west3
 [19] us-west4
 [20] cancel
Please enter your numeric choice:
```

Enter one of the numbers that are listed on the left side and press <kbd>Enter</kbd>.

::: note

It doesn’t matter which region you choose for this app. However, if you’re building a large application that gets a significant amount of traffic, then you’ll want to deploy it to a server that’s physically close to where most of your users are.

:::

After you enter a number, the CLI will continue with the setup process. Before deploying your code to Google App Engine, it’ll show you an overview of what the deployment will look like and ask you for a final confirmation:

```plaintext
Creating App Engine application in project [hello-app-295110]
and region [europe-west]....done.
Services to deploy:

descriptor:      [/Users/realpython/Documents/helloapp/app.yaml]
source:          [/Users/realpython/Documents/helloapp]
target project:  [hello-app-295110]
target service:  [default]
target version:  [20201109t112408]
target url:      [https://hello-app-295110.ew.r.appspot.com]


Do you want to continue (Y/n)?
```

After you confirm the setup by typing <kbd>Y</kbd>, your deployment will finally be on its way. Your terminal will show you some more information and a small loading animation while Google App Engine sets up your project on its servers:

```plaintext
`Beginning deployment of service [default]...
Created .gcloudignore file. See `gcloud topic gcloudignore` for details.
╔════════════════════════════════════════════════════════════╗
╠═ Uploading 3 files to Google Cloud Storage                ═╣
╚════════════════════════════════════════════════════════════╝
File upload done.
Updating service [default]...⠼`
```

Since this is the first deployment of your web app, it may take a few minutes to complete. Once the deployment is finished, you’ll see another helpful output in the console. It’ll look similar to the one below:

```plaintext
Deployed service [default] to [https://hello-app-295110.ew.r.appspot.com]

You can stream logs from the command line by running:
  $ gcloud app logs tail -s default

To view your application in the web browser run:
  $ gcloud app browse
```

You can now navigate to the mentioned URL in your browser, or type the suggested command `gcloud app browse` to access your live web app. You should see the same short text response that you saw earlier when running the app on your localhost: `Congratulations, it's a web app!`

Notice that this website has a URL that you can share with other people, and they’ll be able to access it. You now have a live Python web application!

::: details Exercise: Practice and Explore

Change the return value of `index()` again and deploy your app a second time using the `gcloud app deploy` command. Confirm that you can see the change reflected on the live website in your browser.

:::

With this, you’ve completed the necessary steps to get your local Python code up on the web. However, the only functionality that you’ve put online so far is printing out a string of text.

Time to step it up! Following the same process, you’ll bring more interesting functionality online in the next section. You’ll refactor the code of a local temperature converter script into a Flask web app.
