import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { ToppingsStyles } from './ToppingsFilter.styles';

const countPizzasInToppings = (pizzas) => {
   console.log(pizzas);
   const counts = pizzas
      .map((pizza) => pizza.toppings)
      .flat()
      .reduce((acc, topping) => {
         // check if this is an existing toppings
         const existingTopping = acc[topping.id];
         if (existingTopping) {
            // if it is, increment it by 1
            existingTopping.count += 1;
         } else {
            // otherwise create a new entry and our acc and set it to 1
            acc[topping.id] = {
               id: topping.id,
               name: topping.name,
               count: 1,
            };
         }
         return acc;
      }, {});

   // sort them based on the count
   const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count);

   return sortedToppings;
};

const ToppingsFilter = () => {
   console.clear();
   // Get a list of all the toppings
   // Get a list of all the pizzas with their toppings
   const { toppings, pizzas } = useStaticQuery(graphql`
      query {
         toppings: allSanityTopping {
            nodes {
               name
               id
               vegetarian
            }
         }
         pizzas: allSanityPizza {
            nodes {
               toppings {
                  name
                  id
               }
            }
         }
      }
   `);
   // Count how many pizzas are in each topping
   const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);
   console.log(toppingsWithCounts);
   // Loop over the list of toppings and display the topping and the count of the pizzas in that topping
   return (
      <ToppingsStyles>
         {toppingsWithCounts.map((topping) => (
            <Link key={topping.id} to={`/topping/${topping.name}`}>
               <span className="name">{topping.name}</span>
               <span className="count">{topping.count}</span>
            </Link>
         ))}
      </ToppingsStyles>
   );
};

export default ToppingsFilter;
