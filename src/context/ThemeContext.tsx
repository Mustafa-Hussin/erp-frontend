import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';
import { themePresets, ThemePreset } from '../themes';

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themePreset: ThemePreset;
  setThemePreset: (preset: ThemePreset) => void;
  availableThemes: typeof themePresets;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const updateThemeVariables = (theme: ThemeConfig) => {
  if (!theme.token) return;
  
  const root = document.documentElement.style;
  const { token } = theme;

  // الألوان الأساسية
  root.setProperty('--color-primary', token.colorPrimary);
  root.setProperty('--color-bg', token.colorBgLayout || '#f0f2f5');
  root.setProperty('--color-text', token.colorText || '#000000');

  // ألوان الخلفيات
  root.setProperty('--color-bg-container', token.colorBgContainer || '#ffffff');
  root.setProperty('--color-bg-elevated', token.colorBgElevated || '#ffffff');
  root.setProperty('--color-bg-spotlight', token.colorBgSpotlight || '#ffffff');

  // تطبيق الألوان مباشرة على body
  document.body.style.backgroundColor = token.colorBgLayout || '#f0f2f5';
  document.body.style.color = token.colorText || '#000000';
};

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [themePreset, setThemePreset] = useState<ThemePreset>(() => {
    return (localStorage.getItem('themePreset') as ThemePreset) || 'default';
  });

  useEffect(() => {
    localStorage.setItem('themePreset', themePreset);
    const currentTheme = themePresets[themePreset];
    updateThemeVariables(currentTheme);
  }, [themePreset]);

  const currentTheme = themePresets[themePreset];

  return (
    <ThemeContext.Provider 
      value={{ 
        currentTheme,
        themePreset,
        setThemePreset,
        availableThemes: themePresets
      }}
    >
      <ConfigProvider theme={currentTheme}>
        <div style={{
          minHeight: '100vh',
          backgroundColor: currentTheme.token?.colorBgLayout || '#f0f2f5',
          color: currentTheme.token?.colorText || '#000000',
        }}>
          {children}
        </div>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
