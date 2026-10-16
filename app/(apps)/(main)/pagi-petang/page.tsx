import fs from "fs";
import path from "path";
import { auth } from "@/lib/auth";
import UnderDevelopment from "./under-development";
import PagiPetangViewer from "./pagi-petang-viewer";

export const metadata = {
  title: "Dzikir Pagi & Petang - Do-Dzikir",
  description: "Kumpulan bacaan wirid dan dzikir pagi dan petang.",
};

export default async function PagiPetang() {
  const session = await auth();
  const isAllowed = session?.user?.email === "aufazsyakira@gmail.com";

  if (!isAllowed) {
    return <UnderDevelopment />;
  }

  const wirdPath = path.join(
    process.cwd(),
    "public",
    "text",
    "CamScanner_09-25-2026_18_21.md",
  );
  const haddadPath = path.join(
    process.cwd(),
    "public",
    "text",
    "CamScanner_09-25-2026_18_27.md",
  );

  const wirdContent = fs.existsSync(wirdPath)
    ? fs.readFileSync(wirdPath, "utf-8")
    : "";
  const haddadContent = fs.existsSync(haddadPath)
    ? fs.readFileSync(haddadPath, "utf-8")
    : "";

  return (
    <PagiPetangViewer
      wirdContent={wirdContent}
      haddadContent={haddadContent}
      userEmail={session?.user?.email ?? ""}
    />
  );
}
