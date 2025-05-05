import React from 'react';
import { motion } from 'framer-motion';
import ChatbotAvatar from './ChatbotAvatar';

const ChatMessage = ({ message, isBot }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isBot ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`chat-message-container ${isBot ? 'bot' : 'user'}`}
    >
      <ChatbotAvatar isBot={isBot} />
      <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
        {message}
      </div>
    </motion.div>
  );
};

export default ChatMessage;