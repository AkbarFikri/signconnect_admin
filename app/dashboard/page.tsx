import { TabelSoal } from "../utils/tabel";

export default function dashboard() {
  return (
    <div className="h-screen w-screen bg-slate-100 p-8">
      <TabelSoal />
      <p className="text-center">Made with ❤ By Inti Bumi</p>
    </div>
  );
}
