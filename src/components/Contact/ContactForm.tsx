import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Container,
  useTheme,
  CircularProgress,
  Alert,
  Snackbar,
  Link,
} from '@mui/material';
import axios, { AxiosError } from 'axios';

const API_URL = 'https://directusactivosporcolombia.makerstech.co/items/contact_form';

interface IFormInputs {
  name: string;
  email: string;
  phone: string;
  city: string;
  real_state: string;
  message: string;
  policy: boolean;
}

interface DirectusResponseError {
  errors?: { message: string }[];
}

const ContactForm: React.FC = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      real_state: '',
      message: '',
      policy: false,
    }
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    setShowSuccess(false);
    setShowError(false);

    try {
      await axios.post(API_URL, {
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        real_state: data.real_state,
        message: data.message,
        data_consent: data.policy,
        type: 2,
      });

      setShowSuccess(true);
      reset();
    } catch (err) {
      const error = err as AxiosError<DirectusResponseError>;
      const message = error.response?.data?.errors?.[0]?.message || 'Error al enviar el formulario';
      setErrorMessage(message);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.brand.lightGray,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Box id="contact-form">
            <Typography
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
              sx={{ color: theme.palette.brand.primary }}
            >
              Envíanos un mensaje
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ mb: 4, color: theme.palette.text.secondary, fontWeight: 400 }}
            >
              Diligencia el siguiente formulario con tus datos y comentarios. Uno de nuestros asesores se
              comunicará lo más pronto posible para brindarte información según sus requerimientos.
            </Typography>

            <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' } }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Nombre"
                    variant="outlined"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.brand.primary,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.brand.primary,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email"
                    variant="outlined"
                    type="email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.brand.primary,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.brand.primary,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Teléfono"
                    variant="outlined"
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.brand.primary,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.brand.primary,
                      },
                    }}
                  />
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: 'Este campo es requerido' }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Ciudad"
                    variant="outlined"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.brand.primary,
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: theme.palette.brand.primary,
                      },
                    }}
                  />
                )}
              />
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Controller
                  name="real_state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Inmobiliaria"
                      variant="outlined"
                      error={!!errors.real_state}
                      helperText={errors.real_state?.message}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.brand.primary,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.brand.primary,
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ gridColumn: '1 / -1' }}>
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: 'Este campo es requerido' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Mensaje"
                      variant="outlined"
                      multiline
                      rows={4}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.brand.primary,
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                          color: theme.palette.brand.primary,
                        },
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ gridColumn: '1 / -1', mt: 1 }}>
                <Controller
                  name="policy"
                  control={control}
                  rules={{ required: 'Debes aceptar las políticas de tratamiento de datos' }}
                  render={({ field }) => (
                    <FormControlLabel
                      sx={{
                        margin: 0,
                        alignItems: 'center',
                        '& .MuiCheckbox-root': {
                          padding: '0 9px',
                        },
                      }}
                      control={
                        <Checkbox
                          {...field}
                          sx={{
                            color: theme.palette.brand.primary,
                            '&.Mui-checked': {
                              color: theme.palette.brand.primary,
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          sx={{ color: theme.palette.text.secondary, ml: 0.5 }}
                        >
                          Acepto{' '}
                          <Link
                            href="https://activosporcolombia.dataprotected.co/"
                            sx={{
                              color: 'inherit',
                              textDecoration: 'none',
                              '&:hover': {
                                textDecoration: 'underline'
                              }
                            }}
                          >
                            políticas de tratamiento
                          </Link>
                          {' '}de datos detalladas *
                        </Typography>
                      }
                    />
                  )}
                />
                {errors.policy && (
                  <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: 1 }}>
                    {errors.policy.message}
                  </Typography>
                )}
              </Box>
              <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    backgroundColor: theme.palette.brand.primary,
                    '&:hover': {
                      backgroundColor: theme.palette.brand.secondary,
                    },
                    px: 4,
                    py: 1,
                    minWidth: 120,
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Enviar'
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
          ¡Formulario enviado exitosamente!
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactForm;