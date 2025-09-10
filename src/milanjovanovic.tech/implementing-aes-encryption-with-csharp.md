---
lang: en-US
title: "Implementing AES Encryption With C#"
description: "Article(s) > Implementing AES Encryption With C#"
icon: iconfont icon-csharp
category:
  - C#
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Implementing AES Encryption With C#"
    - property: og:description
      content: "Implementing AES Encryption With C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-aes-encryption-with-csharp.html
prev: /programming/cs/articles/README.md
date: 2025-01-25
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_126.png
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
  name="Implementing AES Encryption With C#"
  desc="Learn how to implement secure AES encryption in C# to protect sensitive application data like API keys and passwords, with practical code examples covering encryption, decryption, and key management best practices."
  url="https://milanjovanovic.tech/blog/implementing-aes-encryption-with-csharp"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_126.png"/>

A single exposed API key or database password can compromise your entire infrastructure. Yet many developers still store sensitive data with basic encoding or weak encryption.

Properly implemented encryption is your last line of defense. When other security measures fail, it ensures stolen data remains unreadable. This is especially crucial for API keys, database credentials, and user secrets that grant direct access to your systems.

In today's issue, we will cover implementing AES encryption in .NET with practical code examples and essential security considerations.

---

## Symmetric vs Asymmetric Encryption

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Symmetric encryption](https://en.wikipedia.org/wiki/Symmetric-key_algorithm) (like AES) uses the same key for encryption and decryption. It's fast and ideal for storing data that only your application needs to read. The main challenge is securely storing the encryption key.

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Asymmetric encryption](https://en.wikipedia.org/wiki/Public-key_cryptography) (like RSA) uses different keys for encryption and decryption. It's slower but allows secure communication between parties who don't share secrets. Common uses include SSL/TLS and digital signatures.

For storing API keys and application secrets, symmetric encryption with AES is the appropriate choice.

![AES encryption algorithm.](https://milanjovanovic.tech/blogs/mnw_126/aes_encryption.png?imwidth=1920)

AES encryption and decryption process block diagram.

---

## AES Encryption Implementation

Let's examine a secure [<VPIcon icon="fa-brands fa-wikipedia-w"/>AES (Advanced Encryption Standard)](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) encryption implementation in C#. This implementation uses AES-256, which provides the strongest security currently available in the AES standard.

```cs :collapsed-lines title="Encryptor.cs"
public class Encryptor
{
    private const int KeySize = 256;
    private const int BlockSize = 128;

    public static EncryptionResult Encrypt(string plainText)
    {
        // Generate a random key and IV
        using var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.BlockSize = BlockSize;

        // Generate a random key and IV for each encryption operation
        aes.GenerateKey();
        aes.GenerateIV();

        byte[] encryptedData;

        // Create encryptor and encrypt the data
        using (var encryptor = aes.CreateEncryptor())
        using (var msEncrypt = new MemoryStream())
        {
            using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
            using (var swEncrypt = new StreamWriter(csEncrypt))
            {
                swEncrypt.Write(plainText);
            }

            encryptedData = msEncrypt.ToArray();
        }

        // Package everything together, storing IV with the encrypted data
        var result = EncryptionResult.CreateEncryptedData(
            encryptedData,
            aes.IV,
            Convert.ToBase64String(aes.Key)
        );

        return result;
    }
}

public class EncryptionResult
{
    // The IV is prepended to the encrypted data
    public string EncryptedData { get; set; }
    public string Key { get; set; }

    public static EncryptionResult CreateEncryptedData(byte[] data, byte[] iv, string key)
    {
        // Combine IV and encrypted data
        var combined = new byte[iv.Length + data.Length];
        Array.Copy(iv, 0, combined, 0, iv.Length);
        Array.Copy(data, 0, combined, iv.Length, data.Length);

        return new EncryptionResult
        {
            EncryptedData = Convert.ToBase64String(combined),
            Key = key
        };
    }

    public (byte[] iv, byte[] encryptedData) GetIVAndEncryptedData()
    {
        var combined = Convert.FromBase64String(EncryptedData);

        // Extract IV and data
        var iv = new byte[16]; // AES block size is 16 bytes (128 / 8)
        var encryptedData = new byte[combined.Length - 16];

        Array.Copy(combined, 0, iv, 0, 16);
        Array.Copy(combined, 16, encryptedData, 0, encryptedData.Length);

        return (iv, encryptedData);
    }
}
```

Let's break down what's happening in this implementation:

- Every encryption operation generates a new random key and IV (Initialization Vector). This is crucial - reusing either of these compromises security. The IV prevents identical plaintext from producing identical ciphertext.
- We use `CryptoStream` for efficient encryption of potentially large data. The stream pattern ensures we don't load everything into memory at once.
- The `EncryptionResult` class provides a way to package the encrypted data with its key and IV. In production, the key should be stored separately in a key management service.

---

## AES Decryption Implementation

Here's the corresponding decryption implementation:

```cs :collapsed-lines title="Decryptor.cs"
public class Decryptor
{
    private const int KeySize = 256;
    private const int BlockSize = 128;

    public static string Decrypt(EncryptionResult encryptionResult)
    {
        var key = Convert.FromBase64String(encryptionResult.Key);
        var (iv, encryptedData) = encryptionResult.GetIVAndEncryptedData();

        using var aes = Aes.Create();
        aes.KeySize = KeySize;
        aes.BlockSize = BlockSize;
        aes.Key = key;
        aes.IV = iv;

        // Create decryptor and decrypt the data
        using var decryptor = aes.CreateDecryptor();
        using var msDecrypt = new MemoryStream(encryptedData);
        using var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read);
        using var srDecrypt = new StreamReader(csDecrypt);

        try
        {
            return srDecrypt.ReadToEnd();
        }
        catch (CryptographicException ex)
        {
            // Log the error securely - avoid exposing details
            throw new CryptographicException("Decryption failed", ex);
        }
    }
}
```

The decryption process reverses the encryption steps. Note the error handling - we catch cryptographic exceptions but avoid exposing details that could help an attacker. In production, you should log these errors securely for debugging while keeping security in mind.

---

## Usage Example

Here's an example of encrypting and decrypting sensitive data using the implementations above:

```cs
// Encrypt sensitive data
var apiKey = "your-sensitive-api-key";
var encryptionResult = Encryptor.Encrypt(apiKey);

// Output example: DCGT9kEwPglBonWWPa7PQPbr2I+6rskJ0lSFybbicvZ+wKMTU7cbJD2s3QSF2Yu6

// Store encrypted data in database
// IV is stored with the encrypted data
SaveToDatabase(encryptionResult.EncryptedData);

// Store key in key vault
await keyVault.StoreKeyAsync("apikey_1", encryptionResult.Key);

// Later, decrypt when needed
// IV is retrieved from the encrypted data
var encryptedData = LoadFromDatabase();
var key = await keyVault.GetKeyAsync("apikey_1");

var result = new EncryptionResult
{
    EncryptedData = encryptedData,
    Key = key,
    IV = iv
};

var decrypted = Decryptor.Decrypt(result);
```

---

## Takeaway

AES encryption provides strong security for sensitive application data when implemented correctly.

Proper key management is very important. Use a dedicated key storage service in production. Popular options include [<VPIcon icon="iconfont icon-microsoftazure"/>Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/), [<VPIcon icon="fa-brands fa-aws"/>AWS Key Management Service](https://aws.amazon.com/kms/), and [<VPIcon icon="fas fa-globe"/>HashiCorp Vault](https://vaultproject.io/).

In my [**Pragmatic REST APIs**](/milanjovanovic.tech/pragmatic-rest-apis/README.md) course, I cover secure data storage and encryption in more detail. These are critical aspects of building secure and robust APIs and integrating with third-party APIs. Check it out if you're interested in learning more.

Remember that encryption is just one part of a comprehensive security strategy. Keep your encryption keys separate from encrypted data and rotate them regularly.

Thanks for reading.

And stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Implementing AES Encryption With C#",
  "desc": "Learn how to implement secure AES encryption in C# to protect sensitive application data like API keys and passwords, with practical code examples covering encryption, decryption, and key management best practices.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/implementing-aes-encryption-with-csharp.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
