'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Layout, Search, Users, FileText, Plus, Zap, Star } from 'lucide-react';

// Mock Data
const mockTemplates = [
      { id: 1, name: 'SaaS Launch Checklist', description: 'Everything you need to launch a software product.', type: 'Project', users: 5, rating: 4.8, color: 'bg-teal-500' },
      { id: 2, name: 'Daily Standup Agenda', description: 'Simple template for daily team meetings.', type: 'Task', users: 12, rating: 4.5, color: 'bg-indigo-500' },
      { id: 3, name: 'Marketing Campaign Planner', description: 'Kanban board template for managing campaigns.', type: 'Project', users: 8, rating: 4.9, color: 'bg-amber-500' },
];

const TemplateCard: React.FC<any> = ({ template, isDark }) => {
      const cardBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';
      const primaryBg = template.color.replace('500', '600');
      const primaryText = template.color.replace('500', '400');

      return (
            <div className={`p-5 rounded-3xl border transition-all hover:shadow-xl cursor-pointer ${cardBg}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white ${primaryBg}`}>
                        {template.type === 'Project' ? <Layout size={20} /> : <FileText size={20} />}
                  </div>
                  <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{template.name}</h4>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{template.description}</p>

                  <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                              <div className={`flex items-center gap-1 ${primaryText}`}>
                                    <Users size={14} />
                                    <span>{template.users} Used</span>
                              </div>
                              <div className="flex items-center gap-1 text-amber-400">
                                    <Star size={14} className="fill-amber-400" />
                                    <span>{template.rating}</span>
                              </div>
                        </div>
                        <button className={`text-xs font-bold px-3 py-1 rounded-full text-white ${primaryBg} hover:opacity-90`}>
                              Use
                        </button>
                  </div>
            </div>
      );
};

export default function TemplateView() {
      const { resolvedTheme } = useTheme();
      const isDark = resolvedTheme === 'dark';
      const cardBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';

      return (
            <div className={`flex-1 p-8 transition-colors ${isDark ? 'bg-slate-950' : 'bg-rose-50'}`}>
                  <h1 className={`text-3xl font-bold flex items-center gap-3 mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Layout size={32} className="text-teal-500" /> Template Library
                  </h1>

                  {/* Header and Search */}
                  <div className={`p-4 rounded-2xl mb-8 flex items-center gap-4 border ${cardBg}`}>
                        <div className="relative flex-grow">
                              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`} />
                              <input
                                    type="text"
                                    placeholder="Search project or task templates..."
                                    className={`w-full text-sm pl-10 pr-4 py-2 rounded-xl transition-all focus:outline-none
                        ${isDark ? 'bg-[#18191d] text-gray-200 border-transparent placeholder:text-gray-600' : 'bg-rose-50 border-rose-100 text-gray-900 placeholder:text-gray-500'}
                        `}
                              />
                        </div>
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold shadow-md transition-all ${isDark ? 'bg-rose-600' : 'bg-teal-600'}`}>
                              <Zap size={20} />
                              Create Custom
                        </button>
                  </div>

                  {/* Template Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockTemplates.map(template => (
                              <TemplateCard key={template.id} template={template} isDark={isDark} />
                        ))}
                  </div>
            </div>
      );
}
