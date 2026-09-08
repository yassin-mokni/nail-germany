export type Origin = "eu" | "non-eu";
export type Employment = "employed" | "freelance" | "student";
export type Housing = "own_apartment" | "wg";
export type MaritalStatus = "single" | "married";
export type Bundesland =
  | "bayern"
  | "berlin"
  | "baden-wuerttemberg"
  | "nordrhein-westfalen"
  | "hessen"
  | "hamburg"
  | "sachsen"
  | "niedersachsen"
  | "other";
export type Urgency = "critical" | "recommended" | "optional";

export interface TaskConditions {
  origin?: Origin | Origin[];
  employment?: Employment | Employment[];
  housing?: Housing | Housing[];
  marital_status?: MaritalStatus | MaritalStatus[];
  has_children?: boolean;
  state?: Bundesland | Bundesland[];
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  urgency: Urgency;
  category: string;
  conditions: TaskConditions;
  legal_ref?: string;
  deadline?: string;
  trap_warning?: string;
  action_steps?: string[];
}

export interface UserProfile {
  origin: Origin | null;
  employment: Employment | null;
  housing: Housing | null;
  marital_status: MaritalStatus | null;
  has_children: boolean | null;
  state: Bundesland | null;
  completed_tasks: string[];
  is_configured: boolean;
}

export interface ProfileStore extends UserProfile {
  setProfile: (profile: Partial<UserProfile>) => void;
  updateField: <K extends keyof UserProfile>(field: K, value: UserProfile[K]) => void;
  toggleCompletedTask: (taskId: string) => void;
  markTaskCompleted: (taskId: string, completed: boolean) => void;
  resetProfile: () => void;
  hasHydrated: boolean;
  setHasHydrated: (status: boolean) => void;
}
