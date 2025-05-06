import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaHeadset, FaUserTie } from 'react-icons/fa';
import './AgentAvatar.css';

interface AgentAvatarProps {
  isOnline?: boolean;
  size?: 'small' | 'medium' | 'large';
  agentType?: 'support' | 'sales' | 'general';
  logoUrl?: string;
}

const AgentAvatar: React.FC<AgentAvatarProps> = ({
  isOnline = true,
  size = 'medium',
  agentType = 'general',
  logoUrl
}) => {
  const sizeMap = {
    small: '40px',
    medium: '60px',
    large: '80px'
  };

  const getAgentIcon = () => {
    switch (agentType) {
      case 'support':
        return <FaHeadset className="agent-icon" />;
      case 'sales':
        return <FaUserTie className="agent-icon" />;
      default:
        return <FaRobot className="agent-icon" />;
    }
  };

  return (
    <motion.div
      className="agent-avatar-container"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <motion.div
        className={`agent-avatar ${size} ${agentType}`}
        style={{ width: sizeMap[size], height: sizeMap[size] }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {logoUrl ? (
          <img src={logoUrl} alt="Agent Avatar" className="agent-image" />
        ) : (
          getAgentIcon()
        )}
        {isOnline && (
          <motion.div
            className="status-indicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.div>
      <motion.div
        className="pulse-ring"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
    </motion.div>
  );
};

export default AgentAvatar; 