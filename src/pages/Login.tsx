import { useEffect, useState } from "react";
import { getHealth } from "../api/health";

export const Login = () => {
    const [status, setStatus] = useState("checking...");
    const [error, setError] = useState<string | null>(null);

    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1052023244032-6jvgsa5athfjqqqqukofq8rlt56mlvjd.apps.googleusercontent.com";
    const loginWithGoogle = () => {
        if (!GOOGLE_CLIENT_ID) {
            console.error("Missing GOOGLE CLIENT ID");
            return;
        }

        // 🔐 Create CSRF state
        const state = crypto.randomUUID();
        sessionStorage.setItem("oauth_state", state);
        sessionStorage.setItem("oauth_provider", "google");

        const redirectUri = `${window.location.origin}/auth/callback`;

        const params = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: redirectUri,
            response_type: "code",
            scope:
                "openid profile email https://www.googleapis.com/auth/gmail.send",
            access_type: "offline",
            prompt: "consent",
            state,
        });

        window.location.href =
            `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    };

    const MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID;
    const loginWithMicrosoft = () => {
        const state = crypto.randomUUID();
        sessionStorage.setItem("oauth_state", state);
        sessionStorage.setItem("oauth_provider", "microsoft");

        const redirectUri = `${window.location.origin}/auth/callback`;

        const params = new URLSearchParams({
            client_id: MICROSOFT_CLIENT_ID,
            response_type: "code",
            redirect_uri: redirectUri,
            response_mode: "query",
            scope:
                "openid profile email Mail.Send offline_access",
            prompt: "select_account",
            state,
        });

        window.location.href =
            `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`;
    };




    useEffect(() => {
        getHealth()
            .then((res) => setStatus(res.status))
            .catch((err) => setError(err.message));
    }, []);
    return (
        <div style={{ padding: 24 }
        }>
            <h1>GJH Desktop </h1>

            {
                error ? (
                    <p style={{ color: "red" }
                    }>❌ {error} </p>
                ) : (
                    <p>Backend status: {status} </p>
                )}
            <button onClick={loginWithGoogle}>
                Sign in with Google
            </button>
            < button onClick={() => loginWithMicrosoft()}>
                Sign in with Outlook
            </button>
        </div>
    )
}

