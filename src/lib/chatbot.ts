// Chatbot service using Gemini API
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDUeFsAWE37vI8nU3cKKu_MlxsbmZBK6Q8';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

interface ChatRequest {
  message: string;
  context?: string;
}

interface ChatResponse {
  response: string;
}

export const chatbotService = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a helpful digital literacy assistant for older adults learning about technology. 
    
Context: ${request.context || 'digital literacy learning platform'}

User Question: ${request.message}

Please provide a helpful, clear, and encouraging response. Keep your answers:
- Simple and easy to understand
- Encouraging and patient
- Focused on practical advice
- Under 200 words unless more detail is specifically requested
- Written in a friendly, supportive tone

If the user asks about topics you're not familiar with, politely redirect them to ask about: smartphone basics, online security, email, social media, video calling, or online shopping.`;

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API error:', response.status, errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const responseText = data.candidates[0].content.parts[0].text;
        return { response: responseText };
      } else {
        console.error('Invalid response format:', data);
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Chatbot API error:', error);
      throw error;
    }
  },

  // Fallback responses for when API is not available
  getFallbackResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('smartphone') || lowerMessage.includes('phone')) {
      return "I can help you with smartphone basics! Smartphones are like mini computers that fit in your pocket. They can make calls, send messages, take photos, and access the internet. What specific aspect of smartphones would you like to learn about?";
    }
    
    if (lowerMessage.includes('security') || lowerMessage.includes('safe') || lowerMessage.includes('scam')) {
      return "Online security is very important! Never share your passwords, be careful with suspicious emails, and always look for the lock symbol (🔒) in your browser when entering personal information. Would you like to learn more about staying safe online?";
    }
    
    if (lowerMessage.includes('email') || lowerMessage.includes('gmail')) {
      return "Email is a great way to stay connected! It's like sending digital letters. You can use services like Gmail, Outlook, or Yahoo Mail. Would you like to learn how to send your first email?";
    }
    
    if (lowerMessage.includes('social media') || lowerMessage.includes('facebook')) {
      return "Social media platforms like Facebook help you connect with friends and family online. You can share photos, send messages, and see what others are up to. Would you like to learn how to use social media safely?";
    }
    
    if (lowerMessage.includes('video call') || lowerMessage.includes('zoom') || lowerMessage.includes('facetime')) {
      return "Video calling lets you see and talk to people face-to-face, even when they're far away! Popular apps include Zoom, FaceTime (on iPhone), and WhatsApp. Would you like to learn how to make your first video call?";
    }
    
    if (lowerMessage.includes('shop') || lowerMessage.includes('buy') || lowerMessage.includes('amazon')) {
      return "Online shopping is convenient and can save you money! Popular sites include Amazon, eBay, and Walmart.com. Always look for the lock symbol (🔒) and 'https' in the address bar to stay safe. Would you like to learn more about safe online shopping?";
    }
    
    return "I'm here to help you learn about digital technology! I can assist with smartphone basics, online security, email, social media, video calling, and online shopping. What would you like to know more about?";
  }
}; 