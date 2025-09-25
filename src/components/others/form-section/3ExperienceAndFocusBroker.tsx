"use client";

import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    ThemeProvider,
    createTheme,
    Stack,
    Button,
    Divider,
    Checkbox,
} from "@mui/material";

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderRadius: "10px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#131F684F",
                        borderWidth: "2px",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: "#131F684F",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "#131F68",
                    "&.Mui-checked": {
                        color: "#131F68",
                    },
                },
            },
        },
    },
});

interface FormData {
    yearsInBusiness: number | null;
    otherYears: number | null;
    propertyTypes: string[];
    propertyUses: string[];
    propertyStratum: number[];
    propertyLocation: string[];
    managementType: string[];
    registeredAssociation: string[];
    hasLicense: string | null;
    biggestDeal: string;
    organizationalStructure: string;
    currentInventory: number | null;
    hasExclusivityExperience: string | null;
    exclusivityCount: number | null;
    exclusivityCapacity: number | null;
    advertisingInvestment: string;
    seniority: string;
}

interface ExperienceAndFocusBrokerProps {
    onDataChange: (data: FormData) => void;
    onValidationChange: (valid: boolean, message?: string) => void;
    initialData?: Partial<FormData>;
    setTotalQuestions: (total: number) => void;
    setCurrentQuestion: (question: number) => void;
}

const ExperienceAndFocusBroker = ({ onDataChange, onValidationChange, initialData = {}, setTotalQuestions, setCurrentQuestion }: ExperienceAndFocusBrokerProps) => {
    const [yearsInBusiness, setYearsInBusiness] = useState<number | null>(initialData.yearsInBusiness || null);
    const [otherYears, setOtherYears] = useState<number | null>(initialData.otherYears || null);
    const [useOtherYears, setUseOtherYears] = useState<boolean>(false);
    const [propertyTypes, setPropertyTypes] = useState<string[]>(initialData.propertyTypes || []);
    const [propertyUses, setPropertyUses] = useState<string[]>(initialData.propertyUses || []);
    const [propertyStratum, setPropertyStratum] = useState<number[]>(initialData.propertyStratum || []);
    const [propertyLocation, setPropertyLocation] = useState<string[]>(initialData.propertyLocation || []);
    const [managementType, setManagementType] = useState<string[]>(initialData.managementType || []);
    const [registeredAssociation, setRegisteredAssociation] = useState<string[]>(initialData.registeredAssociation || []);
    const [hasLicense, setHasLicense] = useState<string | null>(initialData.hasLicense || null);
    const [biggestDeal, setBiggestDeal] = useState<string>(initialData.biggestDeal || "");
    const [organizationalStructure, setOrganizationalStructure] = useState<string>(initialData.organizationalStructure || "");
    const [currentInventory, setCurrentInventory] = useState<number | null>(initialData.currentInventory || null);
    const [hasExclusivityExperience, setHasExclusivityExperience] = useState<string | null>(initialData.hasExclusivityExperience || null);
    const [exclusivityCount, setExclusivityCount] = useState<number | null>(initialData.exclusivityCount || null);
    const [exclusivityCapacity, setExclusivityCapacity] = useState<number | null>(initialData.exclusivityCapacity || null);
    const [advertisingInvestment, setAdvertisingInvestment] = useState<string>(initialData.advertisingInvestment || "");
    const [seniority, setSeniority] = useState<string>("año(s)");
    const [showOtherAssociation, setShowOtherAssociation] = useState(false);
    const [otherAssociation, setOtherAssociation] = useState("");

    useEffect(() => {
        if (useOtherYears) {
            setYearsInBusiness(null);
        } else {
            setOtherYears(null);
        }
    }, [useOtherYears]);

    useEffect(() => {
        const formData = {
            yearsInBusiness,
            otherYears,
            propertyTypes,
            propertyUses,
            propertyStratum,
            propertyLocation,
            managementType,
            registeredAssociation,
            hasLicense,
            biggestDeal,
            organizationalStructure,
            currentInventory,
            hasExclusivityExperience,
            exclusivityCount,
            exclusivityCapacity,
            advertisingInvestment,
            seniority
        };

        const timeoutId = setTimeout(() => {
            onDataChange(formData);
            const isValid = validateForm(formData);
            onValidationChange(isValid, isValid ? undefined : "Por favor complete todos los campos requeridos");
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [
        yearsInBusiness,
        otherYears,
        propertyTypes,
        propertyUses,
        propertyStratum,
        propertyLocation,
        managementType,
        registeredAssociation,
        hasLicense,
        biggestDeal,
        organizationalStructure,
        currentInventory,
        hasExclusivityExperience,
        exclusivityCount,
        exclusivityCapacity,
        advertisingInvestment,
        seniority
    ]);

    useEffect(() => {
        setTotalQuestions(15); // Actualizado a 15 preguntas
    }, [setTotalQuestions]);

    useEffect(() => {
        let currentQ = 1;
        
        // Pregunta 1: Años de experiencia
        if (yearsInBusiness || otherYears) currentQ++;
        
        // Pregunta 2: Tipo de inmuebles
        if (propertyTypes.length > 0) currentQ++;
        
        // Pregunta 3: Tipo de uso
        if (propertyUses.length > 0) currentQ++;
        
        // Pregunta 4: Estrato
        if (propertyStratum.length > 0) currentQ++;
        
        // Pregunta 5: Ubicación
        if (propertyLocation.length > 0) currentQ++;
        
        // Pregunta 6: Gestión
        if (managementType.length > 0) currentQ++;
        
        // Pregunta 7: Asociación
        if (registeredAssociation.length > 0) currentQ++;
        
        // Pregunta 8: Licencia
        if (hasLicense) currentQ++;
        
        // Pregunta 9: Mayor operación
        if (biggestDeal) currentQ++;
        
        // Pregunta 10: Estructura organizacional
        if (organizationalStructure) currentQ++;
        
        // Pregunta 11: Inventario actual
        if (currentInventory !== null) currentQ++;
        
        // Pregunta 12: Experiencia en exclusividad
        if (hasExclusivityExperience) currentQ++;
        
        // Pregunta 13: Conteo de exclusividad
        if (hasExclusivityExperience === "Sí" && exclusivityCount !== null) currentQ++;
        
        // Pregunta 14: Capacidad de exclusividad
        if (exclusivityCapacity !== null) currentQ++;

        // Pregunta 15: Inversión publicitaria
        if (advertisingInvestment) currentQ++;
        
        setCurrentQuestion(currentQ);
    }, [
        yearsInBusiness,
        otherYears,
        propertyTypes,
        propertyUses,
        propertyStratum,
        propertyLocation,
        managementType,
        registeredAssociation,
        hasLicense,
        biggestDeal,
        organizationalStructure,
        currentInventory,
        hasExclusivityExperience,
        exclusivityCount,
        exclusivityCapacity,
        advertisingInvestment,
        setCurrentQuestion
    ]);

    // Función para manejar cambios en respuestas Sí/No
    const handleYesNoChange = (value: string, setter: React.Dispatch<React.SetStateAction<string | null>>, dependentSetter?: React.Dispatch<React.SetStateAction<any>>) => {
        setter(value);
        if (value === "No" && dependentSetter) {
            dependentSetter(null);
        }
    };

    // Función mejorada de validación
    const validateForm = (data: FormData): boolean => {
        // Validación básica de campos requeridos
        if (!data.yearsInBusiness && !data.otherYears) return false;
        if (data.propertyTypes.length === 0) return false;
        if (data.propertyUses.length === 0) return false;
        if (data.propertyStratum.length === 0) return false;
        if (data.propertyLocation.length === 0) return false;
        if (data.managementType.length === 0) return false;
        if (!data.hasLicense) return false;
        if (!data.biggestDeal) return false;
        if (!data.organizationalStructure) return false;
        if (data.currentInventory === null) return false;
        if (!data.hasExclusivityExperience) return false;
        if (!data.exclusivityCapacity) return false;
        if (!data.advertisingInvestment) return false;

        // Validación de preguntas condicionales
        if (data.hasExclusivityExperience === "Sí" && data.exclusivityCount === null) return false;

        return true;
    };

    const handleButtonClick = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setter(value);
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
        setter(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    borderRadius: "12px",
                    p: { xs: 2, md: 4 },
                    mt: 4,
                    touchAction: 'manipulation'
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography
                        sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}
                    >
                        ¿Cuántos tiempo lleva operando en el sector inmobiliario?
                    </Typography>

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: "14px", color: "#A7A7A7" }}>
                        Seleccion rápida
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {Array.from({ length: 10 }, (_, i) => (
                            <Button
                                key={i + 1}
                                variant="outlined"
                                onClick={() => handleButtonClick(setYearsInBusiness, i + 1)}
                                disabled={useOtherYears}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "8px",
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: yearsInBusiness === i + 1 ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" },
                                    "&.Mui-disabled": {
                                        color: "#A7A7A7",
                                        borderColor: "#D0D0D0",
                                    },
                                    touchAction: 'manipulation',
                                    WebkitTapHighlightColor: 'transparent'
                                }}
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                        {Array.from({ length: 10 }, (_, i) => (
                            <Button
                                key={i + 11}
                                variant="outlined"
                                onClick={() => handleButtonClick(setYearsInBusiness, i + 11)}
                                disabled={useOtherYears}
                                sx={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "8px",
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: yearsInBusiness === i + 11 ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" },
                                    "&.Mui-disabled": {
                                        color: "#A7A7A7",
                                        borderColor: "#D0D0D0",
                                    },
                                    touchAction: 'manipulation',
                                    WebkitTapHighlightColor: 'transparent'
                                }}
                            >
                                {i + 11}
                            </Button>
                        ))}
                    </Stack>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Checkbox
                            checked={useOtherYears}
                            onChange={(e) => setUseOtherYears(e.target.checked)}
                            sx={{
                                color: "#131F68",
                                "&.Mui-checked": {
                                    color: "#131F68",
                                },
                            }}
                        />
                        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: "14px", color: "#A7A7A7" }}>
                            Otro
                        </Typography>
                    </Box>
                    <TextField
                        type="number"
                        value={otherYears || ""}
                        onChange={(e) => handleInputChange(setOtherYears, Number(e.target.value))}
                        disabled={!useOtherYears}
                        sx={{
                            width: 150,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                                "& fieldset": { borderColor: "#D0D0D0" },
                                "&:hover fieldset": { borderColor: "#131F68" },
                                "&.Mui-focused fieldset": { borderColor: "#131F68" },
                            },
                            "& .Mui-disabled": {
                                color: "#A7A7A7",
                                "& fieldset": { borderColor: "#D0D0D0" },
                            },
                            touchAction: 'manipulation',
                            sx: { WebkitAppearance: 'none' }
                        }}
                        InputProps={{ inputProps: { min: 0 } }}
                    />

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 400, fontSize: "14px", color: "#A7A7A7", mt: 2 }}>
                        Antigüedad
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {["año(s)", "Mese(s)", "Día(s)"].map((label) => (
                            <Button
                                key={label}
                                variant="outlined"
                                onClick={() => setSeniority(label)}
                                sx={{
                                    borderColor: "#131F68",
                                    color: seniority === label ? "#000000" : "#000000",
                                    backgroundColor: seniority === label ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" },
                                    borderRadius: "8px",
                                }}
                            >
                                {label}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                <Divider sx={{ my: 4 }}></Divider>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                        ¿En qué nicho(s) del mercado inmobiliario se especializa?
                    </Typography>

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                        Tipo de Inmuebles (selección múltiple)
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                        {[
                            "Casa",
                            "Edificio",
                            "Local",
                            "Lote",
                            "Oficina",
                            "Depósito",
                            "Garaje",
                            "Bodega",
                            "Finca",
                            "Hotel",
                            "Consultorio",
                            "Lote Condominio",
                            "Centro Vacacional"
                        ].map((type) => (
                            <Button
                                key={type}
                                variant="outlined"
                                onClick={() => setPropertyTypes(prev =>
                                    prev.includes(type)
                                        ? prev.filter(t => t !== type)
                                        : [...prev, type]
                                )}
                                sx={{
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: propertyTypes.includes(type) ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" }
                                }}
                            >
                                {type}
                            </Button>
                        ))}
                    </Stack>

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                        Tipo de uso (selección múltiple)
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                        {["Comercial", "Industrial", "Residencial", "Turístico"].map((use) => (
                            <Button
                                key={use}
                                variant="outlined"
                                onClick={() => setPropertyUses(prev =>
                                    prev.includes(use)
                                        ? prev.filter(u => u !== use)
                                        : [...prev, use]
                                )}
                                sx={{
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: propertyUses.includes(use) ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" }
                                }}
                            >
                                {use}
                            </Button>
                        ))}
                    </Stack>

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                        Estrato de los inmuebles (selección múltiple)
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                        {[1, 2, 3, 4, 5, 6].map((stratum) => (
                            <Button
                                key={stratum}
                                variant="outlined"
                                onClick={() => setPropertyStratum(prev =>
                                    prev.includes(stratum)
                                        ? prev.filter(s => s !== stratum)
                                        : [...prev, stratum]
                                )}
                                sx={{
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: propertyStratum.includes(stratum) ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" }
                                }}
                            >
                                {stratum}
                            </Button>
                        ))}
                    </Stack>

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                        Tipo de Ubicación de inmuebles (selección múltiple)
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                        {["urbano", "rural"].map((loc) => (
                            <Button
                                key={loc}
                                variant="outlined"
                                onClick={() => setPropertyLocation(prev =>
                                    prev.includes(loc)
                                        ? prev.filter(l => l !== loc)
                                        : [...prev, loc]
                                )}
                                sx={{
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: propertyLocation.includes(loc) ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" }
                                }}
                            >
                                {loc}
                            </Button>
                        ))}
                    </Stack>

                    <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                        Gestión (selección múltiple)
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                        {["Arriendo", "Venta", "Avalúos"].map((management) => (
                            <Button
                                key={management}
                                variant="outlined"
                                onClick={() => setManagementType(prev =>
                                    prev.includes(management)
                                        ? prev.filter(m => m !== management)
                                        : [...prev, management]
                                )}
                                sx={{
                                    borderColor: "#131F68",
                                    color: "#000000",
                                    backgroundColor: managementType.includes(management) ? "#131F684F" : "transparent",
                                    "&:hover": { backgroundColor: "#131F684F" }
                                }}
                            >
                                {management}
                            </Button>
                        ))}
                    </Stack>
                </Box>
                <Divider sx={{ my: 4 }}></Divider>
                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Está registrado en alguna asociación inmobiliaria o cámara gremial?
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                    {["Fedelonjas", "Camacol", "Lonja Bogotá", "Lonja Medellín Antioquia", "Lonja Cali Valle Del Cauca", "Lonja Barranquilla", "Otra"].map((assoc) => (
                        <Button
                            key={assoc}
                            variant="outlined"
                            onClick={() => {
                                if (assoc === "Otra") {
                                    setShowOtherAssociation(true);
                                } else {
                                    setRegisteredAssociation(prev =>
                                        prev.includes(assoc)
                                            ? prev.filter(a => a !== assoc)
                                            : [...prev, assoc]
                                    );
                                }
                            }}
                            sx={{
                                borderColor: "#131F68",
                                color: "#000000",
                                backgroundColor: registeredAssociation.includes(assoc) ? "#131F684F" : "transparent",
                                "&:hover": { backgroundColor: "#131F684F" }
                            }}
                        >
                            {assoc}
                        </Button>
                    ))}
                </Stack>

                {showOtherAssociation && (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Ingrese el nombre de la asociación"
                            value={otherAssociation}
                            onChange={(e) => {
                                setOtherAssociation(e.target.value);
                            }}
                            onBlur={() => {
                                if (otherAssociation.trim()) {
                                    setRegisteredAssociation(prev => {
                                        const filtered = prev.filter(a => a !== "Otra");
                                        return [...filtered, otherAssociation.trim()];
                                    });
                                } else {
                                    setRegisteredAssociation(prev => prev.filter(a => a !== "Otra"));
                                }
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    '& fieldset': { borderColor: '#D0D0D0' },
                                    '&:hover fieldset': { borderColor: '#131F68' },
                                    '&.Mui-focused fieldset': { borderColor: '#131F68' },
                                },
                            }}
                        />
                    </Box>
                )}

                <Divider sx={{ my: 4 }}></Divider>
                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Cuenta con licencia o registro como agente inmobiliario ante la Cámara de Comercio?
                </Typography>
                <Stack direction="row" spacing={2} mb={2}>
                    <Button
                        variant="outlined"
                        onClick={() => setHasLicense("Sí")}
                        sx={{
                            borderColor: "#131F68",
                            color: "#000000",
                            backgroundColor: hasLicense === "Sí" ? "#131F684F" : "transparent",
                            "&:hover": { backgroundColor: "#131F684F" }
                        }}
                    >
                        Sí
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setHasLicense("No")}
                        sx={{
                            borderColor: "#131F68",
                            color: "#000000",
                            backgroundColor: hasLicense === "No" ? "#131F684F" : "transparent",
                            "&:hover": { backgroundColor: "#131F684F" }
                        }}
                    >
                        No
                    </Button>
                </Stack>

                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Cuál ha sido su mayor operación inmobiliaria?
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={biggestDeal}
                    onChange={(e) => setBiggestDeal(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    Describa brevemente su estructura organizacional
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={3}
                    value={organizationalStructure}
                    onChange={(e) => setOrganizationalStructure(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Divider sx={{ my: 4 }}></Divider>
                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Cuántos inmuebles tiene actualmente en su inventario de oferta?
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={currentInventory || ""}
                    onChange={(e) => setCurrentInventory(Number(e.target.value))}
                    sx={{ mb: 2 }}
                />

                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Ha trabajado anteriormente bajo esquemas de exclusividad?
                </Typography>
                <Stack direction="row" spacing={2} mb={2}>
                    <Button
                        variant="outlined"
                        onClick={() => handleYesNoChange("Sí", setHasExclusivityExperience)}
                        sx={{
                            borderColor: "#131F68",
                            color: "#000000",
                            backgroundColor: hasExclusivityExperience === "Sí" ? "#131F684F" : "transparent",
                            "&:hover": { backgroundColor: "#131F684F" },
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        Sí
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => handleYesNoChange("No", setHasExclusivityExperience, setExclusivityCount)}
                        sx={{
                            borderColor: "#131F68",
                            color: "#000000",
                            backgroundColor: hasExclusivityExperience === "No" ? "#131F684F" : "transparent",
                            "&:hover": { backgroundColor: "#131F684F" },
                            touchAction: 'manipulation',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        No
                    </Button>
                </Stack>

                {hasExclusivityExperience === "Sí" && (
                    <TextField
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={exclusivityCount || ""}
                        onChange={(e) => handleInputChange(setExclusivityCount, Number(e.target.value))}
                        label="En caso afirmativo, ¿con cuántos inmuebles?"
                        sx={{ 
                            mb: 2,
                            touchAction: 'manipulation',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#D0D0D0' },
                                '&:hover fieldset': { borderColor: '#131F68' },
                                '&.Mui-focused fieldset': { borderColor: '#131F68' },
                            }
                        }}
                        InputProps={{ 
                            inputProps: { min: 0 },
                            sx: { WebkitAppearance: 'none' }
                        }}
                        error={hasExclusivityExperience === "Sí" && exclusivityCount === null}
                        helperText={hasExclusivityExperience === "Sí" && exclusivityCount === null ? "Este campo es requerido" : ""}
                    />
                )}

                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Cuántos inmuebles estaría en capacidad de administrar en exclusividad actualmente?
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    type="number"
                    value={exclusivityCapacity || ""}
                    onChange={(e) => setExclusivityCapacity(Number(e.target.value))}
                    sx={{ mb: 2 }}
                />

                <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
                    ¿Qué inversión publicitaria mensual estaría dispuesto a realizar para la promoción de estos inmuebles? (en COP)
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    select
                    value={advertisingInvestment}
                    onChange={(e) => setAdvertisingInvestment(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    {[
                        "$0 - $500.000",
                        "$500.001 - $1.000.000",
                        "$1.000.001 - $1.500.000",
                        "$1.500.001 - $2.000.000",
                        "Más de $2.000.000",
                    ].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </ThemeProvider>
    )
}

export default ExperienceAndFocusBroker