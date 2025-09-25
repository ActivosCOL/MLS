"use client";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "../../theme";
import { useEffect, useState } from "react";

import Footer from "../Footer";
import Navbar from "../Navbar";

import ContainerComponent from "../container/ContainerComponent";

export default function PrincipalLayout({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main>
                <ContainerComponent>{children}</ContainerComponent>
            </main>
            <footer>
                <Footer />
            </footer>
        </ThemeProvider>
    );
}
