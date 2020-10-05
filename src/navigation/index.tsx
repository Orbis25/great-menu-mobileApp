import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../views/auth';
import HomeScreen from '../views/home';
import {AuthContext} from '../store/contexts/auth/AuthContext';
import Header from '../components/common/header';
import ProfileScreen from '../views/profile';
import FoodDetailScreen from '../views/foodDetail';
import OrderDetailScreen from '../views/orderDetail';
import NewOrderScreen from '../views/newOrder';
import {
  FOOD_DETAIL,
  HOME,
  NEW_ORDER,
  ORDER_DETAIL,
  ORDER_STATUS,
} from './routes';
import OrderStatusScreen from '../views/orderStatus';

export type RootParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  FoodDetail: {id: string};
  OrderDetail: undefined;
  NewOrder: undefined;
  OrderStatus: undefined;
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
                title: HOME,
              }}
              component={HomeScreen}
            />
            <Stack.Screen
              name="Profile"
              options={{
                title: 'Perfil',
                headerShown: false,
              }}
              component={ProfileScreen}
            />
            <Stack.Screen
              name="FoodDetail"
              options={{title: FOOD_DETAIL}}
              component={FoodDetailScreen}
            />
            <Stack.Screen
              name="OrderDetail"
              options={{title: ORDER_DETAIL}}
              component={OrderDetailScreen}
            />
            <Stack.Screen
              name="NewOrder"
              options={{title: NEW_ORDER}}
              component={NewOrderScreen}
            />
            <Stack.Screen
              name="OrderStatus"
              options={{title: ORDER_STATUS, headerShown: false}}
              component={OrderStatusScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
