"use client";

import { useMemo } from "react";
import rawTasks from "@/data/tasks.json";
import { TaskItem, UserProfile } from "@/types";
import { useProfileStore } from "@/store/useProfileStore";

const allTasks = rawTasks as TaskItem[];

function checkConditionMatch<T>(
  userVal: T | null | undefined,
  conditionVal: T | T[] | undefined
): boolean {
  if (conditionVal === undefined) return true;
  if (userVal === null || userVal === undefined) return false;

  if (Array.isArray(conditionVal)) {
    return (conditionVal as unknown as T[]).includes(userVal);
  }
  return userVal === conditionVal;
}

export function matchesProfile(task: TaskItem, profile: UserProfile): boolean {
  const { conditions } = task;
  if (!conditions || Object.keys(conditions).length === 0) {
    return true;
  }

  // Check origin
  if (conditions.origin !== undefined) {
    if (!checkConditionMatch(profile.origin, conditions.origin)) {
      return false;
    }
  }

  // Check employment
  if (conditions.employment !== undefined) {
    if (!checkConditionMatch(profile.employment, conditions.employment)) {
      return false;
    }
  }

  // Check housing
  if (conditions.housing !== undefined) {
    if (!checkConditionMatch(profile.housing, conditions.housing)) {
      return false;
    }
  }

  // Check marital_status
  if (conditions.marital_status !== undefined) {
    if (!checkConditionMatch(profile.marital_status, conditions.marital_status)) {
      return false;
    }
  }

  // Check has_children
  if (conditions.has_children !== undefined) {
    if (profile.has_children !== conditions.has_children) {
      return false;
    }
  }

  return true;
}

export function useFilteredTasks() {
  const origin = useProfileStore((s) => s.origin);
  const employment = useProfileStore((s) => s.employment);
  const housing = useProfileStore((s) => s.housing);
  const marital_status = useProfileStore((s) => s.marital_status);
  const has_children = useProfileStore((s) => s.has_children);
  const completed_tasks = useProfileStore((s) => s.completed_tasks);
  const is_configured = useProfileStore((s) => s.is_configured);

  const profile: UserProfile = useMemo(
    () => ({
      origin,
      employment,
      housing,
      marital_status,
      has_children,
      completed_tasks,
      is_configured,
    }),
    [origin, employment, housing, marital_status, has_children, completed_tasks, is_configured]
  );

  const filteredTasks = useMemo(() => {
    return allTasks.filter((task) => matchesProfile(task, profile));
  }, [profile]);

  const categories = useMemo(() => {
    return Array.from(new Set(filteredTasks.map((t) => t.category))).sort();
  }, [filteredTasks]);

  const completedCount = useMemo(() => {
    return filteredTasks.filter((t) => completed_tasks.includes(t.id)).length;
  }, [filteredTasks, completed_tasks]);

  const totalCount = filteredTasks.length;
  const pendingCount = totalCount - completedCount;

  const criticalTasks = useMemo(() => {
    return filteredTasks.filter((t) => t.urgency === "critical");
  }, [filteredTasks]);

  const criticalPendingCount = useMemo(() => {
    return criticalTasks.filter((t) => !completed_tasks.includes(t.id)).length;
  }, [criticalTasks, completed_tasks]);

  const recommendedTasks = useMemo(() => {
    return filteredTasks.filter((t) => t.urgency === "recommended");
  }, [filteredTasks]);

  const optionalTasks = useMemo(() => {
    return filteredTasks.filter((t) => t.urgency === "optional");
  }, [filteredTasks]);

  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return {
    profile,
    filteredTasks,
    allTasks,
    categories,
    totalCount,
    completedCount,
    pendingCount,
    criticalTasks,
    criticalPendingCount,
    recommendedTasks,
    optionalTasks,
    progressPercentage,
  };
}
