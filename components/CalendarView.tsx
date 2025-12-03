'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pencil, Plus, FileText, Check, Circle } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function CalendarView() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const days = [
    { name: 'Mon', date: '26', full: 'Monday' },
    { name: 'Tue', date: '27', full: 'Tuesday' },
    { name: 'Wed', date: '28', full: 'Wednesday' },
    { name: 'Thu', date: '29', full: 'Thursday' },
  ];

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00'];

  if (!mounted) {
    return <div className="flex-1 overflow-x-auto p-6"><div className="animate-pulse h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div></div>;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex-1 overflow-x-auto">
      {/* View Controls */}
      <div className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300
        ${isDark ? 'border-[color-mix(in_oklab,var(--background),black_70%)] text-foreground' : 'border-rose-200 text-gray-900'}`}>

        {/* Left: View Toggles */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border transition-colors
          ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-200'}`}>
          <button className={`px-6 py-2 text-sm rounded-lg shadow-sm font-medium transition-colors
            ${isDark ? 'bg-[#2C2E33] text-white' : 'bg-rose-100 text-gray-900'}`}>Card</button>
          <button className={`px-6 py-2 text-sm transition-colors
            ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Blocks</button>
          <button className={`px-6 py-2 text-sm transition-colors
            ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>Table</button>
        </div>

        {/* Center/Right: Filters & Date */}
        <div className="flex items-center gap-6">
          <select className={`text-sm px-4 py-2.5 rounded-xl border outline-none cursor-pointer transition-colors
            ${isDark ? 'bg-[#1F2125] text-gray-300 border-gray-800 hover:border-gray-700' : 'bg-white text-gray-700 border-rose-200 hover:border-rose-300'}`}>
            <option>1 Weeks</option>
          </select>

          <div className="flex flex-col items-end gap-1">
            <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-blue-400' : 'text-blue-500'}`}>
              <Pencil size={12} />
              <span>30 minutes ago</span>
              <div className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className={`w-5 h-5 rounded-full bg-pink-500 border ${isDark ? 'border-[#0F1014]' : 'border-white'}`}></div>
                <span>Sarah</span>
              </div>
            </div>

            <div className={`flex items-center gap-4 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
              <button className={`cursor-pointer transition ${isDark ? 'hover:text-white' : 'hover:text-gray-600'}`}><ChevronLeft size={20} /></button>
              <span className="text-xl font-semibold">June, 2023</span>
              <button className={`cursor-pointer transition ${isDark ? 'hover:text-white' : 'hover:text-gray-600'}`}><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        <div className="flex gap-4">
          {/* Time Column */}
          <div className="w-20 flex flex-col pt-8">
            {timeSlots.map((time) => (
              <div key={time} className={`h-24 text-xs border-b transition-colors
                ${isDark ? 'text-gray-500 border-gray-800' : 'text-gray-500 border-rose-200'}`}>
                {time}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {days.map((day, dayIndex) => (
            <div key={day.name} className="flex-1 min-w-[200px]">
              <div className={`text-center mb-4 pb-2 border-b transition-colors
                ${isDark ? 'border-[color-mix(in_oklab,var(--background),black_70%)]' : 'border-rose-200'}`}>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{day.full}</div>
                <div className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{day.date}/{day.name}</div>
              </div>

              <div className="relative">
                {/* Time Grid */}
                {timeSlots.map((time, timeIndex) => (
                  <div
                    key={time}
                    className={`h-24 border-b relative transition-colors
                      ${isDark ? 'border-[color-mix(in_oklab,var(--background),black_70%)]' : 'border-rose-200'}`}
                  >
                    {/* Tasks */}
                    {dayIndex === 0 && timeIndex === 0 && (
                      <div className={`absolute top-0 left-0 right-0 border backdrop-blur-md shadow-sm transition-all duration-300 rounded-xl p-3 text-xs group
                        ${isDark
                          ? 'bg-yellow-500/10 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:border-yellow-500/50'
                          : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-md hover:border-yellow-300'}`} style={{ height: '96px' }}>
                        <div className={`font-semibold mb-1 transition-colors
                          ${isDark ? 'text-white group-hover:text-yellow-400' : 'text-gray-900 group-hover:text-yellow-700'}`}>Design System Team Meeting</div>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex -space-x-1">
                            <div className={`w-4 h-4 rounded-full bg-purple-500 border ${isDark ? 'border-[#1F2125]' : 'border-white'}`}></div>
                            <div className={`w-4 h-4 rounded-full bg-blue-500 border ${isDark ? 'border-[#1F2125]' : 'border-white'}`}></div>
                            <div className={`w-4 h-4 rounded-full bg-green-500 border ${isDark ? 'border-[#1F2125]' : 'border-white'}`}></div>
                          </div>
                          <span className={`text-[10px] ml-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>meet._wrc-pgg-xx</span>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <button className={`text-[10px] px-2 py-0.5 rounded transition-colors
                            ${isDark
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black'
                              : 'bg-yellow-100 text-yellow-700 border border-yellow-200 hover:bg-yellow-200 hover:text-yellow-900'}`}>Join</button>
                          <div className="text-gray-500 text-[10px]">10:15-12:15</div>
                        </div>
                      </div>
                    )}

                    {dayIndex === 0 && timeIndex === 2 && (
                      <div className={`absolute top-0 left-0 right-0 border backdrop-blur-md shadow-sm transition-all duration-300 rounded-xl p-3 text-xs group flex flex-col
                        ${isDark
                          ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-blue-500/50'
                          : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md hover:border-blue-300'}`} style={{ height: '192px' }}>
                        <div className={`font-semibold mb-2 transition-colors
                          ${isDark ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-700'}`}>Wireframe SmartHome App</div>
                        <div className={`flex items-center gap-2 mb-2 p-1.5 rounded-lg border
                          ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-100 border-blue-200'}`}>
                          <FileText size={12} className={isDark ? "text-blue-400" : "text-blue-500"} />
                          <span className={`text-[10px] ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>Project Brief Doc</span>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                          <div className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Monica Rose</div>
                        </div>
                        <div className="text-gray-500 text-[10px] mt-2">12:00-14:00</div>
                      </div>
                    )}

                    {dayIndex === 1 && timeIndex === 0 && (
                      <div className={`absolute top-0 left-0 right-0 border backdrop-blur-md shadow-sm transition-all duration-300 rounded-xl p-3 text-xs group flex flex-col
                        ${isDark
                          ? 'bg-purple-500/10 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:border-purple-500/50'
                          : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-md hover:border-purple-300'}`} style={{ height: '288px' }}>
                        <div className={`font-semibold mb-2 transition-colors
                          ${isDark ? 'text-white group-hover:text-purple-400' : 'text-gray-900 group-hover:text-purple-700'}`}>3d Design Orzano Cotton</div>
                        <div className="w-full h-24 bg-gradient-to-br from-teal-400 via-purple-500 to-rose-500 rounded-lg mb-3 shadow-inner"></div>
                        <div className="flex -space-x-1 mb-3">
                          <div className={`w-5 h-5 rounded-full bg-purple-500 border ${isDark ? 'border-[#1F2125]' : 'border-white'}`}></div>
                          <div className={`w-5 h-5 rounded-full bg-blue-500 border ${isDark ? 'border-[#1F2125]' : 'border-white'}`}></div>
                          <div className={`w-5 h-5 rounded-full bg-green-500 border ${isDark ? 'border-[#1F2125]' : 'border-white'}`}></div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px]
                            ${isDark ? 'bg-[#2C2E33] border-[#1F2125] text-gray-400' : 'bg-gray-200 border-white text-gray-500'}`}>+2</div>
                        </div>
                        <button className="bg-purple-500 text-white text-[10px] px-2 py-1.5 rounded-lg w-full hover:bg-purple-600 transition-colors mt-auto shadow-lg shadow-purple-500/20">Final Edit CAD</button>
                        <div className="text-gray-500 text-[10px] mt-2">10:45-14:15</div>
                      </div>
                    )}

                    {dayIndex === 1 && timeIndex === 3 && (
                      <div className={`absolute top-0 left-0 right-0 border-2 border-dashed rounded-xl p-2 h-24 flex items-center justify-center cursor-pointer transition-all duration-300 group
                        ${isDark
                          ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/60 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                          : 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400 hover:shadow-sm'}`}>
                        <div className="text-center">
                          <div className="flex justify-center mb-1"><Plus size={24} className={`transition-all duration-300 group-hover:scale-110
                            ${isDark ? 'text-green-500/50 group-hover:text-green-400' : 'text-green-500 group-hover:text-green-600'}`} /></div>
                          <div className={`text-xs transition-colors
                            ${isDark ? 'text-green-500/50 group-hover:text-green-400' : 'text-green-600 group-hover:text-green-700'}`}>Add New Task</div>
                        </div>
                      </div>
                    )}

                    {dayIndex === 2 && timeIndex === 2 && (
                      <div className={`absolute top-0 left-0 right-0 border-2 border-dashed rounded-xl p-2 h-24 flex items-center justify-center cursor-pointer transition-all duration-300 group
                        ${isDark
                          ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/60 hover:shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                          : 'border-green-300 bg-green-50 hover:bg-green-100 hover:border-green-400 hover:shadow-sm'}`}>
                        <div className="text-center">
                          <div className="flex justify-center mb-1"><Plus size={24} className={`transition-all duration-300 group-hover:scale-110
                            ${isDark ? 'text-green-500/50 group-hover:text-green-400' : 'text-green-500 group-hover:text-green-600'}`} /></div>
                          <div className={`text-xs transition-colors
                            ${isDark ? 'text-green-500/50 group-hover:text-green-400' : 'text-green-600 group-hover:text-green-700'}`}>Add New Task</div>
                        </div>
                      </div>
                    )}

                    {dayIndex === 3 && timeIndex === 0 && (
                      <div className={`absolute top-0 left-0 right-0 border backdrop-blur-md shadow-sm transition-all duration-300 rounded-xl p-3 text-xs group flex flex-col
                        ${isDark
                          ? 'bg-pink-500/10 border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:border-pink-500/50'
                          : 'bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:shadow-md hover:border-pink-300'}`} style={{ height: '192px' }}>
                        <div className={`font-semibold mb-2 transition-colors
                          ${isDark ? 'text-white group-hover:text-pink-400' : 'text-gray-900 group-hover:text-pink-700'}`}>Redesign Edu Web</div>
                        <div className={`flex justify-between text-[10px] mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span>Complete: 3/5</span>
                          <span className={isDark ? "text-pink-400" : "text-pink-500"}>60%</span>
                        </div>
                        <div className={`w-full rounded-full h-1.5 mb-3 overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                          <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: '60%' }}></div>
                        </div>
                        <div className={`text-[10px] mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Deadline: July, 08</div>
                        <div className="space-y-1.5 text-[10px]">
                          <div className={`flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            <div className={`p-0.5 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}><Check size={8} /></div>
                            <span>Research</span>
                          </div>
                          <div className={`flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            <div className={`p-0.5 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}><Check size={8} /></div>
                            <span>Wireframe</span>
                          </div>
                          <div className={`flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                            <div className={`p-0.5 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'}`}><Check size={8} /></div>
                            <span>Ui Design</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <div className={`border p-0.5 rounded-full w-3 h-3 ${isDark ? 'border-gray-600' : 'border-gray-400'}`}></div>
                            <span>Prototype</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <div className={`border p-0.5 rounded-full w-3 h-3 ${isDark ? 'border-gray-600' : 'border-gray-400'}`}></div>
                            <span>A/B Test</span>
                          </div>
                        </div>
                        <div className="text-gray-500 text-[10px] mt-auto">10:00-12:00</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
