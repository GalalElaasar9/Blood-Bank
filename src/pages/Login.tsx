import { SignIn } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const Login = () => (
  <Layout>
    <section className="container py-16 flex items-center justify-center min-h-[70vh]">
      <div className="animate-fade-in">
        <SignIn routing="path" path="/login" signUpUrl="/signup" afterSignInUrl="/" />
      </div>
    </section>
  </Layout>
);

export default Login;
