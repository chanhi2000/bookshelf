---
lang: en-US
title: "Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell"
description: "Article(s) > Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell"
icon: iconfont icon-powershell
category:
  - Powershell
  - Microsoft
  - SharePoint
  - Article(s)
tag:
  - blog
  - c-sharpcorner.com
  - pwsh
  - powershell
  - tool
  - microsoft
  - sharepoint
  - share-point
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell"
    - property: og:description
      content: "Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/c-sharpcorner.com/streamlining-sharepoint-site-and-group-data-extraction-using-pnp-powershell.html
prev: /programming/pwsh/articles/README.md
date: 2025-08-19
isOriginal: false
author:
  - name: Keyur Pandya
    url : https://c-sharpcorner.com/members/keyur-pandya
cover: https://c-sharpcorner.com/images/csharp-corner-new.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Powershell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/pwsh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "SharePoint > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/sharepoint/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell"
  desc="This blog post explains how to use PnP PowerShell to automate the extraction of SharePoint site and group data, including site groups, subsites, and pages. It provides a step-by-step guide on how to connect to a SharePoint site, gather data recursively from subsites, and export the results to a CSV file for analysis. Ideal for SharePoint administrators looking to streamline auditing and management tasks."
  url="https://c-sharpcorner.com/article/streamlining-sharepoint-site-and-group-data-extraction-using-pnp-powershell"
  logo="https://c-sharpcorner.com/images/layout/favicon-icon-dark.svg"
  preview="https://c-sharpcorner.com/images/csharp-corner-new.png"/>

## Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell

Managing and auditing SharePoint sites often requires extracting information like site groups and pages across a hierarchy of subsites. Doing this manually can be cumbersome, but leveraging PnP PowerShell can simplify and automate the process. In this blog post, we explore a script to connect to a SharePoint site, fetch its groups, and recursively gather data about subsites and their pages, exporting the results to a CSV file for easy analysis.

::: info What Does This Script Do?

- **Connect to SharePoint**: Prompts the user to input a site URL and establishes an interactive connection using PnP PowerShell.
- **Fetch Site Groups**: Retrieves the groups associated with the given site URL.
- **Explore Subsites**: Recursively iterates through all subsites of the primary site.
- **Export Data**: Exports the collected data about site pages to a CSV file for further processing.

:::

---

## The Script Breakdown

```pwsh
$SiteURL = Read-Host "Enter Site URL:"
$CSVFile = "C:\Temp\Sites.csv"
Try {
    Connect-PnPOnline -Url $SiteURL -Interactive
    Write-Host $SiteURL

    Get-PnPSiteGroup -Site $SiteURL
    Write-Host $groups
    $WebsCollection = Get-PnPSubWeb -Recurse
    $PagesDataColl = @()
    ForEach ($Web in $WebsCollection) {
        Write-Host $Web.Url
        Connect-PnPOnline -Url $Web.Url -Interactive
   }
   $PagesDataColl
   $PagesDataColl | Export-Csv -Path $CSVFile -NoTypeInformation
}
catch {
    write-host "Error: $($_.Exception.Message)" -foregroundcolor Red
}
```

---

## Step-by-Step Guide

### 1. Prompt for the Site URL

The script begins by asking the user to provide the SharePoint site URL:

```pwsh
$SiteURL = Read-Host "Enter Site URL:"
```

### 2. Establish Connection

Using the PnP PowerShell module, the script connects to the specified site interactively:

```pwsh
Connect-PnPOnline -Url $SiteURL -Interactive
```

### 3. Fetch Groups

The `Get-PnPSiteGroup` command retrieves all the groups for the specified site:

```pwsh
Get-PnPSiteGroup -Site $SiteURL
```

### 4. Recursively Retrieve Subsites

The script uses `Get-PnPSubWeb -Recurse` to gather all subsites under the main site:

```pwsh
$WebsCollection = Get-PnPSubWeb -Recurse
```

### 5. Connect to Each Subsite

For each subsite retrieved, the script connects interactively:

```pwsh
ForEach ($Web in $WebsCollection) {
    Connect-PnPOnline -Url $Web.Url -Interactive
}
```

### 6. Export Data to CSV

The collected data is stored in an array and exported to a CSV file:

```pwsh
$PagesDataColl | Export-Csv -Path $CSVFile -NoTypeInformation
```

### 7. Error Handling

The script wraps its operations in a `Try-Catch` block to gracefully handle errors:

```pwsh
catch {
    write-host "Error: $($_.Exception.Message)" -foregroundcolor Red
}
```

::: info Use Case Scenarios

- **Site Audit**: Quickly gather information about site groups and subsites for compliance or documentation.
- **Permission Management**: Analyze group memberships and access levels across multiple sites.
- **Data Export**: Generate reports on SharePoint site structure and metadata for stakeholders.

:::

::: tip Customizing the Script

- Add Metadata Extraction: Extend the script to retrieve metadata about subsites, such as creation dates or owners.
- Fetch Page Information: Implement logic to extract details about pages within each subsite.
- Integrate Logging: Save logs to a text file for debugging or record-keeping.

:::

---

## Conclusion

This PnP PowerShell script is a powerful tool for SharePoint administrators, simplifying the process of auditing and managing site data. By leveraging automation, it saves time and ensures accurate, comprehensive reporting.

Try this script in your SharePoint environment and let us know how it improves your workflows!

::: note

Ensure you have the PnP PowerShell module installed and the necessary permissions to execute this script in your SharePoint environment.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Streamlining SharePoint Site and Group Data Extraction Using PnP PowerShell",
  "desc": "This blog post explains how to use PnP PowerShell to automate the extraction of SharePoint site and group data, including site groups, subsites, and pages. It provides a step-by-step guide on how to connect to a SharePoint site, gather data recursively from subsites, and export the results to a CSV file for analysis. Ideal for SharePoint administrators looking to streamline auditing and management tasks.",
  "link": "https://chanhi2000.github.io/bookshelf/c-sharpcorner.com/streamlining-sharepoint-site-and-group-data-extraction-using-pnp-powershell.html",
  "logo": "https://c-sharpcorner.com/images/layout/favicon-icon-dark.svg",
  "background": "rgba(0,121,199,0.2)"
}
```
