"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Typography, TextField, Stack, Button, ThemeProvider, createTheme } from "@mui/material";

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
  },
});

interface CommercializationFormData {
  hasEquipment: boolean | null;
  hasCRM: boolean | null;
  crmName: string;
  hasPhotography: boolean | null;
  photographyDetails: string;
  hasInstitutionalExperience: boolean | null;
  hasForcedSalesExperience: boolean | null;
  promotionChannels: string[];
  otherPromotionChannel: string;
  digitalChannels: string;
  leadTracking: string[];
  otherLeadTracking: string;
}

interface CommercializationFormProps {
  onDataChange?: (data: CommercializationFormData) => void;
  onValidationChange?: (isValid: boolean, message?: string) => void;
  initialData?: Partial<CommercializationFormData>;
  setTotalQuestions: (total: number) => void;
  setCurrentQuestion: (question: number) => void;
}

const CommercializationForm: React.FC<CommercializationFormProps> = ({ 
  onDataChange, 
  onValidationChange,
  initialData = {},
  setTotalQuestions,
  setCurrentQuestion
}) => {
  const [hasEquipment, setHasEquipment] = useState<boolean | null>(initialData.hasEquipment ?? null);
  const [hasCRM, setHasCRM] = useState<boolean | null>(initialData.hasCRM ?? null);
  const [crmName, setCrmName] = useState<string>(initialData.crmName ?? "");
  const [hasPhotography, setHasPhotography] = useState<boolean | null>(initialData.hasPhotography ?? null);
  const [photographyDetails, setPhotographyDetails] = useState<string>(initialData.photographyDetails ?? "");
  const [hasInstitutionalExperience, setHasInstitutionalExperience] = useState<boolean | null>(initialData.hasInstitutionalExperience ?? null);
  const [hasForcedSalesExperience, setHasForcedSalesExperience] = useState<boolean | null>(initialData.hasForcedSalesExperience ?? null);
  const [promotionChannels, setPromotionChannels] = useState<string[]>(initialData.promotionChannels ?? []);
  const [otherPromotionChannel, setOtherPromotionChannel] = useState<string>(initialData.otherPromotionChannel ?? "");
  const [digitalChannels, setDigitalChannels] = useState<string>(initialData.digitalChannels ?? "");
  const [leadTracking, setLeadTracking] = useState<string[]>(initialData.leadTracking ?? []);
  const [otherLeadTracking, setOtherLeadTracking] = useState<string>(initialData.otherLeadTracking ?? "");

  // Función para manejar cambios en respuestas Sí/No
  const handleYesNoChange = (value: boolean, setter: React.Dispatch<React.SetStateAction<boolean | null>>, dependentSetter?: React.Dispatch<React.SetStateAction<any>>) => {
    setter(value);
    if (value === false && dependentSetter) {
      dependentSetter("");
    }
  };

  // Efecto unificado para manejar cambios de estado y validación
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const formData: CommercializationFormData = {
        hasEquipment,
        hasCRM,
        crmName,
        hasPhotography,
        photographyDetails,
        hasInstitutionalExperience,
        hasForcedSalesExperience,
        promotionChannels,
        otherPromotionChannel,
        digitalChannels,
        leadTracking,
        otherLeadTracking
      };

      if (onDataChange) {
        onDataChange(formData);
      }

      const { isValid, message } = validateForm();
      if (onValidationChange) {
        onValidationChange(isValid, message);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [
    hasEquipment,
    hasCRM,
    crmName,
    hasPhotography,
    photographyDetails,
    hasInstitutionalExperience,
    hasForcedSalesExperience,
    promotionChannels,
    otherPromotionChannel,
    digitalChannels,
    leadTracking,
    otherLeadTracking,
    onDataChange,
    onValidationChange
  ]);

  useEffect(() => {
    setTotalQuestions(9); // Número total de preguntas en este formulario
  }, [setTotalQuestions]);

  useEffect(() => {
    let currentQ = 1;
    
    if (hasEquipment !== null) currentQ++;
    if (promotionChannels.length > 0) currentQ++;
    if (hasCRM !== null) {
      currentQ++;
      if (hasCRM && crmName.trim()) currentQ++;
    }
    if (hasPhotography !== null) {
      currentQ++;
      if (hasPhotography && photographyDetails.trim()) currentQ++;
    }
    if (hasInstitutionalExperience !== null) currentQ++;
    if (hasForcedSalesExperience !== null) currentQ++;
    if (digitalChannels.trim()) currentQ++;
    if (leadTracking.length > 0) currentQ++;
    if (leadTracking.includes("Otros") && otherLeadTracking.trim()) currentQ++;
    
    setCurrentQuestion(currentQ);
  }, [
    hasEquipment,
    promotionChannels,
    hasCRM,
    crmName,
    hasPhotography,
    photographyDetails,
    hasInstitutionalExperience,
    hasForcedSalesExperience,
    digitalChannels,
    leadTracking,
    otherLeadTracking,
    setCurrentQuestion
  ]);

  const handlePromotionChannelChange = (channel: string) => {
    setPromotionChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleOtherPromotionChannelChange = (value: string) => {
    setOtherPromotionChannel(value);
    setPromotionChannels(prev => {
      // Mantener "Otros" en el array
      const hasOthers = prev.includes("Otros");
      const filtered = prev.filter(c => c !== "Otros" && c !== otherPromotionChannel);
      // Si hay un valor, agregarlo al array junto con "Otros"
      return value.trim() ? [...filtered, "Otros", value] : hasOthers ? [...filtered, "Otros"] : filtered;
    });
  };

  const handleLeadTrackingChange = (method: string) => {
    setLeadTracking(prev => 
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleOtherLeadTrackingChange = (value: string) => {
    setOtherLeadTracking(value);
    setLeadTracking(prev => {
      // Mantener "Otros" en el array
      const hasOthers = prev.includes("Otros");
      const filtered = prev.filter(c => c !== "Otros" && c !== otherLeadTracking);
      // Si hay un valor, agregarlo al array junto con "Otros"
      return value.trim() ? [...filtered, "Otros", value] : hasOthers ? [...filtered, "Otros"] : filtered;
    });
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    setter(value);
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (hasEquipment === null) {
      errors.push("Debe indicar si cuenta con equipo para tareas de comercialización");
    }

    if (hasCRM === null) {
      errors.push("Debe indicar si cuenta con CRM");
    }

    if (hasCRM === true && !crmName.trim()) {
      errors.push("Debe especificar el nombre del CRM");
    }

    if (hasPhotography === null) {
      errors.push("Debe indicar si cuenta con fotografía");
    }

    if (hasPhotography === true && !photographyDetails.trim()) {
      errors.push("Debe especificar los detalles de la fotografía");
    }

    if (hasInstitutionalExperience === null) {
      errors.push("Debe indicar si tiene experiencia institucional");
    }

    if (hasForcedSalesExperience === null) {
      errors.push("Debe indicar si tiene experiencia en ventas forzadas");
    }

    if (promotionChannels.length === 0) {
      errors.push("Debe seleccionar al menos un medio de promoción");
    }

    if (promotionChannels.includes("Otros") && !otherPromotionChannel.trim()) {
      errors.push("Debe especificar otros medios de promoción");
    }

    if (!digitalChannels.trim()) {
      errors.push("Debe especificar los canales digitales");
    }

    if (leadTracking.length === 0) {
      errors.push("Debe seleccionar al menos un método de seguimiento de leads");
    }

    if (leadTracking.includes("Otros") && !otherLeadTracking.trim()) {
      errors.push("Debe especificar otros métodos de seguimiento de leads");
    }

    const isValid = errors.length === 0;
    const message = isValid ? "" : errors.join(". ");

    return { isValid, message };
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
        {/* Pregunta 1 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Cuenta con equipo para tareas de comercialización?
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(true, setHasEquipment)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasEquipment ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Sí
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(false, setHasEquipment)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasEquipment === false ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            No
          </Button>
        </Stack>

        {/* Pregunta 2 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Qué medios utiliza o utilizará para la promoción de los activos? (Puede seleccionar varios)
        </Typography>
        <FormGroup sx={{ mb: 2 }}>
          {[
            "Redes sociales",
            "Página web propia",
            "Portales inmobiliarios (Finca Raíz, Metrocuadrado, etc.)",
            "Campañas pagas en Google y/o Meta",
            "Aviso de ventana y/o valla",
            "Gestión de Bases de Datos",
          ].map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox 
                  checked={promotionChannels.includes(option)}
                  onChange={() => handlePromotionChannelChange(option)}
                  sx={{ color: "#131F68", "&.Mui-checked": { color: "#131F68" } }} 
                />
              }
              label={
                <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: "#000000" }}>{option}</Typography>
              }
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox 
                checked={promotionChannels.includes("Otros")}
                onChange={() => handlePromotionChannelChange("Otros")}
                sx={{ color: "#131F68", "&.Mui-checked": { color: "#131F68" } }} 
              />
            }
            label={
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: "#000000" }}>Otros</Typography>
            }
          />
          {promotionChannels.includes("Otros") && (
            <TextField
              fullWidth
              variant="outlined"
              value={otherPromotionChannel}
              onChange={(e) => handleOtherPromotionChannelChange(e.target.value)}
              placeholder="Especifique otros medios de promoción"
              sx={{ mt: 1 }}
            />
          )}
        </FormGroup>

        {/* Pregunta 3 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Cuenta con CRM?
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(true, setHasCRM)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasCRM ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Sí
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              handleYesNoChange(false, setHasCRM);
              setCrmName(""); // Limpiar el campo del nombre del CRM
            }}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasCRM === false ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            No
          </Button>
        </Stack>
        {hasCRM && (
          <TextField
            fullWidth
            variant="outlined"
            value={crmName}
            onChange={(e) => setCrmName(e.target.value)}
            placeholder="Nombre del CRM"
            sx={{ mb: 2 }}
          />
        )}

        {/* Pregunta 4 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Cuenta con fotografía?
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(true, setHasPhotography)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasPhotography ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Sí
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => {
              handleYesNoChange(false, setHasPhotography);
              setPhotographyDetails(""); // Limpiar el campo de detalles de fotografía
            }}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasPhotography === false ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            No
          </Button>
        </Stack>
        {hasPhotography && (
          <TextField
            fullWidth
            variant="outlined"
            value={photographyDetails}
            onChange={(e) => setPhotographyDetails(e.target.value)}
            placeholder="Detalles de la fotografía"
            sx={{ mb: 2 }}
          />
        )}

        {/* Pregunta 5 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Tiene experiencia institucional?
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(true, setHasInstitutionalExperience)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasInstitutionalExperience ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Sí
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(false, setHasInstitutionalExperience)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasInstitutionalExperience === false ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            No
          </Button>
        </Stack>

        {/* Pregunta 6 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Tiene experiencia en ventas forzadas?
        </Typography>
        <Stack direction="row" spacing={2} mb={2}>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(true, setHasForcedSalesExperience)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasForcedSalesExperience ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            Sí
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => handleYesNoChange(false, setHasForcedSalesExperience)}
            sx={{ 
              borderColor: "#131F68", 
              color: "#000000", 
              backgroundColor: hasForcedSalesExperience === false ? "#131F684F" : "transparent",
              "&:hover": { backgroundColor: "#131F684F" },
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            No
          </Button>
        </Stack>

        {/* Pregunta 7 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Qué canales digitales utiliza o utilizará?
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          value={digitalChannels}
          onChange={(e) => handleInputChange(setDigitalChannels, e.target.value)}
          placeholder="Especifique los canales digitales"
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
            sx: { WebkitAppearance: 'none' }
          }}
        />

        {/* Pregunta 8 */}
        <Typography sx={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "16px", color: "#000000", mb: 1 }}>
          ¿Qué métodos utiliza o utilizará para el seguimiento de leads? (Puede seleccionar varios)
        </Typography>
        <FormGroup sx={{ mb: 2 }}>
          {[
            "CRM",
            "Excel",
            "Google Sheets",
            "Sistema propio",
            "WhatsApp Business",
          ].map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox 
                  checked={leadTracking.includes(option)}
                  onChange={() => handleLeadTrackingChange(option)}
                  sx={{ color: "#131F68", "&.Mui-checked": { color: "#131F68" } }} 
                />
              }
              label={
                <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: "#000000" }}>{option}</Typography>
              }
            />
          ))}
          <FormControlLabel
            control={
              <Checkbox 
                checked={leadTracking.includes("Otros")}
                onChange={() => handleLeadTrackingChange("Otros")}
                sx={{ color: "#131F68", "&.Mui-checked": { color: "#131F68" } }} 
              />
            }
            label={
              <Typography sx={{ fontFamily: "Montserrat", fontSize: "14px", color: "#000000" }}>Otros</Typography>
            }
          />
          {leadTracking.includes("Otros") && (
            <TextField
              fullWidth
              variant="outlined"
              value={otherLeadTracking}
              onChange={(e) => handleOtherLeadTrackingChange(e.target.value)}
              placeholder="Especifique otros métodos de seguimiento"
              sx={{ mt: 1 }}
            />
          )}
        </FormGroup>
      </Box>
    </ThemeProvider>
  );
};

export default CommercializationForm;
