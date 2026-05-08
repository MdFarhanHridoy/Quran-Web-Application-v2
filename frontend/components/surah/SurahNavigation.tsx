'use client';

import Link from 'next/link';

interface SurahNavigationProps {
  currentSurahId: number;
  totalSurahs: number;
}

export default function SurahNavigation({ currentSurahId, totalSurahs }: SurahNavigationProps) {
  const prevSurah = currentSurahId > 1 ? currentSurahId - 1 : null;
  const nextSurah = currentSurahId < totalSurahs ? currentSurahId + 1 : null;

  return (
    <div className="sticky bottom-0 bg-[#16213e] border-t border-[#2a3a5e] p-4 z-10">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {prevSurah ? (
          <Link
            href={`/surah/${prevSurah}`}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] hover:bg-[#253354] text-[#e0e0e0] rounded-lg transition-colors border border-[#2a3a5e]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden sm:inline">Surah {prevSurah}</span>
            <span className="sm:hidden">Prev</span>
          </Link>
        ) : (
          <div />
        )}

        <span className="text-[#707070] text-sm">
          {currentSurahId} / {totalSurahs}
        </span>

        {nextSurah ? (
          <Link
            href={`/surah/${nextSurah}`}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] hover:bg-[#253354] text-[#e0e0e0] rounded-lg transition-colors border border-[#2a3a5e]"
          >
            <span className="hidden sm:inline">Surah {nextSurah}</span>
            <span className="sm:hidden">Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
