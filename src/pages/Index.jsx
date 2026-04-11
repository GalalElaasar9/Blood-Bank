import { Link } from "react-router-dom";
import { Heart, Users, Droplet, Hospital, ArrowLeft, MapPin, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout.jsx";
import { useFeaturedHospitals, useHospitals } from "@/hooks/use-hygraph.js";
import heroBg from "@/assets/hero-bg.jpg";
import sectionBg from "@/assets/section-bg.jpg";
import ctaBg from "@/assets/cta-bg.jpg";

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
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedHospitals();
  const { data: allHospitals, isLoading: allLoading } = useHospitals();

  const isLoading = featuredLoading && allLoading;

  // Use featured query data, fallback to top 4 from all hospitals sorted by available stock
  let hospitals = featuredData;
  if (!hospitals || hospitals.length === 0) {
    hospitals = (allHospitals || [])
      .map((h) => ({
        ...h,
        availableCount: (h.bloodInventories || []).filter((inv) => inv.quantity >= 5).length,
      }))
      .sort((a, b) => b.availableCount - a.availableCount)
      .slice(0, 4);
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" width={1920} height={800} />
          <div className="absolute inset-0 bg-foreground/75" />
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
                  <Droplet className="h-5 w-5" /> ابحث عن دم
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="relative py-16"
        style={{ backgroundImage: `url(${sectionBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="relative container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-card/80 backdrop-blur-sm border card-shadow animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="bg-secondary py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">المستشفيات المميزة</h2>
              <p className="text-muted-foreground mt-1">أكثر ٤ مستشفيات توفراً لفصائل الدم</p>
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
              {(hospitals || []).map((h, i) => (
                <div
                  key={h.id}
                  className="rounded-xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  <div className="h-1.5 bg-primary" />
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground">{h.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" /> {h.city}
                    </p>
                    <div className="flex flex-col gap-1 mt-3">
                      {(h.bloodInventories || []).filter((inv) => inv.quantity >= 5).length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs font-semibold text-green-700 mb-1">فصائل متوفرة:</p>
                          {(h.bloodInventories || [])
                            .filter((inv) => inv.quantity >= 5)
                            .map((inv) => (
                              <div key={inv.id} className="flex justify-between items-center mb-0.5">
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-md">{bloodTypeDisplay(inv.bloodType)}</span>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-md">{inv.price} ج.م</span>
                              </div>
                            ))}
                        </div>
                      )}
                      {(h.bloodInventories || []).filter((inv) => inv.quantity < 5).length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-red-700 mb-1">مخزون منخفض:</p>
                          {(h.bloodInventories || [])
                            .filter((inv) => inv.quantity < 5)
                            .map((inv) => (
                              <div key={inv.id} className="flex justify-between items-center mb-0.5">
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 text-xs rounded-md">{bloodTypeDisplay(inv.bloodType)}</span>
                                <span className="bg-red-100 text-red-700 px-2 py-0.5 text-xs rounded-md">{inv.price} ج.م</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16">
        <div className="absolute inset-0">
          <img src={ctaBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1920} height={600} />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative container text-center">
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
