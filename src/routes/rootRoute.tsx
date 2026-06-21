import { createRootRoute, Outlet } from '@tanstack/react-router';
import { LazyMotion, domAnimation } from 'framer-motion';

function RootLayout() {
  return (
    <LazyMotion features={domAnimation}>
      <Outlet />
    </LazyMotion>
  );
}

export const rootRoute = createRootRoute({ component: RootLayout });
