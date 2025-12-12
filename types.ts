
export enum ActivityType {
  Sightseeing = 'SIGHTSEEING',
  Food = 'FOOD',
  Travel = 'TRAVEL',
  Rest = 'REST',
  Activity = 'ACTIVITY',
  Cruise = 'CRUISE'
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: ActivityType;
  location?: string;
}

export interface DayPlan {
  dayNumber: number;
  date: string; // e.g. "Jan 24"
  title: string; // Theme of the day
  activities: Activity[];
}

export interface ExpenseItem {
  category: string;
  description: string;
  estimatedCost: string; // e.g. "NT$ 5,000"
  note?: string; // Optional note for details
}

export interface PreparationItem {
  category: string; // Main group (e.g. "隨身行李")
  subCategory?: string; // Optional subgroup (e.g. "衣物")
  item: string;
  note?: string;
  isHighlight?: boolean; // Red text for item AND note
  isNoteHighlight?: boolean; // Red text for note ONLY
  isChecked?: boolean; // For local state
}

export interface Member {
  name: string;
  role: string; // e.g. "Dad", "Grandma"
  roomNumber?: string;
  notes?: string;
}

export interface TripData {
  destination: string;
  startDate: string;
  endDate?: string;
  title: string;
  overview: string;
  days: DayPlan[];
  expenses: ExpenseItem[];
  preparation: PreparationItem[];
  members?: Member[];
}

export interface TripGenerationParams {
  destination: string;
  startDate: string;
  duration: number;
  travelers: string;
  interests: string;
}
