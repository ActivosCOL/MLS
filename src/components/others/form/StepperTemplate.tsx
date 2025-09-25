"use client";

import React, { useState } from "react";
import { Box, IconButton, Typography, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert, Snackbar } from "@mui/material";

// Nuevo componente con props
interface StepperTemplateProps {
    totalSteps: number;
    currentStep: number;
    dynamicComponent?: React.ReactNode;
    onNext: () => void;
    onPrevious: () => void;
    onFinish?: () => void;
    isValid?: boolean;
    validationMessage?: string;
    totalQuestions?: number;
    currentQuestion?: number;
    formData?: any;
}

const StepperTemplate: React.FC<StepperTemplateProps> = ({ 
    totalSteps, 
    currentStep, 
    dynamicComponent, 
    onNext, 
    onPrevious, 
    onFinish, 
    isValid = true,
    validationMessage = "Por favor complete todos los campos requeridos",
    totalQuestions = 0,
    currentQuestion = 0,
    formData
}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [showValidationAlert, setShowValidationAlert] = useState(false);

    const handleShowJson = () => {
        const formattedData = {
            reason_code: "REG-1745476777611692881",
            data: {
                nombre_completo_razon_social: formData.personalData?.name,
                tipo_persona: formData.personalData?.type === "Juridica" ? "Persona Jurídica" : "Persona Natural",
                nit_cedula: formData.personalData?.documentNumber,
                representante_legal: formData.personalData?.legalRepresentativeName,
                telefono_representante_legal: formData.personalData?.legalRepresentativePhone,
                departamentos_operacion: formData.personalData?.selectedDepartments?.join(", "),
                ciudades_operacion: formData.personalData?.selectedCities?.join(", "),
                telefono_contacto: formData.personalData?.phoneNumber,
                tiene_whatsapp: formData.personalData?.hasWhatsapp === "Si",
                persona_contacto_comercial: formData.personalData?.commercialContactName,
                telefono_contacto_comercial: formData.personalData?.commercialContactPhone,
                correo_electronico: `${formData.personalData?.emailName}@${formData.personalData?.customDomain || formData.personalData?.domain}.${formData.personalData?.customExtension || formData.personalData?.extension}`,
                
                anios_experiencia: formData.experience?.yearsInBusiness || formData.experience?.otherYears,
                anios_experiencia_type: formData.experience?.seniority || "año(s)",
                nicho_mercado: formData.experience?.propertyTypes?.join(", "),
                tipo_inmuebles: formData.experience?.propertyTypes?.join(", "),
                tipo_uso: formData.experience?.propertyUses?.join(", "),
                estrato_inmuebles: formData.experience?.propertyStratum?.join(", "),
                ubicacion_inmuebles: formData.experience?.propertyLocation?.join(", "),
                gestion_inmuebles: formData.experience?.managementType?.join(", "),
                
                registrado_asociacion: (formData.experience?.registeredAssociation?.length ?? 0) > 0,
                nombre_asociacion: formData.experience?.registeredAssociation?.join(", "),
                licencia_agente: formData.experience?.hasLicense === "Sí",
                mayor_operacion: formData.experience?.biggestDeal,
                estructura_organizacional: formData.experience?.organizationalStructure,
                inmuebles_en_inventario: formData.experience?.currentInventory,
                experiencia_exclusividad: formData.experience?.hasExclusivityExperience === "Sí",
                inmuebles_exclusividad: formData.experience?.exclusivityCount ?? 0,
                capacidad_administrar_exclusivos: formData.experience?.exclusivityCapacity?.toString(),
                inversion_publicitaria: formData.experience?.advertisingInvestment,
                
                equipo_comercializacion: formData.commercialization?.hasEquipment,
                medios_promocion: formData.commercialization?.promotionChannels?.join(", "),
                enlaces_digitales: formData.commercialization?.digitalChannels,
                uso_crm: formData.commercialization?.hasCRM,
                nombre_crm: formData.commercialization?.crmName,
                seguimiento_leads: formData.commercialization?.leadTracking?.join(", "),
                fotografia_profesional: formData.commercialization?.hasPhotography,
                detalle_fotografia: formData.commercialization?.photographyDetails,
                experiencia_institucional: formData.commercialization?.hasInstitutionalExperience,
                experiencia_ventas_forzadas: formData.commercialization?.hasForcedSalesExperience,
                autorizacion_datos: formData.authorization?.isAuthorized,
                comentarios_adicionales: ""
            }
        };
        console.log('JSON formateado para envío:', JSON.stringify(formattedData, null, 2));
    };

    const handleFinish = () => {
        if (isValid) {
            setOpenDialog(true);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmFinish = () => {
        if (onFinish) {
            onFinish();
        }
        handleCloseDialog();
    };

    const handleNext = () => {
        if (isValid) {
            onNext();
        } else {
            setShowValidationAlert(true);
        }
    };

    const handleCloseAlert = () => {
        setShowValidationAlert(false);
    };

    const renderStep = (step: number) => {
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
            <IconButton
                key={step}
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: `1px solid ${isCompleted ? "#C67F08" : isCurrent ? "#FFFFFF" : "#FFFFFF"}`,
                    backgroundColor: isCompleted
                        ? "#EDB740"
                        : isCurrent
                            ? "#FFFFFF"
                            : "transparent",
                    color: isCompleted
                        ? "#C67F08"
                        : isCurrent
                            ? "#000000"
                            : "#FFFFFF",
                    transition: "all 0.3s ease",
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 700,
                        color: isCompleted
                            ? "#C67F08"
                            : isCurrent
                                ? "#000000"
                                : "#FFFFFF",
                    }}
                >
                    {step}
                </Typography>
            </IconButton>
        );
    };

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#131F68",
                    borderRadius: "12px",
                    p: { xs: 1, sm: 2 },
                    mx: { xs: 2, sm: 4, md: 8, lg: 15 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none"
                }}
            >
                <Stack 
                    direction="row" 
                    alignItems="center" 
                    justifyContent={{ xs: "flex-start", sm: "space-between" }}
                    spacing={{ xs: 1, sm: 2 }}
                    sx={{ 
                        width: '100%',
                        px: { xs: 1, sm: 2 },
                        minWidth: { xs: `${totalSteps * 60}px`, sm: "auto" }
                    }}
                >
                    {[...Array(totalSteps)].map((_, index) => renderStep(index + 1))}
                    {totalSteps > 7 && (
                        <Typography sx={{ color: "#FFFFFF", display: { xs: "none", sm: "block" } }}>...</Typography>
                    )}
                </Stack>
            </Box>
            <Box 
                sx={{ 
                    mx: { xs: 2, sm: 6, md: 12 }, 
                    py: 0,
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    transition: 'all 0.3s ease',
                    opacity: 1,
                    transform: 'translateY(0)',
                }}
            >
                {dynamicComponent}
            </Box>
            <Box
                sx={{
                    backgroundColor: "#F5F5F5",
                    borderRadius: "12px",
                    mt: 2,
                    p: { xs: 1.5, sm: 2 },
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-between",
                    alignItems: { xs: "stretch", sm: "center" },
                    gap: { xs: 2, sm: 0 },
                    px: { xs: 2, sm: 4, md: 8, lg: 15 },
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 1000,
                }}
            >
                <Box sx={{ width: "100%" }}>
                    <Typography
                        sx={{
                            fontFamily: "Montserrat",
                            fontWeight: 500,
                            fontSize: { xs: "14px", sm: "16px" },
                            color: "#000000",
                            mb: { xs: 0.5, sm: 1 },
                        }}
                    >
                        {totalQuestions > 0 ? `Pregunta ${currentQuestion} de ${totalQuestions}` : `Paso ${currentStep} de ${totalSteps}`}
                    </Typography>
                    <Box
                        sx={{
                            height: 8,
                            width: "100%",
                            backgroundColor: "#DADADA",
                            borderRadius: "4px",
                            overflow: "hidden",
                        }}
                    >
                        <Box
                            sx={{
                                height: "100%",
                                width: `${totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : (currentStep / totalSteps) * 100}%`,
                                backgroundColor: "#131F68",
                                transition: "width 0.3s ease",
                            }}
                        />
                    </Box>
                </Box>

                <Stack 
                    direction="row" 
                    spacing={2} 
                    sx={{ 
                        ml: { xs: 0, sm: 4 },
                        width: { xs: "100%", sm: "auto" },
                        justifyContent: { xs: "space-between", sm: "flex-end" }
                    }}
                >
                    <IconButton
                        onClick={onPrevious}
                        disabled={currentStep === 1}
                        sx={{
                            border: "2px solid #131F68",
                            color: "#000000",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            px: { xs: 2, sm: 4 },
                            py: 1,
                            opacity: currentStep === 1 ? 0.5 : 1,
                            width: { xs: "48%", sm: "auto" },
                        }}
                    >
                        Anterior
                    </IconButton>
                    {/* <IconButton
                        onClick={handleShowJson}
                        sx={{
                            border: "2px solid #131F68",
                            color: "#000000",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "12px",
                            px: { xs: 2, sm: 4 },
                            py: 1,
                            width: { xs: "48%", sm: "auto" },
                        }}
                    >
                        Ver JSON
                    </IconButton> */}
                    {currentStep === totalSteps ? (
                        <IconButton
                            onClick={handleFinish}
                            disabled={!isValid}
                            sx={{
                                backgroundColor: isValid ? "#131F68" : "#CCCCCC",
                                color: "#FFFFFF",
                                borderRadius: "12px",
                                px: { xs: 2, sm: 4 },
                                py: 1,
                                width: { xs: "48%", sm: "auto" },
                                "&:hover": {
                                    backgroundColor: isValid ? "#131F68" : "#CCCCCC",
                                },
                            }}
                        >
                            Finalizar
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={handleNext}
                            sx={{
                                backgroundColor: "#131F68",
                                color: "#FFFFFF",
                                borderRadius: "12px",
                                px: { xs: 2, sm: 4 },
                                py: 1,
                                width: { xs: "48%", sm: "auto" },
                                "&:hover": {
                                    backgroundColor: "#131F68",
                                },
                            }}
                        >
                            Siguiente
                        </IconButton>
                    )}
                </Stack>
            </Box>

            <Snackbar
                open={showValidationAlert}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseAlert} 
                    severity="error" 
                    sx={{ 
                        width: '100%',
                        backgroundColor: '#FFEBEE',
                        color: '#D32F2F',
                        '& .MuiAlert-icon': {
                            color: '#D32F2F'
                        }
                    }}
                >
                    {validationMessage}
                </Alert>
            </Snackbar>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        padding: "20px",
                    }
                }}
            >
                <DialogTitle sx={{ fontFamily: "Montserrat", fontWeight: 700, color: "#131F68" }}>
                    ¿Deseas finalizar el formulario?
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontFamily: "Montserrat", color: "#000000" }}>
                        Al finalizar, podrás reiniciar el formulario desde el principio.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialog}
                        sx={{
                            color: "#131F68",
                            borderColor: "#131F68",
                            "&:hover": {
                                borderColor: "#131F68",
                            }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirmFinish}
                        sx={{
                            backgroundColor: "#131F68",
                            color: "#FFFFFF",
                            "&:hover": {
                                backgroundColor: "#131F68",
                            }
                        }}
                    >
                        Finalizar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default StepperTemplate;
