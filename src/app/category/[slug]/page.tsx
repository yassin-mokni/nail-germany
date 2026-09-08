import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllCategories, getCategoryBySlug } from "@/lib/tasks";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UrgencyBadge } from "@/components/UrgencyBadge";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Nail Germany",
    };
  }

  const title = `${category.name} in Germany: Rules, Rights & Deadlines | Nail Germany`;
  const description = `Essential guide to ${category.name} for expats in Germany. ${category.description} Understand statutory deadlines and common administrative traps.`;

  return {
    title,
    description,
    keywords: [
      category.name,
      `${category.name} Germany`,
      "German bureaucracy",
      "Germany expat guide",
      "German administrative deadlines",
    ],
    alternates: {
      canonical: `https://nail-germany.mokni.dev/category/${category.slug}/`,
    },
    openGraph: {
      title,
      description,
      url: `https://nail-germany.mokni.dev/category/${category.slug}/`,
      siteName: "Nail Germany",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://nail-germany.mokni.dev/og-image.png",
          width: 1200,
          height: 630,
          alt: `${category.name} | German Bureaucracy Checklist`,
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allCategories = getAllCategories();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} in Germany`,
    description: category.description,
    url: `https://nail-germany.mokni.dev/category/${category.slug}/`,
    hasPart: category.tasks.map((t) => ({
      "@type": "HowTo",
      name: t.title,
      url: `https://nail-germany.mokni.dev/guide/${t.id}/`,
    })),
  };

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
        name: category.name,
        item: `https://nail-germany.mokni.dev/category/${category.slug}/`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-gray-700 flex items-center gap-2">
          <Link href="/" className="hover:underline hover:text-black">
            HOME
          </Link>
          <span>/</span>
          <span className="text-black font-bold uppercase">{category.name}</span>
        </nav>

        {/* Category Header Card */}
        <div className="border-4 border-black bg-white p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
            <span className="w-2.5 h-2.5 bg-black" />
            <span>TOPIC HUB // {category.tasks.length} PROCEDURES</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black font-sans leading-tight">
            {category.name} in Germany
          </h1>
          <p className="mt-3 text-base md:text-lg text-black font-medium leading-relaxed max-w-3xl">
            {category.description}
          </p>

          <div className="mt-6 p-4 border-2 border-black bg-yellow-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div>
              <span className="font-bold uppercase text-black block">INTERACTIVE PERSONAL CHECKLIST</span>
              <span className="text-gray-900 font-sans font-medium">Filter by your citizenship, job, and family status.</span>
            </div>
            <Link
              href="/"
              className="bg-black text-white px-4 py-2 font-bold uppercase hover:bg-white hover:text-black border-2 border-black transition-none shrink-0"
            >
              [OPEN CHECKLIST →]
            </Link>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4 mb-10">
          <div className="border-b-2 border-black pb-2 flex items-center justify-between font-mono text-xs font-bold text-gray-700 uppercase">
            <span>OFFICIAL GUIDES & STATUTES ({category.tasks.length})</span>
          </div>

          {category.tasks.map((task, idx) => (
            <article
              key={task.id}
              className="border-4 border-black bg-white p-5 hover:bg-yellow-50 transition-none"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold">GUIDE #{String(idx + 1).padStart(2, "0")}</span>
                  <UrgencyBadge urgency={task.urgency} />
                </div>
                {task.legal_ref && (
                  <span className="border border-black px-2 py-0.5 bg-gray-100 font-bold text-[11px]">
                    LAW: {task.legal_ref}
                  </span>
                )}
              </div>

              <h2 className="text-xl md:text-2xl font-black uppercase text-black tracking-tight leading-snug">
                <Link href={`/guide/${task.id}/`} className="hover:underline">
                  {task.title}
                </Link>
              </h2>

              {task.deadline && (
                <div className="mt-2 font-mono text-xs font-bold text-red-800 bg-red-50 border border-red-200 px-2 py-0.5 inline-block">
                  DEADLINE: {task.deadline}
                </div>
              )}

              <p className="mt-2 text-sm md:text-base text-gray-900 font-medium leading-relaxed">
                {task.description}
              </p>

              {task.trap_warning && (
                <div className="mt-3 p-2.5 border border-black bg-amber-50 font-sans text-xs font-medium text-black">
                  <span className="font-bold font-mono text-[10px] bg-black text-amber-300 px-1 py-0.5 mr-1.5 uppercase">
                    TRAP:
                  </span>
                  {task.trap_warning}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="text-gray-600">
                  {task.action_steps?.length || 0} Action Steps • {task.estimated_time || "Direct Procedure"}
                </span>
                <Link
                  href={`/guide/${task.id}/`}
                  className="font-bold text-black underline hover:bg-black hover:text-white px-1 transition-none"
                >
                  Read Complete Guide →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Other Categories Hub Navigation */}
        <div className="border-4 border-black bg-white p-6 mb-8">
          <div className="border-b-2 border-black pb-2 mb-4 font-mono text-xs font-bold uppercase text-black">
            EXPLORE OTHER BUREAUCRACY HUBS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
            {allCategories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}/`}
                  className="border-2 border-black p-3 hover:bg-yellow-100 transition-none flex flex-col justify-between"
                >
                  <div>
                    <span className="font-black text-sm uppercase block text-black">
                      {c.name}
                    </span>
                    <span className="text-[11px] text-gray-600 mt-1 block">
                      {c.tasks.length} Procedures
                    </span>
                  </div>
                  <span className="mt-3 text-[11px] font-bold underline text-black">
                    View Hub →
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
