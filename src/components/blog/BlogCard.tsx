"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Avatar,
    IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ImageIcon from '@mui/icons-material/Image';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Blog } from '@/models/Blog';

interface BlogCardProps {
    blog: Blog;
    layout: "grid" | "single";
    onTogglePublished?: (id: number, published: boolean) => void;
    publishing?: boolean;
    onEdit?: (blog: Blog) => void;
    onDelete?: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
    blog,
    layout,
    onTogglePublished,
    publishing = false,
    onEdit,
    onDelete,
}) => {
    const router = useRouter();
    const [imageError, setImageError] = useState<boolean>(false);
    const [showActions, setShowActions] = useState(false);

    const showPlaceholder = imageError || !blog.front_image;

    return (
        <Card
            onMouseEnter={() => setShowActions(true)}
            onMouseLeave={() => setShowActions(false)}
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: layout === "single" ? 300 : 460, 
                display: "flex",
                flexDirection: layout === "single" ? "row" : "column",
                bgcolor: "#fff",
                overflow: "hidden",
                p: 2, 
                opacity: blog.published === false ? 0.5 : 1,
                position: 'relative',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                },
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
                        image={blog.front_image}
                        alt={blog.title}
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
                    position: 'relative',
                }}
            >
                <Box display="flex" flexWrap="wrap" gap={1}>
                    <Chip
                        label={blog.category.name}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: "999px" }}
                    />
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Avatar
                        alt={blog.author.name}
                        sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2">{blog.author.name}</Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <CalendarMonthIcon fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                        {new Date(blog.published_at).toLocaleDateString('es-ES', {
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
                    {blog.title}
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
                    {blog.resume}
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
                        onClick={() => router.push(`/blog/${blog.slug}`)}
                    >
                        Leer más <span>➤</span>
                    </Typography>
                </Box>

                {/* Acciones de editar, eliminar y publicar (hover) */}
                {showActions && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            display: 'flex',
                            gap: 1,
                            zIndex: 2,
                        }}
                    >
                        {/* Icono publicar (ojo) */}
                        {typeof blog.published === 'boolean' && onTogglePublished && (
                            <IconButton
                                size="small"
                                onClick={() => onTogglePublished(blog.id, blog.published)}
                                sx={{
                                    bgcolor: '#f5f6fa',
                                    color: blog.published ? '#1A3355' : '#ffaa00',
                                    border: '1px solid #e0e0e0',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: '#e9edf5',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                                disabled={publishing}
                            >
                                {publishing ? (
                                    <CircularProgress size={20} sx={{ color: '#ffaa00' }} />
                                ) : blog.published ? (
                                    <VisibilityIcon />
                                ) : (
                                    <VisibilityOffIcon />
                                )}
                            </IconButton>
                        )}
                        {onEdit && (
                            <IconButton
                                size="small"
                                onClick={() => onEdit(blog)}
                                sx={{
                                    bgcolor: '#1A3355',
                                    color: '#fff',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: '#223e6b',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        )}
                        {onDelete && (
                            <IconButton
                                size="small"
                                onClick={() => onDelete(blog.id)}
                                sx={{
                                    bgcolor: '#ffaa00',
                                    color: '#1A3355',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        bgcolor: '#ffb733',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default BlogCard;
