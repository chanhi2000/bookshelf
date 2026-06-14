---
lang: en-US
title: "#UserWay Will Get You Sued"
description: "Article(s) > #UserWay Will Get You Sued"
icon: fas fa-user-tie
category:
  - Career
  - Tip
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - career
  - tip
head:
  - - meta:
    - property: og:title
      content: "Article(s) > #UserWay Will Get You Sued"
    - property: og:description
      content: "#UserWay Will Get You Sued"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/userway-will-get-you-sued.html
prev: /projects/career/articles/README.md
date: 2021-09-14
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2021/09/userway_alt-300x300.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="#UserWay Will Get You Sued"
  desc="Disclaimer: This post and the headline is my opinion. I provide verifiable facts throughout to inform that opinion. I say this because French overlay vendor FACIL’iti has filed at least two frivolous lawsuits, and given overlay vendors tend to follow the same business practices, it is reasonable to assume UserWay…"
  url="https://adrianroselli.com/2021/09/userway-will-get-you-sued.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2021/09/userway_alt-300x300.png"/>

::: note Disclaimer

This post and the headline is my opinion. I provide verifiable facts throughout to inform that opinion. I say this because French overlay vendor [**FACIL’iti has filed at least two frivolous lawsuits**](/adrianroselli.com/overlays-underwhelm-web-directions-aaa-2021.md#Slide46), and given overlay vendors tend to follow the same business practices, it is reasonable to assume UserWay might eventually also resort to litigation to silence critics. I am also not a lawyer and this post does not constitute legal advice.

:::

Thanks to a comment on my post [**#accessiBe Will Get You Sued**](/adrianroselli.com/accessibe-will-get-you-sued.md), I found UserWay had taken the meat of that post, re-cast as its own effort, and was using it as a marketing effort to frame its overlay as a better product than accessiBe.

![Screen shot from UserWay site with a header of UserWay versus accessiBe, and the text “accessiBe Will Get You Sued”.](https://adrianroselli.com/wp-content/uploads/2021/09/userway_accessiBe_01.png)

![A quote from my post about accessiBe, but it is only the table of contents as one run-on sentence.](https://adrianroselli.com/wp-content/uploads/2021/09/userway_accessiBe_02.png)

I promptly [<VPIcon icon="fas fa-globe"/>captured the page in the Wayback Machine](https://web.archive.org/web/20210909114630/https://userway.org/userway-vs-accessibe/), because I have no interest in linking to the live version, and [asked UserWay to remove my name and any references (<VPIcon icon="fa-brands fa-x-twitter"/>`aardrian`)](https://x.com/aardrian/status/1435933916381294598) from its post. [Twice (<VPIcon icon="fa-brands fa-x-twitter"/>`aardrian`)](https://x.com/aardrian/status/1436427060440932360).

For some reason, in its response UserWay decided linking to Gareth Ford Williams’ post [<VPIcon icon="fas fa-globe"/>What are accessibility overlays good for?](https://uxdesign.cc/what-are-accessibility-overlays-good-for-718c6e2ef531) somehow validated it and its overlay.

Unlike my post [**#accessiBe Will Get You Sued**](/adrianroselli.com/accessibe-will-get-you-sued.md), I am not going to give UserWay free technical or business advice. I learned that lesson when accessiBe used it to attenuate its messaging (but, interestingly, not fix its product). I *am* going to paint with some broad strokes, however. I am also skipping some of the claims that I cannot validate (because I have no access to their servers and/or the statements are fluff).

---

## Lie: Makes your site ADA compliant

This statement misrepresents the ADA. UserWay is taking advantage of ongoing misunderstandings with what the ADA covers, what case law says it covers, and what people buying these products *thinks* it covers.

If we take ADA at face value, this is similar to saying UserWay makes your site FDA compliant. If we take ADA as interchangeable with WCAG, then a quick automated check will demonstrate otherwise.

![UserWay image criticizing the accessiBe widget with alt text naming it as the UserWay widget.](https://adrianroselli.com/wp-content/uploads/2021/09/userway_alt.jpg)

Axe, which prides itself on no false positives, finds 3 WCAG issues tied to testable WCAG Success Criteria on that page. ARC Toolkit finds 4, matching Axe and adding another valid problem. WAVE finds none, but does raise 202 alerts, including 111 cases of suspicious image alternative text. My favorite example of this is the image of the accessiBe widget that has the alternative text Picture of UserWay widget.

### UserWay Causes WCAG Failures

**Added 31 October 2021**. The article [<VPIcon icon="fas fa-globe"/>Technology can’t solve the problems ableism creates](https://stanforddaily.com/2021/10/26/technology-cant-solve-the-problems-ableism-creates/) at The Stanford Daily talks about the hype around the “laser cane” intended for blind people. It also unintentionally makes a statement on overlays, with UserWay’s tool providing the metaphor.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_01_contrast.mp4" />

Here UserWay *reduces* contrast on a site, causing a 1.4.3 Contrast (Minimum) violation. When you re-open the overlay to undo it (at 0:16), the overlay sends you to the UserWay site, a 3.2.2 On Input violation.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_02_links.mp4" />

UserWay offers to make links more visible, but when you undo it the icon links all but disappear, resulting in a 1.4.11 Non-text Contrast violation. At 0:14 you can see UserWay’s overlay again cause a 3.2.2 On Input violation.

<VidStack src="https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_03_dyslexia.mp4" />

This is not a WCAG violation, but the use of [**dyslexia-specific fonts as a catch-all has been debunked**](/adrianroselli.com/typefaces-for-dyslexia.md). Trying to swap to any other typeface triggers the 3.2.2 On Input violation, which you can see at 0:17, 0:25, and 0:34.  

<VidStack src="https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_04_size.mp4" />

Good news for UserWay here — the text on the page gets larger. Unfortunately, UserWay’s own widget gets smaller as you go. It seems unlikely this will satisfy 1.4.4 Resize text. I avoided the 3.2.2 On Input violation here by closing the page.

::: note Update: 21 March 2022

After my conversation with UserWay’s COO, I evaluated the single site example in this post. To the COO’s credit, he is correct that someone fixed the problems I identified at The Stanford Daily — by removing the UserWay overlay.

![Stanford Daily article with a box floating on the right edge of the page showing a half-filled circle and a the letter T in two sizes. The browser dev tools show it is not an interactive control and uses a click handler on the container.](https://adrianroselli.com/wp-content/uploads/2021/09/userway_off-stanford-daily.png)

The Stanford Daily article seemingly uses the [<VPIcon icon="fa-brands fa-wordpress"/>WP Dark Mode plug-in](https://wordpress.org/plugins/wp-dark-mode/) instead of UserWay now, which (unlike UserWay’s solution) works if you use a pointer. Keyboard users are stuck because the control is a `<div>` with no role, no ability to give it focus, and no keyboard handler. Yet this is still somehow better because at least *some* users will get a functional dark mode.

:::

---

## Lie: Strong reputation with the disabled community

Nearly 600 people in and supporting the disabled community have said very much the opposite. They have signed on to the [<VPIcon icon="fas fa-globe"/>Overlay Fact Sheet](https://overlayfactsheet.com/) which includes this statement:

::: info Conclusion from Overlay Fact Sheet (<VPIcon icon="fas fa-globe"/><code>overlayfactsheet.com</code>)
> 4. More specifically, we hereby advocate for the removal of accessiBe, AudioEye, UserWay, User1st, MK-Sense, MaxAccess, FACIL’iti, and all similar products and encourage the site owners who’ve implemented these products to use more robust, independent, and permanent strategies to making their sites more accessible.

```component VPCard
{
  "title": "Overlay Fact Sheet",
  "desc": "An open letter about accessibility overlays.",
  "link": "https://overlayfactsheet.com/en/#conclusion/",
  "logo": "https://overlayfactsheet.com/favicon.ico",
  "background": "rgba(255,155,131,0.2)"
}
```

:::

---

## Questionable: Privacy by design, data minimization

I cannot look into UserWay’s systems to understand what it does with the data it captures. I can, however, look at how it presents privacy and compliance to users. It has an alphabet soup of related and unrelated laws linked from its footer: HIPAA, GDPR, COPPA, FERPA (it also lists ATAG and WCAG, which are outside the scope of privacy). I was surprised PCI-DSS wasn’t in there just for more letters.

Following each link brings you to a page describing the law but not how UserWay conforms — let alone how it is relevant. HIPAA, for example, has no bearing on UserWay (egad, I hope no patient portals are using it). Just like anti-vaxxer claims that asking for proof of a vaccine is a HIPAA violation, UserWay is happy to capitalize on that same misrepresentation.

UserWay is, however, happy for you to contact it instead of telling you how any of these apply: To learn more about how UserWay’s Accessibility Widget complies with HIPAA regulations, please contact us. The *contact us* link is the same destination as the *free trial* link that immediately follows.

---

## Lie: Loved by Disabled Community

As its sole piece of evidence, UserWay references (but does not link) [one tweet from 2018 (<VPIcon icon="fa-brands fa-x-twitter"/>`DevenRue`)](https://x.com/DevenRue/status/1001544700229181440). A 3½-year-old tweet. I suppose all I need to do is [<VPIcon icon="fa-brands fa-x-twitter"/>find a single tweet critical of UserWay](https://x.com/hashtag/UserWay?src=hashtag_click) and I have disproven it.

Maybe I can find a member of the disabled community who took [more time than a casual tweet (<VPIcon icon="fa-brands fa-x-twitter"/>`HabenGirma`)](https://x.com/HabenGirma/status/1393368312046788608), though.

[Haben Girma](https://habengirma.com/) has been advocating on behalf of the disabled community for years. She wrote about being the first Deafblind person to graduate from Harvard Law School. When she weighs in on overlays, it is not just from personal experience but also based on her recognition of the harms the tool is creating.

### Criticism from Twitter Users

I am a bit amused that UserWay thinks users critical of accessiBe automatically equates to support of UserWay. I mean, I get it, for the people they are targeting that is probably more than adequate.

But half of the people behind the tweets quoted on that page are signatories to the Overlay Fact Sheet. They have explicitly stated UserWay is one of the bad options. UserWay is intentionally misrepresenting their statements as a result. And [they are not cool with that (<VPIcon icon="fa-brands fa-x-twitter"/>`kit_flowerstorm`)](https://x.com/kit_flowerstorm/status/1435941467109969924).

---

## Anti-accessiBe Press is Critical of UserWay Too

UserWay makes it a point to reference articles that are critical of accessiBe explicitly. More accurately, it references two news pieces and two opinion pieces. One opinion piece is my post [**#accessiBe Will Get You Sued**](/adrianroselli.com/accessibe-will-get-you-sued.md), which I have updated to include a note about UserWay.

Remember, these are pieces critical of accessiBe that go out of their way to note that all overlays are a problem.

::: info People With Disabilities Say This AI Tool Is Making the Web Worse for Them (<VPIcon icon="fas fa-globe"/><code>vice.com</code>)

> But over the past several months in particular, as AccessiBe’s footprint has spread, many people with disabilities have grown increasingly angry at it and other automatic web overlay companies. The tools often make websites less usable than they were before, and the companies’ marketing strategies, they say, emphasize the need for business owners to avoid lawsuits rather than actually make their websites usable.

<SiteInfo
  name="People With Disabilities Say This AI Tool Is Making the Web Worse for Them"
  desc="AccessiBe aims to make the internet fully accessible to the visually impaired by 2025—but activists say the company's AI is making things worse."
  url="https://vice.com/en/article/people-with-disabilities-say-this-ai-tool-is-making-the-web-worse-for-them//"
  logo="https://vice.com/wp-content/uploads/sites/2/2024/06/cropped-site-icon-1.png?w=192"
  preview="https://vice.com/wp-content/uploads/sites/2/2021/03/1615903452339-screen-shot-2021-03-16-at-94834-am.png"/>

:::

::: info Blind people, advocates slam company claiming to make websites ADA compliant (<VPIcon icon="fas fa-globe"/><code>nbcnews.com</code>)

> Greco, at the University of California, Berkeley, said other companies have similar products that have many of the same technical issues AccessiBe does. But AccessiBe stands out because of its rapid growth, heavy marketing and defensive style of engagement with blind people who claim it hasn’t worked for them.

<SiteInfo
  name="Blind people, advocates slam company claiming to make websites ADA compliant"
  desc="“If you have a website, do you want to include disabled people or do you want to exclude them? That’s why it's a civil right,” one expert said."
  url="https://nbcnews.com/tech/innovation/blind-people-advocates-slam-company-claiming-make-websites-ada-compliant-n1266720/"
  logo="https://nodeassets.nbcnews.com/cdnassets/projects/ramen/favicon/nbcnews/all-other-sizes-PNG.ico/android-icon-192x192.png"
  preview="https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2021_18/3471225/210507-chancey-fleet-se-441p.jpg"/>

:::

The other opinion piece is a Forbes Sites piece (these are written by people who pay to host their articles under the Forbes banner, they are not Forbes writers) that says:

::: info Largest U.S. Blind Advocacy Group Bans Web Accessibility Overlay Giant AccessiBe From Its National Convention (<VPIcon icon="fas fa-globe"/><code>forbes.com</code>)

> First and foremost, there remains one key principle to keep front of mind — currently, there exists no overlay technology on the market that can, by itself, render a website fully accessible and protect it from ADA lawsuits.

<SiteInfo
  name="Largest U.S. Blind Advocacy Group Bans Web Accessibility Overlay Giant AccessiBe From Its National Convention"
  desc="The National Federation of the Blind, America’s most powerful civil rights group for the visually impaired has issued a statement denouncing web accessibility overlay market leader accessiBe. The NFB accuses accessiBe of pursuing “harmful” practices and dismissing the feedback of blind users."
  url="https://forbes.com/sites/gusalexiou/2021/06/26/largest-us-blind-advocacy-group-bans-web-accessibility-overlay-giant-accessibe//"
  logo="https://i.forbesimg.com/48X48-F.png"
  preview="https://imageio.forbes.com/specials-images/imageserve/548562225/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds"/>

:::

---

## This Is Just UserWay’s Marketing Response

![Post on the accessiBe site titled “Using a free plugin like UserWay? You are at risk of litigation” dated 29 May 2020.](https://adrianroselli.com/wp-content/uploads/2021/09/userway_accessiBe_userway.jpg)

That gray bar under the breadcrumb? Just accessiBe’s developers thinking making it into a clipped scrolling area is somehow better than just letting text wrap.

This post from UserWay is just a response to [<VPIcon icon="fas fa-globe"/>accessiBe’s own claim that UserWay will put you at risk](https://web.archive.org/web/20200625215434/https://accessibe.com/blog/knowledgebase/using-an-accessibility-plugin-like-userway-you-are-at-risk-of-litigation), except in this case UserWay uses the title of my post (ostensibly to reduce its legal exposure). Obviously, there is evidence that sites with accessiBe still get sued, but UserWay’s argument is that accessiBe’s overlay is somehow unique for that.

UserWay has removed the abstract and link to my post, but it has not removed the title of my post. That title, accessiBe Will Get You Sued, still lives on the UserWay page in an `<h2>`. The heading suggests they like the link juice too much and the quotes imply some level of distance should accessiBe’s lawyers come calling (by claiming they are simply quoting me).

---

## Olympics and #WeThe15

UserWay proudly advertises its use on the Tokyo Paralympics web site. Another site from the Paralympic Committee, [<VPIcon icon="fas fa-globe"/>#WeThe15](https://wethe15.org/), was launched to promote disability awareness and end discrimination. It also had the UserWay overlay.

But as the #WeThe15 campaign got traction on Twitter and the community it was claiming to support went and looked at the site, the response to that overlay was swift. Folks [were surprised (<VPIcon icon="fa-brands fa-x-twitter"/>`HashtagHeyAlexa`)](https://x.com/HashtagHeyAlexa/status/1430600877266583554), [called it out (<VPIcon icon="fa-brands fa-x-twitter"/>`vavroom`)](https://x.com/vavroom/status/1428485057392615430), [shared their frustration (<VPIcon icon="fa-brands fa-x-twitter"/>`Kevmarmol_CT`)](https://x.com/Kevmarmol_CT/status/1430160843237363714), and even [gave them the benefit of the doubt (<VPIcon icon="fa-brands fa-x-twitter"/>`dboudreau`)](https://x.com/dboudreau/status/1430205416013697028).

#WeThe15 fixed it by removing UserWay from its site, along with a couple tweets [acknowledging (<VPIcon icon="fa-brands fa-x-twitter"/>`WeThe15`)](https://x.com/WeThe15/status/1430198708738527232) and [apologizing (<VPIcon icon="fa-brands fa-x-twitter"/>`WeThe15`)](https://x.com/WeThe15/status/1430195944180502534).

I am not surprised the Paralympic folks have done nothing. Partly because they were not directly engaging the community, and partly because between [taking the inspiration porn angle (<VPIcon icon="fa-brands fa-x-twitter"/>`aardrian`)](https://x.com/aardrian/status/1430511835023872000) and [failing to make its videos accessible (<VPIcon icon="fa-brands fa-x-twitter"/>`aardrian`)](https://x.com/aardrian/status/1430848497561964547) (that it borrowed from WeThe15), it seems fair to assume they were not really invested in the message.

---

## Wrap-up

Will UserWay get you sued? Maybe. We already know that users can disable overlays, scripts can fail, connections can be dropped, and features can collide. Even if the product itself performed as it claims, there is always a chance it will not function. As such, it is a poor substitute for building your thing the right way the first time.

I cannot say if UserWay is as bad as accessiBe on the technical side, because I am not giving away free reviews anymore. I cannot even say if UserWay is as amoral as accessiBe, simply because UserWay has less money to spend. I can say, however, that the trends are clear — UserWay lies about its offering and lies about community support. I doubt it is in any way better, no matter how low the bar is that accessiBe has set.

UserWay and accessiBe are two rotten peas in a dirty dirty pod.

::: note Removed: 19 September 2021

UserWay made a smart call and removed the page from its site. If you go there now [<VPIcon icon="fas fa-globe"/>you will get a 404 page](https://web.archive.org/web/20210919230733/https://userway.org/userway-vs-accessibe/). Had you [gone <VPIcon icon="fas fa-globe"/>there Friday](https://web.archive.org/web/20210917020700/https://userway.org/userway-vs-accessibe), you would have seen they had removed my name (as I noted above).

UserWay has made no apologies nor explanations. I leave it to the reader to guess why UserWay decided now to remove it, and wonder how many other false claims and stolen material UserWay is passing off as its own truthful content. If nothing else, UserWay has demonstrated it has a credibility problem.

:::

::: note Update: 21 March 2022

After my conversation with UserWay’s COO, he asked me to remove this post, believing that since UserWay had deleted the page with my stolen content there was no longer a reason for me to leave it. I pointed out that UserWay never publicly acknowledged it had taken my content, mis-represented my words, and used my name in its marketing efforts all without my consent. Even today [<VPIcon icon="fas fa-globe"/>that page is a 404](https://userway.org/userway-vs-accessibe/) instead of a public apology, which I explained demonstrates how UserWay believes it did no wrong and only moved to limit its reputational harm.

This post will remain, even if UserWay finally demonstrates contrition, because it is a record of UserWay’s unethical business practices and its failure to take steps to correct them. The best predictor of future behavior is past behavior, and we need to remember how UserWay (and its leadership) has operated in the past before trusting it in the future. We can only hope it is willing to make that difficult journey to rehabilitate its products and services before trying to do so with its image.

---

## UserWay Demonstrates It Does Not Understand WCAG

**Added 21 November 2021**. Or perhaps UserWay chooses to ignore WCAG. The more charitable take, however, is UserWay is just incompetent, not intentionally ignoring a standard that its own product claims will [<VPIcon icon="fas fa-globe"/>provide full WCAG & ADA compliance from day one, and every single day thereafter](https://userway.org/#:~:text=provide%20full%20WCAG%20%26%20ADA%20compliance%20from%20day%20one%2C%20and%20every%20single%20day%20thereafter.).

![A dialog a div with a click event and aria-label as the only method for users to interact with it, including a lack of focus or hover styles.](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_BlackFriday_clickable-div.jpg)

![Firefox providing three different warnings, with a link to learn more, that the dialog is inaccessible to keyboard users.](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_BlackFriday_FF-WCAG-warnings.jpg)

Even with the benefit of Firefox warning that the Black Friday dialog is inaccessible to keyboard users, UserWay chose to post content that violates WCAG in at least three different ways.

The code also demonstrates UserWay does not understand ARIA. While `aria-label` does not belong on a `<div>`, maybe UserWay’s hope was to override all the content within (because that’s what `aria-label` does). Though if the `aria-hidden="true"` on the images with `alt=""` wasn’t a head scratcher on its own, given the context of the `aria-label` wrapper it is certainly one now.

```html
<div class="bf2021__inner" aria-label="Black Friday 30% Off! Start Free Trial" onclick="[…]">
  <div class="bf2021__title" data-uw-styling-context="true">
    Black Friday
    <br role="presentation" data-uw-rm-sr="">
    30% Off
  </div>
  […]
  <div class="logo"><img src="[…]" alt="" aria-hidden="true"></div>
  <div class="logo-gradient"><img src="[…]" alt="" aria-hidden="true"></div>
  <div class="woman woman_b">
    <picture>[…]</picture>
  </div>
  <div class="dots"><img src="[…]" alt="" aria-hidden="true"></div>
</div>
```

As part of this Black Friday deal, [UserWay’s spam emails (<VPIcon icon="fa-brands fa-x-twitter"/>`ianhamilton_`)](https://x.com/ianhamilton_/status/1461701965554016260) are also promising **full** WCAG coverage (emphasis theirs). That is clearly not true.

---

## UserWay Buys Positive Reviews

**Added 22 November 2021**. Not to be outdone by [accessiBe’s practice of paying for praise](/2020/06/accessibe-will-get-you-sued.html#Paid), UserWay is offering its customers Amazon gift cards to leave positive reviews at software review site G2.com.

![Recipient, There’s no better time to get your site completely ADA-compliant and way more accessible while saving a nice chunk of change. Adding UserWay’s comprehensive AI-Powered Widget to your website gets you full WCAG coverage. This Black Friday, you’re guaranteed to save at least $147. ADA compliance is the law. Don’t miss out on this deal! Start Free Trial.](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_Black-Friday_spam-01.jpg)

![And an extra Offers Too Big to Miss. G2 Review | $30 Amazon Gift Card. Be one of 100 users to get a 30$ Amazon gift card! Just review us on G2.com. It’s that simple. Video Testimonial | $50 Amazon Gift Card. Maybe it’s easier to express your thoughts by speaking out loud? Apply to record a video. If you qualify, we’ll send you instructions for how to record your video — and claim your gift!](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay_Black-Friday_spam-02.jpg)

In this UserWay Black Friday spam message ([source (<VPIcon icon="fa-brands fa-x-twitter"/>`ianhamilton_`)](https://x.com/ianhamilton_/status/1462823619478892544)), UserWay is offering a $30 Amazon gift card for a positive review, and $50 for a positive video review. Note it also promises **full** WCAG coverage, a lie since we have seen UserWay is more likely to *introduce* WCAG issues.

The [<VPIcon icon="fas fa-globe"/>UserWay reviews on G2.com](https://g2.com/products/userway/reviews?utf8=%E2%9C%93&filters%5Bkeyphrases%5D=&order=lowest_rated&filters%5Bcomment_answer_values%5D=) are not from end users, but from UserWay customers. To reiterate, the people rating the product are not disabled end users who need accessibility affordances, they are from business owners who are being compensated to leave positive reviews. Note that UserWay says it will review submissions before compensation.

If you want to see what contributors and editors for WCAG, ARIA, and HTML specifications, internal accessibility experts for companies, internal accessibility experts from higher education institutions, lawyers for the disabled, contributors to assistive technology software such as JAWS and NVDA, and scores of end users with disabilities think about UserWay, then visit the [<VPIcon icon="fas fa-globe"/>Overlay Fact Sheet](https://overlayfactsheet.com/).

None of the names on the Overlay Fact Sheet were paid for their signature.

---

## UserWay Relies on False Advertising

**Added 15 December 2021**. The site [Overlay False Claims](https://overlayfalseclaims.com/) documents provably incorrect assertions made by UserWay throughout its marketing efforts. The site also tracks [other anti-competitive behavior](https://overlayfalseclaims.com/anti-competitive-behavior.html), [downloads](https://overlayfalseclaims.com/downloads.html) for use in legal action or consumer complaints, and links for [filing consumer complaints](https://overlayfalseclaims.com/consumer-complaint-resources.html) throughout the US and Canada.

If you have other examples of false advertising (perhaps you have received marketing emails, or been pitched by your web site vendor / overlay reseller) or links for filing consumer complaints in other countries, then [please submit a GitHub issue (<VPIcon icon="iconfont icon-github"/>`karlgroves/overlayfalseclaims`)](https://github.com/karlgroves/overlayfalseclaims/issues).

<!-- TODO: 여기서부터 작성 -->

### UserWay Will Not Protect from Lawsuits

**Added 15 December 2021**. At the 2021 [<VPIcon icon="fa-brands fa-youtube"/>Digital Accessibility Legal Summit](https://accessibility.legal/), a two-part session was held on overlays. [<VPIcon icon="fa-brands fa-youtube"/>Part one has been posted to YouTube](https://youtu.be/CUMDFdbGPz8) with this abstract:

> As part of the 2021 Digital Accessibility Legal Summit, Jeremy Horelick, Jason Taylor and Richard Hunt discuss widgets, plug-ins and overlays being marketed as one-step software solutions to website accessibility. They provide a brief review of terminology and differences between the various products, followed by an examination of whether these tools will do what they promise—in terms of both actual accessibility and protection from website accessibility litigation.

When asked if overlays reduce litigation expense or risk, the answer was a resounding *no*. You can [<VPIcon icon="fa-brands fa-youtube"/>jump to 31:46 of the video](https://youtu.be/CUMDFdbGPz8?t=1906) and listen/read for yourself, but I have quoted the salient bit:

> They absolutely do not. And there are two reasons why this is true. The first reason is simply because they don’t actually fix websites. […]
> 
> The other reason is because the law firms, not all the law firms, but many of the law firms that are in this area do not care whether the website is really accessible or not. Their desire is to find something that they can identify as an error, usually by measuring it against WCAG, and if they can find that error, they can file a lawsuit in good faith. Remembering that their goal is to settle the lawsuit as soon as possible.

Watch [<VPIcon icon="fa-brands fa-youtube"/>The Great Accessibility Overlays Battle – Part 1](https://youtu.be/CUMDFdbGPz8) at YouTube.

#### Update: 21 March 2022

[After my conversation with UserWay’s COO](#Update06), I walked back through my [**a11yNYC talk about overlays**](https://adrianroselli.com/2022/03/overlays-underwhelm-a11y-nyc.html)
<!-- TODO: /adrianroselli.com/overlays-underwhelm-a11y-nyc.md --> and found instances where I cited issues with UserWay and re-checked them.

[On slide 31](/2022/03/overlays-underwhelm-a11y-nyc.html#Slide31) I referenced a claim by UserWay that there were no lawsuits mentioning UserWay. I said I could not verify that claim. Thanks to UserWay saying the talk was not accurate, I was motivated to dig up a suit that mentions UserWay. Remember [UserWay’s now-deleted claim](https://web.archive.org/web/20210909114630/https://userway.org/userway-vs-accessibe/) was live as far back as 9 September, and most certainly earlier.

In Paguada v. YieldStreet, [YieldStreet attempted to get the lawsuit dismissed](https://law.justia.com/cases/federal/district-courts/new-york/nysdce/1:2020cv09254/547553/29/) by adding the UserWay plug-in sometime in March 2021. In April 2021, an expert witness identified barriers and WCAG failures that persisted despite (and/or because of) the plug-in. The motion to dismiss was denied, [signed 20 October 2021](https://adrianroselli.com/wp-content/uploads/2021/09/Paguada-v-YieldStreet_motion-to-dismiss.pdf).

UserWay was not named in the original suit, only the motion, and UserWay’s failure to provide the required cure was not official until more than a month after the earliest date of that post I could find. Though UserWay knew its failure of compliance by April 2021 given that it responded to the failure. Not enough to assert UserWay lied, but enough to make me wonder what UserWay considers a gray area.

---

## After a Conversation with the COO: 21 March 2022

While at CSUNATC this year (2022), the Chief Operating Officer (COO) of UserWay intercepted me as I entered the opening night mixer, before I got to talk to anyone else. He wanted 10 minutes of my time, which I begrudgingly granted him even though it was not a public conversation.

I understand he spent much of CSUN asking for one-on-one conversations with known practitioners, something [I later counseled people against](https://twitter.com/aardrian/status/1504856785517088771) accepting (also in real life) when I found out.

UserWay’s COO said he watched my [**a11yNYC talk about overlays**](https://adrianroselli.com/2022/03/overlays-underwhelm-a11y-nyc.html)
<!-- TODO: /adrianroselli.com/overlays-underwhelm-a11y-nyc.md --> and had read this post. He said the issues I raised had since been fixed but my material did not reflect that. So I went back through this post and the talk to see what warranted an update.

The following anchor links will take you to the appropriate part of this post:

- Read the update about [UserWay’s lawsuit claims](#Update06a);
- Read the update about [UserWay’s failures](#Update06b) on a client site;
- Read the update about [UserWay stealing my content](#Update06c).

My other findings — reputation, privacy guarantees, IAAP membership, criticisms, failures under WCAG, buying reviews, false advertising, legal claims — all still hold true.

---

## UserWay Tries to Cash in on W3C Brand: 19 June 2022

On 26 May 2022 at 10:58am ET, the Chief Operating Office of [<VPIcon icon="iconfont icon-w3c"/>UserWay proposed an overlay W3C Community Group](https://w3.org/community/blog/2022/05/26/proposed-group-overlay-community-group/). [<VPIcon icon="iconfont icon-w3c"/>For a W3C Community Group to be formed](https://w3.org/community/about/faq/#how-do-i-propose-a-group), anyone with a W3C account can propose it and then five (5) people must show their support by activating a button. The W3C acts as nothing more than a host for an email discussion list.

The same day the Community Group was proposed, the UserWay COO, The UserWay CEO, two UserWay Advisors, and an Accessibility Evangelist at AudioEye all signaled their support and the group was formed at 7:56pm ET on 26 May 2022. This was announced on Twitter via an [automated tweet from the W3C](https://twitter.com/w3c/status/1529975120273489921). At launch, the group had only two of the people who signaled their support, plus one other person, for a total of three (3) participants.

The automated tweet directed users to the seemingly auto-generated [<VPIcon icon="iconfont icon-w3c"/>Call for Participation in Overlay Community Group](https://web.archive.org/web/20220527235159/https://www.w3.org/community/overlay/2022/05/26/call-for-participation-in-overlay-community-group/), asking for people to join. On 27 May 2022 at 7:38pm ET I left the following comment on the Call for Participation:

> I think it is crucial that a W3C Community Group is founded with accurate information, especially when soliciting participation.
> 
> Some notes on the premise of overlays as stated in this announcement:
> 
> > These function by adding a snipet of javascript into a web content provider’s page.
> 
> The “snippet” is a script reference to a library of code that comprises a good deal more functionality than a snippet would imply. That script reference is then loaded by the end user’s browser and applied to the web page by the end user’s browser.
> 
> > Typically, this single line of additional code functions to enable, on each page load, additional content processing, delivered through the overlay provider’s servers, before the content is delivered to the end user.
> 
> Again, this “single line” is a reference to a URL where a much larger library of code lives (even if it has been minimized to have no line feeds).
> 
> The “content processing” is not done on page load. It is performed after the script has been fetched, parsed, and applied to the web site DOM by the end user’s browser.
> 
> The statement that this happens “before the content is delivered to the end user” is inaccurate since the page (content) must load at least enough for the end user’s browser to fetch the overlay provider’s library of code and then the end user’s browser must parse the DOM, which is after the content has been delivered. Then the end user’s browser can apply the overlay provider’s script.
> 
> To reiterate, all “remediation” is done in the end user’s browser by the end user’s JavaScript JIT compiler, at the user’s expense in energy costs. If the overlay provider’s script does not load for some reason (network error, firewalls, ad blockers, etc) then no remediation is performed.
> 
> > …informed by sober analysis of what technological innovation at the edge can offer.
> 
> I am not sure this is “the edge” given the sentence that precedes this one which reads “…this routing paradigm is by no means unique to accessibility applications…”
> 
> Finally, in the interests of full disclosure, this is the provided list of names of those who supported creation of this community group but with their overlay vendor affiliations added:
> 
> Lionel Wolberger (UserWay COO), Jeff Kline (UserWay Advisor), Janina Sajka (UserWay Advisor), Allon Mason (UserWay CEO), Alisa Smith (Accessibility Evangelist at AudioEye).
> 
> [<VPIcon icon="iconfont icon-w3c"/>My comment on 27 May 2022 at 7:38pm ET](https://w3.org/community/overlay/2022/05/26/call-for-participation-in-overlay-community-group/?unapproved=2&moderation-hash=556c25763576432e5e482e9b8b556cdd#comment-2), never published

My comment was never approved. In fact, not only was my comment never approved but when I checked on 28 May 2022 at 5:04pm ET, I discovered the [<VPIcon icon="iconfont icon-w3c"/>Call for Participation](https://w3.org/community/overlay/2022/05/26/call-for-participation-in-overlay-community-group/) had been deleted completely. No new Call for Participation has since been generated.

As of this writing (19 June 2022), the Overlay Community Group has five (5) members, only two (2) of them from the original supporting people. It has no public email in its archives and has published nothing else publicly. It has sat for three weeks with no public activity of any kind, and has made no further call for participants.

My opinion is that this Community Group was never meant for genuine use. It seems more likely to me that UserWay is using the W3C brand to provide a veneer of credibility to its own ongoing marketing efforts. As evidence I point to the UserWay-heavy supporters, the lack of activity, the removal of the call for participants, and the failure to approve my comment after claming the group was intended to foster “sober analysis”.

### UserWay Renames the Community Group: 23 June 2022

I got a tip that the Overlay Community Group has changed its name. If you go to [<VPIcon icon="iconfont icon-w3c"/>w3.org/community/overlay](https://w3.org/community/overlay/) you will be redirected to [<VPIcon icon="iconfont icon-w3c"/>w3.org/community/a11yedge](https://w3.org/community/a11yedge/). The new name is the *Accessibility at the Edge Community Group*. At least 20% of its [members did not know](https://twitter.com/bobmartinengo/status/1540031573587677185) (and that person is [not an impartial observer](https://twitter.com/bobmartinengo/status/1531333953474375680)).

Same members, same lack of activity. Didn’t even fix the *snipet* typo in the intro.

### UserWay Gets Community Group into DoJ Document: 13 April 2024

The Justice Department announced a [final rule under Title II of the ADA](/2022/03/ada-web-site-compliance-still-not-a-thing.html#Update09). It’s targeted specifically at the web sites and native mobile apps of state and local governments. I missed this on the first read through the 300+ page document, but it has a brief statement on overlays:

> Several comments expressed concerns about public entities using accessibility overlays and automated checkers.369 This rule sets forth a technical standard for public entities’ web content and mobile apps. The rule does not address the internal policies or procedures that public entities might implement to conform to the technical standard under this rule.
> 
> 369 See W3C, Overlay Capabilities Inventory: Draft Community Group Report (Feb. 12, 2024), [<VPIcon icon="iconfont icon-w3c"/>https://a11yedge.github.io/](https://a11yedge.github.io/)capabilities/ [<VPIcon icon="iconfont icon-w3c"/>[<VPIcon icon="iconfont icon-w3c"/>https://perma.cc/2762-VJEV](https://perma.cc/2762-VJEV)]; see also W3C, Draft Web Accessibility Evaluation Tools List, [<VPIcon icon="iconfont icon-w3c"/>https://www.w3.org/WAI/ER/tools/](https://w3.org/WAI/ER/tools/) [[https://perma.cc/Q4ME-Q3VW](https://perma.cc/Q4ME-Q3VW)] (last visited Feb. 12, 2024).

That Overlay Community Group document definitely did not contain the W3C disclaimer when I looked a couple days ago, nor does it in the [most recent version in the Wayback](https://web.archive.org/web/20240103190233/https://a11yedge.github.io/capabilities/). Eric Eggert filed an issue ([#12: Document is misleadingly presenting as an official W3C document (<VPIcon icon="iconfont icon-github"/>`a11yedge/capabilities`)](https://github.com/a11yedge/capabilities/issues/12)) noting this violation of the terms the Community Group agreed to when signing up to use W3C’s hosting. The UserWay rep quickly closed it as “not planned”, but a [fix went through in a PR (<VPIcon icon="iconfont icon-github"/>`a11yedge/capabilities`)](https://github.com/a11yedge/capabilities/pull/13).

The Overlay CG document also continues to fail to disclose that [one of the authors is a UserWay rep](https://web.archive.org/web/20231019053019/https://userway.org/team/), and instead lists them as an “invited expert”, which is not thing in W3C Community Groups (or at least being an invited expert to a real working group is irrelevant in a Community Group that allows anyone).

I continue to warn about UserWay’s ongoing casual relationship with the truth, and yet this astroturfing document is referenced by the DoJ.

---

## UserWay’s Tenuous Understanding of Code: 11 October 2022

Every site has coding errors. This site probably has a few (especially given how cavalier I am with spelling compounded by a complete lack of a testing team). Ideally an overlay would address the scenarios that cause problems for users.

In this case, an error introduced by UserWay in its own code is not fixed by UserWay’s own overlay.

[![Firefox dev tools highlighting a paragraph where words break at the end of the line in weird places; “accessibility” breaks at “accessibilit”, “involved” breaks at “i”, “sheer” breaks at “she”, and “get” wraps at “ge”.](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay-word-break-all.png)](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay-word-break-all.png) [![The same paragraphs but with no broken words, thanks to removing both instances of CSS declaration word-break: break-all.](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay-word-break-unset.png)](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay-word-break-unset.png)

I may have [referenced this on Twitter](https://twitter.com/aardrian/status/1579101936464166912) ([twice](https://twitter.com/aardrian/status/1579504256453079041)).

Leaving this as a general heading as I may add more.

**Added 29 June 2023:** Read the section below [UserWay Offers New ‘AI’ Code Fixer](#MoreFakeAI) as an example of UserWay’s new vector to add WCAG failures to your existing code.

---

## Nielsen Norman Group on Overlays: 1 May 2023

![The Coca-Cola home page in a mobile browser alongside the same page with the UserWay overlay expanded and showing its options.](https://adrianroselli.com/wp-content/uploads/2021/09/userway_cocacola.jpg)

The Coca-Cola home page shows the UserWay overlay before and after expansion

Nielsen Norman Group has an article about the challenges screen reader users on mobile device experience across the web. The last section of the article is *4. Accessibility Menus: Not Helpful*, which deals with the accessibility overlays offered by accessiBe and UserWay. Within the scope of the article, Nielsen Norman Group refers to overlays as “accessibility menus”. I adjust for that in the following quoted excerpts.

> We wondered how practically useful and recognizable these [overlays] are to real users who are blind or have low vision. To answer this question, we had participants in our study perform tasks on mobile websites with these [overlays]. The short answer is that **our screen-reader users did not find them useful.**
> 
> […]
> 
> When participants did not open the [overlays] on their own, we prompted them to open the menus and see whether there was anything that seemed useful inside. After briefly exploring one [overlay], a participant commented, the first thought that comes to mind is what a waste of time and money […] when anyone using a phone that needs a screen reader is already gonna have one built in.
> 
> […]
> 
> […] As one blind user put it, I hate [overlays] because […] I think they make companies feel like they don’t need to actually work on making something accessible […] it is not a substitute for actual accessibility testing and, to me, it feels like just a Band-Aid that can almost make it worse sometimes. […] Most accessibility issues are structural and cannot be fixed by a simple plugin.
> 
> [Challenges for Screen-Reader Users on Mobile](https://nngroup.com/articles/screen-reader-users-on-mobile/), Nielsen Norman Group

Nielsen Norman Group is confirming what disabled users have been saying for years — overlays are not helpful. Including overlays from UserWay and accessiBe.

---

## Lie: UserWay’s ‘Good’ Results in WAVE: 4 June 2023

The UserWay overlay actively spoofs WebAIM’s WAVE checker into reporting better testing results than UserWay has actually provided for users.

This may not be new. I demonstrated [accessiBe spoofing WAVE in 2020](/2020/06/accessibe-will-get-you-sued.html#Spoofs). I cannot be certain if UserWay was trying to spoof WAVE at the same time or if UserWay simply emulated the amoral behavior of accessiBe. Either way, overlays of a feather lie together.

WAVE displays this message:

> The third-party UserWay integration on this page modifies page content when WAVE is activated. This may result in accessibility errors present on the page before WAVE is activated not being detectable. If you are unable to see WAVE details above, UserWay has blocked WAVE functionality on this page. See [overlayfactsheet.com](https://overlayfactsheet.com/) to learn more about accessibility overlays.

Remember that UserWay had enough of an understanding how the WAVE checker worked to spoof its tests, but clearly not the capability to actually improve the page for users. Otherwise it would not have needed to lie to users of WAVE.

### UserWay Will Stop Lying to WAVE: 9 June 2023

In a continuing trend where UserWay only backs away from amoral activities after it has been publicly shamed, it appears UserWay is stripping its code that lies to the WAVE automated checker.

I see no indication UserWay thinks it did anything wrong here:

Worse, UserWay tries to paint itself as a peer to WebAIM while suggesting that WebAIM also provides an inaccessible and broken overlay product.

Bear in mind their dialog of cooperation was kicked off because WebAIM proved UserWay was lying to users.

---

## UserWay Offers New ‘AI’ Code Fixer: 29 June 2023

For reference, understand that UserWay has branded its product offering as ‘AI’ for quite some time, as in this November 2022 Twitter post (emphasis mine) where the image has no alternative text:

It is curious that UserWay would, and I am guessing here, seemingly license ChatGPT to offer its new code remediation tool at [FixMyCode.ai](https://FixMyCode.ai). But UserWay has done so with a bit of a twist, as the intro promises (punctuation left unchanged):

> The first coding assistant trained in digital accessibility. Optimize your code to be more inclusive, and usable. and conform with WCAG 2.1 AA standards.

It offers three options:

- Create an accessible login form, followed by an SVG with no text alternative which is also not hidden from AT;
- Create an accessible popup, followed by an SVG with no text alternative which is also not hidden from AT; and
- Create an accessible nav menu, followed by an SVG with no text alternative which is also not hidden from AT.

Folks in the A11y Slack community promptly gave it a run. They identified terrible image alternative text suggestions, incorrect use of ARIA for navigation controls, `<span>`s with `button` roles (with no event handlers), `aria-label` suggestions for fields that already have a label, using the `title` attribute to provide instructions, and more. Each of those scenarios was a WCAG violation, meaning this tool would *introduce* failures.

I finally wandered over and requested a navigation menu ([**ugh**](https://adrianroselli.com/2023/05/be-careful-using-menu.html)
<!-- TODO: /adrianroselli.com/be-careful-using-menu.md -->). It asked me to provide code for it to evaluate, so I pasted UserWay’s own navigation code. It did nothing.

I re-prompted it, it asked me what I wanted, I explained it never answered me, so it offered to get back to me. And never did. As the following video shows.

 Sorry, your browser doesn’t support embedded videos, but don’t worry, you can [download it](https://adrianroselli.com/wp-content/uploads/2021/09/UserWay-AI-tool_test.mp4). 

My own effort to get a response from UserWay’s fake AI.

Coming out of this heavily promoted effort (press releases, LinkedIn posts, Product Hunt listing, etc.) we know that the page itself has WCAG violations. *And* the output which UserWay promises will conform with WCAG 2.1 AA introduces WCAG failures instead. Which leads me to a ask…

Is the output simply licensed content from ChatGPT / similar, or is the output from a LLM trained specifically on the remediation code that UserWay applies for its overlay or consulting?

If the former, UserWay was hoodwinked by the vendor and lacks either the rigor or skill to know it. If the latter, which its opening message implies, then this confirms UserWay does not possess the necessary skill to conform to WCAG.

UserWay’s COO was monitoring the Slack channel, and even private messaged one person to explain why the code blocks have `aria-hidden="true"` (to minimize announcement for blind users, who clearly are never developers). He did not address my question, which I asked in the channel and someone tagged him specifically. Clearly [not interested in a dialog with developers](https://twitter.com/UserWayOrg/status/1667238112282419218) after all.

If this multiply-WCAG-failing effort is really what passes for AI trained on accessibility, then my post [**No, ‘AI’ Will Not Fix Accessibility**](https://adrianroselli.com/2023/06/no-ai-will-not-fix-accessibility.html)
<!-- TODO: /adrianroselli.com/no-ai-will-not-fix-accessibility.md --> is again proven accurate.

*Added 8 July 2023*. Here is UserWay’s output when asked for a text entry field for a numeric 6-digit 2-factor authentication page (this within a code block with `aria-hidden="true"`):

```
<label for="otp">Enter the OTP:</label>
<input type="text" id="otp" pattern="[0-9]*" inputmode="numeric" maxlength="6" aria-label="OTP" required>
```

Or asking for a password field with some standard requirements:

> The title attribute provides a description of the password requirements for screen readers.

Or when fed this obviously nonsensical code:

```
<div role="button" aria-pressed="false" aria-selected="true" type="submit" aria-label="Get started" title="Get started" href="/sign-up">
  <span aria-hidden="true">Get started</span>
</div>
```

UserWay returned this:

```
<a role="button" aria-pressed="false" aria-selected="true" aria-label="Get started" title="Get started" href="/sign-up">
  Get started
</a>
```

UserWay provided justification for it thusly:

> Explanation:
> 
> - Replaced the `<div>` element with an `<a>` element, as it seems to be functioning as a button with a link.
> - Added the `role` attribute with the value “button” to indicate that it is a button element.
> - Added the `aria—pressed` attribute with the value “false” to indicate the button status as not pressed.
> - Added the `aria—selected` attribute with the value “true” to indicate that the button is selected.
> - Added the `aria-label`attribute with the value “Get started” to provide a descriptive label for the button.
> - Added the `title` attribute with the value “Get started” to provide a tooltip text for the button.
> - Changed the `<span>` element to a text directly inside the anchor element to improve semantic structure and accessibility. The `aria-hidden` attribute is not necessary in this case.
> 
> UserWay’s FixMyCode

There is a lot wrong with this. Besides asserting it added all the attributes that were already there, I mean. It has no sense of the context of this code. It does not know if the control should be a link or a button. It misunderstands the ARIA attributes it keeps (or assigns, if you believe its lie). It doesn’t even know what it means to improve semantic structure.

To reiterate, if you follow this tool’s advice, you almost undoubtedly introduce WCAG violations (at the very least).

---

## UserWay Claims Credit for WCAG 2.2: 8 October 2023

Over in the walled garden that is the A11y Slack, UserWay’s COO posted:

> Web Content Accessibility Guidelines (WCAG) 2.2 is now a W3C Recommendation!
> 
> UserWay is proud to have contributed to this important publication. It includes criteria long fought for and hard won by activists promoting the needs of people with cognitive and learning disabilities. Congratulations to everyone in Accessibility Guidelines Working Group and the Web Accessibility Initiative!
> 
> Lionel Wolberger, [5 October 2023, 9:06 AM](https://web-a11y.slack.com/archives/C042TSFGN/p1696511203661359)

When Karl Groves notes that UserWay is not listed as a contributor, nobody from UserWay is in the Working Group, UserWay was not a Working Group member during WCAG 2.2, nor was it listed as a prior Working Group member, UserWay’s COO responds:

> @Karl Groves since you ask, one direct contribution was an edit we promoted via a GitHub issue that was accepted; part of our general advocacy for more consistently addressing conformance testing of dynamic web pages. See 5.4.
> 
> Lionel Wolberger, [5 October 2023, 6:13 PM](https://web-a11y.slack.com/archives/C042TSFGN/p1696544002144839?thread_ts=1696531301.315179&cid=C042TSFGN)

UserWay’s COO filed issue [<VPIcon icon="iconfont icon-w3c"/>2305: Is ‘sometimes’ accurate? (<VPIcon icon="iconfont icon-github"/>`w3c/wcag`)](https://github.com/w3c/wcag/issues/2305). This question was related to section [<VPIcon icon="iconfont icon-w3c"/>5.4 Statement of Partial Conformance – Third Party Content](https://w3.org/TR/WCAG22/#conformance-partial) (which was [closed via this PR (<VPIcon icon="iconfont icon-github"/>`w3c/wcag`)](https://github.com/w3c/wcag/pull/2658/files)). Note that this has nothing to do with helping outcomes for users. This is about how UserWay can assert something passes WCAG in its own reporting.

With that baseline in place, Adrian Roselli LLC is also proud to have contributed to this important publication!

---

## Level Access Buys UserWay: 31 December 2023

[Level Access is acquiring UserWay](https://levelaccess.com/news/level-access-agrees-to-acquire-userway/) for [$98.7 million USD](https://businesswire.com/news/home/20231230607997/en/UserWay-Agrees-to-be-Acquired-by-Digital-Accessibility-Leader-Level-Access). As of this writing, the deal is not done.

On its surface this may be confusing given Level Access (or members of its team) have been critical of overlays in the past. But when looking at this from a business perspective, UserWay offers something Level Access wants — a predictable, repeatable revenue stream. Access to UserWay clients for upselling services is part of that, of course.

Any arguments beyond that are likely rubbish. Sure, it’s easy to claim that Level Access is doing *A Good Thing™* for users, for the accessibility industry, and for outcomes, by taking an overlay vendor and bringing it into the fold of legacy agencies. Level Access’s founder and CEO makes that argument in [My Perspective: Digital Accessibility and Overlays](https://linkedin.com/pulse/my-perspective-digital-accessibility-overlays-timothy-springer-bhx2c).

I want to break that argument down a bit.

### Marketing

He asserts everyone’s issues with overlays are fundamentally two things: marketing and technology. His argument is that Level Access will fix the marketing concern because it believe[s] in accurate, transparent communication (it was in bold, so it must be true). That’s it, that’s the entirety of his evidence (there are more bold words, but they say the same thing).

I think the evidence suggests otherwise. UserWay’s CEO and founder will be joining as President of Level Access *and* still be the CEO of UserWay (which is not going away as a brand). The person who has enabled UserWay’s grandiose claims is not only retaining his position, he is being rewarded financially and with a leadership role in Level Access. Essentially, the fox has been released into the hen house with a high five (high paw, if I keep the metaphor).

### Technology

The technology is a more complex issue, though Level Access’s CEO is oversimplifying it. This very post already demonstrates how UserWay’s product cannot identify issues, cannot remediate issues, and introduces more issues itself. Level Access, on the other hand, has an [automated checker that performed better than most](/2023/01/comparing-manual-and-free-automated-wcag-reviews.html#Update01) of its peers and still only had an 11% hit rate.

But, he argues, Access today beats access tomorrow. I agree. But again, he oversimplifies it.

The oversimplification is because he does not acknowledge the extra burden put on users. Burden of downloading a third-party script (assuming it gets past ad blockers and corporate firewalls). Burden of users’ browsers processing this script (on historically under-powered machines). Burden of having their personal information slurped up (including disability status). Burden of learning a new interface for every site.

### My Opinion

As you pare away all the caveats (poor detection, poor remediation, new bugs introduced, slower experience, risk of blocking, etc.) and consider how many smaller businesses (a crux of his justification) will accept this from their vendors versus a sustainable and persistent solution, I think this is broadly worse for users. When you consider how this rewards and elevates a long history of misrepesentation, I think this is a terrible signal to the industry.

I hope I am wrong.

---

## Financial Times Calls out UserWay: 7 April 2024

Financial Times has just published [Blind internet users struggle with error-prone AI aids](https://ft.com/content/3c877c55-b698-43da-a222-8ae183f53078). While it incorrectly frames overlays as ‘AI’, that is partly a function of disingenuous marketing claims meant to cash in on the terms that both investers and customers are pouring money into. Regardless, I think the sub-head distills it very well:Unreliable software installed to comply with rules to help disabled people navigate online has prompted thousands of lawsuits.

The FT article notes global laws which require web sites are accessible to disabled users. Those laws prompted companies to look for quick fixes in the form of overlays (which we know are aggressively marketed with problematic guarantees).

> However, those businesses that rely on accessibility code assistants and “overlays” — software that transforms a website so that it can be understood by assistive technologies — appear to have exposed themselves to more liabilities as the tools still need improving.
> 
> [Blind internet users struggle with error-prone AI aids](https://ft.com/content/3c877c55-b698-43da-a222-8ae183f53078) at Financial Times, 7 April 2024

The article shows that accessiBe, AudioEye, EqualWeb, and UserWay each fail to remove testable errors, with accessiBe ranking worst. It even calls out AudioEye (second worst) has leaving one in seven sites with poor contrast.

It gives EqualWeb an opportunity to respond, where it unintentionally acknowledges how ineffective its overlay is:

> Anat Cohen, vice-president of business development at EqualWeb, said the issue on Zara’s website was not related to the accessibility technology but “stems from the website’s structural design”.
> 
> [Blind internet users struggle with error-prone AI aids](https://ft.com/content/3c877c55-b698-43da-a222-8ae183f53078) at Financial Times, 7 April 2024

It also gives UserWay an opportunity to respond:

> Level Access, an accessibility provider, has just bought UserWay, an overlay maker. Its founder and chief executive Timothy Springer has addressed some of the criticisms of UserWay’s technology and has promised accuracy and transparency in Level Access marketing.
> 
> [Blind internet users struggle with error-prone AI aids](https://ft.com/content/3c877c55-b698-43da-a222-8ae183f53078) at Financial Times, 7 April 2024

Note the promise is for *Level Access* marketing, but not UserWay marketing (which is retaining the UserWay brand and marketing efforts). Prior behavior suggests no positive changes forthcoming.

Again, the barest poking at claims and code show how accessibility overlays are broadly ineffective and primarily built on lies. Lies which have harmed, and continue to harm, users.

---

## Likely Astroturfing Continues: 17 April 2024

When Level Access acquired UserWay, the [Level Access CEO said](#LevelAccessBuysUserWayMarketing) it believe[s] in accurate, transparent communication when faced with criticism over the ongoing falsehoods from overlay companies in general (and UserWay in particular). [When Financial Times asked](#FT) about problematic marketing, the Level Access CEO only made promises about Level Access marketing, not UserWay.

I bring this up because it sure looks to me like UserWay and Level Access are astroturfing with what feels like a paid promotional article at Forbes.

As background, Forbes allows for this. Articles published at Forbes under the `/sites/` URL is ‘contributor’ content.

- [What the Forbes model of contributed content means for journalism](https://poynter.org/reporting-editing/2012/what-the-forbes-model-of-contributed-content-means-for-journalism/) at Poynter.
- [Forbes’ Most Viral Content, And Who’s Responsible For It (Including A Full List Of Contributors)](https://prnews.io/blog/80-Forbes-Most-Viral-Content-And-Whos-Responsible-For-It-Including-A-Full-List-Of-Contributors.html) at PR News.
- [How Being A Forbes Contributor Works](https://joshsteimle.com/writing/how-being-a-forbes-contributor-works.html) by Josh Steimle.
- [Forbes BrandVoice](https://forbes.com/connect/content-solutions/brandvoice/) from Forbes, where it outlines the program.

Consider that when reading this new Forbes ‘article’ (scare quotes!): [How Level Access Acquiring UserWay Transforms The Web Accessibility Market](https://web.archive.org/web/20240409112122/https://www.forbes.com/sites/gusalexiou/2024/04/09/how-level-access-acquiring-userway-transforms-the-web-accessibility-market/?sh=be764507ddfe)

Now consider:

- The claims UserWay’s overlay is ‘AI’ (it never was, & UserWay’s later LLM effort is still a gag),
- The effusive positive terms to describe UserWay and Level Access,
- It ignores heaps of (real) press critical of UserWay,
- Barring a link to COVID impacts, supporting links come from Level Access and one article by the author that quotes Level Access.
- The [author once said](https://forbes.com/sites/gusalexiou/2021/06/26/largest-us-blind-advocacy-group-bans-web-accessibility-overlay-giant-accessibe/?sh=409be5c25a15#:~:text=overlays%20are%20bit%2Dpart%20solutions%20capable%20of%20no%20more%20than%20automatically%20patching%20scattered%20elements%20of%20accessibility%20issues%20here%20and%20there.), overlays are bit-part solutions capable of no more than automatically patching scattered elements of accessibility issues here and there, but there is no indication from recent writings he has otherwise warmed to them,
- UserWay has a history of astroturfing (see W3C example above).

For these reasons I belive that Forbes article is paid content. A puff piece. More evidence that Level Access is being twisted to the same bad behavior that UserWay has relied on to build its business. Which is not surprising since it needs to get a return on that $98.7 million USD investment.

I’ll let you judge for yourself.

---

## Class Action: 14 January 2025

UserWay has been hit with its own class action suit. I did not post it when I first heard of it [a few months ago](https://dockets.justia.com/docket/delaware/dedce/1:2024cv00844/86407) because I could not get my hands on the filing. Then somebody shared [Userway faces class action lawsuit over alleged false accessibility and ADA compliance claims](https://techstartups.com/2024/12/23/userway-faces-class-action-lawsuit-over-alleged-false-accessibility-and-ada-compliance-claims/) in a forum yesterday and it contained a link to PDF of the filing — untagged, unfortunately.

> [Userway](https://userway.org/) is facing a class action lawsuit filed by Bloomsybox.com, LLC, accusing the company of making misleading claims about its accessibility widget. The lawsuit, [filed at Delaware District Court](https://unicourt.com/case/pc-db5-casegu038c95ff4269-1877743?init_S=c_relc), alleges that Userway promoted its product as a simple, foolproof solution for achieving ADA compliance but failed to deliver on its promises, leaving businesses vulnerable to legal action.
> 
> According to the [court documents](https://techstartups.com/wp-content/uploads/2024/12/DOC-20241219-WA0015.-1.pdf), Userway promoted its widget as an easy fix for making websites ADA-compliant and aligning with Web Content Accessibility Guidelines (WCAG). Businesses were assured that a single line of code would not only ensure compliance but also shield them from lawsuits, with the added promise of legal support if disputes arose.
> 
> [Userway faces class action lawsuit over alleged false accessibility and ADA compliance claims](https://techstartups.com/2024/12/23/userway-faces-class-action-lawsuit-over-alleged-false-accessibility-and-ada-compliance-claims/), TechStartups, 23 December 2024

I grabbed the [untagged complaint](https://adrianroselli.com/wp-content/uploads/2021/09/DOC-20241219-WA0015.-1.pdf) and embedded it here.

Remember, I am not a lawyer. I have no idea where this will go, but it’s good to see that, like [accessiBe’s class action](/2020/06/accessibe-will-get-you-sued.html#Sherwin), overlay customers who have been misled are fighting back.

### Class Action Update: 18 February 2026

More than a year later, and some activity. A magistrate judge has recommended against UserWay’s motion to dismiss and instead to let the case move forward. Lainey goes into more detail (with links to the recommendation) in an [<VPIcon icon="fas fa-globe"/>update to her post Another Web Access Overlay Company Sued by a Small Business](https://lflegal.com/2025/02/userway-overlay-lawsuit/#article-updates).

---

::: info Other Posts

[**Earlier post: Sentence Forms (not Mad Libs)**](https://adrianroselli.com/2021/08/sentence-forms-not-mad-libs.html)
<!-- TODO: /adrianroselli.com/sentence-forms-not-mad-libs.md -->

[**More recent post: Beware False Negatives**](https://adrianroselli.com/2021/09/beware-false-negatives.html)
<!-- TODO: /adrianroselli.com/beware-false-negatives.md -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "#UserWay Will Get You Sued",
  "desc": "Disclaimer: This post and the headline is my opinion. I provide verifiable facts throughout to inform that opinion. I say this because French overlay vendor FACIL’iti has filed at least two frivolous lawsuits, and given overlay vendors tend to follow the same business practices, it is reasonable to assume UserWay…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/userway-will-get-you-sued.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
