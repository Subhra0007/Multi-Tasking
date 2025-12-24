'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from './Modal';
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
  const [modalData, setModalData] = useState<{ isOpen: boolean; title: string; content: React.ReactNode } | null>(null);
  const [showProjectTypes, setShowProjectTypes] = useState(false);

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
    return (
      <div
        className={`pl-4 mt-2 mb-4 overflow-hidden 
          ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        {children}
      </div>
    );
  };
  // ----------------------------------------------------

  return (
    <motion.nav
      layout
      className={`h-screen flex flex-col font-sans shrink-0 relative border-t
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
                <motion.div>
                  <div className={`font-bold text-lg min-w-[60px] ${isDark ? 'text-white' : 'text-gray-950'}`}>
                    Walter
                  </div>
                  <div className={`text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Designer Pro+</div>
                </motion.div>
              )}
            </div>
            {open && (
              <div className="flex gap-2">
                <button
                  onClick={() => setModalData({
                    isOpen: true,
                    title: 'Invite New Member',
                    content: (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>Email Address</label>
                          <input
                            type="email"
                            placeholder="colleague@synergy.io"
                            className={`w-full p-4 rounded-2xl border outline-none transition-all ${isDark ? 'bg-white/5 border-white/10 focus:border-teal-500' : 'bg-rose-50 border-rose-100 focus:border-rose-300'}`}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>Role Assignment</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Admin', 'Moderator', 'Editor'].map((role) => (
                              <button key={role} className={`py-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-rose-100 hover:bg-rose-50'}`}>
                                {role}
                              </button>
                            ))}
                          </div>
                        </div>
                        <button className="w-full py-4 bg-teal-500 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 active:scale-95 transition-all">
                          GENERATE INVITE
                        </button>
                      </div>
                    )
                  })}
                  className={`p-2 rounded-full ${hoverClass}`}
                >
                  <Plus size={18} className={isDark ? "text-gray-500" : "text-gray-700"} />
                </button>
                <button
                  onClick={() => setModalData({
                    isOpen: true,
                    title: 'Workspace Settings',
                    content: (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-rose-50 border-rose-100'}`}>
                            <div>
                              <div className="font-bold text-sm">Automated Sync</div>
                              <div className="text-[10px] text-gray-500 uppercase">Real-time cluster heartbeat</div>
                            </div>
                            <div className="w-10 h-5 bg-teal-500 rounded-full relative p-1 cursor-pointer">
                              <div className="w-3 h-3 bg-white rounded-full ml-auto"></div>
                            </div>
                          </div>
                          <div className={`p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-rose-50 border-rose-100'}`}>
                            <div>
                              <div className="font-bold text-sm">UI Hardening</div>
                              <div className="text-[10px] text-gray-500 uppercase">Glassmorphic occlusion depth</div>
                            </div>
                            <div className="w-10 h-5 bg-gray-600 rounded-full relative p-1 cursor-pointer">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Theme Architecture</div>
                          <div className="flex gap-4">
                            {['Neon Dark', 'Liquid Light', 'Cyber Amber'].map((preset) => (
                              <div key={preset} className={`flex-1 p-3 rounded-xl border text-[8px] font-bold text-center cursor-pointer transition-all ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-rose-100 hover:bg-rose-50'}`}>
                                {preset}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  className={`p-2 rounded-full ${hoverClass}`}
                >
                  <Settings size={18} className={isDark ? "text-gray-500" : "text-gray-700"} />
                </button>
              </div>
            )}
          </div>

          {/* 2. Search Bar */}
          {open && (
            <motion.div
              className="relative group"
            >
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isDark ? 'text-gray-500' : 'text-gray-600'}`} />
              <input
                type="text"
                placeholder="Redesign App"
                className={`w-full text-sm pl-10 pr-10 py-3 rounded-2xl border focus:outline-none 
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
              ${isDashboardActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'gap-3 px-4' : 'justify-center px-2'} py-2
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
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
                    className={`ml-auto h-4 w-4 ${expandedMenu === 'project-board' ? 'rotate-180' : ''}`}
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

                        <span className={`text-sm font-medium ${isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-900'}`}>{sub.name}</span>
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
              ${isTaskBoardActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'gap-3 px-4' : 'justify-center px-2'} py-2 rounded-[11px]
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

                            <span className={`text-sm font-medium ${isDark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-900'}`}>{sub.name}</span>
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
                ${isScheduleActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
                ${isActivitiesActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
                ${isInboxActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
                ${isTemplateActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2
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
                className={`absolute inset-0 bg-gradient-to-r from-teal-600 to-rose-600
                ${isMarketPlacesActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'}`}
              />
              <div
                className={`relative flex items-center ${open ? 'justify-between px-4' : 'justify-center px-2'} py-2
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
              <div className={`flex justify-between items-center p-2 rounded-2xl mb-2
                ${isDark ? 'bg-[#15161a]' : 'bg-white border border-rose-200 shadow-sm'}`}>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setModalData({
                      isOpen: true,
                      title: 'Recently Optimized Templates',
                      content: (
                        <div className="space-y-4">
                          {[
                            { name: 'Neon Brand Kit', type: 'Design', performance: '+24%' },
                            { name: 'API Cluster Hub', type: 'Dev', performance: '+18%' },
                            { name: 'Mesh Sharding', type: 'Infra', performance: '+32%' },
                          ].map((item, i) => (
                            <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-rose-50 border-rose-100'}`}>
                              <div>
                                <div className="font-bold text-sm">{item.name}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{item.type}</div>
                              </div>
                              <div className="text-teal-500 font-bold text-sm">{item.performance}</div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                    className={`p-2 transition-all hover:scale-110 active:scale-95 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                  >
                    <FileText size={18} />
                  </button>
                  <button
                    onClick={() => setModalData({
                      isOpen: true,
                      title: 'Active Sync Status',
                      content: (
                        <div className="space-y-4">
                          {[
                            { name: 'GitHub Integration', status: 'Synced', time: '2m ago' },
                            { name: 'Vercel Deployment', status: 'Live', time: '14m ago' },
                            { name: 'Database Replication', status: 'Active', time: '4m ago' },
                          ].map((item, i) => (
                            <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-rose-50 border-rose-100'}`}>
                              <div>
                                <div className="font-bold text-sm">{item.name}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{item.time}</div>
                              </div>
                              <div className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-500 text-[10px] font-bold uppercase">{item.status}</div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                    className={`p-2 transition-all hover:scale-110 active:scale-95 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                  >
                    <LinkIcon size={18} />
                  </button>
                  <button
                    onClick={() => setModalData({
                      isOpen: true,
                      title: 'Focus Token Wallet',
                      content: (
                        <div className="space-y-6">
                          <div className={`p-8 rounded-[32px] text-center border-2 border-dashed ${isDark ? 'bg-teal-500/5 border-teal-500/20' : 'bg-teal-50 border-teal-200'}`}>
                            <div className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-2 font-bold">Total Balance</div>
                            <div className="text-4xl font-black text-teal-500">1,250 FT</div>
                          </div>
                          <div className="space-y-3">
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Recent Gains</div>
                            {[
                              { event: 'Multi-tasking Streak', amount: '+50 FT' },
                              { event: 'Project Milestone', amount: '+200 FT' },
                            ].map((gain, i) => (
                              <div key={i} className="flex items-center justify-between text-xs pb-2 border-b border-gray-100 dark:border-gray-800">
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{gain.event}</span>
                                <span className="font-bold text-teal-500">{gain.amount}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                    className={`p-2 transition-all hover:scale-110 active:scale-95 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                  >
                    <Wallet size={18} />
                  </button>
                  <button
                    onClick={() => setModalData({
                      isOpen: true,
                      title: 'Multitasking Flow Presets',
                      content: (
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: 'Morning Burst', icon: <Sun size={14} />, color: 'bg-amber-500' },
                            { name: 'Night Owl', icon: <Moon size={14} />, color: 'bg-indigo-500' },
                            { name: 'Hyper Focus', icon: <LayoutGrid size={14} />, color: 'bg-teal-500' },
                            { name: 'Tea Break', icon: <Calendar size={14} />, color: 'bg-pink-500' },
                          ].map((flow, i) => (
                            <div key={i} className={`p-4 rounded-2xl border cursor-pointer hover:scale-[1.02] transition-all ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-rose-100 shadow-sm'}`}>
                              <div className={`w-8 h-8 rounded-full ${flow.color} flex items-center justify-center text-white mb-3`}>
                                {flow.icon}
                              </div>
                              <div className="font-bold text-xs">{flow.name}</div>
                            </div>
                          ))}
                        </div>
                      )
                    })}
                    className={`p-2 transition-all hover:scale-110 active:scale-95 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                  >
                    <Bookmark size={18} />
                  </button>
                </div>

                <div className={`h-8 w-[1px] mx-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}></div>

                {/* THEME TOGGLE (PILL STYLE) */}
                <div className={`flex items-center rounded-full p-1 border transition-all duration-300
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

              {/* Modal Display Area */}
              {modalData && (
                <Modal
                  isOpen={modalData.isOpen}
                  onClose={() => setModalData(null)}
                  title={modalData.title}
                  isDark={isDark}
                >
                  {modalData.content}
                </Modal>
              )}

              {/* Add New Project Card / Options */}
              <div className="relative min-h-[140px]">
                <AnimatePresence mode="wait">
                  {!showProjectTypes ? (
                    <motion.div
                      key="add-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setShowProjectTypes(true)}
                      className={`h-full border border-dashed rounded-[32px] p-6 text-center cursor-pointer transition-all group active:scale-[0.98]
                        ${isDark
                          ? 'border-gray-800 bg-[#121418] hover:border-gray-600 hover:bg-[#15171c]'
                          : 'border-rose-200 bg-white hover:border-rose-300 hover:bg-rose-50/50'
                        }`}
                    >
                      <div className="w-12 h-12 bg-[#ff0044] rounded-full flex items-center justify-center mx-auto mb-3 text-white shadow-[0_0_15px_rgba(255,0,68,0.2)] group-hover:scale-110 transition-transform">
                        <Plus size={24} />
                      </div>
                      <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Project</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Or use <span className="text-[#3b82f6] font-bold hover:underline">invite link</span>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="project-options"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`h-full border rounded-[32px] p-4 flex flex-col gap-2
                        ${isDark ? 'bg-[#1a1c22] border-gray-800' : 'bg-white border-rose-100 shadow-sm'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>Select Type</span>
                        <button onClick={() => setShowProjectTypes(false)} className="text-gray-500 hover:text-gray-300">
                          <Plus size={14} className="rotate-45" />
                        </button>
                      </div>
                      {['Marketing Campaign', 'System Refactor', 'New Product'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            alert(`Starting: ${type}`);
                            setShowProjectTypes(false);
                          }}
                          className={`w-full py-2 px-3 rounded-xl text-left text-xs font-bold transition-all
                            ${isDark ? 'hover:bg-gray-800 text-gray-300 hover:text-white' : 'hover:bg-rose-50 text-gray-700 hover:text-black'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Theme Toggle - Always visible when collapsed */}
          {!open && (
            <div className="flex justify-center mb-2">
              <div className={`flex items-center rounded-full p-1 border 
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
        className={`fixed bottom-0 left-0 border-t z-50
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
              className={`${!open && "rotate-180"} ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
              size={open ? 20 : 18}
            />
          </motion.div>
          {open && (
            <motion.span
              layout
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
