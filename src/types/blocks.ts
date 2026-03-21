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

// ─── Presentation ─────────────────────────────────────────────────────────────
// A Presentation is one deliverable linked to a curriculum Lesson.
// Multiple presentations can exist for the same lesson (e.g. Higher, Foundation, Re-teach).

export interface Presentation {
  id: string;
  // Human-readable title — the root lesson name is stored separately;
  // variantName holds the suffix, e.g. "Higher", "Foundation", "Re-teach", "v2"
  // The display name is: lessonTitle + (variantName ? " — " + variantName : "")
  title: string;
  variantName: string;   // e.g. "" for the first/default, "Higher", "Foundation"

  // Curriculum links
  subjectId: string;
  qualificationId: string;
  yearGroupId: string;
  unitId: string;
  lessonId: string;       // links to Lesson in curriculum

  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}