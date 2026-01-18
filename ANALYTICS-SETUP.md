# Panduan Setup Google Search Console & Analytics

## 1. Google Search Console Setup

### Langkah-langkah:

1. **Kunjungi Google Search Console**
   - Buka https://search.google.com/search-console
   - Login dengan akun Google Anda

2. **Tambah Property**
   - Klik "Add Property"
   - Pilih "URL prefix"
   - Masukkan URL website: `https://do-dzikit.vercel.app`

3. **Verifikasi Ownership**
   - Pilih metode "HTML tag"
   - Copy meta tag yang diberikan
   - Paste di `app/layout.tsx` dalam tag `<head>`

   ```tsx
   <head>
     <meta name="google-site-verification" content="YOUR_CODE_HERE" />
   </head>
   ```

4. **Submit Sitemap**
   - Setelah terverifikasi, buka menu "Sitemaps"
   - Submit URL: `https://do-dzikit.vercel.app/sitemap.xml`

5. **Request Indexing**
   - Buka "URL Inspection"
   - Masukkan URL halaman Anda
   - Klik "Request Indexing"

## 2. Google Analytics 4 Setup

### Langkah-langkah:

1. **Buat GA4 Property**
   - Buka https://analytics.google.com
   - Create new property
   - Pilih platform "Web"

2. **Dapatkan Measurement ID**
   - Copy Measurement ID (format: G-XXXXXXXXXX)

3. **Install di Next.js**

   Buat file baru: `lib/gtag.ts`

   ```typescript
   export const GA_TRACKING_ID = "G-XXXXXXXXXX"; // Ganti dengan ID Anda

   // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
   export const pageview = (url: string) => {
     window.gtag("config", GA_TRACKING_ID, {
       page_path: url,
     });
   };

   // https://developers.google.com/analytics/devguides/collection/gtagjs/events
   export const event = ({
     action,
     category,
     label,
     value,
   }: {
     action: string;
     category: string;
     label: string;
     value?: number;
   }) => {
     window.gtag("event", action, {
       event_category: category,
       event_label: label,
       value: value,
     });
   };
   ```

4. **Update layout.tsx**

   Tambahkan di `app/layout.tsx`:

   ```tsx
   import Script from "next/script";

   // Di dalam component
   <head>
     <Script
       src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
       strategy="afterInteractive"
     />
     <Script id="google-analytics" strategy="afterInteractive">
       {`
         window.dataLayer = window.dataLayer || [];
         function gtag(){window.dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${GA_TRACKING_ID}');
       `}
     </Script>
   </head>;
   ```

## 3. Bing Webmaster Tools

1. **Setup**
   - Buka https://www.bing.com/webmasters
   - Import dari Google Search Console (recommended)
   - Atau manual verification

2. **Submit Sitemap**
   - Submit: `https://do-dzikit.vercel.app/sitemap.xml`

## 4. Performance Monitoring

### Tools yang harus dimonitor:

1. **PageSpeed Insights**
   - https://pagespeed.web.dev/
   - Test URL: `https://do-dzikit.vercel.app`
   - Target: Score 90+ untuk mobile & desktop

2. **Lighthouse**
   - Buka DevTools → Lighthouse
   - Run audit untuk:
     - Performance
     - Accessibility
     - Best Practices
     - SEO

3. **Core Web Vitals**
   Monitor di Google Search Console:
   - LCP (Largest Contentful Paint) < 2.5s
   - FID (First Input Delay) < 100ms
   - CLS (Cumulative Layout Shift) < 0.1

## 5. Tracking Events (Optional tapi Recommended)

Tambah tracking untuk user actions:

```typescript
import { event } from "@/lib/gtag";

// Contoh: Track button click tasbih
const handleTasbihClick = () => {
  event({
    action: "tasbih_click",
    category: "engagement",
    label: "Subhanallah Counter",
  });
  // ... rest of code
};

// Track jadwal sholat search
const handleSearchCity = (city: string) => {
  event({
    action: "search_city",
    category: "jadwal_sholat",
    label: city,
  });
};
```

## 6. Monitoring Schedule

### Harian:

- Check real-time users di GA4
- Monitor errors di Search Console

### Mingguan:

- Review traffic trends
- Check new keywords ranking
- Analyze top pages

### Bulanan:

- Full SEO audit
- Competitor analysis
- Content performance review
- Backlink analysis

## 7. Key Metrics to Track

### Google Search Console:

- **Impressions**: Berapa kali muncul di search
- **Clicks**: Berapa yang klik
- **CTR** (Click Through Rate): Target > 3%
- **Position**: Target masuk top 10

### Google Analytics:

- **Users**: Jumlah pengunjung unique
- **Sessions**: Total kunjungan
- **Bounce Rate**: Target < 50%
- **Avg Session Duration**: Target > 2 menit
- **Pages per Session**: Target > 2

## 8. Quick Wins

1. **Submit ke IndexNow**

   ```bash
   # Instant indexing untuk Bing & Yandex
   curl -X POST "https://api.indexnow.org/indexnow" \
     -H "Content-Type: application/json" \
     -d '{
       "host": "do-dzikit.vercel.app",
       "key": "YOUR_API_KEY",
       "urlList": [
         "https://do-dzikit.vercel.app/",
         "https://do-dzikit.vercel.app/tasbih",
         "https://do-dzikit.vercel.app/jadwal-sholat"
       ]
     }'
   ```

2. **Schema Markup Validator**
   - Test structured data: https://validator.schema.org/
   - Masukkan URL halaman Anda

3. **Mobile-Friendly Test**
   - https://search.google.com/test/mobile-friendly
   - Pastikan semua halaman mobile-friendly

## 9. Troubleshooting

### Website tidak terindex:

1. Check robots.txt
2. Check sitemap.xml
3. Manual submit di Search Console
4. Tunggu 1-2 minggu

### Ranking tidak naik:

1. Analyze competitors
2. Improve content quality
3. Build more backlinks
4. Optimize page speed

### Traffic rendah:

1. Improve CTR dengan better titles
2. Add more long-tail keywords
3. Create more content
4. Promote di social media

---

**Important**: Simpan semua credentials dan tracking IDs dengan aman!
