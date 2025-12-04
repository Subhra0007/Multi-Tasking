'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import FiltersBar from '@/components/FiltersBar';
import LastProjects from '@/components/LastProjects';
import TeamInsights from '@/components/TeamInsights';

type MenuName = 'dashboard' | 'project-board' | 'task-board' | 'schedule' | 'activities' | 'inbox' | 'template' | 'market-places' | null;

interface AppShellProps {
  defaultView?: string;
  activeMenu?: MenuName;
  children?: ReactNode;
}

export default function AppShell({
  defaultView = 'Dashboard',
  activeMenu = 'dashboard',
  children,
}: AppShellProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState(defaultView);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setView(defaultView);
  }, [defaultView]);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar view={view} setView={setView} activeMenu={activeMenu} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className={`flex-1 overflow-y-auto transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-teal-50'}`}>
          {children ?? (
            <>
              <CalendarView view={view} setView={setView} />

              {view !== 'Board' && (
                <div className="px-6 pb-6 space-y-6">
                  <FiltersBar />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LastProjects />
                    <TeamInsights />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

