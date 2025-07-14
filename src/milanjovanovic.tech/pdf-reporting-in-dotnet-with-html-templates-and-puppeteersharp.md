---
lang: en-US
title: "PDF Reporting in .NET With HTML Templates and PuppeteerSharp (and it's free)"
description: "Article(s) > PDF Reporting in .NET With HTML Templates and PuppeteerSharp (and it's free)"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > PDF Reporting in .NET With HTML Templates and PuppeteerSharp (and it's free)"
    - property: og:description
      content: "PDF Reporting in .NET With HTML Templates and PuppeteerSharp (and it's free)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/pdf-reporting-in-dotnet-with-html-templates-and-puppeteersharp.html
prev: /programming/cs/articles/README.md
date: 2025-07-19
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_151.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="PDF Reporting in .NET With HTML Templates and PuppeteerSharp (and it's free)"
  desc="Generate PDF reports in .NET using HTML templates and a headless browser. We'll explore Handlebars.NET and PuppeteerSharp, compare alternatives, and analyze performance tradeoffs."
  url="https://milanjovanovic.tech/blog/pdf-reporting-in-dotnet-with-html-templates-and-puppeteersharp"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_151.png"/>

Sooner or later, every .NET developer needs to generate PDF reports. And generating polished PDF reports in .NET doesn't have to be painful. Let me explain how.

My go-to method?

**HTML to PDF conversion**. It's:

- Simple to implement
- Very flexible
- Ideal for stylized reports

But many popular libraries require a commercial license. This post walks you through a completely free approach using:

- **Handlebars.NET** for templating
- **PuppeteerSharp** for headless rendering

This gives you full control over layout, styling, and content. It's perfect for invoices, dashboards, and exports.

We'll start from scratch and build up to a complex, dynamic invoice report with full styling, images, and even headers and footers.

---

## Why HTML + Headless Browser?

::: tabs

@tab:active Pros

- Rich styling with CSS
- Easy to preview/debug in browser
- Supports charts/images via JS/CSS
- Full control over layout (media queries, page breaks, etc.)

@tab Cons

- Requires bundling a browser (e.g. Chromium)
- Slower than native PDF libraries
- Slightly more setup complexity

:::

---

## Setting Up the Project

We'll start by installing the NuGet packages we need for Handlebars and PuppeteerSharp:

```powershell
Install-Package Handlebars.Net
Install-Package PuppeteerSharp
```

Next, we'll create our first template. It's a simple HTML document with some Handlebars placeholders. You'll notice them with the `{{variable}}` syntax. These placeholders will be replaced with actual data when rendering the template.

```html :collapsed-lines
<!-- Templates/InvoiceTemplate.html -->
<!-- The file extension doesn't really matter. -->
<html lang="en">
  <head>
    <style>
      body {
        font-family: Arial;
      }
    </style>
  </head>
  <body>
    <h1>Invoice #{{Number}}</h1>

    <p>Date: {{formatDate IssuedDate}}</p>

    <h2>From:</h2>
    <p>{{SellerAddress.CompanyName}}</p>
    <p>{{SellerAddress.Email}}</p>

    <h2>To:</h2>
    <p>{{CustomerAddress.CompanyName}}</p>
    <p>{{CustomerAddress.Email}}</p>

    <h2>Items:</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
      {{#each LineItems}}
      <tr>
        <td>{{Name}}</td>
        <td>{{formatCurrency Price}}</td>
      </tr>
      {{/each}}
    </table>

    <p><strong>Total: {{formatCurrency Total}}</strong></p>
  </body>
</html>
```

The function calls, like `{{formatDate IssuedDate}}`, are custom helpers we can define in Handlebars. You register them like this:

```cs
Handlebars.RegisterHelper("formatDate", (context, arguments) =>
{
    if (arguments[0] is DateOnly date)
    {
        return date.ToString("dd/MM/yyyy");
    }
    return arguments[0]?.ToString() ?? "";
});
```

This allows us to format dates, currencies, or any other data type as needed. You register these helpers before compiling the template, once per application start is enough.

---

## Rendering the Template and PDF

How do we render this template and convert it to PDF? We'll use [<FontIcon icon="iconfont icon-github"/>`Handlebars-Net/Handlebars.Net`](https://github.com/Handlebars-Net/Handlebars.Net) to compile the template with data, then PuppeteerSharp to render it to PDF.

First, we read the template file and compile it with `Handlebars`:

```cs
var template = File.ReadAllText("Templates/InvoiceTemplate.html");
var data = new {
    customer = "Milan Jovanović",
    items = new[] {
        new { description = "Software License", price = 99 },
        new { description = "Support Plan", price = 49 }
    }
};

var compiledTemplate = Handlebars.Compile(template);

string html = compiledTemplate(data);
```

This gives us the final HTML with all placeholders replaced by actual data.

::: note

You don't necessarily need to use Handlebars. You can use any templating engine that suits your needs, like [**Razor**](/milanjovanovic.tech/flexible-pdf-reporting-in-net-using-razor-views.md) or [<FontIcon icon="iconfont icon-github"/>`scriban/scriban`](https://github.com/scriban/scriban).

:::

Next, we need to convert this HTML to PDF using PuppeteerSharp. We'll launch a headless browser, set the content to our HTML, and then generate the PDF. Here's how we do it:

```cs
// Ensure PuppeteerSharp has the browser binaries
var browserFetcher = new BrowserFetcher();
await browserFetcher.DownloadAsync(BrowserFetcher.DefaultChromiumRevision);

// Launch the browser and create a new page
using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
using var page = await browser.NewPageAsync();

// Set the content of the page to our compiled HTML
await page.SetContentAsync(html);

// Optional: wait for fonts to load if using custom fonts
await page.EvaluateExpressionHandleAsync("document.fonts.ready");

byte[] pdf = await page.PdfDataAsync(new PdfOptions {
    Format = PaperFormat.A4,
    PrintBackground = true,
    MarginOptions = new MarginOptions
    {
        Top = "50px",
        Right = "20px",
        Bottom = "50px",
        Left = "20px"
    }
});
```

This gives us a byte array containing the PDF data. You can then save it to a file or return it from an API endpoint.

Here's a simple example of returning it from a Minimal API endpoint:

```cs
return Results.File(pdf, "application/pdf", "invoice.pdf");
```

Here's what the document looks like when rendered:

![Simple PDF Template example rendered as PDF](https://milanjovanovic.tech/blogs/mnw_151/simple_template.png?imwidth=3840)

This is a simple PDF template example with dynamic templated content.

---

## Enhancements: Images, Header/Footer, Styling

What are some improvements we can make to this basic setup?

For example, you can add images to your template using the `<img>` tag. A simple approach is to use a base64-encoded image directly in the HTML. Note that we're passing the image data using the `LogoBase64` variable.

```html
<img
  src="data:image/png;base64,{{LogoBase64}}"
  alt="Logo"
  style="height:50px; max-width:200px; object-fit:contain;"
/>
```

We can also render dynamic headers and footers using PuppeteerSharp's built-in support. You can define these in the `PdfOptions` object when generating the PDF. Here's an example:

```cs
var pdfOptions = new PdfOptions
{
    HeaderTemplate =
        @"""
        <div style='font-size: 14px; text-align: center; padding: 10px;'>
            <span style='margin-right: 20px;'><span class='title'></span></span>
            <span><span class='date'></span></span>
        </div>
        """,
    FooterTemplate =
        @"""
        <div style='font-size: 14px; text-align: center; padding: 10px;'>
            <span style='margin-right: 20px;'>Generated on <span class='date'></span></span>
            <span>Page <span class='pageNumber'></span> of <span class='totalPages'></span></span>
        </div>
        """,
    DisplayHeaderFooter = true
};
```

PuppeteerSharp uses CSS classes like `title`, `date`, `pageNumber`, and `totalPages` to inject dynamic values. This could be different for some other libraries, so check the documentation.

Lastly, I want to mention that you can use CSS for advanced styling. This can be inline in the HTML or in a separate CSS file. You can also reference external stylesheets if needed, using the `<link>` tag.

Here's a complete example of a more complex template with images, headers, and footers:

```html :collapsed-lines
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice #{{Number}}</title>
    <style>
      /* Omitted for brevity */
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <!-- Header with Logo -->
      <div
        style="display: flex; justify-content: space-between; align-items: flex-start;"
      >
        <div>
          <h1 class="invoice-title">Invoice #{{Number}}</h1>
          <div class="invoice-dates">
            <p><strong>Issued:</strong> {{formatDate IssuedDate}}</p>
            <p><strong>Due:</strong> {{formatDate DueDate}}</p>
          </div>
        </div>
        <div>
          {{#if LogoBase64}}
          <img
            src="data:image/png;base64,{{LogoBase64}}"
            alt="Logo"
            style="height:50px; max-width:200px; object-fit:contain;"
          />
          {{/if}}
        </div>
      </div>
      <hr
        style="margin: 20px 0; border: none; border-top: 1px solid #e9ecef;"
      />

      <!-- Addresses - Side by Side -->
      <div class="addresses">
        <!-- Seller Address -->
        <div class="address-box">
          <h3 class="address-title">From:</h3>
          <div class="address-content">
            <p class="company-name">{{SellerAddress.CompanyName}}</p>
            <p>{{SellerAddress.Street}}</p>
            <p>{{SellerAddress.City}}, {{SellerAddress.State}}</p>
            <p class="email">{{SellerAddress.Email}}</p>
          </div>
        </div>

        <!-- Customer Address -->
        <div class="address-box">
          <h3 class="address-title">Bill To:</h3>
          <div class="address-content">
            <p class="company-name">{{CustomerAddress.CompanyName}}</p>
            <p>{{CustomerAddress.Street}}</p>
            <p>{{CustomerAddress.City}}, {{CustomerAddress.State}}</p>
            <p class="email">{{CustomerAddress.Email}}</p>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <div class="items-section">
        <h2 class="items-title">Items</h2>
        <table class="items-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {{#each LineItems}}
            <tr>
              <td>{{@index}}</td>
              <td>{{Name}}</td>
              <td>{{formatCurrency Price}}</td>
              <td>{{formatNumber Quantity}}</td>
              <td>{{formatCurrency (multiply Price Quantity)}}</td>
            </tr>
            {{/each}}
          </tbody>
        </table>
      </div>

      <!-- Totals -->
      <div class="totals">
        <div class="totals-container">
          <div class="totals-row subtotal">
            <span>Subtotal:</span>
            <span>{{formatCurrency Subtotal}}</span>
          </div>
          <div class="totals-row">
            <span>Tax:</span>
            <span>{{formatCurrency 0}}</span>
          </div>
          <div class="totals-row total">
            <span>Total:</span>
            <span>{{formatCurrency Total}}</span>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
```

And the rendered PDF looks like this:

![Complex PDF Template example rendered as PDF with images, headers, and footers](https://milanjovanovic.tech/blogs/mnw_151/complex_template.png?imwidth=3840)

This is a complex PDF template example with CSS stylization, tables, images, headers, and footers.

---

## Downloading Binaries at Application Start

Here's a small tip: PuppeteerSharp requires the Chromium browser binaries to be downloaded at runtime. You can do this by calling `BrowserFetcher.DownloadAsync()` before launching the browser. This ensures the required browser version is available when you run your application.

A simple way to do this is to add it to your application startup code or a background service:

```cs
public class BrowserSetupService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        var browserFetcher = new BrowserFetcher();
        await browserFetcher.DownloadAsync();
    }
}
```

Then register this service in your `Program.cs`:

```cs
builder.Services.AddHostedService<BrowserSetupService>();
```

---

## Performance Considerations

Let's talk about performance. How fast is this approach and can you use it at scale?

The first thing to consider is the use a headless browser like Chromium. This can be slower than native PDF libraries, especially for large documents or high concurrency. It also adds **overhead at runtime** since the browser binaries need to be **downloaded** and **launched**.

You should definitely consider moving this out of your main application. You can use a background service or a separate microservice to handle PDF generation. Event a cloud function can be a good fit if you need to scale.

But as with anything performance-related, it depends on your specific use case. So measure and profile your application to see if this approach meets your needs.

Here are some benchmarks I ran on a sample invoice template. It's nothing scientific, but it gives you an idea of the performance. I didn't test this with concurrent requests, but rather just the time it takes to generate a single PDF.

**Cold Start**: ~12s spent downloading + launching Chromium

**Warm Run**: ~580ms

- Template + HTML generation: ~13ms
- Browser reuse + rendering: ~550ms

---

## Summary

HTML + PuppeteerSharp is one of the most pragmatic approaches for PDF reporting in .NET.

It lets you:

- Design pixel-perfect layouts using familiar web technologies
- Inject dynamic data cleanly with Handlebars.NET
- Output high-quality PDFs with full styling, tables, and images

And all of this without relying on commercial libraries.

I've also written about [**PDF generation**](/milanjovanovic.tech/how-to-easily-create-pdf-documents-in-aspnetcore.md) in the past, with libraries like [<FontIcon icon="fas fa-globe"/>QuestPdf](https://questpdf.com/) or [<FontIcon icon="fas fa-globe"/>IronPdf](https://ironpdf.com/). You can take a look at those if you want to compare approaches.

The cold start can be expensive, but once warmed up, rendering is fast and reliable. You get total layout control, CSS styling, and even dynamic headers and footers with page numbers and timestamps.

If you're building internal dashboards, invoice generators, or export endpoints, this approach delivers excellent value.

If you need pixel-perfect PDF reports in .NET and want full design control, combining Handlebars.NET with PuppeteerSharp is a powerful approach.

You'll trade some performance and setup cost for flexibility, but for most internal tools, dashboards, or customer-facing reports, it's worth it.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "PDF Reporting in .NET With HTML Templates and PuppeteerSharp (and it's free)",
  "desc": "Generate PDF reports in .NET using HTML templates and a headless browser. We'll explore Handlebars.NET and PuppeteerSharp, compare alternatives, and analyze performance tradeoffs.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/pdf-reporting-in-dotnet-with-html-templates-and-puppeteersharp.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
