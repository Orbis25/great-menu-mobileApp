import React, {useContext, useEffect, useState} from 'react';
import {Button, Icon, Layout, Spinner, Text} from '@ui-kitten/components';
import {Image, View, ScrollView, Alert, Animated} from 'react-native';

import {styles} from './styles';
import Container from '../../components/common/container';
import {Props} from './utils';
import {Food} from '../../models/Food';
import FoodService from '../../services/foodService';
import NumericInput from '../../components/common/numericInput';
import FoodContext from '../../store/contexts/food/FoodContext';

const FoodDetailScreen: React.FC<Props> = ({route, navigation}) => {
  //params
  const {id} = route.params;
  //state
  const [food, setFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  //animation
  const [animation] = useState(new Animated.Value(1));

  //context
  const context = useContext(FoodContext);

  useEffect(() => {
    (async () => {
      await get();
    })();
  }, [id]);

  const get = async () => {
    setIsLoading(true);
    try {
      const result = await new FoodService().findById(id);
      const data = result.docs[0].data() as Food;
      setFood(data);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pressIn = () => {
    Animated.spring(animation, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    if (food !== null) {
      context.addNewFood({food: food, qyt: quantity});
      navigation.navigate('OrderDetail');
    }
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      tension: 70,
      useNativeDriver: true,
    }).start();
  };

  const animationStyle = {
    transform: [{scale: animation}],
  };

  const _renderHead = () => {
    return (
      <Layout style={styles.head}>
        <Container>
          <Image
            style={styles.pic}
            source={{
              uri: food?.photoUrl,
            }}
            resizeMode="cover"
          />
          <Text style={styles.textName}>{food?.name}</Text>
        </Container>
      </Layout>
    );
  };

  const Info = () => {
    return (
      <Layout style={styles.infoContainer}>
        <Container>
          <View>
            <Container>
              <Text category="p1">{food?.description}</Text>
            </Container>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.textPriceLable} appearance="hint">
              Precio
            </Text>
            <Text
              style={styles.textPrice}
              appearance="alternative">{`$${food?.price}`}</Text>
          </View>
          <View style={styles.btnContainerPrice}>
            <View>
              <Text style={styles.textQuantityLabel} appearance="hint">
                Cantidad
              </Text>
              <NumericInput handler={setQuantity} counter={quantity} />
            </View>

            {context.orderId === '' && (
              <View>
                <Animated.View style={[{}, animationStyle]}>
                  <Button
                    style={styles.getButton}
                    accessoryLeft={(props) => (
                      <Icon {...props} name="arrow-forward" />
                    )}
                    onPressOut={pressOut}
                    onPressIn={pressIn}
                  />
                </Animated.View>
              </View>
            )}
          </View>
        </Container>
      </Layout>
    );
  };

  const Loading = () => {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner />
        <Text category="h4">Cargando...</Text>
      </View>
    );
  };

  return (
    <Layout style={{flex: 1}}>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          {_renderHead()}
          <Info />
        </ScrollView>
      )}
    </Layout>
  );
};

export default FoodDetailScreen;
