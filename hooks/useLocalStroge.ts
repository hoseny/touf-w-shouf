export const ClientStorage = {
  get(key: string) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null; 
  },
  set(key: string, value: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
};
