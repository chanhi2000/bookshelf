---
lang: en-US
title: "How to Use Design Patterns in Java with Spring Boot - Explained with Code Examples"
description: "Article(s) > How to Use Design Patterns in Java with Spring Boot - Explained with Code Examples"
icon: iconfont icon-spring
category:
  - Java
  - Spring
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - spring
  - springframework
  - springboot
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Design Patterns in Java with Spring Boot - Explained with Code Examples"
    - property: og:description
      content: "How to Use Design Patterns in Java with Spring Boot - Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-use-design-patterns-in-java-with-spring-boot.html
prev: /programming/java-spring/articles/README.md
date: 2024-11-15
isOriginal: false
author: Birks Sachdev
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/1td5Iq5IvNc/upload/adaeb0229ea4ed1cd3c985d8eb92d23e.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Spring > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-spring/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Design Patterns in Java with Spring Boot - Explained with Code Examples"
  desc="As software projects grow, it becomes increasingly important to keep your code organized, maintainable, and scalable. This is where design patterns come into play. Design patterns provide proven, reusable solutions to common software design challenge..."
  url="https://freecodecamp.org/news/how-to-use-design-patterns-in-java-with-spring-boot"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/1td5Iq5IvNc/upload/adaeb0229ea4ed1cd3c985d8eb92d23e.jpeg"/>

As software projects grow, it becomes increasingly important to keep your code organized, maintainable, and scalable. This is where design patterns come into play. Design patterns provide proven, reusable solutions to common software design challenges, making your code more efficient and easier to manage.

In this guide, we'll dive deep into some of the most popular design patterns and show you how to implement them in Spring Boot. By the end, you'll not only understand these patterns conceptually but also be able to apply them in your own projects with confidence.

---

## Introduction to Design Patterns

Design patterns are reusable solutions to common software design problems. Think of them as best practices distilled into templates that can be applied to solve specific challenges in your code. They are not specific to any language, but they can be particularly powerful in Java due to its object-oriented nature.

In this guide, we'll cover:

- **Singleton Pattern**: Ensuring a class has only one instance.
- **Factory Pattern**: Creating objects without specifying the exact class.
- **Strategy Pattern**: Allowing algorithms to be selected at runtime.
- **Observer Pattern**: Setting up a publish-subscribe relationship.

We'll not only cover how these patterns work but also explore how they can be applied in Spring Boot for real-world applications.

---

## How to Set Up Your Spring Boot Project

Before we dive into the patterns, let’s set up a Spring Boot project:

### Prerequisites

Make sure you have:

- Java 11+
- Maven
- Spring Boot CLI (optional)
- Postman or curl (for testing)

### Project Initialization

You can quickly create a Spring Boot project using Spring Initializr:

```sh
curl https://start.spring.io/starter.zip \
-d dependencies=web \
-d name=DesignPatternsDemo \
-d javaVersion=11 -o design-patterns-demo.zip

unzip design-patterns-demo.zip
cd design-patterns-demo
```

---

## What is the Singleton Pattern?

The Singleton pattern ensures that a class has only one instance and provides a global access point to it. This pattern is commonly used for services like logging, configuration management, or database connections.

### How to Implement the Singleton Pattern in Spring Boot

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Spring Boot beans](https://en.wikipedia.org/wiki/Spring_Framework#:~:text=Creating%20and%20managing%20beans) are singletons by default, meaning that Spring automatically manages the lifecycle of these beans to ensure only one instance exists. However, it's important to understand how the Singleton pattern works under the hood, especially when you're not using Spring-managed beans or need more control over instance management.

Let’s walk through a manual implementation of the Singleton pattern to demonstrate how you can control the creation of a single instance within your application.

### Step 1: Create a `LoggerService` Class

In this example, we’ll create a simple logging service using the Singleton pattern. The goal is to ensure that all parts of the application use the same logging instance.

```java title="LoggerService.java"
public class LoggerService {
    // The static variable to hold the single instance
    private static LoggerService instance;

    // Private constructor to prevent instantiation from outside
    private LoggerService() {
        // This constructor is intentionally empty to prevent other classes from creating instances
    }

    // Public method to provide access to the single instance
    public static synchronized LoggerService getInstance() {
        if (instance == null) {
            instance = new LoggerService();
        }
        return instance;
    }

    // Example logging method
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}
```

- **Static Variable** (`instance`): This holds the single instance of `LoggerService`.
- **Private Constructor**: The constructor is marked private to prevent other classes from creating new instances directly.
- **Synchronized** `getInstance()` Method: The method is synchronized to make it thread-safe, ensuring that only one instance is created even if multiple threads try to access it simultaneously.
- **Lazy Initialization**: The instance is created only when it's first requested (`lazy initialization`), which is efficient in terms of memory usage.

::: info Real-World Usage

This pattern is commonly used for shared resources, such as logging, configuration settings, or managing database connections, where you want to control access and ensure that only one instance is used throughout your application.

:::

### Step 2: Use the Singleton in a Spring Boot Controller

Now, let's see how we can use our `LoggerService` Singleton within a Spring Boot controller. This controller will expose an endpoint that logs a message whenever it's accessed.

```java title="LogController.java"
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LogController {

    @GetMapping("/log")
    public ResponseEntity<String> logMessage() {
        // Accessing the Singleton instance of LoggerService
        LoggerService logger = LoggerService.getInstance();
        logger.log("This is a log message!");
        return ResponseEntity.ok("Message logged successfully");
    }
}
```

- **GET Endpoint**: We’ve created a `/log` endpoint that, when accessed, logs a message using the `LoggerService`.
- **Singleton Usage**: Instead of creating a new instance of `LoggerService`, we call `getInstance()` to ensure we’re using the same instance every time.
- **Response**: After logging, the endpoint returns a response indicating success.

### Step 3: Testing the Singleton Pattern

Now, let's test this endpoint using Postman or your browser:

```sh
GET http://localhost:8080/log
```

**Expected Output**:

- Console log: `[LOG] This is a log message!`
- HTTP Response: `Message logged successfully`

You can call the endpoint multiple times, and you'll see that the same instance of `LoggerService` is used, as indicated by the consistent log output.

### Real-World Use Cases for the Singleton Pattern

Here’s when you might want to use the Singleton pattern in real-world applications:

1. **Configuration Management**: Ensure that your application uses a consistent set of configuration settings, especially when those settings are loaded from files or databases.
2. **Database Connection Pools**: Control access to a limited number of database connections, ensuring that the same pool is shared across the application.
3. **Caching**: Maintain a single cache instance to avoid inconsistent data.
4. **Logging Services**: As shown in this example, use a single logging service to centralize log outputs across different modules of your application.

### Key Takeaways

- The Singleton pattern is an easy way to ensure that only one instance of a class is created.
- Thread safety is crucial if multiple threads are accessing the Singleton, which is why we used `synchronized` in our example.
- Spring Boot beans are already singletons by default, but understanding how to implement it manually helps you gain more control when needed.

This covers the implementation and usage of the Singleton pattern. Next, we’ll explore the Factory pattern to see how it can help streamline object creation.

---

## What is the Factory Pattern?

The Factory pattern allows you to create objects without specifying the exact class. This pattern is useful when you have different types of objects that need to be instantiated based on some input.

### How to Implementing a Factory in Spring Boot

The Factory pattern is incredibly useful when you need to create objects based on certain criteria but want to decouple the object creation process from your main application logic.

In this section, we’ll walk through building a `NotificationFactory` to send notifications via Email or SMS. This is especially useful if you anticipate adding more notification types in the future, such as push notifications or in-app alerts, without changing your existing code.

### Step 1: Create the `Notification` Interface

The first step is to define a common interface that all notification types will implement. This ensures that each type of notification (Email, SMS, and so on) will have a consistent `send()` method.

```java title="Notification.java"
public interface Notification {
    void send(String message);
}
```

- **Purpose**: The `Notification` interface defines the contract for sending notifications. Any class that implements this interface must provide an implementation for the `send()` method.
- **Scalability**: By using an interface, you can easily extend your application in the future to include other types of notifications without modifying existing code.

### Step 2: Implement `EmailNotification` and `SMSNotification`

Now, let's implement two concrete classes, one for sending emails and another for sending SMS messages.

```java title="EmailNotification.java"
public class EmailNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending Email: " + message);
    }
}

public class SMSNotification implements Notification {
    @Override
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}
```

### Step 3: Create a `NotificationFactory`

The `NotificationFactory` class is responsible for creating instances of `Notification` based on the specified type. This design ensures that the `NotificationController` doesn’t need to know about the details of object creation.

```java title="NotificationFactory.java"
public class NotificationFactory {
    public static Notification createNotification(String type) {
        switch (type.toUpperCase()) {
            case "EMAIL":
                return new EmailNotification();
            case "SMS":
                return new SMSNotification();
            default:
                throw new IllegalArgumentException("Unknown notification type: " + type);
        }
    }
}
```

**Factory Method** (`createNotification()`):

- The factory method takes a string (`type`) as input and returns an instance of the corresponding notification class.
- **Switch Statement**: The switch statement selects the appropriate notification type based on the input.
- **Error Handling**: If the provided type is not recognized, it throws an `IllegalArgumentException`. This ensures that invalid types are caught early.

**Why Use a Factory?**

- **Decoupling**: The factory pattern decouples object creation from the business logic. This makes your code more modular and easier to maintain.
- **Extensibility**: If you want to add a new notification type, you only need to update the factory without changing the controller logic.

### Step 4: Use the Factory in a Spring Boot Controller

Now, let’s put everything together by creating a Spring Boot controller that uses the `NotificationFactory` to send notifications based on the user’s request.

```java title="NotificationController.java"
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    @GetMapping("/notify")
    public ResponseEntity<String> notify(@RequestParam String type, @RequestParam String message) {
        try {
            // Create the appropriate Notification object using the factory
            Notification notification = NotificationFactory.createNotification(type);
            notification.send(message);
            return ResponseEntity.ok("Notification sent successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
```

**GET Endpoint** (`/notify`):

- The controller exposes a `/notify` endpoint that accepts two query parameters: `type` (either "EMAIL" or "SMS") and `message`.
- It uses the `NotificationFactory` to create the appropriate notification type and sends the message.
- **Error Handling**: If an invalid notification type is provided, the controller catches the `IllegalArgumentException` and returns a `400 Bad Request` response.

### Step 5: Testing the Factory Pattern

Let’s test the endpoint using Postman or a browser:

::: tabs

@tab:active 1.

**Send an Email Notification**:

```sh
GET http://localhost:8080/notify?type=email&message=Hello%20Email
# 
# Sending Email: Hello Email
```

@tab 2.

**Send an SMS Notification**:

```sh
GET http://localhost:8080/notify?type=sms&message=Hello%20SMS
#
#Sending SMS: Hello SMS
```

@tab 3.

**Test with an Invalid Type**:

```sh
GET http://localhost:8080/notify?type=unknown&message=Test
#
# Bad Request: Unknown notification type: unknown
```

:::

### Real-World Use Cases for the Factory Pattern

The Factory pattern is particularly useful in scenarios where:

1. **Dynamic Object Creation**: When you need to create objects based on user input, like sending different types of notifications, generating reports in various formats, or handling different payment methods.
2. **Decoupling Object Creation**: By using a factory, you can keep your main business logic separate from object creation, making your code more maintainable.
3. **Scalability**: Easily extend your application to support new types of notifications without modifying existing code. Simply add a new class that implements the `Notification` interface and update the factory.

---

## What is the Strategy Pattern?

The Strategy pattern is perfect when you need to switch between multiple algorithms or behaviors dynamically. It allows you to define a family of algorithms, encapsulate each one within separate classes, and make them easily interchangeable at runtime. This is especially useful for selecting an algorithm based on specific conditions, keeping your code clean, modular, and flexible.

::: info Real-World Use Case

Imagine an e-commerce system that needs to support multiple payment options, like credit cards, PayPal, or bank transfers. By using the Strategy pattern, you can easily add or modify payment methods without altering existing code. This approach ensures that your application remains scalable and maintainable as you introduce new features or update existing ones.

:::

We’ll demonstrate this pattern with a Spring Boot example that handles payments using either a credit card or PayPal strategy.

### Step 1: Define a `PaymentStrategy` Interface

We start by creating a common interface that all payment strategies will implement:

```java title="PaymentStrategy.java"
public interface PaymentStrategy {
    void pay(double amount);
}
```

The interface defines a contract for all payment methods, ensuring consistency across implementations.

### Step 2: Implement Payment Strategies

Create concrete classes for credit card and PayPal payments.

```java title="CreditCardPayment.java"
public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " with Credit Card");
    }
}

public class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " via PayPal");
    }
}
```

Each class implements the `pay()` method with its specific behavior.

### Step 3: Use the Strategy in a Controller

Create a controller to dynamically select a payment strategy based on user input:

```java title="PaymentController.java"
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    @GetMapping("/pay")
    public ResponseEntity<String> processPayment(@RequestParam String method, @RequestParam double amount) {
        PaymentStrategy strategy = selectPaymentStrategy(method);
        if (strategy == null) {
            return ResponseEntity.badRequest().body("Invalid payment method");
        }
        strategy.pay(amount);
        return ResponseEntity.ok("Payment processed successfully!");
    }

    private PaymentStrategy selectPaymentStrategy(String method) {
        switch (method.toUpperCase()) {
            case "CREDIT": return new CreditCardPayment();
            case "PAYPAL": return new PayPalPayment();
            default: return null;
        }
    }
}
```

The endpoint accepts `method` and `amount` as query parameters and processes the payment using the appropriate strategy.

### Step 4: Testing the Endpoint

@tab:active 1.

**Credit Card Payment**:

```sh
GET http://localhost:8080/pay?method=credit&amount=100
# 
# Output: `Paid $100.0 with Credit Card`
```

@tab 2.

**PayPal Payment**:

```sh
GET http://localhost:8080/pay?method=paypal&amount=50
# 
# Output: `Paid $50.0 via PayPal`
```

@tab 3.

**Invalid Method**:
    
```sh
GET http://localhost:8080/pay?method=bitcoin&amount=25
# 
# Output: `Invalid payment method`
```  

### Use Cases for the Strategy Pattern

- **Payment Processing**: Dynamically switch between different payment gateways.
- **Sorting Algorithms**: Choose the best sorting method based on data size.
- **File Exporting**: Export reports in various formats (PDF, Excel, CSV).

::: important Key Takeaways

- The Strategy pattern keeps your code modular and follows the Open/Closed principle.
- Adding new strategies is easy—just create a new class implementing the `PaymentStrategy` interface.
- It’s ideal for scenarios where you need flexible algorithm selection at runtime.

:::

Next, we’ll explore the Observer pattern, perfect for handling event-driven architectures.

---

## What is the Observer Pattern?

The Observer pattern is ideal when you have one object (the subject) that needs to notify multiple other objects (observers) about changes in its state. It’s perfect for event-driven systems where updates need to be pushed to various components without creating tight coupling between them. This pattern allows you to maintain a clean architecture, especially when different parts of your system need to react to changes independently.

::: info Real-World Use Case

This pattern is commonly used in systems that send notifications or alerts, such as chat applications or stock price trackers, where updates need to be pushed to users in real-time. By using the Observer pattern, you can add or remove notification types easily without altering the core logic.

:::

We’ll demonstrate how to implement this pattern in Spring Boot by building a simple notification system where both Email and SMS notifications are sent whenever a user registers.

### Step 1: Create an `Observer` Interface

We begin by defining a common interface that all observers will implement:

```java title="Observer.java"
public interface Observer {
    void update(String event);
}
```

The interface establishes a contract where all observers must implement the `update()` method, which will be triggered whenever the subject changes.

### Step 2: Implement `EmailObserver` and `SMSObserver`

Next, we create two concrete implementations of the `Observer` interface to handle email and SMS notifications.

#### `EmailObserver` Class

```java title="EmailObserver.java"
public class EmailObserver implements Observer {
    @Override
    public void update(String event) {
        System.out.println("Email sent for event: " + event);
    }
}
```

The `EmailObserver` handles sending email notifications whenever it's notified of an event.

#### `SMSObserver` Class

```java title="SMSObserver.java"
public class SMSObserver implements Observer {
    @Override
    public void update(String event) {
        System.out.println("SMS sent for event: " + event);
    }
}
```

The `SMSObserver` handles sending SMS notifications whenever it's notified.

### Step 3: Create a `UserService` Class (The Subject)

We’ll now create a `UserService` class that acts as the subject, notifying its registered observers whenever a user registers.

```java title="UserService.java"
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private List<Observer> observers = new ArrayList<>();

    // Method to register observers
    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    // Method to notify all registered observers of an event
    public void notifyObservers(String event) {
        for (Observer observer : observers) {
            observer.update(event);
        }
    }

    // Method to register a new user and notify observers
    public void registerUser(String username) {
        System.out.println("User registered: " + username);
        notifyObservers("User Registration");
    }
}
```

- **Observers List**: Keeps track of all registered observers.
- `registerObserver()` Method: Adds new observers to the list.
- `notifyObservers()` Method: Notifies all registered observers when an event occurs.
- `registerUser()` Method: Registers a new user and triggers notifications to all observers.

### Step 4: Use the Observer Pattern in a Controller

Finally, we’ll create a Spring Boot controller to expose an endpoint for user registration. This controller will register both `EmailObserver` and `SMSObserver` with the `UserService`.

```java title="UserController.java"
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController() {
        this.userService = new UserService();
        // Register observers
        userService.registerObserver(new EmailObserver());
        userService.registerObserver(new SMSObserver());
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestParam String username) {
        userService.registerUser(username);
        return ResponseEntity.ok("User registered and notifications sent!");
    }
}
```

- **Endpoint** (`/register`): Accepts a `username` parameter and registers the user, triggering notifications to all observers.
- **Observers**: Both `EmailObserver` and `SMSObserver` are registered with `UserService`, so they are notified whenever a user registers.

### Testing the Observer Pattern

Now, let’s test our implementation using Postman or a browser:

```sh
POST http://localhost:8080/api/register?username=JohnDoe
#
# User registered: JohnDoe
# Email sent for event: User Registration
# SMS sent for event: User Registration
```

The system registers the user and notifies both the Email and SMS observers, showcasing the flexibility of the Observer pattern.

### Real-World Applications of the Observer Pattern

1. **Notification Systems**: Sending updates to users via different channels (email, SMS, push notifications) when certain events occur.
2. **Event-Driven Architectures**: Notifying multiple subsystems when specific actions take place, such as user activities or system alerts.
3. **Data Streaming**: Broadcasting data changes to various consumers in real-time (for example, live stock prices or social media feeds).

---

## How to Use Spring Boot’s Dependency Injection

So far, we’ve been manually creating objects to demonstrate design patterns. However, in real-world Spring Boot applications, Dependency Injection (DI) is the preferred way to manage object creation. DI allows Spring to automatically handle the instantiation and wiring of your classes, making your code more modular, testable, and maintainable.

Let’s refactor our Strategy pattern example to take advantage of Spring Boot's powerful DI capabilities. This will allow us to switch between payment strategies dynamically, using Spring’s annotations to manage dependencies.

### Updated Strategy Pattern Using Spring Boot's DI

In our refactored example, we’ll leverage Spring’s annotations like `@Component`, `@Service`, and `@Autowired` to streamline the process of injecting dependencies.

#### Step 1: Annotate Payment Strategies with `@Component`

First, we’ll mark our strategy implementations with the `@Component` annotation so that Spring can detect and manage them automatically.

```java title="CreditCardPayment.java"
@Component("creditCardPayment")
public class CreditCardPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " with Credit Card");
    }
}

@Component("payPalPayment")
public class PayPalPayment implements PaymentStrategy {
    @Override
    public void pay(double amount) {
        System.out.println("Paid $" + amount + " using PayPal");
    }
}
```

- `@Component` Annotation: By adding `@Component`, we tell Spring to treat these classes as Spring-managed beans. The string value (`"creditCardPayment"` and `"payPalPayment"`) acts as the bean identifier.
- **Flexibility**: This setup allows us to switch between strategies by using the appropriate bean identifier.

#### Step 2: Refactor the `PaymentService` to Use Dependency Injection

Next, let’s modify the `PaymentService` to inject a specific payment strategy using `@Autowired` and `@Qualifier`.

```java title="PaymentService.java"
@Service
public class PaymentService {
    private final PaymentStrategy paymentStrategy;

    @Autowired
    public PaymentService(@Qualifier("payPalPayment") PaymentStrategy paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    public void processPayment(double amount) {
        paymentStrategy.pay(amount);
    }
}
```

- `@Service` Annotation: Marks `PaymentService` as a Spring-managed service bean.
- `@Autowired`: Spring injects the required dependency automatically.
- `@Qualifier`: Specifies which implementation of `PaymentStrategy` to inject. In this example, we’re using `"payPalPayment"`.
- **Ease of Configuration**: By simply changing the `@Qualifier` value, you can switch the payment strategy without altering any business logic.

### Step 3: Using the Refactored Service in a Controller

To see the benefits of this refactoring, let’s update the controller to use our `PaymentService`:

```java title="PaymentController.java"
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/pay")
    public String makePayment(@RequestParam double amount) {
        paymentService.processPayment(amount);
        return "Payment processed using the current strategy!";
    }
}
```

- `@Autowired`: The controller automatically receives the `PaymentService` with the injected payment strategy.
- **GET Endpoint (**`/pay`): When accessed, it processes a payment using the currently configured strategy (PayPal in this example).

### Testing the Refactored Strategy Pattern with DI

Now, let’s test the new implementation using Postman or a browser:

```sh
GET http://localhost:8080/api/pay?amount=100
#
# Paid $100.0 using PayPal
```

If you change the qualifier in `PaymentService` to `"creditCardPayment"`, the output will change accordingly:

```plaintext title="output"
Paid $100.0 with Credit Card
```

### Benefits of Using Dependency Injection

- **Loose Coupling**: The service and controller don’t need to know the details of how a payment is processed. They simply rely on Spring to inject the correct implementation.
- **Modularity**: You can easily add new payment methods (for example, `BankTransferPayment`, `CryptoPayment`) by creating new classes annotated with `@Component` and adjusting the `@Qualifier`.
- **Configurability**: By leveraging Spring Profiles, you can switch strategies based on the environment (for example, development vs. production).

**Example**: You can use `@Profile` to automatically inject different strategies based on the active profile:

```java
@Component
@Profile("dev")
public class DevPaymentStrategy implements PaymentStrategy { /* ... */ }

@Component
@Profile("prod")
public class ProdPaymentStrategy implements PaymentStrategy { /* ... */ }
```

::: important Key Takeaways

- By using Spring Boot’s DI, you can simplify object creation and improve the flexibility of your code.
- The Strategy Pattern combined with DI allows you to easily switch between different strategies without changing your core business logic.
- Using `@Qualifier` and Spring Profiles gives you the flexibility to configure your application based on different environments or requirements.

:::

This approach not only makes your code cleaner but also prepares it for more advanced configurations and scaling in the future. In the next section, we’ll explore Best Practices and Optimization Tips to take your Spring Boot applications to the next level.

---

## Best Practices and Optimization Tips

### General Best Practices

- **Don’t overuse patterns**: Use them only when necessary. Overengineering can make your code harder to maintain.
- **Favor composition over inheritance**: Patterns like Strategy and Observer are great examples of this principle.
- **Keep your patterns flexible**: Leverage interfaces to keep your code decoupled.

### Performance Considerations

- **Singleton Pattern**: Ensure thread safety by using `synchronized` or the `Bill Pugh Singleton Design`.
- **Factory Pattern**: Cache objects if they are expensive to create.
- **Observer Pattern**: Use asynchronous processing if you have many observers to prevent blocking.

### Advanced Topics

- Using **Reflection** with the Factory pattern for dynamic class loading.
- Leveraging **Spring Profiles** to switch strategies based on the environment.
- Adding **Swagger Documentation** for your API endpoints.

---

## Conclusion and Key Takeaways

In this tutorial, we explored some of the most powerful design patterns—Singleton, Factory, Strategy, and Observer—and demonstrated how to implement them in Spring Boot. Let’s briefly summarize each pattern and highlight what it’s best suited for:

::: tabs

@tab:active Singleton Pattern

- **Summary**: Ensures that a class has only one instance and provides a global access point to it.
- **Best For**: Managing shared resources like configuration settings, database connections, or logging services. It’s ideal when you want to control access to a shared instance across your entire application.

@tab Factory Pattern

- **Summary**: Provides a way to create objects without specifying the exact class to be instantiated. This pattern decouples object creation from the business logic.
- **Best For**: Scenarios where you need to create different types of objects based on input conditions, such as sending notifications via email, SMS, or push notifications. It’s great for making your code more modular and extensible.

@tab Strategy Pattern

- **Summary**: Allows you to define a family of algorithms, encapsulate each one, and make them interchangeable. This pattern helps you choose an algorithm at runtime.
- **Best For**: When you need to switch between different behaviors or algorithms dynamically, such as processing various payment methods in an e-commerce application. It keeps your code flexible and adheres to the Open/Closed Principle.

@tab Observer Pattern

- **Summary**: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.
- **Best For**: Event-driven systems like notification services, real-time updates in chat apps, or systems that need to react to changes in data. It’s ideal for decoupling components and making your system more scalable.

:::

### What’s Next?

Now that you’ve learned these essential design patterns, try integrating them into your existing projects to see how they can improve your code structure and scalability. Here are a few suggestions for further exploration:

- **Experiment**: Try implementing other design patterns like **Decorator**, **Proxy**, and **Builder** to expand your toolkit.
- **Practice**: Use these patterns to refactor existing projects and enhance their maintainability.
- **Share**: If you have any questions or want to share your experience, feel free to reach out!

I hope this guide has helped you understand how to effectively use design patterns in Java. Keep experimenting, and happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Design Patterns in Java with Spring Boot - Explained with Code Examples",
  "desc": "As software projects grow, it becomes increasingly important to keep your code organized, maintainable, and scalable. This is where design patterns come into play. Design patterns provide proven, reusable solutions to common software design challenge...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-use-design-patterns-in-java-with-spring-boot.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
