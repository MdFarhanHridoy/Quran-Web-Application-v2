'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import IconSidebar from './IconSidebar';
import SurahSidebar from './SurahSidebar';
import { getSurahs } from '@/lib/api';
import { Surah } from '@/lib/api';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

function LayoutWrapperContent({ children }: LayoutWrapperProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isSurahSidebarOpen, setIsSurahSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchSurahs() {
      try {
        const data = await getSurahs();
        setSurahs(data);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
    }
    fetchSurahs();
  }, []);

  const getCurrentSurahId = () => {
    const match = pathname.match(/\/surah\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const handleSurahSelect = (id: number) => {
    router.push(`/surah/${id}`);
  };

  const currentSurahId = getCurrentSurahId();

  return (
    <div className="flex h-screen overflow-hidden">
      <IconSidebar
        onSurahClick={() => setIsSurahSidebarOpen(!isSurahSidebarOpen)}
        onSearchClick={() => {}}
        onSettingsClick={() => {}}
      />

      <SurahSidebar
        surahs={surahs}
        currentSurahId={currentSurahId}
        onSurahSelect={handleSurahSelect}
        onClose={() => setIsSurahSidebarOpen(false)}
      />

      <main className="flex-1 overflow-y-auto ml-14 md:ml-16">
        {children}
      </main>
    </div>
  );
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="text-[#e0e0e0]">Loading...</div></div>}>
      <LayoutWrapperContent>{children}</LayoutWrapperContent>
    </Suspense>
  );
}
