// Simple AI service using Vercel AI SDK
// Add your OpenAI API key to .env: VITE_OPENAI_API_KEY=your_key_here

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface AIResponse {
  success: boolean;
  text: string;
  error?: string;
}

export class AIService {
  static async generateResponse(userInput: string): Promise<AIResponse> {
    try {
      if (!OPENAI_API_KEY) {
        return {
          success: false,
          text: "OpenAI API key not configured. Add VITE_OPENAI_API_KEY to your .env file.",
          error: "API_KEY_MISSING",
        };
      }

      const systemPrompt =
        "You are a helpful AI fitness and health coach assistant. Provide clear, accurate, and helpful responses about fitness, nutrition, workouts, and general health. " +
        "If the query is not related to fitness, nutrition, health, or wellness, respond with " +
        "'I'm sorry, I can only help with fitness, nutrition, and health related questions.'" +
        "You're not a medical advisor, so don't give medical advices.";

      const userPrompt = `
      User: ${userInput}
      `;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "user",
                content: userPrompt,
              },
            ],
            max_tokens: 1000,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content;

      if (!aiResponse) {
        throw new Error("No response from AI");
      }

      return {
        success: true,
        text: aiResponse,
      };
    } catch (error) {
      console.error("Error generating response", error);
      return {
        success: false,
        text: "Error generating response",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}
