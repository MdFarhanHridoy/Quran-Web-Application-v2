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

  const getRevelationIcon = (place: string) => {
    return place === 'Meccan' || place === 'Makkah' ? '🕋' : '🕌';
  };

  return (
    <>
      {isMobileDrawer && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div className={`fixed left-14 md:left-16 top-0 h-full w-72 bg-[#16213e] border-r border-[#2a3a5e] flex flex-col z-30 ${
        isMobileDrawer ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } transition-transform duration-300`}>
        <div className="p-4 border-b border-[#2a3a5e]">
          <input
            type="text"
            placeholder="Filter surahs..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a3a5e] rounded-lg text-[#e0e0e0] placeholder-[#707070] focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-sm"
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
              className={`w-full px-4 py-3 text-left border-b border-[#1e2a47] transition-all duration-200 hover:bg-[#253354] ${
                currentSurahId === surah.id ? 'bg-[#253354] border-l-4 border-l-[#c9a84c]' : 'border-l-4 border-l-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-semibold text-[#a0a0a0] min-w-[2rem]">
                    {surah.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#e0e0e0] font-medium text-sm truncate">
                      {surah.name_en}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-[#707070] ml-2">
                  {getRevelationIcon(surah.revelation_place)}
                </span>
              </div>
              <div className="mt-1 text-right" style={{ fontFamily: "'KFGQPC HAFS Uthmanic Script', 'KFGQ', serif" }}>
                <span className="text-lg text-[#c9a84c]">{surah.name_ar}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-[#2a3a5e] text-center text-xs text-[#707070]">
          {filteredSurahs.length} surahs
        </div>
      </div>
    </>
  );
}
