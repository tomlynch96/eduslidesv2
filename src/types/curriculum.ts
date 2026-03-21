// ─── Curriculum Hierarchy ────────────────────────────────────────────────────

export interface LearningObjective {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  code: string;         // e.g. "SP3a"
  title: string;
  objectives: LearningObjective[];
}

export interface Topic {
  id: string;
  code: string;         // e.g. "SP3"
  title: string;        // e.g. "Conservation of Energy"
  lessons: Lesson[];
}

export interface Unit {
  id: string;
  title: string;        // e.g. "Year 10"
  topics: Topic[];
}

export interface Subject {
  id: string;
  title: string;        // e.g. "Physics"
  units: Unit[];
}
