import { graphql } from 'gatsby';
import React, { useState } from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import { OrderPageStyles, MenuItemStyles } from '../styles/OrderPageStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const OrderPage = ({ data }) => {
   const pizzas = data.pizzas.nodes;
   const { values, updateValues } = useForm({
      name: '',
      email: '',
   });
   const { order, addToOrder, removeFromOrder, submitOrder, error, loading, message } = usePizza({
      pizzas,
      values,
   });
   if (message) {
      return <p>{message}</p>;
   }
   return (
      <>
         <SEO title="Order a Pizza!" />
         <OrderPageStyles onSubmit={submitOrder}>
            <fieldset>
               <legend>Your info</legend>
               <label htmlFor="name">
                  Name
                  <input id="name" type="text" name="name" value={values.name} onChange={updateValues} />
               </label>
               <label htmlFor="email">
                  Email
                  <input id="email" type="email" name="email" value={values.email} onChange={updateValues} />
               </label>
            </fieldset>
            <fieldset className="menu">
               <legend>Menu</legend>
               {pizzas.map((pizza) => (
                  <MenuItemStyles key={pizza.id}>
                     <Img width="50" height="50" fluid={pizza.image.asset.fluid} alt={pizza.name} />
                     <div>
                        <h2>{pizza.name}</h2>
                     </div>
                     <div>
                        {['S', 'M', 'L'].map((size) => (
                           <button
                              key={size}
                              type="button"
                              onClick={() =>
                                 addToOrder({
                                    id: pizza.id,
                                    size,
                                 })
                              }
                           >
                              {size}
                              {formatMoney(calculatePizzaPrice(pizza.price, size))}
                           </button>
                        ))}
                     </div>
                  </MenuItemStyles>
               ))}
            </fieldset>
            <fieldset className="order">
               <legend>Order</legend>
               <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas} />
            </fieldset>
            <fieldset>
               <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
               <div>{error ? <p>Error: {error}</p> : ''}</div>
               <button type="submit" disabled={loading}>
                  {loading ? 'Placing Order...' : 'Order Ahead'}
               </button>
            </fieldset>
         </OrderPageStyles>
      </>
   );
};

export default OrderPage;

export const query = graphql`
   query {
      pizzas: allSanityPizza {
         nodes {
            name
            id
            slug {
               current
            }
            price
            image {
               asset {
                  fluid(maxWidth: 100) {
                     ...GatsbySanityImageFluid
                  }
               }
            }
         }
      }
   }
`;
