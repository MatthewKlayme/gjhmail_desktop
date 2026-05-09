import { apiFetch } from "./http";

export interface UserSettings {
  recipient_email: string | null;
}

export const fetchSettings = (token: string) =>
  apiFetch<UserSettings>("/settings", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveSettings = (token: string, recipient_email: string) =>
  apiFetch<UserSettings>("/settings", {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ recipient_email }),
  });
