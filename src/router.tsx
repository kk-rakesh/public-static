import { createRouter } from '@tanstack/react-router';
import { blogDetailsRoute } from './routes/blogDetailsRoute';
import { blogsRoute } from './routes/blogsRoute';
import { homeRoute } from './routes/homeRoute';
import { rootRoute } from './routes/rootRoute';
import { cockpitRoute, dashboardRoute } from './routes/cockpitRoute';
import { backtestRoute } from './routes/backtestRoute';
import { strategyRoute } from './routes/strategyRoute';
import { ordersRoute } from './routes/ordersRoute';
import { rmsRoute } from './routes/rmsRoute';
import { historyRoute } from './routes/historyRoute';
import { v2Route } from './routes/v2Route';

const routeTree = rootRoute.addChildren([
  homeRoute,
  blogsRoute,
  blogDetailsRoute,
  cockpitRoute,
  dashboardRoute,
  backtestRoute,
  strategyRoute,
  ordersRoute,
  rmsRoute,
  historyRoute,
  v2Route,
]);

export const router = createRouter({
  routeTree,
} as any);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
