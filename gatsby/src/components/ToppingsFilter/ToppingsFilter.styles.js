import styled from 'styled-components';

export const ToppingsStyles = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 1rem;
   margin-bottom: 4rem;

   a {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      gap: 0 1rem;
      padding: 5px;
      border-radius: 2px;
      background-color: var(--grey);

      .count {
         background-color: var(--white);
         padding: 2px 5px;
      }

      &[aria-current='page'] {
         background-color: var(--yellow);
      }
      &.active {
         background-color: var(--yellow);
      }
   }
`;
