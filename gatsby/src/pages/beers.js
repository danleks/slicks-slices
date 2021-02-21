import { graphql } from 'gatsby';
import React from 'react';

const BeersPage = ({ data }) => {
   console.log('i');
   return (
      <>
         <h2 className="center">We have {data.beers.nodes.length} beers available. Dine in Only!</h2>
         <div>
            {data.beers.nodes.map((beer) => {
               console.log(beer.name);
               return (
                  <div key={beer.id}>
                     <img src={beer.image} alt={beer.name} />
                     <h3>{beer.name}</h3>
                     {beer.price}
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default BeersPage;

export const query = graphql`
   query {
      beers: allBeer {
         nodes {
            id
            name
            image
            price
            rating {
               average
               reviews
            }
         }
      }
   }
`;
