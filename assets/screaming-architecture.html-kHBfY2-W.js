import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{aj as l,am as e,as as h,ao as n,at as u,au as m,ak as a,aq as r,ar as d}from"./app-CpYYKbnj.js";const p={},g={id:"frontmatter-title-관련",tabindex:"-1"},_={class:"header-anchor",href:"#frontmatter-title-관련"};function y(o,t){const s=r("VPCard"),i=r("SiteInfo");return d(),l("div",null,[e("h1",g,[e("a",_,[e("span",null,h(o.$frontmatter.title)+" 관련",1)])]),n(s,u(m({title:"System Design > Article(s)",desc:"Article(s)",link:"/academics/system-design/articles/README.md",logo:"https://chanhi2000.github.io/images/ico-wind.svg",background:"rgba(10,10,10,0.2)"})),null,16),t[0]||(t[0]=e("nav",{class:"table-of-contents"},[e("ul")],-1)),t[1]||(t[1]=e("hr",null,null,-1)),n(i,{name:"Screaming Architecture",desc:"If you were to glance at the folder structure of your system, could you tell what the system is about? Your architecture should communicate what problems it solves. This approach is called sreaming architecture.",url:"https://milanjovanovic.tech/blog/screaming-architecture/",logo:"https://milanjovanovic.tech/profile_favicon.png",preview:"https://milanjovanovic.tech/blog-covers/mnw_104.png"}),a(" TODO: 작성 "),a(` 
If you were to glance at the folder structure of your system, could you tell what the system is about?
And here's a more interesting question.
Could a new developer on your team easily understand what the system does based on the folder structure?

Your architecture should communicate what problems it solves.
Organizing your system around use cases leads to a structure aligned with the business domain.
This approach is called **screaming architecture**.

<a href="https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html">Screaming architecture</a> is a term coined by Robert Martin (Uncle Bob).
He argues that a software system's structure should communicate what the system is about.
He draws a parallel between looking at a blueprint for a building, where you can tell the purpose of the building based on the blueprint.

In this article, I want to show some practical examples and discuss the benefits of screaming architecture.

---

## a-use-case-driven-approach"><a href="#a-use-case-driven-approach">A Use Case Driven Approach

A use case represents a specific interaction or task that a user wants to achieve within your system.
It encapsulates the business logic required to fulfill that task.
A use case is a high-level description of a user's goal.
For example, "reserving an apartment" or "purchasing a ticket".
It focuses on the *what* of the system's behavior, not the *how*.

When you look at the folder structure and source code files of your system:

- Do they scream: Apartment Booking System or Ticketing System?
<li>Or do they scream ASP.NET Core?

Here's an example of a folder structure organized around technical concerns:

\`\`\`pwsh
📁 Api/
|__ 📁 Controllers
|__ 📁 Entities
|__ 📁 Exceptions
|__ 📁 Repositories
|__ 📁 Services
    |__ #️⃣ ApartmentService.cs
    |__ #️⃣ BookingService.cs
    |__ ...
|__ 📁 Models
\`\`\`

Somewhere inside these folders, we'll find concrete classes that contain the system's behavior.
You'll notice that the cohesion with this folder structure is low.

How does screaming architecture help?

A use case driven approach will place the system's use cases as the top-level concept.
I also like to group related use cases into a top-level feature folder.
Inside a use case folder, we may find technical concepts required to implement it.

<a href="vertical-slice-architecture">**Vertical slice architecture**</a> also approaches this from a similar perspective.

\`\`\`pwsh
📁 Api/
|__ 📁 Apartments
    |__ 📁 ReserveApartment
    |__ ...
|__ 📁 Bookings
    |__ 📁 CancelBooking
    |__ ...
|__ 📁 Payments
|__ 📁 Reviews
|__ 📁 Disputes
|__ 📁 Invoicing
\`\`\`

The use case driven folder structure helps us better understand user needs and aligns development efforts with business goals.

---

## Screaming Architecture Benefits

The benefits of organizing our system around use cases are:

- Improved cohesion since related use cases are close together
- High coupling for a single use case and its related use cases
- Low coupling between unrelated use cases
- Easier navigation through the solution

---

## Bounded Contexts and Vertical Slices

We have many techniques for discovering the high-level modules within our system.
For example, we could use <a href="https://eventstorming.com/">event storming</a> to explore the system's use cases.
Domain exploration happens before we write a single line of code.

The next step is decomposing the larger problem domain into smaller sub-domains and later bounded contexts.
This gives us loosely coupled high-level modules that we can translate into code.

![Bounded contexts.](https://milanjovanovic.tech/blogs/mnw_104/bounded_contexts.png?imwidth=3840)

The overarching idea here is thinking about cohesion around functionalities.
We want to organize our system so that the cohesion between the components is high.
Bounded contexts, vertical slices, and screaming architecture are complementary concepts.

Here's a screaming architecture example for this system.
Let's say the \`Ticketing\` module uses <a href="clean-architecture-folder-structure">**Clean Architecture**</a> internally.
But we can still organize the system around feature folders and use cases.
An alternative approach could be organizing around <a href="vertical-slice-architecture-structuring-vertical-slices">**vertical slices**</a>, resulting in a less nested folder structure.

\`\`\`pwsh
📁 Modules/
|__ 📁 Attendance
    |__ ...
|__ 📁 Events
    |__ ...
|__ 📁 Ticketing
    |__ 📁 Application
        |__ 📁 Carts
            |__ 📁 AddItemToCart
            |__ 📁 ClearCart
            |__ 📁 GetCart
            |__ 📁 RemoveItemFromCart
        |__ 📁 Orders
            |__ 📁 SubmitOrder
            |__ 📁 CancelOrder
            |__ 📁 GetOrder
        |__ 📁 Payments
            |__ 📁 RefundPayment
        |__ ...
    |__ 📁 Domain
        |__ 📁 Customers
        |__ 📁 Orders
        |__ 📁 Payments
        |__ 📁 Tickets
        |__ ...
    |__ 📁 infrastructure
        |__ 📁 Authentication
        |__ 📁 Customers
        |__ 📁 Database
        |__ 📁 Orders
        |__ 📁 Payments
        |__ 📁 Tickets
        |__ ...
|__ 📁 Users
    |__ ...
\`\`\`

The example above is a small part of the system I built inside of <a href="/modular-monolith-architecture">**Modular Monolith Architecture**</a>.

---

## Takeaway

**Screaming Architecture** isn't just a catchy phrase, it's an approach that can profoundly impact how you build software.
By organizing your system around use cases, you align your codebase with the core business domain.
Your system exists to solve the business domain problems.

Remember, the goal is to create a system that communicates its purpose through its structure.
Embrace a use case-driven approach, break down complex domains into bounded contexts.
Build a system that truly "screams" about the problems it solves.

If you want to explore these powerful ideas further, check out <a href="/pragmatic-clean-architecture">**Pragmatic Clean Architecture**</a>.
I share my entire framework for building robust applications from the ground up and organizing the system around use cases.

That's all for today.

See you next week.

`)])}const b=c(p,[["render",y],["__file","screaming-architecture.html.vue"]]),w=JSON.parse('{"path":"/milanjovanovic.tech/screaming-architecture.html","title":"Screaming Architecture","lang":"ko-KR","frontmatter":{"lang":"ko-KR","title":"Screaming Architecture","description":"Article(s) > Screaming Architecture","icon":"fas fa-pen","category":["Design","System","Article(s)"],"tag":["blog","milanjovanovic.tech","system","design"],"head":[[{"meta":null},{"property":"og:title","content":"Article(s) > Screaming Architecture"},{"property":"og:description","content":"Screaming Architecture"},{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/screaming-architecture.html"}],["meta",{"property":"og:url","content":"https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/screaming-architecture.html"}],["meta",{"property":"og:site_name","content":"📚Bookshelf"}],["meta",{"property":"og:title","content":"Screaming Architecture"}],["meta",{"property":"og:description","content":"Article(s) > Screaming Architecture"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://milanjovanovic.tech/blog-covers/mnw_104.png"}],["meta",{"property":"og:locale","content":"ko-KR"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://milanjovanovic.tech/blog-covers/mnw_104.png"}],["meta",{"name":"twitter:image:alt","content":"Screaming Architecture"}],["meta",{"property":"article:author","content":"Milan Jovanović"}],["meta",{"property":"article:tag","content":"blog"}],["meta",{"property":"article:tag","content":"milanjovanovic.tech"}],["meta",{"property":"article:tag","content":"system"}],["meta",{"property":"article:tag","content":"design"}],["meta",{"property":"article:published_time","content":"2024-08-24T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Screaming Architecture\\",\\"image\\":[\\"https://milanjovanovic.tech/blogs/mnw_104/bounded_contexts.png?imwidth=3840\\"],\\"datePublished\\":\\"2024-08-24T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Milan Jovanović\\"}]}"]],"prev":"/academics/system-design/articles/README.md","date":"2024-08-24T00:00:00.000Z","isOriginal":false,"author":"Milan Jovanović","cover":"https://milanjovanovic.tech/blog-covers/mnw_104.png"},"headers":[],"git":{"contributors":[{"name":"chanhi2000","email":"chanhi2000@gmail.com","commits":3}]},"readingTime":{"minutes":3.43,"words":1028},"filePathRelative":"milanjovanovic.tech/screaming-architecture.md","localizedDate":"2024년 8월 24일","excerpt":"\\n","copyright":{"author":"Milan Jovanović"}}');export{b as comp,w as data};