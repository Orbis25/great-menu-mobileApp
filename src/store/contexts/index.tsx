import React from 'react';
import AuthProvider from './auth/AuthContext';
import FoodProvider from './food/FoodProvider';

const AppProvider: React.FC<{}> = ({children}) => {
  return (
    <AuthProvider>
      <FoodProvider>{children}</FoodProvider>
    </AuthProvider>
  );
};

export default AppProvider;
