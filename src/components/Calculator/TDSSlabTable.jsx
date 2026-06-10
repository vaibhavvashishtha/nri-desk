import { TDS_SLABS } from "../../config/taxRates.js";
import { formatPercent } from "../../utils/format.js";

export default function TDSSlabTable({ activeSlab }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2">Sale value</th>
            <th className="px-3 py-2">Base LTCG</th>
            <th className="px-3 py-2">Surcharge</th>
            <th className="px-3 py-2">Effective TDS</th>
          </tr>
        </thead>
        <tbody>
          {TDS_SLABS.map((slab) => {
            const active = activeSlab && slab.label === activeSlab.label;
            return (
              <tr
                key={slab.label}
                className={active ? "bg-amber-50 font-semibold text-amber-900" : "odd:bg-white even:bg-slate-50"}
              >
                <td className="px-3 py-2">{slab.label}</td>
                <td className="px-3 py-2">{formatPercent(slab.base)}</td>
                <td className="px-3 py-2">{slab.surcharge ? formatPercent(slab.surcharge) : "—"}</td>
                <td className="px-3 py-2">{formatPercent(slab.effective)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
