import { useState } from "react";
import { Link } from "react-router-dom";
import CalculatorPage from "./CalculatorPage.jsx";
import ServicesPage from "./ServicesPage.jsx";
import Section197Page from "../components/Section197/Section197Page.jsx";
import RepatriationGuide from "../components/Repatriation/RepatriationGuide.jsx";
import ChatWindow from "../components/Chat/ChatWindow.jsx";
import EnquiryModal from "../components/Shared/EnquiryModal.jsx";

const TABS = [
  { id: "chat", label: "Ask" },
  { id: "calculator", label: "Calculator" },
  { id: "section197", label: "Section 197" },
  { id: "repatriation", label: "Repatriation" },
  { id: "services", label: "Services" },
];

export default function AppShell() {
  const [active, setActive] = useState("calculator");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [enquiry, setEnquiry] = useState(null);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <Link to="/" className="text-base font-semibold text-brand">
              NRI Property Desk
            </Link>
            <span className="hidden text-xs text-slate-500 sm:inline">Narula Gupta &amp; Co.</span>
          </div>
          <nav className="hidden gap-1 lg:flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  active === t.id ? "bg-brand text-white" : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-5 lg:pb-8">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6">
          <aside className="hidden lg:block">
            <QuickActions
              onSection197={() => setEnquiry({ service: "section197", title: "Apply for Section 197 Certificate" })}
              on15CB={() => setEnquiry({ service: "form15cb", title: "Get your Form 15CB" })}
            />
          </aside>
          <section>{renderActive(active)}</section>
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white text-xs lg:hidden">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`min-h-[56px] py-2 ${active === t.id ? "text-brand" : "text-slate-600"}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setDrawerOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <aside
            className="absolute inset-y-0 left-0 w-72 bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-semibold text-slate-900">Quick actions</h3>
            <QuickActions
              onSection197={() => {
                setDrawerOpen(false);
                setEnquiry({ service: "section197", title: "Apply for Section 197 Certificate" });
              }}
              on15CB={() => {
                setDrawerOpen(false);
                setEnquiry({ service: "form15cb", title: "Get your Form 15CB" });
              }}
            />
          </aside>
        </div>
      )}

      <EnquiryModal
        open={!!enquiry}
        onClose={() => setEnquiry(null)}
        service={enquiry?.service}
        title={enquiry?.title}
      />

      <footer className="border-t border-slate-200 bg-white py-3 text-center text-xs text-slate-500">
        © Narula Gupta &amp; Co. · <Link to="/privacy" className="underline">Privacy Notice</Link>
      </footer>
    </div>
  );
}

function QuickActions({ onSection197, on15CB }) {
  return (
    <div className="mt-3 space-y-2">
      <button
        onClick={onSection197}
        className="w-full rounded-md bg-brand-accent px-3 py-2 text-sm font-semibold text-white"
      >
        Apply for Section 197
      </button>
      <button onClick={on15CB} className="w-full rounded-md border border-brand px-3 py-2 text-sm font-semibold text-brand">
        Get your Form 15CB
      </button>
    </div>
  );
}

function renderActive(active) {
  switch (active) {
    case "chat":
      return <ChatWindow />;
    case "section197":
      return <Section197Page />;
    case "repatriation":
      return <RepatriationGuide />;
    case "services":
      return <ServicesPage />;
    case "calculator":
    default:
      return <CalculatorPage />;
  }
}
