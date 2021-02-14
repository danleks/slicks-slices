import styled from 'styled-components';

export const NavigationStyles = styled.nav`
   margin-bottom: 3rem;

   .logo {
      transform: translateY(-25%);
   }

   ul {
      display: grid;
      grid-template-columns: 1fr 1fr auto 1fr 1fr;
      align-items: center;
      gap: 2rem;

      padding: 0;
      margin: 0;
      margin-top: -6rem;
      list-style: none;
      text-align: center;
   }

   li {
      --rotate: -2deg;
      transform: rotate(var(--rotate));
      order: 1;

      :nth-child(1) {
         --rotate: 1deg;
      }

      :nth-child(2) {
         --rotate: -2.5deg;
      }

      ::nth-child(4) {
         --rotate: 2.5deg;
      }
      :hover {
         --rotate: 3deg;
      }
   }

   a {
      font-size: 3rem;
      text-decoration: none;
      :hover {
         color: var(--red);
      }
   }
`;
