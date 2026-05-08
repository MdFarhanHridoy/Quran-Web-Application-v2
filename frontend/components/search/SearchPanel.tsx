'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { searchAyahs, Ayah } from '@/lib/api';
import { useSettings } from '@/context/SettingsContext';
import { getArabicFontFamily } from '@/lib/utils';

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchPanel({ isOpen, onClose }: SearchPanelProps) {
  const { settings } = useSettings();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        setLoading(true);
        try {
          const data = await searchAyahs(query, 1, 20);
          setResults(data.results);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword || keyword.length < 3) return text;

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === keyword.toLowerCase()) {
        return <mark key={index} className="bg-[#408039] text-[#0d0d0d] px-1 rounded">{part}</mark>;
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed left-14 md:left-16 top-0 h-full w-96 bg-[#171717] border-r border-[#212121] z-50 flex flex-col transform transition-transform duration-300">
        <div className="p-4 border-b border-[#212121] flex items-center gap-3">
          <svg className="w-5 h-5 text-[#7b7d7b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search translations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-[#0d0d0d] border border-[#212121] rounded-lg px-3 py-2 text-[#c4c4c4] placeholder-[#636663] focus:outline-none focus:ring-2 focus:ring-[#408039]"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1c1c1c] rounded-lg transition-colors text-[#7b7d7b] hover:text-[#c4c4c4]"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8 text-[#7b7d7b]">Searching...</div>
          )}

          {!loading && query.length > 2 && results.length === 0 && (
            <div className="text-center py-8 text-[#636663]">
              No results found for &ldquo;{query}&rdquo;
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              {results.map((ayah) => (
                <Link
                  key={ayah.verse_key}
                  href={`/surah/${ayah.surah_id}?ayah=${ayah.ayah_number}`}
                  onClick={onClose}
                  className="block bg-[#0d0d0d] rounded-lg p-4 border border-[#212121] hover:border-[#1c1c1c] hover:bg-[#1c1c1c] transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#408039] font-semibold">
                      Surah {ayah.surah_id}:{ayah.ayah_number}
                    </span>
                    <span className="text-xs text-[#636663]">
                      {ayah.surah_name}
                    </span>
                  </div>
                  <div
                    className="text-right text-[#c4c4c4] mb-2 leading-loose text-sm"
                    dir="rtl"
                    style={{ fontFamily: getArabicFontFamily(settings.arabicFont) }}
                  >
                    {ayah.text_uthmani}
                  </div>
                  <div
                    className="text-[#7b7d7b] leading-relaxed text-sm"
                  >
                    {highlightKeyword(ayah.translation, query)}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !query && (
            <div className="text-center py-12 text-[#636663]">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p>Start typing to search in translations</p>
              <p className="text-xs mt-2">Minimum 3 characters required</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
