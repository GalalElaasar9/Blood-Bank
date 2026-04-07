import { Mail, Phone, MessageCircle, MapPin, Facebook, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout";

const contactChannels = [
  { icon: Phone, label: "Phone", value: "+20 123 456 7890", href: "tel:+201234567890" },
  { icon: Mail, label: "Gmail", value: "info@bloodbank-eg.com", href: "mailto:info@bloodbank-eg.com" },
  { icon: MessageCircle, label: "WhatsApp", value: "+20 100 123 4567", href: "https://wa.me/201001234567" },
  { icon: Facebook, label: "Facebook", value: "BloodBankEgypt", href: "https://facebook.com/BloodBankEgypt" },
  { icon: MapPin, label: "Address", value: "123 Medical District, Cairo, Egypt", href: "#" },
  { icon: Clock, label: "Working Hours", value: "24/7 Emergency | Sun-Thu 9AM-5PM", href: "#" },
];

const Contact = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Contact Us</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          Have questions? We're here to help. Reach out to us anytime.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input type="email" placeholder="Email Address" />
            <Input placeholder="Subject" />
            <Textarea placeholder="Your Message" rows={5} />
            <Button type="submit" className="w-full gap-2">
              <Mail className="h-4 w-4" /> Send Message
            </Button>
          </form>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          {contactChannels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex gap-4 p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{c.label}</h3>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
