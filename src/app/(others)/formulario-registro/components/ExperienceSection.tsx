import { 
  Box, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  FormGroup, 
  FormControlLabel, 
  Checkbox, 
  TextField,
  FormHelperText,
  FormLabel
} from '@mui/material';
import React, { useState } from 'react';
import { UseFormRegister, FieldErrors, useWatch, Control, useForm } from 'react-hook-form';
import { FormData } from '../types';

interface ExperienceSectionProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  control: Control<FormData>;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ register, errors, control }) => {
  const [showOtherAssociation, setShowOtherAssociation] = useState(false);
  const hasExclusivity = useWatch({
    control,
    name: 'experience.hasExclusivityExperience'
  });

  const { watch, setValue } = useForm();

  const handleAssociationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const isOther = e.target.value === 'Otra';
    setShowOtherAssociation(isChecked && isOther);
    
    if (isOther) {
      if (isChecked) {
        // Si se marca "Otra", agregar al array si hay un valor
        const otherValue = watch('experience.otherAssociation');
        if (otherValue) {
          const currentAssociations = watch('experience.registeredAssociation') || [];
          setValue('experience.registeredAssociation', [...currentAssociations, otherValue]);
        }
      } else {
        // Si se desmarca "Otra", eliminar el valor personalizado del array
        const currentAssociations = watch('experience.registeredAssociation') || [];
        const filteredAssociations = currentAssociations.filter((assoc: string) => assoc !== watch('experience.otherAssociation'));
        setValue('experience.registeredAssociation', filteredAssociations);
        setValue('experience.otherAssociation', ''); // Limpiar el campo "otra"
      }
    }
  };

  const handleOtherAssociationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const currentAssociations = watch('experience.registeredAssociation') || [];
    const filteredAssociations = currentAssociations.filter((assoc: string) => assoc !== watch('experience.otherAssociation'));
    
    if (value.length <= 1000) {
      setValue('experience.otherAssociation', value);
      
      // Si hay un valor y "Otra" está marcada, agregar al array
      if (value && currentAssociations.includes('Otra')) {
        setValue('experience.registeredAssociation', [...filteredAssociations, value]);
      }
    }
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setValue('experience.yearsInBusiness', '');
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setValue('experience.yearsInBusiness', numValue.toString());
    }
  };

  const handleYearsInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 2) {
      e.target.value = e.target.value.slice(0, 2);
    }
  };

  const handleInventoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setValue('experience.currentInventory', '');
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10000) {
      setValue('experience.currentInventory', numValue.toString());
    }
  };

  const handleExclusivityCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setValue('experience.exclusivityCount', '');
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 10000) {
      setValue('experience.exclusivityCount', numValue.toString());
    }
  };

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
      <Typography variant="h6" sx={{ mb: 3 }}>Experiencia en el Negocio</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography component="legend">¿Cuántos tiempo lleva operando en el sector inmobiliario?</Typography>
        <FormControl fullWidth error={!!errors.experience?.yearsInBusiness}>
          <TextField
            {...register('experience.yearsInBusiness')}
            placeholder="Ingrese el tiempo en el negocio"
            error={!!errors.experience?.yearsInBusiness}
            helperText={errors.experience?.yearsInBusiness?.message}
            type="number"
            onChange={handleYearsChange}
            inputProps={{
              min: 0,
              max: 100,
              onKeyPress: (e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }
            }}
          />
        </FormControl>

        <FormControl fullWidth error={!!errors.experience?.yearsInBusinessType}>
          <Select
            {...register('experience.yearsInBusinessType')}
            displayEmpty
            error={!!errors.experience?.yearsInBusinessType}
          >
            <MenuItem value="" disabled>
              Seleccione el tipo de tiempo
            </MenuItem>
            <MenuItem value="días">Días</MenuItem>
            <MenuItem value="meses">Meses</MenuItem>
            <MenuItem value="años">Años</MenuItem>
          </Select>
          <FormHelperText error={!!errors.experience?.yearsInBusinessType}>
            {errors.experience?.yearsInBusinessType?.message || " "}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" error={!!errors.experience?.propertyTypes}>
          <Typography component="legend" sx={{ color: errors.experience?.propertyTypes ? 'error.main' : 'inherit' }}>
            Tipo de Inmuebles (selección múltiple)
          </Typography>
          <FormGroup>
            {['Casa','Edificio','Local','Lote','Oficinas','Depósito','Garaje','Bodega','Finca','Hotel','Consultorio','Lote condominio','Centro vacacional'].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    value={type}
                    {...register('experience.propertyTypes')}
                    sx={{
                      color: errors.experience?.propertyTypes ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.experience?.propertyTypes ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
          {errors.experience?.propertyTypes && (
            <FormHelperText error>{errors.experience.propertyTypes.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl component="fieldset" error={!!errors.experience?.propertyUses}>
          <Typography component="legend" sx={{ color: errors.experience?.propertyUses ? 'error.main' : 'inherit' }}>
            Tipo de uso (selección múltiple)
          </Typography>
          <FormGroup>
            {['Comercial', 'Industrial', 'Residencial', 'Turistico'].map((use) => (
              <FormControlLabel
                key={use}
                control={
                  <Checkbox
                    value={use}
                    {...register('experience.propertyUses')}
                    sx={{
                      color: errors.experience?.propertyUses ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.experience?.propertyUses ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={use}
              />
            ))}
          </FormGroup>
          {errors.experience?.propertyUses && (
            <FormHelperText error>{errors.experience.propertyUses.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl component="fieldset" error={!!errors.experience?.propertyStratum}>
          <Typography component="legend" sx={{ color: errors.experience?.propertyStratum ? 'error.main' : 'inherit' }}>
            Estrato de los inmuebles (selección múltiple)
          </Typography>
          <FormGroup>
            {['1', '2', '3', '4', '5', '6'].map((stratum) => (
              <FormControlLabel
                key={stratum}
                control={
                  <Checkbox
                    value={stratum}
                    {...register('experience.propertyStratum')}
                    sx={{
                      color: errors.experience?.propertyStratum ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.experience?.propertyStratum ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={`Estrato ${stratum}`}
              />
            ))}
          </FormGroup>
          {errors.experience?.propertyStratum && (
            <FormHelperText error>{errors.experience.propertyStratum.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl component="fieldset" error={!!errors.experience?.propertyLocation}>
          <Typography component="legend" sx={{ color: errors.experience?.propertyLocation ? 'error.main' : 'inherit' }}>
            Tipo de Ubicación de inmuebles (selección múltiple)
          </Typography>
          <FormGroup>
            {['Urbano', 'Rural'].map((location) => (
              <FormControlLabel
                key={location}
                control={
                  <Checkbox
                    value={location}
                    {...register('experience.propertyLocation')}
                    sx={{
                      color: errors.experience?.propertyLocation ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.experience?.propertyLocation ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={location}
              />
            ))}
          </FormGroup>
          {errors.experience?.propertyLocation && (
            <FormHelperText error>{errors.experience.propertyLocation.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl component="fieldset" error={!!errors.experience?.managementType}>
          <Typography component="legend" sx={{ color: errors.experience?.managementType ? 'error.main' : 'inherit' }}>
            Gestión (selección múltiple)
          </Typography>
          <FormGroup>
            {['Arriendo', 'Venta', 'Avalúos'].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    value={type}
                    {...register('experience.managementType')}
                    sx={{
                      color: errors.experience?.managementType ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.experience?.managementType ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
          {errors.experience?.managementType && (
            <FormHelperText error>{errors.experience.managementType.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl component="fieldset" error={!!errors.experience?.registeredAssociation}>
          <Typography component="legend" sx={{ color: errors.experience?.registeredAssociation ? 'error.main' : 'inherit' }}>
            ¿Está registrado en alguna asociación inmobiliaria o cámara gremial?
          </Typography>
          <FormGroup>
            {['Fedelonjas', 'Camacol', 'Lonja bogotá', 'Lonja Medellín antioquia','Lonja Cali valle del cauca','Lonja barranquilla','Otra'].map((association) => (
              <FormControlLabel
                key={association}
                control={
                  <Checkbox
                    value={association}
                    {...register('experience.registeredAssociation')}
                    onChange={handleAssociationChange}
                    sx={{
                      color: errors.experience?.registeredAssociation ? 'error.main' : 'primary.main',
                      '&.Mui-checked': {
                        color: errors.experience?.registeredAssociation ? 'error.main' : 'primary.main',
                      }
                    }}
                  />
                }
                label={association}
              />
            ))}
          </FormGroup>
          {errors.experience?.registeredAssociation && (
            <FormHelperText error>{errors.experience.registeredAssociation.message}</FormHelperText>
          )}
        </FormControl>

        {showOtherAssociation && (
          <TextField
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Especifique la asociación"
            {...register('experience.otherAssociation')}
            onChange={handleOtherAssociationChange}
            error={!!errors.experience?.otherAssociation}
            helperText={errors.experience?.otherAssociation?.message}
            inputProps={{
              maxLength: 1000
            }}
          />
        )}

        <FormControl fullWidth error={!!errors.experience?.hasLicense}>
          <FormLabel required sx={{ color: 'text.primary' }}>¿Cuenta con licencia o registro como agente inmobiliario ante la Cámara de Comercio?</FormLabel>
          <Select
            {...register('experience.hasLicense')}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Seleccione una opción
            </MenuItem>
            <MenuItem value="Si">Sí</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
          <FormHelperText error={!!errors.experience?.hasLicense}>
            {errors.experience?.hasLicense?.message || " "}
          </FormHelperText>
        </FormControl>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1">¿Cuál ha sido su mayor operación inmobiliaria?</Typography>
          <TextField
            fullWidth
            placeholder="Describa la mayor operación realizada"
            {...register('experience.biggestDeal')}
            error={!!errors.experience?.biggestDeal}
            helperText={errors.experience?.biggestDeal?.message}
            inputProps={{
              maxLength: 1000
            }}
          />

          <Typography variant="subtitle1">Describa brevemente su estructura organizacional</Typography>
          <TextField
            fullWidth
            placeholder="Describa la estructura organizacional"
            {...register('experience.organizationalStructure')}
            error={!!errors.experience?.organizationalStructure}
            helperText={errors.experience?.organizationalStructure?.message}
            inputProps={{
              maxLength: 1000
            }}
          />

          <Typography variant="subtitle1">¿Cuántos inmuebles tiene actualmente en su inventario de oferta?</Typography>
          <TextField
            fullWidth
            placeholder="Digite la cantidad de inmuebles en inventario"
            {...register('experience.currentInventory')}
            error={!!errors.experience?.currentInventory}
            helperText={errors.experience?.currentInventory?.message}
            type="number"
            onChange={handleInventoryChange}
            inputProps={{
              min: 0,
              max: 10000,
              onKeyPress: (e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }
            }}
          />

          <FormControl fullWidth error={!!errors.experience?.hasExclusivityExperience}>
            <FormLabel required sx={{ color: errors.experience?.hasExclusivityExperience ? 'error.main' : 'text.primary' }}>
              ¿Ha trabajado anteriormente bajo esquemas de exclusividad?
            </FormLabel>
            <Select
              {...register('experience.hasExclusivityExperience')}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione una opción
              </MenuItem>
              <MenuItem value="Si">Sí</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            <FormHelperText error={!!errors.experience?.hasExclusivityExperience}>
              {errors.experience?.hasExclusivityExperience?.message || " "}
            </FormHelperText>
          </FormControl>

          {hasExclusivity === 'Si' && (
            <TextField
              fullWidth
              placeholder="Indique el número de exclusividades manejadas"
              {...register('experience.exclusivityCount')}
              error={!!errors.experience?.exclusivityCount}
              helperText={errors.experience?.exclusivityCount?.message}
              type="number"
              onChange={handleExclusivityCountChange}
              inputProps={{
                min: 0,
                max: 10000,
                onKeyPress: (e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }
              }}
            />
          )}

          <Typography variant="subtitle1">¿Cuántos inmuebles estaría en capacidad de administrar en exclusividad actualmente?</Typography>
          <TextField
            fullWidth
            placeholder="Escriba la cantidad"
            {...register('experience.exclusivityCapacity')}
            error={!!errors.experience?.exclusivityCapacity}
            helperText={errors.experience?.exclusivityCapacity?.message}
            type="number"
            inputProps={{
                min: 1,
                onKeyPress: (e) => {
                    if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                    }
                }
            }}
          />

          <Typography variant="subtitle1">Inversión en publicidad</Typography>
          <FormControl fullWidth error={!!errors.experience?.advertisingInvestment}>
            <Select
              {...register('experience.advertisingInvestment')}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Seleccione el rango de inversión
              </MenuItem>
              <MenuItem value="0 - 500.000">0 - 500.000</MenuItem>
              <MenuItem value="500.001-1.000.000">500.001-1.000.000</MenuItem>
              <MenuItem value="1.000.001-1.500.000">1.000.001-1.500.000</MenuItem>
              <MenuItem value="1.500.001-2.000.000">1.500.001-2.000.000</MenuItem>
              <MenuItem value="más de 2.000.000">más de 2.000.000</MenuItem>
            </Select>
            {errors.experience?.advertisingInvestment && (
              <FormHelperText>{errors.experience.advertisingInvestment.message}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}; 