import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CalendarView from '@/components/CalendarView';
import FiltersBar from '@/components/FiltersBar';
import LastProjects from '@/components/LastProjects';
import TeamInsights from '@/components/TeamInsights';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-background">
          {/* Calendar View */}
          <CalendarView />

          {/* Bottom Section */}
          <div className="px-6 pb-6 space-y-6">
            <FiltersBar />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LastProjects />
              <TeamInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
