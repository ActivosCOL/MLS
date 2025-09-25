"use client";

import React, { useState, useEffect } from "react";
import { Box, Checkbox, FormControlLabel, Typography, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  components: {
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

interface DataAuthorizationProps {
  onDataChange?: (data: { isAuthorized: boolean }) => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: {
    isAuthorized?: boolean;
  };
  setTotalQuestions: (total: number) => void;
  setCurrentQuestion: (question: number) => void;
}

const DataAuthorization: React.FC<DataAuthorizationProps> = ({ 
  onDataChange, 
  onValidationChange,
  initialData = {},
  setTotalQuestions,
  setCurrentQuestion
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(initialData.isAuthorized ?? false);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  // Efecto unificado para manejar cambios de estado y validación
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (onDataChange) {
        onDataChange({ isAuthorized });
      }
      if (onValidationChange) {
        onValidationChange(isAuthorized);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isAuthorized, onDataChange, onValidationChange]);

  useEffect(() => {
    setTotalQuestions(1);
  }, [setTotalQuestions]);

  useEffect(() => {
    setCurrentQuestion(isAuthorized ? 1 : 0);
  }, [isAuthorized, setCurrentQuestion]);

  const handleAuthorizationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    const newValue = event.target.checked;
    setIsAuthorized(newValue);
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
        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            fontSize: "18px",
            color: "#000000",
            mb: 2,
          }}
        >
          Autorización de tratamiento de datos personales y consulta en bases reguladas
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 600,
            fontSize: "16px",
            color: "#000000",
            mb: 2,
          }}
        >
          Autorización para el tratamiento de datos personales y verificación en listas restrictivas
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: "14px",
            color: "#000000",
            mb: 2,
          }}
        >
          Declaro que he sido informado(a) de que:
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: "14px",
            color: "#000000",
            mb: 1,
          }}
        >
          Los datos personales recolectados a través del presente formulario serán tratados conforme a lo dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013, y demás normas concordantes sobre protección de datos personales en Colombia.
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: "14px",
            color: "#000000",
            mb: 1,
          }}
        >
          El tratamiento de datos será realizado por Activos por Colombia S.A.S., con la finalidad de evaluar mi idoneidad para participar en el proyecto de comercialización de activos.
        </Typography>

        <Typography
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: "14px",
            color: "#000000",
            mb: 2,
          }}
        >
          Autorizo expresamente a Activos por Colombia a consultar mis datos en listas de prevención de lavado de activos y financiación del terrorismo, tales como SAGRILAFT y SARLAFT, así como otras bases de datos públicas o privadas que permitan verificar antecedentes comerciales, contractuales o legales necesarios para la vinculación.
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={isAuthorized}
              onChange={handleAuthorizationChange}
              sx={{
                color: "#131F68",
                "&.Mui-checked": {
                  color: "#131F68",
                },
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: "14px",
                color: isTouched && !isAuthorized ? "#d32f2f" : "#000000",
              }}
            >
              Acepto el tratamiento de mis datos personales y la verificación en listas restrictivas mencionadas anteriormente.
            </Typography>
          }
        />
      </Box>
    </ThemeProvider>
  );
};

export default DataAuthorization;
