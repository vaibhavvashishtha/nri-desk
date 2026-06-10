import { useState } from "react";

const COUNTRIES = {
  US: { name: "United States", article: "Article 13", note: "India retains right to tax property gain; US allows foreign tax credit." },
  UK: { name: "United Kingdom", article: "Article 14", note: "India taxes the gain; relief via UK foreign tax credit." },
  UAE: { name: "United Arab Emirates", article: "Article 13", note: "UAE typically does not tax individual capital gains; Indian tax stands." },
  CA: { name: "Canada", article: "Article 13", note: "Credit available in Canada for Indian tax paid." },
  AU: { name: "Australia", article: "Article 13", note: "Credit available in Australia for Indian tax paid." },
  SG: { name: "Singapore", article: "Article 13", note: "Singapore typically does not tax individual capital gains; Indian tax stands." },
};

export default function DTAASection() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("US");
  const c = COUNTRIES[country];

  return (
    <details
      className="rounded-lg border border-slate-200 bg-white"
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-900">
        Double Taxation Avoidance Agreement (DTAA)
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-4 py-3 text-sm text-slate-700">
        <p>
          India has DTAA with 90+ countries — tax paid in India can typically be credited against tax due in your
          country of residence, avoiding double taxation. To claim relief: obtain a Tax Residency Certificate (TRC)
          from your country and file <strong>Form 10F</strong> with the Indian tax authority.
        </p>
        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">
            Country of residence
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="min-h-[44px] w-full rounded border border-slate-300 px-3 py-2 sm:w-60"
          >
            {Object.entries(COUNTRIES).map(([k, v]) => (
              <option key={k} value={k}>
                {v.name}
              </option>
            ))}
          </select>
        </label>
        <div className="rounded border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">{c.name} · DTAA</div>
          <div className="mt-1 font-semibold text-slate-900">{c.article}</div>
          <p className="mt-1 text-sm text-slate-700">{c.note}</p>
        </div>
        <p className="text-xs text-slate-500">
          DTAA relief varies by country and individual circumstances. Confirm with a CA in your country of residence.
        </p>
      </div>
    </details>
  );
}
