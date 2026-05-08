const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Surah {
  id: number;
  name_ar: string;
  name_en: string;
  revelation_place: string;
  verse_count: number;
}

export interface Ayah {
  surah_id: number;
  ayah_number: number;
  verse_key: string;
  text_uthmani: string;
  translation: string;
}

export interface SearchResponse {
  results: Ayah[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export async function getSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch(`${API_URL}/api/surahs`);
    if (!response.ok) {
      throw new Error('Failed to fetch surahs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching surahs:', error);
    throw error;
  }
}

export async function getSurahById(id: number): Promise<Surah> {
  try {
    const response = await fetch(`${API_URL}/api/surahs/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch surah');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching surah:', error);
    throw error;
  }
}

export async function getAyahsBySurahId(surahId: number): Promise<Ayah[]> {
  try {
    const response = await fetch(`${API_URL}/api/surah/${surahId}/ayahs`);
    if (!response.ok) {
      throw new Error('Failed to fetch ayahs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ayahs:', error);
    throw error;
  }
}

export async function searchAyahs(
  query: string,
  page: number = 1,
  limit: number = 50
): Promise<SearchResponse> {
  try {
    const response = await fetch(
      `${API_URL}/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to search ayahs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching ayahs:', error);
    throw error;
  }
}
