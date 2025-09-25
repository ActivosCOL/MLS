'use client';

import AfiliadoCard from '@/components/afiliados/AfiliadoCard';
import { AllieService } from '@/services/AllieService';
import { Box, CircularProgress, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Allie, AllieStatus } from '@/models/Afiliado';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LanguageIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';

const AfiliadosPage = () => {
  const [allies, setAllies] = useState<Allie[]>([]);
  const [statuses, setStatuses] = useState<AllieStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingAllie, setEditingAllie] = useState<Allie | null>(null);
  const [formData, setFormData] = useState<Partial<Allie>>({
    name: '',
    image: '',
    address: '',
    phone: '',
    email_1: '',
    email_2: '',
    website: '',
    status: { id: 2, name: 'Activo' }
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [alliesResponse, statusesResponse] = await Promise.all([
        AllieService.getAllies(),
        AllieService.getAllieStatuses()
      ]);
      
      const sorted = alliesResponse.data.slice().sort((a, b) => {
        if (a.status?.name === 'Activo' && b.status?.name !== 'Activo') return -1;
        if (a.status?.name !== 'Activo' && b.status?.name === 'Activo') return 1;
        return 0;
      });
      
      setAllies(sorted);
      setStatuses(statusesResponse.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (allie?: Allie) => {
    if (allie) {
      setEditingAllie(allie);
      setFormData({
        name: allie.name,
        image: allie.image,
        address: allie.address,
        phone: allie.phone,
        email_1: allie.email_1,
        email_2: allie.email_2,
        website: allie.website,
        status: allie.status
      });
    } else {
      setEditingAllie(null);
      setFormData({
        name: '',
        image: '',
        address: '',
        phone: '',
        email_1: '',
        email_2: '',
        website: '',
        status: statuses.find(s => s.name === 'Activo') || statuses[0]
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAllie(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingAllie) {
        await AllieService.updateAllie(editingAllie.id, formData);
      } else {
        await AllieService.createAllie(formData);
      }
      handleCloseDialog();
      fetchData();
    } catch (err) {
      setError('Error al guardar el afiliado');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este afiliado?')) {
      try {
        await AllieService.deleteAllie(id);
        fetchData();
      } catch (err) {
        setError('Error al eliminar el afiliado');
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 1, sm: 2 } }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">
          Afiliados
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: '#1A3355', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#223e6b' } }}
        >
          Crear Afiliado
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={{ xs: 2, sm: 2.5, md: 3 }}
        justifyContent="center"
        sx={{ width: "100%", mx: "auto", mb: 2 }}
      >
        {allies.map((allie) => (
          <Box
            key={allie.id}
            sx={{
              flex: '1 1 100%',
              maxWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              minWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              display: 'flex',
              justifyContent: 'center',
              my: { xs: 1, sm: 1.5, md: 2 },
            }}
          >
            <AfiliadoCard 
              allie={allie} 
              onEdit={handleOpenDialog}
              onDelete={handleDelete}
            />
          </Box>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth
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
          {editingAllie ? 'Editar Afiliado' : 'Crear Afiliado'}
        </DialogTitle>
        <DialogContent sx={{ px: 3, py: 3, bgcolor: '#fff' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Nombre *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <PersonIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="URL de la imagen"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
              label="Dirección"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                    <LocationOnIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Teléfono"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    <PhoneIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Email principal"
              value={formData.email_1}
              onChange={(e) => setFormData({ ...formData, email_1: e.target.value })}
              fullWidth
              type="email"
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
                    <EmailIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Email alternativo"
              value={formData.email_2}
              onChange={(e) => setFormData({ ...formData, email_2: e.target.value })}
              fullWidth
              type="email"
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
                    <AlternateEmailIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Sitio web"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
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
                    <LanguageIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1A3355' }, '& .MuiInputLabel-root.Mui-focused': { color: '#1A3355' } }}>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.status?.id || ''}
                label="Estado"
                onChange={(e) => {
                  const selectedStatus = statuses.find(s => s.id === e.target.value);
                  if (selectedStatus) {
                    setFormData({ ...formData, status: selectedStatus });
                  }
                }}
              >
                {statuses.map((status) => (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, bgcolor: '#f5f6fa', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#1A3355', fontWeight: 600 }}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#ffaa00', color: '#1A3355', fontWeight: 700, '&:hover': { bgcolor: '#ffb733' } }}>
            {editingAllie ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AfiliadosPage; 