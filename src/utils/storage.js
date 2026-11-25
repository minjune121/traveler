import { INITIAL_DATA } from '../data/mockData';

const STORAGE_KEY = 'TRAVELER_APP_STATE_V1';

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveState(INITIAL_DATA);
      return INITIAL_DATA;
    }
    const parsed = JSON.parse(raw);
    // 기본 키 누락 방지 병합
    return {
      ...INITIAL_DATA,
      ...parsed,
    };
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return INITIAL_DATA;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
};

export const resetToInitial = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  } catch (error) {
    console.error('Failed to reset state:', error);
    return INITIAL_DATA;
  }
};
