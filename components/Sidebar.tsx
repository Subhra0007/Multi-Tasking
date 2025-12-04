'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiChevronsRight } from 'react-icons/fi';
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

type MenuName =
  | 'dashboard'
  | 'project-board'
  | 'task-board'
  | 'schedule'
  | 'activities'
  | 'inbox'
  | 'template'
  | 'market-places'
  | null;

interface TaskSubMenu {
  name: string;
  icon: React.ReactNode;
  count: number | null;
  subItems?: { name: string; icon?: React.ReactNode }[];
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

interface SidebarProps {
  view: string;
  setView: (view: string) => void;
  activeMenu?: MenuName;
}

export default function Sidebar({ view, setView, activeMenu }: SidebarProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  // Auto-expand menu based on current pathname
  const [expandedMenu, setExpandedMenu] = useState<MenuName>(
    pathname === '/project-board' ? 'project-board' : pathname === '/task-board' ? 'task-board' : null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update expanded menu when pathname changes
  useEffect(() => {
    if (pathname === '/project-board') {
      setExpandedMenu('project-board');
    } else if (pathname === '/task-board') {
      setExpandedMenu('task-board');
    }
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  const isDark: boolean = resolvedTheme === 'dark';

  const setGlobalTheme = (dark: boolean) => {
    setTheme(dark ? 'dark' : 'light');
  };

  const navigateTo = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  const toggleMenu = (menu: MenuName) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  // Determine active state based on pathname (most reliable)
  const isDashboardActive = pathname === '/';
  const isProjectBoardActive = pathname === '/project-board';
  const isTaskBoardActive = pathname === '/task-board';
  const isScheduleActive = pathname === '/schedule';
  const isActivitiesActive = pathname === '/activities';
  const isInboxActive = pathname === '/inbox';
  const isTemplateActive = pathname === '/template';
  const isMarketPlacesActive = pathname === '/market-places';

  // Helper variables for dynamic styles
  const hoverClass: string = isDark ? 'hover:bg-white/5' : 'hover:bg-rose-200/50';
  const textMuted: string = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderClass: string = isDark ? 'border-gray-800' : 'border-rose-200';

  const taskBoardSubMenus: TaskSubMenu[] = [
    {
      name: 'Notes',
      icon: <Notebook size={10} className="text-teal-500 fill-teal-500" />,
      count: null,
      subItems: [
        { name: 'Daily', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> },
        { name: 'Weekly', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> }
      ]
    },
    {
      name: 'Todo List',
      icon: <ListChecks size={10} className="text-amber-500 fill-amber-500" />,
      count: 7,
      subItems: [
        { name: 'Work', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> },
        { name: 'Personal', icon: <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div> }
      ]
    },
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
    <motion.nav
      layout
      className={`h-screen flex flex-col transition-colors duration-300 font-sans shrink-0 relative border-t
      ${isDark ? 'bg-[#0F1014] text-gray-300 border-gray-800' : 'bg-rose-50 text-gray-900 border-rose-200'}`}
      style={{
        width: open ? "300px" : "80px",
        minWidth: open ? "300px" : "80px",
      }}
    >
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pb-16">

      {/* 1. User Profile */}
      <div className={`${open ? 'p-6 pb-2' : 'p-4 pb-2'}`}>
        <div className={`flex items-center ${open ? 'justify-between mb-6' : 'justify-center mb-4'}`}>
          <div className={`flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
            <div className="relative">
              <div className={`${open ? 'w-12 h-12' : 'w-10 h-10'} rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white overflow-hidden shadow-lg border-2 
                ${isDark ? 'border-[#1a1b1e]' : 'border-white'}`}>
                <span className={`font-bold ${open ? 'text-lg' : 'text-base'}`}>W</span>
              </div>
              <div className={`absolute top-0 right-0 ${open ? 'w-3 h-3' : 'w-2.5 h-2.5'} bg-teal-400 rounded-full border-2 
                ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
            </div>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
              >
                <div className={`font-bold text-lg min-w-[60px] ${isDark ? 'text-white' : 'text-gray-950'}`}>
                  <Typewriter text="Walter" speed={150} />
                </div>
                <div className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Designer Pro+</div>
              </motion.div>
            )}
          </div>
          {open && (
            <div className="flex gap-2">
              <button className={`p-2 rounded-full transition-colors ${hoverClass}`}>
                <Plus size={18} className={isDark ? "text-gray-500" : "text-gray-700"} />
              </button>
              <button className={`p-2 rounded-full transition-colors ${hoverClass}`}>
                <Settings size={18} className={isDark ? "text-gray-500" : "text-gray-700"} />
              </button>
            </div>
          )}
        </div>

        {/* 2. Search Bar */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="relative group"
          >
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
          </motion.div>
        )}
      </div>

      <div className={`${open ? 'px-6 py-2' : 'px-2 py-2'}`}>
        {open && (
          <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>Overview</div>
        )}

        <div className="space-y-2">
          {/* Dashboard */}
          <div
            className="relative cursor-pointer group rounded-xl overflow-hidden"
            onClick={() => {
              navigateTo('/');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
              ${isDashboardActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'gap-3 px-4' : 'justify-center px-2'} py-2 transition-colors
              ${isDashboardActive
                  ? 'text-white'
                  : isDark ? 'text-gray-400' : 'text-gray-700'}`}
            >
              <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                <LayoutGrid size={open ? 20 : 22} />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="font-medium"
                >
                  Dashboard
                </motion.span>
              )}
              {open && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
            </div>
          </div>

          {/* Project Board */}
          <div
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            onClick={() => {
              navigateTo('/project-board');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
              ${isProjectBoardActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'gap-3 px-4' : 'justify-center px-2'} py-2 rounded-[11px] transition-colors
              ${isProjectBoardActive
                  ? 'text-white'
                  : isDark ? 'text-gray-300' : 'text-gray-800'}`}
            >
              <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                <Folder size={open ? 20 : 22} className={isProjectBoardActive ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-700'} />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="font-normal"
                >
                  Project Board
                </motion.span>
              )}
              {open && (
                <ChevronDown
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMenu('project-board');
                  }}
                  className={`ml-auto h-4 w-4 transition-transform duration-300 ${expandedMenu === 'project-board' ? 'rotate-180' : ''}`}
                />
              )}
            </div>
          </div>
        </div>

        {/* Project Tree Structure - USING RADIX-STYLE WRAPPER */}
        {open && (
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
        )}

        <div className="space-y-2"> {/* Continued space-y-2 for consistent gap */}
          {/* Task Board */}
          <div
            className="group relative overflow-hidden rounded-xl cursor-pointer"
            onClick={() => {
              navigateTo('/task-board');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
              ${isTaskBoardActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'gap-3 px-4' : 'justify-center px-2'} py-2 rounded-[11px] transition-colors
              ${isTaskBoardActive
                  ? 'text-white'
                  : isDark ? 'text-gray-300' : 'text-gray-800'}`}
            >
              <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                <FileText size={open ? 20 : 22} className={isTaskBoardActive ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-700'} />
              </motion.div>
              {open && (
                <motion.span
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.125 }}
                  className="font-normal"
                >
                  Task Board
                </motion.span>
              )}
              {open && (
                <ChevronDown
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleMenu('task-board');
                  }}
                  className={`ml-auto h-4 w-4 transition-transform duration-300 ${expandedMenu === 'task-board' ? 'rotate-180' : ''}`}
                />
              )}
            </div>
          </div>
        </div>

        {/* Task Board Structure - USING RADIX-STYLE WRAPPER */}
        {open && (
          <RadixMenuWrapper expanded={expandedMenu === 'task-board'} menuName={'task-board'}>
            <div className={`border-l space-y-1 ${borderClass}`}>

              {taskBoardSubMenus.map((item) => (
                <div key={item.name}>
                  <div className={`relative group flex items-center gap-3 pl-6 py-2 cursor-pointer ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-700 hover:text-black'}`}>
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

                  {/* Submenus rendering */}
                  {item.subItems && (
                    <div className="relative ml-6 mt-1 space-y-0">
                      {item.subItems.map((sub, idx, arr) => (
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
        )}

        {/* Schedule, Activities, Inbox, Template, Market Places */}
        <div className="space-y-2"> {/* space-y-1 -> space-y-2 for consistent gap */}
          {/* Schedule */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => {
              navigateTo('/schedule');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${isScheduleActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2 transition-colors
                ${isScheduleActive
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className={`flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
                <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                  <Calendar size={open ? 20 : 22} />
                </motion.div>
                {open && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-base font-normal"
                  >
                    Schedule
                  </motion.span>
                )}
              </div>
              {open && <span className={`text-xs ${isScheduleActive ? 'text-white/80' : isDark ? 'text-gray-500' : 'text-gray-600'}`}>June, 28, 2023</span>}
            </div>
          </div>

          {/* Activities */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => {
              navigateTo('/activities');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${isActivitiesActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2 transition-colors
                ${isActivitiesActive
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className={`flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
                <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                  <Activity size={open ? 20 : 22} />
                </motion.div>
                {open && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-base font-normal"
                  >
                    Activities
                  </motion.span>
                )}
              </div>
              {open && (
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-100 px-2 py-0.5 rounded">
                  New
                </span>
              )}
            </div>
          </div>

          {/* Inbox */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => {
              navigateTo('/inbox');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${isInboxActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2 transition-colors
                ${isInboxActive
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className={`flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
                <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                  <Inbox size={open ? 20 : 22} />
                </motion.div>
                {open && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-base font-normal"
                  >
                    Inbox
                  </motion.span>
                )}
              </div>
              {open && (
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className={`w-5 h-5 rounded-full bg-purple-500 border-2 ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
                    <div className={`w-5 h-5 rounded-full bg-teal-500 border-2 ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
                  </div>
                  <span className={`text-[10px] font-bold ${isInboxActive ? 'text-white' : isDark ? 'text-gray-500' : 'text-gray-700'}`}>24</span>
                </div>
              )}
            </div>
          </div>

          {/* Template */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => {
              navigateTo('/template');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${isTemplateActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2 transition-colors
                ${isTemplateActive
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className={`flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
                <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                  <Layout size={open ? 20 : 22} />
                </motion.div>
                {open && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-base font-normal"
                  >
                    Template
                  </motion.span>
                )}
              </div>
              {open && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                ${isTemplateActive
                    ? 'bg-white/20 text-white'
                    : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  12
                </span>
              )}
            </div>
          </div>

          {/* Market Places */}
          <div
            className="relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => {
              navigateTo('/market-places');
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600 transition-opacity duration-200
                ${isMarketPlacesActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
            />
            <div
              className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2 transition-colors
                ${isMarketPlacesActive
                  ? 'text-white'
                  : textMuted}`}
            >
              <div className={`flex items-center ${open ? 'gap-3' : 'justify-center'}`}>
                <motion.div layout className={`grid h-full ${open ? 'w-10' : 'w-full'} place-content-center text-lg`}>
                  <Store size={open ? 20 : 22} />
                </motion.div>
                {open && (
                  <motion.span
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="text-base font-normal"
                  >
                    Market Places
                  </motion.span>
                )}
              </div>
              {open && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                ${isMarketPlacesActive
                    ? 'bg-white/20 text-white'
                    : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  5
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Card */}
      <div className={`mt-auto ${open ? 'p-6 pb-4' : 'p-4 pb-2'}`}>
        {open && (
          <>
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
          </>
        )}

        {/* Theme Toggle - Always visible when collapsed */}
        {!open && (
          <div className="flex justify-center mb-2">
            <div className={`flex items-center rounded-full p-1 border transition-colors 
              ${isDark ? 'bg-black/40 border-gray-800' : 'bg-gray-100 border-rose-200'}`}>
              <button
                onClick={() => setGlobalTheme(false)}
                className={`p-1.5 rounded-full transition-all duration-300 ${!isDark ? 'bg-white text-amber-500 shadow-sm' : 'text-gray-600 hover:text-gray-400'}`}
              >
                <Sun size={16} />
              </button>
              <button
                onClick={() => setGlobalTheme(true)}
                className={`p-1.5 rounded-full transition-all duration-300 ${isDark ? 'bg-[#2c2d31] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Moon size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Toggle Close Button - Fixed at Bottom of Viewport */}
      <motion.button
        layout
        onClick={() => setOpen((pv) => !pv)}
        className={`fixed bottom-0 left-0 border-t transition-colors z-50
          ${isDark
            ? 'border-gray-800 bg-[#0F1014] hover:bg-[#1a1b1e]'
            : 'border-rose-200 bg-rose-50 hover:bg-rose-100'}`}
        style={{
          width: open ? "300px" : "80px",
        }}
      >
        <div className={`flex items-center ${open ? 'justify-start px-4' : 'justify-center'} p-2`}>
          <motion.div
            layout
            className={`grid ${open ? 'size-10' : 'size-8'} place-content-center text-lg`}
          >
            <FiChevronsRight
              className={`transition-transform ${!open && "rotate-180"} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              size={open ? 20 : 18}
            />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              Hide
            </motion.span>
          )}
        </div>
      </motion.button>

    </motion.nav >
  );
}
