import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomeLayout } from '../layouts';
import { Cart, ProductList, OrderList } from '../pages';
import { routes } from './routes';

function Router() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomeLayout />}>
        <Route path={routes.orderList} element={<OrderList />} />
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.home} element={<ProductList />} />
      </Route>
    </Routes>
  );
}

export { Router };
