import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Image, Files, ImageIcon, Plus, Clock, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ blogs: 0, published: 0, drafts: 0, gallery: 0, pages: 0, media: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [quickTitle, setQuickTitle] = useState("");
  const [quickContent, setQuickContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const [blogs, gallery, pages, media] = await Promise.all([
        supabase.from("blog_posts").select("id, published", { count: "exact" }),
        supabase.from("gallery_images").select("id", { count: "exact", head: true }),
        supabase.from("cms_pages").select("id", { count: "exact", head: true }),
        supabase.from("media_library").select("id", { count: "exact", head: true }),
      ]);
      const blogData = blogs.data || [];
      setStats({
        blogs: blogs.count ?? 0,
        published: blogData.filter((b: any) => b.published).length,
        drafts: blogData.filter((b: any) => !b.published).length,
        gallery: gallery.count ?? 0,
        pages: pages.count ?? 0,
        media: media.count ?? 0,
      });

      const { data: recent } = await supabase
        .from("blog_posts")
        .select("id, title, published, created_at")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecentPosts(recent || []);
    };
    fetch();
  }, []);

  const handleQuickDraft = async () => {
    if (!quickTitle.trim()) { toast.error("Title required"); return; }
    setSaving(true);
    const slug = quickTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { error } = await supabase.from("blog_posts").insert({
      title: quickTitle, slug, content: quickContent, created_by: user?.id,
      author_name: "Admin", status: "draft",
    });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Draft saved!");
    setQuickTitle(""); setQuickContent("");
    navigate("/admin/blogs");
  };

  const statCards = [
    { title: "Total Posts", count: stats.blogs, icon: FileText, link: "/admin/blogs", color: "text-primary" },
    { title: "Published", count: stats.published, icon: Eye, link: "/admin/blogs", color: "text-forest" },
    { title: "Drafts", count: stats.drafts, icon: Clock, link: "/admin/blogs", color: "text-warm" },
    { title: "Pages", count: stats.pages, icon: Files, link: "/admin/pages", color: "text-primary" },
    { title: "Gallery", count: stats.gallery, icon: Image, link: "/admin/gallery", color: "text-forest" },
    { title: "Media Files", count: stats.media, icon: ImageIcon, link: "/admin/media", color: "text-warm" },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((c) => (
          <Link key={c.title} to={c.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <c.icon className={`h-6 w-6 mb-2 ${c.color}`} />
                <p className="text-2xl font-bold">{c.count}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.title}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Draft */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Plus className="h-4 w-4" /> Quick Draft
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder="Post title"
              value={quickTitle}
              onChange={(e) => setQuickTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write something..."
              value={quickContent}
              onChange={(e) => setQuickContent(e.target.value)}
              rows={3}
            />
            <Button size="sm" onClick={handleQuickDraft} disabled={saving}>
              {saving ? "Saving..." : "Save Draft"}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4" /> Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              <div className="space-y-2">
                {recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/admin/blogs/${post.id}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <span className="text-sm truncate">{post.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published ? "bg-forest/10 text-forest" : "bg-warm/10 text-warm"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
