import { Home, TrendingUp, MapPin } from "lucide-react";

export function WhatWeOffer() {
  const items = [
    {
      icon: Home,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Smart Matching",
      text: "AI-powered search finds homes that perfectly match your lifestyle and preferences",
    },
    {
      icon: TrendingUp,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Market Intelligence",
      text: "Access real-time price forecasts and investment potential analysis",
    },
    {
      icon: MapPin,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Lifestyle Matching",
      text: "Find neighborhoods that match your commute needs and lifestyle preferences",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-center text-2xl font-semibold mb-8">
        Why Choose HomeMatch?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex flex-col gap-6 rounded-xl border bg-white hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="p-6 text-center">
                <div
                  className={`${item.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`h-8 w-8 ${item.iconColor}`} />
                </div>

                <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhatWeOffer;
