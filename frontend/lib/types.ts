export interface Settings {
  arabicFont: 'Amiri' | 'Scheherazade';
  arabicFontSize: number;
  translationFontSize: number;
}

export const defaultSettings: Settings = {
  arabicFont: 'Amiri',
  arabicFontSize: 24,
  translationFontSize: 16,
};
