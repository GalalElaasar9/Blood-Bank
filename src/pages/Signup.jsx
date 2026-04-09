import { SignUp } from "@clerk/clerk-react";
import Layout from "@/components/Layout.jsx";

const Signup = () => (
  <Layout>
    <section className="container py-16 flex items-center justify-center min-h-[70vh]">
      <div className="animate-fade-in">
        <SignUp routing="path" path="/signup" signInUrl="/login" afterSignUpUrl="/" />
      </div>
    </section>
  </Layout>
);

export default Signup;
