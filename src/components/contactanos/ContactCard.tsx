'use client';

import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Chip, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';
import { ContactForm } from '@/models/ContactForm';

interface ContactCardProps {
  contact: ContactForm;
}

const CARD_WIDTH = 350;
const CARD_HEIGHT = 320;

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid #e0e0e0',
          bgcolor: '#f5f6fa',
          width: { xs: '100%', sm: CARD_WIDTH },
          minWidth: { xs: '100%', sm: CARD_WIDTH },
          maxWidth: { xs: '100%', sm: CARD_WIDTH },
          height: { xs: 'auto', sm: CARD_HEIGHT },
          minHeight: { xs: 220, sm: CARD_HEIGHT },
          maxHeight: { xs: 'none', sm: CARD_HEIGHT },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          m: 'auto',
          p: { xs: 2, sm: 3 },
          cursor: 'pointer',
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 8,
          },
        }}
        onClick={() => setOpen(true)}
      >
        <CardContent sx={{ flex: 1, p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <BusinessIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography variant="h6" fontWeight={700} sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '1.2rem' }}>
              {contact.full_name || '-'}
            </Typography>
            {contact.type?.name && (
              <Chip label={contact.type.name} size="small" sx={{ ml: 1, bgcolor: '#e9edf5', color: '#1A3355', fontWeight: 600, fontSize: '0.85rem' }} />
            )}
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <EmailIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{contact.email || '-'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <PhoneIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{contact.phone || '-'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <LocationOnIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>{contact.city || '-'}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <CommentIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography
              variant="body2"
              sx={{
                flex: 1,
                color: '#1A3355',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                minHeight: 24,
                fontSize: '0.95rem',
              }}
            >
              {contact.message || '-'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <BusinessIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography variant="body2" sx={{ flex: 1, color: '#1A3355', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.95rem' }}>
              {contact.real_state || '-'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1} width="100%">
            <AccessTimeIcon fontSize="small" sx={{ color: '#ffaa00' }} />
            <Typography variant="caption" color="#1A3355" sx={{ flex: 1 }}>
              {contact.created_at_form ? new Date(contact.created_at_form).toLocaleString('es-CO') : '-'}
            </Typography>
          </Box>
        </CardContent>
        <Box mt={1} display="flex" justifyContent="center">
          <Chip
            label={contact.data_consent ? 'Consentimiento de datos: Sí' : 'Consentimiento de datos: No'}
            size="small"
            sx={{
              mt: 1,
              bgcolor: contact.data_consent ? '#d6f5e6' : '#ffeaea',
              color: contact.data_consent ? '#1A3355' : '#d32f2f',
              fontWeight: 600,
              fontSize: '0.85rem',
              borderRadius: 2,
              minWidth: 220,
              justifyContent: 'center',
            }}
          />
        </Box>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Detalle de contacto
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <Typography variant="subtitle1" fontWeight={700}>{contact.full_name || '-'}</Typography>
            {contact.type?.name && (
              <Chip label={contact.type.name} size="small" color="info" sx={{ ml: 1 }} />
            )}
          </Box>
          <Box mb={1}><EmailIcon fontSize="small" /> <b>Email:</b> {contact.email || '-'}</Box>
          <Box mb={1}><PhoneIcon fontSize="small" /> <b>Teléfono:</b> {contact.phone || '-'}</Box>
          <Box mb={1}><LocationOnIcon fontSize="small" /> <b>Ciudad:</b> {contact.city || '-'}</Box>
          <Box mb={1}><BusinessIcon fontSize="small" /> <b>Inmobiliaria:</b> {contact.real_state || '-'}</Box>
          <Box mb={2}><AccessTimeIcon fontSize="small" /> <b>Fecha:</b> {contact.created_at_form ? new Date(contact.created_at_form).toLocaleString('es-CO') : '-'}</Box>
          <Box mb={2}>
            <CommentIcon fontSize="small" /> <b>Mensaje:</b>
            <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>{contact.message || '-'}</Typography>
          </Box>
          <Chip
            label={contact.data_consent ? 'Consentimiento de datos: Sí' : 'Consentimiento de datos: No'}
            size="small"
            color={contact.data_consent ? 'success' : 'error'}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactCard; 