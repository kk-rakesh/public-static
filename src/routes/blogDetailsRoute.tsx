import { createRoute } from '@tanstack/react-router';
import { BlogDetailsPage } from '../App';
import { rootRoute } from './rootRoute';

function BlogDetailsRouteComponent() {
  const { blogId } = blogDetailsRoute.useParams();
  return <BlogDetailsPage blogId={blogId} />;
}

export const blogDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/blogs/$blogId',
  component: BlogDetailsRouteComponent,
});
