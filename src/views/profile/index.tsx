import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  Layout,
  Avatar,
  Spinner,
  Icon,
  Button,
  Input,
} from '@ui-kitten/components';
import {View, ScrollView, Alert} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Container from '../../components/common/container';
import {styles} from './styles';
import {getMyAvatar} from '../../utils/Avatars';
import AuthService from '../../services/authService';
import {RootParamList} from '../../navigation';
import {asyncStorageUser} from '../../const/common';
import {AuthContext} from '../../store/contexts/auth/AuthContext';

const ProfileScreen = () => {
  //state
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  //context
  const context = useContext(AuthContext);

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    setUser(new AuthService().auth?.currentUser);
    setIsLoading(false);
  };

  const FormInfo = () => {
    const handleBack = () => {
      navigation.goBack();
    };

    const handleSignOut = async () => {
      setIsLoading(true);
      try {
        await new AuthService().signOut();
        context.handleChangeUser(null);
        navigation.navigate('Login');
        await AsyncStorage.removeItem(asyncStorageUser);
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    return (
      <>
        <Input
          defaultValue={user?.displayName ?? ''}
          disabled
          style={styles.input}
          label="Nombre"
        />
        <Input
          disabled
          defaultValue={user?.email ?? ''}
          label="usuario o correo"
          style={styles.input}
        />

        <Button
          style={styles.btnSignOut}
          accessoryLeft={(props) => <Icon name="close" {...props} />}
          onPress={handleSignOut}>
          Cerrar sesión
        </Button>
        <Button
          style={styles.btnGoBack}
          appearance="ghost"
          status="danger"
          onPress={handleBack}
          accessoryLeft={(props) => <Icon name="arrow-back" {...props} />}>
          Volver
        </Button>
      </>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <Layout style={{flex: 1}}>
      <ScrollView>
        <Container>
          <View style={styles.container}>
            <Text style={styles.textTitle}>MI PERFIL</Text>
            <Avatar
              style={styles.avatar}
              size="giant"
              source={{uri: getMyAvatar(user?.email ?? '')}}
            />
          </View>
        </Container>
        <Container style={{marginTop: 40}}>
          <FormInfo />
        </Container>
      </ScrollView>
    </Layout>
  );
};

export default ProfileScreen;
