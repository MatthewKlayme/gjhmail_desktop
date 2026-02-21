const API_BASE =
    import.meta.env.VITE_API_BASE_URL";

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const isFormData = options.body instanceof FormData;

    const headers: HeadersInit = {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
    };

    if (import.meta.env.DEV) {
        headers["ngrok-skip-browser-warning"] = "true";
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(
            `Expected JSON from ${res.url}, got ${contentType}: ${text.slice(0, 100)}`
        );
    }

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}
