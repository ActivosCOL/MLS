"use client";
import { Box, Typography, Container, Link } from "@mui/material";
import Image from "next/image";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#151555",
        color: "#fff",
        padding: { xs: "40px 20px", md: "60px 0" },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 4, md: 0 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Image
              src="/image/logo/loco-activo-por-colombia-blanco.webp"
              alt="Logo Activos por Colombia"
              width={200}
              height={70}
              style={{
                maxHeight: 70,
                width: "auto",
                height: "auto"
              }}
            />

          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                mb: 2,
                fontSize: '1.1rem',
                letterSpacing: '0.5px'
              }}
            >
              Conectamos oportunidades inmobiliarias en toda Colombia
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Link href="/login" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                  Inició de sesión
                </Typography>
              </Link>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                WhatsApp: <Link href="https://wa.me/+573116767447" target="_blank" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}> +57 (311) 676 74 47</Link>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                Email: <Link href="mailto:info@activosporcolombia.com" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>info@activosporcolombia.com</Link>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                Dirección: <Link href="https://maps.app.goo.gl/9SsZxqY9Mf1RFfAv8" target="_blank" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>CRA 53 64-98 LOCAL 1 B/quilla</Link>
              </Typography>
              <Link href="https://activosporcolombia.dataprotected.co/" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                  Terminos y condiciones
                </Typography>
              </Link>
              <Link href="https://activosporcolombia.dataprotected.co/" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Politicas y privacidad
                </Typography>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "30%" },
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Image
                src="/image/logo/mls-logo.png"
                alt="MLS Logo"
                width={100}
                height={40}
                style={{ width: "auto", height: "40px", objectFit: "contain" }}
              />
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1.8rem",
                  color: "#fff",
                }}
              >
                MLS
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            mt: 4,
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7, mb: { xs: 2, md: 0 } }}>
            © 2025 Activos Por Colombia
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              Desarrollado por
            </Typography>
            <Link target="_blank" href="https://makerstech.co/">
              <Image
                src="/makers.webp"
                alt="Logo Makers"
                width={100}
                height={25}
                style={{
                  height: 25,
                  opacity: 0.8,
                  transition: 'opacity 0.2s ease-in-out'
                }}
              />
            </Link>
          </Box>
        </Box>
      </Container>

      <FloatingWhatsAppButton />
    </Box>
  );
}
