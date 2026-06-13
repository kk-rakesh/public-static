import { createRoute } from '@tanstack/react-router';
import { StrategyPage } from '../pages/StrategyPage';
import { rootRoute } from './rootRoute';

export const strategyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/strategy',
  component: StrategyPage,
});
