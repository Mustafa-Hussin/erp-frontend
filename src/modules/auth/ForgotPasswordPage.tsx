import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      // هنا سيتم إضافة منطق إرسال رابط إعادة تعيين كلمة المرور
      // حالياً نقوم فقط بمحاكاة العملية
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
    } catch (error) {
      message.error('حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, padding: '24px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>نسيت كلمة المرور</h2>
        <p style={{ textAlign: 'center', marginBottom: '24px' }}>
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
        </p>
        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'الرجاء إدخال البريد الإلكتروني' },
              { type: 'email', message: 'الرجاء إدخال بريد إلكتروني صحيح' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="البريد الإلكتروني"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              إرسال رابط إعادة التعيين
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login">العودة إلى تسجيل الدخول</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
