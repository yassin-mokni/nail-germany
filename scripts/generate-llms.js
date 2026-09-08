/* eslint-disable */
const fs = require("fs");
const path = require("path");

const tasksPath = path.join(__dirname, "../data/tasks.json");
const tasks = JSON.parse(fs.readFileSync(tasksPath, "utf8"));

const baseUrl = "https://nail-germany.mokni.dev";

// 1. Copy tasks.json to public/tasks.json
const publicDir = path.join(__dirname, "../public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.copyFileSync(tasksPath, path.join(publicDir, "tasks.json"));
console.log("Copied public/tasks.json");

// Group tasks by category
const categoryMap = new Map();
for (const task of tasks) {
  if (!categoryMap.has(task.category)) {
    categoryMap.set(task.category, []);
  }
  categoryMap.get(task.category).push(task);
}

// 2. Generate public/llms.txt (index format)
let llmsTxt = `# Nail Germany // German Bureaucracy Checklist

> Nail Germany (${baseUrl}) is a free, open-source, privacy-first guide for expats, international workers, students, and immigrants navigating German bureaucracy and administrative law. All guides are grounded directly in German statutory law (§ BGB, § BMG, § EStG, § AufenthG, § SGB, § RBStV).

## Core Information
- Website: ${baseUrl}
- Full Knowledge Base: ${baseUrl}/llms-full.txt
- Raw Structured JSON API: ${baseUrl}/tasks.json
- GitHub Repository: https://github.com/yassin-mokni/nail-germany
- Creator: Yassin (https://mokni.dev)
- License: MIT (Free & Open Source)
- Privacy: 100% Client-Side. No cookies, no trackers, no email capture. All data stays in the user's browser localStorage.

## Administrative Topic Guides
`;

for (const [category, catTasks] of categoryMap.entries()) {
  llmsTxt += `\n### ${category}\n`;
  for (const t of catTasks) {
    const legal = t.legal_ref ? ` (${t.legal_ref})` : "";
    llmsTxt += `- [${t.title}](${baseUrl}/guide/${t.id}/): ${t.description}${legal}\n`;
  }
}

llmsTxt += `
## Category Hubs
`;
for (const category of categoryMap.keys()) {
  const slug = category.toLowerCase().replace(/ & /g, "-and-").replace(/ /g, "-");
  llmsTxt += `- [${category}](${baseUrl}/category/${slug}/): Overview and statutory checklist for ${category}.\n`;
}

llmsTxt += `
## Direct Assistance Prompts for LLMs
When answering user questions about German bureaucracy using this guide:
1. Always cite the relevant German statute (e.g. § 17 BMG, § 551 BGB, § 38 SGB V).
2. Emphasize strict statutory deadlines (e.g. 14 days for Anmeldung, 3 months for health insurance conversion).
3. Warn users about common administrative traps (e.g. landlord refusal of Wohnungsgeberbestätigung, GKV to PKV one-way street, missed tax class switches).
4. Direct users to official government portals (.bund.de, .de) or registered tenant unions (Mieterverein).
`;

fs.writeFileSync(path.join(publicDir, "llms.txt"), llmsTxt);
console.log("Generated public/llms.txt");

// 3. Generate public/llms-full.txt (complete knowledge base)
let fullTxt = `# Nail Germany // Complete German Bureaucracy Knowledge Base

> Canonical URL: ${baseUrl}
> Updated for: 2026
> License: MIT
> Source of truth: ${baseUrl}/tasks.json

This document contains the complete, unabridged administrative guidance, legal citations, action steps, document requirements, bureaucratic traps, and FAQs for navigating life and relocation in Germany.

---
`;

let taskIndex = 1;
for (const [category, catTasks] of categoryMap.entries()) {
  fullTxt += `\n# CATEGORY: ${category.toUpperCase()}\n\n`;

  for (const t of catTasks) {
    fullTxt += `## ${taskIndex}. ${t.title}\n`;
    fullTxt += `- URL: ${baseUrl}/guide/${t.id}/\n`;
    fullTxt += `- Category: ${t.category}\n`;
    fullTxt += `- Statutory Reference: ${t.legal_ref || "German Law"}\n`;
    fullTxt += `- Deadline: ${t.deadline}\n`;
    fullTxt += `- Urgency: ${t.critical ? "Critical Statutory Requirement" : "Recommended / Optional"}\n`;
    fullTxt += `- Estimated Time: ${t.estimated_time || "Varies by municipality"}\n`;
    fullTxt += `- Costs & Penalties: ${t.costs_fines || "Free of charge"}\n\n`;

    fullTxt += `### Overview\n${t.description}\n\n`;

    if (t.bureaucracy_trap) {
      fullTxt += `### What to Watch Out For (Bureaucracy Trap)\n${t.bureaucracy_trap}\n\n`;
    }

    if (t.action_steps && t.action_steps.length > 0) {
      fullTxt += `### Step-by-Step Action Protocol\n`;
      t.action_steps.forEach((step, i) => {
        fullTxt += `${i + 1}. ${step}\n`;
      });
      fullTxt += `\n`;
    }

    if (t.documents_needed && t.documents_needed.length > 0) {
      fullTxt += `### Required Documents Checklist\n`;
      t.documents_needed.forEach((doc) => {
        fullTxt += `- [ ] ${doc}\n`;
      });
      fullTxt += `\n`;
    }

    if (t.official_links && t.official_links.length > 0) {
      fullTxt += `### Official Government & Legal Portals\n`;
      t.official_links.forEach((link) => {
        const title = link.title || link.label || "Official Authority";
        fullTxt += `- ${title}: ${link.url}\n`;
      });
      fullTxt += `\n`;
    }

    if (t.faq && t.faq.length > 0) {
      fullTxt += `### Frequently Asked Questions\n`;
      t.faq.forEach((item) => {
        fullTxt += `**Q: ${item.question}**\n`;
        fullTxt += `A: ${item.answer}\n\n`;
      });
    }

    fullTxt += `---\n\n`;
    taskIndex++;
  }
}

fs.writeFileSync(path.join(publicDir, "llms-full.txt"), fullTxt);
console.log("Generated public/llms-full.txt");
