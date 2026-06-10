import InfoBox from "../Shared/InfoBox.jsx";

export default function AccountTypeBranch({ accountType, onSelect }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Card
          active={accountType === "nro"}
          onClick={() => onSelect("nro")}
          title="NRO account"
          sub="Up to USD 1M per FY"
        >
          Limit: USD 1 million per financial year (Apr–Mar), pooled across all income sources, per person.
          <div className="mt-2 font-medium text-emerald-700">
            No separate RBI approval needed within this limit — your AD bank handles it directly.
          </div>
        </Card>
        <Card
          active={accountType === "nre_fcnr"}
          onClick={() => onSelect("nre_fcnr")}
          title="NRE / FCNR account"
          sub="Freely repatriable"
        >
          No annual cap. Simpler documentation. Applies where the original purchase was funded from NRE / FCNR money.
        </Card>
      </div>
      {accountType === "nro" && (
        <InfoBox tone="info">
          Above USD 1M in a financial year, RBI permission is required — speak to our team before initiating.
        </InfoBox>
      )}
    </div>
  );
}

function Card({ active, onClick, title, sub, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-4 text-left transition ${
        active ? "border-brand bg-brand/5" : "border-slate-200 bg-white hover:border-brand/50"
      }`}
    >
      <div className="text-sm font-semibold text-slate-900">{title}</div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{sub}</div>
      <div className="mt-2 text-sm text-slate-700">{children}</div>
    </button>
  );
}
