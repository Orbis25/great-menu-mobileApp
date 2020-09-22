import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../views/auth';
import HomeScreen from '../views/home';
import {AuthContext} from '../store/contexts/auth/AuthContext';
import Header from '../components/common/header';
import ProfileScreen from '../views/profile';
import FoodDetailScreen from '../views/foodDetail';

export type RootParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  FoodDetail: {id: string};
};

const Stack = createStackNavigator<RootParamList>();

const Navigation = () => {
  const {user} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}>
        {!user ? (
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
            }}
            component={LoginScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              options={{
                title: 'Nueva orden',
              }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Profile"
              options={{
                title: '',
                headerShown: false,
              }}
              component={ProfileScreen}
            />
            <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
