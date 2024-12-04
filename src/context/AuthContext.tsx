import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, rememberMe?: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // التحقق من وجود مستخدم مسجل عند تحميل التطبيق
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User, rememberMe: boolean = false) => {
    setUser(userData);
    // إذا كان rememberMe صحيحاً، نخزن في localStorage، وإلا نخزن في sessionStorage
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  };

  const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    // هنا سيتم إضافة التكامل مع الباك إند لاحقاً
    // حالياً نقوم بمحاكاة تغيير كلمة المرور
    if (oldPassword === 'admin') {
      // تحديث كلمة المرور في التخزين المحلي
      const storage = localStorage.getItem('user') ? localStorage : sessionStorage;
      const userData = JSON.parse(storage.getItem('user') || '{}');
      storage.setItem('user', JSON.stringify({ ...userData, passwordLastChanged: new Date() }));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      changePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
