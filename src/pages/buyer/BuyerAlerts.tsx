import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import BuyerSidebar from "../../components/buyer/BuyerSidebar";
import BuyerHeader from "../../components/buyer/BuyerHeader";
import AlertListItem from "../../components/buyer/AlertListItem";

interface Alert {
  id: number;
  user_id: string;
  alert_type: "price_drop" | "new_match" | "offer_update" | "market_insight";
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function BuyerAlerts() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  // Validate user access
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

  // Fetch alerts
  useEffect(() => {
    if (!isAuthorized) return;

    const fetchAlerts = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching alerts:", error);
        setAlerts([]);
      } else {
        setAlerts(data || []);
      }

      setLoading(false);
    };

    fetchAlerts();
  }, [isAuthorized, userId]);

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
    <div className="min-h-screen bg-white">
      <div className="flex">

        {/* Sidebar */}
        <BuyerSidebar />

        <main className="flex-1">
          {/* Top Header */}
          <BuyerHeader />

          <div className="px-8 py-6">

            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
              <p className="text-gray-600">
                View all your updates, price drops, offer updates, and market insights.
              </p>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 rounded-full mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading alerts...</p>
              </div>
            ) : alerts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">You have no alerts right now.</p>
                <button
                  onClick={() => navigate(`/buyer/${userId}/search`)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Start Searching
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <AlertListItem key={alert.id} alert={alert} />
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
