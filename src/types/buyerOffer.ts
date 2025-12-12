export type BuyerOffer = {
  id: number;
  user_id: string;
  property_id: number;
  offer_amount: number;
  offer_type: string;
  status: 'pending' | 'accepted' | 'rejected';
  submitted_at: string;
  properties: {
    id: number;
    title: string;
    location: string;
    image_url: string;
  };
};

