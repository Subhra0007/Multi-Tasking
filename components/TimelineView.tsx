'use client';

import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { MoreVertical } from 'lucide-react';

// --- Type Definitions ---
interface TimelineTask {
      id: string;
      title: string;
      date: string;
      startTime: string; // e.g., "10:00"
      endTime: string;   // e.g., "12:00"
      tags: { label: string; color: string }[];
      avatars: string[];
      column: number; // 0 to 6 (Mon-Sun)
      row: number;    // Vertical position index to avoid overlap
}

const days = [
      { name: 'MON', date: '20' },
      { name: 'TUE', date: '21' },
      { name: 'WED', date: '22' },
      { name: 'THU', date: '23' },
      { name: 'FRI', date: '24' },
      { name: 'SAT', date: '25' },
      { name: 'SUN', date: '26' },
];

const tasks: TimelineTask[] = [
      {
            id: '1',
            title: 'Plan project launch',
            date: 'Nov 4, 2023 at 12:13 am',
            startTime: '10:00',
            endTime: '12:00',
            tags: [{ label: 'Research', color: 'default' }, { label: 'Low', color: 'green' }],
            avatars: ['bg-gray-400', 'bg-gray-500'],
            column: 0, // MON
            row: 0
      },
      {
            id: '2',
            title: 'Develop marketing strategy',
            date: 'Feb 10, 2024 at 6:00 pm',
            startTime: '14:00',
            endTime: '16:00',
            tags: [{ label: 'Research', color: 'default' }, { label: 'Medium', color: 'yellow' }],
            avatars: ['bg-gray-400', 'bg-gray-500'],
            column: 2, // WED (spanning to THU visually in design, but let's place it)
            row: 1
      },
      {
            id: '3',
            title: 'Design user interface',
            date: 'Dec 15, 2023 at 3:45 pm',
            startTime: '16:00',
            endTime: '18:00',
            tags: [{ label: 'Design Process', color: 'default' }, { label: 'High', color: 'pink' }],
            avatars: ['bg-gray-400', 'bg-gray-500'],
            column: 3, // THU
            row: 2
      },
      {
            id: '4',
            title: 'Outline content structure',
            date: 'Nov 4, 2023 at 12:13 am',
            startTime: '11:00',
            endTime: '13:00',
            tags: [{ label: 'Research', color: 'default' }, { label: 'High', color: 'pink' }],
            avatars: ['bg-gray-400', 'bg-gray-500'],
            column: 5, // SAT
            row: 1
      },
      {
            id: '5',
            title: 'Product market research',
            date: 'Jan 20, 2024 at 9:30 am',
            startTime: '09:00',
            endTime: '11:00',
            tags: [{ label: 'Research', color: 'default' }, { label: 'Low', color: 'pink' }],
            avatars: ['bg-gray-400', 'bg-gray-500'],
            column: 0, // MON (bottom one)
            row: 3
      },
      {
            id: '6',
            title: 'Review team progress',
            date: 'Mar 5, 2024 at 11:15 am',
            startTime: '15:00',
            endTime: '17:00',
            tags: [{ label: 'Research', color: 'default' }, { label: 'High', color: 'pink' }],
            avatars: ['bg-gray-400', 'bg-gray-500'],
            column: 6, // SUN
            row: 3
      },
];

export default function TimelineView() {
      const { resolvedTheme } = useTheme();
      const isDark = resolvedTheme === 'dark';
      const scrollContainerRef = useRef<HTMLDivElement>(null);

      // Center the view on mount (optional, but good for timeline)
      useEffect(() => {
            if (scrollContainerRef.current) {
                  const scrollWidth = scrollContainerRef.current.scrollWidth;
                  const clientWidth = scrollContainerRef.current.clientWidth;
                  scrollContainerRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
            }
      }, []);

      const getTagStyles = (color: string) => {
            switch (color) {
                  case 'green': return isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700';
                  case 'yellow': return isDark ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-100 text-yellow-700';
                  case 'pink': return isDark ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700';
                  default: return isDark ? 'border border-gray-700 text-gray-400' : 'border border-gray-200 text-gray-600';
            }
      };

      return (
            <div className="flex-1 overflow-hidden flex flex-col h-full relative" style={{ minHeight: '600px' }}>
                  {/* Current Time Indicator Line - Absolute Positioned over the whole grid */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-red-400 z-10 hidden md:block">
                        <div className="absolute -top-1 -left-[3px] w-2 h-2 rounded-full bg-red-400"></div>
                  </div>

                  <div ref={scrollContainerRef} className="flex-1 overflow-x-auto overflow-y-auto">
                        <div className="min-w-[1400px] h-full flex flex-col">
                              {/* Header Row */}
                              <div className="flex border-b sticky top-0 z-20 backdrop-blur-sm bg-background/80">
                                    {days.map((day, index) => (
                                          <div
                                                key={index}
                                                className={`flex-1 py-4 text-center border-r last:border-r-0 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
                                          >
                                                <span className={`text-xs font-medium uppercase mr-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{day.name}</span>
                                                <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{day.date}</span>
                                          </div>
                                    ))}
                              </div>

                              {/* Grid Content */}
                              <div className="flex-1 flex relative">
                                    {/* Vertical Grid Lines */}
                                    {days.map((_, index) => (
                                          <div
                                                key={index}
                                                className={`flex-1 border-r last:border-r-0 h-full ${isDark ? 'border-gray-800' : 'border-gray-100'}`}
                                          ></div>
                                    ))}

                                    {/* Tasks Layer */}
                                    <div className="absolute inset-0 p-4">
                                          {tasks.map((task) => {
                                                // Calculate position based on column and row
                                                // This is a simplified positioning logic. In a real app, you'd calculate this dynamically.
                                                const left = `${(task.column / 7) * 100}%`;
                                                const width = '300px'; // Fixed width for cards as per design
                                                const top = `${task.row * 160 + 40}px`; // Staggered rows

                                                // Adjust left position to center in the column or span
                                                // For this demo, we'll just offset it slightly to look like the design
                                                const style = {
                                                      left: `calc(${left} + 20px)`,
                                                      top: top,
                                                      width: width
                                                };

                                                return (
                                                      <div
                                                            key={task.id}
                                                            style={style}
                                                            className={`absolute p-4 rounded-2xl border shadow-sm transition-all hover:shadow-md cursor-pointer group
                                            ${isDark ? 'bg-[#1F2125] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-100 hover:border-gray-200'}
                                        `}
                                                      >
                                                            <div className="flex justify-between items-start mb-1">
                                                                  <div className={`w-1 h-8 rounded-full mr-3 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                                                                  <div className="flex-1">
                                                                        <h3 className={`font-semibold text-sm mb-0.5 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{task.title}</h3>
                                                                        <p className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{task.date}</p>
                                                                  </div>
                                                                  <button className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                                                        <MoreVertical size={14} />
                                                                  </button>
                                                            </div>

                                                            <div className="flex items-center justify-between mt-4 pl-4">
                                                                  <div className="flex gap-2">
                                                                        {task.tags.map((tag, i) => (
                                                                              <span key={i} className={`text-[10px] px-2 py-1 rounded-md font-medium ${getTagStyles(tag.color)}`}>
                                                                                    {tag.label}
                                                                              </span>
                                                                        ))}
                                                                  </div>

                                                                  <div className="flex -space-x-1.5">
                                                                        {task.avatars.map((_, i) => (
                                                                              <div key={i} className={`w-5 h-5 rounded-full border bg-gray-300 ${isDark ? 'border-[#1F2125]' : 'border-white'}`}>
                                                                                    <img src={`https://i.pravatar.cc/150?u=${task.id}${i}`} alt="avatar" className="w-full h-full rounded-full" />
                                                                              </div>
                                                                        ))}
                                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${isDark ? 'bg-red-500/20 border-[#1F2125] text-red-400' : 'bg-red-100 border-white text-red-500'}`}>
                                                                              +2
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                );
                                          })}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
