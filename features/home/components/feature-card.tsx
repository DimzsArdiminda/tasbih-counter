import { ChevronRight } from "lucide-react";

interface FeatureCardProps {
  isDark: boolean;
  title: string;
  description: string;
}

export default function FeatureCard({
  isDark,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div
      className={`p-6 rounded-xl ${isDark ? "bg-gray-800" : "bg-white"} shadow-sm hover:shadow-md transition-shadow`}
    >
      <div
        className={`w-12 h-12 rounded-lg ${isDark ? "bg-blue-900" : "bg-blue-100"} flex items-center justify-center mb-4`}
      >
        <ChevronRight className={isDark ? "text-blue-400" : "text-blue-600"} />
      </div>
      <h3
        className={`text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {title}
      </h3>
      <p className={`${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
}
