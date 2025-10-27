// Simple, safe localStorage helpers
export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch { /* no-op */ }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch { /* no-op */ }
  }
};
