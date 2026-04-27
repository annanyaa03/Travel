import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// System prompt for travel assistant
const SYSTEM_PROMPT = `You are Compass AI,
a luxury travel assistant for Compass & Co.
travel website. You are knowledgeable about:

- Travel destinations worldwide (100+)
- Luxury hotels and boutique stays
- Flight routes and airlines
- Visa requirements for all countries
- Best times to visit destinations
- Budget tips and travel hacks
- Local cuisine and culture
- Activities and experiences
- Packing advice
- Travel insurance
- Currency and money tips
- Health and safety tips
- Itinerary planning

Your personality:
- Warm, helpful, and enthusiastic
- Knowledgeable and professional
- Give specific, actionable advice
- Mention specific destinations, hotels,
  airlines when relevant
- Keep responses concise (2-4 paragraphs max)
- Use occasional travel emojis naturally
- If asked about booking, direct users to
  the Destinations, Hotels, or Flights
  pages of Compass & Co.

Always be helpful and inspiring about travel.
Never refuse travel-related questions.
For non-travel questions, gently redirect
to travel topics.`;

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Build conversation history
    const conversationHistory = [
      {
        role: 'system',
        content: SYSTEM_PROMPT
      }
    ];

    // Add previous messages for context
    if (messages && Array.isArray(messages)) {
      messages.slice(-10).forEach(msg => {
        conversationHistory.push({
          role: msg.role,
          content: msg.content
        });
      });
    }

    // Add current user message
    conversationHistory.push({
      role: 'user',
      content: userMessage.trim()
    });

    // Call OpenAI API
    const completion = await 
      openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversationHistory,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

    const aiResponse = 
      completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      message: aiResponse,
      usage: completion.usage
    });

  } catch (error) {
    console.error('AI chat error:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(401).json({
        success: false,
        message: 'AI service configuration error'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please wait a moment.'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'AI service temporarily unavailable. Please try again.'
    });
  }
});

export default router;
