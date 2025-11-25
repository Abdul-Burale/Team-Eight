export interface Property {
    id: number;
    title: string;
    description?: string;
    price: number;
    location: string;
    city: string;
    postcode: string;
    bedrooms: number;
    property_type: string;
    near_park?: boolean;
    near_school?: boolean;
    noise_level?: number;
    image_urls?: string[];          // updated
    virtual_tour_link?: string;
    latitude: number;
    longitude: number;
    created_at?: string;
  }
  