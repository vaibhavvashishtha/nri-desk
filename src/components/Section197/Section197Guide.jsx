import { useState } from "react";
import InfoBox from "../Shared/InfoBox.jsx";

const QUESTIONS = [
  { id: "type", q: "Is the property residential or commercial?", options: ["Residential", "Commercial"] },
  {
    id: "value",
    q: "Estimated sale consideration?",
    options: ["Under ₹50 lakh", "₹50L – ₹2Cr", "Above ₹2Cr"],
  },
  {
    id: "liabilityLower",
    q: "Is your actual tax liability likely lower than the TDS that would be deducted?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "timeline",
    q: "Is the sale expected within the next 6 months?",
    options: ["Yes", "No"],
  },
];

export default function Section197Guide({ onApply }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  if (step >= QUESTIONS.length) {
    const eligible =
      answers.liabilityLower === "Yes" || answers.liabilityLower === "Not sure";
    return (
      <div className="space-y-4">
        <InfoBox tone={eligible ? "success" : "info"} title={eligible ? "You likely qualify for Section 197" : "Section 197 may not save you much"}>
          {eligible ? (
            <>
              Based on your answers, a lower-TDS certificate under Section 197 could prevent a large cash blockage at
              completion. The Narula Gupta &amp; Co. team can prepare the application.
            </>
          ) : (
            <>
              Your actual tax may not be materially lower than the standard TDS. A Section 197 certificate still has
              merit in some cases — speak to our team to confirm.
            </>
          )}
        </InfoBox>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onApply}
            className="min-h-[44px] rounded-md bg-brand-accent px-4 py-2 font-semibold text-white"
          >
            Apply for Section 197 Certificate
          </button>
          <button
            onClick={() => {
              setAnswers({});
              setStep(0);
            }}
            className="min-h-[44px] rounded-md border border-slate-300 px-4 py-2 font-medium"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        Step {step + 1} of {QUESTIONS.length}
      </div>
      <div className="text-base font-semibold text-slate-900">{q.q}</div>
      <div className="flex flex-wrap gap-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              setAnswers({ ...answers, [q.id]: opt });
              setStep(step + 1);
            }}
            className="min-h-[44px] rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:border-brand hover:bg-brand/5"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
