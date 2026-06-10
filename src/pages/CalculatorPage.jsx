import { useMemo, useState } from "react";
import CalculatorForm from "../components/Calculator/CalculatorForm.jsx";
import ResultsPanel from "../components/Calculator/ResultsPanel.jsx";
import ExemptionsStep from "../components/Calculator/ExemptionsStep.jsx";
import EnquiryModal from "../components/Shared/EnquiryModal.jsx";
import RateDisclaimer from "../components/Shared/RateDisclaimer.jsx";
import {
  PROPERTY_TYPES,
  computeCostBasis,
  calculateLTCG,
  calculateGainCategory,
  calculateTDS,
  applyExemptions,
} from "../utils/taxCalculator.js";

const INITIAL = {
  propertyType: PROPERTY_TYPES.STANDARD,
  purchasePrice: "",
  previousOwnerCost: "",
  originalCost: "",
  fmv2001: "",
  salePrice: "",
  holdingMonths: "",
  section54: "",
  section54F: "",
  section54EC: "",
  section54LocationInIndia: true,
};

export default function CalculatorPage() {
  const [state, setState] = useState(INITIAL);
  const [enquiry, setEnquiry] = useState(null); // { service, title }

  const result = useMemo(() => {
    const sale = Number(state.salePrice) || 0;
    const months = Number(state.holdingMonths) || 0;
    const basis = computeCostBasis(state);
    if (!sale || !basis.cost || !months) return { valid: false };
    const gain = Math.max(0, sale - basis.cost);
    const category = calculateGainCategory(months);
    const taxBeforeExemptions = calculateLTCG({ type: "NRI", gain, months });
    const taxableGain = applyExemptions({
      gain,
      section54: state.section54,
      section54F: state.section54F,
      section54EC: state.section54EC,
      section54LocationInIndia: state.section54LocationInIndia,
    });
    const taxAfterExemptions = calculateLTCG({ type: "NRI", gain: taxableGain, months });
    const tds = calculateTDS({ saleValue: sale });
    return {
      valid: true,
      gain,
      category,
      taxBeforeExemptions,
      taxableGain,
      taxAfterExemptions,
      tds,
      salePrice: sale,
    };
  }, [state]);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <section className="space-y-4 rounded-lg border border-slate-200 bg-white p-5">
        <header className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900">Inputs</h2>
          <RateDisclaimer />
        </header>
        <CalculatorForm state={state} onChange={setState} />
        <ExemptionsStep state={state} onChange={setState} />
      </section>
      <section>
        <ResultsPanel
          result={result}
          onSection197={() => setEnquiry({ service: "section197", title: "Apply for Section 197 Certificate" })}
          onSpeakToTeam={() => setEnquiry({ service: "ca_general", title: "Speak to our team" })}
        />
      </section>
      <EnquiryModal
        open={!!enquiry}
        onClose={() => setEnquiry(null)}
        service={enquiry?.service}
        title={enquiry?.title}
        defaults={result.valid ? { saleValue: String(result.salePrice) } : {}}
      />
    </div>
  );
}
