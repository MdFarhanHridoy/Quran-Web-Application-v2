'use client';

interface HeaderProps {
  onSearchClick: () => void;
}

export default function Header({ onSearchClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#171717] border-b border-[#212121] z-50 flex items-center justify-between px-4">
      <h1 className="text-lg md:text-xl font-semibold text-[#c4c4c4]">
        Quran Web Application
      </h1>
      <button
        onClick={onSearchClick}
        className="p-2 rounded-lg hover:bg-[#1c1c1c] text-[#7b7d7b] hover:text-[#408039] transition-colors"
        aria-label="Search"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </header>
  );
}
