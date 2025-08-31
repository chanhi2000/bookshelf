---
lang: ko-KR
title: "Or else what?"
description: "Article(s) > Or else what?"
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
      content: "Article(s) > Or else what?"
    - property: og:description
      content: "Or else what?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/hackingwithswift.com/read/05/06-or-else-what.html
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
  "title": "Or else what? | Hacking with iOS",
  "desc": "Or else what?",
  "link": "https://hackingwithswift.com/read/5/6/or-else-what",
  "logo": "https://hackingwithswift.com/favicon.svg",
  "background": "rgba(174,10,10,0.2)"
}
```

<VidStack src="youtube/Dh__ZeZJbOg" />

There remains one problem to fix with our code, and it's quite a tedious problem. If the word is possible and original and real, we add it to the list of found words then insert it into the table view. But what if the word isn't possible? Or if it's possible but not original? In this case, we reject the word and don't say why, so the user gets no feedback.

So, the final part of our project is to give users feedback when they make an invalid move. This is tedious because it's just adding `else` statements to all the `if` statements in `submit()`, each time configuring a message to show to users.

Here's the adjusted method:

```swift
func submit(answer: String) {
    let lowerAnswer = answer.lowercased()

    let errorTitle: String
    let errorMessage: String

    if isPossible(word: lowerAnswer) {
        if isOriginal(word: lowerAnswer) {
            if isReal(word: lowerAnswer) {
                usedWords.insert(answer, at: 0)

                let indexPath = IndexPath(row: 0, section: 0)
                tableView.insertRows(at: [indexPath], with: .automatic)

                return
            } else {
                errorTitle = "Word not recognised"
                errorMessage = "You can't just make them up, you know!"
            }
        } else {
            errorTitle = "Word used already"
            errorMessage = "Be more original!"
        }
    } else {
        guard let title = title?.lowercased() else { return }
        errorTitle = "Word not possible"
        errorMessage = "You can't spell that word from \(title)"
    }

    let ac = UIAlertController(title: errorTitle, message: errorMessage, preferredStyle: .alert)
    ac.addAction(UIAlertAction(title: "OK", style: .default))
    present(ac, animated: true)
}
```

As you can see, every `if` statement now has a matching `else` statement so that the user gets appropriate feedback. All the `else`s are effectively the same (albeit with changing text): set the values for `errorTitle` and `errorMessage` to something useful for the user. The only interesting exception is the last one, where we use string interpolation to show the view controller's title as a lowercase string.

If the user enters a valid answer, a call to `return` forces Swift to exit the method immediately once the table has been updated. This is helpful, because at the end of the method there is code to create a new `UIAlertController` with the error title and message that was set, add an OK button without a handler (i.e., just dismiss the alert), then show the alert. So, this error will only be shown if something went wrong.

This demonstrates one important tip about Swift constants: both `errorTitle` and `errorMessage` were declared as constants, which means their value cannot be changed once set. I didn't give either of them an initial value, and that's OK - Swift lets you do this as long as you do provide a value before the constants are read, and also as long as you don't try to change the value again later on.

Other than that, your project is done. Go and play!

