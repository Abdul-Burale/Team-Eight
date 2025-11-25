import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import type { Property } from "../types";

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        setProperty(null);
      } else {
        setProperty(data);
      }

      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <p className="text-gray-700 mb-2">{property.description}</p>
      <p className="text-gray-600 mb-2">
        {property.location}, {property.city}, {property.postcode}
      </p>
      <p className="text-blue-600 font-semibold mb-4">
        £{property.price.toLocaleString()}
      </p>

      {property.image_urls && property.image_urls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property.image_urls.map((url, idx) => (
            <img key={idx} src={url} alt={`Image ${idx + 1}`} className="w-full h-64 object-cover rounded-md" />
          ))}
        </div>
      )}

      <div className="mt-4">
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Property type: {property.property_type}</p>
        {property.near_park && <p>Near park</p>}
        {property.near_school && <p>Near school</p>}
        {property.noise_level && <p>Noise level: {property.noise_level}</p>}
        {property.virtual_tour_link && (
          <p>
            Virtual tour: <a href={property.virtual_tour_link} className="text-blue-500 underline" target="_blank" rel="noreferrer">{property.virtual_tour_link}</a>
          </p>
        )}
      </div>
    </div>
  );
}
