import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuth } from '@/auth';

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: '/dashboard',
      });
    }
  },
  component: Login,
});

function Login() {
  const { signInWithAzure } = useAuth();

  return (
    <div>
      <h1>Login page</h1>
      <button
        onClick={signInWithAzure}
        className="text-white bg-blue-500 p-2 mt-6"
      >
        Sign in with Azure
      </button>
    </div>
  );
}
