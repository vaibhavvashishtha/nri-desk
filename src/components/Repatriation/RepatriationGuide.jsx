import { useState } from "react";
import { REPATRIATION_INPUTS, routeRepatriation } from "../../utils/repatriationRouter.js";
import AccountTypeBranch from "./AccountTypeBranch.jsx";
import DocumentChecklist from "./DocumentChecklist.jsx";
import EnquiryModal from "../Shared/EnquiryModal.jsx";
import InfoBox from "../Shared/InfoBox.jsx";

const STEPS = [
  { key: "residencyAtPurchase", q: "Was the property purchased while you were a resident in India, or as an NRI?" },
  { key: "funding", q: "How was the original purchase funded?" },
  { key: "currentAccount", q: "Where are the sale proceeds currently sitting?" },
];

export default function RepatriationGuide() {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [show15CB, setShow15CB] = useState(false);

  const done = step >= STEPS.length;
  const route = done ? routeRepatriation(answers) : null;

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Repatriation guide</h2>
        <p className="mt-1 text-sm text-slate-600">
          Answer three questions to see the correct repatriation route, applicable limit, and the documents required.
        </p>
      </header>

      {!done && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Step {step + 1} of {STEPS.length}
          </div>
          <div className="mt-1 text-base font-semibold text-slate-900">{STEPS[step].q}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {REPATRIATION_INPUTS[STEPS[step].key].map((o) => (
              <button
                key={o.value}
                onClick={() => {
                  setAnswers({ ...answers, [STEPS[step].key]: o.value });
                  setStep(step + 1);
                }}
                className="min-h-[44px] rounded-full border border-slate-300 bg-white px-4 py-2 text-sm hover:border-brand hover:bg-brand/5"
              >
                {o.label}
              </button>
            ))}
          </div>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="mt-3 text-xs text-slate-500 underline">
              Back
            </button>
          )}
        </div>
      )}

      {done && route && (
        <div className="space-y-3">
          <AccountTypeBranch accountType={answers.currentAccount} onSelect={() => {}} />
          <div className="rounded-lg border border-brand bg-brand/5 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Recommended route</div>
            <div className="mt-1 text-lg font-semibold text-slate-900">{route.title}</div>
            <div className="mt-2 grid gap-1 text-sm text-slate-700 sm:grid-cols-2">
              <div><strong>Limit:</strong> {route.limit}</div>
              <div><strong>RBI:</strong> {route.rbi}</div>
            </div>
            <p className="mt-2 text-sm text-slate-700">{route.summary}</p>
          </div>
          <DocumentChecklist docs={route.docs} on15CB={() => setShow15CB(true)} />
          <div className="flex gap-2">
            <button
              onClick={() => {
                setAnswers({});
                setStep(0);
              }}
              className="rounded-md border border-slate-300 px-3 py-2 text-sm"
            >
              Start over
            </button>
          </div>
        </div>
      )}

      <InfoBox tone="note">
        Repatriation rules can have person-specific nuances (multiple properties, inherited assets, gift transactions).
        Confirm with our team before initiating a remittance.
      </InfoBox>

      <EnquiryModal
        open={show15CB}
        onClose={() => setShow15CB(false)}
        service="form15cb"
        title="Get your Form 15CB"
      />
    </div>
  );
}
