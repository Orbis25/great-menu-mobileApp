import React, {useEffect, useState} from 'react';
import {Alert, SectionList, Text, View} from 'react-native';
import {Spinner, Input} from '@ui-kitten/components';
import _ from 'lodash';

import Container from '../../components/common/container';
import FoodItem from '../../components/foodItem';
import {Food} from '../../models/Food';
import FoodService from '../../services/foodService';
import {styles} from './styles';
import {TextInputChangeEventData} from 'react-native';
import {NativeSyntheticEvent} from 'react-native';

const HomeScreen = () => {
  //state
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      await getAll();
    })();
  }, []);

  const getAll = async () => {
    try {
      (await new FoodService().getAll()).subscribe((response) => {
        setFoods([]);
        const result = response as Food[];
        /**
         * Agroup this with loadsh by category
         */
        const grouped = _.groupBy(result, (x) => x.category);

        /***
         * Get the the key of array (results of loadsh) before
         * assign to food state iterating in the data for create a sectionData
         */
        Object.keys(grouped).map((key) => {
          setFoods((x) => [...x, {title: key, data: grouped[key]}]);
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const _renderLoading = () => (
    <View style={styles.spinnerContainer}>
      <Spinner size="small" />
    </View>
  );

  const _renderSearchBar = () => {
    //state

    const handleChange = async (
      e: NativeSyntheticEvent<TextInputChangeEventData>,
    ) => {
      if (e.nativeEvent.text) {
        try {
          const result = await new FoodService().findByName(e.nativeEvent.text);
          const grouped = _.groupBy(result, (x) => x.category);
          setFoods([]);
          Object.keys(grouped).map((key) => {
            setFoods((x) => [...x, {title: key, data: grouped[key]}]);
          });
        } catch (error) {
          Alert.alert(error.message);
        }
      } else {
        await getAll();
      }
    };

    return (
      <View style={styles.searchContainer}>
        <Input
          size="large"
          defaultValue=""
          onChange={handleChange}
          clearButtonMode="always"
          placeholder="Busca tu comida favorita"
        />
      </View>
    );
  };

  return (
    <>
      {_renderSearchBar()}
      {foods.length ? (
        <SectionList
          sections={foods}
          renderItem={({item}) => (
            <Container>
              <FoodItem food={item as Food} />
            </Container>
          )}
          keyExtractor={(value) => `${(value as Food).id}`}
          renderSectionHeader={({section: {title}}) => (
            <Container>
              <Text style={styles.titleOfList}>{title}</Text>
            </Container>
          )}
        />
      ) : (
        _renderLoading()
      )}
    </>
  );
};

export default HomeScreen;
