import type { MetadataRoute } from "next";
import { getAllTasks, getAllCategories } from "@/lib/tasks";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nail-germany.mokni.dev";
  const tasks = getAllTasks();
  const categories = getAllCategories();

  const taskEntries: MetadataRoute.Sitemap = tasks.map((task) => ({
    url: `${baseUrl}/guide/${task.id}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categoryEntries,
    ...taskEntries,
  ];
}
