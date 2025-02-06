"use client";

import { motion } from "framer-motion";
import { Link2, BarChart2, Settings, LogIn } from "lucide-react";
import { usePathname } from "next/navigation";
import AuthBtn from "./auth-btn";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container flex h-16 items-center justify-between px-6"
      >
        <div className="mr-8 flex items-center px-3 space-x-2">
          <Link2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">URLify</span>
        </div>
        <div className="">
          <AuthBtn />
        </div>
      </motion.div>
    </nav>
  );
}
