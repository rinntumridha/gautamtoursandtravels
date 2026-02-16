import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Save, Eye } from "lucide-react";

const AdminBlogEditor = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image_url: "",
    meta_title: "",
    meta_description: "",
    author_name: "Admin",
    published: false,
    publish_date: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title || "",
            slug: data.slug || "",
            content: data.content || "",
            excerpt: data.excerpt || "",
            featured_image_url: data.featured_image_url || "",
            meta_title: data.meta_title || "",
            meta_description: data.meta_description || "",
            author_name: data.author_name || "Admin",
            published: data.published || false,
            publish_date: data.publish_date ? new Date(data.publish_date).toISOString().slice(0, 16) : "",
          });
        }
      });
    }
  }, [id, isNew]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: isNew ? generateSlug(title) : f.slug,
      meta_title: f.meta_title || title,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop();
    const path = `featured/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("blog-images").upload(path, file);
    if (error) { toast.error("Upload failed"); return; }
    const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
    setForm((f) => ({ ...f, featured_image_url: data.publicUrl }));
    toast.success("Image uploaded");
  };

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required");
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug,
      content: form.content,
      excerpt: form.excerpt || null,
      featured_image_url: form.featured_image_url || null,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      author_name: form.author_name,
      published: publish !== undefined ? publish : form.published,
      publish_date: form.publish_date ? new Date(form.publish_date).toISOString() : (publish ? new Date().toISOString() : null),
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("blog_posts").insert({ ...payload, created_by: user?.id }));
    } else {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", id));
    }

    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(publish ? "Published!" : "Saved!");
      navigate("/admin/blogs");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold">{isNew ? "New Blog Post" : "Edit Blog Post"}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSave(false)} disabled={saving}>
              <Save className="h-4 w-4 mr-1" /> Save Draft
            </Button>
            <Button size="sm" onClick={() => handleSave(true)} disabled={saving}>
              <Eye className="h-4 w-4 mr-1" /> Publish
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Blog post title" />
          </div>

          <div>
            <Label>URL Slug</Label>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">/blog/{form.slug}</div>
            <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
          </div>

          <div>
            <Label>Featured Image</Label>
            {form.featured_image_url && (
              <img src={form.featured_image_url} alt="Featured" className="h-40 w-full object-cover rounded-lg mb-2" />
            )}
            <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
              Upload Image
            </Button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>

          <div>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary..." rows={2} />
          </div>

          <div>
            <Label>Content</Label>
            <RichTextEditor content={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Author Name</Label>
              <Input value={form.author_name} onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))} />
            </div>
            <div>
              <Label>Publish Date</Label>
              <Input type="datetime-local" value={form.publish_date} onChange={(e) => setForm((f) => ({ ...f, publish_date: e.target.value }))} />
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-heading font-semibold mb-3">SEO Settings</h3>
            <div className="space-y-3">
              <div>
                <Label>Meta Title</Label>
                <Input value={form.meta_title} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))} placeholder="SEO title (max 60 chars)" maxLength={60} />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea value={form.meta_description} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))} placeholder="SEO description (max 160 chars)" maxLength={160} rows={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
