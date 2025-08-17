---
lang: en-US
title: "How to Free Up and Automatically Manage Disk Space for WSL on Windows 10/11"
description: "Article(s) > How to Free Up and Automatically Manage Disk Space for WSL on Windows 10/11"
icon: fa-brands fa-windows
category:
  - DevOps
  - Windows
  - WSL
  - Powershell
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - win
  - windows
  - windows10
  - windows11
  - pwsh
  - powershell
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Free Up and Automatically Manage Disk Space for WSL on Windows 10/11"
    - property: og:description
      content: "How to Free Up and Automatically Manage Disk Space for WSL on Windows 10/11"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-free-up-and-automatically-manage-disk-space-for-wsl-on-windows-1011.html
prev: /devops/win/articles/README.md
date: 2025-08-07
isOriginal: false
author:
  - name: brooklyn
    url : https://freecodecamp.org/news/author/brkln/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1754523230294/70893973-fddf-42a9-b41a-2a8f94a47e22.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Windows > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/win/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Powershell > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/pwsh/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Free Up and Automatically Manage Disk Space for WSL on Windows 10/11"
  desc="Windows Subsystem for Linux (WSL) lets you run a Linux environment directly on Windows. This is particularly useful for web development where you can develop and test applications in a Linux environment without leaving Windows. You can even run freeC..."
  url="https://freecodecamp.org/news/how-to-free-up-and-automatically-manage-disk-space-for-wsl-on-windows-1011"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1754523230294/70893973-fddf-42a9-b41a-2a8f94a47e22.png"/>

Windows Subsystem for Linux ([<FontIcon icon="fa-brands fa-microsoft"/>WSL](https://learn.microsoft.com/en-us/windows/wsl/install)) lets you run a Linux environment directly on Windows. This is particularly useful for web development where you can develop and test applications in a Linux environment without leaving Windows. You can even run [<FontIcon icon="fa-brands fa-free-code-camp"/>freeCodeCamp locally](https://contribute.freecodecamp.org/how-to-setup-wsl/) with it!

But managing disk space can be a quite a challenge, as WSL uses virtual hard disks that do not automatically free up unused space.

This tutorial will guide you through the process of manually compacting your WSL virtual hard disks. We’ll automate this task using a PowerShell script, ensuring that your WSL environment remains efficient and clutter-free.

---

## Reclaim Your Space

WSL uses a virtualization platform to install Linux distributions on your Windows system. Each distribution you add gets its own Virtual Hard Disk (VHD), which uses the ext4 file system (common in Linux). It’s saved on your Windows drive as an ext4.vhdx file.

Key issues here:

- Inefficient storage: by default, VHD files **do not reclaim** unused space. This means that when you delete a file in WSL, the associated disk space isn’t immediately freed up.
- Disk space consumption: due to that inefficient storage, the **VHD files can grow large** thanks to that accumulated data, especially if you’re a WSL heavy user.
- Need for maintenance: you may not know that you need to **compact** your VHD files in order to reclaim disk space.

If you notice that your free disk space is shrinking even after deleting files and apps, WSL might be the reason. This tutorial will help you keep your WSL and Windows environment running smoothly.

---

## Part 1: How to Manually Compact Your Virtual Hard Disk

Let's start by going through the process manually. This section will guide you through checking your WSL version and associated Linux distributions, finding VHD files, shutting down WSL, and compacting the virtual disk.

::: note Prerequisites

- Windows 10 (20H1/2004+) or Windows 11 with WSL2 installed
- The PowerShell or Command Prompt running as **Administrator** (from the Windows menu, right click the icon and choose run as Administrator).

:::

### Step 1: Verify your WSL version and status

First, make sure you’re running on WSL version 2 (commonly referred as WSL2). The first version is outdated and WSL2 provides significant improvements. Open PowerShell (as Admin) or Command Prompt (as Admin) and run:

```powershell
wsl -v
wsl --status
```

These commands display the WSL client version and whether your default distro is using WSL 2. Here’s the output of the `wsl -v` command:

![Command prompt displaying WSL version 2.5.9.0, with corrupted or incomplete text following "Kernel version:", "WSLg version:", and other version labels.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754250376279/ef11af4b-ba5b-43f9-9532-db2634eed154.png)

And here’s the output of the `wsl --status` command.

![Command line text showing "C:\Users>wsl --status" with the information "Default Distribution: Ubuntu" and "Default Version: 2".](https://cdn.hashnode.com/res/hashnode/image/upload/v1754250364365/6cea2d97-0796-4320-8f84-58d1b5e62c5e.png)

### Step 2: List all installed distributions verbosely

To see a detailed list of your WSL distributions (including which version each uses), run:

```powershell
wsl.exe --list --verbose
```

![Output of  the WSL --list --verbose command.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754250281542/1826814a-5516-483e-b8ab-6477fd950e21.png)

Above you can see the output of the WSL `--list --verbose` command.

Look for your distro name (for example, “*Ubuntu*”) and note its WSL version. If it shows “Version 2”, you can proceed with compaction.

### Step 3: Locate your linux Virtual Hard Drive (VHDX) path

Each WSL distro’s files live in a [<FontIcon icon="fa-brands fa-wikipedia-w"/>VHDX file](https://en.wikipedia.org/wiki/VHD_\(file_format\)) on your Windows drive. To find the path for any Linux distribution, use this PowerShell snippet:

```powershell
(Get-ChildItem `

-Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss `

| Where-Object { $_.GetValue("DistributionName") -eq 'YOUR_DISTRO_NAME' }

).GetValue("BasePath") + "\ext4.vhdx"
```

Where you replace `YOUR_DISTRO_NAME` with yours (Ubuntu, Debian, Kali-linux..). Here’s the output of the command shown above in PowerShell (the filepath has been anonymized):

![A PowerShell command is displayed, used to locate the ext4.vhdx file for the Ubuntu distribution. The command retrieves the Windows Subsystem for Linux (WSL) base path for Ubuntu.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754251303855/ea3b3880-5804-4f50-97c8-327ffd017084.png)

This command reads the registry key for your linux distribution, then appends “\\ext4.vhdx” to build the full file path.

Make sure you copy the whole line. We will need it in later stages.

### Step 4: Shut down all WSL instances

Before you can compact any virtual drive, make sure WSL is completely shut down. In PowerShell or Command Prompt (still as Administrator), run:

```powershell
wsl.exe --shutdown
```

### Step 5: Compact the Linux virtual hard drive using DiskPart

You successfully gathered all the needed information (about your system, the available distros, and their VHDX filepath) to proceed with the main task. In this step, you actually proceed with the compaction.

::: tabs

@tab:active 1.

Launch DiskPart in the same elevated (*admin*) shell:

```powershell
diskpart
```

DiskPart will open in a new window. It's a Windows command-line tool for managing disk partitions. Be cautious when using it, as incorrect actions can cause serious data loss.

@tab 2.

In the DiskPart prompt, select the VHDX file you found earlier. Replace the path as displayed below with your actual path (the line you copied before):

```powershell
select vdisk file="C:\Users\username\AppData\path\to\ext4.vhdx"
```

![Screenshot of a command prompt window showing Microsoft DiskPart version information. A command is entered to select a virtual disk file, and a message confirms successful selection.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754251748072/91795798-0896-4fcc-994c-0ab311955bee.png)

The above is the output of the select vdisk command (some data has been anonymized).

@tab 3.

Attach the virtual drive in read-only mode:

Compaction only needs to scan the empty blocks in the file, not write to the Linux filesystem inside. Read-only mode guarantees that DiskPart only inspect the blocks for zero‐trimming without any chance of damaging or altering your Linux filesystem.

```powershell
attach vdisk readonly
```

![Command prompt showing the output for "DISKPART> attach vdisk readonly" with a successful attachment message.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754251937734/a90af720-1511-42cc-bc37-63439d855907.png)

You can see in the screenshot above that the virtual hard drive has been successfully attached.

@tab 4.

Compact the disk:

This frees up the disk space by shrinking the physical size of the `.vhdx` file to match the **actual used data** inside.

```powershell
compact vdisk
```

This operation might take a while. When you see the `“DiskPart successfully compacted the virtual disk file”` message, proceed with the next step. In the image below, the virtual hard drive has been successfully compacted.

![Terminal output showing "DISKPART> compact vdisk" with "100 percent completed," indicating successful compaction of the virtual disk file.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754252148605/51cc9739-775b-4a84-a526-7c2a6d2a9722.png)

@tab 5.

Detach the virtual drive:

```powershell
detach vdisk
```

![Command prompt showing "DISKPART> detach vdisk" and a confirmation message that DiskPart successfully detached the virtual disk file.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754252460797/e29387d7-4f03-4ddb-80f7-f14a5051b0fe.png)

There you go - the virtual hard drive has been successfully detached.

This command releases any locks on the virtual drive and effectively dismounts it. If you don't use this command, the file remains "in use," preventing WSL (or you) from accessing it until you reboot or manually force it closed.

@tab 6.

Exit DiskPart:

```powershell
exit
```

:::

### Step 6: Restart WSL and verify

Back in PowerShell or Command Prompt, you can relaunch your distro:

```powershell
wsl -d YOUR_DISTRO_NAME
```

You can even try the Unix `df -h` command in your WSL prompt to check your new available disk spaces.

Congrats, you just achieved a maintenance task that can free up lots of gigabytes of storage over time. Now, it’s time to automate.

![A minimalistic white rectangular button with a cable on a pink surface.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754321783829/4325a626-806e-47e7-9147-a76f4c91a93a.jpeg)

---

## Part 2: How to Make Your Life Easier with Automation

Since it's often hard to remember exactly where your WSL distro is located and you probably won't use it very often, this PowerShell script will automate the entire process we covered in part 1. Here's a preview of the steps you'll follow:

- Detect installed WSL distributions.
- Select one (and handle the cases there are more than one).
- Locate the corresponding `ext4.vhdx` file.
- Shut down WSL and use DiskPart to compact the virtual disk.

::: note Prerequisites

- Windows 10 (20H1/2004+) or Windows 11 with WSL 2 enabled.
- PowerShell or Command Prompt (as Administrator).

:::

You’ll also need a code editor. The Windows notepad is enough for completing this task. You can also use an IDE (Integrated Development Environment) like VS Code or an ISE (Integrated Scripting Environment) like PowerShell ISE (included with Windows).

To test the script, download it from [GitHub (<FontIcon icon="iconfont icon-github"/>`brooks-code/WSL-VHDX-Compact`)](https://github.com/brooks-code/WSL-VHDX-Compact/blob/main/wsl_compactor.ps1). Open an elevated PowerShell or Command Prompt and navigate to the script’s folder. With just the command below, you will be able to run it and free up some disk space:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\wsl_compactor.ps1
```

### Step 1: Find out installed WSL2 distributions

One of the main challenges is to find the Linux distributions available on the host system. Let’s check the first block and see what’s it about:

```powershell
$lxssKey = 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss'
$distros = Get-ChildItem $lxssKey | ForEach-Object {
    $p = Get-ItemProperty $_.PSPath
    [PSCustomObject]@{
        Name     = $p.DistributionName
        BasePath = $p.BasePath
    }
}
```

WSL records each distribution under this windows registry key:

```
HKCU:\Software\Microsoft\Windows\CurrentVersion\Lxss
```

Each subkey has two important values:

- **DistributionName** (for example, Ubuntu)
- **BasePath** (This is where the distribution files are stored. It’s the directory that contains the `ext4.vhdx` file.)

The script uses `Get-ChildItem` and `Get-ItemProperty` to enumerate these subkeys and build a list of available Linux distributions.

```powershell
if ($distros.Count -eq 0) {
Throw-And-Exit "No WSL distros found in the registry."
}
```

If no distributions are found, the script terminates and prints this error message on the terminal: `"No WSL distros found in the registry.”`

### Step 2: Select a distro to compact

Here, the process has two steps:

- If multiple distros are found, it displays all the distros with a numbered menu and prompts you to choose one:

```powershell
if ($distros.Count -gt 1) {
    Write-Host "Multiple distros detected. Please choose one:`n"

    for ($i = 0; $i -lt $distros.Count; $i++) {
        Write-Host "[$($i+1)] $($distros[$i].Name)"
    }
    $selected = $distros[[int]$choice - 1]
}
```

The computed menu will look like this:

```md
Multiple distros detected. Please choose one:

[1] Ubuntu 20.04

[2] Debian

[3] Alpine
```

- If only one distribution is found on the host system, the script selects it automatically:

```powershell
else {
$selected = $distros[0]
}
```

When setting up a distribution, whether chosen manually by the user or selected automatically, **the important information is the path to each distribution's virtual hard disk**. This path is saved in two main variables: `'distro'` (which identifies the specific distribution) and `'basePath'` (which shows where its virtual disk is located).

```powershell
$distro = $selected.Name
$basePath = $selected.BasePath

Write-Host "`nSelected distro: $distro" -ForegroundColor DarkYellow
Write-Host "BasePath: $basePath"
```

The lines above display an output that looks like this:

```md
Selected distro: Ubuntu (or any other distro)
BasePath: C:\Users\<User_name>\AppData\Local\Packages\…
```

Like for all other steps, it’s important to consider the case of something going wrong, by throwing an error and exiting the program:

```powershell
if (-not (Test-Path $basePath)) {
Throw-And-Exit "BasePath '$basePath' does not exist on disk."
}
```

### Step 3: Locate the ext4.vhdx File

In the first step, we collected the information we need about the available distributions and where they are stored on the Windows system. By choosing an entry (either manually or automatically), we can find the correct file. Sometimes, the ext4 file is located between the base path and a *LocalState* folder. This script manages both situations. It builds the usual locations where the file can be found.

They look like this:

- `$BasePath\ext4.vhdx`
- `$BasePath\LocalState\ext4.vhdx`

This can translate into something like this on your system (option 1):

```plaintext
C:\Users\Alice\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu20.04onWindows_79rhkp1fndgsc\ext4.vhdx
```

or like this (option 2):

```plaintext
C:\Users\Alice\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu20.04onWindows_79rhkp1fndgsc\LocalState\ext4.vhdx
```

(You might find out that your WSL2 distro is located in some other directory than “Packages” - but don’t worry, your BasePath will match the correct folders).

The idea is to build the two possible path options:

```powershell
$possible = @(
Join-Path $basePath 'ext4.vhdx'
Join-Path $basePath 'LocalState\ext4.vhdx'
)
```

And pick the first one that actually contains the file:

```powershell
$vhdx = $possible | Where-Object { Test-Path $_ } | Select-Object -First 1
```

Again, we throw an error message if no suitable file is found:

```powershell
if (-not $vhdx) {
Throw-And-Exit "No ext4.vhdx found under '$basePath'."
}
```

### Step 4: The confirmation prompt

Disk management tools require caution and you need to understand the potential consequences of your actions. A confirmation prompt is always a good safeguard to prevent accidental data loss or unwanted system changes.

Before proceeding, the script shows you:

- a Distro name
- its BasePath
- the VHDX file path

```powershell
Write-Host "`nAbout to compact this WSL distro:" -ForegroundColor Magenta
Write-Host " Distro : $distro"
Write-Host " BasePath : $basePath"
Write-Host " VHDX file: $vhdx`n"
```

It then prompts **“Are you sure you want to proceed? (Y/N)”:**

```powershell
Write-Host "Are you sure you want to proceed? (Y/N) " -ForegroundColor DarkCyan -NoNewline

# Then read the response
$answer = Read-Host
```

You’re then prompted to Type Y (case-insensitive) to continue or anything else to cancel.

```powershell
if ($answer.ToUpper() -ne 'Y') {
    Write-Warning "Operation canceled"
    exit
}
```

For the two steps above, I had to use a trick to print the question in color but a simple option (without colors) could be:

```powershell
if ((Read-Host 'Are you sure you want to proceed? (Y/N)').ToUpper() -ne 'Y') { 
    Write-Warning 'Operation canceled'
    exit 
}
```

### Step 5: Shut down WSL and compact

Before proceeding to the DiskPart utility, it’s important to stop all running WSL instances. Pass the shutdown command directly in PowerShell.

```powershell
Write-Host "Shutting down WSL…" -ForegroundColor Cyan
wsl.exe -shutdown
```

A common mistake is to forget to launch PowerShell or the Command Prompt with Administrator rights. You can prevent this case with a message:

```powershell
if ($LASTEXITCODE -ne 0) {
     Throw-And-Exit "Failed to shut down WSL (exit code $LASTEXITCODE). Are you running as Administrator?"
}
```

### Step 6: Run a DiskPart script

#### Building the script

The process is the same as in the manual part, but this time, we ‘inject’ the ready-to-go DiskPart commands into the script.

```powershell
$dpScript = @"
select vdisk file="$vhdx"
attach vdisk readonly
compact vdisk
detach vdisk
exit
"@
```

Before launching, there are two steps you need to take:

::: tabs

@tab:active 1.

The PowerShell script writes the lines above to a temporary file:

```powershell
$tempFile = [IO.Path]::GetTempFileName()
Set-Content -LiteralPath $tempFile -Value $dpScript -Encoding ASCII
```

This is the equivalent to the commands passed in the manual part:

```sh
select vdisk file="`[`C:`](/news/home/C:/)`…\ext4.vhdx" # full path to the vdisk file
attach vdisk readonly
compact vdisk
detach vdisk
exit
```

@tab 2.

Compacting can take a while, especially if you’ve never de-cluttered your virtual drive before. It’s wise to show a warning before proceeding:

```powershell
Write-Host "Running DiskPart to compact the VHDX. Be patient, this might take a while..." -ForegroundColor Cyan
```

:::

#### Invoke DiskPart:

```powershell
# Run DiskPart with the script saved to the temporary file and process each output line as it arrives
diskpart /s $tempFile | ForEach-Object {
    # Grab any "NN percent" type message from the line
    if ($_ -match '(\d+)\s+percent') {
        # Only print when the percentage actually changes
        Write-Host "$($Matches[1])% completed"
    }
    else {
        # Just echo all over line-types, verbatim
        Write-Host $_
    }
}
```

Several points to note here:

- It runs `diskpart /s $tempFile`: DiskPart reads and executes commands from the temporary file into the PowerShell loop for on-the-fly processing.
- For a better user-experience: the snippet below does the trick of filtering out repeated status values by comparing `$pct` with the sentinel `$lastPct`, and only writing new lines when they differ.

How?

Before entering the loop, we initialize:

```powershell
$lastPct with -1
$lastPct = -1 # We initiate a sentinel value
```

We are having a guaranteed “first” value that no real percent (0-100) will equal. That way, as soon as you see the first 0 percent, 10 percent, or whatever, it differs from -1. Then:

```powershell
if ($_ -match '(\d+)\s+percent') {
    # Print only when the percentage changes
    Write-Host "$($Matches[1])% completed"
}
```

This guarantees that on the very first percentage update (say “0 percent” or “10 percent”), `$pct -ne $lastPct` will be `true`, so it emits the first line. Afterwards, `$lastPct` holds the last real percentage, and it only prints again when a new, different progress percentage comes in.

The output looks more clean:

```plaintext title="output"
10% completed
20% completed
…
```

Otherwise, it’ll flood the screen with dozens of identical “20 percent completed” (for example) updates.

Of course we handle the case of other values (non percent lines) normally:

```powershell
else {
    # non-percent lines: print verbatim
    if ($_ -match '\S') {
        Write-Host $_
    }
}
```

Once the process is done, don’t forget to clean up the tempfile.

```powershell
Remove-Item $tempFile -ErrorAction SilentlyContinue
```

By the end of the process, you should see something like this

```md
Leaving DiskPart...
```

Okay, that’s it for the scripting! If you collected all the snippets so far, just save them with a `.ps1` file extension, or download the full example from this [GitHub repository (<FontIcon icon="iconfont icon-github"/>`brooks-code/WSL-VHDX-Compact`)](https://github.com/brooks-code/WSL-VHDX-Compact).

### Usage

You now have a complete understanding of what's happening. Ready to get started? In Windows, open the Command Prompt or PowerShell **as an administrator.**

- Navigate to the directory containing your `.ps1` script.
- Execute the script with the following command, replacing `<File_name_here>` with your actual file name:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\<File_name_here>.ps1
```

The `-NoProfile -ExecutionPolicy Bypass` parameters launch PowerShell in a clean, unrestricted environment that ignores user-specific settings and allows script execution without security restrictions. Don’t worry, in this case, it’s okay to do that.

*Wait…wait…wait...*

![Screenshot of a command line interface showing the execution of a PowerShell script to compact a WSL (Windows Subsystem for Linux) distro. The script confirms the selected distro "Ubuntu" and proceeds to compact the VHDX file using DiskPart. Progress is shown in percentage increments, with final messages indicating successful completion of the compacting process.](https://cdn.hashnode.com/res/hashnode/image/upload/v1754315563256/a709192a-6626-4a12-b411-46c8591c5eb6.jpeg)

Well bravo! You’ve just reclaimed all that unused space inside your WSL2 (almost) hands free!

Now, you can take it a step further by modifying this script to run completely automatically, without the confirmation prompt (step 4). You can also schedule it as a regular maintenance task using a task scheduler:

```powershell
schtasks /create /tn "Schedule_name" /tr "powershell.exe -ExecutionPolicy Bypass -File C:\path\to\script.ps1" /sc monthly /d 15 /st 09:00
```

This is an example for a monthly execution where `/d 15` means 15th of each month and `/st 09:00` is a start time set at 9 am.

That's it! Remember, regular maintenance, whether you do it manually or automatically, is essential to prevent unnecessary disk space usage and ensure a smooth experience with WSL.

### Thanks for reading

You can find a list of my current projects on [GitHub (<FontIcon icon="iconfont icon-github"/>`brooks-code`)](https://github.com/brooks-code?tab=repositories).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Free Up and Automatically Manage Disk Space for WSL on Windows 10/11",
  "desc": "Windows Subsystem for Linux (WSL) lets you run a Linux environment directly on Windows. This is particularly useful for web development where you can develop and test applications in a Linux environment without leaving Windows. You can even run freeC...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-free-up-and-automatically-manage-disk-space-for-wsl-on-windows-1011.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
