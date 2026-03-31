import { createRouter } from '@tanstack/react-router';
import { blogDetailsRoute } from './routes/blogDetailsRoute';
import { blogsRoute } from './routes/blogsRoute';
import { homeRoute } from './routes/homeRoute';
import { rootRoute } from './routes/rootRoute';

const routeTree = rootRoute.addChildren([homeRoute, blogsRoute, blogDetailsRoute]);

export const router = createRouter({
  routeTree,
} as any);

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
