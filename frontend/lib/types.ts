export interface Settings {
  arabicFont: 'KFGQ' | 'Amiri' | 'Scheherazade';
  arabicFontSize: number;
  translationFontSize: number;
}

export const defaultSettings: Settings = {
  arabicFont: 'KFGQ',
  arabicFontSize: 30,
  translationFontSize: 17,
};
