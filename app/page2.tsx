"use client";

import { useState, useEffect, useRef } from "react";

const arabicVerses = [
  {
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang",
    source: "Al-Fatihah: 1",
  },
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    translation:
      "Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya",
    source: "At-Talaq: 2",
  },
  {
    arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    translation: "Sesungguhnya sesudah kesulitan itu ada kemudahan",
    source: "Al-Insyirah: 6",
  },
];

const services = [
  {
    icon: "📖",
    title: "Kajian Al-Qur'an",
    desc: "Program tahsin, tahfidz, dan tafsir Al-Qur'an untuk semua kalangan usia dengan metode terpadu dan pengajar bersertifikat.",
    badge: "Populer",
  },
  {
    icon: "🕌",
    title: "Majelis Ta'lim",
    desc: "Kajian rutin membahas fiqih, akidah, akhlak, dan hadits yang disampaikan oleh para ustadz berpengalaman.",
    badge: null,
  },
  {
    icon: "🌙",
    title: "Program Ramadhan",
    desc: "Kegiatan intensif selama Ramadhan meliputi tadarus, i'tikaf, zakat fitrah, dan berbagi kepada sesama.",
    badge: "Segera",
  },
  {
    icon: "💡",
    title: "Konsultasi Syariah",
    desc: "Layanan konsultasi kehidupan sehari-hari berbasis tuntunan Islam — keluarga, muamalah, dan pernikahan.",
    badge: null,
  },
  {
    icon: "🤲",
    title: "Zakat & Infaq",
    desc: "Platform amanah untuk menyalurkan zakat, infaq, dan sedekah kepada mustahiq yang membutuhkan.",
    badge: null,
  },
  {
    icon: "🏫",
    title: "Pendidikan Islam",
    desc: "Kurikulum pendidikan Islam terpadu untuk anak-anak, remaja, hingga dewasa dalam suasana yang kondusif.",
    badge: null,
  },
];

const stats = [
  { value: "12.000+", label: "Jamaah Aktif" },
  { value: "85+", label: "Pengajar Tersertifikasi" },
  { value: "120+", label: "Program Kajian" },
  { value: "15 Tahun", label: "Pengalaman" },
];

const articles = [
  {
    tag: "Fiqih",
    title:
      "Panduan Lengkap Sholat Wajib: Rukun, Syarat, dan Hal yang Membatalkan",
    desc: "Memahami tata cara sholat yang benar sesuai sunnah Rasulullah ﷺ sebagai fondasi ibadah umat Islam.",
    date: "18 Feb 2026",
  },
  {
    tag: "Akhlak",
    title:
      "Adab Bertetangga dalam Islam: Hak dan Kewajiban yang Sering Terlupakan",
    desc: "Islam mengajarkan tata cara bertetangga yang penuh kasih sayang dan saling menghormati satu sama lain.",
    date: "15 Feb 2026",
  },
  {
    tag: "Keluarga",
    title: "Mendidik Anak Sholeh di Era Digital: Tantangan dan Solusi Islami",
    desc: "Strategi parenting Islami untuk membentengi anak dari pengaruh negatif teknologi tanpa mengucilkan mereka.",
    date: "10 Feb 2026",
  },
];

const testimonials = [
  {
    name: "Ustadz Ahmad Fauzi",
    role: "Kepala Program Tahfidz",
    text: "Alhamdulillah, melalui platform ini ribuan santri telah berhasil menghafal Al-Qur'an. Semoga menjadi amal jariyah bagi kita semua.",
    avatar: "أ",
  },
  {
    name: "Hj. Siti Rahmawati",
    role: "Peserta Majelis Ta'lim",
    text: "Program kajian di sini sangat sistematis dan mudah dipahami. Ilmu yang didapat langsung bisa diamalkan dalam kehidupan sehari-hari.",
    avatar: "س",
  },
  {
    name: "Bapak Ridwan Kurniawan",
    role: "Donatur Zakat",
    text: "Laporan penyaluran zakat sangat transparan dan terpercaya. Saya yakin amanah ini dikelola dengan sebaik-baiknya.",
    avatar: "ر",
  },
];

export default function IslamicLandingPage() {
  const [activeVerse, setActiveVerse] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVerse((v) => (v + 1) % arabicVerses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    visibleSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.add("visible");
    });
  }, [visibleSections]);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700&display=swap');

        :root {
          --emerald: #065f46;
          --emerald-mid: #047857;
          --emerald-light: #10b981;
          --gold: #b45309;
          --gold-light: #d97706;
          --gold-pale: #fef3c7;
          --cream: #fffbf0;
          --parchment: #fdf6e3;
          --ink: #1a1612;
          --ink-mid: #3d3530;
          --ink-soft: #6b5f57;
          --white: #ffffff;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Nunito', sans-serif;
          background: var(--cream);
          color: var(--ink);
          overflow-x: hidden;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
          height: 70px;
        }
        .nav.scrolled {
          background: rgba(255,251,240,0.96);
          backdrop-filter: blur(12px);
          box-shadow: 0 2px 20px rgba(6,95,70,0.1);
        }
        .nav-logo {
          font-family: 'Lora', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--emerald);
          text-decoration: none;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .nav-logo span { color: var(--gold); }
        .nav-links {
          display: flex; gap: 2rem; list-style: none;
        }
        .nav-links a {
          text-decoration: none;
          color: var(--ink-mid);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--emerald); }
        .nav-cta {
          background: var(--emerald);
          color: white !important;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          transition: background 0.2s !important;
        }
        .nav-cta:hover { background: var(--emerald-mid) !important; color: white !important; }

        /* HERO */
        .hero {
          min-height: 100vh;
          background: linear-gradient(160deg, #022c22 0%, #064e3b 40%, #065f46 70%, #0d7a5b 100%);
          position: relative;
          overflow: hidden;
          display: flex; align-items: center;
        }

        .hero-pattern {
          position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 20% 30%, rgba(180,83,9,0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16,185,129,0.08) 0%, transparent 50%);
          pointer-events: none;
        }

        .geo-ornament {
          position: absolute;
          pointer-events: none;
        }
        .geo-ornament.top-right {
          top: -80px; right: -80px;
          width: 400px; height: 400px;
          border: 2px solid rgba(180,83,9,0.2);
          border-radius: 50%;
        }
        .geo-ornament.top-right::before {
          content: '';
          position: absolute; inset: 30px;
          border: 1px solid rgba(180,83,9,0.15);
          border-radius: 50%;
        }
        .geo-ornament.top-right::after {
          content: '';
          position: absolute; inset: 60px;
          border: 1px solid rgba(180,83,9,0.1);
          border-radius: 50%;
        }
        .geo-ornament.bottom-left {
          bottom: -60px; left: -60px;
          width: 300px; height: 300px;
          border: 1px solid rgba(16,185,129,0.15);
          transform: rotate(45deg);
        }

        /* Star of David-like geometric shape */
        .star-bg {
          position: absolute;
          right: 8%;
          top: 50%;
          transform: translateY(-50%);
          width: 380px;
          height: 380px;
          opacity: 0.07;
          animation: slowRotate 60s linear infinite;
        }

        @keyframes slowRotate { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }

        .hero-content {
          position: relative; z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 2rem 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: rgba(180,83,9,0.2);
          border: 1px solid rgba(180,83,9,0.35);
          color: #fbbf24;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.4rem 1rem;
          border-radius: 100px;
          margin-bottom: 1.5rem;
        }

        .hero-arabic {
          font-family: 'Amiri', serif;
          font-size: 2rem;
          color: #fbbf24;
          text-align: right;
          line-height: 1.6;
          margin-bottom: 0.5rem;
          direction: rtl;
        }

        .hero-h1 {
          font-family: 'Lora', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.25;
          margin-bottom: 1.2rem;
        }
        .hero-h1 .accent { color: #6ee7b7; }

        .hero-desc {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.75);
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        .hero-btns {
          display: flex; gap: 1rem; flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #b45309, #d97706);
          color: white;
          padding: 0.85rem 2rem;
          border: none; border-radius: 8px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 4px 20px rgba(180,83,9,0.4);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(180,83,9,0.5); }

        .btn-outline {
          background: transparent;
          color: white;
          padding: 0.85rem 2rem;
          border: 2px solid rgba(255,255,255,0.35);
          border-radius: 8px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.07); }

        /* Verse Carousel */
        .verse-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(180,83,9,0.25);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }
        .verse-card::before {
          content: '"';
          font-family: 'Amiri', serif;
          font-size: 8rem;
          color: rgba(180,83,9,0.15);
          position: absolute;
          top: -20px; left: 10px;
          line-height: 1;
        }

        .verse-arabic-text {
          font-family: 'Amiri', serif;
          font-size: 1.6rem;
          color: #6ee7b7;
          text-align: right;
          direction: rtl;
          line-height: 2;
          margin-bottom: 1rem;
        }
        .verse-translation {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          font-style: italic;
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }
        .verse-source {
          font-size: 0.8rem;
          color: #fbbf24;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .verse-dots {
          display: flex; gap: 0.4rem; margin-top: 1.2rem;
        }
        .verse-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.3);
          cursor: pointer; transition: background 0.2s;
          border: none;
        }
        .verse-dot.active { background: #fbbf24; }

        /* STATS */
        .stats-section {
          background: var(--emerald);
          padding: 3rem 2rem;
        }
        .stats-inner {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 2rem; text-align: center;
        }
        .stat-value {
          font-family: 'Lora', serif;
          font-size: 2.2rem;
          font-weight: 700;
          color: #6ee7b7;
        }
        .stat-label {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          margin-top: 0.25rem;
          font-weight: 600;
        }

        /* SECTION BASE */
        .section {
          padding: 6rem 2rem;
        }
        .section-inner {
          max-width: 1200px; margin: 0 auto;
        }
        .section-tag {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 0.75rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .section-tag::before, .section-tag::after {
          content: '◆';
          font-size: 0.5rem;
          opacity: 0.5;
        }
        .section-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--emerald);
          line-height: 1.3;
          margin-bottom: 1rem;
        }
        .section-desc {
          font-size: 1rem;
          color: var(--ink-soft);
          line-height: 1.8;
          max-width: 540px;
        }

        /* ABOUT */
        .about-section {
          background: var(--parchment);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .about-visual {
          position: relative;
        }
        .about-main-card {
          background: var(--emerald);
          border-radius: 20px;
          padding: 3rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .about-main-card::before {
          content: '﷽';
          font-family: 'Amiri', serif;
          font-size: 3.5rem;
          position: absolute;
          top: 1rem; right: 1.5rem;
          opacity: 0.15;
        }
        .about-main-card h3 {
          font-family: 'Amiri', serif;
          font-size: 2rem;
          color: #6ee7b7;
          margin-bottom: 0.5rem;
          direction: rtl;
          text-align: right;
        }
        .about-main-card p {
          font-size: 0.95rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.8);
        }
        .about-side-card {
          position: absolute;
          bottom: -24px; right: -24px;
          background: linear-gradient(135deg, #b45309, #d97706);
          border-radius: 16px;
          padding: 1.5rem;
          color: white;
          width: 200px;
          box-shadow: 0 10px 40px rgba(180,83,9,0.3);
        }
        .about-side-card .num {
          font-family: 'Lora', serif;
          font-size: 2rem;
          font-weight: 700;
        }
        .about-side-card .lbl {
          font-size: 0.8rem;
          opacity: 0.85;
        }

        .about-list {
          list-style: none;
          margin-top: 2rem;
        }
        .about-list li {
          display: flex; align-items: flex-start; gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          color: var(--ink-mid);
          line-height: 1.6;
        }
        .about-list li::before {
          content: '✦';
          color: var(--gold);
          font-size: 0.8rem;
          margin-top: 3px;
          flex-shrink: 0;
        }

        /* SERVICES */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .service-card {
          background: white;
          border: 1px solid rgba(6,95,70,0.1);
          border-radius: 16px;
          padding: 1.75rem;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          position: relative;
          overflow: hidden;
        }
        .service-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--emerald), var(--gold));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s;
        }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(6,95,70,0.12); border-color: rgba(6,95,70,0.25); }
        .service-card:hover::after { transform: scaleX(1); }

        .service-badge {
          display: inline-block;
          background: var(--gold-pale);
          color: var(--gold);
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.6rem;
          border-radius: 100px;
          margin-bottom: 0.75rem;
        }

        .service-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          display: block;
        }
        .service-title {
          font-family: 'Lora', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--emerald);
          margin-bottom: 0.6rem;
        }
        .service-desc {
          font-size: 0.88rem;
          color: var(--ink-soft);
          line-height: 1.7;
        }

        /* ARTICLES */
        .articles-section { background: var(--parchment); }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .article-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(6,95,70,0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .article-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(6,95,70,0.1); }
        .article-thumb {
          height: 180px;
          background: linear-gradient(135deg, var(--emerald) 0%, #0d9488 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Amiri', serif;
          font-size: 2.5rem;
          color: rgba(255,255,255,0.2);
          position: relative;
          overflow: hidden;
        }
        .article-thumb::after {
          content: attr(data-arabic);
          font-family: 'Amiri', serif;
          font-size: 3.5rem;
          color: rgba(255,255,255,0.12);
          position: absolute;
          bottom: -10px; right: 10px;
        }
        .article-tag-pill {
          display: inline-block;
          background: var(--emerald);
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.75rem;
          border-radius: 100px;
          position: absolute;
          top: 12px; left: 12px;
        }
        .article-body { padding: 1.4rem; }
        .article-title {
          font-family: 'Lora', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.45;
          margin-bottom: 0.6rem;
        }
        .article-desc {
          font-size: 0.85rem;
          color: var(--ink-soft);
          line-height: 1.65;
          margin-bottom: 1rem;
        }
        .article-date {
          font-size: 0.78rem;
          color: var(--gold);
          font-weight: 700;
        }

        /* TESTIMONIALS */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }
        .testimonial-card {
          background: var(--parchment);
          border: 1px solid rgba(6,95,70,0.1);
          border-radius: 16px;
          padding: 1.75rem;
        }
        .testi-stars {
          color: #f59e0b;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .testi-text {
          font-size: 0.93rem;
          color: var(--ink-mid);
          line-height: 1.75;
          font-style: italic;
          margin-bottom: 1.5rem;
        }
        .testi-author {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .testi-avatar {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, var(--emerald), var(--emerald-light));
          display: flex; align-items: center; justify-content: center;
          font-family: 'Amiri', serif;
          font-size: 1.1rem;
          color: white;
          flex-shrink: 0;
        }
        .testi-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--ink);
        }
        .testi-role {
          font-size: 0.78rem;
          color: var(--ink-soft);
        }

        /* PRAYER TIMES WIDGET */
        .prayer-section {
          background: linear-gradient(160deg, #022c22, #064e3b);
          padding: 5rem 2rem;
        }
        .prayer-inner {
          max-width: 900px; margin: 0 auto; text-align: center;
        }
        .prayer-title {
          font-family: 'Lora', serif;
          font-size: 2rem;
          color: white;
          margin-bottom: 0.5rem;
        }
        .prayer-subtitle {
          color: rgba(255,255,255,0.6);
          margin-bottom: 2.5rem;
        }
        .prayer-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
        }
        .prayer-item {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(110,231,183,0.2);
          border-radius: 12px;
          padding: 1.25rem 1rem;
          color: white;
          transition: background 0.2s;
        }
        .prayer-item:hover { background: rgba(255,255,255,0.12); }
        .prayer-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: #6ee7b7;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }
        .prayer-time {
          font-family: 'Lora', serif;
          font-size: 1.5rem;
          font-weight: 700;
        }

        /* CTA */
        .cta-section {
          background: var(--gold-pale);
          padding: 6rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center, rgba(180,83,9,0.08) 0%, transparent 70%);
        }
        .cta-arabic {
          font-family: 'Amiri', serif;
          font-size: 1.8rem;
          color: var(--gold);
          margin-bottom: 0.5rem;
          direction: rtl;
        }
        .cta-h2 {
          font-family: 'Lora', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--emerald);
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .cta-desc {
          font-size: 1rem;
          color: var(--ink-soft);
          max-width: 500px;
          margin: 0 auto 2.5rem;
          line-height: 1.8;
        }
        .cta-form {
          display: flex; gap: 0.75rem;
          max-width: 440px; margin: 0 auto;
          flex-wrap: wrap; justify-content: center;
        }
        .cta-input {
          flex: 1; min-width: 220px;
          padding: 0.85rem 1.2rem;
          border: 2px solid rgba(6,95,70,0.2);
          border-radius: 8px;
          font-family: 'Nunito', sans-serif;
          font-size: 0.95rem;
          background: white;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s;
        }
        .cta-input:focus { border-color: var(--emerald); }
        .cta-input::placeholder { color: #9ca3af; }

        /* FOOTER */
        footer {
          background: #011a12;
          color: rgba(255,255,255,0.7);
          padding: 4rem 2rem 2rem;
        }
        .footer-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand {
          font-family: 'Lora', serif;
          font-size: 1.3rem;
          color: white;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .footer-brand span { color: #6ee7b7; }
        .footer-brand-desc {
          font-size: 0.88rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .footer-social {
          display: flex; gap: 0.75rem;
        }
        .social-btn {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .social-btn:hover { background: rgba(255,255,255,0.15); }
        .footer-col h4 {
          font-family: 'Lora', serif;
          font-size: 0.95rem;
          color: white;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .footer-links { list-style: none; }
        .footer-links li { margin-bottom: 0.6rem; }
        .footer-links a {
          text-decoration: none;
          color: rgba(255,255,255,0.6);
          font-size: 0.88rem;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: #6ee7b7; }
        .footer-bottom {
          max-width: 1200px; margin: 0 auto;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 1.5rem;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.82rem;
        }
        .footer-bottom-arabic {
          font-family: 'Amiri', serif;
          color: #6ee7b7;
          font-size: 1rem;
        }

        /* ANIMATIONS */
        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        [data-animate].visible {
          opacity: 1;
          transform: translateY(0);
        }
        [data-animate].delay-1 { transition-delay: 0.1s; }
        [data-animate].delay-2 { transition-delay: 0.2s; }
        [data-animate].delay-3 { transition-delay: 0.3s; }
        [data-animate].delay-4 { transition-delay: 0.4s; }
        [data-animate].delay-5 { transition-delay: 0.5s; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .hero-content { grid-template-columns: 1fr; }
          .star-bg { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .articles-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonials-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .prayer-grid { grid-template-columns: repeat(3, 1fr); }
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr; }
          .articles-grid { grid-template-columns: 1fr; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); }
          .prayer-grid { grid-template-columns: repeat(2, 1fr); }
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
        }
      `}</style>

      {/* SEO Meta (if used in Next.js add <Head>) */}
      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="nav-logo">
          ☪ Nur<span>Ilmu</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#tentang">Tentang Kami</a>
          </li>
          <li>
            <a href="#layanan">Program</a>
          </li>
          <li>
            <a href="#artikel">Kajian</a>
          </li>
          <li>
            <a href="#kontak">Kontak</a>
          </li>
          <li>
            <a href="#daftar" className="nav-cta">
              Daftar Sekarang
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" aria-label="Hero — NurIlmu Islamic Center">
        <div className="hero-pattern" />
        <div className="geo-ornament top-right" />
        <div className="geo-ornament bottom-left" />

        <svg className="star-bg" viewBox="0 0 200 200" fill="none">
          <polygon
            points="100,10 115,70 165,40 135,90 190,100 135,110 165,160 115,130 100,190 85,130 35,160 65,110 10,100 65,90 35,40 85,70"
            fill="white"
          />
          <circle
            cx="100"
            cy="100"
            r="85"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>

        <div className="hero-content">
          <div>
            <div className="hero-badge">☪ Islamic Learning Center</div>
            <div className="hero-arabic">
              السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ
            </div>
            <h1 className="hero-h1">
              Pusat Ilmu Islam
              <br />
              <span className="accent">Terpercaya & Terpadu</span>
              <br />
              untuk Generasi Terbaik
            </h1>
            <p className="hero-desc">
              NurIlmu hadir sebagai ruang belajar, beribadah, dan bertumbuh
              bersama dalam cahaya Islam — menghubungkan hati dengan ilmu, dan
              ilmu dengan amal.
            </p>
            <div className="hero-btns">
              <a href="#daftar" className="btn-primary">
                ✦ Bergabung Sekarang
              </a>
              <a href="#layanan" className="btn-outline">
                Lihat Program →
              </a>
            </div>
          </div>

          <div>
            <div className="verse-card">
              <div className="verse-arabic-text" key={activeVerse}>
                {arabicVerses[activeVerse].arabic}
              </div>
              <div className="verse-translation">
                {arabicVerses[activeVerse].translation}
              </div>
              <div className="verse-source">
                — {arabicVerses[activeVerse].source}
              </div>
              <div className="verse-dots">
                {arabicVerses.map((_, i) => (
                  <button
                    key={i}
                    className={`verse-dot${i === activeVerse ? " active" : ""}`}
                    onClick={() => setActiveVerse(i)}
                    aria-label={`Verse ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" aria-label="Statistik NurIlmu">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        className="section about-section"
        id="tentang"
        aria-labelledby="about-h2"
      >
        <div className="section-inner">
          <div className="about-grid">
            <div
              className={`about-visual${isVisible("about-vis") ? " visible" : ""}`}
              data-animate
              id="about-vis"
            >
              <div className="about-main-card">
                <h3>مَرْحَبًا بِكُمْ</h3>
                <p
                  style={{
                    fontFamily: "'Amiri', serif",
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.85)",
                    marginBottom: "1rem",
                  }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p>
                  NurIlmu Islamic Center berdiri di atas landasan Al-Qur&apos;an dan
                  Sunnah, membawa misi mencerdaskan umat dan mempererat tali
                  ukhuwah Islamiyah melalui pendidikan, kajian, dan pemberdayaan
                  masyarakat Muslim Indonesia.
                </p>
              </div>
              <div className="about-side-card">
                <div className="num">2009</div>
                <div className="lbl">
                  Berdiri sejak
                  <br />
                  15 tahun melayani umat
                </div>
              </div>
            </div>

            <div
              className={`${isVisible("about-text") ? " visible" : ""}`}
              data-animate
              id="about-text"
              style={{ paddingTop: "2rem" }}
            >
              <div className="section-tag">Tentang Kami</div>
              <h2 className="section-h2" id="about-h2">
                Misi Kami: Menerangi Hati dengan Cahaya Ilmu
              </h2>
              <p className="section-desc">
                Kami percaya bahwa setiap Muslim berhak mendapatkan akses
                pendidikan Islam berkualitas. Dengan pendekatan modern namun
                berlandaskan tradisi ulama yang sahih, kami hadir untuk menjawab
                kebutuhan umat.
              </p>
              <ul className="about-list">
                <li>
                  Pengajaran berbasis Al-Qur&apos;an dan Sunnah yang sahih sesuai
                  manhaj Ahlus Sunnah wal Jama&apos;ah
                </li>
                <li>
                  Kurikulum terstruktur dari tingkat dasar hingga lanjutan yang
                  bisa diikuti siapa saja
                </li>
                <li>
                  Tim pengajar bersertifikat dengan ijazah sanad keilmuan yang
                  tersambung
                </li>
                <li>
                  Lingkungan belajar yang kondusif, inklusif, dan penuh semangat
                  ukhuwah
                </li>
                <li>
                  Program zakat dan sosial yang transparan dan tepat sasaran
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="layanan" aria-labelledby="services-h2">
        <div className="section-inner">
          <div style={{ maxWidth: 560 }}>
            <div className="section-tag">Program & Layanan</div>
            <h2 className="section-h2" id="services-h2">
              Program Islami Lengkap untuk Semua Kalangan
            </h2>
            <p className="section-desc">
              Dari kajian Al-Qur&apos;an, majelis ilmu, hingga konsultasi syariah —
              semua hadir dalam satu ekosistem pembelajaran yang terpadu.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div
                key={i}
                className={`service-card${isVisible(`svc-${i}`) ? " visible" : ""}`}
                data-animate
                id={`svc-${i}`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {s.badge && <div className="service-badge">{s.badge}</div>}
                <span className="service-icon">{s.icon}</span>
                <div className="service-title">{s.title}</div>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRAYER TIMES */}
      <section className="prayer-section" aria-label="Jadwal Sholat">
        <div className="prayer-inner">
          <div
            className={isVisible("prayer-head") ? "visible" : ""}
            data-animate
            id="prayer-head"
          >
            <p
              style={{
                color: "#6ee7b7",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              ◆ Waktu Sholat ◆
            </p>
            <h2 className="prayer-title">Jadwal Sholat Hari Ini</h2>
            <p className="prayer-subtitle">
              Jakarta, Indonesia — Sabtu, 21 Februari 2026
            </p>
          </div>
          <div className="prayer-grid">
            {[
              { name: "Subuh", time: "04:38" },
              { name: "Dzuhur", time: "12:07" },
              { name: "Ashar", time: "15:25" },
              { name: "Maghrib", time: "18:18" },
              { name: "Isya", time: "19:29" },
            ].map((p, i) => (
              <div
                key={i}
                className={`prayer-item${isVisible(`p-${i}`) ? " visible" : ""}`}
                data-animate
                id={`p-${i}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="prayer-name">{p.name}</div>
                <div className="prayer-time">{p.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section
        className="section articles-section"
        id="artikel"
        aria-labelledby="articles-h2"
      >
        <div className="section-inner">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div className="section-tag">Kajian & Artikel</div>
              <h2 className="section-h2" id="articles-h2">
                Ilmu yang Bermanfaat
                <br />
                adalah Sedekah Jariyah
              </h2>
            </div>
            <a
              href="#"
              style={{
                color: "var(--emerald)",
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.9rem",
              }}
            >
              Lihat semua artikel →
            </a>
          </div>
          <div className="articles-grid">
            {articles.map((a, i) => (
              <article
                key={i}
                className={`article-card${isVisible(`art-${i}`) ? " visible" : ""}`}
                data-animate
                id={`art-${i}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div
                  className="article-thumb"
                  data-arabic={["الله", "النور", "الحكمة"][i]}
                >
                  <span className="article-tag-pill">{a.tag}</span>
                </div>
                <div className="article-body">
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-desc">{a.desc}</p>
                  <div className="article-date">📅 {a.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" aria-labelledby="testi-h2">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: 0 }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>
              Testimoni Jamaah
            </div>
            <h2
              className="section-h2"
              id="testi-h2"
              style={{
                textAlign: "center",
                maxWidth: 500,
                margin: "0 auto 0.75rem",
              }}
            >
              Apa Kata Mereka yang Telah Bergabung
            </h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testimonial-card${isVisible(`tst-${i}`) ? " visible" : ""}`}
                data-animate
                id={`tst-${i}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="testi-stars">★★★★★</div>
                <p className="testi-text">&quot;{t.text}&quot;</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="daftar" aria-labelledby="cta-h2">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="cta-arabic">ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ</div>
          <h2 className="cta-h2" id="cta-h2">
            Mulai Perjalanan Ilmu Anda
            <br />
            Hari Ini Bersama NurIlmu
          </h2>
          <p className="cta-desc">
            Daftarkan diri Anda dan dapatkan akses ke ratusan kajian, jadwal
            sholat harian, konsultasi syariah, dan komunitas Muslim yang
            supportif.
          </p>
          <div className="cta-form">
            <input
              type="email"
              className="cta-input"
              placeholder="Masukkan email Anda..."
              aria-label="Alamat Email"
            />
            <button className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              Daftar Gratis ✦
            </button>
          </div>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.8rem",
              color: "var(--ink-soft)",
            }}
          >
            🔒 Data Anda aman. Tidak ada spam. Kami menghormati privasi Anda.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" role="contentinfo">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              ☪ Nur<span>Ilmu</span>
            </div>
            <p className="footer-brand-desc">
              Pusat pembelajaran Islam yang mengintegrasikan nilai-nilai
              Al-Qur&apos;an dan Sunnah dalam kehidupan modern. Bersama menuju ridha
              Allah ﷻ.
            </p>
            <p
              style={{
                fontSize: "0.88rem",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "1rem",
              }}
            >
              📍 Jl. Nurul Islam No. 17, Jakarta Selatan
              <br />
              📞 (021) 5555-7890
              <br />
              ✉️ info@nurilmu.id
            </p>
            <div className="footer-social">
              {["f", "t", "ig", "yt"].map((s) => (
                <div key={s} className="social-btn">
                  {s === "f" ? "f" : s === "t" ? "𝕏" : s === "ig" ? "◉" : "▶"}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4>Program</h4>
            <ul className="footer-links">
              {[
                "Kajian Al-Qur'an",
                "Majelis Ta'lim",
                "Tahfidz Qur'an",
                "Konsultasi Syariah",
                "Zakat & Infaq",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Informasi</h4>
            <ul className="footer-links">
              {[
                "Tentang Kami",
                "Jadwal Kajian",
                "Blog & Artikel",
                "Galeri",
                "Berita",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Dukungan</h4>
            <ul className="footer-links">
              {[
                "FAQ",
                "Hubungi Kami",
                "Donasi",
                "Kebijakan Privasi",
                "Syarat & Ketentuan",
              ].map((l) => (
                <li key={l}>
                  <a href="#">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 NurIlmu Islamic Center. Hak Cipta Dilindungi.</span>
          <span className="footer-bottom-arabic">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </span>
        </div>
      </footer>

    </>
  );
}
