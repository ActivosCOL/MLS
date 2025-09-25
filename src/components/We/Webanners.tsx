"use client";
import { Box, Typography } from "@mui/material";

const Webanners = () => {
    return (
        <Box
            sx={{
                height: "300px",
                width: "100%",
                backgroundImage: "url('/image/banner/banner1.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative", // necesario para el overlay
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.5))",
                    zIndex: 1,
                },
            }}
        >
            <Typography
                variant="h3"
                sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    textShadow: "2px 2px 5px rgba(0,0,0,0.5)",
                    zIndex: 2, // para estar sobre el degradado
                    mt: 10
                }}
            >
                Bienvenido a nuestra plataforma
            </Typography>
        </Box>
    );
};

export default Webanners;
