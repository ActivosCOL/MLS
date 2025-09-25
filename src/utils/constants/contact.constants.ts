import { SvgIconProps } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

interface ContactItem {
  title: string;
  IconComponent: React.ComponentType<SvgIconProps>;
  content: string[];
}

export const CONTACT_DATA: ContactItem[] = [
  {
    title: 'Visítanos',
    IconComponent: LocationOnIcon,
    content: [
      'Edificio Plaza de mercado',
      'Calle 11 #9-163, Local 16',
      'Santa Marta, Magdalena'
    ]
  },
  {
    title: 'Llámanos',
    IconComponent: PhoneIcon,
    content: [
      '(57) 300 423 8000',
      '(57) 320 573 4433'
    ]
  },
  {
    title: 'Escríbenos',
    IconComponent: EmailIcon,
    content: [
      'lonjadesantamarta@gmail.com'
    ]
  }
];

export const CONTACT_CONTENT = {
  LOCATION: {
    address: [
      'CRA 53 64-98 LOCAL 1 B/quilla'
    ]
  },
  PHONE: {
    numbers: [
      ' +57 (311) 676 74 47'

    ]
  },
  EMAIL: {
    address: [
      'info@activosporcolombia.com'
    ]
  }
}; 