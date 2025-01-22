import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="search playlist..."
        className="w-full bg-white/5 border border-white/10 rounded-md pl-8 pr-3 py-1.5 text-xs 
                 text-white/80 placeholder:text-white/40 focus:outline-none focus:border-white/20
                 focus:ring-1 focus:ring-white/20"
      />
    </div>
  );
}