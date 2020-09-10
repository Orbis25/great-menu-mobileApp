import React, {useState} from 'react';
import {Layout, Input, Button} from '@ui-kitten/components';

import {styles} from './styles';
import Container from '../common/container';
import {UserAuthVm} from '../../models/User';

export const AuthForm = () => {
  const [user, setUser] = useState<UserAuthVm>({
    password: '',
    userName: '',
  });

  //login
  const handleSubmit = () => {};

  return (
    <Layout style={styles.container}>
      <Container>
        <Input
          style={styles.input}
          label="Usuario"
          size="large"
          placeholder="Example@email.com"
        />
        <Input
          style={styles.input}
          label="Contraseña"
          size="large"
          placeholder="********"
          secureTextEntry
        />
        <Button
          onPress={handleSubmit}
          style={styles.btn}
          disabled={!user.userName.length && !user.password.length}>
          Entrar
        </Button>
      </Container>
    </Layout>
  );
};

export default AuthForm;
