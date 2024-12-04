import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  DollarOutlined,
  ReloadOutlined 
} from '@ant-design/icons';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>لوحة التحكم</h1>
      
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="إجمالي المبيعات"
              value={0.00}
              prefix={<ShoppingCartOutlined />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="الفواتير الغير مدفوعة"
              value={0.00}
              prefix={<DollarOutlined />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="مردود المبيعات"
              value={0.00}
              prefix={<ReloadOutlined />}
              suffix="جنية"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="إجمالي المشتريات"
              value={0.00}
              prefix={<ShoppingOutlined />}
              suffix="جنية"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
