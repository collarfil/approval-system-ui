import { STORAGE_KEYS } from "@/shared/constants/storage";

export function getToken() {
    return localStorage.getItem(STORAGE_KEYS.token);
}

export function saveToken(token: string) {
    localStorage.setItem(STORAGE_KEYS.token, token);
}

export function removeToken() {
    localStorage.removeItem(STORAGE_KEYS.token);
}