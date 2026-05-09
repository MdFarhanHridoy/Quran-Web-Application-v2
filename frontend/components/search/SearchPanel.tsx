'use client';

import { useState, useEffect, FormEvent, useRef } from 'react';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

export default function SearchPanel({ isOpen, onClose, onSearch }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      />

      <div
        className={`relative w-full max-w-2xl bg-[#171717] rounded-xl border border-[#212121] shadow-2xl p-4 sm:p-6 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-100 md:scale-95 translate-y-8 md:translate-y-0'
        }`}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 w-full">
            <svg className="w-5 h-5 text-[#7b7d7b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by Arabic or English..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-[#0d0d0d] border border-[#212121] rounded-lg px-3 py-2 text-[#c4c4c4] placeholder-[#636663] focus:outline-none focus:ring-2 focus:ring-[#408039]"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-[#1c1c1c] rounded-lg transition-colors text-[#7b7d7b] hover:text-[#c4c4c4] flex-shrink-0 sm:hidden"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 justify-center w-full sm:w-auto sm:justify-start">
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-4 py-2 bg-[#408039] hover:bg-[#4d9946] disabled:opacity-50 disabled:cursor-not-allowed text-[#c4c4c4] rounded-lg transition-colors text-sm font-medium flex-shrink-0"
            >
              Search
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-[#1c1c1c] rounded-lg transition-colors text-[#7b7d7b] hover:text-[#c4c4c4] flex-shrink-0 hidden sm:flex"
              aria-label="Close search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
