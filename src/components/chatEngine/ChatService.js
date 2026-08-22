const CHAT_PROXY_URL = '/.netlify/functions/chat-proxy';

class ChatService {
  static async sendMessage(message) {
    try {
      const response = await fetch(CHAT_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Chat service request failed');
      }

      return { message: data.reply };
    } catch (error) {
      console.error('Error sending message to chat service:', error);
      throw error;
    }
  }

  static async getSystemStatus() {
    try {
      const response = await fetch(CHAT_PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello' }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      return typeof data.reply === 'string' && data.reply.length > 0;
    } catch (error) {
      console.error('Error checking chat system status:', error);
      return false;
    }
  }
}

export default ChatService;
