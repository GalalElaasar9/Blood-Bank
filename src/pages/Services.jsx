import { Droplet, Search, Truck, Clock, TestTube, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout.jsx";

const services = [
  { icon: Droplet, title: "جمع الدم", desc: "جمع الدم بطريقة آمنة وصحية من المتبرعين المسجلين مع بروتوكولات فحص مناسبة." },
  { icon: Search, title: "البحث عن توفر الدم", desc: "بحث فوري عن توفر الدم في جميع المستشفيات وبنوك الدم الشريكة." },
  { icon: Truck, title: "التوصيل الطارئ", desc: "خدمة توصيل سريع للدم للمستشفيات في حالات الطوارئ، متاحة على مدار الساعة." },
  { icon: TestTube, title: "فحص الدم", desc: "فحص شامل لجميع وحدات الدم المجمعة لضمان السلامة والتوافق." },
  { icon: Clock, title: "دعم على مدار الساعة", desc: "دعم على مدار الساعة للطوارئ واستفسارات المتبرعين وتنسيق المستشفيات." },
  { icon: ShieldCheck, title: "الفحص الصحي للمتبرعين", desc: "فحص صحي مجاني لجميع المتبرعين بالدم يشمل ضغط الدم والهيموجلوبين وأكثر." },
];

const Services = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">خدماتنا</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          خدمات بنك دم شاملة لضمان تبرع وتوزيع آمن وفعال ومتاح للجميع.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="p-6 rounded-xl border bg-card card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
          >
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-4">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Services;
