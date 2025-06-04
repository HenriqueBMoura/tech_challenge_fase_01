"use client";

import React from 'react';
import UserDropdown from '@/components/UserDropdown';

interface HeaderProps {
  username?: string;
}

export default function Header({ username = "Joana da Silva Oliveira" }: HeaderProps) {
  return (
    <header className="bg-primary text-white p-6 flex items-center">
      <div className="container flex items-center justify-end">
        <UserDropdown username={username} />
      </div>
    </header>
  );
}