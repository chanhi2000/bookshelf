---
lang: en-US
title: "Web Scraping With RSelenium (Chrome Driver) and Rvest"
description: "Article(s) > Web Scraping With RSelenium (Chrome Driver) and Rvest"
icon: iconfont icon-r
category:
  - R
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - r
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Web Scraping With RSelenium (Chrome Driver) and Rvest"
    - property: og:description
      content: "Web Scraping With RSelenium (Chrome Driver) and Rvest"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/web-scraping-with-rselenium-chrome-driver-and-rvest.html
prev: /data-science/r/articles/README.md
date: 2025-03-17
isOriginal: false
author:
  - name: Elabonga Atuo
    url : https://freecodecamp.org/news/author/Ellabee/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1742219025681/47c07711-cfa5-482f-a72b-d127bc5b63bc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "R > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/r/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Web Scraping With RSelenium (Chrome Driver) and Rvest"
  desc="Web scraping lets you automatically extract data from websites, so you can store it in a structured format for later use. In this article, you'll explore how to use popular R libraries for web scraping to extract data from a website. The target websi..."
  url="https://freecodecamp.org/news/web-scraping-with-rselenium-chrome-driver-and-rvest"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1742219025681/47c07711-cfa5-482f-a72b-d127bc5b63bc.png"/>

Web scraping lets you automatically extract data from websites, so you can store it in a structured format for later use.

In this article, you'll explore how to use popular R libraries for web scraping to extract data from a website. The target website displays different books across multiple pages, requiring navigation between them. You'll learn how to use RVest for data extraction and RSelenium to automate button clicks.

There are a couple of housekeeping rules when it comes to harvesting data on the internet:

- **Inspect the robots.txt file**: Check the robots.txt file of a website to understand what data you are allowed to extract. You can find this file by appending “/robots.txt” to the website's home URL.
- **Review terms and conditions**: Before scraping, read the website's terms and conditions to understand the legal expectations regarding data extraction.
- **Limit requests**: Avoid overloading the server with requests by implementing rate limiting. The [<FontIcon icon="fas fa-globe"/>polite](https://dmi3kno.github.io/polite/) library in R can help manage request rates effectively.

Let’s dive in!

---

## Project Overview

![Here’s what we’re going to be building](https://cdn.hashnode.com/res/hashnode/image/upload/v1739891904874/e10f91f5-f5ba-4a9d-82d7-bd297b409b1b.gif)

This approach to web scraping allows you to see the browser in action as it navigates and extracts data from the website. Unlike headless browsing, where everything runs in the background without a visible interface, this method provides a graphical UI, making it easier to monitor and debug the process.

To practice your data mining skills, you will be scraping data from a website built specifically for that: [<FontIcon icon="fas fa-globe"/>Books To Scrape](https://books.toscrape.com/). You are going to be using a driver to drive a browser which will then open your target website. It’ll navigate from the first page, mimicking human behaviour (clicking the next button) while collecting data about the books, right to the last page.

---

## Project Setup

::: note Prerequisites

To follow along with this tutorial, you will need:

- R programming knowledge
- HTML knowledge
- R Studio installed

Note that I’m building this tutorial on a Windows machine.

:::

### Setup and Install Chrome Driver

First, you’ll want to check to make sure you have Java installed on your computer by running this terminal command:

```sh
java -version
```

If it’s not present, download and install Java [<FontIcon icon="fa-brands fa-java"/>here](https://java.com/en/download/).

Next, install the Chrome browser if you don’t already have it. Once it’s installed, check for your browser version in the settings section.

Then you can download the Browser Driver that corresponds to your Browser Version [<FontIcon icon="fa-brands fa-chrome"/>here](https://developer.chrome.com/docs/chromedriver/downloads/version-selection). Check where other browser drivers are stored on your device by running this in RStudio terminal:

```r :collapsed-lines
# install and load wdman and binman packages
install.packages("wdman")
library(wdman)

install.packages("binman")
library(binman)

# check drivers already installed
binman::list_versions(appname = "chromedriver")

# check browser driver locations
wdman::selenium(retcommand = TRUE, check = FALSE)
```

Extract the driver <FontIcon icon="fas fa-gear"/>`.exe` and store it at the specified folder location. This is usually the following location:

::: tabs

@tab:active <FontIcon icon="fa-brands fa-windows"/>

```
C:\Users\YourName\AppData\Local\binman\binman_chromedriver\win32\version\chromedriver.exe
```

:::

Now, add the drivers to your system path by specifying the folder path excluding the application. Confirm installation by running the following terminal command.

```sh
# Chromedriver SYSTEMS PATH: "C:\Users\YourName\AppData\Local\binman\binman_chromedriver\win32\version\"
# check chromedriver installation
chromedriver -version
```

---

## How to Understand and Inspect a Webpage

A webpage is a visual representation of an HTML document that is available on the internet and accessed through a web browser. The components of a webpage, called elements, are structured hierarchically in a HTML DOM (Document Object Model) tree. Each element can be located using specific paths called selectors or locators, which you can read more about [<FontIcon icon="fas fa-globe"/>here](https://testrigor.com/blog/css-selector-vs-xpath-your-pocket-cheat-sheet/).

Developer Tools are a set of tools available in your browser. They’re helpful for inspecting and analyzing a webpage’s structure. The feature “Inspect“ helps examine the structure and styling of a specific element. You can access this feature by selecting the element you would like to inspect, right clicking on it, and clicking “Inspect”.

![Inspecting an element](https://cdn.hashnode.com/res/hashnode/image/upload/v1739974770342/59c960b1-2c88-4c1d-a23d-d9e9fee91dc5.gif)

---

## How to Extract Data Using RVest

RVest is an R package that contains a set of functions that enables you to extract data from HTML and XML web pages

We are interested in extracting the following information about books from every page on the website’s catalogue:

- Book Title
- Book Rating
- Book Price
- Individual Book Link
- Cover Image Link

Let’s go through the steps for using RVest to extract this data.

### Step 1: Load the webpage

To load the first page of your target website and parse the HTML document using the RVest package in R, follow these steps:

#### 1. Install and load the RVest package

If you haven't already installed the RVest package, you can do so by running the following command in R:

```r
install.packages("rvest")
```

Then, load the package:

```r
library(rvest)
```

#### 2. Load the webpage and parse the HTML

Use the `read_html()` function from the RVest package to fetch and parse the HTML content of the webpage. Here's an example of how to do this:

```r
# Specify the URL of the target website
url <- "https://books.toscrape.com/"

# Fetch and parse the HTML content
webpage <- read_html(url)
```

This code will download the HTML content of the specified webpage and convert it into an XML document, making it easier to structure and organize the data for further processing or storage.

### Step 2: Identify the target elements

The target elements are the HTML elements that contain the specific data you intend to extract.

A quick inspection of the webpage using developer tools shows that the each book’s information is contained in an `article` tag and forms part of an ordered list. It’s important to specify the `<ol>` tag in the path, as there are other lists in the tree.

The pipe `%>%` operator facilitates chaining operations, making it easier to extract elements step by step. `html_element()` returns the first matching element while `html_elements()` returns all the elements that match the defined path.

```r :collapsed-lines
# define the path from which other details will be extracted
book <- books %>% html_element("ol")  %>% html_elements("li") %>% html_element("article")

# extracting details using css locators.
# title
title <- book %>% 
  html_element("h3 a") %>% 
  html_attr("title")

# rating
rating <- book %>% 
  html_element("p") %>% 
  html_attr("class")

# price
price <- book %>% 
  html_element(".product_price p") %>% 
  html_text2()

#link to book page
book_link <- book %>% 
  html_element("h3 a") %>% 
  html_attr("href")

# cover page image link
cover_page_link <- book %>% 
  html_element(".image_container a img") %>% 
  html_attr("src")

# inspect right format by selecting the first element of each detail
title[[1]]
rating[[1]]
price[[1]]
book_link[[1]]
cover_page_link[[1]]
```

### Step 3: Clean the “rating” data

To clean the "star-rating" data, you can use the `stringr` package in R to remove the unnecessary text and trim any whitespace. Here's how you can do it:

```r
library(stringr)

# Example of extracted rating data
rating_data <- "star-rating Three"

# Remove "star-rating " and trim whitespace
cleaned_rating <- str_trim(str_replace(rating_data, "star-rating ", ""))

# Output the cleaned rating
cleaned_rating
```

This code will output "Three", effectively removing the "star-rating" prefix and any leading or trailing whitespace.

---

## How to Mimic Human Behaviour Using RSelenium

### How Selenium Works

Selenium is a tool that allows you to simulate user actions on a website, usually for testing purposes. RSelenium is an R library that allows you to access this functionality.

![Diagram illustrating Selenium's architecture. It shows a client with a Selenium script communicating with a server's browser driver using JSON Wire Protocol over HTTP. The server then sends a HTTP request to a browser](https://cdn.hashnode.com/res/hashnode/image/upload/v1739961235501/f358a1e1-6a2f-45dd-a0b0-12925811cab1.png)

We need a script, a browser, and browser driver to mimic user behaviour. The code you write that contains the instructions detailing the actions you would like to automate is the script. The browser driver acts as a bridge between your script and the browser and performs your desired actions by translating the script into actions.

The script, when run, is the client which requests and receives info from the browser driver’s server.

When you run a script, the script is converted to JSON format data which is then transferred to the browser driver via the JSON Wire Protocol. A protocol is simply a set of rules that define how data should be managed and handle during transfer across devices.

The driver receives and validates the received data. If successful, it communicates the actions defined in the script to the browser. If it’s unsuccessful, an error is sent to the client.

On browser initialization, the driver performs the actions step by step. This carries on to completion or until an error is encountered (missing elements, server errors, and so on). The bidirectional communication between the driver and browser is via HTTP. Finally, the results are sent back to the client and the browser is shut down.

### Automating Page Navigation and Data Collection with RSelenium

```r
# install and load RSelenium
install.packages("RSelenium")
library(RSelenium)

# initialize and run the chrome driver
rD <- rsDriver(browser = "chrome", port = 4567L)

# extract and assign the client
remDr <- rD[["client"]]
```

Running `rsDriver()` starts a Selenium server that launches ChromeDriver. Extract and assign the `rD[["client"]]` to a variable. This variable allows you to control and interact with the browser.

Sometimes, starting the driver may fail due to reasons such as permission restrictions, missing dependencies, or incorrect setup. If that happens, you can manually launch ChromeDriver by adding the following block of code right after loading the libraries at the top of the script. It is important to ensure the port numbers match.

```r
cDrv <- chrome(verbose = FALSE, check = FALSE, port = 4567L)
cDrv$process
```

Now, navigate to the target webpage:

```r
# naivigate to the target site
remDr$navigate("https://books.toscrape.com/")

#maximize Chrome Window Size
remDr$maxWindowSize()
```

And scroll to the bottom of the page:

```r
# scroll to the bottom of the page
webElem <- remDr$findElement("css", "body")
webElem$sendKeysToElement(list(key = "end"))
```

The above code locates the body element and simulates pressing the down key to the end of the page.

Now, click Next to navigate to the next page:

```r
# locate next button and click next
nextPage <-  remDr$findElement(using = "css selector",
                               value = ".next > a")
nextPage$clickElement()
```

Find the element that contains the link to the next page and click on it to redirect you.

Now we’re going to write a while loop that navigates through all the pages, up to page 50, and then closes the browser once it’s done.

A while loop executes a piece of code as long as a specific condition is met. Once the condition is not met, the loop exits.

```r
while(condition is TRUE){
    #DO SOMETHING
}
```

Write a loop that ensures the next page button is clicked as long as the element containing the link to the next page is visible in the HTML DOM.

First, locate the next button element. Its presence in the open webpage makes sure that the loop runs.

The last page does not have a next button, so the loop will exit when it reaches that page (and Selenium will throw an error due to the missing element).

```r
nextPage <- remDr$findElement(using = "css selector", value = ".next > a")
```

Wrap the nextPage element search in a `tryCatch()` block. This prevents the script from crashing if the 'Next' button is missing. If an error occurs, `tryCatch()` returns `NULL`, signaling that there are no more pages to navigate.

An `if` block then checks for a `NULL` value. If encountered, a message is displayed to inform the client that no 'Next' button was found, and the `break` statement exits the loop.

Finally, close the browser once the driver navigates to the last page (page 50 in the catalogue) to free up system resources using `remDr$close()`.

```r
while (TRUE) {  
  # Try to find and click "Next" button
  nextPage <- tryCatch({
    remDr$findElement(using = "css selector", value = ".next > a")
  }, error = function(e) {
    return(NULL)  # No more pages
  })

  if (is.null(nextPage)) {
    message("No 'Next' button found. Exiting loop.")
    break
  }

  nextPage$clickElement()
  Sys.sleep(3)  # Allow next page to load

}
print("finished scraping")
remDr$close()
```

---

## How to Combine RSelenium & RVest and Save to CSV

Now that we’ve extracted data from specific HTML elements using RVest and automated user actions using RSelenium, let’s combine the two to scrape data from all the pages in the website.

### Create a scrape books function

You will be saving the scraped books information in a CSV file. First, create an empty dataframe to hold the scraped data:

```r
# install and load dplyr for dataframe manipulation
install.packages("dplyr")
library(dplyr)

# create a dataframe to hold book information
Books <-  data.frame()
```

### Retrieve and parse the webpage

For Rvest to work with RSelenium, you have to retrieve the HTML source of the currently loaded webpage within the Selenium-controlled browser using `remDr$getPageSource()[[1]]` to extract the HMTL content.

```r
page <- remDr$getPageSource()[[1]]
```

Convert the HTML content to XML using `read_html()` like this:

```r
# define the path from which other details will be extracted
books <- read_html(page)  %>% html_element("ol")  %>% html_elements("li") %>% html_element("article")
```

Extract each book’s details using CSS selectors with `rvest` functions. The scraped objects returned are XML objects and lists. They need to be formatted to character strings, preventing unexpected data type issues when working with the data. Do this by piping `as.character()` at the very end of each extracted detail.

```r
# title
title <- book %>% 
  html_element("h3 a") %>% 
  html_attr("title") %>% 
  as.character()
```

Wrap the block of code used to extract details from HTML elements in a function and return a dataframe whose column values are the book details. This makes the code reusable and modular.

```r :collapsed-lines
scrape_books <- function() {
  page <- remDr$getPageSource()[[1]]

  # define the path from which other details will be extracted
  books <- read_html(page)  %>% html_element("ol")  %>% html_elements("li") %>% html_element("article")

  # extracting details using css locators.
  # title
  title <- book %>% 
    html_element("h3 a") %>% 
    html_attr("title") %>% 
    as.character() 

  # rating
  rating <- book %>% 
    html_element("p") %>% 
    html_attr("class") %>% 
    as.character() 

  cleaned_rating <- str_trim(gsub("star-rating", "", rating))

  # price
  price <- book %>% 
    html_element(".product_price p") %>% 
    html_text2() %>% 
    as.character() 

  #link to book page
  book_link <- book %>% 
    html_element("h3 a") %>% 
    html_attr("href") %>% 
    as.character() 

  # image link
  cover_page_link <- book %>% 
    html_element(".image_container a img") %>% 
    html_attr("src") %>% 
    as.character() 

  return(data.frame(title,cleaned_rating,price,book_link,cover_page_link, stringsAsFactors = FALSE))
}
```

### Write to CSV

Save the dataframe to a CSV file saved as “books.csv“:

```r
write.csv(Books, file = "./books.csv", fileEncoding = "UTF-8")
```

---

## Bringing it All Together

Let’s review what we’ve done so far: First, the script to scrape book data begins by loading the browser, maximizing the window size, and navigating to the Books To Scrape Page.

Then we created an empty dataframe to hold the scraped data. We then scraped the data from the first page, saved it to the dataframe, and located the ‘Next‘ button in order to navigate to the next page – from which we scraped data and stored it.

The process of scraping, adding to the dataframe, and clicking the next page button continues until the ‘Next’ button is no longer available in the HTML DOM.

Once the last page has been reached, the code exits the loop and saves the data to CSV. Finally, it closes the driver to free up system resources.

```r :collapsed-lines
# load libraries
library(wdman)
library(binman)
library(rvest)
library(stringr)
library(RSelenium)
library(dplyr)


cDrv <- chrome(verbose = FALSE, check = FALSE, port = 4450L)
cDrv$process

rD <- rsDriver(browser = "chrome", port = 4450L)
remDr <- rD[["client"]]


remDr$navigate("https://books.toscrape.com/")
remDr$maxWindowSize()

page <- remDr$getPageSource()[[1]]
webElem <- remDr$findElement("css", "body")
webElem$sendKeysToElement(list(key = "end"))

nextPage <-  remDr$findElement(using = "css selector",
                               value = ".next > a")
nextPage$clickElement()


# converting the lists containg the scraped data into a dataframe 
Books <-  data.frame(title = character(), rating = character(), stringsAsFactors = FALSE)

scrape_books <- function() {
    page <- remDr$getPageSource()[[1]]

    # define the path from which other details will be extracted
    books <- read_html(page)  %>% html_element("ol")  %>% html_elements("li") %>% html_element("article")

    # extracting details using css locators.
    # title
    title <- book %>% 
      html_element("h3 a") %>% 
      html_attr("title") %>% 
      as.character() 

    # rating
    rating <- book %>% 
      html_element("p") %>% 
      html_attr("class") %>% 
      as.character() 

    cleaned_rating <- str_trim(gsub("star-rating", "", rating))

    # price
    price <- book %>% 
      html_element(".product_price p") %>% 
      html_text2() %>% 
      as.character() 

    #link to book page
    book_link <- book %>% 
      html_element("h3 a") %>% 
      html_attr("href") %>% 
      as.character() 

    # image link
    cover_page_link <- book %>% 
      html_element(".image_container a img") %>% 
      html_attr("src") %>% 
      as.character() 

    return(data.frame(title,cleaned_rating,price,book_link,cover_page_link, stringsAsFactors = FALSE))
}

# scrape first page
Books <- rbind(Books, scrape_books())

while (TRUE) {
  # scrape current page
  Books <- rbind(Books, scrape_books())

  # find and click "next" button
  nextPage <- tryCatch({
    remDr$findElement(using = "css selector", value = ".next > a")
  }, error = function(e) {
    return(NULL)  # No more pages
  })

  # exit loop if "next" button is missing
  if (is.null(nextPage)) {
    message("No 'Next' button found. Exiting loop.")
    break
  }

  nextPage$clickElement()
  # Allow next page to load
  Sys.sleep(3)  

}

write.csv(Books, file = "./books.csv", fileEncoding = "UTF-8")
print("finished scraping")
remDr$close()
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740129915080/2ee1344b-58a8-477b-a568-719ba4336c95.png)

---

## Conclusion

In this tutorial, you learned how to effectively combine RSelenium and RVest to scrape data from a website. By leveraging RSelenium, you can automate user interactions and navigate through web pages, while RVest allows you to extract specific data from HTML elements.

This approach provides a powerful and flexible method for web scraping, enabling you to handle dynamic content and mimic human behavior. By following the steps outlined here, you can successfully scrape data from multiple pages and save it to a CSV file for further analysis.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Web Scraping With RSelenium (Chrome Driver) and Rvest",
  "desc": "Web scraping lets you automatically extract data from websites, so you can store it in a structured format for later use. In this article, you'll explore how to use popular R libraries for web scraping to extract data from a website. The target websi...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/web-scraping-with-rselenium-chrome-driver-and-rvest.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
