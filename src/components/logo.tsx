"use client";

import { Instagram } from 'lucide-react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 p-4 ${className || ''}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-500 text-white">
        <Instagram size={18} />
      </div>
      <span className="font-bold text-lg text-primary sidebar-label">InstaGrowth</span>
    </Link>
  );
}
