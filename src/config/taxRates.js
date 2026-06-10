// Single source of truth for all rates and caps.
// Update here when Finance Act / Budget changes — never hardcode in components.

export const TAX_YEAR = "FY 2025-26";
export const FINANCE_ACT_REF = "Finance Act 2024";

export const LTCG_RATE_NRI = 0.125;          // Finance Act 2024, effective 23 July 2024
export const STCG_RATE_NRI = 0.30;
export const CESS_RATE = 0.04;
export const LONG_TERM_MONTHS = 24;
export const FMV_BASE_YEAR_DATE = "2001-04-01";

export const TDS_SLABS = [
  { label: "Up to ₹50L",    maxValue:   5_000_000, base: 0.125, surcharge: 0,    effective: 0.1300 },
  { label: "₹50L – ₹1Cr",   maxValue:  10_000_000, base: 0.125, surcharge: 0.10, effective: 0.1430 },
  { label: "₹1Cr – ₹2Cr",   maxValue:  20_000_000, base: 0.125, surcharge: 0.15, effective: 0.1495 },
  { label: "Above ₹2Cr",    maxValue:    Infinity, base: 0.125, surcharge: 0.25, effective: 0.1625 },
];

export const EXEMPTION_CAPS = {
  section54:    100_000_000,   // ₹10 crore
  section54F:   100_000_000,   // ₹10 crore
  section54EC:    5_000_000,   // ₹50 lakh
};

export const RATE_DISCLAIMER = `Rates as per ${FINANCE_ACT_REF} / ${TAX_YEAR}.`;
