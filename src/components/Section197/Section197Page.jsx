import { useState } from "react";
import Section197Guide from "./Section197Guide.jsx";
import EnquiryModal from "../Shared/EnquiryModal.jsx";

export default function Section197Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">Section 197 — Lower TDS certificate</h2>
        <p className="mt-1 text-sm text-slate-600">
          Apply to the Income Tax Department <em>before</em> the sale for a lower (or nil) TDS deduction. This avoids
          large cash blockage at completion when your actual tax liability is much smaller than the default TDS.
        </p>
      </header>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-base font-semibold text-slate-900">How it works</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
          <li>NRI seller applies to the jurisdictional AO before the sale.</li>
          <li>AO issues a certificate specifying a lower TDS rate (or nil), valid for the named buyer.</li>
          <li>Buyer deducts TDS at the certificate rate via Form 27Q.</li>
          <li>Seller avoids tying up months of cash awaiting refund.</li>
        </ol>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <h3 className="mb-3 text-base font-semibold text-slate-900">Quick eligibility check</h3>
        <Section197Guide onApply={() => setOpen(true)} />
      </section>

      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
        service="section197"
        title="Apply for Section 197 Certificate"
      />
    </div>
  );
}
