import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageSelector from '../../components/LanguageSelector';

interface LoginForm {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const onFinish = (values: LoginForm) => {
    setLoading(true);
    try {
      if (values.username === 'admin' && values.password === 'admin') {
        login({ username: values.username, role: 'admin' }, values.rememberMe);
        message.success(t('auth.loginSuccess'));
        navigate('/dashboard');
      } else {
        message.error(t('auth.loginError'));
      }
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
        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <LanguageSelector />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>{t('auth.login')}</h2>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          initialValues={{ rememberMe: true }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: t('auth.enterUsername') }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder={t('auth.username')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: t('auth.enterPassword') }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('auth.password')}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                <Checkbox>{t('auth.rememberMe')}</Checkbox>
              </Form.Item>
              <Link to="/forgot-password">{t('auth.forgotPassword')}</Link>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {t('auth.login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
