import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface PageSeo {
  id: string;
  page_slug: string;
  page_name: string;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
}

const AdminSeo = () => {
  const [pages, setPages] = useState<PageSeo[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    supabase.from("page_seo").select("*").order("page_name").then(({ data }) => {
      setPages((data as PageSeo[]) || []);
      setLoading(false);
    });
  }, []);

  const handleChange = (id: string, field: keyof PageSeo, value: string) => {
    setPages((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSave = async (page: PageSeo) => {
    const { error } = await supabase.from("page_seo").update({
      meta_title: page.meta_title,
      meta_description: page.meta_description,
      og_image_url: page.og_image_url,
      updated_by: user?.id,
    }).eq("id", page.id);
    if (error) toast.error(error.message);
    else toast.success(`${page.page_name} SEO saved`);
  };

  return (
    <AdminLayout>
      <h2 className="text-xl font-heading font-bold mb-6">Page SEO Settings</h2>
      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="space-y-4">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{page.page_name} <span className="text-xs text-muted-foreground font-normal">({page.page_slug})</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Meta Title</Label>
                  <Input value={page.meta_title || ""} onChange={(e) => handleChange(page.id, "meta_title", e.target.value)} placeholder="Page title (max 60 chars)" maxLength={60} />
                </div>
                <div>
                  <Label className="text-xs">Meta Description</Label>
                  <Textarea value={page.meta_description || ""} onChange={(e) => handleChange(page.id, "meta_description", e.target.value)} placeholder="Page description (max 160 chars)" maxLength={160} rows={2} />
                </div>
                <div>
                  <Label className="text-xs">OG Image URL</Label>
                  <Input value={page.og_image_url || ""} onChange={(e) => handleChange(page.id, "og_image_url", e.target.value)} placeholder="https://..." />
                </div>
                <Button size="sm" onClick={() => handleSave(page)} className="gap-1">
                  <Save className="h-3 w-3" /> Save
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminSeo;
