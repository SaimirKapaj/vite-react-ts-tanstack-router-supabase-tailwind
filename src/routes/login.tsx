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
    <div className="p-2">
      <button onClick={signInWithAzure} className="text-white bg-blue-500 p-4">
        Sign in with Azure
      </button>
    </div>
  );
}
