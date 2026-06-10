import { useState } from "react";
import EnquiryModal from "../components/Shared/EnquiryModal.jsx";

const CARDS = [
  {
    title: "CA Services",
    body: "ITR filing for NRIs, capital-gains computation, Form 15CB, and Section 197 lower-TDS certificates.",
    cta: "Talk to a CA",
    service: "ca_general",
  },
  {
    title: "Section 197 Certificate",
    body: "Reduce or eliminate the TDS deducted at the time of sale — apply before completion to avoid cash blockage.",
    cta: "Apply for Section 197",
    service: "section197",
  },
  {
    title: "Form 15CB / 15CA",
    body: "CA certification and online filing required to remit sale proceeds abroad.",
    cta: "Get your Form 15CB",
    service: "form15cb",
  },
  {
    title: "Legal Help",
    body: "Title due diligence, sale-deed review, power-of-attorney and FEMA-related advisory.",
    cta: "Talk to legal",
    service: "legal_general",
  },
];

export default function ServicesPage() {
  const [enquiry, setEnquiry] = useState(null);
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CARDS.map((c) => (
        <article key={c.service} className="rounded-lg border border-slate-200 bg-white p-5">
          <h3 className="text-base font-semibold text-slate-900">{c.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{c.body}</p>
          <button
            onClick={() => setEnquiry({ service: c.service, title: c.cta })}
            className="mt-3 min-h-[44px] rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white"
          >
            {c.cta}
          </button>
        </article>
      ))}
      <EnquiryModal
        open={!!enquiry}
        onClose={() => setEnquiry(null)}
        service={enquiry?.service}
        title={enquiry?.title}
      />
    </div>
  );
}
