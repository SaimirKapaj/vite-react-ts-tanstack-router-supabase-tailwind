import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/auth';

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
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate({ to: '/' });
  };

  return (
    <div>
      <h1>Dashboard page</h1>
      <button
        onClick={handleSignOut}
        className="text-white bg-red-500 p-2 mt-6"
      >
        Sign Out
      </button>
    </div>
  );
}
