import { Droplet, Search, Truck, Clock, TestTube, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";

const services = [
  { icon: Droplet, title: "Blood Collection", desc: "Safe and hygienic blood collection from registered donors with proper screening protocols." },
  { icon: Search, title: "Blood Availability Search", desc: "Real-time search for blood availability across all partner hospitals and blood banks." },
  { icon: Truck, title: "Emergency Delivery", desc: "Rapid blood delivery service to hospitals during emergency situations, available 24/7." },
  { icon: TestTube, title: "Blood Testing", desc: "Comprehensive testing of all collected blood units to ensure safety and compatibility." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock support for emergencies, donor inquiries, and hospital coordination." },
  { icon: ShieldCheck, title: "Donor Health Check", desc: "Free health screening for all blood donors including blood pressure, hemoglobin, and more." },
];

const Services = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Our Services</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          Comprehensive blood bank services to ensure safe, efficient, and accessible blood donation and distribution.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="p-6 rounded-xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Services;
