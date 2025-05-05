const isDevelopment = import.meta.env.DEV;
const CHAT_API_URL = isDevelopment ? '/api/chat' : '/.netlify/functions/chat-proxy';

class ChatService {
  static async sendMessage(message) {
    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  static async getSystemStatus() {
    try {
      const response = await fetch('/api/status');
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default ChatService;