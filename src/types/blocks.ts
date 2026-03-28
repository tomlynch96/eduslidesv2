// ─── Block System ─────────────────────────────────────────────────────────────

export type BlockType = 'text' | 'question-ref';

export interface BlockPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  position: BlockPosition;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
}

export interface QuestionRefBlock extends BaseBlock {
  type: 'question-ref';
  questionId: string;
}

export type Block = TextBlock | QuestionRefBlock;

// ─── Slide ────────────────────────────────────────────────────────────────────

export interface Slide {
  id: string;
  blocks: Block[];
  backgroundColour?: string;
}

// ─── Presentation ─────────────────────────────────────────────────────────────

export interface Presentation {
  id: string;
  title: string;
  variantName: string;
  subjectId: string;
  qualificationId: string;
  yearGroupId: string;
  unitId: string;
  lessonId: string;
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}