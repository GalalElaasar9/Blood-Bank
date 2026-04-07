import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Droplet, MapPin, CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useBloodInventory } from "@/hooks/use-hygraph";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const governorates = [
  "Cairo", "Giza", "Alexandria", "Sharqia", "Dakahlia", "Gharbia", "Monufia",
  "Qalyubia", "Beheira", "Fayoum", "Beni Suef", "Minya", "Assiut", "Sohag",
  "Qena", "Luxor", "Aswan", "Port Said", "Ismailia", "Suez", "Kafr El Sheikh",
];

const Results = () => {
  const [searchParams] = useSearchParams();
  const [bloodType, setBloodType] = useState(searchParams.get("type") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [searched, setSearched] = useState(false);

  const { data: inventory, isLoading } = useBloodInventory();

  const handleSearch = () => setSearched(true);

  const filtered = (inventory || []).filter((item) => {
    if (!searched) return true;
    const matchType = !bloodType || item.bloodType === bloodType;
    const matchCity = !city || item.hospitals?.some((h) => h.city === city);
    return matchType && matchCity;
  });

  return (
    <Layout>
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Blood Availability</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Search for available blood units across hospitals in Egypt.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <div className="bg-card rounded-xl card-shadow p-6 border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger><SelectValue placeholder="Blood Type" /></SelectTrigger>
              <SelectContent>
                {bloodTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
              <SelectContent>
                {governorates.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="gap-2">
              <Droplet className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : searched && filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplet className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No results found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filtered.map((item, i) => {
              const hospital = item.hospitals?.[0];
              const lowStock = item.quantity < 5;
              return (
                <div
                  key={item.id || i}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in-up ${lowStock ? "border-primary/50" : ""}`}
                  style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{hospital?.name || "Unknown Hospital"}</h3>
                      {lowStock && (
                        <Badge variant="destructive" className="gap-1 text-xs">
                          <AlertTriangle className="h-3 w-3" /> Low Stock
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {hospital?.city || "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-lg">
                      {item.bloodType}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.quantity > 0 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-primary" />
                      )}
                      <span className={`text-sm font-medium ${item.quantity > 0 ? "text-green-600" : "text-primary"}`}>
                        {item.quantity > 0 ? `${item.quantity} units` : "Unavailable"}
                      </span>
                    </div>
                    {item.price > 0 && (
                      <span className="text-sm text-muted-foreground">{item.price} EGP</span>
                    )}
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

export default Results;
