import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Trash2, Copy, Search, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  alt_text: string | null;
  created_at: string;
}

const AdminMedia = () => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const fetchItems = async () => {
    const { data } = await supabase.from("media_library").select("*").order("created_at", { ascending: false });
    setItems((data as MediaItem[]) || []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("media-library").upload(path, file);
      if (error) { toast.error(`Failed: ${file.name}`); continue; }
      const { data } = supabase.storage.from("media-library").getPublicUrl(path);
      await supabase.from("media_library").insert({
        file_name: file.name,
        file_url: data.publicUrl,
        file_type: file.type,
        file_size: file.size,
        alt_text: file.name.replace(/\.[^.]+$/, ""),
        uploaded_by: user?.id,
      });
    }
    toast.success("Upload complete");
    setUploading(false);
    fetchItems();
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Delete "${item.file_name}"?`)) return;
    await supabase.from("media_library").delete().eq("id", item.id);
    if (selected?.id === item.id) setSelected(null);
    toast.success("Deleted");
    fetchItems();
  };

  const handleAltUpdate = async (id: string, alt_text: string) => {
    await supabase.from("media_library").update({ alt_text }).eq("id", id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, alt_text } : i)));
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  };

  const filtered = items.filter((i) =>
    i.file_name.toLowerCase().includes(search.toLowerCase()) ||
    i.alt_text?.toLowerCase().includes(search.toLowerCase())
  );

  const formatSize = (bytes: number | null) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AdminLayout title="Media Library">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search media..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Button size="sm" className="gap-1" onClick={() => fileRef.current?.click()} disabled={uploading}>
            <Upload className="h-4 w-4" /> {uploading ? "Uploading..." : "Upload Files"}
          </Button>
          <input ref={fileRef} type="file" accept="image/*,video/*,application/pdf" multiple className="hidden" onChange={handleUpload} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
          {/* Grid */}
          <div>
            {loading ? <p className="text-muted-foreground text-center py-8">Loading...</p> : filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No media files found</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={`aspect-square rounded-lg border-2 overflow-hidden transition-colors ${
                      selected?.id === item.id ? "border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {item.file_type?.startsWith("image/") ? (
                      <img src={item.file_url} alt={item.alt_text || ""} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                        {item.file_type || "File"}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selected && (
            <Card className="h-fit sticky top-20">
              <CardContent className="pt-6 space-y-3">
                {selected.file_type?.startsWith("image/") && (
                  <img src={selected.file_url} alt={selected.alt_text || ""} className="w-full rounded-md" />
                )}
                <div>
                  <p className="text-sm font-medium truncate">{selected.file_name}</p>
                  <p className="text-xs text-muted-foreground">{selected.file_type} · {formatSize(selected.file_size)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(selected.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-xs font-medium">Alt Text</label>
                  <Input
                    value={selected.alt_text || ""}
                    onChange={(e) => {
                      setSelected({ ...selected, alt_text: e.target.value });
                      handleAltUpdate(selected.id, e.target.value);
                    }}
                    className="text-xs mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium">URL</label>
                  <div className="flex gap-1 mt-1">
                    <Input value={selected.file_url} readOnly className="text-xs" />
                    <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => copyUrl(selected.file_url)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Button variant="destructive" size="sm" className="w-full gap-1" onClick={() => handleDelete(selected)}>
                  <Trash2 className="h-3 w-3" /> Delete
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminMedia;
