import FeatureCard from "./FeatureCard";

interface FeaturesProps {
  isDark: boolean;
}

const CardContent = [
  {
    title: "Alquran Digital",
    description:
      "Akses Alquran digital lengkap dengan terjemahan dan tafsir untuk memudahkan pembelajaran Anda.",
  },
  {
    title: "Jadwal Sholat",
    description:
    "Dapatkan jadwal sholat akurat berdasarkan lokasi Anda ",
  },
  {
    title: "Tasbih Digital",
    description:
    "Hitung dzikir Anda dengan mudah menggunakan tasbih digital kami.",
  },
];

export default function     Features({ isDark }: FeaturesProps) {
  return (
    <section className="mb-8">
      <h2
        className={`text-2xl sm:text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        Fitur
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CardContent.map((item, index) => (
          <FeatureCard
            key={index}
            isDark={isDark}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
