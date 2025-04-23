import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Footer from "@/components/blog/footer"
import { getCategoryBySlug, getAllCategories } from "@/lib/categories"

// This would normally come from a database or API
const getArticles = () => {
  return [
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
      category: "Immunity & Wellness",
      date: "March 28, 2025",
      image: "/blog/boostimmunity.jpg",
      author: "Dr. Meera Kapoor",
    },
    {
      id: 7,
      slug: "ayurvedic-herbs-cold-season",
      title: "Essential Ayurvedic Herbs for Cold Season",
      excerpt: "Traditional herbs that can help prevent and treat common cold symptoms.",
      category: "Ayurveda & Herbal Remedies",
      date: "March 25, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419631/ayurvedic-herbs-for-ensuring-winter-wellness_lyoczm.jpg",
      author: "Dr. Neelima Joshi",
    },
    {
      id: 8,
      slug: "understanding-viral-infections",
      title: "Understanding Viral Infections: A Comprehensive Guide",
      excerpt: "Learn about how viruses work and the best ways to protect yourself.",
      category: "Health Education",
      date: "March 20, 2025",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419787/image-4-1024x682_rny3f4.webp",
      author: "Dr. Arjun Mehta",
    },
    {
      id: 9,
      slug: "anti-inflammatory-diet",
      title: "The Complete Guide to Anti-Inflammatory Diet",
      excerpt: "How to reduce inflammation through diet and improve overall health.",
      category: "Nutrition & Wellness",
      date: "March 15, 2025",
      image: "/blog/antiinflammatory.jpg",
      author: "Dr. Kavita Rao",
    },
    {
      id: 10,
      slug: "ayurvedic-herbs-modern-science",
      title: "Ayurvedic Herbs Through the Lens of Modern Science",
      excerpt: "How modern research validates traditional Ayurvedic herbal remedies.",
      category: "Ayurveda & Research",
      date: "March 10, 2025",
      image: "/blog/modernayurveda.jpg",
      author: "Dr. Rajeev Patil",
    },
    {
      id: 11,
      slug: "natural-pain-management",
      title: "Natural Approaches to Pain Management",
      excerpt: "Effective non-pharmaceutical methods to manage chronic and acute pain.",
      category: "Natural Therapies",
      date: "March 5, 2025",
      image: "/blog/naturalpain.jpg",
      author: "Dr. Anita Menon",
    },
  ];
};

// Get articles by category
const getArticlesByCategory = (categorySlug) => {
  const articles = getArticles();
  const category = getCategoryBySlug(categorySlug);
  
  if (!category) return [];
  
  // Filter articles by category
  return articles.filter(article => {
    const categoryWords = category.name.toLowerCase().split(/[&\s]+/);
    const articleCategoryLower = article.category.toLowerCase();
    
    return categoryWords.some(word => 
      word.length > 3 && articleCategoryLower.includes(word)
    );
  });
};

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug);
  const articles = getArticlesByCategory(params.slug);
  const allCategories = getAllCategories();

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/blog/categories">View All Categories</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/blog/categories"
            className="text-teal-600 hover:text-teal-700 inline-flex items-center text-sm font-medium"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            All Categories
          </Link>
        </div>

        {/* Category Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 mb-4">{category.name}</h1>
          <p className="text-slate-600 text-lg max-w-3xl">{category.description}</p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden hover:shadow-md transition-shadow duration-300 animate-fade-in"
              >
                <Link href={`/blog/articles/${article.slug}`} className="block">
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
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
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-6">No articles found in this category yet.</p>
            <Button asChild>
              <Link href="/articles">Browse All Articles</Link>
            </Button>
          </div>
        )}

        {/* Related Categories */}
      </main>

      <Footer />
    </div>
  );
}
