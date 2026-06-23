import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Play, RotateCcw, AlertTriangle } from 'lucide-react';

declare global {
  interface Window {
    Babel: any;
  }
}

export interface LiveSandboxProps {
  mode: 'web' | 'react';
  files?: Record<string, string>;
  code?: string;
  language?: 'html' | 'css' | 'javascript' | 'typescript' | 'jsx' | 'tsx';
  height?: number;
  autoRun?: boolean;
  showConsole?: boolean;
  showPreview?: boolean;
  showRunButton?: boolean;
  // Optional JS appended inside the iframe to grade the result. It should call
  // window.__report({ passed: boolean, message: string }).
  testCode?: string;
  onResult?: (r: { passed: boolean; message: string }) => void;
  // External run trigger: changing this number forces a re-run.
  runSignal?: number;
}

const REACT_UMD =
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js';
const REACTDOM_UMD =
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js';

// Transpile JSX/TS using the globally-loaded Babel standalone.
function transpile(source: string, language?: string): { code: string; error?: string } {
  if (!window.Babel) {
    return { code: '', error: 'Babel is still loading. Please try again in a moment.' };
  }
  const isTs = language === 'typescript' || language === 'tsx';
  const presets: any[] = [['react', { runtime: 'classic' }]];
  if (isTs) presets.push(['typescript', { isTSX: true, allExtensions: true }]);
  try {
    const out = window.Babel.transform(source, {
      presets,
      filename: isTs ? 'file.tsx' : 'file.jsx',
    });
    return { code: out.code || '' };
  } catch (e: any) {
    return { code: '', error: String(e?.message || e) };
  }
}

// The console + error capture bridge injected into every iframe.
const BRIDGE = `
<script>
  (function(){
    function send(kind, args){
      try { parent.postMessage({ __sandbox: true, kind: kind, payload: args }, '*'); } catch(e){}
    }
    ['log','info','warn','error'].forEach(function(level){
      var orig = console[level];
      console[level] = function(){
        var parts = Array.prototype.slice.call(arguments).map(function(a){
          try { return typeof a === 'object' ? JSON.stringify(a) : String(a); } catch(e){ return String(a); }
        });
        send('console', { level: level, text: parts.join(' ') });
        if (orig) orig.apply(console, arguments);
      };
    });
    window.addEventListener('error', function(e){ send('console', { level: 'error', text: (e.message || 'Error') }); });
    window.addEventListener('unhandledrejection', function(e){ send('console', { level: 'error', text: 'Unhandled promise rejection: ' + (e.reason && e.reason.message ? e.reason.message : e.reason) }); });
    window.__report = function(r){ send('result', r); };
  })();
<\/script>`;

function buildWebDoc(files: Record<string, string>, js: string, testCode?: string): string {
  const html = files['index.html'] || files['html'] || '<div id="root"></div>';
  const css = files['styles.css'] || files['style.css'] || files['css'] || '';
  const script = files['script.js'] || files['js'] || js || '';
  return `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style>${BRIDGE}</head>
<body>${html}
<script>
try {
${script}
} catch (err) { console.error(err && err.message ? err.message : err); }
<\/script>
${testCode ? `<script>setTimeout(function(){ try{ ${testCode} }catch(e){ window.__report({passed:false, message:String(e && e.message || e)}); } }, 60);<\/script>` : ''}
</body></html>`;
}

function buildReactDoc(transpiled: string, testCode?: string): string {
  return `<!doctype html><html><head><meta charset="utf-8">${BRIDGE}
<script src="${REACT_UMD}"><\/script>
<script src="${REACTDOM_UMD}"><\/script>
</head>
<body><div id="root"></div>
<script>
window.addEventListener('load', function(){
  try {
    var React = window.React;
    var ReactDOM = window.ReactDOM;
    var useState=React.useState,useEffect=React.useEffect,useRef=React.useRef,useMemo=React.useMemo,useCallback=React.useCallback,useReducer=React.useReducer,useContext=React.useContext,createContext=React.createContext,Fragment=React.Fragment,memo=React.memo;
    var exports = {}; var module = { exports: exports };
${transpiled}
    var Root = (typeof App !== 'undefined') ? App : (module.exports && (module.exports.default || module.exports));
    if (!Root) { console.error('No component named "App" (or default export) was found.'); }
    else { ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Root)); }
  } catch (err) { console.error(err && err.message ? err.message : err); }
  ${testCode ? `setTimeout(function(){ try{ ${testCode} }catch(e){ window.__report({passed:false, message:String(e && e.message || e)}); } }, 120);` : ''}
});
<\/script>
</body></html>`;
}

export const LiveSandbox: React.FC<LiveSandboxProps> = ({
  mode,
  files,
  code,
  language,
  height = 280,
  autoRun = true,
  showConsole = true,
  showPreview = true,
  showRunButton = true,
  testCode,
  onResult,
  runSignal,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [logs, setLogs] = useState<Array<{ level: string; text: string }>>([]);
  const [docVersion, setDocVersion] = useState(0);

  const resolvedFiles = useMemo<Record<string, string>>(() => {
    if (files && Object.keys(files).length) return files;
    return code ? { code } : {};
  }, [files, code]);

  const { srcDoc, buildError } = useMemo<{ srcDoc: string; buildError: string | null }>(() => {
    if (mode === 'react') {
      const source = files?.['App.jsx'] || files?.['App.tsx'] || code || '';
      const { code: t, error } = transpile(source, language || 'jsx');
      if (error) {
        return {
          buildError: error,
          srcDoc: `<!doctype html><html><body style="font-family:monospace;color:#ef4444;padding:12px">${error.replace(/</g, '&lt;')}</body></html>`,
        };
      }
      return { buildError: null, srcDoc: buildReactDoc(t, testCode) };
    }
    // Web mode. If the script is TypeScript, transpile (strip types) first.
    const isTs = language === 'typescript' || language === 'tsx';
    if (isTs) {
      const src = resolvedFiles['script.js'] || resolvedFiles['js'] || code || '';
      const { code: t, error } = transpile(src, 'typescript');
      if (error) {
        return {
          buildError: error,
          srcDoc: `<!doctype html><html><body style="font-family:monospace;color:#ef4444;padding:12px">${error.replace(/</g, '&lt;')}</body></html>`,
        };
      }
      const webFiles = { ...resolvedFiles };
      delete webFiles['script.js'];
      delete webFiles['js'];
      return { buildError: null, srcDoc: buildWebDoc(webFiles, t, testCode) };
    }
    return { buildError: null, srcDoc: buildWebDoc(resolvedFiles, code || '', testCode) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, files, code, language, testCode, resolvedFiles, docVersion]);

  // Listen for console + result messages from this iframe.
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const data = e.data;
      if (!data || !data.__sandbox) return;
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) return;
      if (data.kind === 'console') {
        setLogs(prev => [...prev, data.payload].slice(-100));
      } else if (data.kind === 'result' && onResult) {
        onResult(data.payload);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onResult]);

  const run = useCallback(() => {
    setLogs([]);
    setDocVersion(v => v + 1);
  }, []);

  // External run trigger.
  useEffect(() => {
    if (runSignal !== undefined) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSignal]);

  return (
    <div style={{ border: '1px solid var(--border-glass)', borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-inner)' }}>
      {showRunButton && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', borderBottom: '1px solid var(--border-glass)', background: 'var(--bg-secondary)' }}>
          <button
            onClick={run}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 12px', borderRadius: '7px', border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: '#10b981', fontWeight: 600, fontSize: '12.5px', cursor: 'pointer' }}
          >
            <Play size={13} /> Run
          </button>
          <button
            onClick={run}
            title="Reset / re-run"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 10px', borderRadius: '7px', border: '1px solid var(--border-glass)', background: 'var(--bg-inner)', color: 'var(--text-muted)', fontSize: '12.5px', cursor: 'pointer' }}
          >
            <RotateCcw size={13} />
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{mode}</span>
        </div>
      )}

      {buildError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', color: '#ef4444', fontSize: '13px', background: 'rgba(239,68,68,0.08)' }}>
          <AlertTriangle size={14} /> {buildError}
        </div>
      )}

      {showPreview && (
        autoRun || docVersion > 0 ? (
          <iframe
            key={docVersion}
            ref={iframeRef}
            title="live-sandbox"
            sandbox="allow-scripts allow-modals"
            srcDoc={srcDoc}
            style={{ width: '100%', height, border: 'none', background: '#fff' }}
          />
        ) : (
          <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
            Press Run to execute
          </div>
        )
      )}

      {showConsole && logs.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-glass)', maxHeight: '160px', overflowY: 'auto', padding: '8px 12px', fontFamily: 'ui-monospace, monospace', fontSize: '12.5px', background: 'var(--bg-code, #0d1117)' }}>
          {logs.map((l, i) => (
            <div key={i} style={{ color: l.level === 'error' ? '#ef4444' : l.level === 'warn' ? '#f59e0b' : 'var(--code-text, #e6edf3)', whiteSpace: 'pre-wrap' }}>
              {l.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
