import { useEffect, useRef, useState } from "react";
import { ANTHROPIC_PROXY_URL, LOG_ENDPOINT } from "../../config/endpoints.js";
import { NRI_SYSTEM_PROMPT, NRI_PROMPT_VERSION } from "../../config/aiPrompts.js";
import MessageBubble from "./MessageBubble.jsx";
import EnquiryModal from "../Shared/EnquiryModal.jsx";
import InfoBox from "../Shared/InfoBox.jsx";
import { Link } from "react-router-dom";

function sessionId() {
  if (typeof window === "undefined") return "ssr";
  const k = "nri-desk-session";
  let v = localStorage.getItem(k);
  if (!v) {
    v = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(k, v);
  }
  return v;
}

async function logTurn(turn) {
  if (!LOG_ENDPOINT) {
    console.info("[Chat log — dev stub]", turn);
    return;
  }
  try {
    await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turn),
    });
  } catch (e) {
    console.warn("Chat log failed", e);
  }
}

async function callAssistant(messages) {
  // Hits a backend proxy that holds the Anthropic API key.
  // If no proxy is configured, falls back to a stub reply so the UI is testable.
  try {
    const res = await fetch(ANTHROPIC_PROXY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: NRI_SYSTEM_PROMPT,
        promptVersion: NRI_PROMPT_VERSION,
        messages,
      }),
    });
    if (!res.ok) throw new Error(`Proxy ${res.status}`);
    const data = await res.json();
    return data.content || data.reply || "";
  } catch (e) {
    console.warn("Anthropic proxy unavailable; using dev stub", e);
    const last = messages[messages.length - 1]?.content?.toLowerCase() || "";
    if (last.includes("indexation") || last.includes("grandfather")) {
      return "Indexation and the grandfathering option do not apply to NRIs after Finance Act 2024. NRIs pay 12.5% flat LTCG on long-term property gains (24+ months).";
    }
    if (last.includes("rate") || last.includes("ltcg") || last.includes("capital gain")) {
      return "For NRIs, long-term capital gains on property are taxed at 12.5% flat (no indexation) under Finance Act 2024. Holding period for long-term: 24 months. TDS under Section 195 applies to the full sale consideration, not the gain.";
    }
    if (last.includes("buyer") || last.includes("form")) {
      return "The buyer must obtain a TAN, deduct TDS under Section 195, deposit it via Form 27Q, and issue Form 16A to the seller. Form 26QB is only for buying from a resident.";
    }
    return "(Dev mode — backend proxy not yet configured. Configure VITE_ANTHROPIC_PROXY_URL.)";
  }
}

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [referral, setReferral] = useState(false);
  const sid = useRef(sessionId()).current;
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    const userTurn = { role: "user", content: text };
    const next = [...messages, userTurn];
    setMessages(next);
    setInput("");
    setBusy(true);
    logTurn({ sessionId: sid, role: "user", message: text, timestamp: new Date().toISOString() });

    const reply = await callAssistant(next);
    const assistantTurn = { role: "assistant", content: reply };
    setMessages([...next, assistantTurn]);
    logTurn({ sessionId: sid, role: "assistant", message: reply, timestamp: new Date().toISOString() });
    setBusy(false);
  }

  return (
    <div className="flex h-[70dvh] flex-col rounded-lg border border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-4 py-3">
        <h2 className="text-base font-semibold text-slate-900">Ask about NRI property tax</h2>
        <p className="mt-1 text-xs text-slate-500">
          Conversations may be logged to improve our service. See our{" "}
          <Link to="/privacy" className="text-brand underline">
            Privacy Notice
          </Link>
          .
        </p>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <InfoBox tone="info" title="Welcome">
            Ask about LTCG on NRI property, TDS under Section 195, repatriation routes, or Section 197 — and I will
            point you to the right team member where appropriate.
          </InfoBox>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} onSpeakToTeam={() => setReferral(true)} />
        ))}
        {busy && <div className="text-xs text-slate-500">Thinking…</div>}
      </div>

      <div className="border-t border-slate-200 bg-white p-3">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type your question…"
            className="min-h-[44px] flex-1 rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            onClick={send}
            disabled={busy}
            className="min-h-[44px] rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>

      <EnquiryModal open={referral} onClose={() => setReferral(false)} service="chat_referral" title="Speak to our team" />
    </div>
  );
}
