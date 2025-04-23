import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h4 className="font-serif text-xl font-bold text-white mb-4">AarogyaWellness</h4>
            <p className="text-slate-400 mb-4">Reimagining Healthcare for All</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-1">
            <h5 className="font-medium text-white mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog/articles" className="text-slate-400 hover:text-white transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/blog/categories" className="text-slate-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h5 className="font-medium text-white mb-4">Categories</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/categories/home-remedies" className="text-slate-400 hover:text-white transition-colors">
                  Home Remedies
                </Link>
              </li>
              <li>
                <Link href="/blog/categories/mental-wellness" className="text-slate-400 hover:text-white transition-colors">
                  Mental Wellness
                </Link>
              </li>
              <li>
                <Link href="/blog/categories/telehealth" className="text-slate-400 hover:text-white transition-colors">
                  Telehealth
                </Link>
              </li>
              <li>
                <Link href="/blog/categories/nutrition" className="text-slate-400 hover:text-white transition-colors">
                  Nutrition
                </Link>
              </li>
              <li>
                <Link href="/blog/categories/herbal-science" className="text-slate-400 hover:text-white transition-colors">
                  Herbal Science
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-1">
            <h5 className="font-medium text-white mb-4">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-slate-400 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} AarogyaWellness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
