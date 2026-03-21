// ─── Block System ─────────────────────────────────────────────────────────────

export type BlockType = 'text' | 'cloze' | 'match' | 'order' | 'mcq';

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

export interface ClozeSegment {
  id: string;
  text: string;
  isBlank: boolean;
}

export interface ClozeBlock extends BaseBlock {
  type: 'cloze';
  segments: ClozeSegment[];
}

export type Block = TextBlock | ClozeBlock;

// ─── Slide ────────────────────────────────────────────────────────────────────

export interface Slide {
  id: string;
  blocks: Block[];
  backgroundColour?: string;
}

// ─── Lesson Plan ─────────────────────────────────────────────────────────────

export interface LessonPlan {
  id: string;
  title: string;
  subjectId: string;
  unitId: string;
  topicId: string;
  lessonId: string;       // links to Lesson in curriculum
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}
