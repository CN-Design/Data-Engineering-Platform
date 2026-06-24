import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Terminal, Eye, RotateCcw, Play } from 'lucide-react';
import type { BackendCode } from '../../../core/types/backend';

// A Go code block. Go cannot execute in the browser, so this is a
// display + (optional) edit surface with a "Reveal Solution" and the
// expected output shown on demand. `theme` toggles the Monaco theme.
export const GoCodeBlock: React.FC<{ block: BackendCode; theme?: 'dark' | 'light'; title?: string }> = ({ block, theme = 'dark', title }) => {
  const editable = !!block.editable;
  const [code, setCode] = useState(block.code);
  const [revealed, setRevealed] = useState(false);
  const [showOut, setShowOut] = useState(false);

  if (!editable) {
    return (
      <div>
        <div className="be-code">
          <div className="be-code-bar">
            <span className="be-code-tag"><Terminal size={13} /> {title || (block.language === 'bash' ? 'shell' : block.language)}</span>
            {block.expectedOutput && (
              <button className="be-btn" onClick={() => setShowOut(s => !s)}><Play size={12} /> {showOut ? 'Hide output' : 'Output'}</button>
            )}
          </div>
          <pre><code>{block.code}</code></pre>
        </div>
        {block.caption && <p className="be-code-cap">{block.caption}</p>}
        {block.expectedOutput && showOut && (
          <div className="be-output"><div className="be-output-label">Output (run locally)</div><pre>{block.expectedOutput}</pre></div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="be-editor-wrap">
        <div className="be-editor-head">
          <span className="be-code-tag"><Terminal size={13} /> {title || 'Go — edit me'}</span>
          <div className="be-code-actions">
            <button className="be-btn" onClick={() => { setCode(block.code); setRevealed(false); }}><RotateCcw size={12} /> Reset</button>
            {block.solution && (
              <button className="be-btn" onClick={() => { setCode(block.solution as string); setRevealed(true); }}><Eye size={12} /> {revealed ? 'Solution shown' : 'Reveal solution'}</button>
            )}
          </div>
        </div>
        <Editor
          height="260px"
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          language="go"
          value={code}
          onChange={(v) => setCode(v || '')}
          options={{ minimap: { enabled: false }, fontSize: 13, lineNumbers: 'on', scrollBeyondLastLine: false, tabSize: 4 }}
        />
      </div>
      <p className="be-run-note"><Terminal size={12} /> Go runs locally — edit freely, reveal the solution, and verify with <code>go test ./...</code>.</p>
      {block.expectedOutput && (
        <div className="be-output"><div className="be-output-label">Expected output</div><pre>{block.expectedOutput}</pre></div>
      )}
    </div>
  );
};
