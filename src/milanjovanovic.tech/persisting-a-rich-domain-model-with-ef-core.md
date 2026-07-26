---
lang: en-US
title: "Persisting a Rich Domain Model With EF Core"
description: "Article(s) > Persisting a Rich Domain Model With EF Core"
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
      content: "Article(s) > Persisting a Rich Domain Model With EF Core"
    - property: og:description
      content: "Persisting a Rich Domain Model With EF Core"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogpersisting-a-rich-domain-model-with-ef-core.html
prev: /programming/cs/articles/README.md
date: 2026-08-08
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_206.png
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
  name="Persisting a Rich Domain Model With EF Core"
  desc="Every time I show a rich domain model, someone tells me it can't work with EF Core: ”EF needs public setters and a public constructor, so the anemic model is…"
  url="https://milanjovanovic.tech/blog/https:milanjovanovic.techblogpersisting-a-rich-domain-model-with-ef-core"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_206.png"/>

Whenever I write about [**refactoring an anemic domain model into a rich one**](/milanjovanovic.tech/from-anemic-models-to-behavior-driven-models-a-practical-ddd-refactor-in-csharp.md), one objection reliably appears in the replies:

> Nice in theory, but EF Core needs public setters and a public parameterless constructor. The ORM forces the anemic model on us.

It *was* true a decade ago. It is not true now: EF Core will happily persist a fully encapsulated aggregate, and the payoff is a domain model that [**enforces its invariants**](/milanjovanovic.tech/what-invariants-are-and-why-a-domain-model-is-the-best-place-to-enforce-them.md) in one place while the ORM quietly does its job.

![An anemic entity with public setters that any service can mutate, next to a rich aggregate where state is private and every change goes through methods that enforce invariants](https://milanjovanovic.tech/blogs/mnw_206/anemic_vs_rich_aggregate.png)

Let's map one aggregate end to end and hit every place where EF Core and encapsulation supposedly collide.

---

## The Aggregate We Want to Persist

The domain is home brewing, because order aggregates have been done to death. A `Batch` ferments, you take gravity readings, and once the gravity holds steady you bottle. Bottle too early, while the yeast is still eating sugar, and you get bottle bombs.

Here's the `Batch` written the way I actually want it: no public setters, creation through a factory, and state changes that go through methods.

```cs :collapsed-lines
public sealed class Batch
{
    private readonly List<FermentationReading> _readings = [];
    private readonly List<IDomainEvent> _domainEvents = [];
    private DateTime? _bottledAtUtc;

    private Batch() { } // For EF Core

    private Batch(BatchId id, RecipeId recipeId, Volume volume)
    {
        Id = id;
        RecipeId = recipeId;
        Volume = volume;
        Status = BatchStatus.Fermenting;
    }

    public BatchId Id { get; private set; }
    public RecipeId RecipeId { get; private set; }
    public BatchStatus Status { get; private set; }
    public Volume Volume { get; private set; }

    public IReadOnlyCollection<FermentationReading> Readings => _readings.AsReadOnly();
    public IReadOnlyCollection<IDomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    public static Batch Start(RecipeId recipeId, Volume volume) =>
        new(new BatchId(Guid.CreateVersion7()), recipeId, volume);

    public void AddReading(Gravity gravity, DateTime takenAtUtc)
    {
        if (Status != BatchStatus.Fermenting)
        {
            throw new DomainException("Readings only make sense while the batch is fermenting.");
        }

        _readings.Add(new FermentationReading(gravity, takenAtUtc));
    }

    public void Bottle(TimeProvider timeProvider)
    {
        if (Status != BatchStatus.Fermenting)
        {
            throw new DomainException("Only a fermenting batch can be bottled.");
        }

        Gravity[] lastTwo = _readings
            .OrderBy(r => r.TakenAtUtc)
            .TakeLast(2)
            .Select(r => r.Gravity)
            .ToArray();

        if (lastTwo.Length < 2 || lastTwo[0] != lastTwo[1])
        {
            throw new DomainException(
                "Gravity must hold steady across two readings before bottling.");
        }

        Status = BatchStatus.Bottled;
        _bottledAtUtc = timeProvider.GetUtcNow().UtcDateTime;
        _domainEvents.Add(new BatchBottled(Id));
    }

    public void ClearDomainEvents() => _domainEvents.Clear();
}
```

The supporting types are records, so value equality comes for free:

```cs
public readonly record struct BatchId(Guid Value);
public readonly record struct RecipeId(Guid Value);
public readonly record struct Gravity(decimal Value);

public sealed record Volume(decimal Amount, string Unit);
```

Three choices here come straight from **aggregate design**: `RecipeId` references another aggregate by ID only, `FermentationReading` is a child entity that lives and dies with the batch, and `_bottledAtUtc` is a private field with no property at all. Every one of those supposedly "breaks" EF Core, so let's map them piece by piece.

---

## Private Constructors and Private Setters Just Work

When EF Core materializes an entity, it doesn't use your public API. It calls the **private parameterless constructor** and writes to properties **through their backing fields**, private setters and all. That's the whole reason `private Batch() { }` exists, and it's the one concession the domain model makes to the ORM.

Loading and changing a batch looks like any other EF code:

```cs
Batch batch = await context.Batches
    .SingleAsync(b => b.Id == batchId);

batch.AddReading(new Gravity(1.012m), timeProvider.GetUtcNow().UtcDateTime);

await context.SaveChangesAsync();
```

Change tracking reads the same backing fields, so private setters hide nothing from `SaveChanges`.

EF can even bind a **parameterized constructor**, matching parameters to mapped properties by name and type, private or not. The catch: navigations can't be constructor-bound, so an aggregate with a collection still needs the parameterless one. EF also skips your factory's validation when loading, which is correct: re-running rules during materialization would make historical rows unloadable the first time a rule changes.

---

## Strongly Typed IDs and References to Other Aggregates

`BatchId` and `RecipeId` are **strongly typed IDs**, mapped with value conversions inside an `IEntityTypeConfiguration<Batch>`:

```cs
public sealed class BatchConfiguration : IEntityTypeConfiguration<Batch>
{
    public void Configure(EntityTypeBuilder<Batch> builder)
    {
        builder.ToTable("batches");

        builder.HasKey(b => b.Id);

        builder.Property(b => b.Id)
            .HasConversion(id => id.Value, value => new BatchId(value))
            .ValueGeneratedNever();

        builder.Property(b => b.RecipeId)
            .HasConversion(id => id.Value, value => new RecipeId(value));

        // Collections, value objects, and domain events: next sections.
    }
}
```

`ValueGeneratedNever` matters: value generation behind converters is a documented limitation area, so generate IDs in code (`Guid.CreateVersion7()` in the factory) and tell EF to keep its hands off.

Notice what `RecipeId` is *not*: a `Recipe` navigation property. The recipe is its own aggregate, and you don't need its grain bill to take a gravity reading. The foreign key column still exists, but the domain model doesn't traverse it.

---

## The Encapsulated Collection

By convention, EF finds the `_readings` backing field for a navigation named `Readings`, but I configure it explicitly so the mapping survives a rename:

```cs
builder.HasMany<FermentationReading>("_readings")
    .WithOne()
    .HasForeignKey("batch_id");

builder.Navigation("_readings")
    .UsePropertyAccessMode(PropertyAccessMode.Field)
    .AutoInclude();
```

`PropertyAccessMode.Field` tells EF to read and write the field and never touch the public view. `AutoInclude` is my default for aggregates: the `Bottle` invariant reads the readings, so a half-loaded `Batch` is unsafe to use. `WithOne()` with no arguments means the child has no navigation back to `Batch`; the `batch_id` foreign key lives only as a shadow property.

---

## State With No Property at All

`_bottledAtUtc` has no property, only a private field, and EF maps it anyway:

```cs
builder.Property<DateTime?>("_bottledAtUtc")
    .HasColumnName("bottled_at_utc");
```

The cost shows up on the query side: filtering on the field means writing `EF.Property<DateTime?>(b, "_bottledAtUtc")` in the LINQ query. My rule: private setters for state that queries filter on, field-only mapping for state only the aggregate itself needs.

```cs
var bottledThisWeek = await context.Batches
    .Where(b => EF.Property<DateTime?>(b, "_bottledAtUtc") >= weekAgo)
    .ToListAsync();
```

---

## Value Objects: Complex Types, Owned Types, and Conversions

`Volume` is a [**value object**](/milanjovanovic.tech/value-objects-in-dotnet-ddd-fundamentals.md), and multi-property value objects map as **complex types**, which store their members inline in the owner's table (no join, no separate identity):

```cs
builder.ComplexProperty(b => b.Volume, volume =>
{
    volume.Property(v => v.Amount).HasColumnName("volume_amount");
    volume.Property(v => v.Unit).HasColumnName("volume_unit");
});
```

Complex types were a v1 feature in EF Core 8 (no optional properties, no collections); EF Core 10 lifted both. On EF 8 or 9, a collection of value objects (say the batch kept its `HopAddition` schedule) falls back to **owned types**, which work everywhere but carry a hidden shadow key, because EF treats them as entities pretending to be values:

```cs
builder.OwnsMany(b => b.HopAdditions, hop =>
{
    hop.ToTable("hop_additions");
    hop.WithOwner().HasForeignKey("batch_id");
});
```

The enum takes a plain conversion, stored as text so the database stays readable:

```cs
builder.Property(b => b.Status)
    .HasConversion<string>()
    .HasMaxLength(20);
```

All converted properties share one caveat: LINQ operates on the provider type, so sorting by `Status` gives alphabetical order (`Bottled`, `Dumped`, `Fermenting`) rather than lifecycle order.

---

## Domain Events Stay Out of the Schema

`IDomainEvent` is no entity, so tell EF to leave the `DomainEvents` collection alone:

```cs
builder.Ignore(b => b.DomainEvents);
```

The events still need to go somewhere, and a `SaveChangesInterceptor` is the natural place:

```cs :collapsed-lines
public sealed class DomainEventsInterceptor(IDomainEventsDispatcher dispatcher)
    : SaveChangesInterceptor
{
    public override async ValueTask<int> SavedChangesAsync(
        SaveChangesCompletedEventData eventData,
        int result,
        CancellationToken cancellationToken = default)
    {
        var domainEvents = eventData.Context!.ChangeTracker
            .Entries<Batch>()
            .SelectMany(entry =>
            {
                var events = entry.Entity.DomainEvents.ToList();
                entry.Entity.ClearDomainEvents();
                return events;
            })
            .ToList();

        await dispatcher.DispatchAsync(domainEvents, cancellationToken);

        return await base.SavedChangesAsync(eventData, result, cancellationToken);
    }
}
```

`IDomainEventsDispatcher` is the strongly typed dispatcher I built in [**building a custom domain events dispatcher**](/milanjovanovic.tech/building-a-custom-domain-events-dispatcher-in-dotnet.md), with no MediatR dependency; that post also covers dispatching before the save when handlers must share the transaction.

---

## The Domain Never References EF Core

Every mapping snippet so far lives in `BatchConfiguration`, none of it in `Batch`: no mapping attributes, no ORM base class. That's **persistence ignorance**, and the fluent configuration API is what makes it possible. The `DbContext` sits in the infrastructure layer and picks up every configuration from its own assembly:

```cs
public sealed class BreweryDbContext(DbContextOptions<BreweryDbContext> options)
    : DbContext(options)
{
    public DbSet<Batch> Batches => Set<Batch>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(BreweryDbContext).Assembly);
    }
}
```

---

## Summary

The "EF Core forces anemic models" objection expired years ago. A private constructor, backing fields, value conversions, and complex types cover everything a fully encapsulated aggregate needs, and all of it lives in configuration classes the domain never sees. The real limits come down to two: navigations can't be constructor-bound, and converted or field-only members translate through the provider type in queries.

The ORM was never the thing keeping your domain model anemic. It's a mapping exercise, done once per aggregate, and the encapsulation holds from then on.

If you want to go deeper into modeling aggregates, value objects, and rich behavior across a real system, that's what I teach in [**Pragmatic Domain-Driven Design**](/milanjovanovic.tech/pragmatic-domain-driven-design/README.md).


---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Persisting a Rich Domain Model With EF Core",
  "desc": "Every time I show a rich domain model, someone tells me it can't work with EF Core: ”EF needs public setters and a public constructor, so the anemic model is…",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/https:milanjovanovic.techblogpersisting-a-rich-domain-model-with-ef-core.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
