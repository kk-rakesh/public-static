import { createRoute } from '@tanstack/react-router';
import { HomePageV2 } from '../pages/HomePageV2';
import { rootRoute } from './rootRoute';

export const v2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/v2',
  component: HomePageV2,
});
