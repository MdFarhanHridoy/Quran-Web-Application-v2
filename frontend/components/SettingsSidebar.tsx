'use client';

import { useSettings } from '@/context/SettingsContext';

interface SettingsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsSidebar({ isOpen, onClose }: SettingsSidebarProps) {
  const { settings, updateSettings } = useSettings();

  const getArabicFontClass = () => {
    if (settings.arabicFont === 'Amiri') {
      return "'Amiri', serif";
    }
    return "'Scheherazade New', serif";
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <div className="relative ml-auto h-full w-80 bg-white shadow-xl transform transition-transform">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-800">Settings</h2>
                <button
                  onClick={onClose}
                  className="px-3 py-1 bg-stone-200 text-stone-800 rounded hover:bg-stone-300 transition-colors"
                  aria-label="Close Settings"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto">
                <div>
                  <label className="block text-lg font-semibold text-stone-700 mb-3">
                    Arabic Font
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="arabicFont"
                        value="Amiri"
                        checked={settings.arabicFont === 'Amiri'}
                        onChange={() => updateSettings({ arabicFont: 'Amiri' })}
                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-stone-800" style={{ fontFamily: "'Amiri', serif" }}>Amiri</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="arabicFont"
                        value="Scheherazade"
                        checked={settings.arabicFont === 'Scheherazade'}
                        onChange={() => updateSettings({ arabicFont: 'Scheherazade' })}
                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-stone-800" style={{ fontFamily: "'Scheherazade New', serif" }}>Scheherazade</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-stone-700 mb-3">
                    Arabic Font Size: {settings.arabicFontSize}px
                  </label>
                  <input
                    type="range"
                    min="16"
                    max="40"
                    value={settings.arabicFontSize}
                    onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-1">
                    <span>16px</span>
                    <span>40px</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-stone-700 mb-3">
                    Translation Font Size: {settings.translationFontSize}px
                  </label>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value={settings.translationFontSize}
                    onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-sm text-stone-500 mt-1">
                    <span>12px</span>
                    <span>24px</span>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                  <h3 className="font-semibold text-stone-700 mb-2">Preview</h3>
                  <div className="text-right text-stone-800 mb-2" style={{ fontSize: `${settings.arabicFontSize}px`, fontFamily: getArabicFontClass() }}>
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                  </div>
                  <div className="text-stone-700" style={{ fontSize: `${settings.translationFontSize}px` }}>
                    In the name of Allah, the Most Gracious, the Most Merciful.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200">
                <p className="text-sm text-stone-500 text-center">
                  Settings are automatically saved to your browser.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
