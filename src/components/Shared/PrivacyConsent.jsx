import { Link } from "react-router-dom";

export default function PrivacyConsent({ checked, onChange }) {
  return (
    <label className="flex items-start gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4"
        required
      />
      <span>
        I have read the{" "}
        <Link to="/privacy" className="text-brand underline">
          Privacy Notice
        </Link>{" "}
        and consent to Narula Gupta &amp; Co. contacting me about my enquiry.
      </span>
    </label>
  );
}
