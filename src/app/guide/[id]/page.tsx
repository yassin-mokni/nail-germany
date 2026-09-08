import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTasks, getTaskById, getRelatedTasks, slugify } from "@/lib/tasks";
import { GuideDetail } from "@/components/GuideDetail";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const tasks = getAllTasks();
  return tasks.map((task) => ({
    id: task.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const task = getTaskById(id);

  if (!task) {
    return {
      title: "Guide Not Found | Nail Germany",
    };
  }

  const title = `${task.title} (2026 Guide) | German Bureaucracy Checklist`;
  const description = `${task.description} Statutory reference: ${task.legal_ref || "German Law"}. Action steps, deadlines, and traps for expats.`;

  return {
    title,
    description,
    keywords: task.keywords || ["Germany expat", "German bureaucracy", task.title],
    alternates: {
      canonical: `https://nail-germany.mokni.dev/guide/${task.id}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://nail-germany.mokni.dev/guide/${task.id}/`,
      siteName: "Nail Germany",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "https://nail-germany.mokni.dev/og-image.png",
          width: 1200,
          height: 630,
          alt: `${task.title} | German Bureaucracy Checklist`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://nail-germany.mokni.dev/og-image.png"],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = getTaskById(id);

  if (!task) {
    notFound();
  }

  const relatedTasks = getRelatedTasks(task, 3);
  const categorySlug = slugify(task.category);

  // JSON-LD Structured Data for Search Engines
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: task.title,
    description: task.description,
    totalTime: task.estimated_time || "PT30M",
    step: task.action_steps?.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: step,
      url: `https://nail-germany.mokni.dev/guide/${task.id}/#step-${idx + 1}`,
    })),
  };

  const faqSchema = task.faq && task.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: task.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://nail-germany.mokni.dev/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: task.category,
        item: `https://nail-germany.mokni.dev/category/${categorySlug}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: task.title,
        item: `https://nail-germany.mokni.dev/guide/${task.id}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Search Engine Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-1">
        <GuideDetail task={task} relatedTasks={relatedTasks} />
      </main>

      <Footer />
    </div>
  );
}
