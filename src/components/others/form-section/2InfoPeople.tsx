import React, { useState, SetStateAction, useEffect, useCallback } from "react";
import { Box, Button, Typography, Stack, TextField, MenuItem, ToggleButton } from "@mui/material";
import { colombia } from "@/utils/colombia/colombia";
import LocationSelectors from '@/components/common/LocationSelectors';

interface PersonTypeSelectorProps {
    onSelect?: (type: "Natural" | "Juridica") => void;
    onDataChange?: (data: FormData) => void;
    onValidationChange?: (valid: boolean, message: string) => void;
    initialData?: FormData;
    setTotalQuestions: (total: number) => void;
    setCurrentQuestion: (question: number) => void;
}

interface FormData {
    type: "Natural" | "Juridica" | null;
    // Datos comunes
    selectedDepartments: string[];
    selectedCities: string[];
    hasWhatsapp: string | null;
    emailName: string;
    domain: string;
    customDomain: string;
    extension: string;
    customExtension: string;
    // Datos compartidos entre Natural y Jurídica
    documentNumber?: string; // Usado para cédula y NIT
    name?: string; // Usado para nombre completo y razón social
    // Datos Natural
    phoneNumber?: string;
    // Datos Jurídica
    legalRepresentativeName?: string;
    legalRepresentativePhone?: string;
    commercialContactName?: string;
    commercialContactPhone?: string;
}

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
    fontFamily: 'var(--font-poppins)',
});

const NaturalForm = ({ formData, setFormData, setCurrentQuestion }: { formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>>; setCurrentQuestion: (question: number) => void }) => {
    const handleDepartmentChange = (value: string[]) => {
        setFormData(prev => ({
            ...prev,
            selectedDepartments: value,
            selectedCities: []
        }));
        setCurrentQuestion(3);
    };

    const handleCityChange = (value: string[]) => {
        setFormData(prev => ({ ...prev, selectedCities: value }));
        setCurrentQuestion(4);
    };

    return (
        <Box sx={{ 
            mx: "auto", 
            p: { xs: 1, sm: 2 }, 
            display: "flex", 
            flexDirection: "column", 
            gap: { xs: 2, sm: 4 }, 
            marginX: { xs: 2, sm: 4, md: 10 }, 
            marginTop: { xs: 2, sm: 3 }
        }}>
            <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 2 }
            }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Número de documento
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.documentNumber || ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({ 
                                ...prev, 
                                documentNumber: value,
                                type: "Natural" // Aseguramos que el tipo se mantenga
                            }));
                            setCurrentQuestion(3);
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Nombre completo
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.name || ""}
                        onChange={(e) => {
                            setFormData(prev => ({ 
                                ...prev, 
                                name: e.target.value,
                                type: "Natural" // Aseguramos que el tipo se mantenga
                            }));
                            setCurrentQuestion(4);
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 2 }
            }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Número de teléfono
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.phoneNumber || ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({ ...prev, phoneNumber: value }));
                            setCurrentQuestion(5);
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Box>
                <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 1, sm: 2 }
                }}>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        ¿Tiene WhatsApp?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <ToggleButton
                            value="Si"
                            selected={formData.hasWhatsapp === "Si"}
                            onChange={() => {
                                setFormData(prev => ({ ...prev, hasWhatsapp: "Si" }));
                                setCurrentQuestion(6);
                            }}
                            sx={buttonStyles(formData.hasWhatsapp === "Si")}
                        >
                            Sí
                        </ToggleButton>
                        <ToggleButton
                            value="No"
                            selected={formData.hasWhatsapp === "No"}
                            onChange={() => {
                                setFormData(prev => ({ ...prev, hasWhatsapp: "No" }));
                                setCurrentQuestion(6);
                            }}
                            sx={buttonStyles(formData.hasWhatsapp === "No")}
                        >
                            No
                        </ToggleButton>
                    </Box>
                </Box>
            </Box>

            <LocationSelectors
                selectedDepartments={formData.selectedDepartments}
                selectedCities={formData.selectedCities}
                onDepartmentChange={handleDepartmentChange}
                onCityChange={handleCityChange}
            />
        </Box>
    );
};

const JuridicaForm = ({ formData, setFormData, setCurrentQuestion }: { formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>>; setCurrentQuestion: (question: number) => void }) => {
    const handleDepartmentChange = (value: string[]) => {
        setFormData(prev => ({
            ...prev,
            selectedDepartments: value,
            selectedCities: []
        }));
        setCurrentQuestion(3);
    };

    const handleCityChange = (value: string[]) => {
        setFormData(prev => ({ ...prev, selectedCities: value }));
        setCurrentQuestion(4);
    };

    return (
        <Box sx={{ 
            mx: "auto", 
            p: { xs: 1, sm: 2 }, 
            display: "flex", 
            flexDirection: "column", 
            gap: { xs: 2, sm: 4 }, 
            marginX: { xs: 2, sm: 4, md: 10 }, 
            marginTop: { xs: 2, sm: 3 }
        }}>
            <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                gap: { xs: 2, sm: 2 }
            }}>
                <Box>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        NIT
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.documentNumber || ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({ ...prev, documentNumber: value }));
                            setCurrentQuestion(3);
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Razón social
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.name || ""}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, name: e.target.value }));
                            setCurrentQuestion(4);
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                gap: { xs: 2, sm: 2 }
            }}>
                <Box>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Número de teléfono del Rep. Legal
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        value={formData.legalRepresentativePhone || ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({ ...prev, legalRepresentativePhone: value }));
                            setCurrentQuestion(5);
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Box>
                <Box>
                    <LocationSelectors
                        selectedDepartments={formData.selectedDepartments}
                        selectedCities={formData.selectedCities}
                        onDepartmentChange={handleDepartmentChange}
                        onCityChange={handleCityChange}
                    />
                </Box>
            </Box>

            <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                gap: { xs: 2, sm: 2 }
            }}>
                <Box>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Nombre de contacto comercial
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={formData.commercialContactName || ""}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, commercialContactName: e.target.value }));
                            setCurrentQuestion(5);
                        }}
                    />
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        Teléfono de contacto comercial
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        type="number"
                        value={formData.commercialContactPhone || ""}
                        onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '');
                            setFormData(prev => ({ ...prev, commercialContactPhone: value }));
                            setCurrentQuestion(6);
                        }}
                        inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*'
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ 
                display: "grid", 
                gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr" },
                gap: { xs: 2, sm: 2 }
            }}>
                <Box>
                    <Typography variant="body1" sx={{ 
                        fontWeight: "bold",
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                        ¿Tiene WhatsApp?
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <ToggleButton
                            value="Si"
                            selected={formData.hasWhatsapp === "Si"}
                            onChange={() => {
                                setFormData(prev => ({ ...prev, hasWhatsapp: "Si" }));
                                setCurrentQuestion(6);
                            }}
                            sx={buttonStyles(formData.hasWhatsapp === "Si")}
                        >
                            Sí
                        </ToggleButton>
                        <ToggleButton
                            value="No"
                            selected={formData.hasWhatsapp === "No"}
                            onChange={() => {
                                setFormData(prev => ({ ...prev, hasWhatsapp: "No" }));
                                setCurrentQuestion(6);
                            }}
                            sx={buttonStyles(formData.hasWhatsapp === "No")}
                        >
                            No
                        </ToggleButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

const EmailSelector = ({ formData, setFormData, setCurrentQuestion }: { formData: FormData; setFormData: React.Dispatch<React.SetStateAction<FormData>>; setCurrentQuestion: (question: number) => void }) => {
    const currentDomain = formData.customDomain || formData.domain;
    const currentExtension = formData.customExtension || formData.extension;

    return (
        <Box sx={{ mx: "auto", p: { xs: 1, sm: 2 }, display: "flex", flexDirection: "column", gap: 4, marginX: { xs: 2, sm: 6, md: 10 }, marginTop: 3 }}>
            <Typography variant="body1" fontWeight="bold">Correo electrónicos</Typography>
            <Box sx={{ width: "100%", display: "flex" }}>
                <Box sx={{ width: "900px" }}>
                    <Box sx={{ display: "flex" }}>
                        <TextField
                            value={formData.emailName}
                            onChange={(e) => {
                                setFormData(prev => ({ ...prev, emailName: e.target.value }));
                                setCurrentQuestion(7);
                            }}
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

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
                    gap: { xs: 1, sm: 1 }
                }}>
                    {["gmail", "outlook", "hotmail"].map((option) => (
                        <ToggleButton
                            key={option}
                            value={option}
                            selected={formData.domain === option}
                            onChange={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    domain: option,
                                    customDomain: ""
                                }));
                            }}
                            sx={{
                                ...buttonStyles(formData.domain === option),
                                height: "56px",
                                padding: "0 16px",
                                minWidth: { xs: "auto", sm: "150px" },
                            }}
                        >
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </ToggleButton>
                    ))}
                    <ToggleButton
                        value="otro"
                        selected={formData.domain === ""}
                        onChange={() => {
                            setFormData(prev => ({
                                ...prev,
                                domain: "",
                                customDomain: ""
                            }));
                        }}
                        sx={{
                            ...buttonStyles(formData.domain === ""),
                            height: "56px",
                            padding: "0 16px",
                            minWidth: { xs: "auto", sm: "150px" },
                        }}
                    >
                        Otro
                    </ToggleButton>
                </Box>
                {formData.domain === "" && (
                    <TextField
                        placeholder="ej: miempresa"
                        value={formData.customDomain}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, customDomain: e.target.value }));
                        }}
                        sx={{
                            width: { xs: "100%", sm: "150px" },
                            "& .MuiOutlinedInput-root": {
                                height: "56px",
                                borderRadius: "8px",
                            },
                        }}
                    />
                )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
                    gap: { xs: 1, sm: 1 }
                }}>
                    {["com", "com.co", "co"].map((option) => (
                        <ToggleButton
                            key={option}
                            value={option}
                            selected={formData.extension === option && formData.customExtension === ""}
                            onChange={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    extension: option,
                                    customExtension: ""
                                }));
                            }}
                            sx={{
                                ...buttonStyles(formData.extension === option && formData.customExtension === ""),
                                height: "56px",
                                padding: "0 16px",
                                minWidth: { xs: "auto", sm: "150px" },
                            }}
                        >
                            .{option}
                        </ToggleButton>
                    ))}
                    <ToggleButton
                        value="otro"
                        selected={formData.extension === ""}
                        onChange={() => {
                            setFormData(prev => ({
                                ...prev,
                                extension: "",
                                customExtension: ""
                            }));
                        }}
                        sx={{
                            ...buttonStyles(formData.extension === ""),
                            height: "56px",
                            padding: "0 16px",
                            minWidth: { xs: "auto", sm: "150px" },
                        }}
                    >
                        Otro
                    </ToggleButton>
                </Box>
                {formData.extension === "" && (
                    <TextField
                        placeholder="ej: io, tech, org"
                        value={formData.customExtension}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, customExtension: e.target.value }));
                        }}
                        sx={{
                            width: { xs: "100%", sm: "150px" },
                            "& .MuiOutlinedInput-root": {
                                height: "56px",
                                borderRadius: "8px",
                            },
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

const InfoPeople = ({ onSelect, onDataChange, onValidationChange, initialData, setTotalQuestions, setCurrentQuestion }: PersonTypeSelectorProps) => {
    const [formData, setFormData] = useState<FormData>({
        type: null,
        selectedDepartments: [],
        selectedCities: [],
        hasWhatsapp: null,
        emailName: "",
        domain: "gmail",
        customDomain: "",
        extension: "com",
        customExtension: "",
        documentNumber: "",
        name: "",
        ...initialData
    });

    // Actualizamos el total de preguntas cuando cambia el tipo de persona
    useEffect(() => {
        if (formData.type === "Natural") {
            setTotalQuestions(8); // 8 preguntas para persona natural
        } else if (formData.type === "Juridica") {
            setTotalQuestions(10); // 10 preguntas para persona jurídica
        } else {
            setTotalQuestions(1); // Solo la selección del tipo
        }
    }, [formData.type, setTotalQuestions]);

    const countFilledFields = useCallback(() => {
        let count = 0;

        // Solo contamos el tipo de persona si está seleccionado
        if (formData.type) count++;

        // No contamos los campos vacíos o en su estado inicial
        if (formData.type === "Natural") {
            if (formData.documentNumber && formData.documentNumber.trim() !== "") count++;
            if (formData.name && formData.name.trim() !== "") count++;
            if (formData.phoneNumber && formData.phoneNumber.trim() !== "") count++;
        } else if (formData.type === "Juridica") {
            if (formData.documentNumber && formData.documentNumber.trim() !== "") count++;
            if (formData.name && formData.name.trim() !== "") count++;
            if (formData.legalRepresentativePhone && formData.legalRepresentativePhone.trim() !== "") count++;
            if (formData.commercialContactName && formData.commercialContactName.trim() !== "") count++;
            if (formData.commercialContactPhone && formData.commercialContactPhone.trim() !== "") count++;
        }

        // Campos comunes
        if (formData.selectedDepartments && formData.selectedDepartments.length > 0) count++;
        if (formData.selectedCities && formData.selectedCities.length > 0) count++;
        if (formData.hasWhatsapp !== null && formData.hasWhatsapp !== "") count++;
        if (formData.emailName && formData.emailName.trim() !== "") count++;

        return count;
    }, [formData]);

    // Solo actualizamos el contador cuando cambia el formData, no cuando se selecciona el tipo
    useEffect(() => {
        const filledCount = countFilledFields();
        setCurrentQuestion(filledCount);
    }, [formData, countFilledFields, setCurrentQuestion]);

    const validateForm = useCallback(() => {
        const errors: string[] = [];

        if (!formData.type) {
            errors.push("Debe seleccionar un tipo de persona");
            return { valid: false, message: errors.join(". ") };
        }

        if (!formData.emailName.trim()) {
            errors.push("El nombre de usuario del correo es requerido");
        }

        if (!formData.domain && !formData.customDomain) {
            errors.push("Debe seleccionar un dominio de correo");
        }

        if (!formData.extension && !formData.customExtension) {
            errors.push("Debe seleccionar una extensión de correo");
        }

        if (!formData.selectedDepartments.length) {
            errors.push("Debe seleccionar al menos un departamento");
        }

        if (!formData.selectedCities.length) {
            errors.push("Debe seleccionar al menos una ciudad");
        }

        if (formData.hasWhatsapp === null) {
            errors.push("Debe indicar si tiene WhatsApp");
        }

        if (formData.type === "Natural") {
            if (!formData.documentNumber?.trim()) {
                errors.push("El número de documento es requerido");
            }
            if (!formData.name?.trim()) {
                errors.push("El nombre es requerido");
            }
            if (!formData.phoneNumber?.trim()) {
                errors.push("El número de teléfono es requerido");
            }
        } else if (formData.type === "Juridica") {
            if (!formData.documentNumber?.trim()) {
                errors.push("El NIT es requerido");
            }
            if (!formData.name?.trim()) {
                errors.push("La razón social es requerida");
            }
            if (!formData.legalRepresentativePhone?.trim()) {
                errors.push("El teléfono del representante legal es requerido");
            }
            if (!formData.commercialContactName?.trim()) {
                errors.push("El nombre del contacto comercial es requerido");
            }
            if (!formData.commercialContactPhone?.trim()) {
                errors.push("El teléfono del contacto comercial es requerido");
            }
        }

        const isValid = errors.length === 0;
        const message = isValid ? "" : errors.join(". ");

        if (onValidationChange) {
            onValidationChange(isValid, message);
        }

        return { isValid, message };
    }, [formData, onValidationChange]);

    // Validar el formulario cuando se monta el componente
    useEffect(() => {
        validateForm();
    }, [validateForm]);

    const handleSelect = (type: "Natural" | "Juridica") => {
        const newFormData = { ...formData, type };
        setFormData(newFormData);
        if (onSelect) {
            onSelect(type);
        }
        if (onDataChange) {
            onDataChange(newFormData);
        }
        validateForm();
    };

    const handleFormDataChange = (newData: SetStateAction<FormData>) => {
        if (typeof newData === 'function') {
            setFormData(prev => {
                const updatedData = newData(prev);
                if (onDataChange) {
                    onDataChange(updatedData);
                }
                validateForm();
                return updatedData;
            });
        } else {
            const updatedData = { ...formData, ...newData };
            setFormData(updatedData);
            if (onDataChange) {
                onDataChange(updatedData);
            }
            validateForm();
        }
    };

    return (
        <>
            <Box sx={{ 
               
                mx: "auto", 
                p: { xs: 1, sm: 2 }, 
                marginX: { xs: 2, sm: 4, md: 10 }, 
                marginTop: { xs: 2, sm: 3, md: 5 }
            }}>
                <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    mb: 1,
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                }}>
                    Tipo de persona
                </Typography>
                <Typography variant="h6" sx={{ 
                    color: "#A7A7A7", 
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
                }}>
                    Seleccione una opción
                </Typography>
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={{ xs: 2, sm: 4 }} 
                    justifyContent="start"
                    alignItems={{ xs: 'stretch', sm: 'center' }}
                >
                    <Button
                        onClick={() => handleSelect("Natural")}
                        variant="outlined"
                        sx={{
                            borderRadius: "12px",
                            border: formData.type === "Natural" ? "2px solid #3C3B6E" : "2px solid #3C3B6E",
                            backgroundColor: formData.type === "Natural" ? "#C5C5DE" : "transparent",
                            color: formData.type === "Natural" ? "#000000" : "#000000",
                            fontWeight: "700",
                            fontSize: { xs: '18px', sm: '20px', md: '24px' },
                            width: { xs: '100%', sm: '300px', md: '350px' },
                            height: { xs: '72px', sm: '84px', md: '96px' },
                            "&:hover": {
                                backgroundColor: formData.type === "Natural" ? "#C5C5DE" : "rgba(0,0,0,0.04)",
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
                            border: formData.type === "Juridica" ? "2px solid #3C3B6E" : "2px solid #3C3B6E",
                            backgroundColor: formData.type === "Juridica" ? "#C5C5DE" : "transparent",
                            color: formData.type === "Juridica" ? "#000000" : "#000000",
                            fontWeight: "700",
                            fontSize: { xs: '18px', sm: '20px', md: '24px' },
                            width: { xs: '100%', sm: '300px', md: '350px' },
                            height: { xs: '72px', sm: '84px', md: '96px' },
                            "&:hover": {
                                backgroundColor: formData.type === "Juridica" ? "#C5C5DE" : "rgba(0,0,0,0.04)",
                            },
                        }}
                    >
                        Juridica
                    </Button>
                </Stack>
            </Box>

            {formData.type === "Natural" && <NaturalForm formData={formData} setFormData={handleFormDataChange} setCurrentQuestion={setCurrentQuestion} />}
            {formData.type === "Juridica" && <JuridicaForm formData={formData} setFormData={handleFormDataChange} setCurrentQuestion={setCurrentQuestion} />}
            {formData.type && <EmailSelector formData={formData} setFormData={handleFormDataChange} setCurrentQuestion={setCurrentQuestion} />}
        </>
    );
};

export default InfoPeople;