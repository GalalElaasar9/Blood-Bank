import { Link } from "react-router-dom";
import { Droplet, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
            <Droplet className="h-6 w-6 text-primary fill-primary" />
            <span>بنك<span className="text-primary">الدم</span></span>
          </Link>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            ربط المتبرعين بالمحتاجين. كل قطرة دم تساهم في إنقاذ حياة في جميع أنحاء مصر.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">الخدمات</Link></li>
            <li><Link to="/results" className="hover:text-primary transition-colors">توفر الدم</Link></li>
            <li><Link to="/hospitals" className="hover:text-primary transition-colors">المستشفيات</Link></li>
            <li><Link to="/donor-registration" className="hover:text-primary transition-colors">تسجيل متبرع</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">معلومات التواصل</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +20 123 456 7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> info@bloodbank-eg.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> القاهرة، مصر
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">الطوارئ</h3>
          <p className="text-sm text-primary-foreground/70 mb-3">
            تحتاج دم بشكل عاجل؟ اتصل بخط الطوارئ على مدار الساعة:
          </p>
          <p className="text-2xl font-bold text-primary">123</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} بنك الدم مصر. جميع الحقوق محفوظة.
      </div>
    </div>
  </footer>
);

export default Footer;
