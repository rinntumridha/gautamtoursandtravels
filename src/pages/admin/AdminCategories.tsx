import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Edit, X, Check } from "lucide-react";
import { toast } from "sonner";

interface Category { id: string; name: string; slug: string; }

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const fetchData = async () => {
    const { data } = await supabase.from("blog_categories").select("*").order("name");
    setCategories((data as Category[]) || []);
    setLoading(false);
  };
  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!newName.trim()) return;
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { error } = await supabase.from("blog_categories").insert({ name: newName.trim(), slug });
    if (error) { toast.error(error.message); return; }
    toast.success("Category added");
    setNewName("");
    fetchData();
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    const slug = editName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    await supabase.from("blog_categories").update({ name: editName.trim(), slug }).eq("id", id);
    toast.success("Updated");
    setEditId(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await supabase.from("blog_categories").delete().eq("id", id);
    toast.success("Deleted");
    fetchData();
  };

  return (
    <AdminLayout title="Categories">
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <Input placeholder="New category name" value={newName} onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
              <Button onClick={handleAdd} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
            </div>
          </CardContent>
        </Card>

        {loading ? <p className="text-muted-foreground">Loading...</p> : (
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                {editId === cat.id ? (
                  <div className="flex gap-2 flex-1">
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} className="h-8" />
                    <Button size="sm" variant="ghost" onClick={() => handleUpdate(cat.id)}><Check className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditId(null)}><X className="h-4 w-4" /></Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <span className="text-sm font-medium">{cat.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">/{cat.slug}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setEditId(cat.id); setEditName(cat.name); }}><Edit className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(cat.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                    </div>
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

export default AdminCategories;
