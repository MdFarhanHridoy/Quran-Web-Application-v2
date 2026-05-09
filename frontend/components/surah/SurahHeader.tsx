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
  const showBismillah = surahId !== 1 && surahId !== 9;

  return (
    <div className="bg-[#121212] rounded-lg p-6 mb-6 border border-[#121212]">
      <div className="relative flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="hidden md:flex flex-shrink-0 ml-2">
          <img
            src={isMakkah ? '/asset/makkah.webp' : '/asset/madinah.webp'}
            alt={isMakkah ? 'Makkah' : 'Madinah'}
            className="w-24 h-24 rounded-lg object-cover"
            style={{ filter: 'brightness(10)' }}
          />
        </div>

        <div className="text-center md:absolute md:left-1/2 md:-translate-x-1/2">
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
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
