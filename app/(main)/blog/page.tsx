"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "panduan-lengkap-dzikir-harian",
    title: "Panduan Lengkap Dzikir Harian untuk Muslim",
    excerpt:
      "Pelajari dzikir-dzikir penting yang dianjurkan untuk diamalkan setiap hari, lengkap dengan keutamaan dan cara pengamalannya menggunakan tasbih online.",
    date: "2026-01-18",
    readTime: "5 menit",
    category: "Dzikir",
  },
  {
    slug: "keutamaan-tasbih-dalam-islam",
    title: "Keutamaan Tasbih dalam Islam: Pahala Berlipat Ganda",
    excerpt:
      "Temukan keutamaan berdzikir dengan tasbih menurut Al-Quran dan Hadits. Mengapa tasbih digital dapat membantu ibadah Anda?",
    date: "2026-01-17",
    readTime: "6 menit",
    category: "Tasbih",
  },
  {
    slug: "cara-menggunakan-tasbih-digital",
    title: "Cara Menggunakan Tasbih Digital Online - Tutorial Lengkap",
    excerpt:
      "Tutorial step-by-step menggunakan aplikasi tasbih online gratis. Maksimalkan fitur counter dzikir digital untuk ibadah harian.",
    date: "2026-01-16",
    readTime: "4 menit",
    category: "Tutorial",
  },
];

export default function BlogPage() {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-green-50"
      }`}
    >
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Blog Islami & Panduan Dzikir
          </h1>
          <p
            className={`text-lg ${
              isDark ? "text-gray-300" : "text-gray-600"
            } max-w-2xl mx-auto`}
          >
            Artikel, tutorial, dan panduan lengkap tentang dzikir harian, tasbih
            online, dan ibadah digital untuk Muslim modern
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className={`${
                isDark
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white border-gray-200"
              } border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    isDark
                      ? "bg-green-900/50 text-green-300"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h2
                className={`text-xl font-bold mb-3 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                className={`mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } line-clamp-3`}
              >
                {post.excerpt}
              </p>

              {/* Meta Info */}
              <div
                className={`flex items-center gap-4 mb-4 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Read More Link */}
              <Link
                href={`/blog/${post.slug}`}
                className={`inline-flex items-center gap-2 font-semibold ${
                  isDark
                    ? "text-green-400 hover:text-green-300"
                    : "text-green-600 hover:text-green-700"
                } transition-colors`}
              >
                Baca Selengkapnya
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div
          className={`mt-12 p-8 rounded-xl text-center ${
            isDark
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-3 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Artikel Baru Segera Hadir! 📚
          </h3>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Kami sedang menyiapkan lebih banyak artikel berkualitas tentang
            dzikir, tasbih, dan ibadah digital. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
