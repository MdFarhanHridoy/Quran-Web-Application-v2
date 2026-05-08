'use client';

import Link from 'next/link';
import { getSurahs } from '@/lib/api';
import { Surah } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { getArabicFontFamily } from '@/lib/utils';

export default function Home() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const { settings } = useSettings();

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const data = await getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurahs();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredSurahs = surahs.filter(surah =>
    surah.name_en.toLowerCase().includes(filter.toLowerCase()) ||
    surah.id.toString().includes(filter)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading surahs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-4 items-center flex-wrap">
            <Link
              href="/search"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Search by Ayahs
            </Link>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Surahs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-800"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSurahs.map((surah) => (
            <Link
              key={surah.id}
              href={`/surah/${surah.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-stone-200"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-lg font-semibold text-stone-800">{surah.id}.</span>
                <span className="text-sm text-stone-500 bg-stone-100 px-2 py-1 rounded">
                  {surah.verse_count} verses
                </span>
              </div>
              <h2 className="text-2xl font-bold text-right text-emerald-700 mb-2" style={{ fontFamily: getArabicFontFamily(settings.arabicFont) }}>
                {surah.name_ar}
              </h2>
              <h3 className="text-lg font-medium text-stone-700">
                {surah.name_en}
              </h3>
              <div className="mt-2 text-sm text-stone-500">
                {surah.revelation_place}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
