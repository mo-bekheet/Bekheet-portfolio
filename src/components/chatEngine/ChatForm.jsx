import { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse, handleFileUpload }) => {
  const inputRef = useRef();
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    // Update chat history with the user's message
    setChatHistory((history) => [...history, { role: "user", text: userMessage }]);
    // Delay 600 ms before showing "Thinking..." and generating response
    setTimeout(() => {
      // Add a "Thinking..." placeholder for the bot's response
      setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
      // Call the function to generate the bot's response
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
    }, 600);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <form onSubmit={handleFormSubmit} className="chat-form">
      <input ref={inputRef} placeholder="Message..." className="message-input" required />
      <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleFileChange} />
      <label htmlFor="file-upload" className="file-upload-label">
        <span className="material-symbols-rounded">attach_file</span>
      </label>
      <button type="submit" id="send-message" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default ChatForm;