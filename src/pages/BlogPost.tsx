import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  author_name: string;
  publish_date: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()
      .then(({ data }) => {
        setPost(data as Post | null);
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (post?.meta_title) document.title = post.meta_title;
    else if (post?.title) document.title = `${post.title} | Gautam Tours & Travels`;
  }, [post]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-heading font-bold">Post Not Found</h1>
          <Link to="/blog"><Button variant="outline"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Meta description */}
      {post.meta_description && (
        <meta name="description" content={post.meta_description} />
      )}

      <article className="pt-8 pb-16">
        {post.featured_image_url && (
          <div className="w-full h-[40vh] md:h-[50vh] overflow-hidden">
            <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="container mx-auto max-w-3xl px-4 mt-8">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-primary mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            {post.publish_date && (
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.publish_date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            )}
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author_name}
            </span>
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Article structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.meta_description || post.excerpt || "",
          image: post.featured_image_url || "",
          author: { "@type": "Person", name: post.author_name },
          datePublished: post.publish_date,
          publisher: {
            "@type": "Organization",
            name: "Gautam Tours & Travels",
          },
        }),
      }} />
    </Layout>
  );
};

export default BlogPost;
