import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppstoreOutlined } from '@ant-design/icons';
import ProductList from './pages/ProductList';
import InventoryReport from './pages/InventoryReport';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

export const inventoryRoutes = (
    <Routes>
        <Route path="/inventory" element={<ProductList />} />
        <Route path="/inventory/report" element={<InventoryReport />} />
        <Route path="/inventory/product/add" element={<AddProduct />} />
        <Route path="/inventory/product/edit/:id" element={<EditProduct />} />
    </Routes>
);

export const inventoryMenuItems = [
    {
        key: 'inventory',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: 'inventory-products',
                path: '/inventory',
                i18n: 'inventory.products.title',
            },
            {
                key: 'inventory-report',
                path: '/inventory/report',
                i18n: 'inventory.report.title',
            }
        ],
        i18n: 'inventory.title',
    }
];
