export interface Course {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface CourseGradeState {
  rawInput: string;
  value: number | null;
  isValidRange: boolean; // 0 <= value <= 100
  isEntered: boolean;
  isExcluded: boolean; // Entered but not in 0-100 range
}

export interface CalculationResult {
  validGrades: { course: Course; grade: number }[];
  excludedGrades: { course: Course; rawValue: number }[];
  emptyCount: number;
  totalSum: number;
  validCount: number;
  average: number | null;
  isPassed: boolean | null;
  passThreshold: number;
}
