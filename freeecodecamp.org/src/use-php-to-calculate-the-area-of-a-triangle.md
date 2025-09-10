---
lang: en-US
title: "How to Write a PHP Script to Calculate the Area of a Triangle"
description: "Article(s) > How to Write a PHP Script to Calculate the Area of a Triangle"
icon: fa-brands fa-php
category:
  - PHP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write a PHP Script to Calculate the Area of a Triangle"
    - property: og:description
      content: "How to Write a PHP Script to Calculate the Area of a Triangle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/use-php-to-calculate-the-area-of-a-triangle.html
prev: /programming/php/articles/README.md
date: 2025-06-20
isOriginal: false
author:
  - name: AYUSH MISHRA
    url : https://freecodecamp.org/news/author/Ayush01Mishra/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1750346934679/2e46bebb-9614-4f1a-afb5-9bbe27906b4e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "PHP > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/php/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write a PHP Script to Calculate the Area of a Triangle"
  desc="In programming, being able to find the area of a triangle is useful for many reasons. It can help you understand logic-building and syntax, and it’s a common programming problem used in school assignments. There are also many real-world applications,..."
  url="https://freecodecamp.org/news/use-php-to-calculate-the-area-of-a-triangle"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1750346934679/2e46bebb-9614-4f1a-afb5-9bbe27906b4e.png"/>

In programming, being able to find the area of a triangle is useful for many reasons. It can help you understand logic-building and syntax, and it’s a common programming problem used in school assignments. There are also many real-world applications, such as computer graphics, geometry-based simulations, or construction-related calculations.

In this article, we’ll look at a common problem: we are given the dimensions of a triangle, and our task is to calculate its area. You can calculate the area of a triangle using different formulas, depending on the information you have about the triangle. Here, you’re going to learn how to do it using PHP.

::: info After reading this tutorial:

- You will understand the basic logic behind calculating the area of a triangle.
- You will know how to write PHP code that calculates the triangle’s area using pre-defined and user-entered values.
- You will know how to apply this logic in small projects and assignments.

:::

::: note Prerequisites

You’ll understand this guide more easily if you have some knowledge about a few things:

**Basic PHP**

You’ll need to know basic PHP syntax to fully understand the problem. If you know how to write a simple echo statement or create a variable in PHP, then you should be good to go.

**Local PHP Environment**

To run the PHP code successfully, you should have local PHP development, such as XAMPP or WAMP, on your machine. You can also use online PHP editors like PHP Fiddle or OnlineGDB to run a PHP script without any installation.

In this tutorial we are going to explore three approaches to determine the area of the triangle in PHP based on the amount of information available about the triangle.

- **Base and Height Formula Approach:** This approach is applicable when you have the perpendicular height from the base and length of the base in the problem.
- **Heron’s Formula:** This approach is used to calculate the area of triangle when you have the lengths of all three sides of the triangle.
- **Trigonometric Formula Approach:** This approach is applied on the problem when you have the length of two sides and the included angle between them.

:::

First, let’s go back to math class and use some direct formulas to find the area.

---

## Find the Area of a Triangle Using Direct Formulas

### Example 1:

In this first example, you’re given the input base and height of a triangle. You have to return the area of the triangle. For this example, you’ll use a direct formula to calculate the area of the triangle.

#### Input

- Base = 5,
- Height = 10

You can calculate the area of the triangle using the formula:

$$
\text{Area}=\frac{\left(\text{Base}\times\text{Height}\right)}{2}
$$

So, if you plug in the values you have, you get:

$$
\frac{\left(5\times{10}\right)}{2}=25
$$

#### Output:

- Area = 25

### Example 2

In this second example, you’re given the length of two sides of a triangle and one angle between them. You have to return the area of the triangle. In this example, you’ll use another direct formula to calculate the area of the triangle.

#### Input

- Side A = 7
- Side B = 9
- Angle between them = 60°

In this case, you’ll use the formula:

$$
\text{Area}=\frac{1}{2}AB\times\sin\left(\text{Angle}\right)
$$

Then just substitute in the values you’ve been given to find the area.

#### Output

- Area = 27.33 (approximately)

Now let’s look at some different approaches to finding the area of a triangle using PHP.

---

## Find the Area of a Triangle Using the Base and Height Approach

This is the simplest and most direct approach for calculating the area of a triangle when you know the base and height. In this approach, you’ll directly put values in the formula and find the area of the triangle - but you’ll do it with PHP code.

First, define the base and height of the triangle. Then apply the formula for the area of the triangle. As we saw above, the formula for the area of a triangle is:

$$
\text{Area}=\frac{\left(\text{Base}\times\text{Height}\right)}{2}
$$

After calculating the area of the triangle, output the answer.

Alright, so here’s how we can implement that in PHP:

```php
<?php
// Define the base and height
$base = 5;
$height = 10;

// Calculate the area
$area = ($base * $height) / 2;

// Output the result
echo "The area of the triangle is: " . $area . " square units.";
?>
```

### Output:

The area of the triangle is 25 square units.

In the above code, first we initialize the base and height of triangle in two variables. Then we plug those values into the area formula. PHP calculates the area of the triangle and displays the answer.

**Time Complexity**: In the above approach, we are using the direct formula to calculate and return the area of the triangle, so the time complexity will be constant at O(1). The constant time complexity is efficient as it will remain constant, regardless of the size or values of the base and height.

**Space Complexity**: The Space Complexity will be O(1). The space used by the above program is constant, which ensures minimal use of memory. This space complexity is ideal in environments where memory efficiency is a priority.

We use the above approach when we have the length of the base and height of the triangle (whether directly given or easily measurable in a right angle triangle). This method works best for right-angled triangles.

---

## Find the Area of a Triangle Using Heron's Formula

Heron’s formula is named after a Greek mathematician named Heron of Alexandria. Heron’s formula is useful when you know the lengths of all three sides of the triangle and you want to calculate the area without needing the height. This formula works for any type of triangle, including scalene triangles (triangles with sides of all different lengths).

Here’s Heron’s formula to calculate the area of a triangle:

$$
\sqrt{s}\left(s−a\right)\left(s−b\right)\left(s−c\right)
$$

Where:

- $s$ = semi-perimeter = $\frac{\left(a+b+c\right)}{2}$ is the semi-perimeter of the triangle.
- $a$, $b$, and $c$ are the lengths of the sides.

First, we define the three sides of the triangle. Then, we check all three conditions of the [<VPIcon icon="fa-brands fa-wikipedia-w"/>Triangle Inequality Theorem](https://en.wikipedia.org/wiki/Triangle_inequality) which states that if the sum of two sides is greater than the third side, then it is a valid triangle, and the given sides can form a triangle.

We can calculate the semi-perimeter of the triangle using the formula $s=\frac{a+b+c}{2}$. Then we can apply Heron's formula to calculate the area. After calculating the area, then output the answer.

Here’s how you can implement this in PHP:

```php
<?php
// Define the sides of the triangle
$a = 7;
$b = 9;
$c = 10;

// Check if the sides form a valid triangle using the Triangle Inequality Theorem
if (($a + $b > $c) && ($a + $c > $b) && ($b + $c > $a)) {

    // Calculate the semi-perimeter
    $s = ($a + $b + $c) / 2;

    // Calculate the area using Heron's formula
    $area = sqrt($s * ($s - $a) * ($s - $b) * ($s - $c));

    // Output the result
    echo "The area of the triangle is: " . $area . " square units.";

} else {
    // If the sides can't form a valid triangle
    echo "The given sides do not form a valid triangle.";
}
?>
```

### Output:

The area of the triangle is: 27.321 square units.

In the above code, we first create three variables to store the lengths of the triangle’s sides, and check if the given sides form a valid triangle or not using the Triangle Inequality Theorem. Then we calculate the semi-perimeter using the formula: $s=\frac{a+b+c}{2}$. We put the value of the semi-perimeter and lengths of all sides in Heron’s formula to calculate the area. The area of triangle is returned after calculating using the formula.

**Time Complexity**: There is a total fixed number of operations such as addition, subtraction, multiplication, and square root. These operations don’t depend on input size as they are performed only a fixed number of times. This means that the time complexity is constant $O\left(1\right)$.

**Space Complexity**: We have used a fixed number of variables to calculate the area of the triangle. We have not used any additional data structures such as arrays or objects. The memory usage in the program is constant, which is better for low-memory environments. The space complexity is constant $O\left(1\right)$.

This approach works best when the lengths of all sides are given. This approach is used mainly for scalene or isosceles triangles where height is directly not given. This approach can work for any type of triangle, however - scalene, isosceles, or equilateral.

---

## Find the Area of a Triangle Using Two Sides and Included Angle (Trigonometric Formula)

In this approach, we will see a different variation of the problem. When you know two sides of a triangle and the included angle between them, you can calculate the area using this formula:

$$
\text{Area}=\frac{1}{2}\times{a}\times{b}\sin\left(\theta\right)
$$

Where:

- $a$ and $b$ are the lengths of the two sides.
- $\theta$ is the included angle between the two sides, measured in degrees or radians.

Using the above formula, you can calculate the area of a triangle without needing its height. First, you define the two sides of the triangle and the angle between them. Then you convert the angle from degrees to radians if needed (in PHP, you can use `deg2rad()` to convert degrees to radians). Then you apply the formula.

After calculating the area of the triangle, output the result.

Here’s how to implement this in PHP:

```php
<?php
// Define the two sides and the included angle
$a = 7;
$b = 9;
$angle = 60; // Angle in degrees

// Convert the angle from degrees to radians
$angle_in_radians = deg2rad($angle);

// Calculate the area using the formula
$area = 0.5 * $a * $b * sin($angle_in_radians);

// Output the result
echo "The area of the triangle is: " . $area . " square units.";
?>
```

### Output:

The area of the triangle is: 27.321 square units.

Explanation:

In the above case, we’re using the formula:

$$
\text{Area\:of\:Triangle}=\frac{1}{2}\times{a}\times{b}\times\sin\left(\theta\right)
$$

And we’re substituting the following values into the formula:

$$
\text{Area}=\frac{1}{2}\times{7}\times{9}\times\sin\left(60^{\circ}\right)\approx{27.321}
$$

In the code, we declared two variables to store the length of the two sides of the triangle, and the variable `$angle` hold the included angle in degrees. We used `deg2rad()`, a PHP built-in function which converts an angle from degrees to radians. Then, we applied the actual formula: $\text{Area}=\frac{1}{2}\times{7}\times{9}\times\sin\left(60^{\circ}\right)$. PHP stores the final answer in the `$area` variable.

**Time Complexity**: We are using the direct formula to calculate the area of a triangle when the length of two sides and the angle between them are given. The constant time complexity is $O\left(1\right)$.

**Space Complexity**: Similarly, it does not take any extra space or use any data structures. It uses a single variable to store the result, which is why the space complexity is constant $O\left(1\right)$.

This approach is perfect for the problem in which two sides and the included angle (angle between those sides) are known. You can use it when you cannot easily calculate the height of the triangle. This problem has real-life applications in geometry problems, CAD applications, or physics simulations. This method is very accurate and doesn’t require the length of all sides.

---

## Conclusion

In this article, you’ve learned how you can calculate the area of a triangle, both manually and using PHP. You have seen different approaches and learned about which one is best given the information you have. First, we discussed the base and height approach, then looked at Heron’s formula, and finally examined how to handle things when two sides and the included angle are given.

Understanding the logic behind each of these approaches helps you choose the right one based on the given data.

If you enjoyed this article, you can check out more of my work here:  
[<VPIcon icon="fas fa-globe"/>Ayush Mishra’s Author Profile on TutorialsPoint](https://tutorialspoint.com/authors/ayush-mishra-3)

And I’ve written some other tutorials about math and programming:

- [How to write a C++ program to subtract two numbers](https://tutorialspoint.com/cplusplus-program-to-subtract-two-numbers)
<!-- TODO: /tutorialspoint.com/cplusplus-program-to-subtract-two-numbers.md -->
- [How to write a Python program to find the cube of a number](https://tutorialspoint.com/python-program-to-find-cube-of-a-number)
<!-- TODO: /tutorialspoint.com/python-program-to-find-cube-of-a-number.md -->
- [How to write a PHP program to find the percentage of a number](https://tutorialspoint.com/php-program-to-find-the-percentage-of-a-number)
<!-- TODO: /tutorialspoint.com/php-program-to-find-the-percentage-of-a-number.md -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write a PHP Script to Calculate the Area of a Triangle",
  "desc": "In programming, being able to find the area of a triangle is useful for many reasons. It can help you understand logic-building and syntax, and it’s a common programming problem used in school assignments. There are also many real-world applications,...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/use-php-to-calculate-the-area-of-a-triangle.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
