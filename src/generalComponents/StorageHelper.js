export function setCookie(name, info, date) {
    document.cookie = `${name}=${info}; expires=${date}`
}

export function setStorageItem(key, value) {
    localStorage.setItem(key, value)
}

export function getStorageItem(key) {
    return localStorage.getItem(key)
}