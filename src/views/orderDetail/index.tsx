import {Button, Layout, Text} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {FlatList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Container from '../../components/common/container';
import FoodItem from '../../components/foodItem';
import FoodContext from '../../store/contexts/food/FoodContext';
import {styles} from './styles';

const OrderDetailScreen = () => {
  //context
  const {orders} = useContext(FoodContext);

  return (
    <View style={{flex: 1}}>
      <Container>
        <View>
          <Text style={styles.title} category="h4">
            Detalle de la orden
          </Text>
        </View>

        <View>
          <FlatList
            data={orders}
            renderItem={({item}) => (
              <FoodItem qyt={item.qyt} food={item.food} />
            )}
            keyExtractor={(value, index) => `${value.food?.id}`}
          />
        </View>

        <Button style={styles.btn}>Ordernar</Button>
      </Container>
    </View>
  );
};

export default OrderDetailScreen;
