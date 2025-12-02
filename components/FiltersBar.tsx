'use client';

import React from 'react';
import { SlidersHorizontal, Pencil, Upload, Type, Settings, Image, Trash2, Plus } from 'lucide-react';

export default function FiltersBar() {
  return (
    <div className="px-6 py-4">
      <div className="flex items-center justify-between bg-[#0F1014] rounded-2xl p-2 border border-gray-800">
        {/* Left Section */}
        <div className="flex items-center gap-6 pl-2">
          <button className="flex items-center gap-3 px-4 py-2 rounded-xl bg-[#1F2125] text-gray-300 hover:text-white transition-colors">
            <SlidersHorizontal size={16} />
            <span className="text-sm font-medium">Filters</span>
            <span className="bg-[#2C2E33] text-blue-400 text-xs px-2 py-0.5 rounded-full">6</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-sm">Color:</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-pink-500 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-blue-400 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition-transform"></div>
              <button className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Section - Tools */}
        <div className="flex items-center gap-1 bg-[#1F2125] p-1 rounded-xl border border-gray-800">
          <button className="p-2 text-white bg-[#2C2E33] rounded-lg hover:bg-gray-700 transition-colors">
            <Pencil size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2C2E33] rounded-lg transition-colors">
            <Upload size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2C2E33] rounded-lg transition-colors">
            <Type size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-[#2C2E33] rounded-lg transition-colors">
            <Settings size={18} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 pr-4">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Image size={18} />
            <span className="text-sm">Add Image</span>
          </button>

          <div className="w-px h-6 bg-gray-800"></div>

          <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Trash2 size={18} />
            <span className="text-sm">Deleted</span>
            <span className="bg-[#2C2E33] text-red-400 text-xs px-2 py-0.5 rounded-full ml-1">4</span>
          </button>
        </div>
      </div>
    </div>
  );
}

