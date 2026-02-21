import { apiFetch } from "./http";

export const getHealth = () =>
    apiFetch<{ status: string }>("/health");
