import { Hammer, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnderDevelopment() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-white/90 p-8 text-center shadow-xl backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90 sm:p-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
          <Hammer className="h-8 w-8 animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Under Development</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Dzikir Pagi &amp; Petang
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
          Halaman ini masih dalam tahap pengembangan dan belum dirilis untuk umum.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Link>
          <Link
            href="/tasbih"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Buka Tasbih
          </Link>
        </div>
      </div>
    </div>
  );
}
