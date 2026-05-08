'use client';

interface SurahHeaderProps {
  nameEn: string;
  ayahCount: number;
  revelationPlace: string;
  surahId: number;
}

export default function SurahHeader({
  nameEn,
  ayahCount,
  revelationPlace,
  surahId,
}: SurahHeaderProps) {
  const isMakkah = revelationPlace === 'Meccan' || revelationPlace === 'Makkah';
  const showBismillah = surahId !== 9;

  return (
    <div className="bg-[#171717] rounded-lg p-6 mb-6 border border-[#212121]">
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="hidden md:flex flex-shrink-0">
          <img
            src={isMakkah ? '/asset/makkah.webp' : '/asset/madinah.webp'}
            alt={isMakkah ? 'Makkah' : 'Madinah'}
            className="w-16 h-16 rounded-lg object-cover"
          />
        </div>

        <div className="text-center md:flex-1">
          <h1 className="text-xl md:text-2xl font-semibold text-[#c4c4c4] mb-1">
            Surah {nameEn}
          </h1>
          <p className="text-sm text-[#7b7d7b] capitalize">
            Ayah-{ayahCount}, {isMakkah ? 'Makkah' : 'Madinah'}
          </p>
        </div>

        {showBismillah && (
          <div className="flex-shrink-0">
            {/* Bismillahir Rahmanir Rahim */}
            <img
              src="/asset/bismillah.2a2f3d14.svg"
              alt="Bismillahir Rahmanir Rahim"
              width={220}
              height={45}
              className="opacity-50"
            />
          </div>
        )}
      </div>
    </div>
  );
}
