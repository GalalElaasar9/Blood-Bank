import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Droplet, MapPin, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout.jsx";
import { useHospitals } from "@/hooks/use-hygraph.js";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
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

// تحويل "+" و "-" للقيم المقابلة في Enum
const bloodTypeMap = {
  "A+": "A_Positive", "A-": "A_Negative",
  "B+": "B_Positive", "B-": "B_Negative",
  "AB+": "AB_Positive", "AB-": "AB_Negative",
  "O+": "O_Positive", "O-": "O_Negative",
};

// لتنقية النصوص من فروق الكتابة
const normalize = (s) => s ? s.trim().toLowerCase().replace(/[\s_\-]+/g, "") : "";

const bloodTypeDisplay = (bt) => {
  const map = {
    "A_Positive": "A+", "A_Negative": "A-",
    "B_Positive": "B+", "B_Negative": "B-",
    "AB_Positive": "AB+", "AB_Negative": "AB-",
    "O_Positive": "O+", "O_Negative": "O-",
  };
  return map[bt] || bt;
};

const Results = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [searched, setSearched] = useState(false);

  const { data: hospitals, isLoading } = useHospitals();

  const handleSearch = () => setSearched(true);

  // فلترة المستشفيات حسب المدينة وفصيلة الدم
  const filteredHospitals = (hospitals || []).filter((h) => {
    if (!searched) return true;

    let matchCity = true;
    if (city) matchCity = normalize(h.city) === normalize(city);

    let matchBlood = true;
    if (bloodType) {
      matchBlood = h.bloodInventories?.some((inv) => {
        const invNorm = normalize(inv.bloodType);
        const typeNorm = normalize(bloodType);
        const enumVal = normalize(bloodTypeMap[bloodType] || "");
        return invNorm === typeNorm || invNorm === enumVal;
      });
    }

    return matchCity && matchBlood;
  });

  return (
    <Layout>
      <section className="container py-8">
        <div className="bg-card rounded-xl card-shadow p-6 border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={bloodType} onValueChange={setBloodType}>
              <SelectTrigger><SelectValue placeholder="اختر فصيلة الدم" /></SelectTrigger>
              <SelectContent>
                {bloodTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue placeholder="اختر المدينة" /></SelectTrigger>
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
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
          </div>
        ) : searched && filteredHospitals.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplet className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">لا توجد مستشفيات مطابقة للفلتر.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredHospitals.map((h, i) => {
              const lowStock = h.bloodInventories?.some(inv => inv.quantity < 5);
              return (
                <div
                  key={h.id}
                  className={`bg-card rounded-xl p-5 border card-shadow hover:card-shadow-hover transition-all duration-300 animate-fade-in-up ${lowStock ? "border-primary/40" : ""}`}
                  style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
                >
                  {lowStock && (
                    <Badge variant="destructive" className="mb-3 gap-1">
                      <AlertTriangle className="h-3 w-3" /> حاجة عاجلة
                    </Badge>
                  )}
                  <h3 className="font-semibold text-foreground">{h.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" /> {h.city}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {h.bloodInventories?.map(inv => (
                      <div className="flex items-center justify-between w-[100%]" key={inv.id}>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-md ${inv.quantity < 5 ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}
                        >
                          {bloodTypeDisplay(inv.bloodType)}
                        </span>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded-md ${inv.quantity < 5 ? "bg-primary/10 text-primary" : "bg-accent text-accent-foreground"}`}
                        >
                          <strong>السعر : </strong> {inv.price}
                        </span>
                      </div>
                    ))}
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
