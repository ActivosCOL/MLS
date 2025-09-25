"use client";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { values } from "./Values";
import { motion } from "framer-motion";

const WeValues = () => {
    return (
        <Box
            sx={{
                px: { xs: 4, md: 40 },
                backgroundColor: "#fff",
                textAlign: "center",
                mb: 10,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: { xs: 4, md: 8 },
                }}
            >
                {values.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.25,
                            ease: "easeOut",
                        }}
                        style={{ display: 'flex', flex: '1 1 220px', maxWidth: 300 }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 300,
                                flex: '1 1 220px',
                                "&:hover .image-icon": {
                                    transform: "scale(1.15)",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    mb: 2,
                                    display: "flex",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    transition: "transform 0.3s ease-in-out",
                                }}
                            >
                                <Box
                                    className="image-icon"
                                    sx={{
                                        transition: "transform 0.3s ease-in-out",
                                    }}
                                >
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={48}
                                        height={48}
                                    />
                                </Box>
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#1b1b1b",
                                    mb: 1,
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "#555",
                                    lineHeight: 1.7,
                                    fontSize: "0.95rem",
                                }}
                            >
                                {item.description}
                            </Typography>
                        </Box>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
};

export default WeValues;
