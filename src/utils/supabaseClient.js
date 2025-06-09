import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage bucket configuration
export const STORAGE_BUCKET = "images";

// Helper function for uploading images
export const uploadImage = async (file, folder = "gallery") => {
  try {
    // Validate file
    if (!file) throw new Error("No file provided");

    // Check file size (max 5MB)
    if (file.size > 20 * 1024 * 1024) {
      throw new Error("File size should be less than 20MB");
    }

    // Check file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Only JPEG, PNG, and WebP images are allowed");
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

    return {
      url: publicUrl,
      path: fileName,
      success: true,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Helper function for deleting images
export const deleteImage = async (imagePath) => {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([imagePath]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
