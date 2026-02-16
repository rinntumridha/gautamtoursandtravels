import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string | null;
  caption: string | null;
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
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    toast.success("Deleted");
    fetchImages();
  };

  const handleFieldChange = async (id: string, field: "alt_text" | "caption", value: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, [field]: value } : img)));
    await supabase.from("gallery_images").update({ [field]: value }).eq("id", id);
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= images.length) return;
    const newImages = [...images];
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    setImages(newImages);
    await Promise.all(
      newImages.map((img, i) => supabase.from("gallery_images").update({ sort_order: i }).eq("id", img.id))
    );
  };

  return (
    <AdminLayout title="Gallery Manager">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{images.length} image(s)</p>
          <Button size="sm" className="gap-1" onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Plus className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload Images"}
          </Button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} />
        </div>

        {loading ? <p className="text-muted-foreground text-center py-8">Loading...</p> : images.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No gallery images yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, i) => (
              <div key={img.id} className="bg-card rounded-lg border border-border overflow-hidden">
                <img src={img.image_url} alt={img.alt_text || ""} className="h-48 w-full object-cover" loading="lazy" />
                <div className="p-3 space-y-2">
                  <Input
                    value={img.alt_text || ""}
                    onChange={(e) => handleFieldChange(img.id, "alt_text", e.target.value)}
                    placeholder="Alt text for SEO"
                    className="text-xs"
                  />
                  <Input
                    value={img.caption || ""}
                    onChange={(e) => handleFieldChange(img.id, "caption", e.target.value)}
                    placeholder="Caption"
                    className="text-xs"
                  />
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleMove(i, "up")} disabled={i === 0}>
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => handleMove(i, "down")} disabled={i === images.length - 1}>
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs ml-auto" onClick={() => handleDelete(img.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminGallery;
