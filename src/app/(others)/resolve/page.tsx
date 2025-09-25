'use client'


import { useState } from 'react'
import axios from 'axios'

import FirstHeader from '@/components/others/FirstHeader'
import CurrentTopic from '@/components/others/form/CurrentTopic'
import LogoHeader from '@/components/others/LogoHeader'
import StepperTemplate from '@/components/others/form/StepperTemplate'
import DataAuthorization from '@/components/others/form-section/5DataAutorization'
import CommercializationForm from '@/components/others/form-section/4ComercializationInfo'
import ExperienceAndFocusBroker from '@/components/others/form-section/3ExperienceAndFocusBroker'
import InfoPeople from '@/components/others/form-section/2InfoPeople'

interface FormData {
    personalData?: {
        type: "Natural" | "Juridica" | null;
        selectedDepartments: string[];
        selectedCities: string[];
        hasWhatsapp: string | null;
        emailName: string;
        domain: string;
        customDomain: string;
        extension: string;
        customExtension: string;
        documentNumber?: string;
        name?: string;
        phoneNumber?: string;
        nit?: string;
        legalRepresentativeName?: string;
        legalRepresentativePhone?: string;
        commercialContactName?: string;
        commercialContactPhone?: string;
    };
    commercialization: {
        hasEquipment?: boolean | null;
        hasCRM?: boolean | null;
        crmName?: string;
        hasPhotography?: boolean | null;
        photographyDetails?: string;
        hasInstitutionalExperience?: boolean | null;
        hasForcedSalesExperience?: boolean | null;
        promotionChannels?: string[];
        otherPromotionChannel?: string;
        digitalChannels?: string;
        leadTracking?: string[];
        otherLeadTracking?: string;
    };
    authorization: {
        isAuthorized?: boolean;
    };
    experience: {
        yearsInBusiness?: number | null;
        otherYears?: number | null;
        seniority?: string;
        propertyTypes?: string[];
        propertyUses?: string[];
        propertyStratum?: number[];
        propertyLocation?: string[];
        managementType?: string[];
        registeredAssociation?: string[];
        hasLicense?: string | null;
        biggestDeal?: string;
        organizationalStructure?: string;
        currentInventory?: number | null;
        hasExclusivityExperience?: string | null;
        exclusivityCount?: number | null;
        exclusivityCapacity?: number | null;
        advertisingInvestment?: string;
    };
}


const FormPage = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        commercialization: {},
        authorization: {},
        experience: {}
    })
    const [isValid, setIsValid] = useState(false)
    const [validationMessage, setValidationMessage] = useState("")
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [totalQuestions, setTotalQuestions] = useState(0)

    const handleDataChange = (stepData: Partial<FormData[keyof FormData]>, stepName: keyof FormData) => {
        setFormData(prev => ({
            ...prev,
            [stepName]: { ...prev[stepName], ...stepData }
        }))
    }

    const handleValidationChange = (valid: boolean, message: string = "") => {
        setIsValid(valid)
        setValidationMessage(message)
    }

    const validateExperienceForm = (data: FormData['experience']) => {
        if (!data.yearsInBusiness && !data.otherYears) {
            return { valid: false, message: "Debe seleccionar los años de experiencia" };
        }
        if (!data.propertyTypes || data.propertyTypes.length === 0) {
            return { valid: false, message: "Debe seleccionar al menos un tipo de inmueble" };
        }
        if (!data.propertyUses || data.propertyUses.length === 0) {
            return { valid: false, message: "Debe seleccionar al menos un tipo de uso" };
        }
        if (!data.propertyStratum || data.propertyStratum.length === 0) {
            return { valid: false, message: "Debe seleccionar al menos un estrato" };
        }
        if (!data.propertyLocation || data.propertyLocation.length === 0) {
            return { valid: false, message: "Debe seleccionar al menos una ubicación" };
        }
        if (!data.managementType || data.managementType.length === 0) {
            return { valid: false, message: "Debe seleccionar al menos un tipo de gestión" };
        }
        if (!data.hasLicense) {
            return { valid: false, message: "Debe indicar si cuenta con licencia" };
        }
        if (!data.biggestDeal) {
            return { valid: false, message: "Debe describir su mayor operación" };
        }
        if (!data.organizationalStructure) {
            return { valid: false, message: "Debe describir su estructura organizacional" };
        }
        if (!data.currentInventory) {
            return { valid: false, message: "Debe indicar su inventario actual" };
        }
        if (!data.hasExclusivityExperience) {
            return { valid: false, message: "Debe indicar si tiene experiencia en exclusividad" };
        }
        if (data.hasExclusivityExperience === "Sí" && !data.exclusivityCount) {
            return { valid: false, message: "Debe indicar el número de inmuebles en exclusividad" };
        }
        if (!data.exclusivityCapacity) {
            return { valid: false, message: "Debe indicar su capacidad de administración en exclusividad" };
        }
        if (!data.advertisingInvestment) {
            return { valid: false, message: "Debe seleccionar su inversión publicitaria" };
        }
        return { valid: true, message: "" };
    }

    const formComponents = [
        {
            title: "Información personal",
            name: "personalData",
            component: (
                <InfoPeople
                    key="personalData"
                    onDataChange={(data) => handleDataChange(data, "personalData")}
                    onValidationChange={handleValidationChange}
                    initialData={formData.personalData}
                    setTotalQuestions={setTotalQuestions}
                    setCurrentQuestion={setCurrentQuestion}
                />
            )
        },
        {
            title: "Experiencia y enfoque del broker",
            name: "experience",
            component: (
                <ExperienceAndFocusBroker
                    key="experience"
                    onDataChange={(data) => handleDataChange(data, "experience")}
                    onValidationChange={handleValidationChange}
                    initialData={formData.experience}
                    setTotalQuestions={setTotalQuestions}
                    setCurrentQuestion={setCurrentQuestion}
                />
            )
        },
        {
            title: "Información de comercialización",
            name: "commercialization",
            component: (
                <CommercializationForm
                    key="commercialization"
                    onDataChange={(data) => handleDataChange(data, "commercialization")}
                    onValidationChange={handleValidationChange}
                    initialData={formData.commercialization}
                    setTotalQuestions={setTotalQuestions}
                    setCurrentQuestion={setCurrentQuestion}
                />
            )
        },
        {
            title: "Autorización de tratamiento dse datos personales y consulta en bases reguladas",
            name: "authorization",
            component: (
                <DataAuthorization
                    key="authorization"
                    onDataChange={(data) => handleDataChange(data, "authorization")}
                    onValidationChange={handleValidationChange}
                    initialData={formData.authorization}
                    setTotalQuestions={setTotalQuestions}
                    setCurrentQuestion={setCurrentQuestion}
                />
            )
        }
    ]

    const handleNext = () => {
        if (currentStep < formComponents.length - 1 && isValid) {
            setCurrentStep(prev => prev + 1)
            setIsValid(false)
            setValidationMessage("")
            setCurrentQuestion(1)
            setTotalQuestions(0)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1)
            setIsValid(true)
            setValidationMessage("")
            setCurrentQuestion(1)
            setTotalQuestions(0)
        }
    }

    const submitForm = async (data: FormData) => {
        try {
            const formattedData = {
                reason_code: "REG-1745476777611692881",
                data: {
                    nombre_completo_razon_social: data.personalData?.type === "Juridica"
                        ? data.personalData.name
                        : data.personalData?.legalRepresentativeName,
                    tipo_persona: data.personalData?.type === "Juridica" ? "Persona Jurídica" : "Persona Natural",
                    nit_cedula: data.personalData?.type === "Juridica"
                        ? data.personalData.nit
                        : data.personalData?.documentNumber,
                    representante_legal: data.personalData?.legalRepresentativeName,
                    telefono_representante_legal: data.personalData?.legalRepresentativePhone,
                    ciudad_operacion_principal: data.personalData?.selectedCities[0],
                    telefono_contacto: data.personalData?.phoneNumber,
                    tiene_whatsapp: data.personalData?.hasWhatsapp === "Si",
                    persona_contacto_comercial: data.personalData?.commercialContactName,
                    telefono_contacto_comercial: data.personalData?.commercialContactPhone,
                    correo_electronico: `${data.personalData?.emailName}@${data.personalData?.customDomain || data.personalData?.domain}.${data.personalData?.customExtension || data.personalData?.extension}`,

                    anios_experiencia: data.experience?.yearsInBusiness || data.experience?.otherYears,
                    anios_experiencia_type: data.experience?.seniority || "año(s)",

                    nicho_mercado: data.experience?.propertyTypes?.join(", "),
                    tipo_inmuebles: data.experience?.propertyTypes?.join(", "),
                    tipo_uso: data.experience?.propertyUses?.join(", "),
                    estrato_inmuebles: data.experience?.propertyStratum?.join(", "),
                    ubicacion_inmuebles: data.experience?.propertyLocation?.join(", "),
                    gestion_inmuebles: data.experience?.managementType?.join(", "),

                    registrado_asociacion: (data.experience?.registeredAssociation?.length ?? 0) > 0,
                    nombre_asociacion: data.experience?.registeredAssociation?.join(", "),
                    licencia_agente: data.experience?.hasLicense === "Sí",
                    mayor_operacion: data.experience?.biggestDeal,
                    estructura_organizacional: data.experience?.organizationalStructure,
                    inmuebles_en_inventario: data.experience?.currentInventory,
                    experiencia_exclusividad: data.experience?.hasExclusivityExperience === "Sí",
                    inmuebles_exclusividad: data.experience?.exclusivityCount ?? 0,
                    capacidad_administrar_exclusivos: data.experience?.exclusivityCapacity?.toString(),
                    inversion_publicitaria: data.experience?.advertisingInvestment,

                    equipo_comercializacion: data.commercialization?.hasEquipment,
                    medios_promocion: data.commercialization?.promotionChannels?.join(", "),
                    enlaces_digitales: data.commercialization?.digitalChannels,
                    uso_crm: data.commercialization?.hasCRM,
                    nombre_crm: data.commercialization?.crmName,
                    seguimiento_leads: data.commercialization?.leadTracking?.join(", "),
                    fotografia_profesional: data.commercialization?.hasPhotography,
                    detalle_fotografia: data.commercialization?.photographyDetails,
                    experiencia_institucional: data.commercialization?.hasInstitutionalExperience,
                    experiencia_ventas_forzadas: data.commercialization?.hasForcedSalesExperience,
                    autorizacion_datos: data.authorization?.isAuthorized,
                    comentarios_adicionales: ""
                }
            };

            const response = await axios.post('http://86.48.23.231:8881/v2/email-forms/submit', formattedData, {
                headers: {
                    'X-License-Key': 'AAAAAAAAAAAAAAAAEvvVEw0tkvQhwTjvCCzhOhqfPAk5uFMOwVMGh+5S2g=='
                }
            });
            console.log('Respuesta del servidor:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            throw error;
        }
    };

    const handleFinish = async () => {
        try {
            await submitForm(formData);
            console.log('Formulario completado y enviado:', formData);
            setCurrentStep(0);
            setFormData({
                commercialization: {},
                authorization: {},
                experience: {}
            });
            setIsValid(false);
            setValidationMessage("");
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setValidationMessage("Error al enviar el formulario. Por favor, intente nuevamente.");
        }
    };

    return (
       /*  <div className="w-full">
            <FirstHeader />
            <LogoHeader />
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <h1 className="text-2xl font-bold text-center mb-4">Lo sentimos</h1>
                <p className="text-lg text-center text-gray-600">
                    Estamos teniendo problemas técnicos. Pronto estará este formulario activo nuevamente.
                </p>
            </div>
        </div> */
          <div className="w-full">
             <FirstHeader />
 
             <LogoHeader />
             <CurrentTopic title={formComponents[currentStep].title} />
             <StepperTemplate
                 totalSteps={formComponents.length}
                 currentStep={currentStep + 1}
                 dynamicComponent={formComponents[currentStep].component}
                 onNext={handleNext}
                 onPrevious={handlePrevious}
                 onFinish={handleFinish}
                 isValid={isValid}
                 validationMessage={validationMessage}
                 totalQuestions={totalQuestions}
                 currentQuestion={currentQuestion}
                 formData={formData}
             />
 
         </div> 
    )
}

export default FormPage