import React, { useState } from 'react';
import { Card, Table, Input, Space, Tag, Row, Col, Statistic, Select } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import type { Product } from '../types';

const { Option } = Select;

const InventoryReport: React.FC = () => {
    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');

    // سيتم استبدال هذه البيانات بالبيانات الفعلية من الباك إند
    const summaryData = {
        openingInventoryValue: 1007055.00,
        currentInventoryValue: 1082929.70,
        potentialProfit: 75874.70,
        profitMargin: 7.01
    };

    const columns = [
        {
            title: 'SKU',
            dataIndex: 'sku',
            key: 'sku',
            width: 120,
        },
        {
            title: t('inventory.report.product'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('inventory.report.category'),
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: t('inventory.report.branch'),
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: t('inventory.report.sellingPrice'),
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            render: (price: number) => `${price.toFixed(2)} ${t('common.currency')}`,
            align: 'right' as const,
        },
        {
            title: t('inventory.report.currentStock'),
            dataIndex: 'currentStock',
            key: 'currentStock',
            align: 'right' as const,
        },
        {
            title: t('inventory.report.currentValue'),
            dataIndex: 'currentValue',
            key: 'currentValue',
            render: (value: number) => `${value.toFixed(2)} ${t('common.currency')}`,
            align: 'right' as const,
        },
        {
            title: t('inventory.report.potentialValue'),
            dataIndex: 'potentialValue',
            key: 'potentialValue',
            render: (value: number) => `${value.toFixed(2)} ${t('common.currency')}`,
            align: 'right' as const,
        },
        {
            title: t('inventory.report.allocatedUnits'),
            dataIndex: 'allocatedUnits',
            key: 'allocatedUnits',
            align: 'right' as const,
        },
        {
            title: t('inventory.report.requestedUnits'),
            dataIndex: 'requestedUnits',
            key: 'requestedUnits',
            align: 'right' as const,
        }
    ];

    const dummyData = [
        {
            key: '1',
            sku: '0001',
            name: 'الزيتون البكر',
            category: 'زيتون',
            branch: 'karim',
            sellingPrice: 2300.00,
            currentStock: 50.00,
            currentValue: 100000.00,
            potentialValue: 115000.00,
            allocatedUnits: 0,
            requestedUnits: 0
        },
        // يمكن إضافة المزيد من البيانات هنا
    ];

    return (
        <div className="inventory-report">
            <Card title={t('inventory.report.title')}>
                {/* إحصائيات ملخص المخزون */}
                <Row gutter={16} className="summary-statistics">
                    <Col span={6}>
                        <Statistic
                            title={t('inventory.report.openingValue')}
                            value={summaryData.openingInventoryValue}
                            precision={2}
                            suffix={t('common.currency')}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title={t('inventory.report.currentValue')}
                            value={summaryData.currentInventoryValue}
                            precision={2}
                            suffix={t('common.currency')}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title={t('inventory.report.potentialProfit')}
                            value={summaryData.potentialProfit}
                            precision={2}
                            suffix={t('common.currency')}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Col>
                    <Col span={6}>
                        <Statistic
                            title={t('inventory.report.profitMargin')}
                            value={summaryData.profitMargin}
                            precision={2}
                            suffix="%"
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Col>
                </Row>

                {/* أدوات البحث والفلترة */}
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder={t('common.search')}
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Select defaultValue="all" style={{ width: 120 }}>
                        <Option value="all">{t('common.all')}</Option>
                        <Option value="low">{t('inventory.status.low')}</Option>
                        <Option value="out">{t('inventory.status.out')}</Option>
                    </Select>
                </Space>

                {/* جدول المخزون */}
                <Table
                    columns={columns}
                    dataSource={dummyData}
                    scroll={{ x: 1500 }}
                    pagination={{
                        total: dummyData.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => t('common.totalItems', { total }),
                    }}
                />
            </Card>
        </div>
    );
};

export default InventoryReport;
