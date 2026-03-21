import { useState } from 'react';
import { nanoid } from 'nanoid';
import type { ClozeBlock, ClozeSegment } from '../../types';

interface Props {
  block: ClozeBlock;
  onChange: (block: ClozeBlock) => void;
  mode?: 'edit' | 'preview';
}

// ─── Preview mode: pupil fills in blanks ──────────────────────────────────────

function ClozePreview({ block }: { block: ClozeBlock }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const setAnswer = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
    setChecked(false);
  };

  return (
    <div className="px-3 py-2 text-sm text-slate-700 leading-8 flex flex-wrap items-center gap-y-1">
      {block.segments.map((seg) =>
        seg.isBlank ? (
          <span key={seg.id} className="inline-flex items-center mx-1">
            <input
              type="text"
              className={`border-b-2 bg-transparent text-center text-sm focus:outline-none px-1 min-w-[80px] transition-colors ${
                checked
                  ? answers[seg.id]?.trim().toLowerCase() === seg.text.toLowerCase()
                    ? 'border-green-500 text-green-700'
                    : 'border-red-400 text-red-600'
                  : 'border-brand-400 focus:border-brand-600'
              }`}
              style={{ width: `${Math.max(80, seg.text.length * 10)}px` }}
              value={answers[seg.id] ?? ''}
              onChange={(e) => setAnswer(seg.id, e.target.value)}
              placeholder="…"
            />
          </span>
        ) : (
          <span key={seg.id}>{seg.text}</span>
        )
      )}
      <button
        onClick={() => setChecked(true)}
        className="ml-2 text-xs bg-brand-500 hover:bg-brand-600 text-white px-2 py-0.5 rounded transition-colors"
      >
        Check
      </button>
    </div>
  );
}

// ─── Edit mode: author builds the sentence ────────────────────────────────────

function ClozeEditor({ block, onChange }: { block: ClozeBlock; onChange: (b: ClozeBlock) => void }) {
  const [rawText, setRawText] = useState(() =>
    block.segments.map((s) => (s.isBlank ? `[${s.text}]` : s.text)).join('')
  );
  const [showHelp, setShowHelp] = useState(false);

  // Parse "word [blank] word" syntax into segments
  const parseToSegments = (text: string): ClozeSegment[] => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts
      .filter((p) => p.length > 0)
      .map((p) => {
        const isBlank = p.startsWith('[') && p.endsWith(']');
        return {
          id: nanoid(),
          text: isBlank ? p.slice(1, -1) : p,
          isBlank,
        };
      });
  };

  const handleBlur = () => {
    const segments = parseToSegments(rawText);
    onChange({ ...block, segments });
  };

  const hasBlank = rawText.includes('[') && rawText.includes(']');

  return (
    <div className="px-3 py-2 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">Cloze block</span>
        <button
          onClick={() => setShowHelp((v) => !v)}
          className="text-xs text-slate-400 hover:text-brand-500 transition-colors"
        >
          {showHelp ? 'hide help' : 'syntax help'}
        </button>
      </div>

      {showHelp && (
        <div className="text-xs text-slate-500 bg-slate-50 rounded px-2 py-1.5 border border-slate-100">
          Wrap blanks in square brackets: <code className="font-mono text-brand-600">The speed of light is [3 × 10⁸ m/s] in a vacuum.</code>
        </div>
      )}

      <textarea
        className={`w-full text-sm px-2 py-1.5 rounded border focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none font-mono bg-white transition-colors ${
          hasBlank ? 'border-brand-300' : 'border-slate-200'
        }`}
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        onBlur={handleBlur}
        rows={3}
        placeholder="Type sentence, wrap blanks like [answer]"
      />

      {/* Preview of parsed segments */}
      <div className="text-xs text-slate-500 flex flex-wrap gap-1 items-center">
        {parseToSegments(rawText).map((seg) =>
          seg.isBlank ? (
            <span key={seg.id} className="bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded font-medium">
              [{seg.text}]
            </span>
          ) : (
            <span key={seg.id} className="text-slate-400">{seg.text}</span>
          )
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ClozeBlockComponent({ block, onChange, mode = 'edit' }: Props) {
  return (
    <div className="w-full rounded-lg border border-brand-200 bg-white shadow-sm">
      {mode === 'preview' ? (
        <ClozePreview block={block} />
      ) : (
        <ClozeEditor block={block} onChange={onChange} />
      )}
    </div>
  );
}
