export interface Partner {
    id: number;
    name: string;
    image: string;
    website: string;
}

export interface PartnersResponse {
    data: Partner[];
} 