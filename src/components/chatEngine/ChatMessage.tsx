import React from 'react';
import { motion } from 'framer-motion';
import AgentAvatar from './AgentAvatar';
import PropTypes from 'prop-types';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  imageUrl?: string;
  logoUrl?: string;
  onCall?: () => void;
  timestamp?: string;
  agentType?: 'support' | 'sales' | 'general';
  isOnline?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isBot,
  imageUrl,
  logoUrl,
  onCall,
  timestamp,
  agentType = 'general',
  isOnline = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isBot ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`chat-message-container ${isBot ? 'bot' : 'user'}`}
    >
      {isBot ? (
        <AgentAvatar
          isOnline={isOnline}
          size="medium"
          agentType={agentType}
          logoUrl={logoUrl}
        />
      ) : (
        <AgentAvatar
          isOnline={isOnline}
          size="medium"
          logoUrl={logoUrl}
        />
      )}
      <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
        {imageUrl && (
          <div className="message-image">
            <img src={imageUrl} alt="Message attachment" />
          </div>
        )}
        <div className="message-content">
          {message}
          {timestamp && <span className="message-timestamp">{timestamp}</span>}
        </div>
        {onCall && (
          <motion.button 
            className="call-button"
            onClick={onCall}
            aria-label="Start call"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className="fas fa-phone"></i>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.string.isRequired,
  isBot: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string,
  logoUrl: PropTypes.string,
  onCall: PropTypes.func,
  timestamp: PropTypes.string,
  agentType: PropTypes.oneOf(['support', 'sales', 'general']),
  isOnline: PropTypes.bool
};

export default ChatMessage; 