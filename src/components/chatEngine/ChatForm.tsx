import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ChatFormProps {
  chatHistory: Array<{ role: string; text: string }>;
  setChatHistory: (history: Array<{ role: string; text: string }>) => void;
  generateBotResponse: (history: Array<{ role: string; text: string }>) => void;
  handleFileUpload: (file: File) => void;
}

const ChatForm: React.FC<ChatFormProps> = ({
  chatHistory,
  setChatHistory,
  generateBotResponse,
  handleFileUpload,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim();
    if (!userMessage) return;
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    
    setChatHistory([...chatHistory, { role: "user", text: userMessage }]);
    
    setTimeout(() => {
      setChatHistory([...chatHistory, { role: "user", text: userMessage }, { role: "model", text: "Thinking..." }]);
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
    }, 600);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL for images
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }

    handleFileUpload(file);
  };

  const removePreview = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      {previewUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="file-preview"
        >
          <img src={previewUrl} alt="Preview" />
          <button type="button" onClick={removePreview} className="remove-preview">
            ×
          </button>
        </motion.div>
      )}
      <input
        ref={inputRef}
        placeholder="Message..."
        className="message-input"
        required
      />
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <label htmlFor="file-upload" className="file-upload-label">
        <span className="material-symbols-rounded">attach_file</span>
      </label>
      <motion.button
        type="submit"
        id="send-message"
        className="material-symbols-rounded"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        arrow_upward
      </motion.button>
    </form>
  );
};

export default ChatForm; 