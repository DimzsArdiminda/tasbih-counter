interface CTASectionProps {
  isDark: boolean;
}

export default function CTASection({ isDark }: CTASectionProps) {
  return (
    <section
      className={`rounded-xl p-8 text-center ${isDark ? "bg-gray-800" : "bg-white"} shadow-sm`}
    >
      <h2
        className={`text-2xl sm:text-3xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Siap untuk Memulai?
      </h2>
      <p
        className={`text-lg mb-6 ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}
      >
        Bergabunglah dengan ribuan pengguna yang telah mempercayai platform kami
        untuk mengembangkan bisnis mereka.
      </p>
      <button
        className={`px-8 py-3 rounded-lg ${isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white font-semibold transition-colors`}
      >
        Daftar Gratis
      </button>
    </section>
  );
}
