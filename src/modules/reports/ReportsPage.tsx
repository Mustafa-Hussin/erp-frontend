import React from 'react';
import { Card, Select, Button, DatePicker, Row, Col, Form } from 'antd';
import { FileTextOutlined, PrinterOutlined, DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportsPage: React.FC = () => {
  const reportTypes = [
    { value: 'sales', label: 'تقرير المبيعات' },
    { value: 'purchases', label: 'تقرير المشتريات' },
    { value: 'inventory', label: 'تقرير المخزون' },
    { value: 'expenses', label: 'تقرير المصروفات' },
    { value: 'profit', label: 'تقرير الأرباح والخسائر' },
  ];

  return (
    <div className="reports-container">
      <Card title="التقارير">
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="نوع التقرير">
                <Select placeholder="اختر نوع التقرير">
                  {reportTypes.map(type => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="الفترة الزمنية">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Button type="primary" icon={<FileTextOutlined />} style={{ marginRight: 8 }}>
                  عرض التقرير
                </Button>
                <Button icon={<PrinterOutlined />} style={{ marginRight: 8 }}>
                  طباعة
                </Button>
                <Button icon={<DownloadOutlined />}>
                  تحميل
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className="report-preview" style={{ marginTop: 24 }}>
          <Card title="معاينة التقرير" bordered={false}>
            {/* هنا سيتم عرض محتوى التقرير */}
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
              الرجاء اختيار نوع التقرير والفترة الزمنية
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default ReportsPage;
