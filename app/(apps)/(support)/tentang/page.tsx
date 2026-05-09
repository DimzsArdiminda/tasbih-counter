import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default async function TentangPage() {
  // Ambil path README.md dari root project
  const filePath = path.join(process.cwd(), "README.md");

  // Baca isi markdown
  const markdown = fs.readFileSync(filePath, "utf-8");

  return (
    <main className="prose prose-neutral max-w-4xl mx-auto p-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </main>
  );
}
