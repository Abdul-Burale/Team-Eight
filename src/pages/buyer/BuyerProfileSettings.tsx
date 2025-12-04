import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";

// Buyer UI Components
import BuyerSidebar from "../../components/buyer/BuyerSidebar";
import BuyerHeader from "../../components/buyer/BuyerHeader";

// Reusable forms from seller folder (still work for buyers)
import PersonalInfoForm from "../../components/seller/PersonalInfoForm";
import SecuritySettingsForm from "../../components/seller/SecuritySettingsForm";
import DangerZone from "../../components/seller/DangerZone";

import { User } from "lucide-react";

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  created_at: string;
}

export default function BuyerProfileSettings() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Authorization Check
  useEffect(() => {
    const validate = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate("/signin");
        return;
      }

      if (session.user.id !== userId) {
        navigate("/unauthorized");
        setIsAuthorized(false);
        return;
      }

      setIsAuthorized(true);
    };

    validate();
  }, [userId, navigate]);

  // Fetch Profile
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const { data: userProfile, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) throw error;

        setProfile(userProfile);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthorized, userId]);

  // Save personal info
  const handleSavePersonalInfo = async (data: { first_name: string; last_name: string; phone: string }) => {
    if (!profile) return;

    const { error } = await supabase
      .from("users")
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone || null
      })
      .eq("id", profile.id);

    if (error) {
      throw new Error(error.message);
    }

    setProfile({
      ...profile,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone
    });
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unauthorized</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">

        {/* Sidebar */}
        <BuyerSidebar />

        <main className="flex-1">
          <BuyerHeader />

          <div className="p-6 max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              </div>
              <p className="text-gray-600 ml-14">Update your personal details and account settings.</p>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading profile...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : profile ? (
              <>
                {/* Personal Info */}
                <div className="mb-6">
                  <PersonalInfoForm profile={profile} onSave={handleSavePersonalInfo} />
                </div>

                {/* Security Settings */}
                <div className="mb-6">
                  <SecuritySettingsForm />
                </div>

                {/* Danger Zone */}
                <DangerZone />
              </>
            ) : null}

          </div>
        </main>
      </div>
    </div>
  );
}
