import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Mail } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/blog/footer"
import { getAllCategories } from "@/lib/categories"

export default function HomePage() {
  const featuredArticles = [
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
  ]

  // Get top 5 categories
  const categories = getAllCategories().slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-teal-50 to-blue-50 py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-fade-in">
                <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1">Wellness & Healthcare</Badge>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                  Empowering Health with Nature & AI
                </h1>
                <p className="text-slate-600 text-lg md:text-xl max-w-lg">
                  Your trusted space for home remedies, healthcare insights, and modern wellness solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
                    <Link href="/blog/articles">
                      Explore Articles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
                    <Link href="/about">Learn About Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg animate-slide-in">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Healthcare professionals"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-100/20 -skew-x-12 transform origin-top-right"></div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-10">
                <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">Latest Articles</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredArticles.map((article) => (
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
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50" asChild>
                    <Link href="/blog/articles">
                      View All Articles
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
                <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Link
                        href={`/blog/categories/${category.slug}`}
                        className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-teal-50 text-slate-700 hover:text-teal-700 transition-colors"
                      >
                        <span>{category.name}</span>
                        <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                          {/* We would normally count articles here */}
                          {Math.floor(Math.random() * 20) + 5}
                        </Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-center">
                  <Link 
                    href="/categories" 
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
                  >
                    View All Categories
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl shadow-sm animate-fade-in">
                <div className="flex items-center mb-4">
                  <Mail className="h-5 w-5 text-teal-600 mr-2" />
                  <h3 className="font-serif text-xl font-bold text-slate-800">Newsletter</h3>
                </div>
                <p className="text-slate-600 mb-4">Subscribe for weekly remedies & wellness tips</p>
                <form className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/80 border-teal-100 focus:border-teal-300 focus:ring-teal-300"
                  />
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Subscribe</Button>
                </form>
                <p className="text-xs text-slate-500 mt-3">
                  By subscribing, you agree to our privacy policy and consent to receive updates.
                </p>
              </div>

              {/* Featured Article */}
              <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
                <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">Editor's Pick</h3>
                <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src="/blog/boostimmunity.jpg"
                    alt="Editor's pick"
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-serif font-bold text-slate-800 mb-2">10 Ways to Boost Your Immunity Naturally</h4>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                  Evidence-based approaches to strengthen your immune system without supplements.
                </p>
                <Link
                  href="/articles/boost-immunity-naturally"
                  className="text-teal-600 hover:text-teal-700 text-sm font-medium inline-flex items-center"
                >
                  Read Full Article
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
