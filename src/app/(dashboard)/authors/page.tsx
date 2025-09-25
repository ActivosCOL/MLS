'use client';

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AuthorService } from '@/services/AuthorService';
import IconButton from '@mui/material/IconButton';
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

interface Author {
  id: number;
  name: string;
  email: string;
  _showActions?: boolean;
}

const AuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState<Partial<Author>>({ name: '', email: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'success' });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthorService.getAll();
        setAuthors(response.data.data);
      } catch (error) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = (author?: Author) => {
    if (author) {
      setEditingAuthor(author);
      setFormData({ name: author.name, email: author.email });
    } else {
      setEditingAuthor(null);
      setFormData({ name: '', email: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAuthor(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAuthor) {
        await AuthorService.update(editingAuthor.id, formData);
        setSnackbar({ open: true, message: 'Autor actualizado', severity: 'success' });
      } else {
        await AuthorService.create(formData);
        setSnackbar({ open: true, message: 'Autor creado', severity: 'success' });
      }
      handleCloseDialog();
      const response = await AuthorService.getAll();
      setAuthors(response.data.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al guardar', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este autor?')) {
      setDeletingId(id);
      try {
        await AuthorService.delete(id);
        setAuthors((prev) => prev.filter((a) => a.id !== id));
        setSnackbar({ open: true, message: 'Autor eliminado', severity: 'success' });
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
          Autores
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: '#1A3355', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#223e6b' } }}
        >
          Crear Autor
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
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((row) => (
                <TableRow
                  key={row.id}
                  onMouseEnter={() => row._showActions = true}
                  onMouseLeave={() => row._showActions = false}
                >
                  <TableCell sx={{ color: '#1A3355', fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell sx={{ color: '#1A3355', fontWeight: 500 }}>{row.email}</TableCell>
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
          {editingAuthor ? 'Editar Autor' : 'Crear Autor'}
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
              label="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, bgcolor: '#f5f6fa', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#1A3355', fontWeight: 600 }}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#ffaa00', color: '#1A3355', fontWeight: 700, '&:hover': { bgcolor: '#ffb733' } }}>
            {editingAuthor ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthorsPage; 