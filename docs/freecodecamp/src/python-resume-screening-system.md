---
lang: en-US
title: "How to Build a Résumé Screening System Using Python and Multiprocessing"
description: "Article(s) > How to Build a Résumé Screening System Using Python and Multiprocessing"
icon: fa-brands fa-python
category:
  - Python
  - Streamlit
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - py
  - python
  - streamlit
  - py-streamlit
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Résumé Screening System Using Python and Multiprocessing"
    - property: og:description
      content: "How to Build a Résumé Screening System Using Python and Multiprocessing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-resume-screening-system.html
prev: /programming/py-streamlit/articles/README.md
date: 2026-02-07
isOriginal: false
author:
  - name: Abdul Talha
    url: https://freecodecamp.org/news/author/abdultalha3226/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770331777028/1ac80e66-cf22-4160-8812-ea917384cd3f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Streamlit > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py-streamlit/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Résumé Screening System Using Python and Multiprocessing"
  desc="Hiring the right candidate starts with one time-consuming task: screening résumés. If you’ve ever posted a job opening, you know the pain of hundreds of applications in your inbox, leaving you to spend hours reviewing each résumé manually. In this ar..."
  url="https://freecodecamp.org/news/python-resume-screening-system"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770331777028/1ac80e66-cf22-4160-8812-ea917384cd3f.png"/>

Hiring the right candidate starts with one time-consuming task: screening résumés. If you’ve ever posted a job opening, you know the pain of hundreds of applications in your inbox, leaving you to spend hours reviewing each résumé manually.

In this article, you’ll build a résumé screening system using pure Python, focusing on core programming concepts and the power of multiprocessing. You’ll create a custom system that automates the evaluation process by transforming unstructured résumé documents into a ranked leaderboard.

By the end of this guide, you will:

- Parse documents by extracting text from PDF and DOCX résumés using Python
- Extract information by identifying skills and keywords from résumé content
- Design a scoring algorithm using weighted logic to rank candidates objectively
- Build a web interface using Streamlit
- Deploy the application on Streamlit Cloud for public access

By following this tutorial, you’ll build a tool capable of processing hundreds of résumés in seconds.

::: info

Here’s the source code: [GitHub Repository (<VPIcon icon="iconfont icon-github"/>`abdultalha0862/Resume_Parser_Project`)](https://github.com/abdultalha0862/Resume_Parser_Project)

<SiteInfo
  name="abdultalha0862/Resume_Parser_Project"
  desc="Contribute to abdultalha0862/Resume_Parser_Project development by creating an account on GitHub."
  url="https://github.com/abdultalha0862/Resume_Parser_Project/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1dd050b1d19c36b0fd3f92f7fc2afd40c9855e159d4a4f0837c14391f60147b4/abdultalha0862/Resume_Parser_Project"/>

:::

::: note Prerequisites

To follow along with this tutorial, you should have:

- Basic knowledge of Python (functions, loops, dictionaries)
- Python 3.8 or higher installed
- Familiarity with installing packages using `pip`
- A code editor such as VS Code, PyCharm, or any editor you prefer

:::

---

## Project Overview

In this guide, you’ll develop a system that takes a folder of résumés and a Job Description (JD) as input. The system processes each résumé, extracts relevant information, and calculates a score based on how well the candidate matches the job requirements.

---

## How the System Works

The project consists of four core components:

- **Résumé Parser**: Reads PDF and DOCX files and extracts text
- **JD Parser**: Analyses the job description to identify required skills
- **Keyword Extractor**: Matches résumé content against a skills taxonomy
- **Scoring Engine**: Ranks candidates using a weighted algorithm

### Scoring Formula

Here’s the scoring formula we’ll use:

```plaintext
Total Score =
(Required Skills × 50%) +
(Preferred Skills × 25%) +
(Experience × 15%) +
(Keywords × 10%)
```

This approach ensures that essential skills carry more weight than secondary keywords.

### How This Approach Helps Reduce Bias

This system evaluates résumés using predefined criteria instead of subjective judgment. Each résumé is scored based on the same set of required skills, preferred skills, experience indicators, and keywords.

Because all candidates are evaluated using the same weighted formula, personal factors such as writing style, formatting, or unconscious preferences don’t influence the ranking. The scoring logic focuses only on how closely a résumé matches the job requirements.

By normalising the evaluation process, the system promotes more consistent and objective screening, which helps reduce bias during the initial résumé review stage.

---

## System Architecture

```plaintext
Input                    Processing                     Output
─────                    ──────────                     ──────

Résumés ──► Résumé Parser ──► Keyword Extractor ──┐
(PDF/DOCX)                                        │
                                                  ├──► Scoring Engine ──► Ranked Results
Job Description ──► JD Parser ────────────────────┘
(TXT/PDF)
```

The system follows a simple input–process–output flow.

Résumés and the job description are provided as inputs. The Résumé Parser extracts text from each résumé, while the JD Parser identifies required and preferred skills from the job description.

The extracted résumé text is then passed to the Keyword Extractor, which matches skills and keywords using a predefined taxonomy.

Finally, the Scoring Engine applies a weighted formula to calculate a score for each candidate and outputs a ranked list of résumés.

---

## Project Structure

```sh title="file structure"
resume_screening_system/
├── app.py                    # Streamlit web interface
├── main.py                   # Command-line interface
├── parsers/
│   ├── resume_parser.py      # PDF/DOCX text extraction
│   └── jd_parser.py          # Job description parsing
├── extractors/
│   └── keyword_extractor.py  # Skills and experience extraction
├── matcher/
│   └── scorer.py             # Scoring algorithm
├── data/
│   ├── config.json           # Scoring weights
│   └── skills_taxonomy.json  # Skills database
└── requirements.txt          # Dependencies
```

The project is organised into clear, modular directories. Parsing logic, keyword extraction, and scoring are separated into their own folders, while configuration files and data are kept isolated. This structure keeps the codebase easy to navigate, maintain, and extend.

---

## Step 1: Set Up the Project

Create the folder structure and set up a virtual environment:

```sh
mkdir resume_screening_system
cd resume_screening_system
mkdir parsers extractors matcher data input output
python -m venv venv
```

Then go ahead and activate the virtual environment:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-windows"/>

```sh
source venv/Scripts/activate
```

@tab <VPIcon icon="iconfont icon-macos"/>,<VPIcon icon="fa-brands fa-linux"/>

```sh
source venv/bin/activate
```

:::

Install the required dependencies like this:

```sh
pip install PyPDF2 python-docx streamlit pandas
```

---

## Step 2: Build the Résumé Parser

The résumé parser handles different file formats by using a separate extraction method for each type.

For PDF files, the parser opens the document page by page and extracts text from each page using a PDF reader. The extracted text is combined into a single string for further processing.

For DOCX files, the parser reads each paragraph in the document and joins the paragraph text into one block. This ensures consistent text output regardless of the résumé format.

By combining all résumés into plain text, the parser allows components such as keyword extraction and scoring to work efficiently.

```py title="parsers/resume_parser.py"
def _extract_pdf(self, file_path: Path) -> str:
    text = ""
    with open(file_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\\n"
    return text.strip()

def _extract_docx(self, file_path: Path) -> str:
    from docx import Document
    doc = Document(file_path)
    return "\\n".join(
        para.text for para in doc.paragraphs
    ).strip()
```

---

## Step 3: Build the Keyword Extractor

This project uses a résumé dataset from [<VPIcon icon="iconfont icon-kaggle"/>Kaggle](https://kaggle.com/datasets/snehaanbhawal/resume-dataset) to ensure the logic works with real-world professional data. The keyword extractor identifies skills by scanning the résumé text.

The résumé text is first converted to lowercase so that matching is case-insensitive. A predefined skills taxonomy stores each skill along with its possible variations. The extractor checks the résumé text against these variations to find matches.

Word boundaries are used during matching to avoid partial matches, such as matching “Java” inside “JavaScript”. Matched skills are stored in a set to prevent duplicates.

This approach ensures consistent and controlled skill detection across all résumés.

```py title="extractors/keyword_extractor.py"
def extract_skills(self, text: str) -> Set[str]:
    text_lower = text.lower()
    found_skills = set()

    for category, skills_dict in self.skills_taxonomy.items():
        for skill_name, variations in skills_dict.items():
            for variation in variations:
                # Prevent "Java" matching "JavaScript"
                pattern = r"\\b" + re.escape(variation) + r"\\b"
                if re.search(pattern, text_lower):
                    found_skills.add(skill_name)
                    break

    return found_skills
```

---

## Step 4: Implement the Scoring Engine

To produce objective rankings, the system uses a weighted scoring formula.

| Component | Weight | Rationale |
| --- | --- | --- |
| Required Skills | 50% | Essential technical needs |
| Preferred Skills | 25% | Competitive differentiators |
| Experience | 15% | Professional depth |
| Keywords | 10% | Domain familiarity |

```plaintext
Total Score =
(S_req × 0.50) +
(S_pref × 0.25) +
(E_exp × 0.15) +
(K_key × 0.10)
```

The scoring engine calculates a final score for each résumé using weighted values.

It counts how many required skills, preferred skills, experience indicators, and keywords appear in a résumé. Each count is multiplied by its assigned weight, with required skills contributing the most.

The weighted values are summed to produce a single score. Résumés are then sorted by this score to generate a ranked list of candidates.

---

## Step 5: Build the Web Interface

Streamlit provides a simple web interface for interacting with the résumé screening system.

The text area allows users to input a job description, while the file uploader lets them upload multiple résumé files. When the button is clicked, Streamlit triggers the backend logic to parse résumés, extract data, and calculate scores.

The results are then displayed in the browser, allowing users to run the screening process without using the command line.

```py title="app.py"
import streamlit as st

jd_text = st.text_area(
    "Paste the job description here:",
    height=300
)

uploaded_files = st.file_uploader(
    "Upload resume files:",
    type=["pdf", "docx", "txt"],
    accept_multiple_files=True
)

if st.button("Screen Resumes", type="primary"):
    st.success("Processing resumes...")
```

Run the application:

```sh
streamlit run app.py
```

The app will be available at `http://localhost:8500`.

---

## Step 6: Test the System

### Sample Job Description Input

Below is an example of a job description you can use to test the system:

```plaintext
We are looking for a Senior Python Developer with strong experience in backend development.

Required Skills:
- Python
- Django
- REST APIs
- SQL

Preferred Skills:
- PostgreSQL
- Docker
- AWS

Experience:
- 3+ years of professional Python development
- Experience building web applications
```

This input helps the system identify required skills, preferred skills, and experience keywords, which are then used by the scoring engine to rank résumés.

```sh
python main.py
```

### Sample Output

```plaintext
============================================================
SCREENING RESULTS
============================================================
Rank #1: Alice Johnson | Score: 85.42/100 | Matched: python, django, postgresql
Rank #2: Carol Davis   | Score: 72.50/100 | Matched: python, django
```

---

## Step 7: Deploy the Application

To make the system publicly accessible:

1. Push the code to GitHub
2. Go to [<VPIcon icon="fas fa-globe"/>`share.streamlit.io`](http://share.streamlit.io/)
3. Select your <VPIcon icon="fa-brands fa-python"/>`app.py file
4. Deploy the application

Your app will be live at:

```plaintext
https://your-app-name.streamlit.app
```

---

## Conclusion

In this tutorial, you’ve built a complete résumé screening system from scratch using Python. By combining text processing, structured scoring, and automation, this project demonstrates how manual résumé screening can be transformed into an efficient and objective workflow.

This system helps reduce bias, save time, and evaluate candidates more consistently. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Résumé Screening System Using Python and Multiprocessing",
  "desc": "Hiring the right candidate starts with one time-consuming task: screening résumés. If you’ve ever posted a job opening, you know the pain of hundreds of applications in your inbox, leaving you to spend hours reviewing each résumé manually. In this ar...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/python-resume-screening-system.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
