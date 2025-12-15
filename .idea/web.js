import React from "react";

export default function PhotoChoice({ photos, selected, onSelect }) {
    return (
        <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
            {photos.map((photo, index) => (
                <div
                    key={index}
                    onClick={() => onSelect(index)}
                    style={{
                        border: selected === index ? "4px solid #4caf50" : "4px solid transparent",
                        padding: "4px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "0.2s",
                    }}
                >
                    <img
                        src={photo.url}
                        alt={photo.label}
                        width="200"
                        style={{ borderRadius: "10px" }}
                    />
                </div>
            ))}
        </div>
    );
}
