import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Eye } from "lucide-react";

const AdminPageEditor = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "", slug: "", content: "",
    meta_title: "", meta_description: "", og_image_url: "",
    published: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      supabase.from("cms_pages").select("*").eq("id", id).single().then(({ data }) => {
        if (data) setForm({
          title: data.title || "", slug: data.slug || "", content: data.content || "",
          meta_title: data.meta_title || "", meta_description: data.meta_description || "",
          og_image_url: data.og_image_url || "", published: data.published || false,
        });
      });
    }
  }, [id, isNew]);

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim() || !form.slug.trim()) { toast.error("Title and slug required"); return; }
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, content: form.content,
      meta_title: form.meta_title || null, meta_description: form.meta_description || null,
      og_image_url: form.og_image_url || null,
      published: publish !== undefined ? publish : form.published,
    };
    let error;
    if (isNew) {
      ({ error } = await supabase.from("cms_pages").insert({ ...payload, created_by: user?.id }));
    } else {
      ({ error } = await supabase.from("cms_pages").update(payload).eq("id", id));
    }
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Saved!");
    navigate("/admin/pages");
  };

  return (
    <AdminLayout title={isNew ? "Add New Page" : "Edit Page"}>
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <div />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="h-3 w-3 mr-1" /> Save Draft
            </Button>
            <Button size="sm" onClick={() => handleSave(true)} disabled={saving}>
              <Eye className="h-3 w-3 mr-1" /> Publish
            </Button>
          </div>
        </div>

        <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: isNew ? generateSlug(e.target.value) : f.slug }))} placeholder="Page title" className="text-xl font-heading h-12" />
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          Slug: <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="h-6 text-xs w-auto max-w-[200px]" />
        </div>

        <RichTextEditor content={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">SEO & Open Graph</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Meta Title</Label>
              <Input value={form.meta_title} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))} maxLength={60} />
            </div>
            <div>
              <Label className="text-xs">Meta Description</Label>
              <Textarea value={form.meta_description} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))} maxLength={160} rows={2} />
            </div>
            <div>
              <Label className="text-xs">OG Image URL</Label>
              <Input value={form.og_image_url} onChange={(e) => setForm((f) => ({ ...f, og_image_url: e.target.value }))} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPageEditor;
