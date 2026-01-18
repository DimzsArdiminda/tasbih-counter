# 🕌 Do-Dzikit - Platform Digital Ibadah Muslim

Platform web modern untuk membantu umat Muslim dalam menjalankan ibadah sehari-hari dengan fitur jadwal sholat akurat dan tasbih digital.

## 🌟 Fitur Utama

### 1. **Jadwal Sholat Otomatis**

- 📍 Deteksi lokasi otomatis menggunakan geolokasi browser
- 🗺️ Pencarian kota manual berdasarkan provinsi di Indonesia
- ⏰ Waktu sholat akurat untuk seluruh Indonesia
- 📱 Tampilan responsif untuk semua perangkat

### 2. **Pencarian Lokasi**

- 🔍 Pencarian real-time provinsi dan kota
- 🎯 Sistem pencarian kota terdekat berdasarkan koordinat
- 📊 Data lengkap untuk seluruh provinsi dan kota di Indonesia

### 3. **Tasbih Digital** (Coming Soon)

- Fitur tasbih digital untuk membantu dzikir

### 4. **Al-Quran Digital** (Coming Soon)

- Akses Al-Quran lengkap dengan terjemahan dan tafsir

## 🚀 Teknologi yang Digunakan

- **Framework:** [Next.js 16](https://nextjs.org/) - React framework untuk production
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **Icons:** [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Runtime:** React 19 dengan Server Components

## 📋 Prasyarat

Pastikan Anda telah menginstal:

- Node.js versi 20.x atau lebih baru
- npm atau yarn atau pnpm

## 🛠️ Instalasi

1. **Clone repository**

```bash
git clone <repository-url>
cd do-dzikit
```

2. **Install dependencies**

```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. **Jalankan development server**

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. **Buka browser**
   Akses [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## 📁 Struktur Proyek

```
do-dzikit/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── cities/              # Endpoint data kota
│   │   ├── prayer/              # Endpoint jadwal sholat
│   │   └── province/            # Endpoint data provinsi
│   ├── jadwal-sholat/           # Halaman jadwal sholat
│   │   ├── page.tsx             # List provinsi & kota
│   │   └── [latitude]/          # Dynamic route berdasarkan koordinat
│   │       └── [longitude]/
│   │           └── page.tsx     # Detail jadwal sholat
│   ├── tasbih/                  # Halaman tasbih (coming soon)
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # React Components
│   ├── CTASection.tsx           # Call to Action section
│   ├── FeatureCard.tsx          # Feature card component
│   ├── Features.tsx             # Features section
│   ├── Footer.tsx               # Footer component
│   ├── Header.tsx               # Header/Navbar component
│   ├── Hero.tsx                 # Hero section dengan jadwal sholat
│   └── Sidebar.tsx              # Sidebar component
├── contexts/                     # React Contexts
├── public/                       # Static assets
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🎯 API Endpoints

### 1. Get All Provinces

```
GET /api/province
```

Response: Array of provinces with cities

### 2. Get All Cities

```
GET /api/cities
```

Response: Array of all cities with coordinates

### 3. Get Prayer Times

```
GET /api/prayer?latitude={lat}&longitude={lng}
```

Parameters:

- `latitude`: Latitude koordinat
- `longitude`: Longitude koordinat

Response: Prayer times data for the location

## 🔧 Scripts yang Tersedia

```bash
# Development mode
npm run dev

# Build untuk production
npm run build

# Menjalankan production build
npm run start

# Linting
npm run lint
```

## 🌐 Fitur Utama Halaman

### Homepage (`/`)

- Hero section dengan jadwal sholat otomatis berdasarkan lokasi
- Features section menampilkan fitur-fitur utama
- CTA (Call to Action) section

### Jadwal Sholat (`/jadwal-sholat`)

- List semua provinsi dan kota di Indonesia
- Search functionality untuk mencari provinsi/kota
- Link ke detail jadwal sholat per kota

### Detail Jadwal Sholat (`/jadwal-sholat/[latitude]/[longitude]`)

- Jadwal sholat detail berdasarkan koordinat
- Informasi nama kota dan provinsi
- Waktu sholat lengkap (Imsak, Subuh, Terbit, Dhuha, Dzuhur, Ashar, Maghrib, Isya)

## 🎨 Fitur Teknis

### Client-Side Features

- ✅ Geolocation API untuk deteksi lokasi otomatis
- ✅ Haversine formula untuk menghitung jarak terdekat
- ✅ Real-time search dan filtering
- ✅ Loading states dan error handling
- ✅ Responsive design untuk semua ukuran layar

### Performance

- ✅ Server Components untuk optimal loading
- ✅ Client Components hanya untuk interactive parts
- ✅ Image optimization dengan Next.js Image
- ✅ Code splitting otomatis

## 🔒 Environment Variables

Saat ini aplikasi menggunakan API eksternal. Jika Anda perlu mengonfigurasi API endpoint, tambahkan di `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Deploy otomatis akan berjalan

### Manual Build

```bash
npm run build
npm run start
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

Project ini dibuat untuk keperluan pembelajaran dan portfolio.

## 👨‍💻 Author

Dibuat dengan ❤️ oleh Developer Muslim

## 📞 Support

Jika Anda memiliki pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Note:** Proyek ini masih dalam tahap pengembangan aktif. Beberapa fitur mungkin belum sepenuhnya terimplementasi.

## 🗓️ Roadmap

- [x] Jadwal Sholat dengan geolokasi
- [x] Pencarian kota dan provinsi
- [ ] Tasbih Digital
- [ ] Al-Quran Digital
- [ ] Notifikasi waktu sholat
- [ ] Arah kiblat
- [ ] Doa-doa harian
- [ ] Mode gelap/terang

## 🙏 Acknowledgments

- API jadwal sholat dari penyedia layanan eksternal
- Icons dari [Lucide Icons](https://lucide.dev/)
- UI Framework [Tailwind CSS](https://tailwindcss.com/)
