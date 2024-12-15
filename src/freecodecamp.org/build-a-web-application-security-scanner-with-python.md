---
lang: en-US
title: "Building a Simple Web Application Security Scanner with Python: A Beginner's Guide"
description: "Article(s) > Building a Simple Web Application Security Scanner with Python: A Beginner's Guide"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a Simple Web Application Security Scanner with Python: A Beginner's Guide"
    - property: og:description
      content: "Building a Simple Web Application Security Scanner with Python: A Beginner's Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-web-application-security-scanner-with-python.html
prev: /programming/py/articles/README.md
date: 2024-12-13
isOriginal: false
author: Chaitanya Rahalkar
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733929791562/042042e3-56e2-4185-be19-2a0f5fa15d25.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building a Simple Web Application Security Scanner with Python: A Beginner's Guide"
  desc="In this article, you are going to learn to create a basic security tool that can be helpful in identifying common vulnerabilities in web applications. I have two goals here. The first is to empower you with the skills to develop tools that can help e..."
  url="https://freecodecamp.org/news/build-a-web-application-security-scanner-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733929791562/042042e3-56e2-4185-be19-2a0f5fa15d25.png"/>

In this article, you are going to learn to create a basic security tool that can be helpful in identifying common vulnerabilities in web applications.

I have two goals here. The first is to empower you with the skills to develop tools that can help enhance the overall security posture of your websites. The second is to help you practice some Python programming.

In this guide, you will be building a Python-based security scanner that can detect XSS, SQL injection, and sensitive PII (Personally Identifiable Information).

::: info Types of Vulnerabilities

Generally, we can categorize web security vulnerabilities into the following buckets (for even more buckets, check the [<FontIcon icon="fas fa-globe"/>OWASP Top 10](https://owasp.org/www-project-top-ten/)):

- **SQL injection**: A technique where attackers are able to insert malicious SQL code into SQL queries through unvalidated inputs, allowing them to modify / read database contents.
- **Cross-Site Scripting (XSS)**: A technique where attackers inject malicious JavaScript in trusted websites. This allows them to execute the JavaScript code in the context of the browser and steal sensitive information or perform unauthorized operations.
- **Sensitive information exposure**: A security issue where an application unintentionally reveals sensitive data like passwords, API keys and so on through logs, insecure storage, and other vulnerabilities.
- **Common security misconfigurations**: Security issues that occurs due to improper configuration of web servers – like default credentials for administrator accounts, enabled debug mode, publicly available administrator dashboards with weak credentials, and so on.
- **Basic authentication weaknesses**: Security issues that occur due to lapses in password policies, user authentication processes, improper session management, and so on.

:::

::: note Prerequisites

To follow along with this tutorial, you will be needing:

- Python 3.x
- Basic understanding of HTTP protocols
- Basic understanding of web applications
- Basic understanding of how XSS, SQL injection, and basic security attacks work

:::

---

## Setting Up Our Development Environment

Let’s install our required dependencies with the following command:

```sh
pip install requests beautifulsoup4 urllib3 colorama
```

We’ll use these dependencies in our code file:

```py
# Required packages
import requests
from bs4 import BeautifulSoup
import urllib.parse
import colorama
import re
from concurrent.futures import ThreadPoolExecutor
import sys
from typing import List, Dict, Set
```

---

## Building our Core Scanner Class

Once you have the dependencies, it’s time to write the core scanner class.

This class will serve as our main class that will handle the web security scanning functionality. It will track our visited pages and also store our findings.

We have the `normalize_url` function that we’ll use to ensure that you don’t rescan URLs that have already been seen before. This function will essentially remove the HTTP GET parameters from the URL. For example, `https://example.com/page?id=1` will become `https://example.com/page` after normalizing it.

```py
class WebSecurityScanner:
    def __init__(self, target_url: str, max_depth: int = 3):
        """
        Initialize the security scanner with a target URL and maximum crawl depth.

        Args:
            target_url: The base URL to scan
            max_depth: Maximum depth for crawling links (default: 3)
        """
        self.target_url = target_url
        self.max_depth = max_depth
        self.visited_urls: Set[str] = set()
        self.vulnerabilities: List[Dict] = []
        self.session = requests.Session()

        # Initialize colorama for cross-platform colored output
        colorama.init()

    def normalize_url(self, url: str) -> str:
        """Normalize the URL to prevent duplicate checks"""
        parsed = urllib.parse.urlparse(url)
        return f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
```

---

## Implementing the Crawler

The first step in our scanner is to implement a web crawler that will discover pages and URLs in a given target application. Make sure you’re writing these functions in our `WebSecurityScanner` class.

```py
def crawl(self, url: str, depth: int = 0) -> None:
    """
    Crawl the website to discover pages and endpoints.

    Args:
        url: Current URL to crawl
        depth: Current depth in the crawl tree
    """
    if depth > self.max_depth or url in self.visited_urls:
        return

    try:
        self.visited_urls.add(url)
        response = self.session.get(url, verify=False)
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all links in the page
        links = soup.find_all('a', href=True)
        for link in links:
            next_url = urllib.parse.urljoin(url, link['href'])
            if next_url.startswith(self.target_url):
                self.crawl(next_url, depth + 1)

    except Exception as e:
        print(f"Error crawling {url}: {str(e)}")
```

This `crawl` function helps us perform a depth-first crawl of a website. It will explore all pages of a website while staying within the specified domain.

For example, if you plan to use this scanner on `https://google.com`, the function will first get all the URLs and then one-by-one check if they belong to the specified domain (that is, `google.com`). If so, it will recursively continue to scan the seen URL up to a specified depth which is supplied with the `depth` parameter as an argument to the function. We also have some exception handling to make sure we handle errors smoothly and report any errors during crawling.

---

## Designing and Implementing the Security Checks

Now let’s finally get to the juicy part and implement our security checks. We’ll start first with SQL Injection.

### SQL Injection Detection Check

```py
def check_sql_injection(self, url: str) -> None:
    """Test for potential SQL injection vulnerabilities"""
    sql_payloads = ["'", "1' OR '1'='1", "' OR 1=1--", "' UNION SELECT NULL--"]

    for payload in sql_payloads:
        try:
            # Test GET parameters
            parsed = urllib.parse.urlparse(url)
            params = urllib.parse.parse_qs(parsed.query)

            for param in params:
                test_url = url.replace(f"{param}={params[param][0]}", 
                                     f"{param}={payload}")
                response = self.session.get(test_url)

                # Look for SQL error messages
                if any(error in response.text.lower() for error in 
                    ['sql', 'mysql', 'sqlite', 'postgresql', 'oracle']):
                    self.report_vulnerability({
                        'type': 'SQL Injection',
                        'url': url,
                        'parameter': param,
                        'payload': payload
                    })

        except Exception as e:
            print(f"Error testing SQL injection on {url}: {str(e)}")
```

This function essentially performs basic SQL injection checks by testing the URL against common SQL injection payloads and looking for error messages that might hint at a security vulnerability.

Based on the error message received after performing a simple GET request on the URL, we check whether that message is a database error or not. If it is, we use the `report_vulnerability` function to report that as a security issue in our final report that this script will generate. For the sake of this example, we are selecting a few commonly tested SQL injection payloads, but you can extend this to test even more.

### XSS (Cross-Site Scripting) Check

Now let’s implement the second security check for XSS payloads.

```py
def check_xss(self, url: str) -> None:
    """Test for potential Cross-Site Scripting vulnerabilities"""
    xss_payloads = [
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "javascript:alert('XSS')"
    ]

    for payload in xss_payloads:
        try:
            # Test GET parameters
            parsed = urllib.parse.urlparse(url)
            params = urllib.parse.parse_qs(parsed.query)

            for param in params:
                test_url = url.replace(f"{param}={params[param][0]}", 
                                     f"{param}={urllib.parse.quote(payload)}")
                response = self.session.get(test_url)

                if payload in response.text:
                    self.report_vulnerability({
                        'type': 'Cross-Site Scripting (XSS)',
                        'url': url,
                        'parameter': param,
                        'payload': payload
                    })

        except Exception as e:
            print(f"Error testing XSS on {url}: {str(e)}")
```

This function, just like the SQL injection tester, uses a set of common XSS payloads and applies the same idea. But the key difference here is that we are looking for our injected payload to appear unmodified in our response rather than looking for an error message.

If you are able to see our injected payload, most likely it will be executed in the context of the victim’s browser as a reflected XSS attack.

### Sensitive Information Exposure Check

Now let’s implement our final check for sensitive PII.

```py
def check_sensitive_info(self, url: str) -> None:
    """Check for exposed sensitive information"""
    sensitive_patterns = {
        'email': r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
        'phone': r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',
        'ssn': r'\b\d{3}-\d{2}-\d{4}\b',
        'api_key': r'api[_-]?key[_-]?([\'"|`])([a-zA-Z0-9]{32,45})\1'
    }

    try:
        response = self.session.get(url)

        for info_type, pattern in sensitive_patterns.items():
            matches = re.finditer(pattern, response.text)
            for match in matches:
                self.report_vulnerability({
                    'type': 'Sensitive Information Exposure',
                    'url': url,
                    'info_type': info_type,
                    'pattern': pattern
                })

    except Exception as e:
        print(f"Error checking sensitive information on {url}: {str(e)}")
```

This function uses a set of predefined Regex patterns to search for PII like emails, phone numbers, SSNs, and API keys (that are prefixed with `api-key-<number>`).

Just like the previous two functions, we use the response text for the URL and our Regex patterns to find these PIIs in the response text. If we do find any, we report them with the `report_vulnerability` function. Make sure to have all these functions defined in the `WebSecurityScanner` class.

---

## Implementing the Main Scanning Logic

Let’s finally stitch everything together by defining the `scan` and `report_vulnerability` function in the `WebSecurityScanner` class:

```py
def scan(self) -> List[Dict]:
    """
    Main scanning method that coordinates the security checks

    Returns:
        List of discovered vulnerabilities
    """
    print(f"\n{colorama.Fore.BLUE}Starting security scan of {self.target_url}{colorama.Style.RESET_ALL}\n")

    # First, crawl the website
    self.crawl(self.target_url)

    # Then run security checks on all discovered URLs
    with ThreadPoolExecutor(max_workers=5) as executor:
        for url in self.visited_urls:
            executor.submit(self.check_sql_injection, url)
            executor.submit(self.check_xss, url)
            executor.submit(self.check_sensitive_info, url)

    return self.vulnerabilities

def report_vulnerability(self, vulnerability: Dict) -> None:
    """Record and display found vulnerabilities"""
    self.vulnerabilities.append(vulnerability)
    print(f"{colorama.Fore.RED}[VULNERABILITY FOUND]{colorama.Style.RESET_ALL}")
    for key, value in vulnerability.items():
        print(f"{key}: {value}")
    print()
```

This code defines our `scan` function which will essentially invoke the `crawl` function and recursively start crawling the website. With multithreading, we will apply all three security checks on the visited URLs.

We have also defined the `report_vulnerability` function which will effectively print our vulnerability to the console and also store them in our `vulnerabilities` array.

Now let’s finally use our scanner by saving it as <FontIcon icon="fas fa-python"/>`scanner.py`:

```py title="scanner.py"
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python scanner.py <target_url>")
        sys.exit(1)

    target_url = sys.argv[1]
    scanner = WebSecurityScanner(target_url)
    vulnerabilities = scanner.scan()

    # Print summary
    print(f"\n{colorama.Fore.GREEN}Scan Complete!{colorama.Style.RESET_ALL}")
    print(f"Total URLs scanned: {len(scanner.visited_urls)}")
    print(f"Vulnerabilities found: {len(vulnerabilities)}")
```

The target URL will be supplied as a system argument and we will get the summary of URLs scanned and vulnerabilities found at the end of our scan. Now let’s discuss how you can extend the scanner and add more features.

---

## Extending the Security Scanner

Here are some ideas to extend this basic security scanner into something even more advanced:

1. Add more vulnerability checks like CSRF detection, directory traversal, and so on.
2. Improve reporting with an HTML or PDF output.
3. Add configuration options for scan intensity and scope of searching (specifying the depth of scans through a CLI argument).
4. Implementing proper rate limiting.
5. Adding authentication support for testing URLs that require session-based authentication.

---

## Wrapping Up

Now you know how to build a basic security scanner! This scanner demonstrates a few core concepts of Web Security.

Keep in mind that this tutorial should only be used for educational purposes. There are several professionally designed enterprise-grade applications like Burp Suite and OWASP Zap that can check for hundreds of security vulnerabilities at a much larger scale.

I hope you learned the basics of web security and a bit of Python programming as well.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Simple Web Application Security Scanner with Python: A Beginner's Guide",
  "desc": "In this article, you are going to learn to create a basic security tool that can be helpful in identifying common vulnerabilities in web applications. I have two goals here. The first is to empower you with the skills to develop tools that can help e...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-web-application-security-scanner-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
