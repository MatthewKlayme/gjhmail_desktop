import { useState } from "react";

type DeedTypeButtonsType = {
    deedType: string | null;
    setDeedType: React.Dispatch<React.SetStateAction<string | null>>
}

export const DeedTypeButtons = ({ deedType, setDeedType }: DeedTypeButtonsType) => {
    const [special, setSpecial] = useState(false)
    const deeds = {
        vli: "Vendor Lien Individual",
        vlc: "Vendor Lien Company",
        cc: "Cash Company",
        ci: "Cash Individual",
    }
    const specialDeeds = {
        svli: "Special Vendor Lien Individual",
        svlc: "Special Vendor Lien Company",
        scc: "Special Cash Company",
        sci: "Special Cash Individual",
    }
    const handleDeedType = (value: string) => {
        setDeedType(value);
    };


    return (
        <div>
            <div>
                <label>Special</label>
                <input
                    type="checkbox"
                    checked={special}
                    onChange={() => setSpecial(prev => !prev)}
                />
            </div>

            {(!special ? deeds : specialDeeds) &&
                Object.entries(!special ? deeds : specialDeeds).map(([key, value]) => (
                    <button
                        key={key}
                        onClick={() => handleDeedType(value)}
                        style={{
                            margin: "5px",
                            backgroundColor: deedType === value ? "#3FA7A7" : "#204646",
                            color: "white",
                        }}
                    >
                        {value}
                    </button>
                ))}
        </div>

    )
}