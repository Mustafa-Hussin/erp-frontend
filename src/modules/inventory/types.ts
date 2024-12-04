export interface Product {
    id: string;
    code: string;
    name: string;
    description?: string;
    category: string;
    unit: string;
    price: number;
    cost: number;
    quantity: number;
    minQuantity: number;
    barcode?: string;
    image?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    parentId?: string;
    isActive: boolean;
}

export interface StockMovement {
    id: string;
    productId: string;
    type: 'IN' | 'OUT' | 'ADJUST';
    quantity: number;
    reference: string;
    notes?: string;
    date: Date;
}

export interface InventoryCount {
    id: string;
    date: Date;
    status: 'DRAFT' | 'IN_PROGRESS' | 'COMPLETED';
    notes?: string;
    items: InventoryCountItem[];
}

export interface InventoryCountItem {
    productId: string;
    expectedQuantity: number;
    actualQuantity: number;
    difference: number;
    notes?: string;
}
