import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Home } from './pages/Home';
import { CustomerPortal } from './pages/CustomerPortal';
import { RestaurantPortal } from './pages/RestaurantPortal';
import { DeliveryPortal } from './pages/DeliveryPortal';
import { AboutProject } from './pages/AboutProject';
import { Technologies } from './pages/Technologies';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const customerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customer',
  component: CustomerPortal,
});

const restaurantRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/restaurant',
  component: RestaurantPortal,
});

const deliveryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/delivery',
  component: DeliveryPortal,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutProject,
});

const technologiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/technologies',
  component: Technologies,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  customerRoute,
  restaurantRoute,
  deliveryRoute,
  aboutRoute,
  technologiesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
