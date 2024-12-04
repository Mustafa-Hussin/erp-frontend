import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: ChangePasswordForm) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }

    setLoading(true);
    try {
      const success = await changePassword(values.oldPassword, values.newPassword);
      if (success) {
        message.success('تم تغيير كلمة المرور بنجاح');
        navigate('/dashboard');
      } else {
        message.error('كلمة المرور القديمة غير صحيحة');
      }
    } catch (error) {
      message.error('حدث خطأ أثناء تغيير كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card style={{ maxWidth: 400, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>تغيير كلمة المرور</h2>
        <Form
          name="change-password"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: 'الرجاء إدخال كلمة المرور القديمة' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="كلمة المرور القديمة"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'الرجاء إدخال كلمة المرور الجديدة' },
              { min: 6, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="كلمة المرور الجديدة"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'الرجاء تأكيد كلمة المرور الجديدة' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('كلمتا المرور غير متطابقتين'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="تأكيد كلمة المرور الجديدة"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              تغيير كلمة المرور
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
