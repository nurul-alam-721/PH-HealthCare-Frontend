import PublicNavbar from "@/components/modules/home/publicNavbar";
import Hero from "@/components/modules/home/Hero";
import Steps from "@/components/modules/home/Steps";
import TopDoctors from "@/components/modules/home/TopDoctors";
import PublicFooter from "@/components/modules/home/publicFooter";
import { getUserInfo } from "@/services/auth.services";
import { getDoctors } from "@/services/doctor.services";

export default async function Home() {
  // Fetch user information server-side
  const userInfo = await getUserInfo();

  // Fetch top doctors with safe error handling
  let doctors = null;
  try {
    const doctorsResponse = await getDoctors("");
    if (doctorsResponse && doctorsResponse.success) {
      doctors = doctorsResponse.data;
    }
  } catch (error) {
    console.error("Failed to fetch doctors in home page:", error);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Responsive Navigation Bar */}
      <PublicNavbar userInfo={userInfo} />
      
      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
        
        {/* Steps Section */}
        <Steps />
        
        {/* Top Doctors Section */}
        <TopDoctors doctors={doctors} />
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
