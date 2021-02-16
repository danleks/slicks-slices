import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
   siteMetadata: {
      title: `Slick's slices`,
      description: `The best pizza you can imagine`,
   },
   plugins: [
      'gatsby-plugin-styled-components',
      {
         resolve: 'gatsby-source-sanity',
         options: {
            projectId: 't6vfv1vx',
            dataset: 'production',
            watch: true,
            token: process.env.SANITY_TOKEN,
         },
      },
   ],
};
