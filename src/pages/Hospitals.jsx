import { useState } from "react";
import { MapPin, Phone, Droplet, Mail, MessageCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout.jsx";
import { useHospitals } from "@/hooks/use-hygraph.js";

const bloodTypeDisplay = (bt) => {
  const map = {
    "A_Positive": "A+", "A_Negative": "A-",
    "B_Positive": "B+", "B_Negative": "B-",
    "AB_Positive": "AB+", "AB_Negative": "AB-",
    "O_Positive": "O+", "O_Negative": "O-",
  };
  return map[bt] || bt;
};

const ITEMS_PER_PAGE = 8;

const Hospitals = () => {
  const { data: hospitals, isLoading } = useHospitals();
  const [currentPage, setCurrentPage] = useState(1);

  const sortedHospitals = (hospitals || []).sort((a, b) => {
    const aLow = a.bloodInventories?.some(inv => inv.quantity < 5);
    const bLow = b.bloodInventories?.some(inv => inv.quantity < 5);
    if (aLow && !bLow) return -1;
    if (!aLow && bLow) return 1;
    return 0;
  });

  const totalPages = Math.ceil(sortedHospitals.length / ITEMS_PER_PAGE);
  const paginatedHospitals = sortedHospitals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Layout>
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">جميع المستشفيات وحالة مخزون الدم</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            تعرض هذه الصفحة جميع المستشفيات، مع إبراز المستشفيات التي لديها مخزون دم منخفض وتحتاج إلى تبرعات عاجلة.
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
        ) : sortedHospitals.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Droplet className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">جميع المستشفيات لديها مخزون كافٍ. تحقق لاحقاً.</p>
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
                        {h.bloodInventories?.some(inv => inv.quantity >= 5) && (
                          <div className="mb-2">
                            <p className="text-xs font-semibold text-green-700 mb-1">فصائل الدم المتوفرة:</p>
                            <div className="flex flex-col gap-1">
                              {h.bloodInventories
                                .filter(inv => inv.quantity >= 5)
                                .map(inv => (
                                  <div key={inv.id} className="flex justify-between items-center">
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 text-xs rounded-md">{bloodTypeDisplay(inv.bloodType)}</span>
                                    <span className="bg-green-100 text-green-700 p-1 rounded-md text-sm">{inv.price} ج.م</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                        {h.bloodInventories?.some(inv => inv.quantity < 5) && (
                          <div>
                            <p className="text-xs font-semibold text-red-700 mb-1">فصائل الدم المنخفضة:</p>
                            <div className="flex flex-col gap-1">
                              {h.bloodInventories
                                .filter(inv => inv.quantity < 5)
                                .map(inv => (
                                  <div key={inv.id} className="flex justify-between items-center">
                                    <span className="bg-red-100 text-red-700 p-1 rounded-md text-sm">{bloodTypeDisplay(inv.bloodType)}</span>
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

export default Hospitals;
