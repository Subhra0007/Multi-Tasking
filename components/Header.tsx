'use client';

import React from 'react';
import { Search, Mic, Bell, Inbox, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <div className="px-6 py-4 bg-rose-50 dark:bg-[color-mix(in_oklab,var(--background),black_85%)] text-foreground transition-colors duration-300">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Left Section - Project Info */}

        <div className="flex flex-col gap-1">
          {/* Top Row: Icon + Title + Avatars */}
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-[#6366f1]"></div>
            <div className="font-semibold text-lg text-gray-900 dark:text-white">Team Project</div>

            {/* Avatars */}
            <div className="flex -space-x-2 ml-2">
              <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-rose-100 dark:border-[#0F1014]"></div>
              <div className="w-6 h-6 rounded-full bg-gray-500 border-2 border-rose-100 dark:border-[#0F1014]"></div>
              <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-rose-100 dark:border-[#0F1014]"></div>
              <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-[#1F2125] border-2 border-rose-100 dark:border-[#0F1014] flex items-center justify-center text-[8px] text-gray-600 dark:text-gray-400">+4</div>
            </div>

            <button className="w-6 h-6 rounded-full border border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xs ml-1">
              +
            </button>
          </div>

          {/* Bottom Row: Connector + Subtitle */}
          <div className="relative pl-2 flex items-center">
            {/* Curved Line */}
            <div className="absolute left-[7px] -top-3 w-4 h-6 border-b border-l border-gray-600 rounded-bl-lg"></div>

            <div className="text-sm text-gray-600 dark:text-gray-400 ml-6">
              Website / Apps / Dribbble Shot
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-rose-200 dark:border-transparent dark:bg-[color-mix(in_oklab,var(--background),black_75%)]">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Type to search"
              className="bg-transparent text-sm flex-1 outline-none text-foreground"
            />
            <Mic size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Right Section - Actions */}

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-gray-400">
            <button className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition p-2 hover:bg-rose-200/50 dark:hover:bg-white/5 rounded-full relative">
              <span className="sr-only">Notifications</span>
              <Bell size={20} />
              <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-[#0F1014]"></div>
            </button>
            <button className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition p-2 hover:bg-rose-200/50 dark:hover:bg-white/5 rounded-lg border border-rose-200 dark:border-gray-700">
              <Inbox size={20} />
            </button>

            <button className="px-4 py-2 bg-white dark:bg-[#1F2125] hover:bg-rose-50 dark:hover:bg-[#2a2c30] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors border border-rose-200 dark:border-transparent">
              Share
            </button>

            <div className="flex items-center bg-white dark:bg-[#1F2125] rounded-lg border border-rose-200 dark:border-gray-800">
              <button className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border-r border-rose-200 dark:border-gray-800">Link</button>
              <button className="px-2 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}