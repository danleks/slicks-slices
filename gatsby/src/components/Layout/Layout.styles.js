import styled from 'styled-components';
import stripes from '../../assets/images/stripes.svg';

export const ContentStyles = styled.div`
   background-color: var(--white);
   padding: 2rem;
`;

export const SiteBoarderStyles = styled.div`
   max-width: 1000px;
   padding: 5px;
   padding: clamp(5px, 1vw, 25px);
   border: 5px solid var(--white);
   margin: 12rem auto 4rem auto;
   margin-top: clamp(2rem, 10vw, 12rem);

   background: white url(${stripes});
   background-size: 1500px;
   box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.044);

   @media (max-width: 1100px) {
      margin-left: 1.5rem;
      margin-right: 1.5rem;
   }
`;
