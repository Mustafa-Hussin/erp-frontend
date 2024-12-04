import React from 'react';
import { Card, Table, Button, Space, Tag } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';

const UsersPage: React.FC = () => {
  const columns = [
    {
      title: 'اسم المستخدم',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'الاسم الكامل',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'البريد الإلكتروني',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'الدور',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role === 'admin' ? 'مدير' : 'مستخدم'}
        </Tag>
      ),
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'error'}>
          {status === 'active' ? 'نشط' : 'غير نشط'}
        </Tag>
      ),
    },
    {
      title: 'الإجراءات',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link">تعديل</Button>
          <Button type="link">الصلاحيات</Button>
          <Button type="link" danger>تعطيل</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="users-container">
      <Card
        title="إدارة المستخدمين"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            إضافة مستخدم
          </Button>
        }
      >
        <Table columns={columns} dataSource={[]} />
      </Card>
    </div>
  );
};

export default UsersPage;
