import { TreePine, Shield, MapPin, Clock, Car, Hotel, DollarSign, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-tiger.jpg";

const safariSchema = {
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": "Jungle Safari Tours from Nagpur",
  "touristType": "Wildlife Tour",
  "provider": { "@type": "TravelAgency", "name": "Gautam Tours and Travels" }
};

interface SafariDestination {
  name: string;
  intro: string;
  whyVisit: string;
  bestTime: string;
  safariType: string;
}

const destinations: SafariDestination[] = [
  {
    name: "Tadoba-Andhari Tiger Reserve",
    intro: "Maharashtra's oldest and largest national park, Tadoba is renowned for its high density of tigers and rich biodiversity.",
    whyVisit: "One of the best tiger sighting success rates in India. Lush teak forests, serene lakes, and diverse wildlife including leopards, sloth bears, and wild dogs.",
    bestTime: "October to June. Peak tiger sightings from February to May.",
    safariType: "Jeep Safari available in Moharli, Tadoba, Kolsa, Navegaon, Kolara, and Agarzari zones.",
  },
  {
    name: "Pench Tiger Reserve",
    intro: "The land that inspired Rudyard Kipling's 'The Jungle Book'. Pench offers a magical wildlife experience with stunning landscapes.",
    whyVisit: "Excellent tiger sightings, beautiful teak and mixed forests, and the famous Pench River that attracts diverse wildlife. Great for birdwatching with 285+ species.",
    bestTime: "October to June. Best sightings from March to May.",
    safariType: "Jeep Safari in Turia, Karmajhiri, Jamtara, Sillari, Khursapar, and Rukhad zones.",
  },
  {
    name: "Kanha National Park",
    intro: "One of India's finest tiger reserves and the inspiration behind Rudyard Kipling's 'The Jungle Book'. Kanha is celebrated for saving the Barasingha (hard-ground swamp deer) from extinction.",
    whyVisit: "Sprawling sal and bamboo forests, open meadows, and one of the highest tiger populations in India. Excellent for spotting tigers, leopards, wild dogs, and the rare Barasingha. World-class safari infrastructure.",
    bestTime: "October to June. Peak season is February to May for the best tiger sightings.",
    safariType: "Jeep Safari in Kisli, Kanha, Mukki, and Sarhi zones. Buffer zones also available.",
  },
  {
    name: "Navegaon-Nagzira Tiger Reserve",
    intro: "A hidden gem combining two sanctuaries — Navegaon National Park and Nagzira Wildlife Sanctuary — into one tiger corridor.",
    whyVisit: "Less crowded alternative with peaceful surroundings, good tiger and leopard sightings, and beautiful Navegaon lake. Perfect for nature lovers seeking tranquility.",
    bestTime: "November to May.",
    safariType: "Jeep Safari available. Zones include Navegaon and Nagzira sectors.",
  },
  {
    name: "Umred-Pauni-Karhandla Wildlife Sanctuary",
    intro: "Located just 60 km from Nagpur, this sanctuary is famous for the legendary tiger 'Jai' and growing wildlife population.",
    whyVisit: "Closest tiger reserve to Nagpur city. Excellent weekend getaway with increasing tiger population and lush deciduous forests.",
    bestTime: "October to May.",
    safariType: "Jeep Safari in designated zones. Half-day safari options available.",
  },
  {
    name: "Bor Wildlife Sanctuary",
    intro: "One of the smallest wildlife sanctuaries in Maharashtra, yet one of the most rewarding for tiger sightings.",
    whyVisit: "Compact area means higher chances of spotting tigers. Also home to Indian bison (gaur), leopards, and sambar deer. Just 70 km from Nagpur.",
    bestTime: "October to June.",
    safariType: "Jeep Safari. Single zone with excellent coverage.",
  },
  {
    name: "Gorewada International Zoological Park",
    intro: "Nagpur's own wildlife destination — a rescue center and safari park on the outskirts of the city.",
    whyVisit: "Ideal for families and short trips. Experience Indian safari without long travel. Rescued tigers, lions, and other animals in semi-wild habitats.",
    bestTime: "Year-round, except during heavy monsoon.",
    safariType: "Bus Safari and walking trails available.",
  },
  {
    name: "Melghat Tiger Reserve",
    intro: "Set in the Satpura ranges, Melghat is a rugged and remote wilderness known for its tribal culture and wild terrain.",
    whyVisit: "One of the first Project Tiger reserves. Stunning hill terrain, dense forests, and rare species like the forest owlet. An adventurer's paradise.",
    bestTime: "November to May. Best wildlife viewing from March to May.",
    safariType: "Jeep Safari in Sipna, Kolkaz, and Dhakna ranges.",
  },
];

const whyBookReasons = [
  { icon: Shield, title: "Verified Safari Assistance", desc: "Authorized booking support for all major tiger reserves" },
  { icon: MapPin, title: "Zone Selection Guidance", desc: "Expert advice on the best zones based on season and sightings" },
  { icon: Car, title: "Pickup & Drop Support", desc: "Comfortable transport from Nagpur to all safari destinations" },
  { icon: Hotel, title: "Resort Coordination", desc: "Curated stay options near every tiger reserve" },
  { icon: DollarSign, title: "Transparent Pricing", desc: "No hidden charges — clear upfront pricing for all packages" },
];

const faqItems = [
  { question: "What is the best time for jungle safari?", answer: "Most tiger reserves are open from October to June. The best time for wildlife sightings is February to May when the dry season drives animals to water sources, making them easier to spot." },
  { question: "How can I book a safari from Nagpur?", answer: "Simply contact us via phone or fill out the inquiry form on this page. We handle the entire booking process including permit assistance, zone selection, transport, and resort coordination from Nagpur." },
  { question: "Are safari permits included?", answer: "Safari permit costs are included in our packages. We assist with the complete permit booking process through the forest department, ensuring you get the best zones and timings." },
  { question: "Is pickup and drop available?", answer: "Yes, we provide comfortable pickup and drop services from Nagpur to all safari destinations. Our vehicles are well-maintained and driven by experienced drivers familiar with the routes." },
  { question: "What documents are required for safari booking?", answer: "You'll need a valid government-issued photo ID (Aadhaar, PAN, Passport, or Driving License) for all members. For foreign nationals, a passport is mandatory. Children under 5 are generally not allowed on jeep safaris." },
];

const JungleSafari = () => {
  return (
    <Layout>
      <SEO
        title="Jungle Safari Booking from Nagpur | Tadoba, Pench & More"
        description="Plan jungle safari tours from Nagpur. Visit Tadoba, Pench, Melghat and other wildlife reserves with safari booking, resorts and travel support."
        schema={safariSchema}
      />
      <PageHero
        title="Explore India's Top Jungle Safari Destinations"
        subtitle="Trusted Safari Booking & Travel Assistance from Nagpur"
        image={heroImage}
      />

      {/* Destinations */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Safari Destinations
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Discover the best wildlife sanctuaries and tiger reserves near Nagpur, all bookable with our trusted travel assistance.
          </p>

          <div className="space-y-6">
            {destinations.map((dest, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
                    <TreePine className="h-6 w-6 text-primary shrink-0" />
                    {dest.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-5">{dest.intro}</p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="details" className="border-none">
                      <AccordionTrigger className="text-primary font-semibold py-2 hover:no-underline">
                        View Details
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          <div className="bg-muted rounded-lg p-4">
                            <h4 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                              <TreePine className="h-4 w-4 text-primary" /> Why Visit
                            </h4>
                            <p className="text-sm text-muted-foreground">{dest.whyVisit}</p>
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <h4 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                              <Clock className="h-4 w-4 text-primary" /> Best Time
                            </h4>
                            <p className="text-sm text-muted-foreground">{dest.bestTime}</p>
                          </div>
                          <div className="bg-muted rounded-lg p-4">
                            <h4 className="font-semibold text-sm mb-1 flex items-center gap-1.5">
                              <Car className="h-4 w-4 text-primary" /> Safari Type
                            </h4>
                            <p className="text-sm text-muted-foreground">{dest.safariType}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <a href="tel:+919325673079">
                            <Button className="bg-accent text-accent-foreground hover:bg-warm-light gap-2">
                              <Phone className="h-4 w-4" /> Book This Safari
                            </Button>
                          </a>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-10">
            Why Book With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyBookReasons.map((r, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <r.icon className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-lg mb-1">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* CTA + Inquiry */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Book Your Jungle Safari Today
              </h2>
              <p className="opacity-90 mb-6 max-w-lg mx-auto lg:mx-0">
                Let our experts plan the perfect wildlife adventure for you. From zone selection to resort booking — we handle everything.
              </p>
              <a href="tel:+919325673079">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-warm-light gap-2">
                  <Phone className="h-5 w-5" /> Call Now to Book
                </Button>
              </a>
            </div>
            <div>
              <InquiryForm title="Book a Safari" service="Jungle Safari" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default JungleSafari;
