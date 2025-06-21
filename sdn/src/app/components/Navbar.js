"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hi! I am AskGPT. How can I help you today?" },
  ]);
  const [chatInput, setChatInput] = useState("");

  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleChatSend = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
  
    const userMessage = { sender: "user", text: chatInput };
    setChatMessages((msgs) => [...msgs, userMessage]);
    console.log("API Key:", process.env.GEMINI_API_KEY);
    // Call backend Gemini API
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });
  
      const data = await res.json();
      const botMessage = { sender: "bot", text: data.reply };
  
      setChatMessages((msgs) => [...msgs, botMessage]);
    } catch (err) {
      setChatMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Sorry, something went wrong." },
      ]);
    }
  
    setChatInput("");
  };

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      router.push('/auth');
    } else {
      router.push('/auth');
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4 bg-black backdrop-blur-md">
        <Link href="/" className="text-3xl font-bold text-blue-300 tracking-tight hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-400 rounded">
          <span className="text-cyan-400">&lt;</span>SystemDesign_letter<span className="text-purple-400">&gt;</span>
        </Link>
        <div className="flex-1 flex justify-center">
          <Link
            href="/dailyarticles"
            className="px-6 py-2 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
          >
            Articles of the Day
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleAuthClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          >
            {isLoggedIn ? 'Sign Out' : 'Sign In'}
          </button>
          <button
            className="px-4 py-2 rounded-lg border-2 border-green-400 text-green-400 font-bold hover:bg-green-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 ml-2"
            onClick={() => setShowChat((v) => !v)}
          >
            AskGPT
          </button>
        </div>
      </nav>
      {/* Chat panel overlay */}
      {showChat && (
        <div className="fixed top-0 right-0 h-full w-full max-w-md z-[100] flex flex-col bg-gradient-to-br from-[#232b4a80] via-[#0a0a2380] to-[#232b4a80] backdrop-blur-lg border-l-2 border-green-400 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between px-6 py-4 border-b border-green-400 bg-transparent">
            <span className="text-2xl font-bold text-green-300">AskGPT</span>
            <button
              className="text-green-400 font-bold text-xl hover:text-green-200 focus:outline-none"
              onClick={() => setShowChat(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-green-900">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-lg max-w-[70%] font-bold ${msg.sender === "user" ? "bg-green-500 text-white" : "bg-green-100 text-green-900"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSend} className="flex items-center gap-2 px-6 py-4 border-t border-green-400 bg-transparent">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2 rounded bg-[#10182a80] text-white border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 font-bold"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
} 