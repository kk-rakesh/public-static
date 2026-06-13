import { createRoute } from '@tanstack/react-router';
import { HistoryPage } from '../pages/HistoryPage';
import { rootRoute } from './rootRoute';

export const historyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: HistoryPage,
});
