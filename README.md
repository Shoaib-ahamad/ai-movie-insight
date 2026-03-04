# 🎬 AI Movie Insight Builder

An AI-powered full-stack application that transforms raw IMDb movie IDs into structured audience sentiment insights—including overall sentiment, pros & cons, and a quick “vibe check” summary.

---

## 📌 Project Overview

Instead of manually reading hundreds of reviews, users can enter a movie’s IMDb ID (e.g., `tt1375666`) and instantly get:

* **🎥 Movie Metadata**: High-quality posters, cast lists, and plot overviews.
* **😊 Sentiment Classification**: Overall audience mood (Positive / Mixed / Negative).
* **👍 Top Strengths**: Key highlights praised by viewers.
* **👎 Common Criticisms**: Frequent complaints or weaknesses.
* **🧠 AI "Vibe Check"**: A generated summary of audience perception.

The system combines **TMDB APIs** with **Gemini Pro** to transform raw, messy review data into structured, readable insights.

---

## 🏗️ Architecture & Flow

1. **User Input**: Receives IMDb ID.
2. **Next.js Server Action**: Securely processes the request.
3. **Fetch Metadata**: Pulls details from TMDB API.
4. **Dual Review Strategy**: Retrieves English-specific or Global reviews.
5. **AI Processing**: Gemini Pro analyzes and structures the review text.
6. **Output**: Returns a modern, glassmorphic UI result.

---

## ✨ Core Features

* **AI-Based Sentiment Analysis**: Real-time classification using LLMs.
* **Automated Feature Extraction**: Pulls Pros & Cons from review text.
* **Region-Safe Fetching**: Dual-fetch strategy ensures reviews are found globally.
* **Graceful Fallbacks**: Local keyword analyzer kicks in if AI limits are reached.
* **Premium UI**: Fully responsive, animated interface using Framer Motion.

---

## 🛠️ Tech Stack

### Frontend

* React 18 & Next.js 14 (App Router)
* Tailwind CSS (Styling)
* Framer Motion (Animations)
* Lucide Icons

### Backend & AI

* Next.js Server Actions (Secure Backend logic)
* TMDB API (Movie Data)
* Google Gemini Pro (LLM)

### Deployment

* Vercel (Production Hosting)

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Shoaib-ahamad/ai-movie-insight.git
cd ai-movie-insight

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Add Environment Variables

Create a `.env.local` file in the root directory:

```env
TMDB_API_KEY=your_tmdb_api_key
GOOGLE_API_KEY=your_gemini_api_key

```

### 4. Run Development Server

```bash
npm run dev

```

Navigate to: `http://localhost:3000`

---

## 🧠 Key Engineering Decisions

### 1. Server Actions vs. Separate Backend

I utilized Next.js Server Actions to protect sensitive API keys and reduce architectural complexity, eliminating the need for a separate Express server.

### 2. Dual-Layer Review Fetch Strategy

To solve region-specific API limitations, the system fetches `en-US` reviews first and falls back to a global fetch if the list is empty, ensuring consistent data availability.

### 3. AI Failure Fallback

In case of Gemini API rate limits or network issues, a local keyword-based sentiment analyzer takes over, ensuring the UI remains functional and informative.

---

## 📝 Assumptions & Constraints

* **Input Format**: The application assumes IMDb IDs follow the standard `tt1234567` format.
* **Review Length**: Reviews below a 50-character threshold are filtered to ensure AI analysis quality.
* **Data Latency**: Sentiment accuracy and generation speed are subject to the response times of the Gemini and TMDB APIs.

---

## 👨‍💻 Author

**Shoaib Ahamad Mev** *Full Stack Developer*

* 🔗 [Portfolio](https://shoaib-ahamad.netlify.app)
* 🔗 [GitHub](https://github.com/Shoaib-ahamad)

---
