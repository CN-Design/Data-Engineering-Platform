import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Eye, RotateCcw, Play, Copy, Check } from 'lucide-react';
import type { AgentCode } from '../../../core/types/aiagents';

// A Python (or shell/json) code block. Agent code needs an API key + network,
// so this is a display + (optional) edit surface with Reveal + copy; you run
// it locally with your own key. Monaco language follows the block.
export const PyCodeBlock: React.FC<{ block: AgentCode; theme?: 'dark' | 'light'; title?: string }> = ({ block, theme = 'dark', title }) => {
  const editable = !!block.editable;
  const [code, setCode] = useState(block.code);
  const [revealed, setRevealed] = useState(false);
  const [showOut, setShowOut] = useState(false);
  const [copied, setCopied] = useState(false);
  const monacoLang = block.language === 'python' ? 'python' : block.language === 'json' ? 'json' : block.language === 'bash' ? 'shell' : 'plaintext';
  const tag = title || (block.language === 'python' ? 'python' : block.language === 'bash' ? 'shell' : block.language);

  const copy = async () => { try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* ignore */ } };

  if (!editable) {
    return (
      <div>
        <div className="be-code">
          <div className="be-code-bar">
            <span className="be-code-tag"><Terminal size={13} /> {tag}</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {block.expectedOutput && <button className="be-btn" onClick={() => setShowOut(s => !s)}><Play size={12} /> {showOut ? 'Hide output' : 'Output'}</button>}
              <button className="be-btn" onClick={copy}>{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}</button>
            </div>
          </div>
          <pre><code>{block.code}</code></pre>
        </div>
        {block.caption && <p className="be-code-cap">{block.caption}</p>}
        {block.expectedOutput && showOut && (
          <div className="be-output"><div className="be-output-label">Output (illustrative)</div><pre>{block.expectedOutput}</pre></div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="be-editor-wrap">
        <div className="be-editor-head">
          <span className="be-code-tag"><Terminal size={13} /> {title || 'Python — edit me'}</span>
          <div className="be-code-actions">
            <button className="be-btn" onClick={copy}>{copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'Copied' : 'Copy'}</button>
            <button className="be-btn" onClick={() => { setCode(block.code); setRevealed(false); }}><RotateCcw size={12} /> Reset</button>
            {block.solution && (
              <button className="be-btn" onClick={() => { setCode(block.solution as string); setRevealed(true); }}><Eye size={12} /> {revealed ? 'Solution shown' : 'Reveal solution'}</button>
            )}
          </div>
        </div>
        <Editor
          height="280px"
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          language={monacoLang}
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'on', scrollBeyondLastLine: false, tabSize: 4 }}
        />
      </div>
      <p className="be-run-note"><Terminal size={12} /> Agents need an API key &amp; network — copy this and run it locally (e.g. <code>python main.py</code>) with your provider key set.</p>
      {block.expectedOutput && (
        <div className="be-output"><div className="be-output-label">Expected output (illustrative)</div><pre>{block.expectedOutput}</pre></div>
      )}
    </div>
  );
};
