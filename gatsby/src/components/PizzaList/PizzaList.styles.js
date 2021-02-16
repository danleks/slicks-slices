import styled from 'styled-components';

export const PizzaGridStyles = styled.ul`
   display: grid;
   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
   grid-template-rows: auto auto 500px;
   gap: 4rem;
   list-style: none;
`;

export const SinglePizzaStyles = styled.li`
   display: grid;
   @supports not (grid-template-rows: subgrid) {
      --rows: auto auto 500px;
   }
   grid-template-rows: var(--rows, subgrid);
   grid-row: span 3;
   gap: 1rem;

   h2,
   p {
      margin: 0;
   }
`;
