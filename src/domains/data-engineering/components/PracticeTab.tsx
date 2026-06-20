import React, { useState, useEffect } from 'react';
import type { CodingChallenge } from '../../../core/types/types';
import Editor from '@monaco-editor/react';
import { 
  Play, Check, ArrowLeft, BookOpen, 
  Trophy, Flame, Award, ChevronDown, ChevronUp 
} from 'lucide-react';

declare global {
  interface Window {
    initSqlJs: any;
    loadPyodide: any;
  }
}

interface PracticeTabProps {
  challenges: CodingChallenge[];
  onCompleteChallenge: (challengeId: string) => void;
  theme: 'light' | 'dark';
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  challenges,
  onCompleteChallenge,
  theme
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [showPane, setShowPane] = useState<'problem' | 'solution' | 'discussion'>('problem');
  const [hintsRevealed, setHintsRevealed] = useState<Record<number, boolean>>({});

  // Challenge Filters
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sqlDb, setSqlDb] = useState<any>(null);
  const [pyodide, setPyodide] = useState<any>(null);

  // Load completed items from localstorage
  const [solvedChallenges, setSolvedChallenges] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('de_completed_challenges');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // SQL.js init
  useEffect(() => {
    const loadSql = async () => {
      try {
        if (window.initSqlJs) {
          const SQL = await window.initSqlJs({ locateFile: (file: string) => `/${file}` });
          setSqlDb(new SQL.Database());
        }
      } catch (err) {
        console.error("Failed to load SQL in practice:", err);
      }
    };
    loadSql();
  }, []);

  // Pyodide init
  useEffect(() => {
    const loadPyodideEngine = async () => {
      try {
        if (!window.loadPyodide) return;
        const py = await window.loadPyodide();
        setPyodide(py);
      } catch (err) {
        console.error("Failed to load Pyodide in practice:", err);
      }
    };
    // Delay slightly to ensure script is loaded
    setTimeout(() => {
      loadPyodideEngine();
    }, 500);
  }, []);

  // Update solved challenges state when completion triggers
  const markSolved = (id: string) => {
    const updated = { ...solvedChallenges, [id]: true };
    setSolvedChallenges(updated);
    onCompleteChallenge(id);
  };

  const selectChallenge = (c: CodingChallenge) => {
    setSelectedChallenge(c);
    setCode(c.initialCode);
    setOutput(null);
    setError(null);
    setStatus('idle');
    setHintsRevealed({});
  };

  const runSqlCode = (db: any, query: string, challenge: CodingChallenge) => {
    try {
      if (challenge.setupSql) {
        const dropQueries = challenge.setupSql
          .split(';')
          .filter(q => q.trim())
          .map(q => {
            const match = q.match(/CREATE TABLE (\w+)/i);
            return match ? `DROP TABLE IF EXISTS ${match[1]};` : '';
          })
          .filter(Boolean)
          .join('\n');
        db.run(dropQueries);
        db.run(challenge.setupSql);
      }
      const res = db.exec(query);
      if (res.length === 0) {
        setOutput([]);
        setColumns([]);
        return { success: true, rows: [] };
      }
      const cols = res[0].columns;
      const rows = res[0].values.map((valList: any[]) => {
        const rowObj: any = {};
        cols.forEach((col: string, idx: number) => { rowObj[col] = valList[idx]; });
        return rowObj;
      });
      setColumns(cols);
      setOutput(rows);
      setError(null);
      return { success: true, rows };
    } catch (err: any) {
      setError(err.message);
      setOutput(null);
      return { success: false, error: err.message };
    }
  };

  const handleRun = () => {
    if (!selectedChallenge) return;
    setStatus('running');

    setTimeout(() => {
      let isCorrect = false;

      if (selectedChallenge.type === 'sql') {
        if (!sqlDb) {
          setError("SQLite DB initializing...");
          setStatus('failed');
          return;
        }
        const res = runSqlCode(sqlDb, code, selectedChallenge);
        if (res.success) {
          const solRes = runSqlCode(sqlDb, selectedChallenge.solutionCode, selectedChallenge);
          isCorrect = JSON.stringify(res.rows) === JSON.stringify(solRes.rows);
          runSqlCode(sqlDb, code, selectedChallenge); // Restore user view
        }
      } else {
        // PySpark & Python
        if (!pyodide) {
          setError("Python environment initializing...");
          setStatus('failed');
          return;
        }

        try {
          // Redirect stdout/stderr in python
          pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
          // run user code
          pyodide.runPython(code);
          
          let testsPassed = true;
          let testOutputs: string[] = [];
          
          if (selectedChallenge.testCases && selectedChallenge.testCases.length > 0) {
            for (let i = 0; i < selectedChallenge.testCases.length; i++) {
              const tc = selectedChallenge.testCases[i];
              pyodide.runPython(`
try:
    __result = str(solve(${tc.input}))
except Exception as e:
    __result = "Error: " + str(e)
`);
              const resStr = pyodide.runPython("__result");
              const expectedStr = String(tc.expected);
              
              if (resStr === expectedStr) {
                 testOutputs.push(`Test ${i+1}: Passed`);
              } else {
                 testOutputs.push(`Test ${i+1}: Failed (Expected ${expectedStr}, Got ${resStr})`);
                 testsPassed = false;
              }
            }
          } else {
             testsPassed = code.trim() !== selectedChallenge.initialCode.trim();
          }

          // read output
          const stdoutVal = pyodide.runPython("sys.stdout.getvalue()");
          const stderrVal = pyodide.runPython("sys.stderr.getvalue()");

          if (stderrVal) {
            setError(stderrVal);
            setOutput(null);
            isCorrect = false;
          } else {
            let outLines = stdoutVal.split('\\n').filter((l: string) => l.length > 0);
            outLines = outLines.concat(testOutputs);
            
            if (outLines.length === 0) {
                setOutput([{ status: "Execution successful (no output)" }]);
                setColumns(["status"]);
            } else {
                const formattedOutput = outLines.map((line: string) => ({ output: line }));
                setOutput(formattedOutput);
                setColumns(["output"]);
            }
            
            // Mark correct if they actually passed the tests
            isCorrect = testsPassed;
            setError(null);
          }
        } catch (err: any) {
          setError(err.message);
          setOutput(null);
          isCorrect = false;
        }
      }

      if (isCorrect) {
        setStatus('success');
        markSolved(selectedChallenge.id);
      } else {
        setStatus('failed');
      }
    }, 500);
  };

  // Stats computation
  const totalSolved = Object.keys(solvedChallenges).length;
  const totalCount = challenges.length;
  const successRate = totalCount > 0 ? Math.round((totalSolved / totalCount) * 100) : 0;
  
  const easySolved = challenges.filter(c => c.difficulty === 'easy' && solvedChallenges[c.id]).length;
  const mediumSolved = challenges.filter(c => c.difficulty === 'medium' && solvedChallenges[c.id]).length;
  const hardSolved = challenges.filter(c => c.difficulty === 'hard' && solvedChallenges[c.id]).length;

  const filtered = challenges.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.question.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    const matchesDiff = difficultyFilter === 'all' || c.difficulty === difficultyFilter;
    return matchesSearch && matchesCat && matchesDiff;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      
      {/* 1. Statistics & Filters view (If no challenge active) */}
      {!selectedChallenge ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Stats Dashboard Grid */}
          <div className="grid-stats">
            <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(59, 130, 246, 0.04)' }}>
              <Trophy size={40} color="#3b82f6" />
              <div>
                <strong style={{ fontSize: '24px', display: 'block' }}>{totalSolved} / {totalCount}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Coding Challenges Completed</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Flame size={40} color="#f97316" />
              <div>
                <strong style={{ fontSize: '24px', display: 'block' }}>3 Days</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Current Study Streak</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Award size={40} color="#10b981" />
              <div>
                <strong style={{ fontSize: '24px', display: 'block' }}>{successRate}%</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Completion Success Rate</span>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
              <span style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Easy</span> <strong style={{ color: '#10b981' }}>{easySolved} Solved</strong>
              </span>
              <span style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Medium</span> <strong style={{ color: '#f97316' }}>{mediumSolved} Solved</strong>
              </span>
              <span style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Hard</span> <strong style={{ color: '#ef4444' }}>{hardSolved} Solved</strong>
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="Search coding challenges..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#fff',
                  fontSize: '13px'
                }}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', color: '#fff', padding: '8px 12px', borderRadius: '6px' }}
            >
              <option value="all">All Languages</option>
              <option value="sql">SQL Only</option>
              <option value="pyspark">PySpark & Python</option>
              <option value="data-engineering">Data Engineering</option>
            </select>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', color: '#fff', padding: '8px 12px', borderRadius: '6px' }}
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Challenges List Table */}
          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <table className="sql-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const isSolved = !!solvedChallenges[c.id];
                  return (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {isSolved ? <Check size={16} color="#10b981" /> : <BookOpen size={16} className="text-muted" />}
                      </td>
                      <td style={{ fontWeight: 600 }}>{c.title}</td>
                      <td><span className="badge badge-sql">{c.category}</span></td>
                      <td>
                        <span style={{
                          textTransform: 'capitalize',
                          fontWeight: 700,
                          fontSize: '11px',
                          color: c.difficulty === 'hard' ? '#ef4444' : c.difficulty === 'medium' ? '#f97316' : '#10b981'
                        }}>{c.difficulty}</span>
                      </td>
                      <td>
                        <button onClick={() => selectChallenge(c)} className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }}>
                          Start Coding
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        
        // 2. Split Workspace view
        <div className="grid-workspace">
          
          {/* Left panel: Problem, Hints, Solution tabs */}
          <div className="practice-left-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setSelectedChallenge(null)} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                <ArrowLeft size={14} /> Back to List
              </button>
              <h2 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{selectedChallenge.title}</h2>
            </div>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              
              {/* Tab toggles */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)' }}>
                <button
                  onClick={() => setShowPane('problem')}
                  className={`tab-btn ${showPane === 'problem' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '10px 4px', fontSize: '12px' }}
                >
                  Problem
                </button>
                <button
                  onClick={() => setShowPane('solution')}
                  className={`tab-btn ${showPane === 'solution' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '10px 4px', fontSize: '12px' }}
                >
                  Solution
                </button>
                <button
                  onClick={() => setShowPane('discussion')}
                  className={`tab-btn ${showPane === 'discussion' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '10px 4px', fontSize: '12px' }}
                >
                  Discussion
                </button>
              </div>

              {/* Panel Content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', fontSize: '14px', lineHeight: '1.6' }}>
                
                {showPane === 'problem' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <span className="badge badge-sql" style={{ marginRight: '8px' }}>{selectedChallenge.category}</span>
                      <span style={{
                        textTransform: 'capitalize',
                        fontWeight: 700,
                        color: selectedChallenge.difficulty === 'hard' ? '#ef4444' : selectedChallenge.difficulty === 'medium' ? '#f97316' : '#10b981'
                      }}>{selectedChallenge.difficulty}</span>
                    </div>

                    <p>{selectedChallenge.question}</p>

                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>Example Input:</strong>
                      <pre style={{ background: '#07080b', color: '#e2e8f0', padding: '10px', borderRadius: '4px', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{selectedChallenge.exampleInput}</pre>
                    </div>

                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>Example Output:</strong>
                      <pre style={{ background: '#07080b', color: '#e2e8f0', padding: '10px', borderRadius: '4px', fontSize: '13px', whiteSpace: 'pre-wrap' }}>{selectedChallenge.exampleOutput}</pre>
                    </div>

                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>Constraints:</strong>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedChallenge.constraints}</p>
                    </div>

                    {/* Hints section */}
                    <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px' }}>
                      <strong style={{ display: 'block', marginBottom: '8px' }}>Hints:</strong>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedChallenge.hints.map((h, i) => {
                          const isRev = !!hintsRevealed[i];
                          return (
                            <div key={i} style={{ background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', borderRadius: '6px', padding: '10px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setHintsRevealed(prev => ({ ...prev, [i]: !prev[i] }))}>
                                <span style={{ fontSize: '12px', fontWeight: 600 }}>Hint {i + 1}</span>
                                {isRev ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </div>
                              {isRev && <p style={{ fontSize: '12px', marginTop: '6px', color: 'var(--text-secondary)' }}>{h}</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {showPane === 'solution' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <strong style={{ color: '#10b981', display: 'block', marginBottom: '4px' }}>Optimized Approach:</strong>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedChallenge.optimized}</p>
                    </div>
                    <div>
                      <strong style={{ color: '#f97316', display: 'block', marginBottom: '4px' }}>Brute Force Approach:</strong>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedChallenge.bruteForce}</p>
                    </div>
                    <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <strong>Time Complexity:</strong>
                        <pre style={{ background: '#07080b', padding: '6px', borderRadius: '4px', fontSize: '11px', marginTop: '4px' }}>{selectedChallenge.complexity.time}</pre>
                      </div>
                      <div>
                        <strong>Space Complexity:</strong>
                        <pre style={{ background: '#07080b', padding: '6px', borderRadius: '4px', fontSize: '11px', marginTop: '4px' }}>{selectedChallenge.complexity.space}</pre>
                      </div>
                    </div>
                  </div>
                )}

                {showPane === 'discussion' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px' }}>Why Interviewers Ask This:</strong>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedChallenge.discussion.whyAsked}</p>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#ef4444', marginBottom: '4px' }}>Common Mistakes:</strong>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedChallenge.discussion.mistakes}</p>
                    </div>
                    <div>
                      <strong style={{ display: 'block', color: '#3b82f6', marginBottom: '4px' }}>Follow-Up Questions:</strong>
                      <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {selectedChallenge.discussion.followUps.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* Right panel: Editor & Console */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="editor-wrapper">
              <div className="editor-header">
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Monaco Code Editor</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => setCode(selectedChallenge.solutionCode)} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                    Reveal Solution
                  </button>
                  <button onClick={handleRun} className="btn btn-primary" style={{ padding: '6px 12px' }}>
                    <Play size={14} /> Run Code
                  </button>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <Editor
                  height="100%"
                  theme={theme === 'dark' ? 'vs-dark' : 'vs'}
                  language={selectedChallenge.category === 'sql' ? 'sql' : 'python'}
                  value={code}
                  onChange={(val) => setCode(val || '')}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on'
                  }}
                />
              </div>

              {/* console output */}
              <div className="output-panel">
                <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Console Log Output</span>
                  {status === 'success' && <span style={{ color: '#10b981' }}>✓ Correct Solution!</span>}
                  {status === 'failed' && <span style={{ color: '#ef4444' }}>✗ Validation Failed</span>}
                </div>

                {error ? (
                  <div style={{ color: '#ef4444' }}>{error}</div>
                ) : output ? (
                  output.length === 0 ? (
                    <div>No data.</div>
                  ) : (
                    <div style={{ overflowX: 'auto' }}>
                      <table className="sql-table">
                        <thead>
                          <tr>
                            {columns.map(c => <th key={c}>{c}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {output.map((row, i) => (
                            <tr key={i}>
                              {columns.map(c => <td key={c}>{String(row[c])}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                ) : (
                  <div style={{ color: 'var(--text-muted)' }}>Run your solution code to evaluate result checks.</div>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
