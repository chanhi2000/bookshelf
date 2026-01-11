---
lang: en-US
title: "Postcard From Web Directions Dev Summit, 2025"
description: "Article(s) > Postcard From Web Directions Dev Summit, 2025"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Postcard From Web Directions Dev Summit, 2025"
    - property: og:description
      content: "Postcard From Web Directions Dev Summit, 2025"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/postcard-from-web-directions-dev-summit-2025.html
prev: /programming/css/articles/README.md
date: 2026-01-12
isOriginal: false
author:
  - name: Lee Meyer
    url : https://css-tricks.com/author/leemeyer/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/lee-web-directions.jpg
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
  name="Postcard From Web Directions Dev Summit, 2025"
  desc="Lee Meyer recently spoke at Web Directions Summit 2025. This is his experience, not only speaking at the event, but experiencing the event through the lens of anxiety and imposter syndrome."
  url="https://css-tricks.com/postcard-from-web-directions-dev-summit-2025"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/lee-web-directions.jpg"/>

::: note Author’s Note

There are already [<VPIcon icon="fa-brands fa-wikipedia-w"/>wonderful recaps](https://web-goddess.org/archive/89076) of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Web Directions Developer Summit](https://webdirections.org/dev-summit/) I spoke at in November 2025. So, rather than offering another one, I decided to capture my experience at the conference in a [<VPIcon icon="fa-brands fa-wikipedia-w"/>stream-of-consciousness](https://en.wikipedia.org/wiki/Stream_of_consciousness) style that details my battles with [<VPIcon icon="fa-brands fa-wikipedia-w"/>stage fright](https://en.wikipedia.org/wiki/Stage_fright) and [<VPIcon icon="fas fa-globe"/>imposter syndrome](https://verywellmind.com/imposter-syndrome-and-social-anxiety-disorder-4156469). I haven’t seen this style used on a tech blog before, but CSS-Tricks has become my playground for experiments — not just with CSS, but with language itself — so let’s see where this experiment takes us.

---

## Arrival

When I was a kid, there used to be a Museum railway station in Melbourne, Australia. In 1995, it [<VPIcon icon="fa-brands fa-wikipedia-w"/>changed its name](https://facebook.com/JustGreatSongsGOLD/posts/1236506295147950/) to match the shopping center above it — a microcosm of how the mentality of my home city has shifted — but Sydney [<VPIcon icon="fa-brands fa-wikipedia-w"/>still has a Museum station](https://en.wikipedia.org/wiki/Museum_railway_station). The aesthetics of Sydney’s Museum Station evoke [<VPIcon icon="fa-brands fa-wikipedia-w"/>London Underground vibes](https://reddit.com/r/sydney/comments/8esycc/museum_station_simple_yet_elegant/) as my [<VPIcon icon="fa-brands fa-wikipedia-w"/>train from Sydney Airport](https://en.wikipedia.org/wiki/Airport_Link,_Sydney) stops under [<VPIcon icon="fa-brands fa-wikipedia-w"/>Hyde Park](https://en.wikipedia.org/wiki/Hyde_Park,_Sydney), the oldest public park in Australia and the first to be named after its more famous London counterpart.

Britain’s on my brain because I want this trip to resemble the *Harry Potter* stories: the wish-fulfillment narrative of discovering you have special powers and are chosen. In truth, the way I was selected to speak at the Web Directions Dev Summit this year wasn’t so spontaneous.

The organizer, [<VPIcon icon="fas fa-globe"/>John Allsopp](https://johnfallsopp.com/), recommended my article [**“How to Discover a CSS Trick”**](/css-tricks.com/how-to-discover-a-css-trick.md) on his [<VPIcon icon="fa-brands fa-linkedin"/>reading list](https://linkedin.com/pulse/your-weekend-reading-form-web-directions-john-allsopp-bt89c/) and connected with [me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin" />`meyerlee`)](https://linkedin.com/in/meyerlee/). I took the opportunity to pitch via direct message for a [<VPIcon icon="fas fa-globe"/>talk about scrolling](https://webdirections.org/dev-summit/speakers/lee-meyer.php) since the proposal form on the Web Directions website felt comparatively impersonal. But now, what feels impersonal and daunting is the parallel-universe version of a train station that doesn’t exist back home except in my memory. Stepping onto the platform like an eleventh-hour rehearsal for the stage, I feel less like the Harry Potter of CSS and more like I’ve signed up to be a novelty museum exhibit. Step right up and laugh at the middle-aged dude who writes bizarre articles featuring a fictional seller of [**haunted CSS tricks**](/css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md) who cursed him to overuse CSS for everything.

The spooky CSS shopkeeper is a figment of my imagination based on watching too many Simpsons reruns — but now I’ve manifested a real-life [<VPIcon icon="fa-brands fa-youtube"/>froghurt](https://youtu.be/CI1-74VQgUk?si=QWSvk-BTx3Vzrewt) situation: a free conference ticket and trip to Sydney in exchange for embarrassing myself in front of the largest audience I’ve ever spoken to.

I procrastinate preparation by sitting down for frozen yoghurt in the Sydney CBD. The froghurt is yummy, but cursed by the cloud of anxiety following me around on this sunny day. So I’ll procrastinate describing my own talk to you by first sharing a few of my favorites from others.

---

## Day One

I’ve arrived and the event kicks off.

### Welcome: John Allsopp

The moment John takes the stage, I’m struck by his showmanship in subverting assumptions about his enthusiasm for tech. He opens by saying he feels [<VPIcon icon="fas fa-globe"/>ennui](https://forum.wordreference.com/threads/ennui-vs-boredom.3793782/) with web development, yet hopes the lineup over the next two days might snap him out of his pessimism about the web’s future.

It’s the conference equivalent of the literary technique of a [<VPIcon icon="fa-brands fa-wikipedia-w"/>frame story](https://en.wikipedia.org/wiki/Frame_story): He positions himself as a weary sage who will reappear after each talk for Q&A — and yet, as someone who predates PCs, he has greyed like an unavailable option on a computer screen. He fears he has seen too much to feel optimistic about the future of the web he helped to build.

He says front-end development has reached a “local maximum,” borrowing a term from calculus to explain how the tools that got us here have flattened our rate of change. The productivity boost is offset by the ways our tools limit imagination. Our mental models make it easy to build the same websites again and again, keeping us out of touch with what modern browsers can do.

He cites the View Transitions API — available [<VPIcon icon="fa-brands fa-chrome"/>as a progressive enhancement since 2023](https://developer.chrome.com/blog/spa-view-transitions-land) — as an example of a native browser superpower that could [<VPIcon icon="fa-brands fa-react"/>subvert the SPA model](https://jonoalderson.com/conjecture/its-time-for-modern-css-to-kill-the-spa/), yet remains only [<VPIcon icon="fa-brands fa-react"/>experimentally supported in React](https://react.dev/reference/react/ViewTransition).

The dramatic context for the next two days is now set. The [<VPIcon icon="fas fa-globe"/>web sucks](https://goodreads.com/book/show/222376640-enshittification), but prove him wrong, kids.

### “The Browser Strikes Back: Rethinking the Modern Dev Stack” by Jono Alderson

“You’re gonna hate me,” says the keynote speaker [<VPIcon icon="fas fa-globe"/>Jono Alderson](http://jonoalderson.com) at the top of [<VPIcon icon="fas fa-globe"/>his talk on rethinking the modern dev stack](https://webdirections.org/dev-summit/speakers/jono-alderson.php).

He argues that frameworks like React are [<VPIcon icon="fa-brands fa-wikipedia-w"/>Rube Goldberg machines](https://en.wikipedia.org/wiki/Rube_Goldberg_machine) built around limitations that no longer exist. He compares them to [<VPIcon icon="fas fa-globe"/>Netflix’s DVD-by-mail era](https://theguardian.com/media/2022/dec/24/netflix-dvd-by-mail-service-dvd-com): We’re still sending discs when we could be streaming.

He runs through browser capabilities in 2025 that we routinely overlook when we reflexively reach for frameworks — and includes a teaser slide for my later talk on scroll timelines. I feel a sense of belonging and dread simultaneously, like passing the [<VPIcon icon="fas fa-globe"/>chicken exit](https://coasterpedia.net/wiki/Chicken_exit) on Space Mountain.

In the break, Jono admits to me that he was nervous about triggering anger by bashing frameworks. I hope the audience is warming to favoring the platform, because my talk shares that same underlying spirit, albeit through the specific example of CSS Scroll-Driven Animations. It helps that Jono served as frontline fodder, since research shows that [<VPIcon icon="fas fa-globe"/>everything sounds more credible with a British accent](https://researchgate.net/publication/320380071_Credibility_of_native_and_non-native_speakers_of_English_revisited_Do_non-native_listeners_feel_the_same), even if Jono’s was slightly slurred from jet lag.

Whether he’s right about nuking frameworks or not, it’s healthy to reassess whether we need a dependency list longer than our screen port. I first questioned this in 2015 after watching Joe Gregorio argue we should [<VPIcon icon="fa-brands fa-youtube"/>stop using frameworks](https://youtu.be/GMWAHzXQnNM) and rely on the platform — a talk that, in hindsight, looked suspiciously like [<VPIcon icon="fa-brands fa-wikipedia-w"/>guerrilla marketing](https://en.wikipedia.org/wiki/Guerrilla_marketing) for [<VPIcon icon="fa-brands fa-youtube"/>Google Polymer](https://youtu.be/fD2As5RmM8Q&t=7s). I adopted Polymer for a major project. It was more like a framework than a library, but with the “bonus” of not being battle-tested like React: it had its own weird [<VPIcon icon="fa-brands fa-chrome"/>build process](https://chromium.googlesource.com/chromium/src/+/58.0.2990.0/docs/vulcanize.md), reliance on a browser feature that [<VPIcon icon="iconfont icon-webdev"/>never became a standard](http://web.dev/articles/imports), and a [<VPIcon icon="fas fa-globe"/>promised future that never arrived](https://lea.verou.me/blog/2020/09/the-failed-promise-of-web-components/). I ended up rewriting everything. Eventually, Polymer itself was [<VPIcon icon="fa-brands fa-linkedin"/>quietly put out of its misery](https://linkedin.com/pulse/googles-polymer-deprecated-dr-thorsten-roggendorf/).

Even so, I love the *idea* of web components: transforming the browser into something built for the way we already force it to behave. A decade later, has the situation improved enough to `yarn remove React`? The answer may go beyond browser capability in 2025. Over coffee, Jono and I discuss how LLMs are trained on oceans of React, reinforcing the assumption that every web app must be an SPA. Escaping React is [<VPIcon icon="fas fa-globe"/>harder than ever](https://aifoc.us/dead-framework-theory/) when the future of work is [dragging us back into the past (<VPIcon icon="fa-brands fa-reddit" />`ClaudeAI`)](https://reddit.com/r/ClaudeAI/comments/1i1vogq/why_does_claude_frequently_recommend_react_for/), much the way recommendation algorithms on social media trap us in our own echo chambers.

“It’s only gonna get worse,” says Jono.

And I guess it will, unless we start creating good examples of what browsers can do without dependencies.

### “Supercharged Scrolling With CSS” by Me

![Photo credit: [<VPIcon icon="fas fa-globe"/>Kris Howard](https://web-goddess.org/archive/89076)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/s_1C26B41484E9092D8578B4B9CE2FEE75CDACB10D985593D9FDFD7D3B7FDE65BE_1766191345377_IMG_6508.jpeg?resize=1000%2C750)

It’s [<VPIcon icon="fas fa-globe"/>debatable whether you should admit you’re nervous while giving a talk](https://comm.pitt.edu/speech-anxiety). Most say you shouldn’t. The balance I strike is to open with a self-deprecating joke as a way to get the scrolling discussion rolling.

“I have a feeling some of you might be scrolling on your devices as we speak, so I urge you to look up — and let’s scroll together for the next half hour.”

It gets a laugh. It’s a moment where I translate my CSS-Tricks article style — self-referential, [<VPIcon icon="fa-brands fa-wikipedia-w"/>breaking the fourth wall](https://en.wikipedia.org/wiki/Fourth_wall) — into something that works on stage. This is my challenge for the talk: How do I adapt a year’s worth of articles about my autistic special interest into thirty minutes?

It brings to mind the movie [<VPIcon icon="fa-brands fa-wikipedia-w"/>*Adaptation*](https://en.wikipedia.org/wiki/Adaptation_(film)), where Nicolas Cage plays a screenwriter with imposter syndrome trying to adapt an unfilmable book into the movie we’re watching. Unlike my articles, I decide I shouldn’t launch abruptly into the crazy CSS experiments I built in my basement.

First, I need to answer why me, this random guy, thinks scrollytelling warrants half an hour of the audience’s time. I can’t assume much about this audience. Kris Howard [<VPIcon icon="fas fa-globe"/>will later comment on her blog](https://web-goddess.org/archive/89076) that “Lee Meyer’s session introduced me to a new term – [<VPIcon icon="fas fa-globe"/>scrollytelling](https://shorthand.com/the-craft/an-introduction-to-scrollytelling/index.html).”

I borrow credibility from *The New York Times*, name-checking its high-profile examples of scrollytelling, one of which won a [<VPIcon icon="fas fa-globe"/>Pulitzer Prize](https://journalism.co.uk/new-york-times-digital-snowfall-feature-wins-pulitzer/). John helpfully drops the link to the [<VPIcon icon="fas fa-globe"/>“Snow Fall” article](https://nytimes.com/projects/2012/snow-fall/index.html#/?part=tunnel-creek) into the livestream chat, just as I’d add links if this were an article.

But there’s another element of my writing that doesn’t translate: long code snippets. They’re too complex to explain on stage. Doing so would be a suicide mission. Let’s do it anyway.

I’ve used [<VPIcon icon="fas fa-globe"/>reveal.js](https://revealjs.com/) in the past for [<VPIcon icon="fa-brands fa-youtube"/>an online presentation at Games For Change](https://youtu.be/0tDs7KrRP3Q&t=1s), and reveal.js supports [<VPIcon icon="fas fa-globe"/>automatic animations between code blocks](https://revealjs.com/auto-animate/#example%3A-animating-between-code-blocks). I use that to demonstrate how newer CSS syntax can drastically shorten code. It doesn’t matter that nobody can fully parse the old syntax at a glance; that’s the point of the animation. I ask for a show of hands for who would rather write the new syntax than the old?

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/01/lee-meyer-web-directions-demo.mp4" />

Adapting my articles for the stage is my opportunity to rewrite history to appear logical. The order of [**discovery**](/css-tricks.com/web-slinger-css-like-wow-js-but-with-css-y-scroll-animations.md) of the [**building blocks**](/css-tricks.com/worlds-collide-keyframe-collision-detection-using-style-queries.md) I will use for my [**final demo**](/css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries.md) appears intentional rather than the [<VPIcon icon="iconfont icon-css-tricks"/>chaotic trail](https://css-tricks.com/author/leemeyer/) I have been leaving across CSS-Tricks since 2024. But now it’s time to tackle the final demo like the boss battle it is.

I ask for a show of hands: *Should I fight the bad guy unarmed, or run away?* The audience is split evenly, which is the one outcome I didn’t plan for.

In *Adaptation*, when Cage’s character is running out of time to finish his script, he panics and seeks advice from screenwriting guru Robert McKee, who tells him: *Your story can be flawed throughout, but wow them in the end, and you’ve got a hit.* As much as I’m my own worst critic, I know I have something with this final demo, the kind that would make [a leader on the Google Chrome team tweet “Wow!” (<VPIcon icon="fa-brands fa-x-twitter"/>`Una`)](https://x.com/Una/status/1998433837437571108) That tweet hasn’t happened yet while I’m on stage, as I’m wondering how this crowd will react.

I let the bad guy kill the hero first. I make the antagonist seem unbeatable. Then I refresh, scroll in the opposite direction, climb a ladder, collect a lightsaber, and kill the bad guy.

<VidStack src="youtube/cseY_nbKHaw" />

McKee warned Cage’s writer character not to cheat at the end with a [<VPIcon icon="fa-brands fa-wikipedia-w"/>*deus ex machina*](https://en.wikipedia.org/wiki/Deus_ex_machina). A magic lightsaber to save the day feels like one for sure, but by a stroke of [<VPIcon icon="fa-brands fa-wikipedia-w"/>synchronicity](https://en.wikipedia.org/wiki/Synchronicity), *Star Wars* imagery has been appearing in talks all day. John Allsopp even joked that it’s a theme he didn’t get the memo about. I reference this overarching theme, and the lightsaber feels earned. The pixel art guy kills the bad guy with one blow. The applause is loud enough to be heard on the livestream, even though the audience isn’t miked.

Can we end on that high note? [<VPIcon icon="fas fa-globe"/>Research shows](https://sciencedirect.com/science/article/pii/S0001691824001458) that time dilates for people onstage with high public-speaking anxiety. Ironically, in a talk about controlling timelines, I realize I’ve lost control of the time, and I’m about to run out of slides too early.

So, I replay the demo and discuss its subtext. The scrollytelling pixel guy can be a novelty toy or he can be [<VPIcon icon="fa-brands fa-wikipedia-w"/>ergodic literature](https://en.wikipedia.org/wiki/Ergodic_literature), an [autobiographical allegory](/css-tricks.com/scrollytelling-on-steroids-with-scroll-state-queries./md#should-we-non-linearly-scrollytell-all-the-things). I refresh again. “Scroll left or right to flee or fight,” says the pixel art guy. I explain the deeper psychological truth behind the simplistic story and retro graphics.

> “You can tell them anything if you just make it funny, make it rhyme, and if they still don’t understand you, then you run it one more time.”
> 
> — Bo Burnham in [<VPIcon icon="fa-brands fa-youtube"/>“Can’t Handle This”](https://youtu.be/rYy0o-J0x20)

::: info View Slides

```component VPCard
{
  "title": "Supercharged Scrolling with CSS",
  "desc": "",
  "link": "https://leemeyer.github.io/",
  "logo": "https://leemeyer.github.io/favicon.ico",
  "background": "rgba(33,33,33,0.2)"
}
```

:::

### Happy Hour and Speaker Dinner

Every autistic person should receive a voucher that grants them access to one social situation where people come and talk to them about the thing they are obsessed with. One piece of feedback in particular made me feel seen: Someone tells me a more traditional tutorial would have been fine, but the direction I took was playful, which felt refreshing in a world where discussions of web development can become depressingly utilitarian. He doesn’t know that the first blog I ever created was [<VPIcon icon="fas fa-globe"/>playfulprogramming.com](https://web.archive.org/web/20131023224420/http://www.playfulprogramming.com/), so I’ve always been about finding joy in development.

Someone else told me it was their favorite talk in the conference, and that I was brave for embracing my Jewishness publicly by mentioning the Torah as an illustration of the meaning of scrolling to me. Given what happened in Sydney a month after I left, it may not have been bravery so much as my obliviousness to the current vibes in my country, since I am a more frequent reader of CSS-Tricks than the news.

---

## Day Two

The Sydney weather cools, mirroring my more chilled mood today. With my presentation behind me, I now walk toward the venue like an anonymous attendee who magically got a free ticket. I brace myself for a morning of AI-heavy talks. My year at work was an AI overdose.

### “What’s Beyond the Browser: The AI Platform Shift” by Rupert Manfredi

Walking to the University of Technology Sydney, the combo of venue and theme reminds me of [<VPIcon icon="fas fa-globe"/>John Barth’s *Giles Goat-Boy*](https://goodreads.com/book/show/144629.Giles_Goat_Boy), in which the world is represented as a university controlled by an AI. Authorship itself is disputed in the fictional preface, with both Barth and the AI claiming only to have edited the work — eerily prescient in 1966 of the state of work in 2026. AI is great until there’s a defect. Then humans blame the AI, and the AI blames humans for misunderstanding its limits.

The novel satirized the Cold War. A Marxist might say intellectual property can’t exist because creative work is always a product of the zeitgeist. Although the tech that [<VPIcon icon="fas fa-globe"/>Rupert Manfredi](http://ruperts.world)’s demos blurs the lines of authorship by doing away with discrete apps and websites and composing UIs to meet the user’s needs on the fly, he is probably not a commie. He suggests that creators would still get paid. Perhaps this will finally be the day in the sun for `HTTP 402 Payment Required`.

Rupert’s talk, [<VPIcon icon="fas fa-globe"/>“What’s Beyond the Browser,”](https://webdirections.org/dev-summit/speakers/rupert-manfredi.php) is daring. He demos “Telepath,” a prototype computer with no browser and no apps. He envisages that future developers will transfer their skills to create only fragments and services that AI can synthesize into a tailored user experience. He argues web development has never really been about learning React hooks, but about solving user problems: critical paths, information quality, and creativity. These are more fundamental to a developer’s skillset than any tools they happen to use.

That resonates with how I think about my work on CSS-Tricks: They are fragments of expression that gain meaning when woven into a larger tapestry by the people or machines who learn from them. If basic functionality becomes trivial, developers can focus on the problems nobody has solved yet.

### “A False Sense of Accessibility: What Automated Testing Tools Are Missing” by Beau Vass

As I mentioned before, I am autistic. So are my kids. It’s an [<VPIcon icon="fas fa-globe"/>invisible disability](https://lwb.org.au/news/understanding-invisible-disabilities/), and I’m careful to let the kids know the world won’t rearrange itself around our autism. Just as you can’t make something [<VPIcon icon="fas fa-globe"/>accessible to everyone](https://adrianroselli.com/2025/12/you-cant-make-something-accessible-to-everyone.html), you can’t make the accessible experience the same as everyone else’s any more than you can make it easy for my son to succeed in a school system that was never designed with neurodiverse people in mind.

Accessibility is often less about universal comfort than about ensuring there’s a viable path for the people who truly need the content. When you think about it, the users’ faculties are part of the platform. Accessibility is, therefore, as fundamental as browser compatibility.

In his talk, [<VPIcon icon="fas fa-globe"/>“What Automated Tools Are Missing,”](https://webdirections.org/dev-summit/speakers/beau-vass.php) speaker [Beau Vass (<VPIcon icon="fa-brands fa-linkedin" />`beau-vass-0b7b9a3a`)](https://linkedin.com/in/beau-vass-0b7b9a3a/?originalSubdomain=au) demonstrates how automated audits flag non-issues while missing critical failures, sometimes making accessibility worse when followed blindly. A decorative image without alternative text might be flagged, [**yet adding it could also actively harm screen-reader users**](/css-tricks.com/alt-text-not-always-needed.md). The problem isn’t automated tools themselves; it’s when passing a Lighthouse audit becomes the goal. Tools only recognize what they’re taught, and AI trained on a broken web will faithfully reproduce its mistakes. As one of my workmates likes to say: “Use your tools, but don’t let them turn you into a tool.”

Accessibility isn’t a froghurt topping. It can’t be added at the end, not even in principle. The responsibility is shared across design, content, engineering, and testing, and it requires direct input from people with disabilities. Accessibility may be subjective, but making the web accessible should still be easier than making the physical world accessible. When we fail, it’s another reminder that tooling alone won’t save us.

AI won’t solve accessibility, but it may become useful once we stop asking it to. There aren’t enough good examples on the web for models to learn from, which means we can’t expect Claude Code to fix our sites. That said, AI can already simulate how a screen reader user might attempt to complete a task and surface where friction occurs. [<VPIcon icon="fas fa-globe"/>BrowserStack does this already.](https://browserstack.com/guide/ai-accessibility-testing-tools) Ironically, it may be easier for a machine to put itself in the shoes of a disabled human than for a non-disabled human to do the same, and Beau believes it won’t be AI that changes the game, but [<VPIcon icon="fas fa-globe"/>laws and regulations requiring people to care about accessibility](https://ada.gov/law-and-regs/). Beau believes it’s more laws and regulations that will be a game-changer for accessibility than AI.

### Departure

All flights are delayed an hour, as if Sydney itself is resisting my return to Melbourne — and the end of this article. But back when I was young and teaching myself to write, I read [<VPIcon icon="fa-brands fa-amazon"/>a book about writing articles](https://amazon.com.au/Structure-Flow-David-Fryxell/dp/0898797055) that said the more a piece seems to be about everything, the more it’s about nothing. Soon, we must end the article.

It ends with me waiting to take flight, thinking about how Chris Coyier [<VPIcon icon="fa-brands fa-youtube"/>once said](https://youtube.com/watch?v=Ent8w_88T4o&t=173s) his greatest pride wasn’t a single moment of accomplishment, but the “aggregate moments” of sustained focus on his professional passions. The afterglow of this conference is the sum of a year obsessing over animation timelines — and what you’ll do with the knowledge if I end this article at the right moment.

But does that magical moment even exist? Animation timelines work because we can pause motion on a screen. But if we could do that in real life, then, according to [<VPIcon icon="fa-brands fa-wikipedia-w"/>Zeno’s arrow paradox](https://en.wikipedia.org/wiki/Zeno%27s_paradoxes#Arrow_paradox), my plane could never land. At every [<VPIcon icon="fa-brands fa-wikipedia-w"/>bullet-time](https://en.wikipedia.org/wiki/Bullet_time) instant, the plane would appear at rest, which would make all movement — including my entire journey — an illusion.

John Allsopp worried that the web itself might be stuck in that illusion of progress. But Aristotle [<VPIcon icon="fa-brands fa-wikipedia-w"/>answered](https://en.wikipedia.org/wiki/Infinite_divisibility) Zeno’s arrow paradox by saying [<VPIcon icon="fas fa-globe"/>discrete instants of time don’t exist](https://einstein-online.info/en/explandict/planck-time/), only the flow of time. Reality is made of the aggregate moments that Chris Coyier said have meaning to him. As I wait for a plane that seems incapable of landing, my phone buzzes with my favorite feedback from the conference: a graduate developer amazed by “the scroll section in the Dev Summit.” I love that he calls it a *section*, not a talk, as if it blended seamlessly into a two-day narrative flow, foreshadowing a future web that unfurls like an infinite scroll.

::: info John Barth (<VPIcon icon="fas fa-globe"/><code>thefreelibrary.com</code>)

> “This story will never end. This story ends.”

```component VPCard
{
  "title": "Ad infinitum: a short story. - Free Online Library",
  "desc": "Free Online Library: Ad infinitum: a short story. by “Harper's Magazine”;  News, opinion and commentary General interest Short stories",
  "link": "https://thefreelibrary.com/Ad+infinitum:+a+short+story.-a014698740/",
  "logo": "https://thefreelibrary.com/favicon.ico",
  "background": "rgba(6,76,130,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Postcard From Web Directions Dev Summit, 2025",
  "desc": "Lee Meyer recently spoke at Web Directions Summit 2025. This is his experience, not only speaking at the event, but experiencing the event through the lens of anxiety and imposter syndrome.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/postcard-from-web-directions-dev-summit-2025.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
