import { Star } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-tiger.jpg";

const testimonialsSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": { "@type": "TravelAgency", "name": "Gautam Tours and Travels" }
};

const testimonials = [
  { name: "Rajesh Sharma", location: "Nagpur", text: "Wonderful experience! The safari booking was smooth and the resort was perfect for my family. Highly recommend Gautam Tours for Pench trip.", rating: 5 },
  { name: "Priya Deshmukh", location: "Nagpur", text: "Very professional service. They made our Kanha trip absolutely hassle-free. The driver was punctual and the resort was clean and comfortable.", rating: 5 },
  { name: "Anil Patil", location: "Pune", text: "Great car service and well-organized safari. The zone selection guidance was very helpful. We spotted two tigers!", rating: 5 },
  { name: "Sunita Joshi", location: "Nagpur", text: "Booked a family package for Pench. Everything was arranged perfectly — from pickup to drop. Kids loved the experience!", rating: 5 },
  { name: "Vikram Reddy", location: "Hyderabad", text: "Came from Hyderabad and Gautam Tours managed everything from Nagpur onwards. Excellent coordination and very fair pricing.", rating: 5 },
  { name: "Dr. Meena Kulkarni", location: "Nagpur", text: "As a government employee, I appreciate their transparent approach. No hidden charges, genuine service. Booked twice already.", rating: 5 },
];

const Testimonials = () => {
  return (
    <Layout>
      <SEO
        title="Customer Reviews | Gautam Tours & Travels Nagpur"
        description="Read customer reviews and testimonials from travelers who experienced jungle safari tours and travel services with Gautam Tours."
        schema={testimonialsSchema}
      />
      <PageHero title="Testimonials" subtitle="What our happy guests say about their wildlife experience" image={heroImage} />

      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-background rounded-xl p-6 border border-border shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warm text-warm" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4 italic leading-relaxed">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Testimonials;
