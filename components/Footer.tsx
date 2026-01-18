interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer
      className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-t mt-12 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`w-8 h-8 rounded-lg ${isDark ? "bg-blue-600" : "bg-blue-500"} flex items-center justify-center`}
              >
                <span className="text-white font-bold">L</span>
              </div>
              <span
                className={`font-bold text-xl ${isDark ? "text-white" : "text-gray-900"}`}
              >
                Do-Dzikir
              </span>
            </div>
            <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Platform terpercaya untuk solusi bisnis digital Anda.
            </p>
          </div>

          {/* Links Columns */}
          <div>
            <h3
              className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Produk
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Harga
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Perusahaan
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Karir
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              className={`font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}
            >
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className={`${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 pt-8 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <p
            className={`text-center ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            © 2024 Do-Dzikir. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
