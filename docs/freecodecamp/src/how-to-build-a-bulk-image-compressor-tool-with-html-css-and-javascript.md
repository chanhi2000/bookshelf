---
lang: en-US
title: "How to Build a Bulk Image Compressor Tool with HTML, CSS, and JavaScript"
description: "Article(s) > How to Build a Bulk Image Compressor Tool with HTML, CSS, and JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Bulk Image Compressor Tool with HTML, CSS, and JavaScript"
    - property: og:description
      content: "How to Build a Bulk Image Compressor Tool with HTML, CSS, and JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-bulk-image-compressor-tool-with-html-css-and-javascript.html
prev: /programming/js/articles/README.md
date: 2026-09-19
isOriginal: false
author:
  - name: Bansidhar Kadiya
    url: https://freecodecamp.org/news/author/99tools/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f0d7a939-276b-4eb9-a380-6f376997dbe6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Bulk Image Compressor Tool with HTML, CSS, and JavaScript"
  desc="High-resolution images look great, but they can significantly slow down page load times and consume massive amounts of storage. While backend compression tools are common, building a client-side image"
  url="https://freecodecamp.org/news/how-to-build-a-bulk-image-compressor-tool-with-html-css-and-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f0d7a939-276b-4eb9-a380-6f376997dbe6.png"/>

High-resolution images look great, but they can significantly slow down page load times and consume massive amounts of storage.

While backend compression tools are common, building a client-side image compressor offers a massive advantage: privacy. When you process images directly in the browser, no user data ever touches a server.

In this tutorial, you'll learn how to build a fully functional, browser-based bulk image compressor. You'll use the HTML5 Canvas API to reduce image file sizes and integrate the JSZip library to package multiple compressed files into a single, convenient ZIP download.

To make this project highly practical, you'll structure the code as an embeddable widget. By omitting standard HTML boilerplate tags, you can easily drop this snippet directly into a WordPress Custom HTML block or any other CMS without causing layout conflicts.

::: note Prerequisites

To follow along, you should have a basic understanding of:

- **HTML & CSS:** Structuring a UI and creating interactive hover/drag states.
- **JavaScript Promises:** Handling asynchronous operations like file reading and ZIP generation.
- **The Canvas API:** Understanding how browsers can draw and manipulate image data natively.

:::

---

## Step 1: Build the HTML Structure

First, you need to create the visual interface. You'll build a drag-and-drop zone, an invisible file input, and a hidden action panel that appears once the user selects their images.

Add the following code to your file. Notice that you're including the JSZip CDN link right at the top so your script can access it later.

```html :collapsed-lines
<!-- JSZip Library for Bulk Downloading -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>

<div class="ic-main-wrapper">
  <div class="ic-title">Image Compressor</div>

  <!-- The Drag and Drop Zone -->
  <div class="ic-dropzone-area" id="icDropzone">
    <input
      type="file"
      id="icFileInput"
      multiple
      accept="image/jpeg, image/png, image/webp, image/gif, image/bmp, image/tiff, image/avif"
      style="display: none"
    />

    <div class="ic-icon-box">
      <svg viewBox="0 0 24 24">
        <path
          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h14l-4-5z"
        />
      </svg>
    </div>

    <div class="ic-primary-text">
      Drop images here or
      <span class="ic-browse-link" id="icBrowseBtn">click to browse</span>
    </div>
    <div class="ic-secondary-text">
      Multiple images supported — bulk compress & download as ZIP
    </div>

    <div class="ic-format-tags">
      <span>JPEG</span><span>PNG</span><span>WebP</span><span>GIF</span
      ><span>BMP</span><span>TIFF</span><span>AVIF</span>
    </div>
  </div>

  <!-- Action Panel (Hidden by default) -->
  <div class="ic-action-panel" id="icActionPanel">
    <div id="icStatusText" class="ic-status-msg">0 images selected</div>
    <button class="ic-btn-primary" id="icCompressBtn">
      Compress & Download ZIP
    </button>
  </div>
</div>
```

### Understanding the HTML:

- `accept="..."` **attribute:** This restricts the hidden `<input type="file">` to only accept image formats, preventing users from accidentally uploading PDFs or text documents.
- **Embeddable Structure:** Because this markup relies on a single `.ic-main-wrapper` container rather than full `<html>` and `<body>` tags, you can safely embed it into existing web pages without breaking the parent theme.

---

## Step 2: Style the Interface with CSS

Next, you'll apply styling to make the tool look professional and responsive. You'll use a clean, modern aesthetic with a specific brand accent color (`#1A73E8`) to highlight interactive elements.

Add this `<style>` block right above your HTML:

```css :collapsed-lines
.ic-main-wrapper {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
    sans-serif;
  max-width: 850px;
  margin: 20px auto;
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.ic-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 30px;
}

.ic-dropzone-area {
  border: 1.5px dashed #cbd5e1;
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  background-color: #f8fafc;
  transition: all 0.3s ease;
}

/* Active Drag State */
.ic-dropzone-area.dragover {
  border-color: #1a73e8;
  background-color: #f1f5f9;
}

.ic-icon-box {
  width: 64px;
  height: 64px;
  background-color: #e8f0fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #1a73e8;
}

.ic-icon-box svg {
  width: 28px;
  height: 28px;
  fill: currentColor;
}

.ic-primary-text {
  font-size: 1.15rem;
  color: #0f172a;
  font-weight: 500;
  margin-bottom: 12px;
}

.ic-browse-link {
  color: #1a73e8;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
}

.ic-browse-link:hover {
  text-decoration: underline;
}

.ic-secondary-text {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 24px;
}

.ic-format-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.ic-format-tags span {
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  font-size: 0.8rem;
  padding: 6px 18px;
  border-radius: 20px;
}

.ic-action-panel {
  margin-top: 25px;
  display: none;
  text-align: center;
  background: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.ic-btn-primary {
  background: #1a73e8;
  color: #ffffff;
  border: none;
  padding: 12px 28px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s;
}

.ic-btn-primary:hover {
  background: #1557b0;
}

.ic-btn-primary:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.ic-status-msg {
  margin-bottom: 15px;
  font-size: 0.95rem;
  color: #334155;
  font-weight: 500;
}
```

### Understanding the CSS:

- **The** `.dragover` **Class:** This class alters the border and background color of the dropzone. You'll use JavaScript to apply this class dynamically when a user hovers a file over the area, providing crucial visual feedback.
- **Unique Prefixes:** Notice how every class starts with `ic-` (Image Compressor). This acts as a CSS namespace, ensuring your tool's styles won't accidentally override or be overridden by other styles on your website.

At this stage, your user interface is fully structured and styled. It will look like this:

![](https://cdn.hashnode.com/uploads/covers/699c7b22cf5def0f6aaf982b/2e75b26b-e1ae-443b-a78f-6f9833a4774a.png)

---

## Step 3: Add the JavaScript Logic

Now comes the engine of the tool. The JavaScript will handle file selection, convert the images using the Canvas API to reduce their size, and package them into a ZIP file.

Add this `<script>` block below your HTML:

```js :collapsed-lines
document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('icDropzone');
    const fileInput = document.getElementById('icFileInput');
    const browseBtn = document.getElementById('icBrowseBtn');
    const actionPanel = document.getElementById('icActionPanel');
    const statusText = document.getElementById('icStatusText');
    const compressBtn = document.getElementById('icCompressBtn');
    
    let filesArray = [];

    // 1. Handle File Input and Drag & Drop
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });
    
    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });
    
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            processSelectedFiles(e.dataTransfer.files);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            processSelectedFiles(fileInput.files);
        }
    });

    // 2. Validate and Display the Action Panel
    function processSelectedFiles(files) {
        filesArray = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (filesArray.length > 0) {
            actionPanel.style.display = 'block';
            statusText.innerText = `${filesArray.length} image(s) selected. Ready to compress.`;
        }
    }

    // 3. The Core Compression Engine
    function compressImage(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    
                    // Draw the image onto the canvas
                    ctx.drawImage(img, 0, 0);
                    
                    // Force compatibility: Convert unusual formats to JPEG or WebP
                    let mimeType = file.type;
                    if (mimeType !== 'image/jpeg' && mimeType !== 'image/webp') {
                        mimeType = 'image/jpeg';
                    }
                    
                    // Compress using the canvas.toBlob method at 70% quality (0.7)
                    canvas.toBlob((blob) => {
                        let finalName = file.name;
                        
                        // Ensure the file extension matches the new mimeType
                        if (mimeType === 'image/jpeg' && !finalName.match(/.(jpg|jpeg)$/i)) {
                            finalName = finalName.substring(0, finalName.lastIndexOf('.')) + '.jpg';
                        }
                        
                        resolve({ name: finalName, blob: blob });
                    }, mimeType, 0.7); 
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    // 4. Handle the Bulk ZIP Process
    compressBtn.addEventListener('click', async () => {
        if (filesArray.length === 0) return;
        
        compressBtn.disabled = true;
        
        try {
            const zip = new JSZip();
            const folder = zip.folder("compressed_images");
            
            // Loop through each file and await its compression
            for (let i = 0; i < filesArray.length; i++) {
                statusText.innerText = `Compressing ${i + 1} of ${filesArray.length}...`;
                const compressedData = await compressImage(filesArray[i]);
                folder.file(compressedData.name, compressedData.blob);
            }
            
            statusText.innerText = 'Creating ZIP file...';
            
            // Generate and trigger the ZIP download
            const zipContent = await zip.generateAsync({ type: "blob" });
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(zipContent);
            downloadLink.download = "compressed_images.zip";
            downloadLink.click();
            
            statusText.innerText = 'Download successful!';
        } catch (error) {
            statusText.innerText = 'An error occurred during compression.';
            console.error(error);
        } finally {
            compressBtn.disabled = false;
        }
    });
});document.addEventListener('DOMContentLoaded', () => {
  const dropzone = document.getElementById('icDropzone');
  const fileInput = document.getElementById('icFileInput');
  const browseBtn = document.getElementById('icBrowseBtn');
  const actionPanel = document.getElementById('icActionPanel');
  const statusText = document.getElementById('icStatusText');
  const compressBtn = document.getElementById('icCompressBtn');

  let filesArray = [];

  // 1. Handle File Input and Drag & Drop
  browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      processSelectedFiles(e.dataTransfer.files);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      processSelectedFiles(fileInput.files);
    }
  });

  // 2. Validate and Display the Action Panel
  function processSelectedFiles(files) {
    filesArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (filesArray.length > 0) {
      actionPanel.style.display = 'block';
      statusText.innerText = `${filesArray.length} image(s) selected. Ready to compress.`;
    }
  }

  // 3. The Core Compression Engine
  function compressImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');

          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);

          // Force compatibility: Convert unusual formats to JPEG or WebP
          let mimeType = file.type;
          if (mimeType !== 'image/jpeg' && mimeType !== 'image/webp') {
            mimeType = 'image/jpeg';
          }

          // Compress using the canvas.toBlob method at 70% quality (0.7)
          canvas.toBlob((blob) => {
            let finalName = file.name;

            // Ensure the file extension matches the new mimeType
            if (mimeType === 'image/jpeg' && !finalName.match(/.(jpg|jpeg)$/i)) {
              finalName = finalName.substring(0, finalName.lastIndexOf('.')) + '.jpg';
            }

            resolve({ name: finalName, blob: blob });
          }, mimeType, 0.7);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // 4. Handle the Bulk ZIP Process
  compressBtn.addEventListener('click', async () => {
    if (filesArray.length === 0) return;

    compressBtn.disabled = true;

    try {
      const zip = new JSZip();
      const folder = zip.folder("compressed_images");

      // Loop through each file and await its compression
      for (let i = 0; i < filesArray.length; i++) {
        statusText.innerText = `Compressing ${i + 1} of ${filesArray.length}...`;
        const compressedData = await compressImage(filesArray[i]);
        folder.file(compressedData.name, compressedData.blob);
      }

      statusText.innerText = 'Creating ZIP file...';

      // Generate and trigger the ZIP download
      const zipContent = await zip.generateAsync({ type: "blob" });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(zipContent);
      downloadLink.download = "compressed_images.zip";
      downloadLink.click();

      statusText.innerText = 'Download successful!';
    } catch (error) {
      statusText.innerText = 'An error occurred during compression.';
      console.error(error);
    } finally {
      compressBtn.disabled = false;
    }
  });
});
```

::: info Understanding the JavaScript

- **Drag and drop events:** The `dragover`, `dragleave`, and `drop` event listeners work together to capture files dragged from a user's desktop directly into the browser window.
- **The canvas trick:** Browsers can't magically compress files on their own. Instead, the `compressImage` function reads the image, draws it onto an invisible HTML5 `<canvas>`, and then uses the `canvas.toBlob()` method to export a new, optimized version of that image. The `0.7` argument sets the compression quality to 70%.
- **Extension handling:** Because the canvas exports images as either JPEG or WebP, the script actively checks and renames the file extensions (for example, changing a `.png` filename to `.jpg`) before packaging them.
- **Asynchronous zipping:** A `for` loop uses `await` to compress each image sequentially. Once complete, JSZip bundles the blobs into a folder and triggers a programmatic click event on a temporary anchor `<a>` tag to download the final `.zip` file.

:::

---

## Conclusion

You've successfully built a fast, client-side bulk image compressor.

By leveraging the Canvas API alongside JSZip, you created a highly practical utility that saves users bandwidth and storage without compromising their privacy. Because the entire codebase is self-contained without HTML boilerplate, it's ready to be deployed instantly on almost any modern web platform.

::: info

If you want to see this codebase deployed in a live, production environment, you can test out the functionality over at this Live [<VPIcon icon="fas fa-globe"/>Image Compressor Tool](https://99tools.net/image-compressor/). Happy coding!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Bulk Image Compressor Tool with HTML, CSS, and JavaScript",
  "desc": "High-resolution images look great, but they can significantly slow down page load times and consume massive amounts of storage. While backend compression tools are common, building a client-side image",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-bulk-image-compressor-tool-with-html-css-and-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
