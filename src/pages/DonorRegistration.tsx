import { useState } from "react";
import { Heart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const governorates = [
  "Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Ismailia", "Port Said",
  "Suez", "Dakahlia", "Sharqia", "Qalyubia", "Gharbia", "Monufia", "Beheira",
  "Kafr El Sheikh", "Damietta", "Fayoum", "Beni Suef", "Minya", "Asyut",
  "Sohag", "Qena", "Red Sea", "New Valley", "Matruh", "North Sinai", "South Sinai",
];

const DonorRegistration = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Layout>
        <div className="container py-32 text-center animate-scale-in">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground">Thank you for registering as a blood donor. You'll receive a confirmation email shortly.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Become a Donor</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Register as a blood donor and help save lives in your community.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-xl card-shadow border p-6 md:p-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Donor Registration Form</h2>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="First Name" required />
                <Input placeholder="Last Name" required />
              </div>
              <Input type="email" placeholder="Email Address" required />
              <Input type="tel" placeholder="Phone Number" required />
              <Input type="date" placeholder="Date of Birth" required />
              <Input placeholder="National ID" required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select required>
                  <SelectTrigger><SelectValue placeholder="Blood Type" /></SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select required>
                  <SelectTrigger><SelectValue placeholder="City / Governorate" /></SelectTrigger>
                  <SelectContent>
                    {governorates.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Input placeholder="Address" />

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1" />
                <span>I confirm that all information provided is accurate and I consent to being contacted for blood donation.</span>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2">
                <Heart className="h-5 w-5" /> Register as Donor
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DonorRegistration;
