import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';

export default function BuyerHeader() {
  const [userInitials, setUserInitials] = useState<string>('AC');
  const [username, setUsername] = useState<string>('AlexC');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          console.error('BuyerHeader: Failed to get authenticated user', authError);
          setLoading(false);
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('first_name, last_name, email')
          .eq('id', user.id)
          .single();

        if (profileError || !profile) {
          console.error('BuyerHeader: Failed to fetch user profile', profileError);
          // Use email as fallback
          const emailName = user.email?.split('@')[0] || 'User';
          setUsername(emailName);
          setUserInitials(emailName.substring(0, 2).toUpperCase());
        } else {
          const firstName = profile.first_name || '';
          const lastName = profile.last_name || '';
          const fullName = `${firstName}${lastName ? ' ' + lastName : ''}`.trim() || user.email?.split('@')[0] || 'User';
          setUsername(fullName);
          const initials = (firstName.charAt(0) + (lastName?.charAt(0) || '')).toUpperCase() || fullName.substring(0, 2).toUpperCase();
          setUserInitials(initials);
        }
      } catch (err) {
        console.error('BuyerHeader: Error fetching user data', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 w-full px-8 py-6">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          ) : (
            <>
              <span className="text-sm font-medium text-gray-900">{username}</span>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{userInitials}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

