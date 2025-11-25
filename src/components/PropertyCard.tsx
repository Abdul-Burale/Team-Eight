import { useNavigate } from "react-router-dom";
import type { Property } from "../types";
import { Card } from "./ui/Card";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`); // navigate to property details page
  };

  const firstImage = property.image_urls?.[0] ?? "/placeholder.jpg";

  return (
    <Card
      noPadding
      className="hover:shadow-md transition-transform duration-200 transform hover:-translate-y-2 cursor-pointer"
      onClick={handleClick}
    >
      <img src={firstImage} alt={property.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-semibold"> £{property.price != null ? property.price.toLocaleString() : "N/A"} </p>
      </div>
    </Card>
  );
}
