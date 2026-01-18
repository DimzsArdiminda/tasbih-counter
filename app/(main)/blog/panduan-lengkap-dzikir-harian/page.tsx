"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { ArrowLeft, BookOpen, Heart, Clock } from "lucide-react";

export default function PanduanDzikirHarianPage() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50"
      }`}
    >
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className={`inline-flex items-center gap-2 mb-8 ${
            isDark
              ? "text-green-400 hover:text-green-300"
              : "text-green-600 hover:text-green-700"
          } transition-colors`}
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                isDark
                  ? "bg-green-900/50 text-green-300"
                  : "bg-green-100 text-green-700"
              }`}
            >
              Dzikir
            </span>
            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
              18 Januari 2026
            </span>
          </div>

          <h1
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Panduan Lengkap Dzikir Harian untuk Muslim
          </h1>

          <p
            className={`text-xl ${
              isDark ? "text-gray-300" : "text-gray-600"
            } mb-6`}
          >
            Pelajari dzikir-dzikir penting yang dianjurkan untuk diamalkan
            setiap hari, lengkap dengan keutamaan dan cara pengamalannya
            menggunakan tasbih online.
          </p>

          <div
            className={`flex flex-wrap gap-6 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>5 menit baca</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>Panduan Praktis</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>Untuk Semua Level</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div
          className={`prose lg:prose-xl ${
            isDark ? "prose-invert" : ""
          } max-w-none`}
        >
          {/* Introduction */}
          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Mengapa Dzikir Penting dalam Islam?
            </h2>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              <strong>Dzikir</strong> atau <strong>zikir</strong> merupakan
              bentuk ibadah yang sangat dianjurkan dalam Islam. Allah SWT
              berfirman dalam Al-Quran:
            </p>
            <blockquote
              className={`border-l-4 pl-4 italic my-6 ${
                isDark
                  ? "border-green-400 text-gray-300"
                  : "border-green-600 text-gray-600"
              }`}
            >
              "Maka ingatlah kamu kepada-Ku, Aku pun akan ingat kepadamu."
              <br />
              <span className="text-sm">(QS. Al-Baqarah: 152)</span>
            </blockquote>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              Berdzikir adalah cara kita untuk selalu mengingat Allah dalam
              setiap aktivitas. Dengan teknologi modern seperti{" "}
              <Link
                href="/tasbih"
                className={`font-semibold ${
                  isDark ? "text-green-400" : "text-green-600"
                } hover:underline`}
              >
                tasbih online
              </Link>
              , kini semakin mudah untuk mengamalkan dzikir secara konsisten.
            </p>
          </section>

          {/* Dzikir Pagi */}
          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              1. Dzikir Pagi (Ba'da Subuh)
            </h2>

            <div
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 mb-6`}
            >
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                Subhanallah (33x)
              </h3>
              <p
                className={`text-2xl text-center mb-3 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                سُبْحَانَ اللّٰهِ
              </p>
              <p
                className={`mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Artinya:</strong> Maha Suci Allah
              </p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                <strong>Keutamaan:</strong> Mensucikan Allah dari segala
                kekurangan. Diamalkan 33 kali setelah sholat fardhu.
              </p>
            </div>

            <div
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 mb-6`}
            >
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                Alhamdulillah (33x)
              </h3>
              <p
                className={`text-2xl text-center mb-3 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                اَلْحَمْدُ لِلّٰهِ
              </p>
              <p
                className={`mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Artinya:</strong> Segala puji bagi Allah
              </p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                <strong>Keutamaan:</strong> Ungkapan syukur kepada Allah atas
                segala nikmat. Diamalkan 33 kali.
              </p>
            </div>

            <div
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 mb-6`}
            >
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                Allahu Akbar (34x)
              </h3>
              <p
                className={`text-2xl text-center mb-3 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                اَللّٰهُ اَكْبَرُ
              </p>
              <p
                className={`mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Artinya:</strong> Allah Maha Besar
              </p>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                <strong>Keutamaan:</strong> Menegaskan kebesaran Allah di atas
                segala sesuatu. Diamalkan 34 kali (atau 33x).
              </p>
            </div>
          </section>

          {/* Dzikir Istighfar */}
          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              2. Istighfar (100x Sehari)
            </h2>

            <div
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 mb-6`}
            >
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-green-400" : "text-green-600"
                }`}
              >
                Astaghfirullah (100x)
              </h3>
              <p
                className={`text-2xl text-center mb-3 ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                أَسْتَغْفِرُ اللّٰهَ
              </p>
              <p
                className={`mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}
              >
                <strong>Artinya:</strong> Aku memohon ampun kepada Allah
              </p>
              <blockquote
                className={`border-l-4 pl-4 italic my-4 ${
                  isDark
                    ? "border-green-400 text-gray-300"
                    : "border-green-600 text-gray-600"
                }`}
              >
                "Demi Allah, sesungguhnya aku beristighfar kepada Allah dan
                bertaubat kepada-Nya dalam sehari lebih dari 70 kali."
                <br />
                <span className="text-sm">
                  (HR. Bukhari, dari Abu Hurairah)
                </span>
              </blockquote>
            </div>
          </section>

          {/* Tips Menggunakan Tasbih Online */}
          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Tips Menggunakan Tasbih Digital
            </h2>

            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Dengan{" "}
              <Link
                href="/tasbih"
                className={`font-semibold ${
                  isDark ? "text-green-400" : "text-green-600"
                } hover:underline`}
              >
                tasbih online gratis
              </Link>{" "}
              dari Do'a Dzikit, Anda bisa:
            </p>

            <ul
              className={`list-disc pl-6 space-y-2 mb-6 ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>
                <strong>Set target dzikir</strong> sesuai anjuran (33, 100, atau
                1000 kali)
              </li>
              <li>
                <strong>Track history dzikir harian</strong> untuk melihat
                konsistensi
              </li>
              <li>
                <strong>Gunakan sound & vibration</strong> sebagai feedback
              </li>
              <li>
                <strong>Tambah custom dzikir</strong> sesuai kebutuhan
              </li>
              <li>
                <strong>Akses kapan saja</strong> tanpa perlu install aplikasi
              </li>
            </ul>

            <div
              className={`${
                isDark ? "bg-green-900/30" : "bg-green-50"
              } border ${
                isDark ? "border-green-700" : "border-green-200"
              } rounded-xl p-6`}
            >
              <p
                className={`text-center font-semibold ${
                  isDark ? "text-green-300" : "text-green-700"
                }`}
              >
                💡 Mulai berdzikir sekarang dengan{" "}
                <Link href="/tasbih" className="underline hover:no-underline">
                  Tasbih Online Do'a Dzikit
                </Link>
              </p>
            </div>
          </section>

          {/* Manfaat Dzikir Rutin */}
          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Manfaat Dzikir Rutin
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div
                className={`${
                  isDark
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white border-gray-200"
                } border rounded-xl p-6`}
              >
                <h3
                  className={`font-bold mb-2 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  ✨ Spiritual
                </h3>
                <ul
                  className={`space-y-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>• Mendekatkan diri kepada Allah</li>
                  <li>• Mendapat pahala berlipat</li>
                  <li>• Hati menjadi tenang</li>
                </ul>
              </div>

              <div
                className={`${
                  isDark
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white border-gray-200"
                } border rounded-xl p-6`}
              >
                <h3
                  className={`font-bold mb-2 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                >
                  🧠 Mental
                </h3>
                <ul
                  className={`space-y-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>• Mengurangi stress & anxiety</li>
                  <li>• Meningkatkan fokus</li>
                  <li>• Pikiran lebih positif</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2
              className={`text-3xl font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Kesimpulan
            </h2>
            <p className={`mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Dzikir adalah ibadah yang mudah namun memiliki keutamaan luar
              biasa. Dengan konsistensi dan bantuan{" "}
              <strong className={isDark ? "text-green-400" : "text-green-600"}>
                aplikasi tasbih digital
              </strong>
              , kita dapat mengamalkan dzikir harian dengan lebih teratur.
            </p>
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>
              Mulailah hari ini dengan target kecil, misalnya 33x Subhanallah
              setiap pagi. Tingkatkan secara bertahap hingga menjadi kebiasaan
              yang melekat.
            </p>
          </section>

          {/* CTA Section */}
          <div
            className={`${isDark ? "bg-green-900/30" : "bg-green-50"} border ${
              isDark ? "border-green-700" : "border-green-200"
            } rounded-2xl p-8 text-center`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Siap Memulai Dzikir Harian?
            </h3>
            <p className={`mb-6 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              Gunakan tasbih online gratis untuk membantu ibadah dzikir Anda
            </p>
            <Link
              href="/tasbih"
              className={`inline-block px-8 py-4 rounded-xl font-bold text-white ${
                isDark
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-600 hover:bg-green-700"
              } transition-colors shadow-lg`}
            >
              Mulai Berdzikir Sekarang →
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <aside className="mt-16">
          <h3
            className={`text-2xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Artikel Terkait
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/blog/keutamaan-tasbih-dalam-islam"
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 hover:shadow-xl transition-all`}
            >
              <h4
                className={`font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Keutamaan Tasbih dalam Islam
              </h4>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Pahala berlipat ganda dari berdzikir dengan tasbih
              </p>
            </Link>

            <Link
              href="/blog/cara-menggunakan-tasbih-digital"
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 hover:shadow-xl transition-all`}
            >
              <h4
                className={`font-bold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Cara Menggunakan Tasbih Digital
              </h4>
              <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                Tutorial lengkap menggunakan aplikasi tasbih online
              </p>
            </Link>
          </div>
        </aside>
      </article>
    </div>
  );
}
