import logo from "../assets/typing.png";


const ResultDashboard = ({ wpm, accuracy, onRestart, username }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/90 backdrop-blur-md">

      <div className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-lg text-center border-8 border-blue-50">
        <div className="flex justify-center items-center -mt-4 mb-3 ">
          <a href="#" className="-m-1.5 p-1.5 flex flex-col">
            <div className="flex items-center gap-1">
              <img alt="Logo" src={logo} className="h-12 w-auto" />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                yping<span className="text-blue-600">.com</span>
              </span>
            </div>

          </a>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Test Complete!</h2>
          <h1 className="text-4xl font-black text-gray-800">Great Job, {username}!</h1>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="bg-blue-50 p-6 rounded-3xl border-b-4 border-blue-200">
            <span className="block text-4xl font-black text-blue-600">{wpm}</span>
            <span className="text-xs font-bold uppercase text-blue-400">Words Per Min</span>
          </div>
          <div className="bg-green-50 p-6 rounded-3xl border-b-4 border-green-200">
            <span className="block text-4xl font-black text-green-600">{accuracy}%</span>
            <span className="text-xs font-bold uppercase text-green-400">Accuracy</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white text-xl font-bold py-5 rounded-2xl shadow-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
          <button className="text-gray-400 font-bold hover:text-gray-600 transition-all">
            Share Results
          </button>
        </div>
        
        <div className="fixed right-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-cols items-center gap-6 z-10">
          {/* The Decorative Line */}
          <div className="h-24 w-py bg-gradient-to-t from-blue-600 to-transparent"></div>

          {/* The Vertical Text */}
          <div className="whitespace-nowrap uppercase tracking-[0.5em] text-[10px] font-black text-gray-400 [writing-mode:vertical-lr] rotate-180">
            <span className="text-blue-600">Zakaria</span> Production
          </div>

          {/* The Bottom Line */}
          <div className="h-24 w-py bg-gradient-to-b from-blue-600 to-transparent"></div>
        </div>

      </div>
    </div>
  );
};

export default ResultDashboard;