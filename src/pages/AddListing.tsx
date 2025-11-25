import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export default function AddListing() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signup");
    }
  }, [loading, user, navigate]);

  if (loading || !user) return null;

  // -------- FORM STATE --------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [bedrooms, setBedrooms] = useState<number | "">("");
  const [propertyType, setPropertyType] = useState("");
  const [nearPark, setNearPark] = useState(false);
  const [nearSchool, setNearSchool] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState("");
  const [latitude, setLatitude] = useState<number | "">("");
  const [longitude, setLongitude] = useState<number | "">("");

  // Images
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ------------------------
  // Handle image selection
  // ------------------------
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files).slice(0, 20); // max 20
    setImages(selected);
  };

  // ------------------------
  // Upload images to Supabase Storage
  // ------------------------
  const uploadImagesToSupabase = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (const image of images) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 8)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(fileName, image);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("property-images").getPublicUrl(fileName);
      if (data?.publicUrl) uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  // ------------------------
  // Submit form
  // ------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!title || !price || !city || !postcode || !propertyType) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      setUploading(true);

      const imageUrls = await uploadImagesToSupabase();

      const { error } = await supabase.from("properties").insert([
        {
          title,
          description,
          price,
          location,
          city,
          postcode,
          bedrooms,
          property_type: propertyType,
          near_park: nearPark,
          near_school: nearSchool,
          noise_level: noiseLevel,
          image_urls: imageUrls, // <-- store as array
          latitude: latitude === "" ? null : latitude,
          longitude: longitude === "" ? null : longitude,
          owner_id: user.id,
        },
      ]);

      setUploading(false);

      if (error) {
        setErrorMsg(error.message);
        return;
      }

      navigate("/search");
    } catch (err: any) {
      setUploading(false);
      setErrorMsg(err.message);
    }
  };

  // ============================================================
  // RENDER FORM
  // ============================================================
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-3xl p-10">
        <h1 className="text-3xl font-bold mb-10 text-center">Post a Property</h1>

        {errorMsg && <p className="text-red-600 mb-6 text-center">{errorMsg}</p>}

        <form className="space-y-16" onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <section className="pb-10 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title *"
                className="w-full border rounded-md px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description *"
                className="w-full border rounded-md px-4 py-2 h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Price (£) *"
                className="w-full border rounded-md px-4 py-2"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
          </section>

          {/* LOCATION */}
          <section className="pb-10 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Address / Street" className="border rounded-md px-4 py-2" value={location} onChange={(e) => setLocation(e.target.value)} />
              <input type="text" placeholder="City *" className="border rounded-md px-4 py-2" value={city} onChange={(e) => setCity(e.target.value)} />
              <input type="text" placeholder="Postcode *" className="border rounded-md px-4 py-2" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
            </div>
          </section>

          {/* PROPERTY DETAILS */}
          <section className="pb-10 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="number" placeholder="Bedrooms" className="border rounded-md px-4 py-2" value={bedrooms} onChange={(e) => setBedrooms(e.target.value === "" ? "" : Number(e.target.value))} />
              <select className="border rounded-md px-4 py-2" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="">Property Type *</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Studio</option>
                <option>Townhouse</option>
                <option>Bungalow</option>
              </select>
              <select className="border rounded-md px-4 py-2" value={noiseLevel} onChange={(e) => setNoiseLevel(e.target.value)}>
                <option value="">Noise Level</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={nearPark} onChange={(e) => setNearPark(e.target.checked)} /> Near Park
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={nearSchool} onChange={(e) => setNearSchool(e.target.checked)} /> Near School
              </label>
            </div>
          </section>

          {/* PHOTOS */}
          <section className="pb-10 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-2">Photos</h2>
            <p className="text-sm text-gray-600 mb-4">Upload up to 20 images. Good photos increase engagement.</p>
            <label htmlFor="photos" className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 h-32 rounded-md cursor-pointer hover:border-blue-400 hover:text-blue-500">
              Click to upload photos
            </label>
            <input id="photos" type="file" multiple accept="image/*" className="hidden" onChange={handleImageSelect} />
            {images.length > 0 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {images.map((img, idx) => (
                  <img key={idx} src={URL.createObjectURL(img)} className="w-24 h-24 object-cover rounded-md border" />
                ))}
              </div>
            )}
          </section>

          {/* MAP COORDINATES */}
          <section className="pb-10 border-b border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Map Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="number" placeholder="Latitude (optional)" className="border rounded-md px-4 py-2" value={latitude} onChange={(e) => setLatitude(e.target.value === "" ? "" : Number(e.target.value))} />
              <input type="number" placeholder="Longitude (optional)" className="border rounded-md px-4 py-2" value={longitude} onChange={(e) => setLongitude(e.target.value === "" ? "" : Number(e.target.value))} />
            </div>
          </section>

          {/* SUBMIT */}
          <div className="pt-4">
            <Button type="submit" disabled={uploading} className="w-full py-3 text-lg">
              {uploading ? "Uploading..." : "Post Property"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
