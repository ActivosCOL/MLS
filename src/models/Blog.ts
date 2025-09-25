export interface Author {
    id: number;
    name: string;
    email: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

export interface Blog {
    id: number;
    title: string;
    slug: string;
    published_at: string;
    content_image: string | null;
    front_image: string;
    content: string;
    resume: string;
    author: Author;
    category: Category;
    published: boolean;
}

export interface BlogResponse {
    data: Blog[];
} 