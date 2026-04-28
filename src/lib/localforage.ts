import localforage from "localforage"

// ─── Configuration principale ────────────────────────────────────────────────
localforage.config({
  driver: [
    localforage.INDEXEDDB, // priorité 1 : IndexedDB
    localforage.WEBSQL,    // priorité 2 : WebSQL (fallback)
    localforage.LOCALSTORAGE, // priorité 3 : localStorage (fallback)
  ],
  name: "jaaykaat_pos",       // nom de la base de données
  version: 1.0,
  storeName: "pos_store",     // nom de l'objet store
  description: "Stockage local du POS Restaurant JAAYKAAT",
})

// ─── Instances séparées par domaine ──────────────────────────────────────────

/** Stockage des données d'authentification (utilisateur connecté, token...) */
export const authStore = localforage.createInstance({
  name: "jaaykaat_pos",
  storeName: "auth",
  description: "Données d'authentification",
})

/** Stockage des commandes (panier, historique...) */
export const ordersStore = localforage.createInstance({
  name: "jaaykaat_pos",
  storeName: "orders",
  description: "Commandes et panier",
})

/** Stockage des produits (menu, catalogue...) */
export const productsStore = localforage.createInstance({
  name: "jaaykaat_pos",
  storeName: "products",
  description: "Produits et menu",
})

/** Stockage des paramètres de l'application */
export const settingsStore = localforage.createInstance({
  name: "jaaykaat_pos",
  storeName: "settings",
  description: "Paramètres de l'application",
})

// ─── Helpers génériques typés ─────────────────────────────────────────────────

/**
 * Enregistre une valeur dans un store localforage.
 * @param store - L'instance localforage cible
 * @param key   - La clé de stockage
 * @param value - La valeur à stocker
 */
export async function setItem<T>(
  store: LocalForage,
  key: string,
  value: T
): Promise<T> {
  return store.setItem<T>(key, value)
}

/**
 * Récupère une valeur depuis un store localforage.
 * @param store - L'instance localforage cible
 * @param key   - La clé de stockage
 * @returns La valeur ou null si absente
 */
export async function getItem<T>(
  store: LocalForage,
  key: string
): Promise<T | null> {
  return store.getItem<T>(key)
}

/**
 * Supprime une clé d'un store localforage.
 */
export async function removeItem(
  store: LocalForage,
  key: string
): Promise<void> {
  return store.removeItem(key)
}

/**
 * Vide entièrement un store localforage.
 */
export async function clearStore(store: LocalForage): Promise<void> {
  return store.clear()
}

// ─── Clés constantes pour éviter les fautes de frappe ─────────────────────────
export const STORAGE_KEYS = {
  // Auth
  AUTH_USER: "auth_user",
  AUTH_TOKEN: "auth_token",
  AUTH_REFRESH_TOKEN: "auth_refresh_token",

  // Commandes
  CART: "cart",
  ORDERS_HISTORY: "orders_history",
  CURRENT_TABLE: "current_table",

  // Produits
  MENU_CACHE: "menu_cache",
  MENU_LAST_SYNC: "menu_last_sync",

  // Paramètres
  APP_THEME: "app_theme",
  APP_LANGUAGE: "app_language",
  RESTAURANT_INFO: "restaurant_info",
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export default localforage
