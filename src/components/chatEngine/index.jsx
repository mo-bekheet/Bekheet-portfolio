import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import ChatMessage from './ChatMessage';
import ChatService from './ChatService';
import './ChatBot.css';

const INITIAL_MESSAGE = "Hi! I'm your AI assistant. How can I help you today?";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [systemOnline, setSystemOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkSystem = async () => {
      const status = await ChatService.getSystemStatus();
      setSystemOnline(status);
    };

    if (isOpen && messages.length === 0) {
      setMessages([{ text: INITIAL_MESSAGE, isBot: true }]);
      checkSystem();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || !systemOnline) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ChatService.sendMessage(userMessage);
      setMessages(prev => [...prev, { text: response.message || response.text, isBot: true }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        isBot: true 
      }]);
      setSystemOnline(false);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chatbot-header">
              <div className="header-content">
                <FaRobot className="bot-icon" />
                <span>AI Assistant</span>
                {!systemOnline && (
                  <span className="system-status offline">Offline</span>
                )}
              </div>
              <FaTimes className="close-button" onClick={() => setIsOpen(false)} />
            </div>

            <div className="messages-container">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg.text}
                  isBot={msg.isBot}
                />
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="input-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={systemOnline ? "Type your message..." : "System is offline"}
                className="message-input"
                disabled={!systemOnline}
              />
              <button 
                type="submit" 
                className="send-button" 
                disabled={!input.trim() || !systemOnline}
              >
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaRobot />
      </motion.button>
    </>
  );
};

export default Chatbot;