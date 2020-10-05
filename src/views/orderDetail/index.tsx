import {Button, Text} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import Container from '../../components/common/container';
import FoodItem from '../../components/foodItem';
import FoodContext from '../../store/contexts/food/FoodContext';
import {styles} from './styles';
import {RootParamList} from '../../navigation';

const OrderDetailScreen = () => {
  const [total, setTotal] = useState<number>(0);
  //context
  const {orders} = useContext(FoodContext);

  //navigation
  const navitation = useNavigation<NavigationProp<RootParamList>>();

  useEffect(() => {
    if (orders.length) {
      getTotal();
    } else {
      setTotal(0);
    }
  }, [orders]);

  const getTotal = () => {
    let result = orders.map((x) => Number(x.food.price) * Number(x.qyt));
    const total = result.reduce((a, b) => a + b);
    setTotal(total);
  };

  const handleMoreFood = () => {
    navitation.navigate('Home');
  };

  const handleGoToCreateOrder = () => {
    navitation.navigate('NewOrder');
  };

  return (
    <Container>
      <View style={styles.listContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.textPriceLable} appearance="hint">
            Total
          </Text>
          <Text
            style={styles.textPrice}
            appearance="alternative">{`$${total}`}</Text>
        </View>

        <FlatList
          data={orders}
          renderItem={({item}) => <FoodItem qyt={item.qyt} food={item.food} />}
          keyExtractor={(value, index) => `${value.food?.id}`}
        />
      </View>

      {orders.length ? (
        <Button
          onPress={handleGoToCreateOrder}
          activeOpacity={0.5}
          style={styles.btn}>
          Pedir
        </Button>
      ) : (
        <></>
      )}

      <Button
        onPress={handleMoreFood}
        activeOpacity={0.5}
        style={styles.btnMoreOrden}>
        Seguir ordenando
      </Button>
    </Container>
  );
};

export default OrderDetailScreen;
