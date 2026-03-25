import React from "react";

export const metadata = {
  title: "Tentang Do-Dzikir - Aplikasi Dzikir Online Gratis",
  description:
    "Pelajari lebih lanjut tentang Do-Dzikir, aplikasi dzikir online gratis yang membantu umat Muslim dalam menjalankan ibadah dzikir dengan mudah dan teratur. Temukan fitur-fitur utama, visi, misi, dan cara menghubungi kami.",
  keywords: [
    "tentang do-dzikir",
    "aplikasi dzikir online",
    "fitur do-dzikir",
    "visi dan misi do-dzikir",
    "kontak do-dzikir",
    "aplikasi dzikir gratis",
  ],
};

export default function page() {
  return (
    <>
      <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          Tentang Do-Dzikir
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Do-Dzikir adalah website yang dirancang untuk membantu pengguna dalam
          menjalankan ibadah dzikir dengan lebih mudah dan teratur. Aplikasi ini
          menyediakan berbagai fitur seperti pengingat dzikir, koleksi doa-doa
          harian, dan statistik aktivitas dzikir pengguna.
        </p>
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">
          Fitur Utama
        </h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
          <li>
            Pengingat Dzikir: Atur pengingat untuk dzikir harian Anda agar tidak
            lupa melakukannya.
          </li>
          <li>
            Koleksi Doa: Akses berbagai doa dan dzikir yang bisa dipilih sesuai
            kebutuhan.
          </li>
          <li>
            Statistik Aktivitas: Lihat statistik dzikir Anda untuk memantau
            konsistensi ibadah.
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">
          Visi dan Misi
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Visi kami adalah menjadi aplikasi dzikir terbaik yang membantu umat
          Islam dalam meningkatkan kualitas ibadah mereka. Misi kami adalah
          menyediakan platform yang mudah digunakan, informatif, dan inspiratif
          untuk mendukung praktik dzikir sehari-hari.
        </p>
        <h2 className="text-2xl font-semibold mb-3 dark:text-white">
          Kontak Kami
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Jika Anda memiliki pertanyaan, saran, atau ingin berkontribusi dalam
          pengembangan Do-Dzikir, jangan ragu untuk menghubungi kami melalui
          email di{" "}
          <a
            href="mailto:dimasardiminda@gmail.com"
            className="text-blue-600 hover:underline"
          >
            dimasardiminda@gmail.com
          </a>
          . Kami sangat menghargai setiap masukan dari pengguna untuk terus
          meningkatkan layanan kami.
        </p>
      </div>
    </>
  );
}
