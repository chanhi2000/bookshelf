---
lang: en-US
title: "How to Build and Deploy a Fitness Tracker Using Python Django and PythonAnywhere - A Beginner Friendly Guide"
description: "Article(s) > How to Build and Deploy a Fitness Tracker Using Python Django and PythonAnywhere - A Beginner Friendly Guide"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build and Deploy a Fitness Tracker Using Python Django and PythonAnywhere - A Beginner Friendly Guide"
    - property: og:description
      content: "How to Build and Deploy a Fitness Tracker Using Python Django and PythonAnywhere - A Beginner Friendly Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-a-fitness-tracker-using-python-django-and-pythonanywhere/
prev: /programming/py-django/articles/README.md
date: 2026-04-04
isOriginal: false
author:
  - name: Prabodh Tuladhar
    url: https://freecodecamp.org/news/author/prabodhtuladhar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a1ae273b-9f92-4fc2-89aa-1452fc0df895.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Django > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-django/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build and Deploy a Fitness Tracker Using Python Django and PythonAnywhere - A Beginner Friendly Guide"
  desc="If you've learned some Python basics but still feel stuck when it comes to building something real, you're not alone. Many beginners go through tutorials, learn about variables, functions, and loops, "
  url="https://freecodecamp.org/news/build-and-deploy-a-fitness-tracker-using-python-django-and-pythonanywhere"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/a1ae273b-9f92-4fc2-89aa-1452fc0df895.png"/>

If you've learned some Python basics but still feel stuck when it comes to building something real, you're not alone. Many beginners go through tutorials, learn about variables, functions, and loops, and then hit a wall when they try to create an actual project.

The gap between "I know Python syntax" and "I can build a working web app" can feel enormous. But it does not have to be.

In this tutorial, you'll build a fitness tracker web application from scratch using Django, one of the most popular Python web frameworks. By the end, you'll have a fully functional app running live on the internet – something you can show to friends, add to your portfolio, or keep building on.

Here's what you'll learn:

- How Django projects and apps are structured
- How to define database models to store workout data
- How to create views that handle user requests
- How to build HTML templates that display your data
- How to connect URLs to views so users can navigate your app
- How to deploy your finished app to PythonAnywhere so anyone can access it

The app itself is straightforward: you can log a workout by entering an activity name, duration, and date. You can then view all your logged workouts on a separate page. It's simple, but it covers the core Django concepts you need to build much bigger things later.

Let's get started.

::: note Prerequisites

Before you begin, make sure you are comfortable with the following:

**Python fundamentals:** You should understand variables, functions, lists, dictionaries, and basic control flow (if/else statements and loops).

**Basic command line usage:** You'll be running commands in your terminal throughout this tutorial. You should know how to open a terminal, navigate between folders, and run commands. If you're on Windows, you can use Command Prompt or PowerShell. On macOS or Linux, the default Terminal app works well.

**Tools you'll need installed:**

- **Python 3.8 or higher.** You can check your version by running `python --version` or `python3 --version` in your terminal.  If you don't have Python installed, download it from [<VPIcon icon="fa-brands fa-python"/>`python.org`](https://python.org)
- **pip.** This is Python's package manager. It usually comes bundled with Python. You can verify by running `pip --version` or pip3 --version. Note the commands `python3` and `pip3` tell the terminal that you are explicitly using **Python Version 3**
- **A code editor.** Visual Studio Code is a great free option, but you can use any editor you're comfortable with.

:::

That's everything. You don't need prior Django experience or web development knowledge. This tutorial will walk you through each step.

---

## What You Are Going Build

The fitness tracker you will build has two main features:

1. **A form to log workouts.** You will enter the name of an activity (like "Running" or "Push-ups"), how long you did it (in minutes), and the date. When you submit the form, Django saves that workout to a database.

![The image shows a form to log workouts](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/fe6b2a89-fc29-4710-a640-ce2757267e38.png)

1. **A page to view all your workouts.** This page displays every workout you have logged, showing the activity, duration, and date in a clean list.

![The image shows a list of logged workouts](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/8f6bd09e-497a-4480-83e5-af162028a0a3.png)

Here's how data flows through the app at a high level:

1. You fill out the workout form in your browser and click submit.
2. Your browser sends that data to Django.
3. Django's view function receives the data, validates it, and saves it to the database.
4. When you visit the workouts page, Django's view function pulls all saved workouts from the database.
5. Django passes that data to an HTML template, which renders it as a page your browser can display.

This request-response cycle is the foundation of how Django works. Once you understand it, you can build almost anything.

---

## Table of Contents

- [Step 1: How to Set Up Your Django Project](#heading-step-1-how-to-set-up-your-django-project)
- [Step 2: How to Create a Django App](#heading-step-2-how-to-create-a-django-app)
- [Step 3: How to create a Workout Model](#heading-step-3-how-to-create-a-workout-model)
- [Step 4: How to Apply Migrations](#heading-step-4-how-to-apply-migrations)
- [Step 5: How to Register the Model in the Admin Panel](#heading-step-5-how-to-register-the-model-in-the-admin-panel)
- [Step 6: How to Create Views for the App](#heading-step-6-how-to-create-views-for-the-app)
- [Step 7: How to Create Templates](#heading-step-7-how-to-create-templates)
- [Step 8: How to Connect URLs](#heading-step-8-how-to-connect-urls)
- [Step 9: How to Test the Application Locally](#heading-step-9-how-to-test-the-application-locally)
- [Step 10: How to Prepare for Deployment](#heading-step-10-how-to-prepare-for-deployment)
- [Step 11: How to Deploy Your Django App on PythonAnywhere](#heading-step-11-how-to-deploy-your-django-app-on-pythonanywhere)

---

## Step 1: How to Set Up Your Django Project

Every Django project starts with a few setup steps. You'll create an isolated Python environment, install Django, and generate the initial project structure.

### 1. 1 How to Create a Virtual Environment

A virtual environment is a self-contained folder that contains its own Python interpreter and installed packages for a specific project. This keeps your project's dependencies separate from other Python projects on your computer. This separation prevents version conflicts and keeps setups consistent.

For example, one project might require an older version of Django, while another needs the latest version, and a virtual environment allows both to work smoothly on the same system.

Without it, global installations can clash, break projects, and make setups hard to reproduce. Over time, the system environment becomes cluttered with unused or incompatible packages making debugging and maintenance more difficult.

Now let's set it up.

Open your terminal, and navigate to where you want your project to live and run the following command

```sh
mkdir fitness-tracker
cd fitness-tracker
```

![An image of the terminal showing the commands mkdir (make directory) and cd (change directory) being typed ](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/b4715e51-c2e3-4e97-ad7b-b41066aeefd9.png)

The first command creates a new folder called `fitness-tracker`. The second command moves you into that folder.

You'll create the Python virutal environment here.

```sh
python3 -m venv venv
```

![The image shows the command to create the python virtual enviroment.](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/3d1723ae-d069-48fd-9954-440a191f585f.png)

The above command creates a virtual environment inside a folder called `venv`. The first `venv` is the command and the second `venv` represents the name of the folder. You can name the folder anything though `venv` is usually preferred.

By using the `ls` command, you can see that we've created the virtual environment folder.

To activate the virtual environment, we need to use the following command:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

@tab <VPIcon icon="fa-brands fa-windows"/>

```sh
venv\Scripts\activate
```

:::

You'll know it worked when you see `(venv)` at the beginning of your terminal prompt. From this point on, any Python packages you install will only exist inside this **virtual environment**.

![The image shows the virtual environment being activated](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/dabe362d-2f50-4745-a0bc-e57ad3536723.png)

### 1.2 How to Install Django

With your virtual environment activated, install Django using pip:

```sh
pip install django
```

This downloads and installs the latest stable version of Django. You can verify the installation by running:

```sh
python3 -m django --version
```

After running both these commands, you should see Django being installed and the version number:

![The image shows django being installed and the version of django that has been installed](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/bda2ed0d-44bf-439b-a9fd-1cf3fcaf35ca.png)

### 1.3 How to Create the Project

We have finished installing Django. Now let's create a Django project. Django provides a command line utility that generates the boilerplate files that you need. Type the following command:

```sh
django-admin startproject fitness_project .
```

The command creates a folder named `fitness-project`. Notice the dot at the end of the command. The dot at the end is important. It tells Django to create the project files in your current directory instead of creating an extra nested folder.

Now that we've created our Django project, let's open the project in your favourite text editor and look at folder structure.

You'll notice that the folder already comes with a bunch of files.

![The image show the list of files created by the django-admin startproject command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/eaffe95e-7078-4c2e-91f4-88a6c3696e88.png)

### 1.4 How to Run the Development Server

Now let's make sure everything is working. You'll need to run a server for this. Type the following command:

```sh
python manage.py runserver
```

You can type this command in the terminal with the virtual environment activated or you can use the integrated terminal if you're using VS Code. I'll be using the integrated terminal from this point on.

![This is an image of the server running after typing the runserver command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/53dbba38-9863-4972-a899-1e6ff66fb3f5.png)

Open your browser and go to `127.0.0.1:8000`. You should see Django's default welcome page with a rocket ship graphic confirming that your project is set up correctly.

![This is an image of Django's default homepage](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/25d2e3ce-ce72-44f6-9f5f-78aeaeb88b3e.png)

Press <kbd>Ctrl</kbd>+<kbd>C</kbd> in your terminal to stop the server when you're ready to move on.

---

## Step 2: How to Create a Django App

In Django, a project is the overall container for your entire web application, while an app is a smaller, self-contained module inside that project that focuses on a specific piece of functionality.

A useful way to picture this is to think of a house. The project is the whole house. Each app is like a room inside that house. One room might be a kitchen, another a bedroom, each designed with a clear purpose. In the same way, a Django app is built to handle one responsibility, such as authentication, payments, or in this case, workout tracking.

Now, here's the important part: why not just put everything into one big project instead of using apps? You technically could, especially for very small projects. But as your application grows, that approach quickly becomes difficult to manage.

By using apps, you naturally separate concerns. It also makes collaboration smoother, since different people can work on different apps without constantly stepping on each other’s code.

Another major benefit is reusability. Since apps are modular, you can take an app from one project and reuse it in another.

For example, if you build a workout tracking app once, you could plug it into a completely different Django project later without rebuilding it from scratch. Later, you might create a completely different project, say a fitness coaching platform or a health dashboard. Instead of rebuilding the tracking feature from scratch, you can reuse the same app.

For this project, you'll create a single app called `tracker` that handles everything related to logging and displaying workouts.

### 2.1 How to Generate the App

Make sure you're in the same directory as the <VPIcon icon="fa-brands fa-python"/>`manage.py` file, then run the following code:

```sh
python manage.py startapp tracker
```

This create a new folder called tracker with the following following structure:

![The image shows the folder structure created by after running the startapp command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/cb07105a-6e65-49f9-9c7a-d5a64db42b49.png)

Each file has its own purpose. You'll work with <VPIcon icon="fa-brands fa-python"/>`models.py`, <VPIcon icon="fa-brands fa-python"/>`views.py` and <VPIcon icon="fa-brands fa-python"/>`admin.py` throughout this project.

### 2.2 How to Register the App

Django doesn't automatically know about your new app. You need to tell it by adding the app to the `INSTALLED_APPS` list in <VPIcon icon="fa-brands fa-python"/>`settings.py` file.

Open <VPIcon icon="fas fa-folder-open"/>`fitness_project/`<VPIcon icon="fa-brands fa-python"/>`settings.py` and find the `INSTALLED_APPS` list. Add the name of the app, that is `tracker`, to the end of the list:

![](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/eec90a01-5219-449e-97f8-97465e4ac23f.png)

You'll notice that a number of apps have already been installed automatically by Django. This is part of Django’s “batteries-included” philosophy, where many common features are ready to use out of the box.

Here is a short summary of what each of the apps does.

| **App Name** | **Purpose** |
| --- | --- |
| `django.contrib.admin` | Powers the built-in admin dashboard, letting you manage your data through a web interface. |
| `django.contrib.auth` | Handles users, login systems, permissions, and password management. |
| `django.contrib.contenttypes` | Helps Django track and manage relationships between different models. |
| `django.contrib.sessions` | Stores user session data, so users stay logged in across requests. |
| `django.contrib.messages` | Lets you show temporary notifications like success or error messages. |
| `django.contrib.staticfiles` | Manages static assets such as CSS, JavaScript, and images |

Now Django knows your `tracker` app exists and will include it when running the project.

---

## Step 3: How to Create a Workout Model

A model in Django is a Python class that defines the structure of your data. Each model maps directly to a table in your database. Each attribute on the model becomes a column in that table.

Think of a model as a blueprint for a spreadsheet. The class name is the name of the spreadsheet, and each field is a column header. Every time you save a new workout, Django creates a new row in that spreadsheet.

### 3.1 How to Define the Model

Open <VPIcon icon="fas fa-folder-open"/>`tracker/`<VPIcon icon="fa-brands fa-python"/>`models.py` and replace its contents with this code:

```py title="tracker/models.py"
from django.db import models

class Workout(models.Model):
    activity = models.CharField(max_length=200)
    duration = models.IntegerField(help_text="Duration in minutes")
    date = models.DateField()

    def __str__(self):
        return f"{self.activity} - {self.duration} min on {self.date}"
```

::: info Let's discuss what each part does

- `activity = models.CharField(max_length=200)` creates a text fields that can hold up to 200 characters. This is where you'll store the name of the exercise like "Running" or "Cycling".
- `duration = models.IntegerField(help_text="Duration in minutes")` creates a whole number field for storing how many minutes the workout lasted. The `help_text` parameter adds a hint that will appear in forms and the admin panel.
- `date = models.DateField()` creates a date field for recording when the workout happened.

:::

The `__str__()` method defines how a Workout object appears when printed or displayed in the admin panel. Instead of seeing something unhelpful like "**Workout object (1)**," you will see "**Running - 30 min on 2025-03-15.**"

---

## Step 4: How to Apply Migrations

You've defined your model, but Django hasn't created the actual database table yet. To do that, you need to run migrations.

Migrations are Django's way of translating your Python model definitions into database instructions. Migrations are done in two steps.

When you change a model – maybe by adding a field, removing a field, or renaming one – you create a new migration that describes that change. You can do this using the `makemigrations` command.

Then you apply the migration using the `migrate` command and Django updates the database to match.

This two-step process of first detecting the change and then applying the change gives you a reliable record of every change to your database structure over time.

### 4.1 How to Generate the Migration

Run the following command in the integrated terminal:

```sh
python manage.py makemigrations
```

You should see output like this:

```sh
Migrations for 'tracker': tracker/migrations/0001_initial.py 
    + Create model Workout
```

Django inspected your Workout model and created a migration file that describes how to build the corresponding database table. You can find this file at <VPIcon icon="fas fa-folder-open"/>`tracker/migrations/`<VPIcon icon="fa-brands fa-python"/>`0001_initial.py` if you want to look at it, but you don't need to edit it.

![The image shows the file creating after makemigrations command runs](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/fa46eed5-6ef3-408a-8c23-f39518b117f4.png)

### 4.2 How to Apply the Migration

Now tell Django to execute that migration and actually create the table in the database:

```sh
python manage.py migrate
```

You'll see several lines of output as Django applies not just your migration, but also the default migrations for Django's built-in apps (authentication, sessions, and so on).

![The image shows the output after applying migrations](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/fcaae5fe-0cc7-4c1f-b4c3-a3b173fd2551.png)

When it finishes, your database has a table ready to store workouts.

When the migrate command runs, we can see the exact SQL commands that Django used to build and change the database. Though this isn't required for creating the application, it's always good to know what's happening under hood.

Run this command:

```sh
python manage.py sqlmigrate tracker 001
```

And you should get this output:

![The image shows the command to view sql queries created by django](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/016b0a33-06d0-47e8-97de-580e79a7d0e3.png)

The `001` you added at the end is the migration number and represents first version of the database schema.

In practice, your workflow usually looks like this: you change your models, run `makemigrations` to generate the migration files, and then run the `migrate` command to apply those changes to the database.

---

## Step 5: How to Register the Model in the Admin Panel

Django comes with a powerful admin interface built in. It gives you a graphical way to view, add, edit, and delete records in your database without writing any extra code. This is incredibly useful during development because you can quickly test your models and see your data.

But by default, it doesn’t know:

- Which models you want to manage
- How you want them displayed

So you *register* models in <VPIcon icon="fa-brands fa-python"/>`admin.py` to tell Django to include the specific model in the admin interface.

### 5.1 How to Add Model to Admin

Open <VPIcon icon="fas fa-folder-open"/>`tracker/`<VPIcon icon="fa-brands fa-python"/>`admin.py` and add the following code:

```py title="tracker/admin.py"
from django.contrib import admin
from .models import Workout

admin.site.register(Workout)
```

![ad017508-993a-4c28-ade1-8e73fa0c6a4a](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/ad017508-993a-4c28-ade1-8e73fa0c6a4a.png)

This single line tells Django to include the `Workout` model in the admin interface.

### 5.2 How to Create a Superuser

To access the admin panel, you need an admin account. Create one by running:

```sh
python manage.py createsuperuser
```

Django will prompt you for a username, email address, and password. Choose something you will remember. The email is optional – you can press Enter to skip it.

![The image shows the superuser being created by adding username, email and password](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/4bbc7a15-682e-497d-a4a4-3e2dc4b848ac.png)

### 5.3 How to Access the Admin Panel

Start the development server:

```sh
python manage.py runserver
```

Then navigate to `127.0.0.1:8000/admin/` in your browser. Log in with the credentials you just created.

You should see the Django administration dashboard with a "**Tracker**" section containing your "**Workouts**" model.

![The image shows the Django admin panel and the Worker model of the Tracker app being added to the admin panel](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/a1e576bf-45f6-40dc-b6b9-69899b2df9d5.png)

Try clicking "Add" to create a couple of test workouts. This will confirm that your model is working correctly before you build the rest of the app.

![The image show some workouts (running and cycling) being added to the admin panel](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/944ea6a4-bc6f-4321-87c0-5c7bcb267e26.png)

---

## Step 6: How to Create Views for the App

A view in Django is a Python function (or class) that receives a web request and returns a web response. That response could be an HTML page, a redirect, a 404 error, or anything else a browser can handle.

Views are where your application logic lives. They decide what data to fetch, what processing to do, and what to show the user.

For this app, you need two views: one to display the form where users add a workout, and one to display the list of all saved workouts.

### 6.1 How to Create a Form Class

Before writing the views, you need a Django form that handles the workout input.

Django forms are a built-in way to handle user input like login forms, contact forms, or anything that collects data from a user. Instead of manually writing HTML, validating inputs, and handling errors, Django gives you a structured way to do all of that in one place.

Most user inputs are based on the models you’ve created, and Django can automatically generate forms from those models using `ModelForms`, which speeds things up significantly.

Let's create a new file called <VPIcon icon="fa-brands fa-python"/>`forms.py` in the <VPIcon icon="fas fa-folder-open"/>`tracker` folder and add the following code:

```py title="tracker/forms.py"
from django import forms
from .models import Workout

class WorkoutForm(forms.ModelForm):

    class Meta:
        model = Workout
        fields = ['activity', 'duration', 'date']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
        }
```

![The image shows the file location of forms.py as well the code for forms.py file](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e8bce19c-7184-45b3-9afe-3a5f73cff43b.png)

In the above code, the `ModelForm` automatically generates form fields based on the `Workout` model. The `widgets` dictionary tells Django to render the date field as an HTML date picker instead of a plain text input.

We can actually see the forms being automatically created by Django. For this we need to enter the shell. In the terminal, type the following command:

```sh
python manage.py shell
```

![The image shows the python shell being activated](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/951829fb-98e8-48f5-8187-80cc98346e06.png)

Now lets import the `WorkoutForm` class that we just created.

Type the following code:

```py
from tracker.forms import WorkoutForm
```

Notice that we've given the **name of the app** as well when we imported the form.

Then create an object of the `WorkoutForm` class and print it.

```py
from tracker.forms import WorkoutForm
workoutform = WorkoutForm()
print(workoutform) 
```

![The image shows the command to open the python shell where you can execute python statement throught the terminal](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/b81265a2-7c21-453b-ae57-3cfec97fbaf9.png)

You should get the following output:

![This image shows the html generated from ModelForm](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/094b0d89-b003-49b6-939d-07eacfb0c745.png)

You can see that all the model fields have been renderd as HTML forms and the date field has been created as a date type that is `type="date"` instead of plain text.

### 6.2 How to Write Views

As we've discussed above, our project has two views: one to add a workout and the other to display all the saved workouts.

First, let's create a view to add a workout. In the <VPIcon icon="fas fa-folder-open"/>`tracker/`<VPIcon icon="fa-brands fa-python"/>`views.py` file, type the following code:

```py title="tracker/views.py"
from django.shortcuts import render, redirect
from .models import Workout

# view to list all workouts
def workout_list(request):
    workouts = Workout.objects.all().order_by('-date')
    return render(request, 'tracker/workout_list.html', {'workouts': workouts})
```

::: info Let's walk through this view:

- The `workout_list` view handles the page that displays all workouts.
- It queries the database for every `Workout` object, orders them by date (most recent first, thanks to the `-` prefix), and passes that list to a template called `workout_list.html`.
- The `render` function combines the template with the data and returns the finished HTML page.

:::

To create the logic to add a workout, first add the `Workout` form import at the end of the import section. Then add the following code after the `workout_list` view:

```py title="tracker/views.py"
from django.shortcuts import render, redirect
from .models import Workout
from .forms import WorkoutForm

# view to list all the workouts
def workout_list(request):
    workouts = Workout.objects.all().order_by('-date')
    return render(request, 'tracker/workout_list.html', {'workouts': workouts})

# view to add a workout
def add_workout(request):
    if request.method == 'POST':
        form = WorkoutForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('workout_list')
    else:
        form = WorkoutForm()
    return render(request, 'tracker/add_workout.html', {'form': form})
```

::: info

- The `add_workout` view handles both displaying the empty form and processing submitted form data.
- When a user first visits the page, the request method is GET, so Django creates a blank form and renders it.
- When the user fills out the form and clicks submit, the request method is POST. Django then validates the submitted data, saves it to the database if everything is correct, and redirects the user to the workout list page.
- If the data isn't valid, Django re-renders the form with error messages.

:::

Here is the complete views code:

```py title="tracker/views.py"
from django.shortcuts import render, redirect
from .models import Workout
from .forms import WorkoutForm

# view to list all workouts
def workout_list(request):
    workouts = Workout.objects.all().order_by('-date')
    return render(request, 'tracker/workout_list.html', {'workouts': workouts})

# view to add a workout
def add_workout(request):
    if request.method == 'POST':
        form = WorkoutForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('workout_list')
    else:
        form = WorkoutForm()
    return render(request, 'tracker/add_workout.html', {'form': form})

```

![The image shows the complete code for views.py with explanation about the add workout view](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/8a0878c1-f029-49a4-8a7f-308cdb843b62.png)

---

## Step 7: How to Create Templates

Templates are HTML files that Django fills in with dynamic data. They're the front end of your application: the part users actually see in their browser.

### 7.1 How to Set Up the Template Directory

Django looks for templates inside a <VPIcon icon="fas fa-folder-open"/>`templates` folder within each app. Create the following folder structure inside your <VPIcon icon="fas fa-folder-open"/>`tracker` app.

<VPIcon icon="fas fa-folder-open"/>`tracker/templates/tracker`

The double <VPIcon icon="fas fa-folder-open"/>`tracker` folder name might look redundant, but it's a Django convention called **template namespacing**. It prevents naming conflicts if you have multiple apps with templates that share the same filename.

![The image shows folder structure of the templates folder](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/cfbe85c3-36dc-413e-918a-aa64d706d2fc.png)

### 7.2 How to Create the Workout List Template

Create a file called <VPIcon icon="fas fa-folder-open"/>`tracker/templates/tracker/`<VPIcon icon="fa-brands fa-html5"/>`workout_list.html` and add the following code:

```html :collapsed-lines title="tracker/templates/tracker/workout_list.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Workouts</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f5f7fa;
      color: #333;
      line-height: 1.6;
      padding: 2rem;
    }
    
    .container {
      max-width: 700px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #1a1a2e;
    }
    
    .add-link {
      display: inline-block;
      background-color: #4361ee;
      color: white;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      text-decoration: none;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }
    
    .add-link:hover {
      background-color: #3a56d4;
    }
    
    .workout-card {
      background: white;
      border-radius: 8px;
      padding: 1rem 1.2rem;
      margin-bottom: 0.8rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .workout-activity {
      font-weight: 600;
      font-size: 1.05rem;
    }
    
    .workout-details {
      color: #666;
      font-size: 0.9rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: #888;
    }
  </style>
</head>
<body>
<div class="container">
  <h1>My Workouts</h1>
  <a href="{% url 'add_workout' %}" class="add-link">+ Log a Workout</a>
  {% if workouts %} {% for workout in workouts %}
  <div class="workout-card">
    <div>
      <div class="workout-activity">{{ workout.activity }}</div>
      <div class="workout-details">{{ workout.duration }} minutes</div>
    </div>
    <div class="workout-details">{{ workout.date }}</div>
  </div>
  {% endfor %} {% else %}
  <div class="empty-state">
    <p>No workouts logged yet. Start by adding one!</p>
  </div>
  {% endif %}
</div>
</body>
</html>
```

There are a few things worth noting here:

If you look closely at the HTML, you'll spot some weird-looking tags wrapped in curly braces ( `{% %}` and `{{ }}` ). Think of them as special instructions for Django.

You use the double curly braces (`{{ }}`) when you want to output or display a piece of data directly on the page.

On the other hand, you use the brace-and-percent-sign combo ( `{% %}` ) when you need Django to actually perform an action or apply logic, like running a loop or checking a condition.

They allow us to inject dynamic data straight from our Python backend right into our otherwise static HTML.

Lets look at this code snippet for the <VPIcon icon="fa-brands fa-html5"/>`workout_list.html`

```html title="tracker/templates/tracker/workout_list.html"
<body>
    <div class="container">
  <h1>My Workouts</h1>
  <a href="{% url 'add_workout' %}" class="add-link">+ Log a Workout</a>
  {% if workouts %} {% for workout in workouts %}
  <div class="workout-card">
    <div>
      <div class="workout-activity">{{ workout.activity }}</div>
      <div class="workout-details">{{ workout.duration }} minutes</div>
    </div>
    <div class="workout-details">{{ workout.date }}</div>
  </div>
  {% endfor %} {% else %}
  <div class="empty-state">
    <p>No workouts logged yet. Start by adding one!</p>
  </div>
  {% endif %}
</div>
</body>
```

![The image shows the the body section of the workout_list.html with the focus on django template tags](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/864ed3dc-ceda-44f8-ba3d-b061222714c7.png)

There are a few things worth noting here.

Right under the main heading, you'll see this line:  

```html
<a href="{% url 'add_workout' %}">
```

Instead of hardcoding a web link like `href="/add-workout/"`, Django uses the `{% url %}` tag to generate the link dynamically. You pass it the name of the route (in this case, `add_workout`), and Django automatically figures out the correct URL path.

If you ever change the URL structure in your Python code later, Django updates this link automatically. You never have to hunt through HTML files to fix broken links!

![The image highlights the code that generates dynamic url](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/2dc56430-d146-4fc9-8ae5-a3fb5a0d7dd1.png)

The `{% if workouts %}` block checks whether there are any workouts to display. If the list is empty, it shows a friendly message instead of a blank page.

The `{% for workout in workouts %}` loop iterates over every workout in the list and renders a card for each one. The double curly braces `{{ workout.activity }}` insert the value of each field into the HTML

![](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/f75b5c7e-5cd0-457c-901f-e489c26a8175.png)

Inside the loop, you'll notice tags that look like this:

- `{{ workout.activity }}`
- `{{ workout.duration }}`
- `{{ workout.date }}`

As Django loops through each workout object, it uses dot notation to peek inside that specific object and grab its details. It grabs the activity type (like "Running"), the duration ("30"), and the date ("March 30"), and prints that exact text directly onto the webpage for the user to see.

### 7.3 How to Create Add Workout Template

Create a file called <VPIcon icon="fas fa-folder-open"/>`tracker/templates/tracker/add_workout.html` and add the following code:

```html :collapsed-lines title="tracker/templates/tracker/add_workout.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log a Workout</title>
  <style>
        * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f5f7fa;
      color: #333;
      line-height: 1.6;
      padding: 2rem;
    }
    
    .container {
      max-width: 500px;
      margin: 0 auto;
    }
    
    h1 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #1a1a2e;
    }
    
    .form-group {
      margin-bottom: 1.2rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.3rem;
      font-weight: 600;
      font-size: 0.95rem;
    }
    
    input[type="text"],
    input[type="number"],
    input[type="date"] {
      width: 100%;
      padding: 0.6rem 0.8rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    
    input:focus {
      outline: none;
      border-color: #4361ee;
    }
    
    .btn {
      background-color: #4361ee;
      color: white;
      padding: 0.7rem 1.5rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    
    .btn:hover {
      background-color: #3a56d4;
    }
    
    .back-link {
      color: #4361ee;
      text-decoration: none;
      font-size: 0.95rem;
    }
    
    .back-link:hover {
      text-decoration: underline;
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-top: 0.5rem;
    }
    
    .error-list {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: 0.3rem;
    }
  </style>
</head>
<body>
    <div class="container">
  <h1>Log a Workout</h1>
  <form method="post">
    {% csrf_token %}
    <div class="form-group">
      <label for="id_activity">Activity</label>
      {{ form.activity }} {% if form.activity.errors %}
      <div class="error-list">{{ form.activity.errors }}</div>
      {% endif %}
    </div>
    <div class="form-group">
      <label for="id_duration">Duration (minutes)</label>
      {{ form.duration }} {% if form.duration.errors %}
      <div class="error-list">{{ form.duration.errors }}</div>
      {% endif %}
    </div>

    <div class="form-group">
      <label for="id_date">Date</label>
      {{ form.date }} {% if form.date.errors %}
      <div class="error-list">{{ form.date.errors }}</div>
      {% endif %}
    </div>

    <div class="actions">
      <button type="submit" class="btn">Save Workout</button>
      <a href="{% url 'workout_list' %}" class="back-link">Cancel</a>
    </div>
  </form>
</div>
</body>
</html>
```

In the previous template, we learned how to display data. Now, we're looking at a form that actually collects data. Handling forms manually in web development can get messy, but Django provides some powerful template tags to do the heavy lifting for us.

Let's look at the Django-specific logic powering this form:

First, right after opening the `<form>` tag, you'll spot a very important line: `{% csrf_token %}`. Whenever you submit data to a server using a "POST" method, malicious sites can potentially intercept or forge that request.

By including this `{% csrf_token %}`, you tell Django to generate a unique, hidden security key for the form. When the user clicks "Save Workout," Django checks this token to guarantee the request is legitimate. **If you forget this tag, Django will simply reject your form!**

```html
<form method="post">
  {% csrf_token %}
  <div class="form-group">
    <label for="id_activity">Activity</label>
    {{ form.activity }} {% if form.activity.errors %}
    <div class="error-list">{{ form.activity.errors }}</div>
    {% endif %}
  </div>
  <div class="form-group">
    <label for="id_duration">Duration (minutes)</label>
    {{ form.duration }} {% if form.duration.errors %}
    <div class="error-list">{{ form.duration.errors }}</div>
    {% endif %}
  </div>

  <div class="form-group">
    <label for="id_date">Date</label>
    {{ form.date }} {% if form.date.errors %}
    <div class="error-list">{{ form.date.errors }}</div>
    {% endif %}
  </div>

  <div class="actions">
    <button type="submit" class="btn">Save Workout</button>
    <a href="{% url 'workout_list' %}" class="back-link">Cancel</a>
  </div>
</form>
```

![The image shows a screenshot of the code and highlight the csrf token tag](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/4ca2a034-119c-4dc7-a14a-cd0a81815c58.png)

Now let's talk about automatically generating the form fields. Instead of manually typing out all the HTML `<input>` tags for the activity, duration, and date, we let Django do it for us using display tags (`{{ }}`).

Each `{{ form.activity }}`, `{{ form.duration }}`, and `{{ form.date }}` tag renders the corresponding form input. Django handles the HTML attributes, input types, and validation for you based on the model and form definitions.

![This image shows the code that automatically generates HTML forms](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/c2403685-b78d-4aa7-876d-63ca53481e37.png)

The error blocks below each field display validation messages if a user submits invalid data, like entering text in the duration field instead of a number. Users make mistakes. They might leave a required field blank or type text into a number field. Fortunately, Django validates the data for you and sends back errors if something goes wrong.

Underneath each input field, we use a logic block that looks like this:  

```
{% if form.activity.errors %}
```

This code checks a simple condition: Did the user mess up this specific field? If Django found an error with the "activity" input, the code drops into the if block and uses`{{ form.activity.errors }}` block to print the exact error message (like "**This field is required**") right below the input box.

![This image displays the error blocks](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/97a61f9d-faf6-4ddd-ab17-d53da88e0d07.png)

You may notice that both templates include inline CSS rather than a separate stylesheet. For a small project like this, inline styles keep things simple and self-contained. In a larger project, you would use Django's static files system to manage CSS separately.

---

## Step 8: How to Connect URLs

You have views and templates, but Django doesn't know when to use them yet. You need to map URLs to views so that visiting a specific address in the browser triggers the right view function.

### 8.1 How to Create App Level URLs

Create a new file called <VPIcon icon="fas fa-folder-open"/>`tracker/`<VPIcon icon="fa-brands fa-python"/>`urls.py` and add the following code:

```py title="tracker/urls.py"
from django.urls import path
from . import views

urlpatterns = [ 
    path('', views.workout_list, name='workout_list'), 
    path('add/', views.add_workout, name='add_workout'), 
]
```

Each path function takes three arguments.

The first is the route string that represents a URL pattern (an empty string means the root of the app).

The second is the view function to call when that URL is visited.

The third is a name you can use to reference this URL elsewhere in your code, like in the `{% url %}` template tags you used earlier.

![The image contains the description of three arguments of the path function](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/d9128270-eec3-43af-93de-08780b4a53f5.png)

### 8.2 How to Link App URLs to project

Now that your app-level URLs are set up, the next step is to connect them to the main project so Django knows where to start routing requests. Think of it like linking a smaller map (your app) to a bigger map (your project), so everything works together smoothly.

Open <VPIcon icon="fa-brands fa-python"/>`fitness_project.urls.py` and update it to include your app's URLs:

```py title="tracker/fitness_project.urls.py"
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tracker.urls')),
]
```

The `include()` function tells Django to look at the URL patterns defined in the <VPIcon icon="fas fa-folder-open"/>`tracker/urls.py` file whenever someone visits your site. The empty string prefix means your tracker app handles requests at the root of the site.

Here's the full picture of how a request flows through the URL system.

When someone visits `127.0.0.1:8000/add`, Django first checks <VPIcon icon="fas fa-folder-open"/>`fitness_project/`<VPIcon icon="fa-brands fa-python"/>`urls.py`. It matches the empty prefix and delegates to <VPIcon icon="fas fa-folder-open"/>`tracker/`<VPIcon icon="fa-brands fa-python"/>`urls.py`. There, it matches `add/` and calls the `add_workout view`.

![The image shows the how the URL flows through the system](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/4590c4e3-0d32-4865-90db-a6504ee508c1.png)

---

## Step 9: How to Test the Application Locally

At this point, your app has everything it needs to work. Let's test it.

Start the development server by running the command:

```sh
python manage.py runserver
```

Open your browser and visit `127.0.0.1:8000/`. You should see the workout list page with the heading "**My Workouts**" and a button that says "**\+ Log a Workout**."

![The image shows the My Workouts image with the button to log a workout](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e15dc4cf-09b0-4ba9-95b1-baba32ce929f.png)

Click that button. You should see the workout form with fields for activity, duration, and date.

![The image shows an empty form to log a workout](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/d9790d3e-0b6a-4e1b-b3d9-f305bc254cfc.png)

Fill in some test data:

- Activity: Skipping
- Duration: 25
- Date: Pick today's date from the date picker

Click "**Save Workout**" You should be redirected back to the workout list page, and your new workout should appear as a card.

![The image shows the workout list after adding a new workout](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/3f1dbf8f-3547-45ec-961d-cff75092ec02.png)

Try adding a few more workouts with different activities and dates. Make sure they all show up on the list page in the correct order (most recent first).

This is also a good time to experiment. Try submitting the form with missing fields and see how Django handles validation.

![The image shows an incomplete form being submitted and a correspoding error message](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/542e32cf-abf5-4f11-9d4e-0733697c591b.png)

Try accessing the admin panel at `127.0.0.1:8000/admin/` to see your workouts there as well.

![This image shows the added workouts in Django admin](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/cdfbcbf3-f7b6-4b97-92ee-dcc27e2ce60c.png)

If everything works as expected, you're ready to put your app on the internet.

---

## Step 10: How to Prepare for Deployment

Running your app on localhost is great for development, but nobody else can see it. Deployment means putting your app on a server that's accessible from anywhere on the internet.

Before you deploy, you'll need to make a few changes to your project's settings.

### 10.1 How to Update Settings for Production

Open <VPIcon icon="fas fa-folder-open"/>`fitness_project/`<VPIcon icon="fa-brands fa-python"/>`settings.py` and make the following changes.

First, set `DEBUG` to `False`.

During development, `DEBUG = True` shows detailed error pages that help you fix problems. In production, these error pages would expose sensitive information about your code and server to anyone who triggers an error.

![The image shows the DEBUG being set to False in the settings.py file](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/6b8b491e-d0ae-4a93-80bf-92134e46ff22.png)

Next, update `ALLOWED_HOSTS` to include **PythonAnywhere's** **domain**.

This setting tells Django which domain names are allowed to serve your app. Replace yourusername with the actual PythonAnywhere username you will create in the next step.

```py
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com']
```

![The image shows the allowed host list being updated to add the pythonanywhere domain](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/050746f6-d076-41de-8810-08bf539bfda5.png)

Finally, add a `STATIC_ROOT` setting so Django knows where to collect your static files (CSS, JavaScript, images) for production:

```py
import os
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

![The image shows the code to collect static files](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/712e0514-42f6-4292-ae52-99f49b6f162b.png)

These are the minimum changes needed for a basic deployment.

::: note

For a production app handling real user data, you would also want to set a secure SECRET_KEY, configure a proper database like PostgreSQL, and set up HTTPS. But for a learning project, these changes are enough.

:::

---

## Step 11: How to Deploy Your Django App on PythonAnywhere

PythonAnywhere is a hosting platform designed specifically for Python web applications. It offers a free tier that's perfect for beginner projects, and it handles much of the server configuration that would otherwise be complex to set up on your own.

### 11.1 How to Create a PythonAnywhere Account

Go to [<VPIcon icon="fas fa-globe"/>`pythonanywhere.com`](http://pythonanywhere.com) and sign up for a free "Beginner" account. Remember the username you choose, because your app will be available at `yourusername.pythonanywhere.com`.

![The image shows the homepage of pythonanywhere](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e64e7ca4-7d7d-40a7-a56b-259bb706461f.png)

Now signup to the website. Fill in the username, email and password and click on the free tier or now.

![The image shows the various tiers of python anywhere websites](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/fde55ec6-16f4-4a4f-8927-7b01d3e36a96.png)

### 11.2 How to Upload Your Project Files

After logging in, you have two options for getting your project files onto PythonAnywhere.

#### Option A: Upload using Git

If your project is in a Git repository, open a Bash console from the PythonAnywhere dashboard by clicking "Consoles" and then "Bash." Then clone your repository:

```sh
git clone https://github.com/yourusername/fitness-tracker.git
```

In this tutorial, we won't be using Git. Instead we'll follow the second option.

#### Option B: Upload files manually

First go your project folder in your computer and created a compressed version of the project.

IMPORTANT NOTE: When you create the compressed file, make sure to first create a copy of the project somewhere and remove the venv and pycache folder before you compress it.

![The image shows the project folder being compressed](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/169dcd52-50f0-44c0-82d4-1dea1196ac88.png)

Navigate to your home directory and click on upload file tab and upload the compressed file.

![The image shows the compressed file being uploaded to pythonanywhere](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/633c7b1f-0088-4d2d-8911-b45e86aa39c2.png)

Now we need to unzip the compressed file. To do this, go to the Consoles tab and click on Bash console.

![The image shows the Consoles tab and bash option](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/7774a88e-362e-4680-a19d-32e0ef09fe04.png)

The bash console should open. Then type the following command in the console to unzip the folder:

```sh
unzip fitness-tracker.zip
```

![The image shows the result of the unzip command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/1ae044ad-8996-4191-868a-33566c2483d9.png)

### 11.3 How to Set Up a Virtual Environment in PythonAnywhere

Open a Bash console from the PythonAnywhere dashboard. Navigate to your project directory and create a fresh virtual environment:

```sh
cd fitness-tracker
```

![The image shows changing the directory to fitness tracker](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/c8113d5d-68a6-400f-ab9f-7c8903485eda.png)

Type the following command to install a virtual environment as we've done before and then activate the virtual environment:

```sh
python3 -m venv venv
source venv/bin/activate
```

![The image shows the virtual environment being created and activated](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/724767df-181c-4fcf-91e0-77c6dac566b0.png)

Now install Django as before using `pip install django` command:

![The image shows django being installed](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/d6c37d87-7497-4ca1-a90f-6cd66422c2e5.png)

### 11.4 How to Run Migrations and Create a SuperUser on PythonAnywhere

While you're still in the Bash console with your virtual environment activated, run the migrations to create the database tables on the server:

```sh
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

![The image shows the make migrations and migrate commands running](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/0b763118-5a1c-4c3f-87f4-693cc7de0da2.png) ![The image shows the super user being created](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/77183d3c-b4bc-40b7-b00f-5f03d2aea2ab.png)

### 11.4 How to Configure the Web App in Pythonanywhere

Go to the "Web" tab on the PythonAnywhere dashboard and click "Add a new web app." Follow the setup wizard:

![The image shows the web tab and add a new web app button](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e1296e93-3e52-4327-b12a-4d4555e80845.png)

Click "Next" on the domain name step (*remember the free tier uses `yourusername.pythonanywhere.com`).

![The image shows the web console where you specify the domain name](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/24495b99-e1dc-437d-8ce8-47c0c962349f.png)

Select "Manual configuration" (not "Django" – the manual option gives you more control).

![The image highlight the manual configuration option which should be selected](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/db470bd1-bbd1-4c61-b846-b7147d8f820f.png)

Then choose the Python version that matches what you installed. In my case it's 3.13, so I'll choose 3.13

![The image shows the Python version what is being selected](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/dc51d44e-531c-4871-a225-e68b2db5dc65.png)

Click on Next button and a WSGI (Web Server Gateway Interface) will be created.

![The image shows the final page before the web app is created](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/3565512b-9c84-4b0d-82d9-3964cb0ff46b.png)

With this we've created the web app:

![The image shows the final creation of the web app](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/eda9fe63-01f4-48bc-98f1-07696bb798bf.png)

After you've set up the web app, you have to do two more things:

- Set the virtual environment path
- Configure the WSGI file

### 11.5 How to Set the Virtual Environment Path

On the **Web** tab, scroll down to the "**Virtualenv**" section and enter the path to your virtual enviroment. The path to the file should be like this:

```sh
/home/yourusername/fitness-tracker/venv
```

![The image shows the added path of virtual environment](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/413ed047-ecc1-440f-a931-4a57aa91348b.png)

### 11.6 How to Configure the WSGI file

Still on the Web tab, scroll to the code section and click on the WSGI configuration file link:

![The image shows the Code section and the WSGI configuration file path](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/934d1542-79d6-4140-8bb2-a4389fc17770.png)

Delete all the contents and replace them with the content below and save the file:

```py
import os
import sys
path = '/home/prabodhtuladhardev/fitness-tracker' #replace with your username
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'fitness_project.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

![The image shows the edited wsgi.py file and the highlights the save button](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/416adac6-61d7-464d-b91f-b3b35272ef08.png)

### 11.7 How to Set Up Static Files

Still on the "Web" tab, scroll down to the "Static files" section. Add an entry:

- URL: `/static/`
- Directory: <VPIcon icon="fas fa-folder-open"/>`/home/yourusername/fitness-tracker/staticfiles`

![The image shows the static files section of the Web tab](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/f128dbd2-4acc-4387-89f8-d79de8c1e66e.png)

Then go back to your Bash console and run the following command:

```sh
python manage.py collectstatic
```

![The image shows the results of the collect static command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/207f8e67-2679-4ccc-8ebf-7d8aae5d7494.png)

This copies all static files to the staticfiles directory so PythonAnywhere can serve them directly.

![The image shows the folder named static files that was created](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/a14b75c4-cc1e-48ad-baf2-cf4f00906b85.png)

Go back to the "Web" tab and click the green "Reload" button at the top. This restarts your app with all the new configuration.

![The image shows the web tab with the reload button](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/08fab36e-8c8d-4d1b-8342-6e340fcf45d4.png)

### 11.8 How to View Your Live Application

Open a new browser tab and visit [`https://yourusername.pythonanywhere.com`](https://yourusername.pythonanywhere.com). You should see your fitness tracker, live on the internet.

Try adding a workout.

![The image shows the workout list view being opened in python anywhere](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/db67dbb1-3cb9-4b86-bfaa-67427ef5eac0.png)

Visit the admin panel at [`https://yourusername.pythonanywhere.com/admin/`](https://yourusername.pythonanywhere.com/admin/).

![The image shows the workout django admin being opened in pythonanywhere](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/bd80d1e8-cf23-4ac2-b6a7-35bfdf61d023.png)

Everything should work just as it did on your local machine, but now anyone with the link can access it.

This is a meaningful milestone. You've gone from zero to a deployed Django application. Share the link with a friend or post it in a coding community. Seeing your work live on the internet is one of the most motivating experiences in learning to code.

---

## Common Mistakes and How to Fix Them

Even when you follow each step carefully, things can go wrong. Here are the most common issues beginners run into and how to solve them.

### "ModuleNotFoundError: No module named 'django'"

This usually means your virtual environment isn't activated. Run `source venv/bin/activate` (macOS/Linux) or `venv\Scripts\activate` (Windows) and try again. On PythonAnywhere, make sure the **virtualenv** path in the "**Web**" tab points to the correct location.

### "DisallowedHost" error

You forgot to add your domain to `ALLOWED_HOSTS` in <VPIcon icon="fa-brands fa-python"/>`settings.py`, or there's a typo. Double-check that it matches your PythonAnywhere URL exactly.

### Static files not loading in production

Make sure you ran `python manage.py collectstatic` and that the static file mapping on PythonAnywhere points to the **correct staticfiles** directory. Also verify that `STATIC_ROOT` is set in <VPIcon icon="fa-brands fa-python"/>`settings.py`.

### "No such table" or migration errors

You probably forgot to run `python manage.py migrate` after cloning or uploading your project to PythonAnywhere. Run the `migrate` command in the Bash console.

### Changes not showing up on PythonAnywhere

After making any code changes, you must click the "**Reload**" button on the "**Web**" tab. PythonAnywhere does not automatically detect file changes.

![The image shows the web tab and the reload buttton](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/08fab36e-8c8d-4d1b-8342-6e340fcf45d4.png)

---

## How You Can Improve This Project

The fitness tracker you built is intentionally simple. That's a feature, not a limitation. A working simple project is the perfect foundation for learning more.

Here are some ideas for expanding it.

1. **Add user authentication:** Right now, anyone who visits the site sees the same workout data. Django has a built-in authentication system that lets you add registration, login, and logout. Each user could then have their own private list of workouts.
2. **Add the ability to edit and delete workouts.** Currently, once a workout is saved, there's no way to change or remove it from the interface (you can do it through the admin panel, but not the main app). Try creating new views and templates for editing and deleting.
3. **Add workout categories or tags.** Let users categorize their workouts as "Cardio," "Strength," "Flexibility," and so on. This would involve adding a new field to the model or creating a separate Category model with a foreign key relationship.
4. **Add charts and progress tracking.** Use a JavaScript charting library like Chart.js to display workout trends over time. For example, you could show a bar chart of total minutes exercised per week.
5. **Build an API with Django REST Framework.** If you want to learn about building APIs, try installing Django REST Framework (DRF) and creating API endpoints for your workouts. This would let you build a mobile app or a separate front end that communicates with your Django back end.

Each of these improvements will teach you something new about Django while building on the foundation you already have.

---

## Conclusion

You've built a fully functional fitness tracker web app with Django and deployed it to the internet. That's no small achievement.

Along the way, you learned how Django projects and apps are structured, how models define the shape of your data, how migrations translate those models into database tables, how views handle the logic of your application, how templates render dynamic HTML, and how URLs tie everything together. You also went through the entire deployment process on PythonAnywhere.

These are the core building blocks of Django development. The patterns you practiced here – defining a model, creating a form, writing a view, building a template, and connecting a URL – are the same patterns you will use in every Django project, no matter how complex.

The best way to solidify what you have learned is to keep building. Try one of the improvements mentioned above, or start a completely new project. A calorie tracker, a habit tracker, an expense tracker, or a personal journal would all use the same Django concepts with slightly different models and views.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build and Deploy a Fitness Tracker Using Python Django and PythonAnywhere - A Beginner Friendly Guide",
  "desc": "If you've learned some Python basics but still feel stuck when it comes to building something real, you're not alone. Many beginners go through tutorials, learn about variables, functions, and loops, ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-and-deploy-a-fitness-tracker-using-python-django-and-pythonanywhere/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
