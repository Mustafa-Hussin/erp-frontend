import React from 'react';
import { Card, Button, Space, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import type { Product } from '../types';

const AddProduct: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleSubmit = async (values: Partial<Product>) => {
        try {
            // TODO: استبدال هذا بالاتصال بالباك إند
            console.log('Adding product:', values);
            message.success(t('inventory.products.addSuccess'));
            navigate('/inventory');
        } catch (error) {
            message.error(t('common.error'));
        }
    };

    const handleCancel = () => {
        navigate('/inventory');
    };

    return (
        <Card
            title={t('inventory.products.add')}
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
                onSubmit={handleSubmit}
            />
        </Card>
    );
};

export default AddProduct;
