import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { createClient, Session } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

type AuthCredentials = {
  email: string;
  password: string;
};

export type AuthContext = {
  isSessionLoaded: boolean;
  session: Session | null;
  isAuthenticated: boolean;
  handleSignIn: (credentials: AuthCredentials) => Promise<void>;
  handleSignInWithAzure: () => Promise<void>;
  handleSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const isAuthenticated = !!session;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsSessionLoaded(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async ({ email, password }: AuthCredentials) => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const handleSignInWithAzure = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email profile User.Read',
        redirectTo: `${location.origin}/`,
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        isSessionLoaded,
        session,
        isAuthenticated,
        handleSignIn,
        handleSignInWithAzure,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
