"use client";

import React, { useState } from "react";
import { Box, TextField, Typography, ToggleButton, MenuItem } from "@mui/material";
import { colombia } from "@/utils/colombia/colombia";

const NaturalContactForm: React.FC = () => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [hasWhatsapp, setHasWhatsapp] = useState<string | null>(null);

    const handleDepartmentChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string[];
        setSelectedDepartments(value);
        setSelectedCities([]);
    };

    const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string[];
        setSelectedCities(value);
    };

    return (
        <Box sx={{ widt: "100%", mx: "auto", p: 2, display: "flex", flexDirection: "column", gap: 4, m: 10 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">Número de documento</Typography>
                    <TextField fullWidth variant="outlined" />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">Nombre</Typography>
                    <TextField fullWidth variant="outlined" />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">Número de teléfono</Typography>
                    <TextField fullWidth variant="outlined" />
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">Departamento de operación principal</Typography>
                    <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                        Selección múltiple
                    </Typography>
                    <TextField
                        select
                        SelectProps={{ multiple: true }}
                        fullWidth
                        value={selectedDepartments}
                        onChange={handleDepartmentChange}
                    >
                        {colombia.map((dep) => (
                            <MenuItem key={dep.departamento} value={dep.departamento}>
                                {dep.departamento}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight="bold">Ciudad de operación principal</Typography>
                    <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                        Selección múltiple
                    </Typography>
                    <TextField
                        select
                        SelectProps={{ multiple: true }}
                        fullWidth
                        value={selectedCities}
                        onChange={handleCityChange}
                        disabled={selectedDepartments.length === 0}
                    >
                        {colombia
                            .filter((dep) => selectedDepartments.includes(dep.departamento))
                            .flatMap((dep) =>
                                dep.ciudades.map((city) => (
                                    <MenuItem key={city} value={city}>
                                        {city}
                                    </MenuItem>
                                ))
                            )}
                    </TextField>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="body1" fontWeight="bold">
                    ¿Tiene WhatsApp?
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <ToggleButton
                        value="Si"
                        selected={hasWhatsapp === "Si"}
                        onChange={() => setHasWhatsapp("Si")}
                        sx={{
                            bgcolor: hasWhatsapp === "Si" ? "#C5C5DE" : "transparent",
                            border: "2px solid #3C3B6E",
                            color: "black",
                            "&.Mui-selected": {
                                bgcolor: "#C5C5DE",
                                border: "2px solid #3C3B6E",
                                color: "black",
                            },
                            "&:hover": {
                                bgcolor: hasWhatsapp === "Si" ? "#C5C5DE" : "rgba(0,0,0,0.04)",
                            },
                            borderRadius: "8px",
                            px: 3,
                            py: 1,
                            minWidth: "60px",
                        }}
                    >
                        Sí
                    </ToggleButton>
                    <ToggleButton
                        value="No"
                        selected={hasWhatsapp === "No"}
                        onChange={() => setHasWhatsapp("No")}
                        sx={{
                            bgcolor: hasWhatsapp === "No" ? "#C5C5DE" : "transparent",
                            border: "2px solid #3C3B6E",
                            color: "black",
                            "&.Mui-selected": {
                                bgcolor: "#C5C5DE",
                                border: "2px solid #3C3B6E",
                                color: "black",
                            },
                            "&:hover": {
                                bgcolor: hasWhatsapp === "No" ? "#C5C5DE" : "rgba(0,0,0,0.04)",
                            },
                            borderRadius: "8px",
                            px: 3,
                            py: 1,
                            minWidth: "60px",
                        }}
                    >
                        No
                    </ToggleButton>
                </Box>
            </Box>
        </Box>
    );
};

export default NaturalContactForm;
