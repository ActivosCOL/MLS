'use client';

import React, { useState, ChangeEvent } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Typography, Avatar, Chip, Stack, Dialog,
    DialogTitle, DialogContent, DialogActions, Button, TextField,
    MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { v4 as uuidv4 } from 'uuid';

interface Banner {
    id: string;
    titulo: string;
    imageUrl: string;
    publishedAt: string;
    status: 'Active' | 'Inactive';
    zone: 'Superior' | 'Central' | 'Inferior';
}

const initialBanners: Banner[] = [
    {
        id: 'B001',
        titulo: 'Promo Verano',
        imageUrl: '/images/banner1.jpg',
        publishedAt: '2024-05-01',
        status: 'Active',
        zone: 'Superior',
    },
    {
        id: 'B002',
        titulo: 'Black Friday',
        imageUrl: '/images/banner2.jpg',
        publishedAt: '2024-04-20',
        status: 'Inactive',
        zone: 'Central',
    },
    {
        id: 'B003',
        titulo: 'Navidad 2024',
        imageUrl: '/images/banner3.jpg',
        publishedAt: '2024-03-10',
        status: 'Active',
        zone: 'Inferior',
    },
];

const BannersTable: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>(initialBanners);
    const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
    const [editBanner, setEditBanner] = useState<Banner | null>(null);
    const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [newBanner, setNewBanner] = useState<Omit<Banner, 'id'>>({
        titulo: '',
        imageUrl: '',
        publishedAt: '',
        status: 'Active',
        zone: 'Superior',
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && editBanner) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditBanner({ ...editBanner, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveEdit = () => {
        if (editBanner) {
            setBanners(prev => prev.map(b => (b.id === editBanner.id ? editBanner : b)));
            setEditBanner(null);
        }
    };

    const handleConfirmDelete = () => {
        if (bannerToDelete) {
            setBanners(prev => prev.filter(b => b.id !== bannerToDelete.id));
            setBannerToDelete(null);
        }
    };

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold">Gestión de Banners</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
                    CREAR BANNER
                </Button>
            </Stack>

            <TableContainer component={Paper} elevation={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Imagen</strong></TableCell>
                            <TableCell><strong>Título</strong></TableCell>
                            <TableCell><strong>Zona</strong></TableCell>
                            <TableCell><strong>Fecha</strong></TableCell>
                            <TableCell><strong>Estado</strong></TableCell>
                            <TableCell><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners.map((banner) => (
                            <TableRow key={banner.id}>
                                <TableCell>{banner.id}</TableCell>
                                <TableCell>
                                    <Avatar variant="rounded" src={banner.imageUrl} alt={banner.titulo} />
                                </TableCell>
                                <TableCell>{banner.titulo}</TableCell>
                                <TableCell>{banner.zone}</TableCell>
                                <TableCell>{banner.publishedAt}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={banner.status === 'Active' ? 'Activo' : 'Inactivo'}
                                        color={banner.status === 'Active' ? 'success' : 'warning'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => setSelectedBanner(banner)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton color="success" onClick={() => setEditBanner(banner)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => setBannerToDelete(banner)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal vista */}
            <Dialog open={!!selectedBanner} onClose={() => setSelectedBanner(null)} maxWidth="md" fullWidth>
                <DialogTitle>Vista del Banner</DialogTitle>
                <DialogContent>
                    {selectedBanner && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <img
                                src={selectedBanner.imageUrl}
                                alt={selectedBanner.titulo}
                                style={{ maxWidth: '100%', height: 'auto', borderRadius: 8 }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedBanner(null)}>Cerrar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal edición */}
            <Dialog open={!!editBanner} onClose={() => setEditBanner(null)} maxWidth="sm" fullWidth>
                <Box px={3} pt={3}>
                    <Typography variant="h6" fontWeight="bold">Editar Banner</Typography>
                </Box>
                <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {editBanner && (
                        <>
                            <TextField
                                label="Título"
                                value={editBanner.titulo}
                                onChange={(e) => setEditBanner({ ...editBanner, titulo: e.target.value })}
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel>Zona</InputLabel>
                                <Select
                                    value={editBanner.zone}
                                    label="Zona"
                                    onChange={(e) =>
                                        setEditBanner({ ...editBanner, zone: e.target.value as Banner['zone'] })
                                    }
                                >
                                    <MenuItem value="Superior">Superior</MenuItem>
                                    <MenuItem value="Central">Central</MenuItem>
                                    <MenuItem value="Inferior">Inferior</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel>Estado</InputLabel>
                                <Select
                                    value={editBanner.status}
                                    label="Estado"
                                    onChange={(e) =>
                                        setEditBanner({ ...editBanner, status: e.target.value as Banner['status'] })
                                    }
                                >
                                    <MenuItem value="Active">Activo</MenuItem>
                                    <MenuItem value="Inactive">Inactivo</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Fecha de publicación"
                                type="date"
                                value={editBanner.publishedAt}
                                onChange={(e) => setEditBanner({ ...editBanner, publishedAt: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                            />
                            <Box>
                                <Typography variant="subtitle1" mb={1}>Imagen actual:</Typography>
                                <Avatar
                                    variant="rounded"
                                    src={editBanner.imageUrl}
                                    alt={editBanner.titulo}
                                    sx={{ width: 150, height: 80 }}
                                />
                                <Button variant="outlined" component="label" sx={{ mt: 1 }}>
                                    Cambiar Imagen
                                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditBanner(null)}>Cancelar</Button>
                    <Button variant="contained" onClick={handleSaveEdit}>Guardar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal eliminar */}
            <Dialog open={!!bannerToDelete} onClose={() => setBannerToDelete(null)}>
                <DialogTitle>¿Eliminar banner?</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas eliminar el banner{' '}
                        <strong>{bannerToDelete?.titulo}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBannerToDelete(null)}>Cancelar</Button>
                    <Button color="error" variant="contained" onClick={handleConfirmDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>

            {/* Modal crear */}
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
                <Box px={3} pt={3}>
                    <Typography variant="h6" fontWeight="bold">Crear Nuevo Banner</Typography>
                </Box>
                <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        label="Título"
                        value={newBanner.titulo}
                        onChange={(e) => setNewBanner({ ...newBanner, titulo: e.target.value })}
                        fullWidth
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel>Zona</InputLabel>
                        <Select
                            value={newBanner.zone}
                            label="Zona"
                            onChange={(e) =>
                                setNewBanner({ ...newBanner, zone: e.target.value as Banner['zone'] })
                            }
                        >
                            <MenuItem value="Superior">Superior</MenuItem>
                            <MenuItem value="Central">Central</MenuItem>
                            <MenuItem value="Inferior">Inferior</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={newBanner.status}
                            label="Estado"
                            onChange={(e) =>
                                setNewBanner({ ...newBanner, status: e.target.value as Banner['status'] })
                            }
                        >
                            <MenuItem value="Active">Activo</MenuItem>
                            <MenuItem value="Inactive">Inactivo</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Fecha de publicación"
                        type="date"
                        value={newBanner.publishedAt}
                        onChange={(e) => setNewBanner({ ...newBanner, publishedAt: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        required
                    />
                    <Box>
                        <Typography variant="subtitle1" mb={1}>Imagen:</Typography>
                        <Box
                            component="label"
                            sx={{
                                border: '2px dashed #90CAF9',
                                borderRadius: 2,
                                height: 'auto',
                                minHeight: 140,
                                backgroundColor: '#f9f9f9',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 2,
                                overflow: 'hidden'
                            }}
                        >
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setNewBanner({ ...newBanner, imageUrl: reader.result as string });
                                        };
                                        reader.readAsDataURL(e.target.files[0]);
                                    }
                                }}
                            />
                            {!newBanner.imageUrl ? (
                                <>
                                    <CloudUploadOutlinedIcon fontSize="large" color="action" />
                                    <Typography fontSize={14} fontWeight="500">Upload</Typography>
                                </>
                            ) : (
                                <Avatar
                                    variant="rounded"
                                    src={newBanner.imageUrl}
                                    alt="preview"
                                    sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 2 }}
                                />
                            )}
                        </Box>
                    </Box>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
                    <Button
                        variant="contained"
                        disabled={
                            !newBanner.titulo ||
                            !newBanner.imageUrl ||
                            !newBanner.publishedAt
                        }
                        onClick={() => {
                            const newId = uuidv4();
                            setBanners([...banners, { id: newId, ...newBanner }]);
                            setOpenCreateDialog(false);
                            setNewBanner({
                                titulo: '',
                                imageUrl: '',
                                publishedAt: '',
                                status: 'Active',
                                zone: 'Superior',
                            });
                        }}
                    >
                        Crear
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BannersTable;
