import { CheckCircle, Shield, Sparkles, Users, Home } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import resortImage from "@/assets/resort.jpg";

const hotelsSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Wildlife Resort Booking",
  "provider": { "@type": "TravelAgency", "name": "Gautam Tours and Travels" }
};

const categories = [
  { icon: Home, title: "Budget Resorts", desc: "Clean, comfortable stays at affordable prices" },
  { icon: Sparkles, title: "Premium Wildlife Resorts", desc: "Elevated experiences with modern amenities" },
  { icon: Users, title: "Family-Friendly Stays", desc: "Safe, spacious rooms perfect for families with children" },
  { icon: Shield, title: "Group Accommodation", desc: "Ideal for office groups and large families" },
];

const faqItems = [
  { question: "How close are the resorts to safari gates?", answer: "Most of our partner resorts are located within 5-15 km of the main safari entry gates, ensuring you can reach the reserve comfortably in time for morning and evening safaris." },
  { question: "Are meals included in resort packages?", answer: "Yes, most resort packages include breakfast and dinner (MAP plan). Some premium packages offer all-inclusive meals (AP plan). Specific meal plans are mentioned in each package." },
  { question: "Are resorts family-friendly?", answer: "Absolutely! We specifically recommend family-friendly resorts with spacious rooms, children's play areas, safe surroundings, and kid-friendly menus. Many resorts also offer nature walks and bonfire activities." },
  { question: "Can I choose my preferred resort?", answer: "Yes, you can request a specific resort. We'll check availability and accommodate your preference. If it's unavailable, we'll suggest comparable alternatives in the same area." },
  { question: "Is early check-in available?", answer: "Early check-in is subject to availability. Since many safari visitors arrive early morning, most partner resorts try to accommodate early arrivals. We recommend informing us in advance for the best experience." },
];

const Hotels = () => {
  return (
    <Layout>
      <SEO
        title="Wildlife Resorts & Hotels near Tiger Reserves | Nagpur"
        description="Book comfortable resorts and hotels near jungle safari destinations like Pench, Tadoba and Kanha with Gautam Tours & Travels."
        schema={hotelsSchema}
      />
      <PageHero
        title="Hotels & Resorts"
        subtitle="Verified, comfortable stays near Pench & Kanha wildlife zones"
        image={resortImage}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Stay Near the Jungle</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We partner with verified resorts and hotels near Pench and Kanha Tiger Reserves. All properties are checked for cleanliness, safety, and comfort so you can focus on enjoying the wildlife experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {categories.map((cat) => (
                  <div key={cat.title} className="bg-muted rounded-xl p-5 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <cat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground">{cat.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 bg-secondary rounded-xl p-5">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm">All properties are verified for cleanliness, safety and comfort.</p>
              </div>
            </div>

            <div>
              <InquiryForm title="Book Your Stay" service="Hotel / Resort Booking" />
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />
    </Layout>
  );
};

export default Hotels;
