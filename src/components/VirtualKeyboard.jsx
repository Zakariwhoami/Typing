export default function VirtualKeyboard({ activeKey, nextKey, lastWrongKey }) {
  // 1. Full keyboard layout including Numbers and Symbols
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
  ];

  return (
    <div className="mt-8 bg-gray-200 px-6 py-6 rounded-[2rem] shadow-inner border-4 border-gray-300 w-full max-w-4xl">
      <div className="text-center text-[10px] text-gray-400 font-bold mb-4 tracking-widest uppercase">
        Complete Keyboard Guide
      </div>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 gap-1.5">
          {row.map((key) => {
            const isNext = nextKey === key || (nextKey === " " && key === "Space");
            const isWrong = lastWrongKey === key;
            const isPressed = activeKey === key;

            // 2. Logic for special key widths
            const isWide = ["Backspace", "Shift", "Enter"].includes(key);
            
            return (
              <div
                key={key}
                className={`
                  h-12 flex items-center justify-center rounded-lg border-b-4 font-bold transition-all text-sm
                  ${isWide ? "px-6 w-auto" : "w-12"}
                  ${!isNext && !isWrong ? "bg-white text-gray-500 border-gray-300" : ""}
                  ${isNext ? "bg-blue-400 text-white border-blue-600 scale-105 shadow-md" : ""}
                  ${isWrong ? "bg-red-500 text-white border-red-700 animate-bounce" : ""}
                  ${isPressed ? "translate-y-1 border-b-0 opacity-80 bg-gray-100" : ""}
                `}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}

      {/* 3. Spacebar Section */}
      <div className="flex justify-center mt-2">
        <div className={`
          w-96 h-12 rounded-xl border-b-4 transition-all flex items-center justify-center font-bold
          ${nextKey === " " ? "bg-blue-400 border-blue-600 shadow-lg text-white" : "bg-white border-gray-300 text-gray-300"}
          ${activeKey === " " ? "translate-y-1 border-b-0 opacity-80" : ""}
          ${lastWrongKey === " " ? "bg-red-500 border-red-700 animate-bounce" : ""}
        `}>
          SPACE
        </div>
      </div>
    </div>
  );
}