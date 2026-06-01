# Before You Say Yes

**Before You Say Yes** is an AI-powered web application that helps users analyze offers before accepting them.

The project was built to solve a real problem: many people receive job offers, freelance opportunities, contracts, collaborations, or other important proposals, but they are not always sure if the offer is trustworthy, complete, safe, or worth moving forward with.

This website helps users check an offer, understand possible risks, identify missing information, and make a more confident decision before saying yes.

## Features

* Analyze offers using AI
* Detect suspicious or risky details
* Show red flags and green flags
* Provide a clear recommendation
* Suggest important questions the user should ask before accepting
* Upload or paste offer details
* Save analyzed offers in a history page
* Track offer status over time
* Mark whether the user moved forward with the offer
* Mark whether the offer eventually succeeded or not
* User authentication with login and registration

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Prisma
* SQLite for local development
* Groq API for AI analysis

## Getting Started

First, install the dependencies:

```bash
npm install
```

Create a `.env` file in the root of the project and add your environment variables:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

Then run the development server:

```bash
npm run dev
```

Open the website in your browser:

```text
http://localhost:3000
```

## Important Notes

The `.env` file should not be uploaded to GitHub because it contains private API keys.

The project includes `.env.example` only as a safe example file.

## Project Goal

The goal of **Before You Say Yes** is to help users avoid risky or unclear offers while also giving them the confidence to continue with good opportunities.

Sometimes fear makes us miss good chances, and sometimes trust makes us ignore warning signs. This project is designed to help users make smarter, calmer, and more organized decisions.
