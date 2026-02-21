import { apiFetch } from "./http";

export const apiFetchAuth = <T>(
    path: string,
    options: RequestInit = {}
) =>
    apiFetch<T>(path, {
        ...options,
        credentials: "include",
    });
