import Hero from "./components/Hero";
import FeatureCard from "./components/MissionSection";
import { Features } from "tailwindcss";

const Home = () => {
  return (
    <>
    <div className="absolute inset-x-0 top-0 z-10 bg-gray-50 text-gray-800  mx-auto bg-gradient-to-br from-white to-blue-50">
      
      <main className="max-w-6xl text-white mx-auto px-4 py-10">
        <Hero />
        <section className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl text-gray-800 font-bold text-center mb-10">Our Features</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <FeatureCard 
            title="Attendance Tracking"
            desc="Take student attendance easily and generate daily/weekly reports."
            icon="📅"
          />

          <FeatureCard 
            title="Fees Management"
            desc="Track payments, invoices, balances and generate fee receipts."
            icon="💰"
          />

          <FeatureCard 
            title="Exams & Results"
            desc="Create exams, upload scores, generate automatic report cards."
            icon="📊"
          />

        </div>
       
        
      </section>
      </main>
    </div>
  );
      
    </>
  );
};

export default Home;
