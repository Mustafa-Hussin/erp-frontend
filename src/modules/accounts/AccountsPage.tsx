import React from 'react';
import { Card, Table, Button, Space, Row, Col, Statistic, Tabs } from 'antd';
import { PlusOutlined, DollarOutlined, BankOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const AccountsPage: React.FC = () => {
  const expensesColumns = [
    {
      title: 'التاريخ',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'البيان',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'المبلغ',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'الفئة',
      dataIndex: 'category',
      key: 'category',
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

  const accountsColumns = [
    {
      title: 'اسم الحساب',
      dataIndex: 'accountName',
      key: 'accountName',
    },
    {
      title: 'النوع',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'الرصيد',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link">تفاصيل</Button>
          <Button type="link">تعديل</Button>
          <Button type="link" danger>حذف</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="accounts-container">
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="إجمالي الإيرادات"
              value={0.00}
              prefix={<DollarOutlined style={{ color: '#3f8600' }} />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="إجمالي المصروفات"
              value={0.00}
              prefix={<DollarOutlined style={{ color: '#cf1322' }} />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="الرصيد الحالي"
              value={0.00}
              prefix={<BankOutlined />}
              suffix="جنية"
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="المصروفات" key="1">
            <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
              إضافة مصروف
            </Button>
            <Table columns={expensesColumns} dataSource={[]} />
          </TabPane>
          <TabPane tab="الحسابات" key="2">
            <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
              إضافة حساب
            </Button>
            <Table columns={accountsColumns} dataSource={[]} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AccountsPage;
