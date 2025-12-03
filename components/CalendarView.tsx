'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Pencil, Plus, FileText, Check, Circle } from 'lucide-react';

export default function CalendarView() {
  const days = [
    { name: 'Mon', date: '26', full: 'Monday' },
    { name: 'Tue', date: '27', full: 'Tuesday' },
    { name: 'Wed', date: '28', full: 'Wednesday' },
    { name: 'Thu', date: '29', full: 'Thursday' },
  ];

  const timeSlots = ['10:00', '11:00', '12:00', '13:00', '14:00'];

  return (
    <div className="flex-1 overflow-x-auto">
      {/* View Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-rose-200 dark:border-[color-mix(in_oklab,var(--background),black_70%)] text-foreground transition-colors duration-300">

        {/* Left: View Toggles */}
        <div className="flex items-center gap-1 bg-white dark:bg-[#1F2125] p-1 rounded-xl border border-rose-200 dark:border-gray-800 transition-colors">
          <button className="px-6 py-2 text-sm bg-rose-100 dark:bg-[#2C2E33] text-gray-900 dark:text-white rounded-lg shadow-sm font-medium transition-colors">Card</button>
          <button className="px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Blocks</button>
          <button className="px-6 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Table</button>
        </div>

        {/* Center/Right: Filters & Date */}
        <div className="flex items-center gap-6">
          <select className="text-sm px-4 py-2.5 rounded-xl bg-white dark:bg-[#1F2125] text-gray-700 dark:text-gray-300 border border-rose-200 dark:border-gray-800 outline-none cursor-pointer hover:border-rose-300 dark:hover:border-gray-700 transition-colors">
            <option>1 Weeks</option>
          </select>

          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-xs text-blue-500 dark:text-blue-400">
              <Pencil size={12} />
              <span>30 minutes ago</span>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <div className="w-5 h-5 rounded-full bg-pink-500 border border-white dark:border-[#0F1014]"></div>
                <span>Sarah</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-900 dark:text-gray-200">
              <button className="hover:text-gray-600 dark:hover:text-white cursor-pointer transition"><ChevronLeft size={20} /></button>
              <span className="text-xl font-semibold">June, 2023</span>
              <button className="hover:text-gray-600 dark:hover:text-white cursor-pointer transition"><ChevronRight size={20} /></button>
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
              <div key={time} className="h-24 text-xs text-gray-500 border-b border-rose-200 dark:border-gray-800 transition-colors">
                {time}
              </div>
            ))}
          </div>

          {/* Days Columns */}
          {days.map((day, dayIndex) => (
            <div key={day.name} className="flex-1 min-w-[200px]">
              <div className="text-center mb-4 pb-2 border-b border-rose-200 dark:border-[color-mix(in_oklab,var(--background),black_70%)] transition-colors">
                <div className="text-gray-500 dark:text-gray-400 text-xs">{day.full}</div>
                <div className="font-semibold text-gray-900 dark:text-gray-100">{day.date}/{day.name}</div>
              </div>

              <div className="relative">
                {/* Time Grid */}
                {timeSlots.map((time, timeIndex) => (
                  <div
                    key={time}
                    className="h-24 border-b border-rose-200 dark:border-[color-mix(in_oklab,var(--background),black_70%)] relative transition-colors"
                  >
                    {/* Tasks */}
                    {dayIndex === 0 && timeIndex === 0 && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-600/20 border border-yellow-200 dark:border-yellow-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:border-yellow-300 dark:hover:border-yellow-500/50 transition-all duration-300 rounded-xl p-3 text-xs group" style={{ height: '96px' }}>
                        <div className="text-gray-900 dark:text-white font-semibold mb-1 group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors">Design System Team Meeting</div>
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex -space-x-1">
                            <div className="w-4 h-4 rounded-full bg-purple-500 border border-white dark:border-[#1F2125]"></div>
                            <div className="w-4 h-4 rounded-full bg-blue-500 border border-white dark:border-[#1F2125]"></div>
                            <div className="w-4 h-4 rounded-full bg-green-500 border border-white dark:border-[#1F2125]"></div>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-[10px] ml-1">meet._wrc-pgg-xx</span>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <button className="bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/50 text-[10px] px-2 py-0.5 rounded hover:bg-yellow-200 dark:hover:bg-yellow-500 hover:text-yellow-900 dark:hover:text-black transition-colors">Join</button>
                          <div className="text-gray-500 text-[10px]">10:15-12:15</div>
                        </div>
                      </div>
                    )}

                    {dayIndex === 0 && timeIndex === 2 && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/20 border border-blue-200 dark:border-blue-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 rounded-xl p-3 text-xs group flex flex-col" style={{ height: '192px' }}>
                        <div className="text-gray-900 dark:text-white font-semibold mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Wireframe SmartHome App</div>
                        <div className="flex items-center gap-2 mb-2 bg-blue-100 dark:bg-blue-500/10 p-1.5 rounded-lg border border-blue-200 dark:border-blue-500/20">
                          <FileText size={12} className="text-blue-500 dark:text-blue-400" />
                          <span className="text-blue-600 dark:text-blue-300 text-[10px]">Project Brief Doc</span>
                        </div>
                        <div className="flex items-center gap-2 mt-auto">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                          <div className="text-gray-500 dark:text-gray-400 text-[10px]">Monica Rose</div>
                        </div>
                        <div className="text-gray-500 text-[10px] mt-2">12:00-14:00</div>
                      </div>
                    )}

                    {dayIndex === 1 && timeIndex === 0 && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/20 border border-purple-200 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:border-purple-300 dark:hover:border-purple-500/50 transition-all duration-300 rounded-xl p-3 text-xs group flex flex-col" style={{ height: '288px' }}>
                        <div className="text-gray-900 dark:text-white font-semibold mb-2 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">3d Design Orzano Cotton</div>
                        <div className="w-full h-24 bg-gradient-to-br from-teal-400 via-purple-500 to-rose-500 rounded-lg mb-3 shadow-inner"></div>
                        <div className="flex -space-x-1 mb-3">
                          <div className="w-5 h-5 rounded-full bg-purple-500 border border-white dark:border-[#1F2125]"></div>
                          <div className="w-5 h-5 rounded-full bg-blue-500 border border-white dark:border-[#1F2125]"></div>
                          <div className="w-5 h-5 rounded-full bg-green-500 border border-white dark:border-[#1F2125]"></div>
                          <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-[#2C2E33] border border-white dark:border-[#1F2125] flex items-center justify-center text-[8px] text-gray-500 dark:text-gray-400">+2</div>
                        </div>
                        <button className="bg-purple-500 text-white text-[10px] px-2 py-1.5 rounded-lg w-full hover:bg-purple-600 transition-colors mt-auto shadow-lg shadow-purple-500/20">Final Edit CAD</button>
                        <div className="text-gray-500 text-[10px] mt-2">10:45-14:15</div>
                      </div>
                    )}

                    {dayIndex === 1 && timeIndex === 3 && (
                      <div className="absolute top-0 left-0 right-0 border-2 border-dashed border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-500/5 rounded-xl p-2 h-24 flex items-center justify-center cursor-pointer hover:bg-green-100 dark:hover:bg-green-500/10 hover:border-green-400 dark:hover:border-green-500/60 hover:shadow-sm dark:hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300 group">
                        <div className="text-center">
                          <div className="flex justify-center mb-1"><Plus size={24} className="text-green-500 dark:text-green-500/50 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:scale-110 transition-all duration-300" /></div>
                          <div className="text-green-600 dark:text-green-500/50 text-xs group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">Add New Task</div>
                        </div>
                      </div>
                    )}

                    {dayIndex === 2 && timeIndex === 2 && (
                      <div className="absolute top-0 left-0 right-0 border-2 border-dashed border-green-300 dark:border-green-500/30 bg-green-50 dark:bg-green-500/5 rounded-xl p-2 h-24 flex items-center justify-center cursor-pointer hover:bg-green-100 dark:hover:bg-green-500/10 hover:border-green-400 dark:hover:border-green-500/60 hover:shadow-sm dark:hover:shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300 group">
                        <div className="text-center">
                          <div className="flex justify-center mb-1"><Plus size={24} className="text-green-500 dark:text-green-500/50 group-hover:text-green-600 dark:group-hover:text-green-400 group-hover:scale-110 transition-all duration-300" /></div>
                          <div className="text-green-600 dark:text-green-500/50 text-xs group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">Add New Task</div>
                        </div>
                      </div>
                    )}

                    {dayIndex === 3 && timeIndex === 0 && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-500/10 dark:to-pink-600/20 border border-pink-200 dark:border-pink-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] hover:border-pink-300 dark:hover:border-pink-500/50 transition-all duration-300 rounded-xl p-3 text-xs group flex flex-col" style={{ height: '192px' }}>
                        <div className="text-gray-900 dark:text-white font-semibold mb-2 group-hover:text-pink-700 dark:group-hover:text-pink-400 transition-colors">Redesign Edu Web</div>
                        <div className="flex justify-between text-gray-500 dark:text-gray-400 text-[10px] mb-1">
                          <span>Complete: 3/5</span>
                          <span className="text-pink-500 dark:text-pink-400">60%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 mb-3 overflow-hidden">
                          <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-1.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ width: '60%' }}></div>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-[10px] mb-3">Deadline: July, 08</div>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <div className="bg-green-100 dark:bg-green-500/20 p-0.5 rounded-full"><Check size={8} /></div>
                            <span>Research</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <div className="bg-green-100 dark:bg-green-500/20 p-0.5 rounded-full"><Check size={8} /></div>
                            <span>Wireframe</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <div className="bg-green-100 dark:bg-green-500/20 p-0.5 rounded-full"><Check size={8} /></div>
                            <span>Ui Design</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <div className="border border-gray-400 dark:border-gray-600 p-0.5 rounded-full w-3 h-3"></div>
                            <span>Prototype</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <div className="border border-gray-400 dark:border-gray-600 p-0.5 rounded-full w-3 h-3"></div>
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
