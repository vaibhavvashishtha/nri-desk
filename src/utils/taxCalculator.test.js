import { describe, it, expect } from "vitest";
import {
  calculateLTCG,
  calculateTDS,
  applyExemptions,
  calculateGainCategory,
  computeCostBasis,
  PROPERTY_TYPES,
} from "./taxCalculator.js";

describe("calculateLTCG", () => {
  it("NRI long-term: 12.5% flat", () => {
    expect(calculateLTCG({ type: "NRI", gain: 1_000_000, months: 30 })).toBe(125_000);
  });
  it("matches plan example exactly", () => {
    expect(calculateLTCG({ type: "NRI", gain: 1_000_000 })).toBe(125_000);
  });
  it("STCG below 24 months at 30%", () => {
    expect(calculateLTCG({ type: "NRI", gain: 1_000_000, months: 20 })).toBe(300_000);
  });
  it("23 months -> STCG", () => {
    expect(calculateGainCategory(23)).toBe("STCG");
    expect(calculateLTCG({ type: "NRI", gain: 1_000_000, months: 23 })).toBe(300_000);
  });
  it("24 months -> LTCG", () => {
    expect(calculateGainCategory(24)).toBe("LTCG");
    expect(calculateLTCG({ type: "NRI", gain: 1_000_000, months: 24 })).toBe(125_000);
  });
});

describe("calculateTDS", () => {
  it("₹1.5Cr falls in the ₹1Cr–₹2Cr slab at 14.95%", () => {
    const r = calculateTDS({ saleValue: 15_000_000 });
    expect(r.effective).toBe(0.1495);
    expect(r.amount).toBe(Math.round(15_000_000 * 0.1495));
  });
  it("₹40L falls in the up-to-₹50L slab", () => {
    expect(calculateTDS({ saleValue: 4_000_000 }).effective).toBe(0.13);
  });
  it("₹3Cr falls in the above-₹2Cr slab", () => {
    expect(calculateTDS({ saleValue: 30_000_000 }).effective).toBe(0.1625);
  });
});

describe("applyExemptions", () => {
  it("₹50L 54EC against ₹50L gain reduces taxable to zero", () => {
    expect(applyExemptions({ gain: 500_000, section54EC: 500_000 })).toBe(0);
  });
  it("54EC is capped at ₹50L", () => {
    expect(applyExemptions({ gain: 10_000_000, section54EC: 100_000_000 })).toBe(5_000_000);
  });
  it("54 is capped at ₹10Cr", () => {
    expect(applyExemptions({ gain: 200_000_000, section54: 200_000_000 })).toBe(100_000_000);
  });
  it("54 rejected if reinvestment is outside India", () => {
    expect(
      applyExemptions({ gain: 5_000_000, section54: 5_000_000, section54LocationInIndia: false })
    ).toBe(5_000_000);
  });
});

describe("computeCostBasis", () => {
  it("standard: uses purchase price", () => {
    expect(computeCostBasis({ propertyType: PROPERTY_TYPES.STANDARD, purchasePrice: 1000 }).cost).toBe(1000);
  });
  it("inherited: uses previous-owner cost", () => {
    expect(
      computeCostBasis({ propertyType: PROPERTY_TYPES.INHERITED, previousOwnerCost: 500 }).cost
    ).toBe(500);
  });
  it("pre-2001: picks higher of original or FMV", () => {
    expect(
      computeCostBasis({ propertyType: PROPERTY_TYPES.PRE_2001, originalCost: 100, fmv2001: 800 }).cost
    ).toBe(800);
    expect(
      computeCostBasis({ propertyType: PROPERTY_TYPES.PRE_2001, originalCost: 900, fmv2001: 800 }).cost
    ).toBe(900);
  });
});
