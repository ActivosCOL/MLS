"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Drawer,
    Autocomplete,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    Snackbar,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { Blog } from '@/models/Blog';
import { BlogService } from '@/services/BlogService';
import FilterAltSharpIcon from "@mui/icons-material/FilterAltSharp";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SquareOutlinedIcon from "@mui/icons-material/SquareOutlined";
import AddIcon from '@mui/icons-material/Add';
import TitleIcon from '@mui/icons-material/Title';
import ImageIcon from '@mui/icons-material/Image';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import BlogCard from './BlogCard';
import dynamic from 'next/dynamic';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Importar el editor WYSIWYG de forma dinámica para evitar problemas de SSR
const Editor = dynamic(() => import('../Editor'), { ssr: false });

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Author {
    id: number;
    name: string;
    email: string;
}

const BlogView: React.FC = () => {
    const [layout, setLayout] = useState<"grid" | "single">("grid");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchAuthor, setSearchAuthor] = useState("");
    const [searchCategory, setSearchCategory] = useState<string[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [formData, setFormData] = useState<Partial<Blog>>({
        title: '',
        front_image: '',
        content: '',
        resume: '',
        category: { id: 2, name: 'General', slug: 'general', description: null },
        author: { id: 1, name: 'admin', email: 'admin@example.com' }
    });
    const [publishingId, setPublishingId] = useState<number | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'success' });

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [blogsResponse, categoriesResponse, authorsResponse] = await Promise.all([
                    BlogService.getAllBlogs(),
                    BlogService.getCategories(),
                    BlogService.getAuthors()
                ]);
                setBlogs(blogsResponse.data);
                setCategories(categoriesResponse.data);
                setAuthors(authorsResponse.data);
                setError(null);
            } catch (err) {
                setError('Error al cargar los datos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOpenDialog = (blog?: Blog) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({
                title: blog.title,
                front_image: blog.front_image,
                content: blog.content,
                resume: blog.resume,
                category: blog.category,
                author: blog.author
            });
        } else {
            setEditingBlog(null);
            setFormData({
                title: '',
                front_image: '',
                content: '',
                resume: '',
                category: categories[0] || { id: 2, name: 'General', slug: 'general', description: null },
                author: authors[0] || { id: 1, name: 'admin', email: 'admin@example.com' }
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingBlog(null);
    };

    const handleSubmit = async () => {
        try {
            if (editingBlog) {
                await BlogService.updateBlog(editingBlog.id, formData);
            } else {
                await BlogService.createBlog(formData);
            }
            handleCloseDialog();
            // Recargar los blogs
            const response = await BlogService.getAllBlogs();
            setBlogs(response.data);
        } catch (err) {
            setError('Error al guardar el blog');
            console.error(err);
        }
    };

    const allCategories = [...new Set(blogs.map(blog => blog.category.name))];

    const filteredBlogs = blogs.filter((blog) => {
        const matchesTitle = blog.title
            .toLowerCase()
            .includes(searchTitle.toLowerCase());
        const matchesAuthor = blog.author.name
            .toLowerCase()
            .includes(searchAuthor.toLowerCase());
        const matchesCategory = searchCategory.length
            ? searchCategory.includes(blog.category.name)
            : true;
        const blogDate = new Date(blog.published_at);
        const matchesStart = startDate
            ? blogDate >= new Date(startDate)
            : true;
        const matchesEnd = endDate
            ? blogDate <= new Date(endDate)
            : true;

        return (
            matchesTitle &&
            matchesAuthor &&
            matchesCategory &&
            matchesStart &&
            matchesEnd
        );
    });

    const maxPerRow = 4;
    const emptySlots = isDesktop && filteredBlogs.length < maxPerRow ? maxPerRow - filteredBlogs.length : 0;

    const handleTogglePublished = async (id: number, currentPublished: boolean) => {
        setPublishingId(id);
        try {
            await BlogService.updatePublished(id, !currentPublished);
            setBlogs((prev) => prev.map((b) => b.id === id ? { ...b, published: !b.published } : b));
            setSnackbar({ open: true, message: 'Estado de publicación actualizado', severity: 'success' });
        } catch (err) {
            setSnackbar({ open: true, message: 'Error al actualizar el estado de publicación', severity: 'error' });
        } finally {
            setPublishingId(null);
        }
    };

    const handleDeleteBlog = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este blog?')) {
            try {
                await BlogService.deleteBlog(id);
                setBlogs((prev) => prev.filter((b) => b.id !== id));
                setSnackbar({ open: true, message: 'Blog eliminado correctamente', severity: 'success' });
            } catch (err) {
                setSnackbar({ open: true, message: 'Error al eliminar el blog', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
        </Box>;
    }

    if (error) {
        return <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Alert severity="error">{error}</Alert>
        </Box>;
    }

    return (
        <Box>
            {/* Drawer para mobile */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ p: 3, width: 300 }}>
                    <Typography variant="h6" mb={2}>Filtros</Typography>
                    <TextField
                        fullWidth
                        label="Título"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Autor"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                        size="small"
                        sx={{ mb: 2 }}
                    />
                    <Autocomplete
                        multiple
                        options={allCategories}
                        value={searchCategory}
                        onChange={(_, newValue) => setSearchCategory(newValue)}
                        renderInput={(params) => <TextField {...params} label="Categorías" size="small" />}
                        sx={{
                            mb: 2,
                            '& .MuiInputBase-root': {
                                height: '40px',
                                overflowY: 'auto',
                                alignItems: 'center',
                            },
                            '& .MuiChip-root': {
                                height: '24px',
                                fontSize: '0.75rem',
                            }
                        }}
                    />
                    <TextField
                        label="Desde"
                        type="date"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Hasta"
                        type="date"
                        fullWidth
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => setDrawerOpen(false)}
                    >
                        Aplicar
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => {
                            setSearchTitle("");
                            setSearchAuthor("");
                            setSearchCategory([]);
                            setStartDate("");
                            setEndDate("");
                            setDrawerOpen(false);
                        }}
                    >
                        Limpiar filtros
                    </Button>
                </Box>
            </Drawer>

            {/* Encabezado */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={isDesktop ? 2 : 4}>
                <Typography variant="h4" fontWeight="bold">
                    Blog
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                        sx={{ bgcolor: '#1A3355', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#223e6b' } }}
                    >
                        Crear Blog
                    </Button>
                    {!isDesktop && (
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <FilterAltSharpIcon /> Filtrar
                        </IconButton>
                    )}
                    <ToggleButtonGroup
                        value={layout}
                        exclusive
                        onChange={(_, newLayout) => newLayout && setLayout(newLayout)}
                        size="small"
                    >
                        <ToggleButton value="grid"><GridViewOutlinedIcon /></ToggleButton>
                        <ToggleButton value="single"><SquareOutlinedIcon /></ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {/* Filtros horizontales en desktop */}
            {isDesktop && (
                <Box display="flex" gap={2} alignItems="center" mb={4}>
                    <TextField
                        label="Título"
                        size="small"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <TextField
                        label="Autor"
                        size="small"
                        value={searchAuthor}
                        onChange={(e) => setSearchAuthor(e.target.value)}
                    />
                    <Autocomplete
                        multiple
                        disableCloseOnSelect
                        options={allCategories}
                        value={searchCategory}
                        onChange={(_, newValue) => setSearchCategory(newValue)}
                        renderInput={(params) => <TextField {...params} label="Categorías" size="small" />}
                        sx={{
                            minWidth: 200,
                            '& .MuiInputBase-root': {
                                height: '40px',
                                overflowY: 'auto',
                                alignItems: 'center',
                            },
                            '& .MuiChip-root': {
                                height: '24px',
                                fontSize: '0.75rem',
                            }
                        }}
                    />
                    <TextField
                        label="Desde"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        label="Hasta"
                        type="date"
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </Box>
            )}

            {/* Renderizado de tarjetas */}
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                sx={{ width: "100%", mx: "auto", mb: 2 }}
            >
                {filteredBlogs.map((blog) => (
                    <Box
                        key={blog.id}
                        sx={{
                            flex: '1 1 100%',
                            maxWidth: {
                                xs: '100%',
                                sm: '48%',
                                md: '31.5%',
                                lg: '23.5%'
                            },
                            minWidth: {
                                xs: '100%',
                                sm: '48%',
                                md: '31.5%',
                                lg: '23.5%'
                            },
                            display: 'flex',
                        }}
                    >
                        <BlogCard 
                            blog={blog} 
                            layout={layout} 
                            onTogglePublished={handleTogglePublished}
                            publishing={publishingId === blog.id}
                            onEdit={handleOpenDialog}
                            onDelete={handleDeleteBlog}
                        />
                    </Box>
                ))}
                {isDesktop && Array.from({ length: emptySlots }).map((_, idx) => (
                    <Box
                        key={`empty-${idx}`}
                        sx={{
                            flex: '1 1 23.5%',
                            maxWidth: '23.5%',
                            minWidth: '23.5%',
                            visibility: 'hidden',
                            display: 'flex',
                        }}
                    />
                ))}
            </Box>

            {/* Modal de crear/editar blog */}
            <Dialog 
                open={openDialog} 
                onClose={handleCloseDialog} 
                maxWidth="md" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: 8,
                        p: 0,
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        bgcolor: '#1A3355',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1.3rem',
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        py: 2,
                        px: 3,
                    }}
                >
                    {editingBlog ? 'Editar Blog' : 'Crear Blog'}
                </DialogTitle>
                <DialogContent sx={{ px: 3, py: 3, bgcolor: '#fff' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="Título *"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            fullWidth
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1A3355',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1A3355',
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <TitleIcon sx={{ color: '#1A3355' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="URL de la imagen principal"
                            value={formData.front_image}
                            onChange={(e) => setFormData({ ...formData, front_image: e.target.value })}
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1A3355',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1A3355',
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ImageIcon sx={{ color: '#1A3355' }} />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            label="Resumen *"
                            value={formData.resume}
                            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
                            fullWidth
                            multiline
                            rows={3}
                            required
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#1A3355',
                                    },
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: '#1A3355',
                                },
                            }}
                        />
                        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1A3355' }, '& .MuiInputLabel-root.Mui-focused': { color: '#1A3355' } }}>
                            <InputLabel>Categoría</InputLabel>
                            <Select
                                value={formData.category?.id || ''}
                                label="Categoría"
                                onChange={(e) => {
                                    const selectedCategory = categories.find(c => c.id === e.target.value);
                                    if (selectedCategory) {
                                        setFormData({ ...formData, category: selectedCategory });
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <CategoryIcon sx={{ color: '#1A3355' }} />
                                    </InputAdornment>
                                }
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1A3355' }, '& .MuiInputLabel-root.Mui-focused': { color: '#1A3355' } }}>
                            <InputLabel>Autor</InputLabel>
                            <Select
                                value={formData.author?.id || ''}
                                label="Autor"
                                onChange={(e) => {
                                    const selectedAuthor = authors.find(a => a.id === e.target.value);
                                    if (selectedAuthor) {
                                        setFormData({ ...formData, author: selectedAuthor });
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#1A3355' }} />
                                    </InputAdornment>
                                }
                            >
                                {authors.map((author) => (
                                    <MenuItem key={author.id} value={author.id}>
                                        {author.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!formData.published}
                                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                                    sx={{
                                        color: '#1A3355',
                                        '&.Mui-checked': {
                                            color: '#ffaa00',
                                        },
                                    }}
                                />
                            }
                            label={<Typography sx={{ color: '#1A3355', fontWeight: 600 }}>Publicado</Typography>}
                            sx={{ mb: 1, alignSelf: 'flex-start' }}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1, color: '#1A3355', fontWeight: 600 }}>
                                Contenido *
                            </Typography>
                            <Editor
                                value={formData.content || ''}
                                onChange={(content: string) => setFormData({ ...formData, content })}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2, bgcolor: '#f5f6fa', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
                    <Button onClick={handleCloseDialog} sx={{ color: '#1A3355', fontWeight: 600 }}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#ffaa00', color: '#1A3355', fontWeight: 700, '&:hover': { bgcolor: '#ffb733' } }}>
                        {editingBlog ? 'Guardar' : 'Crear'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <MuiAlert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    elevation={6}
                    variant="filled"
                    sx={{
                        bgcolor: snackbar.severity === 'success' ? '#1A3355' : '#d32f2f',
                        color: '#fff',
                        fontWeight: 600,
                        letterSpacing: 0.5,
                    }}
                >
                    {snackbar.message}
                </MuiAlert>
            </Snackbar>
        </Box>
    );
};

export default BlogView; 