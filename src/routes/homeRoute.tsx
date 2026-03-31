import { createRoute } from '@tanstack/react-router';
import { HomePage } from '../App';
import { rootRoute } from './rootRoute';

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});
