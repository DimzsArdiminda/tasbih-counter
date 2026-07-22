"use client";

import { useRouter } from "next/navigation";
import { BookOpen, ChevronRight } from "lucide-react";

type Kitab = {
  id: string;
  nama_kitab: string;
  status: "sahih" | "hasan" | "dhaif";
};

const statusLabel = {
  sahih: "Sahih",
  hasan: "Hasan",
  dhaif: "Dhaif",
};

const statusStyle = {
  sahih: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  hasan: "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
  dhaif: "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
};

export default function HaditsBrowser({ kitabList }: { kitabList: Kitab[] }) {
  const router = useRouter();

  const selectKitab = (kitab: Kitab) => {
    sessionStorage.setItem("hadits:selected-kitab", JSON.stringify(kitab));
    router.push("/hadits/baca");
  };

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-cyan-800 p-6 text-white shadow-lg sm:p-8">
        <p className="mb-2 text-sm font-semibold tracking-[0.18em] text-emerald-100 uppercase">Koleksi Hadits</p>
        <h1 className="text-3xl font-bold sm:text-4xl">Pilih kitab untuk mulai membaca</h1>
        <p className="mt-3 max-w-2xl text-emerald-50">Tekan salah satu kitab di bawah untuk menampilkan haditsnya. Pilihan Anda tetap berada di halaman ini tanpa mengubah URL.</p>
      </div>

      {kitabList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
          Belum ada kitab hadits yang tersedia.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kitabList.map((kitab) => {
            return (
              <button
                key={kitab.id}
                type="button"
                onClick={() => selectKitab(kitab)}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-emerald-700 dark:focus:ring-offset-gray-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300"><BookOpen size={22} /></span>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyle[kitab.status]}`}>{statusLabel[kitab.status]}</span>
                </div>
                <div className="mt-5 flex items-end justify-between gap-3">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{kitab.nama_kitab}</h2>
                  <ChevronRight className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-1" size={20} />
                </div>
              </button>
            );
          })}
        </div>
      )}

    </section>
  );
}
