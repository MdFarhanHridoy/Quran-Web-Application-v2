'use client';

import { useState, useEffect } from 'react';

interface BottomNavBarProps {
  onHomeClick: () => void;
}

export default function BottomNavBar({ onHomeClick }: BottomNavBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (!mainElement) return;

    const handleScroll = () => {
      const currentScrollY = mainElement.scrollTop;
      const threshold = 10;

      if (Math.abs(currentScrollY - lastScrollY) < threshold) return;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    mainElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      mainElement.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 lg:hidden bg-[#171717] border-t border-[#212121] z-[45] transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-center h-12">
        <button
          onClick={onHomeClick}
          className="flex items-center justify-center px-6 py-2 text-[#7b7d7b] hover:text-[#408039] transition-colors"
          title="Home"
          aria-label="Home"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
      </div>
    </nav>
  );
}