import tasksData from "../../data/tasks.json";
import { TaskItem } from "@/types";

export const allTasks: TaskItem[] = tasksData as TaskItem[];

export function getAllTasks(): TaskItem[] {
  return allTasks;
}

export function getTaskById(id: string): TaskItem | undefined {
  return allTasks.find((t) => t.id === id);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface CategoryHub {
  name: string;
  slug: string;
  description: string;
  tasks: TaskItem[];
}

const categoryDescriptions: Record<string, string> = {
  "Housing & Rent":
    "Tenancy rights in Germany, rental deposit 3-installment protections (§ 551 BGB), utility bill audits (Nebenkosten), and Mieterverein defense.",
  "Housing & Media":
    "Public broadcasting fee (Rundfunkbeitrag) registration rules, WG flatshare exemptions, and avoiding duplicate debt collections.",
  "Immigration & Legal":
    "Address registration (Anmeldung within 14 days), residence permit conversions (Aufenthaltstitel), and statutory Fiktionswirkung work authorizations.",
  "Legal & Insurance":
    "Mandatory health insurance transition (GKV/PKV), tenancy legal insurance (Rechtsschutz), and statutory consumer contract cancellation rights.",
  "Taxes & Employment":
    "German tax classes (Steuerklassen III/V), freelance tax registrations (ELSTER Fragebogen), Tax ID emergency retrieval, and probation dismissal protections.",
  "Family & Social":
    "Child benefits (Kindergeld 250 EUR/month), parental allowances (Elterngeld), daycare vouchers (Kita-Gutschein), and regional state subsidies.",
  "Finance & Study":
    "Student blocked accounts (Sperrkonto activation), checking accounts (Girokonto), and free credit reports under Article 15 GDPR (SCHUFA)."
};

export function getAllCategories(): CategoryHub[] {
  const categoryMap = new Map<string, TaskItem[]>();

  for (const task of allTasks) {
    const list = categoryMap.get(task.category) || [];
    list.push(task);
    categoryMap.set(task.category, list);
  }

  return Array.from(categoryMap.entries()).map(([name, tasks]) => ({
    name,
    slug: slugify(name),
    description: categoryDescriptions[name] || "Essential administrative requirements and expat legal protocols.",
    tasks,
  }));
}

export function getCategoryBySlug(slug: string): CategoryHub | undefined {
  const categories = getAllCategories();
  return categories.find((c) => c.slug === slug);
}

export function getRelatedTasks(task: TaskItem, limit = 3): TaskItem[] {
  return allTasks
    .filter((t) => t.id !== task.id)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === task.category && b.category !== task.category) return -1;
      if (b.category === task.category && a.category !== task.category) return 1;
      return 0;
    })
    .slice(0, limit);
}
