"use client";
import { useState, useEffect } from "react";

export default function DailyArticlesPage() {
  // Dummy data for today's articles (dates as placeholders)
  const [articles, setArticles] = useState([
    {
      title: "AI Article #1",
      date: "--/--/----",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Vivamus euismod, nisi eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`,
      summary: `Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`,
    },
    {
      title: "AI Article #2",
      date: "--/--/----",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Vivamus euismod, nisi eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`,
      summary: `Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`,
    },
    {
      title: "AI Article #3",
      date: "--/--/----",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Vivamus euismod, nisi eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`,
      summary: `Summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.`,
    },
  ]);

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString("en-GB"); // e.g. 12/06/2025
    setArticles((arts) => arts.map(a => ({ ...a, date: formatted })));
  }, []);

  const [selected, setSelected] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hi! I am your Article Assistant. Ask me anything about today's articles." },
    { sender: "user", text: "Can you summarize Article #1 in one line?" },
    { sender: "bot", text: "Sure! Article #1 is about lorem ipsum and best practices in AI writing." },
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((msgs) => [
      ...msgs,
      { sender: "user", text: chatInput },
      { sender: "bot", text: "(AI bot reply placeholder for: " + chatInput + ")" },
    ]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#112240] to-[#0a0a23] flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-blue-300 mb-8 text-center">Articles of the Day</h1>
      <div className={`w-full max-w-7xl flex ${selected !== null ? 'flex-row gap-8' : 'flex-col gap-8'} mb-12 transition-all duration-300`}>
        {/* Article List (left) */}
        <div className={`${selected !== null ? 'w-1/3 items-start' : 'w-full'} flex flex-col gap-6 transition-all duration-300`}>
          {articles.map((article, idx) => (
            <div
              key={idx}
              className={`bg-[#181f36] rounded-2xl shadow-xl border border-blue-900 transition-all duration-300 cursor-pointer ${selected !== null ? 'p-4 text-base min-h-[80px] max-h-[120px] overflow-hidden' : 'p-8 text-lg'} ${selected === idx ? 'ring-2 ring-blue-400 scale-105' : 'hover:shadow-2xl'}`}
              onClick={() => setSelected(idx)}
              style={{ minWidth: selected !== null ? '180px' : undefined }}
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-extrabold text-white text-lg truncate">{article.title}</h2>
                <span className="text-xs text-blue-300 font-mono">{article.date}</span>
              </div>
              <p className="text-gray-300 leading-snug line-clamp-2">{article.content}</p>
            </div>
          ))}
        </div>
        {/* Summary (right) */}
        {selected !== null && (
          <div className="w-2/3 bg-[#232b4a] rounded-2xl shadow-2xl p-12 flex flex-col max-h-[80vh] min-h-[500px] overflow-y-scroll border border-blue-900 animate-fade-in transition-all duration-300 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-900">
            <h2 className="text-4xl font-bold text-green-300 mb-2">Summary</h2>
            <h3 className="text-2xl font-semibold text-white mb-1">{articles[selected].title}</h3>
            <span className="text-base text-blue-300 font-mono mb-4">{articles[selected].date}</span>
            <div className="text-gray-200 text-xl leading-relaxed whitespace-pre-line mb-6">
              {articles[selected].summary}
            </div>
            <div className="text-gray-400 text-lg leading-relaxed whitespace-pre-line">
              <span className="font-semibold text-blue-400">Full Article:</span>
              <br />
              {articles[selected].content}
            </div>
            <button
              className="mt-8 px-4 py-2 rounded-lg border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 self-end"
              onClick={() => setSelected(null)}
            >
              Back to All Articles
            </button>
          </div>
        )}
      </div>
      <div className="flex gap-6 justify-center mt-8">
        <button className="px-6 py-2 rounded-lg border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Prev 1 Month</button>
        <button className="px-6 py-2 rounded-lg border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Prev 2 Month</button>
        <button className="px-6 py-2 rounded-lg border-2 border-blue-400 text-blue-400 font-semibold hover:bg-blue-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400">Prev 3 Month</button>
      </div>
    </div>
  );
}
