import { createRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { rootRoute } from './rootRoute';

const BlogDetailsPage = lazy(() => import('../BlogPages').then((m) => ({ default: m.BlogDetailsPage })));

function BlogDetailsRouteComponent() {
  const { slug } = blogDetailsRoute.useParams();
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BlogDetailsPage slug={slug} />
    </Suspense>
  );
}

export const blogDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs/$slug',
  component: BlogDetailsRouteComponent,
});
