import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { LiveSandbox } from '../../../core/components/LiveSandbox';

interface FrontendPlaygroundTabProps {
  theme: 'light' | 'dark';
}

const STARTER_WEB = {
  'index.html': '<h1 id="title">Hello, Frontend!</h1>\n<button id="btn">Click me</button>\n<p id="out"></p>',
  'styles.css': 'body{font-family:system-ui;padding:20px}\n#title{color:#3b82f6}\nbutton{padding:8px 14px;border-radius:8px;border:1px solid #ccc;cursor:pointer}',
  'script.js': "let n = 0;\ndocument.getElementById('btn').addEventListener('click', () => {\n  n++;\n  document.getElementById('out').textContent = 'Clicked ' + n + ' times';\n  console.log('clicked', n);\n});",
};

const STARTER_REACT = `function App() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ fontFamily: 'system-ui', padding: 20 }}>
      <h1 style={{ color: '#3b82f6' }}>Counter</h1>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}`;

const REACT_PRESETS: Record<string, string> = {
  'Counter': STARTER_REACT,
  'Todo list': "function App() {\n  const [items, setItems] = useState(['Learn React']);\n  const [text, setText] = useState('');\n  const add = () => { if (!text.trim()) return; setItems(prev => [...prev, text]); setText(''); };\n  return (\n    <div style={{ fontFamily: 'system-ui', padding: 20 }}>\n      <h2>Todo</h2>\n      <input value={text} onChange={e => setText(e.target.value)} placeholder=\"New task\" />\n      <button onClick={add}>Add</button>\n      <ul>{items.map((it, i) => <li key={i}>{it}</li>)}</ul>\n    </div>\n  );\n}",
  'Live clock (useEffect)': "function App() {\n  const [now, setNow] = useState(new Date().toLocaleTimeString());\n  useEffect(() => {\n    const id = setInterval(() => setNow(new Date().toLocaleTimeString()), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <h1 style={{ fontFamily: 'system-ui', padding: 20 }}>{now}</h1>;\n}",
};

const WEB_PRESETS: Record<string, Record<string, string>> = {
  'Starter': STARTER_WEB,
  'Flexbox demo': {
    'index.html': '<div class="row">\n  <div class="box">1</div>\n  <div class="box">2</div>\n  <div class="box">3</div>\n</div>',
    'styles.css': 'body{font-family:system-ui;padding:20px}\n.row{display:flex;gap:10px;justify-content:space-between}\n.box{flex:1;padding:24px;text-align:center;border-radius:8px;background:#3b82f6;color:#fff}',
    'script.js': "console.log('Flexbox: try changing justify-content');",
  },
};

export const FrontendPlaygroundTab: React.FC<FrontendPlaygroundTabProps> = ({ theme }) => {
  const [mode, setMode] = useState<'web' | 'react'>('web');
  const [files, setFiles] = useState<Record<string, string>>(STARTER_WEB);
  const [reactCode, setReactCode] = useState<string>(STARTER_REACT);
  const [activeFile, setActiveFile] = useState<string>('index.html');
  const [runSignal, setRunSignal] = useState(0);

  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light';
  const fileLangs: Record<string, string> = { 'index.html': 'html', 'styles.css': 'css', 'script.js': 'javascript' };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <select
          aria-label="Load example"
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            if (mode === 'react') { setReactCode(REACT_PRESETS[v]); }
            else { setFiles(WEB_PRESETS[v]); setActiveFile(Object.keys(WEB_PRESETS[v])[0]); }
            setRunSignal(s => s + 1);
          }}
          defaultValue=""
          style={{ padding: '7px 10px', borderRadius: '8px', background: 'var(--bg-inner)', border: '1px solid var(--border-glass)', color: 'var(--text-primary)', fontSize: '13px' }}
        >
          <option value="" disabled>Load example…</option>
          {Object.keys(mode === 'react' ? REACT_PRESETS : WEB_PRESETS).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: '6px', marginLeft: 'auto' }}>
          {(['web', 'react'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setRunSignal(s => s + 1); }}
              style={{ padding: '6px 14px', borderRadius: '8px', border: '1px solid var(--border-glass)', cursor: 'pointer', fontWeight: mode === m ? 700 : 500, textTransform: 'capitalize', background: mode === m ? 'var(--bg-inner-active, rgba(59,130,246,0.15))' : 'var(--bg-inner)', color: mode === m ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {m === 'web' ? 'HTML/CSS/JS' : 'React'}
            </button>
          ))}
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: 0 }}>
        Experiment freely — no assessment. Edit the code and press Run to see the result live.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'start' }} className="playground-grid">
        {/* Editor */}
        <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', overflow: 'hidden' }}>
          {mode === 'web' && (
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
              {Object.keys(files).map(f => (
                <button key={f} onClick={() => setActiveFile(f)}
                  style={{ padding: '8px 12px', border: 'none', cursor: 'pointer', fontSize: '12.5px', fontWeight: activeFile === f ? 700 : 500, background: activeFile === f ? 'var(--bg-inner)' : 'transparent', color: activeFile === f ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {f}
                </button>
              ))}
            </div>
          )}
          <Editor
            height="360px"
            theme={monacoTheme}
            language={mode === 'web' ? fileLangs[activeFile] : 'javascript'}
            value={mode === 'web' ? files[activeFile] : reactCode}
            onChange={(v) => {
              if (mode === 'web') setFiles(prev => ({ ...prev, [activeFile]: v ?? '' }));
              else setReactCode(v ?? '');
            }}
            options={{ minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false }}
          />
        </div>

        {/* Preview */}
        <div>
          {mode === 'web' ? (
            <LiveSandbox mode="web" files={files} height={360} runSignal={runSignal} />
          ) : (
            <LiveSandbox mode="react" code={reactCode} language="jsx" height={360} runSignal={runSignal} />
          )}
        </div>
      </div>
    </div>
  );
};
