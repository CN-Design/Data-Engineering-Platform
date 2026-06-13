import React, { useState } from 'react';
import type { InterviewQuestion, Topic } from '../data/types';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface InterviewTabProps {
  topic: Topic | null;
  questions: InterviewQuestion[];
}

export const InterviewTab: React.FC<InterviewTabProps> = ({ topic, questions }) => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  // Filter questions belonging to this topic first, otherwise show all questions of the category if topic is null
  const topicQuestions = topic
    ? questions.filter(q => q.topicId === topic.id)
    : questions;

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (topicQuestions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        No interview questions available for this specific topic.
      </div>
    );
  }

  return (
    <div className="interview-container">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600 }}>
          {topic ? `${topic.title} Interview Preparation` : 'General Interview Preparation'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Review the questions below. Click on any question card to reveal or hide the official answer.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {topicQuestions.map((q) => {
          const isRevealed = !!revealed[q.id];
          return (
            <div
              key={q.id}
              className="glass-panel question-card"
              onClick={() => toggleReveal(q.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <HelpCircle size={18} color="#3b82f6" />
                  <span className="question-text">{q.question}</span>
                </div>
                <div>
                  {isRevealed ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              {isRevealed && (
                <div className="answer-text">
                  <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Official Answer:
                  </strong>
                  {q.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
