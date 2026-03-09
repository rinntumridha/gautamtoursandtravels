import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-tiger.jpg";
import penchImage from "@/assets/pench-safari.jpg";
import kanhaImage from "@/assets/kanha-safari.jpg";
import resortImage from "@/assets/resort.jpg";
import carImage from "@/assets/car-rental.jpg";

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": "Gautam Tours Travel Gallery"
};

const images = [
  { src: heroImage, alt: "Bengal Tiger in the wild", caption: "Tiger sighting at Pench" },
  { src: penchImage, alt: "Pench safari trail", caption: "Safari trail at Pench Tiger Reserve" },
  { src: kanhaImage, alt: "Kanha landscape", caption: "Kanha Tiger Reserve meadows" },
  { src: resortImage, alt: "Wildlife resort", caption: "Premium resort near Pench" },
  { src: carImage, alt: "Travel vehicle", caption: "Our fleet vehicles" },
];

const Gallery = () => {
  return (
    <Layout>
      <SEO
        title="Jungle Safari Travel Gallery | Gautam Tours & Travels"
        description="Explore our jungle safari travel gallery featuring wildlife, safari adventures and memorable trips with Gautam Tours."
        schema={gallerySchema}
      />

      <section className="section-padding bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="group rounded-xl overflow-hidden shadow-md border border-border bg-background"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
