---
lang: en-US
title: "Python Web Applications: Deploy Your Script as a Flask App"
description: "Article(s) > Python Web Applications: Deploy Your Script as a Flask App"
icon: iconfont icon-flask
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
      content: "Article(s) > Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:description
      content: "Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications/
prev: /programming/py-flask/articles/README.md
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
  "title": "Flask > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-flask/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Cloud > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/gcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Web Applications: Deploy Your Script as a Flask App"
  desc="In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world."
  url="https://realpython.com/python-web-applications"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Deploy Your Python Script on the Web With Flask - Real Python"
  desc="In this course, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world."
  url="https://realpython.com/courses/deploy-python-script-web-flask/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

:::

You wrote a Python script that you’re proud of, and now you want to show it off to the world. But *how*? Most people won’t know what to do with your `.py` file. Converting your script into a **Python web application** is a great solution to make your code usable for a broad audience.

In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world.

::: info By the end of this tutorial, you’ll know

- What **web applications** are and how you can **host** them online
- How to convert a Python script into a **Flask web application**
- How to improve user experience by **adding HTML** to your Python code
- How to **deploy** your Python web application to **Google App Engine**

:::

In addition to walking through an example project, you’ll find a number of **exercises** throughout the tutorial. They’ll give you a chance to solidify what you’re learning through extra practice.

```component VPCard
{
  "title": "Brush Up on the Basics",
  "desc": "(1/5) Python Web Applications: Deploy Your Script as a Flask App",
  "link": "/realpython.com/python-web-applications/brush-up-on-the-basics.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Build a Basic Python Web Application",
  "desc": "(2/5) Python Web Applications: Deploy Your Script as a Flask App",
  "link": "/realpython.com/python-web-applications/build-a-basic-python-web-application.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Deploy Your Python Web Application",
  "desc": "(3/5) Python Web Applications: Deploy Your Script as a Flask App",
  "link": "/realpython.com/python-web-applications/deploy-your-python-web-application.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Convert a Script Into a Web Application",
  "desc": "(4/5) Python Web Applications: Deploy Your Script as a Flask App",
  "link": "/realpython.com/python-web-applications/convert-a-script-into-a-web-application.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

```component VPCard
{
  "title": "Improve the User Interface of Your Web Application",
  "desc": "(5/5) Python Web Applications: Deploy Your Script as a Flask App",
  "link": "/realpython.com/python-web-applications/improve-the-user-interface-of-your-web-application.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

---

## Conclusion

You covered a lot of ground in this tutorial! You started with a local Python script and transformed it into a user-friendly, fully deployed Flask application that’s now hosted on Google App Engine.

::: info While working through this tutorial, you learned

- How **web applications** provide data over the Internet
- How to **refactor** your Python script so you can **host** it online
- How to create a basic **Flask application**
- How to manually **escape** user input
- How to **deploy** your code to **Google App Engine**

:::

You can now take your local Python scripts and make them available online for the whole world to use. If you’d like to download the complete code for the application you built in this tutorial, then you can click the link below:

If you want to learn more about web development with Python, then you’re now well equipped to experiment with Python web frameworks such as [<FontIcon icon="fas fa-globe"/>Flask](https://realpython.com/learning-paths/flask-by-example/) and [<FontIcon icon="fas fa-globe"/>Django](https://realpython.com/learning-paths/django-web-development/). Keep up the good work!

::: info Watch Now

This tutorial has a related video course created by the Real Python team. Watch it together with the written tutorial to deepen your understanding:

<SiteInfo
  name="Deploy Your Python Script on the Web With Flask - Real Python"
  desc="In this course, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world."
  url="https://realpython.com/courses/deploy-python-script-web-flask/"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Python Web Applications: Deploy Your Script as a Flask App",
  "desc": "In this tutorial, you’ll learn how to go from a local Python script to a fully deployed Flask web application that you can share with the world.",
  "link": "https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications.html",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```
