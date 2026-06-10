import { NRI_DISCLAIMER_LINE } from "../../config/aiPrompts.js";

export default function DisclaimerLine() {
  return <p className="mt-2 text-xs italic text-slate-500">{NRI_DISCLAIMER_LINE}</p>;
}
