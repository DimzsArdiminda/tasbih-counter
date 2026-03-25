import React from "react";
import { AlertCircle, Code2, Zap, GitBranch, BookOpen } from "lucide-react";

export const metadata = {
  title: "Developer Documentation - Do-Dzikir",
  description:
    "Panduan lengkap untuk developer yang ingin berkontribusi pada proyek Do-Dzikir. Dokumentasi setup, API endpoints, dan struktur proyek.",
  keywords: [
    "developer documentation",
    "do-dzikir developer",
    "API documentation",
    "next.js tutorial",
    "berkontribusi do-dzikir",
  ],
};

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header Alert - Pengembangan */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 flex gap-3">
          <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">
              Proyek Masih Dalam Pengembangan
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-300 mt-1">
              Do-Dzikir sedang dalam tahap pengembangan aktif. Beberapa fitur
              mungkin belum stabil. Silakan report bugs atau berikan feedback
              через GitHub Issues.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3 dark:text-white">
            👨‍💻 Developer Documentation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Panduan lengkap untuk setup, development, dan kontribusi ke proyek
            Do-Dzikir
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-10">
          <h2 className="font-semibold text-blue-900 dark:text-blue-200 mb-4">
            ⚡ Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="https://github.com/DimzsArdiminda/tasbih-counter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              → GitHub Repository
            </a>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              → Next.js Documentation
            </a>
            <a
              href="https://www.typescriptlang.org/docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              → TypeScript Docs
            </a>
            <a
              href="https://tailwindcss.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              → Tailwind CSS Docs
            </a>
          </div>
        </div>

        {/* Tech Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
            <Zap className="h-8 w-8" /> Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                Frontend
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>Next.js 16</strong> - React framework
                </li>
                <li>
                  • <strong>React 19</strong> - UI library
                </li>
                <li>
                  • <strong>TypeScript</strong> - Type safety
                </li>
                <li>
                  • <strong>Tailwind CSS v4</strong> - Styling
                </li>
                <li>
                  • <strong>Lucide React</strong> - Icons
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                Backend & Database
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  • <strong>Next.js API Routes</strong> - Backend
                </li>
                <li>
                  • <strong>Prisma ORM</strong> - Database
                </li>
                <li>
                  • <strong>PostgreSQL</strong> - Database (via Prisma Adapter)
                </li>
                <li>
                  • <strong>NextAuth.js</strong> - Authentication
                </li>
                <li>
                  • <strong>Zod</strong> - Schema validation
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Setup Development */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
            <Code2 className="h-8 w-8" /> Setup Development
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                1. Prerequisite
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>✓ Node.js &gt;= 20.x</li>
                <li>✓ npm, yarn, atau pnpm</li>
                <li>✓ PostgreSQL (untuk database)</li>
                <li>✓ Git</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                2. Clone Repository
              </h3>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto dark:bg-gray-950">
                <code>
                  git clone https://github.com/DimzsArdiminda/tasbih-counter
                  <br />
                  cd do-dzikir
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                3. Install Dependencies
              </h3>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto dark:bg-gray-950">
                <code>
                  npm install
                  <br /># atau: yarn install / pnpm install
                </code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                4. Environment Variables
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Buat file{" "}
                <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  .env.local
                </code>{" "}
                di root:
              </p>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto dark:bg-gray-950">
                <code>{`DATABASE_URL="postgresql://user:password@localhost:5432/do_dzikir"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"`}</code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                5. Setup Database
              </h3>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto dark:bg-gray-950">
                <code>npx prisma migrate dev</code>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                6. Jalankan Development Server
              </h3>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto dark:bg-gray-950">
                <code>npm run dev</code>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Buka{" "}
                <a
                  href="http://localhost:3000"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  http://localhost:3000
                </a>{" "}
                di browser
              </p>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
            <GitBranch className="h-8 w-8" /> Project Structure
          </h2>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-gray-700 dark:text-gray-300 font-mono">
              {`do-dzikir/
├── app/                          # Next.js App Router
│   ├── (main)/
│   │   ├── dashboard/           # Dashboard pengguna
│   │   ├── tasbih/              # Halaman counter tasbih
│   │   ├── blog/                # Blog & artikel
│   │   └── jadwal-sholat/       # Jadwal waktu sholat
│   ├── (support)/
│   │   ├── tentang/             # Halaman About
│   │   └── developer/           # Developer docs (halaman ini)
│   ├── api/                      # API Routes
│   │   ├── cities/              # GET kota-kota
│   │   ├── prayer/              # GET jadwal sholat
│   │   └── province/            # GET provinsi
│   ├── auth/                     # Authentication pages
│   │   ├── login
│   │   ├── register
│   │   └── forgot-password
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React Components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── FeatureCard.tsx
│   └── ...
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── public/                       # Static assets
├── eslint.config.mjs
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json`}
            </pre>
          </div>
        </section>

        {/* Available Scripts */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
            <Code2 className="h-8 w-8" /> Available Scripts
          </h2>

          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-1">
                npm run dev
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Jalankan development server dengan hot reload
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-1">
                npm run build
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Build aplikasi untuk production
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-1">
                npm run start
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Jalankan production build
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-1">
                npm run lint
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Run ESLint untuk code quality check
              </p>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
            <BookOpen className="h-8 w-8" /> API Documentation
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg dark:text-white mb-2">
                GET /api/province
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Mendapatkan daftar semua provinsi di Indonesia
              </p>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto dark:bg-gray-950">
                <code>{`Response: Array<{
  id: string
  name: string
  cities: Array<City>
}>`}</code>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg dark:text-white mb-2">
                GET /api/cities
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Mendapatkan daftar semua kota dengan koordinat
              </p>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto dark:bg-gray-950">
                <code>{`Response: Array<{
  id: string
  name: string
  latitude: number
  longitude: number
  provinceId: string
}>`}</code>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg dark:text-white mb-2">
                GET /api/prayer
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Mendapatkan jadwal sholat berdasarkan koordinat
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Query Parameters:</strong>
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mb-3 ml-4 space-y-1">
                <li>
                  •{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    latitude
                  </code>{" "}
                  (required): Latitude koordinat
                </li>
                <li>
                  •{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    longitude
                  </code>{" "}
                  (required): Longitude koordinat
                </li>
              </ul>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-3 font-mono text-xs overflow-x-auto dark:bg-gray-950">
                <code>{`Response: {
  subuh: string
  dzuhur: string
  ashar: string
  maghrib: string
  isya: string
  imsak: string
  terbit: string
  dhuha: string
}`}</code>
              </div>
            </div>
          </div>
        </section>

        {/* Development Guidelines */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            📋 Development Guidelines
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                Code Style
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>• Use TypeScript untuk type safety</li>
                <li>• Follow ESLint config yang sudah ada</li>
                <li>• Gunakan Tailwind CSS untuk styling</li>
                <li>• Buat component yang reusable dan modular</li>
                <li>• Gunakan server components ketika memungkinkan</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                Naming Conventions
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>
                  • Components: PascalCase (e.g.,{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    HeaderNav.tsx
                  </code>
                  )
                </li>
                <li>
                  • Files: kebab-case untuk pages (e.g.,{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    jadwal-sholat
                  </code>
                  )
                </li>
                <li>
                  • Variables: camelCase (e.g.,{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    prayerTimes
                  </code>
                  )
                </li>
                <li>
                  • Database: snake_case (e.g.,{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    prayer_times
                  </code>
                  )
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 dark:text-white">
                Git Workflow
              </h3>
              <ol className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                <li>1. Fork repository</li>
                <li>
                  2. Buat branch fitur:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    git checkout -b feature/amazing-feature
                  </code>
                </li>
                <li>
                  3. Commit perubahan:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    git commit -m "Add amazing feature"
                  </code>
                </li>
                <li>
                  4. Push ke branch:{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-1">
                    git push origin feature/amazing-feature
                  </code>
                </li>
                <li>5. Buat Pull Request dengan deskripsi yang jelas</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            🗓️ Project Roadmap
          </h2>

          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                ✅ Done
              </h3>
              <ul className="text-sm text-green-800 dark:text-green-300 space-y-1 ml-4">
                <li>• Jadwal sholat dengan geolokasi</li>
                <li>• Pencarian kota dan provinsi</li>
                <li>• Homepage & landing page</li>
                <li>• Dark mode support</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                🚀 In Progress
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-300 space-y-1 ml-4">
                <li>• Tasbih counter digital</li>
                <li>• User authentication & dashboard</li>
                <li>• Prayer time notifications</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                📅 Planned
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 ml-4">
                <li>• Al-Quran digital viewer</li>
                <li>• Daily duas & prayers</li>
                <li>• Qibla direction finder</li>
                <li>• User activity statistics</li>
                <li>• Mobile app (React Native)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            🔧 Troubleshooting
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">
                Database Connection Error
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Pastikan DATABASE_URL sudah benar di{" "}
                <code className="bg-gray-100 dark:bg-gray-950 px-1 rounded">
                  .env.local
                </code>{" "}
                dan PostgreSQL service berjalan.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">
                Port 3000 Already in Use
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Gunakan port berbeda:{" "}
                <code className="bg-gray-100 dark:bg-gray-950 px-1 rounded">
                  npm run dev -- -p 3001
                </code>
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 dark:text-white">
                Module Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Jalankan{" "}
                <code className="bg-gray-100 dark:bg-gray-950 px-1 rounded">
                  npm install
                </code>{" "}
                ulang dan restart development server.
              </p>
            </div>
          </div>
        </section>

        {/* Contributing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            🤝 Contributing
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Kontribusi sangat diterima dari developer Muslim maupun non-Muslim
            yang ingin membantu! Dengan berkontribusi, Anda membantu memperluas
            akses teknologi untuk keperluan ibadah.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
              Cara Berkontribusi
            </h3>
            <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-2 ml-4">
              <li>1. Report bugs atau suggest fitur melalui GitHub Issues</li>
              <li>2. Fork repository & buat branch fitur</li>
              <li>3. Buat commit dengan pesan yang jelas</li>
              <li>4. Push dan buat Pull Request dengan deskripsi</li>
              <li>5. Tunggu review dan approval dari maintainers</li>
            </ol>
          </div>
        </section>

        {/* Support */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold mb-6 dark:text-white">
            📞 Support & Contact
          </h2>

          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Ada pertanyaan atau masalah? Hubungi kami:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>
                📧 Email:{" "}
                <a
                  href="mailto:dimasardiminda@gmail.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  dimasardiminda@gmail.com
                </a>
              </li>
              <li>
                🐙 GitHub Issues:{" "}
                <a
                  href="https://github.com/DimzsArdiminda/tasbih-counter/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Report bugs & features
                </a>
              </li>
              <li>📚 Documentation: Baca README.md di repository</li>
            </ul>
          </div>
        </section>

        {/* Footer Note */}
        <div className="border-t dark:border-gray-700 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>Made with ❤️ untuk komunitas Muslim Indonesia</p>
          <p className="text-sm mt-2">
            © 2024 Do-Dzikir. Dokumentasi ini masih dalam pengembangan.
          </p>
        </div>
      </div>
    </div>
  );
}
