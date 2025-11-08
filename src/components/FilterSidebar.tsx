import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Card } from './ui/card';

interface FilterSidebarProps {
  onApplyFilters: (filters: any) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({ onApplyFilters, onClearFilters }: FilterSidebarProps) {
  return (
    <Card className="p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3>Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>
      
      <div className="space-y-6">
        <div>
          <Label>Price Range</Label>
          <div className="flex gap-2 mt-2">
            <Input type="number" placeholder="Min" className="w-full" />
            <Input type="number" placeholder="Max" className="w-full" />
          </div>
          <Slider defaultValue={[300000]} max={1000000} step={10000} className="mt-4" />
        </div>
        
        <div>
          <Label>Location</Label>
          <Input placeholder="Enter location" className="mt-2" />
        </div>
        
        <div>
          <Label>Property Type</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Bedrooms</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Bathrooms</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="mb-3">Amenities</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="parking" />
              <label htmlFor="parking" className="text-sm cursor-pointer">Parking</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="gym" />
              <label htmlFor="gym" className="text-sm cursor-pointer">Gym</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="pool" />
              <label htmlFor="pool" className="text-sm cursor-pointer">Pool</label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="garden" />
              <label htmlFor="garden" className="text-sm cursor-pointer">Garden</label>
            </div>
          </div>
        </div>
        
        <div>
          <Label>Lifestyle</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quiet">Quiet Neighborhood</SelectItem>
              <SelectItem value="family">Family-Friendly</SelectItem>
              <SelectItem value="urban">Urban/Busy</SelectItem>
              <SelectItem value="suburban">Suburban</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Max Commute Time</Label>
          <Select>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="45">45 minutes</SelectItem>
              <SelectItem value="60">60 minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full" onClick={() => onApplyFilters({})}>
          Apply Filters
        </Button>
      </div>
    </Card>
  );
}
