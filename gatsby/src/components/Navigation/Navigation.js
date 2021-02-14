import React from 'react';
import { Link } from 'gatsby';
import { NavigationStyles } from './Navigation.styles';
import Logo from '../Logo/Logo';

const Navigation = () => (
   <NavigationStyles>
      <ul>
         <li>
            <Link to="/">Hot Now</Link>
         </li>
         <li>
            <Link to="/pizzas">Pizza Menu</Link>
         </li>
         <li>
            <Link to="/">
               <Logo />
            </Link>
         </li>
         <li>
            <Link to="/slicemasters">SliceMasters</Link>
         </li>
         <li>
            <Link to="/order">Order Ahead!</Link>
         </li>
      </ul>
   </NavigationStyles>
);

export default Navigation;
