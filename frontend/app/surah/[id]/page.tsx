'use client';

import { getSurahById, getAyahsBySurahId } from '@/lib/api';
import { Surah, Ayah } from '@/lib/api';
import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import SurahHeader from '@/components/surah/SurahHeader';
import AyahCard from '@/components/surah/AyahCard';
import SurahNavigation from '@/components/surah/SurahNavigation';

export default function SurahDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [surah, setSurah] = useState<Surah | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [highlightedAyah, setHighlightedAyah] = useState<number | null>(null);

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
        setTimeout(() => setHighlightedAyah(targetAyahNumber), 0);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => setHighlightedAyah(null), 3000);
      }
    }
  }, [ayahs, targetAyahNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#e0e0e0] text-xl">Loading...</div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#e0e0e0] text-xl">Surah not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-full pb-20">
      <div className="px-4 py-6 lg:px-6 lg:py-8 max-w-5xl">
        <SurahHeader
          nameEn={surah.name_en}
          ayahCount={surah.verse_count}
          revelationPlace={surah.revelation_place}
          surahId={surah.id}
        />

        <div className="space-y-4">
          {ayahs.map((ayah) => (
            <AyahCard
              key={ayah.verse_key}
              surahId={ayah.surah_id}
              ayahNumber={ayah.ayah_number}
              arabicText={ayah.text_uthmani}
              translation={ayah.translation}
              verseKey={ayah.verse_key}
              isHighlighted={highlightedAyah === ayah.ayah_number}
            />
          ))}
        </div>
      </div>

      <SurahNavigation currentSurahId={surah.id} totalSurahs={114} />
    </div>
  );
}
