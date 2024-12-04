import React from 'react';
import { Dropdown, Button, Menu, Tooltip } from 'antd';
import { BgColorsOutlined, CheckOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import type { ThemePreset } from '../themes';

const ThemeSelector: React.FC = () => {
  const { t } = useTranslation();
  const { themePreset, setThemePreset, availableThemes } = useTheme();

  const menu = (
    <Menu
      selectedKeys={[themePreset]}
      style={{ 
        maxHeight: '400px', 
        overflowY: 'auto',
        width: '250px',
        padding: '8px'
      }}
    >
      {Object.entries(availableThemes).map(([key, theme]) => (
        <Menu.Item
          key={key}
          onClick={() => setThemePreset(key as ThemePreset)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            borderRadius: '6px',
            margin: '4px 0'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontWeight: 500 }}>{theme.name}</span>
            <span style={{ 
              fontSize: '12px', 
              opacity: 0.65
            }}>
              {theme.description}
            </span>
          </div>
          {key === themePreset && <CheckOutlined />}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Tooltip title={t('theme.select')} placement="bottom">
      <Dropdown 
        overlay={menu} 
        trigger={['click']} 
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<BgColorsOutlined />}
          style={{
            fontSize: '16px'
          }}
        />
      </Dropdown>
    </Tooltip>
  );
};

export default ThemeSelector;
