import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { PizzaGridStyles, SinglePizzaStyles } from './PizzaList.styles';

const SinglePizza = ({ pizza }) => (
   <SinglePizzaStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
         <h2>
            <span className="mark">{pizza.name}</span>
         </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
   </SinglePizzaStyles>
);

const PizzaList = ({ pizzas }) => (
   <PizzaGridStyles>
      {pizzas.map((pizza) => (
         <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
   </PizzaGridStyles>
);

export default PizzaList;
