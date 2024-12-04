import React from 'react';
import { Card, Table, Button, Space, Row, Col, Statistic } from 'antd';
import { PlusOutlined, WarningOutlined } from '@ant-design/icons';

const InventoryPage: React.FC = () => {
  const columns = [
    {
      title: 'كود المنتج',
      dataIndex: 'productCode',
      key: 'productCode',
    },
    {
      title: 'اسم المنتج',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'الكمية',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'سعر الشراء',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
    },
    {
      title: 'سعر البيع',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link">تعديل</Button>
          <Button type="link" danger>حذف</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="inventory-container">
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="إجمالي المنتجات"
              value={0}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="المنتجات منخفضة المخزون"
              value={0}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="قيمة المخزون"
              value={0.00}
              suffix="جنية"
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="المخزون"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            إضافة منتج
          </Button>
        }
      >
        <Table columns={columns} dataSource={[]} />
      </Card>
    </div>
  );
};

export default InventoryPage;
