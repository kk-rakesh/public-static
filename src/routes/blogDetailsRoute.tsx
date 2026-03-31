import { createRoute } from '@tanstack/react-router';
import { BlogDetailsPage } from '../App';
import { rootRoute } from './rootRoute';

function BlogDetailsRouteComponent() {
  const { slug } = blogDetailsRoute.useParams();
  return <BlogDetailsPage slug={slug} />;
}

export const blogDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs/$slug',
  component: BlogDetailsRouteComponent,
});
