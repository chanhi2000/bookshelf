---
lang: en-US
title: "Scheduling Background Jobs With Quartz in .NET (advanced concepts)"
description: "Article(s) > Scheduling Background Jobs With Quartz in .NET (advanced concepts)"
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
      content: "Article(s) > Scheduling Background Jobs With Quartz in .NET (advanced concepts)"
    - property: og:description
      content: "Scheduling Background Jobs With Quartz in .NET (advanced concepts)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scheduling-background-jobs-with-quartz-in-dotnet-advanced-concepts.html
prev: /programming/cs/articles/README.md
date: 2024-12-21
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_121.png
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
  name="Scheduling Background Jobs With Quartz in .NET (advanced concepts)"
  desc="Quartz.NET is a powerful job scheduling library, but integrating it properly with ASP.NET Core requires careful consideration. Here's what I learned about setting up Quartz.NET with proper observability, persistence, and job scheduling patterns."
  url="https://milanjovanovic.tech/blog/scheduling-background-jobs-with-quartz-in-dotnet-advanced-concepts"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_121.png"/>

Most ASP.NET Core applications need to handle [background processing](/milanjovanovic.tech/running-background-tasks-in-asp-net-core.md) - from sending reminder emails to running cleanup tasks. While there are many ways to implement background jobs, [<FontIcon icon="fas fa-globe"/>Quartz.NET](https://quartz-scheduler.net/) stands out with its robust scheduling capabilities, persistence options, and production-ready features.

In this article, we'll look at:

- Setting up Quartz.NET with ASP.NET Core and proper observability
- Implementing both on-demand and recurring jobs
- Configuring persistent storage with PostgreSQL
- Handling job data and monitoring execution

Let's start with the basic setup and build our way up to a production-ready configuration.

---

## Setting Up Quartz With ASP.NET Core

First, let's set up Quartz with proper instrumentation.

We'll need to install some NuGet packages:

```powershell
Install-Package Quartz.Extensions.Hosting
Install-Package Quartz.Serialization.Json

# This might be in prerelease
Install-Package OpenTelemetry.Instrumentation.Quartz
```

Next, we'll configure the Quartz services and OpenTelemetry instrumentation and start the scheduler:

```cs :collapsed-lines
builder.Services.AddQuartz();

// Add Quartz.NET as a hosted service
builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
});

builder.Services.AddOpenTelemetry()
    .WithTracing(tracing =>
    {
        tracing
            .AddHttpClientInstrumentation()
            .AddAspNetCoreInstrumentation()
            .AddQuartzInstrumentation();
    })
    .UseOtlpExporter();
```

This is all we need at the start.

---

## Defining and Scheduling Jobs

To define a [background job](/milanjovanovic.tech/scheduling-background-jobs-with-quartz-net.md), you have to implement the `IJob` interface. All job implementations run as scoped services, so you can inject dependencies as needed. Quartz allows you to pass data to a job using the `JobDataMap` dictionary. It's recommended to only use primitive types for job data to avoid serialization issues.

When executing the job, there are a few ways to fetch job data:

- `JobDataMap` - a dictionary of key-value pairs
  - `JobExecutionContext.JobDetail.JobDataMap` - job-specific data
  - `JobExecutionContext.Trigger.TriggerDataMap` - trigger-specific data
- `MergedJobDataMap` - combines job data with trigger data

It's a best practice to use `MergedJobDataMap` to retrieve job data.

```cs :collapsed-lines title="EmailReminderJob.cs"
public class EmailReminderJob(ILogger<EmailReminderJob> logger, IEmailService emailService) : IJob
{
    public const string Name = nameof(EmailReminderJob);

    public async Task Execute(IJobExecutionContext context)
    {
        // Best practice: Prefer using MergedJobDataMap
        var data = context.MergedJobDataMap;

        // Get job data - note that this isn't strongly typed
        string? userId = data.GetString("userId");
        string? message = data.GetString("message");

        try
        {
            await emailService.SendReminderAsync(userId, message);

            logger.LogInformation("Sent reminder to user {UserId}: {Message}", userId, message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send reminder to user {UserId}", userId);

            // Rethrow to let Quartz handle retry logic
            throw;
        }
    }
}
```

One thing to note: `JobDataMap` isn't strongly typed. This is a limitation we have to live with, but we can mitigate it by:

1. Using constants for key names
2. Validating data early in the `Execute` method
3. Creating wrapper services for job scheduling

Now, let's discuss scheduling jobs.

Here's how to schedule one-time reminders:

```cs :collapsed-lines
public record ScheduleReminderRequest(
    string UserId,
    string Message,
    DateTime ScheduleTime
);

// Schedule a one-time reminder
app.MapPost("/api/reminders/schedule", async (
    ISchedulerFactory schedulerFactory,
    ScheduleReminderRequest request) =>
{
    var scheduler = await schedulerFactory.GetScheduler();

    var jobData = new JobDataMap
    {
        { "userId", request.UserId },
        { "message", request.Message }
    };

    var job = JobBuilder.Create<EmailReminderJob>()
        .WithIdentity($"reminder-{Guid.NewGuid()}", "email-reminders")
        .SetJobData(jobData)
        .Build();

    var trigger = TriggerBuilder.Create()
        .WithIdentity($"trigger-{Guid.NewGuid()}", "email-reminders")
        .StartAt(request.ScheduleTime)
        .Build();

    await scheduler.ScheduleJob(job, trigger);

    return Results.Ok(new { scheduled = true, scheduledTime = request.ScheduleTime });
})
.WithName("ScheduleReminder")
.WithOpenApi();

```

The endpoint schedules one-time email reminders using Quartz. It creates a job with user data, sets up a trigger for the specified time, and schedules them together. The `EmailReminderJob` receives a unique identity in the `email-reminders` group.

Here's a sample request you can use to test this out:

```plaintext
POST /api/reminders/schedule
{
    "userId": "user123",
    "message": "Important meeting!",
    "scheduleTime": "2024-12-17T15:00:00"
}
```

---

## Scheduling Recurring Jobs

For recurring background jobs, you can use [<FontIcon icon="fas fa-globe"/>cron schedules](https://quartz-scheduler.net/documentation/quartz-3.x/tutorial/crontriggers.html):

```cs :collapsed-lines
public record RecurringReminderRequest(
    string UserId,
    string Message,
    string CronExpression
);

// Schedule a recurring reminder
app.MapPost("/api/reminders/schedule/recurring", async (
    ISchedulerFactory schedulerFactory,
    RecurringReminderRequest request) =>
{
    var scheduler = await schedulerFactory.GetScheduler();

    var jobData = new JobDataMap
    {
        { "userId", request.UserId },
        { "message", request.Message }
    };

    var job = JobBuilder.Create<EmailReminderJob>()
        .WithIdentity($"recurring-{Guid.NewGuid()}", "recurring-reminders")
        .SetJobData(jobData)
        .Build();

    var trigger = TriggerBuilder.Create()
        .WithIdentity($"recurring-trigger-{Guid.NewGuid()}", "recurring-reminders")
        .WithCronSchedule(request.CronExpression)
        .Build();

    await scheduler.ScheduleJob(job, trigger);

    return Results.Ok(new { scheduled = true, cronExpression = request.CronExpression });
})
.WithName("ScheduleRecurringReminder")
.WithOpenApi();
```

Cron triggers are more powerful than simple triggers. They allow you to define complex schedules like "every weekday at 10 AM" or "every 15 minutes". Quartz supports cron expressions with seconds, minutes, hours, days, months, and years.

Here's a sample request if you want to test this:

```plaintext
POST /api/reminders/schedule/recurring
{
    "userId": "user123",
    "message": "Daily standup",
    "cronExpression": "0 0 10 ? * MON-FRI"
}
```

---

## Job Persistence Setup

By default, Quartz uses in-memory storage, which means your jobs are lost when the application restarts. For production environments, you'll want to use a persistent store. Quartz supports several [<FontIcon icon="fas fa-globe"/>database providers](https://quartz-scheduler.net/documentation/quartz-3.x/tutorial/job-stores.html), including SQL Server, PostgreSQL, MySQL, and Oracle.

Let's look at how to set up persistent storage with proper schema isolation:

```cs :collapsed-lines
builder.Services.AddQuartz(options =>
{
    options.AddJob<EmailReminderJob>(c => c
        .StoreDurably()
        .WithIdentity(EmailReminderJob.Name));

    options.UsePersistentStore(persistenceOptions =>
    {
        persistenceOptions.UsePostgres(cfg =>
        {
            cfg.ConnectionString = connectionString;
            cfg.TablePrefix = "scheduler.qrtz_";
        },
        dataSourceName: "reminders"); // Database name

        persistenceOptions.UseNewtonsoftJsonSerializer();
        persistenceOptions.UseProperties = true;
    });
});
```

A few important things to note here:

- The `TablePrefix` setting helps organize Quartz tables in your database - in this case, placing them in a dedicated `scheduler` schema
- You'll need to run the appropriate database scripts to create these tables
- Each database provider has its own [setup scripts (<FontIcon icon="iconfont icon-github"/>`quartznet/quartznet`)](https://github.com/quartznet/quartznet/tree/main/database/tables) - check the Quartz documentation for your chosen provider

### Durable Jobs

Notice how we're configuring the `EmailReminderJob` with `StoreDurably`? This is a powerful pattern that lets you define your jobs once and reuse them with different triggers. Here's how to schedule a stored job:

```cs :collapsed-lines
public async Task ScheduleReminder(string userId, string message, DateTime scheduledTime)
{
    var scheduler = await _schedulerFactory.GetScheduler();

    // Reference the stored job by its identity
    var jobKey = new JobKey(EmailReminderJob.Name);

    var trigger = TriggerBuilder.Create()
        .ForJob(jobKey)  // Reference the durable job
        .WithIdentity($"trigger-{Guid.NewGuid()}")
        .UsingJobData("userId", userId)
        .UsingJobData("message", message)
        .StartAt(scheduledTime)
        .Build();

    await scheduler.ScheduleJob(trigger);  // Note: just passing the trigger
}
```

This approach has several benefits:

- Job definitions are centralized in your startup configuration
- You can't accidentally schedule a job that hasn't been properly configured
- Job configurations are consistent across all schedules

---

## Summary

Getting **Quartz** set up properly in .NET involves more than just adding the NuGet package.

Pay attention to:

1. Proper job definition and data handling with `JobDataMap`
2. Setting up both one-time and recurring job schedules
3. Configuring persistent storage with proper schema isolation
4. Using durable jobs to maintain consistent job definitions

Each of these elements contributes to a reliable background processing system that can grow with your application's needs. A good example of using background jobs is when you want to [build asynchronous APIs](/milanjovanovic.tech/building-async-apis-in-aspnetcore-the-right-way.md).

Good luck out there, and I'll see you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scheduling Background Jobs With Quartz in .NET (advanced concepts)",
  "desc": "Quartz.NET is a powerful job scheduling library, but integrating it properly with ASP.NET Core requires careful consideration. Here's what I learned about setting up Quartz.NET with proper observability, persistence, and job scheduling patterns.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/scheduling-background-jobs-with-quartz-in-dotnet-advanced-concepts.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
