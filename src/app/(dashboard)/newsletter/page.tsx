'use client';

import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NewsletterService } from '@/services/NewsletterService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';

interface Newsletter {
  id: number;
  email: string;
  status: boolean;
  subscribed_at?: string;
}

const NewsletterPage = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: AlertColor }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await NewsletterService.getAll();
        setNewsletters(response.data.data);
      } catch (error) {
        // Manejo de error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (id: number, currentStatus: boolean) => {
    setUpdatingId(id);
    try {
      await NewsletterService.updateStatus(id, !currentStatus);
      setNewsletters((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, status: !n.status } : n
        )
      );
      setSnackbar({ open: true, message: 'Estado actualizado correctamente', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error al actualizar el estado', severity: 'error' });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: 4, px: { xs: 1, sm: 2 } }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Newsletter
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none', border: '1px solid #e0e0e0', bgcolor: '#f5f6fa' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1A3355' }}>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Suscrito</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>Fecha de suscripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsletters.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ color: '#1A3355', fontWeight: 500 }}>{row.email}</TableCell>
                  <TableCell>
                    <Switch
                      checked={!!row.status}
                      onChange={() => handleToggle(row.id, !!row.status)}
                      disabled={updatingId === row.id}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#ffaa00',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#ffaa00',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#1A3355' }}>
                    {row.subscribed_at ? new Date(row.subscribed_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }) : '-'}
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
    </Box>
  );
};

export default NewsletterPage; 