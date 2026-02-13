import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface InquiryFormProps {
  title?: string;
  service?: string;
}

const InquiryForm = ({ title = "Get Custom Quote", service = "General Inquiry" }: InquiryFormProps) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `Hi, I'm ${formData.name}. I'm interested in: ${service}. ${formData.message}. Contact me at ${formData.phone}`;
    window.open(`https://wa.me/919325673079?text=${encodeURIComponent(whatsappMsg)}`, "_blank");
    toast.success("Redirecting you to WhatsApp...");
  };

  return (
    <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg border border-border">
      <h3 className="text-2xl font-heading font-bold text-foreground mb-6">{title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Input
          placeholder="Email (Optional)"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Textarea
          placeholder="Tell us about your travel plans..."
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-warm-light text-base py-6">
          Send Inquiry via WhatsApp
        </Button>
      </form>
    </div>
  );
};

export default InquiryForm;
