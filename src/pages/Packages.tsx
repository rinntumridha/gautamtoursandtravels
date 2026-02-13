import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import heroImage from "@/assets/hero-tiger.jpg";

const packages = [
  {
    name: "Pench Weekend Safari",
    duration: "2 Nights / 3 Days",
    includes: ["2 Jeep Safaris", "Resort Stay", "Nagpur Pickup & Drop", "Meals"],
    highlight: "Most Popular",
  },
  {
    name: "Kanha Family Package",
    duration: "2 Nights / 3 Days",
    includes: ["2 Jeep Safaris", "Family Resort Stay", "All Meals", "Nature Walk"],
    highlight: "Best for Families",
  },
  {
    name: "Pench + Kanha Combo",
    duration: "4 Nights / 5 Days",
    includes: ["4 Jeep Safaris", "2 Resort Stays", "All Transport", "All Meals"],
    highlight: "Best Value",
  },
  {
    name: "Custom Wildlife Tour",
    duration: "Flexible",
    includes: ["Customized Itinerary", "Choice of Resort", "Flexible Dates", "Personal Guide"],
    highlight: "Tailored for You",
  },
];

const Packages = () => {
  return (
    <Layout>
      <PageHero
        title="Tour Packages"
        subtitle="Pre-designed and custom safari packages for every budget"
        image={heroImage}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {packages.map((pkg) => (
              <div key={pkg.name} className="bg-background rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-block bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-semibold mb-4">
                  {pkg.highlight}
                </div>
                <h3 className="text-xl font-heading font-bold mb-1">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-forest-light gap-1">
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-lg mx-auto">
            <InquiryForm title="Get Custom Package Quote" service="Tour Package Inquiry" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Packages;
