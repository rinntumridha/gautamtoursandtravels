
-- Fix all RLS policies to be PERMISSIVE (they were created as RESTRICTIVE)
-- Drop and recreate all policies

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (user_id = auth.uid());

-- blog_categories
DROP POLICY IF EXISTS "Admins manage categories" ON public.blog_categories;
DROP POLICY IF EXISTS "Categories are public" ON public.blog_categories;
CREATE POLICY "Admins manage categories" ON public.blog_categories FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Categories are public" ON public.blog_categories FOR SELECT USING (true);

-- blog_tags
DROP POLICY IF EXISTS "Admins manage tags" ON public.blog_tags;
DROP POLICY IF EXISTS "Tags are public" ON public.blog_tags;
CREATE POLICY "Admins manage tags" ON public.blog_tags FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Tags are public" ON public.blog_tags FOR SELECT USING (true);

-- blog_post_tags
DROP POLICY IF EXISTS "Admins manage post tags" ON public.blog_post_tags;
DROP POLICY IF EXISTS "Post tags are public" ON public.blog_post_tags;
CREATE POLICY "Admins manage post tags" ON public.blog_post_tags FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Post tags are public" ON public.blog_post_tags FOR SELECT USING (true);

-- blog_posts
DROP POLICY IF EXISTS "Admins can manage blogs" ON public.blog_posts;
DROP POLICY IF EXISTS "Published blogs are public" ON public.blog_posts;
CREATE POLICY "Admins can manage blogs" ON public.blog_posts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Published blogs are public" ON public.blog_posts FOR SELECT USING (published = true);

-- cms_pages
DROP POLICY IF EXISTS "Admins manage pages" ON public.cms_pages;
DROP POLICY IF EXISTS "Published pages are public" ON public.cms_pages;
CREATE POLICY "Admins manage pages" ON public.cms_pages FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Published pages are public" ON public.cms_pages FOR SELECT USING (published = true);

-- gallery_images
DROP POLICY IF EXISTS "Admins can manage gallery" ON public.gallery_images;
DROP POLICY IF EXISTS "Gallery images are public" ON public.gallery_images;
CREATE POLICY "Admins can manage gallery" ON public.gallery_images FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Gallery images are public" ON public.gallery_images FOR SELECT USING (true);

-- media_library
DROP POLICY IF EXISTS "Admins manage media" ON public.media_library;
DROP POLICY IF EXISTS "Media is public" ON public.media_library;
CREATE POLICY "Admins manage media" ON public.media_library FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Media is public" ON public.media_library FOR SELECT USING (true);

-- page_seo
DROP POLICY IF EXISTS "Admins can manage SEO" ON public.page_seo;
DROP POLICY IF EXISTS "SEO data is public" ON public.page_seo;
CREATE POLICY "Admins can manage SEO" ON public.page_seo FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "SEO data is public" ON public.page_seo FOR SELECT USING (true);

-- site_settings
DROP POLICY IF EXISTS "Admins manage settings" ON public.site_settings;
DROP POLICY IF EXISTS "Settings are public" ON public.site_settings;
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Settings are public" ON public.site_settings FOR SELECT USING (true);

-- profiles
DROP POLICY IF EXISTS "Public profiles are viewable" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Public profiles are viewable" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (user_id = auth.uid());
