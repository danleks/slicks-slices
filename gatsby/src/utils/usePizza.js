import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext/OrderContext';

const usePizza = ({ pizzas, inputs }) => {
   // 1. Create some state and context to hold our order
   // We got rid of this line because we moved useState up to the provider
   // const [order, setOrder] = useState([]);
   const [order, setOrder] = useContext(OrderContext);
   // 2. Make a function to add things to order
   const addToOrder = (orderedPizza) => {
      setOrder([...order, orderedPizza]);
   };
   // 3. Make a function to remove things from the order
   const removeFromOrder = (index) => {
      setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
   };
   // 4. TODO: Send this data to a serverless func when they check out

   return {
      order,
      addToOrder,
      removeFromOrder,
   };
};

export default usePizza;
