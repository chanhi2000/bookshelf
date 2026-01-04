---
lang: en-US
title: "Improve the User Interface of Your Web Application"
description: "Article(s) > (5/5) Python Web Applications: Deploy Your Script as a Flask App"
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
      content: "Article(s) > (5/5) Python Web Applications: Deploy Your Script as a Flask App"
    - property: og:description
      content: "Improve the User Interface of Your Web Application"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/python-web-applications/improve-the-user-interface-of-your-web-application.html
next: /realpython.com/python-web-applications/README.md#conclusion
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
  url="https://realpython.com/python-web-applications#improve-the-user-interface-of-your-web-application"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/Python-driven-Web-Applications_Watermarked.c5692cb81de8.jpg"/>

In this section, you’ll learn how to add an HTML `<form>` input element to your web app to allow users to interact with it in a straightforward manner that they’re used to from other online applications.

To improve the user interface and user experience of your web app, you’ll need to work with languages other than Python, namely front-end languages such as HTML, CSS, and JavaScript. This tutorial avoids going into these as much as possible, to remain focused on using Python.

::: note

If you’d like to take a deeper dive into front-end development, then check out [**Build a JavaScript Front End for a Flask API**](/realpython.com/flask-javascript-frontend-for-rest-api.md).

:::

However, if you want to add an input box to your web app, then you’ll need to use *some* HTML. You’ll implement only the absolute minimum to get your web app looking and feeling more like a website that users will be familiar with. You’ll use the [<VPIcon icon="fa-brands fa-firefox" />HTML `<form>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) to collect their input.

::: note

If you want to learn more about HTML, then check out Real Python’s [**HTML and CSS for Python Developers**](/realpython.com/html-css-python.md) or MDN’s [<VPIcon icon="fa-brands fa-firefox" />Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics).

:::

After the update to your web app, you’ll have a text field where the user can input a temperature in degrees Celsius. There will be a *Convert* button to convert the user-supplied Celsius temperature into degrees Fahrenheit:

The converted result will be displayed on the next line and will be updated whenever the user clicks *Convert*.

You’ll also change the functionality of the app so that both the form and the conversion result are displayed on the same page. You’ll refactor the code so that you only need a single URL endpoint.

---

## Collect User Input

Start by creating a `<form>` element on your landing page. Copy the following few lines of HTML into the return statement of `index()`, replacing the text message from before:

```py
@app.route("/")
def index():
    return """
        <form action="" method="get">
            <input type="text" name="celsius">
            <input type="submit" value="Convert">
        </form>
    """
```

When you reload your page at the base URL, you’ll see an input box and a button. The HTML renders correctly. Congratulations, you just created an input form!

::: note

Keep in mind that these few lines of HTML don’t constitute a valid HTML page by themselves. However, modern browsers are designed in a way that they can fill in the blanks and create the missing structure for you.

:::

What happens when you enter a value and then click *Convert*? While the page looks just the same, you might notice that the URL changed. It now displays a **query parameter** with a **value** after the base URL.

For example, if you entered `42` into the text box and clicked the button, then your URL would look like this: `http://127.0.0.1:8080/?celsius=42`. This is good news! The value was successfully recorded and added as a query parameter to the HTTP GET request. Seeing this URL means that you’re once again requesting the base URL, but this time with some extra values that you’re sending along.

However, nothing currently happens with that extra value. While the form is set up as it should be, it’s not yet correctly connected to the code functionality of your Python web app.

In order to understand how to make that connection, you’ll read about each piece of the `<form>` element to see what the different parts are all about. You’ll look at the following three elements and their attributes separately:

1. `<form>` element
2. Input box
3. Submit button

Each of these are separate HTML elements. While this tutorial aims to keep the focus on Python rather than HTML, it’ll still be helpful to have a basic understanding of what goes on in this block of HTML code. Start by looking at the outermost HTML element.

### `<form>` Element

The `<form>` element creates an HTML form. The other two `<input>` elements are wrapped inside it:

```html
<form action="" method="get">
  <input type="text" name="celsius" />
  <input type="submit" value="Convert" />
</form>
```

The `<form>` element also contains two **HTML attributes** called `action` and `method`:

- `action` determines where the data that the user submits will be sent. You’re leaving the value as an empty string here, which makes your browser direct the request to the same URL it was called from. In your case, that’s the empty base URL.
- `method` defines what type of HTTP request the form produces. Using the default of `"get"` creates an HTTP GET request. This means that the user-submitted data will be visible in the URL query parameters. If you were submitting sensitive data or communicating with a database, then you would need to use an HTTP POST request instead.

After inspecting the `<form>` element and its attributes, your next step is to take a closer look at the first of the two `<input>` elements.

### Input Box

The second HTML element is an `<input>` element that’s nested inside the `<form>` element:

```html{2}
<form action="" method="get">
  <input type="text" name="celsius" /> 
  <input type="submit" value="Convert" />
</form>
```

The first `<input>` element has two HTML attributes:

1. `type` defines what type of `<input>` element should be created. There are many to choose from, such as checkboxes and drop-down elements. In this case, you want the user to enter a number as text, so you’re setting the type to `"text"`.
2. `name` defines what the value the user enters will be referred to as. You can think of it as the key to a [**dictionary**](/realpython.com/python-dicts.md), where the value is whatever the user inputs into the text box. You saw this name show up in the URL as the key of the query parameter. You’ll need this key later to retrieve the user-submitted value.

HTML `<input>` elements can have different shapes, and some of them require different attributes. You’ll see an example of this when looking at the second `<input>` element, which creates a *Submit* button and is the last HTML element that makes up your code snippet.

### Submit Button

The second `<input>` element creates the button that allows your users to submit their input:

```html{3}
<form action="" method="get">
  <input type="text" name="celsius" />
  <input type="submit" value="Convert" />
</form>
```

This element also has two HTML attributes, which are named `type` and `value`:

- `type` defines what sort of input element will be created. Using the value `"submit"` creates a button that allows you to send the bundled-up form data onwards.
- `value` defines what text the button should display. Feel free to change it to see how the button displays your changed text.

With this short overview of the different HTML elements and their attributes in mind, you now have a better understanding of what you’re adding to your Python code and what the elements are used for.

The information that you’ll need to connect your form submission to your Flask code is the first `<input>` element’s `name` value, `celsius`, which you’ll use to access the submitted value in your function.

Next, you’ll learn how to change your Python code to correctly process the submitted form input.

---

## Receive User Input

In the `action` attribute of your `<form>` element, you specified that the data of your HTML form should be sent back to the same URL it came from. Now you need to include the functionality to fetch the value in `index()`. For this, you need to accomplish two steps:

1. **Import Flask’s `request` object:** Like many web frameworks, Flask passes HTTP requests along as global objects. In order to be able to use this global `request` object, you first need to import it.
2. **Fetch the value:** The `request` object contains the submitted value and gives you access to it through a Python dictionary syntax. You need to fetch it from the global object to be able to use it in your function.

Rewrite your code and add these two changes now. You’ll also want to add the captured value at the end of the form string to display it after the form:

```py{2,10,14} :collapsed-lines
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/")
def index():
    celsius = request.args.get("celsius", "")
    return (
        """<form action="" method="get">
        <input type="text" name="celsius">
        <input type="submit" value="Convert">
        </form>"""
        + celsius
    )

@app.route("/<int:celsius>")
def fahrenheit_from(celsius):
    """Convert Celsius to Fahrenheit degrees."""
    fahrenheit = float(celsius) * 9 / 5 + 32
    fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
    return str(fahrenheit)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
```

The `request.args` dictionary contains any data submitted with an HTTP GET request. If your base URL gets called initially, without a form submission, then the dictionary will be empty and you’ll return an empty string as the default value instead. If the page gets called through submitting the form, then the dictionary will contain a value under the `celsius` key, and you can successfully fetch it and add it to the returned string.

Give it a spin! You’re now able to enter a number and see it displayed right underneath the form’s button. If you enter a new number, then the old one gets replaced. You’re correctly sending and receiving the data that your users are submitting.

Before you move on to integrate the submitted value with your temperature converter code, are there any [<VPIcon icon="fas fa-globe"/>potential problems](https://xkcd.com/327/) you can think of with this implementation?

::: details Exercise: Practice and Explore

What happens when you enter a string instead of a number? Give it a try.

Now enter the short HTML code `<marquee>BUY USELESS THINGS!!!</marquee>` and press *Convert*.

:::

Currently, your web app accepts any kind of input, be it a [**number**](/realpython.com/python-numbers.md), a [**string**](/realpython.com/python-strings.md), or even HTML or [**JavaScript**](/realpython.com/python-vs-javascript.md) code. This is extremely dangerous because your users might accidentally or intentionally break your web app by entering specific types of content.

Most of the time you should allow Flask to take care of these security issues automatically by using a different project setup. However, you’re in this situation now, so it’s good idea to find out how you can manually make the form you created input safe.

---

## Escape User Input

Taking input from a user and displaying that input back without first investigating what you’re about to display is a huge security hole. Even without malicious intent, your users might do unexpected things that cause your application to break.

Try to hack your unescaped input form by adding some HTML text to it. Instead of entering a number, copy the following line of HTML code, paste it into your input box, and click *Convert*:

```html
<marquee><a href="https://www.realpython.com">CLICK ME</a></marquee>
```

Flask inserts the text directly into HTML code, which causes this text input to get interpreted as HTML tags. Because of that, your browser renders the code dutifully, as it would with any other HTML. Instead of displaying back the input as text, you suddenly have to deal with a stylish educational spam link that time-traveled here right from the ’90s:

While this example is harmless and goes away with a refresh of your page, you can imagine how this might present a security problem when other types of content are added in this way. You don’t want to open up the possibility of your users editing aspects of your web app that aren’t meant to be edited.

To avoid this, you can use Flask’s built-in [<VPIcon icon="iconfont icon-flask"/>`escape()`](https://flask.palletsprojects.com/en/1.1.x/api/#flask.escape), which converts the special HTML characters `<`, `>`, and `&` into equivalent representations that can be displayed correctly.

You’ll first need to import `escape` into your Python script to use this functionality. Then, when you submit the form, you can convert any special HTML characters and make your form input ’90s hacker-proof:

```py{2,8}
from flask import Flask
from flask import request, escape 

app = Flask(__name__)

@app.route("/")
def index():
    celsius = str(escape(request.args.get("celsius", "")))
    return (
        """<form action="" method="get">
        <input type="text" name="celsius">
        <input type="submit" value="Convert">
        </form>"""
        + celsius
    )

@app.route("/<int:celsius>")
def fahrenheit_from(celsius):
    """Convert Celsius to Fahrenheit degrees."""
    fahrenheit = float(celsius) * 9 / 5 + 32
    fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
    return str(fahrenheit)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
```

Refresh your development server and try submitting some HTML code. Now it’ll be displayed back to you as the text string that you entered.

::: note

It’s necessary to convert the escaped sequence back to a Python `str`. Otherwise, Flask will also greedily convert the `<form>` element your function returns into escaped strings.

When building larger web applications, you shouldn’t have to deal with escaping your input since all HTML will be handled using [<VPIcon icon="iconfont icon-flask"/>templates](https://flask.palletsprojects.com/en/1.1.x/tutorial/templates/). If you want to learn more about that, then check out [<VPIcon icon="fas fa-globe"/>Flask by Example](https://realpython.com/learning-paths/flask-by-example/).

:::

After learning how to collect user input and also how to escape it, you’re finally ready to implement the temperature conversion functionality and show a user the Fahrenheit equivalent of the Celsius temperature they entered.

---

## Process User Input

Since this approach uses only one URL endpoint, you can’t rely on Flask to type check the user input via URL path component capturing as you did earlier on. This means you’ll want to reintroduce your `try` … `except` block from the initial `fahrenheit_from()` of [the original code](/realpython.com/python-web-applications/convert-a-script-into-a-web-application.md).

::: note

Since you’re validating the type of the user input in `fahrenheit_from()`, you don’t need to implement `flask.escape()`, and it won’t be part of your final code. You can safely remove the import of `escape` and strip the call to `request.args.get()` back to its initial state.

:::

This time, `fahrenheit_from()` won’t be associated with an `@app.route` decorator. Go ahead and delete that line of code. You’ll call `fahrenheit_from()` explicitly from `index()` instead of asking Flask to execute it when a specific URL endpoint is accessed.

After deleting the decorator from `fahrenheit_from()` and reintroducing the `try` … `except` block, you’ll next add a [**conditional statement**](//realpython.com/python-conditional-statements.md) to `index()` that checks whether the global `request` object contains a `celsius` key. If it does, then you want to call `fahrenheit_from()` to calculate the corresponding Fahrenheit degrees. If it doesn’t, then you assign an empty string to the `fahrenheit` variable instead.

Doing this allows you to add the value of `fahrenheit` to the end of your HTML string. The empty string won’t be visible on your page, but if the user submitted a value, then it’ll show up underneath the form.

After applying these final changes, you complete the code for your temperature converter Flask app:

```py{2,8-12,15,18-19,22,24,28}
from flask import Flask
from flask import request

app = Flask(__name__)

@app.route("/")
def index():
    celsius = request.args.get("celsius", "")
    if celsius: 
        fahrenheit = fahrenheit_from(celsius)
    else:
        fahrenheit = ""
    return (
        """<form action="" method="get">
                Celsius temperature: <input type="text" name="celsius">
                <input type="submit" value="Convert to Fahrenheit">
        </form>"""
        + "Fahrenheit: "
        + fahrenheit
    )

def fahrenheit_from(celsius):
    """Convert Celsius to Fahrenheit degrees."""
    try: 
        fahrenheit = float(celsius) * 9 / 5 + 32
        fahrenheit = round(fahrenheit, 3)  # Round to three decimal places
        return str(fahrenheit)
    except ValueError:
        return "invalid input"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
```

Since there have been quite a few changes, here’s a step-by-step review of the edited lines:

- **Line 2:** You’re not using `flask.escape()` anymore, so you can remove it from the import statement.
- **Lines 8, 11, and 12:** As before, you’re fetching the user-submitted value through Flask’s global `request` object. By using the dictionary method `.get()`, you assure that an empty string gets returned if the key isn’t found. That’ll be the case if the page is loaded initially and the user hasn’t submitted the form yet. This is implemented in lines 11 and 12.
- **Line 19:** By returning the form with the default empty string stuck to the end, you avoid displaying anything before the form has been submitted.
- **Lines 9 and 10:** After your users enter a value and click *Convert*, the same page gets loaded again. This time around, `request.args.get("celsius", "")` finds the `celsius` key and returns the associated value. This makes the conditional statement evaluate to `True`, and the user-provided value is passed to `fahrenheit_from()`.
- **Lines 24 to 29:** `fahrenheit_from()` checks if the user supplied a valid input. If the provided value can be converted to a `float`, then the function applies the temperature conversion code and returns the temperature in Fahrenheit. If it can’t be converted, then a [**`ValueError` exception**](/realpython.com/python-traceback.md#valueerror) is raised, and the function returns the string `"invalid input"` instead.
- **Line 19:** This time, when you concatenate the `fahrenheit` variable to the end of the HTML string, it points to the return value of `fahrenheit_from()`. This means that either the converted temperature or the error message string will be added to your HTML.
- **Lines 15 and 18:** To make the page easier to use, you also add the descriptive labels `Celsius temperature` and `Fahrenheit` to this same HTML string.

Your page will render correctly even though the way you’re adding these strings doesn’t represent valid HTML. This works thanks to the power of modern browsers.

Keep in mind that if you’re interested in diving deeper into [<VPIcon icon="fas fa-globe"/>web development](https://realpython.com/learning-paths/become-python-web-developer/), then you’ll need to [<VPIcon icon="fa-brands fa-firefox" />learn HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics). But for the sake of getting your Python script deployed online, this will do just fine.

You should now be able to use your temperature conversion script inside your browser. You can supply a Celsius temperature through the input box, click the button, and see the converted Fahrenheit result appear on the same web page. Since you’re using the default HTTP GET request, you can also see the submitted data appear in the URL.

::: note

In fact, you can even circumvent the form and provide your own value for `celsius` by supplying an appropriate address, similar to how you were able to use the conversion when you built the script without the HTML form.

For instance, try typing the URL `localhost:8080/?celsius=42` directly into your browser, and you’ll see the resulting temperature conversion appear on your page.

:::

Deploy your finished application again to Google App Engine using the `gcloud app deploy` command. Once the deployment is done, go to the provided URL or run `gcloud app browse` to see your Python web application live on the Internet. Test it out by adding different types of input. Once you’re satisfied, share your link with the world.

::: details Exercise: Practice and Explore

The URL of your temperature converter web application still looks something like `https://hello-app-295110.ew.r.appspot.com/`. This doesn’t reflect the current functionality of your app.

Revisit the [deployment instructions](/realpython.com/python-web-applications/deploy-your-python-web-application.md), create a new project on Google App Engine with a better fitting name, and deploy your app there. This will give you practice in creating projects and deploying your Flask apps to Google App Engine.

:::

At this point, you’ve successfully converted your Python script into a Python web app and deployed it to Google App Engine for online hosting. You can use the same process to convert more of your Python scripts into web apps.

::: Exercise: Practice and Explore

Create your own [<VPIcon icon="fas fa-globe"/>poem generator](http://poem-generator.appspot.com/) that allows users to create short poems using a web form. Your web application should use a single page with a single form that accepts GET requests. You can use this [example code (<VPIcon icon="iconfont icon-github"/>`realpython/book1-exercises`)](https://github.com/realpython/book1-exercises/blob/master/chp09/solutions/9-1.py) to get started, or you can write your own.

If you want to learn more about what you can do with Google App Engine, then you can read about [<VPIcon icon="iconfont icon-gcp"/>using static files](https://cloud.google.com/appengine/docs/standard/python3/serving-static-files) and add a [<VPIcon icon="fa-brands fa-wikipedia-w"/>CSS](https://en.wikipedia.org/wiki/CSS) file to your Python web application to improve its overall appearance.

:::

Hosting your code online can make it accessible to more people over the Internet. Go ahead and convert your favorite scripts into Flask applications and show them to the world.
