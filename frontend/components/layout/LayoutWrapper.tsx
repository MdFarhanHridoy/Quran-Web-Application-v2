'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import IconSidebar from './IconSidebar';
import SurahSidebar from './SurahSidebar';
import Header from './Header';
import SettingsPanel from '@/components/settings/SettingsPanel';
import SearchPanel from '@/components/search/SearchPanel';
import { getSurahs } from '@/lib/api';
import { Surah } from '@/lib/api';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

function LayoutWrapperContent({ children }: LayoutWrapperProps) {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [isSurahSidebarOpen, setIsSurahSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    setIsSurahSidebarOpen(false);
  };

  const currentSurahId = getCurrentSurahId();

  const handleSearchSubmit = (query: string) => {
    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Header onSearchClick={() => setIsSearchOpen(true)} />

      <div className="flex h-screen pt-14 overflow-hidden">
        <IconSidebar
          onSurahClick={() => setIsSurahSidebarOpen(!isSurahSidebarOpen)}
          onSettingsClick={() => setIsSettingsOpen(!isSettingsOpen)}
        />

        <SurahSidebar
          surahs={surahs}
          currentSurahId={currentSurahId}
          onSurahSelect={handleSurahSelect}
          onClose={() => setIsSurahSidebarOpen(false)}
          isMobileOpen={isSurahSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto ml-14 md:ml-[22rem] lg:mr-80 bg-[#121212]">
          {children}
        </main>

        <SettingsPanel
          isMobileOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>

      <SearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearchSubmit}
      />
    </>
  );
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full"><div className="text-[#c4c4c4]">Loading...</div></div>}>
      <LayoutWrapperContent>{children}</LayoutWrapperContent>
    </Suspense>
  );
}
