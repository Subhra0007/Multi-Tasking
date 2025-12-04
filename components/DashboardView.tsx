'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
      TrendingUp,
      TrendingDown,
      Users,
      Briefcase,
      CheckCircle2,
      Clock,
      MoreHorizontal,
      ArrowUpRight,
      ArrowDownRight
} from 'lucide-react';

export default function DashboardView() {
      const { resolvedTheme } = useTheme();
      const isDark = resolvedTheme === 'dark';

      // --- Mock Data ---
      const stats = [
            { label: 'Total Projects', value: '124', change: '+12%', trend: 'up', icon: Briefcase, color: 'blue' },
            { label: 'Completed', value: '89', change: '+5%', trend: 'up', icon: CheckCircle2, color: 'green' },
            { label: 'In Progress', value: '32', change: '-2%', trend: 'down', icon: Clock, color: 'yellow' },
            { label: 'Team Members', value: '18', change: '+4%', trend: 'up', icon: Users, color: 'purple' },
      ];

      const recentActivity = [
            { id: 1, project: 'Smart Home App', task: 'Wireframing', status: 'In Progress', time: '2h ago', user: 'Sarah' },
            { id: 2, project: 'Orzano Website', task: 'Homepage Design', status: 'Completed', time: '4h ago', user: 'Mike' },
            { id: 3, project: 'Dashboard UI', task: 'Component Library', status: 'Delayed', time: '1d ago', user: 'Anna' },
            { id: 4, project: 'Mobile Banking', task: 'User Testing', status: 'In Progress', time: '2d ago', user: 'Tom' },
      ];

      return (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                  {/* 1. Statistics Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                              <div key={index} className={`p-6 rounded-3xl border transition-all hover:shadow-md
                        ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                          <div className={`p-3 rounded-2xl ${isDark ? `bg-${stat.color}-500/10 text-${stat.color}-400` : `bg-${stat.color}-100 text-${stat.color}-600`}`}>
                                                <stat.icon size={24} />
                                          </div>
                                          <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
                                ${stat.trend === 'up'
                                                      ? (isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600')
                                                      : (isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600')}`}>
                                                {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                                {stat.change}
                                          </div>
                                    </div>
                                    <div className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
                              </div>
                        ))}
                  </div>

                  {/* 2. Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Weekly Activity (Bar Chart Mockup) */}
                        <div className={`lg:col-span-2 p-6 rounded-3xl border ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100'}`}>
                              <div className="flex justify-between items-center mb-8">
                                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Weekly Activity</h3>
                                    <button className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                                          <MoreHorizontal size={20} />
                                    </button>
                              </div>

                              <div className="h-64 flex items-end justify-between gap-4 px-4">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                                          const height = Math.floor(Math.random() * 60) + 30; // Random height 30-90%
                                          return (
                                                <div key={i} className="flex flex-col items-center gap-3 w-full group cursor-pointer">
                                                      <div className="w-full relative h-48 flex items-end rounded-t-xl overflow-hidden bg-transparent">
                                                            <div
                                                                  style={{ height: `${height}%` }}
                                                                  className={`w-full rounded-xl transition-all duration-500 group-hover:opacity-80
                                            ${i === 2 ? 'bg-gradient-to-t from-indigo-600 to-purple-500' : (isDark ? 'bg-gray-800' : 'bg-rose-100')}`}
                                                            ></div>
                                                      </div>
                                                      <span className={`text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{day}</span>
                                                </div>
                                          );
                                    })}
                              </div>
                        </div>

                        {/* Task Status (Pie Chart Mockup) */}
                        <div className={`p-6 rounded-3xl border flex flex-col ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100'}`}>
                              <h3 className={`text-lg font-semibold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Task Status</h3>

                              <div className="flex-1 flex items-center justify-center relative">
                                    {/* CSS-only Donut Chart */}
                                    <div className="w-48 h-48 rounded-full border-[16px] border-indigo-500 relative flex items-center justify-center"
                                          style={{
                                                borderRightColor: '#f472b6', // Pink
                                                borderBottomColor: '#10b981', // Green
                                                borderLeftColor: '#6366f1', // Indigo
                                                borderTopColor: '#6366f1', // Indigo
                                                transform: 'rotate(45deg)'
                                          }}>
                                          <div className={`absolute inset-0 rounded-full border-[16px] border-transparent`} style={{ transform: 'rotate(-45deg)' }}></div>
                                    </div>
                                    <div className="absolute text-center">
                                          <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>85%</div>
                                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completion</div>
                                    </div>
                              </div>

                              <div className="mt-8 space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                          <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>In Progress</span>
                                          </div>
                                          <span className="font-semibold">45%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                          <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Delayed</span>
                                          </div>
                                          <span className="font-semibold">25%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                          <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Completed</span>
                                          </div>
                                          <span className="font-semibold">30%</span>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {/* 3. Recent Activity Table */}
                  <div className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100'}`}>
                        <div className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
                              <button className={`text-sm font-medium ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>View All</button>
                        </div>
                        <div className="overflow-x-auto">
                              <table className="w-full text-sm text-left">
                                    <thead className={`text-xs uppercase ${isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
                                          <tr>
                                                <th className="px-6 py-4 font-medium">Project</th>
                                                <th className="px-6 py-4 font-medium">Task</th>
                                                <th className="px-6 py-4 font-medium">Status</th>
                                                <th className="px-6 py-4 font-medium">User</th>
                                                <th className="px-6 py-4 font-medium">Time</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {recentActivity.map((item) => (
                                                <tr key={item.id} className={`border-b last:border-0 transition-colors ${isDark ? 'border-gray-800 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'}`}>
                                                      <td className={`px-6 py-4 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.project}</td>
                                                      <td className={`px-6 py-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.task}</td>
                                                      <td className="px-6 py-4">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                                            ${item.status === 'Completed' ? (isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700') :
                                                                        item.status === 'In Progress' ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700') :
                                                                              (isDark ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700')}`}>
                                                                  {item.status}
                                                            </span>
                                                      </td>
                                                      <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold">
                                                                        {item.user.charAt(0)}
                                                                  </div>
                                                                  <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.user}</span>
                                                            </div>
                                                      </td>
                                                      <td className={`px-6 py-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.time}</td>
                                                </tr>
                                          ))}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
}
