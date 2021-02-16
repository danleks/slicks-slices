import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter/ToppingsFilter';

const PizzasPage = ({ data }) => {
   const pizzas = data.pizzas.nodes;
   return (
      <div>
         <ToppingsFilter />
         <PizzaList pizzas={pizzas} />
      </div>
   );
};

export const query = graphql`
   query PizzaQuery {
      pizzas: allSanityPizza {
         nodes {
            name
            id
            slug {
               current
            }
            toppings {
               id
               name
            }
            image {
               asset {
                  fixed(width: 200, height: 200) {
                     ...GatsbySanityImageFixed
                  }
                  fluid(maxWidth: 400) {
                     ...GatsbySanityImageFluid
                  }
               }
            }
         }
      }
   }
`;

export default PizzasPage;
