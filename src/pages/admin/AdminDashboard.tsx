import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ blogs: 0, gallery: 0, pages: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [blogs, gallery, pages] = await Promise.all([
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("gallery_images").select("id", { count: "exact", head: true }),
        supabase.from("page_seo").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        blogs: blogs.count ?? 0,
        gallery: gallery.count ?? 0,
        pages: pages.count ?? 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Blog Posts", count: stats.blogs, icon: FileText, link: "/admin/blogs" },
    { title: "Gallery Images", count: stats.gallery, icon: Image, link: "/admin/gallery" },
    { title: "SEO Pages", count: stats.pages, icon: Search, link: "/admin/seo" },
  ];

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => (
          <Link key={c.title} to={c.link}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
                <c.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{c.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
