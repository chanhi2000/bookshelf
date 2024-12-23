---
lang: en-US
title: "Using React with Django to create an app: Tutorial"
description: "Article(s) > Using React with Django to create an app: Tutorial"
icon: iconfont icon-django
category:
  - Python
  - Django
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - python
  - py
  - django
  - py-django
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using React with Django to create an app: Tutorial"
    - property: og:description
      content: "Using React with Django to create an app: Tutorial"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-react-django-create-app-tutorial.html
prev: /programming/py-django/articles/README.md
date: 2022-07-15
isOriginal: false
author: Diogo Souza
cover: /assets/image/blog.logrocket.com/using-react-django-create-app-tutorial/banner.png
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
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Using React with Django to create an app: Tutorial"
  desc="Learn how to integrate React with Django, create a simple CRUD API with the Django REST framework free from common CORS issues, and more."
  url="https://blog.logrocket.com/using-react-django-create-app-tutorial"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-react-django-create-app-tutorial/banner.png"/>

::: note Editor's note

This post was updated on 15 July 2022 to reflect the most recent versions of React and Django, as well as to add information about how to send data between React and Django.

:::

[<FontIcon icon="iconfont icon-django"/>Django](https://djangoproject.com/) is one of the most complete web development frameworks available. It’s fast, secure, and scalable. With the power of Python, we can get an application up and running in just about no time. It manages everything, from the database to the final HTML sent to the client.

However, with the advent of single-page applications (SPAs), it’s become increasingly common to create applications that use Django only to provide an API that responds to JSON data consumed by applications developed in the most varied JavaScript frameworks.

This architecture, which separates the frontend from the backend, allows a better decoupling of both interfaces so that teams can develop in their respective domains completely independently.

It also enables multiple client apps to interact with the same API, while ensuring data integrity and business rules, and a variety of user interfaces.

On the other hand, two different projects generate even more work: two separate deployments, two environments to configure, etc. One way to simplify this is to use Django’s own capabilities to serve static files. After all, the frontend is nothing more than a set of files of this type.

In this article, we’ll outline how to create a simple CRUD API with Django and its famous Django REST framework free from common Cross-Origin Resource Sharing (CORS) issues. We’ll also learn how to integrate Django with a React app.

---

## How do we send data from Django to React?

You can expose your API in different ways with Django. You can use a REST API, a [<FontIcon icon="iconfont icon-graphql"/>GraphQL API](https://docs.graphene-python.org/projects/django/en/latest/), or [<FontIcon icon="iconfont icon-django"/>RPC API](https://djangogrpcframework.readthedocs.io/en/latest/), each with [<FontIcon icon="fas fa-globe"/>their own pros and cons](https://main.grokoverflow.com/posts/2022/02-understanding-rpc-node-walkthrough). While [<FontIcon icon="iconfont icon-graphql"/>GraphQL](https://graphql.org/) is a safe bet, we’re going to use traditional REST endpoints.

![By the end of this tutorial, this will be our final output](/assets/image/blog.logrocket.com/using-react-django-create-app-tutorial/final-visualization.png)

---

## Setting up Python and Django

For this article, we’re not going to cover how to install basic tools, so make sure you review this list of what you need to have set up in your machine before you can follow this article:

- [<FontIcon icon="fa-brands fa-python"/>Python 3](https://python.org/download/releases/3.0/)
- [<FontIcon icon="fa-brands fa-python"/>Pip](https://pypi.org/project/pip/) (the default Python package installer)
- [<FontIcon icon="fa-brands fa-node"/>NodeJS](https://nodejs.org/en/) (in a version 6 or plus) and [<FontIcon icon="fa-brands fa-npm"/>npm](https://npmjs.com/) (5.2+)

If you’re using Linux, chances are that Python is already installed. Run the `python3 -V` command to check.

In certain environments, you may have have Python 2 and Python 3 installed. In this case, you should use `python3` instead of `python` when running commands. You can [avoid this by installing PyEnv (<FontIcon icon="iconfont icon-github"/>`pyenv/pyenv`)](https://github.com/pyenv/pyenv) to be able to switch which version of Python the `python` command uses.

In the article, we’ll also make use of a [<FontIcon icon="fa-brands fa-python"/>handy Python feature called](https://docs.python.org/3/tutorial/venv.html) [<FontIcon icon="fa-brands fa-python"/>`venv`](https://docs.python.org/3/tutorial/venv.html), also known as Python Virtual Environment. This feature basically allows developers to create a folder that’ll act exactly like a specific Python environment.

### Setting up Python

Open your preferred IDE to an empty directory and follow along as we begin. Remember to always [<FontIcon icon="fa-brands fa-stack-overflow"/>give your directory a good name](https://stackoverflow.com/questions/52827722/folder-naming-convention-for-python-projects).

Let’s run the command inside this folder to create our <FontIcon icon="fa-brands fa-python"/>`venv`:

```sh
python -m venv logrocket_env
```

After you enter the created folder, you’ll see some other files, such as `bin`, `lib`, and `share`. These files guarantee you are in an isolated context of Python configuration. To make use of the `bin` file, you have to make sure it’s activated:

```sh
source ./logrocket_env/bin/activate
```

Then your command line will look like the example below, with the name in parentheses confirming that you’re in the <FontIcon icon="fa-brands fa-python"/>`venv`:

```sh
# (logrocket_env) username@localhost: _
```

Note that once you are inside the <FontIcon icon="fa-brands fa-python"/>`venv`, you can use the commands `pip` or `python` normally. If you are outside the <FontIcon icon="fa-brands fa-python"/>`venv`, you must use `pip3` and `python3`.

That’s it. You’re good to go with your venv.

### Setting up Django

Next, let’s [<FontIcon icon="iconfont icon-django"/>start installing Django](https://djangoproject.com/) by running the following command inside of your <FontIcon icon="fa-brands fa-python"/>`venv`:

```sh
pip install django djangorestframework django-cors-headers
```

::: note

We’re installing two more dependencies for our API:

- [<FontIcon icon="iconfont icon-django"/>Django REST Framework](https://django-rest-framework.org/): a powerful and flexible toolkit for building Web APIs
- [<FontIcon icon="iconfont icon-github"/>`adamchainz/django-cors-headers`](https://github.com/adamchainz/django-cors-headers): an app for handling the server headers required for CORS

These dependencies are useful for when we try to access the API from a different application.

:::

In this case, they help to connect Django and React.

We’ll also make use of two other Django features designed to help us with boilerplate configs: [<FontIcon icon="iconfont icon-django"/>`django-admin` and <FontIcon icon="iconfont icon-django"/>`manage.py`](https://docs.djangoproject.com/en/4.0/ref/django-admin/)`.

`django-admin` is Django’s automatic admin interface. It’s basically a command-line utility to perform handy operations with Django.

<FontIcon icon="iconfont icon-django"/>`manage.py` is a script that will help us manage our database, create tables from our models, handle migration and versioning, and properly create our projects.

Now, we’ll run the following command to create our API project — remember that you must be inside the <FontIcon icon="fa-brands fa-python"/>`venv`:

```sh
django-admin startproject django_react_proj
```

After the project is created, check the root folder for the <FontIcon icon="iconfont icon-django"/>`manage.py` file we mentioned earlier. We’ll explore the rest of the files further.

Let’s start our Django configuration using the <FontIcon icon="iconfont icon-django"/>`settings.py` file inside the <FontIcon icon="fas fa-folder-open"/>`django_react_proj/` folder. When you open this file, you’ll see a lot of configs. `INSTALLED_APPS` is the one that matters to us.

Add the following three lines to the array:

```py title="settings.py"
INSTALLED_APPS = [
    ...
    'rest_framework',
    'corsheaders',
    'students' 
]
```

These three lines are the dependencies we’ve previously installed, along with the name of our to-be-created API folder.

Now, add the following into the `MIDDLEWARE` array:

```py title="settings.py"
MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware', 
]
```

These correspond to a filter that will intercept all of our application’s requests and apply CORS logic to them.

However, since we’re working full `localhost`, we’ll disable the CORS feature by adding the following to the same file:

```py title="settings.py"
CORS_ORIGIN_ALLOW_ALL = True
```

Great! Now, let’s move on to the models and views of our application.

---

## Adding models and views to Django

In order to create some preset files, we’ll make use of the <FontIcon icon="iconfont icon-django"/>`manage.py` script once again. This time, run the following:

```sh
django-admin startapp students
```

After that, a <FontIcon icon="fas fa-folder-open"/>`students/` folder will be created, along with <FontIcon icon="fa-brands fa-python"/>`models.py` and <FontIcon icon="fa-brands fa-python"/>`views.py`. Initially, these files will have little to no content inside.

Let’s start by removing everything currently in the <FontIcon icon="fa-brands fa-python"/>`models.py` file and adding our models instead:

```py :collapsed-lines title="models.py"
from django.db import models

class Student(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    document = models.CharField("Document", max_length=20)
    phone = models.CharField(max_length=20)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)
    
    def __str__(self):
        return self.name
```

Notice that our `Student` class extends from [<FontIcon icon="iconfont icon-django"/>Django’s](https://docs.djangoproject.com/en/3.0/ref/models/instances/#django.db.models.Model) [<FontIcon icon="iconfont icon-django"/>`Model` class](https://docs.djangoproject.com/en/3.0/ref/models/instances/#django.db.models.Model). This will make our lives easier once it connects directly to the Django models framework, which we’ll use to create our database tables.

It’s also important to set all the fields with the proper types and configurations, including `max length` if it’s required, `description`, `autocreation`, etc.

---

## Migrating our Django models to the database

Now, let’s export our models to the database through [**Django’s migrations feature**](/blog.logrocket.com/making-django-migrations-python.md).

Migrations are Django’s way of propagating changes you make to your models — such as adding a field or deleting a model — into your database schema.

They’re designed to be mostly automatic, but you’ll need to know when to make migrations, when to run them, and what common problems you may run into.

Go to the root of the application and run the following:

```sh
python manage.py makemigrations
```

You’ll see the name and location of the file created for versioning these changes. Then, we need to apply the changes to the database itself:

```sh
python manage.py migrate
```

The next step consists of creating what we call a data migration file. It represents the direct manipulation of data into the database. To create this file, run the following command:

```sh
python manage.py makemigrations --empty --name students students
```

Note that the versioning is made upon numbers by the end of the file to maintain the order.

After that, go to the <FontIcon icon="fas fa-folder-open"/>`django_react_proj/students/migrations/` folder and change the content to the following:

```py
from django.db import migrations

def create_data(apps, schema_editor):
    Student = apps.get_model('students', 'Student')
    Student(name="Joe Silver", email="joe@email.com", document="22342342", phone="00000000").save()

class Migration(migrations.Migration):
    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data), 
    ]
```

In short, the `create_data` method recovers the `Student` model object and creates initial data, just so that our database isn’t empty when the API starts.

The `dependencies` property relates the other files to be considered into the migration process.

The `operations` are basically the actions Django has to perform once the migration is triggered.

Now we’re ready to run the migrate command again. In the <FontIcon icon="fas fa-folder-open"/>`django_react_proj/` folder, run:

```sh
python manage.py migrate
```

---

## Diving into our Django REST API

Now it’s time to dive into the REST API that we’re going to [**build on top of Django REST framework**](/blog.logrocket.com/django-rest-framework-create-api.md). Here, you’ll get in touch with two main worlds: views and URLs. A view is the initial entrypoint of a request made upon a specific endpoint served by a URL.

This is all mapped by the Django REST framework once we connect the function itself to the endpoint. We’ll also [<FontIcon icon="iconfont icon-django"/>make use of serializers](http://django-rest-framework.org/api-guide/serializers/).

They allow [**complex data, such as `QuerySets`**](/blog.logrocket.com/querysets-and-aggregations-in-django.md) and model instances, to be converted to native Python datatypes that can then be easily rendered into JSON. Let’s start there.

Create a new file <FontIcon icon="fa-brands fa-python"/>`serializers.py` into the `students/` folder and add the following content:

```py title="students/serializers.py"
from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Student
        fields = ('pk', 'name', 'email', 'document', 'phone', 'registrationDate')
```

The `Meta` class is important here because it defines the metadata information that our model has (database) and that must be converted to the `Student` class.

Next, let’s open the <FontIcon icon="fa-brands fa-python"/>`urls.py` file located in the <FontIcon icon="fas fa-folder-open"/>`django_react_proj/` folder and change its content to the following:

```py title="urls.py"
from django.contrib import admin
from django.urls import path, re_path
from students import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/students/$', views.students_list),
    re_path(r'^api/students/([0-9])$', views.students_detail), 
]
```

The `admin` path was already there. The only things we added are the `students` endpoints. Note that each of them is connected to a to-be-created view function, so this is the place where we route our requests.

The first endpoint will handle both creations (`POST`) and listing (`GET`). The second one will remove (`DELETE`) or update (`PUT`) the data of a single student. Simple, right?

Now, let’s go to the views. Open up the <FontIcon icon="fas fa-folder-open"/>`students/`<FontIcon icon="fa-brands fa-python"/>`views.py` file and copy in the following code:

```py :collapsed-lines title="students/views.py"
from rest_framework.response import Response 
from rest_framework.decorators import api_view 
from rest_framework import status 
from .models import Student 
from .serializers import * 

@api_view(['GET', 'POST']) 
def students_list(request):
    if request.method == 'GET': 
        data = Student.objects.all() 
        serializer = StudentSerializer(data, context={'request': request}, many=True) 
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = StudentSerializer(data=request.data) 
        if serializer.is_valid():
            serializer.save() 
            return Response(status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def students_detail(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

The first method, `students_list`, is handling both `GET` and `POST` operations over the root endpoint of our API.

This means every time we make a request over `http://localhost:8000/api/students` with `GET` and `POST` HTTP verbs, we’ll execute this method.

The first thing is to get all the students from our model through the `Student` object. It provides an implicit object called `object` with a method to access the entire database: `all()`.

Then, we pass the result to our serializer, which will take care of the converting process before we return it as a response.

For the `POST` method, note that we’re first calling the `is_valid()` method on the serializer to ensure that the data received is conformed with our model. Otherwise, the serializer would throw an exception here. If all is fine, we save it to the datastore.

The next `PUT` and `DELETE` operations are pretty much the same, changing only the HTTP verbs and the responses.

That’s it!

---

## Testing our endpoints in Django

Now, let’s run our Django application in order to test these endpoints. Run the following command into the root folder:

python manage.py runserver

After you see the log showing our server is up and running, go to the browser and access `http://localhost:8000/api/students/`. You’ll see something like this:

![Student List Shown At Localhost 8000 While Testing Django Endpoints](/assets/image/blog.logrocket.com/using-react-django-create-app-tutorial/testing-endpoints-django-student-list.png)

What you see here is [<FontIcon icon="iconfont icon-django"/>Django’s Browsable API](https://django-rest-framework.org/topics/browsable-api/), a human-friendly HTML output that allows for easy browsing of resources, as well as forms for submitting data to the resources. It’s very handy for testing your endpoints easily without having to make use of `cURL` or other UI tools.

You can also use the other HTTP methods through the form in the bottom of the image. Go ahead and play around with it.

---

## Building the React app

Now it’s frontend time.

It’s important to note that we’re not going to dive into React details here, so take some time to [<FontIcon icon="fas fa-globe"/>read up on React](https://blog.logrocket.com/tag/react/) if you’re a beginner. The focus of this tutorial is to show you how to consume a Django API quickly from a React app.

In this article, we’ll use the latest version of React. However, feel free to use whichever version you prefer. We also won’t discuss [**the use of React Hooks**](/blog.logrocket.com/react-hooks-the-good-the-bad-and-the-ugly.md) or other side features of React, since the purpose is [**the API consumption itself**](/blog.logrocket.com/modern-api-data-fetching-methods-react.md).

Once you have Node and npm installed, let’s run the following command in the root folder of our Django project to create our React app:

```sh
npx create-react-app students-fe
```

If you don’t know `create-react-app`, [**read through a quick setup guide**](/blog.logrocket.com/create-react-app-a-quick-setup-guide-b812f0aad03c.md) for some help getting started.

### CRUD React components

![We’ll divide our front end in some smaller components, as seen in the following figure](/assets/image/blog.logrocket.com/using-react-django-create-app-tutorial/frontend-components-header-home.png)

The header component will store the header information, logo, etc.

The home component will be our main container, storing the rest of the other components, such as the listing of the students in a table.

We’ll also have two more components for the forms. The “update” and “add” forms will have pretty much the same components and will be placed in modals. Having both functions depends on which modal is active now.

![Popup Modal Titled Creating New Student With Blank Fields For Name, Email, Document, And Phone, And Send Button](/assets/image/blog.logrocket.com/using-react-django-create-app-tutorial/creating-new-student-modal.png)

### Setting up our React app to integrate with Django

Let’s go right to it. We’ll [**use Bootstrap with React for styling**](/blog.logrocket.com/using-bootstrap-with-react-tutorial-with-examples.md) with the powerful `reactstrap` package. We’ll also use the promise-based HTTP client [**Axios to make HTTP request calls**](/blog.logrocket.com/http-requests-axios.md) to our Django API.

First, we’ll add some important dependencies to our `students-fe` project, so `cd` into the project and run the following command:

```sh
npm install bootstrap reactstrap axios --save
```

Next, go to the <FontIcon icon="fas fa-folder-open"/>`src/`<FontIcon icon="fa-brands fa-js"/>`index.js` file and add the following import statement:

```js title="src/index.js"
import "bootstrap/dist/css/bootstrap.min.css";
```

In your <FontIcon icon="fas fa-folder-open"/>`src/` folder, create another folder called <FontIcon icon="fas fa-folder-open"/>`constants`, and then a file <FontIcon icon="fa-brands fa-js"/>`index.js`. This file will store the utility constants of our React project. Add a single constant to hold the URL of our API:

```js title="src/contants/index.js"
export const API_URL = "http://localhost:8000/api/students/";
```

Then, let’s begin creating our components, starting with the header.

### Working on the header component

Create another folder called <FontIcon icon="fas fa-folder-open"/>`components` and, within it, a JavaScript file called <FontIcon icon="fa-brands fa-react"/>`Header.js`. Add the following content:

```jsx :collapsed-lines title="src/components/Header.js"
import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <div className= "text-center"> 
        <img
          src="https://logrocket-assets.io/img/logo.png"
          width="300"
          className="img-thumbnail"
          style={{ marginTop: "20px" }} 
        />
        <hr/>
        <h5>
          <i>presents</i>
        </h5>
        <h1>App with React + Django </h1>
      </div>
    );
  } 
}

export default Header;
```

This is pretty much static HTML represented under JSX. Nothing much of note here.

### Working on the Creating New Student form

Now, let’s change our strategy and build the next components from the innermost to the outermost ones. In the same <FontIcon icon="fas fa-folder-open"/>`components` folder, create a new file called `NewStudentForm.js` and add the following:

```jsx :collapsed-lines title="src/components/NewStudentForm.js"
import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewStudentForm extends React.Component {
  state = { pk: 0, name: "", email: "", document: "", phone: "" };
  
  componentDidMount() {
    if (this.props.student) {
      const { pk, name, document, email, phone } = this.props.student;
      this.setState({ pk, name, document, email, phone });
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value });
  };

  createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.pk, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit= { this.props.student ? this.editStudent : this.createStudent }> 
        <FormGroup>
          <Label for="name"> Name: </Label>
          <Input type="text"
            name="name" 
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup> 
          <Label for="email">Email:</Label>
          <Input type="email"
            name="email"
            onChange={ this.onChange }
            value={ this.defaultIfEmpty(this.state.email) } />
        </FormGroup>
        <FormGroup> 
          <Label for="document">Document:</Label>
          <Input type="text"
            name="document"
            onChange={ this.onChange }
            value={ this.defaultIfEmpty(this.state.document) } />
        </FormGroup>
        <FormGroup> 
          <Label for="phone">Phone:</Label>
          <Input type="text"
            name="phone"
            onChange={ this.onChange }
            value={ this.defaultIfEmpty(this.state.phone) } />
        </FormGroup>
        <Button>Send</Button> 
      </Form>
    );
  }
}

export default NewStudentForm;
```

Here, we have some important things going on.

In the first lines, we’re importing some `reactstrap` components for the first time, including `Form`, `Button`, and other components that will comprise our form.

Then, we created our `state` object with the corresponding properties of our `NewStudentForm` model. This is going to be useful for manipulating each prop individually.

The `componentDidMount` function will run after the component finishes its startup, so we can recover the student’s `props` from the parent component (`this.props`) here, and set the `state` with them (if they exist, for the editing scenario.)

The `onChange` function will handle the update of each `state`’s prop with the current value typed in each respective field.

The `createStudent` function will deal with the HTTP `POST` requests of our form. Every time we press the “submit” button, this function will be called, triggering the Axios `post()` function and passing the current `state` in the request’s `body.`

Once it’s completed, we’ll call two `props` functions: `resetState` to refresh the table, and `toggle` to close the modal. We’ll go over how to create these later on.

### Working on the modal to edit student information

The `editStudent` function works almost like the previous one, but by calling our `PUT` operation instead.

The `defaultIfEmpty` function was created as an auxiliary function that’ll check the current value of each field in order to determine if they’re going to be filled with the value of the `state` — in case any exists, for editing — or not, when creating a new student.

The `render` function will just compose our form with the help of `reactstrap` components. Note the `onSubmit` property, which checks for a `props` property called `student`. If the property exists, the submit function will be for editing (the value was passed by the parent component); otherwise, it’s for creation.

Next, we’ll turn our attention to the modal component that’ll contain the form we’ve just created. For this, create a new component file called `NewStudentModal.js` and add the code below:

```jsx :collapsed-lines title="src/components/NewStudentModel.js"
import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

import NewStudentForm from "./NewStudentForm";

class NewStudentModal extends Component {
  state = { modal: false };

  toggle = () => {
    this.setState(previous => ({ 
      modal: !previous.modal 
    }));
  };

  render() {
    const create = this.props.create;
    var title = "Editing Student";
    var button = <Button onClick={ this.toggle }>Edit</Button>;
    if (create) {
        title = "Creating New Student";
        button = (
          <Button
            color="primary"
            className="float-right"
            onClick={this.toggle}
            style={{ minWidth: "200px" }}
          > 
            Create New
          </Button>
        );
    }
    return (
      <Fragment>
        { button }
        <Modal isOpen = { this.state.modal } toggle = { this.toggle }>
          <ModalHeader toggle={ this.toggle }>{ title }</ModalHeader>
          <ModalBody>
            <NewStudentForm
              resetState={this.props.resetState}
              toggle={this.toggle}
              student={this.props.student}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default NewStudentModal;
```

This time, the only `state` prop we’re creating is the modal’s `state` in order to check whether it must be open or closed.

The `toggle` function (the one our form receives as a parameter) will switch the current modal’s value to the opposite every time it’s called.

In the `render` function, we’re first checking if a `create` boolean was passed as a parameter from the parent caller to decide if the button is for editing or creating. The buttons are created dynamically depending on what the parent said to us.

Then, the `Modal` component can be mounted upon these conditions further down. Pay attention to where we’re placing the `<NewStudentForm />` component we’ve just created.

### Creating the students listing

The `NewStudentModal` component will be placed into the <FontIcon icon="fa-brands fa-react"/>`StudentList.js` we’re going to create now:

```jsx :collapsed-lines title="src/components/StudentList.js"
import React, { Component } from "react";
import { Table } from "reactstrap";

import NewStudentModal from "./NewStudentModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";

class StudentList extends Component {
  render() {
    const students = this.props.students;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Document</th>
            <th>Phone</th>
            <th>Registration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!students || students.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr> ) : (
              students.map(student => (
                <tr key={student.pk}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.document}</td>
                  <td>{student.phone}</td>
                  <td>{student.registrationDate}</td>
                  <td align="center">
                    <NewStudentModal
                      create={false}
                      student={student}
                      resetState={this.props.resetState} 
                    />
                    &nbsp;&nbsp;
                    <ConfirmRemovalModal
                      pk={student.pk}
                      resetState={this.props.resetState}
                    />
                  </td>
                </tr>
              ));
            )
          }
        </tbody>
      </Table>
    );
  }
}

export default StudentList;
```

Here, the focus is explicitly the `students` listing and nothing else. Be careful not to mix different logic and rules that don’t belong here.

The heart of this component is the iteration over the `students` prop we’ll receive from the parent component (`Home`). The `map` function will take care of the iteration by providing a variable (`student`) for us to access each value.

Again, take a look at the `NewStudentModal` and `ConfirmRemovalModal`components, which are just placed under the last `<td>`.

The following is the content of the `ConfirmRemovalModal` component:

```jsx :collapsed-lines title="src/components/ConfirmRemovalModal.js"
import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class ConfirmRemovalModal extends Component { state = { modal: false };
  toggle = () => {
    this.setState(previous => ({ 
      modal: !previous.modal 
    }));
  };

  deleteStudent = pk => {
    axios.delete(API_URL + pk).then(() => {
      this.props.resetState();
      this.toggle();
    });
  };
  
  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really wanna delete the student?
          </ModalHeader>
          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button type="button" color="primary" onClick={() => this.deleteStudent(this.props.pk)}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default ConfirmRemovalModal;
```

This component is also very simple; it hosts the removal operation. We’ll call this one our `DELETE` endpoint.

Since it’s also a modal, we must have the state’s `modal` prop too, as well as the `toggle` function.  
The `deleteStudent` function will handle the HTTP call to delete the given student.

The rest of the code is very similar to what we’ve seen already.

### Working on the home component

Let’s build our `Home.js` component now. Create the file and add the following to it:

```jsx :collapsed-lines title="src/compoenent/Home.js"
import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import StudentList from "./StudentList";
import NewStudentModal from "./NewStudentModal";

import axios from "axios";

import { API_URL } from "../constants";

class Home extends Component {
  state = { students: [] };

  componentDidMount() { 
    this.resetState();
  };
  
  getStudents = () => {
    axios.get(API_URL).then(res => 
      this.setState({ students: res.data })
    );
  };

  resetState = () => {
    this.getStudents();
  };

  render() {
    return (
      <Container 
        style={{ marginTop: "20px" }}
      >
        <Row>
          <Col>
            <StudentList
              students={this.state.students}
              resetState={this.resetState}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewStudentModal
              create={true}
              resetState={this.resetState}
            />
          </Col>
        </Row>
      </Container>
    );
  };
}

export default Home;
```

Here, our `state` will host the array of `students` we’ll recover from the server.

The `resetState` function (which we called earlier) will just call `getStudents`, which in turn calls the `GET` endpoint in our API with the full list of students.

The rest of the listing refers to the use of `StudentList` and `NewStudentModal` components. Feel free to organize the exhibition of your components on your own.

Next comes the last step before we can test our app. Import the `Header` and `Home` components to our `App.js` file:

```jsx title="src/App.js"
import React, { Component, Fragment } from "react";

import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Home />
      </Fragment>
    );
  }
} export default App;
```

Now, run the command `npm start` and your React app will open the browser to the [http://localhost:3000/](http://localhost:3000/) URL. Make sure to have your Django API up and running as well.

---

## Conclusion

You can [access the full source code of this project here (<FontIcon icon="iconfont icon-github"/>`diogosouza/django-react-logrocket`)](https://github.com/diogosouza/django-react-logrocket).

<SiteInfo
  name="diogosouza/django-react-logrocket"
  desc="A simple integration between Django API and React App"
  url="https://github.com/diogosouza/django-react-logrocket/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2c3e3d2ad971331e4b91c3062f6ddf09b54788992fc8ada1177d810dbf38a6f3/diogosouza/django-react-logrocket"/>

Of course, this is only one way of doing this. The good thing about using React is that you can organize your components (or even create more components out of the ones you have) in many different ways to achieve the same goal.

In the world of SPAs, your backend APIs are practically fully independent from the frontend clients. This gives you the flexibility to change the whole architecture of your API (like switching from Django to [Flask (<FontIcon icon="iconfont icon-github"/>`pallets/flask`)](https://github.com/pallets/flask), for example) without any side effects to your React apps.

<SiteInfo
  name="pallets/flask"
  desc="The Python micro framework for building web applications."
  url="https://github.com/pallets/flask/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/596892/cc2c69ec-9251-4b33-8283-b86a8659c9cb"/>

As a challenge, try to add a [**pagination system**](/blog.logrocket.com/4-ways-to-render-large-lists-in-react/) to your API/React app. The Django REST Framework provides support for [<FontIcon icon="iconfont icon-django"/>customizable pagination styles](https://django-rest-framework.org/api-guide/pagination/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using React with Django to create an app: Tutorial",
  "desc": "Learn how to integrate React with Django, create a simple CRUD API with the Django REST framework free from common CORS issues, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-react-django-create-app-tutorial.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
