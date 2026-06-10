export function formatINR(amount) {
  const n = Math.round(Number(amount) || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatPercent(rate) {
  return `${(Number(rate) * 100).toFixed(2)}%`;
}
