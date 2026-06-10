import {
  LTCG_RATE_NRI,
  STCG_RATE_NRI,
  CESS_RATE,
  LONG_TERM_MONTHS,
  TDS_SLABS,
  EXEMPTION_CAPS,
} from "../config/taxRates.js";

export const PROPERTY_TYPES = {
  STANDARD: "standard",
  INHERITED: "inherited",
  PRE_2001: "pre_2001",
};

// Cost basis depends on how the property was acquired.
// Inherited: previous-owner's purchase cost; holding clock starts from previous owner's acquisition.
// Pre-1 April 2001: taxpayer may pick higher of original cost or FMV-as-on-2001 (legal — it's their choice).
export function computeCostBasis(input) {
  const { propertyType } = input;
  if (propertyType === PROPERTY_TYPES.INHERITED) {
    return {
      cost: Number(input.previousOwnerCost) || 0,
      acquisitionDate: input.previousOwnerAcquisitionDate,
    };
  }
  if (propertyType === PROPERTY_TYPES.PRE_2001) {
    const original = Number(input.originalCost) || 0;
    const fmv = Number(input.fmv2001) || 0;
    return {
      cost: Math.max(original, fmv),
      acquisitionDate: input.acquisitionDate,
      usedFmv: fmv >= original && fmv > 0,
    };
  }
  return {
    cost: Number(input.purchasePrice) || 0,
    acquisitionDate: input.acquisitionDate,
  };
}

export function isLongTerm(months) {
  return Number(months) >= LONG_TERM_MONTHS;
}

// LTCG: 12.5% flat for NRI (no indexation, no grandfathering).
// STCG: slab rates — for NRI we apply the top-of-slab 30% + cess.
export function calculateLTCG({ type = "NRI", gain, months = LONG_TERM_MONTHS }) {
  const g = Math.max(0, Number(gain) || 0);
  if (!isLongTerm(months)) {
    const tax = g * STCG_RATE_NRI;
    return Math.round(tax);
  }
  if (type === "NRI" || type === "OCI") {
    return Math.round(g * LTCG_RATE_NRI);
  }
  // Resident fallback (not exposed in NRI flow).
  return Math.round(g * LTCG_RATE_NRI);
}

export function calculateGainCategory(months) {
  return isLongTerm(months) ? "LTCG" : "STCG";
}

// TDS under Section 195 is on FULL SALE CONSIDERATION, never on the gain.
export function calculateTDS({ saleValue }) {
  const v = Math.max(0, Number(saleValue) || 0);
  const slab = TDS_SLABS.find((s) => v <= s.maxValue) || TDS_SLABS[TDS_SLABS.length - 1];
  return {
    slab,
    effective: slab.effective,
    amount: Math.round(v * slab.effective),
  };
}

// Exemptions reduce taxable gain. Each is capped by EXEMPTION_CAPS.
// Section 54 has a residential-in-India restriction — caller must enforce locationInIndia.
export function applyExemptions({
  gain,
  section54 = 0,
  section54F = 0,
  section54EC = 0,
  section54LocationInIndia = true,
}) {
  const g = Math.max(0, Number(gain) || 0);
  let s54 = section54LocationInIndia ? Math.max(0, Number(section54) || 0) : 0;
  let s54F = Math.max(0, Number(section54F) || 0);
  let s54EC = Math.max(0, Number(section54EC) || 0);

  s54 = Math.min(s54, EXEMPTION_CAPS.section54);
  s54F = Math.min(s54F, EXEMPTION_CAPS.section54F);
  s54EC = Math.min(s54EC, EXEMPTION_CAPS.section54EC);

  const totalExemption = Math.min(g, s54 + s54F + s54EC);
  return Math.max(0, g - totalExemption);
}

export function applyCess(taxAmount) {
  return Math.round(Number(taxAmount) * (1 + CESS_RATE));
}
