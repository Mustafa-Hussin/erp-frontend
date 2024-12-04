import React, { useState, useEffect } from 'react';
import { Layout, Menu, theme, Button, Space, Dropdown, Grid } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from '../components/LanguageSelector';
import ThemeSelector from '../components/ThemeSelector'; 
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  InboxOutlined,
  BankOutlined,
  UserOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  LockOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (screens.xs || screens.sm) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: t('menu.dashboard'),
    },
    {
      key: '/sales',
      icon: <ShoppingCartOutlined />,
      label: t('menu.sales'),
    },
    {
      key: '/purchases',
      icon: <ShoppingOutlined />,
      label: t('menu.purchases'),
    },
    {
      key: '/inventory',
      icon: <InboxOutlined />,
      label: t('menu.inventory'),
    },
    {
      key: '/finance',
      icon: <BankOutlined />,
      label: t('menu.finance'),
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: t('menu.users'),
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: t('menu.reports'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', direction: isRTL ? 'rtl' : 'ltr' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={screens.xs ? 0 : 80}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          [isRTL ? 'right' : 'left']: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center' 
        }}>
          {!collapsed && <span style={{ color: '#fff' }}>نظام ERP</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{
            direction: isRTL ? 'rtl' : 'ltr'
          }}
        />
      </Sider>
      <Layout style={{ 
        [isRTL ? 'marginRight' : 'marginLeft']: screens.xs ? 0 : (collapsed ? 80 : 200),
        transition: isRTL ? 'margin-right 0.2s' : 'margin-left 0.2s',
      }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              [isRTL ? 'marginRight' : 'marginLeft']: 0
            }}
          />
          <Space style={{ 
            [isRTL ? 'marginLeft' : 'marginRight']: 16,
            direction: isRTL ? 'rtl' : 'ltr'
          }}>
            <LanguageSelector />
            <ThemeSelector />
            {screens.sm ? (
              <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout}>
                {t('auth.logout')}
              </Button>
            ) : (
              <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} />
            )}
          </Space>
        </Header>
        <Content style={{
          margin: screens.xs ? '8px' : '24px',
          padding: screens.xs ? '8px' : '24px',
          background: colorBgContainer,
          borderRadius: screens.xs ? 4 : 8,
          minHeight: 280,
          direction: isRTL ? 'rtl' : 'ltr'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
