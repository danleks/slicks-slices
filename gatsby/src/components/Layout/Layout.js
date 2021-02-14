import React from 'react';
import 'normalize.css';
import GlobalStyles from '../../styles/GlobalStyles';
import Typography from '../../styles/Typography';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import { ContentStyles, SiteBoarderStyles } from './Layout.styles';

const Layout = ({ children }) => (
   <>
      <GlobalStyles />
      <Typography />
      <SiteBoarderStyles>
         <ContentStyles>
            <Navigation />
            {children}
            <Footer />
         </ContentStyles>
      </SiteBoarderStyles>
   </>
);

export default Layout;
