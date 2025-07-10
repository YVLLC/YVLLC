import { useState } from "react";
const PRESET_FAQS = [
  { q: "How long does delivery take?", a: "Orders start within minutes and finish in 1–6 hours. We notify you instantly." },
  { q: "Is it safe?", a: "Yes. No login or password needed. SSL-secured and refill guaranteed." },
  { q: "What if followers drop?", a: "30-day refill for free. Just tap 'Refill' in your order list." },
  { q: "Can I get a refund?", a: "If your order doesn't deliver, you get a full refund automatically." },
  { q: "How does payment work?", a: "Stripe-secured checkout. We never see your card info." }
];
export default function AiBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! 👋 I’m your support bot. Ask about delivery, safety, payment, refills, refunds, or anything else!" }
  ]);
  const [loading, setLoading] = useState(false);
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(msgs => [...msgs, { sender: "user", text: input }]);
    setLoading(true);
    let found = PRESET_FAQS.find(f => input.toLowerCase().includes(f.q.split(' ')[2]));
    let answer = found ? found.a : "I'm here to help 24/7. Please ask about orders, delivery, safety, payment, or refills!";
    setTimeout(() => {
      setMessages(msgs => [...msgs, { sender: "bot", text: answer }]);
      setLoading(false);
    }, 500);
    setInput("");
  }
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-6 right-6 bg-gradient-to-br from-blue-600 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition"
        aria-label="Open Support Chat"
      >💬</button>
      {open && (
        <div className="fixed z-50 bottom-24 right-7 w-80 max-w-[95vw] rounded-2xl shadow-2xl bg-white dark:bg-[#1e2633] border border-blue-100 dark:border-[#222c38] flex flex-col animate-fadein">
          <div className="flex justify-between items-center p-4 border-b dark:border-[#232a31]">
            <span className="font-extrabold text-blue-600 dark:text-blue-300 text-lg">Support AI</span>
            <button onClick={() => setOpen(false)} className="text-2xl font-bold text-blue-400">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: 300 }}>
            {messages.map((msg, i) =>
              <div key={i} className={`mb-2 ${msg.sender === "bot" ? "text-left" : "text-right"}`}>
                <span className={`inline-block px-3 py-2 rounded-xl ${msg.sender === "bot"
                  ? "bg-blue-50 dark:bg-[#232a31] text-blue-700 dark:text-blue-200"
                  : "bg-gradient-to-r from-blue-600 to-pink-400 text-white"
                }`}>
                  {msg.text}
                </span>
              </div>
            )}
            {loading && <div className="text-blue-300 text-sm py-2">typing…</div>}
          </div>
          <form className="flex p-3 border-t dark:border-[#232a31]" onSubmit={handleSend}>
            <input
              className="flex-1 px-3 py-2 rounded-xl bg-blue-50 dark:bg-[#181f25] text-black dark:text-white border-none outline-none"
              placeholder="Ask a question…"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className="ml-2 bg-gradient-to-r from-blue-600 to-pink-400 text-white px-3 py-2 rounded-xl font-bold" type="submit">Send</button>
          </form>
        </div>
      )}
    </>
  );
}
