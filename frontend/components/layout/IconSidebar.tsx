'use client';

interface IconSidebarProps {
  onHomeClick: () => void;
}

export default function IconSidebar({ onHomeClick }: IconSidebarProps) {
  return (
    <div className="hidden md:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-14 md:w-16 bg-[#171717] border-r border-[#212121] flex-col items-center py-4 z-[45]">
      <button
        onClick={onHomeClick}
        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg text-[#7b7d7b] hover:bg-[#1c1c1c] hover:text-[#408039] transition-all duration-200 mb-2"
        title="Home"
        aria-label="Home"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </button>
    </div>
  );
}
