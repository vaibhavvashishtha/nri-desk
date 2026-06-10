import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <article className="prose mx-auto max-w-3xl space-y-5 px-4 py-8 text-slate-800">
      <header>
        <Link to="/" className="text-sm text-brand underline">
          ← Back
        </Link>
        <h1 className="mt-2 text-2xl font-bold">Privacy Notice</h1>
        <p className="text-sm text-slate-500">Digital Personal Data Protection Act, 2023 (DPDPA)</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold">What we collect</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Identification: your name, email and phone (when you submit an enquiry).</li>
          <li>Country of residence and high-level financial context (sale value, timeline) when relevant.</li>
          <li>Chat transcripts when you use the assistant, to improve service quality.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Why we collect it</h2>
        <p className="text-sm">
          To respond to your enquiry, provide CA / Section 197 / Form 15CB services, and improve our assistant&apos;s
          accuracy. We do not sell your data to third parties.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">How long we retain it</h2>
        <p className="text-sm">
          Enquiry data is retained for the duration of our engagement plus 7 years to meet statutory record-keeping
          requirements. Chat transcripts are retained for 12 months unless tied to an active engagement.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Your rights under DPDPA 2023</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>Right to access your personal data and obtain a summary of how it has been processed.</li>
          <li>Right to correct, complete, update or erase your personal data.</li>
          <li>Right to nominate another person to exercise your rights in the event of incapacity.</li>
          <li>Right to grievance redressal — contact our Data Protection Officer.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Contact</h2>
        <p className="text-sm">
          Narula Gupta &amp; Co. — Data Protection Officer · <em>dpo@narulagupta.example</em>
        </p>
      </section>
    </article>
  );
}
