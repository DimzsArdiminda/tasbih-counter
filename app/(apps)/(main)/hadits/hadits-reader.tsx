"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { getHaditsByKitab, type HaditsItem } from "./actions";

type Kitab = { id: string; nama_kitab: string; status: "sahih" | "hasan" | "dhaif" };

export default function HaditsReader() {
  const router = useRouter();
  const [reader, setReader] = useState<{ kitab: Kitab; hadits: HaditsItem[] } | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const savedKitab = sessionStorage.getItem("hadits:selected-kitab");
    if (!savedKitab) {
      router.replace("/hadits");
      return;
    }

    startTransition(async () => {
      try {
        const selectedKitab = JSON.parse(savedKitab) as Kitab;
        const loadedHadits = await getHaditsByKitab(selectedKitab.id);
        setReader({ kitab: selectedKitab, hadits: loadedHadits });
      } catch {
        setError("Data hadits tidak dapat dimuat. Silakan kembali dan pilih kitab lagi.");
      }
    });
  }, [router]);

  const changePage = (nextPage: number) => {
    setDirection(nextPage > activePage ? "next" : "previous");
    setActivePage(nextPage);
  };

  const kitab = reader?.kitab ?? null;
  const hadits = reader?.hadits ?? [];
  const currentHadits = hadits[activePage];

  return (
    <section className="mx-auto max-w-6xl">
      <button
        type="button"
        onClick={() => router.push("/hadits")}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-200"
      >
        <ArrowLeft size={18} /> Kembali ke daftar kitab
      </button>

      {isPending || !kitab ? (
        <div className="flex min-h-96 items-center justify-center gap-3 text-gray-500 dark:text-gray-400">
          <LoaderCircle className="animate-spin text-emerald-600" /> Membuka
          kitab...
        </div>
      ) : error ? (
        <div className="rounded-3xl bg-rose-50 p-8 text-center text-rose-700 dark:bg-rose-950/30 dark:text-rose-300">
          {error}
        </div>
      ) : hadits.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400">
          Kitab ini belum memiliki hadits untuk dibaca.
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <BookOpen size={17} /> Pembaca Hadits
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {kitab.nama_kitab}
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Hadits {activePage + 1} dari {hadits.length}
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-950 p-3 shadow-2xl sm:p-6">
            <div className="relative overflow-hidden rounded-[1.45rem] bg-[#eadcc5] p-1 shadow-inner">
              <div className="absolute inset-y-0 left-1/2 z-10 hidden w-8 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/5 to-transparent blur-sm sm:block" />
              <div className="grid min-h-[590px] sm:grid-cols-2">
                <div className="hidden border-r border-[#cdbb9d] bg-[#f8f0df] p-8 text-[#4d3c29] sm:block">
                  <p className="font-serif text-sm tracking-[0.25em] uppercase text-emerald-800">
                    Koleksi Hadits
                  </p>
                  <div className="my-10 h-px bg-[#cfbfa4]" />
                  <p className="font-serif text-4xl leading-tight">
                    “Ilmu yang baik selalu dimulai dari membaca dengan tenang.”
                  </p>
                  <p className="mt-8 font-serif text-sm leading-7 text-[#725c42]">
                    Gunakan tombol di bawah untuk membalik halaman kitab.
                    Halaman akan berganti tanpa mengubah alamat browser.
                  </p>
                  <p className="absolute bottom-10 text-xs text-[#8a7358]">
                    {kitab.nama_kitab}
                  </p>
                </div>

                <article
                  key={currentHadits.id}
                  className={`relative overflow-hidden bg-[#fffaf0] p-6 text-[#392d20] sm:p-9 ${direction === "next" ? "hadits-page-next" : "hadits-page-previous"}`}
                >
                  <div className="absolute inset-3 border border-[#deceb2]" />
                  <div className="relative flex h-full min-h-143.75 flex-col">
                    <p className="font-serif text-xs tracking-[0.2em] uppercase text-emerald-800">
                      {kitab.nama_kitab
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase(),
                        )
                        .join(" ")}
                    </p>
                    <div className="my-5 h-px bg-[#dbc9aa]" />
                    <p
                      lang="ar"
                      dir="rtl"
                      className="font-serif text-right text-2xl leading-[2.1] sm:text-3xl"
                    >
                      {currentHadits.arab}
                    </p>
                    <div className="my-6 h-px bg-[#dbc9aa]" />
                    <p className="font-serif leading-8 text-[#5b4935]">
                      {currentHadits.terjemah}
                    </p>
                    <span className="mt-auto pt-8 text-center font-serif text-sm text-[#897257]">
                      {activePage + 1}
                    </span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-4">
            <button
              type="button"
              disabled={activePage === 0}
              onClick={() => changePage(activePage - 1)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:border-emerald-500 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <ChevronLeft size={19} /> Sebelumnya
            </button>
            <button
              type="button"
              disabled={activePage === hadits.length - 1}
              onClick={() => changePage(activePage + 1)}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Selanjutnya <ChevronRight size={19} />
            </button>
          </div>
        </>
      )}

      <style jsx>{`
        .hadits-page-next {
          transform-origin: left center;
          animation: page-next 520ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        .hadits-page-previous {
          transform-origin: right center;
          animation: page-previous 520ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }
        @keyframes page-next {
          from {
            opacity: 0.3;
            transform: perspective(1400px) rotateY(-18deg) translateX(20px);
          }
          to {
            opacity: 1;
            transform: perspective(1400px) rotateY(0) translateX(0);
          }
        }
        @keyframes page-previous {
          from {
            opacity: 0.3;
            transform: perspective(1400px) rotateY(18deg) translateX(-20px);
          }
          to {
            opacity: 1;
            transform: perspective(1400px) rotateY(0) translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hadits-page-next,
          .hadits-page-previous {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
