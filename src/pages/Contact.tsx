import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-tiger.jpg";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Gautam Tours and Travels"
};

const Contact = () => {
  return (
    <Layout>
      <SEO
        title="Contact Gautam Tours & Travels | Nagpur Safari Booking"
        description="Contact Gautam Tours & Travels for jungle safari booking, car rental and travel packages from Nagpur."
        schema={contactSchema}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Whether you're planning a jungle safari, need a resort recommendation, or want to book a car — we're here to help. Reach out and we'll get back to you promptly.
              </p>

              <div className="space-y-5 mb-8">
                <a href="tel:+919325673079" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">+91 9325673079</p>
                  </div>
                </a>
                <a href="mailto:info@gautamtoursandtravels.com" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-muted-foreground text-sm group-hover:text-primary transition-colors">info@gautamtoursandtravels.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Office Address</p>
                    <p className="text-muted-foreground text-sm">Plot no. 13, Near Mulchand Memorial Hospital, Parvati Nagar, Nagpur, Maharashtra – 440027</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Working Hours</p>
                    <p className="text-muted-foreground text-sm">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden border border-border shadow-sm h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.124!2d79.089!3d21.149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA4JzU2LjQiTiA3OcKwMDUnMjAuNCJF!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gautam Tours and Travels Location"
                />
              </div>
            </div>

            <div>
              <InquiryForm title="Send Us a Message" service="General Inquiry" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
