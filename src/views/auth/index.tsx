import React, {useState} from 'react';
import {Image, ScrollView} from 'react-native';
import {Text, Layout, TabView, Tab} from '@ui-kitten/components';

import {styles} from './styles';
import Container from '../../components/common/container';
import AuthForm from '../../components/authForm';
import {theme} from '../../utils/theme';
import RegisterForm from '../../components/registerForm';

const AuthScreen = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Layout style={styles.container}>
      <ScrollView>
        <Container>
          <Image
            style={styles.image}
            source={require('../../../assets/images/login/cooking.png')}
          />

          <TabView
            indicatorStyle={{
              backgroundColor: theme.primary,
            }}
            selectedIndex={tabIndex}
            onSelect={handleTab}>
            <Tab
              title={() => <Text style={styles.titleTab}>Iniciar sesión</Text>}>
              <AuthForm />
            </Tab>
            <Tab title={() => <Text style={styles.titleTab}>Registrarme</Text>}>
              <RegisterForm />
            </Tab>
          </TabView>
        </Container>
      </ScrollView>
    </Layout>
  );
};

export default AuthScreen;
