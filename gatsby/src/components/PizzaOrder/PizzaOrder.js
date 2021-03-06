import React from 'react';
import Img from 'gatsby-image';
import { MenuItemStyles } from './PizzaOrder.styles';
import formatMoney from '../../utils/formatMoney';
import calculatePizzaPrice from '../../utils/calculatePizzaPrice';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) => {
   console.log('gi');
   return (
      <>
         {order.map((singleOrder, index) => {
            const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
            return (
               <MenuItemStyles key={`${singleOrder.id}-${index}`}>
                  <Img fluid={pizza.image.asset.fluid} />
                  <h2>{pizza.name}</h2>
                  <p>
                     {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
                     <button
                        type="button"
                        className="remove"
                        title={`Remove ${singleOrder.size} ${pizza.name} from the order`}
                        onClick={() => removeFromOrder(index)}
                     >
                        &times;
                     </button>
                  </p>
               </MenuItemStyles>
            );
         })}
      </>
   );
};

export default PizzaOrder;
