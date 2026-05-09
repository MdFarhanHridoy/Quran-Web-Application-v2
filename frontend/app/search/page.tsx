'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAyahs, SearchResponse, Ayah } from '@/lib/api';
import { useSettings } from '@/context/SettingsContext';
import { getArabicFontFamily } from '@/lib/utils';

const RESULTS_PER_PAGE = 50;

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { settings } = useSettings();
  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchAyahs(query, currentPage, RESULTS_PER_PAGE)
        .then(setData)
        .catch((error) => console.error('Search error:', error))
        .finally(() => setLoading(false));
    }
  }, [query, currentPage]);

  const handlePageChange = (newPage: number) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
  };

  const highlightKeyword = (text: string, keyword: string) => {
    if (!keyword) return text;
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === keyword.toLowerCase()) {
        return <mark key={index} className="bg-yellow-500 text-black px-1 rounded">{part}</mark>;
      }
      return part;
    });
  };

  if (!query) {
    return (
      <div className="px-4 py-6 lg:px-6 lg:py-8 max-w-5xl">
        <div className="text-center py-12 text-[#636663]">
          <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p>Use the search icon to search...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="px-4 py-6 lg:px-6 lg:py-8 max-w-5xl">
        <div className="text-center py-12 text-[#c4c4c4]">Searching...</div>
      </div>
    );
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="px-4 py-6 lg:px-6 lg:py-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#c4c4c4] mb-2">Search Results</h1>
          <p className="text-sm text-[#7b7d7b]">Search In Translation ( {query} )</p>
        </div>
        <div className="text-center py-12 text-[#636663]">
          No results found for &ldquo;{query}&rdquo;
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.total / RESULTS_PER_PAGE);

  return (
    <div className="px-4 py-6 lg:px-6 lg:py-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[#c4c4c4] mb-2">Search Results</h1>
        <p className="text-sm text-[#7b7d7b]">Search In Translation ( {query} )</p>
      </div>

      <div className="mb-4 text-sm text-[#636663]">
        {data.total} Results found in Translation
      </div>

      <div className="space-y-4 mb-8">
        {data.results.map((ayah) => (
          <Link
            key={ayah.verse_key}
            href={`/surah/${ayah.surah_id}?ayah=${ayah.ayah_number}`}
            className="block bg-[#121212] rounded-lg p-4 border border-[#212121] hover:border-[#1c1c1c] hover:bg-[#1c1c1c] transition-all duration-200"
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
            <div className="text-[#7b7d7b] leading-relaxed text-sm">
              {highlightKeyword(ayah.translation, query)}
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-[#212121] pt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#0d0d0d] hover:bg-[#1c1c1c] disabled:opacity-50 disabled:cursor-not-allowed text-[#c4c4c4] rounded-lg transition-colors border border-[#212121]"
          >
            Previous
          </button>

          <div className="text-sm text-[#636663]">
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-[#0d0d0d] hover:bg-[#1c1c1c] disabled:opacity-50 disabled:cursor-not-allowed text-[#c4c4c4] rounded-lg transition-colors border border-[#212121]"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="text-[#c4c4c4]">Loading...</div></div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
