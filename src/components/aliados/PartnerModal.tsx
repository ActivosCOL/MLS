import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import LanguageIcon from '@mui/icons-material/Language';
import { Partner } from '@/models/Partner';

interface PartnerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Partner, 'id'>) => void;
  initialData?: Partial<Partner>;
  isEdit?: boolean;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ open, onClose, onSave, initialData = {}, isEdit = false }) => {
  const [form, setForm] = useState<Omit<Partner, 'id'>>({
    name: '',
    image: '',
    website: ''
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        image: initialData.image || '',
        website: initialData.website || ''
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth
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
        {isEdit ? 'Editar Aliado' : 'Crear Aliado'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, py: 3, bgcolor: '#fff' }}>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Nombre *"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
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
                    <PersonIcon sx={{ color: '#1A3355' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              label="Imagen (URL)"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
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
              label="Sitio Web"
              name="website"
              value={form.website}
              onChange={handleChange}
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, bgcolor: '#f5f6fa', borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
          <Button onClick={onClose} sx={{ color: '#1A3355', fontWeight: 600 }}>Cancelar</Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: '#ffaa00', color: '#1A3355', fontWeight: 700, '&:hover': { bgcolor: '#ffb733' } }}>{isEdit ? 'Guardar Cambios' : 'Crear'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PartnerModal; 