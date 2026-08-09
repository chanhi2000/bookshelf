---
lang: en-US
title: "How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash"
description: "Article(s) > How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash"
icon: fa-brands fa-php
category:
  - PHP
  - Data Science
  - MySQL
  - AI
  - LLM
  - Google
  - Google Gemini
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - php
  - data-science
  - sql
  - mysql
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - gemini
  - google-gemini
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash"
    - property: og:description
      content: "How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-ai-agent-for-0-month-using-php-cpanel-and-gemini-flash.html
prev: /programming/php/articles/README.md
date: 2026-08-14
isOriginal: false
author:
  - name: Chidozie Managwu
    url: https://freecodecamp.org/news/author/Doxzy/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1e6049b1-5342-44de-9daf-bcaa33a0d6c0.png
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

```component VPCard
{
  "title": "MySQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mysql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Gemini > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/gemini/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash"
  desc="In this tutorial, you’ll build a practical AI agent that can receive a user prompt, decide whether it needs to use a tool, execute that tool in PHP, store conversation history in MySQL, and continue r"
  url="https://freecodecamp.org/news/how-to-build-a-production-ready-ai-agent-for-0-month-using-php-cpanel-and-gemini-flash"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1e6049b1-5342-44de-9daf-bcaa33a0d6c0.png"/>

In this tutorial, you’ll build a practical AI agent that can receive a user prompt, decide whether it needs to use a tool, execute that tool in PHP, store conversation history in MySQL, and continue reasoning until it produces a final answer.

The goal isn't to build a flashy demo. The goal is to show how an AI agent can work on a stack that is realistic for many developers: PHP for request handling, MySQL for persistence, Gemini Flash for reasoning and function calling, and cPanel for deployment on standard shared hosting.

By the end of this article, you’ll understand:

- How to structure an agent loop
- How tool calling works in practice
- How to store and reload conversation memory
- How to expose the system through a public API endpoint
- How to deploy the project on standard shared hosting

::: note Prerequisites

Before you start, you should have:

- PHP 8.1 or newer
- MySQL access
- cURL enabled in PHP
- A Gemini API key from Google AI Studio
- Basic familiarity with PHP arrays, JSON, and SQL
- Access to cPanel and phpMyAdmin

You don't need a separate application server. The PHP files can run on ordinary shared hosting, provided your account supports PHP, cURL, MySQL, and outbound HTTPS requests.

In a typical cPanel setup, the project will be stored inside a folder under <VPIcon icon="fas fa-folder-open"/>`public_html`.

:::

### Architecture Overview

The system has five main parts:

1. A public endpoint receives the user request.
2. An agent loop sends the conversation to Gemini Flash.
3. A tool registry tells Gemini which functions are available.
4. PHP tools perform actions such as saving notes, searching the web, or sending email.
5. MySQL stores the conversation so the agent can continue across requests.

The flow is straightforward. A user sends a message to the PHP endpoint. The endpoint passes the message and session ID to the agent. The agent loads previous messages and sends the conversation to Gemini along with the available tools. Gemini then decides what to do.

If the request can be answered directly, Gemini returns text. If an action is required, Gemini returns a function call containing the tool name and its arguments.

PHP receives the function call, runs the matching tool, and adds the result to the conversation. That result is sent back to Gemini, which can then call another tool or return a final answer.

This loop is what makes the application an agent rather than a basic chatbot.

### Project Structure

Create a folder named <VPIcon icon="fas fa-folder-open"/>`agent` inside <VPIcon icon="fas fa-folder-open"/>`public_html`:

```sh title="file structure"
/public_html/agent/
├── index.php
├── agent.php
├── gemini.php
├── db.php
├── memory.php
├── tool_registry.php
├── tools/
│   ├── save_note.php
│   ├── search_web.php
│   ├── send_email.php
│   └── .htaccess
└── .htaccess
```

Each file has one main responsibility:

- .<VPIcon icon="fa-brands fa-php"/>`index.php` receives the HTTP request and returns JSON.
- .<VPIcon icon="fa-brands fa-php"/>`agent.php` contains the reasoning loop.
- .<VPIcon icon="fa-brands fa-php"/>`gemini.php` communicates with Gemini.
- .<VPIcon icon="fa-brands fa-php"/>`db.php` creates the MySQL connection.
- .<VPIcon icon="fa-brands fa-php"/>`memory.php` loads and saves conversation history.
- .<VPIcon icon="fa-brands fa-php"/>`tool_registry.php` describes the available tools.
- The <VPIcon icon="fas fa-folder-open"/>`tools` folder contains the functions that perform actions.

Keeping the files separate makes the project easier to maintain. You can add a new tool without changing the rest of the application.

Add this to <VPIcon icon="fas fa-folder-open"/>`tools/.htaccess`:

```apache title="tools/.htaccess"
Deny from all
```

The tools folder shouldn't be accessible through a public URL. These files can write to the database, make external requests, or send email.

### Set Up the MySQL Database

The application needs one table for conversation history and another for saved notes.

Run this SQL in phpMyAdmin:

```sql
CREATE DATABASE IF NOT EXISTS ai_agent;

USE ai_agent;

CREATE TABLE agent_memory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session_id (session_id)
);

CREATE TABLE agent_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(64) NOT NULL,
    note TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

The `agent_memory` table stores the messages that make up each conversation. The `session_id` column separates one conversation from another, while `role` identifies whether the message came from the user, model, or a function.

The `agent_notes` table stores information that the user deliberately asks the agent to remember. Keeping notes separate from conversation history makes them easier to retrieve and use as application data.

If cPanel adds an account prefix to your database name, use the complete name in <VPIcon icon="fa-brands fa-php"/>`db.php`. For example, `ai_agent` may become `account_ai_agent`.

### Connect PHP to MySQL

Create <VPIcon icon="fa-brands fa-php"/>`db.php`:

```php title="db.php"
<?php

function db(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $pdo = new PDO(
            "mysql:host=localhost;dbname=ai_agent;charset=utf8mb4",
            "db_user",
            "db_password",
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    }

    return $pdo;
}
```

The function uses PDO to connect to MySQL. The static variable ensures that the same connection is reused for subsequent requests, rather than opening a new one each time the agent accesses the database.

`PDO::ATTR_ERRMODE` makes database failures throw exceptions. This makes errors easier to detect and handle.

Replace `ai_agent`, `db_user`, and `db_password` with the actual database details from cPanel. The `utf8mb4` character set allows the database to store a wide range of characters, including emoji and non-English text.

### Call Gemini Flash from PHP

Gemini supports function calling. It can decide that a tool is needed and return the tool name and arguments. It doesn't execute the PHP function itself. Your application is responsible for validating the request and running the tool.

For example, Gemini might return:

```json
{
  "note": "Our launch is on 1 September 2026"
}
```

Create <VPIcon icon="fa-brands fa-php"/>`gemini.php`:

```php :collapsed-lines title="gemini.php"
<?php

function gemini_request(array $contents, array $tools = []): array
{
    $apiKey = "YOUR_GEMINI_API_KEY";

    $url =
        "https://generativelanguage.googleapis.com/v1beta/models/" .
        "gemini-1.5-flash:generateContent?key=" . $apiKey;

    $payload = [
        "contents" => $contents
    ];

    if (!empty($tools)) {
        $payload["tools"] = [
            [
                "functionDeclarations" => $tools
            ]
        ];
    }

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json"
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new RuntimeException("Gemini request failed: " . $error);
    }

    curl_close($ch);

    if ($httpCode !== 200) {
        throw new RuntimeException("Gemini API error: " . $response);
    }

    $decoded = json_decode($response, true);

    if (!is_array($decoded)) {
        throw new RuntimeException("Gemini returned invalid JSON.");
    }

    return $decoded;
}

function parse_gemini_response(array $response): array
{
    $part = $response["candidates"][0]["content"]["parts"][0] ?? [];

    if (isset($part["functionCall"])) {
        return [
            "type" => "function_call",
            "name" => $part["functionCall"]["name"],
            "args" => $part["functionCall"]["args"] ?? []
        ];
    }

    return [
        "type" => "text",
        "text" => $part["text"] ?? ""
    ];
}
```

The `gemini_request` function sends the conversation and tool definitions to Gemini. The parser converts Gemini's response into either a text response or a function call.

The agent loop can then make a simple decision:

- If the type is `function_call`, execute the requested tool.
- If the type is `text`, return the answer to the user.

For a real deployment, store the API key outside the public web directory whenever possible.

### Define the Tool Registry

The tool registry tells Gemini which tools exist and what arguments they require.

Create <VPIcon icon="fa-brands fa-php"/>`tool_registry.php`:

```php :collapsed-lines title="tool_registry.php"
<?php

function tool_definitions(): array
{
    return [
        [
            "name" => "save_note",
            "description" => "Save an important note to the database.",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "note" => [
                        "type" => "string"
                    ]
                ],
                "required" => ["note"]
            ]
        ],
        [
            "name" => "search_web",
            "description" => "Search the web for current information.",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "query" => [
                        "type" => "string"
                    ]
                ],
                "required" => ["query"]
            ]
        ],
        [
            "name" => "send_email",
            "description" => "Send an email when the user explicitly asks.",
            "parameters" => [
                "type" => "object",
                "properties" => [
                    "to" => [
                        "type" => "string"
                    ],
                    "subject" => [
                        "type" => "string"
                    ],
                    "body" => [
                        "type" => "string"
                    ]
                ],
                "required" => ["to", "subject", "body"]
            ]
        ]
    ];
}
```

The description helps Gemini decide when to use a tool. The parameters describe the values that Gemini should provide.

The registry doesn't replace server-side validation. Every PHP tool must still check its own arguments before performing an action.

### Build the Tools

Each tool should:

1. Read the arguments from Gemini.
2. Validate the input.
3. Perform the action.
4. Return a JSON result.

#### Save Note Tool

Create <VPIcon icon="fas fa-folder-open"/>`tools/`<VPIcon icon="fa-brands fa-php"/>`save_note.php`:

```php title="tools/save_note.php"
<?php

require_once __DIR__ . "/../db.php";

function save_note_tool(array $args, string $sessionId): string
{
    $note = trim($args["note"] ?? "");

    if ($note === "") {
        return json_encode([
            "success" => false,
            "message" => "Empty note"
        ]);
    }

    $stmt = db()->prepare(
        "INSERT INTO agent_notes (session_id, note)
         VALUES (:session_id, :note)"
    );

    $stmt->execute([
        ":session_id" => $sessionId,
        ":note" => $note
    ]);

    return json_encode([
        "success" => true,
        "message" => "Note saved"
    ]);
}
```

The note is trimmed and checked before it is saved. The prepared statement prevents SQL injection and safely handles the input.

#### Search Web Tool

Create <VPIcon icon="fas fa-folder-open"/>`tools/`<VPIcon icon="fa-brands fa-php"/>`search_web.php`:

```php title="tools/search_web.php"
<?php

function search_web_tool(array $args): string
{
    $query = trim($args["query"] ?? "");

    if ($query === "") {
        return json_encode([
            "success" => false,
            "message" => "Search query is empty"
        ]);
    }

    $url = "https://api.example.com/search?q=" . urlencode($query);

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15
    ]);

    $response = curl_exec($ch);

    if ($response === false) {
        $error = curl_error($ch);
        curl_close($ch);

        return json_encode([
            "success" => false,
            "message" => "Search failed",
            "error" => $error
        ]);
    }

    curl_close($ch);

    return $response;
}
```

The URL is a placeholder. Replace it with your chosen search provider and add any required API key or authentication header.

The timeout prevents a slow external service from keeping the PHP request open indefinitely.

#### Send Email Tool

Create <VPIcon icon="fas fa-folder-open"/>`tools/`<VPIcon icon="fa-brands fa-php"/>`send_email.php`:

```php title="tools/send_email.php"
<?php

function send_email_tool(array $args): string
{
    $to = filter_var(
        $args["to"] ?? "",
        FILTER_VALIDATE_EMAIL
    );

    $subject = trim($args["subject"] ?? "");
    $body = trim($args["body"] ?? "");

    if (!$to) {
        return json_encode([
            "success" => false,
            "message" => "Invalid email address"
        ]);
    }

    if ($subject === "" || $body === "") {
        return json_encode([
            "success" => false,
            "message" => "Email subject and body are required"
        ]);
    }

    $headers = "From: agent@yourdomain.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $sent = mail($to, $subject, $body, $headers);

    return json_encode([
        "success" => $sent,
        "message" => $sent ? "Email sent" : "Email failed"
    ]);
}
```

The recipient address, subject, and body are checked before sending. Replace the `From` address with one belonging to your domain.

The `mail()` function may be available on shared hosting, but an authenticated email service or SMTP provider is usually more reliable for production applications.

### Add MySQL Conversation Memory

Gemini doesn't automatically remember previous API requests. The application must load the conversation from MySQL before each request and save the updated history afterwards.

Create <VPIcon icon="fa-brands fa-php"/>`memory.php`:

```php :collapsed-lines title="memory.php"
<?php

require_once __DIR__ . "/db.php";

function load_memory(string $sessionId): array
{
    $stmt = db()->prepare(
        "SELECT role, content
         FROM agent_memory
         WHERE session_id = :session_id
         ORDER BY id ASC"
    );

    $stmt->execute([
        ":session_id" => $sessionId
    ]);

    $history = [];

    foreach ($stmt->fetchAll() as $row) {
        $history[] = [
            "role" => $row["role"],
            "parts" => [
                [
                    "text" => $row["content"]
                ]
            ]
        ];
    }

    return $history;
}

function save_memory(string $sessionId, array $history): void
{
    $pdo = db();

    $delete = $pdo->prepare(
        "DELETE FROM agent_memory
         WHERE session_id = :session_id"
    );

    $delete->execute([
        ":session_id" => $sessionId
    ]);

    $insert = $pdo->prepare(
        "INSERT INTO agent_memory
         (session_id, role, content)
         VALUES (:session_id, :role, :content)"
    );

    foreach ($history as $turn) {
        $part = $turn["parts"][0] ?? [];

        $text = isset($part["text"])
            ? $part["text"]
            : json_encode($part);

        $insert->execute([
            ":session_id" => $sessionId,
            ":role" => $turn["role"],
            ":content" => $text
        ]);
    }
}
```

`load_memory` Retrieves messages for the current session and rebuilds them in the format expected by Gemini.

`save_memory` replaces the stored history with the current history. This is simple and suitable for a small tutorial application. A larger system could append only new messages, use a JSON column, or summarise older conversations to reduce database and API usage.

### Create the Agent Loop

The agent loop connects the database, Gemini, memory, and tools.

Create <VPIcon icon="fa-brands fa-php"/>`agent.php`:

```php :collapsed-lines title="agent.php"
<?php

require_once __DIR__ . "/gemini.php";
require_once __DIR__ . "/memory.php";
require_once __DIR__ . "/tool_registry.php";
require_once __DIR__ . "/tools/save_note.php";
require_once __DIR__ . "/tools/search_web.php";
require_once __DIR__ . "/tools/send_email.php";

function run_tool(
    string $name,
    array $args,
    string $sessionId
): string {
    return match ($name) {
        "save_note" => save_note_tool($args, $sessionId),
        "search_web" => search_web_tool($args),
        "send_email" => send_email_tool($args),
        default => json_encode([
            "success" => false,
            "message" => "Unknown tool"
        ])
    };
}

function run_agent(
    string $message,
    string $sessionId
): string {
    $history = load_memory($sessionId);

    $history[] = [
        "role" => "user",
        "parts" => [
            [
                "text" => $message
            ]
        ]
    ];

    $tools = tool_definitions();
    $limit = 5;
    $step = 0;

    while ($step < $limit) {
        $step++;

        $response = gemini_request($history, $tools);
        $parsed = parse_gemini_response($response);

        if ($parsed["type"] === "text") {
            $history[] = [
                "role" => "model",
                "parts" => [
                    [
                        "text" => $parsed["text"]
                    ]
                ]
            ];

            save_memory($sessionId, $history);

            return $parsed["text"];
        }

        if ($parsed["type"] === "function_call") {
            $toolName = $parsed["name"];
            $toolArgs = $parsed["args"];
            $result = run_tool($toolName, $toolArgs, $sessionId);

            $history[] = [
                "role" => "model",
                "parts" => [
                    [
                        "functionCall" => [
                            "name" => $toolName,
                            "args" => $toolArgs
                        ]
                    ]
                ]
            ];

            $history[] = [
                "role" => "function",
                "parts" => [
                    [
                        "functionResponse" => [
                            "name" => $toolName,
                            "response" => [
                                "content" => $result
                            ]
                        ]
                    ]
                ]
            ];
        }
    }

    save_memory($sessionId, $history);

    return "I could not complete the task within the allowed number of steps.";
}
```

The `run_tool` function routes the requested tool to the correct PHP function. The default case handles unexpected tool names safely.

The `run_agent` function first loads the existing history and adds the new user message. It then sends the conversation to Gemini.

If Gemini returns text, the response is saved and returned to the user.

If Gemini returns a function call, PHP executes the tool. The function call and its result are both added to the history before the next loop iteration.

The five-step limit prevents the model from repeatedly calling tools without finishing. You can adjust the limit according to the needs of your application.

### Expose the Public API Endpoint

Create <VPIcon icon="fa-brands fa-php"/>`index.php`:

```php :collapsed-lines title="index.php"
<?php

require_once __DIR__ . "/agent.php";

header("Content-Type: application/json");

$input = json_decode(
    file_get_contents("php://input"),
    true
);

if (!is_array($input)) {
    http_response_code(400);

    echo json_encode([
        "error" => "Invalid JSON body"
    ]);

    exit;
}

$message = trim($input["message"] ?? "");
$sessionId = trim($input["session_id"] ?? "");

if ($message === "" || $sessionId === "") {
    http_response_code(400);

    echo json_encode([
        "error" => "message and session_id are required"
    ]);

    exit;
}

try {
    $reply = run_agent($message, $sessionId);

    echo json_encode([
        "reply" => $reply,
        "session_id" => $sessionId
    ]);
} catch (Throwable $e) {
    http_response_code(500);

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}
```

The endpoint expects a JSON request containing a message and session ID:

```json
{
  "message": "Save a note that our launch is on 1 September 2026",
  "session_id": "demo123"
}
```

The frontend should reuse the same session ID for messages in the same conversation. A new session ID creates a separate conversation.

During development, returning the exception message can help with debugging. In production, log detailed errors privately and return a general error message to users.

### Deploy on cPanel

Follow these steps:

1. Upload the project to <VPIcon icon="fas fa-folder-open"/>`/public_html/agent/`.
2. Create a database and user in cPanel.
3. Grant the user access to the database.
4. Run the SQL in phpMyAdmin.
5. Update the credentials in <VPIcon icon="fa-brands fa-php"/>`db.php`.
6. Add the Gemini API key in <VPIcon icon="fa-brands fa-php"/>`gemini.php`.
7. Select PHP 8.1 or newer.
8. :collapsed-lines Enable the cURL extension. title="gemini.php"
9. Add the `.htaccess` file to the <VPIcon icon="fas fa-folder-open"/>`tools` folder.

The endpoint should then be available at:

```text
https://yourdomain.com/agent/index.php
```

### Test the Agent

Save a note:

```sh
curl -X POST https://yourdomain.com/agent/index.php \
-H "Content-Type: application/json" \
-d '{"message":"Save a note that our launch is on 1 September 2026","session_id":"demo123"}'
```

The agent should call `save_note`, store the note in MySQL, and return a confirmation.

You can test memory by sending another request with the same session ID:

```sh
curl -X POST https://yourdomain.com/agent/index.php \
-H "Content-Type: application/json" \
-d '{"message":"What note did I save earlier?","session_id":"demo123"}'
```

The agent should load the previous conversation from `agent_memory` and use it to answer.

If something fails, check the database credentials, database tables, Gemini API key, PHP version, cURL extension, and server error logs. Also make sure the search tool doesn't still point to the placeholder API URL.

### Production Hardening Ideas

Before allowing real users to access the application, consider adding:

#### Authentication

Require an API token or another authentication method. Otherwise, anyone who discovers the endpoint may be able to use your tools and Gemini account.

#### Rate limiting

Limit requests by session ID, IP address, or authenticated user to prevent abuse and unexpected usage.

#### Tool logging

Store the session ID, tool name, arguments, result, and execution time. This helps you investigate unexpected behaviour.

#### Stronger validation

Validate every tool argument. Check email addresses, reject empty values, restrict string lengths, and validate database identifiers.

#### Better memory management

Long conversations can make API requests larger and less efficient. Consider keeping recent messages, summarising older messages, or storing structured tool calls separately.

#### Confirmation for sensitive actions

For actions such as sending email, ask the user for confirmation before executing the tool. Prompt instructions are helpful, but the application should also handle confirmation.

#### Credential protection

Don't store API keys and database passwords in a public repository. Keep sensitive configuration outside the public web directory when possible.

### Conclusion

You don't need a complex cloud stack to build a useful AI agent.

With PHP, MySQL, Gemini Flash, and cPanel, you can create a system that reasons, calls tools, stores memory, and runs on infrastructure that many developers already understand.

The architecture is built around a simple process:

1. The endpoint receives the user's request.
2. MySQL provides the previous conversation.
3. Gemini decides whether a tool is needed.
4. PHP executes the tool.
5. The result is sent back to Gemini.
6. Gemini produces the final answer.
7. The updated conversation is saved.

This gives you a practical foundation for building agent-based applications on standard shared hosting.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Production-Ready AI Agent for $0/Month Using PHP, cPanel, and Gemini Flash",
  "desc": "In this tutorial, you’ll build a practical AI agent that can receive a user prompt, decide whether it needs to use a tool, execute that tool in PHP, store conversation history in MySQL, and continue r",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-production-ready-ai-agent-for-0-month-using-php-cpanel-and-gemini-flash.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
