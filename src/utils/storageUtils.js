/**
 * Local storage utility functions
 */

/**
 * Get value from local storage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} Stored value or default
 */
export function getStorageValue(key, defaultValue = null) {
    const value = localStorage.getItem(key);
    return value !== null ? value : defaultValue;
}

/**
 * Set value in local storage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export function setStorageValue(key, value) {
    localStorage.setItem(key, value);
}

/**
 * Remove value from local storage
 * @param {string} key - Storage key
 */
export function removeStorageValue(key) {
    localStorage.removeItem(key);
}
