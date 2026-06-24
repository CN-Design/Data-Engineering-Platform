import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, HelpCircle, Bug, SquarePen } from 'lucide-react';
import type { Checkpoint } from '../../../core/types/backend';

const KIND_META: Record<Checkpoint['kind'], { label: string; icon: any }> = {
  'predict-output': { label: 'Predict the output', icon: Brain },
  'mcq': { label: 'Quick check', icon: HelpCircle },
  'spot-the-bug': { label: 'Spot the bug', icon: Bug },
  'fill-blank': { label: 'Fill in the blank', icon: SquarePen },
};

// A self-grading interactive checkpoint. The learner picks an option; the
// widget reveals correct/incorrect and an explanation. Keeps users engaged.
export const CheckpointWidget: React.FC<{ cp: Checkpoint }> = ({ cp }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const meta = KIND_META[cp.kind];
  const Icon = meta.icon;
  const code =
    cp.kind === 'fill-blank'
      ? `${cp.codeBefore}\n    /* ___ */\n${cp.codeAfter}`
      : (cp as any).code;

  return (
    <div className="be-check">
      <div className="be-check-kind"><Icon size={13} /> {meta.label}</div>
      <p className="be-check-prompt">{cp.prompt}</p>
      {code && (
        <div className="be-code" style={{ marginTop: 0 }}>
          <pre><code>{code}</code></pre>
        </div>
      )}
      <div className="be-check-opts" style={{ marginTop: code ? '10px' : 0 }}>
        {cp.options.map((opt, i) => {
          const isAnswer = i === cp.answerIndex;
          const isPicked = picked === i;
          let cls = 'be-check-opt';
          if (picked !== null && isAnswer) cls += ' correct';
          else if (isPicked && !isAnswer) cls += ' wrong';
          return (
            <button key={i} className={cls} disabled={picked !== null} onClick={() => setPicked(i)}>
              <span style={{ fontFamily: 'ui-monospace, monospace', whiteSpace: 'pre-wrap' }}>{opt}</span>
              {picked !== null && isAnswer && <CheckCircle2 size={16} color="#10b981" className="be-check-opt-mark" />}
              {isPicked && !isAnswer && <XCircle size={16} color="#ef4444" className="be-check-opt-mark" />}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div className="be-check-explain">
          <strong style={{ color: picked === cp.answerIndex ? '#10b981' : '#ef4444' }}>
            {picked === cp.answerIndex ? 'Correct. ' : 'Not quite. '}
          </strong>
          {cp.explanation}
        </div>
      )}
    </div>
  );
};
