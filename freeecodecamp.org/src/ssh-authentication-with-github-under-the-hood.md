---
lang: en-US
title: "How SSH Authentication with GitHub Works Under the Hood"
description: "Article(s) > How SSH Authentication with GitHub Works Under the Hood"
icon: iconfont icon-github
category:
  - DevOps
  - Github
  - Seucrity
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - github
  - sec
  - security
  - ssh
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How SSH Authentication with GitHub Works Under the Hood"
    - property: og:description
      content: "How SSH Authentication with GitHub Works Under the Hood"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/ssh-authentication-with-github-under-the-hood.html
prev: /devops/github/articles/README.md
date: 2025-02-13
isOriginal: false
author:
  - name: Vivek Agrawal
    url : https://freecodecamp.org/news/author/vkweb/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739082652213/aba38efa-117c-4ef7-a844-91599c0a4d62.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How SSH Authentication with GitHub Works Under the Hood"
  desc="SSH (Secure Shell) is a client-server protocol for connecting and authenticating to a remote server. Authentication means that the remote server can verify that it’s actually you and not somebody else talking on your behalf. You may already be using ..."
  url="https://freecodecamp.org/news/ssh-authentication-with-github-under-the-hood"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739082652213/aba38efa-117c-4ef7-a844-91599c0a4d62.png"/>

SSH (Secure Shell) is a client-server protocol for connecting and authenticating to a remote server.

Authentication means that the remote server can verify that it’s actually you and not somebody else talking on your behalf.

You may already be using GitHub’s SSH authentication, but do you know how it actually works? In this article, you’ll learn what happens under the hood and how SSH authentication actually works.

Along the way, you’ll understand the fundamental concepts of cryptography that every developer should know about: symmetric key encryption, asymmetric key encryption, cryptographic hash functions, and digital signatures.

Some developers usually don’t get the chance to learn and understand these cryptography fundamentals, but these concepts will help you in the long run. Also, they’ll help you be in a much better position to take informed security decisions for your production web applications.

So come on, fasten your seat belts, and let’s start!

---

## First, Why is Authentication So Important?

When we run `git push`, GitHub needs to verify that the right person is interacting with GitHub. Imagine if an attacker could manage to do `git push` on your behalf.

Then all your repositories would be under that attacker's control. They could delete all your code along with all the commit history.

This sounds quite dangerous, doesn’t it? So to verify that it’s actually you who’s talking to GitHub, and not an attacker, GitHub has several ways to authenticate you.

The most widely used method to authenticate with GitHub is SSH authentication.

Before we understand how SSH authentication works under the hood, we will need to understand the fundamental cryptography concepts, namely — symmetric key encryption, asymmetric key encryption, cryptographic hash functions, and digital signatures.

Let’s begin!

---

## Symmetric Key Encryption

In the ancient days, rulers devised various methods of communicating secret military messages to their army commanders.

One of the earliest methods, likely used by ancient Greek rulers and possibly later the Romans, involved using a cylindrical wooden rod called a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Scytale](https://en.wikipedia.org/wiki/Scytale).

Before a military invasion, the ruler would have two exact same cylindrical wooden rods made called scytales. Then he would give one scytale to the army commander and keep one for himself.

![A scytale with leather strip wounded and a message written on it.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734514827027/b4945c3a-64d4-458b-a410-f23b1a08d9ef.png)

The device worked by winding a strip of leather around the scytale. After doing this, the ruler would write the message on top of the wound-up leather strip so that it could only be read when properly wound again.

Suppose the scytale allowed him to write three letters around in a circle and five letters straight across/along its length. The wound leather strip with the message `attackfromright` written on it would look like this:

```plaintext
       |   |   |   |   |   |
       | a | t | t | a | c |  |
     __| k | f | r | o | m |__|
    |  | r | i | g | h | t |
    |  |   |   |   |   |   |
```

After writing the message on the scytale, the ruler would unwind the leather strip and send it to the army commander. When it was unwound, the leather strip would have the following jumbled message:

```plaintext
----------------
akrtfitrgaohcmt
----------------
```

So now you see, even if the leather strip got intercepted by an enemy spy, the message would not make sense. Isn't this fascinating? The smart use of a wooden rod and a leather strip might have helped some ancient rulers win battles!

When the leather strip reached the army commander, he would wind it around his own scytale (which would be exactly the same as ruler’s), and then the commander would be able to understand the message properly.

This scytale technique is actually an example of symmetric key encryption in practice.

Encryption is a process in which the original message is modified (or encoded) in such a way that only the intended recipient can decode and see the actual message.

The original message is called plaintext, while the encoded message is called ciphertext. Encryption converts `plaintext to ciphertext` with the help of a key.

To decrypt the message, that is to convert `ciphertext to plaintext`, a person must have access to that same key.

If we compare it to the scytale technique, the scytale is the key. The ruler only shares the key (scytale) with the army commander who needs to know what the message says.

Here's what the encryption process looks like:

![Encryption with scytale as key.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734519516607/75c926a3-faec-402a-8bcd-122039f47a01.png)

The decryption process will look like this:

![Decryption with scytale as key.](https://cdn.hashnode.com/res/hashnode/image/upload/v1734519525487/de096889-332c-4482-b2df-b28ce609a8a6.png)

We call this symmetric key encryption because the same key is used to both encrypt and decrypt the message.

This key (the scytale) must be kept protected from enemy access. If the enemy get’s access to this key, then they’ll be able to decrypt the messages.

But there’s another type of encryption called asymmetric key encryption. Now that you understand symmetric key encryption, let’s move on to asymmetric key encryption.

---

## Asymmetric Key Encryption

In symmetric key encryption, like we saw above, the same key was used by both the ruler and the army commander to encrypt and decrypt the message.

But in an asymmetric key encryption, there are two keys (called a key pair). Out of the two keys, one is a private key and the other is a public key.

The public key can be shared with everyone (which is why it’s called public). But the private key is meant to be kept secret! It must never ever be revealed to anybody.

![Public key can be shared with everyone. But the private key must be kept secret.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735200860039/7aca8ffa-c33a-44e5-ab1a-181492ebefd8.png)

The interesting thing about asymmetric key encryption is that, if a message is encrypted with the public key, then it can only be decrypted with the corresponding private key. No other key can decrypt it.

And it works the other way too. If a message is encrypted with the private key then it can only be decrypted using the corresponding public key.

![Illustration of public and private key mathematically linked with each other.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735120077350/b90901c8-b55c-428a-8eb4-1b8ffa65fa06.png)

The two keys - public and private - are mathematically linked with each other. While one encrypts, the other decrypts.

Just a small note that asymmetric key encryption is also called public key encryption. These two terms are used interchangeably but they mean the same thing.

---

## Cryptographic Hash Functions

A cryptographic hash function is designed to take in an input of any length and produce a fixed-length output. The fixed-length output is called as hash value.

A popular example of a cryptographic hash function is SHA-256. ![SHA-256 calculation of "freeCodeCamp.org"](https://cdn.hashnode.com/res/hashnode/image/upload/v1735030835833/201640c6-13b4-4b2b-9be3-88e245269bd1.png)

The above image shows the SHA-256 hash value of the input “freeCodeCamp.org“. Cryptographic hash function has three properties that make it very useful (we’ll see how in the coming sections).

First**,** it’s practically impossible to take the hash value and figure out the input from the hash value.

For example, if we are given the hash value `c9c31315ef2257e4b7698`, there’s no way for us to figure out that the input to the hash function was “freeCodeCamp.org“.

Second**,** if we pass the same input to the hash function, we get the same hash value as output.

If we pass “freeCodeCamp.org“ again to the SHA-256 hash function, we will get the same hash output as our previous call.

Third**,** two different inputs never share the same hash value. Even the slightest change in input produces an entirely different output.

Suppose if we provide “freeCodeCamp“ as input instead of “freeCodeCamp.org“ - we would get a totally different output.

---

## Digital Signatures

In your daily lives, you might have to sign various documents. These might be legal documents, or your kids’ school report card, or maybe something else.

When your signature is present on the document, it conveys to the other party that it is you who agrees with whatever is written on that document.

Later on, you cannot walk back from doing what’s written on the document. Correct?

Similarly, in the digital world, we have digital signatures - or we can simply call them signatures.

Let’s understand how signatures works using an example. We have two users named “Alice“ and “Bob“.

Bob wants to transfer some money to Alice’s bank account. So Bob asks Alice about her bank account information.

![An illustration showing alice and bob's computers far away from each other and alice's bank account number.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735042150046/034d26c5-b33d-4b82-aeb8-173e47cd8e8e.png)

Alice knows about digital signatures and decided to use one. At the end, you will understand why Alice opted for a digital signature.

Before Alice can create a digital signature. Alice provides Bob with her public key (and keeps the private key to herself).

Then Alice creates a digital signature and places it at the end of the document.

![Process of digital signature generation.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735041977880/35313148-8820-42d7-b122-3ddf0cbaa723.png)

A digital signature is created by first passing the document contents to a cryptographic hash function like SHA-256. In Alice’s case, the document’s content is her bank account number.

Once we get the hash value, it gets encrypted with Alice’s **private key**. The output of this encryption is the signature which gets placed at the end of the document.

This is then sent to Bob over the Internet.

When Bob receives this document, he verifies whether the **signature is valid or not**.

![Process of signature verification.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735043216695/256f7707-3f40-433f-9b00-c11b27ef01e8.png)

To verify the signature, Bob first decrypts the signature with Alice’s public key. If you remember, Alice generated the signature by encrypting the hash value.

```plaintext
 plaintext                         ciphertext  
     |                                 |
     |                                 |
     |                                 |
hash value --------encrypt--------> signature
```

So, when Bob decrypts the signature, he will get the hash value that Alice calculated. Let’s call this Alice’s hash value.

```plaintext
 ciphertext                         plaintext  
     |                                 |
     |                                 |
     |                                 |
signature --------decrypt--------> hash value
```

Then Bob takes the bank account number that’s present on the document and passes it to the hash function.

Finally, Bob matches the Alice’s hash value (the decrypted signature) and the hash value that he just calculated. If both the hash values match then that means the signature is valid.

OK — but why did we need to do all this? What does it mean if the signature is valid?

When the signature verification is successful, it proves two things.

First, it proves that the document has been sent by Alice only. Nobody else could have sent this document.

The assurance that only Alice has sent this document comes from the fact that we were able to decrypt the signature using Alice’s public key.

We have learned that if something is encrypted using a private key then it can only be decrypted using its linked public key.

So, if Bob was successfully able to decrypt the signature using Alice’s public key, it means that it was encrypted using Alice’s private key, correct?

And only Alice has access to her private key. This means that Alice is the only person who could have sent this document!

Second, it proves that the content of the message has not been modified by an attacker during network transmission.

We did two things to verify the signature. We decrypted the signature, and it gave us the hash value that Alice calculated. And we also hashed the received bank account number.

If the hash value that Alice calculated and the hash value that Bob calculated are the same, this means that Alice and Bob gave exactly the same input to the hash function.

And this means that the bank account number that Alice sent and that Bob received are exactly same.

If an attacker would have changed the bank account number before the document reached Bob, then Bob would’ve received a modified bank account number.

When Bob went to calculate the hash value of this modified bank account number, the hash value would’ve come out to be different than what Alice had calculated.

So while matching Alice’s hash value (decrypted signature) and the hash value that Bob calculated, the matching would fail. And it would prevent Bob from transferring money to the wrong bank account number.

To conclude, when the signature is successfully verified, it means that:

1. The document is only from Alice.
2. The document’s contents were not modified by any third party.

Now you’ve learned about symmetric key encryption, asymmetric key encryption, cryptographic hash functions, and digital signatures. That’s awesome!

We have built a really solid foundation. Now understanding SSH authentication is going to be much easier for you.

---

## How SSH Authentication Works

If you have not setup SSH authentication with GitHub, then after completing this article you can follow [<VPIcon icon="iconfont icon-github"/>GitHub’s detailed documentation on how to do it](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account). For now, please stay here till the end.

The crux of the setup process is that you create a public and private key pair on your local computer. Then you upload your public key to your GitHub profile - and that’s it!

After we have created our public-private key pair, in Ubuntu, public-private key pair are stored inside the <VPIcon icon="fas fa-folder-open"/>`~/.ssh` directory.

![Showing my public key from my terminal.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735035539565/1f837d9b-9717-44fa-a5e0-5801276113df.png)

The above image shows my public key. I have this public key uploaded to my GitHub profile:

![Showing my GitHub profile settings where my public key is uploaded for SSH authentication with GitHub.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735035898284/1ef9133a-895b-4847-a7ac-6157fdcc3143.png)

Now, when I run `git push` or any other command that wants to communicate with GitHub, I will be authenticated using SSH authentication.

![The illustration of SSH authentication process between client and GitHub server.](https://cdn.hashnode.com/res/hashnode/image/upload/v1735053545173/6fb293f1-f90a-4b64-b026-082d8676afae.png)

SSH is a client-server protocol. Our computer that runs `git push` is the SSH client. GitHub is the SSH server.

The client starts off the authentication process by first fetching our public key that we have inside <VPIcon icon="fas fa-folder-open"/>`~/.ssh`.

The client then prepares a message which has our public key. And then the client generates the signature using the corresponding private key.

The public key and signature are sent to GitHub. Upon receiving this message, GitHub does two things:

First, it verifies whether the public key mentioned in the message is connected to a GitHub profile or not. Since we upload our public key to GitHub, this step checks out successfully.

Second, GitHub verifies the signature using the public key that we have uploaded.

We have learned that if the signature verification turns out to be successful this means that only the person who is in the possession of the corresponding private key could have sent the message.

Since only we have the private key linked to the uploaded public key, this proves to GitHub that it is indeed us attempting to communicate with GitHub and not an attacker.

Now, GitHub is 100% sure that we are the correct person, we are successfully authenticated, and our `git push` is allowed to proceed further.

See, it became so easy to understand SSH authentication as you already learned the fundamentals.

![A xkcd comic depicting Cueball thinking to share his private key. A dangerous move!](https://cdn.hashnode.com/res/hashnode/image/upload/v1735120630613/e9a8bbba-3cc4-43e7-8369-865ab377fb87.png)

The above image is from the popular [<VPIcon icon="fas fa-globe"/>xkcd comic](https://xkcd.com/1553/). The character there (named Cueball) is thinking about revealing his private key. I hope now you know why it’s bad to reveal your private key.

If you reveal your private key then someone else can authenticate to GitHub on your behalf. You don’t want that to happen, right? ;)

So, always make sure to keep your private key just to yourself.

---

## Wrapping it All Up

If you have read this far, then Congratulations 🥳.

You’ve learned how SSH authentication actually works — when the signature was successfully verified by GitHub, it confirms to GitHub that it is we who are talking to it not an attacker.

Along the way you built a foundational understanding of symmetric key encryption, asymmetric key encryption, cryptographic hash functions and digital signatures.

Thanks for being with me on this one, I hope you are going away with some new and valuable learnings.

I put useful ideas and resources on my Twitter. [You should follow me there. (<VPIcon icon="fa-brands fa-x-twitter"/>`vkwebdev`)](https://x.com/vkwebdev) I will respect your time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How SSH Authentication with GitHub Works Under the Hood",
  "desc": "SSH (Secure Shell) is a client-server protocol for connecting and authenticating to a remote server. Authentication means that the remote server can verify that it’s actually you and not somebody else talking on your behalf. You may already be using ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/ssh-authentication-with-github-under-the-hood.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
