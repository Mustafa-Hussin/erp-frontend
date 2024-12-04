import React from 'react';
import { Card, Table, Button, Space, Row, Col, Statistic } from 'antd';
import { PlusOutlined, ShoppingOutlined, WarningOutlined } from '@ant-design/icons';

const PurchasesPage: React.FC = () => {
  const columns = [
    {
      title: 'رقم الفاتورة',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'التاريخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'المورد',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'المبلغ',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'حالة الدفع',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link">عرض</Button>
          <Button type="link">تعديل</Button>
          <Button type="link" danger>حذف</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="purchases-container">
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="إجمالي المشتريات"
              value={0.00}
              prefix={<ShoppingOutlined />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="الفواتير الغير مدفوعة"
              value={0.00}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="مردود المشتريات"
              value={0.00}
              suffix="جنية"
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="المشتريات"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            فاتورة مشتريات جديدة
          </Button>
        }
      >
        <Table columns={columns} dataSource={[]} />
      </Card>
    </div>
  );
};

export default PurchasesPage;
