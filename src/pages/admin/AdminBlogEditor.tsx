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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save, Eye, Clock, ImageIcon, X, Plus } from "lucide-react";

interface Category { id: string; name: string; slug: string; }
interface Tag { id: string; name: string; slug: string; }

const AdminBlogEditor = () => {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [form, setForm] = useState({
    title: "", slug: "", content: "", excerpt: "",
    featured_image_url: "", meta_title: "", meta_description: "",
    author_name: "Admin", published: false, publish_date: "",
    category_id: "", status: "draft", scheduled_at: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      supabase.from("blog_categories").select("*").order("name"),
      supabase.from("blog_tags").select("*").order("name"),
    ]).then(([cats, tags]) => {
      setCategories((cats.data as Category[]) || []);
      setAllTags((tags.data as Tag[]) || []);
    });

    if (!isNew && id) {
      supabase.from("blog_posts").select("*").eq("id", id).single().then(({ data }) => {
        if (data) {
          setForm({
            title: data.title || "", slug: data.slug || "",
            content: data.content || "", excerpt: data.excerpt || "",
            featured_image_url: data.featured_image_url || "",
            meta_title: data.meta_title || "", meta_description: data.meta_description || "",
            author_name: data.author_name || "Admin", published: data.published || false,
            publish_date: data.publish_date ? new Date(data.publish_date).toISOString().slice(0, 16) : "",
            category_id: data.category_id || "", status: data.status || "draft",
            scheduled_at: data.scheduled_at ? new Date(data.scheduled_at).toISOString().slice(0, 16) : "",
          });
        }
      });
      // Load post tags
      supabase.from("blog_post_tags").select("tag_id").eq("post_id", id).then(({ data }) => {
        setSelectedTags((data || []).map((d: any) => d.tag_id));
      });
    }
  }, [id, isNew]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (title: string) => {
    setForm((f) => ({
      ...f, title,
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

  const handleAddTag = async () => {
    if (!newTag.trim()) return;
    const slug = newTag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { data, error } = await supabase.from("blog_tags").insert({ name: newTag.trim(), slug }).select().single();
    if (error) { toast.error(error.message); return; }
    setAllTags((prev) => [...prev, data as Tag]);
    setSelectedTags((prev) => [...prev, (data as Tag).id]);
    setNewTag("");
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSave = async (action: "draft" | "publish" | "schedule") => {
    if (!form.title.trim() || !form.slug.trim()) {
      toast.error("Title and slug are required"); return;
    }
    setSaving(true);

    const isPublishing = action === "publish";
    const isScheduling = action === "schedule";

    const payload: any = {
      title: form.title, slug: form.slug, content: form.content,
      excerpt: form.excerpt || null, featured_image_url: form.featured_image_url || null,
      meta_title: form.meta_title || null, meta_description: form.meta_description || null,
      author_name: form.author_name, category_id: form.category_id || null,
      published: isPublishing,
      status: isPublishing ? "published" : isScheduling ? "scheduled" : "draft",
      publish_date: isPublishing ? new Date().toISOString() : (form.publish_date ? new Date(form.publish_date).toISOString() : null),
      scheduled_at: isScheduling && form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null,
    };

    let postId = id;
    let error;
    if (isNew) {
      const res = await supabase.from("blog_posts").insert({ ...payload, created_by: user?.id }).select("id").single();
      error = res.error;
      postId = res.data?.id;
    } else {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", id));
    }

    // Save tags
    if (!error && postId) {
      await supabase.from("blog_post_tags").delete().eq("post_id", postId);
      if (selectedTags.length > 0) {
        await supabase.from("blog_post_tags").insert(
          selectedTags.map((tag_id) => ({ post_id: postId!, tag_id }))
        );
      }
    }

    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isPublishing ? "Published!" : isScheduling ? "Scheduled!" : "Draft saved!");
    navigate("/admin/blogs");
  };

  return (
    <AdminLayout title={isNew ? "Add New Post" : "Edit Post"}>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
        {/* Main editor */}
        <div className="space-y-4">
          <Input
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Enter post title..."
            className="text-xl font-heading h-12"
          />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            Permalink: /blog/<Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="h-6 text-xs w-auto inline-flex max-w-[200px]" />
          </div>
          <RichTextEditor content={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
          <div>
            <Label>Excerpt</Label>
            <Textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} placeholder="Short summary for blog listing..." rows={2} />
          </div>

          {/* SEO section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Meta Title <span className="text-muted-foreground">({(form.meta_title || "").length}/60)</span></Label>
                <Input value={form.meta_title} onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))} maxLength={60} />
              </div>
              <div>
                <Label className="text-xs">Meta Description <span className="text-muted-foreground">({(form.meta_description || "").length}/160)</span></Label>
                <Textarea value={form.meta_description} onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))} maxLength={160} rows={2} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar panels */}
        <div className="space-y-4">
          {/* Publish box */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleSave("draft")} disabled={saving}>
                  <Save className="h-3 w-3 mr-1" /> Save Draft
                </Button>
                <Button size="sm" className="flex-1" onClick={() => handleSave("publish")} disabled={saving}>
                  <Eye className="h-3 w-3 mr-1" /> Publish
                </Button>
              </div>
              <div>
                <Label className="text-xs">Schedule</Label>
                <Input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm((f) => ({ ...f, scheduled_at: e.target.value }))} className="text-xs" />
                {form.scheduled_at && (
                  <Button variant="outline" size="sm" className="w-full mt-1 text-xs" onClick={() => handleSave("schedule")} disabled={saving}>
                    <Clock className="h-3 w-3 mr-1" /> Schedule
                  </Button>
                )}
              </div>
              <div>
                <Label className="text-xs">Author</Label>
                <Input value={form.author_name} onChange={(e) => setForm((f) => ({ ...f, author_name: e.target.value }))} className="text-xs" />
              </div>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Category</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                value={form.category_id}
                onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
              >
                <option value="">— No Category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {allTags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                      selectedTags.includes(tag.id)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="New tag..."
                  className="text-xs h-8"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                />
                <Button size="sm" variant="outline" onClick={handleAddTag} className="h-8 px-2">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              {form.featured_image_url ? (
                <div className="relative">
                  <img src={form.featured_image_url} alt="Featured" className="w-full h-32 object-cover rounded-md" />
                  <button
                    onClick={() => setForm((f) => ({ ...f, featured_image_url: "" }))}
                    className="absolute top-1 right-1 bg-background rounded-full p-0.5 shadow"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-border rounded-md flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/30 transition-colors"
                >
                  <ImageIcon className="h-6 w-6 mb-1" />
                  <span className="text-xs">Upload Image</span>
                </button>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminBlogEditor;
