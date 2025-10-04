"use client";
import { Box, Typography, Modal } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useState } from "react";

const videoEmbedUrl = "https://www.youtube.com/embed/bzwmFgbvPXk";

const WeVideo = () => {
    const [open, setOpen] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                px: { xs: 4, md: 30 },
                py: { xs: 4, md: 8 },
            }}
        >
            <Box
                sx={{
                    width: { xs: "100%", md: "40%" },
                    height: { xs: 200, md: 360 },
                    backgroundColor: "#000",
                    position: "relative",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                }}
                onClick={() => setOpen(true)}
            >
                <Box
                    sx={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        background: "rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <PlayCircleIcon sx={{ fontSize: 80, color: "#fff" }} />
                </Box>
                <Box
                    component="img"
                    src="/banner-image.jpg"
                    alt="Vista previa video"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Box>

            <Box sx={{ width: { xs: "100%", md: "50%" }, textAlign: "center" }}>
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 500,
                        fontSize: {
                            xs: "1.4rem", 
                            sm: "1.6rem",  
                            md: "1.8rem",    
                            lg: "2rem",  
                            xl: "2.2rem"  
                        },
                        color: "#193255",
                    }}
                >
                    Más que un MLS, somos la fuerza que transforma el corretaje inmobiliario en Colombia.
                </Typography>
            </Box>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: { xs: "90%", md: "70%" },
                        height: { xs: "50%", md: "70%" },
                        bgcolor: "black",
                        boxShadow: 24,
                        outline: "none",
                    }}
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src={`${videoEmbedUrl}?autoplay=1`}
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: "none" }}
                    />
                </Box>
            </Modal>
        </Box>
    );
};

export default WeVideo;
