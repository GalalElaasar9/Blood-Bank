import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, Users, Droplet, Hospital, ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const stats = [
  { icon: Droplet, value: "١٥,٠٠٠+", label: "وحدة متاحة" },
  { icon: Users, value: "٥٠,٠٠٠+", label: "متبرع مسجل" },
  { icon: Hospital, value: "٢٠٠+", label: "مستشفى شريك" },
  { icon: Heart, value: "١٠٠,٠٠٠+", label: "حياة تم إنقاذها" },
];

const bloodTypeDisplay = (bt) => {
  const map = {
    "A_Positive": "A+", "A_Negative": "A-",
    "B_Positive": "B+", "B_Negative": "B-",
    "AB_Positive": "AB+", "AB_Negative": "AB-",
    "O_Positive": "O+", "O_Negative": "O-",
  };
  return map[bt] || bt;
};

const Index = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const { data: hospitals, isLoading } = useHospitals();

  const featured = (hospitals || []).slice(0, 4);

  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-foreground/90" />
        </div>
        <div className="relative container py-24 md:py-36">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
              كل قطرة <span className="text-primary">تنقذ</span> حياة
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              انضم إلى أكبر شبكة تبرع بالدم في مصر. ابحث عن متبرعين، تحقق من التوفر، وساعد في إنقاذ الأرواح.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/donor-registration">
                <Button size="lg" className="text-base gap-2">
                  <Heart className="h-5 w-5" /> كن متبرعاً
                </Button>
              </Link>
              <Link to="/results">
                <Button size="lg" variant="outline" className="text-base gap-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
                  <Search className="h-5 w-5" /> ابحث عن دم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="container -mt-8 relative z-10">
        <div className="bg-card rounded-xl card-shadow p-6 md:p-8 border animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-lg font-semibold mb-4">ابحث عن توفر الدم</h2>
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
            <Link to={`/results?type=${bloodType}&city=${city}`}>
              <Button className="w-full gap-2" size="default">
                <Search className="h-4 w-4" /> بحث
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

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

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">المستشفيات المميزة</h2>
              <p className="text-muted-foreground mt-1">مستشفيات تحتاج حالياً لتبرعات بالدم</p>
            </div>
            <Link to="/hospitals">
              <Button variant="ghost" className="gap-1">عرض الكل <ArrowLeft className="h-4 w-4" /></Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(hospitals || []).map((h, i) => {
                const hasLowStock = h.bloodInventories?.some((inv) => inv.quantity < 5);
                return (
                  <div
                    key={h.id}
                    className={`bg-card rounded-xl p-5 border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up ${hasLowStock ? "border-primary/40" : ""}`}
                    style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                  >
                    {hasLowStock && (
                      <Badge variant="destructive" className="mb-3 gap-1">
                        <AlertTriangle className="h-3 w-3" /> حاجة عاجلة
                      </Badge>
                    )}
                    <h3 className="font-semibold text-foreground">{h.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {h.city}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {(h.bloodInventories || []).map((inv) => (
                        <div className="flex items-center justify-between w-[100%]" key={inv.id}>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-md ${
                              inv.quantity < 5
                                ? "bg-primary/10 text-primary"
                                : "bg-accent text-accent-foreground"
                            }`}
                          >
                            {bloodTypeDisplay(inv.bloodType)}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs font-medium rounded-md ${
                              inv.quantity < 5
                                ? "bg-primary/10 text-primary"
                                : "bg-accent text-accent-foreground"
                            }`}
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
        </div>
      </section>


      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">هل أنت مستعد لإنقاذ الأرواح؟</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            سجل كمتبرع بالدم اليوم وكن جزءاً من مجتمع ينقذ الحياة.
          </p>
          <Link to="/donor-registration">
            <Button size="lg" variant="outline" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-0">
              سجل الآن
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
