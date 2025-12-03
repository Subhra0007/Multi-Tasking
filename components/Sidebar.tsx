
'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  ChevronDown,
  LayoutGrid,
  Search,
  Calendar,
  Activity,
  Inbox,
  Plus,
  Settings,
  Moon,
  Sun,
  Folder,
  FileText,
  Link as LinkIcon,
  Wallet,
  Bookmark,
  Triangle,
  ListChecks,    
  Layout,        
  Store,         
  Notebook       
} from 'lucide-react';

// --- TYPE DEFINITIONS FOR TYPE SAFETY ---

type MenuName = 'dashboard' | 'project-board' | 'task-board' | 'schedule' | 'activities' | 'inbox' | null;

interface TaskSubMenu {
    name: string;
    icon: React.ReactNode;
    count: number | null;
}

// --- TYPEWRITER ANIMATION COMPONENT (TypeScript) ---

interface TypewriterProps {
    text: string;
    speed?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState<string>('');

  useEffect(() => {
    let i = 0;
    setDisplayText(''); 
    
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(() => text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return (
    <span className="inline-flex items-center">
      {displayText}
      {/* Blinking Cursor */}
      <span className="ml-1 h-4 w-[2px] animate-pulse bg-current opacity-70" />
    </span>
  );
};

// --------------------------------------------------

export default function Sidebar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  
  const [expandedMenu, setExpandedMenu] = useState<MenuName>('task-board'); 
  const [activeMenu, setActiveMenu] = useState<MenuName>('task-board'); 

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark: boolean = resolvedTheme === 'dark';

  const setGlobalTheme = (dark: boolean) => {
    setTheme(dark ? 'dark' : 'light');
  };

  const toggleMenu = (menu: MenuName) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };
  
  // Helper variables for dynamic styles
  const hoverClass: string = isDark ? 'hover:bg-white/5' : 'hover:bg-rose-200/50';
  const textMuted: string = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderClass: string = isDark ? 'border-gray-800' : 'border-rose-200';

  const taskBoardSubMenus: TaskSubMenu[] = [
    { name: 'Template', icon: <Layout size={10} className="text-purple-500 fill-purple-500" />, count: null },
    { name: 'Market Places', icon: <Store size={10} className="text-blue-500 fill-blue-500" />, count: null },
    { name: 'Notes', icon: <Notebook size={10} className="text-teal-500 fill-teal-500" />, count: null },
    { name: 'Todo List', icon: <ListChecks size={10} className="text-amber-500 fill-amber-500" />, count: 7 },
  ];

  // --- NEW RADIX-STYLE ANIMATION COMPONENT WRAPPER ---
  // Renders children only when expanded, and applies scale-in/scale-out transition classes.
  const RadixMenuWrapper: React.FC<{ menuName: MenuName, expanded: boolean, children: React.ReactNode }> = ({ expanded, children }) => {
    // If you define 'scale-in' and 'scale-out' in your tailwind.config.js, replace the transition classes below.
    return (
      <div 
        className={`pl-4 mt-2 mb-4 overflow-hidden transition-all duration-300 ease-out 
          ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} 
          ${expanded 
            ? 'transition-opacity duration-200 ease-out translate-y-0 scale-100' // Open state (visible, full scale)
            : 'transition-all duration-150 ease-in scale-95 opacity-0' // Closed state (scaled down, invisible)
          }`}
      >
        {children}
      </div>
    );
  };
  // ----------------------------------------------------

  return (
    <div className={`w-[300px] h-screen overflow-y-auto flex flex-col transition-colors duration-300 font-sans
      ${isDark ? 'bg-[#0F1014] text-gray-300' : 'bg-rose-50 text-gray-900'}`}>

      {/* 1. User Profile */}
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white overflow-hidden shadow-lg border-2 
                ${isDark ? 'border-[#1a1b1e]' : 'border-white'}`}>
                <span className="font-bold text-lg">W</span>
              </div>
              <div className={`absolute top-0 right-0 w-3 h-3 bg-teal-400 rounded-full border-2 
                ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
            </div>
            <div>
              <div className={`font-bold text-lg min-w-[60px] ${isDark ? 'text-white' : 'text-gray-950'}`}>
                 <Typewriter text="Walter" speed={150} />
              </div>
              <div className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Designer Pro+</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className={`p-2 rounded-full transition-colors ${hoverClass}`}>
              <Plus size={18} className={isDark ? "text-gray-500" : "text-gray-700"} />
            </button>
            <button className={`p-2 rounded-full transition-colors ${hoverClass}`}>
              <Settings size={18} className={isDark ? "text-gray-500" : "text-gray-700"} />
            </button>
          </div>
        </div>

        {/* 2. Search Bar */}
        <div className="relative group">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`} />
          <input
            type="text"
            placeholder="Redesign App"
            className={`w-full text-sm pl-10 pr-10 py-3 rounded-2xl border transition-all focus:outline-none 
              ${isDark
                ? 'bg-[#18191d] text-gray-200 border-transparent focus:border-white/10 placeholder:text-gray-600'
                : 'bg-white text-gray-900 border-rose-100 focus:border-rose-300 placeholder:text-gray-500 shadow-sm'
              }`}
          />
        </div>
      </div>

      <div className="px-6 py-2">
        <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>Overview</div>
        
        <div className="space-y-2">
          {/* Dashboard */}
          <div
            className="relative cursor-pointer group rounded-xl overflow-hidden"
            onClick={() => setActiveMenu('dashboard')}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
              ${activeMenu === 'dashboard' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center gap-3 px-4 py-2 transition-colors
              ${activeMenu === 'dashboard'
                ? 'text-white'
                : isDark ? 'text-gray-400' : 'text-gray-700'}`}
            >
              <LayoutGrid size={20} />
              <span className="font-medium">Dashboard</span> 
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500"></div>
            </div>
          </div>

          {/* Project Board */}
          <div
            className="group relative overflow-hidden rounded-xl cursor-pointer" 
            onClick={() => {
              setActiveMenu('project-board');
              toggleMenu('project-board');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
              ${activeMenu === 'project-board' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center gap-3 px-4 py-2 rounded-[11px] transition-colors
              ${activeMenu === 'project-board'
                ? 'text-white'
                : isDark ? 'text-gray-300' : 'text-gray-800'}`}
            >
              <Folder size={20} className={activeMenu === 'project-board' ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-700'} />
              <span className="font-normal">Project Board</span> 
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform duration-300 ${expandedMenu === 'project-board' ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Project Tree Structure - USING RADIX-STYLE WRAPPER */}
        <RadixMenuWrapper expanded={expandedMenu === 'project-board'} menuName={'project-board'}>
          <div className={`border-l space-y-1 ${borderClass}`}>

            {/* Simple Item */}
            <div className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer 
              ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
              <div className={`w-3.5 h-3.5 border rounded-[3px] mr-1 ${isDark ? 'border-gray-600' : 'border-gray-500'}`}></div>
              <span className="text-sm font-medium">Edu Design Landing</span>
              <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded 
                ${isDark ? 'bg-[#1F1818] text-red-400' : 'bg-red-100 text-red-600'}`}>4</span>
            </div>

            {/* Tree Parent: Team Project */}
            <div className="relative pt-1">
              <div className="flex items-center gap-3 pl-6 py-2 text-teal-600 font-bold cursor-pointer">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-teal-500"></div>
                <span className="text-sm">Team Project</span>
              </div>

              {/* Tree Children */}
              <div className="relative ml-6 mt-1 space-y-0">
                {[
                  { name: 'Website', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> },
                  { name: 'Apps', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> },
                  { name: 'Dribbble Shot', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> }
                ].map((sub, idx, arr) => (
                  <div key={idx} className="relative flex items-center pl-6 py-2 group cursor-pointer">
                    {/* Vertical Line - Darker in light mode */}
                    {idx !== arr.length - 1 && (
                      <div className={`absolute left-[3px] top-0 h-full w-[1px] ${isDark ? 'bg-gray-700' : 'bg-gray-400'}`}></div>
                    )}
                    {/* Curved Connector - Darker in light mode */}
                    <div className={`absolute left-[3px] top-0 w-4 h-[50%] border-b border-l rounded-bl-lg ${isDark ? 'border-gray-700' : 'border-gray-400'}`}></div>

                    <span className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-900'}`}>{sub.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tripple Website */}
            <div className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
              <Triangle size={10} className="text-emerald-500 fill-emerald-500 rotate-180" />
              <span className="text-sm font-medium">Tripple Website</span>
            </div>

            {/* Social App */}
            <div className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
              <div className="w-2.5 h-2.5 rounded-full border-2 border-amber-500"></div>
              <span className="text-sm font-medium">Social App</span>
              <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${isDark ? 'bg-[#1d1f18] text-amber-500' : 'bg-amber-100 text-amber-700'}`}>3</span>
            </div>

            {/* Create New Board */}
            <div className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer mt-1 text-teal-600 ${isDark ? 'text-teal-600 hover:text-teal-500' : 'text-teal-600 hover:text-teal-800'}`}>
              <Plus size={16} />
              <span className="text-sm font-bold">Create New Board</span>
            </div>
          </div>
        </RadixMenuWrapper>

        <div className="space-y-2"> {/* Continued space-y-2 for consistent gap */}
          {/* Task Board */}
          <div
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            onClick={() => {
              setActiveMenu('task-board');
              toggleMenu('task-board');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
              ${activeMenu === 'task-board' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center gap-3 px-4 py-2 rounded-[11px] transition-colors
              ${activeMenu === 'task-board'
                ? 'text-white'
                : isDark ? 'text-gray-300' : 'text-gray-800'}`}
            >
              <FileText size={20} className={activeMenu === 'task-board' ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-700'} />
              <span className="font-normal">Task Board</span> 
              <ChevronDown
                className={`ml-auto h-4 w-4 transition-transform duration-300 ${expandedMenu === 'task-board' ? 'rotate-180' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Task Board Structure - USING RADIX-STYLE WRAPPER */}
        <RadixMenuWrapper expanded={expandedMenu === 'task-board'} menuName={'task-board'}>
          <div className={`border-l space-y-1 ${borderClass}`}>
            
            {taskBoardSubMenus.map((item) => (
              <div key={item.name} className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
                {/* Custom icon from the map, styled similarly to the dots */}
                <div className="w-2.5 h-2.5 flex items-center justify-center">
                    {item.icon}
                </div>
                
                <span className="text-sm font-medium">{item.name}</span>
                
                {/* Count badge, only render if count exists */}
                {item.count && (
                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${isDark ? 'bg-[#1d1f18] text-amber-500' : 'bg-amber-100 text-amber-700'}`}>
                        {item.count}
                    </span>
                )}
              </div>
            ))}
            
            {/* Create new Task Board */}
            <div className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer mt-1 text-teal-600 ${isDark ? 'text-teal-600 hover:text-teal-500' : 'text-teal-600 hover:text-teal-800'}`}>
              <Plus size={16} />
              <span className="text-sm font-bold">Create new Task Board</span>
            </div>
            
          </div>
        </RadixMenuWrapper>

        {/* Schedule & Activities */}
        <div className="space-y-2"> {/* space-y-1 -> space-y-2 for consistent gap */}
          {/* Schedule */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => setActiveMenu('schedule')}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${activeMenu === 'schedule' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center justify-between px-4 py-2 transition-colors
                ${activeMenu === 'schedule'
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className="flex items-center gap-3">
                <Calendar size={20} /> 
                <span className="text-base font-normal">Schedule</span> 
              </div>
              <span className={`text-xs ${activeMenu === 'schedule' ? 'text-white/80' : isDark ? 'text-gray-500' : 'text-gray-600'}`}>June, 28, 2023</span>
            </div>
          </div>

          {/* Activities */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => setActiveMenu('activities')}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${activeMenu === 'activities' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center justify-between px-4 py-2 transition-colors
                ${activeMenu === 'activities'
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className="flex items-center gap-3">
                <Activity size={20} /> 
                <span className="text-base font-normal">Activities</span> 
              </div>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-100 px-2 py-0.5 rounded">
                New
              </span>
            </div>
          </div>

          {/* Inbox */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => setActiveMenu('inbox')}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${activeMenu === 'inbox' ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center justify-between px-4 py-2 transition-colors
                ${activeMenu === 'inbox'
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className="flex items-center gap-3">
                <Inbox size={20} /> 
                <span className="text-base font-normal">Inbox</span> 
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className={`w-5 h-5 rounded-full bg-purple-500 border-2 ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
                  <div className={`w-5 h-5 rounded-full bg-teal-500 border-2 ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
                </div>
                <span className={`text-[10px] font-bold ${activeMenu === 'inbox' ? 'text-white' : isDark ? 'text-gray-500' : 'text-gray-700'}`}>24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Card */}
      <div className="mt-auto p-6">
        <div className={`text-[10px] font-bold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>Onboarding</div>

        {/* Onboarding Icons Row & THEME SWITCHER */}
        <div className={`flex justify-between items-center p-2 rounded-2xl mb-4 transition-colors
          ${isDark ? 'bg-[#15161a]' : 'bg-white border border-rose-200 shadow-sm'}`}>
          <button className={`p-2 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}><FileText size={18} /></button>
          <button className={`p-2 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}><LinkIcon size={18} /></button>
          <button className={`p-2 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}><Wallet size={18} /></button>
          <button className={`p-2 transition-colors ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}><Bookmark size={18} /></button>

          <div className={`h-6 w-[1px] mx-1 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

          {/* THEME TOGGLE */}
          <div className={`flex items-center rounded-full p-1 border transition-colors 
            ${isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-100 border-rose-200'}`}>
            <button
              onClick={() => setGlobalTheme(false)}
              className={`p-1.5 rounded-full transition-all duration-300 ${!isDark ? 'bg-white text-amber-500 shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Sun size={14} />
            </button>
            <button
              onClick={() => setGlobalTheme(true)}
              className={`p-1.5 rounded-full transition-all duration-300 ${isDark ? 'bg-[#2c2d31] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Moon size={14} />
            </button>
          </div>
        </div>

        {/* Add New Project Card */}
        <div className={`relative border border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors 
          ${isDark
            ? 'border-gray-700 bg-gradient-to-b from-white/5 to-transparent hover:border-gray-500'
            : 'border-rose-300 bg-white hover:border-rose-400 hover:bg-rose-50/50'
          }`}>
          <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-lg shadow-indigo-500/20">
            <Plus size={24} />
          </div>
          <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Project</h3>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Or use <span className="text-indigo-500 font-bold hover:underline">invite link</span></p>
        </div>
      </div>

    </div>
  );
}
