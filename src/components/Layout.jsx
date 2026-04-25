import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Toaster } from "@/components/ui/toaster";

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <Toaster position="top-right"/>
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
