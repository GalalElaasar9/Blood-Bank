import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Droplet, MapPin, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout.jsx";
import { useBloodInventory } from "@/hooks/use-hygraph.js";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const bloodTypeMap = {
  "A+": "A_Positive", "A-": "A_Negative",
  "B+": "B_Positive", "B-": "B_Negative",
  "AB+": "AB_Positive", "AB-": "AB_Negative",
  "O+": "O_Positive", "O-": "O_Negative",
};

const governorates = [
  { value: "cairo", label: "القاهرة" },
  { value: "giza", label: "الجيزة" },
  { value: "alexandria", label: "الإسكندرية" },
  { value: "sharqia", label: "الشرقية" },
  { value: "dakahlia", label: "الدقهلية" },
  { value: "gharbia", label: "الغربية" },
  { value: "monufia", label: "المنوفية" },
  { value: "qalyubia", label: "القليوبية" },
  { value: "beheira", label: "البحيرة" },
  { value: "fayoum", label: "الفيوم" },
  { value: "beni_suef", label: "بني سويف" },
  { value: "minya", label: "المنيا" },
  { value: "assiut", label: "أسيوط" },
  { value: "sohag", label: "سوهاج" },
  { value: "qena", label: "قنا" },
  { value: "luxor", label: "الأقصر" },
  { value: "aswan", label: "أسوان" },
  { value: "port_said", label: "بورسعيد" },
  { value: "ismailia", label: "الإسماعيلية" },
  { value: "suez", label: "السويس" },
  { value: "kafr_el_sheikh", label: "كفر الشيخ" },
  { value: "damietta", label: "دمياط" },
  { value: "matrouh", label: "مطروح" },
  { value: "north_sinai", label: "شمال سيناء" },
  { value: "south_sinai", label: "جنوب سيناء" },
  { value: "red_sea", label: "البحر الأحمر" },
  { value: "new_valley", label: "الوادي الجديد" },
];

const normalize = (s) => s ? s.trim().toLowerCase().replace(/[\s_\-]+/g, "") : "";

const Results = () => {
  const [searchParams] = useSearchParams();
  const [bloodType, setBloodType] = useState(searchParams.get("type") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [searched, setSearched] = useState(false);

  const { data: inventory, isLoading } = useBloodInventory();

  const handleSearch = () => setSearched(true);

  const filtered = (inventory || []).filter((item) => {
    if (!searched) return true;

    let matchType = true;
    if (bloodType) {
      const enumVal = bloodTypeMap[bloodType];
      const itemNorm = normalize(item.bloodType);
      matchType = itemNorm === normalize(bloodType) ||
                  itemNorm === normalize(enumVal || "") ||
                  normalize(item.bloodType) === normalize(bloodType.replace("+", "pos").replace("-", "neg"));
    }

    let matchCity = true;
    if (city) {
      matchCity = item.hospitals?.some((h) => normalize(h.city) === normalize(city));
    }

    return matchType && matchCity;
  });

  const bloodTypeDisplay = (bt) => {
    const reverseMap = {
      "A_Positive": "A+", "A_Negative": "A-",
      "B_Positive": "B+", "B_Negative": "B-",
      "AB_Positive": "AB+", "AB_Negative": "AB-",
      "O_Positive": "O+", "O_Negative": "O-",
    };
    return reverseMap[bt] || bt;
  };

  return (
    <Layout>
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">توفر الدم</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            ابحث عن وحدات الدم المتاحة في المستشفيات في جميع أنحاء مصر.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <div className="bg-card rounded-xl card-shadow p-6 border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger><SelectValue placeholder="فصيلة الدم" /></SelectTrigger>
              <SelectContent>
                {bloodTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="المدينة" /></SelectTrigger>
              <SelectContent>
                {governorates.map((g) => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="gap-2">
              <Droplet className="h-4 w-4" /> بحث
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
            <p className="text-lg">لا توجد نتائج. جرب فلاتر مختلفة.</p>
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
                      <h3 className="font-semibold">{hospital?.name || "مستشفى غير معروف"}</h3>
                      {lowStock && (
                        <Badge variant="destructive" className="gap-1 text-xs">
                          <AlertTriangle className="h-3 w-3" /> مخزون منخفض
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {hospital?.city || "غير محدد"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-semibold rounded-lg">
                      {bloodTypeDisplay(item.bloodType)}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.quantity > 0 ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-primary" />
                      )}
                      <span className={`text-sm font-medium ${item.quantity > 0 ? "text-green-600" : "text-primary"}`}>
                        {item.quantity > 0 ? `${item.quantity} وحدة` : "غير متوفر"}
                      </span>
                    </div>
                    {item.price > 0 && (
                      <span className="text-sm text-muted-foreground">{item.price} ج.م</span>
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
