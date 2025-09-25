'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Avatar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import ImageIcon from '@mui/icons-material/Image';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface Aplicacion {
    id: number;
    title: string;
    description: string;
    image: string;
    category: {
        name: string;
    };
    author: {
        name: string;
    };
    published_at: string;
}

interface AplicacionesCardProps {
    aplicacion: Aplicacion;
    layout: "grid" | "single";
}

const PLACEHOLDER_IMAGE = "/images/placeholder_blog.png";

const AplicacionesCard: React.FC<AplicacionesCardProps> = ({
    aplicacion,
    layout,
}) => {
    const router = useRouter();
    const [imageError, setImageError] = useState<boolean>(false);

    const showPlaceholder = imageError || !aplicacion.image;

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: layout === "single" ? 300 : 460,
                display: "flex",
                flexDirection: layout === "single" ? "row" : "column",
                bgcolor: "#fff",
                overflow: "hidden",
                p: 2,
            }}
        >
            <Box
                sx={{
                    width: layout === "single" ? "40%" : "100%",
                    height: layout === "single" ? "100%" : 180,
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: showPlaceholder ? '#f0f0f0' : undefined,
                }}
            >
                {showPlaceholder ? (
                    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
                        <ImageIcon sx={{ fontSize: 60, color: '#bdbdbd' }} />
                    </Box>
                ) : (
                    <CardMedia
                        component="img"
                        image={aplicacion.image}
                        alt={aplicacion.title}
                        onError={() => setImageError(true)}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 3,
                        }}
                    />
                )}
            </Box>

            <CardContent
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    pl: layout === "single" ? 4 : 2,
                    pr: 2,
                    pt: 2,
                    pb: 1.5,
                }}
            >
                <Box display="flex" flexWrap="wrap" gap={1}>
                    <Chip
                        label={aplicacion.category.name}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: "999px" }}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Avatar
                        alt={aplicacion.author.name}
                        sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2">{aplicacion.author.name}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <CalendarMonthIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                        {new Date(aplicacion.published_at).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </Typography>
                </Box>

                <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {aplicacion.title}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {aplicacion.description}
                </Typography>

                <Box mt="auto">
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="primary"
                        sx={{
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                        onClick={() => router.push(`/aplicaciones/${aplicacion.id}`)}
                    >
                        Ver más <span>➤</span>
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AplicacionesCard; 