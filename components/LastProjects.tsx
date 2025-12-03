'use client';

import React from 'react';
import { ExternalLink, Plus, MoreHorizontal } from 'lucide-react';

export default function LastProjects() {
  return (
    <div className="w-full max-w-3xl p-6 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold tracking-tight">Last Projects</h3>
          <span className="bg-rose-100 dark:bg-[#1F2125] text-gray-600 dark:text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full border border-rose-200 dark:border-white/10">
            2
          </span>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm font-medium transition-colors group"
        >
          <ExternalLink size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          <span>View on Figma</span>
        </a>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-[#0F1014] rounded-[32px] p-6 border border-rose-200 dark:border-white/5 transition-colors duration-300 shadow-sm dark:shadow-none">

        {/* Card Header Info */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold text-lg mb-1">Smart Home UI Ux</h4>
            <div className="text-gray-500 text-sm font-medium">5 Member</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border-[3px] border-white dark:border-[#0F1014] flex items-center justify-center text-[10px] text-gray-500 overflow-hidden"
                >
                  {/* Placeholder for avatar images */}
                  <div className={`w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 opacity-80`} />
                </div>
              ))}
            </div>
            <button className="w-9 h-9 rounded-full border border-dashed border-gray-300 dark:border-zinc-600 flex items-center justify-center text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-400 transition-all">
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Visual Content Grid */}
        <div className="grid grid-cols-2 gap-5 h-64">

          {/* LEFT BLOCK: Wireframe / Collaborative Mode */}
          <div className="bg-gray-50 dark:bg-[#15161A] rounded-2xl relative overflow-hidden border border-rose-100 dark:border-white/5 group hover:border-rose-200 dark:hover:border-white/10 transition-colors">
            {/* Background UI Mockup */}
            <div className="absolute inset-0 p-4 opacity-50 flex gap-3">
              {/* Sidebar */}
              <div className="w-16 h-full bg-gray-200 dark:bg-[#25262B] rounded-lg flex flex-col gap-2 p-2">
                <div className="w-8 h-8 bg-white/50 dark:bg-white/10 rounded-full mb-2"></div>
                <div className="w-full h-2 bg-white/50 dark:bg-white/5 rounded-full"></div>
                <div className="w-full h-2 bg-white/50 dark:bg-white/5 rounded-full"></div>
              </div>
              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="w-full h-24 bg-gray-200 dark:bg-[#25262B] rounded-lg"></div>
                <div className="flex gap-3 h-full">
                  <div className="flex-1 bg-gray-200 dark:bg-[#25262B] rounded-lg"></div>
                  <div className="flex-1 bg-gray-200 dark:bg-[#25262B] rounded-lg"></div>
                </div>
              </div>
            </div>

            {/* Cursor: Sarah (Top Right - Yellow) */}
            <div className="absolute top-12 right-20 z-20">
              <CursorIcon color="#facc15" />
              <div className="absolute top-0 left-4 bg-[#facc15] text-black text-[10px] font-bold px-2 py-0.5 rounded-tr-lg rounded-br-lg rounded-bl-lg translate-y-2">
                Sarah
              </div>
            </div>

            {/* Cursor: Wilson (Middle Left - Pink) */}
            <div className="absolute top-28 left-16 z-20">
              <CursorIcon color="#f472b6" />
              <div className="absolute top-0 left-4 bg-[#f472b6] text-white text-[10px] font-bold px-2 py-0.5 rounded-tr-lg rounded-br-lg rounded-bl-lg translate-y-2">
                Wilson
              </div>
            </div>

            {/* Cursor: Jimmy (Bottom Right - Blue) */}
            <div className="absolute bottom-16 right-16 z-20">
              <CursorIcon color="#60a5fa" />
              <div className="absolute top-0 left-4 bg-[#60a5fa] text-white text-[10px] font-bold px-2 py-0.5 rounded-tr-lg rounded-br-lg rounded-bl-lg translate-y-2">
                Jimmy
              </div>
            </div>
          </div>

          {/* RIGHT BLOCK: Flowchart / Logic */}
          <div className="bg-gray-50 dark:bg-[#15161A] rounded-2xl relative border border-rose-100 dark:border-white/5 overflow-hidden flex items-center justify-center transition-colors">

            {/* SVG Lines for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              {/* Market to Session */}
              <line x1="30%" y1="50%" x2="50%" y2="40%" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
              {/* Session to Start(green) */}
              <line x1="65%" y1="40%" x2="80%" y2="25%" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
              {/* Session to End/IO */}
              <line x1="65%" y1="40%" x2="75%" y2="55%" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
              {/* Another to Session */}
              <line x1="50%" y1="75%" x2="55%" y2="50%" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
              {/* IO to Customer */}
              <line x1="80%" y1="55%" x2="85%" y2="65%" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
              {/* Start(green) to Customer Top */}
              <line x1="85%" y1="25%" x2="88%" y2="15%" stroke="currentColor" className="text-gray-400 dark:text-gray-600" strokeWidth="1" />
            </svg>

            {/* Nodes */}
            <div className="absolute inset-0">
              {/* Alert Node (Purple) */}
              <div className="absolute top-[55%] left-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <div className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">ALERT</div>
              </div>

              {/* Market Node */}
              <div className="absolute top-[45%] left-[20%] -translate-y-1/2 bg-white dark:bg-[#1F2125] border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-[10px] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-xl">
                Market <span className="text-gray-400 dark:text-gray-600 text-[8px] ml-1">x</span>
              </div>

              {/* Session Node (Center) */}
              <div className="absolute top-[35%] left-[50%] -translate-x-1/2 text-gray-500 dark:text-zinc-600 text-[10px] font-mono tracking-widest">
                Session
              </div>

              {/* Another Node (Bottom) */}
              <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 bg-white dark:bg-[#1F2125] border border-gray-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-[10px] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-xl">
                Another
              </div>

              {/* Start Node (Green Dot) */}
              <div className="absolute top-[22%] right-[18%] flex items-center gap-2 bg-white dark:bg-[#1F2125] border border-gray-200 dark:border-white/10 px-2 py-1 rounded-full shadow-sm dark:shadow-xl">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                <span className="text-[9px] text-gray-500 dark:text-gray-400">Start</span>
              </div>

              {/* IO Node */}
              <div className="absolute top-[52%] right-[22%] bg-white dark:bg-[#1F2125] border border-gray-200 dark:border-white/10 px-2 py-1 rounded-lg text-[9px] text-gray-500 dark:text-gray-400 shadow-sm">
                I/O
              </div>

              {/* Customer Node (Top Right) */}
              <div className="absolute top-[10%] right-[5%] border border-gray-200 dark:border-white/5 px-2 py-1 rounded-full text-[9px] text-gray-500 dark:text-gray-600">
                Customer
              </div>

              {/* Customer Node (Bottom Right) */}
              <div className="absolute bottom-[30%] right-[5%] border border-gray-200 dark:border-white/5 px-2 py-1 rounded-full text-[9px] text-gray-500 dark:text-gray-600">
                Customer
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for the mouse cursor arrow
function CursorIcon({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-md"
    >
      <path d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19169L11.7841 12.3673H5.65376Z" stroke="white" strokeWidth="1" />
    </svg>
  );
}