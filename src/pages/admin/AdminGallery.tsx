import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
    setImages((data as GalleryImage[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchImages(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("gallery-images").upload(path, file);
      if (error) { toast.error(`Failed: ${file.name}`); continue; }
      const { data } = supabase.storage.from("gallery-images").getPublicUrl(path);
      await supabase.from("gallery_images").insert({
        image_url: data.publicUrl,
        alt_text: file.name.replace(/\.[^.]+$/, ""),
        sort_order: images.length,
        created_by: user?.id,
      });
    }
    toast.success("Images uploaded");
    setUploading(false);
    fetchImages();
  };

  const handleDelete = async (img: GalleryImage) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_images").delete().eq("id", img.id);
    toast.success("Deleted");
    fetchImages();
  };

  const handleAltChange = async (id: string, alt_text: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, alt_text } : img)));
    await supabase.from("gallery_images").update({ alt_text }).eq("id", id);
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    setImages(newImages);
    await Promise.all(
      newImages.map((img, i) => supabase.from("gallery_images").update({ sort_order: i }).eq("id", img.id))
    );
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold">Gallery Management</h2>
        <Button size="sm" className="gap-1" onClick={() => fileRef.current?.click()} disabled={uploading}>
          <Plus className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload Images"}
        </Button>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-muted-foreground">No gallery images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div key={img.id} className="bg-card rounded-lg border border-border overflow-hidden">
              <img src={img.image_url} alt={img.alt_text || ""} className="h-48 w-full object-cover" />
              <div className="p-3 space-y-2">
                <Input
                  value={img.alt_text || ""}
                  onChange={(e) => handleAltChange(img.id, e.target.value)}
                  placeholder="Alt text for SEO"
                  className="text-xs"
                />
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleMoveUp(i)} disabled={i === 0}>
                    <GripVertical className="h-3 w-3 mr-1" /> Move Up
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(img)}>
                    <Trash2 className="h-3 w-3 mr-1 text-destructive" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminGallery;
