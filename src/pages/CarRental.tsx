import { Car, CheckCircle, Users, Crown, Building2, Phone, Clock, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import carImage from "@/assets/car-rental.jpg";

const carRentalSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Car Rental",
  "provider": { "@type": "TravelAgency", "name": "Gautam Tours and Travels" },
  "areaServed": { "@type": "City", "name": "Nagpur" }
};

interface ServiceCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  idealFor: string;
  vehicles: string[];
  cta: string;
}

const categories: ServiceCategory[] = [
  {
    icon: Car,
    title: "Car Rental Services",
    description: "Reliable and affordable car rental for city travel, outstation trips, airport transfers, and daily commute needs.",
    idealFor: "Families, solo travelers, couples, and small groups looking for comfortable point-to-point travel.",
    vehicles: ["Sedan (Swift Dzire, Honda Amaze)", "Hatchback (Swift, i20)", "SUV (Innova, Ertiga)", "MUV (Marazzo, TUV300)"],
    cta: "Get a Quote",
  },
  {
    icon: Crown,
    title: "Luxury Car Rental Services",
    description: "Premium vehicles for weddings, VIP travel, business meetings, and special occasions. Experience comfort and style.",
    idealFor: "Weddings, corporate executives, VIP guests, special celebrations, and high-profile events.",
    vehicles: ["Toyota Innova Crysta", "Toyota Fortuner", "Mercedes-Benz", "BMW Series", "Audi"],
    cta: "Book Luxury",
  },
  {
    icon: Building2,
    title: "Bulk Car Rental Services",
    description: "Fleet solutions for corporate travel, group events, conferences, and large-scale transportation needs with dedicated coordination.",
    idealFor: "Corporates, event organizers, wedding planners, tour groups, and conference coordinators.",
    vehicles: ["Tempo Traveller (12-26 seater)", "Mini Bus (30-40 seater)", "Luxury Bus (45-50 seater)", "Fleet of Sedans/SUVs"],
    cta: "Request Fleet Quote",
  },
];

const comparisonData = [
  { feature: "Best For", standard: "Daily travel & trips", luxury: "VIP & special occasions", bulk: "Groups & corporates" },
  { feature: "Vehicle Range", standard: "Sedan, Hatchback, SUV", luxury: "Premium SUV, Sedan", bulk: "Tempo, Bus, Fleet" },
  { feature: "Driver", standard: "Professional", luxury: "Trained chauffeur", bulk: "Dedicated fleet drivers" },
  { feature: "Pricing", standard: "Budget-friendly", luxury: "Premium", bulk: "Custom bulk rates" },
  { feature: "Booking", standard: "Instant", luxury: "Advance preferred", bulk: "Advance required" },
];

const highlights = [
  { icon: Users, text: "Professional Drivers" },
  { icon: Shield, text: "Clean & Sanitized Vehicles" },
  { icon: DollarSign, text: "Transparent Pricing" },
  { icon: Clock, text: "On-Time Pickup Guarantee" },
];

const faqItems = [
  { question: "Do you provide drivers?", answer: "Yes, all our rental cars come with experienced, professional drivers who are well-versed with routes across Maharashtra and central India." },
  { question: "Is fuel included?", answer: "Fuel costs are generally borne by the customer. However, for outstation packages, we offer all-inclusive pricing options that cover fuel charges. Ask us for details." },
  { question: "Do you offer airport pickup?", answer: "Yes, we provide prompt airport pickup and drop services at Nagpur airport (Dr. Babasaheb Ambedkar International Airport) and all nearby railway stations." },
  { question: "Can I book for multiple days?", answer: "Absolutely! We offer multi-day rental plans at discounted rates. Whether it's a 2-day safari trip or a week-long tour, we've got you covered with competitive pricing." },
  { question: "Do you provide cars for group travel?", answer: "Yes, we offer Tempo Travellers, mini buses, and luxury buses for group travel. We handle corporate events, weddings, pilgrimages, and large family outings with dedicated fleet coordination." },
];

const CarRental = () => {
  return (
    <Layout>
      <SEO
        title="Car Rental in Nagpur | Luxury, Bulk & Travel Cars"
        description="Affordable car rental in Nagpur with professional drivers. Luxury cars, SUVs and bulk vehicle booking for tours, safari trips and events."
        schema={carRentalSchema}
      />
        title="Car Rental Services"
        subtitle="Reliable, punctual and clean vehicles for all your travel needs"
        image={carImage}
      />

      {/* Service Categories */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Choose from our range of car rental options tailored for every occasion and budget.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader className="text-center pb-2">
                  <cat.icon className="h-12 w-12 text-primary mx-auto mb-3" />
                  <CardTitle className="text-xl">{cat.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-muted-foreground text-sm mb-4">{cat.description}</p>
                  <div className="bg-muted rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold uppercase text-primary mb-1">Ideal For</p>
                    <p className="text-sm text-muted-foreground">{cat.idealFor}</p>
                  </div>
                  <div className="space-y-2 mb-6 flex-1">
                    {cat.vehicles.map((v) => (
                      <div key={v} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-sm">{v}</span>
                      </div>
                    ))}
                  </div>
                  <a href="tel:+919325673079">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-warm-light">
                      {cat.cta}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-10">
            Compare Our Services
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Standard</th>
                  <th className="p-4 text-center font-semibold">Luxury</th>
                  <th className="p-4 text-center font-semibold">Bulk</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-b-0">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-center text-sm text-muted-foreground">{row.standard}</td>
                    <td className="p-4 text-center text-sm text-muted-foreground">{row.luxury}</td>
                    <td className="p-4 text-center text-sm text-muted-foreground">{row.bulk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <h.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="font-semibold text-sm">{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* CTA + Inquiry */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-heading font-bold mb-4">Ready to Book?</h2>
              <p className="text-muted-foreground mb-6">
                Tell us your travel requirements and we'll provide the best vehicle at the best price. No hidden charges, guaranteed.
              </p>
              <a href="tel:+919325673079" className="self-start">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-warm-light gap-2">
                  <Phone className="h-5 w-5" /> Call Now
                </Button>
              </a>
            </div>
            <div>
              <InquiryForm title="Get a Car Rental Quote" service="Car Rental Service" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CarRental;
