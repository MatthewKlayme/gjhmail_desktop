import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function AuthCallback() {
    const navigate = useNavigate();

    const API_BASE =
        import.meta.env.VITE_API_BASE_URL ?? "https://margareta-babyish-lizeth.ngrok-free.dev";

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const state = params.get("state");

        const storedState = sessionStorage.getItem("oauth_state");
        const provider = sessionStorage.getItem("oauth_provider");

        if (!code || !state || !storedState || state !== storedState || !provider) {
            navigate("/unauthorized");
            return;
        }

        // cleanup
        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("oauth_provider");

        fetch(`${API_BASE}/auth/oauth/${provider}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
        })
            .then(async (res) => {
                if (!res.ok) throw new Error("Unauthorized");
                return res.json();
            })
            .then((data) => {
                localStorage.setItem("access_token", data.token);
                console.log(data)
                navigate("/gjhmail");
            })
            .catch(() => {
                navigate("/unauthorized");
            });
    }, [navigate]);

    return <p>Signing you in...</p>;
}
