'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Surah } from '@/lib/api';

interface SurahSidebarProps {
  surahs: Surah[];
  currentSurahId: number | null;
  onSurahSelect: (id: number) => void;
  onClose?: () => void;
}

export default function SurahSidebar({ surahs, currentSurahId, onSurahSelect, onClose }: SurahSidebarProps) {
  const [filter, setFilter] = useState('');
  const searchParams = useSearchParams();
  const isMobileDrawer = searchParams.get('drawer') === 'surah';

  const filteredSurahs = useMemo(() => {
    if (!filter) return surahs;
    const lowerFilter = filter.toLowerCase();
    return surahs.filter(
      (surah) =>
        surah.name_en.toLowerCase().includes(lowerFilter) ||
        surah.id.toString().includes(lowerFilter)
    );
  }, [surahs, filter]);

  return (
    <>
      {isMobileDrawer && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div className={`fixed left-14 md:left-16 top-0 h-full w-72 bg-[#171717] border-r border-[#212121] flex flex-col z-30 ${
        isMobileDrawer ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } transition-transform duration-300`}>
        <div className="p-4 border-b border-[#212121]">
          <input
            type="text"
            placeholder="Filter surahs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#0d0d0d] border border-[#212121] rounded-lg text-[#c4c4c4] placeholder-[#636663] focus:outline-none focus:ring-2 focus:ring-[#408039] text-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.id}
              onClick={() => {
                onSurahSelect(surah.id);
                onClose?.();
              }}
              className={`w-full px-4 py-3 text-left border-b border-[#121212] transition-all duration-200 hover:bg-[#1c1c1c] ${
                currentSurahId === surah.id ? 'bg-[#1c1c1c] border-l-4 border-l-[#408039]' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-semibold text-[#7b7d7b] min-w-[2rem]">
                    {surah.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#c4c4c4] font-medium text-sm truncate">
                      {surah.name_en}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-1 text-right" style={{ fontFamily: "'KFGQPC HAFS Uthmanic Script', 'KFGQ', serif" }}>
                <span className="text-lg text-[#408039]">{surah.name_ar}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-[#212121] text-center text-xs text-[#636663]">
          {filteredSurahs.length} surahs
        </div>
      </div>
    </>
  );
}
