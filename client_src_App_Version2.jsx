import React, { useState } from "react";
import "./App.css";

function App() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [imgPrompt, setImgPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [vidPrompt, setVidPrompt] = useState("");
  const [vidUrl, setVidUrl] = useState("");

  const handleChat = async () => {
    setChatHistory([...chatHistory, { role: "user", content: chatInput }]);
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ prompt: chatInput }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setChatHistory([...chatHistory, { role: "user", content: chatInput }, { role: "bot", content: data.response }]);
    setChatInput("");
  };

  const handleImage = async () => {
    const res = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({ prompt: imgPrompt }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setImgUrl(data.url);
  };

  const handleVideo = async () => {
    const res = await fetch("/api/video", {
      method: "POST",
      body: JSON.stringify({ prompt: vidPrompt }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setVidUrl(data.url);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">IRIS AI</h1>
      <p className="mb-8">Your free AI assistant for chatting, creating images, and videos!</p>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Chatbot</h2>
        <div className="border rounded p-2 mb-2 h-40 overflow-y-auto">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={msg.role === "user" ? "text-blue-700" : "text-green-700"}>
              <b>{msg.role === "user" ? "You" : "IRIS"}:</b> {msg.content}
            </div>
          ))}
        </div>
        <input
          className="border rounded p-2 w-2/3"
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          placeholder="Ask IRIS anything..."
        />
        <button className="ml-2 p-2 bg-blue-500 text-white rounded" onClick={handleChat}>Send</button>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Image Generator</h2>
        <input
          className="border rounded p-2 w-2/3"
          value={imgPrompt}
          onChange={e => setImgPrompt(e.target.value)}
          placeholder="Describe an image..."
        />
        <button className="ml-2 p-2 bg-purple-500 text-white rounded" onClick={handleImage}>Create</button>
        {imgUrl && <div className="mt-4"><img src={imgUrl} alt="Generated" className="max-w-xs rounded" /></div>}
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-2">Video Generator</h2>
        <input
          className="border rounded p-2 w-2/3"
          value={vidPrompt}
          onChange={e => setVidPrompt(e.target.value)}
          placeholder="Describe a video..."
        />
        <button className="ml-2 p-2 bg-teal-500 text-white rounded" onClick={handleVideo}>Create</button>
        {vidUrl && <div className="mt-4">
          <video src={vidUrl} controls className="max-w-xs rounded" />
        </div>}
      </section>
    </div>
  );
}

export default App;