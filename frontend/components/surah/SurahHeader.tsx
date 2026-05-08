'use client';

import { useSettings } from '@/context/SettingsContext';
import { getArabicFontFamily } from '@/lib/utils';

interface SurahHeaderProps {
  nameAr: string;
  nameEn: string;
  ayahCount: number;
  revelationPlace: string;
  surahId: number;
}

export default function SurahHeader({
  nameAr,
  nameEn,
  ayahCount,
  revelationPlace,
  surahId,
}: SurahHeaderProps) {
  const { settings } = useSettings();

  const isMakkah = revelationPlace === 'Meccan' || revelationPlace === 'Makkah';
  const showBismillah = surahId !== 9;

  return (
    <div className="bg-[#16213e] rounded-lg p-6 mb-6 border border-[#2a3a5e]">
      {showBismillah && (
        <div className="text-center mb-6">
          <div
            className="text-[#c9a84c]"
            dir="rtl"
            style={{
              fontFamily: getArabicFontFamily(settings.arabicFont),
              fontSize: `${settings.arabicFontSize}px`,
            }}
          >
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </div>
        </div>
      )}

      <div className="text-center mb-4">
        <h1
          className="text-3xl md:text-4xl font-bold text-[#c9a84c] mb-3"
          dir="rtl"
          style={{ fontFamily: getArabicFontFamily(settings.arabicFont) }}
        >
          {nameAr}
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#e0e0e0] mb-3">
          {nameEn}
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span className="px-3 py-1 bg-[#1a1a2e] rounded-full text-sm text-[#a0a0a0] border border-[#2a3a5e]">
            {isMakkah ? 'Makkah' : 'Madinah'}
          </span>
          <span className="px-3 py-1 bg-[#1a1a2e] rounded-full text-sm text-[#a0a0a0] border border-[#2a3a5e]">
            {ayahCount} Ayahs
          </span>
        </div>
      </div>
    </div>
  );
}
