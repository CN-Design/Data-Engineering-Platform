import { useState, useEffect } from 'react';
import { allTopics } from './domains/data-engineering/data';
import { Sidebar } from './core/components/Sidebar';
import { LearnTab } from './domains/data-engineering/components/LearnTab';
import { InterviewPrepTab } from './domains/data-engineering/components/InterviewPrepTab';
import { PracticeTab } from './domains/data-engineering/components/PracticeTab';
import { PlaygroundTab } from './domains/data-engineering/components/PlaygroundTab';
import { ProjectsTab } from './domains/data-engineering/components/ProjectsTab';
import { setLastTopic as setDeLastTopic } from './domains/data-engineering/utils/learnProgress';
import { recordActivityToday as recordDeActivity } from './domains/data-engineering/utils/engagement';
import { GeminiTab } from './domains/data-engineering/components/GeminiTab';
import { Dashboard } from './core/components/Dashboard';
import type { Topic, Category, Domain, CodingChallenge } from './core/types/types';
import { CheckSquare, BookOpen, GraduationCap, Sparkles, Terminal, Sun, Moon, Menu, ChevronDown, ArrowLeft, Rocket } from 'lucide-react';
import { PathSelection } from './domains/data-engineering/components/PathSelection';
import { FrontendLearnTab } from './domains/frontend/components/FrontendLearnTab';
import { FrontendPlaygroundTab } from './domains/frontend/components/FrontendPlaygroundTab';
import { FrontendPracticeTab } from './domains/frontend/components/FrontendPracticeTab';
import { loadFrontendManifest, manifestToTopics } from './domains/frontend/loader';
import { BackendLearnTab } from './domains/backend-engineering/components/BackendLearnTab';
import { BackendPracticeTab } from './domains/backend-engineering/components/BackendPracticeTab';
import { loadBackendManifest, manifestToTopics as backendManifestToTopics } from './domains/backend-engineering/loader';
import { AiAgentLearnTab } from './domains/ai-agents/components/AiAgentLearnTab';
import { AiAgentPracticeTab } from './domains/ai-agents/components/AiAgentPracticeTab';
import { loadAgentManifest, manifestToTopics as agentManifestToTopics } from './domains/ai-agents/loader';

export default function App() {
  const [activeTopic, setActiveTopic] = useState<Topic | null>(allTopics[0] || null);
  const [currentDomain, setCurrentDomain] = useState<'dashboard' | Domain>('dashboard');
  const [selectedTech, setSelectedTech] = useState<Category | null>(null);
  const [frontendTopics, setFrontendTopics] = useState<Topic[]>([]);
  const [backendTopics, setBackendTopics] = useState<Topic[]>([]);
  const [aiTopics, setAiTopics] = useState<Topic[]>([]);
  const [activeTab, setActiveTab] = useState<'learn' | 'interview' | 'practice' | 'projects' | 'playground' | 'gemini'>('learn');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // DE coding challenges (~1.2MB) are code-split: loaded only when the DE
  // Practice tab is first opened, keeping them out of the initial bundle.
  const [deChallenges, setDeChallenges] = useState<CodingChallenge[]>([]);

  useEffect(() => {
    if (activeTab !== 'practice' || currentDomain !== 'data-engineering' || deChallenges.length) return;
    let cancelled = false;
    import('./domains/data-engineering/data/coding_challenges').then(m => {
      if (!cancelled) setDeChallenges(m.codingChallenges);
    });
    return () => { cancelled = true; };
  }, [activeTab, currentDomain, deChallenges.length]);

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
    // Record a real activity day when a topic is marked complete (fuels streak/XP).
    // The engagement engine is shared across domains, so backend/frontend count too.
    if (updated[activeTopic.id]) recordDeActivity();
  };

  const markChallengeCompleted = (challengeId: string) => {
    const updated = {
      ...completedChallenges,
      [challengeId]: true
    };
    setCompletedChallenges(updated);
    localStorage.setItem('de_completed_challenges', JSON.stringify(updated));
  };

  if (currentDomain === 'dashboard') {
    return <Dashboard onSelectDomain={(d) => {
      setCurrentDomain(d as any);
      setSelectedTech(null); // Reset tech selection on domain change
    }} />;
  }

  const isFrontend = currentDomain === 'frontend';
  const isBackend = currentDomain === 'backend-engineering';
  const isAiAgents = currentDomain === 'ai-agents';

  if ((currentDomain === 'data-engineering' || currentDomain === 'frontend' || currentDomain === 'backend-engineering' || currentDomain === 'ai-agents') && !selectedTech) {
    return <PathSelection
      domain={currentDomain}
      onSelectTech={async (tech, topicId) => {
        setSelectedTech(tech);
        setActiveTab('learn');
        if (currentDomain === 'frontend') {
          const manifest = await loadFrontendManifest(tech);
          const topics = manifest ? manifestToTopics(manifest) : [];
          setFrontendTopics(topics);
          setActiveTopic(topics[0] || null);
        } else if (currentDomain === 'backend-engineering') {
          const manifest = await loadBackendManifest(tech);
          const topics = manifest ? backendManifestToTopics(manifest) : [];
          setBackendTopics(topics);
          // Deep-link to a specific topic (resume / due-for-revision) when requested.
          setActiveTopic((topicId && topics.find(t => t.id === topicId)) || topics[0] || null);
        } else if (currentDomain === 'ai-agents') {
          const manifest = await loadAgentManifest(tech);
          const topics = manifest ? agentManifestToTopics(manifest) : [];
          setAiTopics(topics);
          setActiveTopic((topicId && topics.find(t => t.id === topicId)) || topics[0] || null);
        } else {
          const techTopics = allTopics.filter(t => t.category === tech);
          // Deep-link to a specific topic when requested (resume / due-for-revision),
          // otherwise start at the track's first topic.
          const target = (topicId && techTopics.find(t => t.id === topicId)) || techTopics[0];
          if (target) {
            setActiveTopic(target);
            setDeLastTopic(target.id);
          }
        }
      }}
      onBack={() => setCurrentDomain('dashboard')}
    />;
  }

  // Filter topics for the sidebar based on selected tech / domain.
  const sidebarTopics = isFrontend ? frontendTopics : isBackend ? backendTopics : isAiAgents ? aiTopics : allTopics.filter(t => t.category === selectedTech);
  
  const currentTopicIndex = sidebarTopics.findIndex(t => t.id === activeTopic?.id);
  const previousTopic = currentTopicIndex > 0 ? sidebarTopics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex >= 0 && currentTopicIndex < sidebarTopics.length - 1 ? sidebarTopics[currentTopicIndex + 1] : null;

  return (
    <div className="app-container">
      <div
        className={`sidebar-backdrop ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <Sidebar
        topics={sidebarTopics}
        activeTopic={activeTopic}
        setActiveTopic={(t) => {
          setActiveTopic(t);
          setActiveTab('learn');
          if (currentDomain === 'data-engineering') setDeLastTopic(t.id);
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', width: '100%', minHeight: '36px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
                <button
                  className="menu-toggle-btn"
                  onClick={() => setIsSidebarOpen(true)}
                  title="Open Sidebar"
                >
                  <Menu size={20} />
                </button>
                <button
                  onClick={() => setSelectedTech(null)}
                  title="Back to Tech Selection"
                  style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', 
                    padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)'
                  }}
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <img src="/logo.svg" alt="CN-DESIGN Logo" style={{ width: '32px', height: '32px' }} />
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
                  {activeTab === 'projects' && <><Rocket size={16} /> Projects</>}
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
                    ...(!isFrontend ? [{ id: 'projects', label: 'Projects', icon: Rocket }] : []),
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
                {activeTab === 'playground' ? 'Interactive Playground' :
                 activeTab === 'learn' ? (activeTopic ? activeTopic.title : 'Data Engineering Prep') :
                 activeTab === 'interview' ? 'Interview Preparation' :
                 activeTab === 'practice' ? 'Coding Practice' :
                 activeTab === 'projects' ? 'Projects' :
                 'Ask Gemini'}
              </h1>

              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
                {activeTab === 'learn' && activeTopic ? (
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                onClick={() => setSelectedTech(null)}
                title="Back to Tech Selection"
                style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', 
                  padding: '8px', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-muted)'
                }}
              >
                <ArrowLeft size={20} />
              </button>
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
                {!isFrontend && (
                  <button
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                    style={{ borderRadius: '8px', padding: '6px 14px' }}
                  >
                    <Rocket size={15} />
                    Projects
                  </button>
                )}
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
          {/* ========================================================= */}
          {/* DESKTOP TOPIC TITLE & DIFFICULTY (Below header)           */}
          {/* ========================================================= */}
          {!(isFrontend && activeTab === 'learn') && (
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '24px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--text-muted) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              {activeTab === 'playground' ? 'Interactive Playground' :
               activeTab === 'learn' ? (activeTopic ? activeTopic.title : 'Data Engineering Prep') :
               activeTab === 'interview' ? 'Interview Preparation' :
               activeTab === 'practice' ? 'Coding Practice' :
               activeTab === 'projects' ? 'Build-Along Projects' :
               'Ask Gemini'}
            </h1>
            <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-inner)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
              {activeTab === 'playground' ? 'SQL & PySpark Sandboxes' : 
               activeTab === 'learn' && activeTopic ? (
                <>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: activeTopic.difficulty === 'beginner' ? '#10b981' : activeTopic.difficulty === 'intermediate' ? '#f59e0b' : '#ef4444',
                    boxShadow: activeTopic.difficulty === 'beginner' ? '0 0 8px rgba(16,185,129,0.4)' : activeTopic.difficulty === 'intermediate' ? '0 0 8px rgba(245,158,11,0.4)' : '0 0 8px rgba(239,68,68,0.4)'
                  }} />
                  {activeTopic.difficulty.charAt(0).toUpperCase() + activeTopic.difficulty.slice(1)}
                </>
              ) : activeTab === 'interview' ? 'Q&A Flashcards' :
                 activeTab === 'practice' ? 'Interactive Challenges' :
                 activeTab === 'projects' ? 'Portfolio-Ready Builds' :
                 'AI Assistant'}
            </span>
          </div>
          )}
          {activeTab === 'learn' && (
            isFrontend && selectedTech ? (
              <FrontendLearnTab
                tech={selectedTech}
                topicId={activeTopic?.id || null}
                topics={frontendTopics.map(t => ({ id: t.id, title: t.title }))}
                onNavigate={(id) => { const t = frontendTopics.find(x => x.id === id); if (t) setActiveTopic(t); }}
                isCompleted={!!completedTopics[activeTopic?.id || '']}
                onToggleComplete={toggleTopicCompleted}
                onPrev={previousTopic ? () => setActiveTopic(previousTopic) : undefined}
                onNext={nextTopic ? () => setActiveTopic(nextTopic) : undefined}
                prevTitle={previousTopic?.title}
                nextTitle={nextTopic?.title}
              />
            ) : isBackend && selectedTech ? (
              <BackendLearnTab
                tech={selectedTech}
                topicId={activeTopic?.id || null}
                topics={backendTopics.map(t => ({ id: t.id, title: t.title }))}
                onNavigate={(id) => { const t = backendTopics.find(x => x.id === id); if (t) setActiveTopic(t); }}
                isCompleted={!!completedTopics[activeTopic?.id || '']}
                onToggleComplete={toggleTopicCompleted}
                onPrev={previousTopic ? () => setActiveTopic(previousTopic) : undefined}
                onNext={nextTopic ? () => setActiveTopic(nextTopic) : undefined}
                prevTitle={previousTopic?.title}
                nextTitle={nextTopic?.title}
                theme={theme}
              />
            ) : isAiAgents && selectedTech ? (
              <AiAgentLearnTab
                tech={selectedTech}
                topicId={activeTopic?.id || null}
                topics={aiTopics.map(t => ({ id: t.id, title: t.title }))}
                onNavigate={(id) => { const t = aiTopics.find(x => x.id === id); if (t) setActiveTopic(t); }}
                isCompleted={!!completedTopics[activeTopic?.id || '']}
                onToggleComplete={toggleTopicCompleted}
                onPrev={previousTopic ? () => setActiveTopic(previousTopic) : undefined}
                onNext={nextTopic ? () => setActiveTopic(nextTopic) : undefined}
                prevTitle={previousTopic?.title}
                nextTitle={nextTopic?.title}
                theme={theme}
              />
            ) : (
              <LearnTab
                topic={activeTopic}
                isCompleted={!!completedTopics[activeTopic?.id || '']}
                onToggleComplete={toggleTopicCompleted}
                onPrevious={previousTopic ? () => setActiveTopic(previousTopic) : undefined}
                onNext={nextTopic ? () => setActiveTopic(nextTopic) : undefined}
                siblingTopics={sidebarTopics}
                onNavigateTopic={(t) => { setActiveTopic(t); setDeLastTopic(t.id); }}
              />
            )
          )}

          {activeTab === 'interview' && selectedTech && (
            <InterviewPrepTab tech={selectedTech} />
          )}

          {activeTab === 'practice' && (
            isFrontend && selectedTech ? (
              <FrontendPracticeTab tech={selectedTech} theme={theme} />
            ) : isBackend && selectedTech ? (
              <BackendPracticeTab tech={selectedTech} theme={theme} />
            ) : isAiAgents ? (
              <AiAgentPracticeTab theme={theme} />
            ) : deChallenges.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '60px', color: 'var(--text-secondary)' }}>
                Loading coding challenges…
              </div>
            ) : (
              <PracticeTab
                challenges={deChallenges}
                onCompleteChallenge={markChallengeCompleted}
                theme={theme}
              />
            )
          )}

          {activeTab === 'projects' && !isFrontend && (
            isBackend ? (
              <ProjectsTab
                dataUrl="/content/backend/golang/projects.json"
                heading="Go Build-Along Projects"
                blurb={<>A portfolio-ready ladder of real Go services — from a JSON REST API to a resilient gRPC microservice. Each project builds on the last, with staged milestones, tasks, acceptance criteria, and hints. Work top to bottom, check off milestones as you go, and finish with builds you can put on your resume and defend in interviews.</>}
              />
            ) : isAiAgents ? (
              <ProjectsTab
                dataUrl="/content/ai-agents/projects.json"
                progressKey="de_project_progress"
                heading="AI Agent Build-Along Projects"
                blurb={<>A portfolio-ready ladder of real AI agents — from a tool-using agent built from scratch to a production, evaluated, guard-railed multi-agent system. Each project builds on the last, with staged milestones, tasks, acceptance criteria, and hints. Bring your own model API key to run them locally.</>}
              />
            ) : (
              <ProjectsTab />
            )
          )}

          {activeTab === 'playground' && (
            isBackend
              ? <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Go runs locally — use the editable Code Lab inside each lesson, or the Practice tab, and verify with <code>go test ./...</code>.</div>
              : isAiAgents
              ? <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Agents need an API key &amp; network — use the interactive playgrounds inside each lesson, and copy Code Lab snippets to run locally with your provider key.</div>
              : isFrontend ? <FrontendPlaygroundTab theme={theme} /> : <PlaygroundTab theme={theme} />
          )}

          {activeTab === 'gemini' && (
            <GeminiTab topic={activeTopic} />
          )}
        </div>
      </main>
    </div>
  );
}
