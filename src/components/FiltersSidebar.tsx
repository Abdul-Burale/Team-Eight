import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { ChevronDown, MapPin, DollarSign, SlidersHorizontal, PoundSterlingIcon } from "lucide-react";

export default function FiltersSidebar() {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <Card className="p-4 rounded-2xl shadow-sm space-y-6 sticky top-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button variant="outline" size="sm">Clear</Button>
        </div>

        <div className="space-y-4">

          {/* Location */}
          <div className="border rounded-xl p-4">
            <button className="flex w-full items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Location
              </span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </button>

            <div className="mt-3">
              <input
                type="text"
                placeholder="Postcode"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Price */}
          <div className="border rounded-xl p-4">
            <button className="flex w-full items-center justify-between text-sm font-medium">
              <span className="flex items-center gap-2">
                <PoundSterlingIcon className="h-4 w-4" /> Price & Size
              </span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </button>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Min" className="border rounded-md px-3 py-2 text-sm" />
                <input type="number" placeholder="Max" className="border rounded-md px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="SqFt Min" className="border rounded-md px-3 py-2 text-sm" />
                <input type="number" placeholder="SqFt Max" className="border rounded-md px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          {/* Apply */}
          <Button className="w-full mt-4">Apply Filters</Button>
        </div>
      </Card>
    </aside>
  );
}
