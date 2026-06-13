import { createRoute } from '@tanstack/react-router';
import { BacktestPage } from '../pages/BacktestPage';
import { rootRoute } from './rootRoute';

export const backtestRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/backtest',
  component: BacktestPage,
});
