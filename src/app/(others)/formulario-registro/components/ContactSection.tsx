import { Box, TextField, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Stack, FormHelperText, Select, MenuItem, InputLabel, FormLabel } from '@mui/material';
import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormData } from '../types';

interface ContactSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  personType: "Natural" | "Juridica";
}

export const ContactSection: React.FC<ContactSectionProps> = ({ register, errors, personType }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        padding: 3,
        marginBottom: 3
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>Información de Contacto</Typography>

      <Stack spacing={3}>
        {personType === "Natural" ? (
          <>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Nombre completo</Typography>
              <TextField
                fullWidth
                {...register('personalData.name')}
                error={!!errors.personalData?.name}
                helperText={errors.personalData?.name?.message || " "}
                placeholder="Ingrese su nombre completo"
              />
            </Box>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: errors.personalData?.documentNumber ? 'error.main' : 'inherit' }}>
                Número de documento
              </Typography>
              <TextField
                fullWidth
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                }}
                {...register('personalData.documentNumber')}
                error={!!errors.personalData?.documentNumber}
                helperText={errors.personalData?.documentNumber?.message || " "}
                placeholder="Ingrese su número de documento"
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Número de teléfono</Typography>
              <TextField
                fullWidth
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                }}
                {...register('personalData.legalRepresentativePhone')}
                error={!!errors.personalData?.legalRepresentativePhone}
                helperText={errors.personalData?.legalRepresentativePhone?.message || " "}
                placeholder="Ingrese su número de teléfono"
              />
            </Box>

            <FormControl fullWidth error={!!errors.personalData?.hasWhatsapp}>
              <InputLabel>¿Tiene WhatsApp?</InputLabel>
              <Select
                {...register('personalData.hasWhatsapp')}
                label="¿Tiene WhatsApp?"
                defaultValue="Si"
              >
                <MenuItem value="Si">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
              <FormHelperText error={!!errors.personalData?.hasWhatsapp}>
                {errors.personalData?.hasWhatsapp?.message || " "}
              </FormHelperText>
            </FormControl>


          </>
        ) : (
          <>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: errors.personalData?.nit ? 'error.main' : 'inherit' }}>
                NIT
              </Typography>
              <TextField
                fullWidth
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                }}
                {...register('personalData.nit')}
                error={!!errors.personalData?.nit}
                helperText={errors.personalData?.nit?.message || " "}
                placeholder="Ingrese el NIT"
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: errors.personalData?.name ? 'error.main' : 'inherit' }}>
                Razón social
              </Typography>
              <TextField
                fullWidth
                {...register('personalData.name')}
                error={!!errors.personalData?.name}
                helperText={errors.personalData?.name?.message || " "}
                placeholder="Ingrese la razón social"
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>Teléfono del representante legal</Typography>
              <TextField
                fullWidth
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                }}
                {...register('personalData.legalRepresentativePhone')}
                error={!!errors.personalData?.legalRepresentativePhone}
                helperText={errors.personalData?.legalRepresentativePhone?.message || " "}
                placeholder="Ingrese el teléfono del representante legal"
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: errors.personalData?.commercialContactName ? 'error.main' : 'inherit' }}>
                Nombre del contacto comercial
              </Typography>
              <TextField
                fullWidth
                {...register('personalData.commercialContactName')}
                error={!!errors.personalData?.commercialContactName}
                helperText={errors.personalData?.commercialContactName?.message || " "}
                placeholder="Ingrese el nombre del contacto comercial"
              />
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: errors.personalData?.commercialContactPhone ? 'error.main' : 'inherit' }}>
                Teléfono del contacto comercial
              </Typography>
              <TextField
                fullWidth
                type="text"
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  onKeyPress: (e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                }}
                {...register('personalData.commercialContactPhone')}
                error={!!errors.personalData?.commercialContactPhone}
                helperText={errors.personalData?.commercialContactPhone?.message || " "}
                placeholder="Ingrese el teléfono del contacto comercial"
              />
            </Box>

            <FormControl fullWidth error={!!errors.personalData?.hasWhatsapp}>
              <InputLabel>¿Tiene WhatsApp?</InputLabel>
              <Select
                {...register('personalData.hasWhatsapp')}
                label="¿Tiene WhatsApp?"
                defaultValue="No"
              >
                <MenuItem value="Si">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
              <FormHelperText error={!!errors.personalData?.hasWhatsapp}>
                {errors.personalData?.hasWhatsapp?.message || " "}
              </FormHelperText>
            </FormControl>
          </>
        )}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Ciudad de operación</Typography>
          <TextField
            fullWidth
            {...register('personalData.operationCity')}
            error={!!errors.personalData?.operationCity}
            helperText={errors.personalData?.operationCity?.message || " "}
            placeholder="Ingrese la ciudad de operación"
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Departamento de operación</Typography>
          <TextField
            fullWidth
            {...register('personalData.operationDepartment')}
            error={!!errors.personalData?.operationDepartment}
            helperText={errors.personalData?.operationDepartment?.message || " "}
            placeholder="Ingrese el departamento de operación"
          />
        </Box>



        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Correo electrónico</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                {...register('personalData.emailName')}
                error={!!errors.personalData?.emailName}
                helperText={errors.personalData?.emailName?.message || " "}
                placeholder="nombre"
              />
            </Box>
            <Typography>@</Typography>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                {...register('personalData.domain')}
                error={!!errors.personalData?.domain}
                helperText={errors.personalData?.domain?.message || " "}
                placeholder="dominio"
              />
            </Box>
            <Typography>.</Typography>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                {...register('personalData.extension')}
                error={!!errors.personalData?.extension}
                helperText={errors.personalData?.extension?.message || " "}
                placeholder="com"
              />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}; 