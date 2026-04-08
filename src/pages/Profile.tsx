import { UserProfile } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const Profile = () => (
  <Layout>
    <section className="container py-16 flex justify-center min-h-[70vh]">
      <div className="animate-fade-in w-full max-w-3xl">
        <UserProfile />
      </div>
    </section>
  </Layout>
);

export default Profile;
