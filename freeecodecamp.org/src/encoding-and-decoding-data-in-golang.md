---
lang: en-US
title: "How to Send and Parse JSON Data in Golang - Data Encoding and Decoding Explained With Examples"
description: "Article(s) > How to Send and Parse JSON Data in Golang - Data Encoding and Decoding Explained With Examples"
icon: fa-brands fa-golang
category: 
  - Go
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - go
  - golang
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Send and Parse JSON Data in Golang - Data Encoding and Decoding Explained With Examples"
    - property: og:description
      content: "How to Send and Parse JSON Data in Golang - Data Encoding and Decoding Explained With Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/encoding-and-decoding-data-in-golang.html
prev: /programming/go/articles/README.md
date: 2024-08-05
isOriginal: false
author:
  - name: Destiny Erhabor
    url : https://freecodecamp.org/news/author/CaesarSage/
cover: https://freecodecamp.org/news/content/images/2024/07/ferenc-almasi-HfFoo4d061A-unsplash.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Go > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/go/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Send and Parse JSON Data in Golang - Data Encoding and Decoding Explained With Examples"
  desc="When building web applications in Golang, working with JSON data is inevitable. Whether you're sending responses to clients or parsing requests, JSON encoding and decoding are essential skills to master.  In this article, we'll explore the different ..."
  url="https://freecodecamp.org/news/encoding-and-decoding-data-in-golang"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/ferenc-almasi-HfFoo4d061A-unsplash.jpg"/>

When building web applications in Golang, working with JSON data is inevitable. Whether you're sending responses to clients or parsing requests, JSON encoding and decoding are essential skills to master.

In this article, we'll explore the different ways to encode and decode JSON in Golang.

---

## How to Send JSON Responses (Encoding)

JSON encoding is the process of converting Go data structures into JSON format.

Encoding refers to the process of converting data from one format to another. In the context of computing and data transmission, encoding typically involves converting data into a standardized format that can be easily stored, transmitted, or processed by different systems or applications.

Think of encoding like packing a suitcase for a trip. You take your clothes (data) and pack them into a suitcase (encoded format) so that they can be easily transported (transmitted) and unpacked (decoded) at your destination.

In the case of JSON encoding, the data is converted into a text-based format that uses human-readable characters to represent the data. This makes it easy for humans to read and understand the data, as well as for different systems to exchange and process the data.

Some common reasons for encoding data include:

- Data compression: Reducing the size of the data to make it easier to store or transmit.
- Data security: Protecting the data from unauthorized access or tampering.
- Data compatibility: Converting data into a format that can be read and processed by different systems or applications.
- Data transmission: Converting data into a format that can be easily transmitted over a network or other communication channels.

In Golang, we can use the `encoding/json` package to encode JSON data.

### How to Use the Marshal Function for JSON Encoding

The `Marshal` function is the most commonly used method for encoding JSON data in Golang. It takes a Go data structure as input and returns a JSON-encoded string.

```go :collapsed-lines
package main

import ( 
    "encoding/json"
    "fmt"
    "net/http"
 )

type Person struct { 
    Name string `json:"name"` 
    Age int `json:"age"`
}

func handler(w http.ResponseWriter, r *http.Request) { 
    person := Person{  Name: "John",  Age: 30, } 

    // Encoding - One step
    jsonStr, err := json.Marshal(person) 

    if err != nil {  
        http.Error(w, err.Error(), http.StatusInternalServerError)  
        return 
    } 

    w.Write(jsonStr)
}

func main() { 
    http.HandleFunc("/", handler) 
    http.ListenAndServe(":8080", nil)
 }
```

::: Code Explanation

**Imports**:

- `encoding/json`: Provides functions for encoding and decoding JSON.
- `fmt`: For printing output.

**User Struct**:

- Defines a struct `User` with fields `Name` and `Age`.
- Struct tags (for example: `json:"name"`) specify the JSON key names.

**`main` Function**:

- Creates a `User` instance.
- Calls `json.Marshal` to encode the `user` struct into JSON. This returns a byte slice and an error.
- If there's no error, it converts the byte slice to a string and prints it.

:::

### How to Use the `NewEncoder` Function

The `NewEncoder` function is used to encode JSON data to a writer, such as a file or network connection.

```go :collapsed-lines
package main

import ( 
    "encoding/json" 
    "fmt" 
    "net/http"
)

type Person struct { 
    Name string `json:"name"` 
    Age int `json:"age"`
}

func handler(w http.ResponseWriter, r *http.Request) { 
    person := Person{  Name: "John",  Age: 30 } 

    // Encoding - 2 step . NewEncoder and Encode
    encoder := json.NewEncoder(w) 

    err := encoder.Encode(person) 

    if err != nil {  
        http.Error(w, err.Error(), http.StatusInternalServerError)  

        return 
   }}

func main() { 
   http.HandleFunc("/", handler) http.ListenAndServe(":8080", nil)
}
```

::: info Code Explanation

**Inside the handler:**

- The `handler` function is an HTTP handler that handles incoming HTTP requests.
- `w http.ResponseWriter`: Used to write the response.
- `r *http.Request`: Represents the incoming request.
- A `Person` instance named `person` was created and initialized with the values `Name: "John"` and `Age: 30`.
- A JSON encoder was created using `json.NewEncoder(w)`, which will write the JSON output to the response writer `w`.
- The `person` struct was encoded to JSON and written to the response using `encoder.Encode(person)`.
- If an error occurs during encoding, it is sent back to the client as an HTTP error response with a status code `500 Internal Server Error`.

:::

---

## How to Parse JSON Requests (Decoding)

JSON decoding is the process of converting JSON data into Go data structures.

Decoding refers to the process of converting data from a standardized format back into its original form. In computing and data transmission, decoding involves taking encoded data and transforming it into a format that can be easily understood and processed by a specific system or application.

Think of decoding like unpacking a suitcase after a trip. You take the packed suitcase (encoded data) and unpack it, putting each item (data) back to its original place, so that you can use it again.

In the case of JSON decoding, the text-based JSON data is converted back into its original form, such as a Go data structure (like a struct or slice), so that it can be easily accessed and processed by the application.

Some common reasons for decoding data include:

- Data extraction: Retrieving specific data from a larger encoded dataset.
- Data analysis: Converting encoded data into a format that can be easily analyzed or processed.
- Data storage: Converting encoded data into a format that can be easily stored in a database or file system.
- Data visualization: Converting encoded data into a format that can be easily visualized or displayed.

Decoding is essentially the reverse process of encoding, and it's an essential step in many data processing pipelines.

In Golang, we can use the `encoding/json` package to decode JSON data.

### How to Use the Unmarshal Function to Parse JSON Requests

The `Unmarshal` function is the most commonly used method for decoding JSON data in Golang. It takes a JSON-encoded string as input and returns a Go data structure.

```go :collapsed-lines
package main

import ( 
    "encoding/json" 
    "fmt" 
    "net/http"
)

type Person struct { 
    Name string `json:"name"` 
    Age int `json:"age"`
}

func handler(w http.ResponseWriter, r *http.Request) { 
    var person Person err := json.NewDecoder(r.Body).Decode(&person)

    if err != nil {  
        http.Error(w, err.Error(), http.StatusBadRequest)  
        return
    } 

    fmt.Println(person.Name) 
    // Output: John fmt.Println(person.Age) 
    // Output: 30
}

func main() { 
    http.HandleFunc("/", handler) http.ListenAndServe(":8080", nil)
}
```

::: info Code Explanation:

**Inside the handler:**

- The `handler` function is an HTTP handler that handles incoming HTTP requests.
- `w http.ResponseWriter`: Used to write the response.
- `r *http.Request`: Represents the incoming request.
- A variable `person` of type `Person` was declared.
- `json.NewDecoder(r.Body).Decode(&person)`: This decodes the JSON request body into the `person` struct.
- If an error occurs during decoding, it sends back an HTTP 400 error response with a status code `400 Bad Request`.
- If decoding is successful, the `person` struct fields `Name` and `Age` are printed using `fmt.Println`.

:::

### How to Use the NewDecoder Function for JSON Decoding

The `NewDecoder` function is also used to decode JSON data from a reader, such as a file or network connection.

```go :collapsed-lines
package main

import ( 
    "encoding/json" 
    "fmt" 
    "net/http"
)

type Person struct { 
    Name string `json:"name"` 
    Age int `json:"age"`
}

func handler(w http.ResponseWriter, r *http.Request) { 

    decoder := json.NewDecoder(r.Body) 

    var person Person err := decoder.Decode(&person) 

    if err != nil {  
        http.Error(w, err.Error(), http.StatusBadRequest)  
        return 
       } 

    fmt.Println(person.Name) 
    // Output: John fmt.Println(person.Age) 
    // Output: 30
}

func main() { 
    http.HandleFunc("/", handler) 

    http.ListenAndServe(":8080", nil)
 }
```

::: info Code Explanation:

**Inside the handler function:**

- The `handler` function is an HTTP handler that handles incoming HTTP requests.
- `w http.ResponseWriter`: Used to write the response.
- `r *http.Request`: Represents the incoming request.

**Create a Decoder:**

- `decoder := json.NewDecoder(r.Body)`: Creates a new JSON decoder that reads from the request body.

**Declare a Person Variable:**

- `var person Person`: Declares a variable `person` of type `Person`.

**Decode JSON into Person Struct:**

- `err := decoder.Decode(&person)`: Decodes the JSON from the request body into the `person` struct.
- If an error occurs during decoding, it sends an HTTP 400 error response with the status code `400 Bad Request` and returns from the function.

**Print the Decoded Values:**

- `fmt.Println(person.Name)`: Prints the `Name` field of the `person` struct.
- `fmt.Println(person.Age)`: Prints the `Age` field of the `person` struct.

:::

### Custom JSON Marshaling and Unmarshaling

In some cases, the default JSON encoding and decoding behavior provided by `json.Marshal` and `json.Unmarshal` may not be sufficient. For instance, you may need to customize how certain fields are represented in JSON. This is where the `json.Marshaler` and `json.Unmarshaler` interfaces come in handy.

#### How to use JSON Marshaler

The `json.Marshaler` interface allows you to customize the JSON encoding of a type by implementing the `MarshalJSON` method. This method returns a JSON-encoded byte slice and an error.

```go
func (p Person) MarshalJSON() ([]byte, error) {
    type Alias Person
    return json.Marshal(&struct {
        Alias
        Age string `json:"age"`
    }{
        Alias: (Alias)(p),
        Age:   strconv.Itoa(p.Age) + " years",
    })
}
```

In this example, the `Age` field is converted to a string with a " years" suffix when encoding to JSON.

#### How to use JSON Unmarshaler

The `json.Unmarshaler` interface allows you to customize the JSON decoding of a type by implementing the `UnmarshalJSON` method. This method takes a JSON-encoded byte slice and returns an error.

```go
func (p *Person) UnmarshalJSON(data []byte) error {
    type Alias Person
    aux := &struct {
        Alias
        Age string `json:"age"`
    }{Alias: (Alias)(*p)}

    if err := json.Unmarshal(data, &aux); err != nil {
        return err
    }

    ageStr := strings.TrimSuffix(aux.Age, " years")
    age, err := strconv.Atoi(ageStr)
    if err != nil {
        return err
    }

    p.Age = age
    p.Name = aux.Name
    return nil
}
```

In this example, the `Age` field is converted from a string with a " years" suffix to an integer when decoding from JSON.

---

## Trade-offs

From the various methods described above for encoding and decoding JSON. Here are the trade-offs for the most commonly used methods:

### `json.Marshal` and `json.Unmarshal`:

::: tabs

@tab:active Pros:

- **Ease of Use**: Straightforward for encoding (Marshal) and decoding (Unmarshal) JSON.
- **Flexibility**: Can be used with various types including structs, maps, slices, and more.
- **Customization**: Struct tags (`json:"name"`) allow customization of JSON keys and other options.

@tab Cons:

- **Performance**: May not be the fastest method for very large or complex JSON structures.
- **Error Handling**: Error messages can sometimes be less descriptive for deeply nested or complex data structures.

:::

### `json.NewEncoder` and `json.NewDecoder`:

::: tabs

@tab:active Pros:

- **Stream-Based**: Suitable for encoding/decoding JSON in a streaming manner, which can handle large data sets without consuming a lot of memory.
- **Flexibility**: Can work directly with `io.Reader` and `io.Writer` interfaces, making them useful for network operations and large files.

@tab Cons:

- **Complexity**: Slightly more complex to use compared to `json.Marshal` and `json.Unmarshal`.
- **Error Handling**: Similar to `json.Marshal` and `json.Unmarshal`, error messages can be less clear for complex structures.

:::

### Custom Marshaler and Unmarshaler Interfaces (`json.Marshaler` and `json.Unmarshaler`):

::: tabs

@tab:active Pros:

- **Customization**: Full control over how types are encoded/decoded. Useful for handling complex types or custom JSON structures.
- **Flexibility**: Allows for implementing custom logic during marshaling/"unmarshaling."

@tab Cons:

- **Complexity**: More complex to implement and use, as it requires writing custom methods.
- **Maintenance**: Increases the maintenance burden since custom logic needs to be kept in sync with any changes in the struct or data format.

:::

### Use Cases and Recommendations

- **Simple Data Structures**: Use `json.Marshal` and `json.Unmarshal` for straightforward encoding/decoding of simple data structures.
- **Large Data Streams**: Use `json.NewEncoder` and `json.NewDecoder` for working with large data streams or when interacting with files or network operations.
- **Custom Requirements**: Implement `json.Marshaler` and `json.Unmarshaler` interfaces when you need custom behavior for specific types.
- **Quick Operations**: Use anonymous structs for quick, throwaway operations where defining a full struct type is unnecessary.

Each method has its own strengths and trade-offs, and the best choice depends on the specific requirements of your application.

### Conclusion

In conclusion, mastering JSON encoding and decoding is crucial for developing web applications in Golang.

By understanding the different methods available in the `encoding/json` package, you can choose the most suitable approach based on your specific requirements.

The `Marshal` and `Unmarshal` functions offer simplicity and flexibility for general use, while `NewEncoder` and `NewDecoder` provide efficient streaming capabilities for large datasets.

For scenarios that demand customized JSON representations, implementing the `json.Marshaler` and `json.Unmarshaler` interfaces gives you fine-grained control over the encoding and decoding processes.

Each method has its own strengths and trade-offs, and knowing when and how to use them will enable you handle JSON data effectively in your applications.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Send and Parse JSON Data in Golang - Data Encoding and Decoding Explained With Examples",
  "desc": "When building web applications in Golang, working with JSON data is inevitable. Whether you're sending responses to clients or parsing requests, JSON encoding and decoding are essential skills to master.  In this article, we'll explore the different ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/encoding-and-decoding-data-in-golang.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
