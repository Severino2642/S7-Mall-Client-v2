// src/app/utils/storage.util.ts
export class StorageUtil {

  // Récupérer une valeur
  static getFromStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null; // safe SSR / hydration
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) as T : null;
    } catch (e) {
      console.error(`Erreur parsing localStorage key=${key}`, e);
      return null;
    }
  }

  // Stocker une valeur
  static setToStorage<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Erreur stockage localStorage key=${key}`, e);
    }
  }

  // Supprimer une clé
  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  // Vider tout le localStorage
  static clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
}
