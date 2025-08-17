---
lang: en-US
title: "How to Create an AWS Free Tier Account - A Step-by-Step Guide"
description: "Article(s) > How to Create an AWS Free Tier Account - A Step-by-Step Guide"
icon: fa-brands fa-aws
category:
  - DevOps
  - Amazon
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - amazon
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Create an AWS Free Tier Account - A Step-by-Step Guide"
    - property: og:description
      content: "How to Create an AWS Free Tier Account - A Step-by-Step Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-aws-free-tier-account.html
prev: /devops/aws/articles/README.md
date: 2025-07-16
isOriginal: false
author:
  - name: Victoria Nduka
    url : https://freecodecamp.org/news/author/nwanduka/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752599184286/ff14fece-f865-4d8f-87e7-4cfed11a6946.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Amazon > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create an AWS Free Tier Account - A Step-by-Step Guide"
  desc="I recently started learning cloud engineering through a bootcamp. One of our first tasks was to create an AWS account. For those of us who didn’t already have one, it seemed like a simple enough assignment. But as I went through the signup process, I..."
  url="https://freecodecamp.org/news/how-to-create-an-aws-free-tier-account"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1752599184286/ff14fece-f865-4d8f-87e7-4cfed11a6946.png"/>

I recently started learning cloud engineering through a bootcamp. One of our first tasks was to create an AWS account. For those of us who didn’t already have one, it seemed like a simple enough assignment. But as I went through the signup process, I ran into a few unexpected issues, particularly with verifying my payment method.

When I brought it up in our group chat, I realized I wasn’t the only one. Others were stuck too. Some couldn’t verify their phone numbers, others had their cards rejected, and a few didn’t even know what kind of card would work.

That’s what inspired this guide.

This article walks you through the exact steps to create an AWS account, with practical tips for troubleshooting common problems (especially for users in Nigeria), based on solutions that worked for me and others.

---

## What is AWS?

Let’s say you want a place to live. Normally, you’d have to buy land, build the house from the ground up, handle the wiring and plumbing, and maybe even oversee construction. After all that, you’d still need to furnish the house - buy furniture, paint the walls, maybe call in an interior decorator. Then you'd have to reach out to the electricity company to connect your house to the grid…and so on.

Compare that to renting a house. With renting, a lot of that heavy lifting is already done. You move into an already-built space. If you want to repaint or get different furniture, you can. If electricity isn’t already included, you call someone to help. But still, you’re dealing with multiple providers: the landlord, the interior decorator, the electrician, and so on.

Now imagine there’s a single provider that gives you access to everything in one place: a ready-to-use space, electricity, furniture, interior design, and even maintenance, all on-demand - like a pre-furnished apartment. All you have to do is log in to your account, select the services you need, and pay only for what you use. If you're away for a while (say, on a long vacation), you can pause your utilities while you’re gone. That’s basically what AWS does, but for computing power and digital infrastructure.

Amazon Web Services (AWS) is a platform that gives you access to computing tools like servers (EC2), storage (S3), databases, and more, without needing to “build the house” yourself. You only pay for what you use. Most people (especially students or learners) start with the free tier, which gives you enough resources to learn and build basic projects without being charged. And that’s what you’ll learn how to set up here.

---

## Steps to Create an Account

There are 5 steps involved in successfully creating an AWS free tier account. We’ll go through them one by one.

### Step 1: Set up and verify your email address

Go to [<FontIcon icon="fa-brands fa-aws"/>aws.amazon.com](https://aws.amazon.com) and click on **“Create Account”** at the top right of the screen.

![The AWS home page with the "create account" button highlighted](https://cdn.hashnode.com/res/hashnode/image/upload/v1751572272275/7a9cdf0a-8afd-4b26-b5ca-4dffb2d82cd6.png)

You should be taken to the sign-up page. But you might be redirected to the sign in page instead. If that happens, scroll down a bit until you see the **“New to AWS? Sign Up”** button. Click it to go to the sign-up page.

![The AWS sign-in page showing user type (root user or IAM user) and email address field. The "sign up" button is highlighted.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751574858697/13ec0c92-93bb-4b3c-a12c-d280a754a70f.png)

On the sign-up page, you’ll be asked to:

- enter a root user email address
- choose a name for your AWS account (you can change this name in your account settings after you sign up)

::: tip

Use an email you check regularly. AWS sends important verification and billing alerts that you don’t want to miss.

:::

![The AWS sign-up page showing the root user email address and account name fields.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751575004070/8c07161a-42d9-46dc-86b8-c8133f586e67.png)

Then click on **“Verify email address”.** A text-based CAPTCHA will pop up to verify your identity. In the field provided, type in the characters shown and submit.

::: tip

The refresh icon lets you load a new image if the current one is hard to read. You can also click the speaker icon to get an audio CAPTCHA if you have visual impairments.

:::

![The security verification page with CAPTCHA. The speaker and refresh buttons are to the right of the CAPTCHA.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751579148594/9a1668ca-b09a-455b-a29f-43e62e30a702.png)

You’ll receive a 6-digit verification code in your email. Enter the code in the email confirmation pop-up then click **“Verify”** to verify your email address.

::: tip

If you don’t find the code in your inbox, check your spam folder for an email from Amazon Web Services. If it’s not there, wait for up to 5 minutes, then check again. If you still don’t get it, click the “Resend Code” button to have the code re-sent to your email.

:::

![Email verification page with a field to enter the verification code received in your email](https://cdn.hashnode.com/res/hashnode/image/upload/v1751579441960/ec052bc8-ec71-4b56-8210-0cb65e221760.png)

Once your email is verified, you’ll get a success notification and on the same page be asked to enter your password. Your password must be at least 8 characters long and must contain at least 3 of the following:

- numbers
- upper-case letters
- lower-case letters
- non-alphanumeric characters (such as `!`, `@`, `#`, and so on)

Enter the password again in the “Confirm root user password” field and click **“Continue”**.

![AWS account sign-up screen showing the 'Create your password' step for root user verification, with fields for password entry and a 'Continue' button.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751642655084/c7deb8c3-23f5-4821-961a-c66f984acf9e.png)

### Step 2: Enter your contact information

You’ll be asked to choose between a **Personal** or **Business** account. If you're signing up for learning or personal projects, the Personal option is fine.

Then, you’ll need to fill in your contact information. This includes:

- Your full name
- Your phone number (with country code)
- Your address
- Your postal code

Then check the box that says “*I have read and agree to the terms of the AWS Customer Agreement.”*

![AWS account creation screen showing contact information form with name field and usage type selection options (Business or Personal).](https://cdn.hashnode.com/res/hashnode/image/upload/v1751816749502/c7ab3be6-f2a5-476f-bbaa-cf6f1ee02651.png)

### Step 3: Add your billing information

The next step is to enter your billing information. Here you’ll be required to enter:

- Your billing country
- Your credit or debit card details
- Your billing address (could be your contact address or a different address)

![AWS account verification screen showing billing information form, including country selection and credit card details for identity validation. Text explains temporary $1 hold for verification.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751825939816/81343027-1231-4458-92de-7a1a57353c5c.png)

Click “Verify and continue” to move on to the next step.

::: note

AWS may temporarily hold up to $1 (or an equivalent amount in local currency) as a pending transaction for 3-5 days to verify your identity.

:::

### Step 4: Verify your identity

Once you’ve filled in your billing information, AWS will ask you to verify your identity by entering a code they’ll send to you. You can choose to receive the code via text message (SMS) or voice call.

Enter your country code and mobile phone number and click **“Send SMS”** (if you chose the text message option) to continue.

![AWS account verification screen showing phone number authentication step, with options for SMS text or voice call verification. Includes country code dropdown (Nigeria +234 selected) and phone number input field.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751826368753/e77d6961-d949-430e-843a-9d9193687d98.png)

You’ll be required to complete another CAPTCHA. Enter the characters in the image shown to confirm your identity.

Enter the code you received in the field and click **“Verify and continue.”**

You might see an error message that says, **“There was a problem with your payment information.”** This means AWS couldn’t verify your payment method. When this happens, it's usually due to one of the following reasons:

- The card you used isn’t one that AWS accepts
- You entered incorrect card details
- The name and billing address you provided don’t match what your card issuer has
- Your card doesn’t have at least $1 available for the temporary hold

![AWS error message screen showing payment verification failure, with instructions to update payment details or contact support.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752326420973/33a9f33b-55aa-4539-9a2f-1d04ad701c32.png)

If you get this error, AWS will ask you to sign in and update your payment method. Here’s how to do it:

1. [<FontIcon icon="fa-brands fa-aws"/>Sign in](https://signin.aws.amazon.com/) to your AWS account. You may automatically be taken to the Billing and Cost Management dashboard. If not, use the search bar at the top of the page to search for "Billing", then click on the Billing and Cost Management service.
2. In the left-hand menu, scroll down and click "Payment preferences."
3. Click **"Edit"** next to your existing card details to correct the billing name and address, or click **"Add payment method"** to enter a new payment method.

![AWS payment preferences dashboard showing unverified Mastercard alert with instructions to resolve payment verification issues.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752329795101/a4106217-e747-4a20-a099-7d1a8bcb5e04.png)

### Step 5: Choose a support plan

Next, AWS asks you to pick a support plan. Select the **Basic support (Free)** plan. It’s the recommended plan for new users who are just getting started with AWS.

![AWS support plan selection screen showing three tiered options: Free Basic support for beginners, $29/month Developer plan with business-hour assistance, and $100/month Business plan with 24/7 production support.](https://cdn.hashnode.com/res/hashnode/image/upload/v1751827793660/0e4b9aec-62fc-42cf-a11b-822251377ff6.png)

You’ll still get access to the AWS Free Tier, which includes:

- 750 hours of EC2 compute
- 5GB of S3 storage
- and many more services you can experiment with for free (for up to 12 months)

::: note

You can upgrade your plan later if needed. No need to pay now.

:::

### Step 6: Sign In and Explore the Console

Once everything is verified, you’ll be able to sign in to the [<FontIcon icon="fa-brands fa-awws"/>AWS Management Console](https://console.aws.amazon.com/). This is your dashboard for managing all AWS services, from setting up virtual servers (EC2) to experimenting with storage (S3) or databases (RDS).

::: note

Sometimes, it takes a few hours for your account to become fully active. If it takes more than 24 hours, reach out to AWS Support via chat or email.

:::

![Final AWS account creation screen showing successful activation message with progress notification. Includes two action buttons: 'Go to AWS Management Console' and 'Sign up for another account'.](https://cdn.hashnode.com/res/hashnode/image/upload/v1752332214646/570608e0-6e7d-46a0-83c2-41d60604792e.png)

---

## Common Setup Issues and How to Solve Them

I’ve summarized the most common issues I’ve come across or heard about with quick fixes here:

| **Problem** | **Cause** | **Solution** |
| --- | --- | --- |
| Payment verification failed | 1. Local naira card rejected | 1. Use a dollar virtual card (for example, Geegpay, Grey, and so on) |
|  | 2. Card info doesn’t match billing info | 2. Match the name, address, and ZIP exactly |
|  | 3. Incorrect billing information | 3. Edit payment method with correct billing information (full name, billing address, and card details) |
|  | 4. Insufficient balance on card | 4. Have at least $1 on your card for the temporary hold |
| Didn't Get Verification Code | Network or SMS failure | Try another mobile network or use voice call option |
| Stuck After Signup | AWS still processing your account | Wait a few hours, then contact support if needed |

---

## Conclusion

Getting your AWS account set up is an important step in your cloud journey. Once you’re in, you’ll be able to explore powerful tools, build projects, and gain hands-on experience all within the free tier.

If you're reading this because you're just starting out like I was, well done. You’ve already taken one of the most important steps. Keep learning, keep building, and don’t be afraid to ask for help when you need it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create an AWS Free Tier Account - A Step-by-Step Guide",
  "desc": "I recently started learning cloud engineering through a bootcamp. One of our first tasks was to create an AWS account. For those of us who didn’t already have one, it seemed like a simple enough assignment. But as I went through the signup process, I...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-an-aws-free-tier-account.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
