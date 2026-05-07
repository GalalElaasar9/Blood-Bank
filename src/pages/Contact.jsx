import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Facebook,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/Layout.jsx";
import { useToast } from "@/hooks/use-toast";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const contactChannels = [
  {
    icon: Phone,
    label: "الهاتف",
    value: "+20 123 456 7890",
    href: "tel:+201234567890",
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: "info@bloodbank-eg.com",
    href: "mailto:info@bloodbank-eg.com",
  },
  {
    icon: MessageCircle,
    label: "واتساب",
    value: "+20 100 123 4567",
    href: "https://wa.me/201001234567",
  },
  {
    icon: Facebook,
    label: "فيسبوك",
    value: "BloodBankEgypt",
    href: "https://facebook.com/BloodBankEgypt",
  },
  {
    icon: MapPin,
    label: "العنوان",
    value: "١٢٣ الحي الطبي، القاهرة، مصر",
    href: "#",
  },
  {
    icon: Clock,
    label: "ساعات العمل",
    value: "طوارئ ٢٤/٧ | أحد-خميس ٩ص-٥م",
    href: "#",
  },
];
const Contact = () => {
  const {toast} = useToast();
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dcnh2ce",
        "template_ul8vfi9",
        form.current,
        "yevoyoagnncuyuzB_",
      )
      .then(
        () => {
          toast({
            title: "تم إرسال الرسالة بنجاح ✅",
            description: "سيتم الرد عليك في أقرب وقت.",
            duration: 2000,
          })
          form.current.reset();
        },
        (error) => {
          toast({
            title: "حدث خطأ ❌",
            description: "فشل إرسال الرسالة، حاول مرة أخرى.",
            variant: "destructive",
            duration: 2000,
          });
          // console.log(error);
        },
      );
  };

  return (
    <Layout>
      <section className="container py-16">
        {" "}
        <div className="grid md:grid-cols-2 gap-12">
          {" "}
          <div className="animate-fade-in">
            {" "}
            <div>
            <h2 className="text-2xl font-bold mb-6">تواصل معنا</h2>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input name="first_name" placeholder="الاسم الأول" required/>

                <Input name="last_name" placeholder="اسم العائلة" required/>
              </div>

              <Input
                name="email"
                type="email"
                placeholder="البريد الإلكتروني"
                required
              />

              <Input name="subject" placeholder="الموضوع" required/>

              <Textarea name="message" placeholder="رسالتك" rows={5} required/>

              <Button type="submit" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                إرسال الرسالة
              </Button>
            </form>
          </div>
          </div>{" "}
          <div
            className="space-y-4 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {" "}
            <h2 className="text-2xl font-bold mb-6">معلومات التواصل</h2>{" "}
            {contactChannels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex gap-4 p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer"
              >
                {" "}
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
                  {" "}
                  <c.icon className="h-5 w-5 text-primary" />{" "}
                </div>{" "}
                <div>
                  {" "}
                  <h3 className="font-semibold text-sm">{c.label}</h3>{" "}
                  <p className="text-sm text-muted-foreground">
                    {c.value}
                  </p>{" "}
                </div>{" "}
              </a>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>
    </Layout>
  );
};

export default Contact;
