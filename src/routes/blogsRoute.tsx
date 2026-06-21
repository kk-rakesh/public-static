import { createRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { rootRoute } from './rootRoute';

const BlogsPage = lazy(() => import('../BlogPages').then((m) => ({ default: m.BlogsPage })));

export const blogsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs',
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BlogsPage />
    </Suspense>
  ),
});
