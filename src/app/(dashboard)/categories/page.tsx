'use client';

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CategoryService } from '@/services/CategoryService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  _showActions?: boolean;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Partial<Category>>({ name: '', slug: '', description: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CategoryService.getAll();
        setCategories(response.data.data);
      } catch (error) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, slug: category.slug, description: category.description });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', description: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCategory(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingCategory) {
        await CategoryService.update(editingCategory.id, formData);
        setSnackbar({ open: true, message: 'Categoría actualizada', severity: 'success' });
      } else {
        await CategoryService.create(formData);
        setSnackbar({ open: true, message: 'Categoría creada', severity: 'success' });
      }
      handleCloseDialog();
      const response = await CategoryService.getAll();
      setCategories(response.data.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      setDeletingId(id);
      try {
        await CategoryService.delete(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setSnackbar({ open: true, message: 'Categoría eliminada', severity: 'success' });
      } catch (error) {
        setSnackbar({ open: true, message: 'Error al eliminar', severity: 'error' });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 1, sm: 2 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Categorías
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: '#1A3355', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#223e6b' } }}
        >
          Crear Categoría
        </Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #e0e0e0', bgcolor: '#f5f6fa' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1A3355' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Nombre</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Slug</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Descripción</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((row) => (
                <TableRow
                  key={row.id}
                  onMouseEnter={() => row._showActions = true}
                  onMouseLeave={() => row._showActions = false}
                >
                  <TableCell sx={{ color: '#1A3355', fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell sx={{ color: '#1A3355', fontWeight: 500 }}>{row.slug}</TableCell>
                  <TableCell sx={{ color: '#1A3355', fontWeight: 500 }}>{row.description || '-'}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(row)}
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
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(row.id)}
                        disabled={deletingId === row.id}
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
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth
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
            fontSize: '1.2rem',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            py: 2,
            px: 3,
          }}
        >
          {editingCategory ? 'Editar Categoría' : 'Crear Categoría'}
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 3, bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
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
            />
            <TextField
              label="Slug"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
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
            />
            <TextField
              label="Descripción"
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              minRows={2}
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, bgcolor: '#f5f6fa', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#1A3355', fontWeight: 600 }}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#ffaa00', color: '#1A3355', fontWeight: 700, '&:hover': { bgcolor: '#ffb733' } }}>
            {editingCategory ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesPage; 