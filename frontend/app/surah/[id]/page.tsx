'use client';

import Link from 'next/link';
import { getSurahById, getAyahsBySurahId } from '@/lib/api';
import { Surah, Ayah } from '@/lib/api';
import { useSettings } from '@/context/SettingsContext';
import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import { getArabicFontFamily } from '@/lib/utils';

export default function SurahDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null);
  const { settings } = useSettings();

  const searchParams = useSearchParams();
  const targetAyahNumber = searchParams.get('ayah') ? parseInt(searchParams.get('ayah')!) : null;

  useEffect(() => {
    async function fetchSurahData() {
      try {
        const [surahData, ayahsData] = await Promise.all([
          getSurahById(parseInt(resolvedParams.id)),
          getAyahsBySurahId(parseInt(resolvedParams.id)),
        ]);
        setSurah(surahData);
        setAyahs(ayahsData);
      } catch (error) {
        console.error('Error fetching surah data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurahData();
  }, [resolvedParams.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [resolvedParams.id]);

  useEffect(() => {
    if (targetAyahNumber && ayahs.length > 0) {
      const targetElement = document.getElementById(`ayah-${targetAyahNumber}`);
      if (targetElement) {
        setHighlightedAyah(targetAyahNumber);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => setHighlightedAyah(null), 3000);
      }
    }
  }, [ayahs, targetAyahNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Surah not found</div>
      </div>
    );
  }

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
          <Link
            href="/search"
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Search
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-stone-200">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-emerald-700 mb-2" style={{ fontFamily: getArabicFontFamily(settings.arabicFont) }}>
              {surah.name_ar}
            </h1>
            <h2 className="text-2xl font-semibold text-stone-700 mb-2">
              {surah.name_en}
            </h2>
            <p className="text-stone-500">
              {surah.revelation_place} • {surah.verse_count} verses
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {ayahs.map((ayah) => (
            <div
              key={ayah.verse_key}
              id={`ayah-${ayah.ayah_number}`}
              className={`bg-white rounded-lg shadow-sm p-6 border border-stone-200 ${
                highlightedAyah === ayah.ayah_number ? 'ring-4 ring-emerald-500 ring-opacity-50' : ''
              }`}
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded text-sm font-semibold">
                  {ayah.ayah_number}
                </span>
              </div>
              <div
                className="text-right text-stone-800 mb-4 leading-loose"
                style={{ fontFamily: getArabicFontFamily(settings.arabicFont), fontSize: `${settings.arabicFontSize}px` }}
              >
                {ayah.text_uthmani}
              </div>
              <div
                className="text-stone-700 leading-relaxed text-left"
                style={{ fontSize: `${settings.translationFontSize}px` }}
              >
                {ayah.translation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
