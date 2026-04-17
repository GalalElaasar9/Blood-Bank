import { SignUp } from "@clerk/clerk-react";
import Layout from "@/components/Layout.jsx";

const Signup = () => (
  <Layout>
    <section
      className="container py-16 flex items-center justify-center min-h-[70vh]"
      style={{ direction: "ltr" }}
    >
      <div className="animate-fade-in">

        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          redirectUrl="/"

          oauthFlow="redirect"

        />

      </div>
    </section>
  </Layout>
);

export default Signup;
