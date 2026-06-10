import { PROPERTY_TYPES } from "../../utils/taxCalculator.js";

const PROPERTY_OPTIONS = [
  { value: PROPERTY_TYPES.STANDARD, label: "Standard purchase" },
  { value: PROPERTY_TYPES.INHERITED, label: "Inherited property" },
  { value: PROPERTY_TYPES.PRE_2001, label: "Acquired before 1 April 2001" },
];

export default function CalculatorForm({ state, onChange }) {
  const set = (k) => (e) =>
    onChange({ ...state, [k]: e.target.type === "number" ? e.target.value : e.target.value });

  return (
    <div className="space-y-5">
      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Property</h3>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Property type</span>
          <select
            value={state.propertyType}
            onChange={set("propertyType")}
            className="min-h-[44px] w-full rounded border border-slate-300 px-3 py-2"
          >
            {PROPERTY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        {state.propertyType === PROPERTY_TYPES.INHERITED && (
          <p className="mt-2 text-xs text-slate-600">
            Holding period starts from the <strong>previous owner&apos;s</strong> acquisition date, and the cost is what
            the previous owner paid.
          </p>
        )}
        {state.propertyType === PROPERTY_TYPES.PRE_2001 && (
          <p className="mt-2 text-xs text-slate-600">
            You may use either the original purchase cost or the Fair Market Value as on 1 April 2001 — whichever is
            higher. The calculator will pick the higher figure automatically.
          </p>
        )}
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {state.propertyType === PROPERTY_TYPES.STANDARD && (
          <NumberField label="Purchase price (₹)" value={state.purchasePrice} onChange={set("purchasePrice")} />
        )}
        {state.propertyType === PROPERTY_TYPES.INHERITED && (
          <NumberField
            label="Previous owner's purchase price (₹)"
            value={state.previousOwnerCost}
            onChange={set("previousOwnerCost")}
          />
        )}
        {state.propertyType === PROPERTY_TYPES.PRE_2001 && (
          <>
            <NumberField label="Original purchase cost (₹)" value={state.originalCost} onChange={set("originalCost")} />
            <NumberField label="FMV as on 1 April 2001 (₹)" value={state.fmv2001} onChange={set("fmv2001")} />
          </>
        )}
        <NumberField
          label="Sale price (₹)"
          value={state.salePrice}
          onChange={set("salePrice")}
        />
        <NumberField
          label="Holding period (months)"
          value={state.holdingMonths}
          onChange={set("holdingMonths")}
          hint="Long-term cut-off: 24 months"
        />
      </section>
    </div>
  );
}

function NumberField({ label, value, onChange, hint }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={onChange}
        className="min-h-[44px] w-full rounded border border-slate-300 px-3 py-2"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}
