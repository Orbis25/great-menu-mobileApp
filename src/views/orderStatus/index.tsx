import {Button, Text} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Image, View} from 'react-native';
import CounterDonw, {CountdownRenderProps} from 'react-countdown';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Container from '../../components/common/container';
import {Order, OrderState} from '../../models/Order';
import OrderService from '../../services/orderService';
import FoodContext from '../../store/contexts/food/FoodContext';
import {theme} from '../../utils/theme';
import {styles} from './styles';
import {RootParamList} from '../../navigation';

const OrderStatusScreen = () => {
  //state
  const [order, setOrder] = useState<Order | null>(null);
  //context
  const context = useContext(FoodContext);
  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  useEffect(() => {
    (async () => {
      await getFoodStatus();
    })();
  }, [context.orderId]);

  const getFoodStatus = async () => {
    try {
      const response = await new OrderService().getStatus(context.orderId);

      response.onSnapshot((doc) => {
        const model = doc.data() as Order;
        setOrder(model);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const Awaiting = () => {
    return (
      <>
        <ActivityIndicator
          color={theme.primary}
          size="large"
          style={styles.spinner}
        />
        <Text style={styles.textMessage} category="p1">
          Estamos procesando su orden...
        </Text>
      </>
    );
  };

  const RenderMinutes: React.FC<CountdownRenderProps> = ({
    minutes,
    seconds,
  }) => {
    useEffect(() => {
      if (seconds <= 0) {
        (async () => {
          await setTime();
        })();
      }
    }, [seconds]);

    const setTime = async () => {
      try {
        await new OrderService().updateTime(context.orderId, minutes);
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    return (
      <Text>
        {minutes}:{seconds}
      </Text>
    );
  };

  const renderMessage = () => {
    if (!!order && order.orderState === OrderState.Completed) {
      return (
        <>
          <Text>Orden Lista, en breve le llevaremos su comida</Text>
        </>
      );
    }

    if (
      !!order &&
      order.orderState !== OrderState.Completed &&
      order.time > 0
    ) {
      return (
        <>
          <Text style={styles.textMessage} category="p1">
            Su orden estara en :
          </Text>
          <Text>
            <CounterDonw
              date={Date.now() + order.time * 60000}
              renderer={(props) => <RenderMinutes {...props} />}
            />
          </Text>
        </>
      );
    }

    return <Awaiting />;
  };

  const handleComplete = () => {
    context.closeOrder();
    navigation.navigate('Home');
  };

  return (
    <Container>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="center"
          source={require('../../../assets/illustrations/waiters.png')}
        />
      </View>
      <View>
        <View style={styles.content}>{renderMessage()}</View>
      </View>
      {order?.orderState === OrderState.Completed && (
        <View style={styles.btnContainer}>
          <Button
            onPress={handleComplete}
            activeOpacity={0.5}
            style={styles.btn}>
            Completar y salir
          </Button>
        </View>
      )}
    </Container>
  );
};

export default OrderStatusScreen;
