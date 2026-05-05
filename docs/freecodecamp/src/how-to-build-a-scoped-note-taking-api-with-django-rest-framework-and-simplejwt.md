---
lang: en-US
title: "How to Build a Scoped Note-Taking API with Django Rest Framework and SimpleJWT"
description: "Article(s) > How to Build a Scoped Note-Taking API with Django Rest Framework and SimpleJWT"
icon: iconfont icon-django
category:
  - Python
  - Django
  - DevOps
  - Security
  - JWT
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - django
  - py-django
  - devops
  - sec
  - security
  - jwt
  - json-web-token
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Scoped Note-Taking API with Django Rest Framework and SimpleJWT"
    - property: og:description
      content: "How to Build a Scoped Note-Taking API with Django Rest Framework and SimpleJWT"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-scoped-note-taking-api-with-django-rest-framework-and-simplejwt.html
prev: /programming/py-django/articles/README.md
date: 2026-05-06
isOriginal: false
author:
  - name: Prabodh Tuladhar
    url: https://freecodecamp.org/news/author/prabodhtuladhar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/36921ffa-4741-4e11-8f16-2c84322ebceb.png
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

```component VPCard
{
  "title": "JWT > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security-jwt/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Scoped Note-Taking API with Django Rest Framework and SimpleJWT"
  desc="If you've built a Django API and you're wondering how to add authentication so that each user can only access their own data, you're in the right place. Most Django tutorials teach you session-based a"
  url="https://freecodecamp.org/news/how-to-build-a-scoped-note-taking-api-with-django-rest-framework-and-simplejwt"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/36921ffa-4741-4e11-8f16-2c84322ebceb.png"/>

If you've built a Django API and you're wondering how to add authentication so that each user can only access their own data, you're in the right place.

Most Django tutorials teach you session-based authentication. That works fine when your frontend and backend live on the same server. But the moment you separate them – say, a React app on Netlify talking to a Django API on PythonAnywhere – then sessions start to break down.

Cookies don't travel well across different domains, and suddenly your login system stops working.

That's where JSON Web Tokens (JWT) come in. JWTs give you a stateless, cookie-free way to authenticate users. They work seamlessly across domains, devices, and platforms. The server doesn't need to remember anything. It just verifies the token's signature and knows exactly who's making the request.

But authentication is only half the problem. Once you know who a user is, you still need to control what they can see. This is where **scoping** comes in.

Scoping means ensuring that each user can only access their own data. User A should never be able to read, edit, or delete User B's data (notes in our case), even if they somehow guess the right ID.

In this tutorial, you'll build a a personal note-taking API where users can register, log in with JWT tokens, and store notes that only they can access.

Along the way, you'll implement a custom user model, configure SimpleJWT for token-based authentication, and write scoped views that lock each user's data behind their own credentials.

Here's what this tutorial covers:

1. How to set up a custom user model (and why you should always do this)
2. How to configure SimpleJWT for access and refresh token authentication
3. How to build serializers that protect sensitive fields
4. How to scope your API views so users only see their own data
5. How to test the entire flow using Postman

Let's get started

::: note Prerequisities

Before you begin, make sure you're comfortable with the following:

1. **Django fundamentals**: You should understand how Django projects and apps work, including models, views, URLs, and migrations.
2. **Django REST Framework basics**: You should be familiar with serializers, viewsets or API views, and how DRF handles requests and responses.
3. **Basic command line usage**: You'll run commands in your terminal throughout this tutorial.

Tools you'll need installed:

- Python 3.8 or higher
- pip (Python's package manager)
- A code editor like Visual Studio Code
- Postman (or any API testing tool) for testing your endpoints. You'll use this to send requests to your API.

:::

---

## What is JWT and Why Use It Over Session Authentication?

Before you write any code, it's important to understand what problem JWTs solve and why Django's built-in session authentication isn't always enough.

### How Session Authentication Work

Django ships with a session-based authentication system. Here's how it works at a high level:

1. A user sends their username and password to the server.
2. The server verifies the credentials and creates a **session** which is a small record stored in the server's database that says "this user is logged in."
3. The server sends back a **session ID** as a cookie. The browser stores this cookie automatically.
4. On every subsequent request, the browser sends the cookie back to the server. The server looks up the session ID in its database and says "ah, this is User A. Let them through."

![The infographics shows the steps taken in Django session authentication](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/2689a08a-f8a9-4b83-ad7b-cc4c2de90419.png)

This works perfectly when your frontend and backend live on the same domain. The browser handles cookies automatically, and Django manages sessions in the database without you thinking about it.

But this approach has some limitations.

1. **The cross-domain problem:** If your React frontend lives at app.example.com and your Django API lives at `api.example.com`, cookies become tricky. Browsers enforce strict rules about which domains can send and receive cookies.<br/>You can work around this with CORS (Cross-Origin Resource Sharing) headers and special cookie settings, but it adds complexity and can be fragile.
2. **The scalability problem:** Every active session is stored in the server's database. If you have 10,000 users logged in at the same time, that's 10,000 session records the server has to look up on every single request. As your application grows, this lookup becomes a bottleneck.
3. **The mobile problem:** Mobile apps don't handle cookies the same way browsers do. If you're building an API that will serve both a web app and a mobile app, session cookies create extra headaches.

### How JWT Authentication Works

JWTs take a fundamentally different approach. Instead of storing session data on the server, they put the authentication information directly into the token itself.

Here's how the flow works:

1. A user sends their username and password to the server.
2. The server verifies the credentials and creates a JWT – a long encoded string that contains information like the user's ID and when the token expires.
3. The server sends this token back to the client. The client stores it (usually in memory or local storage).
4. On every subsequent request, the client includes the token in the request header. The server reads the token, verifies its signature, and says "this is User A. Let them through."

Notice the key difference: **the server never stores anything**.

It doesn't look up a session in a database. It simply reads the token, checks its cryptographic signature to make sure nobody tampered with it, and extracts the user information. That's why JWTs are called **stateless** – the server doesn't maintain any state about who is logged in.

**This solves the cross-domain problem** because tokens are sent in the request header, not as cookies. Headers work the same way regardless of which domain the request comes from.

**This solves the scalability problem** because the server doesn't store sessions. Verifying a token is a quick cryptographic check, not a database lookup.

**This solves the mobile problem** because any client that can send HTTP headers can use JWT. Mobile apps, desktop apps, other servers – they all work the same way.

![The infographics shows the steps taken in JWT authentication](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/41d60dbd-707c-4483-8374-8910024bda7f.png)

---

## Step 1: How to Set Up the Project and Install the Dependecies

### 1.1 How to Create the Project

Open your terminal, navigate to where you want your project to live, and run the following commands:

```sh
mkdir notes-project

cd notes-project
```

![The image shows the creation of notes project folder](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/594f6c90-ea92-4859-9d9b-442d2fd2f23d.png)

### 1.2 How to Create a Virtual Environment and Install the Required Dependencies

You will create a virtual environment here. Type the following command:

```sh
python3 -m venv venv
```

![The image shows the creation of the virtual environment folder after tying the command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/4c1c9c33-9ffb-433a-a8f0-60cf0f598e14.png)

The above command creates a virtual environment inside a folder called `venv`. The first `venv` is the command and the second `venv` represents the name of the folder. You can name the folder anything though `venv` is usually preferred.

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

![The image shows virtual environment being activated](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/0a58f106-684c-4286-91fc-3c60f6e45483.png)

With the virutal environment activated, install Django, Django Rest Framework, and Simple JWT Framework using the command:

```sh
pip install django djangorestframework djangorestframework-simplejwt 
```

![The image shows the installation of the packages after running the pip command](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/af83ad3f-3201-4e59-9367-e95630ae3cb3.png)

You can verify everything installed correctly by running:

```sh
pip list
```

You should see all three packages listed along with their dependencies.

![The image shows a list of all the dependencies along with the dependencies installed just now](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/b725778c-57ca-42cb-a0a2-486ec3e6286e.png)

### 1.3 How to Create the Project and the App

Run the following command to create the Django project:

```sh
django-admin startproject notes_core .
```

The dot at the end is important. It tells Django to create the project files in your current directory instead of creating an extra nested folder.

Now let's type this command to create the app:

```sh
python manage.py startapp notes
```

![The image shows the folder structure of django project and app](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/f0f95ce1-b8b0-4acb-ae5a-194fa3d74e08.png)

### 1.4 How to Register the App and Django Rest Framework (DRF)

Open <VPIcon icon="fas fa-folder-open"/>`notes_core/settings.py` and add `rest_framework` and `notes` in the `INSTALLED_APPS` list:

![The image show the DRF and notes app being added to installed app list](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/35988eff-506c-43af-ac6c-ef698e843ad3.png)

Django now knows about your new app and the REST framework. Let's move on to the most important architectural decision you'll make for this project.

---

## Step 2: How to Create a Custom User Model

If you've built Django projects before, you might have used Django's default User model. For quick prototypes, that works fine. But for any project you plan to grow or maintain, starting with a custom user model is a best practice you should never skip.

Here's why: Django's default `User` model uses a `username` field as the primary identifier. If you later decide you want users to log in with their email address instead, or you need to add a profile picture field, or a phone number, then you're stuck.

Using a custom user model gives you full control over what a "user" means in your app. Instead of being tied to a username, you can design login around something more practical, like email or phone_number for a fitness or mobile-based app. You can also include fields like role (doctor, patient, receptionist in a clinic system) or date of birth directly in the user model, instead of managing a separate profile.

It also helps future-proof your project. If you start with the default model and later decide to switch login from username to email, or add required fields, it becomes difficult and risky to change. Using a custom user model from the beginning avoids this problem and makes it much easier to adapt your authentication system as your app grows.

By creating a custom user model from the start, even if it's identical to the default one, you give yourself the freedom to make changes later without any of that pain.

### 2.1 How to Define the Custom User Model

Open <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`notes/models.py` and add the following code:

```py title="notes/models.py"
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    pass
```

![The image shows the code for the custom user model](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/29310f13-cdc9-409a-9c36-23234882fd6e.png)

You are importing Django’s built-in `AbstractUser` class.

Think of `AbstractUser` as a ready-made blueprint for a user. It already includes fields like username, password, email, first name, last name , and authentication logic.

The `pass` statement means you're not adding any extra fields yet.

But the key point is that this model is yours. So this model behaves exactly like Django’s default user model, but with one **big advantage**: you now have the flexibility to customize it later.

If three months from now you need to add a `phone_number` field or switch to email-based login, you just add a field to this class and run a migration.

```py
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15)
```

You can also see all the fields that the `CustomUser` class has inherited from the `AbstractUser` class.

To do this we can use the Python shell. Type the following command:

```sh
python manage.py shell
```

When you type this command, make sure that the virtual environment is active:

![The image shows the command to enter into the python shell with the virtual environment being activated](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/3c958f7f-6403-4eaf-b339-43532a02af6a.png)

After this, import the `CustomUser` model in the shell:

```py
from notes.models import CustomUser
```

After that, type the following code:

```py
[fields.name for field in CustomUser._meta.get_fields()]
```

The above statement lists out all the fields in the `CustomUser` class.

![The image shows the output of all the fileds inherited by the CustomUser model](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/5a1b3314-7b48-41f6-98a9-dc3133cfce4c.png)

### 2.2 How to Tell Django to Use Your Custom User Model

Now comes the important bit. Open <VPIcon icon="fas fa-folder-open"/>`notes_core/`<VPIcon icon="fa-brands fa-python"/>`settings.py` and add this line:

```py title="notes_core/settings.py"
AUTH_USER_MODEL = 'notes.CustomUser'
```

This setting tells Django to use your `CustomUser` model instead of the built-in one for everything authentication-related such as login, permissions, foreign keys, and so on.

There's no strict rule to where you need to add it, but the best practice is to add it near the end of the file.

![The image shows the above code being added to the <VPIcon icon="fa-brands fa-python"/>`settings.py` file](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/87c9b03c-908d-4b2d-a6d5-9528ff98d1ab.png)

You can see which user model Django is using by using the method `get_user_model()`.

Open the Python shell again and import the `get_user_model()` method:

```sh
from django.contrib.auth import get_user_model 
```

Then use `get_user_model()` and print the output:

```sh
user = get_user_model()
print(user)
```

You should see the name of our model being used:

![](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/895d5bcc-6880-4c4d-9007-96d44e9fa496.png)

If you hadn't added the `AUTH_USER_MODEL` in the <VPIcon icon="fa-brands fa-python"/> `settings.py` file, then Django would have used the default user model:

![The image shows the default user model being used by Django](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/a89f013a-e5d8-4e59-90b8-7da594188c13.png)

::: note

You'll need to do this before you run your first migration. If you run migrate before setting AUTH_USER_MODEL, Django creates tables for the default User model, and switching afterward becomes a headache.

:::

### 2.3 How to Run Migrations

Now create and apply the initial migrations:

```sh
python manage.py makemigrations
python manage.py migrate
```

![The image shows the output after running the above commands](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/cbca499a-286c-4f07-9a3e-375a69b4c374.png)

Django will create the necessary tables for your custom user model along with all the built-in Django tables.

We can again peek under the hood to see the SQL queries that Django used to create the tables especially the `CustomUser` table.

Type this command:

```sh
python manage.py sqlmigrate notes 0001
```

Here `notes` is the name of the app and `0001` represents the migration number.

And you should get this output:

![The image shows the output after the sqlmigrate command is executed](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/850bba6c-8e54-4beb-8b85-f30f193341d5.png)

Let's also create a superuser so you can access the admin panel later for debugging:

```sh
python manage.py createsuperuser
```

Fill in the username, email (optional), and password when prompted.

![The image shows the super user being created](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/43820470-86b4-4274-834a-19a97adbc208.png)

---

## Step 3: How to Define the Note Model

Now let's create the data model for the core of your application. First add a new import to use the `settings` object.

```py
from django.conf import settings
```

Then add the following code below the `CustomUser` class:

```py
class Notes(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notes'
    )
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.title} (by {self.owner.username})"
```

Here's the complete <VPIcon icon="fa-brands fa-python"/>`model.py` code:

```py title="notes/model.py"
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    pass

class Notes(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notes'
    )
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.title} (by {self.owner.username})"
```

![The image shows the complete models.py file](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/24f1c5e3-6f9a-4dce-a7dc-d5d17aecc202.png)

Let's walk through each field:

1. `owner = models.ForeignKey(settings.AUTH_USER_MODEL, ...)`: Creates a relationship between each note and a user. The `ForeignKey` field tells Django that each note belogs to exactly one user but a user can have many notes.<br/>Notice that we use `settings.AUTH_USER_MODEL` instead of directly importing `CustomUser`. This is the recommended practice because it keeps your code flexible. If you ever change the user model reference in settings, this foreign key adapts automatically.<br/>The `on_delete=models.CASCADE` means that if a user is deleted, all their notes are deleted too.<br/>The `related_name='notes'` lets you access a user's notes with `user.notes.all()`.
2. `title = models.CharField(max_length=200)`: Creates a text field for the task name, limited to 200 characters.
3. `body = models.TextField()`: Holds the actual note content. `TextField` has no character limit, so users can write as much as they need.
4. `created_at = models.DateTimeField(auto_now_add=True)`: Automatically records the date and time when a task is created. You never need to set this manually.<br/>The `__str__()` method gives each note a readable representation. Instead of seeing "Note object (1)" in the admin panel or during debugging, you'll see something like "Meeting Notes (by Solina)."

### 3.2 How to Apply Migration

Run the migration commands to create the Note table:

```sh
python manage.py makemigrations
python manage.py migrate
```

![The image shows the result of migrating the notes model](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/bf4b3469-89d8-4f8b-8b0d-1ea24eda5e2e.png)

As before, we can see the exact SQL query Django used to create the `notes` table:

![The image shows the SQL query to create the notes table  and reference to the custom user table created earlier](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/606d0d20-7c4f-40fb-a37b-de623ccee574.png)

### 3.3 How to Register Models in the Admin

Open <VPIcon icon="fas fa-folder-open"/>`notes/admin.py` and register both models so you can inspect data through the admin panel:

```py
from django.contrib import admin
from .models import CustomUser, Notes

admin.site.register(CustomUser)
admin.site.register(Notes)
```

![The image shows the code for admin.py](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/482fc6de-33d2-4d09-8c6f-ce3df684eaa3.png)

This is helpful during development when you want to quickly check whether data is being saved correctly.

---

## Step 4: How to Create the Serializer

In DRF, a serializer is like a bridge between your database and the internet.

Django models store data as Python objects. But when you want to send that data to a frontend application (like React or a mobile app), you can't send Python objects. You need to send a format that everyone understands which is usually JSON.

Serializers perform three main jobs:

1. **Serialization:** Converting complex Python objects (Models) into Python dictionaries (which can be easily rendered into JSON).
2. **Deserialization:** Converting JSON data coming from a user back into complex Python objects.
3. **Validation:** Checking if the incoming data is correct before saving it to the database.

![The image shows the serialization deserialization process](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/a7339d6d-e338-4e12-a837-a780e85752a6.png)

### 4.1 How to Create UserSerializer

Create a new file called <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`notes/`<VPIcon icon="fa-brands fa-python"/>`serializers.py` and add the following code:

```py title="notes/serializers.py"
from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
```

Let's break down this serializer.

1. The `UserSerializer` handles user registration.
2. `User = get_user_model()` gets the user model that you're using and stores in the variable `User`. In our case, we're using the `CustomUser` model
3. `class UserSerializer(serializers.ModelSerializer):`: Here you've created the UserSerializer class, which inherits `ModelSerializer`.<br/>A `ModelSerializer` is a shortcut that automatically creates a serializers class with fields that are in the model class.<br/>When we use a `ModelSerializer`, DRF inspects the model and automatically does these things:
    - Generates fields from the model so you don't have to  
    - Automatically adds field validations that are present in the model  
    - Implements `create()` and `update()` methods. A `ModelSerializer` knows which model to use and how to update and create it. You can override `create()` and `update()` methods if you need customized behaviors. **You have overridden the** `create()` **method in the above code.**
4. `password = serializers.CharField(write_only=True)`: This line is crucial. The `write_only=True` flag means the password will be accepted during registration but will **never** appear in any API response. Without this, your API would send back the password (even if hashed) every time user data is returned.<br/>So users can create accounts, but their passwords are never exposed back.
5. `class Meta`: Inside the `Meta` class, you tell the serializer which model to use. In this case, the model to use is `User` and the fields to be handled.
6. The `create()` method: This is the most important part. This method runs when we create a new user. Instead of using the default `.create()` method you have overridden it.<br/>It's important to understand why we have overridden this method. The default `create()` method is not suitable for creating users securely.<br/>By default this method stores the password in plain text format. This is a serious problem because passwords should never be stored in raw form. They need to be **hashed** so that even if the database is compromised, the passwords are never exposed.<br/>Django provides a special method called `create_user()` that automatically handles this by **hashing the password** and setting up the user properly for authentication.

![The image shows the annoated explanation of the code above](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/c1246e5d-104d-486c-965c-8edb04c850dc.png)

### 4.2 How to Create NoteSerializer

After the `UserSerializer` class, let's create the `NoteSerializer` class. The `NoteSerializer` handles the notes data

First of all, you need to add an import to the `Notes` class. Add the line `from .models import Notes` at the end of the last import.

Put this code below the `UserSerializer` class:

```py
class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Notes
        fields = ['id', 'owner', 'title', 'body', 'created_at']
```

Now let's break it down:

1. `owner = serializers.ReadOnlyField(source='owner.username')`: This is the most important line in the code. This makes the `owner` field **read-only**. That means the API will display who owns a note (showing their username), but no one can set or change the owner through the API.<br/>Without this protection, a malicious user could send a POST request with `"owner": 5` and assign their note to someone else's account, or worse, modify someone else's notes by reassigning ownership.<br/>The `source='owner.username'` part tells DRF to display the owner's username instead of their numeric ID, which makes the API responses more readable.
2. `class Meta:` ...: As before the `Meta` class contains the model which the serializer use and the fields that the API will expose.

Here is the complete code in the <VPIcon icon="fa-brands fa-python"/>`serializers.py` file

```py title="notes/serializers.py"
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Notes

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class NoteSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Notes
        fields = ['id', 'owner', 'title', 'body', 'created_at']
```

![The image shows the complete code for the <VPIcon icon="fa-brands fa-python"/>`serializers.py` file](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/3073f560-79dc-4950-8acb-96d871e0511c.png)

---

## Step 5: How to Configure SimpleJWT

Now let's set up the authentication system. This is where you tell DRF to use JWT for authentication instead of sessions. This step is crucial because without it, DRF will default to session-based auth.

SimpleJWT provides a complete JWT implementation for DRF, so you don't have to build token generation, signing, or verification from scratch.

The access token is what your client sends with every API request. It's short-lived by design. Think of it like a visitor badge at an office building: it gets you through the door, but it expires at the end of the day. If someone steals it, the damage is limited because it stops working soon.

The refresh token is longer-lived and has a single purpose: getting a new access token when the current one expires. The client stores it securely and only sends it to one specific endpoint. Think of it like your employee ID card. You use it to get a new visitor badge each morning, but you don't flash it at every door.

This separation exists for security. If the short-lived access token is compromised (which is more likely since it's sent with every request), the attacker has a narrow window before it expires. The refresh token, which is sent less frequently, has a lower risk of interception.

Let's look at how the access and refresh token work together

1. User logs in, server gives both access token and refresh token
2. User makes requests using the access token
3. Access token expires
4. App sends refresh token to server
5. Server checks it and gives a new access token
6. User continues without logging in again

![The image shows the use of access and refresh tokens](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/9cf61a53-99c6-4665-bf5d-dccafa71ca8d.png)

### 5.1 How to Update REST Framework Settings

Open <VPIcon icon="fas fa-folder-open"/>`notes_core/`<VPIcon icon="fa-brands fa-python"/>`settings.py` and add the following code:

```py title="notes_core/settings.py"
from datetime import timedelta
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),

    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
```

![The image shows the code being added to <VPIcon icon="fa-brands fa-python"/>`settings.py` file](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/54e89c41-b456-4bbb-a129-ac3e92a09a6d.png)

Let's unpack what each section does.

The `DEFAULT_AUTHENTICATION_CLASSES` setting tells DRF to use JWT as the authentication method for all API endpoints. Every incoming request will be checked for a valid JWT token in the Authorization header.

The `DEFAULT_PERMISSION_CLASSES` setting sets `IsAuthenticated` as the global permission policy. This means every endpoint in your API is locked down by default. Only users with a valid token can access any endpoint.

This is a secure-by-default approach: instead of remembering to protect each view individually, everything is protected, and you explicitly open up the endpoints that need to be public *(like the registration endpoint, which you'll handle in the next step).*

The `SIMPLE_JWT` dictionary controls token behavior. The access token lasts 30 minutes. This is the token clients include in every request. If someone intercepts it, the damage is limited to a 30-minute window. The refresh token lasts one day.

When the access token expires, the client can use the refresh token to get a new access token without forcing the user to log in again. The duration of the refresh token is 1 day. This means after 1 day, the user must log in again with their username and password. You'll see exactly how this works later when you test with Postman.

### 5.2 How to Add Token URL Endpoints

SimpleJWT provides ready-made views for obtaining and refreshing tokens. You just need to wire them up to URLs.

Open <VPIcon icon="fas fa-folder-open"/>`notes_core/`<VPIcon icon="fa-brands fa-python"/>`urls.py` and update it with the following code:

```py title="notes_core/urls.py"
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notes.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

The `token/` endpoint accepts a username and password, and returns an access token and a refresh token.

The `token/refresh/` endpoint accepts a refresh token and returns a new access token. You'll see these in action during testing.

---

## Step 6: How to Build the Authentication Logic

Open <VPIcon icon="fas fa-folder-open"/>`notes/views.py` and add the following:

```py
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
```

Now let's walk through this code.

The first section are the imports and after that we have used the the `get_user_model()` method to get the `CustomUser` model.

Now the main part is `RegisterView` class. The class inherits from `generics.CreateAPIView` which is a built in DRF view designed specifically for handling POST requests that create new objects.

Because of this, you don’t have to manually write the logic for handling POST requests, validating data, or saving to the database. DRF does all of that for you behind the scenes.

Inside the class, `queryset = Users.objects.all()` defines the set of user objects this view can work with.

The `serializer_class = UserSerializer` tells the view which serializer to use for validating incoming data and creating the user.

Finally `permission_classes = [permissions.AllowAny]` overrides the global `IsAuthenticated` permission you set earlier in the value of `DEFAULT_PERMISSION_CLASSES` .

This means that anyone can access the registration endpoint, even if they aren't logged in. This makes sense for a registration endpoint because new users won’t have accounts yet.

Every other view in your API will inherit the global IsAuthenticated permission, so only this registration endpoint is open.

---

## Step 7: How to Implement Scoped Views

This is the heart of the tutorial. You've set up authentication so the API knows **who** is making a request. Now you need to make sure each user can only interact with **their** **own** notes.

Think of it this way: authentication is the lock on the front door of an apartment building. It keeps strangers out. But scoping is the lock on each individual apartment. Just because you live in the building doesn't mean you can walk into your neighbor's apartment.

Without scoping, an authenticated user could potentially see every note in the database, or worse, modify notes that belong to someone else. Two method overrides on your viewset prevent this entirely.

![The image represents the differences of access resources with and without scoping](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/03747660-068c-4757-9fc2-d2a122f22f5f.png)

### 7.1 How to Create a NoteViewSet

Now let's create the `NoteViewSet`. First add these imports to the top of the file. We're importing the viewsets, serializers, and model.

```py
from .models import Note
from .serializers import UserSerializer, NoteSerializer
from rest_framework import generics, viewsets, permissions
```

Add the following to <VPIcon icon="fas fa-folder-open"/>`notes/views.py`, below the RegisterView:

```py
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer

    def get_queryset(self):
        return Notes.objects.filter(owner=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
```

Now let's talk about this code in detail.

You've created a new class called `NoteViewSet` which inherits from the DRF class `ModelViewSet`. This gives you full CRUD operations, meaning you can list notes and retrieve a single note, as well as create, update, and delete a note.

![The image shows the Model Viewset being imported](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/25999ad8-3534-424a-ab35-cad9cecec8ef.png)

The next part `serializer_class = NoteSerializer` tells Django to use the `NoteSerializer` class to convert between Python objects and JSON.

But the magic is the two methods that you are overriding: `get_queryset()` and `perform_create()`.

The `get_queryset()` method controls which notes the API returns. If you didn't override this method, it would return `Note.objects.all()` (which would give every user access to every note in the database).

But here, you've overridden this method so that it filters notes by the current user.

Next is the `perform_create()` method, which is called when the note is saved. You've overridden this method so that it saves the notes of the user who's currently logged in. If you hadn't overridden the this method, it would return all the notes regardless of the logged in user.

Notice that you have passed `self.request.user` parameters in to the `filter()` function. This is the code that attaches the logged-in user as the owner of the note.

Remember how you made the owner field read-only in the serializer? This is the other half of that security measure.

![](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/6db94c2f-673f-480a-bf20-730ed4af4bdb.png)

The user can't set the owner through the API request, and the server automatically sets it to whoever is authenticated. These two pieces work together to make ownership tamper-proof.

### 7.2 Why This Matters: Preventing ID Enumeration Attacks

Without get_queryset filtering, your API might allow something like this: a user sends a GET request to `/api/notes/42/` and sees a note that belongs to someone else, simply because they guessed the ID.

This is called an **ID enumeration attack** — an attacker cycles through IDs (1, 2, 3, 4...) to discover and access other people's data.

With your scoped `get_queryset`, even if User B sends a request to `/api/notes/42/` and note 42 belongs to User A, the viewset won't find it in User B's filtered queryset. DRF will return a 404 — as far as User B is concerned, that note doesn't exist.

---

## Step 8: How to Connect a URL

Now you need to wire up the views to URL paths so the API knows which view to call for each endpoint.

### 8.1 How to Create App-level URLs

Create a new file called <VPIcon icon="fas fa-folder-open"/>`notes/`<VPIcon icon="fa-brands fa-python"/>`urls.py` and add the following:

```py title="notes/urls.py"
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, NoteViewSet

router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('', include(router.urls)),
]
```

The `DefaultRouter` automatically generates URL patterns for the NoteViewSet. Since you're using a `ModelViewSet`, the router creates endpoints for listing all notes, creating a note, retrieving a single note, updating a note, and deleting a note — **all from that single router.register call.**

The `basename='note'` parameter is required here because your viewset doesn't have a queryset attribute defined directly on the class *(you're using get_queryset instead)*. DRF uses the `basename` to generate the URL pattern names like `note-list` and `note-detail`.

### 8.2 How to Verify the Project-Level URLs

Make sure your <VPIcon icon="fas fa-folder-open"/>`notes_core/`<VPIcon icon="fa-brands fa-python"/>`urls.py` looks like this (you set this up in Step 5, but let's confirm):

```py title="notes_core/urls.py"
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notes.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

Here's the full picture of your API's URL structure:

| **Endpoint** | **Method** | **Description** |
| --- | --- | --- |
| `api/register/` | **POST** | Create a new user account |
| `api/token/` | **POST** | Get access and refresh tokens |
| `api/token/refresh/` | **POST** | Get a new access token using a refresh token |
| `api/notes/` | **GET** | List all notes for the authenticated user |
| `api/notes/` | **POST** | Create a new note |
| `api/notes/<id>/` | **GET** | Retrieve a specific note |
| `api/notes/<id>/` | **PUT/PATCH** | Update a specific note |
| `api/notes/<id>/` | **DELETE** | Delete a specific note |

Start the development server to make sure everything runs without errors:

```sh
python manage.py runserver
```

If the server starts without complaints, your code is wired up correctly.

---

## Step 9: How to Test the APIs with Postman

Building the API is one thing. Proving it works is another. Let's walk through the entire flow using Postman, from registering a user to demonstrating that scoping actually works.

If you haven't used Postman before, it's a tool that lets you send HTTP requests to your API and inspect the responses. You can download it from [<VPIcon icon="iconfont icon-postman"/>postman.com/downloads](https://postman.com/downloads/).

![Postman software download page](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/cc154f8b-d3db-4c48-b884-1dbd3d517209.png)

Alternatively, you can use curl from the command line or any other API testing tool you're comfortable with.

Make sure your development server is running before proceeding.

![python server running](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/90524445-9d7c-43d0-bcf7-105f54626d85.png)

### 9.1 How to Register a User

Open Postman:

![opening Postman](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/8951a205-ee01-4646-8e0b-d1d16d21c749.png)

Create a new request:

| Method | POST |
| --- | --- |
| **URL** | `http://127.0.0.1:8000/api/register/` |
| **Body tab** | Select "raw" and choose "JSON" from the dropdown |
| **Body Content** | `{ "username": "priya", "email": "priya@example.com", "password": "securepassword123" }` |

![postman UI for registering a new user](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/f043164f-184c-4f29-8a9f-55f604d521fb.png)

Click **Send**. You should get a `201 Created` response with the user data **(without the password**, thanks to your `write_only=True` field) which you wrote in the `UserSerializer` class.

![response of registering a user](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/021a79db-418f-4057-97f8-f3c5c4b9761c.png)

![The image describes the codes of the User serializer classs](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/c8fd6b4e-f539-4f16-85c8-72515abadf8f.png)

### 9.2 How to Obtain Access and Refresh Tokens

Now log in to get your JWTs:

| Method | POST |
| --- | --- |
| **URL** | `http://127.0.0.1:8000/api/token/` |
| **Body** | {"username" : "priya", "password" : "securepassword123"} |

You'll get a response with access and refresh tokens.

**Copy the access token.** You'll need it for every subsequent request. Also save the refresh token, as you'll use it later.

![The image shows the api returning access and refresh token](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e5667e26-b11a-463e-85d4-ba99082bee21.png)

A JWT is only encoded and not encrypted. The encoding is merely a way to transform the data into a safe, standard string format that can be easily transmitted over the internet.

Any one can peel through the encoding to see the data. This is done using base64url encoding.

We can use the Python library `pyjwt` to decode JWTs or use any of the online sites to decode. It's important to note that you should use online sites with caution since JWTs may contain sensitive information.

For this demo, we'll use site called [<VPIcon icon="iconfont icon-jwt"/>jwt.io](https://jwt.io).

Open the site and paste in the access token that you have just created:

![The image describes the various sections after decoding the JWT token](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/f8b9f3e0-db1e-49fb-82be-2b4d27adc8bd.png)

The JWT has three parts: the header, the payload, and the signature.

The header sections tells you how the header is signed. In this case it is signed using the **HS256** algorithm.

The payload is where the actual data or claim lives. It contains standard claims such as token types, expiration time ( `exp` ), issued at time ( `iat` ), and custom claims.

The signature section is used to verify integrity. You **can't decode it to meaningful data.** This section ensures that the token wasn't tampered with.

### 9.3 How to Create a Note

Now use the access token to create a note:

| Method | POST |
| --- | --- |
| **URL** | `http://127.0.0.1:8000/api/notes/` |
| **Header tab:** | Add a new header: |
| Key: Authorization, Value: Bearer |  |
| **Body** | {'title': 'My note', 'body': 'This contains secret information'} |

![The image shows adding new header into postman](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/d04e2bfb-edc6-4c12-ac93-65611ed0d805.png)

Notice that you don't include an owner field. That's handled automatically by perform_create. You should get a `201 Created response`:

![The image shows the output (response) after creating a note](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/19a8b564-4d49-4dc1-823c-d7d96fcb5319.png)

You can create a few more notes, so that we have some data to work with.

### 9.4 How to List Your Notes

Now to fetch all of Priya's notes:

| Method | GET |
| --- | --- |
| **URL** | `http://127.0.0.1:8000/api/notes/` |
| **Header tab:** | Same Authorization: Bearer header |

You should see all the notes created, sorted by most recent first.

![The image shows the response of getting list of notes](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/8b7107e6-44ef-465c-b1aa-076ec9de1979.png)

### 9.5 How to Demonstrate Scoping

Let's prove that a second user can't view the first user's notes.

First, register the second user.

Send a POST request to `http://127.0.0.1/api/register` with the following data:

| Method | POST |
| --- | --- |
| **URL** | `http://127.0.0.1:8000/api/register/` |
| **Body tab** | Select "raw" and choose "JSON" from the dropdown |
| **Body Content** | `{ "username": "sujan", "email": "sujan@example.com", "password": "anotherpassword123" }` |

![The image shows a new user being created](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/094af273-4220-416a-9c8f-f33079badf83.png)

Then get tokens for Sujan by sending a POST request to `http://127.0.0.1:8000/api/token/` with Sujan's credentials (username and password) and then copy Sujan's access token.

![](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/8fe22f1b-f36e-4b35-a478-1b48ea0218c3.png)

Now send a GET request to `http://127.0.0.1:8000/api/notes/` using Sujan's token in the Authorization header.

The response should be an empty list since this user hasn't created any notes:

![The image shows the response of the get query new user's access token](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/ef8e17d0-4f8f-4a51-8bfd-01c078247075.png)

More importantly, Priya's notes are completely invisible to him. Even if Sujan tries to access a specific note by ID – say, `http://127.0.0.1:8000/api/notes/1/` – he'll get a `404 Not Found` response, not a `403 Forbidden`.

This is intentional. A `404 Not Found` doesn't reveal that the note exists, while a `403 Forbidden` would confirm its existence to a potential attacker.

A `403 Forbidden` response is like a door with a sign: *“Authorized personnel only”.* You now know something important is inside. A `404 Not Found` response is like a blank wall. You don’t even know a room exists.

![The image shows the difference between a 403 and 404 response code](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/a4619fbb-42ce-4f80-9207-31eb81336c7c.png)

Now that you know why we've used the `404` response instead of `403`, let's demonstrate this.

First, I'll access Priya's individual note using her credentials and her access token:

![The image shows the result of accessing individual note using the first user (Priya)](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e68e33cc-93a4-4eb5-99fe-934b283defeb.png)

Now, I'll change the access token and put Sujan's (new user) access token:

![The image shows the response of accessing the second note using the new user's (sujan) credentials](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/e5a6d07c-a7f0-4a50-ba05-94cc5159489c.png)

You can see that using the new user's token to access the previous user's note leads to `404 Not Found` response.

---

## Step 10: How to Handle Token Expiration with Refresh Tokens

Access tokens are deliberately short-lived (30 minutes in your configuration). This limits the window of damage if a token is stolen.

![](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/b86f4f24-b8b0-45d0-bcee-5e39e2268e21.png)

But you don't want users to re-enter their credentials every 30 minutes. That's what refresh tokens are for.

When Priya's access token expires, her API requests will start returning `401 Unauthorized` responses. Instead of logging in again, the client sends the refresh token to get a fresh access token.

| Method | POST |
| --- | --- |
| **URL** | `http://127.0.0.1:8000/api/token/refresh/` |
| **Body tab** | Select "raw" and choose "JSON" from the dropdown |
| **Body Content** | `{ refresh: < Priya's refresh token >}` |

![The image shows the response of getting a new access token using a refresh token](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/67d255ac-8696-45e6-be17-c80b2a6e8af0.png)

Replace your old access token with this new one, and you're good for another 30 minutes. The refresh token itself lasts for one day, so the user only needs to fully log in again once every 24 hours.

In a real application, the frontend client handles this automatically. When an API call returns a `401`, the client catches it, sends the refresh token to get a new access token, and retries the original request — all without the user noticing.

Here's what that flow looks like in pseudocode:

1. Client sends request with access token
2. Server responds with 401 (token expired)
3. Client sends refresh token to /api/token/refresh/
4. Server responds with a new access token
5. Client retries the original request with the new access token
6. Server responds with the data

![The image show the steps to get a new token after a previous one has expired](https://cdn.hashnode.com/uploads/covers/69bdd408475ca17974459537/f0fd3fd8-842b-4de3-8f5b-2f1d4ad2181f.png)

If the refresh token itself has expired (after 24 hours in your configuration), step 4 will also return a `401`. At that point, the user truly needs to log in again with their username and password. This is the intended behavior: it means even a stolen refresh token has a limited useful life.

---

## How You Can Improve This Project

This API is functional and secure, but there's plenty of room to build on it. Here are some directions you could take.

1. **Add search and filtering.** Let users search their notes by title or body text. You can use DRF's SearchFilter and django-filter to add query parameters like `?search=meeting` to the notes list endpoint.
2. **Add categories or tags.** Create a `Category` model and add a **foreign key** to `Note`, or use a many-to-many relationship for tags. This would let users organize their notes and filter by category.
3. **Add pagination.** Once a user has hundreds of notes, returning them all in a single response becomes slow. DRF has built-in pagination classes that let you return notes in pages of 10, 20, or whatever size you choose.
4. **Deploy to a production server.** The API currently runs on your local machine. You could deploy it to platforms like PythonAnywhere, Railway, or Render to make it accessible from anywhere. You'd need to configure a production database (like PostgreSQL), set a secure SECRET_KEY, and serve the application behind HTTPS.
5. **Build a frontend.** Connect a React, Next.js, or Vue.js frontend to this API. Store the JWTs in the client and implement the token refresh flow so users stay logged in seamlessly.
6. **Add token blacklisting.** SimpleJWT supports token blacklisting, which lets you invalidate refresh tokens when a user logs out. Without this, a refresh token remains valid until it expires, even after the user "logs out."

Each of these improvements builds on the patterns you've already learned and will deepen your understanding of Django, DRF, and API design.

---

## Conclusion

You've built a fully functional, secure note-taking API with Django, Django REST Framework, and SimpleJWT. Along the way, you learned some fundamental concepts that apply to any API you'll build in the future.

You started with a custom user model — a small decision at the beginning that saves you from a painful migration later. You configured JWT authentication so your API can serve mobile clients and decoupled frontends that can't rely on session cookies.

You built serializers that protect sensitive data by keeping passwords write-only and ownership read-only. Most importantly, you implemented scoped views that ensure each user's data is completely isolated from everyone else's.

The patterns you practiced here — overriding `get_queryset` to filter by the current user, overriding `perform_create` to assign ownership automatically, and using `read-only` fields to prevent data tampering — are the same patterns you'll use in production APIs handling real user data.

The best way to solidify what you've learned is to keep building. Try adding search and filtering, build a React frontend that consumes this API, or start a completely new project may be a task manager, a journal app, or a bookmarks API using the same JWT and scoping patterns. The core workflow stays the same. Only the models and business logic change.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Scoped Note-Taking API with Django Rest Framework and SimpleJWT",
  "desc": "If you've built a Django API and you're wondering how to add authentication so that each user can only access their own data, you're in the right place. Most Django tutorials teach you session-based a",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-scoped-note-taking-api-with-django-rest-framework-and-simplejwt.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
