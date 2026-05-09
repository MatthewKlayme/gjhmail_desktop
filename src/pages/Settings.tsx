import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchSettings, saveSettings } from "../api/settings";

export const SettingsPage = () => {
  const navigate = useNavigate();
  const [recipientEmail, setRecipientEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchSettings(token)
      .then((data) => {
        if (data.recipient_email) setRecipientEmail(data.recipient_email);
      })
      .catch(() => toast.error("Failed to load settings"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    if (!recipientEmail.trim()) {
      toast.error("Please enter a recipient email");
      return;
    }
    setSaving(true);
    try {
      await saveSettings(token, recipientEmail.trim());
      toast.success("Settings saved");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>;

  return (
    <div style={{ padding: 24, maxWidth: 480 }}>
      <button
        onClick={() => navigate("/gjhmail")}
        style={{ marginBottom: 24, background: "transparent", color: "#9ca3af", border: "1px solid #374151" }}
      >
        Back
      </button>

      <h2 style={{ marginBottom: 24 }}>Settings</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        <label style={{ fontSize: 14, color: "#9ca3af" }}>
          Send emails to
        </label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="recipient@example.com"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #374151",
            background: "#1a1a1a",
            color: "white",
            fontSize: 14,
            outline: "none",
          }}
        />
      </div>

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};
