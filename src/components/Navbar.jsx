import React from 'react';
import Cookies from 'js-cookie';
import { ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import logo from "../assets/typing.png";
import StatsPanel from "./StatsPanel";
import { FaGoogle, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Header({ wpm, accuracy, timeLeft, onRestart, username }) {
  const handleLogout = () => {
    Cookies.remove('typerName');
    window.location.reload();
  };

  return (
    <header className="fixed bg-white border-b border-gray-200 inset-x-0 top-0 z-50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Left: Logo & Brand */}
        <div className="flex lg:flex-1 items-center gap-4">
          <a href="#" className="-m-1.5 p-1.5 flex flex-col">
            <div className="flex items-center gap-1">
              <img alt="Logo" src={logo} className="h-12 w-auto" />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                yping<span className="text-blue-600">.com</span>
              </span>
            </div>
            {/* This is the small Copyright line under the logo */}
            <div className="text-[9px] text-gray-400 font-medium leading-none ml-10">
              © 2025 All Rights Reserved
            </div>
          </a>
        </div>


        {/* Center: YOUR NEW SOCIAL SECTION */}
        <div className="hidden md:flex items-center gap-2 mr-8">
          <div className="flex justify-center items-center">
            <button className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-50 transition duration-300">
              <FaGoogle size={18} />
            </button>

            <a href="https://github.com/Zakariwhoami/" target="_blank" rel="noreferrer" className="p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-50 transition duration-300">
              <FaGithub size={18} />
            </a>
            <a href="https://github.com/your-profile" target="_blank" rel="noreferrer" className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-gray-50 transition duration-300">
              <FaInstagram size={18} />
            </a>

          </div>

          <div className="h-8 w-px bg-gray-300 mx-2"></div>
          <span className="-rotate-90 text-[10px] text-gray-400 tracking-widest uppercase whitespace-nowrap">
            Socials
          </span>
        </div>


        {/* Center: Timer */}
        <div className="flex items-center gap-4 bg-gray-100 px-6 py-2 rounded-full border border-gray-200">
          <div className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-gray-500" />
            <span className="font-mono text-2xl font-bold text-gray-700">
              {timeLeft > 0 ? `${timeLeft.toString().padStart(2, '0')}` : "0:00"}
            </span>
          </div>
          <button
            onClick={onRestart}
            className="p-1 hover:rotate-180 transition-transform duration-500 text-gray-400 hover:text-blue-600"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex lg:flex-1 lg:justify-end items-center gap-4">
          <StatsPanel wpm={wpm} accuracy={accuracy} />
          <div className="h-8 w-[1px] bg-gray-300 mx-2"></div>

          {username ? (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Student</span>
                <span className="text-sm font-bold text-blue-600">{username}</span>
              </div>
              <button onClick={handleLogout} className="text-[10px] text-red-400 hover:text-red-600 font-bold underline">
                Logout
              </button>
            </div>
          ) : (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md">
              Sign Up
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}