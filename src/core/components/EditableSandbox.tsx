import React, { useMemo, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Code2, Eye } from 'lucide-react';
import { LiveSandbox } from './LiveSandbox';

export interface EditableSandboxProps {
  mode: 'web' | 'react';
  code?: string;
  files?: Record<string, string>;
  language?: string;
  height?: number;
  title?: string;
}

const FILE_LANG: Record<string, string> = {
  'index.html': 'html', 'html': 'html',
  'styles.css': 'css', 'style.css': 'css', 'css': 'css',
  'script.js': 'javascript', 'js': 'javascript',
};

// An interactive editor + live preview pair. Users edit the code and press Run
// to execute it in the sandboxed iframe. Used by Interactive Examples, Code Lab
// and Debugging Lab so every snippet is playable.
export const EditableSandbox: React.FC<EditableSandboxProps> = ({ mode, code, files, language, height = 300, title }) => {
  const isMulti = mode === 'web' && !!files && Object.keys(files).length > 0;
  const initialSingle = code ?? (files ? Object.values(files)[0] : '') ?? '';

  const [draftCode, setDraftCode] = useState<string>(initialSingle);
  const [draftFiles, setDraftFiles] = useState<Record<string, string>>(files || {});
  const [committedCode, setCommittedCode] = useState<string>(initialSingle);
  const [committedFiles, setCommittedFiles] = useState<Record<string, string>>(files || {});
  const [activeFile, setActiveFile] = useState<string>(isMulti ? Object.keys(files!)[0] : '');
  const [runSignal, setRunSignal] = useState(0);
  const [view, setView] = useState<'split' | 'code' | 'preview'>('split');

  const monacoTheme = useMemo(
    () => (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'vs-dark'),
    []
  );

  const editorLang = isMulti ? (FILE_LANG[activeFile] || 'javascript') : (language === 'tsx' || language === 'typescript' ? 'typescript' : language === 'css' ? 'css' : language === 'html' ? 'html' : 'javascript');

  const run = () => {
    if (isMulti) setCommittedFiles({ ...draftFiles });
    else setCommittedCode(draftCode);
    setRunSignal(s => s + 1);
  };
  const reset = () => {
    if (isMulti) { setDraftFiles(files || {}); setCommittedFiles(files || {}); }
    else { setDraftCode(initialSingle); setCommittedCode(initialSingle); }
    setRunSignal(s => s + 1);
  };

  const showCode = view === 'split' || view === 'code';
  const showPreview = view === 'split' || view === 'preview';

  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-inner)' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title || 'Live Code'}</span>
        <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto', alignItems: 'center' }}>
          {/* view toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', borderRadius: '7px', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
            <button onClick={() => setView('code')} title="Code" style={segBtn(view === 'code')}><Code2 size={13} /></button>
            <button onClick={() => setView('split')} title="Split" style={segBtn(view === 'split')}>Split</button>
            <button onClick={() => setView('preview')} title="Preview" style={segBtn(view === 'preview')}><Eye size={13} /></button>
          </div>
          <button onClick={reset} title="Reset code" style={toolBtn('var(--text-muted)')}><RotateCcw size={13} /></button>
          <button onClick={run} style={{ ...toolBtn('#10b981'), fontWeight: 700 }}><Play size={13} /> Run</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: view === 'split' ? 'repeat(auto-fit, minmax(300px, 1fr))' : '1fr', gap: '0' }}>
        {/* Editor */}
        {showCode && (
          <div style={{ borderRight: view === 'split' ? '1px solid var(--border-glass)' : 'none', minWidth: 0 }}>
            {isMulti && (
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-inner)' }}>
                {Object.keys(draftFiles).map(f => (
                  <button key={f} onClick={() => setActiveFile(f)} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', fontSize: '12px', fontFamily: 'ui-monospace, monospace', fontWeight: activeFile === f ? 700 : 500, background: activeFile === f ? 'var(--bg-secondary)' : 'transparent', color: activeFile === f ? 'var(--text-primary)' : 'var(--text-muted)' }}>{f}</button>
                ))}
              </div>
            )}
            <Editor
              height={`${height}px`}
              theme={monacoTheme}
              language={editorLang}
              value={isMulti ? (draftFiles[activeFile] ?? '') : draftCode}
              onChange={(v) => {
                if (isMulti) setDraftFiles(prev => ({ ...prev, [activeFile]: v ?? '' }));
                else setDraftCode(v ?? '');
              }}
              options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, lineNumbers: 'on', padding: { top: 10 }, automaticLayout: true, tabSize: 2, wordWrap: 'on' }}
            />
          </div>
        )}
        {/* Preview */}
        {showPreview && (
          <div style={{ minWidth: 0 }}>
            <LiveSandbox
              mode={mode}
              code={isMulti ? undefined : committedCode}
              files={isMulti ? committedFiles : undefined}
              language={language as any}
              height={height + (isMulti ? 30 : 0)}
              autoRun
              showRunButton={false}
              runSignal={runSignal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const segBtn = (active: boolean): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 9px', border: 'none', cursor: 'pointer',
  fontSize: '11.5px', fontWeight: 600, background: active ? 'var(--bg-inner-active, rgba(59,130,246,0.18))' : 'transparent',
  color: active ? 'var(--text-primary)' : 'var(--text-muted)',
});

const toolBtn = (color: string): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '8px',
  border: '1px solid var(--border-glass)', background: 'var(--bg-secondary)', color, fontSize: '12.5px', cursor: 'pointer',
});
