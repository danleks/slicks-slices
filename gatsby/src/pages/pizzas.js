import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter/ToppingsFilter';

const PizzasPage = ({ data, pageContext }) => {
   const pizzas = data.pizzas.nodes;
   return (
      <div>
         <ToppingsFilter activeTopping={pageContext.topping} />
         <PizzaList pizzas={pizzas} />
      </div>
   );
};

export const query = graphql`
   query PizzaQuery($toppingRegex: String) {
      pizzas: allSanityPizza(filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }) {
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
