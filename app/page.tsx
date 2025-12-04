'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import FiltersBar from '@/components/FiltersBar';
import LastProjects from '@/components/LastProjects';
import TeamInsights from '@/components/TeamInsights';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('Card');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar view={view} setView={setView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className={`flex-1 overflow-y-auto transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-teal-50'}`}>
          {/* Calendar View */}
          <CalendarView view={view} setView={setView} />

          {/* Bottom Section */}
          {view !== 'Board' && (
            <div className="px-6 pb-6 space-y-6">
              <FiltersBar />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <LastProjects />
                <TeamInsights />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
