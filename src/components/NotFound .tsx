"use client";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

import React from "react";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "#0A0F4F",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 6,
          color: "white",
        }}
      >
        {/* Logo MLS */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "self-start",
            flexDirection: "column",
          }}
        >
          {/* Logo 1 */}
          <Box
            sx={{
              width: { xs: 150, md: 250 },
              height: { xs: 70, md: 100 },
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={"/image/logo/Logo_Horizontal (1 tinta blanco).png"}
              alt="Logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Logo 2 con texto MLS */}
          <Box
            sx={{
              width: { xs: 80, md: 200 },
              height: { xs: 60, md: 90 },
              display: "flex",
              alignItems: "center",
              position: "relative",
              flexDirection: "row",
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
                fontSize: { xs: "1.7rem", md: "1.9rem" },
                marginLeft: 1,
              }}
            >
              MLS
            </Box>
          </Box>
        </Box>

        {/* Mensaje 404 */}
        <Box textAlign={{ xs: "center", md: "left" }}>
          <Typography variant="h1" fontWeight="bold" sx={{ fontSize: "5rem" }}>
            404
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            ¡Lo sentimos!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            La página que estás buscando no fue encontrada.
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => router.back()}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default NotFound;
