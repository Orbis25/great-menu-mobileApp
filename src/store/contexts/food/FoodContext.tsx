import {createContext} from 'react';
import {ToOrder} from '../../../models/Order';

type FoodContextType = {
  orders: ToOrder[];
  addNewFood: (value: ToOrder) => void;
  removeFood: (id: string) => void;
};

const FoodContext = createContext<FoodContextType>({
  orders: [],
  addNewFood({}) {},
  removeFood({}) {},
});

export default FoodContext;
