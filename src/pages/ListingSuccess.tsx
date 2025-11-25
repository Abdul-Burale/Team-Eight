import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ListingSuccess() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [status, setStatus] = useState("Verifying payment...");

  const query = new URLSearchParams(useLocation().search);
  const sessionId = query.get("session_id");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signup");
      return;
    }

    if (!sessionId) {
      setStatus("❌ No session ID found.");
      return;
    }

    async function completeListing() {
      try {
        // Send session_id to your edge function
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-checkout-session`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          }
        );

        const data = await res.json();

        if (data.success) {
          setStatus("✅ Listing posted successfully!");
        } else {
          setStatus("❌ Payment verification failed.");
        }
      } catch (err: any) {
        console.error(err);
        setStatus("⚠️ Error verifying payment.");
      }
    }

    if (!loading && user) {
      completeListing();
    }
  }, [sessionId, loading, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="bg-white shadow-md rounded-3xl p-10 max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">{status}</h1>
        {status.includes("successfully") && (
          <button
            onClick={() => navigate("/search")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Browse Properties
          </button>
        )}
      </div>
    </div>
  );
}