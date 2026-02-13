import { Car as CarIcon, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import carImage from "@/assets/car-rental.jpg";

const fleet = [
  "Luxury Cars",
  "SUV Vehicles",
  "Sedan Cars",
  "Small Cars",
  "Airport Pickup & Drop",
  "Driver Included Option",
];

const CarRental = () => {
  return (
    <Layout>
      <PageHero
        title="Car Rental Services"
        subtitle="Reliable, punctual and clean vehicles for all your travel needs"
        image={carImage}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Our Fleet</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you need a comfortable sedan for a family trip or a spacious SUV for jungle terrain, we have the right vehicle for you. All cars are well-maintained and come with professional, experienced drivers.
              </p>

              <div className="space-y-3 mb-8">
                {fleet.map((item) => (
                  <div key={item} className="flex items-center gap-3 bg-muted rounded-lg p-4">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-secondary rounded-xl p-5 flex items-start gap-3">
                <CarIcon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm">Reliable, punctual and clean vehicles for all your travel needs.</p>
              </div>
            </div>

            <div>
              <InquiryForm title="Book a Car" service="Car Rental Service" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CarRental;
