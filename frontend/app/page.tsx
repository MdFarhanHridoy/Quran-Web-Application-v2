'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/surah/1');
  }, [router]);

  return (
    <div className="flex items-center justify-center h-dvh">
      <div className="text-[#c4c4c4] text-xl">Loading...</div>
    </div>
  );
}
