import React, {useEffect, useState} from 'react';
import {SectionList, Text} from 'react-native';

import FoodItem from '../../components/foodItem';
import {Food, FoodCategorized} from '../../models/Food';
import FoodService from '../../services/foodService';
import {SectionListData} from './utils';

const HomeScreen = () => {
  //state
  const [foods, setFoods] = useState<FoodCategorized[]>([]);

  useEffect(() => {
    (async () => await getAll())();
  }, []);

  const getAll = async () => {
    try {
      (await new FoodService().getAll()).onSnapshot((response) => {
        setFoods([]);
        response.forEach((result) => {
          const food = result.data() as Food;
          setFoods((x) => [...x, {title: food.category, data: food}]);
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  

  //revisar section list for ts

  return (
    <>
      {/* {foods.length ? (
        <SectionList<FoodCategorized>
          sections={foods}
          renderItem={({item}) => <FoodItem food={item.data} />}
          keyExtractor={(value) => `${value.id}`}
          renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
        />
      ) : (
        <Text>HI</Text>
      )} */}
    </>
  );
};

export default HomeScreen;
