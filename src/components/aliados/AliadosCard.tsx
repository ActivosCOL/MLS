'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Partner } from '@/models/Partner';

interface AliadosCardProps {
    partner: Partner;
    layout: "grid" | "single";
    onEdit?: (partner: Partner) => void;
    onDelete?: (id: number) => void;
}

const PLACEHOLDER_IMAGE = "/images/placeholder_blog.png";

const AliadosCard: React.FC<AliadosCardProps> = ({
    partner,
    layout,
    onEdit,
    onDelete
}) => {
    const [imageError, setImageError] = useState<boolean>(false);
    const showPlaceholder = imageError || !partner.image;

    const handleEdit = () => {
        if (onEdit) onEdit(partner);
    };
    const handleDelete = () => {
        if (onDelete) onDelete(partner.id);
    };

    return (
        <Card
            sx={{
                borderRadius: 3,
                width: { xs: '90vw', sm: 180, md: 220, lg: 240 },
                minWidth: { xs: '90vw', sm: 180, md: 220, lg: 240 },
                maxWidth: { xs: '90vw', sm: 180, md: 220, lg: 240 },
                height: { xs: 220, sm: 240, md: 260, lg: 280 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                bgcolor: '#f5f6fa',
                overflow: 'hidden',
                p: 2,
                position: 'relative',
            }}
        >
            {/* Iconos de editar y eliminar */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                    zIndex: 1,
                }}
            >
                <IconButton
                    size="small"
                    onClick={handleEdit}
                    sx={{
                        bgcolor: '#1A3355',
                        color: '#fff',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { bgcolor: '#223e6b', transform: 'scale(1.1)' },
                    }}
                >
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={handleDelete}
                    sx={{
                        bgcolor: '#ffaa00',
                        color: '#1A3355',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { bgcolor: '#ffb733', transform: 'scale(1.1)' },
                    }}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    height: { xs: 110, sm: 120, md: 130, lg: 140 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: showPlaceholder ? '#e9edf5' : undefined,
                    borderRadius: 2,
                    mb: 2,
                }}
            >
                {showPlaceholder ? (
                    <Box display="flex" alignItems="center" justifyContent="center" width={60} height={60}>
                        <ImageIcon sx={{ fontSize: 48, color: '#1A3355' }} />
                    </Box>
                ) : (
                    <CardMedia
                        component="img"
                        image={partner.image}
                        alt={partner.name}
                        onError={() => setImageError(true)}
                        sx={{
                            width: '100%',
                            height: { xs: 90, sm: 100, md: 110, lg: 120 },
                            objectFit: 'contain',
                            objectPosition: 'center',
                            background: '#fff',
                        }}
                    />
                )}
            </Box>
            <CardContent
                sx={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    p: 0,
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    align="center"
                    sx={{ mt: 1, mb: 1, width: '100%', fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.2rem' }, color: '#1A3355' }}
                >
                    {partner.name}
                </Typography>
                {partner.website && (
                    <Box mt={1} width="100%" display="flex" justifyContent="center">
                        <Typography
                            variant="body2"
                            fontWeight="bold"
                            sx={{
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    color: '#ffb733',
                                    transform: 'scale(1.05)',
                                },
                                color: '#ffaa00',
                            }}
                            onClick={() => window.open(partner.website, '_blank')}
                        >
                            Visitar sitio web <span>➤</span>
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default AliadosCard; 