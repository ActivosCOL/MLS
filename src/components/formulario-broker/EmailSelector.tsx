"use client";

import React, { useState } from "react";
import { Box, TextField, Typography, ToggleButton } from "@mui/material";

const EmailSelector: React.FC = () => {
    const [emailName, setEmailName] = useState<string>("");
    const [domain, setDomain] = useState<string>("gmail");
    const [customDomain, setCustomDomain] = useState<string>("");
    const [extension, setExtension] = useState<string>("com");
    const [customExtension, setCustomExtension] = useState<string>("");

    const currentDomain = customDomain || domain;
    const currentExtension = customExtension || extension;


    return (
        <Box sx={{ widt: "100%", mx: "auto", p: 2, display: "flex", flexDirection: "column", gap: 4, m: 10 }}>
            <Typography variant="body1" fontWeight="bold">Correo electrónico</Typography>
            <Box sx={{ width: "100%", display: "flex" }}>
                <Box sx={{ width: "900px" }}>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            value={emailName}
                            onChange={(e) => setEmailName(e.target.value)}
                            placeholder="usuario"
                            variant="outlined"
                            sx={{
                                flex: 1,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px 0 0 8px",
                                },
                            }}
                        />
                        <TextField
                            value={`@${currentDomain}.${currentExtension}`}
                            disabled
                            sx={{
                                width: 200,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "0 8px 8px 0",
                                },
                                "& .MuiInputBase-input": {
                                    fontWeight: "bold",
                                    color: "black",
                                },
                            }}
                        />
                    </Box>
                </Box>
            </Box>


            {/* Opciones de dominio */}
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                {["gmail", "outlook", "hotmail"].map((option) => (
                    <ToggleButton
                        key={option}
                        value={option}
                        selected={domain === option && customDomain === ""}
                        onChange={() => {
                            setDomain(option);
                            setCustomDomain("");
                        }}
                        sx={{
                            ...buttonStyles(domain === option && customDomain === ""),
                            height: "56px",
                            padding: "0 16px",
                            minWidth: "150px",
                        }}
                    >
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                    </ToggleButton>
                ))}
            </Box>


            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                <TextField
                    placeholder="ej: io, tech, org"
                    value={customExtension}
                    onChange={(e) => setCustomExtension(e.target.value)}
                    sx={{
                        width: 200,
                        "& .MuiOutlinedInput-root": {
                            height: "56px",
                        },
                    }}
                />
                {["com", "com.co", "co"].map((option) => (
                    <ToggleButton
                        key={option}
                        value={option}
                        selected={extension === option && customExtension === ""}
                        onChange={() => {
                            setExtension(option);
                            setCustomExtension("");
                        }}
                        sx={{
                            ...buttonStyles(extension === option && customExtension === ""),
                            height: "56px",
                            padding: "0 16px",
                            minWidth: "150px",
                        }}
                    >
                        .{option}
                    </ToggleButton>
                ))}
            </Box>



        
            <TextField
                placeholder="ej: io, tech, org"
                value={customExtension}
                onChange={(e) => setCustomExtension(e.target.value)}
                sx={{ width: 200 }}
            />
        </Box>
    );
};

// Estilos del botón
const buttonStyles = (isSelected: boolean) => ({
    bgcolor: isSelected ? "#C5C5DE" : "transparent",
    border: "2px solid #3C3B6E",
    color: "black",
    "&.Mui-selected": {
        bgcolor: "#C5C5DE",
        border: "2px solid #3C3B6E",
        color: "black",
    },
    "&:hover": {
        bgcolor: isSelected ? "#C5C5DE" : "rgba(0,0,0,0.04)",
    },
    borderRadius: "8px",
    px: 2,
    py: 1,
});

export default EmailSelector;
