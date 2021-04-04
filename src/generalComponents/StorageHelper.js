export function setCookie(name, info, date) {
    document.cookie = `${name}=${info}; expires=${date}`
};