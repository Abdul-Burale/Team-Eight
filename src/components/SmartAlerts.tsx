import { Bell } from "lucide-react";

export function SmartAlerts() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-6 rounded-xl border max-w-4xl mx-auto bg-blue-600 text-white">
        <div className="p-8">
          <div className="flex items-start justify-between gap-4">

            {/* Left content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="h-6 w-6" />
                <h2 className="text-xl font-semibold">Smart Alerts</h2>
              </div>

              <p className="mb-4 opacity-90">
                Get notified instantly when new properties matching your
                preferences become available. Our AI learns from your searches
                to send you the most relevant listings.
              </p>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white/90 text-blue-700 font-medium text-sm px-4 py-2 h-9 transition hover:bg-white"
              >
                Set Up Alerts
              </button>
            </div>

            {/* Badge */}
            <span className="inline-flex items-center justify-center rounded-md bg-yellow-400 text-yellow-900 text-xs font-medium px-2 py-0.5 border border-transparent">
              3 New Matches
            </span>

          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartAlerts;
