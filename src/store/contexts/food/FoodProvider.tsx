import React, {useState} from 'react';
import {ToOrder} from '../../../models/Order';
import FoodContext from './FoodContext';

const FoodProvider: React.FC<{}> = ({children}) => {
  const [state, setState] = useState<ToOrder[]>([]);

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

  const removeFood = (id: string) => {
    const data = state.filter((x) => x.food?.id !== id);
    setState(data);
  };

  return (
    <FoodContext.Provider value={{orders: state, addNewFood, removeFood}}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
