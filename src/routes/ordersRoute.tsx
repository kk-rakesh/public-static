import { createRoute } from '@tanstack/react-router';
import { OrdersPage } from '../pages/OrdersPage';
import { rootRoute } from './rootRoute';

export const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: OrdersPage,
});
