import { INITIAL_DATA } from '../data/mockData';

const STORAGE_KEY = 'campus_connect_state_v1';

export const storage = {
  getDb() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        return INITIAL_DATA;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to read from localStorage", e);
      return INITIAL_DATA;
    }
  },

  saveDb(db) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error("Failed to write to localStorage", e);
    }
  },

  getCollection(key) {
    const db = this.getDb();
    return db[key] || [];
  },

  saveCollection(key, items) {
    const db = this.getDb();
    db[key] = items;
    this.saveDb(db);
  },

  resetDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
};