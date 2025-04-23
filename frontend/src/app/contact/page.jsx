import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import Footer from "@/components/blog/footer"
import HeaderNav from "@/components/Hero2/Navbar"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
        <HeaderNav />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-slate-800 mb-6 text-center">Contact Us</h1>
          <p className="text-slate-600 text-lg mb-12 text-center">
            Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out directly.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <Input id="name" type="text" placeholder="John Doe" className="w-full" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" className="w-full" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                    Subject
                  </label>
                  <Input id="subject" type="text" placeholder="How can we help you?" className="w-full" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message here..." className="w-full min-h-[150px]" />
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">Send Message</Button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-slate-800">Email</h3>
                    <p className="text-slate-600">info@aarogyawellness.com</p>
                    <p className="text-slate-600">support@aarogyawellness.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-slate-800">Phone</h3>
                    <p className="text-slate-600">+91 123 456 7890</p>
                    <p className="text-slate-600">+91 987 654 3210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-teal-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium text-slate-800">Office</h3>
                    <p className="text-slate-600">123 Wellness Avenue</p>
                    <p className="text-slate-600">Mumbai, Maharashtra 400001</p>
                    <p className="text-slate-600">India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl">
                <h3 className="font-serif font-bold text-slate-800 text-lg mb-2">Office Hours</h3>
                <p className="text-slate-600 mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-slate-600 mb-1">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-slate-600">Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Find Us</h2>
            <div className="h-80 bg-slate-200 rounded-xl flex items-center justify-center">
              <p className="text-slate-500">Interactive Map Would Be Displayed Here</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
