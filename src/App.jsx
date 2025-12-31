import Navbar from "./components/Navbar";
import Hero from "./components/Hero";


export default function App() {
  return (
    <>

      <div className="absolute inset-x-0 top-0 z-10 mx-auto ">
        <Navbar />
        <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6 z-10">
          {/* The Decorative Line */}
          <div className="h-24 w-px bg-gradient-to-t from-blue-600 to-transparent"></div>

          {/* The Vertical Text */}
          <div className="whitespace-nowrap uppercase tracking-[0.5em] text-[10px] font-black text-gray-400 [writing-mode:vertical-lr] rotate-180">
            <span className="text-blue-600">Zakaria</span> Production
          </div>

          {/* The Bottom Line */}
          <div className="h-24 w-px bg-gradient-to-b from-blue-600 to-transparent"></div>
        </div>
        <main className="w-full text-white ">
          <Hero />
        </main>

      </div>

    </>
  );
};
