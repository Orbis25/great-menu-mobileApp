import React from 'react';
import {Card, Text} from '@ui-kitten/components';
import {Image, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {styles} from './styles';
import {Food} from '../../models/Food';
import {RootParamList} from '../../navigation';

type Props = {
  food: Food;
};

const FoodItem: React.FC<Props> = ({food}) => {
  const {id, category, State, description, name, photoUrl, price} = food;

  //navigation
  const navigation = useNavigation<NavigationProp<RootParamList>>();

  const descriptionLimited = () => {
    const aditionalText = description.length > 110 ? '...' : '';
    return `${description.substr(0, 80)}${aditionalText}`;
  };

  const handleFoodDetail = () => {
    navigation.navigate('FoodDetail', {id: id ?? ''});
  };

  return (
    <Card onPress={handleFoodDetail} style={styles.card}>
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
            <Text style={styles.textPrice} category="p1">
              Precio: ${price}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default FoodItem;
