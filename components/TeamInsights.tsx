'use client';

import React from 'react';
import { TrendingUp, ChevronDown } from 'lucide-react';

export default function TeamInsights() {
  return (
    <div className="flex-1 bg-[#0F1014] rounded-3xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-semibold text-lg">Team Insights</h3>
          <div className="flex items-center text-[#4ade80] text-sm font-medium gap-1">
            <TrendingUp size={16} />
            <span>+19,24</span>
          </div>
        </div>
        <a href="#" className="text-[#6366f1] text-sm hover:text-[#818cf8] transition-colors">View all</a>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column: Stats */}
        <div className="space-y-6">
          {/* Time Spent */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Time Spent</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-white text-2xl font-semibold">9h</span>
              <span className="bg-[#6366f1]/20 text-[#818cf8] text-xs px-2 py-0.5 rounded-full">78%</span>
            </div>
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Tasks</span>
            </div>
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-white text-2xl font-semibold">10</span>
              <span className="bg-[#6366f1]/20 text-[#818cf8] text-xs px-2 py-0.5 rounded-full">68%</span>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#6366f1]"></div>
                <span className="text-gray-400 text-sm">Doing</span>
                <span className="text-gray-600 text-sm ml-auto">3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#f472b6]"></div>
                <span className="text-gray-400 text-sm">Proggres</span>
                <span className="text-gray-600 text-sm ml-auto">2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                <span className="text-gray-400 text-sm">Completed</span>
                <span className="text-gray-600 text-sm ml-auto">5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="relative">
          <div className="flex justify-end mb-4">
            <button className="flex items-center gap-1 text-gray-400 text-sm hover:text-white">
              Days
              <ChevronDown size={14} />
            </button>
          </div>

          <div className="flex items-end justify-between h-40 gap-2">
            {/* M */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-1.5 h-12 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/3 bg-[#6366f1]"></div>
              </div>
              <span className="text-gray-500 text-xs">M</span>
            </div>
            {/* T */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-1.5 h-20 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-[#f472b6]"></div>
                <div className="absolute bottom-1/2 w-full h-1/4 bg-[#10b981]"></div>
              </div>
              <span className="text-gray-500 text-xs">T</span>
            </div>
            {/* W (Today) */}
            <div className="flex flex-col items-center gap-2 w-full relative">
              <div className="absolute -top-8 bg-[#6366f1] text-white text-[10px] px-2 py-0.5 rounded-md">
                Today
              </div>
              <div className="w-1.5 h-32 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/3 bg-[#6366f1]"></div>
                <div className="absolute bottom-1/3 w-full h-1/3 bg-[#10b981]"></div>
                <div className="absolute bottom-2/3 w-full h-1/6 bg-[#f472b6]"></div>
              </div>
              <span className="text-white text-xs font-medium">W</span>
            </div>
            {/* T */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-1.5 h-16 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-[#10b981]"></div>
              </div>
              <span className="text-gray-500 text-xs">T</span>
            </div>
            {/* F */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-1.5 h-24 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/4 bg-[#f472b6]"></div>
                <div className="absolute bottom-1/4 w-full h-1/4 bg-[#6366f1]"></div>
              </div>
              <span className="text-gray-500 text-xs">F</span>
            </div>
            {/* S */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-1.5 h-10 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/2 bg-[#f472b6]"></div>
              </div>
              <span className="text-gray-500 text-xs">S</span>
            </div>
            {/* S */}
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="w-1.5 h-14 bg-gray-800 rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full h-1/3 bg-[#10b981]"></div>
              </div>
              <span className="text-gray-500 text-xs">S</span>
            </div>
          </div>

          {/* Y-Axis Labels (Simplified) */}
          <div className="absolute left-0 top-0 bottom-8 -ml-6 flex flex-col justify-between text-[10px] text-gray-600">
            <span>10</span>
            <span>8</span>
            <span>6</span>
            <span>4</span>
            <span>2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

