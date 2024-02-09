import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-2">
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}
