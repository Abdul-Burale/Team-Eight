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
    console.log("ListingSuccess mounted");
    console.log("User loading:", loading, "User:", user);
    console.log("Session ID from query:", sessionId);

    if (!loading && !user) {
      console.log("No user, redirecting to signup");
      navigate("/signup");
      return;
    }

    if (!sessionId) {
      console.log("No session ID found in URL");
      setStatus("❌ No session ID found.");
      return;
    }

    async function completeListing() {
      try {
        console.log("Calling verify-checkout-session with session ID:", sessionId);

        const res = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-checkout-session`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({ sessionId }),
            }
          );
          

        console.log("Edge function response status:", res.status);

        const data = await res.json();
        console.log("Edge function response data:", data);

        if (data.success) {
          console.log("Payment verified successfully");
          setStatus("✅ Listing posted successfully!");
        } else {
          console.log("Payment verification failed");
          setStatus("❌ Payment verification failed.");
        }
      } catch (err: any) {
        console.error("Error calling edge function:", err);
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
