import { useState, useEffect } from 'react';
import { allTopics, allQuestions, allChallenges } from './data';
import { Sidebar } from './components/Sidebar';
import { LearnTab } from './components/LearnTab';
import { InterviewTab } from './components/InterviewTab';
import { PracticeTab } from './components/PracticeTab';
import { PlaygroundTab } from './components/PlaygroundTab';
import { GeminiTab } from './components/GeminiTab';
import type { Topic } from './data/types';
import { CheckSquare, BookOpen, GraduationCap, Sparkles, Terminal, Sun, Moon, Menu } from 'lucide-react';

export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(allTopics[0] || null);
  const [activeTab, setActiveTab] = useState<'learn' | 'interview' | 'practice' | 'playground' | 'gemini'>('learn');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <header className="main-header">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button 
              className="menu-toggle-btn" 
              onClick={() => setIsSidebarOpen(true)}
              title="Open Sidebar"
            >
              <Menu size={20} />
            </button>
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

          <div className="tabs-container" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'var(--bg-inner)',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid var(--border-glass)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
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

          {/* Theme Toggle Button */}
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
