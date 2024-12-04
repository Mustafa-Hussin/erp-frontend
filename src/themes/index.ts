import { theme } from 'antd';
import type { ThemeConfig } from 'antd/es/config-provider/context';

export type ThemePreset = 'default' | 'modern' | 'classic' | 'dark' | 'blue' | 'green';

interface ThemePresetConfig extends ThemeConfig {
  name: string;
  key: ThemePreset;
  description: string;
}

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

const baseToken = {
  borderRadius: 6,
  fontSize: 14,
  colorBorder: '#d9d9d9',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgLayout: '#f0f2f5',
  colorText: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
};

export const themePresets: Record<ThemePreset, ThemePresetConfig> = {
  default: {
    name: 'النمط الافتراضي',
    key: 'default',
    description: 'النمط الكلاسيكي مع مظهر احترافي',
    token: {
      ...baseToken,
      colorPrimary: '#1890ff',
    },
    algorithm: defaultAlgorithm,
  },
  modern: {
    name: 'النمط العصري',
    key: 'modern',
    description: 'تصميم عصري ونظيف مع حواف دائرية',
    token: {
      ...baseToken,
      colorPrimary: '#2563eb',
      borderRadius: 12,
      colorBgLayout: '#f9fafb',
    },
    algorithm: [defaultAlgorithm, compactAlgorithm],
  },
  dark: {
    name: 'النمط الداكن',
    key: 'dark',
    description: 'نمط داكن للاستخدام الليلي',
    token: {
      ...baseToken,
      colorPrimary: '#1890ff',
      colorBgLayout: '#141414',
      colorBgContainer: '#1f1f1f',
      colorBgElevated: '#1f1f1f',
      colorText: 'rgba(255, 255, 255, 0.85)',
      colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
      colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
      colorBorder: '#303030',
    },
    algorithm: darkAlgorithm,
  },
  blue: {
    name: 'النمط الأزرق',
    key: 'blue',
    description: 'نمط أزرق عصري',
    token: {
      ...baseToken,
      colorPrimary: '#0052cc',
      colorBgLayout: '#f0f7ff',
    },
    algorithm: defaultAlgorithm,
  },
  green: {
    name: 'النمط الأخضر',
    key: 'green',
    description: 'نمط أخضر طبيعي',
    token: {
      ...baseToken,
      colorPrimary: '#52c41a',
      colorBgLayout: '#f6ffed',
    },
    algorithm: defaultAlgorithm,
  },
  classic: {
    name: 'النمط التقليدي',
    key: 'classic',
    description: 'المظهر المؤسسي التقليدي',
    token: {
      ...baseToken,
      colorPrimary: '#096dd9',
      borderRadius: 2,
      colorBgLayout: '#f5f5f5',
    },
    algorithm: defaultAlgorithm,
  },
};
