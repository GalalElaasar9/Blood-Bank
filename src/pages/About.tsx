import { Heart, Users, Shield, Target } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">About BloodBank Egypt</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          Dedicated to ensuring no life is lost due to shortage of blood. We connect donors with hospitals across Egypt.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            BloodBank Egypt was founded with a singular mission: to bridge the gap between blood donors and those in critical need. We leverage technology to create an efficient, transparent, and accessible blood donation ecosystem.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our platform serves as a central hub connecting hospitals, blood banks, and donors across all 27 governorates of Egypt, ensuring that life-saving blood is always within reach.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Heart, title: "Compassion", desc: "Every donation is an act of love" },
            { icon: Users, title: "Community", desc: "Building a network of life-savers" },
            { icon: Shield, title: "Safety", desc: "Rigorous screening and testing" },
            { icon: Target, title: "Accessibility", desc: "Reaching every corner of Egypt" },
          ].map((item, i) => (
            <div key={item.title} className="p-5 rounded-xl bg-accent/50 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
