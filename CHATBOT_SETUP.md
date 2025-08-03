# Chatbot Setup Guide

## Features
- Floating help button in the bottom-right corner of lessons
- AI-powered chatbot using Google Gemini API
- Fallback responses when API is not available
- Context-aware responses for digital literacy topics

## Setup Instructions

### 1. Get a Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Set Environment Variable
Create a `.env` file in your project root and add:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual Gemini API key.

### 3. Restart Development Server
After adding the environment variable, restart your development server:

```bash
npm run dev
```

## How It Works

### With API Key
- The chatbot uses Google's Gemini AI to provide intelligent, contextual responses
- Responses are tailored for older adults learning digital literacy
- The AI is trained to be patient, encouraging, and helpful

### Without API Key (Fallback Mode)
- The chatbot provides pre-written responses based on keywords
- Covers all main topics: smartphone basics, online security, email, social media, video calling, online shopping
- Still provides helpful guidance even without AI

## Usage
1. Navigate to any lesson page
2. Look for the blue help button (?) in the bottom-right corner
3. Click the button to open the chat window
4. Type your question and press Enter or click Send
5. The chatbot will respond with helpful information

## Topics Covered
- Smartphone basics and usage
- Online security and safety
- Email setup and usage
- Social media safety
- Video calling apps
- Safe online shopping

## Customization
You can modify the chatbot responses by editing:
- `src/lib/chatbot.ts` - API integration and fallback responses
- `src/components/HelpChatbot.tsx` - UI and interaction logic 