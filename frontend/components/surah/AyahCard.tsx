'use client';

import { useSettings } from '@/context/SettingsContext';
import { getArabicFontFamily } from '@/lib/utils';
import AudioPlayer from '../audio/AudioPlayer';

interface AyahCardProps {
  surahId: number;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  verseKey?: string;
  translator?: string;
  isHighlighted?: boolean;
}

export default function AyahCard({
  surahId,
  ayahNumber,
  arabicText,
  translation,
  verseKey,
  translator = 'Saheeh International',
  isHighlighted = false,
}: AyahCardProps) {
  const { settings } = useSettings();

  return (
    <div
      className={`bg-[#121212] rounded-lg p-5 border border-[#212121] hover:border-[#1c1c1c] transition-all duration-200 ${
        isHighlighted ? 'ring-2 ring-[#408039] ring-opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#171717] text-[#408039] text-xs font-semibold">
            {ayahNumber}
          </span>
          <span className="text-xs text-[#636663]">{verseKey || `${surahId}:${ayahNumber}`}</span>
        </div>
        <AudioPlayer surahId={surahId} ayahNumber={ayahNumber} />
      </div>

      <div
        className="text-right text-[#c4c4c4] mb-4 leading-loose"
        dir="rtl"
        style={{
          fontFamily: getArabicFontFamily(settings.arabicFont),
          fontSize: `${settings.arabicFontSize}px`,
        }}
      >
        {arabicText}
      </div>

      <div className="pt-3 border-t border-[#212121]">
        <div className="text-xs text-[#636663] mb-2">{translator}</div>
        <div
          className="text-[#7b7d7b] leading-relaxed"
          style={{ fontSize: `${settings.translationFontSize}px` }}
        >
          {translation}
        </div>
      </div>
    </div>
  );
}
