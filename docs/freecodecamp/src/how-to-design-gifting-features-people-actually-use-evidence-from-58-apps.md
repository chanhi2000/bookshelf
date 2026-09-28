---
lang: en-US
title: "How to Design Gifting Features People Actually Use: Evidence from 58 Apps"
description: "Article(s) > How to Design Gifting Features People Actually Use: Evidence from 58 Apps"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Design Gifting Features People Actually Use: Evidence from 58 Apps"
    - property: og:description
      content: "How to Design Gifting Features People Actually Use: Evidence from 58 Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-gifting-features-people-actually-use-evidence-from-58-apps.html
prev: /academics/system-design/articles/README.md
date: 2026-09-14
isOriginal: false
author:
  - name: Anamol Rajbhandari
    url: https://freecodecamp.org/news/author/anamol-rajbhandari/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/94d818a8-6ce2-4335-8d55-5f93907186de.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Design Gifting Features People Actually Use: Evidence from 58 Apps"
  desc="American shoppers spent about $29 billion on gift cards over the 2025 holiday season, and 43 percent of them bought at least one. This put gift cards at the top of what people said they wanted accordi"
  url="https://freecodecamp.org/news/how-to-design-gifting-features-people-actually-use-evidence-from-58-apps"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/94d818a8-6ce2-4335-8d55-5f93907186de.png"/>

American shoppers spent about $29 billion on gift cards over the 2025 holiday season, and 43 percent of them bought at least one. This put gift cards at the top of what people said they wanted according to the [<VPIcon icon="fas fa-globe"/>National Retail Federation](https://nrf.com/blog/gift-cards-gain-popularity-as-top-choice-for-holiday-shoppers-in-2025).

Those numbers explain why a company stocks gift cards. But the numbers don't reveal when a product should ask a customer to send one to yield the best results. In this article, we'll explore whether a gifting feature is worth building into your app. To answer that, I researched fifty-eight apps in [<VPIcon icon="fas fa-globe"/>Mobbin's](https://mobbin.com/?referrer_workspace_id=269e7149-752a-4797-befd-0d9558c66ede) reference library.

Gifting means anything from a gift card or a gifted subscription to a livestream tip or a checkout add-on. Forty-nine of those apps carry a send flow a person can walk end to end, triggered nine different ways.

For instance, Etsy stores the contents of a cart, a quest partner's lesson count already appears on Duolingo's screen, while Blinkit has festivals in its merchandising calendar. Each product is aware of when people are likely to send gifts.

The sections below cover those nine moments, along with what each one costs to build and the screens somebody has to design before a developer starts building them.

::: note Prerequisites

To follow along, you'll want:

- Familiarity with consumer product flows from a design or research grounding where entry points, drop-offs and conversions are everyday terms.
- Working knowledge of acquisition economics that covers customer acquisition cost, activation, and why a referral incentive is priced differently from an upsell.
- Enough SQL to read a `CREATE TABLE` statement. You won't have to write any. The two sections that use SQL are marked, and the design findings stand on their own if you skip them.

:::

---

## Eight of the Nine Scenarios Have a Trigger

Here's the distribution across all 58 apps (and some apps appear in more than one row). Uber Eats alone runs five of these scenarios, for example.

| Scenario | Apps | What triggers it |
| --- | --- | --- |
| Checkout upsell | 12 | A full cart, with the card already out |
| Money wrapping | 4 | A transfer where a bare number feels cold |
| Occasion catalogue | 19 | A festival or birthday on the calendar |
| Platform-issued gift | 5 | An action the company wants repeated |
| Referral written as giving | 7 | Just after something went well |
| Shared progress | 2 | A joint goal that is visibly lopsided |
| Social currency in a live moment | 10 | An interaction happening right now |
| Stored value, meaning gift cards | 22 | The customer has to go looking |
| Subscription seeding | 9 | Being a satisfied subscriber |

A referral reward pays the sender for an introduction, and a platform-issued gift is a prize the company hands to its own customer. So in both rows the money and the recipient belong to the company already, as shown the chart below.

![Bar chart of where gifting gets introduced across 58 apps. Stored value gift cards lead at 22 and are drawn hollow because they have no trigger, followed by occasion catalogue 19, checkout upsell 12, social currency 10, subscription seeding 9, referral 7, platform-issued gift 5, money wrapping 4 and shared progress 2. The referral and platform-issued bars are paler and bracketed, because no gift is actually sent in either](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/887b65c9-00cd-4819-a459-3f40368c2ec0.png)

Gift cards lead the count by a wide margin. They're also the only scenario in it with nothing to set them off, since the wish to send one has to arrive before the app does.

Every other scenario on the list exists to supply that reason before the sender thought of it. If the gift card is shipped and stopped at the very feature, the demand has also been subsequently halted.

That distinction matters for what a team decides to build. A gift card is something to buy rather than a reason to buy. So a team that ships the gift card and stops there has built the supply side of gifting instead of the demand, and the feature sits in an Account menu waiting for customers who arrive already intending to use it.

The other eight scenarios exist to manufacture that intention, each one attaching the ask to a moment the product can already detect.

---

## Each Scenario Pairs a Trigger with a Reinforcement

Each entry below names what sets the scenario off, turning a first gift into a second.

### Stored Value, in 22 Apps

A sender picks an amount chip, chooses a card design, fills in a "To" and "From" pair, writes a message, and checks out. Twenty-two apps ship that same sequence. It's the most common gifting feature in the study, carrying the least design work of any of them.

**Trigger:** A sender reaches a gift card by opening a menu and going looking, so the wish to send one arrives before the app does. The other eight scenarios exist to supply that wish instead.

**Reinforcement:** Blank Street, Airbnb, and Blue Apron let a sender schedule delivery, so they can act the moment they remember rather than on the date itself, and Urban Outfitters caps the window at ninety days out. A preview shows the sender exactly what the recipient will see. Blank Street then bolts a Snake arcade game onto the purchase confirmation with a free coffee as the prize.

**Who Uses This:** Uber, Uber Eats, Starbucks, sweetgreen, DoorDash, Shopee, SHEIN, Blank Street, App Store, Shipt, Blinkit, Zip, HelloFresh, Blue Apron, Airbnb, Urban Outfitters, Base44, Satispay, Walmart, Amazon, Everyday Rewards, Lovi.

### Occasion Catalogue, in 19 Apps

Nineteen apps merchandise the catalogue by occasion, which makes the calendar the most widely used trigger of the eight that have one. The tabs across the top do the prompting.

![Four Uber Eats screens: a gift card catalogue with tabs for Ramadan, Birthday, Congratulations and Thank You; a Customize your gift form asking who the gift is from, who it is for and the recipient's phone number; a preview reading Tap to unwrap; and the unwrapped preview reading Alex got you a gift](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/8938b44c-b3c6-470e-a3ea-983e57001f86.png)

Senders arrive at this screen with no occasion in mind, whereupon the tab supplies one. Starbucks works Father's Day, Graduations, Birthdays, and Thank Yous, while Walmart adds one called Just Because to cover the days that aren't an occasion at all.

The regional calendars matter more. Blinkit and Zomato run Rakshabandhan, GoPay runs Lebaran and THR, Shopee runs Selamat Wisuda, and a US-only occasion set reaches none of those buyers.

**Trigger:** The calendar supplies a date the sender already feels obligated by.

**Reinforcement:** An occasion supplies the card art and the words together, so the sender never has to write the message. GoPay offers a themed envelope, then a celebrity voice note, then a suggested wish along the lines of "Don't grow up, it's a trap."

**Who Uses This:** Uber, Uber Eats, Postmates, Starbucks, sweetgreen, Walmart, Amazon, Shopee, Grab, Blinkit, Zomato, Ulta Beauty, SKIMS, GoPay, Letterboxd, Nike, Shipt, Target, Faire.

### Checkout Upsell, in 12 Apps

Twelve apps drop a toggle into the cart between shipping and payment, with Etsy and Instacart using a switch, Ulta Beauty and Yami opening a sheet, and DoorDash and Uber Eats promoting it to a row in the checkout list. The ask costs one tap.

**Trigger:** The shopper already has a card out, so the ask costs nothing to place.

**Reinforcement:** Ulta charges $3.99 for a gift bag and Blinkit charges ₹30, while the message itself costs nothing. Lululemon promises that the gift message prints on a receipt with prices hidden, which answers an anxiety the shopper walked in with. Apple Store asks whether to reveal the gift or keep it a surprise.

**Who Uses This:** Etsy, Instacart, Yami, Ulta Beauty, lululemon, Apple Store, Best Buy, DoorDash, Uber Eats, Blinkit, Natural AI, Blank Street.

### Social Currency in a Live Moment, in 10 Apps

Ten apps put gifting inside a live interaction, priced in a proprietary currency. Telegram sells one called Stars, whose gifts reach the chat thread with confetti behind them.

![A Telegram chat thread where a gift arrives behind confetti, labelled You sent a gift for 15 Stars, showing a teddy bear card reading Gift for Jane with a View button](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/65b73c01-f2ad-4ca3-942c-d8c3668ac578.png)

Because that thread has an audience, the gift buys visibility rather than goodwill.

The dating apps have worked out how to price exactly that. A rose on Hinge and a flower on Coffee Meets Bagel both carry the promise that Coffee Meets Bagel prints on its own button: flowers get the sender shown instantly. Telegram then adds the control that makes any of this workable in a social space.

![Four Telegram screens: a Gift Premium sheet priced at three, six and twelve months; a gift catalogue grid priced from 15 to 100 Stars; a send sheet with the Hide My Name toggle off; and the same sheet with Hide My Name switched on](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/07ba4b10-617c-4889-b60b-e9954d624f45.png)

Hide My Name lets a sender withhold their identity from everyone except the recipient. Twitch offers the same option under Gift Anonymously.

**Trigger:** A sender wants to outrank the other people competing for attention in a live thread.

**Reinforcement:** An audience watches the gift arrive, and Telegram prices that moment with scarcity stamps and a tiered ladder. A hundred Stars costs $2.90 and 35,000 costs $1,048. Divided out, the seven tiers run between $2.88 and $2.99 per hundred, so the ladder sells the size of the number rather than a discount.

On Twitch the price per gifted subscription falls from SGD 6.99 to SGD 4.99 at the five-block, then holds there for every larger block while the strikethrough saving keeps appearing. Any designer signing off on those badges should divide each tier by its unit count first.

**Who Uses This:** Telegram, Discord, Instagram, TikTok, Twitch, Azar, Binance, Badoo, Hinge, Coffee Meets Bagel.

### Subscription Seeding, in 9 Apps

Nine apps let an existing subscriber buy a trial for a person who isn't one, which is an acquisition channel wearing a bow. The honest implementations say exactly that on the screen. Thrive Market says it in dollars.

![Four subscription gifting screens: Discord offering a Nitro membership as a gift, Twitch's Gift a Sub bundles with a Gift Anonymously toggle, Lovi offering seven days of membership as a gift card, and Headway's Review gift screen showing the recipient's email and a send date of 25 October at 10:00](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/9a353b87-1fa6-45e1-87db-f3c3ced7ee75.png)

**Trigger:** A subscriber has stayed long enough to recommend the product. Discord, Telegram, and Headway put the entry point in Settings, on the paywall, or on a recipient's profile.

**Reinforcement:** Thrive Market hands the sender $30 in store credit for gifting a membership, a customer acquisition cost the company has decided beats the alternatives.

Lovi skips money altogether and drops five gift cards into the account instead, each worth seven days of unlimited access.

Telegram discounts Premium by term, cutting 10% off three months and 45% off a year, so the sender who commits furthest pays least per month. The gift then renews on its own, since Thrive Market's terms charge the recipient $59.95 each anniversary until they cancel.

**Who Uses This:** Thrive Market, Discord, Instagram, Telegram, Headway, Lovi, Shipt, Blackbird, Twitch.

### Referral Written as Giving, in 7 Apps

Seven apps frame a referral as a gift in copy and iconography, with wrapped-present illustrations and the verb *give* leading the verb *get*.

DoorDash runs "Give $5 Get $1." Base44 places "Send a gift card" directly beneath "Refer a friend" in the same account menu, which tells you the team considers them one family.

**Trigger:** Peerspace surfaces the referral link on the booking-confirmed screen, in the seconds after a booking goes through.

**Reinforcement:** Peerspace shows both sides of the reward, caps its referral credit at $5,000, and supplies share text for SMS and email.

**Who Uses This:** DoorDash, Lugg, Peerspace, Superpower, Preply, Manus, Base44. ### Platform-issued Gift, in 5 Apps

Five apps hand the customer a gift and manufacture the occasion for it. Grab's Mystery Rewards promise a surprise for completing an activity, then play an unboxing animation, while Temu simply messages "You have 8 GIFTS Unclaimed."

**Trigger:** The company wants an action repeated, so it attaches a prize to that action.

**Reinforcement:** Grab pays out at random intervals, behind a reveal animation that costs the customer nothing but time. Unclaimed counts appear as badges, while expiry timers turn curiosity into urgency. Finch runs the outlier and the kindest version in the study, telling a recipient only that the Guardians hope they enjoy the gift, and stopping there.

**Who Uses This:** Grab, Shopee, Temu, Everyday Rewards, Finch.

### Money Wrapping, in 4 Apps

Four apps treat the payment as trivial and put the entire design effort into the wrapper. So Binance's Red Packet distributes a randomised amount across several receivers behind a code or a QR while Revolut schedules the arrival for the recipient's own morning. The transfer itself is one line.

**Trigger:** A sender is marking an occasion, and a bare transfer reads as cold.

**Reinforcement:** Binance times the whole exchange. A packet can expire forty-five seconds after the first claim, with the sender setting that timer, and unclaimed value refunds after three days. A Rewards Booster offers to increase the code's exposure by up to 90%. GoPay puts a lottery on the share action itself, offering Coins every time a recipient claims.

**Who Uses This:** GoPay, Binance, Revolut, Satispay.

### Shared Progress, in 2 Apps

Two apps make the gift functional instead of symbolic, which makes this the rarest scenario in the study.

![Two Duolingo Friends Quest screens showing a shared lesson target with each person's contribution beside their avatar, one learner well ahead of the other, and NUDGE and GIFT buttons underneath](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/72a579d5-a4a3-44ab-b221-f645ac70bd78.png)

Duolingo's Friends Quest gives two people a shared target, shows their contributions side by side, and puts one learner on a single lesson against Sam on none with fifteen needed inside three days, so the asymmetry is already on the screen before anybody has thought about a gift. Two buttons appear under the avatars, NUDGE and GIFT.

**Trigger:** Duolingo shows a shared goal running with one learner visibly behind. The app names who is falling short before a learner goes looking for a way to help.

**Reinforcement:** A learner spends the XP Boost, which moves the quest along. Senders stall on writing the message, which Duolingo writes for them. The twenty gems come out of the soft currency a learner buys with real money once they run dry, so generosity drives exactly the same purchases that streak repairs drive. The button then flips to SENT and stays that way, making the act legible to both people.

Finch puts Send Gift beside Share Goal on a friend's profile page for 200 rainbow stones, which exhausts the list.

**Who Uses This:** Duolingo, Finch.

---

## Six Problems Recur Across the Nine Scenarios

Whichever scenario a team picks, the same six problems show up in the send flow. Each one below names the problem and subsequently, what the apps in the study do about it.

### 1. Identifying a recipient who may not be a user yet.

The sender stalls first at the recipient field, because the app has no account to point at. Flows in the study take a phone number or an email address, add a contacts picker for anyone who has neither, and Grab accepts up to ten recipients at once. The apps that reach strangers take the cheapest identifier that can carry a message, and leave the account until claim time.

### 2. Getting consent before a message goes to somebody who never opted in.

The gift triggers a text or an email to a person who has no relationship with the product. Uber Eats and DoorDash both ask the sender to confirm they have permission before the recipient gets a text, which moves the obligation to the one person who knows the recipient.

### 3. Choosing a gift when the sender can't guess what the recipient wants.

A sender who cannot guess abandons the purchase halfway. Grab and Uber Eats both hand the choice forward instead of forcing it, so Grab offers up to three options for the recipient to pick between, and Uber Eats offers "Let recipient choose delivery time" alongside "Let recipient get credits in case of cancellations."

### 4. Deciding how personal to let the gift get.

A bare amount reads as thoughtless, and every layer of personalisation costs a screen. Personalisation runs from card artwork to a written note, then a voice note in GoPay, then a recorded video in Uber Eats and Postmates. Each step raises the sender's investment and the apparent worth of a generic amount, and a team picks the rung that matches the value of the gift.

### 5. Choosing when the gift arrives.

Senders act when they remember, which is rarely the date that matters. Revolut schedules for the recipient's morning, Apple Store keeps it to today or a chosen date, and Urban Outfitters allows up to ninety days out. Scheduling lets a sender act on the impulse and the gift still arrive on the day.

### 6. Deciding what each side gets to see.

Two different secrets are in play, and apps split on both. Uber, DoorDash, Uber Eats, and Grab render the recipient's exact view before payment, and Grab titles that screen One Last Check, which reassures a sender buying an experience they will never see. Apple Store withholds the contents from the recipient instead, and Telegram's Hide My Name and Twitch's Gift Anonymously withhold the sender.

A sender meets those six problems in that order, and the apps in the study answer them like this:

| # | The problem | What the apps do about it |
| --- | --- | --- |
| 1 | The recipient may have no account | A phone number or an email, with the account created at claim time |
| 2 | The recipient never opted in to messages | The sender confirms permission before anything sends |
| 3 | The sender can't guess what they want | The choice moves to the recipient, or narrows to two or three options |
| 4 | A bare amount feels thoughtless | One personalization rung above a plain card, and no further |
| 5 | The sender acts early, the date is later | Scheduled delivery, with a capped window |
| 6 | Contents and identity are separate secrets | Two deliberate decisions, plus a preview of the recipient's view for the sender |

---

## The Claim Screen Turns a Gift into a New Customer

A gift reaches its recipient as a link in a text, an email, or an in-app message, and a recipient who taps it arrives at a screen showing what somebody has sent, with a way to open it. Designers call that the claim screen. Every one of the nine scenarios ends on one, since the sender's half of the flow finishes at payment and the recipient's half starts there.

The person on that screen may never have used the product before, and they arrive holding something a friend has already paid for. Growth teams call the pattern gift-led acquisition. The sender covers the acquisition cost, and the claim screen decides whether the company collects the customer.

![Four Thrive Market screens: an Earn Thrive Cash panel offering $30 for gifting a membership; an eGift Card product page noting the gift never expires; the How it works terms explaining that a recipient who is not already a member must create an account to redeem; and a total switching between a $59.95 membership and $25.00 of shopping credit](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/8c3f1b31-1804-49cb-8b96-884c4abf3b56.png)

Two steps have to go right on that screen, in this order.

**First, the recipient has to finish opening the gift.** Somebody who gives up halfway never reaches the account request. Meta Quest asks for a twenty-five digit code, which turns an unfamiliar link into a task with an obvious end, while Binance, Finch, and Shopee each play a claim animation that delays the reveal by a beat and rewards the tap. Apps place it exactly where a recipient might otherwise close the tab.

**Then the product asks for an account, and that request does the converting.** Thrive Market states it plainly in its own terms, where a recipient who isn't already a member creates an account before the gift will open. Instagram holds a gifted creator subscription inactive until the recipient redeems it from their inbox, so the sender has paid for nothing in the meantime. The recipient pays for the gift with an account, and pays willingly, because something worth having is already waiting.

A team that stubs the claim screen loses the customer before either step happens.

Uber Eats keeps a My Gifts tab, Satispay splits Sent and Received, and GoPay shows an unopened gift with the line "Remaining amount to be claimed." This turns an unopened gift into a reason for the sender to come back and chase it, so the sender gets somewhere to check on it too. Every other flow in the study leaves the sender alone once the payment clears.

---

## Five Design Decisions Become Engineering Problems

When one person pays for a gift and a second person receives it, that second person may have no account yet. The gift can expire before they even open it.

Five problems follow from that, and raising this earlier saves a rebuild later.

![State diagram for a gift state transitions that run draft, pending payment, scheduled, delivered, claimed. Below it, payment failed, cancelled, expired and refunded branch off when a card declines, a sender cancels or the claim window ends. Claimed is marked as the wanted outcome, the other three return money to the sender, and every terminal state is final](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/36636022-4c10-469b-be51-f6a0f17ec9d4.png)

The diagram above shows the nine states a gift passes through where each of the five problems below sits on one of its transitions.

The top row is the path everybody designs for: a gift starts as a draft while the sender fills in the form, becomes pending payment at checkout, sits as scheduled until its delivery moment, turns delivered when it reaches the recipient, and ends claimed when they open it. Only the recipient can make that last move.

The bottom row is everything else, and most of the design work goes there. A declined card sends the gift to payment failed. A sender changing their mind sends it to cancelled, and an abandoned draft ends there too. A claim window running out sends it to expired, which then moves to refunded on its own. Three of those four are terminal, meaning the gift stops there for good, and each of the three puts the money back with the sender.

### 1. A gift needs two people before either of them has an account.

The gift carries two identities, each one with a separate problem.

The sender's identity can't simply be read from the account. Uber Eats makes the sender's name a required field rather than inferring it, because the person paying may be buying on behalf of a household, a team, or a company card, and the name on the gift is a message rather than a billing record.

The recipient's identity may not exist at all. Uber Eats, Thrive Market, and Blank Street all accept a bare email address or phone number, so the app can create the person on the other end at the moment they claim.

The second decision carries the commercial weight. A product that requires an account before a gift can be sent reaches only people who are already customers, so gifting becomes a loyalty feature instead of an acquisition one. Companies build gifting to reach people they do not have, so that requirement removes most of the reason to build it. Thrive Market and Blank Street leave the recipient account empty until somebody claims.

### 2. Consent has to be stored as evidence.

Gifting sends a message to somebody who never signed up for anything, and in the US that message falls under the TCPA. DoorDash asks the sender to confirm they have the recipient's permission before a text goes out, and that tick box satisfies the rule.

When teams store that tick as a single true or false, two years on, a complaint arrives and the company has to show what the sender agreed to, by which time the consent wording has been edited three or four times. A stored `true` proves that somebody ticked something. It says nothing about what the something said.

Two columns answer this. One holds a version identifier for the consent copy, the other holds the timestamp, and the wording of every version stays on file. A dispute that had no answer becomes a lookup.

### 3. Scheduled delivery has to survive a change in the clock rules.

Revolut promises eight in the morning in the recipient's own timezone. A sender in London scheduling a birthday gift for a friend in Sydney needs that promise kept in Sydney, or it arrives the evening before.

Governments move their clock rules with a few months' notice, so a timestamp frozen at purchase can be wrong by the time the gift is due. Revolut's promise survives as a date and a timezone, resolved to an instant only when the scheduler runs.

### 4. Two taps on Claim can mean two credits.

The recipient taps, nothing visibly happens on a slow connection, so they tap again. Both requests read the same gift, both find it unclaimed, and both pay out. The money leaves without an error anywhere in the logs.

A single conditional write closes this, since the second attempt then finds nothing left to claim. The next section carries the statement.

### 5. Expiry follows a different rule for each kind of gift.

Binance treats a red packet as a party mechanic and lets it expire in forty-five seconds. A purchased gift card is a different legal object. In the United States the CARD Act generally prevents stored value from expiring within five years, with several states going further.

One expiry number across all four kinds turns the feature into a compliance problem. Each gift carries its own expiry, set by the kind of object it is, and expired and refunded stay separate records, since owing a refund and having sent it are different facts.

---

## A Gift Takes Seventeen Columns to Store

Those five decisions all come down to storage, and answering them produces one table with seventeen columns. They fall into five groups.

- **Identity**, six columns, because a gift has a sender and a recipient and the recipient may not exist yet.
- **Consent**, two columns, because a tick box has to survive as evidence.
- **Delivery**, two columns, because the sender's intent is a date and a timezone rather than an instant.
- **Expiry and outcome**, three columns, because expired, claimed, and refunded are three different facts.
- **Money and state**, four columns, covering the amount, the currency, the row's identifier, and where it sits in the state diagram.

Four of the apps in the study settled six of those columns years ago, then published them on their own screens without meaning to.

| What the screen shows | The column it implies |
| --- | --- |
| Uber Eats: "Who's this gift from?" as a required field | `sender_name` |
| Uber Eats: "Recipient phone number" as a required field | `recipient_phone` |
| Telegram: the Hide My Name toggle | `hide_sender` |
| Thrive Market: terms saying a non-member creates an account to redeem | `recipient_id`, which must accept a null |
| Duolingo: the button changing from GIFT to SENT | `status` |
| Duolingo: a gift priced at twenty gems rather than dollars | `currency`, which can't be narrowed to three letters |

PostgreSQL writes that schema out below, with a comment on every non-obvious column naming the app behind it, so any line traces back to a screenshot above. A reader who skips the SQL loses nothing beyond the column names. Seventeen of them hold the entire feature.

```sql
CREATE TABLE gifts (
  id            uuid PRIMARY KEY,
  status        text NOT NULL,   -- one of the nine states above

  -- Two identities. Uber Eats asks the sender to type their own name
  -- rather than inferring it from the account.
  sender_id     uuid NOT NULL REFERENCES users(id),
  sender_name   text NOT NULL,
  hide_sender   boolean NOT NULL DEFAULT false,   -- Telegram ships this toggle

  -- Nullable until the claim. Thrive Market, Blank Street and Uber Eats
  -- accept a bare email or phone and create the person on the other end later.
  recipient_id    uuid REFERENCES users(id),
  recipient_email text,
  recipient_phone text,

  -- Consent as a record. DoorDash confirms permission before the text goes
  -- out, and under the TCPA the evidence is which wording was agreed to.
  consent_copy_version text,
  consent_at           timestamptz,

  -- Delivery intent, not an instant. Revolut promises 08:00 in the
  -- recipient's own timezone, and governments move clock rules.
  deliver_on    date NOT NULL,
  deliver_tz    text NOT NULL,

  -- Expiry differs by object: 45 seconds for a Binance red packet,
  -- five years minimum for US stored value under the CARD Act.
  expires_at    timestamptz,
  claimed_at    timestamptz,
  refunded_at   timestamptz,

  amount_minor  bigint NOT NULL,
  currency      char(3) NOT NULL,

  CONSTRAINT recipient_reachable CHECK (
    recipient_id IS NOT NULL OR recipient_email IS NOT NULL
                             OR recipient_phone IS NOT NULL)
);
```

Thrive Market, Blank Street, and Uber Eats take an address and build the account later. A gift can exist for days before its owner does, and the nullable `recipient_id` carries that gap, while the check at the bottom stops a row from being unreachable in every direction at once.

Revolut promised eight in the morning, and `deliver_on` with `deliver_tz` keeps that promise in the recipient's own timezone, where a single frozen timestamp would lose the eight o'clock entirely. A scheduler finds what is due with one query.

```sql
-- Gifts due now, resolved per recipient rather than per server.
SELECT id FROM gifts
 WHERE status = 'scheduled'
   AND (deliver_on + time '08:00') AT TIME ZONE deliver_tz <= now();
```

A worker running that every few minutes sends the Sydney gift on Sydney's morning and the London one nine hours later, off one row each, and when a government shifts its clock rules between the purchase and the birthday the same row answers differently. The table stays untouched.

The claim itself fits in one statement, and the `WHERE` clause replaces the lock a team would otherwise reach for.

```sql
UPDATE gifts
   SET status = 'claimed', claimed_at = now(), recipient_id = $2
 WHERE id = $1
   AND status = 'delivered'
   AND (expires_at IS NULL OR expires_at > now());
```

![Two panels comparing how a double tap on Claim is handled. On the left, read-then-write: both taps select the gift, both see it as delivered, and the wallet is credited twice for \(50 with nothing in the logs. On the right, a conditional UPDATE: the first tap claims the row, the second blocks, re-checks its WHERE clause against the committed row and affects zero rows, so the wallet is credited once for \)25](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/064f5b58-540c-4b4a-928a-59432a9e403b.png)

A second tap runs the same statement, finds the row already moved to `claimed`, and reports zero rows affected, so the money leaves once. An expired gift returns zero rows too. Telling those two apart takes one more read of `status` and `claimed_at`.

The claim screen can only say what that read returns. A recipient opening a link a month after it was sent meets an explanation rather than a blank screen or the word Error, learning that the gift was claimed on 12 March, or that it expired and the money went back to the sender. A product that never stored `claimed_at` falls back to "Something went wrong" and sends them to support. Designers write that copy, and the schema sets the limit on how honest it can be.

---

## How to Pick the Right Scenario for a Product

Even though nine scenarios exist, a product may rarely need more than one. The chart below counts what each one costs to build, in screens.

![Range chart of how many screens each gifting flow takes to build. Money wrapping is longest at a median of 12 screens, then stored value at 8.5, checkout upsell at 5.5, shared progress at 5, social currency at 4 and subscription seeding at 3.5. Each bar spans the shortest and longest flow observed, with the apps measured listed beside each scenario](https://cdn.hashnode.com/uploads/covers/67f97e8fbb627e7903057e92/ab042080-7d8b-428f-b7fe-af684b4bc951.png)

Money wrapping costs the most of the six measured, at a median of twelve screens, and GoPay needs sixteen of them for the themed envelope, the celebrity voice note, the suggested wishes and the unopened-gift tracker. Telegram's whole send takes four screens and Duolingo's takes three, since both start with the recipient already on screen and the amount a single tap away.

**A product with a checkout should build the checkout upsell first.** Twelve apps ship it. The whole build amounts to a toggle, a message field and a column on the order, aimed at a sender who has already reached for a card.

**Recurring cultural moments point at the occasion catalogue.** Nineteen apps run it, more than any other scenario, and the pre-written message does most of the converting, so the budget goes to whoever writes the tabs and the notes rather than to engineering.

**Subscription products should seed, and should pay the sender for doing it.** Thrive Market buys a new member for $30 in store credit and never runs the advertisement.

**Live interaction between users opens the door to social gifting.** Telegram and Twitch are running a visibility auction with a bow on it. The build needs a currency, a top-up flow and a moderation policy before an illustrator draws a teddy bear.

**Shared goals or streaks make progress gifting the obvious build.** Two apps in 58 do this at a median of five screens, which is within reach of any product that already has a friends list. The app knows one person is behind, so a useful gift answers that better than another notification.

**Everything else still benefits from a gift card, provided a designer gives it a real entrance.** Stored value runs from three screens at Urban Outfitters to seventeen at Shopee, the widest spread of any scenario. That gap shows how much of the flow a designer shaped rather than assembled.

---

## Conclusion

Gifting turns on timing before it turns on design. Across the fifty-eight apps in this study, the nine scenarios differ mainly in the moment they choose to ask. Eight of the nine attach that ask to a fact the product already holds, whether a full cart, a date on the calendar, a live conversation, or a shared goal running behind schedule.

Whichever scenario a product ships, the same six problems turn up in the send flow, from identifying a recipient who has no account to deciding what each side gets to see. The claim screen earns the money back. A recipient holding a gift a friend already paid for is the closest the feature comes to a new customer.

Five design decisions made on those screens end up in the database as one table with seventeen columns, and settling them before a developer starts costs a conversation instead of a migration.

The costs run smaller than they look, with a checkout toggle taking a few screens and shared progress at Duolingo running to five. Duolingo's Friends Quest already knew one learner needed help, with three days left and fifteen lessons to go, and put a twenty-gem XP Boost right where a sender would find it. That gift cost almost nothing.

Twenty-two apps in the study sell a gift card instead, waiting in an Account menu for a sender who already decided to send it. The Friends Quest screen costs no more to build, and it asks at the moment a learner was already thinking about the friend they would send it to.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Design Gifting Features People Actually Use: Evidence from 58 Apps",
  "desc": "American shoppers spent about $29 billion on gift cards over the 2025 holiday season, and 43 percent of them bought at least one. This put gift cards at the top of what people said they wanted accordi",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-gifting-features-people-actually-use-evidence-from-58-apps.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
