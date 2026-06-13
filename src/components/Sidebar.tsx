import React, { useState } from 'react';
import type { Topic } from '../data/types';
import { BookOpen, CheckCircle, Database, Search, Star, ChevronDown, ChevronRight, X } from 'lucide-react';

interface SidebarProps {
  topics: Topic[];
  activeTopic: Topic | null;
  setActiveTopic: (topic: Topic) => void;
  completedTopics: Record<string, boolean>;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  topics,
  activeTopic,
  setActiveTopic,
  completedTopics,
  isOpen = false,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('de_bookmarks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const categories = ['data-engineering', 'sql', 'python', 'pyspark', 'databricks'];
  const levels = ['beginner', 'intermediate', 'advanced'];

  const toggleCategory = (cat: string) => {
    setCollapsedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleTopicClick = (topic: Topic) => {
    setActiveTopic(topic);
    if (onClose) {
      onClose();
    }
  };

  const toggleBookmark = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...bookmarks, [topicId]: !bookmarks[topicId] };
    setBookmarks(updated);
    localStorage.setItem('de_bookmarks', JSON.stringify(updated));
  };

  const getCategoryProgress = (cat: string) => {
    const catTopics = topics.filter(t => t.category === cat);
    if (catTopics.length === 0) return 0;
    const completed = catTopics.filter(t => completedTopics[t.id]).length;
    return Math.round((completed / catTopics.length) * 100);
  };

  const getBadgeClass = (category: string) => {
    switch (category) {
      case 'sql': return 'badge-sql';
      case 'pyspark': return 'badge-pyspark';
      case 'databricks': return 'badge-databricks';
      case 'python': return 'badge-pyspark'; // Python shares Spark colors or defaults
      default: return 'badge-data-engineering';
    }
  };

  // Filtered topics based on search
  const filteredTopics = topics.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase()) ||
    t.difficulty.toLowerCase().includes(search.toLowerCase())
  );

  const bookmarkedList = topics.filter(t => bookmarks[t.id]);

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="sidebar-header" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h1 className="logo-text" style={{ margin: 0 }}>
            <span>CN-DESIGN</span>
          </h1>
          {onClose && (
            <button className="sidebar-close-btn" onClick={onClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Search Bar Spotlight */}
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <Search size={16} className="text-muted" style={{ position: 'absolute', left: '12px', top: '12px' }} />
          <input
            type="text"
            placeholder="Search topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: '10px',
              padding: '10px 12px 10px 38px',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
              boxShadow: 'var(--shadow-input-inner), 0 0 0 1px transparent',
              transition: 'all 0.2s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-input-inner-focus), 0 0 0 2px rgba(59, 130, 246, 0.5)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-input-inner), 0 0 0 1px transparent';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
            }}
          />
        </div>
      </div>

      <div className="sidebar-content" style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Bookmarked section */}
        {bookmarkedList.length > 0 && !search && (
          <div className="level-section">
            <h2 className="level-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#eab308' }}>
              <Star size={12} fill="#eab308" /> BOOKMARKED TOPICS
            </h2>
            {bookmarkedList.map(topic => {
              const isActive = activeTopic?.id === topic.id;
              return (
                <div
                  key={`fav-${topic.id}`}
                  className={`topic-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleTopicClick(topic)}
                >
                  <div className="topic-info">
                    <span className="topic-name">{topic.title}</span>
                    <span className={`badge ${getBadgeClass(topic.category)}`} style={{ alignSelf: 'flex-start', marginTop: '2px' }}>
                      {topic.category}
                    </span>
                  </div>
                  <Star size={14} fill="#eab308" color="#eab308" onClick={(e) => toggleBookmark(topic.id, e)} />
                </div>
              );
            })}
          </div>
        )}

        {/* Tech Track sections */}
        {categories.map(cat => {
          const catTopics = filteredTopics.filter(t => t.category === cat);
          if (catTopics.length === 0) return null;

          const progress = getCategoryProgress(cat);
          const isCollapsed = !!collapsedCategories[cat];

          return (
            <div key={cat} style={{ marginBottom: '20px' }}>
              {/* Category Header */}
              <div
                onClick={() => toggleCategory(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '10px 8px',
                  borderRadius: '8px',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid var(--border-glass)',
                  marginBottom: '10px',
                  transition: 'background 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                  <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {cat.replace('-', ' ')}
                  </span>
                </div>
                {/* SVG Progress Circle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{progress}%</span>
                  <div style={{ width: '16px', height: '16px', position: 'relative' }}>
                    <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--border-glass)"
                        strokeWidth="3.5"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={cat === 'sql' ? '#10b981' : cat === 'pyspark' ? '#f97316' : cat === 'databricks' ? '#a855f7' : '#3b82f6'}
                        strokeWidth="3.5"
                        strokeDasharray={`${progress}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Collapsible topic items */}
              {!isCollapsed && (
                <div style={{ paddingLeft: '8px' }}>
                  {levels.map(level => {
                    const levelTopics = catTopics.filter(t => t.difficulty === level);
                    if (levelTopics.length === 0) return null;

                    return (
                      <div key={level} style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', paddingLeft: '8px' }}>
                          {level}
                        </div>
                        {levelTopics.map(topic => {
                          const isActive = activeTopic?.id === topic.id;
                          const isCompleted = completedTopics[topic.id];
                          const isBookmarked = !!bookmarks[topic.id];

                          return (
                            <div
                              key={topic.id}
                              className={`topic-item ${isActive ? 'active' : ''}`}
                              onClick={() => handleTopicClick(topic)}
                              style={{ padding: '8px 10px' }}
                            >
                              <div className="topic-info">
                                <span className="topic-name" style={{ fontSize: '13px' }}>{topic.title}</span>
                              </div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Star
                                  size={13}
                                  fill={isBookmarked ? '#eab308' : 'none'}
                                  color={isBookmarked ? '#eab308' : 'var(--text-muted)'}
                                  style={{ opacity: isBookmarked ? 1 : 0.4, cursor: 'pointer' }}
                                  onClick={(e) => toggleBookmark(topic.id, e)}
                                />
                                {isCompleted ? (
                                  <CheckCircle size={14} color="#10b981" />
                                ) : (
                                  <BookOpen size={14} className="text-muted" style={{ opacity: 0.4 }} />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
