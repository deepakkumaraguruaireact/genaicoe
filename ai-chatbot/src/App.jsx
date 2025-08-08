import React, { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./ChatbotIcon";
import MissionController from "./MissionController"; // ⬅️ Add this
import "./MissionController.css"; // ⬅️ CSS import if not global

const initialMessages = [
  { type: "bot", text: "Hi There. Good morning!" },
  { type: "user", text: "Good morning! What is RAG" },
  {
    type: "bot",
    text: "RAG stands for Retrieval-Augmented Generation. It’s an AI architecture that combines information retrieval with text generation, allowing a language model like ChatGPT to generate more accurate and relevant responses by accessing external data sources (like documents, websites, or databases) during inference.",
  },
  {
    type: "user",
    text: "Google RAG Ecosystem Overview in table format",
  },
  {
    type: "bot",
    text: "Here's a table for you:",
    contentType: "table",
    table: [
      [
        "Retriever",
        "Vertex AI Vector Search",
        "Finds relevant chunks from indexed documents based on user query.",
      ],
      [
        "Embedding",
        "Vertex AI Embeddings / Gemini",
        "Converts text/documents into vector representations for similarity search.",
      ],
      [
        "Document Loader",
        "Vertex AI Search / Gen App Builder",
        "Uploads and processes documents (PDFs, websites, etc.) into searchable format.",
      ],
      [
        "Generator (LLM)",
        "Gemini / PaLM (via Vertex AI)",
        "Uses the retrieved context to generate human-like responses.",
      ],
      [
        "End-to-End No-Code",
        "Vertex AI Search (Gen App Builder)",
        "Out-of-the-box RAG with UI and API. Suitable for building chatbots quickly.",
      ],
      [
        "Custom RAG Pipelines",
        "Vertex AI + LangChain + Embeddings + Gemini",
        "For developers building tailored RAG apps using Google’s modular tools.",
      ],
      [
        "Multimodal Support",
        "Gemini 1.5 Pro",
        "Accepts images, text, PDFs, audio, video transcripts for advanced retrieval.",
      ],
      [
        "Security & Grounding",
        "Google Cloud + Vertex AI",
        "Controls grounding sources, enterprise security, data isolation.",
      ],
    ],
  },
  { type: "user", text: "Show me an image of google gen ai flowchart." },
  {
    type: "bot",
    text: "Here is the image:",
    contentType: "image",
    imageUrl:
      "https://substackcdn.com/image/fetch/$s_!lIAr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6a64c9fb-afaf-46d7-aabc-ca34adb17649_1600x1200.png",
  },
  { type: "user", text: "Thanks! Looks great!" },
  { type: "bot", text: "Glad you liked it! Need help with anything else?" },
  { type: "user", text: "No, that's all for now. Thanks!" },
  { type: "bot", text: "You're welcome! Have a great day!" },
];

const App = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scroll = () => {
      if (chatBodyRef.current) {
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    };
    const timeout = setTimeout(scroll, 50);
    return () => clearTimeout(timeout);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    const botMessage = { type: "bot", text: "Bot reply: " + input };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, botMessage];
        setTimeout(() => scrollToBottom(), 0);
        return newMessages;
      });
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="container">
      <button onClick={() => setIsOpen(!isOpen)} className="toggle-button">
        {isOpen ? "Close Chat" : "Open Chat"}
      </button>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="app-text">Gen AI assistant</h2>

              <div className="hamburger-menu" onClick={() => setMenuOpen(true)}>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <button
                className="material-symbols-outlined"
                onClick={() => setIsOpen(false)}
              >
                keyboard_arrow_down
              </button>
            </div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`message ${
                  msg.type === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.type === "bot" && <ChatbotIcon />}
                {msg.contentType === "table" ? (
                  <table className="message-table">
                    <tr>
                      <th>Component</th>
                      <th>Google Product/Tool</th>
                      <th>Purpose</th>
                    </tr>
                    <tbody>
                      {msg.table.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : msg.contentType === "image" ? (
                  <>
                    <p className="message-text">{msg.text}</p>
                    <img
                      src={msg.imageUrl}
                      alt="chat-img"
                      style={{ maxWidth: 120, borderRadius: 8 }}
                    />
                  </>
                ) : (
                  <p className="message-text">{msg.text}</p>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="message bot-message">
                <ChatbotIcon />
                <p className="message-text typing">Typing...</p>
              </div>
            )}
            {menuOpen && (
              <MissionController closeMenu={() => setMenuOpen(false)} />
            )}
          </div>

          <div className="chat-footer">
            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Message..."
                className="message-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
              <button className="material-symbols-outlined" type="submit">
                arrow_upward
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
