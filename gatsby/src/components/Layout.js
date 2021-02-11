import React from 'react';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer/Footer';
import Navigation from './Navigation/Navigation';

const Layout = ({ children }) => (
   <>
      <GlobalStyles />
      <Typography />
      <Navigation />
      {children}
      <Footer />
   </>
);

export default Layout;
