export default function DocumentChecklist({ docs, on15CB }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-base font-semibold text-slate-900">Document checklist</h3>
      <ul className="mt-2 space-y-1 text-sm text-slate-700">
        {docs.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="text-slate-400">•</span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={on15CB}
        className="mt-3 min-h-[44px] rounded-md bg-brand-accent px-4 py-2 text-sm font-semibold text-white"
      >
        Get your Form 15CB from Narula Gupta &amp; Co.
      </button>
    </div>
  );
}
