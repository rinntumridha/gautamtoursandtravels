import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Camera, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import penchImage from "@/assets/pench-safari.jpg";

const offerings = [
  "Jeep Safari Booking Assistance",
  "Zone Selection Guidance",
  "Resort Booking",
  "Pickup & Drop from Nagpur",
  "Complete Travel Coordination",
];

const idealFor = [
  { icon: Users, label: "Weekend Travelers" },
  { icon: Users, label: "Families" },
  { icon: Users, label: "Office Groups" },
  { icon: Camera, label: "Wildlife Lovers" },
];

const faqItems = [
  { question: "How far is Pench from Nagpur?", answer: "Pench Tiger Reserve is approximately 80 km from Nagpur, about a 2-hour drive." },
  { question: "What safari zones are available?", answer: "Pench has multiple zones including Turia, Karmajhiri, and Jamtara. We help you choose the best zone based on tiger sighting history." },
  { question: "Can I do a day trip from Nagpur?", answer: "Yes, we offer day trip safari packages from Nagpur with pickup and drop included." },
  { question: "What should I carry for the safari?", answer: "Wear earth-toned clothes, carry binoculars, camera, sunscreen, and a water bottle. We provide a detailed checklist upon booking." },
];

const PenchSafari = () => {
  return (
    <Layout>
      <PageHero
        title="Pench Tiger Reserve"
        subtitle="Experience the magic of the jungle that inspired The Jungle Book"
        image={penchImage}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">About Pench</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Located in Madhya Pradesh, Pench is known for its rich wildlife and high tiger sighting opportunities. The reserve is famous as the inspiration for Rudyard Kipling's "The Jungle Book" and is one of the most accessible tiger reserves from Nagpur.
              </p>

              <h3 className="text-xl font-heading font-semibold mb-4">What We Offer</h3>
              <ul className="space-y-3 mb-8">
                {offerings.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-heading font-semibold mb-4">Ideal For</h3>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {idealFor.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 bg-muted rounded-lg p-3">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
                <h3 className="text-xl font-heading font-bold mb-2">Book Your Pench Safari Today</h3>
                <p className="text-sm opacity-80 mb-4">Limited slots available during peak season</p>
                <a href="tel:+919325673079">
                  <Button className="bg-accent text-accent-foreground hover:bg-warm-light">
                    Call Now to Book
                  </Button>
                </a>
              </div>
            </div>

            <div>
              <InquiryForm title="Book Pench Safari" service="Pench Tiger Reserve Safari" />
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />
    </Layout>
  );
};

export default PenchSafari;
