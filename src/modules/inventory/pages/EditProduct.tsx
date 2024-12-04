import React, { useEffect, useState } from 'react';
import { Card, Button, Space, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import type { Product } from '../types';

const EditProduct: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // TODO: استبدال هذا بالاتصال بالباك إند
        const fetchProduct = async () => {
            try {
                // محاكاة جلب البيانات
                const dummyProduct: Product = {
                    id: id || '1',
                    code: 'P001',
                    name: 'منتج تجريبي',
                    category: 'عام',
                    unit: 'قطعة',
                    price: 100,
                    cost: 80,
                    quantity: 50,
                    minQuantity: 10,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                setProduct(dummyProduct);
            } catch (error) {
                message.error(t('common.error'));
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, t]);

    const handleSubmit = async (values: Partial<Product>) => {
        try {
            // TODO: استبدال هذا بالاتصال بالباك إند
            console.log('Updating product:', values);
            message.success(t('inventory.products.updateSuccess'));
            navigate('/inventory');
        } catch (error) {
            message.error(t('common.error'));
        }
    };

    const handleCancel = () => {
        navigate('/inventory');
    };

    if (loading) {
        return (
            <Card>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <Spin size="large" />
                </div>
            </Card>
        );
    }

    if (!product) {
        return (
            <Card>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    {t('inventory.products.notFound')}
                </div>
            </Card>
        );
    }

    return (
        <Card
            title={t('inventory.products.edit')}
            extra={
                <Space>
                    <Button onClick={handleCancel}>
                        {t('common.cancel')}
                    </Button>
                    <Button 
                        type="primary" 
                        form="productForm" 
                        htmlType="submit"
                    >
                        {t('common.save')}
                    </Button>
                </Space>
            }
        >
            <ProductForm
                id="productForm"
                initialValues={product}
                onSubmit={handleSubmit}
            />
        </Card>
    );
};

export default EditProduct;
