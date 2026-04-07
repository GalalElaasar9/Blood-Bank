import { MapPin, Phone, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const hospitals = [
  { name: "Cairo University Hospital", city: "Cairo", phone: "+20 2 1234 5678", needs: ["A+", "O-", "B+"], urgent: true, beds: 1200 },
  { name: "Ain Shams Specialized Hospital", city: "Cairo", phone: "+20 2 2345 6789", needs: ["AB+", "A-", "B-"], urgent: true, beds: 800 },
  { name: "Alexandria Main Hospital", city: "Alexandria", phone: "+20 3 3456 7890", needs: ["O+", "O-", "A+"], urgent: true, beds: 950 },
  { name: "Mansoura University Hospital", city: "Dakahlia", phone: "+20 50 456 7890", needs: ["B+", "AB-"], urgent: false, beds: 650 },
  { name: "Luxor International Hospital", city: "Luxor", phone: "+20 95 567 8901", needs: ["O-", "A+", "B+"], urgent: false, beds: 400 },
  { name: "Aswan General Hospital", city: "Aswan", phone: "+20 97 678 9012", needs: ["A-", "AB+", "O+"], urgent: true, beds: 350 },
  { name: "Tanta University Hospital", city: "Gharbia", phone: "+20 40 789 0123", needs: ["B-", "O+"], urgent: false, beds: 500 },
  { name: "Suez Canal University Hospital", city: "Ismailia", phone: "+20 64 890 1234", needs: ["A+", "B+", "AB+", "O-"], urgent: true, beds: 600 },
];

const Hospitals = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Hospitals Needing Donations</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          These hospitals are currently seeking blood donations. Your contribution can make a difference.
        </p>
      </div>
    </section>

    <section className="container py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((h, i) => (
          <div
            key={h.name}
            className="rounded-xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div className={`h-1.5 ${h.urgent ? "bg-primary" : "bg-muted"}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg leading-tight">{h.name}</h3>
                {h.urgent && (
                  <span className="shrink-0 ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    Urgent
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                <MapPin className="h-3 w-3" /> {h.city}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                <Phone className="h-3 w-3" /> {h.phone}
              </p>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  <Droplet className="h-3 w-3" /> Blood Types Needed:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {h.needs.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                Contact Hospital
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Hospitals;
