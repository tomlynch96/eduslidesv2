import { useState, useRef, useEffect } from 'react';
import type { TextBlock } from '../../types';

interface Props {
  block: TextBlock;
  onChange: (block: TextBlock) => void;
  mode?: 'edit' | 'preview';
}

export default function TextBlockComponent({ block, onChange, mode = 'edit' }: Props) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [editing]);

  if (mode === 'preview') {
    return (
      <div className="w-full h-full px-3 py-2 text-sm text-slate-700 whitespace-pre-wrap">
        {block.content}
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-[48px] rounded-lg border border-transparent hover:border-brand-200 transition-colors"
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <textarea
          ref={textareaRef}
          className="w-full h-full min-h-[48px] px-3 py-2 text-sm text-slate-700 resize-none rounded-lg border border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-300 bg-white"
          value={block.content}
          onChange={(e) => onChange({ ...block, content: e.target.value })}
          onBlur={() => setEditing(false)}
          rows={3}
        />
      ) : (
        <div className="px-3 py-2 text-sm text-slate-700 whitespace-pre-wrap cursor-text min-h-[48px] rounded-lg bg-white/80">
          {block.content || <span className="text-slate-300 italic">Double-click to edit…</span>}
        </div>
      )}
    </div>
  );
}
