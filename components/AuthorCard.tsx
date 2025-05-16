import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/prismicio";

export default async function AuthorCard({
  className = "",
}: {
  className?: string;
}) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <div
      className={`rounded-xl border-[0.5px] border-slate-800 bg-blue-850/50 p-6 shadow-xl backdrop-blur-sm ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Image
            src={settings.data.blog_author_img.url || "/placeholder.svg"}
            alt={settings.data.name || "Author"}
            width={60}
            height={60}
            className="rounded-full border-2 border-white"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{settings.data.name}</h3>
          <p className="text-sm text-indigo-400">{settings.data.role}</p>
          <p className="mt-2 text-sm text-gray-400">
            {settings.data.author_bio}
          </p>
          <Link
            href="/contact"
            className="mt-3 inline-block rounded-lg bg-[#131a41] px-3 py-1 text-sm text-gray-300 transition-colors hover:bg-[#1a2150] hover:text-white"
          >
            Let&apos;s work together
          </Link>
        </div>
      </div>
    </div>
  );
}
