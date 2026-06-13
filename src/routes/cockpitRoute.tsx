import { createRoute } from '@tanstack/react-router';
import { CockpitPage } from '../pages/CockpitPage';
import { rootRoute } from './rootRoute';

export const cockpitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cockpit',
  component: CockpitPage,
});

// Friendly alias
export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: CockpitPage,
});
