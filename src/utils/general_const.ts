/**
 * Constantes generales de la aplicación
 * Aquí se almacenan datos de contacto, información de la empresa y otras constantes globales
 */

export const CONTACT_INFO = {
  WHATSAPP: '+34612345678',
  EMAIL: 'info@lalonja.com',
  PHONE: '+34912345678',
  ADDRESS: 'Calle Principal, 123, 28001 Madrid',
} as const;

export const SOCIAL_MEDIA = {
  INSTAGRAM: 'https://instagram.com/lalonja',
  FACEBOOK: 'https://facebook.com/lalonja',
  TWITTER: 'https://twitter.com/lalonja',
} as const;

export const BUSINESS_INFO = {
  NAME: 'La Lonja',
  DESCRIPTION: 'Tu mercado local de confianza',
  SCHEDULE: {
    WEEKDAYS: '09:00 - 21:00',
    WEEKEND: '10:00 - 20:00',
  },
} as const;
