---
lang: en-US
title: "Typefaces for Dyslexia"
description: "Article(s) > Typefaces for Dyslexia"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - adrianroselli.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Typefaces for Dyslexia"
    - property: og:description
      content: "Typefaces for Dyslexia"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/adrianroselli.com/typefaces-for-dyslexia.html
prev: /programming/css/articles/README.md
date: 2015-03-15
isOriginal: false
author:
  - name: https://adrianroselli.com
    url: https://adrianroselli.com/contact
cover: https://adrianroselli.com/wp-content/uploads/2015/03/OpenDyslexic-300x115.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Typefaces for Dyslexia"
  desc="Both typefaces claim that heavier strokes on the bottom prevent dyslexic readers from flipping the letters when viewing them. The original caption: A heavier bottom is used to show which way is supposed to be down. I’ve been writing this post in fits, so it may be a bit disjointed.…"
  url="https://adrianroselli.com/2015/03/typefaces-for-dyslexia.html"
  logo="https://adrianroselli.com/wp-content/themes/AAR/favicon.png"
  preview="https://adrianroselli.com/wp-content/uploads/2015/03/OpenDyslexic-300x115.png"/>

![Both typefaces claim that heavier strokes on the bottom prevent dyslexic readers from flipping the letters when viewing them. The original caption: A heavier bottom is used to show which way is supposed to be down.](https://adrianroselli.com/wp-content/uploads/2015/03/OpenDyslexic.png)

I’ve been writing this post in fits, so it may be a bit disjointed. I started it on my flight home from CSUN, and continued to work on it on subsequent flights. Apologies if it’s a bit chaotic.

::: note TL;DR

Typefaces designed to help dyslexics have no effect.

:::

I’ll list information about the two typefaces that I am aware of (which are designed explicitly for readers with dyslexia), as well as notes from the talk at CSUN and a couple other examples.

---

## Typefaces

I am aware of two typefaces that are designed with dyslexic readers in mind.

### OpenDyslexic

[<VPIcon icon="fas fa-globe"/>Open Dyslexic](http://opendyslexic.org/) is an open source typeface for readers with dyslexia. The rationale behind the design:

::: info From OpenDyslexic (<VPIcon icon="fas fa-globe"/><code>opendyslexic.org</code>)

> OpenDyslexic is created to help with some of the symptoms of dyslexia. Letters have heavy weighted bottoms to indicate direction. You are able to quickly figure out which part of the letter is down which aids in recognizing the correct letter, and sometimes helps to keep your brain from rotating them around. Consistently weighted bottoms can also help reinforce the line of text. The unique shapes of each letter can help prevent confusion through flipping and swapping.

<SiteInfo
  name="OpenDyslexic"
  desc="OpenDyslexic is a typeface designed against some common symptoms of dyslexia."
  url="https://opendyslexic.org/about.html"
  logo="https://opendyslexic.org/favicon.ico"
  preview="https://opendyslexic.org/assets/img/banfff.jpg"/>

:::

### Dyslexie

[<VPIcon icon="fas fa-globe"/>Dyslexie](https://dyslexiefont.com/en/) is a paid typeface (free for home use). The site [<VPIcon icon="fas fa-globe"/>references research](https://dyslexiefont.com/en/dyslexia-font/research/) that supports the following claim:

::: info From (<VPIcon icon="fas fa-globe"/><code>dyslexiefont.com</code>)

> Representative research among many dyslectics has shown that the font Dyslexie actually helps them with reading texts faster and with fewer errors.
> 
> ~~Dyslexie [Research](https://dyslexiefont.com/en/dyslexia-font/research/) page~~

:::

- [<VPIcon icon="fas fa-globe"/>2010 Universiteit of Twente](https://web.archive.org/web/20150322144805/https://ilo.gw.utwente.nl/ilo/index.php?option=com_content&view=article&id=32:master-thesisleeuw&catid=9:theses&Itemi)
- [<VPIcon icon="fas fa-globe"/>2012 Survey research on elemetary schools and home users](https://dyslexiefont.com/download/files/DyslexieRegularResearch2012.pdf)
- [<VPIcon icon="fas fa-globe"/>2013 Universiteit of Amsterdam](https://dyslexiefont.com/download/files/LvanSomeren_UvA.pdf)
- [<VPIcon icon="fas fa-globe"/>2013 Universiteit of Twente](https://web.archive.org/web/20150322130959/http://essay.utwente.nl/63321/1/Pijpker,_C._-_s1112430_(verslag).pdf)

I would like to note that copying that text directly from the browser wasn’t easy. The use of Cufon to embed the typeface drops each word into its own element that itself hides and replaces the raw text in a `canvas` element. I’m sure you can imagine how much that offends me.

The following video explains the idea behind the typeface:

<VidStack src="vimeo/85075132" />

---

## Study: *Can a font improve reading?*

The latest study to suggest that typefaces designed to aid reading for dyslexics had little to no effect was presented at CSUN this past week. As I noted on Twitter, I already had an idea what the results would be, and I came away feeling validated.

The study hasn’t been pubished yet and I saw its first general presentation. The study was conducted at Mount Allison University, a 2,500 student college with 215 full-time students with disabilities. 50% of those students are classified as having a learning disability.

The questions asked by the study:

> - Do the style of the letters on a page mean that you read faster and make fewer errors?
> - Do persons with LD [learning disabilities] using this font read faster and make fewer errors?
> 
> Anne Comfort, Matt Kalichuk, Harry Wenban and Dr. Louise Wasylkiw

The typefaces (Open Dyslexic and Dyslexie) make claims about their benefits, aggregated in the presentation as:

> - Students with surface dyslexia experience letters flipping and moving around; Letters needed to be bottom heavy to prevent them from moving around
> - New font would increase reading speed
> - Will also increase accuracy (fewer errors)
> - Will decrease reading stress
> - Widely promoted to on-line uses and in word processing (Instapaper, iPad, an app)
> - Strong anecdotal feedback
> 
> Anne Comfort, Matt Kalichuk, Harry Wenban and Dr. Louise Wasylkiw

The presenter outlined some literature references, the procedure the team followed to perform the study, the nature of the participants (and control group), and the overall results.

The first bullet in the summary wraps it up nicely:

> - The font does NOT improve reading speed or accuracy for students with LD.
> 
> Anne Comfort, Matt Kalichuk, Harry Wenban and Dr. Louise Wasylkiw

An interesting note from the study was that half of each group (50% of control, 57% of LD group) said they would consider using the font and were then shown how to access it (download and install it, which I assume was Open Dyslexic). In a follow-up, none of those participants were using the font.

Another interesting point was that 40% of the control group and 48% of the LD group thought they performed better when using Open Dyslexic, though that was not the case.

As anyone who’s done user testing knows, it’s not uncommon for users to report one thing while doing or thinking another, so I consider this to be anecdotal reinforcement that the typeface had no benefit for users.

---

## Study: *Good Fonts for Dyslexia: An Experimental Study*

In late 2013 I found a write-up on a Spanish study that reviewed which fonts were easiest for readers with dyslexia. The post summarizes the study:

::: info "Good Fonts for Dyslexia – An Experimental Study" From *Dyslexia the Gift Blog* (<VPIcon icon="fas fa-globe"/><code>blog.dyslexia.com</code>)
> Based on the evaluation of 48 dyslexic subjects ages 11-50, reading 12 texts with 12 different fonts, they determined that reading performance was best with sans serif, monospaced, and roman fonts used in the study. They also found that reading was significantly impaired when italic fonts were used.
> 
> […]
> 
> Use of the OpenDyslexic font did not enhance text readability or reading speed. The study participants strongly preferred Verdana or Helvetica over the OpenDyslexic alternative.

<SiteInfo
  name="Good Fonts for Dyslexia - An Experimental Study"
  desc="Updated: Research does not support claims that use of a specially designed custom font for dyslexia leads to improved reading performance."
  url="https://blog.dyslexia.com/good-fonts-for-dyslexia-an-experimental-study//"
  logo="https://blog.dyslexia.com/wp-content/uploads/2017/08/cropped-ddai-site-icon-5-192x192.png"
  preview="https://blog.dyslexia.com/wp-content/uploads/2019/04/letters.jpg"/>

:::

You can find the full text of the study in a [<VPIcon icon="fas fa-globe"/>PDF file on the site for the Natural Language Processing group](https://web.archive.org/web/20160311213326/https://taln.upf.edu/system/files/biblio_files/assets2013.pdf) of the Department of Information and Communication Technologies at Pompeu Fabra University.

---

## General Tips

For those of us who build applications and sites with content of any length (whether instructions for shopping carts or rant-laden long-form articles), I have found a few techniques are generally agreed upon by the community (feedback is welcome!):

- Avoid justified text.
- Use generous line spacing / leading.
- Use generous letter spacing.
- Avoid italics.
- Generally use sans serif faces.
- Use larger text.
- Use good contrast.
- Use clear, concise writing.

This generally follows rules for good typography.

You may have heard that Comic Sans is easier for readers with dyslexia to understand, but so far that evidence appears to be anecdotal. Certainly not enough to warrant punishing all your other users.

If you read an article that suggests users with dyslexia see letters flip or rotate, then be wary. Not only was this assertion challenged by participants in the study reported at CSUN, but generally the participant reaction was anger. The flipping/rotating may be a myth perpetuated by those without dyslexia in an effort to make sense of its effects.

:::: details Update(s)

**2015-03-26**

In a post from 2011 ([<VPIcon icon="fas fa-globe"/>Dyslexia, Fonts & Open Source](https://web.archive.org/web/20150331110651/http://openconcept.ca/blog/mgifford/dyslexia-fonts-open-source)), Mike Gifford outlines some of the issues related to supporting readers with dyslexia, including typefaces.

**2015-04-17**

Neil Milliken notes that, as someone with dyslexia, [<VPIcon icon="fas fa-globe"/>he finds the custom dyslexic typefaces unhelpful](https://atrophiedmind.wordpress.com/2015/04/16/on-fonts-and-dyslexia/) and unattractive.

**2015-06-05**:

Chuck Bigelow, creator of the Lucida Family, wrote the following back in November:

> In preparing a literature review on dyslexia and typography for a major font vendor, I surveyed more than fifty scientific papers and books about dyslexia, paying special attention to those with typographic relevance. In the scientific literature, I found no evidence that special dyslexia fonts confer statistically significant improvements in reading speed compared to standard, run-of-the-mill fonts.
> 
> ~~[Typography & Dyslexia](http://bigelowandholmes.typepad.com/bigelow-holmes/2014/11/typography-dyslexia.html)~~

Some readers disagree with his assertions [<VPIcon icon="fas fa-globe"/>in comments on a Fast Company post](https://web.archive.org/web/20150703163909/https://fastcodesign.com/3038596/fast-feed/a-typeface-for-dyslexics-dont-buy-into-the-hype#comments) covering his original post.

**2015-06-10**

There are users who get benefits from the typefaces. As expected, different people will have different results. [Seren D (<VPIcon icon="fa-brands fa-x-twitter"/>`ninjanails`)](https://x.com/ninjanails) (who also tells us of [<VPIcon icon="fas fa-globe"/>problems in icon fonts](https://speakerdeck.com/ninjanails/death-to-icon-fonts)) explains:

::: info From Seren D (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com</code>)

> [@aardrian (<VPIcon icon="fa-brands fa-x-twitter"/>`aardrian`)](https://x.com/aardrian) I find it really helpful. I find everything flows nicers and I can tell what each letter is and don't loose track of where I am

:::

**2016-12-06**

Today A List Apart posted a new article, [**Accessibility Whack-A-Mole**](/alistapart.com/accessibility-whack-a-mole.md), that discusses a process of tweaking an existing typeface and testing it with users. It includes many tips not just for letterform adjustments, but also for layout and flow.

**2017-02-28**

There is a post circulating with the unfortunate title [<VPIcon icon="fas fa-globe"/>Hating Comic Sans Is Ableist](https://theestablishment.co/hating-comic-sans-is-ableist-bc4a4de87093). The thrust of the article is that the author’s sister, who has dyslexia, discovered her reading comprehension improved greatly when she used Comic Sans. From there the author accuses everyone who dislikes Comic Sans of lacking empathy and being ableist.

Comic Sans *is* ugly (to me, and quite a lot of people), as are all the other typefaces designed specifically for dyslexia. That dislike is not ableist. Making fun of someone who uses it for reading comprehension would be ableist. Embedding images in an article on a platform that does not support alternative text without providing a plain text description is ableist. Just for context, that is.

**2017-03-05**

At this year’s CSUN conference Gareth Ford Williams presented [<VPIcon icon="fas fa-globe"/>What Makes One Font More Accessible than Another?](https://web.archive.org/web/20170218044229/https://csun.edu/cod/conference/2017/sessions/index.php/public/presentations/view/196) (that links just to the abstract, no slides are online yet). To distill the gist of his talk, he confirmed that no single typeface works for all users, though there are some common traits that help many. Traits such as letter shape, bowl size, similarities between mirrored letters, and so on. He also confirmed that pre-existing familiarity with a typeface matters. Finally, good typographic practices are a huge factor.

**2017-09-05**

In the post [<VPIcon icon="fas fa-globe"/>Fonts don’t matter](https://axesslab.com/fonts-dont-matter/), not much effort is given to arguing *why* fonts don’t matter. Instead the post addresses what you can do in your layout that is more important for readability than choosing a typeface. You could basically skip the *General Tips* section above and read that post instead.

**2017-10-07**

There is another typeface that has been around for a bit that I had no idea existed. I can only hope it is never being forced on users in lieu of good typography.

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>accessiblestef</code>)

> Dyslexic friendly font [<VPIcon icon="iconfont icon-github"/>`Orange-OpenSource/font-accessible-dfa`](https://github.com/Orange-OpenSource/font-accessible-dfa) [`#opensource`](https://x.com/hashtag/opensource?src=hash&ref_src=twsrc%5Etfw) [`#accessibility`](https://x.com/hashtag/accessibility?src=hash&ref_src=twsrc%5Etfw) [`#parisweb`](https://x.com/hashtag/parisweb?src=hash&ref_src=twsrc%5Etfw)
> 
> Stéphane Deschamps (@accessiblestef) ~~[October 6, 2017](https://twitter.com/accessiblestef/status/916225165591236609?ref_src=twsrc%5Etfw)~~

:::

**2017-10-12**

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>netmag</code>)
> Accessible type selection is more important than ever. Here's how to master it. [<VPIcon icon="fas fa-globe"/>creativebloq.com/…accessible-web-typography](https://creativebloq.com/features/master-accessible-web-typography)
> 
> net magazine (@netmag) ~~[October 12, 2017](https://x.com/netmag/status/918434169654476803?ref_src=twsrc%5Etfw)~~

:::

::: info From X (<VPIcon icon="fa-brands fa-x-twitter"/><code>aardrian</code>)

> This over-complicates, pitches: ~~[twitter.com/netmag/…](https://x.com/netmag/status/918434169654476803)  ~~
> \*sigh\* Do not use an illegible typeface, then good typesetting is more important.
> 
> Adrian Roselli (@aardrian) ~~[October 12, 2017](https://x.com/aardrian/status/918555842684903429)~~

:::

**2020-August 14**

Gareth Ford Williams has written a great overview about how to choose typefaces that I highly recommend you read before you even consider a dyslexia-specific typeface: [A Guide to Understanding What Makes a Typeface Accessible, and How to Make Informed Decisions. (<VPIcon icon="fa-brands fa-medium"/>`@garethfordwilliams`)](https://medium.com/@garethfordwilliams/a-guide-to-understanding-what-makes-a-typeface-accessible-and-how-to-make-informed-decisions-9e5c0b9040a0) (the period is in the title, so don’t at-me)

He includes links to academic papers, typography resources, books, literacy reports, and so on. Those who know me well also know that I rail against anything about accessibility that is posted to Medium, but the information is solid and he has taken care to use good alt text.

**2020-August 19**

Over at The Cut is a brief article with an unfortunate title: [The Reason Comic Sans Is a Public Good](https://thecut.com/2020/08/the-reason-comic-sans-is-a-public-good.html).

From the assertion in the title it spends half the article (two paragraphs) repeating a 2017 post claiming disliking Comic Sans is ableist (see my [February 2017 update](#Update5) above on why that is absurd). As supporting evidence in the final paragraph we get:

> To wit, Comic Sans is recommended by the [British Dyslexia Association](https://web.archive.org/web/20200814231501/https://bdatech.org/what-technology/typefaces-for-dyslexia/) and the [Dyslexia Association of Ireland](https://web.archive.org/web/20150609035734/https://dyslexia.ie/information/computers-and-technology/making-information-accessible-dyslexia-friendly-style-guide/). An American Institute of Graphic Arts [post](https://eyeondesign.aiga.org/sad-but-true-comic-sans-might-just-be-the-best-font-for-dyslexics/) from last summer said that it might be the best font for dyslexics […]
> 
> Drake Baer, [The Reason Comic Sans Is a Public Good](https://thecut.com/2020/08/the-reason-comic-sans-is-a-public-good.html)

Except that entire paragraph is bunk.

- The linked British Dyslexia Association page *does not* recommend it. The page mentions studies, acknowledges none specifically looked at typefaces, and even mentioned a survey of its users (few responded).
- The Dyslexia Association of Ireland site is down for maintenance (was it down when the article was written?), but the [most recent version](https://web.archive.org/web/20200613093243/https://www.dyslexia.ie/information/computers-and-technology/making-information-accessible-dyslexia-friendly-style-guide/) in the Wayback lists the fonts Arial, Comic Sans, Verdana, and Sassoon as options, while providing 30 more practical tips around layout, structure, and content.
- The 2016 AIGA post (which is structured as an interview with an unnamed interviewee) doesn’t even mention Comic Sans until the last paragraph as a throwaway reference (with no link) to a [passing anecdotal mention](https://dyslexic.com/blog/quick-guide-making-content-accessible/) at Dyslexic.com.

And that is the entirety of the evidence supporting Comic Sans. Go read Gareth’s post instead: [A Guide to Understanding What Makes a Typeface Accessible, and How to Make Informed Decisions. (<VPIcon icon="fa-brands fa-medium"/>`@garethfordwilliams`)](https://medium.com/@garethfordwilliams/a-guide-to-understanding-what-makes-a-typeface-accessible-and-how-to-make-informed-decisions-9e5c0b9040a0)

**2021-January 22**

Another round-up of research confirms Comic Sans is not a boon:

> So there is agreement, of a sort, between the typographers and the dyslexia researchers: spacing, not letter shape, is key. However, all the researchers in this area stress more research is needed.
> 
> […]
> 
> The big question of this article, then, has a clear answer: Comic Sans use should not be justified by claims of increased readability or benefits to dyslexic students or indeed for handwriting, but if you just like it, and your pupils like it, there is no good reason you should not use it. Or not use most other fonts for that matter. Font choice, it seems, is the least of your worries.
> 
> [Does Comic Sans really help dyslexic learners?](https://web.archive.org/web/20210304221420/https://www.tes.com/news/does-comic-sans-really-help-dyslexic-learners)

As usual, a single technology (a typeface) is not a quick fix for such a broad need. People need to do the work (of typesetting in this case) to really help other people.

**2021-December 15**

A well-intentioned article at Smashing Magazine has put forth some suggestions for supporting readers with dyslexia: [Adding A Dyslexia-Friendly Mode To A Website](https://smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/).

It makes some suggestions that seem to only be backed up by anecdata, small sample sizes, or assumptions. It uses WCAG to justify some of its arguments. It also suggests a “dyslexia-friendly mode”. Finally, it echoes a preference for Comic Sans without backing it up in any way. In short, it may end up perpetuating myths instead of getting people to think critically about supporting users.

Gareth Ford Williams left an [extensive 13 point comment](https://smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/#comment-1639487470370540657) (Smashing’s comment system combined 4 of them) addressing many of the assertions raised in the post. ~Sadly, because Smashing’s comments are both collapsed by default and have no unique IDs, it is impossible to link directly to it by anchor or text fragment (yes, [I pinged Smashing about this](https://twitter.com/aardrian/status/1471174070364430336)). So [go to the comment section](https://smashingmagazine.com/2021/11/dyslexia-friendly-mode-website/#comments-dyslexia-friendly-mode-website), activate the “Load all…” button, and scroll down to Gareth’s comment dated December 14, 2021 (there is another earlier comment by a different Gareth).~ [Smashing Magazine recently updated its commenting system](https://twitter.com/smashingmag/status/1472830334786064386) to allow direct links to comments.

Gareth also wrote a post on LinkedIn, [Dyslexic Myths Presented as Truths](https://linkedin.com/pulse/dyslexic-myths-presented-truths-gareth-ford-williams). Sadly, since it is LinkedIn, if you want to see all the comments on Gareth’s post you need to have an account and be logged in. And if you find LinkedIn’s WCAG-failing non-underlined links impossible to identify, you can run my [underline bookmarklet](/2015/01/css-bookmarklets-for-testing-and-fixing.html#underlines).

**2023-May 2**

![DysTtitles sample showing numbers, punctuation, and full alphabet in upper and lower-case letters.](https://adrianroselli.com/wp-content/uploads/2015/03/dystitles-sample.jpg) Ads of the World profiled a new typeface designed for use in video captions to benefit dyslexic viewers:

> CANAL+, working closely with ad agency BETC Paris and NGO Puissance Dys (created in 1992 by Beatrice Sauvegeot and Dr. Jean Metellus with the ambition of helping dyslexic people) has come up with a solution for all these people – 8 to 12% of the world’s population – and is introducing DYSTITLES: subtitles adapted for reading for dyslexic and non-dyslexic people.
> 
> Beatrice Sauveagot, speech therapist and neuropsychologist, President of Puissance Dys, has spent the last ten years developing a font adapted for dyslexic people. Based on this initial research, BETC and Puissance Dys created a new font that can be read by everyone. Specifically created for reading subtitles, the unique design of these characters play with depth and forms to allow dyslexic people to read without having to decipher words letter by letter and is totally readable by non-dyslexic people after a small adaptation time.
> 
> [Dystitles](https://adsoftheworld.com/campaigns/dystitles)

An advertising industry site is not likely to provide links to the supporting research or material. While the French video on the page discusses the letterforms, without closed captions or subtitles (yes, irony) I have no idea if it is citing any particular research.

I went to the web site for [Puissance Dys](https://puissancedys.org/) to see if I could dig up some research. I found testimonials, press, a dyslexia diagnosis app, internship info, and a link to [its overall venture](https://puissancedys.com/). I found no research, though it may be a function of me not speaking French and auto translation leading me astray.

While some folks may find the typeface (used in subtitles or elsewhere) helpful, its creator asserting it can be read by everyone […] after a small adaptation time is a bold statement that warrants justification. I was unable to find any.

The home page offers a feature to swap the text on the page into the custom typeface. What follows is a comparison. I leave it to you to decide if the typeface is helpful and/or how long you feel it might take to adapt.

[![Puissance Dys home page.](https://adrianroselli.com/wp-content/uploads/2015/03/PuissanceDys-home_original.png)](https://adrianroselli.com/wp-content/uploads/2015/03/PuissanceDys-home_original.png) [![Puissance Dys home page with the text showing using the Puissance Dys custom typeface.](https://adrianroselli.com/wp-content/uploads/2015/03/PuissanceDys-home_swapped.png)](https://adrianroselli.com/wp-content/uploads/2015/03/PuissanceDys-home_swapped.png)

Content on the PuissanceDys.org home page before and after swapping the typeface. Bear in mind this page went through automated translation from French to English.

If LinkedIn is your bag, [Gareth Ford Williams has shared his opinion](https://linkedin.com/feed/update/urn:li:activity:7059187980745199617/).

**2025-October 21**

I keep forgetting to link this one from nine years ago:

> Given the press and popular support of using a specialized font as a remedy for dyslexia, it is critical to highlight that results from this study failed to identify any positive effect for using it. Currently, there is no documentation to support a specialized font is an evidence-based practice.
> 
> [The effect of a specialized dyslexia font, OpenDyslexic, on reading rate and accuracy](https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233/), Jessica J Wery and Jennifer A Diliberto, *Annals of Dyslexia*, 18 March 2016, issue date 2017

Oh, and also this one:

> Results showed that low-progress readers performed better (i.e., read 7% more words per minute) in Dyslexie font than in standardly spaced Arial font. However, when within-word spacing and between-word spacing of Arial font was matched to that of Dyslexie font, the difference in reading speed was no longer significant. We concluded that the efficacy of Dyslexie font is not because of its specially designed letter shapes, but because of its particular spacing settings.
> 
> [A Special Font for People with Dyslexia: Does it Work and, if so, why?](https://pubmed.ncbi.nlm.nih.gov/27194598/), Eva Marinus , Michelle Mostard, Eliane Segers, Teresa M Schubert, Alison Madelaine, and Kevin Wheldall, *Dyslexia*, 19 May 2016

These were a year after I wrote this post and so far I’ve seen nothing refute these kinds of study results. Then ongoing lesson seems clear — start with better typography and *then* look at typeface changes.

**2026-April 15**

One I missed from April 2024, updated at the very end of 2025, is [Dyslexia friendly fonts: Are they any good?](https://pimpmytype.com/dyslexia-fonts/) over at Pimp my Type. It links to some studies and gives some aesthetic notes as well. Plus this overview:

> TL;DR: So-called dyslexia friendly fonts perform worse than other typefaces, while conveying an either broken or playful aesthetic that might not fit to your project. As a rule of thumb, prefer more common typefaces with a looser spacing, open shapes, and distinct letters.
> 
> [Dyslexia friendly fonts: Are they any good?](https://pimpmytype.com/dyslexia-fonts/)

I appreciate the article points out that studies relying on comparisons to Arial are not terribly compelling.

It also links to:

<VidStack src="youtube/h8IOqUl1zII" />

- [Dyslexie font does not benefit reading in children with or without dyslexia](https://pmc.ncbi.nlm.nih.gov/articles/PMC5934461/) from 2017.
- [The effect of a specialized dyslexia font, OpenDyslexic, on reading rate and accuracy](https://link.springer.com/content/pdf/10.1007/s11881-016-0127-1.pdf) from 2016.
- [The effect of inter-letter spacing on reading performance and eye movements in typically reading and dyslexic children](https://sciencedirect.com/science/article/pii/S0959475221001353) from 2018.

::::

::: info Other Posts

[**Earlier post: Booster Conference Slides: Making Your Site Printable**](/adrianroselli.com/booster-conference-slides-making-your.md≈)

[**More recent post: ACE! Conference Slides: Selfish Accessibility**](/adrianroselli.com/ace-conference-slides-selfish.md≈)

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Typefaces for Dyslexia",
  "desc": "Both typefaces claim that heavier strokes on the bottom prevent dyslexic readers from flipping the letters when viewing them. The original caption: A heavier bottom is used to show which way is supposed to be down. I’ve been writing this post in fits, so it may be a bit disjointed.…",
  "link": "https://chanhi2000.github.io/bookshelf/adrianroselli.com/typefaces-for-dyslexia.html",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```
