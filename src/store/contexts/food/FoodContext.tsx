import {createContext} from 'react';

import {ToOrder} from '../../../models/Order';

type FoodContextType = {
  orders: ToOrder[];
  orderId: string;
  addNewFood: (value: ToOrder) => void;
  removeFood: (id: string) => void;
  clear: () => void;
  getTotal: () => number;
  proccedOrder: (orderId: string) => void;
  closeOrder: () => void;
};

const FoodContext = createContext<FoodContextType>({
  orders: [],
  addNewFood({}) {},
  removeFood({}) {},
  clear() {},
  getTotal() {
    return 0;
  },
  orderId: '',
  proccedOrder({}) {},
  closeOrder() {},
});

export default FoodContext;
