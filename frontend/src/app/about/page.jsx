import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Footer from "@/components/blog/footer"
import HeaderNav from "@/components/Hero2/Navbar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main>
        {/* Hero Section */}
        <HeaderNav />
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 mb-6">About AarogyaWellness</h1>
              <p className="text-slate-600 text-lg md:text-xl mb-8">
                Your trusted source for evidence-based health information, home remedies, and wellness insights.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
                <Image src="https://res.cloudinary.com/dnmjiwqso/image/upload/v1745421204/rpm-vs-telehealth-1_lqzb9m.webp" alt="Our mission" fill className="object-contain" />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold text-slate-800 mb-4">Our Mission</h2>
                <p className="text-slate-600 mb-4">
                  At AarogyaWellness, we believe that everyone deserves access to reliable, evidence-based health
                  information that bridges traditional wisdom with modern science.
                </p>
                <p className="text-slate-600 mb-4">
                  Our mission is to empower individuals to take control of their health through knowledge, providing
                  practical insights into home remedies, preventive care, and holistic wellness approaches.
                </p>
                <p className="text-slate-600">
                  We are committed to making healthcare information accessible, actionable, and inclusive, helping our
                  readers make informed decisions about their wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-12 text-center">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://res.cloudinary.com/dnmjiwqso/image/upload/v1745420277/Bilal_c8dbvn.jpg"
                    alt="Mr.Bilal Ansari"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-1">Mr.Bilal Ansari</h3>
                <p className="text-teal-600 mb-2">CyberSecurity</p>
                <p className="text-slate-600 text-sm">
                  Specializes in cybersecurity for healthcare systems, ensuring patient data protection and digital privacy compliance.
                </p>
              </div>
              <div className="text-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://res.cloudinary.com/dnmjiwqso/image/upload/v1745420508/Rehan_i7ev1e.jpg"
                    alt="Mr. Rehan Shah"
                    fill
                    className="object-cover left-2"
                  />
                </div>
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-1">Mr. Rehan Shah </h3>
                <p className="text-teal-600 mb-2">Backend Specialist</p>
                <p className="text-slate-600 text-sm">
                  Focuses on backend development, ensuring seamless integration of health data and user experience.
                </p>
              </div>
              <div className="text-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://res.cloudinary.com/dnmjiwqso/image/upload/v1745420717/Affaan_xw1wfp.jpg"
                    alt="Dr. Ananya Patel"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-1">Mr. Affan Arbani</h3>
                <p className="text-teal-600 mb-2">AI Expert</p>
                <p className="text-slate-600 text-sm">
                  Expert in AI and machine learning, focusing on data analysis and predictive modeling for health insights.
                </p>
              </div>
              <div className="text-center justify-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="https://res.cloudinary.com/dnmjiwqso/image/upload/v1745421080/Azlaan_ko4pqw.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-1">Mr.Azlaan Shaikh </h3>
                <p className="text-teal-600 mb-2">Frontend Specialist</p>
                <p className="text-slate-600 text-sm">
                  Frontend developer with a focus on user experience, ensuring our platform is intuitive and user-friendly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-12 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-4">Evidence-Based Approach</h3>
                <p className="text-slate-600">
                  We prioritize scientific research and clinical evidence in all our content, ensuring accuracy and reliability.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-4">Accessibility</h3>
                <p className="text-slate-600">
                  We believe health information should be clear, understandable, and available to everyone.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-4">Holistic Perspective</h3>
                <p className="text-slate-600">
                  We recognize that true wellness encompasses physical, mental, and spiritual dimensions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-800 mb-6">Join Our Wellness Journey</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly health tips, remedies, and the latest in wellness research.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white" asChild>
              <Link href="/articles">Explore Our Articles</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
