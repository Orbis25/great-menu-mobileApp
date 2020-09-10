import React, {useState} from 'react';
import {Input, Layout, Button, Spinner} from '@ui-kitten/components';
import {
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
  Text,
} from 'react-native';

import {styles} from './styles';
import Container from '../common/container';
import {UserCreateVM} from '../../models/User';
import AuthService from '../../services/authService';
import {ResponseCreateUser} from './utils';
import {theme} from '../../utils/theme';

const RegisterForm = () => {
  //state
  const [newUser, setNewUser] = useState<UserCreateVM>({
    fullName: '',
    password: '',
    userName: '',
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<ResponseCreateUser>({
    text: '',
    resultType: 'success',
  });

  const handleRegister = async () => {
    if (newUser.password.length < 8) {
      setResponse({
        text: 'La contraseña debe ser mayor a 8',
        resultType: 'error',
      });
      return;
    }
    setIsLoading(true);
    if (
      newUser.fullName.length &&
      newUser.password.length &&
      newUser.userName.length
    ) {
      try {
        await new AuthService().register(newUser);
        setNewUser({
          fullName: '',
          password: '',
          userName: '',
        });
        setResponse({
          text: 'Registrado correctamente, ahora inicia sesión',
          resultType: 'success',
        });
      } catch (error) {
        setResponse({
          text: error.message,
          resultType: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setResponse({
        text: 'Todos los campos son requeridos',
        resultType: 'error',
      });
      setIsLoading(false);
    }
  };

  const handleChangeFullName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setNewUser({...newUser, fullName: e.nativeEvent.text});
  };

  const handleChangePassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setNewUser({...newUser, password: e.nativeEvent.text});
  };

  const handleChangeUserName = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setNewUser({...newUser, userName: e.nativeEvent.text});
  };

  const handleChangeRepeatPassword = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    if (newUser.password === e.nativeEvent.text) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };

  return (
    <Layout style={styles.container}>
      <Container>
        <Text
          style={{
            ...styles.textResponse,
            color:
              response.resultType === 'success' ? theme.success : theme.primary,
          }}>
          {response.text}
        </Text>
        <Input
          style={styles.input}
          placeholder="example..."
          label="Nombre completo"
          size="large"
          onChange={handleChangeFullName}
          value={newUser.fullName}
        />
        <Input
          style={styles.input}
          placeholder="example@example.com..."
          label="Correo"
          size="large"
          onChange={handleChangeUserName}
          value={newUser.userName}
        />
        <Input
          style={styles.input}
          placeholder="********"
          label="Contraseña"
          size="large"
          secureTextEntry
          onChange={handleChangePassword}
          value={newUser.password}
        />
        <Input
          style={styles.input}
          placeholder="********"
          label="Confirmar contraseña"
          size="large"
          onChange={handleChangeRepeatPassword}
          secureTextEntry
        />
        {isLoading ? (
          <View style={styles.spinnerContainer}>
            <Spinner />
          </View>
        ) : (
          <Button
            onPress={handleRegister}
            style={styles.btn}
            disabled={isBtnDisabled}>
            Registrarme
          </Button>
        )}
      </Container>
    </Layout>
  );
};

export default RegisterForm;
