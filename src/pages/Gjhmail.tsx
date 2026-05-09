import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetchAuth } from "../api/auth";
import toast from "react-hot-toast";
import { DragAndDrop } from "../components/DragAndDrop";
import { DeedTypeButtons } from "../components/DeedTypeButtons";

function getEmailFromToken(token: string | null): string {
    if (!token) return "";
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.email || payload.sub || "";
    } catch {
        return "";
    }
}

export const GjhmailSender = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]);
    const [deedType, setDeedType] = useState<string | null>(null)
    const [sending, setSending] = useState(false);
    const email = getEmailFromToken(localStorage.getItem("access_token"));

    useEffect(() => {
        console.log(deedType)
    }, [deedType])

    const handleSend = async () => {
        setSending(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("No token found");
            return;
        }
        if (files.length === 0) {
            toast.error("No documents attached");
            setSending(false);
            return;
        }
        const formData = new FormData();

        files.forEach((file) => {
            formData.append("attachments", file);
        });
        if (deedType) formData.append("deedType", deedType);
        try {
            toast.promise(
                apiFetchAuth("/send-email", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }),
                {
                    loading: "Sending...",
                    success: <b>Deed sent!</b>,
                    error: <b>Deed failed to send :(</b>,
                }
            );
            setFiles([]);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong :(");
        } finally {
            setSending(false);
            setDeedType(null)
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        navigate("/");
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {email && (
                    <span style={{ fontSize: 12, color: "#6b7280" }}>{email}</span>
                )}
                <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
                    <button
                        onClick={() => navigate("/settings")}
                        style={{ background: "transparent", color: "#9ca3af", border: "1px solid #374151", fontSize: 13 }}
                    >
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        style={{ background: "transparent", color: "#9ca3af", border: "1px solid #374151", fontSize: 13 }}
                    >
                        Logout
                    </button>
                </div>
            </div>
            <DragAndDrop files={files} setFiles={setFiles} />
            <DeedTypeButtons deedType={deedType} setDeedType={setDeedType} />

            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
                <button
                    onClick={handleSend}
                    disabled={sending}
                >
                    SEND
                </button>
            </div>
        </div>
    );
};
