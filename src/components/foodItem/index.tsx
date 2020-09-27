import React, {useContext} from 'react';
import {Card, Text} from '@ui-kitten/components';
import {Image, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {styles} from './styles';
import {Food} from '../../models/Food';
import {RootParamList} from '../../navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FoodContext from '../../store/contexts/food/FoodContext';

type Props = {
  food: Food;
  qyt?: number;
};

const FoodItem: React.FC<Props> = ({food, qyt}) => {
  const {id, description, name, photoUrl, price} = food;

  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const {removeFood} = useContext(FoodContext);

  const descriptionLimited = () => {
    const aditionalText = description.length > 110 ? '...' : '';
    return `${description.substr(0, 80)}${aditionalText}`;
  };

  const handleFoodDetail = () => {
    navigation.navigate('FoodDetail', {id: id ?? ''});
  };

  const handleRemove = () => {
    removeFood(food?.id ?? '');
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleRemove}>
        {qyt ? (
          <Text style={styles.textRemove} category="p1">
            X
          </Text>
        ) : (
          <Text></Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFoodDetail}>
        <View style={styles.container}>
          <Image
            source={{
              uri: photoUrl,
            }}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.foodTitle} category="s1">
              {name}
            </Text>
            <Text style={styles.descriptionText} category="p1">
              {descriptionLimited()}
            </Text>
            <View style={styles.priceContainer}>
              {qyt ? (
                <Text style={styles.textPrice} category="p1">
                  Cantidad: {qyt}
                </Text>
              ) : (
                <Text style={styles.textPrice} category="p1">
                  Precio: ${price}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

export default FoodItem;
