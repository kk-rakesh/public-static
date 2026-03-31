import { createRoute } from '@tanstack/react-router';
import { BlogsPage } from '../App';
import { rootRoute } from './rootRoute';

export const blogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs',
  component: BlogsPage,
});
