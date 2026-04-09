import { Heart, Users, Shield, Target } from "lucide-react";
import Layout from "@/components/Layout.jsx";

const About = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">عن بنك الدم مصر</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          ملتزمون بضمان عدم فقدان أي حياة بسبب نقص الدم. نربط المتبرعين بالمستشفيات في جميع أنحاء مصر.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">مهمتنا</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            تأسس بنك الدم مصر بمهمة واحدة: سد الفجوة بين المتبرعين بالدم والمحتاجين إليه. نستخدم التكنولوجيا لإنشاء نظام تبرع بالدم فعال وشفاف ومتاح للجميع.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            منصتنا تعمل كمركز رئيسي يربط المستشفيات وبنوك الدم والمتبرعين في جميع محافظات مصر الـ ٢٧، لضمان توفر الدم المنقذ للحياة دائماً.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: Heart, title: "الرحمة", desc: "كل تبرع هو عمل من أعمال الحب" },
            { icon: Users, title: "المجتمع", desc: "بناء شبكة من منقذي الأرواح" },
            { icon: Shield, title: "السلامة", desc: "فحص واختبار صارم" },
            { icon: Target, title: "الوصول", desc: "الوصول لكل ركن في مصر" },
          ].map((item, i) => (
            <div key={item.title} className="p-5 rounded-xl bg-accent/50 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <item.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
