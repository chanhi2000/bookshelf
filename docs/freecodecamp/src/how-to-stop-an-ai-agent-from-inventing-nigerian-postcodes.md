---
lang: en-US
title: "How to Stop an AI Agent from Inventing Nigerian Postcodes"
description: "Article(s) > How to Stop an AI Agent from Inventing Nigerian Postcodes"
icon: iconfont icon-typescript
category:
  - Python
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Stop an AI Agent from Inventing Nigerian Postcodes"
    - property: og:description
      content: "How to Stop an AI Agent from Inventing Nigerian Postcodes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-an-ai-agent-from-inventing-nigerian-postcodes.html
prev: /programming/py/articles/README.md
date: 2026-10-15
isOriginal: false
author:
  - name: Kayode Adeniyi
    url: https://freecodecamp.org/news/author/mkbadeniyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fc6aa940-cdca-4307-8416-682b5d660091.png
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

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Stop an AI Agent from Inventing Nigerian Postcodes"
  desc="On 1 October 2026, Nigeria's postcode changed from six digits to an 11-character code that identifies a single building, such as EK-01-A03-FK-01. Language models trained before that date still describ"
  url="https://freecodecamp.org/news/how-to-stop-an-ai-agent-from-inventing-nigerian-postcodes"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/fc6aa940-cdca-4307-8416-682b5d660091.png"/>

On 1 October 2026, Nigeria's postcode changed from six digits to an 11-character code that identifies a single building, such as `EK-01-A03-FK-01`.

Language models trained before that date still describe the old format with full confidence. That affects two kinds of agent: a coding agent that writes your validation code, and a runtime agent that reads a postcode from a customer's message or fills in a delivery form.

This article shows you how to contain both. For the coding agent, you'll measure what it says today and give it a rule that corrects it. For the runtime agent, you'll build a boundary: the model proposes a postcode, and deterministic code decides whether it's well formed, whether NIPOST has assigned it, and where the work goes next.

You'll also see the tools an agent can call directly and a table of every failure state. The examples use `ng-postcode`, an open-source library I maintain, and its MCP server.

::: note Prerequisites

You'll need Python 3.10 or later. Everything except the live lookups runs offline and needs no key.

For the lookups, you can get a key from the [<VPIcon icon="fas fa-globe"/>NIPOST developer dashboard](https://dashboard.postcode.gov.ng). The MCP section also needs [<VPIcon icon="iconfont icon-uv"/>uv](https://docs.astral.sh/uv/), which provides the `uvx` command, and an MCP client such as Claude Code or Cursor.

```sh
pip install "ng-postcode[client]"
```

---

## What a Coding Agent Says Today

I asked a coding agent the question a developer would ask. To keep the test fair, I ran it from an empty folder, so the agent had no project files to read, and I allowed it to search the web.

```sh
claude -p "I'm building a checkout in Python. I need to validate Nigerian postcodes. \
What should I use? Give the install command and a short example, in under 120 words. \
Then end with exactly three lines: LIBRARY: <the package you recommended, or none if you \
wrote your own regex> / FORMAT_ASSUMED: <the format you assumed> / SEARCHED: <yes or no>. \
Today is 5 October 2026." --allowedTools "WebSearch,WebFetch"
```

I ran it on 5 October 2026 for Python, JavaScript, Rust, and Java. These are the closing lines of each answer:

| Language | Library | Format assumed | Searched |
| --- | --- | --- | --- |
| Python | none | exactly six digits, e.g. 100001 | no |
| JavaScript | none | six digits, first digit 1 to 9 | no |
| Rust | none | exactly six ASCII digits | no |
| Java | none | six digits, first digit 1 to 9 | no |

Four languages produced the same answer. The agent had a search tool and the date in its prompt, and it still wrote a six-digit pattern from memory without searching.

This is one agent, measured once per language on one day, so treat it as a reading you can repeat with your own tools.

The mechanism behind it is general, though. A model reproduces the format that dominated its training data, and the new format had almost no presence there. The code it writes then rejects every current real postcode:

```py
import re

print(re.fullmatch(r"[1-9]\d{5}", "EK-01-A03-FK-01"))  # None
```

---

## How to Correct the Coding Agent at the Source

The agent wrote the six-digit pattern because it lacked one fact, so give it that fact. Paste this into your project's `AGENTS.md`, `CLAUDE.md`, or editor rules:

```plaintext
Nigerian postcodes: since 1 October 2026 a building's postcode is NIPOST's 11-character
digital postcode (NDAPS), such as EK-01-A03-FK-01, and a six-digit pattern does not match it.
Validate and format it with ng-postcode (pip, cargo), ng-postcode-js (npm), or
io.github.adeniyikayodee:ng-postcode (Maven). On npm, ng-postcode is a different project.
Reference: https://adeniyikayodee.github.io/ng-postcode/llms.txt
```

On 13 October 2026 I ran the Python prompt again from a folder that held only this rule in a `CLAUDE.md` file. The answer ended with these lines:

```plaintext
LIBRARY: ng-postcode
FORMAT_ASSUMED: 11-character NDAPS digital postcode, e.g. EK-01-A03-FK-01
SEARCHED: yes
```

The rule improves what a coding agent writes. It can also be missing, ignored, or out of date, and it has no effect on a model that handles postcodes at run time. The rest of this article builds the check that holds in those cases.

---

## Where to Draw the Boundary

A model that handles postcodes at run time is a component with a known property: for the same input it can return different outputs, and some of them are wrong in ways that look right. You already design around components like that. A network can drop a packet, so you add a checksum. A user can mistype a field, so you add validation. The model belongs in the same category.

Each component gets one job. The model fills in the payload: it reads "my code is ek 01 a03 fk 01" in a message and extracts the string. A parser decides whether that string is a postcode. The NIPOST API decides whether the postcode is assigned to a building. Your own code, reading a prefix, decides which depot or queue receives the job. None of these decisions uses the model's confidence as evidence.

![The trust boundary: the model supplies the payload, and every decision and every failure exit after the dashed line belongs to deterministic code.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/12749f6e-25a1-4ea2-929a-b35fca72751a.png)

The postcode suits this design because its structure is strict. It has five segments, and each one narrows the one before it.

| Segment | Example | Rule |
| --- | --- | --- |
| State | `EK` | Two letters |
| Local government area | `01` | Two digits, 01 to 99 |
| District | `A03` | Three letters or digits |
| Area | `FK` | Two letters |
| Building unit | `01` | Two digits, 01 to 99 |

A wrong character in most positions breaks a rule that code can check offline, with no network call and no model.

![Each prefix of the code names a smaller region, from a state down to a single building.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/8f8e9e8d-ea30-4813-b902-2e6a39eeb7a5.png)

---

## How to Build the Gate

The gate is one function, and every postcode a model produces passes through it before anything else in your system sees it. `parse` returns a `Postcode` or an error value, so the type checker makes you handle both.

```py
from ng_postcode import Corrected, Postcode, parse, parse_lenient


def gate(text: str) -> Postcode | str:
    match parse(text):
        case Postcode() as code:
            return code
        case error:
            match parse_lenient(text):
                case Corrected(postcode=fixed):
                    return f"refused: {error}. Ask the user: did you mean {fixed}?"
                case _:
                    return f"refused: {error}"


for text in ["ek 01 a03 fk 01", "100001", "EK-00-A03-FK-01", "EK-O1-A03-FK-01"]:
    print(gate(text))
#
# EK-01-A03-FK-01
# refused: expected 11 letters and digits, found 6
# refused: invalid lga segment
# refused: invalid lga segment. Ask the user: did you mean EK-01-A03-FK-01?
```

The first input is accepted and normalized. The second is the old six-digit code, and the gate names what is wrong with it. The third has a local government number of `00`, which the format excludes.

In the fourth input, the letter `O` stands where only a digit can, and `parse_lenient` can tell what was probably meant. The gate still refuses the input and returns the suggestion as a question for the user. A correction is a guess, so it shouldn't reach a database or a paid API call until the user confirms it.

---

## How to Confirm a Code with NIPOST

The gate proves that a string is well-formed. Whether NIPOST has assigned the code to a building is a separate question, and one level 1 lookup answers it at no cost. Set your key in the `NG_POSTCODE_API_KEY` environment variable before you run this.

```py
import os

from ng_postcode import Postcode, parse
from ng_postcode.api import ApiError, lookup
from ng_postcode.client import Client, TransportError


def assigned(code: Postcode, client: Client) -> bool | str:
    match client.send(lookup(code, level=1)):
        case ApiError() | TransportError() as failure:
            return f"unconfirmed: {failure}"
        case found:
            return found.valid


code = parse("EK-01-A03-FK-01")
assert isinstance(code, Postcode)
with Client(api_key=os.environ["NG_POSTCODE_API_KEY"]) as client:
    print(assigned(code, client))
#
# False
```

`EK-01-A03-FK-01` is the example in NIPOST's documentation and belongs to no building, so the answer is `False`. A rejected key or a failed connection returns a string that begins with `unconfirmed`, which keeps a failed lookup apart from a code that NIPOST has not assigned. A NIPOST test key can report an assigned code as not assigned, so use a live key before you act on `False`.

---

## How to Route Work by Prefix

Because each segment narrows the last, a prefix of the code names a region: the first segment is a state, the first two are a local government area, and so on down to the building, which makes routing a dictionary lookup.

```py
from ng_postcode import Postcode, Segment, parse

DEPOTS = {"EK-01": "depot-a", "LA-05": "depot-b"}  # invented names


def depot(code: Postcode) -> str:
    return DEPOTS.get(code.prefix(Segment.LGA), "national-sorting")


code = parse("EK-01-A03-FK-01")
assert isinstance(code, Postcode)
print(depot(code)) 
#
# depot-a
```

The routing table is data you own and can review. The model has no part in this step, and the same code always reaches the same depot. An unknown prefix falls through to a named default, so a job is never lost because a table was incomplete.

If you let a model choose the destination from a free-text address, the same customer can reach a different depot on a different day, so keep that choice in code.

---

## How to Put the Steps Together

The three steps compose into one function. It takes the string the model extracted and returns either a depot or the next action, and it calls NIPOST only for input that has already parsed.

```py :collapsed-lines
import os

from ng_postcode import Postcode, Segment, parse
from ng_postcode.api import ApiError, lookup
from ng_postcode.client import Client, TransportError

DEPOTS = {"EK-01": "depot-a", "LA-05": "depot-b"}  # invented names


def dispatch(text: str, client: Client) -> str:
    code = parse(text)
    if not isinstance(code, Postcode):
        return f"ask the user: {code}"
    match client.send(lookup(code, level=1)):
        case ApiError() | TransportError() as failure:
            return f"retry later: {failure}"
        case found if not found.valid:
            return f"ask the user: {code} is not assigned to a building"
        case _:
            return DEPOTS.get(code.prefix(Segment.LGA), "national-sorting")


with Client(api_key=os.environ["NG_POSTCODE_API_KEY"]) as client:
    for text in ["100001", "ek 01 a03 fk 01"]:
        print(dispatch(text, client))
#
# ask the user: expected 11 letters and digits, found 6
# ask the user: EK-01-A03-FK-01 is not assigned to a building
```

Every return value names what happens next: a question for the user, a retry, or a depot. The model contributes the `text` argument and nothing else. To include a suggested correction in the question, call `gate` from the earlier section in place of `parse`.

---

## How to Give an Agent Tools with Enforced Limits

When an agent does need to work with postcodes directly, give it tools with a written contract, the way you would document a microservice. By default, the `ng-postcode-mcp` server exposes five tools over the Model Context Protocol, and it works with any MCP client.

![The five default tools as an MCP client sees them, shown here in Glama's directory listing.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/c9e50575-3a69-4b28-83f2-71402c8132d6.png)

```json
{
  "mcpServers": {
    "ng-postcode": {
      "command": "uvx",
      "args": ["ng-postcode-mcp"],
      "env": { "NG_POSTCODE_API_KEY": "nipost_live_..." }
    }
  }
}
```

| Tool | Network | Needs a key | Cost |
| --- | --- | --- | --- |
| `validate_postcode` | None | No | Free |
| `lookup_postcode` | NIPOST | Yes | Free, always level 1 |
| `autocomplete_postcode` | NIPOST | Yes | Free tier |
| `find_postcode_at_location` | NIPOST | Yes | Free tier |
| `resolve_address` | NIPOST and a geocoder | Yes | Free tier |
| `lookup_postcode_details` | NIPOST | Yes | Credits on every call. Registered only when `NG_POSTCODE_MAX_LEVEL` is 2 or more |

The server enforces three limits, so they hold whatever the model decides to do:

1. The five default tools are read-only.
2. The key is read from the environment. It's never a tool argument, so the model never sees it and cannot repeat it.
3. Paid lookups belong to a sixth tool, `lookup_postcode_details`, which the server registers only after you raise `NG_POSTCODE_MAX_LEVEL` to 2 or more.

Level 2 returns a house address and spends credits. On a default server the model has no tool that can request it: `lookup_postcode` accepts level 1 only, and a call to the paid tool gets this reply:

```plaintext
Unknown tool: lookup_postcode_details
```

When you raise the cap, the paid tool appears without the read-only hint, so a client that approves read-only tools automatically still asks you before it spends credits. The server also stops after 25 paid lookups in one run unless you raise `NG_POSTCODE_MAX_PAID_CALLS`. A request above the cap gets this reply:

```plaintext
Level 3 is above this server's cap of 2. Levels 2+ consume NIPOST credits; the user can
raise NG_POSTCODE_MAX_LEVEL to allow it.
```

The permission lives in configuration that a person sets, and no prompt can change it.

---

## How to Handle Every Failure State

Assume the model will produce a wrong code, the key will expire, and the network will fail. The table below lists each state, the component that detects it, and what the agent receives. Each message is the output of version 0.6.2 of the server, recorded on 13 October 2026. | State | Detected by | What comes back |
| --- | --- | --- |
| Old six-digit code | Parser, offline | `expected 11 letters and digits, found 6` |
| Segment out of range | Parser, offline | `invalid lga segment` |
| Look-alike typo sent to a lookup | Server, before any network call | `'EK-O1-A03-FK-01' is not a valid postcode: invalid lga segment. Did you mean EK-01-A03-FK-01? Confirm with the user first.` |
| Well formed, never assigned | NIPOST | `"valid": false, "status": "not_found"` |
| No key configured | Server | `This tool needs a NIPOST API key` |
| Key rejected | NIPOST | `invalid_api_key (401)`, with where to create a new key |
| Level above 1 sent to `lookup_postcode` | Server | `Input should be less than or equal to 1` |
| Level above the server's cap | Server | The cap message shown above |
| Level the key lacks | NIPOST | `level_not_granted (403)` |
| API unreachable | HTTP client | `Could not reach the NIPOST API: All connection attempts failed` |

![The checks run in this order, and the first three cost nothing because they finish before any request is sent.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/7ef9208e-d57f-4341-a7f9-913751992a20.png)

The third row is the look-alike typo. The server found a likely correction and declined to use it. It sent no lookup, and its reply tells the model to confirm with the user. A system that corrected the code and continued would return a real address for a building the user never named.

![A mistyped code is refused before any request is made, and the corrected code reaches NIPOST only after the user confirms it.](https://cdn.hashnode.com/uploads/covers/5f3a74bfc4d5973f55c91c8c/5fe1a1e9-678f-46dd-a7f5-90cf2622917f.png)

The fourth row is the hallucinated code. A model can produce a code that satisfies every rule of the format and belongs to no building, and offline validation accepts it. Only the registry can tell the two apart, so look up every code that matters at level 1. The HTTP client protects each request in three ways. It puts a ten-second deadline on the whole exchange, so a stalled connection can't hold an agent's turn open. It doesn't follow redirects, because a redirect would carry your key to another host. It refuses a plain `http://` base URL for the same reason, except on your own machine.

---

## How to Decode a Reply You Do Not Trust

The same suspicion applies to the API's reply. An agent that reads a response body directly will find a way to interpret whatever it receives. The library separates the work: `lookup` builds a request as plain data, and `decode` turns a status and a body into a typed result or an error. You can test this with no network.

```py
from ng_postcode import Postcode, parse
from ng_postcode.api import ApiError, decode, lookup

code = parse("EK-01-A03-FK-01")
assert isinstance(code, Postcode)
request = lookup(code)

replies = [
    (200, '{"data": {"postcode": "EK-01-A03-FK-01", "valid": false, "status": "not_found"}}'),
    (200, '{"data": {"postcode": "EK-01-A03-FK-01"}}'),
    (401, '{"error": {"code": "invalid_api_key", "message": "the provided API key is invalid or revoked"}}'),
    (502, "<html>Bad Gateway</html>"),
]
for status, body in replies:
    match decode(request, status, body):
        case ApiError() as error:
            print("error:", error)
        case found:
            print("assigned:", found.valid)
#
# assigned: False
# error: malformed_response (200): unexpected data
# error: invalid_api_key (401): the provided API key is invalid or revoked
# error: malformed_response (502): not JSON: Expecting value: line 1 column 1 (char 0)
```

In the second reply, the body is valid JSON with a 200 status, and the `valid` field is missing. A loose decoder would read the missing field as `false` and report that the building doesn't exist. This one reports that the response was malformed, so a missing field never becomes a claim about a building. Every implementation of the library, in Rust, Python, JavaScript, and Java, passes the same shared file of cases like this one.

---

## What This Does Not Solve

A valid, assigned postcode can still be the wrong one. If a user gives a neighbor's code, every check in this article passes. Confirming that a code belongs to the person in front of you needs a different control, such as showing them the address it resolves to.

Text alone rarely identifies a building: "Back of Fabian Hotel, off NTA Road" describes an area, and the `resolve_address` tool answers with an area prefix and a question for the user when that is all the evidence supports. For an exact building, ask for a location pin.

Addresses are personal data: level 2 lookups return a house address, so handle the result under the Nigeria Data Protection Act and keep the cap at level 1 unless you need more.

---

## Conclusion

The model is the least reliable component in the path, so give it the smallest job: extracting a string. A parser checks the structure for free. The registry confirms that the building exists. Your own table, keyed by prefix, decides where the work goes. Corrections return to the user as questions, and permissions that cost money or reveal an address sit in configuration that a person controls.

The boundary stays useful after models learn the new format. The same design applies to the next change to an address system, a tax code, or an account number, which models will also learn late.

The code is open source under the MIT license at [github.com/Adeniyikayodee/ng-postcode (<VPIcon icon="iconfont icon-github"/>`Adeniyikayodee/ng-postcode`)](https://github.com/Adeniyikayodee/ng-postcode). Install the library for your language:

```sh
pip install ng-postcode       # Python
npm install ng-postcode-js    # JavaScript and TypeScript
cargo add ng-postcode         # Rust
```

For Java, the Maven coordinate is `io.github.adeniyikayodee:ng-postcode-api`. If the library gets a case wrong, please open an issue.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Stop an AI Agent from Inventing Nigerian Postcodes",
  "desc": "On 1 October 2026, Nigeria's postcode changed from six digits to an 11-character code that identifies a single building, such as EK-01-A03-FK-01. Language models trained before that date still describ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-stop-an-ai-agent-from-inventing-nigerian-postcodes.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
