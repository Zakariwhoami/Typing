import React, { useState, useEffect, useRef } from 'react';
import Header from './Navbar';
import VirtualKeyboard from './VirtualKeyboard';
import Cookies from 'js-cookie';
import ResultDashboard from './ResultDashboard';

const Hero = () => {
  const text = "The evolution of human writing represents one of the most significant leaps in our collective history. It began thousands of years ago with simple cave paintings and clay tokens used for trade. As civilizations grew, these primitive markings transformed into complex systems like Egyptian hieroglyphics and Sumerian cuneiform, allowing for the recording of laws, stories, and scientific observations. The invention of the Phoenician alphabet eventually simplified communication, laying the groundwork for the modern scripts we use today. Later, the Gutenberg printing press revolutionized the spread of knowledge, making books accessible to the masses. Now, in our digital era, writing has evolved again into rapid keystrokes and instant messaging. Every time you type a character on this screen, you are participating in a legacy of human expression that spans millennia. Mastering this skill is not just about speed; it is about honoring the ancient art of sharing thoughts across time and space.";

  const [username, setUsername] = useState(Cookies.get('typerName') || "");
  const [loginInput, setLoginInput] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const [duration, setDuration] = useState(60); // Default duration
  const [timeLeft, setTimeLeft] = useState(60);
  const [isStarted, setIsStarted] = useState(false); // Changed to false
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [lastWrongKey, setLastWrongKey] = useState(null);

  const timerRef = useRef(null);
  const clickSound = useRef(new Audio('/sounds/click.mp3'));
  const errorSound = useRef(new Audio('/sounds/error.mp3'));
  const activeCharRef = useRef(null);

  const playSound = (isCorrect) => {
    const sound = isCorrect ? clickSound.current : errorSound.current;
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => { });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginInput.trim()) {
      Cookies.set('typerName', loginInput, { expires: 7 });
      setUsername(loginInput);
    }
  };
  const handleTimeChange = (newTime) => {
    if (!isStarted) {
      setDuration(newTime);
      setTimeLeft(newTime);
    }
  };

  // 1. KEYBOARD LOGIC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (isFinished || timeLeft <= 0) return;
      if (e.code === "Space") e.preventDefault();

      const pressedKey = e.key;
      const targetKey = text[userInput.length];

      if (pressedKey === "Backspace") {
        setUserInput((prev) => prev.slice(0, -1));
        setLastWrongKey(null);
        return;
      }

      if (pressedKey.length === 1) {
        if (!isStarted) setIsStarted(true);
        setActiveKey(pressedKey.toUpperCase());

        if (pressedKey === targetKey) {
          setLastWrongKey(null);
          playSound(true);
        } else {
          setLastWrongKey(pressedKey.toUpperCase());
          playSound(false);
        }

        setUserInput((prev) => {
          const nextInput = prev + pressedKey;
          if (nextInput.length === text.length) {
            setIsFinished(true);
            setIsStarted(false);
          }
          return nextInput;
        });
      }
    };

    const handleKeyUp = () => setActiveKey("");
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [userInput, isStarted, timeLeft, isFinished, text]);

  useEffect(() => {
    if (activeCharRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Keeps the active line in the middle of the box
      });
    }
  }, [userInput]); // Runs every time the user types

  // 2. TIMER LOGIC (Fixed)
  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 || isFinished) {
      clearInterval(timerRef.current);
      setIsFinished(true);
      setIsStarted(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isStarted, timeLeft, isFinished]);

  // 3. STATS LOGIC
  useEffect(() => {
    if (userInput.length > 0) {
      const correctChars = userInput.split('').filter((char, i) => char === text[i]).length;
      setAccuracy(Math.floor((correctChars / userInput.length) * 100));
      const timeElapsed = (60 - timeLeft) / 60;
      if (timeElapsed > 0) {
        setWpm(Math.floor((userInput.length / 5) / timeElapsed));
      }
    }
  }, [userInput, timeLeft, text]);


  const handleRestart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setTimeLeft(duration); // Use the duration state here
    setIsStarted(false);
    setIsFinished(false);
    setUserInput("");
    setWpm(0);
    setAccuracy(100);
    setLastWrongKey(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-mono relative overflow-x-hidden">
      <Header wpm={wpm} accuracy={accuracy} timeLeft={timeLeft} onRestart={handleRestart} username={username} />

      {!username && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 backdrop-blur-md">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col gap-4 w-96">
            <h2 className="text-2xl font-bold text-center text-gray-800">Enter Your Name</h2>
            <input
              type="text"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="border-2 border-gray-200 text-gray-800 p-3 rounded-xl focus:border-blue-500 outline-none text-center text-lg"
              placeholder="Enter name"
              autoFocus
            />
            <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Start Training
            </button>
          </form>
        </div>
      )}

      {isFinished && (
        <ResultDashboard wpm={wpm} accuracy={accuracy} username={username} onRestart={handleRestart} />
      )}

      <main className="pt-32 flex flex-col items-center px-4">
        {!isStarted && !isFinished && (
          <div className="flex gap-4 mb-6 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
            {[15, 30, 60, 120, 300].map((t) => (
              <button
                key={t}
                onClick={() => handleTimeChange(t)}
                className={`px-4 py-1 rounded-xl font-bold transition-all ${duration === t
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-100"
                  }`}
              >
                {t}s
              </button>
            ))}
          </div>
        )}

        {/* TEXT BOX - Added max-height and scrolling to prevent elongation */}
        <div className="w-full max-w-4xl bg-white p-8 shadow-md text-2xl leading-relaxed tracking-widest text-gray-400 relative rounded-xl max-h-[150px] overflow-y-auto scroll-smooth">
          <div className={`absolute top-2 right-4 text-white text-[10px] font-bold px-2 py-1 rounded ${isStarted ? 'bg-blue-600' : 'bg-gray-400'}`}>
            {isStarted ? "TYPING..." : "READY"}
          </div>

          <p className="select-none break-words">
            {text.split("").map((char, index) => {
              let color = "text-gray-400";
              let isCurrent = index === userInput.length;

              if (index < userInput.length) {
                color = userInput[index] === char ? "text-blue-500" : "text-red-500 underline decoration-red-500";
              }

              return (
                <span
                  key={index}
                  // 1. ATTACH THE REF HERE
                  ref={isCurrent ? activeCharRef : null}
                  className={`${color} ${isCurrent ? "bg-blue-100 border-b-2 border-blue-500" : ""}`}
                >
                  {char}
                </span>
              );
            })}
          </p>
        </div>

        <VirtualKeyboard
          activeKey={activeKey}
          nextKey={text[userInput.length]?.toUpperCase()}
          lastWrongKey={lastWrongKey}
        />
      </main>
    </div>
  );
};

export default Hero;