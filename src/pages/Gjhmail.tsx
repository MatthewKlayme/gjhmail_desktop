import { useEffect, useState } from "react";
import { apiFetchAuth } from "../api/auth";
import toast from "react-hot-toast";
import { DragAndDrop } from "../components/DragAndDrop";
import { DeedTypeButtons } from "../components/DeedTypeButtons";

export const GjhmailSender = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [deedType, setDeedType] = useState<string | null>(null)
    const [sending, setSending] = useState(false);

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

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
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
