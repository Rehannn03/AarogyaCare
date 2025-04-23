import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Footer from "@/components/blog/footer"
import HeaderNav from "@/components/Hero2/Navbar"

export default function CategoriesPage() {
  const categories = [
    {
      name: "Home Remedies",
      count: 24,
      slug: "home-remedies",
      description: "Natural solutions for common ailments using ingredients from your kitchen and garden.",
    },
    {
      name: "Mental Wellness",
      count: 18,
      slug: "mental-wellness",
      description: "Strategies and practices to support mental health, reduce stress, and improve emotional wellbeing.",
    },
    {
      name: "Telehealth",
      count: 12,
      slug: "telehealth",
      description: "Insights into virtual healthcare services, digital health tools, and remote patient monitoring.",
    },
    {
      name: "Nutrition",
      count: 20,
      slug: "nutrition",
      description: "Evidence-based information on healthy eating, dietary patterns, and nutritional supplements.",
    },
    {
      name: "Herbal Science",
      count: 15,
      slug: "herbal-science",
      description: "Scientific research on medicinal herbs, their properties, and applications in healthcare.",
    },
    {
      name: "Healthcare Technology",
      count: 8,
      slug: "healthcare-technology",
      description: "Innovations in medical technology, AI in healthcare, and digital health solutions.",
    },
    {
      name: "Health Education",
      count: 10,
      slug: "health-education",
      description: "Educational resources on various health topics, preventive care, and medical literacy.",
    },
    {
      name: "Ayurveda",
      count: 14,
      slug: "ayurveda",
      description: "Traditional Indian medicine focusing on balance between mind, body, and spirit.",
    },
    {
      name: "Yoga & Meditation",
      count: 16,
      slug: "yoga-meditation",
      description: "Practices for physical fitness, mental clarity, and spiritual wellbeing.",
    },
    {
      name: "Preventive Care",
      count: 22,
      slug: "preventive-care",
      description: "Proactive approaches to prevent illness and maintain optimal health.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-slate-800 mb-6 text-center">Categories</h1>
          <p className="text-slate-600 text-lg mb-12 text-center">
            Browse our articles by topic to find the information you're looking for.
          </p>

          <div className="grid gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/categories/${category.slug}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex justify-between items-center group"
              >
                <div>
                  <h2 className="font-serif text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-slate-600 mt-1">{category.description}</p>
                  <div className="text-sm text-slate-500 mt-2">{category.count} articles</div>
                </div>
                <ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-teal-600 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
