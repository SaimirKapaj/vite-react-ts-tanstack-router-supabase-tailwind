import {
  createRootRouteWithContext,
  Outlet,
  Link,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useAuth, type AuthContext } from '@/auth';

type RouterContext = {
  auth: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <main className="max-w-screen-md m-auto p-6 mt-12">
        <nav className="flex gap-6 border-b border-gray-400 pb-4">
          <Link
            to="/about"
            activeProps={{
              className: 'font-bold',
            }}
          >
            About
          </Link>
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              activeProps={{
                className: 'font-bold',
              }}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              activeProps={{
                className: 'font-bold',
              }}
            >
              Login
            </Link>
          )}
        </nav>
        <div className="mt-12">
          <Outlet />
        </div>
      </main>
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </>
  );
}
