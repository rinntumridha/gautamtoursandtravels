import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface CmsPage {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updated_at: string;
}

const AdminPages = () => {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    const { data } = await supabase.from("cms_pages").select("id, title, slug, published, updated_at").order("sort_order");
    setPages((data as CmsPage[]) || []);
    setLoading(false);
  };
  useEffect(() => { fetchPages(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await supabase.from("cms_pages").delete().eq("id", id);
    toast.success("Page deleted");
    fetchPages();
  };

  return (
    <AdminLayout title="All Pages">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{pages.length} page(s)</p>
          <Link to="/admin/pages/new">
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add New Page</Button>
          </Link>
        </div>

        {loading ? <p className="text-muted-foreground text-center py-8">Loading...</p> : pages.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No pages yet.</p>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {pages.map((page) => (
              <div key={page.id} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-muted/20">
                <div className="min-w-0">
                  <Link to={`/admin/pages/${page.id}`} className="font-medium text-sm hover:text-primary">{page.title}</Link>
                  <p className="text-xs text-muted-foreground">/{page.slug}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={page.published ? "default" : "secondary"} className="text-xs">
                    {page.published ? "Published" : "Draft"}
                  </Badge>
                  <Link to={`/admin/pages/${page.id}`}><Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3 w-3" /></Button></Link>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(page.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminPages;
