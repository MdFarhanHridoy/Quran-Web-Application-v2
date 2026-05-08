'use client';

import { useSettings } from '@/context/SettingsContext';
import { getArabicFontFamily } from '@/lib/utils';
import { Settings } from '@/lib/types';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { settings, updateSettings } = useSettings();

  const fonts: { id: Settings['arabicFont']; name: string; sample: string }[] = [
    { id: 'KFGQ', name: 'KFGQ', sample: 'بِسْمِ ٱللَّهِ' },
    { id: 'Amiri', name: 'Amiri', sample: 'بِسْمِ ٱللَّهِ' },
    { id: 'Scheherazade', name: 'Scheherazade', sample: 'بِسْمِ ٱللَّهِ' },
  ];

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-80 bg-[#16213e] border-l border-[#2a3a5e] z-50 flex flex-col transform transition-transform duration-300">
        <div className="p-6 border-b border-[#2a3a5e] flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#e0e0e0]">Font Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#253354] rounded-lg transition-colors text-[#a0a0a0] hover:text-[#e0e0e0]"
            aria-label="Close settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <label className="block text-sm font-semibold text-[#e0e0e0] mb-4">
              Arabic Font Face
            </label>
            <div className="space-y-3">
              {fonts.map((font) => (
                <label
                  key={font.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    settings.arabicFont === font.id
                      ? 'bg-[#253354] border-[#c9a84c]'
                      : 'bg-[#1a1a2e] border-[#2a3a5e] hover:border-[#253354]'
                  }`}
                >
                  <input
                    type="radio"
                    name="arabicFont"
                    value={font.id}
                    checked={settings.arabicFont === font.id}
                    onChange={() => updateSettings({ arabicFont: font.id })}
                    className="w-4 h-4 accent-[#c9a84c]"
                  />
                  <div className="flex-1">
                    <div className="text-[#e0e0e0] font-medium text-sm">{font.name}</div>
                    <div
                      className="text-[#c9a84c] mt-1 text-lg"
                      dir="rtl"
                      style={{ fontFamily: getArabicFontFamily(font.id) }}
                    >
                      {font.sample}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#e0e0e0] mb-4">
              Arabic Font Size: {settings.arabicFontSize}px
            </label>
            <input
              type="range"
              min="20"
              max="50"
              value={settings.arabicFontSize}
              onChange={(e) => updateSettings({ arabicFontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#c9a84c]"
            />
            <div className="flex justify-between text-xs text-[#707070] mt-2">
              <span>20px</span>
              <span>50px</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#e0e0e0] mb-4">
              Translation Font Size: {settings.translationFontSize}px
            </label>
            <input
              type="range"
              min="12"
              max="24"
              value={settings.translationFontSize}
              onChange={(e) => updateSettings({ translationFontSize: parseInt(e.target.value) })}
              className="w-full h-2 bg-[#1a1a2e] rounded-lg appearance-none cursor-pointer accent-[#c9a84c]"
            />
            <div className="flex justify-between text-xs text-[#707070] mt-2">
              <span>12px</span>
              <span>24px</span>
            </div>
          </div>

          <div className="bg-[#1a1a2e] p-4 rounded-lg border border-[#2a3a5e]">
            <h3 className="font-semibold text-[#e0e0e0] mb-3 text-sm">Preview</h3>
            <div
              className="text-right text-[#e0e0e0] mb-3 leading-loose"
              dir="rtl"
              style={{
                fontFamily: getArabicFontFamily(settings.arabicFont),
                fontSize: `${settings.arabicFontSize}px`,
              }}
            >
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </div>
            <div
              className="text-[#a0a0a0] leading-relaxed"
              style={{ fontSize: `${settings.translationFontSize}px` }}
            >
              In the name of Allah, the Most Gracious, the Most Merciful.
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#2a3a5e] text-center">
          <p className="text-xs text-[#707070]">
            Settings are automatically saved to your browser.
          </p>
        </div>
      </div>
    </>
  );
}
