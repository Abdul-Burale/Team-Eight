import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

interface User {
  id: string;
  email: string;
  name?: string;
  userType?: 'tenant' | 'landlord' | 'buyer';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, userType: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session?.access_token) {
          setAccessToken(session.access_token);
          // Fetch user profile from backend
          await fetchUserProfile(session.access_token);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.access_token) {
        setAccessToken(session.access_token);
        await fetchUserProfile(session.access_token);
      } else {
        setUser(null);
        setAccessToken(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        console.log('User profile fetched successfully:', userData);
        setUser(userData);
      } else {
        const errorText = await response.text();
        console.error('Error fetching user profile:', response.status, errorText);
        
        // Fallback: Get basic user info from Supabase auth
        const { data: { user: authUser } } = await supabase.auth.getUser(token);
        if (authUser) {
          const fallbackUser = {
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || '',
            userType: authUser.user_metadata?.userType || 'buyer',
          };
          console.log('Using fallback user profile:', fallbackUser);
          setUser(fallbackUser);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      // Fallback: Get basic user info from Supabase auth
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser(token);
        if (authUser) {
          const fallbackUser = {
            id: authUser.id,
            email: authUser.email || '',
            name: authUser.user_metadata?.name || '',
            userType: authUser.user_metadata?.userType || 'buyer',
          };
          console.log('Using fallback user profile after error:', fallbackUser);
          setUser(fallbackUser);
        }
      } catch (fallbackError) {
        console.error('Fallback user profile fetch also failed:', fallbackError);
      }
    }
  };

  const signUp = async (email: string, password: string, name: string, userType: string) => {
    try {
      console.log('Attempting to sign up:', { email, name, userType });
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-d12e8f4b/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password, name, userType }),
      });

      const data = await response.json();
      console.log('Sign up response:', response.status, data);

      if (!response.ok) {
        console.error('Sign up failed:', data);
        return { error: data.error || 'Sign up failed' };
      }

      console.log('Sign up successful');
      return {};
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'An unexpected error occurred during sign up' };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with email:', email);
      
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase sign in error:', error);
        return { error: error.message };
      }

      if (!session) {
        console.error('No session returned from sign in');
        return { error: 'Failed to create session' };
      }

      console.log('Sign in successful, session created');

      if (session?.access_token) {
        setAccessToken(session.access_token);
        await fetchUserProfile(session.access_token);
      }

      return {};
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: error.message || 'An unexpected error occurred during sign in' };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error: any) {
      console.error('Password reset error:', error);
      return { error: error.message || 'An unexpected error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut, resetPassword, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { supabase };
