"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ContactSection } from '@/app/(others)/formulario-registro/components/ContactSection';
import { ExperienceSection } from '@/app/(others)/formulario-registro/components/ExperienceSection';
import { MarketingSection } from './components/MarketingSection';
import {
    Box,
    FormControl,
    Select,
    MenuItem,
    Typography,
    FormControlLabel,
    Checkbox,
    Paper,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import { FormData as SharedFormData } from './types';
import axios from 'axios';
import FirstHeader from '@/components/others/FirstHeader';
import Footer from '@/components/Footer';
import { DataPreview } from './components/DataPreview';

// Definición del esquema de validación
const formSchema = z.object({
  personalData: z.object({
    type: z.enum(["Natural", "Juridica"]),
    name: z.string()
      .min(1, "El nombre es requerido")
      .max(100, "El nombre no puede exceder los 100 caracteres"),

    documentNumber: z.string()
      .optional()
      .superRefine((val, ctx) => {
        const type = ctx.path[ctx.path.length - 2] === 'type' ? ctx.path[ctx.path.length - 1] : undefined;
        if (type === "Natural" && val && !/^\d{6,12}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "El número de documento debe tener entre 6 y 12 dígitos"
          });
        }
      }),

    nit: z.string()
      .optional()
      .superRefine((val, ctx) => {
        const type = ctx.path[ctx.path.length - 2] === 'type' ? ctx.path[ctx.path.length - 1] : undefined;
        if (type === "Juridica" && val && !/^\d{9,12}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "El NIT debe tener entre 9 y 12 dígitos"
          });
        }
      }),

    legalRepresentativePhone: z.string()
      .min(1, "El teléfono del representante legal es requerido")
      .refine((val) => /^\d{7,15}$/.test(val), {
        message: "El teléfono debe contener solo números y tener entre 7 y 15 dígitos"
      }),

    commercialContactName: z.string()
      .optional()
      .superRefine((val, ctx) => {
        const type = ctx.path[ctx.path.length - 2] === 'type' ? ctx.path[ctx.path.length - 1] : undefined;
        if (type === "Juridica" && val && val.length > 100) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "El nombre del contacto comercial no puede exceder los 100 caracteres"
          });
        }
      }),

    commercialContactPhone: z.string()
      .optional()
      .superRefine((val, ctx) => {
        const type = ctx.path[ctx.path.length - 2] === 'type' ? ctx.path[ctx.path.length - 1] : undefined;
        if (type === "Juridica" && val && !/^\d{7,15}$/.test(val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "El teléfono del contacto comercial debe contener solo números y tener entre 7 y 15 dígitos"
          });
        }
      }),

    operationDepartment: z.string().min(1, "El departamento es requerido"),
    operationCity: z.string().min(1, "La ciudad de operación es requerida"),
    hasWhatsapp: z.enum(["Si", "No"] as const, {
      required_error: "Por favor seleccione si tiene WhatsApp"
    }).optional(),
    emailName: z.string()
      .min(1, "El correo electrónico es requerido")
      .refine((val) => /^[a-zA-Z0-9._-]+$/.test(val), {
        message: "El nombre de usuario del correo solo puede contener letras, números, puntos, guiones bajos y guiones"
      }),
    domain: z.string()
      .min(1, "El dominio es requerido")
      .refine((val) => /^[a-zA-Z0-9.-]+$/.test(val), {
        message: "El dominio solo puede contener letras, números, puntos y guiones"
      }),
    extension: z.string()
      .min(1, "La extensión es requerida")
      .refine((val) => /^[a-zA-Z]{2,6}$/.test(val), {
        message: "La extensión debe contener solo letras y tener entre 2 y 6 caracteres"
      }),
  }).refine((data) => {
    if (data.type === "Juridica") {
      return !!data.nit && !!data.commercialContactName && !!data.commercialContactPhone;
    }
    return !!data.documentNumber;
  }, {
    message: "Para persona jurídica, NIT, nombre y teléfono del contacto son obligatorios; para natural, el número de documento es obligatorio",
    path: ["nit"]
  }),

  experience: z.object({
    yearsInBusiness: z.string()
      .min(1, "El tiempo de operación es requerido")
      .refine((val) => /^\d+$/.test(val), { message: "Solo se permiten números positivos" })
      .refine((val) => parseInt(val) > 0, { message: "El número debe ser mayor a 0" }),
    yearsInBusinessType: z.enum(["días", "meses", "años"], {
      required_error: "Por favor seleccione el tipo de tiempo",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    propertyTypes: z.array(z.string()).min(1, "Por favor seleccione al menos un tipo de inmueble"),
    propertyUses: z.array(z.string()).min(1, "Por favor seleccione al menos un tipo de uso"),
    propertyStratum: z.array(z.string()).min(1, "Por favor seleccione al menos un estrato"),
    propertyLocation: z.array(z.string()).min(1, "Por favor seleccione al menos un tipo de ubicación"),
    managementType: z.array(z.string()).min(1, "Por favor seleccione al menos un tipo de gestión"),
    registeredAssociation: z.array(z.string()).min(1, "Por favor seleccione al menos una asociación"),
    otherAssociation: z.string().optional()
      .superRefine((val, ctx) => {
        const registeredAssociation = ctx.path[ctx.path.length - 2] === 'registeredAssociation' ? ctx.path[ctx.path.length - 1] : undefined;
        if (Array.isArray(registeredAssociation) && registeredAssociation.includes('Otra') && !val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe especificar la asociación cuando selecciona 'Otra'"
          });
        }
      }),
    hasLicense: z.enum(["Si", "No"], {
      required_error: "Por favor seleccione si tiene licencia de corretaje",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    biggestDeal: z.string().min(1, "La descripción de la mayor operación es requerida"),
    organizationalStructure: z.string().min(1, "La descripción de la estructura organizacional es requerida"),
    currentInventory: z.string()
      .min(1, "El número de inmuebles en inventario es requerido")
      .refine((val) => /^\d+$/.test(val), { message: "Solo se permiten números positivos" })
      .refine((val) => parseInt(val) > 0, { message: "El número debe ser mayor a 0" }),
    hasExclusivityExperience: z.enum(["Si", "No"], {
      required_error: "Por favor seleccione si ha manejado exclusividades",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    exclusivityCount: z.string()
      .transform((val) => (!val || val === "0" ? "0" : val))
      .superRefine((val, ctx) => {
        const hasExclusivityExperience = ctx.path[ctx.path.length - 2] === 'hasExclusivityExperience' ? ctx.path[ctx.path.length - 1] : undefined;
        if (hasExclusivityExperience === "Si" && (val === "0" || !val)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe especificar el número de exclusividades cuando ha manejado exclusividades"
          });
        }
      })
      .refine((val) => /^\d+$/.test(val), { message: "Solo se permiten números positivos" })
      .refine((val) => parseInt(val) >= 0, { message: "El número debe ser mayor o igual a 0" })
      .optional(),
    exclusivityCapacity: z.string()
      .min(1, "La capacidad de administración en exclusividad es requerida")
      .refine((val) => /^\d+$/.test(val), { message: "Solo se permiten números positivos" })
      .refine((val) => parseInt(val) > 0, { message: "El número debe ser mayor a 0" }),
    advertisingInvestment: z.string().min(1, "La inversión publicitaria es requerida"),
  }),

  marketing: z.object({
    hasMarketingTeam: z.enum(["Si", "No"], {
      required_error: "Por favor indique si cuenta con equipo de comercialización",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    promotionChannels: z.array(z.string()).min(1, "Por favor seleccione al menos un medio de promoción"),
    otherPromotionChannel: z.string().optional()
      .superRefine((val, ctx) => {
        const promotionChannels = ctx.path[ctx.path.length - 2] === 'promotionChannels' ? ctx.path[ctx.path.length - 1] : undefined;
        if (Array.isArray(promotionChannels) && promotionChannels.includes('Otros') && !val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe especificar otros medios de promoción cuando selecciona 'Otros'"
          });
        }
      }),
    hasCRM: z.enum(["Si", "No"], {
      required_error: "Por favor indique si cuenta con CRM",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    crmName: z.string().optional()
      .superRefine((val, ctx) => {
        const hasCRM = ctx.path[ctx.path.length - 2] === 'hasCRM' ? ctx.path[ctx.path.length - 1] : undefined;
        if (hasCRM === "Si" && !val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe especificar el nombre del CRM cuando indica que cuenta con uno"
          });
        }
      }),
    hasPhotography: z.enum(["Si", "No"], {
      required_error: "Por favor indique si cuenta con fotografía",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    photographyDetails: z.string().optional()
      .superRefine((val, ctx) => {
        const hasPhotography = ctx.path[ctx.path.length - 2] === 'hasPhotography' ? ctx.path[ctx.path.length - 1] : undefined;
        if (hasPhotography === "Si" && !val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe especificar los detalles de la fotografía cuando indica que cuenta con ella"
          });
        }
      }),
    hasInstitutionalExperience: z.enum(["Si", "No"], {
      required_error: "Por favor indique si tiene experiencia institucional",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    hasForcedSalesExperience: z.enum(["Si", "No"], {
      required_error: "Por favor indique si tiene experiencia en ventas forzadas",
      invalid_type_error: "Por favor seleccione una opción válida"
    }),
    digitalChannels: z.string().min(1, "Por favor describa los canales digitales que utiliza"),
    leadTrackingMethods: z.array(z.string()).min(1, "Por favor seleccione al menos un método de seguimiento"),
    otherLeadTrackingMethod: z.string().optional()
      .superRefine((val, ctx) => {
        const leadTrackingMethods = ctx.path[ctx.path.length - 2] === 'leadTrackingMethods' ? ctx.path[ctx.path.length - 1] : undefined;
        if (Array.isArray(leadTrackingMethods) && leadTrackingMethods.includes('Otros') && !val) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Debe especificar otros métodos de seguimiento cuando selecciona 'Otros'"
          });
        }
      }),
  }),

  authorization: z.object({
    isAuthorized: z.boolean().refine((val) => val === true, {
      message: "Debe autorizar el tratamiento de datos",
    }),
  }),
});

type FormData = z.infer<typeof formSchema> & SharedFormData;

const FormularioRegistroTest = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [showForm, setShowForm] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    control,
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalData: { type: "Natural", hasWhatsapp: "No" },
      experience: { yearsInBusinessType: "años", hasLicense: "No", hasExclusivityExperience: "No", exclusivityCount: "" },
      marketing: { hasMarketingTeam: "No", hasCRM: "No", hasPhotography: "No", hasInstitutionalExperience: "No", hasForcedSalesExperience: "No" },
      authorization: { isAuthorized: false },
    },
    mode: 'onChange'
  });

  const scrollToError = (fieldPath: string) => {
    const element = document.querySelector(`[name="${fieldPath}"]`) as HTMLElement;
    if (element) { element.scrollIntoView({ behavior: 'smooth', block: 'center' }); element.focus(); }
  };

  useEffect(() => {
    const fieldKeys = Object.keys(errors);
    if (fieldKeys.length) scrollToError(fieldKeys[0]);
  }, [errors]);

  const onSubmit = async (data: FormData) => {
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      setSubmitStatus({ success: false, message: "Por favor espere 5 segundos antes de enviar nuevamente" });
      setShowDialog(true);
      return;
    }
    setLastSubmitTime(now);
    setIsSubmitting(true);
    try {
      const parsed = formSchema.safeParse(data);
      if (!parsed.success) {
        setSubmitStatus({
          success: false,
          message: parsed.error.errors.map(e => e.message).join('\n')
        });
        setShowDialog(true);
        return;
      }
      const formattedData = {
        reason_code: "REG-1745476777611692881",
        data: {
          // Datos personales
          nombre_completo_razon_social: data.personalData.name,
          tipo_persona: data.personalData.type === "Juridica" ? "Persona Jurídica" : "Persona Natural",
          nit_cedula: data.personalData.type === "Juridica" ? data.personalData.nit : data.personalData.documentNumber,
          representante_legal: data.personalData.type === "Juridica" ? data.personalData.name : "",
          telefono_representante_legal: data.personalData.legalRepresentativePhone,
          ciudad_operacion_principal: data.personalData.operationCity,
          departamento_operacion: data.personalData.operationDepartment,
          telefono_contacto: data.personalData.type === "Natural" ? data.personalData.legalRepresentativePhone : "",
          tiene_whatsapp: data.personalData.hasWhatsapp === "Si",
          persona_contacto_comercial: data.personalData.commercialContactName,
          telefono_contacto_comercial: data.personalData.commercialContactPhone,
          correo_electronico: `${data.personalData.emailName}@${data.personalData.domain}.${data.personalData.extension}`,

          // Experiencia
          anios_experiencia: parseInt(data.experience.yearsInBusiness) || 0,
          anios_experiencia_type: data.experience.yearsInBusinessType,
          nicho_mercado: data.experience.propertyTypes.join(", "),
          tipo_inmuebles: data.experience.propertyTypes.join(", "),
          tipo_uso: data.experience.propertyUses.join(", "),
          estrato_inmuebles: data.experience.propertyStratum.join(", "),
          ubicacion_inmuebles: data.experience.propertyLocation.join(", "),
          gestion_inmuebles: data.experience.managementType.join(", "),
          registrado_asociacion: data.experience.registeredAssociation.length > 0,
          nombre_asociacion: data.experience.registeredAssociation.join(", "),
          otra_asociacion: data.experience.otherAssociation || "",
          licencia_agente: data.experience.hasLicense === "Si",
          mayor_operacion: data.experience.biggestDeal,
          estructura_organizacional: data.experience.organizationalStructure,
          inmuebles_en_inventario: parseInt(data.experience.currentInventory) || 0,
          experiencia_exclusividad: data.experience.hasExclusivityExperience === "Si",
          inmuebles_exclusividad: parseInt(data.experience.exclusivityCount || "0") || 0,
          capacidad_administrar_exclusivos: data.experience.exclusivityCapacity,
          inversion_publicitaria: data.experience.advertisingInvestment,

          // Marketing
          equipo_comercializacion: data.marketing.hasMarketingTeam === "Si",
          medios_promocion: data.marketing.promotionChannels.join(", "),
          otros_medios_promocion: data.marketing.otherPromotionChannel || "",
          enlaces_digitales: data.marketing.digitalChannels,
          uso_crm: data.marketing.hasCRM === "Si",
          nombre_crm: data.marketing.crmName || "",
          seguimiento_leads: data.marketing.leadTrackingMethods.join(", "),
          otros_metodos_seguimiento: data.marketing.otherLeadTrackingMethod || "",
          fotografia_profesional: data.marketing.hasPhotography === "Si",
          detalle_fotografia: data.marketing.photographyDetails || "",
          experiencia_institucional: data.marketing.hasInstitutionalExperience === "Si",
          experiencia_ventas_forzadas: data.marketing.hasForcedSalesExperience === "Si",
          autorizacion_datos: data.authorization.isAuthorized,
          comentarios_adicionales: ""
        }
      };

      const resp = await axios.post('http://86.48.23.231:8881/v2/email-forms/submit', formattedData, {
        headers: { 
          'Content-Type': 'application/json',
          'X-License-Key': 'AAAAAAAAAAAAAAAAEvvVEw0tkvQhwTjvCCzhOhqfPAk5uFMOwVMGh+5S2g==' 
        },
        timeout: 10000
      });

      if (resp.status !== 200) throw new Error(`Error ${resp.status}`);
      setSubmitStatus({ success: true, message: "Formulario enviado exitosamente" });
      setShowDialog(true);
      setShowForm(false);
      reset();
    } catch (err: any) {
      let msg = "Error al enviar el formulario. Por favor, intente nuevamente.";
      if (axios.isAxiosError(err)) {
        if (err.response) {
          console.error('Error del servidor:', err.response.data);
          msg = `Error del servidor (${err.response.status}): ${err.response.data.message || 'Error desconocido'}`;
        } else if (err.code === 'ECONNABORTED') {
          msg = "La solicitud tardó demasiado.";
        } else {
          msg = "No se recibió respuesta del servidor.";
        }
      }
      setSubmitStatus({ success: false, message: msg });
      setShowDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    if (submitStatus?.success) {
      setSubmitStatus(null);
    }
  };

  const handlePreview = () => {
    const currentData = getValues();
    setFormData(currentData);
    setShowPreview(true);
  };

  const personType = watch("personalData.type");

  return (
    <>
      <FirstHeader />
      <div className="max-w-4xl mx-auto p-6">
        {showForm ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tipo de Persona */}
            <Box sx={{ bgcolor: 'white', p: 3, borderRadius: 1, boxShadow: 1 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Tipo de Persona</Typography>
              <FormControl fullWidth>
                <Select {...register("personalData.type")} defaultValue="Natural">
                  <MenuItem value="Natural">Persona Natural</MenuItem>
                  <MenuItem value="Juridica">Persona Jurídica</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <ContactSection register={register} errors={errors} personType={personType} />
            <ExperienceSection register={register} errors={errors} control={control} />
            <MarketingSection register={register} errors={errors} control={control} />

            {/* Autorización */}
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2, backgroundColor: 'white' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>Autorización de tratamiento de datos personales y consulta en bases reguladas</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" sx={{ mb: 2 }}>
                Autorización para el tratamiento de datos personales y verificación en listas restrictivas
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Declaro que he sido informado(a) de que:
              </Typography>
              <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                <ul>
                  <li>1. Los datos personales recolectados a través del presente formulario serán tratados conforme a lo dispuesto en la Ley 1581 de 2012, el Decreto 1377 de 2013, y demás normas concordantes sobre protección de datos personales en Colombia.</li>
                  <li>2. El tratamiento de datos será realizado por Activos por Colombia S.A.S., con la finalidad de evaluar mi idoneidad para participar en el proyecto de comercialización de activos.</li>
                  <li>3. Autorizo expresamente a Activos por Colombia a consultar mis datos en listas de prevención de lavado de activos y financiación del terrorismo, tales como SAGRILAFT y SARLAFT, así como otras bases de datos públicas o privadas que permitan verificar antecedentes comerciales, contractuales o legales necesarios para la vinculación.</li>
                </ul>
              </Typography>
              <FormControl error={!!errors.authorization?.isAuthorized}>
                <FormControlLabel
                  control={<Checkbox {...register("authorization.isAuthorized")} color="primary" />}
                  label="Acepto el tratamiento de mis datos personales"
                />
                {errors.authorization?.isAuthorized && (
                  <Typography color="error" variant="caption">
                    {errors.authorization.isAuthorized.message}
                  </Typography>
                )}
              </FormControl>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              {/* <Button
                variant="outlined"
                onClick={handlePreview}
                disabled={!isDirty}
              >
                Vista Previa
              </Button> */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 px-4 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-[#151555] text-white'}`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
              </button>
            </Box>
          </form>
        ) : (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            <Typography variant="h4" color="success.main">¡Gracias!</Typography>
            <Typography>Hemos recibido tu información.</Typography>
            <Button onClick={() => { setShowForm(true); reset(); }}>Enviar otro</Button>
          </Box>
        )}

        <Dialog open={showDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>{submitStatus?.success ? "¡Éxito!" : "Error"}</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ whiteSpace: 'pre-line', color: submitStatus?.success ? 'success.main' : 'error.main' }}>
              {submitStatus?.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color={submitStatus?.success ? "success" : "error"}>Cerrar</Button>
          </DialogActions>
        </Dialog>

        <Dialog 
          open={showPreview} 
          onClose={() => setShowPreview(false)} 
          fullWidth 
          maxWidth="md"
        >
          <DialogContent>
            {formData && <DataPreview data={formData} onClose={() => setShowPreview(false)} />}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default FormularioRegistroTest;
