"use client";

import React, { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

interface PersonTypeSelectorProps {
    onSelect: (type: "Natural" | "Juridica") => void;
}

const TypeSelector: React.FC<PersonTypeSelectorProps> = ({ onSelect }) => {
    const [selectedType, setSelectedType] = useState<"Natural" | "Juridica" | null>(null);

    const handleSelect = (type: "Natural" | "Juridica") => {
        setSelectedType(type);
        onSelect(type);
    };

    return (
        <Box width="100%" mx="auto" margin={10}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Tipo de persona
            </Typography>
            <Typography variant="h6" sx={{ color: "#A7A7A7", mb: 4 }}>
                Seleccione una opción
            </Typography>
            <Stack direction="row" spacing={4} justifyContent="start">
                <Button
                    onClick={() => handleSelect("Natural")}
                    variant="outlined"
                    sx={{
                        borderRadius: "12px",
                        border: selectedType === "Natural" ? "2px solid #3C3B6E" : "2px solid #3C3B6E",
                        backgroundColor: selectedType === "Natural" ? "#C5C5DE" : "transparent",
                        color: selectedType === "Natural" ? "#000000" : "#000000",
                        fontWeight: "700",
                        fontSize: "24px",
                        width: "350px",
                        height: "96px",
                        "&:hover": {
                            backgroundColor: selectedType === "Natural" ? "#C5C5DE" : "rgba(0,0,0,0.04)",
                        },
                    }}
                >
                    Natural
                </Button>
                <Button
                    onClick={() => handleSelect("Juridica")}
                    variant="outlined"
                    sx={{
                        borderRadius: "12px",
                        border: selectedType === "Juridica" ? "2px solid #3C3B6E" : "2px solid #3C3B6E",
                        backgroundColor: selectedType === "Juridica" ? "#C5C5DE" : "transparent",
                        color: selectedType === "Juridica" ? "#000000" : "#000000",
                        fontWeight: "700",
                        fontSize: "24px",
                        width: "350px",
                        height: "96px",
                        "&:hover": {
                            backgroundColor: selectedType === "Juridica" ? "#C5C5DE" : "rgba(0,0,0,0.04)",
                        },
                    }}
                >
                    Juridica
                </Button>
            </Stack>
        </Box>
    );
};

export default TypeSelector;
