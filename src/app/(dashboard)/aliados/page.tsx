'use client';

import AliadosCard from '@/components/aliados/AliadosCard';
import { PartnerService } from '@/services/PartnerService';
import { Box, CircularProgress, Typography, Button, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Partner } from '@/models/Partner';
import AddIcon from '@mui/icons-material/Add';
import PartnerModal from '@/components/aliados/PartnerModal';

const AliadosPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const response = await PartnerService.getAllPartners();
      setPartners(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los aliados');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleOpenModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
    } else {
      setEditingPartner(null);
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingPartner(null);
  };

  const handleSave = async (data: Omit<Partner, 'id'>) => {
    try {
      if (editingPartner) {
        await PartnerService.updatePartner(editingPartner.id, data);
      } else {
        await PartnerService.createPartner(data);
      }
      handleCloseModal();
      fetchPartners();
    } catch (err) {
      setError('Error al guardar el aliado');
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este aliado?')) {
      try {
        await PartnerService.deletePartner(id);
        fetchPartners();
      } catch (err) {
        setError('Error al eliminar el aliado');
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
          Aliados
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
          sx={{ bgcolor: '#1A3355', color: '#fff', fontWeight: 700, '&:hover': { bgcolor: '#223e6b' } }}
        >
          Crear Aliado
        </Button>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        sx={{ width: "100%", mx: "auto", mb: 2 }}
      >
        {partners.map((partner) => (
          <Box
            key={partner.id}
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
            <AliadosCard 
              partner={partner} 
              layout="grid" 
              onEdit={handleOpenModal}
              onDelete={handleDelete}
            />
          </Box>
        ))}
      </Box>
      <PartnerModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editingPartner || {}}
        isEdit={!!editingPartner}
      />
    </Box>
  );
};

export default AliadosPage; 