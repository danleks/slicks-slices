import styled from 'styled-components';

export const PaginationStyles = styled.div`
   display: flex;
   align-content: center;
   align-items: center;
   justify-items: center;
   border: 1px solid var(--grey);
   margin: 2rem 0;
   border-radius: 5px;
   text-align: center;
   & > * {
      padding: 1rem;
      flex: 1;
      border-right: 1px solid var(--grey);
      text-decoration: none;

      &[aria-current],
      &.current {
         color: var(--red);
      }
      &[disabled] {
         pointer-events: none;
         color: var(--grey);
      }
   }
`;
