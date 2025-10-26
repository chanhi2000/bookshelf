---
lang: en-US
title: "How to Build Secure iOS Apps in Swift: Common Security Pitfalls and How to Fix Them"
description: "Article(s) > How to Build Secure iOS Apps in Swift: Common Security Pitfalls and How to Fix Them"
icon: fa-brands fa-swift
category:
  - Swift
  - DevOps
  - Security
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - swift
  - devops
  - sec
  - security
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Secure iOS Apps in Swift: Common Security Pitfalls and How to Fix Them"
    - property: og:description
      content: "How to Build Secure iOS Apps in Swift: Common Security Pitfalls and How to Fix Them"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-secure-ios-apps-in-swift-common-security-pitfalls-and-how-to-fix-them.html
prev: /programming/swift/articles/README.md
date: 2025-10-28
isOriginal: false
author:
  - name: Alex Tray
    url : https://freecodecamp.org/news/author/trayalex812/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761599240278/644f6ebb-6092-4ea0-99e3-a568bfb0390c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Swift > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/swift/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Secure iOS Apps in Swift: Common Security Pitfalls and How to Fix Them"
  desc="These days, there are many ways attackers can try to compromise your applications. And thanks to the continued increase in cyberattacks, the demand for secure mobile applications – and by extension, secure coding – has never been higher. So if you’re..."
  url="https://freecodecamp.org/news/how-to-build-secure-ios-apps-in-swift-common-security-pitfalls-and-how-to-fix-them"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761599240278/644f6ebb-6092-4ea0-99e3-a568bfb0390c.png"/>

These days, there are many ways attackers can try to compromise your applications. And thanks to the continued increase in cyberattacks, the demand for secure mobile applications – and by extension, secure coding – has never been higher.

So if you’re an iOS developer, you should also learn to prioritize security at every stage of app development.

Swift, Apple’s modern programming language, offers a wealth of tools and frameworks that simplify development while enhancing security, but only when used correctly.

This article explores 10 common security pitfalls in Swift-based iOS apps and offers practical strategies to mitigate them.

::: note Prerequisites

Before diving in, you’ll need:

- Working knowledge of Swift and iOS development.
- Access to Xcode.
- Basic understanding of how iOS apps communicate with servers.
- Familiarity with Terminal/command line basics.

The code examples are practical and explained step-by-step, making them accessible to junior developers while still offering value to experienced ones looking to strengthen their app's security.

:::

---

## What are the Most Prevalent Security Traps in Swift iOS Applications?

Swift and iOS offer robust security features, but mistakes still happen. Following are the most common traps and how to fix them:

### 1. Insecure Data Storage

Among the most common mistakes developers make is having sensitive data stored insecurely. Passwords, tokens, or even individual user data can be left by accident in UserDefaults or local storage in unencrypted form.

While UserDefaults is convenient for small amounts of data, it is not secure for sensitive data as it is so easily accessible to attackers if the device is compromised.

::: details info How to Fix

Use the Keychain Services API to securely store sensitive data. Keychain encrypts data and binds it to the device so that it can't be accessed by other unauthorized applications or users.

You can securely store credentials using libraries in Swift such as KeychainAccess or the built-in SecItemAdd and SecItemCopyMatching functions.

For example, this how you can store a user password in Keychain so as to ensure sensitive data is stored securely:

```swift
do {

try keychain.set("userPassword123", key: "userPassword")

} catch {

    print("Error saving to Keychain: \(error)")

}
```

Behind the scenes, here’s what happens when you call `keychain.set("userPassword123", key: "userPassword")` inside a KeychainManager class that uses Apple’s native Security framework for storage:

```swift
import Security

class KeychainManager {
 func set(_ value: String, key: String) throws {
     // 1. Convert string to Data
     guard let data = value.data(using: .utf8) else {
         throw NSError(domain: "KeychainManager", code: -1)
     }

     // 2. Build the query dictionary
     let query: [String: Any] = [
         // Store as password
         kSecClass as String: kSecClassGenericPassword,
         // Your app's bundle identifier
         kSecAttrService as String: "com.yourapp.keychain",
         // "userPassword"
         kSecAttrAccount as String: key,
         // "userPassword123" encrypted
         kSecValueData as String: data,
         kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlock
     ]
     // 3. Save to keychain (iOS encrypts it automatically)
     let status = SecItemAdd(query as CFDictionary, nil)
     // 4. Check if successful
     guard status == errSecSuccess else {
         throw NSError(domain: "KeychainManager", code: Int(status))
     }
 }
}
```

When this function runs, iOS converts the string value, such as "userPassword123", into encrypted binary data and stores it securely in the device’s Keychain database. The entry is saved under the provided key (for example, "userPassword"), and only your app can access it.

Behind the scenes, the Keychain leverages strong security features, including hardware-backed encryption using device-specific keys, optional biometric protection through Face ID or Touch ID, and app-level isolation to ensure that no other app can read or modify your stored credentials.

:::

### 2. Weak Network Communication

Transmitting sensitive data over the network is another area prone to vulnerabilities. Using unencrypted HTTP connections exposes your app to man-in-the-middle (MITM) attacks, allowing attackers to intercept and modify data in transit.

::: criticla The Problem

When data travels between your app and server over an insecure connection, attackers on the same network (like public Wi-Fi) can:

- Read sensitive information (passwords, personal data, payment details)
- Modify requests and responses
- Impersonate your legitimate server

:::

:::: details How to Fix

**1. Always Use HTTPS**

HTTPS encrypts all data in transit, making it unreadable to attackers. iOS's App Transport Security (ATS) enforces this by blocking insecure HTTP connections by default:

```swift
// ❌ INSECURE - HTTP connection (blocked by ATS by default)
let url = URL(string: "http://api.example.com/login")

// ✅ SECURE - HTTPS connection
let url = URL(string: "https://api.example.com/login")
```

You’ll want to avoid adding ATS exceptions to your Info.plist unless absolutely necessary. If a third-party API only supports HTTP, contact them to upgrade or find a more secure alternative.

**2. Implement Certificate Pinning (Advanced Protection)**

Even with HTTPS, your app could still be vulnerable to sophisticated MITM attacks. An attacker could install a fraudulent certificate on a user's device (through malware or social engineering), for example, and intercept HTTPS traffic that appears valid. The attacker's fake certificate would be trusted by the device, allowing them to decrypt and read "secure" communications.

Certificate pinning solves this by making your app trust only your specific server's certificate, rejecting all others – even if they're otherwise valid.

**How Certificate Pinning Works:**

Your app stores the expected certificate (or its public key hash) and validates it during each connection:

```swift
class SecureNetworkManager: NSObject, URLSessionDelegate {

    // Store your server's certificate hash
    // Get this by running: openssl x509 -in certificate.crt -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | base64
    private let expectedPublicKeyHash = "YOUR_CERTIFICATE_HASH_HERE"

    func urlSession(
        _ session: URLSession,
        didReceive challenge: URLAuthenticationChallenge,
        completionHandler: @escaping (URLSession.AuthChallengeDisposition, URLCredential?) -> Void
    ) {
        // Step 1: Check if this is a server trust challenge (certificate validation)
        guard challenge.protectionSpace.authenticationMethod == NSURLAuthenticationMethodServerTrust,
              let serverTrust = challenge.protectionSpace.serverTrust
        else {
            // Not a certificate challenge; use default handling
            completionHandler(.performDefaultHandling, nil)
            return
        }

        // Step 2: Validate that the server's certificate matches our pinned certificate
        if isValidServerTrust(serverTrust) {
            // Certificate matches - proceed with the connection
            completionHandler(.useCredential, URLCredential(trust: serverTrust))
        } else {
            // Certificate doesn't match - reject the connection to prevent MITM attack
            completionHandler(.cancelAuthenticationChallenge, nil)
        }
    }

    // Validates the server's certificate against our pinned hash
    private func isValidServerTrust(_ serverTrust: SecTrust) -> Bool {
        // Extract the server's certificate
        guard let serverCertificate = SecTrustGetCertificateAtIndex(serverTrust, 0) else {
            return false
        }

        // Get the public key from the certificate
        let serverPublicKey = SecCertificateCopyKey(serverCertificate)
        guard let publicKey = serverPublicKey else {
            return false
        }

        // Convert the public key to data and hash it
        var error: Unmanaged<CFError>?
        guard let publicKeyData = SecKeyCopyExternalRepresentation(publicKey, &error) as Data? else {
            return false
        }

        // Hash the public key using SHA-256
        let publicKeyHash = SHA256.hash(data: publicKeyData)
        let publicKeyHashString = Data(publicKeyHash).base64EncodedString()

        // Compare with our expected hash
        return publicKeyHashString == expectedPublicKeyHash
    }
}
```

::: info

What this code does, step-by-step:

1. `urlSession(_:didReceive:completionHandler:)` – This method is called whenever your app makes an HTTPS connection. iOS asks: "Should I trust this server's certificate?"
2. Check authentication method – We verify this is a server trust challenge (certificate validation), not some other type of authentication.
3. Validate the certificate – We call `isValidServerTrust()`, which:
    - Extracts the server's certificate from the connection
    - Gets the public key from that certificate
    - Hashes the public key using SHA-256
    - Compares the hash to our stored, expected hash
4. Make a decision:
    - If hashes match, then the server is legitimate. Proceed with `.useCredential`.
    - If hashes don't match, we have a potential MITM attack. Cancel with `.cancelAuthenticationChallenge`.

:::

So how does this prevent MITM attacks? Even if an attacker installs a fraudulent certificate on the user's device and intercepts traffic, their certificate's hash won't match your pinned hash. Your app will reject the connection, preventing the attacker from decrypting your traffic.

**3. Additional Protection: Recommend a VPN on Public Wi-Fi**

You can also recommend that users connect through a VPN when on public Wi-Fi for an added layer of security, and provide guidance on [<VPIcon icon="fas fa-globe"/>how to use a VPN](https://surfshark.com/blog/how-to-use-a-vpn) effectively to keep their data safe.

For developers, maintaining strong app security also depends on having a well-optimized system, learning [<VPIcon icon="fas fa-globe"/>how to speed up a slow Mac](https://cleanmymac.com/blog/macos-tahoe-slow) can help ensure smoother builds, faster testing, and a more secure overall development workflow.

::::

### 3. Improper Input Validation

Some developers neglect correct input validation, leading to a number of vulnerabilities including SQL injection, remote code execution, and data corruption.

While Swift has strong typing support, some developers don’t sanitize user input or API responses. Incorporating real-time [**API email validation**](/freecodecamp.org/how-to-use-email-validation-api-for-flask-user-authenticationl.md) ensures that users provide legitimate, properly formatted email addresses before they are stored or processed, reducing both security risks and data quality issues.

::: details How to Fix

Input validation is your first line of defense against malicious data. Here's how to protect your iOS applications:

**1. Validate User Input with Patterns**

Always validate user input using regular expressions or predefined patterns before processing. For example, when accepting email addresses:

```swift
func isValidEmail(_ email: String) -> Bool {
    let emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}"
    let emailPredicate = NSPredicate(format: "SELF MATCHES %@", emailRegex)
    return emailPredicate.evaluate(with: email)
}

// Only accept properly formatted data
guard isValidEmail(userEmail) else {
    // Reject invalid input
    return
}
```

This ensures that only properly formatted data is accepted, preventing malformed or malicious input from entering your system.

**2. Sanitize API Responses**

Never trust external data. Always validate and sanitize API responses before using them:

```swift
if let userAge = apiResponse["age"] as? Int,
   userAge >= 0 && userAge <= 150 {
    // Safe to use
    user.age = userAge
} else {
    // Handle invalid data appropriately
    throw ValidationError.invalidAge
}
```

**3. Use Parameterized Queries (Most Critical)**

The most dangerous mistake is building database queries through string concatenation. Consider this vulnerable code:

```swift
// ❌ NEVER DO THIS - Vulnerable to SQL Injection
let username = userInput  // Could be: "admin' OR '1'='1"
let query = "SELECT * FROM users WHERE username = '\(username)'"
database.execute(query)
```

If a malicious user enters admin' OR '1'='1 as their username, the query becomes:

```sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1'
```

This would return all users in the database instead of just one, potentially exposing sensitive data. The secure solution uses parameterized queries:

```swift
// ✅ SAFE - Using parameterized queries
let query = "SELECT * FROM users WHERE username = ?"
database.execute(query, withArgumentsIn: [username])
```

In this approach, the `?` is a placeholder that the database treats as a parameter, not as part of the SQL command. The username value is passed separately in the `withArgumentsIn` array.

This means that even if a user tries to inject SQL code like `admin' OR '1'='1`, the database will treat the entire string as a literal username to search for – not as executable SQL code. The database engine automatically escapes any special characters, completely eliminating the risk of SQL injection.

By separating the query structure from the data, parameterized queries ensure that user input can never alter the intended logic of your SQL statements.

:::

### 4. Hardcoding Secrets

API keys, credentials, or private tokens hard-coded in the source code is another serious security mistake. Attackers can extract such secrets from compiled binaries using reverse-engineering tools, especially for apps released to the public.

Once exposed, these credentials can be used to access your backend services, potentially leading to data breaches or unauthorized charges.

::: critical The Problem – Hardcoded Secrets

```swift
// NEVER DO THIS
class APIClient {
    private let apiKey = "1234567890abcdef"
    private let secretToken = "sk_live_51H..."

    func makeRequest() {
        // These secrets are embedded in your binary
        let headers = ["Authorization": "Bearer \(apiKey)"]
    }
}
```

:::

:::: details How to Fix

Never store sensitive credentials directly in your code. Here are secure alternatives:

**Solution 1: Fetch Secrets from Backend at Runtime**

The most secure approach is to never store secrets on the client at all. Instead, authenticate users and let your backend make authorized API calls:

```swift
class APIClient {
    private var sessionToken: String?

    // User logs in and receives a temporary session token
    func authenticateUser(email: String, password: String) async throws {
        let response = try await backend.login(email: email, password: password)
        // Store only a temporary, user-specific session token
        self.sessionToken = response.sessionToken
    }

    // Backend handles the actual API calls with the real API key
    func fetchUserData() async throws -> UserData {
        guard let token = sessionToken else {
            throw AuthError.notAuthenticated
        }

        // Your backend receives this request, validates the session token,
        // then uses its own API keys to fetch data from third-party services
        return try await backend.getUserData(sessionToken: token)
    }
}
```

::: info How this works

Your app never knows the actual API keys. When a user needs data, your app sends a request to your own backend server with a session token. Your backend validates the token, then uses its own securely stored API keys to make the actual third-party API calls. This way, the real secrets never leave your server.

:::

**Solution 2: Environment Variables or Config Files (Development Only)**

For development environments, use .xcconfig files that are excluded from version control:

```swift
// Secrets.xcconfig (add to .gitignore!)
API_KEY = your_dev_api_key_here
API_SECRET = your_dev_secret_here

// Access in your code through Info.plist
class Config {
    static let apiKey: String = {
        guard let key = Bundle.main.object(forInfoDictionaryKey: "API_KEY") as? String else {
            fatalError("API_KEY not found in configuration")
        }
        return key
    }()
}
```

::: important

This approach is only suitable for non-production environments! Never ship production API keys with your app, even in config files.

:::

::::

### 5. Insufficient Authentication and Authorization

Relying on client-side authentication and authorization checks is risky. Attackers can cause the app to bypass these checks and access in an unauthorized way by brute forcing or tampering with the app/runtime.

#### How to Fix:

- Do authentication and authorization on the server side instead of the client-side.
- Use JWT (JSON Web Tokens) or OAuth 2.0 for authenticated user login.
- Token expiration and refresh logic needs to be implemented in order to minimize the likelihood of token theft.

**Example: Securely sending JWT:**

```swift
let request = URLRequest(url: apiURL)

request.setValue("Bearer \(jwtToken)", forHTTPHeaderField: "Authorization")
```

### 6. Insecure Logging and Error Handling

Extensive and insecure logging practices, as well as uncaught exceptions, can lead to the exposure of sensitive information including usernames, passwords, and API keys.

#### How to Fix:

- Log sensitive information carefully.
- Implement controlled error management and provide the minimum amount of information in user-presented messages.
- Implement secure logging libraries that mask or encrypt personal data.

```swift
do {
    try someRiskyOperation()
} catch {
    // Log error securely
    Logger.log("Operation failed: \(error.localizedDescription)")
}
```

### 7. Ignoring Code Obfuscation and Reverse Engineering

Swift binaries can be reverse-engineered to expose sensitive business logic, algorithms, or hidden secrets. Attackers use tools like Hopper Disassembler, class-dump, or IDA Pro to decompile your app and analyze how it works internally. This risk is often underestimated, especially for smaller apps, but any app can be a target.

This means that when you compile a Swift app, the resulting binary contains:

- Class names and method signatures
- String literals (URLs, error messages, keys)
- The structure of your code logic
- Algorithm implementations

An attacker can extract this information and use it to understand your app's authentication flow and bypass it, copy your proprietary algorithms, find hardcoded API endpoints or keys you thought were "hidden", discover premium features to unlock without paying, and so on.

**Why It's Bad – Real Example:**

Let's imagine you have a premium feature check in your app:

```swift
class FeatureManager {
    func isPremiumUser() -> Bool {
        // Check if user has premium access
        let hasSubscription = UserDefaults.standard.bool(forKey: "premium_unlocked")
        return hasSubscription
    }

    func unlockPremiumFeature() {
        guard isPremiumUser() else {
            showPaywall()
            return
        }
        // Show premium content
        showPremiumContent()
    }
}
```

An attacker could reverse-engineer your app and discover that the method `isPremiumUser()` controls access, and that it simply checks a `UserDefaults` key called `premium_unlocked`. They would then know that they could use runtime manipulation tools to set this value to true, bypassing your paywall entirely.

**How to Fix:**

**1. Use Swift Compiler Optimizations**

Enable optimization flags that strip debugging symbols and make the binary harder to read:

```swift
// In your build settings:
// - Set "Optimization Level" to "-O" (or -Osize) for release builds
// - Enable "Strip Debug Symbols During Copy" = YES
// - Set "Strip Style" to "All Symbols"
```

This removes function names and makes the compiled code less readable – though class/method names remain partially visible.

**2. Use Symbol Obfuscation Tools**

Tools like SwiftShield can rename your classes, methods, and properties to meaningless names:

```swift
// Before obfuscation (readable to attackers):
class FeatureManager {
    func isPremiumUser() -> Bool { ... }
}

// After obfuscation (harder to understand):
class a7f3b2 {
    func x9k2m() -> Bool { ... }
}
```

While this doesn't prevent reverse engineering, it makes it significantly harder for attackers to understand what the code does.

**3. Move Sensitive Logic to the Server (Best Practice)**

Instead of checking premium status locally, verify it server-side:

```swift
// ✅ Secure approach - Server validates everything
class FeatureManager {
    func unlockPremiumFeature() async {
        do {
            // Server checks if user truly has premium access
            let hasAccess = try await backend.verifyPremiumAccess(userId: currentUserId)

            if hasAccess {
                showPremiumContent()
            } else {
                showPaywall()
            }
        } catch {
            // Handle error
            showPaywall()
        }
    }
}
```

**How this works:**

Your backend maintains the source of truth about premium access. Even if an attacker reverse-engineers your app and tries to bypass the check, the server will reject unauthorized requests. The app becomes just a UI layer, while all critical decisions happen server-side – where attackers can't manipulate them.

The key principle is to assume your app code is public: never rely on client-side checks for security-critical operations like payments, access control, or authentication. Use obfuscation to make reverse engineering harder, but ultimately move sensitive logic to your secure backend

### 8. Insecure Third-Party Libraries

Third-party libraries are at risk if they are hacked or outdated. Developers might inadvertently prioritize app functionality over potential security risks from dependencies, and [ETL tools](https://airbyte.com/top-etl-tools-for-sources/etl-tools) can further help by streamlining the monitoring and processing of dependency-related data to identify vulnerabilities more efficiently.

On a broader scale, implementing strong data center security practices ensures that even if third-party components introduce risks, the underlying infrastructure remains resilient against attacks.

#### How to Fix:

- Use only high-quality, well-maintained libraries.
- Update dependencies and monitor CVEs (Common Vulnerabilities and Exposures).
- Audit library code if it handles sensitive data.

### 9. Insufficient Biometric and Multi-Factor Authentication

Most applications rely on passwords alone, which are vulnerable to being hacked. Enabling biometrics like Face ID or Touch ID enhances security for users.

#### How to Fix:

- Tie LocalAuthentication framework for biometric authentication.
- Combine biometrics with server-based authentication for multifactor authentication (MFA).

```swift
import LocalAuthentication

let context = LAContext()

var error: NSError?

if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {

    context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics,

                        localizedReason: "Access your account") { success, authError in

        DispatchQueue.main.async {

         if success {

                // Proceed securely

         } else {

                // Handle failure (authError may contain the reason)

                print("Authentication failed: \(authError?.localizedDescription ?? "Unknown error")")

         }

     }

}

} else {

// Biometrics not available, check error for details

    print("Biometrics unavailable: \(error?.localizedDescription ?? "Unknown error")")

}
```

### 10. Disregarding Periodic Security Testing

Apps, despite following best practices during development, often contain unexplored vulnerabilities that emerge from complex interactions, third-party dependencies, or newly discovered attack vectors. Regular security testing is absolutely essential to discover these vulnerabilities before attackers exploit them.

Security testing should happen at multiple stages, using accessible tools and practices:

1. **Automated security scans:** Run automatically with every build to catch common issues.
2. **Self-conducted code audits:** Regular security-focused reviews of your own code using established guidelines.
3. **Vulnerability scanning tools:** Use free tools like MobSF to analyze your app for security flaws.
4. **Dependency audits:** Checking third-party libraries for known security vulnerabilities.

**How to Fix:**

**1. Implement Automated Security Scans in CI/CD**

Integrate security scanning tools into your continuous integration pipeline so every code change is automatically checked:

```swift
# Example: GitHub Actions workflow for automated security scanning
name: Security Scan

on: [push, pull_request]

jobs:
  security-scan:
    runs-on: macos-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run MobSF Security Scan
        run: |
          # Mobile Security Framework - scans for common vulnerabilities
          docker run -v $(pwd):/app opensecurity/mobile-security-framework-mobsf

      - name: Dependency Vulnerability Check
        run: |
          # Check CocoaPods/SPM dependencies for known CVEs
          brew install dependency-check
          dependency-check --scan ./Podfile.lock --format JSON

      - name: Secret Detection
        run: |
          # Detect accidentally committed secrets
          brew install truffleHog
          truffleHog filesystem . --json

      - name: Fail build on critical issues
        run: |
          if grep -q "CRITICAL" security-report.json; then
            echo "Critical security issues found!"
            exit 1
          fi
```

**Automated scans check for:**

- Hardcoded API keys, tokens, or passwords
- Insecure network configurations (allowing HTTP instead of HTTPS)
- Weak cryptographic algorithms
- Known vulnerabilities in third-party libraries
- Improper SSL/TLS certificate validation
- Insecure data storage (storing sensitive data in UserDefaults)
- Excessive app permissions

**Example output from an automated scan:**

```swift
Security Scan Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[CRITICAL] Hardcoded API Key Found
  File: APIClient.swift:15
  Issue: API key "sk_live_abc123..." detected in source code

[HIGH] Insecure HTTP Connection
  File: NetworkManager.swift:42
  Issue: App allows cleartext HTTP traffic to api.example.com
  Fix: Enforce HTTPS or add exception to Info.plist if required

[MEDIUM] Weak Encryption Algorithm
  File: DataEncryption.swift:28
  Issue: Using MD5 for hashing (cryptographically broken)
  Fix: Use SHA-256 or better

[LOW] Outdated Dependency
  Library: Alamofire 4.2.0
  Issue: Known vulnerability CVE-2021-12345
  Fix: Update to version 5.6.0 or later
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Build Failed: 2 critical issues must be fixed before deployment
```

**2. Use MobSF (Mobile Security Framework) for Vulnerability Analysis**

MobSF is a free, automated tool that analyzes your iOS app for security issues:

```swift
# Install and run MobSF locally
docker pull opensecurity/mobile-security-framework-mobsf
docker run -it -p 8000:8000 opensecurity/mobile-security-framework-mobsf

# Upload your .ipa file through the web interface at localhost:8000
# MobSF will analyze and provide a detailed security report
```

What MobSF checks:

- Binary analysis for hardcoded secrets
- Insecure data storage patterns
- Weak cryptographic implementations
- Insecure network connections
- Code quality and security best practices
- Compliance with security standards

**3. Conduct Regular Code Audits Using OWASP MSTG**

Use the OWASP Mobile Security Testing Guide as a checklist to audit your own code:

```swift
// Example: Following OWASP MSTG recommendations for secure storage
class SecureStorage {
    // ❌ Insecure - UserDefaults is not encrypted
    func saveTokenInsecurely(_ token: String) {
        UserDefaults.standard.set(token, forKey: "authToken")
    }

    // ✅ Secure - Using Keychain as OWASP recommends
    func saveTokenSecurely(_ token: String) throws {
        let data = token.data(using: .utf8)!
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrAccount as String: "authToken",
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleWhenUnlockedThisDeviceOnly
        ]

        SecItemDelete(query as CFDictionary)
        let status = SecItemAdd(query as CFDictionary, nil)

        guard status == errSecSuccess else {
            throw StorageError.saveFailed
        }
    }
}
```

**OWASP MSTG Checklist for Self-Audit:**

- [ ] Are all sensitive data encrypted at rest?
- [ ] Is HTTPS enforced for all network calls?
- [ ] Are certificates properly validated?
- [ ] Is sensitive data excluded from logs?
- [ ] Are API keys and secrets not hardcoded?
- [ ] Is user input validated and sanitized?
- [ ] Are authentication tokens stored securely in Keychain?

**4. Automated Dependency Scanning**

Monitor your dependencies continuously for newly discovered vulnerabilities:

```swift
# For CocoaPods projects
gem install cocoapods-audit
pod audit

# For Swift Package Manager
# Use GitHub Dependabot (free for public repos) or
brew install swift-outdated
swift-outdated
```

And set up automated alerts with these tools:

- **GitHub Dependabot:** Automatically creates PRs when vulnerable dependencies are detected (free)
- **Snyk**: Free tier available for open-source projects
- **OWASP Dependency-Check:** Free command-line tool

---

## Conclusion

Developing secure iOS apps using Swift is all about forward-thinking. You should do all you can to avoid these common errors, like insecure storage of data, poor network communication, hard-coded secrets, or poor authentication.

Using Keychain for confidential information, requiring HTTPS, input validation, and multifactor authentication are all steps that decrease risk.

Regular testing for security vulnerabilities and limiting third-party library use can also further enhance your app's security.

Security is a continuous responsibility. Swift provides tools, but the developers need to apply those tools carefully. Security being tackled right from the start protects users' information, creates trust, and protects the reputation of the application.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Secure iOS Apps in Swift: Common Security Pitfalls and How to Fix Them",
  "desc": "These days, there are many ways attackers can try to compromise your applications. And thanks to the continued increase in cyberattacks, the demand for secure mobile applications – and by extension, secure coding – has never been higher. So if you’re...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-secure-ios-apps-in-swift-common-security-pitfalls-and-how-to-fix-them.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
