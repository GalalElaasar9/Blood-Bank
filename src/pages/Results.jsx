import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Droplet, MapPin, Phone, Mail, MessageCircle, AlertTriangle } from "lucide-react";
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

const bloodTypeMap = {
  "A+": "A_Positive", "A-": "A_Negative",
  "B+": "B_Positive", "B-": "B_Negative",
  "AB+": "AB_Positive", "AB-": "AB_Negative",
  "O+": "O_Positive", "O-": "O_Negative",
};

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

const ITEMS_PER_PAGE = 6;

const Results = () => {
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: hospitals, isLoading } = useHospitals();

  const handleSearch = () => {
    setSearched(true);
    setCurrentPage(1);
  };

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

  const totalPages = Math.ceil(filteredHospitals.length / ITEMS_PER_PAGE);
  const paginatedHospitals = filteredHospitals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <section className="hero-gradient py-8">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">توفر الدم</h1>
          <p className="text-primary-foreground/80">ابحث عن فصائل الدم المتوفرة في المستشفيات</p>
        </div>
      </section>

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        ) : searched && filteredHospitals.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplet className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">لا توجد مستشفيات مطابقة للفلتر.</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedHospitals.map((h, i) => {
                const hasLowStock = h.bloodInventories?.some((inv) => inv.quantity < 5);
                return (
                  <div
                    key={h.id}
                    className={`rounded-xl border ${hasLowStock ? "border-primary/30" : ""} bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-in-up`}
                    style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}
                  >
                    <div className="h-1.5 bg-primary" />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg leading-tight">{h.name}</h3>
                        {hasLowStock && (
                          <Badge variant="destructive" className="shrink-0 mr-2 gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            يحتاج تبرعات
                          </Badge>
                        )}
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
                        {h.bloodInventories?.some((inv) => inv.quantity >= 5) && (
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-green-700 mb-1">فصائل الدم المتوفرة:</p>
                            <div className="flex flex-col gap-1">
                              {h.bloodInventories
                                .filter((inv) => inv.quantity >= 5)
                                .map((inv) => (
                                  <div key={inv.id} className="flex justify-between items-center">
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-md">{bloodTypeDisplay(inv.bloodType)}</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-md">العدد المتوفر :  ({inv.quantity})</span>
                                    <span className="bg-green-100 text-green-700 p-1 rounded-md text-sm">{inv.price} ج.م</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                        {h.bloodInventories?.some((inv) => inv.quantity < 5) && (
                          <div>
                            <p className="text-xs font-semibold text-red-700 mb-1">فصائل الدم المنخفضة:</p>
                            <div className="flex flex-col gap-1">
                              {h.bloodInventories
                                .filter((inv) => inv.quantity < 5)
                                .map((inv) => (
                                  <div key={inv.id} className="flex justify-between items-center">
                                    <span className="bg-red-100 text-red-700 p-1 rounded-md text-sm">{bloodTypeDisplay(inv.bloodType)}</span>
                                    <span className="bg-red-100 text-red-700 p-1 rounded-md text-sm">العدد المتوفر :  ({inv.quantity})</span>
                                    <span className="bg-red-100 text-red-700 p-1 rounded-md text-sm">{inv.price} ج.م</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {h.phone && (
                          <a href={`tel:${h.phone}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Phone className="h-3 w-3" /> اتصال
                            </Button>
                          </a>
                        )}
                        {h.whatsapp && (
                          <a href={`https://wa.me/${h.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-1">
                              <MessageCircle className="h-3 w-3" /> واتساب
                            </Button>
                          </a>
                        )}
                        {h.email && (
                          <a href={`mailto:${h.email}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              <Mail className="h-3 w-3" /> بريد
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  السابق
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  التالي
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default Results;
