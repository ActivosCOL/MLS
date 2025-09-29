"use client";
import { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Paper,
    IconButton,
    useTheme,
    useMediaQuery,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Download as DownloadIcon,
    ZoomIn as ZoomInIcon,
    ZoomOut as ZoomOutIcon,
    Fullscreen as FullscreenIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import PrincipalLayout from "@/components/layout/PrincipalLayout";

export default function TerminosCondicionesPage() {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [scale, setScale] = useState(1);

    // Ruta del PDF - archivo específico de términos y condiciones
    const pdfPath = "/pdf/Terminos_Condiciones_Red_Brokers.pdf";

    useEffect(() => {
        // Verificar si el PDF existe
        const checkPdfExists = async () => {
            try {
                const response = await fetch(pdfPath);
                if (!response.ok) {
                    setError("El archivo PDF no se encontró. Por favor, verifica que el archivo esté en la carpeta public.");
                }
            } catch (err) {
                setError("Error al cargar el archivo PDF.");
            } finally {
                setLoading(false);
            }
        };

        checkPdfExists();
    }, [pdfPath]);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = pdfPath;
        link.download = 'Terminos_Condiciones_Red_Brokers.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleFullscreen = () => {
        const iframe = document.getElementById('pdf-viewer') as HTMLIFrameElement;
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        }
    };

    if (loading) {
        return (
            <PrincipalLayout>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '50vh',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <CircularProgress size={60} />
                    <Typography variant="h6">Cargando documento...</Typography>
                </Box>
            </PrincipalLayout>
        );
    }

    if (error) {
        return (
            <PrincipalLayout>
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Términos y Condiciones
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            El documento no está disponible en este momento.
                        </Typography>
                    </Box>
                </Container>
            </PrincipalLayout>
        );
    }

    return (
        <PrincipalLayout>
            <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
                {/* Header simplificado */}
                <Paper
                    elevation={2}
                    sx={{
                        backgroundColor: '#fff',
                        borderBottom: '1px solid #e0e0e0'
                    }}
                >
                    <Container maxWidth="lg">
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                py: 2,
                                gap: 2
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <IconButton
                                    onClick={() => router.back()}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                        }
                                    }}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography variant="h5" fontWeight="bold">
                                    Términos y Condiciones
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <IconButton
                                    onClick={handleDownload}
                                    title="Descargar PDF"
                                    sx={{
                                        backgroundColor: theme.palette.secondary.main,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.dark,
                                        }
                                    }}
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Container>
                </Paper>

                {/* Título Principal */}
                <Container maxWidth="lg" sx={{ py: 3 }}>
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography 
                            variant="h3" 
                            fontWeight="bold" 
                            sx={{ color: '#193255' }}
                            gutterBottom
                        >
                            Términos y Condiciones
                        </Typography>
                        <Typography 
                            variant="h6" 
                            color="text.secondary"
                            sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
                        >
                            Documento oficial de términos y condiciones de la Red de Brokers
                        </Typography>
                    </Box>
                </Container>

                {/* PDF Viewer */}
                <Container maxWidth="lg" sx={{ pb: 3 }}>
                    <Paper
                        elevation={3}
                        sx={{
                            overflow: 'hidden',
                            borderRadius: 2,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: isMobile ? '75vh' : '85vh',
                                backgroundColor: '#f8f9fa'
                            }}
                        >
                            <iframe
                                id="pdf-viewer"
                                src={`${pdfPath}#toolbar=1&navpanes=1&scrollbar=1&view=FitH&zoom=100`}
                                width="100%"
                                height="100%"
                                style={{
                                    border: 'none'
                                }}
                                title="Términos y Condiciones PDF"
                            />
                        </Box>
                    </Paper>

                    {/* Información adicional */}
                    <Box sx={{ mt: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Si tienes problemas para visualizar el documento, puedes{' '}
                            <a
                                href={pdfPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: theme.palette.primary.main,
                                    textDecoration: 'none'
                                }}
                            >
                                abrirlo en una nueva pestaña
                            </a>
                            {' '}o descargarlo directamente.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </PrincipalLayout>
    );
}
