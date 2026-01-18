
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar, Notification } from './components/TopBar';
import { MainDashboard } from './components/MainDashboard';
import { RightPanel } from './components/RightPanel';
import { FullCalendarPage } from './components/FullCalendarPage';
import { EventsPage, EVENTS_MOCK, CampusEvent } from './components/EventsPage';
import { MiniFloatingCalendar } from './components/MiniFloatingCalendar';
import { LoginPage } from './components/LoginPage';
import { MessageSquareWarning, Ghost, ArrowRight, X, Radio, BellRing, Layout } from 'lucide-react';

// Helper to strictly parse event dates for comparison
const parseEventDate = (dateStr: string) => {
  // Expected format: "DD Mon YYYY" e.g. "15 Feb 2026"
  const parts = dateStr.split(' ');
  if (parts.length < 3) return new Date(); // Fallback to now if format is weird
  
  const monthMap: Record<string, number> = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  
  const day = parseInt(parts[0]);
  const month = monthMap[parts[1]] || 0;
  const year = parseInt(parts[2]);
  
  return new Date(year, month, day);
};

interface ToastItem {
  id: number;
  text: string;
  eventName: string;
  eventId: string;
  isExiting: boolean;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMiniCalendarOpen, setIsMiniCalendarOpen] = useState(false);
  const [selectedGlobalDate, setSelectedGlobalDate] = useState<number | null>(null);
  const [exploringEventId, setExploringEventId] = useState<string | null>(null);
  
  // Transition State for Events Tab
  const [showEventsSplash, setShowEventsSplash] = useState(false);

  // State to track if we are in a deep detail view (to hide navbars)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // Global Mocking State
  const [interestedIds, setInterestedIds] = useState<Set<string>>(new Set());
  const [notInterestedIds, setNotInterestedIds] = useState<Set<string>>(new Set());
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  
  // Initialize with some IDs already "viewed" so the user doesn't see everything as NEW
  const [viewedEventIds, setViewedEventIds] = useState<Set<string>>(new Set(['e_mumbai', 'e2', 'e_design', 'e_cloud'])); 

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastsRef = useRef<ToastItem[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Keep toastsRef in sync
  useEffect(() => {
    toastsRef.current = toasts;
  }, [toasts]);

  // Calculate unopened events count
  const unopenedEventsCount = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    return EVENTS_MOCK.filter(e => {
      const eDate = parseEventDate(e.date);
      // Ignore past events
      if (eDate < today) return false;
      // If already viewed, ignore
      if (viewedEventIds.has(e.id)) return false;
      return true;
    }).length;
  }, [viewedEventIds]);

  const handleTabChange = (tab: string) => {
    if (tab === 'Events' && activeTab !== 'Events') {
      // Trigger the Splash Screen Transition for Events
      setShowEventsSplash(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleSplashComplete = () => {
    setShowEventsSplash(false);
    setActiveTab('Events');
  };

  const handleEventView = (id: string) => {
    setViewedEventIds(prev => new Set([...prev, id]));
  };

  const handleLogin = () => {
    setActiveTab('Home');
  };

  // Create a tutorial overlay ref
  const tutorialRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#0d1117' }}>
      {activeTab !== 'Login' && <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />}
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {activeTab !== 'Login' && <TopBar activeTab={activeTab} unopenedEventsCount={unopenedEventsCount} isMiniCalendarOpen={isMiniCalendarOpen} setIsMiniCalendarOpen={setIsMiniCalendarOpen} />}
        
        <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#0d1117' }}>
          {activeTab === 'Login' && <LoginPage onLogin={handleLogin} />}
          {activeTab === 'Home' && (
            <div style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#0d1117', minHeight: '100%' }}>
              <MainDashboard />
              <RightPanel />
            </div>
          )}
          {activeTab === 'Events' && !showEventsSplash && <EventsPage exploringEventId={exploringEventId} setExploringEventId={setExploringEventId} setIsDetailsOpen={setIsDetailsOpen} onEventView={handleEventView} onViewedEventsChange={() => {}} interestedIds={interestedIds} setInterestedIds={setInterestedIds} notInterestedIds={notInterestedIds} setNotInterestedIds={setNotInterestedIds} registeredIds={registeredIds} setRegisteredIds={setRegisteredIds} />}
          {activeTab === 'Events' && showEventsSplash && <EventsPage.Splash onComplete={handleSplashComplete} />}
          {activeTab === 'Calendar' && <FullCalendarPage isMiniCalendarOpen={isMiniCalendarOpen} setIsMiniCalendarOpen={setIsMiniCalendarOpen} selectedDate={selectedGlobalDate} />}
        </div>
      </div>

      {isMiniCalendarOpen && <MiniFloatingCalendar onDateSelect={setSelectedGlobalDate} onClose={() => setIsMiniCalendarOpen(false)} />}
    </div>
  );
};

export default App;
