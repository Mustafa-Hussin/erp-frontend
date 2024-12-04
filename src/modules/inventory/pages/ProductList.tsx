import React, { useState } from 'react';
import { Table, Card, Button, Input, Space, Tag, Tooltip, Modal, DatePicker, Select, Row, Col, Statistic } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, BarcodeOutlined, DownloadOutlined, FilterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import type { Product } from '../types';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ProductList: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);

    // بيانات الإحصائيات
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
            width: 100,
        },
        {
            title: t('inventory.products.name'),
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: t('inventory.products.category'),
            dataIndex: 'category',
            key: 'category',
            width: 150,
        },
        {
            title: t('inventory.products.branch'),
            dataIndex: 'branch',
            key: 'branch',
            width: 100,
        },
        {
            title: t('inventory.products.sellingPrice'),
            dataIndex: 'sellingPrice',
            key: 'sellingPrice',
            width: 120,
            align: 'right' as const,
            render: (price: number) => `${price.toFixed(2)} ${t('common.currency')}`,
        },
        {
            title: t('inventory.products.currentStock'),
            dataIndex: 'currentStock',
            key: 'currentStock',
            width: 100,
            align: 'right' as const,
        },
        {
            title: t('inventory.products.currentValue'),
            dataIndex: 'currentValue',
            key: 'currentValue',
            width: 150,
            align: 'right' as const,
            render: (value: number) => `${value.toFixed(2)} ${t('common.currency')}`,
        },
        {
            title: t('inventory.products.potentialValue'),
            dataIndex: 'potentialValue',
            key: 'potentialValue',
            width: 150,
            align: 'right' as const,
            render: (value: number) => `${value.toFixed(2)} ${t('common.currency')}`,
        },
        {
            title: t('inventory.products.allocatedUnits'),
            dataIndex: 'allocatedUnits',
            key: 'allocatedUnits',
            width: 120,
            align: 'right' as const,
        },
        {
            title: t('inventory.products.requestedUnits'),
            dataIndex: 'requestedUnits',
            key: 'requestedUnits',
            width: 120,
            align: 'right' as const,
        }
    ];

    // بيانات تجريبية تشبه الصورة
    const dummyData = [
        {
            key: '0001',
            sku: '5487FB8/18',
            name: 'الزيتون البكر الممتاز',
            category: 'الزيتون',
            branch: 'karim',
            sellingPrice: 2300.00,
            currentStock: 50.00,
            currentValue: 100000.00,
            potentialValue: 115000.00,
            allocatedUnits: 0,
            requestedUnits: 0
        },
        // المزيد من البيانات التجريبية مشابهة للصورة
    ];

    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(dummyData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Products");
        XLSX.writeFile(wb, "inventory-report.xlsx");
    };

    return (
        <div className="inventory-list">
            {/* إحصائيات المخزون */}
            <Card className="statistics-card">
                <Row gutter={24}>
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
                            title="Profit Margin"
                            value={summaryData.profitMargin}
                            precision={2}
                            suffix="%"
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Col>
                </Row>
            </Card>

            {/* أدوات البحث والفلترة */}
            <Card 
                title={t('inventory.products.title')}
                className="inventory-table-card"
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<DownloadOutlined />}
                            onClick={handleExportExcel}
                        >
                            {t('common.export')}
                        </Button>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => navigate('/inventory/product/add')}
                        >
                            {t('inventory.products.add')}
                        </Button>
                    </Space>
                }
            >
                <Row gutter={16} className="filter-row">
                    <Col span={8}>
                        <Input
                            placeholder={t('common.search')}
                            prefix={<SearchOutlined />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </Col>
                    <Col span={16}>
                        <Space>
                            <Button type="primary">
                                {t('inventory.filters.showAll')}
                            </Button>
                            <Button>
                                {t('inventory.filters.lowStock')}
                            </Button>
                            <Button>
                                {t('inventory.filters.outOfStock')}
                            </Button>
                            <Button type="primary" className="print-button">
                                {t('inventory.report.print')}
                            </Button>
                        </Space>
                    </Col>
                </Row>

                {/* جدول المنتجات */}
                <Table
                    columns={columns}
                    dataSource={dummyData}
                    scroll={{ x: 1500, y: 500 }}
                    pagination={{
                        total: dummyData.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => t('common.totalItems', { total }),
                    }}
                    summary={(pageData) => {
                        let totalValue = 0;
                        let totalPotentialValue = 0;
                        pageData.forEach(({ currentValue, potentialValue }) => {
                            totalValue += currentValue || 0;
                            totalPotentialValue += potentialValue || 0;
                        });

                        return (
                            <Table.Summary fixed>
                                <Table.Summary.Row>
                                    <Table.Summary.Cell index={0} colSpan={5}>
                                        {t('common.total')}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={5} align="right">
                                        {totalValue.toFixed(2)} {t('common.currency')}
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell index={6} align="right">
                                        {totalPotentialValue.toFixed(2)} {t('common.currency')}
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        );
                    }}
                />
            </Card>
        </div>
    );
};

export default ProductList;
