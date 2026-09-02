# NIVA — AI Campus Health & Emergency Co-Pilot

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvanshgupta-git%2FNIVA-care&env=GEMINI_API_KEY&envDescription=Google%20Gemini%20API%20Key%20from%20Google%20AI%20Studio&envLink=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey)

Zero-friction emergency response co-pilot tailored for campus health centres, labs, hostels, and sports grounds.

---

## 🚀 One-Click Deploy to Vercel
Click the **Deploy with Vercel** button above. Vercel will automatically prompt you to input your `GEMINI_API_KEY`.

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- npm or bun

### Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env` and insert your Gemini API Key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   APP_URL="http://localhost:3000"
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.
