'use client';

import React from 'react';
import { ExternalLink, Plus } from 'lucide-react';

export default function LastProjects() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h3 className="text-white font-semibold text-lg">Last Projects</h3>
          <span className="bg-[#1F2125] text-gray-400 text-xs px-2 py-0.5 rounded-full border border-gray-800">2</span>
        </div>
        <a href="#" className="flex items-center gap-2 text-[#6366f1] text-sm hover:text-[#818cf8] transition-colors">
          <ExternalLink size={14} />
          <span>View on Figma</span>
        </a>
      </div>

      <div className="bg-[#0F1014] rounded-3xl p-6 border border-gray-800">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h4 className="text-white font-semibold text-lg mb-1">Smart Home UI Ux</h4>
            <div className="text-gray-500 text-sm">5 Member</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#0F1014]"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#0F1014]"></div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#0F1014]"></div>
              <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-[#0F1014]"></div>
              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-[#0F1014]"></div>
            </div>
            <button className="w-8 h-8 rounded-full border border-dashed border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Left Block - Wireframe */}
          <div className="bg-[#1F2125] rounded-2xl p-4 h-48 relative overflow-hidden border border-gray-800 group hover:border-gray-700 transition-colors">
            {/* Mock UI Elements */}
            <div className="flex gap-2 mb-2">
              <div className="w-1/3 h-20 bg-[#2C2E33] rounded-lg"></div>
              <div className="w-2/3 h-20 bg-[#2C2E33] rounded-lg"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/2 h-12 bg-[#2C2E33] rounded-lg"></div>
              <div className="w-1/2 h-12 bg-[#2C2E33] rounded-lg"></div>
            </div>

            {/* Tags */}
            <div className="absolute top-8 right-12 bg-[#fef08a] text-black text-[10px] px-2 py-0.5 rounded-full font-medium transform translate-x-2 -translate-y-2 shadow-lg">
              Sarah
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#fef08a] transform translate-y-1/2 rotate-45"></div>
            </div>
            <div className="absolute bottom-12 left-8 bg-[#f472b6] text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-lg">
              Wilson
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#f472b6] transform -translate-y-1/2 rotate-45"></div>
            </div>
            <div className="absolute bottom-8 right-8 bg-[#60a5fa] text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-lg">
              Jimmy
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#60a5fa] transform -translate-y-1/2 rotate-45"></div>
            </div>
          </div>

          {/* Right Block - Flowchart */}
          <div className="bg-[#1F2125] rounded-2xl p-4 h-48 relative border border-gray-800 flex items-center justify-center group hover:border-gray-700 transition-colors">
            <div className="relative w-full h-full">
              {/* Nodes */}
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2 border border-gray-600 rounded-lg px-3 py-1.5 text-xs text-gray-400">
                Market
              </div>
              <div className="absolute top-1/4 right-1/4 transform -translate-x-1/2 border border-gray-600 rounded-lg px-3 py-1.5 text-xs text-gray-400">
                Session
              </div>
              <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 border border-gray-600 rounded-lg px-3 py-1.5 text-xs text-gray-400">
                Another
              </div>

              {/* Connecting Lines (Simplified) */}
              <div className="absolute top-1/2 left-1/4 w-16 h-px bg-gray-700 transform rotate-[-30deg] origin-left"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-px bg-gray-700 transform rotate-[30deg] origin-left"></div>

              {/* Small Dots */}
              <div className="absolute top-1/2 left-4 w-2 h-2 rounded-full bg-[#6366f1]"></div>
              <div className="absolute top-1/3 right-8 w-2 h-2 rounded-full bg-[#10b981]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

