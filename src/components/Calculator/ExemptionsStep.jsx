import { EXEMPTION_CAPS } from "../../config/taxRates.js";
import { formatINR } from "../../utils/format.js";

export default function ExemptionsStep({ state, onChange }) {
  const set = (k) => (e) => onChange({ ...state, [k]: e.target.value });
  const setBool = (k) => (e) => onChange({ ...state, [k]: e.target.checked });

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <header>
        <h3 className="text-base font-semibold text-slate-900">Exemptions</h3>
        <p className="text-sm text-slate-600">
          Reinvest part of the gain to reduce or eliminate the tax. Caps applied automatically.
        </p>
      </header>

      <Row
        title="Section 54"
        sub={`Residential house in India only — cap ${formatINR(EXEMPTION_CAPS.section54)}.`}
      >
        <input
          type="number"
          inputMode="numeric"
          value={state.section54}
          onChange={set("section54")}
          placeholder="₹ invested"
          className="min-h-[44px] w-40 rounded border border-slate-300 px-3 py-2"
        />
        <label className="ml-3 inline-flex items-center gap-2 text-sm text-slate-700" title="Section 54 requires the new residential house to be in India. Property abroad does not qualify.">
          <input type="checkbox" checked={state.section54LocationInIndia} onChange={setBool("section54LocationInIndia")} />
          New house is in India
        </label>
      </Row>

      <Row title="Section 54F" sub={`Any long-term asset — cap ${formatINR(EXEMPTION_CAPS.section54F)}.`}>
        <input
          type="number"
          inputMode="numeric"
          value={state.section54F}
          onChange={set("section54F")}
          placeholder="₹ invested"
          className="min-h-[44px] w-40 rounded border border-slate-300 px-3 py-2"
        />
      </Row>

      <Row
        title="Section 54EC"
        sub={`NHAI/REC/PFC/IRFC bonds within 6 months — cap ${formatINR(EXEMPTION_CAPS.section54EC)}.`}
      >
        <input
          type="number"
          inputMode="numeric"
          value={state.section54EC}
          onChange={set("section54EC")}
          placeholder="₹ invested"
          className="min-h-[44px] w-40 rounded border border-slate-300 px-3 py-2"
        />
      </Row>
    </div>
  );
}

function Row({ title, sub, children }) {
  return (
    <div className="flex flex-col gap-1 border-t border-slate-100 pt-3 first:border-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-500">{sub}</div>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
}
