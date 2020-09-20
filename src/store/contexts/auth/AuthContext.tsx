import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {asyncStorageUser} from '../../../const/common';
import {Alert} from 'react-native';

export type AuthContextType = {
  user: firebase.User | null;
  handleChangeUser: (model: firebase.User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleChangeUser: (model: firebase.User | null) => {},
});

const AuthProvider: React.FC<{}> = ({children}) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    let cleanup = true;

    if (cleanup) {
      (async () => {
        await checkUser();
      })();
    }
    return () => {
      cleanup = false;
    };
  }, []);

  const checkUser = async () => {
    try {
      const value: string | null = await AsyncStorage.getItem(asyncStorageUser);
      if (value !== null) {
        setUser(JSON.parse(value) as firebase.User);
      }
    } catch (error) {
      Alert.alert('STORAGE ERROR');
    }
  };

  const handleChangeUser = (model: firebase.User | null): void => {
    setUser(model);
  };

  return (
    <AuthContext.Provider value={{user, handleChangeUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
