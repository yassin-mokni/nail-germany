import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProfileStore, UserProfile } from "@/types";

const initialProfile: UserProfile = {
  origin: null,
  employment: null,
  housing: null,
  marital_status: null,
  has_children: null,
  completed_tasks: [],
  is_configured: false,
};

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      ...initialProfile,
      hasHydrated: false,

      setProfile: (profile: Partial<UserProfile>) => {
        set((state) => {
          const updated = { ...state, ...profile };
          // If all 5 core fields are filled, mark as configured
          const isComplete =
            updated.origin !== null &&
            updated.employment !== null &&
            updated.housing !== null &&
            updated.marital_status !== null &&
            updated.has_children !== null;

          return {
            ...profile,
            is_configured: profile.is_configured ?? isComplete,
          };
        });
      },

      updateField: (field, value) => {
        set((state) => {
          const nextState = { ...state, [field]: value };
          const isComplete =
            nextState.origin !== null &&
            nextState.employment !== null &&
            nextState.housing !== null &&
            nextState.marital_status !== null &&
            nextState.has_children !== null;

          return {
            [field]: value,
            is_configured: nextState.is_configured || isComplete,
          };
        });
      },

      toggleCompletedTask: (taskId: string) => {
        const { completed_tasks } = get();
        const exists = completed_tasks.includes(taskId);
        const updated = exists
          ? completed_tasks.filter((id) => id !== taskId)
          : [...completed_tasks, taskId];
        set({ completed_tasks: updated });
      },

      markTaskCompleted: (taskId: string, completed: boolean) => {
        const { completed_tasks } = get();
        const exists = completed_tasks.includes(taskId);
        if (completed && !exists) {
          set({ completed_tasks: [...completed_tasks, taskId] });
        } else if (!completed && exists) {
          set({ completed_tasks: completed_tasks.filter((id) => id !== taskId) });
        }
      },

      resetProfile: () => {
        set({
          ...initialProfile,
          completed_tasks: [],
          is_configured: false,
        });
      },

      setHasHydrated: (status: boolean) => {
        set({ hasHydrated: status });
      },
    }),
    {
      name: "nail_germany_profile_v1",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
