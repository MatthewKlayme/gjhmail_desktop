import { useCallback, useState, type Dispatch, type DragEvent, type SetStateAction } from "react";

const ACCEPTED_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "image/jpg",
];

type DragAndDropProps = {
    files: File[];
    setFiles: Dispatch<SetStateAction<File[]>>;
};

export const DragAndDrop = ({ files, setFiles }: DragAndDropProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleFiles = useCallback((incoming: FileList | null) => {
        if (!incoming) return;

        const validFiles = Array.from(incoming).filter((file) =>
            ACCEPTED_TYPES.includes(file.type),
        );

        setFiles((prev) => [...prev, ...validFiles]);
    }, [setFiles]);

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const borderColor = isDragging
        ? "#6366f1"
        : isHovering
            ? "#9ca3af"
            : "#d1d5db";

    return (
        <>
            <label style={{ color: "#6b7280", fontSize: 14 }}>
                Drag files in, drop them, and send
            </label>

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => document.getElementById("file-input")?.click()}
                style={{
                    cursor: "pointer",
                    borderRadius: 12,
                    border: `2px dashed ${borderColor}`,
                    background: "black",
                    padding: 32,
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    boxShadow: isDragging
                        ? "0 10px 25px rgba(99,102,241,0.15)"
                        : "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <div
                    style={{
                        width: 48,
                        height: 48,
                        margin: "0 auto 12px",
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, #f163aa, #8b5cf6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 22,
                    }}
                >
                    FILE
                </div>

                <div style={{ fontWeight: 500, color: "#374151" }}>
                    Drop your documents here
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                    PDFs, images, or DOCX - click to browse
                </div>

                <input
                    id="file-input"
                    type="file"
                    multiple
                    accept=".pdf,.png,.jpg,.jpeg,.docx"
                    style={{ display: "none" }}
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {files.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {files.map((file, i) => (
                        <div
                            key={`${file.name}-${i}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "6px 10px",
                                borderRadius: 999,
                                border: "1px solid #e5e7eb",
                                background: "#2e2e2e",
                                fontSize: 13,
                                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                            }}
                        >
                            ATTACH
                            <span
                                style={{
                                    maxWidth: 140,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {file.name}
                            </span>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(i);
                                }}
                                aria-label="Remove file"
                                style={{
                                    marginLeft: 4,
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                    color: "#9ca3af",
                                    fontSize: 14,
                                    lineHeight: 1,
                                    padding: 0,
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#ef4444")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#9ca3af")
                                }
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
