import { 
  Box, 
  Typography, 
  FormControl, 
  FormControlLabel, 
  Checkbox, 
  FormGroup, 
  TextField,
  FormHelperText,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { UseFormRegister, FieldErrors, useWatch, Control } from 'react-hook-form';
import { FormData } from '../types';

interface MarketingSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

export const MarketingSection: React.FC<MarketingSectionProps> = ({ register, errors, control }) => {
  const promotionChannels = useWatch({
    control,
    name: 'marketing.promotionChannels',
    defaultValue: []
  });

  const hasCRM = useWatch({
    control,
    name: 'marketing.hasCRM',
    defaultValue: 'No'
  });

  const hasPhotography = useWatch({
    control,
    name: 'marketing.hasPhotography',
    defaultValue: 'No'
  });

  const leadTrackingMethods = useWatch({
    control,
    name: 'marketing.leadTrackingMethods',
    defaultValue: []
  });

  const showOtherPromotionChannel = Array.isArray(promotionChannels) && promotionChannels.includes('Otros');
  const showCRMName = hasCRM === 'Si';
  const showPhotographyDetails = hasPhotography === 'Si';
  const showOtherLeadTrackingMethod = Array.isArray(leadTrackingMethods) && leadTrackingMethods.includes('Otros');

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        padding: 3,
        marginBottom: 3
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>Información de Comercialización</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormControl fullWidth error={!!errors.marketing?.hasMarketingTeam}>
          <FormLabel>¿Cuenta con equipo para tareas de comercialización?</FormLabel>
          <Select
            {...register('marketing.hasMarketingTeam', { required: true })}
            displayEmpty
          >
            <MenuItem value="" disabled>Seleccione una opción</MenuItem>
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText error={!!errors.marketing?.hasMarketingTeam}>
            {errors.marketing?.hasMarketingTeam?.message || " "}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" error={!!errors.marketing?.promotionChannels}>
          <Typography component="legend" sx={{ color: errors.marketing?.promotionChannels ? 'error.main' : 'inherit' }}>
            ¿Qué medios utiliza o utilizará para la promoción de los activos?
          </Typography>
          <FormGroup>
            {[
              'Redes Sociales',
              'Página Web Propio',
              'Portales Inmobiliarios',
              'Campañas Pagas en Google y/o Meta',
              'Aviso de Ventana y/o Valla',
              'Gestión de Bases de Datos',
              'Otros'
            ].map((channel) => (
              <FormControlLabel
                key={channel}
                control={
                  <Checkbox
                    value={channel}
                    {...register('marketing.promotionChannels')}
                    sx={{
                      color: errors.marketing?.promotionChannels ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.marketing?.promotionChannels ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={channel}
              />
            ))}
          </FormGroup>
          {errors.marketing?.promotionChannels && (
            <FormHelperText error>{errors.marketing.promotionChannels.message}</FormHelperText>
          )}
        </FormControl>

        {showOtherPromotionChannel && (
          <TextField
            fullWidth
            placeholder="Ingrese otros medios de promoción"
            {...register('marketing.otherPromotionChannel')}
            error={!!errors.marketing?.otherPromotionChannel}
            helperText={errors.marketing?.otherPromotionChannel?.message}
            sx={{ mt: 2 }}
          />
        )}

        <FormControl fullWidth error={!!errors.marketing?.hasCRM}>
          <FormLabel required sx={{ color: errors.marketing?.hasCRM ? 'error.main' : 'text.primary' }}>
            ¿Cuenta con CRM?
          </FormLabel>
          <Select
            {...register('marketing.hasCRM')}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText error={!!errors.marketing?.hasCRM}>
            {errors.marketing?.hasCRM?.message || " "}
          </FormHelperText>
        </FormControl>

        {hasCRM === 'Si' && (
          <TextField
            fullWidth
            placeholder="Especifique el nombre del CRM"
            {...register('marketing.crmName')}
            error={!!errors.marketing?.crmName}
            helperText={errors.marketing?.crmName?.message}
            sx={{ mt: 2 }}
          />
        )}

        <FormControl fullWidth error={!!errors.marketing?.hasPhotography}>
          <FormLabel required sx={{ color: errors.marketing?.hasPhotography ? 'error.main' : 'text.primary' }}>
            ¿Cuenta con fotografía profesional?
          </FormLabel>
          <Select
            {...register('marketing.hasPhotography')}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText error={!!errors.marketing?.hasPhotography}>
            {errors.marketing?.hasPhotography?.message || " "}
          </FormHelperText>
        </FormControl>

        {hasPhotography === 'Si' && (
          <TextField
            fullWidth
            placeholder="Describa los detalles de la fotografía"
            {...register('marketing.photographyDetails')}
            error={!!errors.marketing?.photographyDetails}
            helperText={errors.marketing?.photographyDetails?.message}
            sx={{ mt: 2 }}
          />
        )}

        <FormControl fullWidth error={!!errors.marketing?.hasInstitutionalExperience}>
          <FormLabel>¿Tiene experiencia institucional?</FormLabel>
          <Select
            {...register('marketing.hasInstitutionalExperience', { required: true })}
            displayEmpty
          >
            <MenuItem value="" disabled>Seleccione una opción</MenuItem>
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText error={!!errors.marketing?.hasInstitutionalExperience}>
            {errors.marketing?.hasInstitutionalExperience?.message || " "}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth error={!!errors.marketing?.hasForcedSalesExperience}>
          <FormLabel>¿Tiene experiencia en ventas forzadas?</FormLabel>
          <Select
            {...register('marketing.hasForcedSalesExperience', { required: true })}
            displayEmpty
          >
            <MenuItem value="" disabled>Seleccione una opción</MenuItem>
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText error={!!errors.marketing?.hasForcedSalesExperience}>
            {errors.marketing?.hasForcedSalesExperience?.message || " "}
          </FormHelperText>
        </FormControl>

        <Box>
          <FormLabel>¿Qué canales digitales utiliza o utilizará?</FormLabel>
          <TextField
            fullWidth
            placeholder="Describa los canales digitales que utiliza"
            {...register('marketing.digitalChannels')}
            error={!!errors.marketing?.digitalChannels}
            helperText={errors.marketing?.digitalChannels?.message}
            multiline
            rows={4}
          />
        </Box>

        <FormControl component="fieldset" error={!!errors.marketing?.leadTrackingMethods}>
          <Typography component="legend" sx={{ color: errors.marketing?.leadTrackingMethods ? 'error.main' : 'inherit' }}>
            ¿Qué métodos utiliza para el seguimiento de leads?
          </Typography>
          <FormGroup>
            {[
              'CRM',
              'Excel',
              'Google Sheets',
              'Sistema Propio',
              'WhatsApp Business',
              'Otros'
            ].map((method) => (
              <FormControlLabel
                key={method}
                control={
                  <Checkbox
                    value={method}
                    {...register('marketing.leadTrackingMethods')}
                    sx={{
                      color: errors.marketing?.leadTrackingMethods ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.marketing?.leadTrackingMethods ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={method}
              />
            ))}
          </FormGroup>
          {errors.marketing?.leadTrackingMethods && (
            <FormHelperText error>{errors.marketing.leadTrackingMethods.message}</FormHelperText>
          )}
        </FormControl>

        {showOtherLeadTrackingMethod && (
          <TextField
            fullWidth
            placeholder="Especifique otros métodos de seguimiento"
            {...register('marketing.otherLeadTrackingMethod')}
            error={!!errors.marketing?.otherLeadTrackingMethod}
            helperText={errors.marketing?.otherLeadTrackingMethod?.message}
            sx={{ mt: 2 }}
          />
        )}
      </Box>
    </Box>
  );
}; 