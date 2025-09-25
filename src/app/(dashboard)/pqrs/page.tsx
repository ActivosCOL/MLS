'use client';

import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Pqr } from '@/models/Pqr';
import { PqrService } from '@/services/PqrService';
import PqrCard from '@/components/pqrs/PqrCard';

const PqrsPage = () => {
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPqrs = async () => {
      try {
        setLoading(true);
        const response = await PqrService.getAllPqrs();
        setPqrs(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los PQRS');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, []);

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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        PQRS
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={{ xs: 4, sm: 5, md: 6 }}
        justifyContent="center"
        sx={{ width: "100%", mx: "auto", mb: 2 }}
      >
        {pqrs.map((pqr) => (
          <Box
            key={pqr.id}
            sx={{
              flex: '1 1 100%',
              maxWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              minWidth: { xs: '100%', sm: '48%', md: '32%', lg: '30%' },
              display: 'flex',
              justifyContent: 'center',

            }}
          >
            <PqrCard pqr={pqr} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PqrsPage; 