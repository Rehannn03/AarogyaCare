// Extract all unique categories from articles
export function getAllCategories() {
    const categories = [
      { name: "Home Remedies", slug: "home-remedies", description: "Natural solutions for common ailments using ingredients from your kitchen and garden." },
      { name: "Ayurveda & Herbal Remedies", slug: "ayurveda-herbal-remedies", description: "Traditional Indian medicine focusing on natural herbs and holistic healing approaches." },
      { name: "Health Education", slug: "health-education", description: "Educational resources on various health topics, preventive care, and medical literacy." },
      { name: "Immunity & Wellness", slug: "immunity-wellness", description: "Ways to strengthen your immune system and improve overall wellness naturally." },
      { name: "Telehealth", slug: "telehealth", description: "Insights into virtual healthcare services, digital health tools, and remote patient monitoring." },
      { name: "Herbal Science", slug: "herbal-science", description: "Scientific research on medicinal herbs, their properties, and applications in healthcare." },
      { name: "Mental Wellness", slug: "mental-wellness", description: "Strategies and practices to support mental health, reduce stress, and improve emotional wellbeing." },
      { name: "Healthcare Technology", slug: "healthcare-technology", description: "Innovations in medical technology, AI in healthcare, and digital health solutions." },
      { name: "Nutrition & Wellness", slug: "nutrition-wellness", description: "Evidence-based information on healthy eating, dietary patterns, and nutritional supplements." },
      { name: "Ayurveda & Research", slug: "ayurveda-research", description: "Scientific studies and research validating traditional Ayurvedic practices." },
      { name: "Natural Therapies", slug: "natural-therapies", description: "Alternative approaches to health and healing using natural methods and substances." }
    ];
    
    return categories;
  }
  
  // Get articles by category
  export function getArticlesByCategory(category, articles) {
    if (!category) return articles;
    
    return articles.filter(article => {
      // Handle compound categories (e.g., "Ayurveda & Herbal Remedies")
      const categoryWords = category.toLowerCase().split(/[&\s]+/);
      const articleCategoryLower = article.category.toLowerCase();
      
      // Check if any of the category words are in the article category
      return categoryWords.some(word => 
        word.length > 3 && articleCategoryLower.includes(word)
      );
    });
  }
  
  // Get category by slug
  export function getCategoryBySlug(slug) {
    const categories = getAllCategories();
    return categories.find(category => category.slug === slug);
  }
  
  // Count articles by category
  export function countArticlesByCategory(category, articles){
    return getArticlesByCategory(category, articles).length;
  }
  