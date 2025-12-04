'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import AppShell from '@/components/AppShell';
import { Layout, Search, Users, FileText, Plus, Zap, Star } from 'lucide-react';

// --- Mock Data ---
const mockTemplates = [
    {
        id: 1,
        name: 'SaaS Launch Checklist',
        description: 'Everything you need to plan, execute, and launch a software product, including marketing tasks.',
        type: 'Project',
        users: 5,
        rating: 4.8,
        color: 'bg-teal-600',
        icon: Layout
    },
    {
        id: 2,
        name: 'Daily Standup Agenda',
        description: 'Simple task template for organizing daily team meetings and accountability checks.',
        type: 'Task',
        users: 12,
        rating: 4.5,
        color: 'bg-indigo-600',
        icon: FileText
    },
    {
        id: 3,
        name: 'Marketing Campaign Planner',
        description: 'Kanban board template optimized for managing diverse digital marketing campaigns.',
        type: 'Project',
        users: 8,
        rating: 4.9,
        color: 'bg-amber-600',
        icon: Layout
    },
    {
        id: 4,
        name: 'Personal Goal Tracker',
        description: 'A simple list to break down and track personal objectives and milestones.',
        type: 'Task',
        users: 25,
        rating: 4.7,
        color: 'bg-rose-600',
        icon: FileText
    },
];

// --- Template Card Component ---
const TemplateCard: React.FC<any> = ({ template, isDark }) => {
    const cardBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';
    const primaryText = template.color.replace('600', '400').replace('bg-', 'text-');

    return (
        <div className={`p-5 rounded-3xl border transition-all hover:shadow-xl cursor-pointer ${cardBg}`}>
            {/* Icon */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 text-white ${template.color}`}>
                <template.icon size={20} />
            </div>

            <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{template.name}</h4>
            <p className={`text-sm mb-4 h-10 overflow-hidden ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{template.description}</p>

            <div className="flex items-center justify-between text-xs pt-3 border-t border-dashed">
                <div className="flex items-center gap-3">
                    {/* Usage Count */}
                    <div className={`flex items-center gap-1 ${primaryText}`}>
                        <Users size={14} />
                        <span className="font-semibold">{template.users} Used</span>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} className="fill-amber-400" />
                        <span className="font-semibold">{template.rating}</span>
                    </div>
                </div>
                {/* Use Button */}
                <button className={`text-xs font-bold px-3 py-1.5 rounded-xl text-white ${template.color} hover:opacity-90 transition-opacity shadow-md`}>
                    Use Template
                </button>
            </div>
        </div>
    );
};

// --- Main Template View Component ---
export function TemplateView() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const containerBg = isDark ? 'bg-slate-950' : 'bg-teal-50';
    const headerBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';

    return (
        <div className={`flex-1 p-8 transition-colors ${containerBg}`}>
            {/* Header */}
            <h1 className={`text-3xl font-bold flex items-center gap-3 mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <Layout size={32} className="text-teal-500" /> Template Library
            </h1>

            {/* Header Bar: Search and Action Button */}
            <div className={`p-4 rounded-2xl mb-8 flex flex-col sm:flex-row items-center gap-4 border ${headerBg}`}>
                <div className="relative flex-grow w-full sm:w-auto">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`} />
                    <input
                        type="text"
                        placeholder="Search project or task templates..."
                        className={`w-full text-sm pl-10 pr-4 py-2 rounded-xl transition-all focus:outline-none
                        ${isDark ? 'bg-[#18191d] text-gray-200 border border-transparent placeholder:text-gray-600' : 'bg-rose-50 border border-rose-100 text-gray-900 placeholder:text-gray-500'}
                        `}
                    />
                </div>
                <button className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white font-semibold shadow-md transition-all ${isDark ? 'bg-rose-600 hover:bg-rose-500' : 'bg-teal-600 hover:bg-teal-500'}`}>
                    <Zap size={20} />
                    Create Custom Template
                </button>
            </div>

            {/* Filter/Category Section */}
            <div className="mb-6 flex gap-4 border-b pb-2">
                <button className="text-sm font-bold text-teal-500 border-b-2 border-teal-500 pb-2">All Templates</button>
                <button className={`text-sm font-medium pb-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Project Templates</button>
                <button className={`text-sm font-medium pb-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>Task Lists</button>
            </div>


            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockTemplates.map(template => (
                    <TemplateCard key={template.id} template={template} isDark={isDark} />
                ))}
            </div>
        </div>
    );
}

// Default export for the /template route
export default function Page() {
    return (
        <AppShell defaultView="Template" activeMenu="template">
            <TemplateView />
        </AppShell>
    );
}