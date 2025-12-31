const StatsPanel = ({ wpm, accuracy }) => {
  return (
    <div className="flex items-center gap-8">
      {/* Speed Stat */}
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Speed</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-gray-800">{wpm}</span>
          <span className="text-xs font-bold text-gray-400">WPM</span>
        </div>
      </div>

      {/* Accuracy Stat */}
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Accuracy</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-gray-800">{accuracy}</span>
          <span className="text-xs font-bold text-gray-400">%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;