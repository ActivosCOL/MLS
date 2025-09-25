'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Link,
  Stack,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import Image from 'next/image';
import { AuthService } from '@/services/AuthService';
import { LoginRequest } from '@/models/Auth';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await AuthService.login(formData);
      router.push('/blog'); // Redirigir al dashboard después del login exitoso
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F4F4F4',
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid #D9D9D9',
          }}
        >
          <Box sx={{ mb: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Link href={"/"}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <Box
                  sx={{
                    width: { xs: 60, md: 100 },
                    height: { xs: 40, md: 40 },
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    transition: "all 0.5s ease-in-out",
                    "& img": {
                      transition: "all 0.5s ease-in-out",
                      transform:  "scale(1)" ,
                    }
                  }}
                >
                  <img
                    src="/image/logo/mls-logo.png"
                    alt="MLS Logo"
                    style={{ width: "100%", height: "70%", objectFit: "contain" }}
                  />
                  <Box
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "1rem", md: "1.9rem" },
                      marginLeft: 1,
                      color: "#333",
                      transition: "all 0.5s ease-in-out",
                      transform:  "scale(1)" ,
                    }}
                  >
                    MLS
                  </Box>
                </Box>
               
                <Box
                  sx={{
                    width: { xs: 100, md: 150 },
                    height: { xs: 30, md: 50 },
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    transition: "all 0.5s ease-in-out",
                    "& img": {
                      transition: "all 0.5s ease-in-out",
                      transform:  "scale(1)",
                    }
                  }}
                >
                  <img
                    src="/image/logo/logo-activos-por-coplombia.webp"
                    alt="Logo"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </Box>
              </Box>
            </Link>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: '#2D4048',
              textAlign: 'center',
              fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
            }}
          >
            Inicia sesión para acceder a tu cuenta
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#D9D9D9',
                  },
                  '&:hover fieldset': {
                    borderColor: '#151555',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#151555',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#151555',
                },
                fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#D9D9D9',
                  },
                  '&:hover fieldset': {
                    borderColor: '#151555',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#151555',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#151555',
                },
                fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                      sx={{ color: '#151555' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ mt: 1, textAlign: 'right' }}>
              <Link
                component={NextLink}
                href="/forgot-password"
                variant="body2"
                sx={{
                  textDecoration: 'none',
                  color: '#2D4048',
                  fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                boxShadow: "none",
                backgroundColor: '#151555',
                color: '#fff',
                height: '48px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: '5px',
                fontFamily: 'Montreal, Arial, Helvetica, sans-serif',
                '&.Mui-disabled': {
                  backgroundColor: '#E0E0E0',
                  color: '#666666'
                }
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Box>
        </Paper>
      </Container>
      {/* Footer de la aplicación */}
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: 'auto',
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid',
          borderColor: '#E0E0E0',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start'
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#2D4048',
                  textAlign: 'left',
                  fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
                }}
              >
                © 2025 Administrador LMS | Versión 1.0.0
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Stack direction="row" spacing={3}>
                <Link
                  component={NextLink}
                  href="https://activosporcolombia.dataprotected.co/"
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: '#2D4048',
                    fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
                    '&:hover': {
                      color: '#2D4048',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Terminos y condiciones
                </Link>
                <Link
                  component={NextLink}
                  href="https://activosporcolombia.dataprotected.co/"
                  variant="body2"
                  sx={{
                    textDecoration: 'none',
                    color: '#2D4048',
                    fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
                    '&:hover': {
                      color: '#2D4048',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Politicas y privacidad
                </Link>
              </Stack>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 1
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#2D4048',
                  fontFamily: 'Satoshi, Arial, Helvetica, sans-serif',
                  py: 3,
                  px: 3,
                }}
              >
                Powered by: Makers Tech
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
