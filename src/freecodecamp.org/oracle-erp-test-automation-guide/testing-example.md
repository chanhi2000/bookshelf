---
lang: en-US
title: "Testing Example"
description: "Article(s) > (1/5) Oracle ERP Test Automation Guide - Examples and Best Practices" 
icon: fa-brands fa-java
category:
  - Java
  - Maven
  - DevOps
  - Jenkins
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - java
  - jdk
  - mvn
  - maven
  - devops
  - jenkins
  - github
  - github-actions
  - ci
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (1/5) Oracle ERP Test Automation Guide - Examples and Best Practices"
    - property: og:description
      content: "Testing Example"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/oracle-erp-test-automation-guide/testing-example.html
date: 2025-05-01
isOriginal: false
author:
  - name: Nazneen Ahmad
    url : https://freecodecamp.org/news/author/Nazneen758/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745527550725/45d7f400-d345-4448-ab84-d3327dc425a6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Oracle ERP Test Automation Guide - Examples and Best Practices",
  "desc": "Oracle Enterprise Resource Planning helps businesses manage finance and supply chains. It also supports human resources and brings different functions together. Many growing businesses rely on it to handle complex tasks, as system failures or errors ...",
  "link": "/freecodecamp.org/oracle-erp-test-automation-guide/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Oracle ERP Test Automation Guide - Examples and Best Practices"
  desc="Oracle Enterprise Resource Planning helps businesses manage finance and supply chains. It also supports human resources and brings different functions together. Many growing businesses rely on it to handle complex tasks, as system failures or errors ..."
  url="https://freecodecamp.org/news/oracle-erp-test-automation-guide#heading-testing-example"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745527550725/45d7f400-d345-4448-ab84-d3327dc425a6.png"/>

Let’s now break down how test automation works in Oracle ERP using a real-world case.

Say you want to test if a purchase order (PO) can be created and approved properly in Oracle ERP Cloud. Here is how you can do it, step by step.

---

## 1. Identify the Test Scenario

First, decide what you want to test.

::: tip Example scenario

You create a PO. The right user approves it. Then you check if it shows up in the dashboard.

What you will need:

- User roles (like Procurement Requester and Manager)
- Test data (supplier name, item, quantity, cost)
- Expected result (status becomes ‘Approved’)

:::

---

## 2. Choose a Test Automation Tool

Now you’ll need to pick the right tool. Some good options are:

- Oracle Application Testing Suite (OATS)
- Selenium
- Tricentis Tosca
- Katalon Studio

Pick one that:

- Works well with Oracle UI (pop-ups, tables, and so on)
- Connects with your CI/CD tools
- Supports test data and reporting

::: tip

Tosca is great if you want codeless testing. It is easy for non-developers.

:::

---

## 3. Create the Automation Script

Let’s now see how to write the test. We will use Selenium and Java as an example.

What the script will do:

- Open Oracle ERP
- Log in
- Go to the Purchase Orders module
- Enter order details
- Submit the form
- Check if the PO gets approved

::: tip Here is a sample script

```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class OracleERPTest {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://your-instance.oraclecloud.com");

        // Login
        driver.findElement(By.id("username")).sendKeys("yourUser");
        driver.findElement(By.id("password")).sendKeys("yourPassword");
        driver.findElement(By.id("signInButton")).click();

        // Navigate to Procurement
        driver.findElement(By.linkText("Procurement")).click();
        driver.findElement(By.id("createPO")).click();

        // Enter PO details
        driver.findElement(By.id("supplierField")).sendKeys("ABC Ltd");
        driver.findElement(By.id("itemField")).sendKeys("Laptop");
        driver.findElement(By.id("quantityField")).sendKeys("5");
        driver.findElement(By.id("priceField")).sendKeys("900");

        // Submit PO
        driver.findElement(By.id("submitButton")).click();

        // Verify status
        String status = driver.findElement(By.id("statusLabel")).getText();
        if (status.equals("Approved")) {
            System.out.println("Test Passed: PO Approved.");
        } else {
            System.out.println("Test Failed: PO Not Approved.");
        }

        driver.quit();
    }
}
```

:::

---

## 4. Use Data-Driven Testing

Now run the same test using different data. You can store data in an Excel or CSV file.

::: tip Example test data:

| Supplier | Item | Quantity | Cost |
| --- | --- | --- | --- |
| ABC Ltd | Laptop | 5 | 900 |
| XYZ Inc | Printer | 2 | 200 |

Use a loop in your test to pick each row and submit a new PO.

:::

---

## 5. Run and Validate

Now run your script. You can add checks to confirm:

- The status is "Approved"
- The correct person approved it
- The PO shows in reports or dashboards

::: tip

Use `assertEquals()` or similar methods in your script to verify the result.

:::

After creating your automation script, the next step is to run it and confirm that the PO creation process works correctly.

You should validate the following:

### 1. Check if the PO status is "Approved"

Once the PO is submitted, use an assertion to confirm its approval status:

```java
import static org.junit.Assert.assertEquals;

String status = driver.findElement(By.id("statusLabel")).getText();
assertEquals("Approved", status);
```

This code checks the displayed status and compares it with the expected value, "Approved." If the status doesn’t match, the test will fail.

### 2. Verify the correct approver

If the UI shows the name of the person who approved the PO, you can confirm that as well:

```java
String approver = driver.findElement(By.id("approverName")).getText();
assertEquals("John Manager", approver);
```

In Oracle ERP, this information is usually found in the Approval History or within the PO details page. This verifies that the person shown as the approver is indeed the correct one, such as "John Manager."

### 3. Confirm the PO appears in the dashboard or report

After approval, the PO should be listed in the procurement dashboard or reports. You can search for the PO number and verify its presence:

```java
driver.findElement(By.id("searchField")).sendKeys("PO123456");
driver.findElement(By.id("searchButton")).click();

String poNumber = driver.findElement(By.xpath("//table//td[contains(text(), 'PO123456')]")).getText();
assertEquals("PO123456", poNumber);
```

This code searches for the PO number and confirms that it appears in the report or dashboard.

::: tip Optional: Take a screenshot if the test fails

Capturing a screenshot can help with debugging issues:

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import java.io.File;
import org.apache.commons.io.FileUtils;

File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(screenshot, new File("failed_test_screenshot.png"));
```

:::

You can place this in a try-catch block or after any failure point to log visual evidence.

By following these steps, you’ll ensure that your PO creation process works correctly and is thoroughly validated in your test automation script.

---

## 6. Add Screenshots and Reports

Adding screenshots and generating reports is essential for tracking test results and troubleshooting any issues. Let’s walk through how you can implement these actions in your automation script.

### 1. Take Screenshots at Each Step

It’s important to capture screenshots at every critical step, especially when a test fails. This helps in identifying issues like incorrect approvals or errors in the process.

For instance, you can take a screenshot when the PO is not approved or if an error occurs during the test:

```java
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.apache.commons.io.FileUtils;
import java.io.File;

public void captureScreenshot(String stepName) {
    try {
        // Capture the screenshot
        File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
        // Save the screenshot with a custom name based on the step
        FileUtils.copyFile(screenshot, new File(stepName + "_screenshot.png"));
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

You can call this method at critical points, such as after the approval check fails or when a PO is not found in the report.

Example of calling the method:

```java
String status = driver.findElement(By.id("statusLabel")).getText();
if (!status.equals("Approved")) {
    captureScreenshot("PO_Approval_Failed");
}
```

### 2. Generate Reports with Pass/Fail Results

Generating a report with details like pass/fail results, time of execution, and error logs is crucial for understanding the outcome of your test. You can use reporting tools such as Allure or ExtentReports.

::: tip Example using `ExtentReports`:

```java title="TestReport.java"
import com.relevantcodes.extentreports.ExtentReports;
import com.relevantcodes.extentreports.ExtentTest;

public class TestReport {
    private static ExtentReports extent;
    private static ExtentTest logger;

    public static void setupReport() {
        extent = new ExtentReports("TestReport.html", true);
        logger = extent.startTest("PO Approval Test");
    }

    public static void logResult(String result, String message) {
        if (result.equals("pass")) {
            logger.log(com.relevantcodes.extentreports.LogStatus.PASS, message);
        } else {
            logger.log(com.relevantcodes.extentreports.LogStatus.FAIL, message);
        }
    }

    public static void endReport() {
        extent.endTest(logger);
        extent.flush();
    }
}
```

You can log the results of each validation, like this:

```java
TestReport.setupReport();

// After PO status validation
String status = driver.findElement(By.id("statusLabel")).getText();
if (status.equals("Approved")) {
    TestReport.logResult("pass", "PO approved successfully");
} else {
    TestReport.logResult("fail", "PO approval failed");
    captureScreenshot("PO_Approval_Failed");
}

// After checking approver
String approver = driver.findElement(By.id("approverName")).getText();
if (approver.equals("John Manager")) {
    TestReport.logResult("pass", "Correct approver verified");
} else {
    TestReport.logResult("fail", "Incorrect approver");
    captureScreenshot("Approver_Verification_Failed");
}

TestReport.endReport();
```

This will generate a report with pass/fail results and timestamps for each test step.

:::

### 3. Generate Error Logs

You can capture error logs and include them in your report. For example, when an assertion fails, you might want to log the error message and save it to a log file.

Here’s how you can generate an error log in Java:

```java
import java.io.FileWriter;
import java.io.IOException;

public void logError(String message) {
    try (FileWriter log = new FileWriter("error_log.txt", true)) {
        log.write(message + "\n");
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```

You can call this method whenever a test fails:

```java
try {
    String status = driver.findElement(By.id("statusLabel")).getText();
    assertEquals("Approved", status);
} catch (AssertionError e) {
    logError("PO approval failed: " + e.getMessage());
    captureScreenshot("PO_Approval_Failed");
    throw e;  // Re-throw to let the test fail
}
```

By following these steps, you’ll be able to:

1. **Capture screenshots** at key points, particularly when the test fails.
2. **Generate reports** that include pass/fail results, timestamps, and detailed messages.
3. **Log errors** to help identify issues when they occur.

This process will greatly improve the clarity and traceability of your test execution.

---

## 7. Add to CI/CD Pipeline

Finally, plug your tests into the release process. You can use tools like Jenkins or GitHub Actions for this.

### 1. Set Up Jenkins:

First, you’ll want to install Jenkins on a server or use a cloud-based Jenkins service.

Then, install the necessary plugins:

- **Git Plugin** (to pull code from a Git repository)
- **Maven Plugin** (to run Java-based projects)
- **JUnit Plugin** (to report results)

### 2. Create a New Jenkins Job:

Go to Jenkins Dashboard and click on "New Item". Then select "Freestyle Project" and name it (for example, "PO Automation Test"). Click OK.

### 3. Configure Source Code Management (Git):

In the "Source Code Management" section, choose Git. Enter the URL of your Git repository where your Selenium test scripts are stored.

If the repository is private, provide authentication details.

::: tip Example

- **Git Repository URL**: <FontIcon icon="fas fa-globe"/>`https://github.com/your-repo/po-automation.git`
- **Credentials**: Jenkins-Git-Credentials
- **Branches to Build**: <FontIcon icon="fas fa-code-branch"/>`*/main`

:::

### 4. Add Build Steps:

Under "Build", click on "Add Build Step" and choose "Invoke top-level Maven targets" (assuming you are using Maven as the build tool).

Then set up the Maven goals to compile and run tests.

::: tip Example Maven command:

```sh
mvn clean test
```

This will clean the previous build and run your tests. Make sure JUnit or TestNG is set up in your project to handle the tests.

:::

### 5. Run Tests in Selenium:

Make sure your **test scripts** are included in the project and that Maven knows how to run them. The following Maven `pom.xml` configuration will ensure that Selenium tests can be executed through the JUnit test framework:

::: tip

Example <FontIcon icon="iconfont icon-code"/>`pom.xml` dependencies:

```xml title="pom.xml"
<dependencies>
    <dependency>
        <groupId>org.seleniumhq.selenium</groupId>
        <artifactId>selenium-java</artifactId>
        <version>3.141.59</version>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-api</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter-engine</artifactId>
        <version>5.7.0</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

:::

Ensure your test class is set up for JUnit execution. For example:

```java
@Test
public void testPOApproval() {
    // Selenium test code here
}
```

### 6. Set Up Post-Build Actions:

Under "Post-build Actions", you can choose to:

- Publish JUnit test results to Jenkins for reporting.
- Send notifications (for example to Slack or Email) based on test results.
- Archive test reports as artifacts for later access.

::: tip Example configuration for JUnit test results:

- **Test report XMLs**: <FontIcon icon="fas fa-folder-open"/>`target/`<FontIcon icon="iconfont icon-code"/>`test-*.xml`

:::

### 7. Triggering the Job:

To make sure your tests run automatically whenever you push changes to the Git repository, you need to set up a trigger.

In the "Build Triggers" section, you can select:

- GitHub hook trigger for GITScm polling (if using GitHub)
- Poll SCM (to periodically check for changes in the repository)

### 8. Save and Run the Job:

Once the job is configured, click "Save". You can now either run the job manually by clicking "Build Now" or let Jenkins automatically trigger the tests based on your configuration (for example, after every commit).

### 9. Viewing Test Results:

After the tests run, Jenkins will provide a report on the build’s status. You’ll see:

- Whether tests passed or failed.
- Any errors captured in the JUnit report.

If there are failures, you can review logs and screenshots (if configured). You can also view detailed logs and reports for troubleshooting.
