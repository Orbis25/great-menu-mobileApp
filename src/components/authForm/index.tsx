import React, {useState, useContext} from 'react';
import {Layout, Input, Button, Spinner} from '@ui-kitten/components';

import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
  View,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {styles} from './styles';
import Container from '../common/container';
import {UserAuthVm} from '../../models/User';
import AuthService from '../../services/authService';
import {RootParamList} from '../../navigation';
import {AuthContext} from '../../store/contexts/auth/AuthContext';
import {asyncStorageUser} from '../../const/common';

export const AuthForm = () => {
  //state
  const [user, setUser] = useState<UserAuthVm>({
    password: '',
    userName: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  //context
  const context = useContext(AuthContext);

  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  //login
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await new AuthService().login(user);
      context.handleChangeUser(result.user);
      await AsyncStorage.setItem(asyncStorageUser, JSON.stringify(result.user));
      setErrorMessage('');
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePass = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setUser({...user, password: e.nativeEvent.text});
  };

  const handleChangeUser = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setUser({...user, userName: e.nativeEvent.text});
  };

  const renderError = () => {
    if (!errorMessage.length) return null;
    return <Text style={styles.textError}>{errorMessage}</Text>;
  };

  return (
    <Layout style={styles.container}>
      <Container>
        {renderError()}
        <Input
          style={styles.input}
          label="Usuario"
          size="large"
          placeholder="Example@email.com"
          onChange={handleChangeUser}
        />
        <Input
          style={styles.input}
          label="Contraseña"
          size="large"
          placeholder="********"
          secureTextEntry
          onChange={handleChangePass}
        />
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <Spinner />
          </View>
        ) : (
          <Button
            onPress={handleSubmit}
            style={styles.btn}
            disabled={!user.userName.length || !user.password.length}>
            Entrar
          </Button>
        )}
      </Container>
    </Layout>
  );
};

export default AuthForm;
