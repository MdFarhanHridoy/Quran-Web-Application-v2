export const getArabicFontFamily = (font: 'Amiri' | 'Scheherazade') => {
  return font === 'Amiri' ? "'Amiri', serif" : "'Scheherazade New', serif";
};
