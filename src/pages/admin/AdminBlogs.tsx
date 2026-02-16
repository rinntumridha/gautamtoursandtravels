import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, Search, Calendar } from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  status: string;
  publish_date: string | null;
  created_at: string;
  author_name: string;
  category_id: string | null;
}

const AdminBlogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, published, status, publish_date, created_at, author_name, category_id")
      .order("created_at", { ascending: false });
    setPosts((data as BlogPost[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchPosts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post permanently?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    toast.success("Post deleted");
    fetchPosts();
  };

  const filteredPosts = posts.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "published" ? p.published : !p.published);
    return matchSearch && matchFilter;
  });

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <AdminLayout title="All Posts">
      <div className="space-y-4">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => setFilter("all")} className={`hover:underline ${filter === "all" ? "font-bold text-foreground" : "text-muted-foreground"}`}>
              All ({posts.length})
            </button>
            <span className="text-muted-foreground">|</span>
            <button onClick={() => setFilter("published")} className={`hover:underline ${filter === "published" ? "font-bold text-foreground" : "text-muted-foreground"}`}>
              Published ({publishedCount})
            </button>
            <span className="text-muted-foreground">|</span>
            <button onClick={() => setFilter("draft")} className={`hover:underline ${filter === "draft" ? "font-bold text-foreground" : "text-muted-foreground"}`}>
              Draft ({draftCount})
            </button>
          </div>
          <Link to="/admin/blogs/new">
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add New Post</Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Posts table */}
        {loading ? (
          <p className="text-muted-foreground py-8 text-center">Loading...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">No posts found.</p>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_100px_120px_100px] gap-4 px-4 py-2.5 text-xs font-medium text-muted-foreground border-b border-border bg-muted/30">
              <span>Title</span>
              <span>Author</span>
              <span>Date</span>
              <span>Status</span>
            </div>
            {filteredPosts.map((post) => (
              <div key={post.id} className="grid grid-cols-1 md:grid-cols-[1fr_100px_120px_100px] gap-2 md:gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                <div className="min-w-0">
                  <Link to={`/admin/blogs/${post.id}`} className="font-medium text-sm hover:text-primary transition-colors truncate block">
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-2 mt-1">
                    <Link to={`/admin/blogs/${post.id}`} className="text-xs text-primary hover:underline">Edit</Link>
                    <span className="text-muted-foreground text-xs">|</span>
                    <button onClick={() => handleDelete(post.id)} className="text-xs text-destructive hover:underline">Delete</button>
                    {post.published && (
                      <>
                        <span className="text-muted-foreground text-xs">|</span>
                        <Link to={`/blog/${post.slug}`} className="text-xs text-muted-foreground hover:underline">View</Link>
                      </>
                    )}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground truncate">{post.author_name}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(post.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                </span>
                <Badge variant={post.published ? "default" : "secondary"} className="w-fit text-xs">
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;
