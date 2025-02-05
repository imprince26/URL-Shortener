"use client";

import { motion } from "framer-motion";
import { Link2, BarChart2, Settings, LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// const navItems = [
//   { name: "Shorten", href: "/", icon: Link2 },
//   { name: "Analytics", href: "/analytics", icon: BarChart2 },
//   { name: "Settings", href: "/settings", icon: Settings },
// ];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center px-3 space-x-2">
          <Link2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">URLify</span>
        </div>
        <div className="flex flex-1 items-center justify-between">
          {/* <div className="flex items-center space-x-6"> */}
            {/* {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
                {pathname === item.href && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    layoutId="navbar-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))} */}
          {/* </div> */}
          {/* <Link
            href="/login"
            className="flex items-center space-x-2 mr-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </Link> */}
        </div>
      </div>
    </nav>
  );
}
