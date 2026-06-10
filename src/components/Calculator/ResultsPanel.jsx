import { LTCG_RATE_NRI, STCG_RATE_NRI } from "../../config/taxRates.js";
import { formatINR, formatPercent } from "../../utils/format.js";
import TDSSlabTable from "./TDSSlabTable.jsx";
import InfoBox from "../Shared/InfoBox.jsx";
import DTAASection from "./DTAASection.jsx";
import RateDisclaimer from "../Shared/RateDisclaimer.jsx";

export default function ResultsPanel({ result, onSection197, onSpeakToTeam }) {
  if (!result.valid) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600">
        Enter your purchase price, sale price and holding period to see results.
      </div>
    );
  }

  const { gain, taxableGain, category, taxBeforeExemptions, taxAfterExemptions, tds, salePrice } = result;
  const isLong = category === "LTCG";
  const headlineRate = isLong ? LTCG_RATE_NRI : STCG_RATE_NRI;

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">Results</h2>
        <RateDisclaimer />
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <Tile label="Capital gain" value={formatINR(gain)} sub={category} />
        <Tile
          label={isLong ? "LTCG @ 12.5% flat (NRI)" : "STCG at slab rate (up to 30%)"}
          value={formatINR(taxBeforeExemptions)}
          sub={formatPercent(headlineRate)}
        />
        <Tile label="Taxable gain after exemptions" value={formatINR(taxableGain)} />
        <Tile label="Estimated tax after exemptions" value={formatINR(taxAfterExemptions)} highlight />
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              TDS on full sale consideration (Section 195)
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              TDS is deducted on the entire sale price of <strong>{formatINR(salePrice)}</strong>, not on the gain.
              The difference between TDS paid and your actual tax liability is refunded via ITR filing.
            </p>
          </div>
          <button
            type="button"
            onClick={onSection197}
            className="shrink-0 rounded-md bg-brand-accent px-3 py-2 text-xs font-semibold text-white"
          >
            Apply for Section 197 Certificate
          </button>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Tile label="TDS rate (your slab)" value={formatPercent(tds.effective)} sub={tds.slab.label} />
          <Tile label="TDS amount" value={formatINR(tds.amount)} />
        </div>
        <div className="mt-3">
          <TDSSlabTable activeSlab={tds.slab} />
        </div>
        <div className="mt-3">
          <InfoBox title="Buyer's compliance route — Section 195, not Form 26QB">
            When buying from an NRI, the buyer must: obtain a TAN, deduct TDS under <strong>Section 195</strong>,
            deposit it via <strong>Form 27Q</strong>, and issue <strong>Form 16A</strong> to the seller. This is a
            different process from buying from a resident seller (which uses Form 26QB and requires no TAN).
          </InfoBox>
        </div>
      </section>

      <DTAASection />

      <InfoBox tone="note">
        This calculator is for information only and is not a substitute for professional tax advice. Consult a
        qualified CA for your specific situation.
        <div className="mt-2">
          <button
            onClick={onSpeakToTeam}
            className="rounded border border-brand px-3 py-1 text-xs font-semibold text-brand"
          >
            Speak to our team
          </button>
        </div>
      </InfoBox>
    </div>
  );
}

function Tile({ label, value, sub, highlight }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? "border-brand bg-brand/5" : "border-slate-200 bg-white"}`}>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}
