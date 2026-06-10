import { RATE_DISCLAIMER } from "../../config/taxRates.js";

export default function RateDisclaimer({ className = "" }) {
  return (
    <p className={`text-xs uppercase tracking-wide text-slate-500 ${className}`}>
      {RATE_DISCLAIMER}
    </p>
  );
}
