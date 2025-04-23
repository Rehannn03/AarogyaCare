"use client"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Calendar, User, Tag, Share2, Bookmark, ThumbsUp, MessageSquare, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/blog/footer"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// This would normally come from a database or API
const getArticleData = (slug) => {
  const articles = {
    "proven-home-remedies-seasonal-flu": {
      title: "5 Proven Home Remedies for Seasonal Flu",
      category: "Home Remedies",
      date: "April 18, 2025",
      author: "Dr. Priya Sharma",
      authorTitle: "Ayurvedic Practitioner & Wellness Expert",
      authorImage: "/placeholder.svg?height=100&width=100",
      image: "/blog/remedyflu.jpg",
      content: `
        <p class="lead">Seasonal flu can be debilitating, but nature offers several effective remedies that can help alleviate symptoms and speed up recovery. Here are five proven home remedies backed by both traditional wisdom and modern research.</p>
        
        <h2>1. Ginger and Honey Tea</h2>
        <p>Ginger has powerful anti-inflammatory and antioxidant properties that can help soothe a sore throat and reduce inflammation. When combined with honey, which has natural antibacterial properties, it creates a potent remedy for flu symptoms.</p>
        <p><strong>How to prepare:</strong> Slice fresh ginger root and steep in boiling water for 5-10 minutes. Strain and add a tablespoon of raw honey when the tea has cooled slightly. Drink 3-4 cups daily.</p>
        
        <h2>2. Turmeric Milk (Golden Milk)</h2>
        <p>Turmeric contains curcumin, a compound with powerful anti-inflammatory effects. When consumed with milk, which provides protein and hydration, it can help boost immunity and reduce flu symptoms.</p>
        <p><strong>How to prepare:</strong> Heat a cup of milk with 1/2 teaspoon of turmeric powder, a pinch of black pepper (to enhance curcumin absorption), and optional cinnamon and honey for taste. Simmer for 5 minutes and drink before bedtime.</p>
        
        <h2>3. Steam Inhalation with Eucalyptus</h2>
        <p>Steam inhalation helps clear congested nasal passages and sinuses. Adding eucalyptus oil, which has antimicrobial properties, enhances the decongestant effect.</p>
        <p><strong>How to use:</strong> Add a few drops of eucalyptus oil to a bowl of hot water. Cover your head with a towel and inhale the steam for 5-10 minutes, 2-3 times daily.</p>
        
        <h2>4. Garlic Soup</h2>
        <p>Garlic contains allicin, a compound with antimicrobial and antiviral properties. Consuming garlic soup can help fight the infection causing the flu.</p>
        <p><strong>How to prepare:</strong> Simmer 4-5 crushed garlic cloves in 2 cups of vegetable or chicken broth for 10 minutes. Add herbs like thyme or parsley for additional benefits and flavor.</p>
        
        <h2>5. Salt Water Gargle</h2>
        <p>A simple salt water gargle can reduce throat inflammation and kill bacteria in the throat.</p>
        <p><strong>How to prepare:</strong> Dissolve 1/2 teaspoon of salt in a glass of warm water. Gargle for 30 seconds, then spit out. Repeat 3-4 times daily.</p>
        
        <h2>When to See a Doctor</h2>
        <p>While these remedies can help manage mild to moderate flu symptoms, it's important to consult a healthcare professional if:</p>
        <ul>
          <li>Your fever exceeds 103°F (39.4°C) or lasts more than three days</li>
          <li>You experience difficulty breathing or chest pain</li>
          <li>You have severe or persistent vomiting</li>
          <li>You notice signs of dehydration</li>
          <li>Your symptoms worsen after initial improvement</li>
        </ul>
        
        <p>Remember that these remedies are meant to complement, not replace, conventional medical advice. Stay hydrated, get plenty of rest, and give your body time to heal.</p>
      `,
      tags: ["Flu Remedies", "Natural Medicine", "Immunity", "Herbal Remedies", "Seasonal Illness"],
      relatedArticles: [
        {
          slug: "boost-immunity-naturally",
          title: "10 Ways to Boost Your Immunity Naturally",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "ayurvedic-herbs-cold-season",
          title: "Essential Ayurvedic Herbs for Cold Season",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "understanding-viral-infections",
          title: "Understanding Viral Infections: A Comprehensive Guide",
          image: "/placeholder.svg?height=150&width=300",
        },
      ],
    },
    "ayurvedic-herbs-cold-season": {
  title: "Essential Ayurvedic Herbs for Cold Season",
  category: "Ayurveda & Herbal Remedies",
  date: "April 23, 2025",
  author: "Dr. Neelima Joshi",
  authorTitle: "Ayurveda Consultant & Herbal Specialist",
  authorImage: "/placeholder.svg?height=100&width=100",
  image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419631/ayurvedic-herbs-for-ensuring-winter-wellness_lyoczm.jpg",
  content: `
    <p class="lead">As the cold season sets in, it's important to support your immune system and respiratory health. Ayurveda offers time-tested herbs that help the body stay strong and resilient against seasonal illnesses.</p>
    
    <h2>1. Tulsi (Holy Basil)</h2>
    <p>Tulsi is revered for its adaptogenic and antimicrobial properties. It helps relieve cold, cough, and congestion while boosting overall immunity.</p>
    <p><strong>How to use:</strong> Drink tulsi tea or chew fresh tulsi leaves daily during the winter months.</p>

    <h2>2. Ashwagandha</h2>
    <p>Ashwagandha supports the body's ability to manage stress, which can suppress immunity. It also improves strength and vitality.</p>
    <p><strong>How to use:</strong> Take 300–500mg of standardized extract with warm milk or water, preferably at night.</p>

    <h2>3. Mulethi (Licorice Root)</h2>
    <p>Mulethi soothes the throat and has anti-inflammatory and antiviral properties. It’s excellent for sore throats and dry cough.</p>
    <p><strong>How to use:</strong> Boil a small stick in water and drink as herbal tea 2–3 times a day.</p>

    <h2>4. Guduchi (Giloy)</h2>
    <p>Known as “Amrit” in Ayurveda, Guduchi boosts immunity, detoxifies the body, and reduces symptoms of cold and fever.</p>
    <p><strong>How to use:</strong> Consume 1 tsp of Guduchi powder or juice with warm water daily.</p>

    <h2>5. Pippali (Long Pepper)</h2>
    <p>Pippali supports respiratory health and helps clear congestion. It also enhances digestion, which is crucial during the cold season.</p>
    <p><strong>How to use:</strong> Mix Pippali powder with honey and take once or twice daily.</p>

    <h2>Safety Tips</h2>
    <p>Although these herbs are natural, they should be used with guidance from a healthcare professional, especially if you are pregnant, nursing, or on medication.</p>

    <p>Embrace the wisdom of Ayurveda to keep your body balanced and strong through the colder months. Alongside herbs, eat warm foods, stay hydrated, and dress appropriately for the weather.</p>
  `,
  tags: ["Ayurveda", "Herbal Medicine", "Cold Season", "Natural Immunity", "Wellness"],
  relatedArticles: [
    {
      slug: "boost-immunity-naturally",
      title: "10 Ways to Boost Your Immunity Naturally",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "proven-home-remedies-seasonal-flu",
      title: "5 Proven Home Remedies for Seasonal Flu",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "understanding-viral-infections",
      title: "Understanding Viral Infections: A Comprehensive Guide",
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
},
"understanding-viral-infections": {
  title: "Understanding Viral Infections: A Comprehensive Guide",
  category: "Health Education",
  date: "April 23, 2025",
  author: "Dr. Arjun Mehta",
  authorTitle: "Infectious Disease Specialist",
  authorImage: "/placeholder.svg?height=100&width=100",
  image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419787/image-4-1024x682_rny3f4.webp",
  content: `
    <p class="lead">Viral infections are among the most common causes of illness worldwide. Understanding how viruses work and how they affect your body is key to prevention and recovery.</p>
    
    <h2>What Are Viruses?</h2>
    <p>Viruses are microscopic infectious agents that require a host cell to replicate. They invade healthy cells and hijack their machinery to produce more viruses, often damaging or destroying the cells in the process.</p>

    <h2>Common Types of Viral Infections</h2>
    <ul>
      <li>Common cold (caused by rhinoviruses)</li>
      <li>Influenza (flu)</li>
      <li>COVID-19 (caused by SARS-CoV-2)</li>
      <li>Herpes (HSV-1 and HSV-2)</li>
      <li>Hepatitis A, B, and C</li>
      <li>Chickenpox and shingles (Varicella-Zoster Virus)</li>
    </ul>

    <h2>How Viral Infections Spread</h2>
    <p>Viral infections can spread through various routes including air (coughing, sneezing), direct contact, contaminated surfaces, and bodily fluids.</p>

    <h2>Symptoms of Viral Infections</h2>
    <p>Symptoms vary depending on the virus but often include:</p>
    <ul>
      <li>Fever and chills</li>
      <li>Cough, sore throat</li>
      <li>Fatigue and muscle aches</li>
      <li>Gastrointestinal distress</li>
      <li>Skin rashes (in some cases)</li>
    </ul>

    <h2>Treatment Options</h2>
    <p>There are no antibiotics for viral infections. Treatment generally focuses on relieving symptoms and supporting the immune system. Antiviral drugs may be prescribed for specific infections like HIV, influenza, or hepatitis.</p>

    <h2>Prevention Tips</h2>
    <ul>
      <li>Wash hands regularly</li>
      <li>Avoid close contact with sick individuals</li>
      <li>Disinfect surfaces frequently</li>
      <li>Get vaccinated</li>
      <li>Maintain a healthy lifestyle and immune system</li>
    </ul>

    <p>Knowledge is power. By understanding how viruses behave and spread, you can take proactive steps to protect yourself and those around you.</p>
  `,
  tags: ["Viral Infections", "Health Awareness", "Prevention", "Vaccination", "Infectious Diseases"],
  relatedArticles: [
    {
      slug: "boost-immunity-naturally",
      title: "10 Ways to Boost Your Immunity Naturally",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "proven-home-remedies-seasonal-flu",
      title: "5 Proven Home Remedies for Seasonal Flu",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "ayurvedic-herbs-modern-science",
      title: "Ayurvedic Herbs Through the Lens of Modern Science",
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
},

    "boost-immunity-naturally": {
    title: "10 Ways to Boost Your Immunity Naturally",
    category: "Immunity & Wellness",
    date: "April 23, 2025",
    author: "Dr. Meera Kapoor",
    authorTitle: "Integrative Medicine Specialist",
    authorImage: "",
    image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1724688248/cld-sample-4.jpg",
    content: `
      <p class="lead">In today's fast-paced world, maintaining a strong immune system is key to preventing illness and feeling your best. Here are 10 effective, natural ways to strengthen your body’s defenses.</p>
      
      <h2>1. Eat a Balanced, Nutrient-Rich Diet</h2>
      <p>Include plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats in your daily meals. Vitamins C, D, and E, as well as zinc and iron, play key roles in immune health.</p>

      <h2>2. Stay Hydrated</h2>
      <p>Water helps your body produce lymph, which carries infection-fighting white blood cells throughout the body. Aim for 8–10 glasses of water per day.</p>

      <h2>3. Get Adequate Sleep</h2>
      <p>Sleep is essential for immune regulation. Adults should aim for 7–9 hours of quality sleep per night to allow the body to repair and rejuvenate.</p>

      <h2>4. Exercise Regularly</h2>
      <p>Moderate exercise like brisk walking, yoga, or cycling for 30 minutes a day can help stimulate immune cell circulation and reduce inflammation.</p>

      <h2>5. Manage Stress Effectively</h2>
      <p>Chronic stress suppresses immune function. Practice meditation, deep breathing, or mindfulness daily to stay mentally and emotionally balanced.</p>

      <h2>6. Use Natural Immunity Boosters</h2>
      <p>Herbs like ashwagandha, tulsi (holy basil), and giloy are known in Ayurveda to enhance immunity. Consult a healthcare professional before adding these to your routine.</p>

      <h2>7. Avoid Smoking and Limit Alcohol</h2>
      <p>Smoking and excessive alcohol intake impair the immune system. Reducing or eliminating these habits significantly benefits your health.</p>

      <h2>8. Get Sunlight for Vitamin D</h2>
      <p>Vitamin D is crucial for immune function. Spend 15–20 minutes in morning sunlight or consider supplements if you're deficient.</p>

      <h2>9. Include Probiotics in Your Diet</h2>
      <p>Probiotics found in yogurt, kefir, and fermented foods like kimchi and sauerkraut help maintain gut health, which is closely linked to immunity.</p>

      <h2>10. Maintain Good Hygiene</h2>
      <p>Simple habits like washing hands regularly, sanitizing surfaces, and avoiding touching your face can prevent the spread of infections.</p>

      <h2>When to Seek Professional Help</h2>
      <p>If you frequently fall ill despite taking these precautions, it's important to consult a doctor to rule out underlying conditions or nutritional deficiencies.</p>

      <p>Boosting immunity is a lifelong habit. With small, consistent changes, you can support your body’s natural defenses and enjoy a healthier, more resilient life.</p>
    `,
    tags: ["Immunity", "Natural Health", "Ayurveda", "Lifestyle", "Wellness"],
    relatedArticles: [
      {
        slug: "proven-home-remedies-seasonal-flu",
        title: "5 Proven Home Remedies for Seasonal Flu",
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        slug: "ayurvedic-herbs-cold-season",
        title: "Essential Ayurvedic Herbs for Cold Season",
        image: "/placeholder.svg?height=150&width=300",
      },
      {
        slug: "understanding-viral-infections",
        title: "Understanding Viral Infections: A Comprehensive Guide",
        image: "/placeholder.svg?height=150&width=300",
      },
    ],
  },
    "telehealth-vs-traditional-visits": {
      title: "Telehealth vs Traditional Visits: Which is Better?",
      category: "Telehealth",
      date: "April 15, 2025",
      author: "Dr. Rahul Mehta",
      authorTitle: "Digital Health Specialist",
      authorImage: "/placeholder.svg?height=100&width=100",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745417397/telehealth_omxpbw.jpg",
      content: `
        <p class="lead">The healthcare landscape is rapidly evolving, with telehealth emerging as a convenient alternative to traditional in-person visits. This article examines the pros and cons of both approaches to help you make informed healthcare decisions.</p>
        
        <h2>Understanding Telehealth</h2>
        <p>Telehealth refers to the use of digital information and communication technologies to access healthcare services remotely. This can include video consultations, remote monitoring, and mobile health applications.</p>
        
        <h2>Comparing Telehealth and Traditional Visits</h2>
        
        <h3>Accessibility</h3>
        <p><strong>Telehealth:</strong> Eliminates geographical barriers, making healthcare accessible to people in remote areas or those with mobility issues. Available 24/7 in many cases.</p>
        <p><strong>Traditional Visits:</strong> Limited by location and office hours. May require significant travel time and arrangements for transportation.</p>
        
        <h3>Quality of Care</h3>
        <p><strong>Telehealth:</strong> Effective for many conditions, especially follow-ups, mental health services, and managing chronic conditions. Limited in physical examinations and certain diagnostics.</p>
        <p><strong>Traditional Visits:</strong> Allows for comprehensive physical examinations, immediate diagnostic tests, and direct intervention when needed.</p>
        
        <h3>Cost Considerations</h3>
        <p><strong>Telehealth:</strong> Generally less expensive due to reduced overhead costs. Saves on transportation expenses and time off work.</p>
        <p><strong>Traditional Visits:</strong> Typically more expensive but may be necessary for complex conditions requiring hands-on assessment.</p>
        
        <h3>Patient Experience</h3>
        <p><strong>Telehealth:</strong> Convenient, reduces waiting times, and eliminates exposure to other potentially sick patients. May feel less personal for some.</p>
        <p><strong>Traditional Visits:</strong> Provides face-to-face interaction and may build stronger doctor-patient relationships. Involves waiting rooms and potential exposure to illnesses.</p>
        
        <h2>When to Choose Telehealth</h2>
        <ul>
          <li>For minor illnesses like colds, rashes, or allergies</li>
          <li>Mental health consultations</li>
          <li>Follow-up appointments</li>
          <li>Medication management</li>
          <li>When you have limited mobility or transportation</li>
          <li>During infectious disease outbreaks</li>
        </ul>
        
        <h2>When to Choose Traditional Visits</h2>
        <ul>
          <li>For emergency situations</li>
          <li>When physical examinations are necessary</li>
          <li>For complex diagnoses requiring multiple tests</li>
          <li>Procedures or treatments that must be done in person</li>
          <li>If you lack the technology for telehealth</li>
        </ul>
        
        <h2>The Future: A Hybrid Approach</h2>
        <p>The future of healthcare likely involves a balanced hybrid approach, where patients and providers choose the most appropriate format based on the specific healthcare need. This approach maximizes convenience while ensuring quality care.</p>
        
        <p>Ultimately, the choice between telehealth and traditional visits depends on your specific health concerns, personal preferences, and circumstances. Consult with your healthcare provider to determine the best approach for your situation.</p>
      `,
      tags: ["Telehealth", "Digital Health", "Healthcare Access", "Medical Technology", "Patient Care"],
      relatedArticles: [
        {
          slug: "boost-immunity-naturally",
          title: "10 Ways to Boost Your Immunity Naturally",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "proven-home-remedies-seasonal-flu",
          title: "5 Proven Home Remedies for Seasonal Flu",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "ayurvedic-herbs-modern-science",
          title: "Ayurvedic Herbs Through the Lens of Modern Science",
          image: "/placeholder.svg?height=150&width=300",
        },
      ],
    },
    "turmeric-anti-inflammatory-properties": {
      title: "The Science Behind Turmeric's Anti-inflammatory Properties",
      category: "Herbal Science",
      date: "April 10, 2025",
      author: "Dr. Ananya Patel",
      authorTitle: "Nutritional Biochemist",
      authorImage: "/placeholder.svg?height=100&width=100",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419204/tumeric_trstpj.webp",
      content: `
        <p class="lead">Turmeric has been used in traditional medicine for thousands of years, particularly in Ayurvedic practices. Modern science is now confirming what ancient healers knew: turmeric contains powerful compounds with significant anti-inflammatory effects.</p>
        
        <h2>The Active Compound: Curcumin</h2>
        <p>The primary active component in turmeric is curcumin, which gives the spice its distinctive yellow color. Curcumin is a polyphenol with powerful anti-inflammatory and antioxidant properties.</p>
        
        <h2>How Curcumin Reduces Inflammation</h2>
        
        <h3>Blocking Inflammatory Pathways</h3>
        <p>Research shows that curcumin blocks NF-kB, a molecule that travels into the nuclei of cells and triggers genes related to inflammation. NF-kB is believed to play a major role in many chronic diseases.</p>
        
        <h3>Neutralizing Free Radicals</h3>
        <p>Curcumin is a potent antioxidant that can neutralize free radicals due to its chemical structure. Additionally, it boosts the activity of the body's own antioxidant enzymes, providing a two-pronged approach to fighting oxidative damage.</p>
        
        <h3>Reducing Inflammatory Cytokines</h3>
        <p>Studies have shown that curcumin can reduce the levels of inflammatory cytokines in the body. These are molecules that promote inflammation and are associated with numerous inflammatory conditions.</p>
        
        <h2>Clinical Evidence</h2>
        <p>Multiple clinical trials have demonstrated curcumin's effectiveness in treating conditions characterized by inflammation:</p>
        
        <h3>Arthritis</h3>
        <p>Several studies have shown that curcumin can help reduce pain and improve function in people with osteoarthritis and rheumatoid arthritis, sometimes as effectively as anti-inflammatory drugs but with fewer side effects.</p>
        
        <h3>Inflammatory Bowel Disease</h3>
        <p>Research suggests that curcumin may help maintain remission in ulcerative colitis and reduce the common symptoms of irritable bowel syndrome.</p>
        
        <h3>Metabolic Syndrome</h3>
        <p>Curcumin may help reduce inflammation and oxidative stress associated with metabolic syndrome, potentially lowering the risk of heart disease.</p>
        
        <h2>Bioavailability Challenges</h2>
        <p>Despite its benefits, curcumin is poorly absorbed into the bloodstream. However, there are ways to enhance its bioavailability:</p>
        <ul>
          <li>Combining with black pepper, which contains piperine that enhances curcumin absorption by 2,000%</li>
          <li>Consuming with fats, as curcumin is fat-soluble</li>
          <li>Using liposomal curcumin or other enhanced formulations</li>
        </ul>
        
        <h2>Incorporating Turmeric Into Your Diet</h2>
        <p>Here are some practical ways to add more turmeric to your diet:</p>
        <ul>
          <li>Add to curries, soups, and stews</li>
          <li>Prepare golden milk (turmeric latte)</li>
          <li>Blend into smoothies</li>
          <li>Mix with honey for a healing paste</li>
          <li>Add to scrambled eggs or tofu</li>
        </ul>
        
        <h2>Precautions and Considerations</h2>
        <p>While turmeric is generally safe for most people, consider these precautions:</p>
        <ul>
          <li>Consult with a healthcare provider before taking high-dose supplements</li>
          <li>May interact with blood thinners, diabetes medications, and acid reducers</li>
          <li>Not recommended in high doses during pregnancy</li>
          <li>May cause digestive issues in some individuals</li>
        </ul>
        
        <p>As research continues, the ancient wisdom surrounding turmeric's healing properties is increasingly supported by scientific evidence, making it one of the most promising natural anti-inflammatory agents available.</p>
      `,
      tags: ["Turmeric", "Curcumin", "Anti-inflammatory", "Herbal Medicine", "Nutrition"],
      relatedArticles: [
        {
          slug: "anti-inflammatory-diet",
          title: "The Complete Guide to Anti-Inflammatory Diet",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "ayurvedic-herbs-modern-science",
          title: "Ayurvedic Herbs Through the Lens of Modern Science",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "natural-pain-management",
          title: "Natural Approaches to Pain Management",
          image: "/placeholder.svg?height=150&width=300",
        },
      ],
    },
    "mindfulness-techniques-anxiety-management": {
      title: "Mindfulness Techniques for Anxiety Management",
      category: "Mental Wellness",
      date: "April 5, 2025",
      author: "Dr. Vikram Singh",
      authorTitle: "Clinical Psychologist",
      authorImage: "/placeholder.svg?height=100&width=100",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419339/the-psychology-behind-negative-thoughts-551x431_b6elrd.jpg",
      content: `
        <p class="lead">In today's fast-paced world, anxiety has become increasingly common. Mindfulness—the practice of being fully present and engaged in the moment—offers effective techniques to manage anxiety and improve overall mental wellbeing.</p>
        
        <h2>Understanding Anxiety and Mindfulness</h2>
        <p>Anxiety often involves worrying about the future or ruminating on the past. Mindfulness counters this by anchoring awareness in the present moment, helping to break the cycle of anxious thoughts.</p>
        
        <h2>Evidence-Based Mindfulness Techniques</h2>
        
        <h3>1. Mindful Breathing</h3>
        <p>This fundamental technique involves focusing attention on your breath, noticing the sensation of air moving in and out of your body.</p>
        <p><strong>How to practice:</strong> Sit comfortably and focus on your breath for 5-10 minutes. When your mind wanders (which is normal), gently bring your attention back to your breathing without judgment.</p>
        
        <h3>2. Body Scan Meditation</h3>
        <p>This practice involves systematically focusing attention on different parts of your body, from your toes to the top of your head, observing sensations without judgment.</p>
        <p><strong>How to practice:</strong> Lie down in a comfortable position and spend 15-20 minutes mentally scanning your body, bringing awareness to each part and noticing any sensations, tension, or discomfort.</p>
        
        <h3>3. The 5-4-3-2-1 Grounding Technique</h3>
        <p>This technique helps bring you back to the present moment by engaging your five senses.</p>
        <p><strong>How to practice:</strong> Acknowledge 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</p>
        
        <h3>4. Mindful Walking</h3>
        <p>This involves bringing awareness to the experience of walking, focusing on the sensation of your feet touching the ground and the rhythm of your movement.</p>
        <p><strong>How to practice:</strong> Walk slowly and deliberately, paying attention to the lifting, moving, and placing of each foot. Notice the sensations in your feet and legs, and the feeling of your body moving through space.</p>
        
        <h3>5. Loving-Kindness Meditation</h3>
        <p>This practice involves directing positive wishes toward yourself and others, which can help reduce anxiety related to social concerns and self-criticism.</p>
        <p><strong>How to practice:</strong> Sit comfortably and repeat phrases like "May I be happy, may I be healthy, may I be safe, may I live with ease" silently to yourself. Then extend these wishes to others, from loved ones to all beings.</p>
        
        <h2>Incorporating Mindfulness Into Daily Life</h2>
        <p>Beyond formal meditation, you can practice mindfulness throughout your day:</p>
        <ul>
          <li>Mindful eating: Pay full attention to the experience of eating, savoring each bite</li>
          <li>Mindful listening: Give your complete attention when others are speaking</li>
          <li>Mindful observation: Take time to notice details in your environment</li>
          <li>Mindful pauses: Take brief moments throughout the day to check in with yourself</li>
          <li>Mindful technology use: Be intentional about when and how you use devices</li>
        </ul>
        
        <h2>The Science Behind Mindfulness for Anxiety</h2>
        <p>Research has shown that regular mindfulness practice can:</p>
        <ul>
          <li>Reduce activity in the amygdala, the brain's fear center</li>
          <li>Increase gray matter in areas associated with emotional regulation</li>
          <li>Lower cortisol levels, reducing physical stress responses</li>
          <li>Improve connectivity in brain networks related to attention and focus</li>
          <li>Enhance the body's relaxation response</li>
        </ul>
        
        <h2>Getting Started with Mindfulness</h2>
        <p>For beginners, these tips can help establish a sustainable practice:</p>
        <ul>
          <li>Start small: Even 5 minutes daily is beneficial</li>
          <li>Be consistent: Practice at the same time each day</li>
          <li>Use guided meditations: Apps and online resources can provide structure</li>
          <li>Join a group: Community support enhances motivation</li>
          <li>Be patient: Mindfulness is a skill that develops over time</li>
        </ul>
        
        <p>Remember that mindfulness is not about eliminating anxiety completely but developing a healthier relationship with anxious thoughts and feelings. With regular practice, you can create space between your thoughts and your reactions, allowing for more skillful responses to anxiety triggers.</p>
      `,
      tags: ["Mindfulness", "Anxiety", "Mental Health", "Meditation", "Stress Management"],
      relatedArticles: [
        {
          slug: "boost-immunity-naturally",
          title: "10 Ways to Boost Your Immunity Naturally",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "proven-home-remedies-seasonal-flu",
          title: "5 Proven Home Remedies for Seasonal Flu",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "ayurvedic-herbs-modern-science",
          title: "Ayurvedic Herbs Through the Lens of Modern Science",
          image: "/placeholder.svg?height=150&width=300",
        },
      ],
    },
    "future-of-personalized-medicine": {
      title: "The Future of Personalized Medicine",
      category: "Healthcare Technology",
      date: "April 1, 2025",
      author: "Dr. Sanjay Kumar",
      authorTitle: "Medical Futurist & Genomics Researcher",
      authorImage: "/placeholder.svg?height=100&width=100",
      image: "https://res.cloudinary.com/dnmjiwqso/image/upload/v1745419466/objective-health-precision-medicine-future-of-healthcare-personalized-healthcare-scaled_ehjgxz.jpg",
      content: `
        <p class="lead">Personalized medicine, also known as precision medicine, is revolutionizing healthcare by tailoring medical treatments to the individual characteristics of each patient. This approach is transforming how we prevent, diagnose, and treat diseases.</p>
        
        <h2>The Genomic Revolution</h2>
        <p>At the heart of personalized medicine is genomics—the study of an individual's genes. The cost of sequencing a human genome has dropped dramatically, from billions of dollars for the first human genome to under $1,000 today, making genetic testing increasingly accessible.</p>
        
        <h2>Key Components of Personalized Medicine</h2>
        
        <h3>Genetic Testing and Biomarkers</h3>
        <p>Genetic tests can identify mutations or variations that may increase susceptibility to certain diseases or affect how a person responds to medications. Biomarkers—measurable indicators of biological states—help predict disease risk, diagnose conditions, and monitor treatment responses.</p>
        
        <h3>AI and Machine Learning</h3>
        <p>Artificial intelligence algorithms can analyze vast amounts of health data to identify patterns and make predictions about disease risk and treatment outcomes. These technologies are becoming increasingly sophisticated at interpreting complex medical information.</p>
        
        <h3>Wearable Technology and Remote Monitoring</h3>
        <p>Wearable devices and remote monitoring tools collect real-time health data, allowing for continuous assessment of vital signs, activity levels, and other health metrics. This information helps healthcare providers make more informed decisions about patient care.</p>
        
        <h2>Applications of Personalized Medicine</h2>
        
        <h3>Pharmacogenomics: Tailored Drug Therapies</h3>
        <p>Pharmacogenomics studies how genes affect a person's response to drugs. This field helps determine which medications will be most effective and least likely to cause adverse reactions for individual patients, reducing trial-and-error prescribing.</p>
        
        <h3>Cancer Treatment</h3>
        <p>Oncology has been at the forefront of personalized medicine. Genetic profiling of tumors helps identify specific mutations driving cancer growth, allowing for targeted therapies that attack cancer cells while sparing healthy ones.</p>
        
        <h3>Preventive Medicine</h3>
        <p>Genetic risk assessments can identify predispositions to diseases like heart disease, diabetes, and certain cancers. This information enables proactive interventions—from lifestyle modifications to preventive medications—before disease onset.</p>
        
        <h2>Ethical and Practical Considerations</h2>
        
        <h3>Privacy and Data Security</h3>
        <p>The collection and storage of genetic and health data raise significant privacy concerns. Robust safeguards are essential to protect sensitive information from unauthorized access or misuse.</p>
        
        <h3>Health Disparities</h3>
        <p>There's a risk that personalized medicine could exacerbate existing healthcare disparities if advanced treatments are only available to privileged populations. Ensuring equitable access is a critical challenge.</p>
        
        <h3>Regulatory Frameworks</h3>
        <p>Regulatory agencies are adapting to evaluate and approve personalized medical approaches, which often don't fit traditional clinical trial models. New frameworks are needed to balance innovation with safety.</p>
        
        <h2>The Future Landscape</h2>
        
        <h3>Digital Twins</h3>
        <p>Virtual replicas of patients—incorporating genetic, physiological, and lifestyle data—may allow for simulation of different treatment approaches before implementation in the actual patient.</p>
        
        <h3>CRISPR and Gene Editing</h3>
        <p>Gene editing technologies like CRISPR-Cas9 hold promise for correcting genetic mutations responsible for inherited diseases, potentially offering cures for previously untreatable conditions.</p>
        
        <h3>Microbiome-Based Therapies</h3>
        <p>Growing understanding of the human microbiome—the collection of microorganisms living in and on the human body—is opening new avenues for personalized treatments based on an individual's unique microbial composition.</p>
        
        <p>As we move further into this new era of medicine, the integration of genetic insights, advanced technologies, and traditional medical knowledge promises to transform healthcare from a reactive, one-size-fits-all approach to a proactive, personalized system that optimizes health outcomes for each individual.</p>
      `,
      tags: ["Personalized Medicine", "Genomics", "Healthcare Technology", "Precision Medicine", "Medical Innovation"],
      relatedArticles: [
        {
          slug: "ai-healthcare-revolution",
          title: "How AI is Revolutionizing Healthcare Diagnostics",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "genetic-testing-ethical-considerations",
          title: "Ethical Considerations in Genetic Testing",
          image: "/placeholder.svg?height=150&width=300",
        },
        {
          slug: "future-of-telemedicine",
          title: "The Evolving Landscape of Telemedicine",
          image: "/placeholder.svg?height=150&width=300",
        },
      ],
    },
    "anti-inflammatory-diet": {
  title: "The Complete Guide to Anti-Inflammatory Diet",
  category: "Nutrition & Wellness",
  date: "April 23, 2025",
  author: "Dr. Kavita Rao",
  authorTitle: "Clinical Nutritionist",
  authorImage: "/placeholder.svg?height=100&width=100",
  image: "/blog/antiinflammatory.jpg",
  content: `
    <p class="lead">Chronic inflammation is a key contributor to many diseases, including heart disease, diabetes, and arthritis. An anti-inflammatory diet can help reduce inflammation and support long-term health.</p>

    <h2>What is an Anti-Inflammatory Diet?</h2>
    <p>This diet emphasizes whole, nutrient-dense foods that reduce inflammation while avoiding processed and pro-inflammatory ingredients like refined sugars and trans fats.</p>

    <h2>Top Anti-Inflammatory Foods</h2>
    <ul>
      <li>Fatty fish (salmon, sardines, mackerel)</li>
      <li>Leafy greens (spinach, kale, Swiss chard)</li>
      <li>Berries (blueberries, strawberries)</li>
      <li>Turmeric and ginger</li>
      <li>Olive oil and nuts</li>
    </ul>

    <h2>Foods to Avoid</h2>
    <ul>
      <li>Sugary drinks and snacks</li>
      <li>Red and processed meats</li>
      <li>Refined carbs (white bread, pasta)</li>
      <li>Excessive alcohol</li>
    </ul>

    <h2>Sample Daily Menu</h2>
    <p><strong>Breakfast:</strong> Oatmeal with berries and walnuts</p>
    <p><strong>Lunch:</strong> Grilled salmon salad with olive oil dressing</p>
    <p><strong>Dinner:</strong> Quinoa with steamed broccoli and turmeric-spiced tofu</p>

    <p>Adopting an anti-inflammatory diet can improve energy levels, reduce pain, and protect against chronic illness. Start small and gradually make healthier choices.</p>
  `,
  tags: ["Diet", "Inflammation", "Healthy Eating", "Wellness", "Nutrition"],
  relatedArticles: [
    {
      slug: "natural-pain-management",
      title: "Natural Approaches to Pain Management",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "ayurvedic-herbs-modern-science",
      title: "Ayurvedic Herbs Through the Lens of Modern Science",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "boost-immunity-naturally",
      title: "10 Ways to Boost Your Immunity Naturally",
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
},
"ayurvedic-herbs-modern-science": {
  title: "Ayurvedic Herbs Through the Lens of Modern Science",
  category: "Ayurveda & Research",
  date: "April 23, 2025",
  author: "Dr. Rajeev Patil",
  authorTitle: "Research Scientist in Herbal Medicine",
  authorImage: "/placeholder.svg?height=100&width=100",
  image: "/blog/modernayurveda.jpg",
  content: `
    <p class="lead">Ayurveda has long relied on herbs to support health and healing. Modern scientific studies are now validating many of these traditional practices.</p>

    <h2>1. Ashwagandha</h2>
    <p>Scientific studies show ashwagandha reduces stress, improves sleep, and enhances cognitive function by regulating cortisol levels.</p>

    <h2>2. Turmeric (Curcuma longa)</h2>
    <p>Curcumin, the active ingredient in turmeric, is supported by over 6,000 studies showing its anti-inflammatory and antioxidant effects.</p>

    <h2>3. Brahmi (Bacopa monnieri)</h2>
    <p>Used for memory and clarity, Brahmi has been shown in trials to improve learning and reduce anxiety.</p>

    <h2>4. Triphala</h2>
    <p>This blend of three fruits helps with digestion, detoxification, and gut health. Studies show it supports microbiome diversity.</p>

    <p>Modern science continues to explore the molecular mechanisms behind these herbs, bridging traditional knowledge with evidence-based medicine.</p>
  `,
  tags: ["Ayurveda", "Herbal Science", "Medicinal Plants", "Research", "Wellness"],
  relatedArticles: [
    {
      slug: "ayurvedic-herbs-cold-season",
      title: "Essential Ayurvedic Herbs for Cold Season",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "anti-inflammatory-diet",
      title: "The Complete Guide to Anti-Inflammatory Diet",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "understanding-viral-infections",
      title: "Understanding Viral Infections: A Comprehensive Guide",
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
},
"natural-pain-management": {
  title: "Natural Approaches to Pain Management",
  category: "Natural Therapies",
  date: "April 23, 2025",
  author: "Dr. Anita Menon",
  authorTitle: "Pain Specialist & Integrative Healer",
  authorImage: "/placeholder.svg?height=100&width=100",
  image: "/blog/naturalpain.jpg",
  content: `
    <p class="lead">Chronic pain affects millions, but nature provides a variety of safe and effective methods to manage discomfort without relying solely on pharmaceuticals.</p>

    <h2>1. Herbal Remedies</h2>
    <p>Willow bark, turmeric, ginger, and devil’s claw are known for their natural analgesic and anti-inflammatory effects.</p>

    <h2>2. Acupuncture</h2>
    <p>This ancient Chinese therapy involves inserting fine needles into specific points, stimulating nerves and endorphins for pain relief.</p>

    <h2>3. Yoga & Stretching</h2>
    <p>Regular gentle stretching can reduce muscle tension and improve flexibility, especially for back and joint pain.</p>

    <h2>4. Mind-Body Practices</h2>
    <p>Meditation, deep breathing, and mindfulness reduce the brain’s perception of pain and increase pain tolerance.</p>

    <h2>5. Heat and Cold Therapy</h2>
    <p>Alternating between ice packs and heat pads helps with inflammation, stiffness, and muscle spasms.</p>

    <p>These natural approaches, when practiced consistently, can improve quality of life and reduce dependence on painkillers.</p>
  `,
  tags: ["Pain Relief", "Holistic Health", "Natural Remedies", "Wellbeing", "Chronic Pain"],
  relatedArticles: [
    {
      slug: "anti-inflammatory-diet",
      title: "The Complete Guide to Anti-Inflammatory Diet",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "boost-immunity-naturally",
      title: "10 Ways to Boost Your Immunity Naturally",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      slug: "ayurvedic-herbs-modern-science",
      title: "Ayurvedic Herbs Through the Lens of Modern Science",
      image: "/placeholder.svg?height=150&width=300",
    },
  ],
},

  }

  return articles[slug] || null
}

export default function ArticlePage({ params }) {
  const router = useRouter()
  const article = getArticleData(params.slug)

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Button onClick={()=> router.back()}>
            <p>Return to Home</p>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button onClick={()=> router.back()} className=" hover:text-teal-700 inline-flex items-center text-sm font-medium">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8 animate-fade-in">
          <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-200 px-3 py-1">{article.category}</Badge>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center">
              <Tag className="mr-1 h-4 w-4" />
              <span>{article.category}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg mb-8 animate-fade-in">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-contain" />
        </div>

        {/* Article Content and Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-sm p-6 md:p-8 prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-800 prose-a:text-teal-600 hover:prose-a:text-teal-700 prose-img:rounded-lg animate-fade-in">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-slate-50 text-slate-700 hover:bg-slate-100">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author Bio */}
            <div className="mt-8 bg-slate-50 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-center sm:items-start animate-fade-in">
              <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0">
                <Image
                  src={article.authorImage || "/placeholder.svg"}
                  alt={article.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-800 text-lg">{article.author}</h3>
                <p className="text-slate-600 text-sm mb-2">{article.authorTitle}</p>
                <p className="text-slate-700">
                  An experienced healthcare professional specializing in {article.category.toLowerCase()}. Committed to
                  sharing evidence-based information to improve health outcomes.
                </p>
              </div>
            </div>

            {/* Social Sharing and Engagement */}
            <div className="mt-8 flex flex-wrap justify-between items-center">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-slate-700">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-700">
                  <Bookmark className="mr-1 h-4 w-4" />
                  Save
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="text-slate-700">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  Like
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-700">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  Comment
                </Button>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {article.relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/articles/${related.slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in"
                  >
                    <div className="relative h-40 w-full">
                      <Image
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-bold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Table of Contents */}
            <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {article.content.match(/<h2>(.*?)<\/h2>/g)?.map((match, index) => {
                  const title = match.replace(/<h2>(.*?)<\/h2>/, "$1")
                  const anchor = title.toLowerCase().replace(/\s+/g, "-")
                  return (
                    <a
                      key={index}
                      href={`#${anchor}`}
                      className="block py-1 px-2 text-slate-700 hover:bg-teal-50 hover:text-teal-700 rounded-md transition-colors"
                    >
                      {title}
                    </a>
                  )
                })}
              </nav>
            </div>

            {/* Popular Articles */}
            <div className="bg-white p-6 rounded-xl shadow-sm animate-fade-in">
              <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">Popular Articles</h3>
              <div className="space-y-4">
                <Link href="/blog/articles/proven-home-remedies-seasonal-flu" className="flex gap-3 group items-start">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Article thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2">
                      5 Proven Home Remedies for Seasonal Flu
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">April 18, 2025</p>
                  </div>
                </Link>
                <Link href="/blog/articles/telehealth-vs-traditional-visits" className="flex gap-3 group items-start">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Article thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Telehealth vs Traditional Visits: Which is Better?
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">April 15, 2025</p>
                  </div>
                </Link>
                <Link
                  href="/blog/articles/mindfulness-techniques-anxiety-management"
                  className="flex gap-3 group items-start"
                >
                  <div className="relative h-16 w-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt="Article thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-2">
                      Mindfulness Techniques for Anxiety Management
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">April 5, 2025</p>
                  </div>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
