import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-tiger.jpg";

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Gautam Tours Travel Blog",
  "url": "https://gautamtoursandtravels.com/blog"
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_name: string;
  publish_date: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const from = page * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;
      const { data, count } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, featured_image_url, author_name, publish_date, meta_title, meta_description", { count: "exact" })
        .eq("published", true)
        .order("publish_date", { ascending: false })
        .range(from, to);
      setPosts((data as BlogPost[]) || []);
      setTotal(count ?? 0);
      setLoading(false);
    };
    fetchPosts();
  }, [page]);

  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <Layout>
      <SEO
        title="Jungle Safari Travel Blog | Wildlife Travel Tips"
        description="Read jungle safari travel guides, wildlife tips and travel insights from Gautam Tours & Travels."
        schema={blogSchema}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No blog posts yet. Check back soon!</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border"
                  >
                    <div className="h-52 overflow-hidden bg-muted">
                      {post.featured_image_url ? (
                        <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        {post.publish_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publish_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author_name}
                        </span>
                      </div>
                      <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      {post.excerpt && <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>}
                      <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                  <span className="flex items-center text-sm text-muted-foreground px-3">Page {page + 1} of {totalPages}</span>
                  <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>Next</Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

    </Layout>
  );
};

export default Blog;
