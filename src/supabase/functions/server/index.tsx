import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to verify user
async function verifyUser(authHeader: string | undefined) {
  const accessToken = authHeader?.split(' ')[1];
  
  if (!accessToken) {
    return { error: 'Unauthorized', user: null };
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return { error: 'Unauthorized', user: null };
  }

  return { error: null, user };
}

// Generate unique ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Health check endpoint
app.get("/make-server-d12e8f4b/health", (c) => {
  return c.json({ status: "ok" });
});

// Sign up endpoint
app.post("/make-server-d12e8f4b/auth/signup", async (c) => {
  try {
    const { email, password, name, userType } = await c.req.json();

    // Validate input
    if (!email || !password || !name || !userType) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    if (password.length < 8) {
      return c.json({ error: 'Password must be at least 8 characters' }, 400);
    }

    const validUserTypes = ['tenant', 'landlord', 'buyer'];
    if (!validUserTypes.includes(userType)) {
      return c.json({ error: 'Invalid user type' }, 400);
    }

    // Create user with Supabase Auth
    // Automatically confirm the user's email since an email server hasn't been configured.
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, userType },
      email_confirm: true,
    });

    if (error) {
      console.error('Error creating user during sign up:', error);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      email: data.user.email,
      name,
      userType,
      createdAt: new Date().toISOString(),
    });

    return c.json({
      success: true,
      message: 'Account created successfully. Please check your email for verification.',
    });
  } catch (error: any) {
    console.error('Sign up error:', error);
    return c.json({ error: 'An unexpected error occurred during sign up' }, 500);
  }
});

// Get user profile endpoint
app.get("/make-server-d12e8f4b/user/profile", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${user.id}`);

    if (!userProfile) {
      // If profile doesn't exist, create it from user metadata
      const profile = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || '',
        userType: user.user_metadata?.userType || 'buyer',
      };
      
      await kv.set(`user:${user.id}`, profile);
      return c.json(profile);
    }

    return c.json(userProfile);
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    return c.json({ error: 'Failed to fetch user profile' }, 500);
  }
});

// Update user profile endpoint
app.put("/make-server-d12e8f4b/user/profile", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    const updates = await c.req.json();

    // Get existing profile
    const existingProfile = await kv.get(`user:${user.id}`) || {};

    // Update profile
    const updatedProfile = {
      ...existingProfile,
      ...updates,
      id: user.id,
      email: user.email,
    };

    await kv.set(`user:${user.id}`, updatedProfile);

    return c.json(updatedProfile);
  } catch (error: any) {
    console.error('Error updating user profile:', error);
    return c.json({ error: 'Failed to update user profile' }, 500);
  }
});

// ==================== PROPERTY MANAGEMENT ENDPOINTS ====================

// Create property listing
app.post("/make-server-d12e8f4b/properties", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    // Check if user is a landlord
    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.userType !== 'landlord') {
      return c.json({ error: 'Only landlords can create property listings' }, 403);
    }

    const propertyData = await c.req.json();

    // Validate required fields
    const requiredFields = ['title', 'price', 'propertyType', 'address', 'bedrooms', 'bathrooms'];
    for (const field of requiredFields) {
      if (!propertyData[field] && propertyData[field] !== 0) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }

    // Generate unique ID
    const propertyId = generateId();

    // Create property object
    const property = {
      id: propertyId,
      landlordId: user.id,
      landlordName: userProfile.name,
      landlordEmail: user.email,
      title: propertyData.title,
      price: propertyData.price,
      propertyType: propertyData.propertyType,
      address: propertyData.address,
      location: propertyData.location || propertyData.address,
      description: propertyData.description || '',
      bedrooms: propertyData.bedrooms,
      bathrooms: propertyData.bathrooms,
      sqft: propertyData.sqft || null,
      features: propertyData.features || [],
      images: propertyData.images || [],
      videoTour: propertyData.videoTour || null,
      listingDuration: propertyData.listingDuration || '30',
      status: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + parseInt(propertyData.listingDuration || '30') * 24 * 60 * 60 * 1000).toISOString(),
      // GPS coordinates
      coordinates: propertyData.coordinates || null,
      // QR code will be generated on frontend
      qrCode: null,
    };

    // Store property
    await kv.set(`property:${propertyId}`, property);

    // Add to landlord's property list
    const landlordProperties = await kv.get(`landlord:${user.id}:properties`) || [];
    landlordProperties.push(propertyId);
    await kv.set(`landlord:${user.id}:properties`, landlordProperties);

    // Add to global property list for search
    const allProperties = await kv.get('properties:all') || [];
    allProperties.push(propertyId);
    await kv.set('properties:all', allProperties);

    console.log(`Property created successfully: ${propertyId} by landlord ${user.id}`);

    return c.json({ 
      success: true, 
      property,
      message: 'Property created successfully' 
    }, 201);
  } catch (error: any) {
    console.error('Error creating property:', error);
    return c.json({ error: 'Failed to create property listing' }, 500);
  }
});

// Get all properties (with filters)
app.get("/make-server-d12e8f4b/properties", async (c) => {
  try {
    // Get query parameters for filtering
    const propertyType = c.req.query('propertyType');
    const minPrice = c.req.query('minPrice');
    const maxPrice = c.req.query('maxPrice');
    const location = c.req.query('location');
    const bedrooms = c.req.query('bedrooms');
    const status = c.req.query('status');

    // Get all property IDs
    const propertyIds = await kv.get('properties:all') || [];

    // Fetch all properties
    const properties = [];
    for (const id of propertyIds) {
      const property = await kv.get(`property:${id}`);
      if (property) {
        // Apply filters
        let include = true;

        if (propertyType && property.propertyType !== propertyType) include = false;
        if (minPrice && property.price < parseInt(minPrice)) include = false;
        if (maxPrice && property.price > parseInt(maxPrice)) include = false;
        if (location && !property.location.toLowerCase().includes(location.toLowerCase())) include = false;
        if (bedrooms && property.bedrooms < parseInt(bedrooms)) include = false;
        if (status && property.status !== status) include = false;

        // Only include non-expired properties
        if (new Date(property.expiresAt) < new Date()) include = false;

        if (include) {
          properties.push(property);
        }
      }
    }

    // Sort by most recent
    properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ properties });
  } catch (error: any) {
    console.error('Error fetching properties:', error);
    return c.json({ error: 'Failed to fetch properties' }, 500);
  }
});

// Get landlord's properties
app.get("/make-server-d12e8f4b/properties/landlord", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    // Get landlord's property IDs
    const propertyIds = await kv.get(`landlord:${user.id}:properties`) || [];

    // Fetch all properties
    const properties = [];
    for (const id of propertyIds) {
      const property = await kv.get(`property:${id}`);
      if (property) {
        properties.push(property);
      }
    }

    // Sort by most recent
    properties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ properties });
  } catch (error: any) {
    console.error('Error fetching landlord properties:', error);
    return c.json({ error: 'Failed to fetch properties' }, 500);
  }
});

// Get single property
app.get("/make-server-d12e8f4b/properties/:id", async (c) => {
  try {
    const propertyId = c.req.param('id');
    const property = await kv.get(`property:${propertyId}`);

    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }

    return c.json({ property });
  } catch (error: any) {
    console.error('Error fetching property:', error);
    return c.json({ error: 'Failed to fetch property' }, 500);
  }
});

// Update property
app.put("/make-server-d12e8f4b/properties/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    const propertyId = c.req.param('id');
    const property = await kv.get(`property:${propertyId}`);

    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }

    // Check if user owns this property
    if (property.landlordId !== user.id) {
      return c.json({ error: 'Unauthorized to update this property' }, 403);
    }

    const updates = await c.req.json();

    // Update property
    const updatedProperty = {
      ...property,
      ...updates,
      id: propertyId,
      landlordId: user.id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`property:${propertyId}`, updatedProperty);

    return c.json({ 
      success: true, 
      property: updatedProperty,
      message: 'Property updated successfully' 
    });
  } catch (error: any) {
    console.error('Error updating property:', error);
    return c.json({ error: 'Failed to update property' }, 500);
  }
});

// Delete property
app.delete("/make-server-d12e8f4b/properties/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    const propertyId = c.req.param('id');
    const property = await kv.get(`property:${propertyId}`);

    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }

    // Check if user owns this property
    if (property.landlordId !== user.id) {
      return c.json({ error: 'Unauthorized to delete this property' }, 403);
    }

    // Delete property
    await kv.del(`property:${propertyId}`);

    // Remove from landlord's property list
    const landlordProperties = await kv.get(`landlord:${user.id}:properties`) || [];
    const updatedProperties = landlordProperties.filter((id: string) => id !== propertyId);
    await kv.set(`landlord:${user.id}:properties`, updatedProperties);

    // Remove from global property list
    const allProperties = await kv.get('properties:all') || [];
    const updatedAllProperties = allProperties.filter((id: string) => id !== propertyId);
    await kv.set('properties:all', updatedAllProperties);

    // Delete related offers
    const offerIds = await kv.get(`property:${propertyId}:offers`) || [];
    for (const offerId of offerIds) {
      await kv.del(`offer:${offerId}`);
    }
    await kv.del(`property:${propertyId}:offers`);

    return c.json({ 
      success: true, 
      message: 'Property deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting property:', error);
    return c.json({ error: 'Failed to delete property' }, 500);
  }
});

// ==================== OFFERS MANAGEMENT ====================

// Create offer (tenant/buyer)
app.post("/make-server-d12e8f4b/offers", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    const offerData = await c.req.json();

    // Validate required fields
    if (!offerData.propertyId || !offerData.offerAmount) {
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Check if property exists
    const property = await kv.get(`property:${offerData.propertyId}`);
    if (!property) {
      return c.json({ error: 'Property not found' }, 404);
    }

    // Generate offer ID
    const offerId = generateId();

    // Get user profile
    const userProfile = await kv.get(`user:${user.id}`);

    // Create offer
    const offer = {
      id: offerId,
      propertyId: offerData.propertyId,
      propertyTitle: property.title,
      applicantId: user.id,
      applicantName: userProfile?.name || 'Unknown',
      applicantEmail: user.email,
      offerAmount: offerData.offerAmount,
      leaseTerm: offerData.leaseTerm || 12,
      moveInDate: offerData.moveInDate,
      employmentStatus: offerData.employmentStatus || '',
      employer: offerData.employer || '',
      annualIncome: offerData.annualIncome || 0,
      additionalInfo: offerData.additionalInfo || '',
      documents: offerData.documents || [],
      status: 'pending',
      landlordId: property.landlordId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store offer
    await kv.set(`offer:${offerId}`, offer);

    // Add to property's offer list
    const propertyOffers = await kv.get(`property:${offerData.propertyId}:offers`) || [];
    propertyOffers.push(offerId);
    await kv.set(`property:${offerData.propertyId}:offers`, propertyOffers);

    // Add to user's offer list
    const userOffers = await kv.get(`user:${user.id}:offers`) || [];
    userOffers.push(offerId);
    await kv.set(`user:${user.id}:offers`, userOffers);

    // Add to landlord's pending offers
    const landlordOffers = await kv.get(`landlord:${property.landlordId}:offers`) || [];
    landlordOffers.push(offerId);
    await kv.set(`landlord:${property.landlordId}:offers`, landlordOffers);

    console.log(`Offer created: ${offerId} for property ${offerData.propertyId}`);

    return c.json({ 
      success: true, 
      offer,
      message: 'Offer submitted successfully' 
    }, 201);
  } catch (error: any) {
    console.error('Error creating offer:', error);
    return c.json({ error: 'Failed to create offer' }, 500);
  }
});

// Get landlord's offers
app.get("/make-server-d12e8f4b/offers/landlord", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    // Get landlord's offer IDs
    const offerIds = await kv.get(`landlord:${user.id}:offers`) || [];

    // Fetch all offers
    const offers = [];
    for (const id of offerIds) {
      const offer = await kv.get(`offer:${id}`);
      if (offer) {
        offers.push(offer);
      }
    }

    // Sort by most recent
    offers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ offers });
  } catch (error: any) {
    console.error('Error fetching landlord offers:', error);
    return c.json({ error: 'Failed to fetch offers' }, 500);
  }
});

// Get user's offers
app.get("/make-server-d12e8f4b/offers/user", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    // Get user's offer IDs
    const offerIds = await kv.get(`user:${user.id}:offers`) || [];

    // Fetch all offers
    const offers = [];
    for (const id of offerIds) {
      const offer = await kv.get(`offer:${id}`);
      if (offer) {
        offers.push(offer);
      }
    }

    // Sort by most recent
    offers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ offers });
  } catch (error: any) {
    console.error('Error fetching user offers:', error);
    return c.json({ error: 'Failed to fetch offers' }, 500);
  }
});

// Update offer status (landlord only)
app.put("/make-server-d12e8f4b/offers/:id", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    const offerId = c.req.param('id');
    const offer = await kv.get(`offer:${offerId}`);

    if (!offer) {
      return c.json({ error: 'Offer not found' }, 404);
    }

    // Check if user is the landlord
    if (offer.landlordId !== user.id) {
      return c.json({ error: 'Unauthorized to update this offer' }, 403);
    }

    const { status, counterOffer } = await c.req.json();

    // Update offer
    const updatedOffer = {
      ...offer,
      status: status || offer.status,
      counterOffer: counterOffer || offer.counterOffer,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`offer:${offerId}`, updatedOffer);

    // If accepted, update property status
    if (status === 'accepted') {
      const property = await kv.get(`property:${offer.propertyId}`);
      if (property) {
        property.status = 'rented';
        property.tenantId = offer.applicantId;
        property.tenantName = offer.applicantName;
        await kv.set(`property:${offer.propertyId}`, property);
      }
    }

    return c.json({ 
      success: true, 
      offer: updatedOffer,
      message: 'Offer updated successfully' 
    });
  } catch (error: any) {
    console.error('Error updating offer:', error);
    return c.json({ error: 'Failed to update offer' }, 500);
  }
});

// ==================== DASHBOARD STATS ====================

// Get landlord dashboard stats
app.get("/make-server-d12e8f4b/dashboard/landlord", async (c) => {
  try {
    const { error, user } = await verifyUser(c.req.header('Authorization'));
    
    if (error || !user) {
      return c.json({ error }, 401);
    }

    // Get all properties
    const propertyIds = await kv.get(`landlord:${user.id}:properties`) || [];
    const properties = [];
    let totalRevenue = 0;
    let occupiedCount = 0;

    for (const id of propertyIds) {
      const property = await kv.get(`property:${id}`);
      if (property) {
        properties.push(property);
        if (property.status === 'rented') {
          occupiedCount++;
          totalRevenue += property.price;
        }
      }
    }

    // Get pending offers
    const offerIds = await kv.get(`landlord:${user.id}:offers`) || [];
    const offers = [];
    let pendingOffers = 0;

    for (const id of offerIds) {
      const offer = await kv.get(`offer:${id}`);
      if (offer) {
        offers.push(offer);
        if (offer.status === 'pending') {
          pendingOffers++;
        }
      }
    }

    return c.json({
      stats: {
        totalProperties: properties.length,
        activeListings: properties.filter(p => p.status === 'available').length,
        occupiedProperties: occupiedCount,
        pendingOffers: pendingOffers,
        monthlyRevenue: totalRevenue,
      },
      recentOffers: offers.slice(0, 5),
      properties: properties,
    });
  } catch (error: any) {
    console.error('Error fetching landlord dashboard:', error);
    return c.json({ error: 'Failed to fetch dashboard data' }, 500);
  }
});

Deno.serve(app.fetch);
