import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import kanhaImage from "@/assets/kanha-safari.jpg";

const packages = [
  { name: "2N / 3D Family Package", desc: "Perfect weekend getaway for families with kids" },
  { name: "Safari + Resort Combo", desc: "Best value with combined safari and resort booking" },
  { name: "Custom Wildlife Tour", desc: "Tailored itinerary based on your preferences" },
];

const faqItems = [
  { question: "How far is Kanha from Nagpur?", answer: "Kanha Tiger Reserve is approximately 260 km from Nagpur, about a 5-6 hour drive." },
  { question: "Is Kanha better than Pench for tiger sighting?", answer: "Both reserves offer excellent tiger sighting opportunities. Kanha is larger and also known for the rare Barasingha deer." },
  { question: "What is the best season for Kanha?", answer: "October to June. Best tiger sightings are between February and May." },
  { question: "Do you arrange multi-day packages?", answer: "Yes, we offer 2N/3D and 3N/4D packages with safari, resort stay, and transport included." },
];

const KanhaSafari = () => {
  return (
    <Layout>
      <PageHero
        title="Kanha Tiger Reserve"
        subtitle="One of India's most beautiful and well-maintained tiger reserves"
        image={kanhaImage}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Why Visit Kanha</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Kanha National Park is one of the finest wildlife areas in the world. It was the inspiration for Rudyard Kipling's famous novel. The lush sal and bamboo forests, grassy meadows and ravines are home to a large variety of wildlife including the majestic Royal Bengal Tiger.
              </p>

              <h3 className="text-xl font-heading font-semibold mb-4">Package Options</h3>
              <div className="space-y-4 mb-8">
                {packages.map((pkg) => (
                  <div key={pkg.name} className="flex items-start gap-3 bg-muted rounded-xl p-4">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <p className="text-sm text-muted-foreground">{pkg.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
                <h3 className="text-xl font-heading font-bold mb-2">Plan Your Kanha Trip</h3>
                <p className="text-sm opacity-80 mb-4">Let us create the perfect wildlife experience for you</p>
                <a href="tel:+919325673079">
                  <Button className="bg-accent text-accent-foreground hover:bg-warm-light">
                    Call Now to Book
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <InquiryForm title="Book Kanha Safari" service="Kanha Tiger Reserve Safari" />
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />
    </Layout>
  );
};

export default KanhaSafari;
