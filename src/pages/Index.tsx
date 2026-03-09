import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, TreePine, Car, Hotel, CheckCircle, Phone, Star, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import FAQ from "@/components/FAQ";
import heroImage from "@/assets/hero-tiger.jpg";
import penchImage from "@/assets/pench-safari.jpg";
import resortImage from "@/assets/resort.jpg";
import carImage from "@/assets/car-rental.jpg";

const services = [
{
  icon: Car,
  title: "Car Rental Services",
  desc: "Luxury cars, SUVs and small vehicles with professional drivers.",
  link: "/car-rental",
  image: carImage
},
{
  icon: TreePine,
  title: "Jungle Safari Booking",
  desc: "Pench & Kanha Tiger Reserve safari assistance with zone guidance and confirmed bookings.",
  link: "/jungle-safari",
  image: penchImage
},
{
  icon: Hotel,
  title: "Hotels & Resorts",
  desc: "Verified, clean and comfortable stays near wildlife zones.",
  link: "/hotels",
  image: resortImage
}];


const whyUs = [
"Trusted Safari Assistance from Nagpur",
"Transparent Pricing",
"Verified Resorts",
"Professional Drivers",
"Personalized Travel Planning"];


const testimonials = [
{ name: "Rajesh Sharma", text: "Wonderful experience! The safari booking was smooth and the resort was perfect for my family.", rating: 5 },
{ name: "Priya Deshmukh", text: "Very professional service. Gautam Tours made our Pench trip absolutely hassle-free.", rating: 5 },
{ name: "Anil Patil", text: "Great car service and well-organized safari. Highly recommended for wildlife lovers.", rating: 5 }];


const faqItems = [
{ question: "How do I book a jungle safari?", answer: "Simply contact us via phone or WhatsApp at +91 9325673079. We'll help you choose the best zone, date, and accommodation for your trip." },
{ question: "What is the best time to visit Pench or Kanha?", answer: "The best time is from October to June. Peak tiger sighting season is from February to May." },
{ question: "Do you provide pickup from Nagpur?", answer: "Yes, we provide pickup and drop services from Nagpur to both Pench and Kanha Tiger Reserves." },
{ question: "Are the resorts family-friendly?", answer: "Absolutely! All our partner resorts are verified for cleanliness, safety, and comfort — perfect for families." }];


const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
        <img src={heroImage} alt="Tiger in Indian jungle" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <p className="text-beige font-medium text-sm tracking-widest uppercase mb-4 animate-fade-in">
              Trusted Car Rental & Travel Partner from Nagpur
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              Premium Car Rental Services in Nagpur
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Luxury Cars, SUVs & Comfortable Vehicles with Professional Drivers — For Safari Trips, City Travel & Outstation Journeys.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.45s" }}>
              <Link to="/car-rental">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-warm-light text-base px-8 py-6">
                  Book a Car Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-beige text-primary hover:bg-beige/10 text-base px-8 py-6">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">About Gautam Tours & Travels</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Gautam Tours and Travels is a Nagpur-based travel service specializing in Jungle Safari bookings, Resort stays, and Car Rentals. We help families, professionals, and government employees plan safe, comfortable and well-organized wildlife trips to Pench and Kanha.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) =>
            <Link
              key={service.title}
              to={service.link}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border">

                <div className="h-52 overflow-hidden">
                  <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{service.desc}</p>
                  <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding text-black bg-slate-200">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyUs.map((item) =>
            <div key={item} className="flex items-center gap-3 rounded-xl p-5 bg-slate-500">
                <CheckCircle className="h-6 w-6 shrink-0 text-beige" />
                <span className="font-medium text-sm">{item}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-slate-300">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Limited Safari Slots Available</h2>
          <p className="text-muted-foreground mb-8">
            Don't miss out on the best tiger sighting season. Book your Pench or Kanha safari today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919325673079">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-warm-light gap-2 px-8 py-6">
                <Phone className="h-5 w-5" /> Call +91 9325673079
              </Button>
            </a>
            <Link to="/packages">
              <Button size="lg" variant="outline" className="px-8 py-6">
                View Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">What Our Guests Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) =>
            <div key={i} className="bg-background rounded-xl p-6 border border-border shadow-sm">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) =>
                <Star key={j} className="h-4 w-4 fill-warm text-warm" />
                )}
                </div>
                <p className="text-muted-foreground text-sm mb-4 italic">"{t.text}"</p>
                <p className="font-semibold text-sm">{t.name}</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline">Read More Reviews</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faqItems} />
    </Layout>);

};

export default Index;