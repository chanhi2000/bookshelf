---
lang: en-US
title: "A Few Useful Web Development Bookmarklets"
description: "Article(s) > A Few Useful Web Development Bookmarklets"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - alwaystwisted.com
  - design
  - system
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Few Useful Web Development Bookmarklets"
    - property: og:description
      content: "A Few Useful Web Development Bookmarklets"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alwaystwisted.com/a-few-web-developer-bookmarklets.html
prev: /academics/system-design/articles/README.md
date: 2025-10-23
isOriginal: false
author:
  - name: Stuart Robson
    url: https://alwaystwisted.com/about/
cover: https://alwaystwisted.com/images/articles/meta-images/web-developer-bookmarklets.png
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

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="A Few Useful Web Development Bookmarklets"
  desc="Find inline styles, inspect CSS, check design system usage, toggle JS states, and detect 3rd-party resources with one click with these handy bookmarklets"
  url="https://alwaystwisted.com/articles/a-few-web-developer-bookmarklets.html"
  logo="https://alwaystwisted.com/images/favicons/apple-touch-icon.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/web-developer-bookmarklets.png"/>

I started creating a few bookmarklets (small JavaScript snippets saved as browser bookmarks) when working with a client which involved some 'front-end archeology' looking at a codebase that was 15 years mature and has been worked on since. These tools helped me quickly understand the structure, dependencies, and technical debt without having to dive deep into the codebase first.

The bookmarklets I've created focus on some common web development inspection tasks that aren't always easy to accomplish with standard browser developer tools:

1. Toggling between JavaScript and non-JavaScript states.
2. Finding inline CSS in the document.
3. Identifying elements with inline styles.
4. Detecting third-party resources.
5. Highlighting design system component usage.

Each of these addresses specific challenges I faced when trying to understand and document legacy front-end code. They've proven particularly valuable when auditing sites with multiple developers' contributions over many years, revealing patterns and issues that could remain hidden.

These bookmarklets don't attempt to replace comprehensive developer tools, but rather complement them by providing quick insights for specific front-end investigation.

---

## JS/No-JS Toggle

This bookmarklet toggles between [<VPIcon icon="fa-brands fa-google"/>the js and no-js classes on the HTML element](https://google.com/search?client=safari&rls=en&q=paul+irish+no-js&ie=UTF-8&oe=UTF-8). It's useful for testing how your site behaves with and without JavaScript enabled.

<!-- [No No No No JS](javascript:(function(){var htmlElement=document.documentElement;if(htmlElement.classList.contains('js')){htmlElement.classList.remove('js');htmlElement.classList.add('no-js');}else{htmlElement.classList.remove('no-js');htmlElement.classList.add('js');}})();) -->
<!-- TODO: 테스트 -->

---

## Inline CSS Inspector

This bookmarklet displays all inline CSS styles in the document head and style blocks in the page, along with line numbers and formatting.

<!-- [Inline CSS Inspector](javascript:(function(){var d=document;var styles=Array.from(d.head.getElementsByTagName('style')).filter(s=>!s.hasAttribute('data-styled')&&!s.hasAttribute('data-emotion'));var c=d.createElement('div');c.style.cssText='position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:9999!important;background:#fff!important;color:#000!important;padding:15px!important;border-bottom:2px solid #000!important;max-height:80vh!important;overflow:auto!important;font:14px Arial!important;box-shadow:0 2px 10px rgba(0,0,0,0.3)!important;';var html='<h3 style=\'margin:0 0 15px!important;font:bold 18px Arial!important;color:#000!important;\'>Inline CSS in HEAD</h3>';if(styles.length===0){html+='<div style=\'padding:10px!important;background:#f5f5f5!important;color:#000!important;border-left:3px solid #f33!important;\'>No inline CSS found in the HEAD element.</div>';}else{html+='<div style=\'margin-bottom:10px!important;color:#000!important;\'>Found <strong>'+styles.length+'</strong> style blocks:</div>';styles.forEach(function(style,index){var cssText=style.textContent.trim().replace(/}/g,'}\n').replace(/{/g,' {\n  ').replace(/;/g,';\n  ');html+='<div style=\'margin:10px 0!important;padding:10px!important;background:#f5f5f5!important;border:1px solid #ddd!important;border-radius:3px!important;\'><div style=\'color:#06a!important;font:bold 14px monospace!important;margin-bottom:5px!important;\'>Style Block #'+(index+1)+' <span style=\'color:#777!important;font-weight:normal!important;font-size:12px!important;\'>('+cssText.length+' characters)</span></div><pre style=\'margin:0!important;padding:8px!important;background:#fff!important;color:#333!important;font:13px monospace!important;overflow:auto!important;white-space:pre-wrap!important;border:1px solid #eee!important;max-height:300px!important;\'>'+cssText.replace(/</g,'<').replace(/>/g,'>')+'</pre></div>';});}html+='<div id=\'inline-css-close-btn\' style=\'position:absolute!important;top:10px!important;right:10px!important;background:#f33!important;color:#fff!important;border:none!important;padding:5px 10px!important;border-radius:3px!important;cursor:pointer!important;\'>Close</div>';c.innerHTML=html;d.body.appendChild(c);document.getElementById('inline-css-close-btn').addEventListener('click',function(){c.remove();});})();) -->
<!-- TODO: 테스트 -->

![a screenshot showing results of this bookmarklet](https://alwaystwisted.com/images/bookmarklets/css.png)

---

## Inline Element Styles Inspector

This bookmarklet scans the entire page for HTML elements that have inline ⁠style attributes and displays a comprehensive report.

<!-- [Inline Style Inspector](javascript:(function(){var d=document;var elements=Array.from(d.querySelectorAll('*')).filter(function(el){return el.hasAttribute('style')&&el.getAttribute('style').trim()!=='';});var c=d.createElement('div');c.style.cssText='position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:9999!important;background:#fff!important;color:#000!important;padding:15px!important;border-bottom:2px solid #000!important;max-height:80vh!important;overflow:auto!important;font:14px Arial!important;box-shadow:0 2px 10px rgba(0,0,0,0.3)!important;';var h='<h3 style=\'margin:0 0 15px!important;font:bold 18px Arial!important;color:#000!important;\'>Inline Style Inspector</h3>';if(elements.length===0){h+='<div style=\'padding:10px!important;background:#f5f5f5!important;color:#000!important;border-left:3px solid #f33!important;\'>No elements with inline styles found on this page.</div>';}else{h+='<div style=\'margin-bottom:10px!important;color:#000!important;\'>Found <strong>'+elements.length+'</strong> elements with inline styles:</div>';for(var i=0;i<elements.length;i++){var el=elements[i];var tag=el.tagName.toLowerCase();var identifier='';if(el.id)identifier+=' id=\''+el.id+'\'';if(el.className)identifier+=' class=\''+el.className+'\'';var domPath=[];var currentEl=el;var depth=0;while(currentEl&&currentEl!==document.body&&domPath.length<3){var name=currentEl.tagName.toLowerCase();if(currentEl.id)name+='#'+currentEl.id;domPath.unshift(name);currentEl=currentEl.parentElement;depth++;}h+='<div style=\'margin:10px 0!important;padding:10px!important;background:#f5f5f5!important;border:1px solid #ddd!important;border-radius:3px!important;\'><div style=\'color:#06a!important;font:bold 14px monospace!important;margin-bottom:5px!important;\'><'+tag+identifier+'> <span style=\'color:#777!important;font-weight:normal!important;font-size:12px!important;\'>(#'+(i+1)+', Depth: '+depth+')</span></div><div style=\'color:#666!important;font:12px monospace!important;margin-bottom:5px!important;\'>'+domPath.join(' > ')+'</div><pre style=\'margin:0!important;padding:8px!important;background:#fff!important;color:#333!important;font:13px monospace!important;overflow:auto!important;white-space:pre-wrap!important;border:1px solid #eee!important;\'>'+el.getAttribute('style').replace(/</g,'<').replace(/>/g,'>')+'</pre></div>';}}h+='<div id=\'inline-styles-close-btn\' style=\'position:absolute!important;top:10px!important;right:10px!important;background:#f33!important;color:#fff!important;border:none!important;padding:5px 10px!important;border-radius:3px!important;cursor:pointer!important;\'>Close</div>';c.innerHTML=h;d.body.appendChild(c);document.getElementById('inline-styles-close-btn').addEventListener('click',function(){c.remove();});})();) -->
<!-- TODO: 테스트 -->

![a screenshot showing results of this bookmarklet](https://alwaystwisted.com/images/bookmarklets/inline-styles.png)

::: important Why This Bookmarklet is Useful

This inline styles inspector aids in code audits to identify styles for external stylesheets, debugging layout issues, performance optimization through consolidating redundant styles, and checking for styles that might override accessibility features.

:::

---

## Third-Party Resource Detector

This bookmarklet identifies and lists all external CSS and JavaScript files loaded from domains other than the current one.

<!-- [External Resources Detector](javascript:(function(){var d=document;var currentHost=window.location.hostname;function extractDomain(url){try{return new URL(url).hostname;}catch(e){return url;}}function getBaseDomain(domain){var parts=domain.split('.');if(parts.length<=2)return domain;var baseDomain=parts.slice(parts.length-2).join('.');return baseSiteDomain;}var baseSiteDomain=getBaseDomain(currentHost);var externalResources=[];var links=d.getElementsByTagName('link');var scripts=d.getElementsByTagName('script');for(var i=0;i<links.length;i++){if(links[i].href){var linkDomain=extractDomain(links[i].href);if(getBaseDomain(linkDomain)!==baseSiteDomain){var type=links[i].rel==='stylesheet'?'CSS':(links[i].rel||'Link');externalResources.push({type:type,url:links[i].href});}}}for(var j=0;j<scripts.length;j++){if(scripts[j].src){var scriptDomain=extractDomain(scripts[j].src);if(getBaseDomain(scriptDomain)!==baseSiteDomain){externalResources.push({type:'JS',url:scripts[j].src});}}}var c=d.createElement('div');c.style.cssText='position:fixed!important;top:0!important;left:0!important;right:0!important;z-index:9999!important;background:#fff!important;color:#000!important;padding:15px!important;border-bottom:2px solid #000!important;max-height:80vh!important;overflow:auto!important;font:14px Arial!important;box-shadow:0 2px 10px rgba(0,0,0,0.3)!important;';var html='<h3 style=\'margin:0 0 15px!important;font:bold 18px Arial!important;color:#000!important;\'>External Resources</h3>';if(externalResources.length===0){html+='<div style=\'padding:10px!important;background:#f5f5f5!important;color:#000!important;border-left:3px solid #f33!important;\'>No external resources found.</div>';}else{html+='<div style=\'margin-bottom:10px!important;color:#000!important;\'>Found <strong>'+externalResources.length+'</strong> truly external resources:</div>';externalResources.forEach(function(resource,index){var color=resource.type==='CSS'?'#06a':(resource.type==='JS'?'#850':'#444');html+='<div style=\'margin:10px 0!important;padding:10px!important;background:#f5f5f5!important;border:1px solid #ddd!important;border-radius:3px!important;\'><div style=\'color:'+color+'!important;font:bold 14px monospace!important;margin-bottom:5px!important;\'>'+resource.type+' #'+(index+1)+'</div><pre style=\'margin:0!important;padding:8px!important;background:#fff!important;color:#333!important;font:13px monospace!important;overflow:auto!important;white-space:pre-wrap!important;border:1px solid #eee!important;word-break:break-all!important;\'>'+resource.url+'</pre></div>';});}html+='<div id=\'external-resources-close-btn\' style=\'position:absolute!important;top:10px!important;right:10px!important;background:#f33!important;color:#fff!important;border:none!important;padding:5px 10px!important;border-radius:3px!important;cursor:pointer!important;\'>Close</div>';c.innerHTML=html;d.body.appendChild(c);document.getElementById('external-resources-close-btn').addEventListener('click',function(){c.remove();});})();) -->
<!-- TODO: 테스트 -->

![a screenshot showing results of this bookmarklet](https://alwaystwisted.com/images/bookmarklets/3rd-party.png)

::: important Why This Bookmarklet is Useful

This external resource detector supports security auditing of third-party scripts, performance optimization, GDPR/privacy compliance checks, dependency management, Content Security Policy development, and assessment of offline capabilities by identifying external resources.

:::

---

## Component Checker

This bookmarklet helps identify which elements use your design system classes. Elements with your design system prefix are highlighted in green, while all others are outlined in red.

<!-- [Component Checker](javascript:(function(){const prefix=prompt('Enter CSS class prefix:','vf-');if(prefix===null||prefix===''){return;}const elementsWithPrefix=document.querySelectorAll('*[class*=\''+prefix+'\']');const allElements=document.querySelectorAll('*');elementsWithPrefix.forEach(el=>{el.style.outline='2px solid green';el.style.position='relative';});allElements.forEach(el=>{if(![...el.classList].some(cls=>cls.startsWith(prefix))){el.style.outline='4px solid red';el.style.position='relative';}});})();) -->
<!-- TODO: 테스트 -->

![a screenshot showing results of this bookmarklet](https://alwaystwisted.com/images/bookmarklets/component-checker.jpeg)

::: important Why This Bookmarklet is Useful

This component checker assists with design system compliance verification, legacy code detection, visual auditing of component adoption, refactoring planning, quality assurance of developer practices, and creating visual documentation of component usage patterns.

:::

### Customizing the Component Checker

To adapt this bookmarklet for your own design system, simply modify the namespace value at the beginning of the code. Replace `vf-` with your own design system's class prefix.

---

## Bonus - Ass Morphism

A little fun bookmarklet that makes a dig at the new Liquid Glass or Glassmorphism design and will simply change where it used on a page with a little humour.

<!-- [Ass Morphism](javascript:(function() { document.body.innerHTML = document.body.innerHTML.replace(/glassmorphism/gi, 'assmorphism').replace(/liquid glass/gi, 'liquid ass'); })();) -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Few Useful Web Development Bookmarklets",
  "desc": "Find inline styles, inspect CSS, check design system usage, toggle JS states, and detect 3rd-party resources with one click with these handy bookmarklets",
  "link": "https://chanhi2000.github.io/bookshelf/alwaystwisted.com/a-few-web-developer-bookmarklets.html",
  "logo": "https://alwaystwisted.com/images/favicons/apple-touch-icon.png",
  "background": "rgba(255,117,0,0.2)"
}
```
