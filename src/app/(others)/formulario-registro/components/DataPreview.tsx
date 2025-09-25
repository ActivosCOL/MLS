import { Box, Typography, Paper, Button } from '@mui/material';
import { FormData } from '../types';

interface DataPreviewProps {
  data: FormData;
  onClose: () => void;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data, onClose }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, maxHeight: '80vh', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Vista Previa de Datos</Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Datos Personales</Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(data.personalData, null, 2)}
        </pre>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Experiencia</Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(data.experience, null, 2)}
        </pre>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Marketing</Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(data.marketing, null, 2)}
        </pre>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Autorización</Typography>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(data.authorization, null, 2)}
        </pre>
      </Box>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={onClose}
        sx={{ mt: 2 }}
      >
        Cerrar
      </Button>
    </Paper>
  );
}; 