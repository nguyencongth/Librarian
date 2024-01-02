export interface Book {
    id: number;
    categoryId: number;
    name: string;
    quantity: number;
    quantityBorrow?: number;
    status?: string;
}