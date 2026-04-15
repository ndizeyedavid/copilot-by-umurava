"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "w-[80%] px-6 py-3 bg-card/90 backdrop-blur-md rounded-full shadow-lg border border-border"
          : "w-full px-[122px] py-5 bg-background"
      }`}
    >
      <div className="flex items-center gap-8">
        <Image
          src="/images/logo/logo.svg"
          alt="Copilot By Umurava Logo"
          width={110}
          height={34}
        />

        <nav className="flex items-center gap-6 text-sm text-foreground">
          <a href="" className="hover:text-foreground/80">
            Find Jobs
          </a>
          <a href="" className="hover:text-foreground/80">
            About
          </a>
          <a href="" className="hover:text-foreground/80">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/auth/login"
          className="text-sm font-bold text-primary hover:text-primary/80"
        >
          Login
        </Link>
        <a
          href=""
          className="px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/80"
        >
          Sign Up
        </a>
      </div>
    </header>
  );
}
