import { Link } from "react-router-dom";
import { Droplet, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-4">
            <Droplet className="h-6 w-6 text-primary fill-primary" />
            <span>Blood<span className="text-primary">Bank</span></span>
          </Link>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Connecting donors with those in need. Every drop counts in saving lives across Egypt.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link to="/results" className="hover:text-primary transition-colors">Blood Availability</Link></li>
            <li><Link to="/hospitals" className="hover:text-primary transition-colors">Hospitals</Link></li>
            <li><Link to="/donor-registration" className="hover:text-primary transition-colors">Become a Donor</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +20 123 456 7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> info@bloodbank-eg.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Cairo, Egypt
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Emergency</h3>
          <p className="text-sm text-primary-foreground/70 mb-3">
            Need blood urgently? Call our 24/7 emergency line:
          </p>
          <p className="text-2xl font-bold text-primary">123</p>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-8 pt-8 text-center text-sm text-primary-foreground/50">
        © {new Date().getFullYear()} BloodBank Egypt. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
