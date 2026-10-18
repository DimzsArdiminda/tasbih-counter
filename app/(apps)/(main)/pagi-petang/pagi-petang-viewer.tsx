"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, ZoomIn, ZoomOut, RotateCcw, ShieldCheck } from "lucide-react";

interface PagiPetangViewerProps {
  wirdContent: string;
  haddadContent: string;
  userEmail: string;
}

export default function PagiPetangViewer({
  wirdContent,
  haddadContent,
  userEmail,
}: PagiPetangViewerProps) {
  const [activeTab, setActiveTab] = useState<"wird" | "haddad">("wird");
  const [fontSize, setFontSize] = useState<number>(24);

  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 38));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 18));
  const resetFontSize = () => setFontSize(24);

  const currentContent = activeTab === "wird" ? wirdContent : haddadContent;

  return (
    <div className="mx-auto max-w-5xl py-4 sm:py-6">
      {/* Header bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Akses Khusus: {userEmail}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dzikir Pagi &amp; Petang
          </h1>
          <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Bacaan wirid dan dzikir harian terpilih
          </p>
        </div>

        {/* Font size controls */}
        <div className="flex items-center gap-2 self-start rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:self-auto">
          <span className="px-2 text-xs font-medium text-gray-500 dark:text-zinc-400">
            Ukuran Teks
          </span>
          <button
            type="button"
            onClick={decreaseFontSize}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800"
            title="Perkecil huruf"
          >
            <ZoomOut size={16} />
          </button>
          <button
            type="button"
            onClick={resetFontSize}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800"
            title="Reset ukuran"
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={increaseFontSize}
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 active:scale-95 dark:text-zinc-300 dark:hover:bg-zinc-800"
            title="Perbesar huruf"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl border border-gray-200 bg-gray-100/80 p-1.5 dark:border-zinc-800 dark:bg-zinc-900/80">
        <button
          type="button"
          onClick={() => setActiveTab("wird")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition ${
            activeTab === "wird"
              ? "bg-white text-emerald-700 shadow-md dark:bg-zinc-800 dark:text-emerald-400"
              : "text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          <BookOpen size={18} />
          <span>الورد اللطيف (Al-Wirdul Lathif)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("haddad")}
          className={`flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold transition ${
            activeTab === "haddad"
              ? "bg-white text-emerald-700 shadow-md dark:bg-zinc-800 dark:text-emerald-400"
              : "text-gray-600 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          <BookOpen size={18} />
          <span>راتب الحداد (Ratibul Haddad)</span>
        </button>
      </div>

      {/* Reader content card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        {/* Decorative corner accent */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-emerald-500/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl" />

        <article className="relative">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <div className="mb-8 text-center border-b border-gray-100 pb-6 dark:border-zinc-800">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-800 dark:text-emerald-400">
                    {children}
                  </h1>
                </div>
              ),
              h2: ({ children }) => (
                <div className="my-8 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {children}
                  </span>
                </div>
              ),
              h3: ({ children }) => (
                <h3 className="my-6 text-center font-serif text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p
                  lang="ar"
                  dir="rtl"
                  className="my-6 text-right font-serif leading-[2.3] tracking-wide text-gray-800 dark:text-zinc-100 selection:bg-emerald-200 dark:selection:bg-emerald-900"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {children}
                </p>
              ),
              hr: () => (
                <div className="my-10 flex items-center justify-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent dark:via-emerald-800" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-serif text-lg">۞</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent dark:via-emerald-800" />
                </div>
              ),
            }}
          >
            {currentContent}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
