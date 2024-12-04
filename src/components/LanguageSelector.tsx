import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    // تغيير اتجاه الصفحة حسب اللغة
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
    // تحديث اتجاه Ant Design
    document.documentElement.setAttribute('data-direction', value === 'ar' ? 'rtl' : 'ltr');
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      style={{ width: 100 }}
      bordered={false}
      suffixIcon={<GlobalOutlined />}
    >
      <Option value="ar">العربية</Option>
      <Option value="en">English</Option>
    </Select>
  );
};

export default LanguageSelector;
