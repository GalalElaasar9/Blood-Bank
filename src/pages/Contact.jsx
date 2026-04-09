import { Mail, Phone, MessageCircle, MapPin, Facebook, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout.jsx";

const contactChannels = [
  { icon: Phone, label: "الهاتف", value: "+20 123 456 7890", href: "tel:+201234567890" },
  { icon: Mail, label: "البريد الإلكتروني", value: "info@bloodbank-eg.com", href: "mailto:info@bloodbank-eg.com" },
  { icon: MessageCircle, label: "واتساب", value: "+20 100 123 4567", href: "https://wa.me/201001234567" },
  { icon: Facebook, label: "فيسبوك", value: "BloodBankEgypt", href: "https://facebook.com/BloodBankEgypt" },
  { icon: MapPin, label: "العنوان", value: "١٢٣ الحي الطبي، القاهرة، مصر", href: "#" },
  { icon: Clock, label: "ساعات العمل", value: "طوارئ ٢٤/٧ | أحد-خميس ٩ص-٥م", href: "#" },
];

const Contact = () => (
  <Layout>
    <section className="hero-gradient py-16">
      <div className="container text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">اتصل بنا</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto">
          لديك أسئلة؟ نحن هنا للمساعدة. تواصل معنا في أي وقت.
        </p>
      </div>
    </section>

    <section className="container py-16">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-6">تواصل معنا</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="الاسم الأول" />
              <Input placeholder="اسم العائلة" />
            </div>
            <Input type="email" placeholder="البريد الإلكتروني" />
            <Input placeholder="الموضوع" />
            <Textarea placeholder="رسالتك" rows={5} />
            <Button type="submit" className="w-full gap-2">
              <Mail className="h-4 w-4" /> إرسال الرسالة
            </Button>
          </form>
        </div>

        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>
          {contactChannels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex gap-4 p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{c.label}</h3>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
