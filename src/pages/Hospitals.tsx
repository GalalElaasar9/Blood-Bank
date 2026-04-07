import { MapPin, Phone, Droplet, Mail, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useHospitals } from "@/hooks/use-hygraph";

const Hospitals = () => {
  const { data: hospitals, isLoading } = useHospitals();

  // Filter hospitals that have at least one low-stock blood type
  const needingDonation = (hospitals || []).filter((h) =>
    h.bloodInventories?.some((inv) => inv.quantity < 5)
  );

  return (
    <Layout>
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Hospitals Needing Donations</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            These hospitals have low blood stock. Your donation can save lives.
          </p>
        </div>
      </section>

      <section className="container py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : needingDonation.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplet className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">All hospitals are well-stocked. Check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {needingDonation.map((h, i) => {
              const lowStockItems = h.bloodInventories?.filter((inv) => inv.quantity < 5) || [];
              return (
                <div
                  key={h.id}
                  className="rounded-xl border border-primary/30 bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                >
                  <div className="h-1.5 bg-primary" />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg leading-tight">{h.name}</h3>
                      <Badge variant="destructive" className="shrink-0 ml-2 gap-1">
                        <AlertTriangle className="h-3 w-3" /> Urgent
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" /> {h.city}
                    </p>
                    {h.phone && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                        <Phone className="h-3 w-3" /> {h.phone}
                      </p>
                    )}

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <Droplet className="h-3 w-3" /> Low Stock Blood Types:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {lowStockItems.map((inv) => (
                          <span
                            key={inv.id}
                            className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md"
                          >
                            {inv.bloodType} ({inv.quantity})
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {h.phone && (
                        <a href={`tel:${h.phone}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Phone className="h-3 w-3" /> Call
                          </Button>
                        </a>
                      )}
                      {h.whatsapp && (
                        <a href={`https://wa.me/${h.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-1">
                            <MessageCircle className="h-3 w-3" /> WhatsApp
                          </Button>
                        </a>
                      )}
                      {h.email && (
                        <a href={`mailto:${h.email}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <Mail className="h-3 w-3" /> Email
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Hospitals;
