---
lang: en-US
title: "Chapter 11: Example Queries"
description: "Article(s) > (12/12) How to Design Structured Database Systems Using SQL [Full Book]"
category:
  - Data Science
  - PostgreSQL
  - Design
  - System
tag:
  - blog
  - freecodecamp.org
  - data-science
  - sql
  - postgres
  - posgtresql
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (12/12) How to Design Structured Database Systems Using SQL [Full Book]"
    - property: og:description
      content: "Chapter 11: Example Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/chapter-11-example-queries.html
next: /freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/README.md#conclusion
date: 2025-08-14
isOriginal: false
author:
  - name: Daniel García Solla
    url : https://freecodecamp.org/news/author/cardstdani/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Design Structured Database Systems Using SQL [Full Book]",
  "desc": "This book will guide you, step-by-step, through designing a relational database using SQL. SQL is one of the most recognized relational languages for managing and querying data in databases. You’ll learn the fundamental concepts related to both data ...",
  "link": "/freecodecamp.org/how-to-design-structured-database-systems-using-sql-full-book/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Design Structured Database Systems Using SQL [Full Book]"
  desc="This book will guide you, step-by-step, through designing a relational database using SQL. SQL is one of the most recognized relational languages for managing and querying data in databases. You’ll learn the fundamental concepts related to both data ..."
  url="https://freecodecamp.org/news/how-to-design-structured-database-systems-using-sql-full-book#heading-chapter-11-example-queries"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755095979245/dfd39c26-3456-4e79-a01c-0b2a82f7a034.png"/>

Once we have done all this, we’ll have the database created and populated with tables. But these tables are empty, meaning they don't contain any tuples. So if we want to run queries on them that return any results, we need to execute `INSERT` statements to add tuples to all the tables.

In this case, since the database is an example, we don't have real data to use for populating the tables, and there's no simple and automatic way to fill them with synthetic data. The best option is to use the **Python** library **faker** and create a script to generate this synthetic data (I’ve explained this in this **Jupyter Notebook**).

There is also always the option to look for real data sources to populate our database. But when doing this, those data sources might provide information in table schemas that don't exactly match those of our database tables, requiring us to **integrate** and then **insert** the information through a process like an ETL. These **ETL** processes of integration and insertion are often applied in **Data Warehouses**, which can also be a database like ours.

---

## Running Basic Queries

So, assuming we already have the database populated with tables and tuples within them, we can run different queries on them. After all – the main operation that other services from other software layers use from the database is querying. This lets them obtain data that they can then transform, use to calculate certain metrics, or simply display to the end user.

For example, right after inserting the data, the first query we can run to ensure that the insertion process worked is the following:

```pgsql
SELECT 'person' AS tableName, COUNT(*) AS numberOfTuples
FROM Person;
```

As you can see, we use the FROM clause to get all the information stored in the `Person` table (which we could have written entirely in lowercase). Then, we use the **aggregation function `COUNT(*)`** to count the total number of tuples in the table, naming the column where this number is stored `numberOfTuples`.

But, if we also want to display the table name in the same tuple as the previous count, we can add another column in the `SELECT` statement where all its values are **'person'**. This way, when the query is executed, it will return a table with two columns, one `tableName` and another `numberOfTuples`. Since the aggregation function only returns one value, the resulting table will have only one tuple, where the `tableName` column will have the value 'person' and the other column will show the number of tuples in the `Person` table.

If we want to count the tuples of all the tables in the database, we have the option to create a larger query that gathers all the results of the **sub-queries** that count the tuples of each table. For this, we can use `UNION ALL`, which combines the tuples from all resulting tables into a single table. This works as long as all resulting tables have exactly the same schema, with the same column names and data types, as in this case.

```pgsql
SELECT 'person' AS tableName, COUNT(*) AS numberOfTuples
FROM Person
UNION ALL
SELECT 'city' AS tableName, COUNT(*) AS numberOfTuples
FROM city;
```

Lastly, when we say "obtain information" about an element of the domain or database schema in this context, we mean getting its data stored in the attributes of the table that represents it.

For example, information about a person could be the `Name` or `Email` attribute of the `Person` table, among others. We won’t detail that info here, as in most cases, it’s easy to modify which attributes are selected to return as a query result. But in a real environment, it’s convenient and important to pay attention to the **attributes** the query should return, the **names/aliases** they should have, and the **order** in which they should be returned. The functionality of other software layers often depends on this step being performed correctly.

---

## Tuple Filtering

The query we just looked at is useful for managing the database. Knowing how much information is stored in each table helps us make sure that certain normalization or schema transformation operations have run correctly (and even that the information itself is correct).

Let’s now look at some other queries that allow us to execute services provided to the end user. We use these to operate on the domain according to its semantics, so they can be very diverse. Here, we’ll distinguish between different types of queries based on their approach and the SQL tools used in their construction.

First, we have a series of queries for tuple filtering. These queries apply a filter on a table to keep only certain tuples that meet specific conditions. Note that the table containing the tuples we want to filter can be generated in any way, whether through a `JOIN`, a set operation, or whatever we want to do. But if you need to perform a grouping with `GROUP BY`, the resulting table must be filtered using a `HAVING` clause, which differs from the usual `WHERE` clause used to filter tuples.

```pgsql
SELECT *
FROM person P
WHERE P.name LIKE 'Carol%';
```

The above is a simple example that retrieves the tuples from the Person table for people whose names starts with **“Carol“**. As you can see, the only statement we need to filter tuples is `WHERE`. In it, all the conditions required for filtering are defined, regardless of their number or nature, as some will be performed using subquery results.

In this specific case, the query has the condition that a person's name must start with exactly the string that appears in the `LIKE` operator. Since it’s case-sensitive, the string has to match exactly what we want to search or filter. Then all tuples that meet this condition will be returned in the resulting table. We’ll get all of its attributes because of the **`SELECT *`** notation we used.

To illustrate that it doesn't matter whether you use uppercase or lowercase when naming schema elements in SQL statements, we can see in the below query that both the table `City` and its attributes are in lowercase (except for one that’s written exactly as it was declared, with the first letter capitalized). If we run this query, it will work the same as if we use `C.` to reference the attributes, since using only one table means there’s no ambiguity when referring to the table's columns.

```pgsql
SELECT *
FROM city C
WHERE (population > 20000 AND C.Latitude >=0) OR C.longitude <= 0;
```

Ultimately, with these conditions, we get all the tuples from `City` that have a population greater than 20,000 and a positive `latitude`, or those that simply have a negative `longitude`.

Let’s look at a similar example: here, we get all cruise bookings with a price below 500, an even cabin number, and a payment method of cash. In this case, we can see how we can apply different types of operators to build the condition.

```pgsql
SELECT *
FROM cruiseBooking CB 
WHERE CB.price < 500 AND MOD(CB.cabinnumber, 2)=0 AND CB.paymentmethod='cash';
```

On one hand, if we want to declare that all the conditions we impose must be met, we’ll use the logical operator `AND`. This performs a logical conjunction of those conditions so that the selected tuple is added to the resulting table only when all of them are met at the same time.

In other words, we can see the `WHERE` clause as a logical function that runs once for each tuple present in the table we want to filter. So if the result of that logical function is TRUE, then the tuple meets the conditions. Otherwise, it’s discarded and not included in the result table of the query.

So now we know that all the conditions we can define in a `WHERE` clause must be composed of a sequence of simpler logical conditions like `CB.price < 500` joined by logical operators. Also, in each of these simpler conditions, we can find more logical operators, as they’re conditions that we can see as logical functions, which can themselves be composed of a sequence of even simpler conditions joined by logical operators. This allows for recursion, enabling us to use **parentheses** like in `(C1 AND (C2 OR C3))` to adjust the **priority** and **precedence** of these operators at different levels of recursion in our condition (just like in other programming languages).

On the other hand, we can also encounter conditions where arithmetic or comparison operators are used, such as in this case when checking if the string containing the payment method is exactly the value `‘cash‘`.

While in other languages we might write `CB.paymentmethod = 'cash'`, in SQL we write the comparison operator with a single character `=`. If we want to negate it, we can do this either by using the logical operator `NOT` (affecting the entire equality condition) or by using `CB.paymentmethod <> 'cash'` which represents the condition where it checks that the payment method is not `‘cash‘`, meaning it’s different from that value.

In addition to these operators, we also have a series of mathematical functions available. For example, to check if a number is even or odd, in most general-purpose programming languages we have the **modulo operator `%`** which calculates the remainder of dividing the number by 2 – so if it’s 0, the number is even.

But in SQL, these operations aren’t implemented by default with arithmetic operators, but rather with functions. Specifically, to calculate the modulo, we use `MOD(Dividend, Divisor)`, although there are [<FontIcon icon="iconfont icon-postgresql"/>many other](https://postgresql.org/docs/current/functions-math.html) similar functions.

We can use some of the operators mentioned earlier to perform calculations using entire columns. This results in other columns containing the results of those operations.

```pgsql
SELECT *, (CURRENT_DATE - CB.bookingDate) AS DateDifference1, ABS(CB.ArrivalDateFK-CB.DepartureDateFK)
FROM cruiseBooking CB;
```

For example, in this query, we want to calculate several date differences, one being the number of days between the booking date and the current date, and another being the number of days between the departure and arrival dates of the cruise trip.

To do this for each tuple in the `CruiseBooking` table, the simplest way is to add several columns that take the results of these calculations as their values. Specifically, we create these columns in the `SELECT` statement. This selects the corresponding attributes from the resulting table of the query and displays them to the user. Only those attributes are visible to the user, even though we got them from a table with more attributes.

But, besides selecting attributes, we can also define new columns that didn't exist in the table we’re selecting from. For example, in this query, using the notation `*`, we select all the attributes present in the table from the `FROM` statement, which in this case is `CruiseBooking`.

In addition to those, we concatenate more attributes with a comma, like `DateDifference1` or the difference between the departure and arrival dates of the corresponding trip. If we look at the result of the query after adding these additional attributes, we’ll see a new column in the resulting table called `DateDifference1`, which will take as values the difference between the current date gotten with `CURRENT_DATE` and the booking date, which is `CB.bookingDate`.

So we see that in the SELECT statement, we can perform operations with the values of the tuples to generate new columns with intermediate calculations, or simply calculations required by the query, as in this case.

Specifically, the operation performed on each tuple to generate the value of the new column is defined in the `SELECT` statement itself. In this case, with `CURRENT_DATE - CB.bookingDate`, we define that the value of each tuple equals the current date minus the booking date. By default in SQL this returns the difference in days between the two dates.

Then to get the difference between the departure and arrival dates of the cruise trip, we use the values of the `DepartureDateFK` and `ArrivalDateFK` attributes from the foreign key pointing to Voyage. This avoids having to query data from other tables that contain them.

If we simply subtract them, depending on the order, we could get negative results, since one date is earlier than the other. So if we just want the absolute difference, we can wrap the operation with the `ABS()` function. And if we don't assign a specific name to that additional column, SQL by default assigns it the name **“abs“**. But we’ll want to change it sooner or later to avoid ambiguity problems if we use the `ABS()` function again to create another new column.

In the previous query, we saw that all the information we needed was present in the `CruiseBooking` table from the FROM clause – but this is not always the case.

For example, in the below query, we want to do a few things: first, we want to get all the bookings made by people whose names start with a letter that is later or equal to `'L'`. They should also meet a series of conditions like the ones we saw before. Finally, we want to calculate the difference in days between the current date and the booking date as we saw before.

```pgsql
SELECT *, (CURRENT_DATE - CB.bookingDate) AS DateDifferenceColumn 
FROM cruiseBooking CB INNER JOIN Person P ON CB.PersonFK = P.PersonID
WHERE CB.price < 2000
    AND MOD(CB.cabinnumber, 2) = 0
    AND CB.paymentmethod = 'cash'
    AND CB.bookingDate BETWEEN '2025-01-01' AND CURRENT_DATE
    AND P.Name > 'L';
```

For this, if we only use the `CruiseBooking` table in the `FROM` clause, we won't be able to access the name of the person who made the booking, as that’s an attribute of the `Person` table. We can get information from that table using the foreign key `PersonFK` from `CruiseBooking`. So to use the Name attribute from the `Person` in our query, we need to somehow "concatenate" or join the columns of the `Person` table with the information from the `CruiseBooking` table that we had before.

In SQL, the `JOIN` operation allows us to do this. We just need to choose a type and conditions that let us obtain only the tuples with the information we want.

Among all the types of `JOIN`s, the least likely to be used in production or in complex queries is the **implicit join**. When we use an **implicit join**, we are performing a Cartesian product between all the tuples involved in that `JOIN`. So if we want to keep only certain tuples from that Cartesian product, we have to use a `WHERE` clause to impose certain conditions on the attributes.

Implicit `join`s are harder to read and maintain. In large or complex queries, we need to separate the join itself from the conditions on the Cartesian product. That means the logic is split between the FROM list and the `WHERE` clause, so you have more places to check when you modify or refactor the query.

Also, in implicit `JOIN`s, we can’t perform operations equivalent to an `OUTER JOIN` because there’s no way to fill certain attributes with `NULL` if they’re not referenced in the other table of the `JOIN` (among other disadvantages). So the type of `JOIN` we choose will depend on the condition we need to impose on the tuples of the Cartesian product.

Just keep in mind that there are certain cases where it might be convenient to use **implicit `join`s**, such as in queries involving very few tables (at most 2 to keep the code as simple as possible) with simple restrictions, or when maintaining [<FontIcon icon="iconfont icon-ibm"/>legacy code](https://ibm.com/think/topics/legacy-code), meaning old or inherited code that uses implicit `join`s.

In this case, when performing the Cartesian product, we’ll get a series of tuples that combine all those from `CruiseBooking` and `Person`. This will result in tuples with information about these two tables where the person's information does not correspond with the person referenced by the foreign key of the `CruiseBooking` tuple.

For that reason, we don't need those tuples from the Cartesian product – or in other words, we want to get all those where the foreign key `PersonFK` of `CruiseBooking` points to the person whose information is indeed in that same tuple of the Cartesian product.

Formally, we express this condition as `CB.PersonFK = P.PersonID`. In this case, we need to assign alias names to the tables to differentiate their attributes and resolve possible ambiguity issues. So the most suitable type of `JOIN` for this query is an `INNER JOIN`, as it allows us to declare this equality condition exactly as we have written it here in an `ON` clause, as seen above.

In this way, by using a specific type of `JOIN` that’s not implicit, we can isolate all the filtering conditions of the tuples in the `WHERE` clause (dedicating the `FROM` to obtaining the data). Through the `JOIN`, we can concatenate the attributes of other tables to the resulting table of the query, and apply a specific filter to the tuples of the Cartesian product of that operation with an equality condition.

Regarding the `WHERE` conditions in this query, we’ve added one that makes sure the booking date is between `'2025-01-01'` and the current date we get with `CURRENT_DATE`. We could’ve used the arithmetic operators `<=` and `<=` for this, but SQL offers us a more convenient alternative using `BETWEEN`, where we define that the date of the `bookingDate` attribute must be between `'2025-01-01'` and `CURRENT_DATE`, both included.

The `BETWEEN` operator would also work to check if a string is between a pair of strings, all compared alphabetically. In this query, the only condition we impose on the lexicographical order of a string is `P.Name > 'L'`. This ensures that the name of the person who made the booking starts with a letter **greater than or equal** to `L`. (If their name is composed of text that starts with `L` followed by more letters, that text will automatically be considered strictly greater than the text `'L'`.)

If we wanted to keep only the people whose names start strictly with a letter greater than `L`, we would have to use the condition `P.Name > 'M'`.

What if we need to get a list of all the people in the database, their information, and also the details of all the cruise bookings they have made? We’d need a list where all the registered people in the database appear.

```pgsql
SELECT *
FROM cruiseBooking CB RIGHT JOIN Person P ON CB.PersonFK = P.PersonID
ORDER BY P.PersonID;
```

For example, if someone has made 2 bookings, there will be 2 rows with their information plus the details of the two bookings they made. Meanwhile, people who have never made a booking will appear in the list with a row containing their information and a series of `NULL` values in the columns where the booking information would be.

This query isn’t common in real cases, but this structure can be useful for solving other types of queries. So to build this list, the first operator we might think of is an OUTER JOIN. In this type of join, we specify the side of the table whose rows should always appear in the final list, filling in with `null`s in the other table when necessary.

To understand this, in this example, we see that a person doesn’t have to have any associated booking – so for each person, there doesn't necessarily have to be a booking in their name. So there may be some people who don’t have any bookings associated with them. So when we’re trying to do an `INNER JOIN` with the `CruiseBooking` table, they won't appear in the resulting table from the query.

That's why, instead of an `INNER JOIN` where we impose a strict condition that all tuples from the operation must meet, we use an `OUTER JOIN`. So, if we want all people to appear in the list even if they haven't made any bookings, we need to specify the side of the `OUTER JOIN` where we placed the `Person` table in the `JOIN` operation.

In this case, the `Person` table is on the right side, meaning its attributes are concatenated to the right of those in the `CruiseBooking` table. So in the `OUTER JOIN`, we must specify the `RIGHT` side so that all tuples from the table on the right side appear in the list, and for those people who don't have any associated bookings, their corresponding tuple will be filled with NULL values in the respective attributes that hold booking information.

If we had placed the Person table on the left side, then to achieve the same result as the previous query but with the columns of both tables reordered, we just need to change `RIGHT` to `LEFT` in the `JOIN` operation. This way, all tuples from the table on the left (meaning Person) must appear in the resulting table. The right side gets filled in with NULL values in this case, since that's where the attributes of the `CruiseBooking` table are.

```pgsql
SELECT *
FROM Person P LEFT JOIN cruiseBooking CB ON CB.PersonFK = P.PersonID
ORDER BY P.PersonID;
```

On the other hand, in both queries, you can see that we used `ON` to define the equality condition on the tuples of the Cartesian product produced by `JOIN`. We have to do this because if we use `USING` instead of `ON`, both attributes on which we want to impose the equality condition must be named exactly the same – so we can’t use `USING` here.

Aside from the `JOIN` operation from which the data is extracted, we often need to return the result sorted by an attribute. It may also simply be useful to have the result sorted so we can make checks more quickly, as in this case.

```pgsql
SELECT P.Birth
FROM Person P LEFT JOIN cruiseBooking CB ON CB.PersonFK = P.PersonID
ORDER BY P.PersonID;
```

To do this, at the end of the query, we can add an `ORDER BY` statement, which sorts the tuples of the resulting table according to the `PersonID` attribute of the person. This attribute doesn’t need to appear in the `SELECT`, as we might need other attributes that aren’t the ones defining the order, as shown above.

To finish with this type of `JOIN`, besides defining one side as `RIGHT` or `LEFT`, in an `OUTER JOIN` we might also need all the tuples from both sides' tables to appear. In the query below, for example, we need to get a list of all driving license applications, so that all of them appear, one in each tuple, with all the information regarding their rejection or acceptance.

```pgsql
SELECT *
FROM DrivingLicense D FULL OUTER JOIN RejectedDrivingLicense R USING (LicenseID);
```

To resolve this query, first, keep in mind that the schema constraints prevent us from having a driving license application both accepted and rejected at the same time. So for each application registered in the database, there will be either a tuple in `RejectedDrivingLicense` or in `DrivingLicense`, depending on whether it has been rejected or not. So when obtaining the query list, if the resulting table contains all the attributes from both tables, there will always be `NULL`s in some of them (either in `RejectedDrivingLicense` or in `DrivingLicense`).

To make sure that all applications appear, we can perform a `FULL OUTER JOIN`, where the `OUTER` specification is optional as we have seen on other occasions. This forces the tuples from both tables to appear in the final result, filling with NULL on the corresponding side for each tuple.

For example, if a license is accepted and we try to find it in the `RejectedDrivingLicense` table, it clearly won't be there. So, if we did an `INNER JOIN`, we wouldn't get a tuple for that application, which happens similarly with rejected applications and the `DrivingLicense` table. So with a `FULL OUTER JOIN`, we ensure that all applications appear, filling with `NULL` in `RejectedDrivingLicense` when the application is accepted and in the other table when it’s rejected. In this case, its also possible to use `USING` in the `JOIN`, since the equality condition is based on attributes in different tables that have exactly the same name.

Another `JOIN` we might encounter in real queries is the `NATURAL JOIN`, which is very similar to the `INNER JOIN` but with simpler syntax.

```pgsql
SELECT PersonFK, RequestDate, Fee, ApprovalDate, Points
FROM DrivingLicenseRequest NATURAL JOIN DrivingLicense;
```

For example, you can see in the example above a query that can help us verify that the schema's integrity constraints are met. In it, we get a list of all driving license requests that have been approved.

To do this, we perform a `NATURAL JOIN` between the `DrivingLicense` table and its superclass `DrivingLicenseRequest`. Since the only attributes with equivalent names are `LicenseID`, SQL automatically imposes the condition that the tuple with information from both tables has the same values in the `LicenseID` attributes of both tables, removing both attributes from the resulting table of the query.

This automatically imposed condition, as well as removing the attributes, is what characterizes the `NATURAL JOIN`. It’s often be preferable to an `INNER JOIN` because of these characteristics. By eliminating identical attributes, we eep the information that actually represents the people in those tuples. We can then use it to calculate various metrics or even as the result of a subquery in a more general query.

In this specific case, since all accepted requests have to be recorded in the `DrivingLicenseRequest` table, this query should return all tuples from `DrivingLicense`. But if any aren’t recorded in `DrivingLicenseRequest`, the foreign key won’t reference any valid tuple in `DrivingLicenseRequest`, revealing a database integrity issue.

Fortunately, we never have to manually check this situation with these queries, as the DBMS automatically verifies that all **integrity constraints** are met with each database modification, especially those related to keys.

In real queries, **multiple `JOIN`** operations are usually used in the same `FROM` statement because we need to gather data from multiple tables (or even from within the same table).

```pgsql
SELECT *
FROM Person P
    INNER JOIN Residence R1 ON (P.PersonID = R1.PersonFK)
    INNER JOIN Residence R2 ON (
        P.PersonID = R2.PersonFK
        AND R1.CityFK <> R2.CityFK
    )
ORDER BY P.personID;
```

For example, say we want to find people who have lived in several different cities at some point in their lives, regardless of when they did so. Since our schema lets people live in multiple cities at once, we’ll have to use several `JOIN` operations to gather data from `Person` and `Residence` and join them.

But given the condition we impose on the people, to know if someone has lived in more than one city, we need to check the `Residence` table and see if there are multiple `Residence` tuples for the same person with different cities.

Specifically, the query we want to make should get all those people who have lived in at least two **different** cities. If we only impose the condition that a person appears in at least two tuples of the `Residence` table, we’d get people who have had at least two residences – not those who have lived in different cities in those residences.

Therefore, the final condition ends up being that the person appears in at least two tuples of `Residence` where the associated city they have lived in is **different** in both tuples. Also, by checking this condition, we aren’t ensuring that the person only has those two tuples – we just need to know if they appear in at least two tuples with the previous characteristics (as a person may have had many residences).

To implement this query, we might first think of using set operations and subqueries – but there is a way to solve it using only `JOIN` operations.

When we do a `JOIN` between two tables, we are really doing the Cartesian product, from which we only keep some tuples that meet certain conditions. For example, when doing a `JOIN` between `Person` and `Residence`, the foreign key `PersonFK` in `Residence` must refer to the person from that same tuple in the **Cartesian product**. This means it must match the PersonID attribute from the `Person` table. With this, we can see that we obtain all the residences each person has or has had.

Then, from all of them, if we want to check that there are at least two with different **foreign key `CityFK`** values (meaning that there are two residences in different cities), we can do another `JOIN` of the intermediate table resulting from the previous `JOIN` with the `Residence` table.

This way, in addition to saying that its **foreign key** `PersonFK` has to refer to the corresponding person from each tuple resulting from the `JOIN`, we’re also declaring that the city it refers to must be different from the city referenced by the previous `Residence` table used in the previous `JOIN`.

To understand this in a more programmatic way, when doing a `JOIN` between `Residence` and itself, we’re getting tuples that represent **pairs of residences**. So we’re obtaining a series of tuples that together represent the Cartesian product between the tuples of the `Residence` table with themselves.

In other words, we end up with a series of tuples where, in each one, we can find information from exactly 2 tuples of the `Residence` table, for each possible pair of `Residence` tuples (including cases where both tuples are the same). If we add the restriction that these pairs must refer to a certain person, then they will be all the possible pairs of residences that a person has had.

Then if we also add the condition that for each pair of residences the cities they refer to must be different, we‘ll end up with tuples where the person who has had those residences have lived in at least two different cities. This doesn’t ensure that it’s exactly two, as they may have lived in many more (which we can see in the resulting tuples from these `JOIN` operations).

When implementing this in SQL, we see that in both `ON` clauses, we declare the condition that the Residence tuples must refer to the same person of the tuple we want to construct – with that person and a pair of their residences. Also, in the second `JOIN`, we declare the condition that the cities of the pair of residences must be different using the operator `<>`. Finally, we order the result according to the values of the `PersonID` attribute.

```pgsql
SELECT DISTINCT P.Name
FROM Person P
    INNER JOIN Residence R1 ON (P.PersonID = R1.PersonFK)
    INNER JOIN Residence R2 ON (
        P.PersonID = R2.PersonFK
        AND R1.CityFK <> R2.CityFK
    )
ORDER BY P.personID; /*Error*/
```

As you can see from the query result, there are people who have had many residences, resulting in many pairs of residences that meet the imposed conditions. This creates multiple tuples in the resulting table where the same person's information appears.

So, if we only want to get the person's name, we can replace `*` with `P.Name` in the `SELECT` statement to select only that attribute. To avoid duplicate values, we can use `DISTINCT`. Without `DISTINCT`, the same person's name may appear multiple times, depending on the number of residence pairs they have had in different cities. This also happens because SQL by default models tables with multisets, allowing such duplicates.

If we care about removing duplicates, we should use `DISTINCT` – but this decision can affect other statements like `ORDER BY`. In this example, we’re ordering by the values of the `PersonID` attribute, which we don't need in the resulting table where only the Name attribute appears.

Since `PersonID` doesn’t appear in the `SELECT` after using `DISTINCT`, the DBMS will give us an error. We have several options to fix it.

On one hand, we can remove `DISTINCT`, which will result in duplicate person data but that’s ordered by their `PersonID` (even though it won't be shown in the result).

On the other hand, we can keep `DISTINCT` and remove `ORDER BY`, because if the attribute we are ordering by does not appear in the `SELECT` after using `DISTINCT`, we will get an error that will prevent us from executing the query.

Another alternative we have is to show all the information about the person, not just the name. This way, we can order the result by the `PersonID` attribute and remove duplicate people. Instead of writing the entire list of attributes from the Person table in the `SELECT`, we can use the notation `P.*` to refer to **all the attributes of the table with alias `P`**.

```pgsql
SELECT DISTINCT P.*
FROM Person P
    INNER JOIN Residence R1 ON (P.PersonID = R1.PersonFK)
    INNER JOIN Residence R2 ON (
        P.PersonID = R2.PersonFK
        AND R1.CityFK <> R2.CityFK
    )
ORDER BY P.personID;
```

Finally, in SQL, it's common to encounter queries where we need to work with dates. For example, in our schema, we might have a query to get all the people who were born in May.

```pgsql
SELECT *, EXTRACT(MONTH FROM Birth) AS BirthMonth
FROM Person
WHERE EXTRACT(MONTH FROM Birth) = 5;
```

We can solve this by imposing a single condition on the birth date, with the peculiarity that we can't treat the data type exactly as if it were entirely numeric or text. Instead, we need to extract [<FontIcon icon="fas fa-globe"/>characteristics](https://w3schools.com/sql/func_mysql_extract.asp) from the date to operate with.

In this case, the clearest characteristic to obtain is the month. By using the `EXTRACT()` function and the `MONTH` characteristic, we extract the month number from the Birth attribute's date to check if it’s May or not.

Note that the function generally returns numbers for day, month, year, and so on, not strings. So we treat the month as if it were a number from 1 to 12. We can convert between number and string [<FontIcon icon="fa-brands fa-microsoft"/>using other SQL tools](https://learn.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-ver17), all in the appropriate format according to the time zone and geographic area. Then, if we want that date characteristic to appear as an additional attribute in the resulting table, we simply treat the `EXTRACT()` function as if it were any SQL function that returns a value when given certain values from a tuple.

But even if we assign it an alias, we can’t use that alias in the `WHERE` clause to declare the condition that it equals to be 5. Instead, we must write the entire calculation in the `WHERE` clause. Although this may seem inefficient in terms of readability, without using additional [**Common Table Eexpression (CTE) techniques**](/freecodecamp.org/mysql-common-table-expressions.md) like those we will see later, we have no choice but to duplicate the attribute calculation in the `WHERE` clause if we want to impose a condition on it.

```pgsql
SELECT *, EXTRACT(WEEK FROM Birth)
FROM Person;
```

In addition to the day, month, and year, the `EXTRACT()` function allows us to obtain all kinds of characteristics from a date, like the week number with `WEEK` as shown above, or the current quarter number with `QUARTER`.

---

## Subqueries

There are some SQL queries that require subqueries. A subquery is simply a query inside another query. It helps you solve a smaller problem so the main query can solve a bigger one.

Let’s dive in a little deeper. When you run a query in SQL, you get a result table (a multiset, since rows can repeat). A subquery lets the outer query use that result – for example, to check membership or existence.

```pgsql
SELECT *
FROM Person P
WHERE P.PersonID IN (SELECT PersonFK FROM Residence);
```

This returns every person whose identifier appears in `Residence.PersonFK` – that is, everyone who has (or had) a recorded residence. The subquery produces the set of referenced person IDs, while the outer query keeps rows where `p.PersonID` is in that set.

Note that this is a [<FontIcon icon="iconfont icon-ibm"/>non-correlated subquery](https://ibm.com/docs/en/db2-for-zos/12.0.0?topic=subqueries-correlated-non-correlated) (it doesn’t reference the outer query), which many databases may **materialize once** or rewrite as a **semi-join** before applying the `IN` filter. In practice, this is usually comparable to an equivalent `EXISTS` or `JOIN`-based formulation. We’ll just choose the form that’s clearest and add appropriate indexes (for example, `Residence(PersonFK)`, `Person(PersonID)`) for speed.

If the subquery can return `NULL`, `IN` uses three-valued logic. With a foreign key on `Residence.PersonFK`, `NULL` values are typically disallowed, so this isn’t an issue.

On the other hand, we can solve the query using `JOIN` operations as shown below:

```pgsql
SELECT DISTINCT P.*
FROM Person P INNER JOIN Residence R ON R.PersonFK = P.PersonID;
```

Here, we combine the data from `Person` and `Residence` using the equality condition that requires the foreign key of `Residence` to reference the person in the same tuple of the Cartesian product. This way, we only get those tuples that have the information of a residence and the person associated with it.

Then, to keep only the data of the people, we use `P.*` as before – but here we need to use `DISTINCT`, since a person may have multiple residences. Specifying `DISTINCT` prevents this from duplicating the data of the same person.

The `JOIN` operation is often considered inefficient because it’s a Cartesian product that must construct all tuples of that product and then filter them using the conditions we declare. But we can make it faster with the right hardware, like [<FontIcon icon="fas fa-globe"/>GPUs](https://arxiv.org/html/2406.13831v1).

Still here, we need to remove duplicates with `DISTINCT`, which involves additional processing of the query result. We also need another filter or process that eliminates duplicate tuples, so it seems less efficient at first glance.

But depending on how the DBMS implements these operations at a physical level, it can be more or less efficient than using subqueries (as the hardware also makes a difference).

Here’s another construction based on subqueries that we can use to solve the previous query. As you can see, we build a **correlated subquery** where we use the `PersonID` attribute from the "higher-level" query to get all the residences (tuples) from the Residence table that belong to the person indicated by the `PersonID` identifier. In other words, since the `WHERE` clause is executed for each tuple of Person, we can construct a subquery where, given a certain person with that identifier, we can get all the residences registered in their name. That would be those whose foreign key PersonFK refers to the `PersonID` identifier of the person.

```pgsql
SELECT *
FROM Person P
WHERE EXISTS (
        SELECT *
        FROM Residence R
        WHERE R.PersonFK = P.PersonID
    );
```

With this correlated subquery, SQL must build its result for each person in the `Person` table, as the result depends on the specific person being processed. So to only keep those people who have a residence, we use the `EXISTS` operator to verify that the resulting multiset of the subquery contains at least one tuple (indicating that the person has a residence).

SQL has to go through the `Residence` table for each person in the `Person` table, although it only goes through `Residence` until it finds the first tuple whose foreign key points to the corresponding person. This avoids unnecessary checks of the rest of the tuples in `Residence` because `EXISTS` only requires at least one tuple in the subquery.

Still, in the [worst-case scenario (<FontIcon icon="fa-brands fa-medium"/>`learning-data`)](https://medium.com/learning-data/understanding-algorithmic-time-efficiency-in-sql-queries-616176a85d02), it would have to go through the entire table for each person if no person has or has had residences.

Another way we can use membership or existence operators is on a list of values. This is declared very similarly to a tuple and a subquery but is not necessarily a tuple or a subquery.

```pgsql
SELECT *
FROM Pool P
WHERE Status IN ('closed', 'renovation')
    AND mindepth IN (
        SELECT mindepth
        FROM Pool
        WHERE mindepth > 4
    );
```

For example, above we have a query that returns all pools whose status is `'closed'` or `'renovation'` and whose minimum depth is greater than 4. To check the first condition, we could easily use the logical `OR` operator and declare two simpler conditions to check whether the Status value is either `'closed'` or `'renovation'`. But we can do this more simply using the `IN` operator. So by using the notation `('closed', 'renovation')`, we declare a list with those two values, checking with `IN` if the value contained in the Status attribute is in the list or not. This has the same effect as using the `OR` operator, but with clearer syntax and similar efficiency.

This check we do with `IN` is like a membership check on the result of a subquery, as the syntax is very similar. But don’t confuse the list declaration with a subquery, since `('closed', 'renovation')` doesn’t represent a multiset with tuples, but rather a list of values. We can also view it as if it were a column on which we perform a check.

On the other hand, the simplest way to check if the pool's minimum depth is greater than 4 is with the condition `mindepth > 4` directly. But to show an equivalent way of checking with subqueries, you can see above that the subquery for the condition retrieves all `mindepth` values from the `Pool` table that are strictly greater than 4. Then it uses IN to check if the `mindepth` value from the outer query's `Pool` table is in the subquery's result.

So instead of writing `mindepth > 4` directly, the subquery first selects all `mindepth` values greater than 4, and the outer query uses IN to keep a pool row only if its `mindepth` is in that set. In practice, although this can also be a solution to the query, we should keep the code as simple as possible. We generally avoid these techniques.

Also, we don’t need `alias P.` to refer to the `mindepth` of the outer query – as it’s the only one called that way in this query. But if we had to use it in the subquery, we’d need to use the `alias P.` to distinguish it from the `mindepth` attribute of the `Pool` table in the subquery. (This also doesn’t need an alias because it’s a simple subquery without another subquery inside it. This is possible to do, and sometimes even necessary.)

Here’s another equivalent way to solve the query using subqueries:

```pgsql
SELECT *
FROM Pool P
WHERE Status IN ('closed', 'renovation')
    AND P.mindepth > ALL (
        SELECT mindepth
        FROM Pool
        WHERE mindepth <= 4
    );
```

The main difference is that here, the subquery gets all the `mindepth` values that are `<= 4`, which is the opposite condition of what we want the tuples to meet. So in the outer query, we have the result of this subquery, which includes all the `mindepth` values we’re not interested in.

To check if a tuple meets the condition of having a minimum `depth > 4` using these values, we use the `> ALL` operator to verify if the `mindepth` of the tuple we are checking is strictly greater than all the values present in the subquery.

This equivalent way of solving the query is more elaborate than the simplest and most efficient solution, which is to use the `mindepth > 4` condition directly. This is simply an example to demonstrate that there's often more than one way to get the **same result** for **any state** of the database. This is the definition of **equivalent queries**.

Also, in many situations, it’s useful to use operators like `ANY`, `IN`, `ALL`, `EXISTS`, and so on in combination with other arithmetic operators on a subquery to define conditions that certain tuples must meet, as shown in these examples.

So far, we’ve seen queries that use subqueries in their implementation, but those subqueries essentially behave as if they were queries themselves. This means we can execute them directly on the DBMS as if they were regular queries. So nothing prevents a subquery from being made up of subqueries at a "lower" level, meaning subqueries that are at a **nesting level** below the other **subquery**, which in turn is at a lower nesting level than the **query** it’s in.

Basically, SQL allows us to chain as many subqueries as we want within a query or subquery. This helps us solve problems like the query below, which retrieves a list with information on all the people who don’t have a valid driver's license:

```pgsql
SELECT *
FROM Person P
WHERE NOT EXISTS (
    SELECT *
    FROM DrivingLicense D
    WHERE D.LicenseID IN (
            SELECT LicenseID
            FROM DrivingLicenseRequest R
            WHERE R.PersonFK = P.PersonID
        )
);
```

We could approach this query so that it'd require `JOIN` operations to solve it. But in this case, it’s structured in a "nested" manner at the subquery level so that it requires the use of subqueries.

So to get this list, we first go through all the people in the Person table. For each one, we check that there is no driver's license whose associated request was created by that person. We can implement this condition by applying the `NOT EXISTS` operator to a subquery that returns all valid driver's licenses associated with a person. We get these by filtering `DrivingLicense` to licenses whose matching `DrivingLicenseRequest` row has `PersonFK = P.PersonID` – that is, licenses requested by the current person.

Regarding this last point, as you can see in the code, the simplest way to implement it with subqueries is to check that the `LicenseID` of the valid driver's license exists in the set of `LicenseID` values from the requests in the `DrivingLicenseRequest` table whose foreign key points to the person being iterated over in Person. That makes this subquery **correlated** with the outer query we are making, as it includes the attribute `P.PersonID`.

In short, we’ve implemented this query by **nesting subqueries**, where SQL allows us to reach an arbitrary level of nesting according to the needs of the query. But we could’ve done it in other ways like using `JOIN` operations, which in certain situations are easier to understand than the approach we just followed.

Just remember that nesting queries is not always the best way to solve a problem, especially when multiple levels of nesting are created (whether correlated or not with each other). We’re just showing what’s possible here. It’s only worthwhile when it improves the efficiency or clarity of the query sufficiently compared to other alternatives.

Let’s talk about where or in which statement subqueries can be nested. In the below code, you can see how the subquery is nested in the `FROM` clause.

```pgsql
SELECT P.Name
FROM Person P
    INNER JOIN (
        SELECT DISTINCT PersonFK
        FROM Rental
    ) R ON R.PersonFK = P.PersonID;
```

Since it returns a table with tuples, we’ll often use that query result in a `FROM` clause to get the information from the tuples and return it to the user through a `SELECT`. Or we could even combine it with another table using a `JOIN` operation, as in this case. Specifically, this query will get information about all the people who have rented a bike at some point at least one.

So the approach we follow to resolve the query is to perform a `JOIN` between the `Person` table (that contains all the people in the system) and a table that has the identifiers of the people pointed to by the **foreign key `{PersonFK}`** of any tuple in Rental. This means anyone whose identifier is referenced by any tuple in Rental, implying that they’ve rented a bike at least once.

We can construct this list of person identifiers using a subquery that extracts all the `PersonFK` values from the Rental table while removing duplicates. A person may have made an arbitrary number of rentals throughout their history, but we’re interested in whether they have made at least one. So, we simply need to know if they appear in the list of `PersonFK` values.

Then, using an `INNER JOIN`, we combine the information of `PersonFK` returned by the subquery with the tuples from the `Person` table. This gives us all the information of the people identified by `PersonFK`, which in turn points to `PersonID`. But since we want, for example, the names of the people and not just their identifiers, both the `JOIN` and the **subquery** are essential, because if we only needed the identifier, it would be enough to return what the subquery provides.

In addition to nesting subqueries in the FROM clause, we can also do it in the `SELECT` clause, where the main goal is to calculate a metric or get more information for each tuple in the query. That is, if in the `SELECT` we get attributes `P.PersonID` and `P.Name` from each of the tuples returned to the user, we might want to get more information beyond these two attributes that needs to be calculated with a query. In this case, this query will be nested as a subquery in the `SELECT`, and it’s result will be the value added to the additional attribute representing the subquery in the `SELECT`.

```pgsql
SELECT P.PersonID,
    P.Name,
    (
        SELECT COUNT(*)
        FROM Residence R
        WHERE R.PersonFK = P.PersonID
    ) AS NumResidences
FROM Person P;
```

In these cases where the subquery is nested in the `SELECT` statement, the subquery must meet a basic requirement: it has to return at most one tuple and one column. This is because the result of the subquery will be added in a new **additional column (and only one)** in our `SELECT`. Then we’ll calculate its result and add it in each tuple of the outer query – so the subquery can’t return more than one tuple.

For example, in this query, we want to list all the people in the database along with a column that contains the number of residences they have had. To solve this, the simplest approach is to go through all the tuples of `Person` and, for each one, count how many tuples of `Residence` have their foreign key `PersonFK` referencing that person.

Going through the tuples of `Person` is simple: we just use a combination of `SELECT` and `FROM`. But in order to count how many tuples of `Residence` meet this condition for each person, we need a correlated subquery – specifically with the person being processed. We can uniquely identify this with `P.PersonID`.

We need to do this because to count tuples in `Residence`, we have to compare the values of their foreign key `PersonFK` with the identifier `P.PersonID`. To get the value of this count, we can use a subquery: the aggregation function `COUNT(*)` lets us count all the tuples present in `Residence`. It does this after filtering them with the condition that their foreign key `PersonFK` references the person being processed in the Person table.

It’s important to note that the subquery will only return one value generated by `COUNT()`, and only one column generated by this function. This meets the requirement that every subquery used in the `SELECT` statement must fulfill.

Finally, it’s worth mentioning that this value generated in the subquery populates an additional column which we’ve added by including the subquery itself in the `SELECT` for each tuple of our query. In other words, each tuple will need a value for this **new column**, which they’ll get by executing the correlated subquery on that specific tuple.

`SELECT` and FROM aren’t the only statements where subqueries are allowed. We can also use them in a `WHERE`, `HAVING`, or even `ORDER BY` clause. More importantly, a query can have an arbitrary number of subqueries (nested or not) depending on its needs.

```pgsql
SELECT P.PoolID,
    P.Name AS PoolName,
    C.Name AS CityName,
    P.Status,
    (
        SELECT PoolID
        FROM CityPool C
        WHERE C.PoolID = P.PoolID
    ) AS CityPoolID
FROM (
        SELECT *
        FROM Pool
        WHERE Status = 'maintenance'
    ) AS P
    JOIN City C ON P.CityFK = C.CityID;
```

For example, in a query like the one above, we can see that there is not only a subquery in the `SELECT` but also one in the FROM.

In this specific case, the query gets information about all the pools currently under maintenance, including details about the city the pools are located in (such as its name). There’s also an additional column indicating the pool's identifier if it’s of the `CityPool` type, leaving it blank if it’s not.

So to resolve this query, we first need to get information about the pools under maintenance. This simply involves going through the tuples in the `Pool` table and selecting those whose Status value is `'maintenance'`.

Then, to gather information about the city where each pool is located (along with the `Pool` tuples we just obtained), we can use a `JOIN` that operates on the previous tuples and the `City` table. This is why we’re extracting all `Pool` tuples using a subquery.

So although the type of `JOIN` is not explicitly specified, by using the `ON` clause SQL automatically interprets it as an `INNER JOIN` (it would also be interpreted as `INNER` type if we had used the `USING` clause). But this practice is not recommended, as in most situations where the JOIN type is omitted, the readability of the code is compromised, especially when there are many `JOIN`s in the same query.

Here, in the `ON` clause, the `JOIN` condition states that in the same tuple of the Cartesian product, the foreign key `CityFK` – which represents the city where the pool is located – must have the same value as the `CityID` identifier of the city in the tuple.

Then, to attach the extra column with the pool identifier from `CityPool` for those tuples that represent pools of that type, respectively, we’ll use a subquery. This subquery searches the `CityPool` table for a tuple whose `PoolID` matches the `PoolID` from `Pool`. This checks if the pool from `Pool` is actually of the `CityPool` type or not.

In this way, the subquery will return the **identifier value** if it’s of the **`CityPool` type** – otherwise, it will return **nothing**, meaning it will return a **table without tuples** (or in other words, an empty set or **multiset**, rather).

This is allowed in SQL, but it can sometimes cause errors, so it's generally not a good practice to use subqueries in the `SELECT` that aren’t guaranteed to return at least some tuple.

So for those pools that aren’t of the `CityPool` type, the subquery will return nothing. This means that the value of the extra column in the `SELECT` will be `NULL` as we can see when executing the query.

Since it doesn’t return any tuple with any value, we’ll insert an **unknown** value. The way to represent this in SQL is with the special value `NULL`. Also, this extra column by default has no name, so we can assign it a recognizable alias using the `AS` clause as shown in the query.

On the other hand, if we want to avoid having `NULL` values in the additional column, we can have this column contain boolean values where `TRUE` indicates that the pool is of the `CityPool` type and `FALSE` that it’s not.

Starting from the same query as before, the only change we need to make to achieve this is to add an `IS NOT NULL` check. For each tuple, it checks whether the value inserted in the additional `CityPoolType` column is `NULL` or not. Thus, if its type is indeed `CityPool`, the value in the additional column provided by the original subquery won’t be `NULL`. This meets the `IS NOT NULL` condition and returns `TRUE`. Conversely, if it’s not of that type, `IS NOT NULL` won’t be met, and the additional column in this case will be filled with FALSE.

```pgsql
SELECT P.PoolID,
    P.Name AS PoolName,
    C.Name AS CityName,
    P.Status,
    (
        SELECT PoolID
        FROM CityPool C
        WHERE C.PoolID = P.PoolID
    ) IS NOT NULL AS CityPoolType
FROM (
        SELECT *
        FROM Pool
        WHERE Status = 'maintenance'
    ) AS P
    INNER JOIN City C ON P.CityFK = C.CityID;
```

Here, we need to be careful about where we place the `IS NOT NULL` condition. On one hand, we might think of comparing the `PoolID` attribute of the `CityPool` table itself in the `SELECT` clause of the subquery. If we do this, we’ll be comparing a value that may or may not exist with `NULL`, so the final result of the subquery will be `FALSE` if the pool is of the `CityPool` type.

But if it’s of another type, there won't even be a value for that `PoolID` attribute in the `CityPool` table, so the comparison with `NULL` won’t be executed. This will result in the final query output having the additional column contain `NULL` values for pools that aren’t of the `CityPool` type and `FALSE` for those that are of the corresponding type.

This happens because we shouldn’t compare `PoolID` with `NULL`, as its value may or may not exist. And if it doesn't exist, the check won't be executed for all the tuples in our query.

Instead, we should perform this check on the result of the entire subquery. It can be `NULL` when the pool is not of type `CityPool` – and so we see values in the additional column filled with `NULL` in the final result. Or it can contain a valid identifier different from `NULL`, which violates the `IS NOT NULL` condition.

In short, the check to ensure that the additional column is of **boolean** type should compare the result of the entire subquery (which is either NULL or a specific value) with the `NULL` value itself. This checks to see if each tuple in our resulting table matches or not.

In summary, although it's not good practice to use subqueries in the `SELECT` clause that may result in an **empty set**, we can do so long as it doesn't make the readability or efficiency of the query worse. We also need to have certain guarantees that it does what it’s expected to do.

So far, we've performed membership checks with IN, as well as checks with other operators. We’ve used individual attributes to verify if the value of a certain attribute was in a set formed by the values of an attribute, among other conditions. And sometimes we need these conditions to involve more than one attribute for verification.

```pgsql
SELECT E.EntryTimestamp, E.PersonFK, E.PoolFK
FROM Entry E
WHERE (E.EntryTimestamp, E.PersonFK, E.PoolFK) IN (
        SELECT PS.EntryFK, PS.PersonFK, PS.PoolFK
        FROM PoolSanction PS
    );
```

For example, above we have a query that retrieves all the tuples from `Entry` that have been sanctioned with some pool sanction from the `PoolSanction` table. To do this, we simply need to go through the tuples in `Entry` and, for each one, check if it has a sanction. In other words, we verify if there is a tuple in `PoolSanction` whose foreign key to `Entry` references the tuple we’re examining.

When doing this, the first thing we notice is that the primary key of `Entry` doesn’t consist of a single attribute, but rather 3. This is just like the foreign key in `PoolSanction` – it determines that the entry that has been sanctioned doesn’t have one attribute, but three.

So under normal conditions, we could use a subquery to get all the foreign key values from `PoolSanction`, then check if the identifier (primary key) of each entry belongs to that set of values using the `IN` operator. But here we can’t do it the same way because we need to work with three attributes instead of one.

That's why, in the subquery, instead of returning a single attribute, we return all those that make up the foreign key to `Entry` (these are **`(EntryFK, PersonFK, PoolFK)`**). With this, we have a set of tuples where each one refers to a tuple in `Entry` that has been sanctioned.

Specifically, each of these tuples in the set refers to the three attributes that make up the primary key of `Entry`, which are `(EntryTimestamp, PersonFK, PoolFK)`. So to check if an entry belongs to this set, we simply go through it, looking to see if any of the tuples match exactly with the tuple of the entry's primary key (with all three attributes having equal values).

We do this using the `IN` operator, where instead of specifying a single attribute, we can specify an arbitrary number of them in parentheses. Thus, the `IN` operator will perform the same operation as in previous cases, taking the primary key `(EntryTimestamp, PersonFK, PoolFK)` of each entry and comparing it with each of the tuples from the subquery, attribute by attribute. If any of them match, then it belongs to the set, fulfilling the condition.

Here, it's very important to note that the tuples compared by `IN` must be the same size. This means that they need to have the same number of attributes, the same data type (or at least be comparable), and their semantics must be the same. That is, if for each tuple in `Entry` we use `(EntryTimestamp, PersonFK, PoolFK)` to check if that three-attribute tuple is in the subquery set, then that subquery must contain tuples of three attributes where:

- the first one is `EntryFK`, which refers to the `EntryTimestamp` attribute of the primary key of Entry,
- The second one is `PersonFK`, referring to `PersonFK` of the primary key,

and so on. This ensures that the comparison is semantically correct, even though in the DDL the primary key might have been defined in a completely different order.

Another variation of this query is to list all the sanctioned entries along with the information of the person who has the entry.

```pgsql
SELECT P.*, E.EntryTimestamp, E.PersonFK, E.PoolFK
FROM Person P INNER JOIN Entry E ON P.PersonID=E.PersonFK
WHERE (E.EntryTimestamp, E.PersonFK, E.PoolFK) IN (
        SELECT PS.EntryFK, PS.PersonFK, PS.PoolFK
        FROM PoolSanction PS
    );
```

For this, based on the previous solution where we got the list of sanctioned entries, the only additional step we need to take is to perform a `JOIN` between `Entry` and Person. In doing this, we only keep those tuples from the Cartesian product where the foreign key `PersonFK` from Entry refers to the primary key `{PersonID}` from the information coming from Person.

We can also see that the condition checking whether the entry is sanctioned or not is the same. With this example, we can more clearly see the purpose of the `JOIN` operation, which is to gather information from multiple tables. So for each sanctioned entry we had before, if we now need to concatenate the information of the person to whom the foreign key `PersonFK` points, we can simply perform the Cartesian product between both tables and impose a condition to ensure that the reference of `PersonFK` is indeed the person present in the tuple.

Continuing with the uses of this last technique, where we use operators like IN to check if a certain combination of attribute values belongs to a set of tuples, in the following example we have a query that lists all the trips from the `Voyage` table for which there is a return trip. That is, we need to find all trips going from city A to city B for which there is at least one other different trip going from B to A.

```pgsql
SELECT *
FROM Voyage V
WHERE (V.DepartureCityFK, V.ArrivalCityFK) IN (
        SELECT V2.ArrivalCityFK,
            V2.DepartureCityFK
        FROM Voyage V2
    )
ORDER BY (V.DepartureCityFK, V.ArrivalCityFK);
```

To do this, the first thing we need to realize is that the primary key of `Voyage` includes the attributes `DepartureCityFK` and `ArrivalCityFK`, which refer to the start and end cities of the trip, respectively. So if we have multiple trips with different values in these attributes, we’ll definitely know that both trips are different. This is because even if the rest of the primary key attributes were the same, as long as at least one of them is different, the trips must necessarily be different.

So we can formulate the query similarly to the previous ones, going through all the tuples in Voyage and for each one, checking if there is a trip whose start and end cities are the same the end and start cities of the trip being checked. So for each trip in Voyage, we construct a correlated subquery where we again go through all the tuples in Voyage and only get the values of the `DepartureCityFK` and `ArrivalCityFK` attributes. Then, we check if the values of these attributes from the trip in the "higher level" query are in the set of tuples we just built.

But in this case, if we look at the code, the order of the attributes is swapped compared to the order of those same attributes in the subquery. What we really want to check is that the value of the `DepartureCityFK` attribute of the tuple we are checking in the query matches the value of the `ArrivalCityFK` attribute of some tuple in the subquery. Also, we need to check that the value of the `ArrivalCityFK` attribute of the query's tuple matches the value of the `DepartureCityFK` attribute of the same tuple that matched the previous pair of attributes.

We can more easily understand this by viewing the pair `(V.DepartureCityFK, V.ArrivalCityFK)` as if they were the start and end cities, A and B, of a trip. What we want to check is if there is any tuple in the subquery that has B and A as the start and end cities, respectively.

The simplest way to make this check is either to reverse the order of the attributes in the tuple `(V.DepartureCityFK, V.ArrivalCityFK)` or in the attributes of the `SELECT` in the subquery. This is what we’ve decided to do here, which is why `ArrivalCityFK` is returned before `DepartureCityFK`.

Finally, to more easily check for the existence of these round trips, we can add the `ORDER BY` clause, which orders by multiple attributes instead of just one. That is, we use the attributes `(V.DepartureCityFK, V.ArrivalCityFK)` as the sorting criteria. SQL orders by the pairs of values for each tuple, as if each possible pair of values were considered a single value that could be compared with others.

By doing this, we can easily focus on the departure city of a trip and then look for another trip whose arrival city has the same value. Then we can find one whose departure city matches the arrival city of the original trip, thus finding a pair of trips that form a round trip to a city.

Finally, let’s look at another query where we need to compare values of multiple attributes at once. Here, all trips are listed whose associated cruise (the one making the trip) has been assigned to its cruise line on the same start date of the trip.

```pgsql
SELECT V.*
FROM Voyage V
WHERE (V.ShipFK, V.DepartureDate)
  IN (
    SELECT SA.ShipFK, SA.StartDate
    FROM ShipAssignment SA
  );
```

To implement this, we need to consider all the attributes that `Voyage` has, including the information contained in the foreign keys, to avoid having to perform unnecessary operations like a JOIN with the `CruiseShip` or `CruiseLine` table.

In this case, we structure the query similarly, first going through all the tuples of `Voyage` and checking if the cruise has been assigned to its cruise line on the same date as the start of the trip.

To make this check easier, we construct a subquery that returns all the values of the `ShipFK` and `StartDate` attributes from the `ShipAssignment` table. This way, later in our query we can check if the cruise making the trip (which is referenced with the foreign key `ShipFK` of `Voyage`) was assigned on the DepartureDate of the `Voyage` tuple (start date of the trip) to any cruise line.

As you can see, we can simplify the query if we think of it as getting all trips for a cruise ship that has been assigned a start date with any cruise line. In other words, it doesn't have to be a specific line, but any line to which it was assigned on the date indicated by `DepartureDate` of `Voyage`. So in the `WHERE` clause, it checks if the pair of values taken by the attributes `(V.ShipFK, V.DepartureDate)`* are found in the subquery. And this time it maintains the correct order of the attributes, since `ShipFK` of Voyage must match `ShipFK` of `ShipAssignment`, and `DepartureDate` of `Voyage` must match StartDate of `ShipAssignment`, respectively.

On one hand, the match of `ShipFK` ensures that the cruise ship making the trip is the same as the one assigned in the `ShipAssignment` tuple. Likewise, the match of the date attributes ensures that this assignment was made on the start date of the trip.

We have also solved this query using a correlated subquery and the IN operator, although it's not the only way. As you can guess, there's always the option to use `JOIN` operations and conditions to filter the tuples, which can be more or less efficient in certain cases. This is why it's important to understand what SQL does under the hood, like whether it actually builds and stores all the tuples of a subquery or Cartesian product in memory, and when it does so.

---

## Common Table Expressions

We have seen that subqueries allow us to use the result of one query within another query. We can construct this once during the execution of the entire query if it’s not correlated, or once for each tuple of the table with which it’s correlated. In other words, we can see a subquery as a set of tuples that we operate with in a query.

But we don't always need queries to be correlated. We’ve seen that some queries can be resolved by non-correlated queries, meaning sets of tuples that are constructed only once and are sufficient to resolve the entire query in which they are contained.

In these situations, to simplify notation, we can use a tool called **CTE (Common Table Expression)** in SQL. These typically use the [<FontIcon icon="fas fa-globe"/>`WITH`](https://geeksforgeeks.org/sql/sql-with-clause/) **clause**. With this, we can define and store the result of a subquery in a temporary table that needs an alias. So instead of using a subquery in the construction of a query, we define a [<FontIcon icon="fa-brands fa-stack-overflow"/>temporary intermediate table](https://stackoverflow.com/questions/49990666/trying-to-create-multiple-temporary-tables-in-a-single-query) **(Common Table Expression)** that only exists during the execution of the query and contains all the tuples generated by a certain subquery. Again, we need to use an alias to refer to it, just as we have to provide tables with a name and a schema when we create them in the DDL.

To understand the `WITH` clause with an example, we can consider the query that gets information about all currently active cruises. Here, active means assigned to a cruise line at the current date when the query is executed.

Before writing code, it's helpful to think about how the query will be structured, meaning where we’ll get the data to respond, how we should combine the different tables with that data, what conditions or operations need to be applied to them or the tuples resulting from the operations performed, and so on.

```pgsql
WITH ActiveShips AS (
    SELECT ShipFK
    FROM ShipAssignment
    WHERE StartDate <= CURRENT_DATE
        AND EndDate >= CURRENT_DATE
)
SELECT CS.ShipID, CS.Speed, CS.PassengerCapacity
FROM ActiveShips A INNER JOIN CruiseShip CS ON CS.ShipID = A.ShipFK;
```

In this case, the information for all cruise assignments, whether current or not, is in the `ShipAssignment` table. So, to know which cruises are currently assigned to a cruise line, we can take advantage of the fact that this table has a **foreign key `ShipFK`** that identifies the assigned cruise in each tuple of `ShipAssignment`.

So, if we set the condition that the `StartDate` of the assignment should be before the current date gotten from `CURRENT_DATE`, and that the `EndDate` is after the current date, we’ll get all those assignments that are valid on the current date. By extracting the values taken by the foreign key `ShipFK` for those assignments, we can identify the cruises that are currently assigned.

But the query not only asks us to **identify them** – but also to get **information about them** stored in `CruiseShip`. So, we save the identifiers of the cruises we got earlier in a temporary table to use in the query. In other words, we could make the conditions on `StartDate` and `EndDate` apply to `ShipAssignment` in a subquery. But to simplify the notation and demonstrate how to use **CTEs**, we’ll use the `WITH` clause where we define all the subquery code and assign an alias to that temporary table (see above code).

Specifically, by doing this, we’ll be saving the identifiers of the currently active cruises in the temporary table named `ActiveShips`. This is the alias we assigned using the `AS` operator – but it works in reverse in the `WITH` clause: first, you write the alias name and then you writethe code that gets the data from the intermediate table (the element to which the alias name is assigned).

So, when we use the `WITH` statement, we see that we have constructed an `ActiveShips` table with the result of what could be a **non-correlated subquery** – but for simplicity, we’ve refactored it so that its result is stored in an intermediate table with a certain alias.

Now, we can treat `ActiveShips` as if it were another table in the database, performing a `JOIN` between it and `CruiseShip` to get all the information about the active cruises. We impose an equality condition on the `ShipFK` and `ShipID` attributes of the **ActiveShips** and `CruiseShip` tables, respectively. This means we only keep those tuples from the Cartesian product where the foreign key `ShipFK` refers to the `ShipID` identifier of that same tuple. This allows us to find the complete information about a specific cruise.

In the previous query, we could have easily skipped using `WITH` and made `ActiveShips` a subquery to which we could’ve also assigned an alias. But when using a subquery, even if we assign it an alias, we can’t use it in just any part of the query. That is, if we have a subquery in a `FROM` or a `SELECT`, we can’t use it in other parts of the query in the same way as we can use an intermediate table defined in a `WITH`. This (`WITH`) we can reference at any point in the query, regardless of whether it’s formed by more subqueries.

```pgsql
WITH VoyageDistance AS (
  SELECT * 
  FROM Voyage
  WHERE Distance > 1000
)
SELECT DepartureDate, ArrivalDate, Distance
FROM VoyageDistance 
WHERE DepartureDate BETWEEN '2025-01-01' AND '2025-06-30';
```

We have another similar example in the query above. Here, we consider a query that gets information about all voyages that started in the first half of 2025 (approximately) and have a distance greater than 1000 kilometers. The approach in this case is simpler since all the information we need is found in the `Voyage` table. So the condition that the distance is greater than 1000 kilometers is easily modeled with a `WHERE` clause and the expression `Distance > 1000`.

Just like before, in this query we could also skip using `WITH` and include both the distance and the condition on the start date of the voyage in a single `WHERE`. But often we might need to modify or expand a query – for example, in the future we might be asked for a query based on this one, but with more or fewer conditions. So if we conducted an **analysis** of our domain, user requirements, and the query code, we might conclude that tuples with voyages over 1000 kilometers could be needed in multiple parts of the same query.

In this example, this phenomenon might not occur, but it illustrates that in a real situation, we may need to consider various factors that affect query design.

So, say we assume that the Voyage tuples with `Distance > 1000` could potentially be used multiple times in a single query across multiple statements (in future modifications of this query). Then the most maintainable option is to use a `WITH` clause where we temporarily store these tuples and then use them in the query through the alias of this intermediate table (as if it were a regular database table). Then, we can add another `WHERE` clause at the very end of the query, declaring the condition that the start date of the voyage is in the first half of 2025. We can model this with the `BETWEEN` operator, the `EXTRACT()` function, or many other ways.

Finally, it’s worth noting that using the `WITH` clause without a clear reason isn’t considered a good practice. (Examples of such a clear reason might include a design decision based on user requirements or a thorough analysis of the query that concludes that it might be useful to have an intermediate table like `VoyageDistance` in the future).

This is mainly because, in situations like this, a `WHERE` clause is being used both in the construction of the intermediate table and in the resulting table from the query. This means multiple filters might be applied internally, which can be inefficient.

But the DBMS often automatically applies certain techniques like [<FontIcon icon="fas fa-globe"/>inlining](https://dba.stackexchange.com/questions/212198/how-can-i-find-out-if-a-sql-function-can-be-inlined) to optimize query execution through **refactorizations** of the **execution plan**. In other words, even if our code is not the most optimal, the DBMS can automatically find an equivalent and more optimal way to resolve the query.

To illustrate that the intermediate tables we define in the `WITH` clause can be constructed with subqueries as "complex" as we want, consider this query:

```pgsql
WITH Pending AS (
    SELECT D.*
    FROM DrivingLicenseRequest D
        LEFT JOIN DrivingLicense A USING (LicenseID)
        LEFT JOIN RejectedDrivingLicense R USING (LicenseID)
    WHERE A.LicenseID IS NULL
        AND R.LicenseID IS NULL
)
SELECT P.Name, Pending.*
FROM Pending INNER JOIN Person P ON P.PersonID = Pending.PersonFK;
```

We’re getting information on all driving license requests currently being processed, meaning those that have not yet been accepted or rejected. We’re also including information about the person who made each request.

In this case, the key point is to realize that the requests in process are represented by tuples in `DrivingLicenseRequest` that aren’t referenced by any tuple in either `DrivingLicense` or `RejectedDrivingLicense` (since they aren’t yet accepted or rejected).

In this case, we can use `LEFT JOIN` so that by combining all these tables with `LEFT JOIN` operations, we can gather complete information about the requests. This means constructing a table formed by all the attributes of the three tables in the hierarchy, where some of them will be `NULL` or not in each tuple, depending on whether they represent accepted, rejected, or pending requests.

Specifically, since the foreign keys of the inheriting entities in the hierarchy are both called `LicenseID` (matching the identifier `{LicenseID}` of the superclass), the **`LEFT OUTER JOIN`s** are performed by applying an equality condition on this attribute. This ensures that the tuples we get contain information about the same request, rather than multiple requests in the same tuple of the Cartesian product.

We use `LEFT JOIN` because the first table we combine is `DrivingLicenseRequest`. We know all its tuples are non-null because it represents the superclass of the hierarchy and contains information on all requests in the database, regardless of their status. So by placing this table on the left of the `JOIN` operation, we ensure that the information of all the tuples it contains appears – and it fills in `NULL` for the attributes from the other table, DrivingLicense.

Then, we do another `LEFT JOIN` with `RejectedDrivingLicense` following the same process. This results in a table where, despite using USING in the JOIN operations, we can impose conditions on the `LicenseID` attributes of all the tables. So for a tuple of the resulting Cartesian product to represent a pending request, the `LicenseID` attributes of the `DrivingLicense` and `RejectedDrivingLicense` tables must be `NULL`. This indicates that there are no tuples in the respective tables because the `LEFT JOIN` has been filled in with `NULL` if they didn't exist. We declare this condition using a WHERE clause and the IS operator, as you can’t compare an attribute with `NULL` directly using the `=` operator.

At this point, to simplify the query syntax and avoid chaining too many `JOIN`s, we can create an intermediate table with the result we got by performing these `LEFT JOIN`s and applying the previous condition. This way, we can later perform an `INNER JOIN` in the query to get the information of the person who made the request. We do this all through the `PersonID` attribute of the `Person` table and the **foreign key `PersonFK`** of the intermediate table `Pending`, which comes from the `DrivingLicenseRequest` table and refers to the person associated with the request.

In this query, we could also consider combining all the joins in a single FROM clause and skipping the `WITH`. This would be correct, but it would complicate the code by having all the `JOIN`s chained. And, although this strategy can be more efficient under certain circumstances, we should seek a balance between code readability and efficiency.

To illustrate that the intermediate tables in the `WITH` clause can be defined by queries that contain subqueries, we’ll consider the same query as before and try to solve it using a different approach.

```pgsql
WITH Pending AS (
    SELECT D.*
    FROM DrivingLicenseRequest D
    WHERE NOT EXISTS (
            SELECT *
            FROM DrivingLicense A
            WHERE A.LicenseID = D.LicenseID
        )
        AND NOT EXISTS (
            SELECT *
            FROM RejectedDrivingLicense R
            WHERE R.LicenseID = D.LicenseID
        )
)
SELECT P.Name, Pending.*
FROM Pending INNER JOIN Person P ON P.PersonID = Pending.PersonFK;
```

To get pending requests, keep the tuples in `DrivingLicenseRequest` whose primary key `{LicenseID}` is not referenced (via the foreign key `LicenseID`) by any tuple in `DrivingLicense` or `RejectedDrivingLicense`.

The simplest option to implement this is to go through all the tuples in `DrivingLicenseRequest` using the FROM clause, and for each of them, construct two very similar correlated queries.

- We can have one that gets all the tuples from `DrivingLicense` whose foreign key `LicenseID` refers to the primary key `LicenseID` of the tuple in `DrivingLicenseRequest` that we are going through, and
- We can have another subquery that does the same but gets tuples from the `RejectedDrivingLicense` table.

In this way, we can later check if any of the tables returned by the subqueries contain tuples or not using the `EXISTS` operator.

If any of the subqueries return tuples, then the request is either accepted or rejected. But if both subqueries return an empty set, it means that for a certain request in `DrivingLicenseRequest`, there is no tuple in the respective `DrivingLicense` or `RejectedDrivingLicense` tables that references it. This then indicates that the request is being processed.

With this process, we get the pending requests, which we store in an intermediate table using the `WITH` clause. To combine the information of the person who made each request, we use the intermediate table in the query, specifically in an `INNER JOIN` operation with the Person table, just as we did before.

So with this example, we’ve seen that there are multiple SQL constructions that lead to the same result – meaning a query doesn't necessarily have to be solved in just one way.

Also, by using the `WITH` clause, we can define each intermediate table with SQL code that’s as **"complex"** as we need it to be. We can include subqueries, conditions, and generally any SQL statement, except for a `WITH`, which by default can’t appear inside another `WITH`.

If we need to use an intermediate table to solve a query defined as a **CTE**, we need to define it at the same level as the other intermediate tables in our query, meaning in a single `WITH` statement (as we’ll see below).

So far, we have seen that we can use the `WITH` statement to define an intermediate table that we use to solve the query more comfortably and easily in certain situations. But, we might need several intermediate tables to solve a query, not just one.

For example, in the below code we have a query that gets information about people who have lived in at least two cities. We solved this query in the **“Tuple filtering”** section using `JOIN` operations – but we can also follow a similar approach where we first create several different intermediate tables and finally solve the query based on the results of these intermediate tables.

```pgsql
WITH R1 AS (
    SELECT PersonFK, CityFK AS CityA
    FROM Residence
),
R2 AS (
    SELECT PersonFK, CityFK AS CityB
    FROM Residence
),
CityPairs AS (
    SELECT DISTINCT R1.PersonFK
    FROM R1 INNER JOIN R2 ON (R1.PersonFK = R2.PersonFK
        AND R1.CityA <> R2.CityB)
)
SELECT P.*
FROM CityPairs MC INNER JOIN Person P ON MC.PersonFK = P.PersonID
ORDER BY P.PersonID;
```

First, we can create several intermediate tables that contain all the tuples from Residence – specifically the information about the person and city that make up each residence. We can do this by obtaining the attributes `PersonFK` and `CityFK`, which are foreign keys that refer to the person who has lived in a certain city during that residence. By constructing several intermediate tables with this information, we can rename `CityFK` with an alias like `CityA` in one of them and `CityB` in the other intermediate table, so that later the `JOIN` between them has a clearer syntax.

To construct several intermediate tables in a single `WITH` statement, we can chain them with commas. Instead of using the `WITH` keyword multiple times, we have to use it only once and chain all the intermediate tables we want with commas, as shown above.

Subsequently, with the intermediate tables `R1` and `R2` containing this information, we can create another intermediate table where we get the identifiers of all the people who have had a residence in several different cities (or in at least two cities).

To do this, we can perform an `INNER JOIN` between `R1` and `R2` (a Cartesian product of their tuples) and keep the tuples from the Cartesian product where the foreign key values `PersonFK` match and the `CityFK` values do not match. This way, we keep those tuples from the Cartesian product that represent information about several residences of the same person in different cities.

These identifiers are for the people whose information we need to get from the `Person` table. So now we can finally perform an `INNER JOIN` between the intermediate table `CityPairs` and `Person`, so that the final result of the query is the information of the people who have had at least two residences in different cities. (They would not have appeared in a tuple of the Cartesian product between `R1` and `R2` otherwise.)

The important point about this query is to note that we have used **multiple intermediate tables** in the same `WITH` clause to solve it – and this is entirely **possible** but not always recommended. We can resolve this query in various ways, each with its own advantages or disadvantages depending on the characteristics we need the code to have, such as clarity, efficiency, maintainability, and so on.

To conclude this CTE section, let's consider another query where we need to get information about bus trips that have taken place after 2025 and where the bus has WiFi. The simplest way to create this query would be to gather information from the `CityBus` and BusTrip tables using a JOIN, and then apply conditions on the tuples of the corresponding Cartesian product. But to illustrate using multiple **intermediate tables (CTEs)** in a single `WITH` clause, in this case, we’ll divide the query resolution into several parts.

```pgsql
WITH WifiBuses AS (
    SELECT Plate, RouteNumber
    FROM CityBus
    WHERE FreeWifi = TRUE
),
AvailableTrips AS (
    SELECT TripDate, StartAddress, EndAddress, PlateFK
    FROM BusTrip
    WHERE EXTRACT(YEAR FROM TripDate) >= 2025 
)
SELECT T.TripDate, T.StartAddress, T.EndAddress, B.RouteNumber
FROM AvailableTrips T INNER JOIN WifiBuses B ON B.Plate = T.PlateFK;
```

First, we’ll get information about buses with `WiFi` in an intermediate table. To construct this table, we simply apply the condition `FreeWifi=TRUE` on the tuples of the `CityBus` table. In this case, when we do a `SELECT * FROM CityBus;` we can see that in the `FreeWifi` attribute, the boolean values are represented with the letters `'t'` or `'f'` – so we might think that in the query we should compare the attribute with `'t'`.

But boolean values in SQL are `TRUE` and `FALSE`, even though the DBMS [<FontIcon icon="fas fa-globe"/>represents](https://dba.stackexchange.com/questions/115234/why-t-and-f-instead-of-true-and-false) them with another type of notation. So the correct way to check if the attribute contains the logical value `true` is to compare it with `TRUE`. Even though the representation of the boolean value might change, in SQL we should always operate with boolean values using the literals `TRUE` and `FALSE`.

Second, we construct another intermediate table with information about bus trips that have occurred in 2025 or later. We do this by getting all the tuples from BusTrip and filtering them using the `EXTRACT()` function and the `YEAR` feature of the date.

Finally, in the query, we perform a `JOIN` between both intermediate tables to gather all the information about trips and buses. This way, we get tuples with trips that occurred on dates equal to or after the year 2025, along with the information about the bus with `WiFi` that made that trip.

But in this case, we only return the route number of the bus to the user, which is also part of the information in the CityBus table. If this isn’t enough to identify the bus, we could also return its license plate in the `SELECT`, for example. This decision depends on what the end user needs.

Also, with this query, we can more clearly see the effect of coding a query using multiple intermediate tables on how efficiently it executes. For example, if we coded the query without `WITH` (and instead with `JOIN` operations between the respective CityBus and BusTrip tables and imposed conditions on the resulting tuples), we have to consider that the entire Cartesian product would be performed first and then filtered by the conditions.

But by using intermediate tables where each one imposes a certain condition on the tuples of each table, we can reduce the number of tuples in each intermediate table, since **WifiBuses** won’t contain all existing buses, but only those with `WiFi` (which will be fewer).

By applying this technique (known as [<FontIcon icon="iconfont icon-oracle"/>early filtering](https://docs.oracle.com/cloud/latest/big-data-discovery-cloud/BDDEQ/ceql_bp_filter_early.htm#BDDEQ-concept_F3B83B6965AC40429E5C68AB330BA74E)), we ensure that when performing the final `JOIN` between the intermediate tables, the Cartesian product results in **fewer tuples** – meaning it works with smaller tables and is therefore **more efficient**.

Just keep in mind that in modern DBMS, this optimization can be carried out [automatically](https://stackoverflow.com/questions/46727600/sql-performance-filter-first-or-join-first) even without using intermediate tables, depending on the nature of the query. So if it doesn’t significantly worsen the clarity of the query, we should filter the information from the tables to be combined via a `JOIN` as early as possible, which is why we have used multiple intermediate tables in a `WITH` clause.

---

## Set Operations

We have seen that in most queries, we need to impose conditions on table tuples to filter them and keep only those that interest us. Sometimes, we even need to use logical operators to chain multiple conditions together.

But using logical operators `AND`, `OR`, and `NOT` is not the only way to chain multiple conditions. We can also take a different approach where, instead of applying a filter on all tuples, we divide the conditions that must be met and apply multiple filters, one for each condition based on logical operators. Finally, we get the resulting tuples from those filters and combine them using **set theory operators**, which perform functions equivalent to **logical operators**.

In other words, in SQL, we can chain multiple conditions in a `WHERE` clause, for example, using logical operators. Or we can use set theory operators to combine the resulting tuples from multiple filters, each applying one of those conditions, all without using logical operators.

As we will see below, the decision to use logical or set operators largely depends on the clarity of the resulting code and the efficiency we want to achieve in the query.

To start, let's consider a query where we need to get information on all pools that are currently in a maintenance or closed state. If we wanted to do this with what we already know, the simplest way would be to use a filter with a `WHERE` clause, combining the conditions that the `Status` attribute is 'closed' or 'maintenance' using the logical `OR` operator.

```pgsql
SELECT *
FROM Pool
WHERE Status='maintenance'
UNION
SELECT *
FROM Pool
WHERE Status='closed';
```

Besides using this operator, we can rethink the query to solve it using set theory operators. In this case, using only one logical `OR` operator, we divide the `WHERE` condition into several conditions by removing that `OR` operator. This results in the conditions `Status = 'maintenance'` and `Status = 'closed'`, respectively.

Doing this, we can resolve two queries: one applying the first condition and another applying the second. This gives us two resulting tables, one with information about pools under maintenance and another table with all the closed pools.

But we wanted all of them in a single output table, not in several. So to combine all the tuples from both tables into one (so that they all appear in the resulting table), we use the `UNION` operator between both queries. It treats both queries as if they were **multisets** of tuples, resulting in another **set** of final tuples where the tuples from both tables are present. That is, all the tuples from both tables. This is just like in set theory where the union of sets `AUB` results in another set containing all the individuals from A, all from B, and all those in both `A` and `B`.

To apply a set theory operator, the schema of the tables returned by the queries we operate with has to be exactly the same. This means that they must have the same number of attributes with the same names and data types, and in the same order. Otherwise, we can’t compare tuples from both tables, and it wouldn’t be possible to determine if a tuple belongs to one of the sets involved in the operation.

When we run a query that includes a `UNION`, we can see that if there are duplicate tuples in the resulting tables from the queries we’re working with, those duplicate tuples disappear in the resulting table of the query. This happens because, by default, all set theory operators in SQL take multisets with tuples as input and produce a set of tuples, which means it won’t contain duplicate tuples. So if we want to force the appearance of duplicate tuples because the query requires it, we must add the `ALL` modifier after the corresponding `UNION`, `INTERSECT`, or `EXCEPT` operator.

For example, in this case, we want to get information about all the people who have rented at least one bike **or** owned at least one car in our system:

```pgsql
SELECT PersonFK
FROM Rental
UNION ALL 
SELECT PersonFK
FROM CarOwnership;
```

To do this, we first create a query that gets all the `PersonID` identifiers of people referenced by the tuples in the `Rental` table through their foreign key `PersonFK`. In other words, each tuple in `Rental` has a value in its foreign key `PersonFK` that corresponds to a certain person's identifier, which matches the value of their unique identifier `PersonID`. So selecting the `PersonFK` attribute is enough to get the identifiers of all the people who have at least one record in this table.

We do the same with another query on the `CarOwnership` table, which also has a foreign key `PersonFK` with the same characteristics.

Finally, when reviewing these partial results from the queries, we’ll see that some people may have rented several bikes or simply made several rentals, and they may also have multiple ownership records in `CarOwnership`, leading to duplicate tuples. So when building the final resulting table, we need to get the people who are present in one table or the other. This means we need to combine both tables with the `UNION` operator to get a final set with all the tuples from both tables.

In this specific case, we shouldn’t add the **`ALL` modifier**, as we simply want to know which people meet the condition of having at least one rental and at least one car ownership (so a person who has made multiple rentals doesn’t need to appear multiple times in the final table).

But if we wanted to keep the duplicate tuples, this example clearly shows that by adding `ALL` after the `UNION` operator, all duplicate tuples from both tables are preserved, resulting in the final table showing as many tuples with the same person's information as the number of rentals and properties they have had. In other words, the ALL modifier forces `UNION` to return a **multiset**, not a **set** that removes **duplicate tuples**.

We can see the effect of the ALL modifier at a glance by examining the resulting table from the query. But if we are working with a very large query or a database with a lot of information, we may want to **wrap** our query in another outer query that uses the aggregation function `COUNT()` to count how many tuples it returns.

For example, in the below code you can see that we have used the query we just looked at as a subquery in the `FROM` clause, so we get all the tuples it contains. Then in the `SELECT`, we use the `COUNT(*)` function to count how many tuples there are.

```pgsql
SELECT COUNT(*)
FROM (
    SELECT PersonFK
    FROM Rental
    UNION
    SELECT PersonFK
    FROM CarOwnership
) AS PersonTable;
```

It’s also important here to provide an **alias** to the **subquery**, because when subqueries appear in the `FROM` clause, the DBMS needs them to have aliases to distinguish them and avoid ambiguities regarding the origin of the attributes that are later selected or used in other clauses.

Continuing with the different set theory operators that SQL offers, we have `INTERSECT`, which combines the results of several tables to return a set with all the tuples that appear in **all the tables simultaneously**. To understand this, we have the query below that retrieves information about all the people who have a driver's license and have also rented at least one bike.

```pgsql
SELECT DR.PersonFK AS PersonID
FROM DrivingLicenseRequest DR INNER JOIN DrivingLicense DL 
  ON DR.LicenseID = DL.LicenseID
INTERSECT
SELECT R.PersonFK
FROM Rental R;
```

We could write this query using only `JOIN` operations. But this time it might be more natural and straightforward to think of it as a set operation.

First, as shown above, we can construct a query that returns the identifier of all the people who currently have an active driver's license. To do this, we perform a `JOIN` between `DrivingLicenseRequest` and `DrivingLicense`, so we can gather the driver's license information with the **foreign key `PersonFK`** from `DrivingLicenseRequest`, which identifies the person who applied for the license. Then, we can construct another query that returns all the people who have rented at least one bike using the foreign key `PersonFK` from the Rental table.

And finally, to know which people have a driver's license and have also rented at least one bike, we need to keep the tuples that are in both tables. In other words, if the tables are multisets containing tuples, we need to keep those that appear in both multisets at the same time.

Instead of using the `UNION` operation, which represents the **union of sets,** we can use `INTERSECT`. It performs the **intersection** between sets, resulting in the final table of the query where we only have those people who meet all the conditions.

In the previous query, we only got the identifier of each person, since knowing the value of their primary key `{PersonID}` is enough to uniquely identify a person. With the foreign keys `PersonFK` pointing to the primary key `{PersonID}` of the Person table, we don't need the query to return more information about the person, as we can identify them with their primary key.

But there are situations where we may want to get more information about the person in the same query, such as their name in addition to the identification. So, if we needed to modify the query to return this, the simplest way would be to use a WITH clause that stores the identifiers of the people and then perform an INNER JOIN with the Person table in the body of the query, thus obtaining all the information present in the Person table.

```pgsql
SELECT DR.PersonFK AS PersonID, (SELECT Name FROM Person WHERE PersonID=DR.PersonFK)
FROM DrivingLicenseRequest DR INNER JOIN DrivingLicense DL 
  ON DR.LicenseID = DL.LicenseID
INTERSECT
SELECT R.PersonFK, (SELECT Name FROM Person WHERE PersonID=R.PersonFK)
FROM Rental R
ORDER BY PersonID;
```

But to illustrate other ways to get more information about people in the system from their identification in the same query without using `WITH`, we have the option to use subqueries in the SELECT clause, as you can see in the example above. Specifically, if we only need to return the name in addition to the `PersonID`, we can create a correlated subquery that, for each tuple to be returned, gets the name of the person with a specific identifier. In other words, it searches the Person table for the tuple with a certain `PersonID`, retrieves the name, and adds it as an additional column.

In general, using correlated subqueries in the SELECT is not a good practice because, as you might guess, the result of the subquery must be computed for each tuple to be returned. This also complicates maintenance, code clarity, and makes optimization by the DBMS more difficult in most cases.

Basically, with a simple `WITH` and an `INNER JOIN`, you can avoid having to traverse the entire Person table for each person to obtain a specific characteristic, instead gathering data from both the intermediate table of the `WITH` and the Person table.

Just like with other set theory operators, `INTERSECT` takes multisets as input and by default outputs a set, so there can't be duplicate tuples in the output table, as we saw earlier with `UNION`. So if we need to force the operator to always work with multisets and also return a multiset as the output of the **intersection operation**, we can add the `ALL` modifier, as shown in the example query below:

```pgsql
SELECT BikeFK AS BikeID
FROM Rental
WHERE StartTimestamp >= '2024-01-01'
INTERSECT ALL
SELECT BikeFK
FROM Rental
WHERE Duration <= 3
ORDER BY BikeID;
```

In this query, we get information on bikes that have been rented at least once during or after 2024 and whose rental duration was at most 3 hours. To do this, we construct a query that gets all bikes that have had at least one rental on a date `>= '2024-01-01'`, and then another that gets those that have had at least one rental with a maximum duration of 3 hours.

Then, to keep the bikes that meet both conditions at once, we perform the intersection between the multisets returned by the queries, keeping the tuples that are in both multisets at once. And, since the same bike may have had several rentals with these characteristics, there may be duplicates in the final query table. If we want to preserve them, we’ll have to add the `ALL` modifier.

By default, we don’t usually use `ALL` in this type of query, since we simply want to know which bikes meet the conditions. But it’s possible that, due to some user requirement, the query needs to return duplicates, in which case we’d use `ALL`.

In most situations, the performance is similar enough to be negligible. But the more data there is in the database, the more noticeable the difference in performance will be between using `ALL` or not. This also depends on the [<FontIcon icon="fa-brands fa-stack-overflow"/>algorithms](https://stackoverflow.com/questions/1111707/what-is-the-difference-between-a-hash-join-and-a-merge-join-oracle-rdbms) the DBMS uses internally to implement this operation.

The last set operator we'll look at here is `EXCEPT`, which is called `MINUS` in some DBMS. Basically, it implements the difference operation between sets, meaning if we have several sets `A` and `B` with tuples, the difference `A`-`B` returns a set with all the tuples that **are** in `A` and **are not** in `B`.

```pgsql
SELECT p.EntryFK, p.PersonFK, p.PoolFK
FROM PoolSanction p
WHERE p.BanEndDate < CURRENT_DATE
EXCEPT
SELECT p.EntryFK, p.PersonFK, p.PoolFK
FROM PoolSanction p INNER JOIN Sanction s ON p.SanctionID = s.SanctionID
WHERE s.Status = 'active';
```

For example, in the query above, we get information about all pool sanctions where the ban end date is before the current date when the query is run and that aren’t active.

As always, to do this, we might think the simplest way is through `JOIN` operations and a `WHERE` clause where the conditions are implemented. But to illustrate the use of `EXCEPT`, we can frame the query as finding all sanctions that meet the first condition of having a ban end date before `CURRENT_DATE`, and then from all of them, selecting only those that aren’t active. That is, from all those that meet the date condition, we keep only those that aren’t active.

Viewed another way, by getting all those that meet the date condition, we get a set `A` with tuples, where each one represents a sanction. Among all of them, there may be some that are active and some that are not. So to keep the ones we’re interested in, we need to remove from set `A` all those that are active. In other words, if we consider all the active ones to be in another set called `B`, then the sanctions we are interested in will be in the difference `A`-`B` (this means all the sanctions that meet the date condition (are in `A`) and are not active (are not in `B`)).

So in the query, you can see that we use the `EXCEPT` operator to work with the queries that get sets `A` and `B`, respectively. That is, the first query constructs set `A` by imposing the condition `p.BanEndDate < CURRENT_DATE` on the tuples of `PoolSanction`, while the query following the `EXCEPT` operator constructs set B by imposing the condition `s.Status = 'active'`, gathering data from `PoolSanction` and Sanction to filter by the Status attribute, which is in Sanction instead of `PoolSanction`.

To implement the difference A-B, we use `EXCEPT`, where the query above the `EXCEPT` is set `A` and the one below is set `B`. This is important to keep in mind because `EXCEPT` is the only operator where the order of the operands can change the result of the query.

For example, with the other operators `UNION` and `INTERSECT`, we can clearly see that it doesn't matter if we unite or intersect several sets A and `B` or `B` and `A` – in any order, the result will be the same. This is not the case with the difference `A`-`B`, which doesn't necessarily have to be equivalent to `B`-`A`. This property is called **commutativity**, and `EXCEPT` is the only set operator that **is not commutative**.

Ultimately, in this query, we can see that the table aliases are all in lowercase. This is allowed in SQL, and we can even declare an alias in uppercase and then use it in lowercase, or vice versa. But if we enclose the aliases in quotes, like in **Person "P"**, we can only refer to the table with the alias exactly as it’s written in the quotes.

On one hand, not quoting it provides flexibility when writing the code, as we don’t need to remember exactly how it was written. In most SQL code, quotes aren’t commonly used. But, this can cause ambiguity issues if the alias is named exactly the same as a table or another element in the database. Quoting it avoids these potential collisions with names of other elements.

In the end, the decision of which alias to assign to each table or element in the query mainly depends on its complexity and the style guide followed, among other factors.

Just like with other set operators, `EXCEPT` also takes multisets as input by default and returns sets, removing any duplicate tuples. So if we need to keep those duplicate tuples, we simply need to add the ALL modifier.

```pgsql
SELECT BikeFK AS BikeID
FROM Rental
EXCEPT ALL
SELECT BikeFK
FROM Rental
WHERE Duration < 2;
```

For example, in this query, we get information on all the bikes that have been rented **at least** once and have never been rented for less than 2 hours.

To implement this, we first construct a query that retrieves all the bikes that have been rented at least once using the foreign key attribute `BikeFK` from the `Rental` table. Then, with another query, we get all the bikes that have been rented at least once for less than 2 hours. Finally, to keep only those we’re interested in, we get the difference between the first set and the second.

As you can see, a bike may have been rented an arbitrary number of times, so the first query might return many duplicate tuples. If we don't use the `ALL` modifier, all those duplicates will be lost, resulting in a table where each bike is guaranteed to appear at most once.

But if we want to keep the duplicates, simply using `ALL` will show that the query returns a result table with many more tuples, as many of them correspond to duplicate bikes.

Here, we also need to consider that, despite the possibility of duplicate bikes existing in both set `A` and set `B`, when we perform the difference `A`-`B` using `EXCEPT`*, we won't get any bike that's in B, regardless of how many times it's duplicated in both sets, one, or neither.

But when performing the operation using `EXCEPT ALL`, if we have **x repetitions** of a tuple in set `A` and **y repetitions** of that same tuple in B, then in the resulting table, we will get `max{x-y,0}` repetitions of that tuple. That is, when there are more repetitions in A than in B, we will get **x-y** repetitions of the tuple in the final table. If there are more repetitions in B than in `A`, then **x-y** is **negative**, so we will simply get 0 repetitions of the tuple. This means that tuple won’t appear in the resulting table of the **difference operation** implemented with `EXCEPT ALL`.

To correctly understand the **difference operator**, let's consider a query where we need to get information on all cruise trips for which there is no return trip. In other words, we want to find all trips going from a **city x** to another **city y** with no return to city x.

```pgsql
SELECT V.DepartureCityFK, V.ArrivalCityFK
FROM Voyage V
EXCEPT
SELECT V2.ArrivalCityFK, V2.DepartureCityFK
FROM Voyage V2
ORDER BY DepartureCityFK, ArrivalCityFK;
```

The approach we'll take for this query is based on set theory, as it’s particularly easy to solve in this case. First, we construct a query that returns all existing trips. From these, we can get all the information present in the `Voyage` table – but for simplicity, we'll only focus on the attributes that determine the departure and arrival cities of the trip (which are their foreign keys `DepartureCityFK` and `ArrivalCityFK`).

Then, from all those trips returned by the first query, we need to remove the return trips. That is, for each existing trip that departs from city x and arrives at city y, we look for a **return trip** in the `Voyage` table that departs from city y and arrives at city x. If it exists, we remove the original trip from the result table of the first query.

We could implement this using the `IN` operator and a subquery. But it's simpler and more efficient to build a second query that gets all the trips from `Voyage` but swaps the departure and arrival cities for each trip as shown above. This second query is responsible for getting all possible return trips that might exist by swapping the values of the foreign keys `DepartureCityFK` and `ArrivalCityFK`, meaning swapping the departure cities with the arrival cities.

Finally, with these two queries, we apply the `EXCEPT` operator, where we remove from the result table of the first query (which contains all the trips from `Voyage`) all those contained in the result table of the second query. In other words, from all existing trips, we are removing those considered return trips because they were generated by the second query by swapping the departure and arrival cities.

Even if some of those return trips don't exist in `Voyage` (which can happen), the `EXCEPT` operator will simply ignore that tuple to remove since it doesn't exist in the set from which it needs to be removed.

To wrap up this type of query, so far we have seen some that apply a single set operator. But SQL allows us to use any number of them in the same query or subquery as needed. This is applied in the query below, which retrieves information about all the people who have or have had a driver's license application registered in the database, or an approved license, and who have never had a rejected application.

```pgsql
WITH Persons AS (
    SELECT DR.PersonFK
    FROM DrivingLicenseRequest DR
        INNER JOIN DrivingLicense DL ON DR.LicenseID = DL.LicenseID
    UNION
    SELECT DR2.PersonFK
    FROM DrivingLicenseRequest DR2
    EXCEPT
    SELECT DR3.PersonFK
    FROM DrivingLicenseRequest DR3
        INNER JOIN RejectedDrivingLicense RD ON DR3.LicenseID = RD.LicenseID
)
SELECT PersonFK
FROM Persons
ORDER BY PersonFK;
```

Regarding the implementation, we can see that in the first query used to build the intermediate table Persons, we get all the people who have or have had an accepted driver's license by using an `INNER JOIN` between the `DrivingLicenseRequest` and `DrivingLicense` tables. This way, with the data from `DrivingLicenseRequest`, we can access the foreign key `PersonFK` that identifies the person who made the application.

Then, we make a union with a second query that retrieves people who have made an application, whether pending, accepted, or rejected. This time we get the data from the `DrivingLicenseRequest` table, which encompasses all existing applications in the database.

By performing the union, we get all the people who have or have had pending, accepted, or rejected applications, since the first query returns only those with an approved license – but the second returns people who have also had rejected applications.

To exclude those with rejected applications, the `EXTENT` operator is used along with another query that retrieves these people with rejected applications. So they are all excluded from the final query result – or rather from the intermediate table Persons. From this table, we finally get all its tuples and order them by the attribute `PersonFK` – that is, by the identifier of the people we obtain.

As you can see, the order in which set operations are performed is from top to bottom. That is, these operators act on tables containing query results, so SQL performs these operations in a top-down order (although we can use parentheses to change the precedence of the operators according to the needs of the query). Also, in this case, we can see that the `UNION` operation is redundant since everything contained in the first query is also contained in the second.

In other words, the second query retrieves people who have or have had applications of any type, whether pending, accepted, or rejected, so all the people who have had accepted applications are included in this set of people generated by the second query. In a real-world environment, we should optimize it by dispensing with the first query, which also implies the elimination of the `UNION` operation. But here we leave it as is to illustrate its equivalence with the optimized query we have described.

---

## Aggregation Queries

Next, we’ll look at a type of query that’s often used in temporal data analysis, calculating metrics, building dashboards aimed at strategic decision-making, and so on. These are **aggregation queries**, and they’re based on treating the tuples of a table as if they were groups on which we can perform certain operations. For example, we can use them to sum all the values of an attribute in a certain group, find their average, and calculate the maximum or minimum value, among others.

As you might guess, the basic statements to implement this type of query are `GROUP BY`, `HAVING`, and the different aggregation functions offered by SQL.

With `GROUP BY`, we can choose a series of attributes whose values will determine how we form groups of tuples in a particular table. This means that each of these groups will be formed by a combination of values taken by the selected attributes. Then with the aggregation functions, we will calculate a certain metric for each group.

With `HAVING`, we’ll impose conditions related to the characteristics of each group, mainly the value taken by the metrics we calculate on them.

To understand all this with examples, let's first consider a query where we want to get a list of all the nationalities present in the Person table and the number of people with each nationality.

```pgsql
SELECT Nationality, COUNT(*) AS NumPersons
FROM Person
GROUP BY Nationality
ORDER BY NumPersons DESC;
```

At first glance, we realize that we need to count a certain number of people for each value that the `Nationality` attribute takes. So, the approaches we've seen so far aren’t straightforward for performing this operation (which in some cases may not be possible without grouping).

For example, here we could list all the different nationalities that appear in `Nationality` and, for each one, use a subquery in the `SELECT` statement to count how many people in the Person table have that nationality.

But this approach would be very inefficient since, for each different nationality, we would have to go through the entire Person table looking for people with that nationality. Even though these searches can be optimized, they are generally not as efficient as the approach we’re going to follow using grouping.

Instead, we use **grouping** with the `GROUP BY` statement. Specifically, we indicate the table attributes that guide generating the tuple groups in the table. In this case, since we want to calculate a metric for each value of the `Nationality` attribute, we use that attribute to group the tuples. This way, for **each value** of that attribute, a **group of tuples** is generated, represented by that value, which will represent all the people with that same nationality.

Then, if we want to count how many people have that nationality, we simply count how many tuples each group has. So, in the `SELECT` statement, we add an extra attribute where we use `COUNT(*)`. This time it won’t count all the tuples in the table, but those in each group. Since using `GROUP BY` makes it mandatory to return in the `SELECT` the attributes we are grouping by, the final table will only show the distinct values of `Nationality`, meaning the "representative" values of each group of tuples.

For each of those values, we’ll attach the value of `COUNT(*)` in the same tuple of the output table, which will correspond to the **number of tuples** in the corresponding **group**. This conceptually represents the number of people with that nationality.

Finally, we can apply sorting with the `ORDER BY` statement – but we should keep in mind that we can only sort in this case with respect to the attributes we return in `SELECT`. This is because in the query, we’re creating groups represented by `Nationality` values, which means we can’t "return" the rest of the attributes in the `SELECT` as we did before.

We can only calculate metrics with them and return those – but not the attributes themselves with all their values. This is because when grouping, the resulting table necessarily contains **only the "representative" values** of each group and metrics of other attributes calculated from those groups (or metrics of the group itself, such as the number of tuples it has in this case).

There are various metrics we can calculate with the basic **aggregation functions** that SQL provides by default. Below we see a query where we get, for each possible pool status, the smallest minimum depth and the largest maximum depth of the pools with that status, as well as the average depth and the number of pools in that status.

```pgsql
SELECT Status,
    MIN(MinDepth) AS Shallowest,
    AVG((MinDepth + MaxDepth) / 2.0) AS AvgDepth,
    MAX(MaxDepth) AS Deepest,
    COUNT(*) AS NumPools
FROM Pool
GROUP BY Status;
```

The implementation of this query is very similar to the previous one, as we need to group the `Pool` tuples by the values of their `Status` attribute, which determines the status of the pools.

So in the `GROUP BY` clause, we only specify the `Status` attribute. This way, we group the tuples into as many groups as there are values present in the `Status` attribute in the table, and in each of these groups, we have all the tuples representing pools in that status.

So along with the information for each status, we can calculate metrics for its associated group of tuples – that is, for the pools in that status. For example, with `MIN(MinDepth)`, we get the smallest value of the `MinDepth` attribute present in the group for which this metric is being calculated. In this case, it represents the smallest minimum depth of all pools in a certain status.

Similarly, with the aggregation operation `MAX(MaxDepth)`, we get the largest maximum depth, or in other words, the largest value of the `MaxDepth` attribute in the corresponding group of pools. With `COUNT(*)`, we get the number of pools in each group.

On the other hand, the average depth associated with the pools in each group is calculated with `AVG((MinDepth + MaxDepth) / 2.0)`. First, it’s worth noting that both in the `SELECT` clause and in the input argument of an aggregation function like `AVG()`, we can perform arithmetic operations on the attributes.

For example, in this case, with `(MinDepth + MaxDepth) / 2.0`, we calculate the average value between the minimum and maximum depth of **each pool** – not of each group, but of each tuple in the group – all using decimal values like 2.0 so that the result isn’t automatically rounded to an integer. Then, with this value calculated for each tuple, we use the aggregation function `AVG()` to calculate the average of this value for each group.

That is, with `(MinDepth + MaxDepth) / 2.0`, we get a certain value for each tuple, and then with `AVG()`, we take all those calculated values for the tuples of a certain group and calculate their average. Thus, for each possible state of a pool, we obtain the average depth of all the pools in that state, first calculating the average depth of each pool and then calculating the average of these depths across all pools in a certain state.

But, in addition to calculating metrics for each group of tuples, we might need to keep only those groups whose metrics meet certain conditions, depending on the query to be resolved. For example, here we consider a query where we get, for each person, the number of bike rentals they have made since records began, as long as that person has made at least three rentals.

```pgsql
SELECT P.PersonID,
    P.Name,
    COUNT(*) AS RentalCount
FROM Rental R
    INNER JOIN Person P ON R.PersonFK = P.PersonID
GROUP BY P.PersonID, P.Name
HAVING COUNT(*) > 2
ORDER BY RentalCount;
```

To implement this query, we might have considered using a correlated subquery in the `SELECT` statement that counts how many tuples in Rental have their foreign key `PersonFK` pointing to each person. But this would be inefficient, since groupings are usually much faster for this type of task.

It’s also **not possible** to impose a condition `WHERE COUNT(*) > 2`, either in the subquery of the `SELECT` clause or in the main query (in general, conditions on aggregation functions can’t be imposed in a `WHERE` clause). So in this case, we would have to use another subquery in the `WHERE` clause that counts the number of rentals each person has and that then checks that this number is `> 2`. To avoid using subqueries and make our implementation as fast as possible, we first perform an `INNER JOIN` between the Rental and Person tables. We combine all their information into tuples of their Cartesian product where we have rentals and data about the person who made them. We can do this by imposing the condition in the `JOIN` that the foreign key `PersonFK` of Rental points to the `PersonID` identifier of its same tuple in the Cartesian product.

After performing the `JOIN`, we use the `GROUP BY` clause to group the resulting tuples by the `PersonID` and ₩ attributes of the person table. We do this because we want to calculate a metric for each person, so we have to include their identifier (primary key) in the grouping of the `GROUP BY` statement (meaning all the attributes that form their primary key).

Also, since we want to return each person's name along with their identifier, we can include the ₩ attribute in the ₩. But it's important to note that the attributes we group by must uniquely identify each group of tuples that is formed.

In other words, by grouping by **PersonID**, we are forming groups of tuples that contain all the rentals made by a certain person, identified by a value of their primary key PersonID. This serves as the "representative" of the group of tuples.

But since this `PersonID` attribute is enough to identify the group, it's fine if we include more information about the person in this "representative value" of the group. So instead of containing only their primary key, it includes more information about the person, like their name.

As you can guess, if instead of grouping by `{PersonID}` we group by a **candidate key** (or rather a **superkey** as in this case `{PersonID, Name}`), we’ll get the same groups as grouping by `{PersonID}`. This means that the same number of groups will still be generated as there are people in the table (since with a superkey we can **uniquely identify each person, and therefore each group)**.

Adding the `Name` attribute to the grouping is not an arbitrary decision – we have to use the Name attribute in the `SELECT` statement. When using `GROUP BY`, we can only return in the `SELECT` statement those attributes that we have used in the `GROUP BY` clause (so, those we have used for grouping). So to get the person's name and not just their identifier, one option is to include the attribute in the `GROUP BY` so we can return it in the `SELECT` – or in other words, use the `Name` attribute for grouping.

But, this won’t always work because there are times when we group by an attribute A and want to return information about another attribute B. But for **each value** of **attribute `A`**, we have **multiple tuples** with **multiple different values** in attribute `B`. This prevents us from using `B` for grouping, although we can still calculate metrics on B.

On the other hand, to count how many rentals each person has made, we just need to use the aggregation function `COUNT(*)` after grouping by `{PersonID, Name}`. This forms groups of tuples from the Cartesian product where we have the same information for the same person, but each represents a different rental. By counting how many tuples each group has, we get the number of rentals made.

To get only those groups (people) who have made more than 2 rentals, we use the `HAVING` clause to impose that condition, since aggregation functions can’t be used in the `WHERE` clause. Also, we can’t use the alias given to the attribute constructed with `COUNT(*)` that’s returned in the `SELECT` in `HAVING`. Instead, we need to rewrite the definition of the attribute in `HAVING`.

That is, just like with `WHERE`, we can’t impose conditions on the attributes or columns of the resulting table we return by simply referring to their aliases – we have to use their definitions, as in this case with `COUNT(*)`.

It's worth noting that including the Name attribute in the `GROUP BY` to **"return"** it in the `SELECT` isn’t the only option we have to do this (or even to get more information about the person). We always have the option to save the query result in an intermediate table with a `WITH` clause and then join it with the Person table or the appropriate one.

But we have another option, as shown below, which involves grouping only by the **`PersonID` attribute** and then using correlated subqueries in the `SELECT` to get the rest of the information for each person.

```pgsql
SELECT P.PersonID,
    (SELECT Name FROM Person WHERE PersonID=P.PersonID),
    COUNT(*) AS RentalCount
FROM Rental R
    INNER JOIN Person P ON R.PersonFK = P.PersonID
GROUP BY P.PersonID
HAVING COUNT(*) > 2
ORDER BY RentalCount;
```

But this option isn’t the most optimal: as with a **correlated subquery** in the `SELECT`, we can only add one attribute of information per subquery. This forces us to use one subquery per attribute we want to add, which is very inefficient as you can see. Also, correlating the subqueries reduces maintainability and possibly also the clarity of the code, which are qualities worth considering.

With these queries, we have seen how we can use `GROUP BY` to group tuples by one attribute, or even several if we need to add more information to the resulting table from the query. Also, we’ve seen the correct way to impose conditions on expressions with aggregation functions, which is by using the `HAVING` clause.

But, we’re not always trying to return more information to the user every time we use multiple attributes in the `GROUP BY` statement. Sometimes, we need to group tuples by more than one attribute.

For example, in the query below, we get all the **person-pool pairs** (only those present in `CityPool`) that exist in the system. Then for each of them, we calculate the average duration the user has spent in that pool across all their entries.

```pgsql
SELECT E.PersonFK AS PersonID,
    E.PoolFK AS PoolID,
    COUNT(*) AS VisitCount,
    AVG(E.Duration) AS AvgDuration
FROM Entry E
GROUP BY E.PersonFK, E.PoolFK
ORDER BY E.PersonFK, E.PoolFK;
```

As you can see, we get the data from the Entry table, where we have to perform a grouping with the attributes `PersonFK` and `PoolFK`, since we need to calculate metrics for each person-pool pair. With this grouping, each pair of person-pool values is a group formed by all the tuples in Entry that represent times the person entered that pool.

In this way, with `AVG(E.Duration)`, we calculate the average of the `Duration` attribute for each group (so how long, on average, a person stayed at the pool on each visit) while `COUNT(*)` counts the number of those entries.

Finally, it's important to note that in this query, we’re only getting the person-pool pairs that appear in the Entry table – we’re not constructing all possible pairs. So we won't find any tuple in the resulting table of the query where a person has never entered a certain pool.

If we wanted to include this information, we would need to structure the query differently, constructing all combinations of person-pool in an intermediate table and then calculating how many entries each person has in each pool in another way (either using subqueries, `OUTER JOIN` operations, or even more advanced functions that aren’t covered here).

In the `GROUP BY` clause, we can use an arbitrary number of attributes for grouping. The query below shows how we can get the number of times the cruise has traveled that route and the sum of the distances covered on those trips for each cruise and route between two ports. We can also display the information of the cities where those ports are located.

```pgsql
SELECT V.ShipFK AS ShipID,
    V.DepartureNameFK AS DeparturePort,
    V.DepartureCityFK AS DepartureCity,
    V.ArrivalNameFK AS ArrivalPort,
    V.ArrivalCityFK AS ArrivalCity,
    COUNT(*) AS TripCount,
    SUM(V.Distance) AS TotalDistance
FROM Voyage V
GROUP BY V.ShipFK,
    V.DepartureNameFK,
    V.DepartureCityFK,
    V.ArrivalNameFK,
    V.ArrivalCityFK
ORDER BY V.ShipFK, TotalDistance DESC;
```

As you can see, in this case, we get all this information from the `Voyage` table, as it has multiple foreign keys to `CruiseShip` and `Port`, as well as `City`. These can help us implement this query easily.

Of all the attributes it has, we group by `ShipFK`, `DepartureNameFK`, `DepartureCityFK`, `ArrivalNameFK`, and `ArrivalCityFK`. This allows us to group the tuples of the Voyage table based on the combinations of values representing a **cruise-route pair** (where a **route** is considered as a **pair of ports** along with the city values where they are located).

These are **redundant** for the grouping itself, as clearly all ports belong to one and only one city (according to the domain). But if we want to know the city where the port is located, the simplest option is to include the `DepartureCityFK` and `ArrivalCityFK` attributes in the grouping so we can return them in the `SELECT`.

So for each cruise-route pair, we can count how many trips the cruise has made on that route using `COUNT(*)`, and with `SUM(V.Distance)` we can get the sum of all distances covered on those trips (as the tuples of each group in this case are the trips the cruise makes or has made on the corresponding route).

On the other hand, in this type of query, it’s also common to use the `DISTINCT` modifier to count values in a group or perform a specific aggregation operation on them. For example, in the query below, we get all the people who have ever lived in a city. Then for each of them, we count how many **different cities** they have lived in.

```pgsql
SELECT R.PersonFK AS PersonID,
    COUNT(DISTINCT R.CityFK) AS NumCities
FROM Residence R
GROUP BY R.PersonFK
ORDER BY NumCities DESC;
```

To do this, we use the data stored in the `Residence`* table, which has a foreign key `PersonFK` that can determine, in each tuple, the person associated with that residence record. Since we want to calculate a certain metric for each person who has had at least one residence, we group by the `PersonFK` attribute, as selecting data from the `Residence` table ensures that all these people have or have had at least one residence record.

Then, for each group of tuples formed, we could use `COUNT(*)` to count how many residences the "representative" person of each group has had. But in this case, we want to count the number of **different cities** they have lived in.

To do this, we will give `COUNT()` the `CityFK` attribute as the input argument, which is a foreign key that determines the city associated with a residence record. This would count all the values the `CityFK` attribute takes for each group, but not the distinct values. So, we’ll need to add the `DISTINCT` modifier before the attribute and inside the `COUNT()` aggregation function so that it only counts the distinct values that the `CityFK` attribute takes in each group. This corresponds to the number of different cities a certain person has been associated with through `Residence`, meaning where they have lived.

When using the `DISTINCT` modifier in aggregation functions, we may also need to apply conditions on these aggregation functions. So we’ll need to use the same `DISTINCT` modifier in other clauses like `HAVING`, in addition to `SELECT` where most aggregations are calculated and returned.

```pgsql
WITH PersonsTable AS (
    SELECT CB.PersonFK AS PersonID,
        COUNT(DISTINCT CB.PaymentMethod) AS NumPaymentMethods
    FROM CruiseBooking CB
    GROUP BY CB.PersonFK
    HAVING COUNT(DISTINCT CB.PaymentMethod) > 1
    ORDER BY NumPaymentMethods DESC
)
SELECT *
FROM PersonsTable PT
    INNER JOIN Person P USING (PersonID);
```

For example, above we have a query that retrieves information about all the people who have made at least one cruise booking. It also gets the number of different payment methods they have used to pay for all those bookings, as long as that number is at least two different payment methods.

First, to implement this query, we use the `CruiseBooking` table and group by `PersonFK` – as when needing to calculate a number for each person, we should group the tuples of the table by the `PersonFK` attribute. This way, each group corresponds to the bookings made by a certain person.

So we can easily use `COUNT(DISTINCT CB.PaymentMethod)` to count how many distinct values the `PaymentMethod` attribute takes in each group of tuples. This corresponds to the number of different payment methods the representative person of that group of tuples has used to pay for their bookings.

Also, to require that they’ve used at least two payment methods, we use a `HAVING` clause where we declare that the value returned by the aggregation function `COUNT(DISTINCT CB.PaymentMethod)` must be `>1`.

We can’t use its alias name `NumPaymentMethods` to declare this condition (some DBMS allow it, but for portability reasons, it’s better to code it without using the alias in the condition), nor can we use a `WHERE` because it’s an aggregation function. The correct way is using a `HAVING`.

Although it may seem that the value of `NumPaymentMethods` is being calculated multiple times unnecessarily, internally the DBMS can optimize the query automatically to avoid this type of unnecessary calculation. But we still have to write the aggregation function multiple times: once to define the attribute `NumPaymentMethods` in the `SELECT` and another in the `HAVING` to impose a filtering condition on the tuples of the resulting table from a grouping.

Finally, we save the result of this grouping in an intermediate table called `PersonsTable`, where only the identifier of each person and their corresponding number of payment methods are stored. Later, we can use this intermediate table in a `JOIN` operation with the `Person` table. This will gather all the information of each person along with the attribute containing the number of payment methods in one table. Then this is ultimately returned as the query output to the user.

So as expected, if we use the `DISTINCT` modifier on an attribute in an aggregation function in the `SELECT` clause and want to impose a condition on it, we have to write it exactly as it appears in a `HAVING` clause – regardless of whether it uses the modifier or not, since we write it exactly as it appears in the SELECT.

So far, we have seen that we can give an aggregation function input attributes with which it will perform the corresponding aggregation operation. Also, if we need only the distinct values of a certain attribute or **result of an arithmetic operation between attributes**, we can add the DISTINCT modifier.

But DISTINCT is not only used for a single attribute – we can also use it to. getunique combinations of values from a series of attributes, or even unique results obtained from an arithmetic operation involving multiple attributes. For example, in the query below, we want to get all the cruises along with the number of pairs of departure and arrival cities they have visited throughout their journeys.

```pgsql
SELECT V.ShipFK,
    COUNT(DISTINCT (V.DepartureCityFK, V.ArrivalCityFK)) AS NumRoutes
FROM Voyage V
GROUP BY V.ShipFK
ORDER BY NumRoutes DESC;
```

To do this, we simply group the tuples of the Voyage table by the `ShipFK` attribute, since we want to calculate a number for each cruise (and the `ShipFK` foreign key is what determines the cruise that made the journey). Thus, each group of tuples will be “represented” by a certain value of `ShipFK` that uniquely identifies a cruise. Those tuples, in turn, will represent all the journeys that cruise has made.

So to count how many **distinct** pairs of departure and arrival cities each cruise has traveled to, we can use the aggregation function `COUNT(DISTINCT (V.DepartureCityFK, V.ArrivalCityFK))`.

As you might guess, a cruise can make the same trip several times, which means that within the same group of tuples, we might find the same combination of values for the attributes `(V.DepartureCityFK, V.ArrivalCityFK)` multiple times. These attributes uniquely identify the departure and arrival cities of the trip, so if the trip is made several times, there must be several "duplicate" tuples – or at least tuples with the same values in those attributes, since there can be multiple different ports in the same city.

If we look at all the combinations of values that the attributes `(V.DepartureCityFK, V.ArrivalCityFK)` take in each group, we’ll see that they represent the departure and arrival cities of the cruise in each trip it has made. By applying the `DISTINCT` modifier, we treat each pair of values as if it were unique, and we keep all those that are unique. This refers to pairs of different departure and arrival cities in the group on which this aggregation operation is calculated, ignoring all duplicate pairs (which would inflate the count artificially). This would represent the total trips the ship has made.

Finally, when solving a query using grouping, we might need to calculate metrics using aggregation functions with the `DISTINCT` modifier. Because of this, we have to consider that if we need to impose a condition on that metric, we’ll need to use the aggregation function in the HAVING clause exactly as declared in the `SELECT` (with the same `DISTINCT` modifier and attributes present in the input argument of the aggregation function).

```pgsql
SELECT CB.PersonFK AS PersonID,
    COUNT(DISTINCT (CB.CabinNumber, CB.PaymentMethod))
FROM CruiseBooking CB
GROUP BY CB.PersonFK
HAVING COUNT(DISTINCT (CB.CabinNumber, CB.PaymentMethod)) > 1
ORDER BY count DESC;
```

For example, in the query above, we get the identifiers of certain people, and for each one, we calculate the number of distinct pairs composed of **cabin number-payment method** that the person has generated through their various `CruiseBooking` reservations in their name. Here, we’re only interested in those people whose number of pairs is at least two.

To implement this, we first group by the `PersonFK` attribute of the `CruiseBooking` table, as it contains all the information we need to calculate the previous metric for each person. This is why we only need to group by the foreign key `PersonFK` attribute. So for each group of `CruiseBooking` tuples, we’ll have all the reservations associated with a single person.

Then, with `COUNT(DISTINCT (CB.CabinNumber, CB.PaymentMethod))`, we can calculate the number of distinct combinations of values that the attributes `(CB.CabinNumber, CB.PaymentMethod)` take in the group of tuples. As you can see, when we want to count combinations of values from several attributes, we declare both attributes in a "tuple" `(CB.CabinNumber, CB.PaymentMethod)`, which we provide as input to the `COUNT()` aggregation function. We use the `DISTINCT` modifier to ensure it only counts distinct combinations of these two attributes.

Later, if we want to say that the result of the aggregation function has to be greater than 1 to consider the corresponding group of tuples in constructing the query output, we use the `HAVING` clause. In it, we can declare the condition by rewriting the aggregation function again in the `HAVING` clause in the same way we declared it in the `SELECT`.

Note that we haven't assigned an alias to the attribute we built with the aggregation function, so SQL automatically assigns the name **“count”** to this additional attribute. This corresponds to the name of the aggregation function used in its construction.

But if we create more attributes using the same aggregation function `COUNT()`, then all those attributes will be called **“count”** by default at the same time, creating an ambiguity problem. This is why it's essential to use aliases for attributes that are expected to be named the same way by SQL (the DBMS is responsible for assigning default aliases).

Finally, it's important to note that queries don't necessarily have to contain only one grouping. The `GROUP BY` clause can be used an indefinite number of times in a query, especially if it includes a subquery, which can use the `GROUP BY` clause again.

But it's important to remember that you can't have multiple groupings **“at the same time”** in the same query. In other words, if we use `GROUP BY` multiple times, it must be because our query consists of subqueries, with each subquery performing a grouping, avoiding doing them all at the same level. In other words, for each `GROUP BY` clause, there must be one and only one `SELECT` clause.

---

## Division Queries

At this point, with everything we've seen, we have enough tools to solve practically any query with SQL. (But there are some that we won't focus on here because they require operating on data recursively or hierarchically, which is more complex.)

Now, we’ll look at a series of queries where we use these previous tools to implement a relational algebra operator that doesn't have a direct implementation in SQL. For example, we have seen that the `SELECT` statement represents the implementation of the **projection** operator in relational algebra. And other statements such as certain types of JOIN or UNION, INTERSECT, and EXCEPT have direct equivalent operators in relational algebra as well.

But the **division** operator doesn’t have an equivalent clause or function in SQL due to its nature. In short, if we have several tables, this operator is responsible for getting all the tuples from one of the tables that are **“associated”** with each and every tuple of the other table.

To understand how this works, let's consider the following example:

```pgsql
SELECT R.PersonFK
FROM Rental R
GROUP BY R.PersonFK
HAVING COUNT(DISTINCT R.BikeFK) = (
        SELECT COUNT(*)
        FROM Bike
    );
```

Say we want to find the people who have rented each and every bike registered in our database. To implement this, we’ll have to use the **division** operator, since in the query setup we will have two tables: one with tuples containing information about a person and a bike, indicating that the person has rented the bike, and another table with all the bikes registered in the system. If we apply a division operation from relational algebra on these tables, we can find all the people who appear in enough tuples in the first table to have rented all the bikes in the second table.

This can be implemented in many ways, and here we will focus on two. The first method involves **counting** how many different/distinct bikes each person has rented and checking if that number matches the total number of bikes in the system (we’ll see how to do this below). If it matches, then we know that person has rented all the bikes.

To do this, we can group the tuples in the `Rental` table by the foreign key `PersonFK` attribute, since we need to calculate how many bikes **each person** has rented. So we form groups of tuples representing the rentals of each person who has rented at least once (people who have never rented don’t appear in `PersonFK` of the `Rental` table).

Next, using the `HAVING` clause, we count how many different bikes each person has rented with `COUNT(DISTINCT R.BikeFK)`. This means that for each group of tuples, we count how many different values the BikeFK attribute takes in that group. This represents the number of different bikes rented, since BikeFK is the foreign key pointing to Bike and uniquely identifies the bike that has been rented.

Finally, we compare this number with the total number of bikes in our database, which we can get through a subquery using the aggregation function `COUNT(*)`. Remember that we can use `COUNT(*)` without the GROUP BY clause being present in the subquery.

We can also approach the division of tables from a perspective closer to set theory. For example, below is the same query solved using `NOT EXISTS` and subqueries only:

```pgsql
SELECT P.PersonID
FROM Person P
WHERE NOT EXISTS (
        SELECT *
        FROM Bike B
        WHERE NOT EXISTS (
                SELECT *
                FROM Rental R
                WHERE R.PersonFK = P.PersonID
                    AND R.BikeFK = B.BikeID
            )
    );
```

Here, if each person has rented every bike in the database, then there's not a bike that exists that they haven't rented. Let’s try to translate this concept into a SQL query literally: first, with a `SELECT` and `FROM`, we can **“traverse”** all the tuples of `Person`. Then for each one, we check that there is no bike the person hasn't rented. To do this, we construct a **correlated subquery** that returns all bikes that person hasn’t rented.

This subquery is simply constructed by "traversing" all the tuples of `Bike` and checking that there is no rental record between the person and the bike being traversed. We do this another correlated subquery that traverses the tuples of `Rental` and returns only those in which the person has rented the bike. If it doesn't return any tuples, then there were none with those characteristics, which tells us that the person traversed has never rented the bike traversed. In this case, we’re not interested in that person since they have not rented all the bikes in the database.

If someone really had rented them all, then the **correlated subquery** that traverses the tuples of `Rental` would always return at least one tuple. Then the the correlated subquery that traverses the tuples of `Bike` would never return tuples. And this would satisfy the `NOT EXISTS` condition that we imposed on the people.

If we read the SQL code we’ve implemented "literally," we’re **traversing the people, and for each one we’re checking that they’ve rented every bike**. So we finally get the same people as we do with the query that uses a grouping and a count of bikes rented by each person.

If we execute either of these queries, they probably won't return any results. After all, the probability of a person having rented each and every bike registered in the database is small.

But if we want to check whether the queries work or not, we can always manually insert tuples into `Person`, `Bike`, and `Rental`, especially in `Rental`. Then there would a person who has a tuple in `Rental` for each bike in the `Bike` table, and thus can be present in the result of the **division** operation.

Another query we can solve using a division operation from relational algebra is the one below. In it, we find all the people who have entered **all** the pools in a certain city (specifically the one with the `CityID` value of 55).

```pgsql
SELECT E.PersonFK
FROM Entry E
    INNER JOIN CityPool CP ON E.PoolFK = CP.PoolID
    INNER JOIN Pool P ON CP.PoolID = P.PoolID
WHERE P.CityFK = 55
GROUP BY E.PersonFK
HAVING COUNT(DISTINCT E.PoolFK) = (
        SELECT COUNT(*)
        FROM CityPool CP2
            INNER JOIN Pool P2 ON CP2.PoolID = P2.PoolID
        WHERE P2.CityFK = 55
    );
```

In this case, we first gather all the information from the `Entry`, `CityPool`, and `Pool` tables. This lets us get the information of the people who have entered the pools and the information of the city where the pool is located. So after gathering this information with the `INNER JOIN` operations, we impose the condition that the foreign key `CityFK` must reference a certain city, specifically the one identified with the value 55 in its primary key `{CityID}`. We do this to filter the resulting tuples from the `JOIN`s, so that we only have those where people have entered pools in the specific city we are considering in the query.

But this condition doesn’t necessarily have to be in that `WHERE` clause, as there are other equally valid alternatives (using subqueries, CTE, and so on.).

Then we group the tuples by PersonFK, so that each group of tuples represents all the pool entries of a certain person (specifically entries in pools of the city identified by the value `CityID=55`). To find only the people who have entered all the pools in that city, we use `COUNT(DISTINCT E.PoolFK)` to count the number of different pools they have entered. This equals the number of distinct values taken by the **foreign key `PoolFK`** in the **`Entry`** table. We then compare this number with the total number of city pools located in the city with `CityID=55`, all obtained through a simple uncorrelated subquery.

In this subquery, we perform another `INNER JOIN` between `CityPool` and Pool to gather data on all city pools with the foreign key `CityFK` that determines the city they are located in. This lets us declare the condition `P2.CityFK = 55` to count all the pools in that city using `COUNT(*)`. Also, the advantage of the subquery being uncorrelated is that it only needs to be computed once, since the number of pools in that city doesn't change while the query is running.

If we try to solve the previous query using the approach closest to set theory, as we did earlier, we will end up with an implementation that mainly uses the `NOT EXISTS` operator and correlated subqueries.

Conceptually, we can solve the query by going through all the people in the database and checking that there’s no city pool located in the city with `CityID=55` for which there is no entry associating the person with the pool. In other words, for each person, there must be an entry for every city pool in the city with `CityID=55`.

```pgsql
SELECT * 
FROM Person P
WHERE NOT EXISTS (
        SELECT *
        FROM CityPool CP
            INNER JOIN Pool PL ON CP.PoolID = PL.PoolID
        WHERE PL.CityFK = 55
            AND NOT EXISTS (
                SELECT *
                FROM Entry E
                WHERE E.PersonFK = P.PersonID
                    AND E.PoolFK = CP.PoolID
            )
    );
```

Now, when coding all this, we arrive at a query very similar to the previous one where we looked for people who had rented all the bikes. As you can see, we first go through all the tuples of `Person`, and for each one, we construct a correlated subquery that gets all the city pools the corresponding person has not entered.

To do this, we perform a `JOIN` between `CityPool` and Pool and impose the condition that ensures all the city pools we consider are located in the city with `CityID=55`. Also, we verify with another correlated subquery that there is no entry of the person in the pool we are examining.

Each of these approaches to the same query have significant performance differences. In this last implementation, we nest several subqueries, leading to traversing many tuples, which is often unnecessary. On the other hand, using grouping tends to be faster since the traversal of tuples mainly depends on how the `GROUP BY` operation is implemented (which usually provides adequate performance for most queries).

Besides performance, in this last query, we can easily return all the information for each person because we directly use the `Person` table in the implementation. In contrast, in the previous approach using `GROUP BY`, we only returned each person's identifier, forcing us to use CTEs to perform a `JOIN` with the `Person` table if we want to return more information besides the identifier.

So when performing a division in SQL, we should consider not only the efficiency of the implementation but also the ease of modifying the query, as well as its clarity and maintainability.

The previous two queries were formulated considering the city with `CityID=55`, although this is an arbitrary decision. If we want to choose an appropriate value for `CityID` so that the two previous queries return data, since there may be cities where no person has entered all their pools, we can use the query below. For each person and city, it gets the number of pools in that city the person has entered, along with the total number of pools in that city.

```pgsql
SELECT E.PersonFK,
    P.CityFK,
    COUNT(DISTINCT E.PoolFK) AS EnteredPools,
    (
        SELECT COUNT(*)
        FROM CityPool AS CP2
            INNER JOIN Pool AS P2 ON CP2.PoolID = P2.PoolID
        WHERE P2.CityFK = P.CityFK
    ) AS TotalPools
FROM Entry AS E
    INNER JOIN CityPool AS CP ON E.PoolFK = CP.PoolID
    INNER JOIN Pool AS P ON CP.PoolID = P.PoolID
GROUP BY E.PersonFK, P.CityFK
ORDER BY EnteredPools, TotalPools;
```

As you can see, several `JOIN` operations are first performed to gather all the information from `Entry`, `CityPool`, and `Pool`, so we can later group the resulting tuples by `PersonFK` and `CityFK`. This means grouping the tuples into groups where each represents the entries a certain person has made in the pools of a certain city. Then, with `COUNT(DISTINCT E.PoolFK)`, we count the pools they have entered, since `PoolFK` is the foreign key in the `Entry` table that determines the pool the person has entered. Finally, with a correlated subquery in the `SELECT`, we get the total number of pools in the city identified by `CityFK`.

Finally, it's important to note that with this query, we will never get a value of 0 in the `EnteredPools` attribute. If a person has never entered any pool in a certain city, there will be no resulting tuples from these `JOIN` operations with `(E.PersonFK, P.CityFK)` attributes that reference both the person and the city.

This happens because no entry (`Entry` tuple) will have its foreign key `PersonFK` as the person and its foreign key `PoolFK` as a pool in the corresponding city that the person has visited (since they haven't visited any pool in that city).

So if we also want to include in our query's resulting table tuples with `(E.PersonFK, P.CityFK)` pairs of people who have never visited any pool in the city `CityFK`, we would need to use set operations to find those `(E.PersonFK, P.CityFK)` pairs and add the tuples constructed from these pairs to the final resulting table.

We can see another fundamental case we might encounter when implementing a division operation in SQL below. Here, we have a query where we get all the people who have or have had pool sanctions in all possible states.

```pgsql
SELECT PS.PersonFK
FROM PoolSanction PS
    INNER JOIN Sanction S ON PS.SanctionID = S.SanctionID
GROUP BY PS.PersonFK
HAVING COUNT(DISTINCT S.Status) = 3;
```

To implement this, we first perform a `JOIN` between `PoolSanction` and `Sanction`, ensuring with the first table that the sanction occurred in a pool and using the second table to get the sanction's state (which is stored in the `Status` attribute).

Then, as we need to count how many states each person has sanctions in, we group by the `PersonFK` attribute, creating groups of tuples that represent the sanctions each person has or has had. This way, we can use `HAVING` to require that the number of states in which a person has sanctions is equal to the total number of possible states a sanction can have.

On one hand, with `COUNT(DISTINCT S.Status)`, we can count how many different values the `Status` attribute takes in each group – or in other words, the number of states of the sanctions associated with a person. And, since there are three possible states ('created', 'active', 'expired'), we simply compare the resulting count from the aggregation function with 3. But if we use the constant 3 in the comparison and later modify the database to include more or fewer states in the sanctions, we will be forced to change that number. This makes the query not as maintainable as it could be.

So another another option we have for declaring the condition in the `HAVING` clause is to compare the result of the aggregation function `COUNT(*)` with the result of a subquery that calculates how many possible states a sanction can have.

```pgsql
SELECT PS.PersonFK
FROM PoolSanction PS
    INNER JOIN Sanction S ON PS.SanctionID = S.SanctionID
GROUP BY PS.PersonFK
HAVING COUNT(DISTINCT S.Status) = (SELECT COUNT(DISTINCT Status) FROM Sanction);
```

As up can see above, this subquery is non-correlated, as it simply counts how many **distinct values** the `Status` attribute takes in the `Sanction` table. But implementing the query this way has a problem: we’re assuming that in the `Sanction` table, specifically in the `Status` attribute, we can find all the possible values that `Status` can take. But this might not be the case, as if the table is empty, no distinct values can be counted in the `Status` attribute.

This means that this last implementation of the query only works when the `Sanction` table contains tuples representing sanctions where there is at least one sanction in all possible states. If we can guarantee that the database meets this condition, then the above implementation is more convenient for us because it requires no maintenance.

But this condition is not usually met, so it’s not a good practice to assume that we’ll find all possible values an attribute can take in that attribute. For example, if we think of an **integer** attribute, it’s clear that there don’t have to be tuples that take a different value for every possible value the attribute can have.

Another option we have is to skip grouping and use a set theory-based approach. As you can see, in the implementation above, we go through all the tuples of Person, and for each one, we check that there **exists** a pool sanction with the status **‘created’**. Also, using the logical operator `AND`, we require that at the same time there exists another pool sanction with the status **‘active’**. Finally, we use another logical operator `AND` to also require that for that person there exists another pool sanction in the status **‘expired’**.

```pgsql
SELECT p.PersonID
FROM Person p
WHERE EXISTS (
        SELECT *
        FROM PoolSanction ps
            INNER JOIN Sanction s ON ps.SanctionID = s.SanctionID
        WHERE ps.PersonFK = p.PersonID
            AND s.Status = 'created'
    )
    AND EXISTS (
        SELECT *
        FROM PoolSanction ps
            INNER JOIN Sanction s ON ps.SanctionID = s.SanctionID
        WHERE ps.PersonFK = p.PersonID
            AND s.Status = 'active'
    )
    AND EXISTS (
        SELECT *
        FROM PoolSanction ps
            INNER JOIN Sanction s ON ps.SanctionID = s.SanctionID
        WHERE ps.PersonFK = p.PersonID
            AND s.Status = 'expired'
    );
```

As you can see above, this implementation is equivalent to the previous one where we used groupings and counts to implement the division operation. But this approach is clearly less maintainable, though possibly easier to understand in some aspects.

For example, in this implementation, the names of the different `Status` values appear explicitly in the conditions we impose in each correlated subquery, which is generally not a good practice. If you want to modify the database domain, you will also have to modify these values.

Also, we’re duplicating the same code multiple times, making the query code as a whole less maintainable. This is because if the query itself needs to be modified, it’s very likely that we’ll need to make changes in all three subqueries, slowing down the management process.

So although the set theory-based approach may be impractical in certain situations, it can work for a small database like the one we're dealing with here. But, whenever possible, it's best to choose solutions that are more maintainable and require fewer changes in the future.

In this specific case, the best option would be to use the grouping approach where the number of sanction statuses for a person is compared with the total number of statuses, as changing that number in the query is easier than modifying the code of several subqueries. This also avoids having to make assumptions about the `Sanction` tuples.

Let’s look at another query that’s similar to the previous ones, where we can see a different way the division operator can appear. It retrieves all the people who, for every city they have lived in, have visited at least one pool located in that city.

```pgsql
SELECT P.PersonID
FROM Person P
WHERE NOT EXISTS (
        SELECT *
        FROM Residence R
        WHERE R.PersonFK = P.PersonID
            AND NOT EXISTS (
                SELECT *
                FROM Entry E
                    INNER JOIN Pool PO ON E.PoolFK = PO.PoolID
                WHERE E.PersonFK = P.PersonID
                    AND PO.CityFK = R.CityFK
            )
    );
```

For each person, keep them only if there is no residence of theirs that lacks a matching pool-visit in the same city. Equivalently: for every city a person has lived in (from `Residence`), there must be at least one record showing they visited a pool in that city.

The implementation of this approach is very similar to how we express it in natural language. On one hand, we go through the tuples of Person with a `SELECT` and a `FROM`, and we set the condition that the result of a subquery is empty using `NOT EXISTS`.

In this correlated subquery, we go through the tuples of `Residence` for the person we are currently checking the condition for, so to keep only the residences we are interested in, we impose the condition `R.PersonFK = P.PersonID` in the subquery. This ensures that the selected `Residence` tuples have their foreign key `PersonFK` pointing to the person we are going through, whose identification is given by `P.PersonID`.

On the other hand, within this subquery, we also check that another correlated and nested subquery doesn’t return any tuples either. This last subquery is dedicated to getting all the entries where the person identified by `P.PersonID` has entered a pool located in the city identified by `R.CityFK` – that is, the city of the residence we are going through at the time of executing this subquery.

In summary, in this query, we have seen that divisions don’t always refer to situations where the tuples we want to obtain are "associated" with all the tuples of another table. Instead, as in this case, they can also refer to the output tuples of our query needing to meet a certain condition in relation to all the tuples of another table.

Similar to the previous query, we can consider another one where we need to find people who have or have had at least one travel booking in all existing cruise classes.

```pgsql
SELECT CB.PersonFK
FROM CruiseBooking CB
    INNER JOIN CruiseShip CS ON CB.ShipFK = CS.ShipID
GROUP BY CB.PersonFK
HAVING COUNT(DISTINCT CS.Class) = (
        SELECT COUNT(DISTINCT Class)
        FROM CruiseShip
    );
```

In this case, we start by setting up the division operation through grouping and counting. First, we perform an `INNER JOIN` between the `CruiseBooking` and `CruiseShip` tables. This allows us to gather information about the person who made each travel booking using the foreign key `PersonFK` from `CruiseBooking` and the information about the cruise class for the trip. This same table has a foreign key `ShipFK` that uniquely identifies the cruise ship for the trip, from which we can determine its class.

So after this operation, we group by the `PersonFK` attribute, as we’ll need to count how many different cruise classes each person has booked to perform the division.

Regarding this quantity, we calculate it using the aggregation function `COUNT(DISTINCT CS.Class)`, which is executed once for each group of tuples. Then we compare it with the total number of cruise classes in our database.

In this case, we could have directly written the number instead of using an uncorrelated subquery to get the total number of classes by looking at the distinct values of the `Class` attribute from the `CruiseShip` table. So as it stands, with the subquery, we’re implicitly assuming that the `CruiseShip` table contains cruises in all existing classes (but this may not be the case).

Imagine if the table is empty, for example – the subquery would result in a total of 0 cruise classes, when in reality, there may be more (the domain of the `Class` attribute may contain more values than those actually appearing in the table).

But it’s important to clarify here that by “all cruise classes” we mean all possible values that the `Status` attribute can take – that is, the values we define as the domain of the attribute. On the other hand, in some circumstances, we can assume that all cruise classes correspond to the distinct values that the Status attribute takes in the `CruiseShip` table, all depending on the domain we are working with.

For simplicity, from now on in this domain, we’ll assume that the distinct values of an attribute like `Class` found in its corresponding table are equivalent to all the values it can take. If we think about it, this makes sense because if there are only 2 distinct values in the `Class` attribute of the `CruiseShip` table, then all the bookings made throughout the time the database has existed will have to reference some cruise in the `CruiseShip` table (whose `Class` will have one of those two values). There might be no bookings referencing cruises of a certain class, but if there are cruises of two classes, then it makes sense to assume that those two classes make up **“all the classes the `Class` attribute can hold.”**

So, by assuming that the `Class` attribute of the `CruiseShip` table contains "all the classes" of cruises, we can solve the query using a set theory approach as shown in the query below.

Here, we first go through all the tuples in `CruiseBooking` that represent bookings. In each one, we check that there is no cruise (of any class, rather) for which no booking has been made by the person referenced by the foreign key `PersonFK` of the `CruiseBooking` tuple we are examining.

```pgsql
SELECT DISTINCT CB.PersonFK
FROM CruiseBooking CB
WHERE NOT EXISTS (
        SELECT *
        FROM CruiseShip C
        WHERE NOT EXISTS (
                SELECT *
                FROM CruiseBooking CB2
                    INNER JOIN CruiseShip CS2 ON CB2.ShipFK = CS2.ShipID
                WHERE CB2.PersonFK = CB.PersonFK
                    AND CS2.Class = C.Class
            )
    );
```

That is, since we are only interested in getting the people who have ever booked, we start the query by going through `CruiseBooking`, not Person, because there may be people in `Person` who have never booked.

So to check that there is no cruise with these characteristics, we use the `NOT EXISTS` operator and a correlated subquery in which we go through all the cruises registered in the `CruiseShip` table. For each one, we check that there is no travel booking where the cruise is the one **whose class is the same** as the cruise and person we are currently examining in the query.

By doing this, we ensure that for all the people returned by our query, there is no cruise of any class that hasn’t been booked at least once by that person. But we can do this correctly only if we are sure that the Class attribute in `CruiseShip` includes what we consider as **“all possible cruise classes“**. If we didn't have this assurance, then this set theory approach would not be correct, because the correlated subquery that goes through the tuples of `CruiseShip` might not be covering all possible cruise classes.

For example, imagine the `CruiseShip` table is empty. In that case, this approach would return more people than it should, since that subquery would never return tuples.

On the contrary, in the other approach based on groupings, if the `CruiseShip` table is empty, then the uncorrelated subquery that counts the total number of classes would return 0. Also, the `HAVING` condition would never be met, preventing the return of people who do not meet the condition defined in the query statement.

So as you can see, it’s not always better to use just one approach based on either **groupings** or **set theory** – it varies depending on the situation.

In this specific case, it’s more practical to use groupings – mainly for efficiency (since internally a grouping is usually faster than executing a correlated subquery multiple times) but also for simplicity of maintenance and code clarity.

To wrap up our discussion on the division operator of relational algebra, it’s important to note that there are times when we have to do division using intermediate tables (CTE) instead of tables from the database itself.

For example, in the query below, we obtain the ships that have made at least one trip departing from and arriving at each pair of cities with an area of at most 11 km². In other words, all ships that have made at least one trip between each pair of cities with this characteristic.

```pgsql
WITH AllPairs AS (
    SELECT C1.CityID AS Dep, C2.CityID AS Arr
    FROM City C1 CROSS JOIN City C2
    WHERE C1.CityID <> C2.CityID AND C1.Area<11 AND C2.Area<11
),
ShipVisits AS (
    SELECT V.ShipFK,
        V.DepartureCityFK AS Dep,
        V.ArrivalCityFK AS Arr
    FROM Voyage V
        INNER JOIN City C1 ON V.DepartureCityFK = C1.CityID
        INNER JOIN City C2 ON V.ArrivalCityFK = C2.CityID
    WHERE C1.Area<11 AND C2.Area<11
)
SELECT SV.ShipFK
FROM ShipVisits SV
GROUP BY SV.ShipFK
HAVING COUNT(DISTINCT (SV.Dep, SV.Arr)) = (
        SELECT COUNT(*)
        FROM AllPairs
    );
```

As you can see in the implementation, to make the code simpler, we can first build an intermediate table with all possible pairs of cities with an area value `<11`. We. cando this by executing a `CROSS JOIN` between the `City` table and itself, as it contains all the cities registered in our database. Then we require that both cities in the pair have an area `<11`. It’s important to note that the `Area` attribute of the `City` table contains values representing square kilometers, so it’s straightforward to declare the `<11` condition in our query. But if this attribute had values in other units, we’d need to adapt to them or convert them to other units that we could easily work with. It’s crucial to consider the units in which the values we compare are measured to correctly code the query.

Finally, this table includes all possible pairs of cities that meet the area characteristic, meaning it doesn't matter if the same pair of cities `(A,B)` also appears in the table as `(B,A)`.

Then, we build another intermediate table where we store the different pairs of cities each cruise has visited throughout all its trips, considering only those cities that meet the query conditions (area `<11`).

To do this, we simply extract the foreign key attributes `ShipFK`, `DepartureCityFK`, and `ArrivalCityFK`. These determine the cruise that made the trip and the departure and arrival cities of the trip from the resulting table of the `INNER JOIN` operations between the `Voyage` table and the `City` table itself.

We perform these operations to access the area information of each city, allowing us to impose the same area conditions as in the first intermediate table `AllPairs`. If we didn't do this, we might consider cruise trips between cities that don't meet the conditions we are looking for. This would increase the number of **“valid”** city pairs the cruise has traveled between. Since we’re going to structure the query using a grouping and a **count**, it’s essential not to count irrelevant elements for our query.

Once both CTEs are built, we perform a grouping on the `ShipVisits` tables based on the `ShipFK` attribute. We do this to calculate, for each cruise, the number of distinct pairs of cities it has traveled between. We easily calculate this using the aggregation function `COUNT(DISTINCT (SV.Dep, SV.Arr))`. Then we can compare the returned value with the total number of city pairs that exist and that we have stored in the first CTE called `AllPairs`, all within the `HAVING` clause.

To keep only those cruises that have traveled through every pair of cities calculated in `AllPairs`, we compare the output of the `COUNT()` aggregation function with the result of an uncorrelated subquery that simply counts how many tuples the intermediate table `AllPairs` has.

In the total count of pairs, we don’t have to use the `DISTINCT` modifier, since the `CROSS JOIN` never generates repeated city pairs given the very definition of the cross product operation. And there there are no identical tuples in the City table, meaning there are no identical cities in our database (much less with the same value of their primary key `CityID`). But if we wanted to use the `DISTINCT` modifier to count how many distinct tuples are in `AllPairs`, we could use the syntax `COUNT(DISTINCT AllPairs.*)`.

Regarding this last subquery, we could have avoided explicitly constructing all the city pairs in `AllPairs` if we had directly performed the same computation as in `AllPairs` – but returning only `COUNT(*)`. This would directly count all the city pairs with the characteristics we are looking for. But we can only do this if we code the query using grouping and counting, as we’ll see that it can also be implemented based on set operations, for which we’ll necessarily need to construct and store the pairs in `AllPairs`.

So just as we have shown with other queries, we can also approach this one using **set theory operators**. As you can see below, the intermediate tables are constructed in the same way except for `ShipVisits`, where we don't need the cities involved in the trips to meet the condition of having an `area < 11`. This is because those `ShipVisits` tuples will later be compared with the city pairs in `AllPairs`, which do meet the condition. This way, we end up with cruises that have made a trip in all the pairs of `AllPairs`, regardless of additional tuples in `ShipVisits` with trips between cities that don't meet the condition we're looking for.

Although this isn't crucial for resolving the query, it's important to note that `ShipVisits` contains more tuples than necessary, which might slow down the query since `ShipVisits` will later be used in a **correlated subquery**, resulting in multiple scans of its tuples.

```pgsql
WITH AllPairs AS (
    SELECT C1.CityID AS Dep, C2.CityID AS Arr
    FROM City C1 CROSS JOIN City C2
    WHERE C1.CityID <> C2.CityID AND C1.Area<11 AND C2.Area<11
),
ShipVisits AS (
    SELECT V.ShipFK,
        V.DepartureCityFK AS Dep,
        V.ArrivalCityFK AS Arr
    FROM Voyage V
)
SELECT SV.ShipFK
FROM ShipVisits SV
WHERE NOT EXISTS (
        SELECT *
        FROM AllPairs AP
        WHERE NOT EXISTS (
                SELECT *
                FROM ShipVisits SV2
                WHERE SV2.ShipFK = SV.ShipFK
                    AND SV.Dep = AP.Dep
                    AND SV.Arr = AP.Arr
            )
    );
```

After constructing the CTEs, we solve the query in a way similar to the other divisions we've seen. First, we go through the tuples of `ShipVisits` (although we could also choose to go through those of `CruiseShip`, since what we want is to go through all the cruises in the database, or at least those that have made a trip). So instead of using `CruiseShip`, which might contain cruises that have never made a trip, we choose to go through the tuples of `ShipVisits`, where we can find cruises referenced by the **foreign key `ShipFK`** from the `Voyage` table, which we know have made at least one trip.

In each of these tuples, we check that there is no pair of cities from `AllPairs` for which there is no trip made by the cruise we are currently going through between the cities of that pair.

To do this, we use the `NOT EXISTS` operator and two nested correlated subqueries. In the first, we go through the tuples of `AllPairs` – that is, the pairs of cities that do meet the condition of having an `area < 11`. Then for each pair, we use `NOT EXISTS` again on another correlated subquery that gets all the trips made by the cruise currently being processed in the query execution over the cities of the corresponding pair from `AllPairs`.

In a more intuitive way, we’re getting all the cruises for which there is no pair of cities from `AllPairs` where the cruise hasn't traveled at least once. As you can guess, since the cities in `AllPairs` do meet the condition of having an area less than 11 km², it doesn't matter that ShipVisits has trips with cities that don't meet this condition – because in the query we check that for a certain pair of cities from `AllPairs` there is no trip of a cruise in those cities. So it’s really indifferent which cities are present in the trips of `ShipVisits`, as those that meet the condition will definitely be there since we don't impose any condition when constructing that intermediate table.

In summary, with this approach, we can solve the query just as we did before using groupings and counts. But the difference here is that we can save the conditions (`area < 11`) that we imposed when constructing the tuples of `ShipVisits`.

At first glance, this might seem like an improvement in code clarity, as it’s shorter. This makes it more maintainable in this case because fewer operations and statements are needed to construct the CTE. But the resulting CTE contains more tuples, specifically those that represent all the trips each cruise has made, not just those made between cities that meet the condition of having an `area < 11`. This additional number of tuples impacts the computation of the query. But to analyze this impact, we must also consider that in constructing `ShipVisits`, we are saving two `JOIN` operations, which are highly costly, in addition to the expected amount of data with which the query will be executed.

For example, if the amount of data in the involved tables is small, the performance difference won’t be significantly noticeable. But if it’s large, it’s more beneficial to have the smallest possible number of tuples in `ShipVisits`, even if it requires performing an additional `JOIN`.

This is because the correlated subquery that goes through the tuples of `ShipVisits` is executed once for each tuple of `AllPairs`, and all of this is executed once for each tuple of `ShipVisits` (we could have replaced this last one with `CruiseShip` to improve performance, as the number of cruises is fixed and tends to be smaller than the number of trips).

So the computation involved in going through all the tuples of `ShipVisits` is much greater than the computation of a simple `JOIN` used to construct the CTE itself – which, despite being computationally costly, only needs to be executed once (not multiple times depending on the number of tuples in other tables).

To finish with the division operation, we've seen that we can implement it in SQL using the `EXISTS` operator (either as is or negated with the logical `NOT` operator) and a correlated subquery. In it, the `SELECT` statement uses the `*` notation to return all the attributes of the corresponding table. This means that to check if the subquery returns any tuple or not, we construct its result so that each tuple possibly has multiple attributes – meaning all those that result from using the `SELECT *` notation. But sometimes instead of returning several attributes, it simply returns a column with a fixed value like the integer 1. In general, using the `SELECT *` notation in a correlated subquery to which the EXISTS operator is applied is considered good practice, so it’s coded this way by default. But there are also other possibilities like `SELECT 1`, which at first glance might seem more efficient because it doesn't return unnecessary attributes since it only checks if the subquery results in any tuple or not.

In summary, the decision on which attributes to return in a correlated subquery using the `EXISTS` operator is mainly determined by the characteristics of the DBMS, as each [<FontIcon icon="fas fa-globe"/>implementation](https://dba.stackexchange.com/questions/159413/exists-select-1-vs-exists-select-one-or-the-other) of the [<FontIcon icon="fa-brands fa-stack-overflow"/>DBMS](https://stackoverflow.com/questions/424212/performance-of-sql-exists-usage-variants) handles these operations differently at the physical level.

---

## Ranking Queries

To conclude with the different "types" of queries we might encounter, there are queries where we need to calculate a **ranking** – that is, ordering elements based on the value they have for a certain metric. For example, ordering people by the number of bike rentals they have made, allowing us to find out who has made the most or fewest rentals, among many other similar tasks.

In this case, these approaches don’t have any equivalent operator in relational algebra. This is because the calculation of rankings is based on the combination of multiple techniques and tools like groupings, aggregations, or uncorrelated subqueries that aren’t present in relational algebra as specific operators.

This is mainly because in relational algebra, there is no concept of order, and since tables are treated as sets of tuples, there is no unique way to number the tuples positionally to establish an **internal order of the set**. In other words, within a set, its elements don’t necessarily have an order among them unless we explicitly define it.

We can start by finding the maximum value of whatever we’re ranking for (and, optionally, where in the table this occurs). For example, in the query below, we get the maximum passenger capacity among all the cruise ships in the `CruiseShip` table.

```pgsql
SELECT MAX(PassengerCapacity) AS MaxCapacity
FROM CruiseShip;
```

In terms of approach, solving this query involves establishing a ranking of the cruise ships based on their passenger capacity (this is their metric). The one with the highest capacity occupies the first place in the ranking, followed by the other cruise ships. So if we take the first in the ranking and access its metric, we will have the maximum passenger capacity, which is what we want to obtain.

In SQL, implementing this query is very simple if we only want to get the metric value and its values are already calculated in an attribute. As you can see, we simply use the `MAX()` aggregation function, which we give the attribute where the metric values are calculated as an input argument. Finally, when we execute the query, we will see that only one tuple is returned with that maximum value in the attribute we have named with the alias `MaxCapacity`.

But the implementation is not always that simple. For example, if we want to get not only the maximum value of the metric but also the specific element associated with that metric – in this case, the cruise ship with the highest passenger capacity – we first need to go through the tuples in `CruiseShip` and check each one to see if it corresponds to the cruise ship with the highest passenger capacity.

Specifically, what we check in each tuple is whether the passenger count is equal to the maximum or not, so that we only keep those tuples where the `PassengerCapacity` value is exactly equal to the maximum value of that attribute.

```pgsql
SELECT ShipID, PassengerCapacity
FROM CruiseShip
WHERE PassengerCapacity = (
    SELECT MAX(PassengerCapacity)
    FROM CruiseShip
);
```

This is reflected in the query code above. In the `WHERE` clause, we check that the `PassengerCapacity` attribute value is equal to the result of the uncorrelated subquery that returns its maximum value. We use the `MAX()` aggregation function for this just like before.

If the values match, we will have found the tuple of the cruise ship with the highest passenger capacity. But there may be several cruise ships with that same capacity, so our query will return them as well.

If we want to get only one cruise ship, we have the option to add an additional clause `LIMIT 1` at the very end of the query, which basically returns only the first tuple of the resulting table from the query.

This [<FontIcon icon="fas fa-globe"/>LIMIT clause](https://datacamp.com/tutorial/sql-limit), it’s not part of the [<FontIcon icon="fas fa-globe"/>SQL-92 standard](https://contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt), but it can still be used in any query we need as long as the DBMS supports it (all **modern** DBMSs support it). Its use is simple: we just give it a number that indicates the number of tuples from the resulting table of the query that we want to get from the first tuple located at the top of the table, ignoring the rest.

Another option we have is to do without the `MAX()` aggregation function. As you can see below, most of the query code is the same, except for the subquery. Instead of returning the maximum value of the `PassengerCapacity` attribute, it returns the attribute itself – meaning all the values in its corresponding column in the CruiseShip table.

```pgsql
SELECT ShipID, PassengerCapacity
FROM CruiseShip
WHERE PassengerCapacity >= ALL (
    SELECT PassengerCapacity
    FROM CruiseShip
);
```

In this way, the condition of the `WHERE` clause uses the operator >= along with the `ALL` modifier, which establishes that, for a certain tuple of `CruiseShip`, its `PassengerCapacity` value must be greater than all the values returned by the subquery. Or put another way, our query retrieves information on all cruise ships whose passenger capacity is greater than or equal to each and every capacity stored in the `PassengerCapacity` attribute of the `CruiseShip` table.

Specifically, here we have to use the operator `>=`, not `>`, because if we are going through the tuple of a cruise ship that does have the highest passenger capacity, its capacity will at most be equal to the maximum capacity of the `CruiseShip` table (but never greater). That is, if the maximum is a value `X`, then there will be no cruise ship with a capacity `>X`, but there will be one or more with a capacity `=X`, which are the ones we want to find.

At the same time, these have a capacity `X` that is greater than the rest of the capacities of the other cruise ships, which is why we use the operator `>=`.

The `ALL` modifier is necessary to ensure that the value of the `PassengerCapacity` attribute meets the condition imposed by the `>=` operator with respect to each and every tuple returned by the subquery. In this case, it only returns tuples with an attribute or column with the values of all the passenger capacities that it must be compared with.

As you can guess, even though this way of implementing the query is equivalent to the previous one, here the subquery returns a series of values that are compared for each tuple of `CruiseShip`. That is, for each cruise ship, all the tuples of the subquery are traversed to perform the comparison declared in the `WHERE` clause. This requires much more computation than simply comparing with a number like the maximum capacity obtained from the `MAX()` function.

So since the **subquery** is **non-correlated** and is computed only once, it’s more optimal to use the previous approach where we used `MAX()` than this one, as this approach uses more space to store the subquery tuples and more time unnecessarily traversing them to make the comparisons.

Continuing with queries where we need to calculate a **maximum**, here we have another one where we get the person (or people) who have had the most residences in cities, along with that maximum number of residences.

```pgsql
SELECT R.PersonFK AS PersonID, COUNT(*) AS NumResidences
FROM Residence AS R
GROUP BY R.PersonFK
HAVING COUNT(*) >= ALL (
        SELECT COUNT(*)
        FROM Residence
        GROUP BY PersonFK
    );
```

We can find the information to solve this query in the `Residence` table – specifically in the tuples themselves, where each one represents a residence. The person is referenced by the foreign key `PersonFK` and the city where the person has lived is referenced by the foreign key `CityFK`.

So, in this table, we don't have a number in an attribute that tells us the number of residences a person has had. Instead, the tuples themselves represent the residences of the people, and we need to count them to know which person has or has had the most residences.

To do this, we can group the tuples in Residence by the attribute `PersonFK`, since we need to count residences for each person. In this way, we form groups of tuples that represent all the residences a person has had.

Once the groups are made, we can use `COUNT(*)` to count how many residences the "representative" person of that group of tuples has or has had. Then, to ensure that this number is the maximum, we use the operator `>=` along with the `ALL` modifier and a subquery.

In this case, the subquery calculates, for each person, the total number of residences they have or have had in the same way as in the main query, using a grouping by the `PersonFK` attribute of Residence and the aggregation function `COUNT(*)`.

With this, we can verify, in the `HAVING` clause, that the number of residences of a certain person is greater than or equal to all the numbers of residences that all the people present in the Residence table have or have had.

On the other hand, we could try to implement the query without using the `>=` operator and the `ALL` modifier, and instead use only a non-correlated subquery and the aggregation function `MAX()`.

```pgsql
SELECT
  R.PersonFK   AS PersonID,
  COUNT(*)     AS NumResidences
FROM Residence AS R
GROUP BY R.PersonFK
HAVING COUNT(*) = (
  SELECT MAX(COUNT(*))
  FROM Residence
  GROUP BY PersonFK
);
```

As you can see above, the query construction is very similar, except that in the `HAVING` clause, we directly compare `COUNT(*)`, which returns the number of residences a person has or has had with the result of the subquery, which seems to obtain the maximum number of residences any person has had.

But if we look at the `SELECT` clause of the subquery, several nested aggregation functions like `MAX(COUNT(*))` appear, intending to calculate the maximum value of the numbers of residences people have had. But **this is not allowed in SQL**. In fact, if we run the query, the DBMS will give us an error because **an aggregation function can’t be used as an input argument to another aggregation function**.

If we really want to use the aggregation function `MAX()` to solve the query, we have no choice but to first build a CTE where we store all the people who have ever had a residence and their respective number of residences.

You can see this in the code below, and it’s very similar to the approach we followed before to solve the query. This involves grouping the residence tuples by their foreign key attribute `PersonFK` and using `COUNT(*)` to count how many tuples each group has, that is, how many residences each person has.

```pgsql
WITH ResCount AS (
    SELECT PersonFK AS PersonID, COUNT(*) AS NumResidences
    FROM Residence
    GROUP BY PersonFK
)
SELECT RC.PersonID,
    RC.NumResidences
FROM ResCount RC
WHERE RC.NumResidences = (
        SELECT MAX(NumResidences)
        FROM ResCount
    );
```

Then, once this intermediate table `ResCount` is built, we are in the same situation as in the queries at the beginning of this section, where the numbers of residences are now values stored in an attribute.

So we can follow the usual approach to get the tuple or tuples from ResCount with the maximum value in their attribute `NumResidences`. This involves going through all its tuples and checking if their NumResidences value matches the maximum. We can easily calculate this with a non-correlated subquery and the aggregation function `MAX()`.

After these queries, we can consider solving them by obtaining the element with the lowest value in its metric in the ranking.

For example, in this last case, it would correspond to finding the person or people who have had the fewest residences (which doesn't make much sense in this query, but it does in others).

So, to calculate **minimums** instead of **maximums** in SQL, you use exactly the same constructions we just saw, with the difference that the operators and aggregation functions used change, such as the operator `>=` to `<=` and the aggregation function `MIN()` is used instead of `MAX()`.

In addition to calculating maximums and minimums, in SQL it's sometimes useful to calculate the **ranking positions** of elements based on the value of their metrics.

```pgsql
SELECT
  P1.PoolID,
  P1.Name,
  P1.MaxDepth,
  (
    SELECT COUNT(*) + 1
    FROM Pool AS P2
    WHERE P2.MaxDepth > P1.MaxDepth
  ) AS DepthRank
FROM Pool AS P1
ORDER BY DepthRank;
```

For example, in the query above, we get a list of all the pools in the database, where for each one, we calculate its position in the pool ranking ordered by the value of its `MaxDepth` attribute, that is, by its maximum depth.

Also, since there can be multiple pools with the same `MaxDepth` value, in that case, both pools will have the same position in the ranking. So the next position with a lower `MaxDepth` value won’t be the immediate next position – instead, you must add the number of pools from the previous position that had the same `MaxDepth` value to that ranking position.

| `PoolID` | `Name` | `MaxDepth` | `DepthRank` |
| --- | --- | --- | --- |
| 1 | Sample Pool Name 1 | 5 | 1 |
| 2 | Sample Pool Name 2 | 5 | 1 |
| 3 | Sample Pool Name 3 | 3 | 3 |
| 4 | Sample Pool Name 4 | 2 | 4 |
| 5 | Sample Pool Name 5 | 2 | 4 |

To understand this, here we have a table where you can see that the first two pools have the same position (`DepthRank`) in the pool ranking because they have the same `MaxDepth` value. Then, the next pool with `PoolID=3` has position 3 in the ranking, as there are two pools before it in the ranking. Finally, the next two pools with `PoolID=4` and `PoolID=5` again have the same position in the ranking for the same reason as before.

As we can see, this way of defining and building the ranking is not what we might expect, where each pool has a unique position. Instead, we slightly modify the ranking definition to allow pools with the same `MaxDepth` value to share the same position in the ranking, so SQL implementation doesn't require more advanced functions.

Regarding the implementation, if we look at the attributes of the example table, specifically `MaxDepth` and its relationship with `DepthRank`, we can conclude that the position we should assign to each pool in the ranking matches the number of pools with a `MaxDepth` strictly greater than its own **plus 1**.

For example, for the pool with `PoolID=2`, we see that there is no pool with a `MaxDepth` greater than its own – at most, there are some with an equivalent `MaxDepth`, but never greater because this pool has the highest `MaxDepth` value (meaning the maximum). Meanwhile, the pool with `PoolID=3` has two pools with a `MaxDepth` greater than its own.

So if we **add one** to the number of pools with a metric value, which in this case we can find in the `MaxDepth` attribute, greater than the `MaxDepth` value of a certain pool, then the amount we obtain is the ranking position of that pool.

The simplest way to implement this calculation in SQL is through a correlated subquery in the `SELECT`, where, as you can see, we get all `Pool` tuples with a `MaxDepth` greater than the pool we are iterating over in the query. And finally, with `COUNT(*)+1`, we add 1 to the number of tuples returned by the subquery, thus generating the **position** in the ranking of the pool being iterated over in the query.

Continuing with the idea of getting the ranking position of the elements, we also have the option to select only those elements with a ranking position greater or less than a certain amount we need to set.

```pgsql
SELECT PoolID, Name, MaxDepth
FROM Pool AS P
WHERE (
        SELECT COUNT(*)
        FROM Pool AS P2
        WHERE P2.MaxDepth > P.MaxDepth
    ) < 5
ORDER BY MaxDepth DESC;
```

For example, above we have a query where we get the pools that are among the top 5 distinct positions in the ranking. In other words, we don’t get the first 5 rows with pools ordered in the ranking according to their MaxDepth value, but we get all those whose ranking position is among the top 5 distinct positions.

As you can see, the implementation is simple. We go through all the `Pool` tuples and for each one, we execute a subquery like the one we saw in the previous query: it gets the number of pools with a MaxDepth greater than the pool we are iterating over – that is, its position in the ranking. Then, we compare that number with 5 to ensure it’s strictly less.

Also, here we need to note that we have not added 1 to `COUNT(*)`, which means the ranking starts counting at **position 0**, not 1, so we can later check that the position is among the top 5 distinct ones with `< 5` and not `< 6`. This doesn't have to be done this way necessarily, as we could have added 1 to `COUNT(*)` and declared the comparison using `< 6`, or `<=5`.

In summary, in this query, we used a correlated subquery to get the ranking position (starting from position 0) of each pool, so we only keep those whose position is strictly less than 5. But we could have also pre-calculated the positions of each pool in a CTE and then applied this condition to an attribute instead of the value returned by a subquery.

This alternative will likely use more memory than is necessary, since the computing the execution of the subquery that calculates the ranking position will be present whether we use a CTE or not. So the most optimal approach would be to avoid wasting memory unless we really need an intermediate table with that information for other uses.

So now we’ve have seen a series of queries that follow certain patterns that are the most basic and fundamental in SQL. But there are many other queries we could perform on the schema of this example with a wide variety of purposes. These are **essential** to know how to formulate and code.

To learn more queries, you can visit the following resource: <FontIcon icon="iconfont icon-jupyter"/>`PostgreSQL.ipynb`.

<SiteInfo
  name="sql-storage/PostgreSQL.ipynb at main · cardstdani/sql-storage"
  desc="Contribute to cardstdani/sql-storage development by creating an account on GitHub."
  url="https://github.com/cardstdani/sql-storage/blob/main/PostgreSQL.ipynb/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7bcbcfa51cd3a5f4cd6363d5e76f8da7e21b4f70750fca25e82020150d9a6311/cardstdani/sql-storage"/>

This is a Jupyter notebook that you can run from Google Collab. It contains Python code and Bash commands that allow you to install the **PostgreSQL DBMS** on a **Linux virtual machine** like those used by [<FontIcon icon="iconfont icon-gcp"/>Google Compute Engine](https://cloud.google.com/products/compute) (the backend of Google Collab). You can also execute SQL code to create the database from the DDL and then run queries and obtain their results.

The notebook contains a series of query statements with solutions, along with everything needed to execute them. These queries aren’t ordered or classified like those we saw in the last chapter, as the goal is for you to try to solve them from the statements without looking at the solution. This way, you can later see how they were solved and gain practice in formulating queries, which is one of the most valuable skills for providing services to end users from the database.

You don’t necessarily have to do this in a Google Collab environment – you can also do it on a PostgreSQL installation on a **local machine** and execute the queries by copying and pasting the query code into the PostgreSQL terminal. But doing it in a remote environment like the one offered by Google Collab has certain advantages, such as not having to worry about installing anything manually, as everything is set up automatically by simply running the code cells or being able to see the text of the statements in the notebook rendered with markdown.

Still, there are some disadvantages, such as the database being stored on a Google virtual machine, which means you don't have full control over the machine and environment in which the DBMS runs. Its execution can also be interrupted depending on how you use the virtual machine and the plan you have with Google Collab.

So even though it may not be an environment where you can deploy a fully functional production database, it’s sufficiently similar to a real environment where you might have a database deployed for a project, making it worthwhile to work in Google Collab.
