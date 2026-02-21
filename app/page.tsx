"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Moon,
  Sun,
  BookOpen,
  Clock,
  Calculator,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  MapPin,
  Heart,
  Sparkles,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

export default function LandingPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-linear-to-b from-blue-50 to-white"
      }`}
    >
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Do'a Dzikir - Tasbih Online & Dzikir Digital",
            description:
              "Aplikasi dzikir online gratis dengan fitur tasbih digital, jadwal sholat akurat, dan panduan doa harian. Tingkatkan kualitas ibadah Anda dengan tools islami modern.",
            url: "https://do-dzikir.vercel.app",
            applicationCategory: "LifestyleApplication",
            operatingSystem: "Web, Android, iOS",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "IDR",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "1250",
            },
          }),
        }}
      />

      {/* Header with Dark Mode Toggle */}
      <header
        className={`sticky top-0 z-50 ${
          isDark ? "bg-gray-800/95" : "bg-white/95"
        } backdrop-blur-sm border-b ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles
              className={`w-8 h-8 ${isDark ? "text-blue-400" : "text-blue-600"}`}
            />
            <span
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Do&apos;a Dzikir
            </span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link
              href="/tasbih"
              className={`hover:text-blue-500 transition ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Tasbih
            </Link>
            <Link
              href="/jadwal-sholat"
              className={`hover:text-blue-500 transition ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Jadwal Sholat
            </Link>
            <Link
              href="/blog"
              className={`hover:text-blue-500 transition ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/auth/login"
              className={`hover:text-blue-500 transition ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Login
            </Link>
          </nav>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-100 hover:bg-gray-200"
            } transition`}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span
              className={`text-sm font-medium ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Dipercaya oleh 100.000+ Muslim di Indonesia
            </span>
          </div> */}

          <h1
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Tasbih Digital & Dzikir Online{" "}
            <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gratis untuk Semua
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl mb-8 ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Tingkatkan kualitas ibadah harian Anda dengan aplikasi dzikir
            modern. Dilengkapi tasbih digital, jadwal sholat akurat, dan panduan
            doa lengkap - semua dalam satu platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/tasbih"
              className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Mulai Berdzikir Sekarang
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/jadwal-sholat"
              className={`inline-flex items-center justify-center px-8 py-4 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-white"
                  : "bg-white hover:bg-gray-50 text-gray-900"
              } font-semibold rounded-lg border-2 ${
                isDark ? "border-gray-700" : "border-gray-200"
              } transition-all shadow hover:shadow-lg`}
            >
              Lihat Jadwal Sholat
              <Clock className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Pengguna Aktif", value: "100K+", icon: Users },
              { label: "Dzikir Tercatat", value: "10M+", icon: TrendingUp },
              { label: "Kota di Indonesia", value: "500+", icon: MapPin },
              { label: "Rating Pengguna", value: "4.8/5", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-lg`}
              >
                <stat.icon
                  className={`w-8 h-8 mx-auto mb-2 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <div
                  className={`text-3xl font-bold mb-1 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-16 ${isDark ? "bg-gray-800/50" : "bg-blue-50/50"}`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Fitur Lengkap untuk Ibadah Anda
            </h2>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Semua yang Anda butuhkan untuk meningkatkan kualitas ibadah harian
              dalam satu aplikasi modern dan mudah digunakan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: "Tasbih Digital Gratis",
                description:
                  "Counter dzikir online dengan fitur simpan riwayat, target harian, dan notifikasi pengingat. Hitung tasbih Subhanallah, Alhamdulillah, Allahu Akbar dengan mudah.",
                link: "/tasbih",
              },
              {
                icon: Clock,
                title: "Jadwal Sholat Akurat",
                description:
                  "Waktu sholat tepat berdasarkan lokasi Anda di seluruh Indonesia. Dilengkapi dengan countdown, notifikasi adzan, dan arah kiblat untuk 500+ kota.",
                link: "/jadwal-sholat",
              },
              {
                icon: BookOpen,
                title: "Panduan Dzikir Lengkap",
                description:
                  "Kumpulan doa dan dzikir harian dari Al-Quran dan Hadits shahih. Termasuk dzikir pagi-petang, setelah sholat, dan doa sehari-hari dengan terjemahan.",
                link: "/blog/panduan-lengkap-dzikir-harian",
              },
              {
                icon: Shield,
                title: "Riwayat Tersimpan Aman",
                description:
                  "Semua aktivitas dzikir Anda tersimpan dengan aman. Lacak progress ibadah harian, mingguan, dan bulanan dengan statistik lengkap.",
                link: "/tasbih",
              },
              {
                icon: Zap,
                title: "Cepat & Responsif",
                description:
                  "Aplikasi ringan dan cepat yang dapat diakses dari browser smartphone atau komputer. Bekerja offline untuk kemudahan maksimal.",
                link: "/",
              },
              {
                icon: Globe,
                title: "100% Gratis Selamanya",
                description:
                  "Tidak ada biaya tersembunyi, tidak ada iklan yang mengganggu. Semua fitur premium tersedia gratis untuk semua muslim di Indonesia.",
                link: "/",
              },
            ].map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className={`p-8 rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-500`}
              >
                <feature.icon
                  className={`w-12 h-12 mb-4 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <h3
                  className={`text-xl font-bold mb-3 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } leading-relaxed`}
                >
                  {feature.description}
                </p>
                <div className="mt-4 inline-flex items-center text-blue-500 font-medium">
                  Pelajari lebih lanjut
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Cara Menggunakan Tasbih Online
          </h2>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Mulai berdzikir hanya dalam 3 langkah sederhana
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "1",
              title: "Pilih Dzikir",
              description:
                "Pilih jenis dzikir yang ingin Anda baca: Subhanallah, Alhamdulillah, Allahu Akbar, atau dzikir custom sesuai kebutuhan Anda.",
            },
            {
              step: "2",
              title: "Mulai Menghitung",
              description:
                "Ketuk layar atau tekan tombol setiap kali Anda membaca dzikir. Counter akan otomatis bertambah dan tersimpan secara real-time.",
            },
            {
              step: "3",
              title: "Pantau Progress",
              description:
                "Lihat riwayat dzikir harian Anda, capai target, dan dapatkan insight tentang konsistensi ibadah Anda dengan grafik statistik.",
            },
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div
                className={`w-16 h-16 rounded-full ${
                  isDark ? "bg-blue-500" : "bg-blue-600"
                } text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                {item.step}
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {item.title}
              </h3>
              <p className={isDark ? "text-gray-300" : "text-gray-600"}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-16 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Mengapa Memilih Do&apos;a Dzikir?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Tingkatkan Konsistensi Ibadah",
                    description:
                      "Fitur pengingat dan tracking membantu Anda lebih konsisten dalam berdzikir setiap hari",
                  },
                  {
                    title: "Mudah Digunakan",
                    description:
                      "Interface yang intuitif dan modern memudahkan pengguna dari segala usia",
                  },
                  {
                    title: "Akses Dimana Saja",
                    description:
                      "Gunakan dari smartphone, tablet, atau komputer - berfungsi di semua perangkat",
                  },
                  {
                    title: "Data Tersinkronisasi",
                    description:
                      "Progress Anda tersimpan aman dan bisa diakses dari berbagai perangkat",
                  },
                  {
                    title: "Berdasarkan Sumber Shahih",
                    description:
                      "Semua doa dan dzikir bersumber dari Al-Quran dan Hadits yang shahih",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <div>
                      <h4
                        className={`font-semibold mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {benefit.title}
                      </h4>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`p-8 rounded-2xl ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-2xl`}
            >
              <div className="text-center mb-6">
                <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Manfaat Berdzikir
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Mendekatkan diri kepada Allah SWT",
                  "Menenangkan hati dan pikiran",
                  "Meningkatkan keimanan dan ketakwaan",
                  "Mendapat pahala berlimpah",
                  "Terhindar dari penyakit hati",
                  "Mendapat keberkahan hidup",
                ].map((manfaat, index) => (
                  <li
                    key={index}
                    className={`flex items-center space-x-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <Star className="w-5 h-5 text-yellow-500 shrink-0" />
                    <span>{manfaat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Apa Kata Mereka?
          </h2>
          <p
            className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
            Ribuan pengguna telah merasakan manfaat dari aplikasi kami
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Ahmad Hidayat",
              role: "Pengguna dari Jakarta",
              comment:
                "Aplikasi yang sangat membantu saya untuk lebih konsisten berdzikir. Interface-nya mudah dipahami dan fitur riwayat sangat berguna untuk tracking progress.",
              rating: 5,
            },
            {
              name: "Siti Fatimah",
              role: "Ibu Rumah Tangga",
              comment:
                "Jadwal sholat selalu akurat dan notifikasi adzan sangat membantu saya yang sibuk mengurus rumah. Tasbih digital-nya juga praktis banget!",
              rating: 5,
            },
            {
              name: "Muhammad Rizki",
              role: "Mahasiswa",
              comment:
                "Sebagai mahasiswa, aplikasi ini sangat membantu ibadah saya tetap teratur. Bisa diakses dari HP dan laptop, data tersinkron dengan sempurna.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                isDark ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <div className="flex mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p
                className={`mb-4 italic ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                &quot;{testimonial.comment}&quot;
              </p>
              <div>
                <p
                  className={`font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {testimonial.name}
                </p>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className={`py-16 ${isDark ? "bg-gray-800/50" : "bg-blue-50/50"}`}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Apakah aplikasi ini benar-benar gratis?",
                a: "Ya, 100% gratis selamanya. Semua fitur dapat diakses tanpa biaya apapun. Kami berkomitmen untuk menyediakan tools ibadah yang accessible untuk semua muslim.",
              },
              {
                q: "Apakah data dzikir saya tersimpan aman?",
                a: "Ya, semua data Anda tersimpan dengan aman dan terenkripsi. Anda juga bisa login untuk menyinkronkan data di berbagai perangkat.",
              },
              {
                q: "Bagaimana cara menggunakan tasbih digital?",
                a: "Sangat mudah! Cukup buka halaman Tasbih, pilih jenis dzikir, lalu ketuk layar setiap kali Anda membaca dzikir. Counter akan otomatis bertambah dan tersimpan.",
              },
              {
                q: "Apakah jadwal sholat akurat untuk semua kota?",
                a: "Ya, kami menyediakan jadwal sholat untuk 500+ kota di seluruh Indonesia dengan metode perhitungan yang sesuai dengan Kemenag RI.",
              },
              {
                q: "Bisakah digunakan offline?",
                a: "Fitur tasbih digital bisa digunakan offline. Untuk jadwal sholat memerlukan koneksi internet saat pertama kali mengakses, setelah itu data akan di-cache.",
              },
              {
                q: "Apakah tersedia aplikasi mobile?",
                a: "Saat ini kami menyediakan Progressive Web App (PWA) yang bisa dipasang di smartphone Anda dan berfungsi seperti aplikasi native.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className={`group p-6 rounded-xl ${
                  isDark ? "bg-gray-800" : "bg-white"
                } shadow-md`}
              >
                <summary
                  className={`font-semibold cursor-pointer list-none flex justify-between items-center ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p
                  className={`mt-3 ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div
          className={`rounded-2xl p-12 text-center ${
            isDark
              ? "bg-linear-to-r from-blue-900 to-purple-900"
              : "bg-linear-to-r from-blue-600 to-purple-600"
          } shadow-2xl`}
        >
          <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mulai Perjalanan Spiritual Anda Hari Ini
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan 100.000+ muslim Indonesia yang telah
            meningkatkan kualitas ibadah mereka dengan Do&apos;a dan Dzikir
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tasbih"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Mulai Berdzikir Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/blog/panduan-lengkap-dzikir-harian"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-all"
            >
              Baca Panduan Lengkap
              <BookOpen className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${isDark ? "bg-gray-800" : "bg-gray-900"} text-white py-12`}
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold">Do&apos;a Dzikir</span>
              </div>
              <p className="text-gray-400">
                Platform dzikir digital terlengkap untuk meningkatkan kualitas
                ibadah Anda.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Fitur</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tasbih" className="hover:text-white transition">
                    Tasbih Digital
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jadwal-sholat"
                    className="hover:text-white transition"
                  >
                    Jadwal Sholat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/panduan-lengkap-dzikir-harian"
                    className="hover:text-white transition"
                  >
                    Panduan Dzikir
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Sumber</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog" className="hover:text-white transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Tentang Kami
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Do&apos;a Dzikir. Semua hak
              dilindungi.
            </p>
            <p className="mt-2 text-sm">
              Dibuat dengan ❤️ untuk umat Muslim Indonesia
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
