import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {ASYNC_STORAGE_ACTIVE_ORDER} from '../../../const/common';
import {ToOrder} from '../../../models/Order';
import FoodContext from './FoodContext';

const FoodProvider: React.FC<{}> = ({children}) => {
  const [state, setState] = useState<ToOrder[]>([]);
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    (async () => await getActiveOrder())();
  }, []);

  /**
   * add a new food to context
   * @param payload To order model
   */
  const addNewFood = (payload: ToOrder) => {
    const result = state.filter((x) => x.food.id === payload.food?.id);
    if (!result.length) {
      setState((x) => [...x, payload]);
    } else {
      const data = state.filter((x) => x.food?.id !== payload.food?.id);
      data.push(payload);
      setState(data);
    }
  };

  /**
   * Remove a food of context
   * @param id id of ToOrder MODEL
   */
  const removeFood = (id: string) => {
    const data = state.filter((x) => x.food?.id !== id);
    setState(data);
  };

  /**
   * Clea the context
   */
  const clear = () => {
    setState([]);
  };

  /**
   * Get total of order
   */

  const getTotal = () => {
    let result = state.map((x) => Number(x.food.price) * Number(x.qyt));
    const total = result.reduce((a, b) => a + b);
    return total;
  };

  /**
   * Add a id of active order to context and async storage
   * @param orderId id of Order model
   */
  const proccedOrder = async (orderId: string) => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_ACTIVE_ORDER, orderId);
      setOrderId(orderId);
    } catch (error) {
      Alert.alert(error);
    }
  };

  /**
   * Get the activeOrder and set to context
   */
  const getActiveOrder = async () => {
    try {
      const result = await AsyncStorage.getItem(ASYNC_STORAGE_ACTIVE_ORDER);
      if (!!result) setOrderId(result);
    } catch (error) {
      Alert.alert(error);
    }
  };

  /**
   * set orderId null or empty
   */
  const closeOrder = async () => {
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE_ACTIVE_ORDER, '');
      setOrderId('');
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <FoodContext.Provider
      value={{
        orders: state,
        orderId,
        addNewFood,
        removeFood,
        clear,
        getTotal,
        proccedOrder,
        closeOrder,
      }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
