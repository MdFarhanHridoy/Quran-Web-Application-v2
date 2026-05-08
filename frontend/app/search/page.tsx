'use client';

import Link from 'next/link';
import { searchAyahs } from '@/lib/api';
import { Ayah } from '@/lib/api';
import { useSettings } from '@/context/SettingsContext';
import { useState, useEffect } from 'react';
import { getArabicFontFamily } from '@/lib/utils';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const { settings } = useSettings();

  const highlightKeyword = (text: string, keyword: string): React.ReactNode => {
    if (!keyword || keyword.length < 3) return text;

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedKeyword})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (part.toLowerCase() === keyword.toLowerCase()) {
        return <mark key={index} className="bg-yellow-200 text-stone-800 px-1 rounded">{part}</mark>;
      }
      return part;
    });
  };

  const handleSearch = async (searchQuery: string, pageNum: number = 1, append: boolean = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const data = await searchAyahs(searchQuery, pageNum);

      if (append) {
        setResults(prev => [...prev, ...data.results]);
      } else {
        setResults(data.results);
      }

      setTotalResults(data.total);
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = async () => {
    if (query.trim().length > 2) {
      await handleSearch(query, page + 1, true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 2) {
        await handleSearch(query, 1, false);
      } else {
        setResults([]);
        setTotalResults(0);
        setHasMore(false);
        setPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors"
          >
            ← Back to Surah List
          </Link>
        </div>

        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-stone-200">
          <h1 className="text-2xl font-bold text-stone-800 mb-4">Search Ayahs</h1>
          <input
            type="text"
            placeholder="Search in translation (minimum 3 characters)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base md:text-lg text-stone-800"
            autoFocus
          />
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="text-xl">Searching...</div>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-stone-600 mb-4">
              Found {totalResults} results for &ldquo;{query}&rdquo;
            </p>
            {results.map((ayah) => (
              <Link
                key={ayah.verse_key}
                href={`/surah/${ayah.surah_id}?ayah=${ayah.ayah_number}`}
                className="block bg-white rounded-lg shadow-sm p-6 border border-stone-200 hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded text-sm font-semibold">
                    Surah {ayah.surah_id}:{ayah.ayah_number}
                  </span>
                </div>
                <div
                  className="text-right text-stone-800 mb-3 leading-loose"
                  style={{ fontFamily: getArabicFontFamily(settings.arabicFont), fontSize: `${settings.arabicFontSize}px` }}
                >
                  {ayah.text_uthmani}
                </div>
                <div
                  className="text-stone-700 leading-relaxed text-left"
                  style={{ fontSize: `${settings.translationFontSize}px` }}
                >
                  {highlightKeyword(ayah.translation, query)}
                </div>
              </Link>
            ))}
            {hasMore && (
              <div className="text-center pt-4">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingMore ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && query.length > 2 && results.length === 0 && (
          <div className="text-center py-8">
            <div className="text-xl text-stone-600">
              No results found for &ldquo;{query}&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
