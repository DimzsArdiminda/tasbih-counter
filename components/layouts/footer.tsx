interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  return (
    <footer
      className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-t mt-12 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className={`${isDark ? "text-gray-400" : "text-gray-600"} text-sm`}>
          &copy; {new Date().getFullYear()} Do-Dzikir. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
