import SecurityIcon from '@mui/icons-material/Security';
import RuleIcon from '@mui/icons-material/Rule';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { SvgIconComponent } from '@mui/icons-material';

export interface IBenefit {
  icon: SvgIconComponent;
  title: string;
  description: string;
}

export const BENEFITS: IBenefit[] = [
  {
    icon: SecurityIcon,
    title: 'Seguridad en la remuneración del trabajo',
    description: 'Garantizamos pagos seguros y transparentes para todos nuestros asociados'
  },
  {
    icon: RuleIcon,
    title: 'Claridad en las reglas del juego',
    description: 'Establecemos políticas claras y justas para todas las operaciones'
  },
  {
    icon: SupportAgentIcon,
    title: 'Mejora los estándares de servicio al cliente',
    description: 'Elevamos la calidad del servicio inmobiliario profesional'
  },
  {
    icon: HandshakeIcon,
    title: 'Fortalecimiento de relaciones inmobiliarias',
    description: 'Construimos conexiones sólidas entre profesionales del sector'
  }
]; 