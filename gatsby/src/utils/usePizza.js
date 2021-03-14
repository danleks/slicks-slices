import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

const usePizza = ({ pizzas, values }) => {
   // 1. Create some state and context to hold our order
   // We got rid of this line because we moved useState up to the provider
   // const [order, setOrder] = useState([]);
   const [order, setOrder] = useContext(OrderContext);
   const [error, setError] = useState();
   const [loading, setLoading] = useState();
   const [message, setMessage] = useState('');
   // 2. Make a function to add things to order
   const addToOrder = (orderedPizza) => {
      setOrder([...order, orderedPizza]);
   };
   // 3. Make a function to remove things from the order
   const removeFromOrder = (index) => {
      setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
   };

   // this is the async function that is run when someone submits the form
   async function submitOrder(e) {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setMessage(null);
      // gather all the data
      const body = {
         order: attachNamesAndPrices(order, pizzas),
         total: formatMoney(calculateOrderTotal(order, pizzas)),
         name: values.name,
         email: values.email,
      };
      // 4. Send this data to a serverless func when they check out
      const res = await fetch(`${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body),
      });
      const text = JSON.parse(await res.text());

      // check of everything worked
      if (res.status >= 400 && res.status < 600) {
         setLoading(false);
         setError(text.message);
      } else {
         // it worked
         setLoading(false);
         setMessage('Success! Come on down for your pizza!');
      }
   }

   return {
      order,
      addToOrder,
      removeFromOrder,
      submitOrder,
      error,
      loading,
      message,
   };
};

export default usePizza;
