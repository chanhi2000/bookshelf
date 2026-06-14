---
lang: en-US
title: "How to Insert Images in Google Sheets"
description: "Article(s) > How to Insert Images in Google Sheets"
icon: fa-brands fa-google-drive
category:
  - Tool
  - Google
  - Google Drive
  - Google Sheets
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - tool
  - google
  - google-gemini
  - google-drive
  - google-sheets
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Insert Images in Google Sheets"
    - property: og:description
      content: "How to Insert Images in Google Sheets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-insert-images-in-google-sheets.html
prev: /tool/xls/articles/README.md
date: 2026-06-25
isOriginal: false
author:
  - name: Vikram Aruchamy
    url: https://freecodecamp.org/news/author/askvikram/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6e7a9323-3a3d-4058-b5a8-d4f6c86710db.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Google Drive > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/google-drive/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Excel > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/xls/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Insert Images in Google Sheets"
  desc="Google Sheets is widely used for tracking data, managing inventories, building product catalogs, and creating dashboards. In many of these use cases, adding images directly into a spreadsheet makes th"
  url="https://freecodecamp.org/news/how-to-insert-images-in-google-sheets"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/6e7a9323-3a3d-4058-b5a8-d4f6c86710db.png"/>

Google Sheets is widely used for tracking data, managing inventories, building product catalogs, and creating dashboards. In many of these use cases, adding images directly into a spreadsheet makes the data easier to understand and work with.

Whether you're displaying product photos, marketing assets, or property listings, Google Sheets provides several ways to insert and display images.

In this tutorial, you'll learn how to:

- Insert images using the Insert menu in Google Sheets
- Display images from a URL using the `IMAGE()` function
- Work with multiple images stored in Google Drive

---

## Understanding How Images Work in Google Sheets

The way an [<VPIcon icon="fa-brands fa-google"/>image is inserted in Google Sheets](https://support.google.com/docs/answer/9224754) determines how it behaves when you sort data, resize rows, or build automated workflows.

This becomes particularly important when working with product catalogs, asset trackers, or spreadsheets that are connected to Google Drive workflows, such as [<VPIcon icon="fas fa-globe"/>listing files from Drive into Google Sheets](https://driveexplorer.pro/list-files-from-google-drive-into-google-sheets) or [<VPIcon icon="fas fa-globe"/>uploading files from Google Sheets into Google Drive](https://driveexplorer.pro/upload-photos-to-google-drive-and-share-link).

Before inserting images, it's important to understand the two image placement options available in Google Sheets:

### Images Inside Cells:

Images become part of the cell itself and behave like spreadsheet data when rows and columns are moved, resized, filtered, or sorted.

The following image shows how the image inserted inside Google Sheets cell looks like:

![Image inside a cell in Google Sheets](https://cdn.hashnode.com/uploads/covers/5f51c9311ed5446c783c27ff/03836fdb-22ec-4eff-8f8a-1f8cb20a4a9e.png)

Benefits of inserting an image inside a cell include:

- Moves with rows and columns
- Resizes when cells are resized
- Sorts correctly with spreadsheet data
- Ideal for inventories and catalogs

### Images Over Cells:

Images remain independent of the underlying cells and float above the spreadsheet, allowing them to be freely positioned and resized without affecting spreadsheet data.

The following image shows how the image inserted over the Google Sheets cell looks:

![Image over the cell in Google Sheets](https://cdn.hashnode.com/uploads/covers/5f51c9311ed5446c783c27ff/ecdc1248-9b8f-450a-9fab-c46bd668bcd7.png)

Benefits include:

- Freely position images anywhere on the sheet
- Useful for logos and visual elements
- Better suited for dashboards and reports

For most spreadsheet-based workflows, **Images inside Cells** is usually the preferred option.

If you're working with a large number of images stored in Google Drive, manually collecting image URLs can quickly become time-consuming.

Tools such as [<VPIcon icon="fas fa-globe"/>Drive Explorer Pro](https://driveexplorer.pro) can help automate this process by listing files and generating image URLs directly in Google Sheets. It can also include additional file metadata such as image previews, file names, download URLs, sharing permissions, and other file details, making it easier to organize, manage files at scale as shown in the following image:

![Listing google drive file in Google Sheets](https://cdn.hashnode.com/uploads/covers/5f51c9311ed5446c783c27ff/b440f2e3-5773-448f-9dbc-4151cd420745.png)

Next, you'll see how to insert images inside cell or over a cell.

---

## Inserting Images Using the Insert Menu in Google Sheets

The Insert menu is the simplest way to add a small number of images to Google Sheets. Using this method, you can insert images either inside cells, where they behave like spreadsheet data, or over cells, where they float above the worksheet.

### Image in Cell

1. Select the destination cell.
2. Click **Insert → Image → Insert an image in the cell**.
3. Choose an image source:
    - Upload from computer
    - Google Drive
    - Google Photos
    - Camera
    - URL
4. Select the image and click **Insert**.

Google Sheets places the image inside the selected cell, allowing it to move, resize, and sort with your spreadsheet data.

::: tip

Resize rows and columns before inserting images. Large image files can increase spreadsheet size even when displayed in small cells.

:::

**Best for:**

- Product catalogs
- Inventory tracking
- Asset management
- Small datasets with manual image entry

**Limitation:** Each image must be inserted individually, making this approach difficult to maintain for larger datasets.

### Image Over Cells

1. Click **Insert → Image → Insert an image over the cells**.
2. Select and upload an image.
3. Resize and position it as needed.

Unlike images in cells, these images float above the spreadsheet and aren't tied to specific rows or columns.

**Best for:**

- Company logos
- Dashboard graphics
- Visual annotations
- Presentation-style spreadsheets

For inventories and product databases, **Image in Cell** is usually the better choice.

If you need larger image previews, see [**how to create an image lightbox in Google Sheets**](/freecodecamp.org/how-to-create-an-image-lightbox.md) using XLOOKUP or Apps Script.

---

## Inserting Images in Google Sheets Using the IMAGE Function

If your images are already available online, the [<VPIcon icon="fa-brands fa-google"/>IMAGE](https://support.google.com/docs/answer/3093333) function can display them directly inside spreadsheet cells using a URL.

The`IMAGE()` function doesn't store images inside the spreadsheet. It simply displays images from external URLs. If the source image is deleted, moved, or becomes inaccessible, the image will disappear from the sheet.

### IMAGE Function Syntax

```excel
=IMAGE(url,[mode],[height],[width])
```

The optional **mode** parameter controls how the image is displayed inside the cell.

Google Sheets supports four display modes:

| Mode | Formula | Behavior |
| --- | --- | --- |
| 1 (Default) | `=IMAGE(A2,1)` | Fits the image inside the cell while preserving its aspect ratio |
| 2 | `=IMAGE(A2,2)` | Stretches the image to fill the entire cell |
| 3 | `=IMAGE(A2,3)` | Displays the image at its original dimensions |
| 4 | `=IMAGE(A2,4,200,200)` | Displays the image using custom width and height values |

For most spreadsheets, **Mode 1** is the best choice because it maintains image proportions while fitting neatly within the cell. Use **Mode 4** only when you need fixed image dimensions, as custom-sized images can become more difficult to maintain in large spreadsheets.

### Basic Example

```excel
=IMAGE("https://example.com/product-image.jpg")
```

Google Sheets retrieves the image from the URL and displays it inside the cell using Mode 1 by default.

### Displaying Images from a Column of URLs

If column B contains image URLs, use:

```excel
=IMAGE(B2)
```

Then copy the formula down to generate image previews for every row.

**Best for:**

- Product catalogs
- eCommerce inventory sheets
- Asset tracking systems
- Marketing content databases

### Common Issues

Most IMAGE function problems are caused by one of three issues:

**Permissions:** Google Drive images must be [<VPIcon icon="fa-brands fa-google"/>shared as **Anyone with the link**](https://support.google.com/drive/answer/2494822) **can view**.

**Direct URLs:** Standard Google Drive sharing links won't work. Convert them to:

```text
https://drive.google.com/uc?id=FILE_ID
```

**Performance:** Because the `IMAGE` function loads images from external URLs whenever the spreadsheet recalculates, large image files or hundreds of image formulas can impact spreadsheet performance. For best results, use optimized image sizes rather than full-resolution photos.

---

## Inserting Multiple Images from URLs

When image URLs are already stored in a spreadsheet, the `IMAGE` function can generate image previews automatically for every row using the [<VPIcon icon="fa-brands fa-google"/>ARRAYFORMULA()](https://support.google.com/docs/answer/3093275) function.

For example, if image URLs are stored in column A:

```excel
=ARRAYFORMULA(IF(A2:A="","",IMAGE(A2:A)))
```

This formula applies the IMAGE function to every populated row, eliminating the need to insert images individually.

**Benefits:**

- No manual image insertion
- Automatically updates when image URLs change
- Easy to maintain as data grows
- Works well with imported or generated datasets
- Can be combined with automated workflows

This approach is commonly used for:

- Product catalogs
- Inventory management
- Asset tracking systems
- Marketing content databases

For most spreadsheet-based image workflows, this is the simplest and most scalable way to display multiple images in Google Sheets.

### Performance Considerations:

Displaying a large number of images can impact spreadsheet responsiveness because each image must be retrieved and rendered from its source URL.

To maintain performance:

- Use optimized image sizes instead of full-resolution photos
- Avoid displaying thousands of images on a single sheet
- Apply filters when working with large datasets
- Split large image catalogs across multiple sheets when necessary

**Troubleshooting:**

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| Broken image or empty cell | Source not public | Set Drive file to **Anyone with the link**, then test URL in an incognito window |
| Formula runs but no image | Unsupported format | IMAGE supports PNG, JPEG, and GIF only |
| Works in browser, not in sheet | Viewer page URL, not direct link | Use `uc?id=FILE_ID` or `lh3.googleusercontent.com/d/FILE_ID` |
| Image never loads | Password-protected or login-required site | Move image to a publicly accessible host |
| Sheet loads slowly | Large source files | Resize to ~200×200 px before linking |

::: tip Best Practices

- **Optimize before linking:** Resize images to thumbnail dimensions (~200×200 px) instead of linking 5 MB originals.
- **Use predictable URL patterns:** If images follow a folder structure, generate URLs with CONCATENATE rather than maintaining a static URL per row: `=IMAGE("https://cdn.example.com/products/" & A2 & ".jpg")`
- **Don't expose sensitive files:** Making a Drive file public just to display it in a sheet can expose it to anyone who sees the URL. For private images, use the Insert menu or a tool that respects Drive permissions.

:::

---

## Working with Multiple Images Stored in Google Drive

When images are stored in Google Drive, displaying them with the `IMAGE` function requires an image URL for each file. While this is manageable for a few images, manually collecting URLs can quickly become time-consuming when working with larger image libraries.

A common workflow is to first list files from Google Drive into Google Sheets, then use the resulting file links or image URLs to generate image previews with the `IMAGE` function.

This approach works particularly well for:

- Product catalogs
- Inventory tracking
- Marketing asset libraries
- Team directories

### Converting Google Drive Links into Image Previews:

For a small number of files, you can paste Google Drive sharing links into a spreadsheet and convert them into image previews using a formula:

```excel
=IMAGE("https://drive.google.com/uc?export=view&id=" & REGEXEXTRACT(A2,"/d/([^/]+)"))
```

Each file must be shared as **Anyone with the link can view** for the image to display correctly.

### Working with Large Image Libraries:

When managing hundreds or thousands of images, manually collecting and converting Drive links becomes difficult to maintain.

In these situations, it's often more efficient to first [<VPIcon icon="fa-brands fa-google"/>list files from Google Drive into Google Sheets](https://workspace.google.com/marketplace/app/drive_explorer_pro/1074215048146) and then generate image previews automatically.

::: info Video Tutorial

How to Insert Image Inside a Cell in Google Sheets

<VidStack src="youtube/ExkFzuv69Gs" />

:::

---

## Which Method Should You Choose?

| Use Case | Recommended Method |
| --- | --- |
| Insert a few images manually | Insert Menu |
| Add logos and graphics | Image Over Cells |
| Display images from URLs | IMAGE Function |
| Product catalogs | IMAGE Function |
| Inventory management | IMAGE Function |
| Large Google Drive image libraries | Drive Explorer Pro + IMAGE Function |

---

## Conclusion

While inserting a few images into Google Sheets is straightforward, managing images at scale requires a different approach. Understanding the difference between manually inserted images, URL-based images, and Google Drive workflows allows you to build spreadsheets that remain efficient as your data grows.

By using the right image workflow from the start, you can create catalogs, inventories, and reporting systems that are easier to update, automate, and maintain over time.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Insert Images in Google Sheets",
  "desc": "Google Sheets is widely used for tracking data, managing inventories, building product catalogs, and creating dashboards. In many of these use cases, adding images directly into a spreadsheet makes th",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-insert-images-in-google-sheets.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
