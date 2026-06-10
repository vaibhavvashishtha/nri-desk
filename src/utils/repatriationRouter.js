// Decision tree per DEVELOPMENT_PLAN.md §3.2
// Inputs: residencyAtPurchase ("resident" | "nri"), funding ("nre_fcnr" | "nro" | "indian_income"), currentAccount ("nro" | "nre_fcnr")
// 2 * 3 * 2 = 12 combos; we collapse equivalent ones into the 4 distinct routes the law actually produces.

export const REPATRIATION_INPUTS = {
  residencyAtPurchase: [
    { value: "resident", label: "Resident in India at the time of purchase" },
    { value: "nri", label: "NRI / OCI at the time of purchase" },
  ],
  funding: [
    { value: "nre_fcnr", label: "NRE / FCNR account" },
    { value: "nro", label: "NRO account" },
    { value: "indian_income", label: "Indian income / savings (resident funds)" },
  ],
  currentAccount: [
    { value: "nro", label: "NRO account" },
    { value: "nre_fcnr", label: "NRE / FCNR account" },
  ],
};

const FORMS_COMMON = [
  "Form 15CB — CA certificate confirming taxes are paid",
  "Form 15CA — online declaration filed by the remitter, citing the 15CB",
  "Form A2 / FEMA declaration",
  "Bank's remittance application form",
];

const ROUTES = {
  NRE_FREE: {
    key: "NRE_FREE",
    title: "Freely repatriable via NRE / FCNR",
    limit: "No annual cap",
    rbi: "No RBI approval required",
    summary:
      "Because the proceeds sit in an NRE / FCNR account (and were funded from NRE / FCNR money), they are freely repatriable abroad. Your AD bank handles the remittance with standard documentation.",
    docs: FORMS_COMMON,
  },
  NRO_USD1M: {
    key: "NRO_USD1M",
    title: "NRO route — USD 1 million per financial year",
    limit: "USD 1,000,000 per financial year (Apr–Mar), pooled across all income sources, per person",
    rbi: "No separate RBI approval needed within the USD 1M limit — your AD bank handles it directly",
    summary:
      "Sale proceeds sitting in an NRO account can be repatriated up to USD 1 million per financial year. Many NRIs believe RBI approval is required — it is not, within this limit. Above USD 1M requires RBI permission.",
    docs: FORMS_COMMON,
  },
  NRO_RESIDENT_FUNDED: {
    key: "NRO_RESIDENT_FUNDED",
    title: "NRO route (property bought from resident funds) — USD 1M per FY",
    limit: "USD 1,000,000 per financial year (Apr–Mar)",
    rbi: "No separate RBI approval needed within the USD 1M limit",
    summary:
      "Property purchased while you were a resident (or with Indian income) — proceeds must be credited to your NRO account and repatriated under the USD 1M-per-FY route. Note: this route applies only to up to two residential properties in a lifetime acquired pre-NRI; consult us if you have more.",
    docs: FORMS_COMMON,
  },
  NRE_FUNDED_NRO_HELD: {
    key: "NRE_FUNDED_NRO_HELD",
    title: "Funded from NRE but proceeds in NRO — move to NRE first",
    limit: "Once moved to NRE, freely repatriable; or repatriate from NRO under USD 1M cap",
    rbi: "No RBI approval needed",
    summary:
      "The purchase was funded from NRE / FCNR but the sale proceeds went into your NRO. You can either (a) request your bank to credit the proceeds back to NRE (subject to documentation linking the original funding), or (b) repatriate from NRO under the USD 1M-per-FY route.",
    docs: FORMS_COMMON,
  },
};

export function routeRepatriation({ residencyAtPurchase, funding, currentAccount }) {
  if (currentAccount === "nre_fcnr" && funding === "nre_fcnr") {
    return ROUTES.NRE_FREE;
  }
  if (residencyAtPurchase === "resident" || funding === "indian_income") {
    return ROUTES.NRO_RESIDENT_FUNDED;
  }
  if (funding === "nre_fcnr" && currentAccount === "nro") {
    return ROUTES.NRE_FUNDED_NRO_HELD;
  }
  return ROUTES.NRO_USD1M;
}
