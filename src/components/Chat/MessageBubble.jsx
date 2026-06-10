import DisclaimerLine from "./DisclaimerLine.jsx";

export default function MessageBubble({ role, content, onSpeakToTeam }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser ? "bg-brand text-white" : "bg-white text-slate-800 ring-1 ring-slate-200"
        }`}
      >
        <div className="whitespace-pre-wrap">{content}</div>
        {!isUser && (
          <>
            <DisclaimerLine />
            <button
              onClick={onSpeakToTeam}
              className="mt-2 rounded border border-brand px-3 py-1 text-xs font-semibold text-brand"
            >
              Speak to our team
            </button>
          </>
        )}
      </div>
    </div>
  );
}
