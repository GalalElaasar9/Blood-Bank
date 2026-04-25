import { SignIn } from "@clerk/clerk-react";
import Layout from "@/components/Layout.jsx";

const Login = () => (
  <Layout>
    <section
      className="container py-16 flex items-center justify-center min-h-[70vh]"
      style={{ direction: "ltr" }}
    >
      <div className="animate-fade-in">

        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          redirectUrl="/"

          appearance={{
            elements: {
              socialButtonsBlockButton:
                "hover:opacity-90"
            }
          }}

          oauthFlow="redirect"

          additionalOAuthScopes={{
            google: ["profile", "email"]
          }}

        />

      </div>
    </section>
  </Layout>
);

export default Login;
