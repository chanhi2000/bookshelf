---
lang: en-US
title: "How to Add Services"
description: Article(s) > (8/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: Article(s) > (8/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
    - property: og:description
      content: "How to Add Services"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/create-a-minimal-api-in-net-core-handbook/how-to-add-services.html
date: 2024-12-03
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url: https://freecodecamp.org/news/author/Clifftech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "desc": "Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini...",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Minimal API in .NET Core - A Step By Step Handbook"
  desc="Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini..."
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-add-services"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Services are components that provide functionality to an application. In our application, we will create services to implement the business logic of our application. We will create services to handle CRUD operations for books, validate book data, and handle exceptions.

In ASP.NET Core, services are registered in the dependency injection container and can be injected into other components, such as controllers and endpoints, But this is a minimal API so we will inject the services directly into the endpoints.

Let's create an interface for our services. In the <FontIcon icon="fas fa-foler-open"/>`Interfaces` folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`IBookService.cs` and add the following code:

```cs title="Interfaces/IBookService.cs"
using bookapi_minimal.Contracts;

namespace bookapi_minimal.Interfaces
{
      public interface IBookService
    {
        Task<BookResponse> AddBookAsync(CreateBookRequest createBookRequest);
        Task<BookResponse> GetBookByIdAsync(Guid id);
        Task<IEnumerable<BookResponse>> GetBooksAsync();
        Task<BookResponse> UpdateBookAsync(Guid id,  UpdateBookRequest  updateBookRequest);
        Task<bool> DeleteBookAsync(Guid id);
    }
}
```

Let's break down the code above: We have defined an interface named `IBookService` that contains methods to handle CRUD operations for books. The interface defines the following methods:

- `AddBookAsync`: Adds a new book to the database.
- `GetBookByIdAsync`: Retrieves a book by its ID.
- `GetBooksAsync`: Retrieves all books from the database.
- `UpdateBookAsync`: Updates an existing book.

We are using the Contract we created earlier in the `Contracts` folder. The `IBookService` interface defines the structure of the methods that will be implemented by the service classes. This helps us separate the interface from the implementation, making it easier to maintain and test our code.

Now that we have created the interface, let's create the service class that implements the interface.

---

## How to Implement the Book Service

This service will implement the `IBookService` interface and provide the business logic for our application. In the <FontIcon icon="fas fa-foler-open"/>`Services` folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`BookService.cs` . Your initial file should look like this:

```cs title="Services/BookService.cs"
namespace bookapi_minimal.Services
{
    public class BookService
    {

    }
}
```

The first thing we need to do is add the interface to the `BookService` class. Update the `BookService` class to implement the `IBookService` interface as follows:

```cs title="Services/BookService.cs"
using bookapi_minimal.Interfaces;

namespace bookapi_minimal.Services
{
    public class BookService:IBookService
    {

    }
}
```

When you do this, your VS Code might show an error because we have not implemented the methods in the interface. Let's go ahead and implement the methods in the `BookService` class.

In VS Code you can use the <kbd>Ctrl</kbd>+<kbd>.</kbd> shortcut to implement the methods in the interface. Then you will see the following code generated for you:

```cs
using bookapi_minimal.Contracts;
using bookapi_minimal.Interfaces;

namespace bookapi_minimal.Services
{
    // Service class for managing books
    public class BookService : IBookService
    {
        // Method to add a new book to the database
        public Task<BookResponse> AddBookAsync(CreateBookRequest createBookRequest)
        {
            throw new NotImplementedException();
        }

        // Method to Delete a book from the database
        public Task<bool> DeleteBookAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        // Method to Get a book from the database by its ID
        public Task<BookResponse> GetBookByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        // Method to Get all books from the database
        public Task<IEnumerable<BookResponse>> GetBooksAsync()
        {
            throw new NotImplementedException();
        }

        // Method to Update a book in the database
        public Task<BookResponse> UpdateBookAsync(Guid id, UpdateBookRequest updateBookRequest)
        {
            throw new NotImplementedException();
        }
    }
}
```

Now you can see that the methods in the interface have been implemented in the `BookService` class. We will implement the business logic for each method in the next section.

Before we do that, let's add the necessary dependencies to the `BookService` class. We need to inject the `ApplicationContext` and `ILogger` dependencies into the `BookService` class. `ApplicationContext` is used to interact with the database, while `ILogger` is used for logging.

To inject the dependencies, update the `BookService` class as follows:

```cs title="Services/BookService.cs"
// ...
private readonly ApplicationContext _context; // Database context
private readonly ILogger<BookService> _logger; // Logger for logging information and errors
//..
```

Since we have added the dependencies, we need to update the `BookService` constructor to accept the dependencies. Update the `BookService` constructor as follows:

```cs title="Services/BookService.cs"
// ...
// Constructor to initialize the database context and logger
public BookService(ApplicationContext context, ILogger<BookService> logger)
{
    _context = context;
    _logger = logger;
}
// ...
```

Now that we have added the dependencies and updated the constructor, we can implement the business logic for each method in the `BookService` class.

Let's create logic for the CREATE, READ, UPDATE, and DELETE operations in the `BookService` class.

---

## How to Implement the `AddBookAsync` Method

As I mentioned earlier, we’ll use the `AddBookAsync` method to add a new book to the database. In this method, we will create a new book entity, map the data from the `CreateBookRequest` object to the book entity, and save the book entity to the database. We will also return the book entity as an `BookResponse` object.

Update the `AddBookAsync` method in the `BookService` class as follows:

```cs :collapsed-lines title="Services/BookService.cs"
// ...

    /// <summary>
    /// Add a new book
    /// </summary>
    /// <param name="createBookRequest">Book request to be added</param>
    /// <returns>Details of the created book</returns>
    public async Task<BookResponse> AddBookAsync(CreateBookRequest createBookRequest)
    {
        try
        {
            var book = new BookModel
            {
                Title = createBookRequest.Title,
                Author = createBookRequest.Author,
                Description = createBookRequest.Description,
                Category = createBookRequest.Category,
                Language = createBookRequest.Language,
                TotalPages = createBookRequest.TotalPages
            };

            // Add the book to the database
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Book added successfully.");

            // Return the details of the created book
            return new BookResponse
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Category = book.Category,
                Language = book.Language,
                TotalPages = book.TotalPages
            };
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error adding book: {ex.Message}");
            throw;
        }
    }
// ...
```

In this code, we are creating a new book entity from the `CreateBookRequest` object, mapping the data from the `CreateBookRequest` object to the book entity, saving the book entity to the database, and returning the book entity as a `BookResponse` object.

We are also logging information and errors using the `ILogger` dependency. If an exception occurs during the process, we log the error message and rethrow the exception.

Now that we have implemented the `AddBookAsync` method, let's implement the `GetBookByIdAsync` method.

---

## How to Implement the `GetBookByIdAsync` Method

The `GetBookByIdAsync` method is used to retrieve a book by its ID from the database. In this method, we will query the database for the book with the specified ID, map the book entity to a `BookResponse` object, and return the `BookResponse` object.

Update the `GetBookByIdAsync` method in the `BookService` class as follows:

```cs :collapsed-lines title="Services/BookService.cs"
//...

    /// <summary>
    /// Get a book by its ID
    /// </summary>
    /// <param name="id">ID of the book</param>
    /// <returns>Details of the book</returns>
    public async Task<BookResponse>  GetBookByIdAsync(Guid id)
    {
        try
        {
            // Find the book by its ID
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                _logger.LogWarning($"Book with ID {id} not found.");
                return null;
            }

            // Return the details of the book
            return new BookResponse
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Category = book.Category,
                Language = book.Language,
                TotalPages = book.TotalPages
            };
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving book: {ex.Message}");
            throw;
        }
    }
//...
```

In this code, we are querying the database for the book with the specified ID, mapping the book entity to a `BookResponse` object, and returning the `BookResponse` object. We are also logging information and errors using the `ILogger` dependency.

If the book with the specified ID is not found, we log a warning message and return null. If an exception occurs during the process, we log the error message and rethrow the exception.

Now that we have implemented the `GetBookByIdAsync` method, let's implement the `GetBooksAsync` method.

---

## How to Implement the `GetBooksAsync` Method

The `GetBooksAsync` method is used to retrieve all books from the database. In this method, we will query the database for all books, map each book entity to a `BookResponse` object, and return a list of `BookResponse` objects.

Update the `GetBooksAsync` method in the `BookService` class as follows:

```cs :collapsed-lines title="Services/BookService.cs"
//... 

    /// <summary>
    /// Get all books
    /// </summary>
    /// <returns>List of all books</returns>
    public async Task<IEnumerable<BookResponse>> GetBooksAsync()
    {
        try
        {
            // Get all books from the database
            var books = await _context.Books.ToListAsync();

            // Return the details of all books
            return books.Select(book => new BookResponse
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Description = book.Description,
                Category = book.Category,
                Language = book.Language,
                TotalPages = book.TotalPages
            });
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error retrieving books: {ex.Message}");
            throw;
        }
    }
//...
```

Here, we are querying the database for all books, mapping each book entity to an `BookResponse` object, and returning a list of `BookResponse` objects. We are also logging information and errors using the `ILogger` dependency. If an exception occurs during the process, we log the error message and rethrow the exception.

Now that we have implemented the `GetBooksAsync` method, let's implement the `UpdateBookAsync` method.

---

## How to Implement the `UpdateBookAsync` Method

The `UpdateBookAsync` method is used to update an existing book in the database. In this method, we will query the database for the book with the specified ID, update the book entity with the data from the `UpdateBookRequest` object, save the updated book entity to the database, and return the updated book entity as a `BookResponse` object.

Update the `UpdateBookAsync` method in the `BookService` class as follows:

```cs :collapsed-lines title="Services/BookService.cs"
//...

    /// <summary>
    /// Update an existing book
    /// </summary>
    /// <param name="id">ID of the book to be updated</param>
    /// <param name="book">Updated book model</param>
    /// <returns>Details of the updated book</returns>
    public async Task<BookResponse> UpdateBookAsync(Guid id, UpdateBookRequest book)
    {
        try
        {
            // Find the existing book by its ID
            var existingBook = await _context.Books.FindAsync(id);
            if (existingBook == null)
            {
                _logger.LogWarning($"Book with ID {id} not found.");
                return null;
            }

            // Update the book details
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.Description = book.Description;
            existingBook.Category = book.Category;
            existingBook.Language = book.Language;
            existingBook.TotalPages = book.TotalPages;

            // Save the changes to the database
            await _context.SaveChangesAsync();
            _logger.LogInformation("Book updated successfully.");

            // Return the details of the updated book
            return new BookResponse
            {
                Id = existingBook.Id,
                Title = existingBook.Title,
                Author = existingBook.Author,
                Description = existingBook.Description,
                Category = existingBook.Category,
                Language = existingBook.Language,
                TotalPages = existingBook.TotalPages
            };
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error updating book: {ex.Message}");
            throw;
        }
    }
//...
```

Here, we are querying the database for the book with the specified ID, updating the book entity with the data from the `UpdateBookRequest` object, saving the updated book entity to the database, and returning the updated book entity as a `BookResponse` object. We are also logging information and errors using the `ILogger` dependency.

If the book with the specified ID is not found, we log a warning message and return null. If an exception occurs during the process, we log the error message and rethrow the exception.

Now that we have implemented the `UpdateBookAsync` method, let's implement the `DeleteBookAsync` method.

---

## How to Implement the `DeleteBookAsync` Method

The `DeleteBookAsync` method is used to delete an existing book from the database. In this method, we will query the database for the book with the specified ID, remove the book entity from the database, and return a boolean value indicating whether the book was successfully deleted.

Update the `DeleteBookAsync` method in the `BookService` class as follows:

```cs :collapsed-lines title="Services/BookService.cs"
//...

    /// <summary>
    /// Delete a book by its ID
    /// </summary>
    /// <param name="id">ID of the book to be deleted</param>
    /// <returns>True if the book was deleted, false otherwise</returns>
    public async Task<bool> DeleteBookAsync(Guid id)
    {
        try
        {
            // Find the book by its ID
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                _logger.LogWarning($"Book with ID {id} not found.");
                return false;
            }

            // Remove the book from the database
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Book with ID {id} deleted successfully.");
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error deleting book: {ex.Message}");
            throw;
        }
    }
//...
```

In this code, we are querying the database for the book with the specified ID, removing the book entity from the database, and returning a boolean value indicating whether the book was successfully deleted. We are also logging information and errors using the `ILogger` dependency.

If the book with the specified ID is not found, we log a warning message and return false. If an exception occurs during the process, we log the error message and rethrow the exception.

Now you have successfully implemented the business logic for the `AddBookAsync`, `GetBookByIdAsync`, `GetBooksAsync`, `UpdateBookAsync`, and `DeleteBookAsync` methods in the `BookService` class. These methods handle the CRUD operations for books, validate book data, and handle exceptions. By now, your `BookService` class should look like this:

```cs
using bookapi_minimal.AppContext;
using bookapi_minimal.Contracts;
using bookapi_minimal.Interfaces;
using bookapi_minimal.Models;
using Microsoft.EntityFrameworkCore;

namespace bookapi_minimal.Services
{
    public class BookService : IBookService
    {
        private readonly ApplicationContext _context; // Database context
        private readonly ILogger<BookService> _logger; // Logger for logging information and error
        // Constructor to initialize the database context and logger
        public BookService(ApplicationContext context, ILogger<BookService> logger)
        {
            _context = context;
            _logger = logger;
        }


        /// <summary>
        /// Add a new book
        /// </summary>
        /// <param name="createBookRequest">Book request to be added</param>
        /// <returns>Details of the created book</returns>
        public async Task<BookResponse> AddBookAsync(CreateBookRequest createBookRequest)
        {
            try
            {
                var book = new BookModel
                {
                    Title = createBookRequest.Title,
                    Author = createBookRequest.Author,
                    Description = createBookRequest.Description,
                    Category = createBookRequest.Category,
                    Language = createBookRequest.Language,
                    TotalPages = createBookRequest.TotalPages
                };

                // Add the book to the database
                _context.Books.Add(book);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Book added successfully.");

                // Return the details of the created book
                return new BookResponse
                {
                    Id = book.Id,
                    Title = book.Title,
                    Author = book.Author,
                    Description = book.Description,
                    Category = book.Category,
                    Language = book.Language,
                    TotalPages = book.TotalPages
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error adding book: {ex.Message}");
                throw;
            }
        }


        /// <summary>
        /// Get a book by its ID
        /// </summary>
        /// <param name="id">ID of the book</param>
        /// <returns>Details of the book</returns>
        public async Task<BookResponse>  GetBookByIdAsync(Guid id)
        {
            try
            {
                // Find the book by its ID
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    _logger.LogWarning($"Book with ID {id} not found.");
                    return null;
                }

                // Return the details of the book
                return new BookResponse
                {
                    Id = book.Id,
                    Title = book.Title,
                    Author = book.Author,
                    Description = book.Description,
                    Category = book.Category,
                    Language = book.Language,
                    TotalPages = book.TotalPages
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving book: {ex.Message}");
                throw;
            }
        }


        /// <summary>
        /// Get all books
        /// </summary>
        /// <returns>List of all books</returns>
        public async Task<IEnumerable<BookResponse>> GetBooksAsync()
        {
            try
            {
                // Get all books from the database
                var books = await _context.Books.ToListAsync();

                // Return the details of all books
                return books.Select(book => new BookResponse
                {
                    Id = book.Id,
                    Title = book.Title,
                    Author = book.Author,
                    Description = book.Description,
                    Category = book.Category,
                    Language = book.Language,
                    TotalPages = book.TotalPages
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving books: {ex.Message}");
                throw;
            }
        }


        /// <summary>
        /// Update an existing book
        /// </summary>
        /// <param name="id">ID of the book to be updated</param>
        /// <param name="book">Updated book model</param>
        /// <returns>Details of the updated book</returns>
        public async Task<BookResponse> UpdateBookAsync(Guid id, UpdateBookRequest book)
        {
            try
            {
                // Find the existing book by its ID
                var existingBook = await _context.Books.FindAsync(id);
                if (existingBook == null)
                {
                    _logger.LogWarning($"Book with ID {id} not found.");
                    return null;
                }

                // Update the book details
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Description = book.Description;
                existingBook.Category = book.Category;
                existingBook.Language = book.Language;
                existingBook.TotalPages = book.TotalPages;

                // Save the changes to the database
                await _context.SaveChangesAsync();
                _logger.LogInformation("Book updated successfully.");

                // Return the details of the updated book
                return new BookResponse
                {
                    Id = existingBook.Id,
                    Title = existingBook.Title,
                    Author = existingBook.Author,
                    Description = existingBook.Description,
                    Category = existingBook.Category,
                    Language = existingBook.Language,
                    TotalPages = existingBook.TotalPages
                };
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating book: {ex.Message}");
                throw;
            }
        }


        /// <summary>
        /// Delete a book by its ID
        /// </summary>
        /// <param name="id">ID of the book to be deleted</param>
        /// <returns>True if the book was deleted, false otherwise</returns>
        public async Task<bool> DeleteBookAsync(Guid id)
        {
            try
            {
                // Find the book by its ID
                var book = await _context.Books.FindAsync(id);
                if (book == null)
                {
                    _logger.LogWarning($"Book with ID {id} not found.");
                    return false;
                }

                // Remove the book from the database
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Book with ID {id} deleted successfully.");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting book: {ex.Message}");
                throw;
            }
        }
    }
}
```

Congratulations! You have successfully implemented the business logic for the `AddBookAsync`, `GetBookByIdAsync`, `GetBooksAsync`, `UpdateBookAsync`, and `DeleteBookAsync` methods in the `BookService` class.

There's one thing we need to do: we need to register the service in our extension method. Let's go ahead and do that.

In your <FontIcon icon="iconfont icon-csharp"/>`ServiceExtensions.cs` file, add the following code:

```cs title="Extensions/ServiceExtensions.cs"
//...
builder.Services.AddScoped<IBookService, BookService>();
//...
```

This will register the `BookService` class as a scoped service. This means that the service will be created once per request and disposed of after the request is complete.

Now that we have the service working, let's go ahead and create the exception classes.
