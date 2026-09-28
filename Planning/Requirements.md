# Requirements

## Introduction

* Implement a personal portfolio website.
* The website will be a content-based static website, with most of the content written in Markdown.
* It will contain the following sections:

  * **Home:** A simple landing page containing a summary about me.
  * **Contact Me:** A page containing my contact details.
  * **Projects:** A page for displaying projects. Content will be added later.
  * **Articles:** A section for writing and publishing content related to my field.
* The website will have a simple navigation bar at the top for navigating between the main sections:

  * Home
  * Articles
  * Projects
  * Contact Me

---

## Website Sections

### 1. Landing Page

* Display a rounded profile photo.
* Display my job title.
* Include a simple introduction / About Me section.

### 2. Articles Section

* The Articles section should be based on Markdown, similar to documentation websites.
* The content should follow this folder structure:

```text
Articles/
├── Topic 1/
│   ├── summary.txt
│   ├── Article 1/
│   │   └── page.md
│   └── Article 2/
│       └── page.md
│
└── Topic 2/
    ├── summary.txt
    └── Article 1/
        └── page.md
```

* **Topics**

  * Each topic is stored in its own folder under `Articles`.
  * The folder name is used as the topic title.
  * Each topic can contain multiple related articles.
  * A topic can optionally contain a `summary.txt` file describing the topic.
  * The Articles page should display the available topics as cards, including their summaries when available.

* **Articles**

  * Each article is stored inside its own folder within a topic folder.
  * The article folder name is used as the article title.
  * Each article folder contains a `page.md` file containing the actual article content in Markdown format.

### 3. Projects Section

* For now, display an empty Projects page with no project content.
* Projects can be added later.

### 4. Contact Me

The Contact Me page will contain the following:

* **Phone**

  * Display my phone number.
  * Include a WhatsApp icon that opens a WhatsApp message to the specified number.
* **Email**
* **LinkedIn profile**

---

## Development Rules

* **Framework:** Astro
* **Deployment / Hosting:** GitHub Pages
* **Development Directory:** All website development should be contained within the `Project` directory in this repository.

  * This allows other directories to be used for things such as development notes and drafted content.
* The project must be runnable locally for development and testing.
* Configure a GitHub Actions pipeline so that every merge into the `main` branch automatically builds and deploys the website.

---

## Development Steps

1. Build a simple web page using Astro and test it locally to confirm that everything is working.
2. Configure the GitHub Actions pipeline for the `main` branch and test the first deployment using the initial test page.
3. Scaffold the main website sections:

   * Home
   * Articles
   * Projects
   * Contact Me
