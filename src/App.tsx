import { useState, useEffect } from 'react';
import { allTopics, allQuestions, allChallenges } from './data';
import { Sidebar } from './components/Sidebar';
import { LearnTab } from './components/LearnTab';
import { InterviewTab } from './components/InterviewTab';
import { PracticeTab } from './components/PracticeTab';
import { PlaygroundTab } from './components/PlaygroundTab';
import { GeminiTab } from './components/GeminiTab';
import type { Topic } from './data/types';
import { CheckSquare, BookOpen, GraduationCap, Sparkles, Terminal, Sun, Moon, Menu, ChevronDown } from 'lucide-react';

export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(allTopics[0] || null);
  const [activeTab, setActiveTab] = useState<'learn' | 'interview' | 'practice' | 'playground' | 'gemini'>('learn');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sync theme with document element and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load completed items from localStorage
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('de_completed_topics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedChallenges, setCompletedChallenges] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('de_completed_challenges');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleTopicCompleted = () => {
    if (!activeTopic) return;
    const updated = {
      ...completedTopics,
      [activeTopic.id]: !completedTopics[activeTopic.id]
    };
    setCompletedTopics(updated);
    localStorage.setItem('de_completed_topics', JSON.stringify(updated));
  };

  const markChallengeCompleted = (challengeId: string) => {
    const updated = {
      ...completedChallenges,
      [challengeId]: true
    };
    setCompletedChallenges(updated);
    localStorage.setItem('de_completed_challenges', JSON.stringify(updated));
  };

  // Filter questions and challenges for the active category
  const currentQuestions = allQuestions.filter(q => q.category === activeTopic?.category);

  return (
    <div className="app-container">
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar
        topics={allTopics}
        activeTopic={activeTopic}
        setActiveTopic={(t) => {
          setActiveTopic(t);
          setActiveTab('learn');
        }}
        completedTopics={completedTopics}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="main-content">
        <header className="main-header" style={{ position: 'relative' }}>

          {/* ========================================================= */}
          {/* MOBILE HEADER (Rendered only on mobile)                   */}
          {/* ========================================================= */}
          <div className="mobile-only" style={{ flexDirection: 'column', gap: '16px', width: '100%' }}>

            {/* Mobile Row 1: Menu Button & Centered Logo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <button
                className="menu-toggle-btn"
                onClick={() => setIsSidebarOpen(true)}
                title="Open Sidebar"
                style={{ position: 'absolute', left: 0 }}
              >
                <Menu size={20} />
              </button>
              <span style={{
                fontSize: '18px',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                CN-DESIGN
              </span>
            </div>

            {/* Mobile Row 2: Dropdown Menu & Theme Toggle */}
            <div style={{ display: 'flex', gap: '8px', position: 'relative', width: '100%' }}>
              {/* Custom Dropdown Trigger */}
              <div
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg-inner)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  fontWeight: 500,
                  boxShadow: 'var(--shadow-glass)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activeTab === 'learn' && <><BookOpen size={16} /> Learn</>}
                  {activeTab === 'interview' && <><GraduationCap size={16} /> Interview Prep</>}
                  {activeTab === 'practice' && <><CheckSquare size={16} /> Coding Practice</>}
                  {activeTab === 'playground' && <><Terminal size={16} /> Playground</>}
                  {activeTab === 'gemini' && <><Sparkles size={16} color="#a855f7" /> Ask Gemini</>}
                </div>
                <ChevronDown size={18} className="text-muted" style={{ transform: isMobileMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </div>

              {/* Custom Dropdown Menu */}
              {isMobileMenuOpen && (
                <>
                  <div 
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 90 }} 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(false);
                    }}
                  />
                  <div
                    className="glass-panel animate-slide-up"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      marginTop: '8px',
                      width: 'calc(100% - 56px)', // Accounting for the gap and toggle button width
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      padding: '8px',
                      gap: '4px',
                      background: 'var(--bg-primary)'
                    }}
                  >
                  {[
                    { id: 'learn', label: 'Learn', icon: BookOpen },
                    { id: 'interview', label: 'Interview Prep', icon: GraduationCap },
                    { id: 'practice', label: 'Coding Practice', icon: CheckSquare },
                    { id: 'playground', label: 'Playground', icon: Terminal },
                    { id: 'gemini', label: 'Ask Gemini', icon: Sparkles, color: '#a855f7' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        setIsMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px',
                        borderRadius: '8px',
                        background: activeTab === item.id ? 'var(--bg-inner-active)' : 'transparent',
                        border: 'none',
                        color: activeTab === item.id ? 'var(--text-primary)' : 'var(--text-muted)',
                        fontSize: '14px',
                        fontWeight: activeTab === item.id ? 600 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <item.icon size={16} color={item.color || 'currentColor'} />
                      {item.label}
                    </button>
                  ))}
                </div>
                </>
              )}

              <button
                onClick={toggleTheme}
                className="tab-btn theme-toggle"
                style={{
                  padding: '0 16px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-inner)',
                  border: '1px solid var(--border-glass)',
                  color: theme === 'dark' ? '#facc15' : '#3b82f6',
                  boxShadow: 'var(--shadow-glass)'
                }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Row 3: Topic Title (Left) & Difficulty (Right) */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: '4px' }}>
              <h1 style={{
                margin: 0,
                fontSize: '16px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-muted) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                textAlign: 'left',
                flex: 1,
                paddingRight: '12px'
              }}>
                {activeTab === 'playground' ? 'Interactive Playground' : activeTopic ? activeTopic.title : 'Data Engineering Prep'}
              </h1>

              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                {activeTab === 'playground' ? '' : activeTopic ? (
                  <>
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: activeTopic.difficulty === 'beginner' ? '#10b981' : activeTopic.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444'
                    }} />
                    {activeTopic.difficulty.charAt(0).toUpperCase() + activeTopic.difficulty.slice(1)}
                  </>
                ) : ''}
              </span>
            </div>


          </div>

          {/* ========================================================= */}
          {/* DESKTOP HEADER (Rendered only on desktop)                 */}
          {/* ========================================================= */}
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{
                  margin: 0,
                  fontSize: '22px',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-muted) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px'
                }}>
                  {activeTab === 'playground' ? 'Interactive Playground' : activeTopic ? activeTopic.title : 'Data Engineering Prep'}
                </h1>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {activeTab === 'playground' ? 'SQL & PySpark Sandboxes' : activeTopic ? (
                    <>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: activeTopic.difficulty === 'beginner' ? '#10b981' : activeTopic.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444'
                      }} />
                      {activeTopic.difficulty.charAt(0).toUpperCase() + activeTopic.difficulty.slice(1)}
                    </>
                  ) : ''}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="tabs-container" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-inner)',
                padding: '4px',
                borderRadius: '10px',
                border: '1px solid var(--border-glass)',
                boxShadow: 'var(--shadow-inset-tabs)'
              }}>
                <button
                  className={`tab-btn ${activeTab === 'learn' ? 'active' : ''}`}
                  onClick={() => setActiveTab('learn')}
                  style={{ borderRadius: '8px', padding: '6px 14px' }}
                >
                  <BookOpen size={15} />
                  Learn
                </button>
                <button
                  className={`tab-btn ${activeTab === 'interview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('interview')}
                  style={{ borderRadius: '8px', padding: '6px 14px' }}
                >
                  <GraduationCap size={15} />
                  Interview Prep
                </button>
                <button
                  className={`tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
                  onClick={() => setActiveTab('practice')}
                  style={{ borderRadius: '8px', padding: '6px 14px' }}
                >
                  <CheckSquare size={15} />
                  Coding Practice
                </button>
                <button
                  className={`tab-btn ${activeTab === 'playground' ? 'active' : ''}`}
                  onClick={() => setActiveTab('playground')}
                  style={{ borderRadius: '8px', padding: '6px 14px' }}
                >
                  <Terminal size={15} />
                  Playground
                </button>
                <button
                  className={`tab-btn ${activeTab === 'gemini' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gemini')}
                  style={{ borderRadius: '8px', padding: '6px 14px' }}
                >
                  <Sparkles size={15} color="#a855f7" />
                  Ask Gemini
                </button>
              </div>

              {/* Theme Toggle Button (Desktop) */}
              <button
                onClick={toggleTheme}
                className="tab-btn theme-toggle"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                style={{
                  marginLeft: '12px',
                  padding: '10px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--bg-inner)',
                  border: '1px solid var(--border-glass)',
                  cursor: 'pointer',
                  color: theme === 'dark' ? '#facc15' : '#3b82f6',
                  boxShadow: 'var(--shadow-glass)',
                  transition: 'all 0.3s ease'
                }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </header>

        <div className="tab-content animate-fade-in" key={activeTab}>
          {activeTab === 'learn' && (
            <LearnTab
              topic={activeTopic}
              isCompleted={!!completedTopics[activeTopic?.id || '']}
              onToggleComplete={toggleTopicCompleted}
            />
          )}

          {activeTab === 'interview' && (
            <InterviewTab
              topic={activeTopic}
              questions={currentQuestions}
            />
          )}

          {activeTab === 'practice' && (
            <PracticeTab
              challenges={allChallenges}
              onCompleteChallenge={markChallengeCompleted}
              theme={theme}
            />
          )}

          {activeTab === 'playground' && (
            <PlaygroundTab theme={theme} />
          )}

          {activeTab === 'gemini' && (
            <GeminiTab topic={activeTopic} />
          )}
        </div>
      </main>
    </div>
  );
}
