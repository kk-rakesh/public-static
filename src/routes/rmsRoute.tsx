import { createRoute } from '@tanstack/react-router';
import { RmsPage } from '../pages/RmsPage';
import { rootRoute } from './rootRoute';

export const rmsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rms',
  component: RmsPage,
});
