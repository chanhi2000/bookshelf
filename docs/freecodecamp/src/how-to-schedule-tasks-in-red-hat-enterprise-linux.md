---
lang: en-US
title: "How to Schedule Tasks in Red Hat Enterprise Linux"
description: "Article(s) > How to Schedule Tasks in Red Hat Enterprise Linux"
icon: fa-brands fa-redhat
category:
  - DevOps
  - Linux
  - Fedora
  - Red Hat
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - linux
  - fedora
  - redhat
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Schedule Tasks in Red Hat Enterprise Linux"
    - property: og:description
      content: "How to Schedule Tasks in Red Hat Enterprise Linux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-schedule-tasks-in-red-hat-enterprise-linux.html
prev: /devops/linux-fedora/articles/README.md
date: 2025-06-26
isOriginal: false
author:
  - name: Hang Hu
    url : https://freecodecamp.org/news/author/huhuhang/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750869114329/79072c41-988a-41f2-9e2f-25618d78fefc.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Linux - Fedroa > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/linux-fedora/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Schedule Tasks in Red Hat Enterprise Linux"
  desc="Red Hat Enterprise Linux (RHEL) is a leading enterprise-grade Linux distribution widely regarded as the gold standard for mission-critical server environments. It provides robust, secure, and scalable solutions for organizations ranging from small bu..."
  url="https://freecodecamp.org/news/how-to-schedule-tasks-in-red-hat-enterprise-linux"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750869114329/79072c41-988a-41f2-9e2f-25618d78fefc.png"/>

Red Hat Enterprise Linux (RHEL) is a leading enterprise-grade Linux distribution widely regarded as the gold standard for mission-critical server environments. It provides robust, secure, and scalable solutions for organizations ranging from small businesses to Fortune 500 companies, powering everything from web servers and databases to cloud infrastructure and containerized applications.

You can use RHEL's task scheduling capabilities in scenarios like automating system maintenance (for example, log rotation or backup operations), managing routine administrative tasks (like user account cleanup or security updates), or orchestrating complex workflows in enterprise environments. These scheduling tools are essential for maintaining system health and ensuring that critical operations run without manual intervention.

For system administrators, think of task scheduling as the backbone of automated system management, enabling you to set up processes that run reliably in the background while you focus on more strategic initiatives. Its power lies in its flexibility and reliability, making it an indispensable skill for anyone managing Linux systems in production environments.

In this tutorial, you’ll learn how to schedule tasks in Red Hat Enterprise Linux using various built-in tools and techniques. This content is part of **Schedule Future Tasks**, which is Chapter 2 of the [<VPIcon icon="fas fa-globe"/>Red Hat System Administration (RH134) course](https://labex.io/courses/red-hat-system-administration-rh134-labs). RH134 is a fundamental course for the Red Hat Certified System Administrator (RHCSA) certification, one of the most respected credentials in the Linux administration field.

This hands-on tutorial provides practical experience with the scheduling concepts covered in the RH134 curriculum, giving you the skills needed to automate tasks effectively in enterprise RHEL environments.

::: note Prerequisites

This tutorial is designed to be beginner-friendly! You just need basic familiarity with using the Linux command line. If you can navigate directories and run simple commands, you're ready to start.

For those looking to deepen their RHEL knowledge, the [<VPIcon icon="fas fa-globe"/>RHEL Skill Tree](https://labex.io/skilltrees/rhel) offers comprehensive hands-on labs including [<VPIcon icon="fas fa-globe"/>RH124](https://labex.io/courses/red-hat-system-administration-rh124-labs), [<VPIcon icon="fas fa-globe"/>RH134](https://labex.io/courses/red-hat-system-administration-rh134-labs), [<VPIcon icon="fas fa-globe"/>RH294](https://labex.io/courses/red-hat-enterprise-linux-automation-with-ansible-rh294), and other courses for RHCSA and RHCE certifications.

Don't worry if you're new to Red Hat Enterprise Linux - I'll explain everything step by step, and these concepts work on most Linux distributions too.

:::

---

## How to Schedule a One-time Job with `at`

First, let’s learn how to schedule a job to run once at a future time using the `at` command. The `at` command is useful for executing commands that don’t need to be run repeatedly. We will schedule a simple job, inspect its details, and then remove it.

In this tutorial, we will work directly on the local system to learn task scheduling. You’ll execute all commands in your current terminal environment.

Let's schedule a job to print the current date and time into a file named <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`myjob.txt` in your home directory. We'll schedule it to run 3 minutes from now:

```sh
at now + 3 minutes << EOF
date > ~/myjob.txt
EOF
```

The `warning: commands will be executed using /bin/sh` message is normal. The `job N at ...` output indicates the job number and the scheduled execution time. Make a note of the job number, as you will need it later.

Next, let's schedule another job interactively. This method is useful for entering multiple commands or more complex scripts. We will schedule a job to append "Hello from at job!" to <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`at_output.txt` 5 minutes from now:

```sh
at now + 5 minutes
```

After typing the command and pressing Enter, you will see an `at>` prompt. Type your command and then press <kbd>Ctrl</kbd>+<kbd>d</kbd> to finish:

```sh
at > echo "Hello from at job!" >> ~/at_output.txt
at > Ctrl+d
```

To view the jobs currently in the `at` queue, use the `atq` command. This command lists all pending `at` jobs for the current user.

```sh
atq
```

The output will show the job number, the scheduled time, the queue, and the user who scheduled it.

![Output of atq command showing scheduled jobs](https://cdn.hashnode.com/res/hashnode/image/upload/v1750726190789/d2dd54c0-80a0-4bb2-8561-3114bb279387.png)

You can inspect the commands that a specific `at` job will run using the `at -c` command followed by the job number. Replace `N` with one of the job numbers you noted earlier.

```sh
at -c N
```

This command will display the shell script that `at` will execute for that job. You should see the `date > ~/myjob.txt` or `echo "Hello from at job!" >> ~/at_output.txt` command within the output.

Finally, to remove a scheduled `at` job, use the `atrm` command followed by the job number. Let's remove the first job we scheduled. Replace `N` with the job number of your first job.

```sh
atrm N
```

After removing the job, you can use `atq` again to verify that it is no longer in the queue.

```sh
atq
```

You should now only see the second job (if it hasn't executed yet) or an empty queue if both jobs have been removed or executed.

This completes the first step of scheduling one-time jobs with the `at` command.

---

## How to Manage 'at' jobs

Now, let’s delve deeper into managing `at` jobs, including scheduling jobs with different queues and verifying their execution. Understanding `at` queues can be useful for prioritizing tasks or separating different types of one-time jobs.

We will continue working on the local system to explore more advanced `at` job management features.

The `at` command allows you to specify a queue using the `-q` option. Queues are single letters from `a` to `z`. Queue `a` is the default, and jobs in queues `a` through `z` are executed with decreasing niceness (priority). Queue `a` has the highest priority, and queue `z` has the lowest. Queue `b` is reserved for batch jobs.

Let's schedule a job in queue `g` (a lower priority queue) to run in 2 minutes. This job will create a file named <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`queue_g_job.txt` with a timestamp:

```sh
at -q g now + 2 minutes << EOF
date > ~/queue_g_job.txt
EOF
```

You will see output similar to `job N at ...`. Note down this job number.

Next, let's schedule another job, this time in queue `b` (batch queue), which is typically used for jobs that can run when system load is low. This job will append "Batch job executed!" to <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`batch_job.txt`. We'll schedule it to run 4 minutes from now:

```sh
at -q b now + 4 minutes << EOF
echo "Batch job executed!" >> ~/batch_job.txt
EOF
```

Again, note down the job number.

To see all pending jobs, including those in different queues, use `atq`.

```sh
atq
```

You should now see both jobs listed, with their respective queue letters (`g` and `b`).

![Output of atq command showing scheduled jobs](https://cdn.hashnode.com/res/hashnode/image/upload/v1750726218380/bcc9d551-0530-48d1-bf7f-46073c6f77a6.png)

Now, wait for your scheduled jobs to execute. Wait for at least 5 minutes to allow all jobs to complete. You can check if the files created by your `at` jobs exist and contain the expected content.

Check <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`queue_g_job.txt`:

```sh
cat ~/queue_g_job.txt
```

You should see a date and time string.

Check <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`batch_job.txt`:

```sh
cat ~/batch_job.txt
```

You should see "Batch job executed!".

If the files are not present or empty, it might mean the jobs haven't executed yet, or there was an issue with the command. You can re-check `atq` to see if they are still pending.

---

## How to Schedule Recurring User Jobs with 'crontab'

Next, you’ll learn how to schedule recurring tasks for a specific user using `crontab`. Unlike `at` jobs, which run once, `cron` jobs run repeatedly at specified intervals. This is ideal for routine maintenance, data backups, or generating reports.

We will continue working on the local system to learn about user crontab management.

The `crontab` command allows users to create, edit, and view their own `cron` jobs. Each user has their own `crontab` file.

To edit your `crontab` file, use the `crontab -e` command. This will open your `crontab` file in the default text editor (usually `vim`).

```sh
crontab -e
```

**Vim editor instructions:**

- Press `i` to enter insert mode (you'll see `-- INSERT --` at the bottom)
- Use arrow keys to navigate
- To save and exit: Press <kbd>Esc</kbd> to exit insert mode, then type `:wq` and press <kbd>Enter</kbd>
- To exit without saving: Press <kbd>Esc</kbd>, then type `:q!` and press <kbd>Enter</kbd>

Inside the editor, you will add a new line to define your `cron` job. A `cron` entry has five time-and-date fields, followed by the command to be executed. The fields are:

- **Minute (0-59)**
- **Hour (0-23)**
- **Day of Month (1-31)**
- **Month (1-12)**
- **Day of Week (0-7, where 0 or 7 is Sunday)**

You can use `*` as a wildcard to mean "every" for a field, or `/` to specify step values (for example, `*/5` for every 5 minutes).

Let's schedule a job that appends the current date and time to a file named <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`my_cron_log.txt` every minute. This will allow us to quickly observe the `cron` job in action.

Follow these steps in Vim:

::: tabs

@tab:active 1.

Press <kbd>i</kbd> to enter insert mode

@tab 2.

Add the following line to the `crontab` file:

```plaintext
* * * * * /usr/bin/date >> ~/my_cron_log.txt
```

@tab 3.

Press <kbd>Esc</kbd> to exit insert mode

@tab 4.

Type `:wq` and press <kbd>Enter</kbd> to save and exit

You should see a message indicating that a new `crontab` has been installed:

```plaintext
crontab: installing new crontab
```

To verify that your `cron` job has been successfully added, you can list your `crontab` entries using the `crontab -l` command:

```sh
crontab -l
```

You should see the line you just added:

```plaintext
* * * * * /usr/bin/date >> ~/my_cron_log.txt
```

Now, wait for a minute or two to allow the `cron` job to execute at least once. You can check the current time to see when the next minute mark will occur:

```sh
date
```

After waiting for at least two minutes to allow the cron job to execute a couple of times, check the content of the `~/my_cron_log.txt` file.

```sh
cat ~/my_cron_log.txt
```

You should see one or more lines, each containing a date and time, indicating that your `cron` job has executed.

![Cron job output in log file](https://cdn.hashnode.com/res/hashnode/image/upload/v1750726409656/bfd85cf0-316a-4c1d-89c2-0d60c30cd33f.png)

```plaintext
Mon Apr 8 10:30:01 AM EDT 2025
Mon Apr 8 10:31:01 AM EDT 2025
```

---

## How to Manage User 'crontab' Entries

Now you will learn more advanced techniques for managing user `crontab` entries, including editing existing jobs, adding multiple jobs, and understanding special `cron` strings. Effective `crontab` management is crucial for automating routine tasks.

We will continue working on the local system to explore advanced crontab management techniques.

Let's start by adding a new `cron` job. This job will append "Hello from cron!" to <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`cron_messages.txt` every two minutes.

Open your `crontab` for editing:

```sh
crontab -e
```

In Vim:

::: tabs

@tab:active 1.

Press <kbd>i</kbd> to enter insert mode

@tab 2.

Add the following line to the `crontab` file:

```plaintext title="crontab"
*/2 * * * * echo "Hello from cron!" >> ~/cron_messages.txt
```

@tab 3.

Press <kbd>Esc</kbd> to exit insert mode

@tab 4.

Type `:wq` and press <kbd>Enter</kbd> to save and exit

:::

Verify that the entry is added:

```sh
crontab -l
```

You should see the newly added line.

Now, let's add another `cron` job that runs daily at 08:00 AM. This job will record the disk usage of your home directory to <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`disk_usage.log`.

Open your `crontab` for editing again:

```sh
crontab -e
```

In Vim:

::: tabs

@tab:active 1.

Press `i` to enter insert mode

@tab 2.

Add the following line below the previous one:

```plaintext
0 8 * * * du -sh ~ >> ~/disk_usage.log
```

@tab 3.

Press <kbd>Esc</kbd> to exit insert mode

@tab 4.

Type `:wq` and press <kbd>Enter</kbd> to save and exit

:::

Verify that both entries are present:

```sh
crontab -l
```

You should now see both `cron` jobs listed.

`cron` also supports special strings that can simplify common schedules. These include `@reboot`, `@yearly`, `@annually`, `@monthly`, `@weekly`, `@daily`, `@midnight`, and `@hourly`. For example, `@hourly` is equivalent to `0 * * * *`.

Let's add a job that runs hourly and records the system uptime to <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`uptime_log.txt`.

Open your `crontab` for editing:

```sh
crontab -e
```

In Vim:

::: tabs

@tab:active 1.

Press `i` to enter insert mode

@tab 2.

Add the following line:

```sh
@hourly uptime >> ~/uptime_log.txt
```

@tab 3.

Press <kbd>Esc</kbd> to exit insert mode

@tab 4.

Type `:wq` and press <kbd>Enter</kbd> to save and exit

:::

Verify all three entries:

```sh
crontab -l
```

You should now see all three `cron` jobs.

To demonstrate the effect of these jobs, we will wait for a short period. Since the jobs are scheduled at different intervals, we won't see all of them execute immediately, but we can verify the setup.

Wait for at least 3 minutes to allow the `*/2` job to run at least once.

Check the <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`cron_messages.txt` file:

```sh
cat ~/cron_messages.txt
```

You should see at least one "Hello from cron!" message.

```plaintext
Hello from cron!
```

The <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`disk_usage.log` and <VPIcon icon="fas fa-folder-open"/>`~/`<VPIcon icon="fas fa-file-lines"/>`uptime_log.txt` files might not be created yet, depending on the current time, as they are scheduled for daily and hourly execution, respectively. The important part is that their entries are correctly configured in your `crontab`.

---

## How to Schedule Recurring System Jobs with `cron` Directories

In this step, you will learn how to schedule recurring system-wide tasks using `cron` directories. Unlike user `crontab` entries, which are specific to a user, system `cron` jobs are managed by the root user and affect the entire system. These are typically used for system maintenance, log rotation, and other administrative tasks.

We will continue working on the local system to explore system-wide cron job configuration.

System-wide `cron` jobs are defined in <VPIcon icon="fas fa-folder-open"/>`/etc/crontab` or by placing scripts in specific directories:

- <VPIcon icon="fas fa-folder-open"/>`/etc/cron.hourly/`: Scripts in this directory run once an hour.
- <VPIcon icon="fas fa-folder-open"/>`/etc/cron.daily/`: Scripts in this directory run once a day.
- <VPIcon icon="fas fa-folder-open"/>`/etc/cron.weekly/`: Scripts in this directory run once a week.
- <VPIcon icon="fas fa-folder-open"/>`/etc/cron.monthly/`: Scripts in this directory run once a month.

These directories are processed by the `run-parts` utility, which executes all executable files within them.

To manage system `cron` jobs, you need root privileges. Since the labex user has sudo access, we can use `sudo` for the required commands.

Let's create a simple script that logs a message to the system log. We will place this script in <VPIcon icon="fas fa-folder-open"/>`/etc/cron.hourly/` to make it run hourly.

First, create the script file <VPIcon icon="fas fa-folder-open"/>`/etc/cron.hourly/`<VPIcon icon="fas fa-file-lines"/>`my_hourly_script`:

```sh
sudo nano /etc/cron.hourly/my_hourly_script
```

Add the following content to the file:

```sh
#!/bin/bash
logger "Hourly cron job executed at $(date)"
```

Save and exit the editor (<kbd>Ctrl</kbd>+<kbd>o</kbd>, <kbd>Enter</kbd>, <kbd>Ctrl</kbd>+<kbd>x</kbd> in `nano`).

Next, you need to make the script executable. Without execute permissions, `run-parts` will ignore it.

```sh
sudo chmod +x /etc/cron.hourly/my_hourly_script
```

Now, let's verify that the script is executable:

```sh
ls -l /etc/cron.hourly/my_hourly_script
```

You should see `x` in the permissions, for example: `-rwxr-xr-x`.

Since `cron.hourly` jobs run once an hour, we can't wait for a full hour to verify its execution in this tutorial. But we can manually trigger the `run-parts` command for the hourly directory to simulate its execution.

```sh
sudo run-parts /etc/cron.hourly/
```

This command will execute all executable scripts in <VPIcon icon="fas fa-folder-open"/>`/etc/cron.hourly/`. The script we created uses the `logger` command to write messages to the system log.

In a real RHEL system, you would be able to check the system logs using `journalctl` or <VPIcon icon="fas fa-folder-open"/>`/var/log/messages` to verify that the script executed successfully.

This completes the system cron job management step. The script will remain in place and would execute hourly in a real system environment.

---

## How to Configure `systemd` Timers for Recurring Tasks

Next, you will learn about `systemd` timers, which are a modern alternative to `cron` for scheduling tasks on Linux systems. `systemd` timers offer more flexibility and better integration with the `systemd` ecosystem.

`systemd` timers work in conjunction with `systemd` service units. A timer unit (`.timer` file) defines when a task should run, and a service unit (`.service` file) defines what task should be executed.

We will continue working on the local system to explore systemd timer configuration.

You will need root privileges to create `systemd` unit files in system directories. Since the labex user has sudo access, we can use `sudo` for the required commands.

Let's create a simple service that logs a message to a file. We will place this service unit file in <VPIcon icon="fas fa-folder-open"/>`/etc/systemd/system/` which is where custom service units are typically stored.

Create the service unit file <VPIcon icon="fas fa-folder-open"/>`/etc/systemd/system/`<VPIcon icon="fas fa-gears"/>`my-custom-task.service`:

```sh
sudo nano /etc/systemd/system/my-custom-task.service
```

Add the following content to the file:

```ini
[Unit]
Description=My Custom Scheduled Task

[Service]
Type=oneshot
ExecStart=/bin/bash -c 'echo "My custom task executed at $(date)" >> /var/log/my-custom-task.log'
```

Save and exit the editor (<kbd>Ctrl</kbd>+<kbd>o</kbd>, <kbd>Enter</kbd>, <kbd>Ctrl</kbd>+<kbd>x</kbd> in `nano`).

Next, create the timer unit file <VPIcon icon="fas fa-folder-open"/>`/etc/systemd/system/`<VPIcon icon="fas fa-file-lines"/>`my-custom-task.timer`. This timer will activate our service every 5 minutes.

```sh
sudo nano /etc/systemd/system/my-custom-task.timer
```

Add the following content to the file:

```ini
[Unit]
Description=Run My Custom Scheduled Task every 5 minutes

[Timer]
OnCalendar=*:0/5
Persistent=true

[Install]
WantedBy=timers.target
```

Save and exit the editor.

**Explanation of** `OnCalendar`:

- `*:0/5` means "every 5 minutes".
  - `*` for year, month, day, hour (any value).
  - `0/5` for minute, meaning starting at minute 0, every 5 minutes (0, 5, 10, ..., 55).

In a typical `systemd` environment, you would now run `systemctl daemon-reload` to make `systemd` aware of the new unit files, and then `systemctl enable --now my-custom-task.timer` to start the timer.

Let's verify the existence of the created files:

```sh
ls -l /etc/systemd/system/my-custom-task.service
ls -l /etc/systemd/system/my-custom-task.timer
```

You should see output indicating that both files exist.

To simulate the execution of the service, you can manually run the command defined in `ExecStart`:

```sh
sudo /bin/bash -c 'echo "My custom task executed at $(date)" >> /var/log/my-custom-task.log'
```

Now, check the log file to see the output:

```sh
sudo cat /var/log/my-custom-task.log
```

You should see the message you just logged:

```plaintext
My custom task executed at Tue Jun 10 06:54:40 UTC 2025
```

This completes the systemd timer configuration step. The service and timer unit files will remain in place for reference.

---

## How to Manage Temporary Files with** `systemd-tmpfile

Now you’ll learn how to manage temporary files and directories using `systemd-tmpfiles`. This utility is part of `systemd` and is responsible for creating, deleting, and cleaning up volatile and temporary files and directories. It's commonly used to manage <VPIcon icon="fas fa-folder-open"/>`/tmp`, <VPIcon icon="fas fa-folder-open"/>`/var/tmp`, and other temporary storage locations, ensuring that old files are removed periodically.

We will continue working on the local system to explore systemd-tmpfiles configuration.

You will need root privileges to configure `systemd-tmpfiles`. Since the labex user has sudo access, we can use `sudo` for the required commands.

`systemd-tmpfiles` reads configuration files from <VPIcon icon="fas fa-folder-open"/>`/etc/tmpfiles.d/` and <VPIcon icon="fas fa-folder-open"/>`/usr/lib/tmpfiles.d/`. These files define rules for creating, deleting, and managing files and directories.

Let's create a custom configuration file to manage a new temporary directory. We will create a directory <VPIcon icon="fas fa-folder-open"/>`/run/my_temp_dir` and configure `systemd-tmpfiles` to clean files older than 1 minute from it.

Create the configuration file <VPIcon icon="fas fa-folder-open"/>`/etc/tmpfiles.d/`<VPIcon icon="fas fa-file-lines"/>`my_temp_dir.conf`:

```sh
sudo nano /etc/tmpfiles.d/my_temp_dir.conf
```

Add the following content to the file:

```sh title="/etc/tmpfiles.d/my_temp_dir.conf"
d /run/my_temp_dir 0755 labex labex 1m
```

::: info Explanation of the line:

- `d`: Specifies that this entry defines a directory.
- `/run/my_temp_dir`: The path to the directory.
- `0755`: The permissions for the directory.
- `labex labex`: The owner and group for the directory.
- `1m`: The age after which files in this directory should be deleted (1 minute).

:::

Save and exit the editor (<kbd>Ctrl</kbd>+<kbd>o</kbd>, <kbd>Enter</kbd>, <kbd>Ctrl</kbd>+<kbd>x</kbd> in `nano`).

Now, let's tell `systemd-tmpfiles` to apply this configuration. The `--create` option will create the directory if it doesn't exist.

```sh
sudo systemd-tmpfiles --create /etc/tmpfiles.d/my_temp_dir.conf
```

Verify that the directory has been created with the correct permissions and ownership:

```sh
ls -ld /run/my_temp_dir
```

You should see output similar to:

```plaintext
drwxr-xr-x 2 labex labex 6 Jun 10 06:55 /run/my_temp_dir
```

Next, let's create a test file inside this new temporary directory:

```sh
sudo touch /run/my_temp_dir/test_file.txt
```

Verify the file exists:

```sh
ls -l /run/my_temp_dir/test_file.txt
```

Now, we need to wait for more than 1 minute for the file to become "old" according to our configuration. Wait for at least 70 seconds (1 minute and 10 seconds).

After waiting for more than 1 minute, we will manually run `systemd-tmpfiles` with the `--clean` option to trigger the cleanup process based on our configuration.

```sh
sudo systemd-tmpfiles --clean /etc/tmpfiles.d/my_temp_dir.conf
```

Finally, check if the <VPIcon icon="fas fa-file-lines"/>`test_file.txt` has been removed:

```sh
ls -l /run/my_temp_dir/test_file.txt
```

You should get a "No such file or directory" error, indicating that `systemd-tmpfiles` successfully cleaned up the old file.

This completes configuring the systemd-tmpfiles. The configuration file and temporary directory will remain in place for reference.

---

## Summary

In this tutorial, you learned how to schedule and manage one-time tasks using the `at` command, including scheduling jobs interactively and non-interactively, viewing the `at` queue with `atq`, and deleting pending jobs with `atrm`. You also learned how to schedule recurring user-specific tasks using `crontab`, including how to edit, list, and remove cron jobs, and you learned the cron syntax for specifying execution times.

We also demonstrated how to schedule system-wide recurring tasks by placing scripts in standard cron directories (<VPIcon icon="fas fa-folder-open"/>`/etc/cron.hourly`, <VPIcon icon="fas fa-folder-open"/>`/etc/cron.daily`, etc.) and how to create custom cron jobs in <VPIcon icon="fas fa-folder-open"/>`/etc/cron.d`.

Finally, you explored advanced task scheduling with `systemd` timers, learning to create and enable service and timer units for recurring tasks, and how to manage temporary files and directories using `systemd-tmpfiles` for automated cleanup.

This comprehensive tutorial provided practical experience in managing diverse task scheduling needs on RHEL systems, from simple one-off commands to complex recurring system processes.

To practice the operations from this tutorial, try the interactive hands-on lab: [<VPIcon icon="fas fa-globe"/>Schedule Tasks in Red Hat Enterprise Linux](https://labex.io/labs/rhel-schedule-tasks-in-red-hat-enterprise-linux-588897?course=red-hat-system-administration-rh134-labs).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Schedule Tasks in Red Hat Enterprise Linux",
  "desc": "Red Hat Enterprise Linux (RHEL) is a leading enterprise-grade Linux distribution widely regarded as the gold standard for mission-critical server environments. It provides robust, secure, and scalable solutions for organizations ranging from small bu...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-schedule-tasks-in-red-hat-enterprise-linux.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
