import { useState } from "react";
import { Heart, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/Layout.jsx";
import { useCreateDonor } from "@/hooks/use-hygraph.js";
import { setMutationAuth } from "@/lib/hygraph.js";
import { toast } from "sonner";

const HYGRAPH_TOKEN = import.meta.env.VITE_HYGRAPH_TOKEN;
setMutationAuth(HYGRAPH_TOKEN);

const bloodTypes = [
  { value: "A_Positive", label: "A+" },
  { value: "A_Negative", label: "A-" },
  { value: "B_Positive", label: "B+" },
  { value: "B_Negative", label: "B-" },
  { value: "AB_Positive", label: "AB+" },
  { value: "AB_Negative", label: "AB-" },
  { value: "O_Positive", label: "O+" },
  { value: "O_Negative", label: "O-" },
];

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

const validateEgyptianNationalId = (id) => {
  if (!/^\d{14}$/.test(id)) return "الرقم القومي يجب أن يكون ١٤ رقم";
  if (id[0] !== "2" && id[0] !== "3")
    return "الرقم القومي يجب أن يبدأ بـ ٢ أو ٣";
  const month = parseInt(id.substring(3, 5));
  const day = parseInt(id.substring(5, 7));
  if (month < 1 || month > 12) return "شهر الميلاد غير صحيح في الرقم القومي";
  if (day < 1 || day > 31) return "يوم الميلاد غير صحيح في الرقم القومي";
  return null;
};

const validateEgyptianPhone = (phone) => {
  const cleaned = phone.replace(/[\s\-]/g, "");
  if (!/^01[0125]\d{8}$/.test(cleaned)) {
    return "رقم الموبايل يجب أن يبدأ بـ 01 ويتكون من ١١ رقم (مثال: 01012345678)";
  }
  return null;
};

const DonorRegistration = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const createDonor = useCreateDonor();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!bloodType || !city) {
      toast.error("يرجى اختيار فصيلة الدم والمدينة.");
      return;
    }

    const phoneError = validateEgyptianPhone(phone);
    if (phoneError) {
      toast.error(phoneError);
      return;
    }

    const idError = validateEgyptianNationalId(nationalId);
    if (idError) {
      toast.error(idError);
      return;
    }

    try {
      await createDonor.mutateAsync({
        name,
        bloodType,
        phone: phone.replace(/[\s\-]/g, ""),
        city,
        nationalId,
        dateOfBirth,
      });
      setSubmitted(true);
      toast.success("تم تقديم طلب التبرع بنجاح!");
    } catch (err) {
      console.error("خطأ في تسجيل المتبرع:", err);
      const message =
        err?.response?.errors?.[0]?.message || err?.message || "فشل في التسجيل";
      setErrorMsg(message);
      toast.error("فشل في تقديم التسجيل: " + message);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-32 text-center animate-scale-in">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">تم التسجيل بنجاح!</h1>
          <p className="text-muted-foreground">
            تم تقديم طلب التبرع بنجاح. شكراً لتسجيلك كمتبرع بالدم.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
            كن متبرعاً
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            سجل كمتبرع بالدم وساعد في إنقاذ الأرواح في مجتمعك.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl card-shadow border p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">نموذج تسجيل المتبرع</h2>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                {errorMsg}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="الاسم الكامل"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div>
                <Input
                  type="tel"
                  placeholder="رقم الموبايل (مثال: 01012345678)"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={11}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015
                </p>
              </div>
              <div>
                <Input
                  placeholder="الرقم القومي (١٤ رقم)"
                  required
                  value={nationalId}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setNationalId(val);
                  }}
                  maxLength={14}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  يجب أن يبدأ بـ ٢ أو ٣ ويتكون من ١٤ رقم
                </p>
              </div>
              <Input
                type="date"
                placeholder="تاريخ الميلاد"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select value={bloodType} onValueChange={setBloodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="فصيلة الدم" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="المدينة / المحافظة" />
                  </SelectTrigger>
                  <SelectContent>
                    {governorates.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  أؤكد أن جميع المعلومات المقدمة صحيحة وأوافق على التواصل معي
                  للتبرع بالدم.
                </span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={createDonor.isPending}
              >
                {createDonor.isPending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> جاري التقديم...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5" /> تسجيل كمتبرع
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DonorRegistration;
