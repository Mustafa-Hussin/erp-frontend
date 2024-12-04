import React from 'react';
import { Form, Input, InputNumber, Select, Switch, Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { Product } from '../types';

interface ProductFormProps {
    initialValues?: Partial<Product>;
    onSubmit: (values: Partial<Product>) => void;
    id?: string; 
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, id }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        onSubmit(values);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={handleSubmit}
            id={id} 
        >
            <Form.Item
                name="code"
                label={t('inventory.product.code')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="name"
                label={t('inventory.product.name')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="description"
                label={t('inventory.product.description')}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="category"
                label={t('inventory.product.category')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <Select>
                    <Select.Option value="general">{t('inventory.categories.general')}</Select.Option>
                    {/* سيتم إضافة المزيد من الفئات لاحقاً */}
                </Select>
            </Form.Item>

            <Form.Item
                name="unit"
                label={t('inventory.product.unit')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <Select>
                    <Select.Option value="piece">{t('inventory.units.piece')}</Select.Option>
                    <Select.Option value="kg">{t('inventory.units.kg')}</Select.Option>
                    <Select.Option value="meter">{t('inventory.units.meter')}</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="price"
                label={t('inventory.product.price')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    addonAfter={t('common.currency')}
                />
            </Form.Item>

            <Form.Item
                name="cost"
                label={t('inventory.product.cost')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <InputNumber
                    min={0}
                    precision={2}
                    style={{ width: '100%' }}
                    addonAfter={t('common.currency')}
                />
            </Form.Item>

            <Form.Item
                name="quantity"
                label={t('inventory.product.quantity')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="minQuantity"
                label={t('inventory.product.minQuantity')}
                rules={[{ required: true, message: t('validation.required') }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                name="barcode"
                label={t('inventory.product.barcode')}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="image"
                label={t('inventory.product.image')}
                valuePropName="fileList"
                getValueFromEvent={(e) => {
                    if (Array.isArray(e)) return e;
                    return e?.fileList;
                }}
            >
                <Upload
                    listType="picture-card"
                    maxCount={1}
                    beforeUpload={() => false}
                >
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>{t('common.upload')}</div>
                    </div>
                </Upload>
            </Form.Item>

            <Form.Item
                name="isActive"
                label={t('inventory.product.isActive')}
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
        </Form>
    );
};

export default ProductForm;
