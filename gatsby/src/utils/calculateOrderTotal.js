import calculatePizzaPrice from './calculatePizzaPrice';

const calculateOrderTotal = (order, pizzas) => {
   // loop over each item in the order
   const total = order.reduce((acc, singleOrder) => {
      const pizza = pizzas.find((singlePizza) => singlePizza.id === singleOrder.id);
      return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
   }, 0);

   return total;
};

export default calculateOrderTotal;
