import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Clock, TreePine, Car, Hotel } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import heroImage from "@/assets/hero-tiger.jpg";

const packages = [
  {
    name: "Pench Weekend Safari Package",
    duration: "2 Nights / 3 Days",
    idealFor: "Couples, Friends, Weekend Travelers",
    highlight: "Most Popular",
    price: "Starting from ₹8,999/person",
    includes: [
      "2 Jeep Safaris (Morning + Evening)",
      "Resort Stay near Pench Gate",
      "Nagpur to Pench Car Rental",
      "All Meals (Breakfast + Dinner)",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Kanha Family Adventure Package",
    duration: "3 Nights / 4 Days",
    idealFor: "Families with Kids, Nature Lovers",
    highlight: "Best for Families",
    price: "Starting from ₹12,499/person",
    includes: [
      "3 Jeep Safaris with Zone Selection",
      "Family Resort with Kids Activities",
      "Round-trip Car Rental from Nagpur",
      "All Meals Included",
      "Guided Nature Walk",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Tadoba Jungle Experience",
    duration: "2 Nights / 3 Days",
    idealFor: "Wildlife Enthusiasts, Photographers",
    highlight: "Best Tiger Sightings",
    price: "Starting from ₹9,999/person",
    includes: [
      "3 Jeep Safaris in Premium Zones",
      "Resort Stay near Moharli/Kolara Gate",
      "Nagpur to Tadoba Transport",
      "All Meals Included",
      "Expert Naturalist Guide",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Corporate Group Safari Package",
    duration: "2 Nights / 3 Days",
    idealFor: "Corporate Teams, Office Outings, Team Building",
    highlight: "Group Special",
    price: "Custom Group Rates",
    includes: [
      "2 Group Safaris with Fleet Vehicles",
      "Group Accommodation (10-50 pax)",
      "Dedicated Fleet Transport",
      "All Meals + Bonfire Evening",
      "Team Activity Coordination",
      "Dedicated Trip Coordinator",
    ],
  },
  {
    name: "Navegaon-Nagzira Tiger Safari",
    duration: "2 Nights / 3 Days",
    idealFor: "Nature Lovers, Birdwatchers, Peaceful Getaway",
    highlight: "Hidden Gem",
    price: "Starting from ₹7,499/person",
    includes: [
      "2 Jeep Safaris (Navegaon + Nagzira)",
      "Lakeside Resort Stay",
      "Nagpur to Navegaon Transport",
      "All Meals Included",
      "Birdwatching Trail Walk",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Umred-Karhandla Weekend Safari",
    duration: "1 Night / 2 Days",
    idealFor: "Weekend Travelers, Budget Explorers",
    highlight: "Closest to Nagpur",
    price: "Starting from ₹5,499/person",
    includes: [
      "2 Jeep Safaris (Morning + Evening)",
      "Resort Stay near Sanctuary",
      "Nagpur Pickup & Drop (60 km)",
      "All Meals Included",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Bor Wildlife Day Safari",
    duration: "1 Night / 2 Days",
    idealFor: "First-time Safari Goers, Short Trips",
    highlight: "Quick Getaway",
    price: "Starting from ₹4,999/person",
    includes: [
      "1 Jeep Safari in Single Zone",
      "Overnight Resort Stay",
      "Nagpur to Bor Transport (70 km)",
      "Meals Included",
      "High Tiger Sighting Chances",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Gorewada City Safari Experience",
    duration: "Day Trip",
    idealFor: "Families, Kids, City Visitors",
    highlight: "No Long Travel",
    price: "Starting from ₹1,999/person",
    includes: [
      "Bus Safari in Gorewada Park",
      "Walking Trail Access",
      "Nagpur City Pickup & Drop",
      "Lunch Included",
      "Ideal for Children & Seniors",
    ],
  },
  {
    name: "Melghat Adventure Safari",
    duration: "3 Nights / 4 Days",
    idealFor: "Adventure Seekers, Trekkers, Photographers",
    highlight: "Offbeat Adventure",
    price: "Starting from ₹11,999/person",
    includes: [
      "3 Jeep Safaris in Sipna & Kolkaz",
      "Hillside Resort Stay",
      "Nagpur to Melghat Transport",
      "All Meals Included",
      "Tribal Culture Experience",
      "Safari Permit Assistance",
    ],
  },
  {
    name: "Custom Safari + Car + Resort Package",
    duration: "Flexible Duration",
    idealFor: "Anyone Wanting a Tailored Experience",
    highlight: "Tailored for You",
    price: "Based on Requirements",
    includes: [
      "Choose Your Safari Destination",
      "Pick Your Preferred Resort",
      "Flexible Car Rental Options",
      "Customizable Meal Plans",
      "Personal Trip Planner",
      "Multi-Destination Options",
    ],
  },
];

const faqItems = [
  { question: "Can I customize a package?", answer: "Yes! All our packages can be customized based on your preferences. Choose your safari destination, resort category, vehicle type, and duration. Contact us with your requirements and we'll create a personalized itinerary." },
  { question: "What is included in safari packages?", answer: "Our packages typically include jeep safari permits, resort accommodation, car rental with driver, meals (breakfast & dinner), and pickup/drop from Nagpur. Specific inclusions are listed in each package." },
  { question: "Is cancellation allowed?", answer: "Yes, cancellations are allowed. Full refund for cancellations made 7+ days before the trip. 50% refund for 3-7 days notice. Safari permits once booked are subject to forest department cancellation policies." },
  { question: "How early should I book?", answer: "We recommend booking at least 2-3 weeks in advance, especially during peak season (February-May). Weekend safaris and holiday periods fill up quickly. For group bookings, 1 month advance is advisable." },
  { question: "Do you offer group discounts?", answer: "Yes, we offer attractive group discounts for 5+ persons. Corporate groups, large families, and event organizers get custom bulk rates. Contact us for a personalized group quote." },
];

const Packages = () => {
  return (
    <Layout>
      <PageHero
        title="Tour Packages"
        subtitle="Safari + Car Rental + Resort — All-inclusive travel packages from Nagpur"
        image={heroImage}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Our Packages
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Pre-designed and customizable safari packages combining jungle safari, car rental, and resort stays for a hassle-free wildlife experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {packages.map((pkg) => (
              <Card key={pkg.name} className="flex flex-col hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="inline-block bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-semibold mb-3 w-fit">
                    {pkg.highlight}
                  </div>
                  <CardTitle className="text-xl">{pkg.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {pkg.duration}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="bg-muted rounded-lg p-3 mb-4">
                    <p className="text-xs font-semibold uppercase text-primary mb-1">Ideal For</p>
                    <p className="text-sm text-muted-foreground">{pkg.idealFor}</p>
                  </div>

                  <ul className="space-y-2 mb-4 flex-1">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-primary/5 rounded-lg p-3 mb-4 text-center">
                    <span className="font-heading font-bold text-primary">{pkg.price}</span>
                  </div>

                  <a href="tel:+919325673079">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-forest-light gap-1">
                      Get Quote <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />

      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-lg">
          <InquiryForm title="Get Custom Package Quote" service="Tour Package Inquiry" />
        </div>
      </section>
    </Layout>
  );
};

export default Packages;
