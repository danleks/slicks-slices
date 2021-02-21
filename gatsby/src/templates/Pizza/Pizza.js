import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import { PizzaGridStyles } from './Pizza.styles';

const SinglePizzaPage = ({ data }) => {
   const { pizza } = data;
   return (
      <PizzaGridStyles>
         <Img fluid={pizza.image.asset.fluid} />
         <div>
            <h2 className="mark">{pizza.name}</h2>
            <ul>
               {pizza.toppings.map((topping) => (
                  <li key={topping.id}>{topping.name}</li>
               ))}
            </ul>
         </div>
      </PizzaGridStyles>
   );
};

export default SinglePizzaPage;

// This is dynamic based on the slug passed via context in gatsby-node.js
export const query = graphql`
   query($slug: String!) {
      pizza: sanityPizza(slug: { current: { eq: $slug } }) {
         name
         id
         image {
            asset {
               fluid(maxWidth: 800) {
                  ...GatsbySanityImageFluid
               }
            }
         }
         toppings {
            name
            id
            vegetarian
         }
      }
   }
`;
