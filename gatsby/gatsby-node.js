import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
   // 1. Get a template for this page
   const pizzaTemplate = path.resolve('./src/templates/Pizza/Pizza.js');
   // .2 Query all the pizzas
   const { data } = await graphql(`
      query {
         pizzas: allSanityPizza {
            nodes {
               name
               slug {
                  current
               }
            }
         }
      }
   `);
   // 3. Loop over each pizza and create a page for that pizza\
   data.pizzas.nodes.forEach((pizza) => {
      actions.createPage({
         // url for the new page
         path: `pizza/${pizza.slug.current}`,
         component: pizzaTemplate,
         context: {
            slug: pizza.slug.current,
         },
      });
   });
}

async function turnToppingsIntoPages({ graphql, actions }) {
   // 1. Get a template
   const toppingTemplate = path.resolve('./src/pages/pizzas.js');
   // 2. Query all the toppings
   const { data } = await graphql(`
      query {
         toppings: allSanityTopping {
            nodes {
               name
               id
            }
         }
      }
   `);
   // 3. Create page for the topping
   // 4. Pass topping data to pizza.js
   data.toppings.nodes.forEach((topping) => {
      actions.createPage({
         path: `topping/${topping.name}`,
         component: toppingTemplate,
         context: {
            topping: topping.name,
            // TODO Regex for Topping
            toppingRegex: `/${topping.name}/i`,
         },
      });
   });
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest }) {
   // 1. Fetch list of beers
   const res = await fetch('https://api.sampleapis.com/beers/ale');
   const beers = await res.json();
   // 2. Loop over each of them
   for (const beer of beers) {
      // crate a node for each beers
      const nodeMeta = {
         id: createNodeId(`beer-${beer.name}`),
         parent: null,
         children: [],
         internal: {
            type: 'Beer',
            mediaType: 'application/json',
            contentDigest: createContentDigest(beer),
         },
      };
      // 3. Create a node for that beer
      actions.createNode({
         ...beer,
         ...nodeMeta,
      });
   }
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
   // 1. Query all slicemasters
   const { data } = await graphql(`
      query {
         slicemasters: allSanityPerson {
            totalCount
            nodes {
               id
               name
               slug {
                  current
               }
            }
         }
      }
   `);
   // TODO: 2. Turn each slicemaster into their page
   // 3. Figure out how many pages there are based on how many slicemasters there are, and how many per page!
   const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
   const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
   // 4. Loop from 1 to n and crate pages for them
   Array.from({ length: pageCount }).map((_, i) => {
      actions.createPage({
         path: `slicemasters/${i + 1}`,
         component: path.resolve('./src/pages/slicemasters.js'),
         context: {
            skip: i * pageSize,
            currentPage: i + 1,
            pageSize,
         },
      });
   });
}

export async function sourceNodes(params) {
   // fetch a list of beers and source them into our gatsby API
   await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
   // create pages dynamically
   // 1. pizzas
   // 2. toppings
   await Promise.all([turnPizzasIntoPages(params), turnToppingsIntoPages(params), turnSlicemastersIntoPages(params)]);
   // 3. slicemasters
}
