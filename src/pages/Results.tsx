import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Droplet, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const governorates = [
  "Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Ismailia", "Port Said",
  "Suez", "Dakahlia", "Sharqia", "Qalyubia", "Gharbia", "Monufia", "Beheira",
  "Kafr El Sheikh", "Damietta", "Fayoum", "Beni Suef", "Minya", "Asyut",
  "Sohag", "Qena", "Red Sea", "New Valley", "Matruh", "North Sinai", "South Sinai",
];

const mockResults = [
  { hospital: "Cairo University Hospital", city: "Cairo", type: "A+", units: 12, available: true },
  { hospital: "Ain Shams Hospital", city: "Cairo", type: "A+", units: 0, available: false },
  { hospital: "Alexandria Main Hospital", city: "Alexandria", type: "A+", units: 5, available: true },
  { hospital: "Mansoura University Hospital", city: "Dakahlia", type: "B+", units: 8, available: true },
  { hospital: "Luxor General Hospital", city: "Luxor", type: "O-", units: 3, available: true },
  { hospital: "Aswan General Hospital", city: "Aswan", type: "O+", units: 0, available: false },
  { hospital: "Suez Canal Hospital", city: "Ismailia", type: "AB+", units: 2, available: true },
  { hospital: "Tanta University Hospital", city: "Gharbia", type: "B-", units: 7, available: true },
];

const Results = () => {
  const [searchParams] = useSearchParams();
  const [bloodType, setBloodType] = useState(searchParams.get("type") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [results, setResults] = useState(mockResults);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    let filtered = mockResults;
    if (bloodType) filtered = filtered.filter((r) => r.type === bloodType);
    if (city) filtered = filtered.filter((r) => r.city === city);
    setResults(filtered);
  };

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
                {bloodTypes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
              <SelectContent>
                {governorates.map((g) => (
                  <SelectItem key={g} value={g}>{g}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="gap-2">
              <Droplet className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>

        {searched && results.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplet className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No results found. Try different filters.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                <div className="flex-1">
                  <h3 className="font-semibold">{r.hospital}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {r.city}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-lg">
                    {r.type}
                  </span>
                  <div className="flex items-center gap-1">
                    {r.available ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-primary" />
                    )}
                    <span className={`text-sm font-medium ${r.available ? "text-green-600" : "text-primary"}`}>
                      {r.available ? `${r.units} units` : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Results;
