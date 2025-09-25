"use client";

import React from "react";
import { Container } from "@mui/material";

interface ContainerComponentProps {
    children: React.ReactNode;
}

export default function ContainerComponent({ children }: ContainerComponentProps) {
    return (
        <Container
            maxWidth={false}
            sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: "1920px" }, // para pantallas pequeñas ocupa 100%, para md y superiores hasta 1920px
                margin: "0 auto",
                padding: { xs: 0, md: 0 }, // ajusta el padding según el tamaño
            }}
        >
            {children}
        </Container>
    );
}
