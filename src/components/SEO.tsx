import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

const SITE_URL = "https://gautamtoursandtravels.com";

const breadcrumbNames: Record<string, string> = {
  "/": "Home",
  "/car-rental": "Car Rental",
  "/jungle-safari": "Jungle Safari",
  "/hotels": "Hotels & Resorts",
  "/packages": "Packages",
  "/gallery": "Gallery",
  "/testimonials": "Testimonials",
  "/blog": "Blog",
  "/contact": "Contact",
};

const SEO = ({ title, description, schema }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", description, "property");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title, "name");
    setMeta("twitter:description", description, "name");
  }, [title, description]);

  // Build breadcrumb schema
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ];
  if (pathSegments.length > 0) {
    const currentPath = location.pathname;
    const name = breadcrumbNames[currentPath] || pathSegments[pathSegments.length - 1];
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name,
      item: `${SITE_URL}${currentPath}`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Gautam Tours and Travels",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9325673079",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.facebook.com/gautamtoursandtravels",
      "https://www.instagram.com/gautamtoursandtravels",
      "https://x.com/gautamtours",
      "https://www.youtube.com/channel/UCve3EBX6_rkk8cbjzS0dOng",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </>
  );
};

export default SEO;
