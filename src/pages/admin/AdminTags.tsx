import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Edit, X, Check } from "lucide-react";
import { toast } from "sonner";

interface Tag { id: string; name: string; slug: string; }

const AdminTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchData = async () => {
    const { data } = await supabase.from("blog_tags").select("*").order("name");
    setTags((data as Tag[]) || []);
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { error } = await supabase.from("blog_tags").insert({ name: newName.trim(), slug });
    if (error) { toast.error(error.message); return; }
    toast.success("Tag added");
    setNewName("");
    fetchData();
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    const slug = editName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await supabase.from("blog_tags").update({ name: editName.trim(), slug }).eq("id", id);
    toast.success("Updated");
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this tag?")) return;
    await supabase.from("blog_tags").delete().eq("id", id);
    toast.success("Deleted");
    fetchData();
  };

  return (
    <AdminLayout title="Tags">
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input placeholder="New tag name" value={newName} onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
              <Button onClick={handleAdd} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
            </div>
          </CardContent>
        </Card>

        {loading ? <p className="text-muted-foreground">Loading...</p> : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag.id} className="flex items-center gap-1 px-3 py-1.5 bg-card rounded-full border border-border">
                {editId === tag.id ? (
                  <>
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-6 text-xs w-24" />
                    <button onClick={() => handleUpdate(tag.id)}><Check className="h-3 w-3" /></button>
                    <button onClick={() => setEditId(null)}><X className="h-3 w-3" /></button>
                  </>
                ) : (
                  <>
                    <span className="text-sm">{tag.name}</span>
                    <button onClick={() => { setEditId(tag.id); setEditName(tag.name); }}><Edit className="h-3 w-3 text-muted-foreground" /></button>
                    <button onClick={() => handleDelete(tag.id)}><Trash2 className="h-3 w-3 text-destructive" /></button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminTags;
