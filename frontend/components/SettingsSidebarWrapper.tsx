'use client';

import { useState } from 'react';
import Header from './Header';
import SettingsSidebar from './SettingsSidebar';

export default function SettingsSidebarWrapper() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <Header onSettingsClick={() => setIsSettingsOpen(true)} />
      <SettingsSidebar isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
