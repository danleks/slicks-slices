import React from 'react';
import Layout from './src/components/Layout/Layout';
import { OrderProvider } from './src/components/OrderContext/OrderContext';

export const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>;

export const wrapRootElement = ({ element }) => <OrderProvider>{element}</OrderProvider>;
