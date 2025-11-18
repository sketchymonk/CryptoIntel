<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CryptoIntel - AI-Powered Crypto Research Tool

A sophisticated cryptocurrency intelligence and research platform powered by Claude AI (Anthropic). Generate detailed research prompts and get instant AI-powered analysis with deep thinking capabilities.

## Features

- **Intelligent Prompt Builder**: Comprehensive form-based interface for building detailed crypto research prompts
- **Dual Analysis Modes**:
  - **Deep Analysis (Opus)**: Extended thinking mode for thorough, nuanced research
  - **Fast Analysis (Sonnet)**: Quick, high-quality analysis for rapid insights
- **Interactive AI Chat**: Real-time conversation with Claude for follow-up questions
- **Research Categories**:
  - Tokenomics & Supply Mechanics
  - On-Chain Activity Analysis
  - Market Structure & Liquidity
  - Security & Audits
  - Governance & Treasury
  - Competitive Landscape
  - Social & Sentiment Intelligence
  - Technical/Chart Analysis

## Run Locally

**Prerequisites:** Node.js (v18 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your Anthropic API key:**
   - Get your API key from [Anthropic Console](https://console.anthropic.com/settings/keys)
   - Open `.env.local` and replace `your_api_key_here` with your actual API key:
     ```
     VITE_ANTHROPIC_API_KEY=sk-ant-...
     ```

3. **Run the app:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **AI Provider**: Anthropic Claude (Opus & Sonnet)
- **Styling**: Tailwind CSS (via inline classes)

## Usage

1. **Build Your Research Prompt**: Fill out the form sections with your research context, goals, and requirements
2. **Generate Prompt**: Click "Generate Prompt" to create a structured research query
3. **Choose Analysis Type**:
   - **Deep Analysis**: For comprehensive, thoughtful analysis (uses Claude Opus)
   - **Fast Analysis**: For quick insights (uses Claude Sonnet)
4. **Use the Chat**: Click the chat button for interactive follow-up questions

## Notes

- This app uses client-side API calls to Anthropic. For production use, consider implementing a backend proxy to protect your API key.
- The app requires an active internet connection to communicate with Claude API.
- API usage is billed according to [Anthropic's pricing](https://www.anthropic.com/pricing).
