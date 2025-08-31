---
lang: ko-KR
title: "Creating the basic UI: UITabBarController"
description: "Article(s) > Creating the basic UI: UITabBarController"
category:
  - Swift
  - iOS
  - Article(s)
tag: 
  - blog
  - hackingwithswift.com
  - crashcourse
  - swift
  - xcode
  - appstore
  - ios  
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Creating the basic UI: UITabBarController"
    - property: og:description
      content: "Creating the basic UI: UITabBarController"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/07/03-parsing-json-using-the-codable-protocol.html
isOriginal: false
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Hacking with iOS - learn to code iPhone and iPad apps with free Swift tutorials",
  "desc": "Learn Swift coding for iOS with these free tutorials - learn Swift, iOS, and Xcode",
  "link": "/hackingwithswift.com/read/README.md",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Creating the basic UI: UITabBarController | Hacking with iOS",
  "desc": "Creating the basic UI: UITabBarController",
  "link": "https://hackingwithswift.com/read/7/3/parsing-json-using-the-codable-protocol",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/9FriGMWIbdc" />

JSON - short for JavaScript Object Notation - is a way of describing data. It's not the easiest to read yourself, but it's compact and easy to parse for computers, which makes it popular online where bandwidth is at a premium.

Before we do the parsing, here is a tiny slice of the actual JSON you'll be receiving:

```swift
{
    "metadata":{
        "responseInfo":{
            "status":200,
            "developerMessage":"OK",
        }
    },
    "results":[
        {
            "title":"Legal immigrants should get freedom before undocumented immigrants - moral, just and fair",
            "body":"I am petitioning President Trump's Administration to take a humane view of the plight of legal immigrants. Specifically, legal immigrants in Employment Based (EB) category. I believe, such immigrants were short changed in the recently announced reforms via Executive Action (EA), which was otherwise long due and a welcome announcement.",
            "issues":[
                {
                    "id":"28",
                    "name":"Human Rights"
                },
                {
                    "id":"29",
                    "name":"Immigration"
                }
            ],
            "signatureThreshold":100000,
            "signatureCount":267,
            "signaturesNeeded":99733,
        },
        {
            "title":"National database for police shootings.",
            "body":"There is no reliable national data on how many people are shot by police officers each year. In signing this petition, I am urging the President to bring an end to this absence of visibility by creating a federally controlled, publicly accessible database of officer-involved shootings.",
            "issues":[
                {
                    "id":"28",
                    "name":"Human Rights"
                }
            ],
            "signatureThreshold":100000,
            "signatureCount":17453,
            "signaturesNeeded":82547,
        }
    ]
}
```

You'll actually be getting between 2000-3000 lines of that stuff, all containing petitions from US citizens about all sorts of political things. It doesn't really matter (to us) what the petitions are, we just care about the data structure. In particular:

1. There's a metadata value, which contains a `responseInfo` value, which in turn contains a status value. Status 200 is what internet developers use for "everything is OK."
2. There's a results value, which contains a series of petitions.
3. Each petition contains a title, a body, some issues it relates to, plus some signature information.
4. JSON has strings and integers too. Notice how the strings are all wrapped in quotes, whereas the integers aren't.

Swift has built-in support for working with JSON using a protocol called `Codable`. When you say “my data conforms to `Codable`”, Swift will allow you to convert freely between that data and JSON using only a little code.

Swift’s simple types like `String` and `Int` automatically conform to `Codable`, and arrays and dictionaries also conform to `Codable` if they contain `Codable` objects. That is, `[String]` conforms to `Codable` just fine, because `String` itself conforms to `Codable`.

Here, though, we need something more complex: each petition contains a title, some body text, a signature count, and more. That means we need to define a custom struct called `Petition` that stores one petition from our JSON, which means it will track the title string, body string, and signature count integer.

So, start by pressing <kbd>Cmd</kbd>+<kbd>N</kbd> and choosing to create a new Swift file called <FontIcon icon="fa-brands fa-swift"/>`Petition.swift`.

```swift
struct Petition {
    var title: String
    var body: String
    var signatureCount: Int
}
```

That defines a custom struct with three properties. You might remember that one of the advantages of structs in Swift is that it gives us a *memberwise initializer* - a special function that can create new `Petition` instances by passing in values for `title`, `body`, and `signatureCount`.

We’ll come onto that in a moment, but first I mentioned the `Codable` protocol. Our `Petition` struct contains two strings and an integer, all of which conforms to `Codable` already, so we can ask Swift to make the whole `Petition` type conform to `Codable` like this:

```swift
struct Petition: Codable {
    var title: String
    var body: String
    var signatureCount: Int
}
```

With that simple change we’re almost ready to load instances of `Petition` from JSON.

I say *almost* ready because there’s a slight wrinkle in our plan: if you looked at the JSON example I gave above, you’ll have noticed that our array of petitions actually comes inside a dictionary called “results”. This means when we try to have Swift parse the JSON we need to load that key first, then *inside* that load the array of petition results.

Swift’s `Codable` protocol needs to know exactly where to find its data, which in this case means making a *second* struct. This one will have a single property called `results` that will be an array of our `Petition` struct. This matches exactly how the JSON looks: the main JSON contains the `results` array, and each item in that array is a `Petition`.

So, press <kbd>Cmd</kbd>+<kbd>N</kbd> again to make a new file, choosing Swift file and naming it <FontIcon icon="fa-brands fa-swift"/>`Petitions.swift`. Give it this content:

```swift
struct Petitions: Codable {
    var results: [Petition]
}
```

I realize this seems like a lot of work, but trust me: it gets much easier!

All we’ve done is define the kinds of data structures we want to load the JSON into. The next step is to create a property in `ViewController` that will store our petitions array.

As you'll recall, you declare arrays just by putting the data type in brackets, like this:

```swift
var petitions = [String]()
```

We want to make an array of our `Petition` object. So, it looks like this:

```swift
var petitions = [Petition]()
```

Put that in place of the current `petitions` definition at the top of <FontIcon icon="fa-brands fa-swift"/>`ViewController.swift`.

It's now time to parse some JSON, which means to process it and examine its contents. We're going to start by updating the `viewDidLoad()` method for `ViewController` so that it downloads the data from the Whitehouse petitions server, converts it to a Swift `Data` object, then tries to convert it to an array of `Petition` instances.

We haven’t used `Data` before. Like `String` and `Int` it’s one of Swift’s fundamental data types, although it’s even more low level - it holds literally any binary data. It might be a string, it might be the contents of a zip file, or literally anything else.

`Data` and `String` have quite a few things in common.
You already saw that `String` can be created using `contentsOf` to load data from disk, and `Data` has exactly the same initializer.

This is perfect for our needs - here's the new `viewDidLoad` method:

```swift
override func viewDidLoad() {
    super.viewDidLoad()

    // let urlString = "https://api.whitehouse.gov/v1/petitions.json?limit=100"
    let urlString = "https://hackingwithswift.com/samples/petitions-1.json"

    if let url = URL(string: urlString) {
        if let data = try? Data(contentsOf: url) {
            // we're OK to parse!
        }
    }
}
```

::: note

Above I’ve included a URL for the official Whitehouse API feed, but that might go away or change at any point in the future. So, to avoid problems I’ve taken a copy of that feed and put it on my own site - you can use either the official API or my own copy.

:::

Let's focus on the new stuff:

- `urlString` points either to the Whitehouse.gov server or to my cached copy of the same data, accessing the available petitions.
- We use `if let` to make sure the `URL` is valid, rather than force unwrapping it. Later on you can return to this to add more URLs, so it's good play it safe.
- We create a new `Data` object using its `contentsOf` method. This returns the content from a `URL`, but it might throw an error (i.e., if the internet connection was down) so we need to use `try?`.
- If the `Data` object was created successfully, we reach the “we're OK to parse!” line. This starts with `//`, which begins a comment line in Swift. Comment lines are ignored by the compiler; we write them as notes to ourselves.

This code isn't perfect, in fact far from it. In fact, by downloading data from the internet in `viewDidLoad()` our app will lock up until all the data has been transferred. There are solutions to this, but to avoid complexity they won't be covered until project 9.

For now, we want to focus on our JSON parsing. We already have a `petitions` array that is ready to accept an array of petitions. We want to use Swift’s `Codable` system to parse our JSON into that array, and once that's done tell our table view to reload itself.

Are you ready? Because this code is remarkably simple given how much work it's doing:

```swift
func parse(json: Data) {
    let decoder = JSONDecoder()

    if let jsonPetitions = try? decoder.decode(Petitions.self, from: json) {
        petitions = jsonPetitions.results
        tableView.reloadData()
    }
}
```

Place that method just underneath `viewDidLoad()` method, then replace the existing `// we're OK to parse!` line in `viewDidLoad()` with this:

```swift
parse(json: data)
```

This new `parse()` method does a few new and interesting things:

1. It creates an instance of `JSONDecoder`, which is dedicated to converting between JSON and `Codable` objects.
2. It then calls the `decode()` method on that decoder, asking it to convert our `json` data into a `Petitions` object. This is a throwing call, so we use `try?` to check whether it worked.
3. If the JSON was converted successfully, assign the `results` array to our `petitions` property then reload the table view.

The one part you haven’t seen before is `Petitions.self`, which is Swift’s way of referring to the `Petitions` type itself rather than an instance of it. That is, we’re not saying “create a new one”, but instead specifying it as a parameter to the decoding so `JSONDecoder` knows what to convert the JSON too.

You can run the program now, although it just shows “Title goes here” and “Subtitle goes here” again and again, because our `cellForRowAt` method just inserts dummy data.

We want to modify this so that the cells print out the `title` value of our `Petition` object, but we also want to use the subtitle text label that got added when we changed the cell type from "Basic" to "Subtitle" in the storyboard. To do that, change the `cellForRowAt` method to this:

```swift
let petition = petitions[indexPath.row]
cell.textLabel?.text = petition.title
cell.detailTextLabel?.text = petition.body
```

Our custom `Petition` type has properties for `title`, `body` and `signatureCount`, so now we can read them out to configure our cell correctly.

If you run the app now, you'll see things are starting to come together quite nicely - every table row now shows the petition title, and beneath it shows the first few words of the petition's body. The subtitle automatically shows "…" at the end when there isn't enough room for all the text, but it's enough to give the user a flavor of what's going on.

::: tip

If you don’t see any data, make sure you named all the properties in the `Petition` struct correctly - the `Codable` protocol matches those names against the JSON directly, so if you have a typo in “signatureCount” then it will fail.

:::

