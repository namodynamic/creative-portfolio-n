import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PhotoNameLogoProps {
  name?: string;
  photoUrl?: string;
  href?: string;
}

export default function NameLogo({
  name = "",
  photoUrl = "/logo.png",
  href = "/",
}: PhotoNameLogoProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      href={href}
      aria-label="Home page"
      className="focus-visible:ring-ring relative z-50 flex min-w-0 items-center rounded-full outline-none focus-visible:ring-3"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex min-w-0 items-center gap-2.5"
      >
        <Avatar className="shadow-sm">
          <AvatarImage src={photoUrl || ""} alt={`${name} profile photo`} />
          <AvatarFallback>{initials || "NE"}</AvatarFallback>
        </Avatar>

        <span className="text-foreground max-w-28 truncate text-sm font-semibold min-[380px]:max-w-36 sm:max-w-none sm:text-base">
          {name}
        </span>
      </motion.div>
    </Link>
  );
}
