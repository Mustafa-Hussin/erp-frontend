import React from 'react';
import { Card, Table, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const SalesPage: React.FC = () => {
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
      title: 'العميل',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'المبلغ',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
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
    <div className="sales-container">
      <Card
        title="المبيعات"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            فاتورة جديدة
          </Button>
        }
      >
        <Table columns={columns} dataSource={[]} />
      </Card>
    </div>
  );
};

export default SalesPage;
