export interface FormData {
    personalData: {
        type: "Natural" | "Juridica";
        name: string;
        documentNumber?: string;
        nit?: string;
        legalRepresentativePhone: string;
        commercialContactName?: string;
        commercialContactPhone?: string;
        operationDepartment: string;
        operationCity: string;
        hasWhatsapp?: "Si" | "No";
        emailName: string;
        domain: string;
        extension: string;
    };
    experience: {
        yearsInBusiness: string;
        yearsInBusinessType: "días" | "meses" | "años";
        propertyTypes: string[];
        propertyUses: string[];
        propertyStratum: string[];
        propertyLocation: string[];
        managementType: string[];
        registeredAssociation: string[];
        otherAssociation?: string;
        hasLicense: "Si" | "No";
        biggestDeal: string;
        organizationalStructure: string;
        currentInventory: string;
        hasExclusivityExperience: "Si" | "No";
        exclusivityCount?: string;
        exclusivityCapacity: string;
        advertisingInvestment: string;
    };
    marketing: {
        hasMarketingTeam: "Si" | "No";
        promotionChannels: string[];
        otherPromotionChannel?: string;
        hasCRM: "Si" | "No";
        crmName?: string;
        hasPhotography: "Si" | "No";
        photographyDetails?: string;
        hasInstitutionalExperience: "Si" | "No";
        hasForcedSalesExperience: "Si" | "No";
        digitalChannels: string;
        leadTrackingMethods: string[];
        otherLeadTrackingMethod?: string;
    };
    authorization: {
        isAuthorized: boolean;
    };
} 