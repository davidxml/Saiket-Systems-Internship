// storage.js - Handles all interactions with the browser's Local Storage.

const STORAGE_KEY = 'urbanLogPosts';
const THEME_KEY = 'urbanLogTheme';

/**
 * Loads all posts from Local Storage.
 * @returns {Array} An array of post objects, or an empty array if none exist.
 */
export const getPosts = () => {
    const postsJSON = localStorage.getItem(STORAGE_KEY);
    if (!postsJSON) {
        return [];
    }
    try {
        return JSON.parse(postsJSON);
    } catch (e) {
        console.error("Error parsing posts from Local Storage:", e);
        return [];
    }
};

/**
 * Saves the current array of posts to Local Storage.
 * @param {Array} posts - The array of post objects to save.
 */
export const savePosts = (posts) => {
    try {
        const postsJSON = JSON.stringify(posts);
        localStorage.setItem(STORAGE_KEY, postsJSON);
    } catch (e) {
        console.error("Error saving posts to Local Storage:", e);
    }
};

/**
 * Gets the user's preferred theme (dark or light) from Local Storage.
 * @returns {string} 'dark' or 'light'. Defaults to 'light'.
 */

export const getThemePreference = () => {
    try {
        // Check localStorage first
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
            return savedTheme;
        }
        
        // If no valid theme is saved, check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        
        // Default to 'light'
        return 'light';
    } catch (error) {
        console.error('Error getting theme preference:', error);
        return 'light'; // Fallback to light theme
    }
};

/**
 * Saves the user's preferred theme to Local Storage.
 * @param {string} theme - 'dark' or 'light'.
 */
export const saveThemePreference = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
};