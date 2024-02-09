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
    navigate({ to: '/login' });
  };

  return (
    <div className="p-2">
      <h1>Welcome to Dashboard</h1>
      <button onClick={handleSignOut} className="text-white bg-blue-500 p-4">
        Sign Out
      </button>
    </div>
  );
}
