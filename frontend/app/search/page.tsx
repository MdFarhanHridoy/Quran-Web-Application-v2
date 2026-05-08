'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SearchPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/surah/1');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-[#c4c4c4] text-xl">Use the search icon to search...</div>
    </div>
  );
}
