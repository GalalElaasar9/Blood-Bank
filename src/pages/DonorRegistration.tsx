import { useState } from "react";
import { Heart, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { useCreateDonor } from "@/hooks/use-hygraph";
import { toast } from "sonner";

const bloodTypes = ["Apos", "Aneg", "Bpos", "Bneg", "ABpos", "ABneg", "Opos", "Oneg"];
const bloodTypeLabels: Record<string, string> = {
  Apos: "A+", Aneg: "A-", Bpos: "B+", Bneg: "B-",
  ABpos: "AB+", ABneg: "AB-", Opos: "O+", Oneg: "O-",
};

const governorates = [
  "Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Ismailia", "Port_Said",
  "Suez", "Dakahlia", "Sharqia", "Qalyubia", "Gharbia", "Monufia", "Beheira",
  "Kafr_El_Sheikh", "Damietta", "Fayoum", "Beni_Suef", "Minya", "Assiut",
  "Sohag", "Qena", "Red_Sea", "New_Valley", "Matruh", "North_Sinai", "South_Sinai",
];

const governorateLabels: Record<string, string> = {
  Cairo: "Cairo", Giza: "Giza", Alexandria: "Alexandria", Luxor: "Luxor",
  Aswan: "Aswan", Ismailia: "Ismailia", Port_Said: "Port Said", Suez: "Suez",
  Dakahlia: "Dakahlia", Sharqia: "Sharqia", Qalyubia: "Qalyubia",
  Gharbia: "Gharbia", Monufia: "Monufia", Beheira: "Beheira",
  Kafr_El_Sheikh: "Kafr El Sheikh", Damietta: "Damietta", Fayoum: "Fayoum",
  Beni_Suef: "Beni Suef", Minya: "Minya", Assiut: "Assiut", Sohag: "Sohag",
  Qena: "Qena", Red_Sea: "Red Sea", New_Valley: "New Valley", Matruh: "Matruh",
  North_Sinai: "North Sinai", South_Sinai: "South Sinai",
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

  const createDonor = useCreateDonor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bloodType || !city) {
      toast.error("Please select blood type and city.");
      return;
    }

    try {
      await createDonor.mutateAsync({
        name,
        bloodType,
        phone,
        city,
        nationalId,
        dateOfBirth,
      });
      setSubmitted(true);
      toast.success("Your donation request has been submitted successfully!");
    } catch (err) {
      console.error("Donor registration error:", err);
      toast.error("Failed to submit registration. Please try again.");
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-32 text-center animate-scale-in">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Registration Successful!</h1>
          <p className="text-muted-foreground">Your donation request has been submitted successfully. Thank you for registering as a blood donor.</p>
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

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="tel" placeholder="Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input placeholder="National ID" required value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
              <Input type="date" placeholder="Date of Birth" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select value={bloodType} onValueChange={setBloodType}>
                  <SelectTrigger><SelectValue placeholder="Blood Type" /></SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((t) => (
                      <SelectItem key={t} value={t}>{bloodTypeLabels[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger><SelectValue placeholder="City / Governorate" /></SelectTrigger>
                  <SelectContent>
                    {governorates.map((g) => (
                      <SelectItem key={g} value={g}>{governorateLabels[g]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                <span>I confirm that all information provided is accurate and I consent to being contacted for blood donation.</span>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2" disabled={createDonor.isPending}>
                {createDonor.isPending ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                ) : (
                  <><Heart className="h-5 w-5" /> Register as Donor</>
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
