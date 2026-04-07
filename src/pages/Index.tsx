import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, Users, Droplet, Hospital, ArrowRight, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import { useHospitals } from "@/hooks/use-hygraph";
import heroImage from "@/assets/hero-blood-donation.jpg";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const governorates = [
  "Cairo", "Giza", "Alexandria", "Sharqia", "Dakahlia", "Gharbia", "Monufia",
  "Qalyubia", "Beheira", "Fayoum", "Beni Suef", "Minya", "Assiut", "Sohag",
  "Qena", "Luxor", "Aswan", "Port Said", "Ismailia", "Suez", "Kafr El Sheikh",
];

const stats = [
  { icon: Droplet, value: "15,000+", label: "Units Available" },
  { icon: Users, value: "50,000+", label: "Registered Donors" },
  { icon: Hospital, value: "200+", label: "Partner Hospitals" },
  { icon: Heart, value: "100,000+", label: "Lives Saved" },
];

const Index = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const { data: hospitals, isLoading } = useHospitals();

  const featured = (hospitals || []).slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Blood donation" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="relative container py-24 md:py-36">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              Every Drop <span className="text-primary">Saves</span> a Life
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Join Egypt's largest blood donation network. Find donors, check availability, and help save lives in your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/donor-registration">
                <Button size="lg" className="text-base gap-2">
                  <Heart className="h-5 w-5" /> Become a Donor
                </Button>
              </Link>
              <Link to="/results">
                <Button size="lg" variant="outline" className="text-base gap-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
                  <Search className="h-5 w-5" /> Find Blood
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="container -mt-8 relative z-10">
        <div className="bg-card rounded-xl card-shadow p-6 md:p-8 border animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-semibold mb-4">Search Blood Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger><SelectValue placeholder="Select Blood Type" /></SelectTrigger>
              <SelectContent>
                {bloodTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="Select City" /></SelectTrigger>
              <SelectContent>
                {governorates.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
            <Link to={`/results?type=${bloodType}&city=${city}`}>
              <Button className="w-full gap-2" size="default">
                <Search className="h-4 w-4" /> Search
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-accent/50 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Hospitals</h2>
              <p className="text-muted-foreground mt-1">Hospitals currently in need of blood donations</p>
            </div>
            <Link to="/hospitals">
              <Button variant="ghost" className="gap-1">View All <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((h, i) => {
                const hasLowStock = h.bloodInventories?.some((inv) => inv.quantity < 5);
                const lowTypes = h.bloodInventories?.filter((inv) => inv.quantity < 5) || [];
                return (
                  <div
                    key={h.id}
                    className={`bg-card rounded-xl p-5 border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up ${hasLowStock ? "border-primary/40" : ""}`}
                    style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                  >
                    {hasLowStock && (
                      <Badge variant="destructive" className="mb-3 gap-1">
                        <AlertTriangle className="h-3 w-3" /> Urgent Need
                      </Badge>
                    )}
                    <h3 className="font-semibold text-foreground">{h.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {h.city}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(h.bloodInventories || []).slice(0, 4).map((inv) => (
                        <span
                          key={inv.id}
                          className={`px-2 py-0.5 text-xs font-medium rounded-md ${
                            inv.quantity < 5
                              ? "bg-primary/10 text-primary"
                              : "bg-accent text-accent-foreground"
                          }`}
                        >
                          {inv.bloodType}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Ready to Save Lives?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Register as a blood donor today and become part of a life-saving community.
          </p>
          <Link to="/donor-registration">
            <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
              Register Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
