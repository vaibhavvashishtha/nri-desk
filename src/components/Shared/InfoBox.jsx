export default function InfoBox({ title, tone = "info", children }) {
  const tones = {
    info: "border-blue-200 bg-blue-50 text-blue-900",
    warn: "border-amber-300 bg-amber-50 text-amber-900",
    success: "border-emerald-300 bg-emerald-50 text-emerald-900",
    note: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return (
    <div className={`rounded-lg border p-4 text-sm leading-relaxed ${tones[tone] || tones.info}`}>
      {title && <div className="mb-1 font-semibold">{title}</div>}
      <div>{children}</div>
    </div>
  );
}
