import { useState } from "react";
import { ENQUIRY_ENDPOINT } from "../../config/endpoints.js";
import PrivacyConsent from "./PrivacyConsent.jsx";

const SERVICES = {
  section197: "Section 197 Certificate",
  form15cb: "Form 15CB Remittance",
  ca_general: "CA Services",
  legal_general: "Legal Help",
  chat_referral: "Chat Referral",
};

export default function EnquiryForm({ service, defaults = {}, onSuccess, compact }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    saleValue: "",
    timeline: "",
    notes: "",
    ...defaults,
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!consent) return;
    setStatus("sending");
    const payload = { ...form, service, submittedAt: new Date().toISOString() };
    try {
      if (ENQUIRY_ENDPOINT) {
        await fetch(ENQUIRY_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Dev fallback so the flow is testable without a backend.
        console.info("[Enquiry submitted — dev stub]", payload);
      }
      setStatus("sent");
      onSuccess?.(payload);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
        <div className="font-semibold">Thank you — your enquiry has been received.</div>
        <p className="mt-1 text-sm">A member of the Narula Gupta &amp; Co. team will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Enquiry · {SERVICES[service] || service}
      </div>
      <div className={`grid gap-3 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field label="Full name" required value={form.name} onChange={set("name")} />
        <Field label="Email" type="email" required value={form.email} onChange={set("email")} />
        <Field label="Phone (with country code)" required value={form.phone} onChange={set("phone")} />
        <Field label="Country of residence" required value={form.country} onChange={set("country")} />
        <Field
          label="Estimated sale value (₹)"
          type="number"
          inputMode="numeric"
          value={form.saleValue}
          onChange={set("saleValue")}
        />
        <Field
          label="Expected sale timeline"
          placeholder="e.g. within 6 months"
          value={form.timeline}
          onChange={set("timeline")}
        />
      </div>
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Notes (optional)</span>
        <textarea
          value={form.notes}
          onChange={set("notes")}
          rows={3}
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
      </label>
      <PrivacyConsent checked={consent} onChange={setConsent} />
      <button
        type="submit"
        disabled={!consent || status === "sending"}
        className="min-h-[44px] w-full rounded-md bg-brand px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Submit enquiry"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong — please try again or email us directly.</p>
      )}
    </form>
  );
}

function Field({ label, required, ...rest }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        required={required}
        {...rest}
        className="min-h-[44px] w-full rounded border border-slate-300 px-3 py-2"
      />
    </label>
  );
}
