---
lang: ko-KR
title: "How to delete a Core Data object"
description: "Article(s) > How to delete a Core Data object"
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
      content: "Article(s) > How to delete a Core Data object"
    - property: og:description
      content: "How to delete a Core Data object"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/38/09-how-to-delete-a-core-data-object.html
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
  "title": "How to delete a Core Data object | Hacking with iOS",
  "desc": "How to delete a Core Data object",
  "link": "https://hackingwithswift.com/read/38/9/how-to-delete-a-core-data-object",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

Table views have a built-in swipe to delete mechanic that we can draw upon to let users delete commits in our app. Helpfully, managed object context has a matching `delete()` method that will delete any object regardless of its type or location in the object graph. Once an object has been deleted from the context, we can then call `saveContext()` to write that change back to the persistent store so that the change is permanent.

All this is easy to do by adding three new lines of code to the table view’s `commit` method. Here's the new method:

```swift
override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    if editingStyle == .delete {
        let commit = commits[indexPath.row]
        container.viewContext.delete(commit)
        commits.remove(at: indexPath.row)
        tableView.deleteRows(at: [indexPath], with: .fade)

        saveContext()
    }
}
```

So, it 1) pulls out the `Commit` object that the user selected to delete, 2) removes it from the managed object context, 3) removes it from the `commits` array, 4) deletes it from the table view, then 5) saves the context. Remember: you must call `saveContext()` whenever you want your changes to persist.

Try running the app now, then swipe to delete a few rows. As you'll see you can delete as many commits as you want, and everything seems to work great. Now try running the app once again, and you'll get a nasty shock: the deleted commits reappear! What's going on?

Well, if you think about it, the app is doing exactly what we told it to do: every time it runs it re-fetches the list of commits from GitHub, and merges it with the commits in its data store. This means any commits we try to delete just get redownloaded again - they really are being deleted, but then they get recreated as soon as the app is relaunched.

This problem is not a hard one to fix, and it gives me a chance to show you another part of `NSFetchRequest`: the `fetchLimit` property. This tells Core Data how many items you want it to return. What we're going to do is find the newest commit in our data store, then use the date from that to ask GitHub to provide only newer commits.

First, go to the `fetchCommits()` method and modify the start of it to this:

```swift
@objc func fetchCommits() {
    let newestCommitDate = getNewestCommitDate()

    if let data = try? String(contentsOf: URL(string: "https://api.github.com/repos/apple/swift/commits?per_page=100&amp;since=\(newestCommitDate)")!) {
        let jsonCommits = JSON(parseJSON: data)
```

We'll be adding the `getNewestCommitDate()` method shortly, but what it will return is a date formatted as an ISO-8601 string. This date will be set to one second after our most recent commit, and we can send that to the GitHub API using its "since" parameter to receive back only newer commits.

Here is the `getNewestCommitDate()` method - only three pieces of it are new, and I'll explain them momentarily.

```swift
func getNewestCommitDate() -> String {
    let formatter = ISO8601DateFormatter()

    let newest = Commit.createFetchRequest()
    let sort = NSSortDescriptor(key: "date", ascending: false)
    newest.sortDescriptors = [sort]
    newest.fetchLimit = 1

    if let commits = try? container.viewContext.fetch(newest) {
        if commits.count > 0 {
            return formatter.string(from: commits[0].date.addingTimeInterval(1))
        }
    }

    return formatter.string(from: Date(timeIntervalSince1970: 0))
}
```

The first of the new pieces of code is the `fetchLimit` property for the fetch request. As you might imagine, it's always more efficient to fetch as few objects as needed, so if you can set a fetch limit you should do so.

Second, the `string(from:)` method is the inverse of the `date(from:)` method we used when parsing the commit JSON. We use the same date format that was defined earlier, because GitHub's "since" parameter is specified in an identical way. Finally, `addingTimeInterval()` is used to add one second to the time from the previous commit, otherwise GitHub will return the newest commit again.

If no valid date is found, the method returns a date from the 1st of January 1970, which will reproduce the same behavior we had before introducing this date change.

This solution is a good start, but it has a small flaw - see if you can spot it! If not, don't worry: I'll be setting it as homework for you. Regardless, it gave me the chance to show you the `fetchLimit` property, and you know how much I love squeezing new knowledge in…

