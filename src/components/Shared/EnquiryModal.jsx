import EnquiryForm from "./EnquiryForm.jsx";

export default function EnquiryModal({ open, onClose, service, title, defaults }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-2 sm:items-center sm:p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h3 className="font-semibold text-slate-900">{title || "Speak to our team"}</h3>
          <button onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-100" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="max-h-[80dvh] overflow-y-auto p-4">
          <EnquiryForm service={service} defaults={defaults} onSuccess={() => setTimeout(onClose, 1500)} />
        </div>
      </div>
    </div>
  );
}
