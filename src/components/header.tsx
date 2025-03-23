"use client";

import { Crown, Bell } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Bell size={16} />
            <span className="hidden sm:inline">Benachrichtigungen</span>
          </Button>
          <Button size="sm" className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            <Crown size={16} />
            <span className="hidden sm:inline">Premium freischalten</span>
          </Button>
        </div>
      </div>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
