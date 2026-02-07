import GeminiService from './GenAI';

let geminiService = null;

class ChatService {
  static async initializeChat() {
    if (!geminiService) {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('Gemini API key not found in environment variables');
        }
        
        geminiService = new GeminiService(apiKey);
      } catch (error) {
        console.error('Error initializing Gemini service:', error);
        throw error;
      }
    }
  }

  static async sendMessage(message) {
    try {
      await this.initializeChat();

      const responseText = await geminiService.sendMessage(message);
      
      return { message: responseText };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      throw error;
    }
  }

  static async getSystemStatus() {
    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('Gemini API key not found in environment variables');
        return false;
      }
      
      // Try to initialize the service as a basic connectivity test
      const testService = new GeminiService(apiKey);
      const responseText = await testService.sendMessage("Hello");
      
      return !!responseText;
    } catch (error) {
      console.error('Error checking Gemini system status:', error);
      return false;
    }
  }
}

export default ChatService;