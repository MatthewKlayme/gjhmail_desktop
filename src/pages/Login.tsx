import { useEffect, useState } from "react";
import { getHealth } from "../api/health";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [status, setStatus] = useState("checking...");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


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

        const redirectUri =
            import.meta.env.PROD
                ? "https://gjhmail-1052023244032.us-central1.run.app/auth/oauth/google"
                : `https://margareta-babyish-lizeth.ngrok-free.dev/auth/oauth/google`

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

        const oauthUrl =
            `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

        window.open(oauthUrl, "oauth", "width=500,height=600");
        const listener = (event: MessageEvent) => {
            if (!event.data?.token) return;

            const storedState = sessionStorage.getItem("oauth_state");

            if (event.data.state !== storedState) {
                console.error("Invalid OAuth state");
                return;
            }

            sessionStorage.removeItem("oauth_state");
            localStorage.setItem("access_token", event.data.token);
            window.removeEventListener("message", listener);
            navigate("/gjhmail");
        };
        window.addEventListener("message", listener);
    };

    const MICROSOFT_CLIENT_ID =
        import.meta.env.VITE_MICROSOFT_CLIENT_ID ||
        "YOUR_CLIENT_ID";

    const loginWithMicrosoft = () => {
        if (!MICROSOFT_CLIENT_ID) {
            console.error("Missing Microsoft Client ID");
            return;
        }

        const state = crypto.randomUUID();
        sessionStorage.setItem("oauth_state", state);
        sessionStorage.setItem("oauth_provider", "microsoft");

        const redirectUri = import.meta.env.PROD
            ? "https://gjhmail-1052023244032.us-central1.run.app/auth/oauth/microsoft"
            : "https://margareta-babyish-lizeth.ngrok-free.dev/auth/oauth/microsoft";

        const params = new URLSearchParams({
            client_id: MICROSOFT_CLIENT_ID,
            response_type: "code",
            redirect_uri: redirectUri,
            response_mode: "query",
            scope: "openid profile email Mail.Send offline_access",
            prompt: "select_account",
            state,
        });

        const oauthUrl =
            `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?${params}`;

        window.open(oauthUrl, "oauth", "width=500,height=600");

        const listener = (event: MessageEvent) => {
            if (!event.data?.token) return;

            const storedState = sessionStorage.getItem("oauth_state");

            if (event.data.state !== storedState) {
                console.error("Invalid OAuth state");
                return;
            }

            sessionStorage.removeItem("oauth_state");
            localStorage.setItem("access_token", event.data.token);

            window.removeEventListener("message", listener);
            navigate("/gjhmail");
        };

        window.addEventListener("message", listener);
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
                    <p style={{ display: "flex", alignItems: "center" }}>Backend status: <p style={{ color: "greenyellow", marginLeft: "5px" }}> {status}</p> </p>
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

