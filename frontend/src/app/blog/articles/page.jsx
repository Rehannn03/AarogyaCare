import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Footer from "@/components/blog/footer"

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      slug: "proven-home-remedies-seasonal-flu",
      title: "5 Proven Home Remedies for Seasonal Flu",
      excerpt: "Discover natural ways to combat seasonal flu symptoms with ingredients from your kitchen.",
      category: "Home Remedies",
      date: "April 18, 2025",
      image: "/blog/remedyflu.jpg",
      author: "Dr. Priya Sharma",
    },
    {
      id: 2,
      slug: "telehealth-vs-traditional-visits",
      title: "Telehealth vs Traditional Visits: Which is Better?",
      excerpt: "A comprehensive comparison of virtual and in-person healthcare consultations.",
      category: "Telehealth",
      date: "April 15, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745417397/telehealth_omxpbw.jpg",
      author: "Dr. Rahul Mehta",
    },
    {
      id: 3,
      slug: "turmeric-anti-inflammatory-properties",
      title: "The Science Behind Turmeric's Anti-inflammatory Properties",
      excerpt: "Research-backed insights into how this ancient spice helps reduce inflammation.",
      category: "Herbal Science",
      date: "April 10, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419204/tumeric_trstpj.webp",
      author: "Dr. Ananya Patel",
    },
    {
      id: 4,
      slug: "mindfulness-techniques-anxiety-management",
      title: "Mindfulness Techniques for Anxiety Management",
      excerpt: "Simple daily practices to help manage anxiety and improve mental wellbeing.",
      category: "Mental Wellness",
      date: "April 5, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419339/the-psychology-behind-negative-thoughts-551x431_b6elrd.jpg",
      author: "Dr. Vikram Singh",
    },
    {
      id: 5,
      slug: "future-of-personalized-medicine",
      title: "The Future of Personalized Medicine",
      excerpt: "How AI and genomics are revolutionizing healthcare delivery and treatment options.",
      category: "Healthcare Technology",
      date: "April 1, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419466/objective-health-precision-medicine-future-of-healthcare-personalized-healthcare-scaled_ehjgxz.jpg",
      author: "Dr. Sanjay Kumar",
    },
    {
      id: 6,
      slug: "boost-immunity-naturally",
      title: "10 Ways to Boost Your Immunity Naturally",
      excerpt: "Evidence-based approaches to strengthen your immune system without supplements.",
      category: "Nutrition",
      date: "March 28, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1724688248/cld-sample-4.jpg",
      author: "Dr. Meera Joshi",
    },
    {
      id: 7,
      slug: "ayurvedic-herbs-cold-season",
      title: "Essential Ayurvedic Herbs for Cold Season",
      excerpt: "Traditional herbs that can help prevent and treat common cold symptoms.",
      category: "Herbal Science",
      date: "March 25, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419631/ayurvedic-herbs-for-ensuring-winter-wellness_lyoczm.jpg",
      author: "Dr. Ananya Patel",
    },
    {
      id: 8,
      slug: "understanding-viral-infections",
      title: "Understanding Viral Infections: A Comprehensive Guide",
      excerpt: "Learn about how viruses work and the best ways to protect yourself.",
      category: "Health Education",
      date: "March 20, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419787/image-4-1024x682_rny3f4.webp",
      author: "Dr. Rahul Mehta",
    },
  ]

  const categories = [
    { name: "All Articles", count: articles.length, slug: "" },
    { name: "Home Remedies", count: 24, slug: "home-remedies" },
    { name: "Mental Wellness", count: 18, slug: "mental-wellness" },
    { name: "Telehealth", count: 12, slug: "telehealth" },
    { name: "Nutrition", count: 20, slug: "nutrition" },
    { name: "Herbal Science", count: 15, slug: "herbal-science" },
    { name: "Healthcare Technology", count: 8, slug: "healthcare-technology" },
    { name: "Health Education", count: 10, slug: "health-education" },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-4">Articles</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our collection of evidence-based articles on home remedies, healthcare insights, and wellness
            solutions.
          </p>
        </div>

        {/* Category Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.slug ? `/blog/categories/${category.slug}` : "/articles"}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.name === "All Articles"
                    ? "bg-teal-600 text-white"
                    : "bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                {category.name} ({category.count})
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in"
            >
              <Link href={`/blog/articles/${article.slug}`} className="block">
                <div className="relative h-48 w-full">
                  <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className=" object-contain" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 backdrop-blur-sm text-teal-700 hover:bg-white">
                      {article.category}
                    </Badge>
                  </div>
                </div>
              </Link>
              <CardHeader className="pb-2">
                <Link
                  href={`/blog/articles/${article.slug}`}
                  className="font-serif text-xl font-bold text-slate-800 hover:text-teal-600 transition-colors line-clamp-2"
                >
                  {article.title}
                </Link>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-slate-600 line-clamp-2">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-slate-500">
                <span>{article.author}</span>
                <span>{article.date}</span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1">
            <Button variant="outline" size="sm" disabled className="text-slate-400">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-teal-50 text-teal-700">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-8 md:p-12 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">
              Subscribe to Our Weekly Health Insights
            </h2>
            <p className="text-slate-600 mb-6">
              Get the latest articles, remedies, and wellness tips delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
