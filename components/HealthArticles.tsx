"use client"

import { useState } from "react"
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from "react-native"
import { BookOpen, ChevronRight, Heart, Clock } from "lucide-react-native"
import ThemedView from "./ThemedView"
import ThemedText from "./ThemedText"
import useThemeColor from "../hooks/useThemeColor"

// Mock articles data
const MOCK_ARTICLES = [
  {
    id: 1,
    title: "Understanding Your Blood Pressure Medication",
    excerpt: "Learn about how blood pressure medications work and how to manage potential side effects.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    category: "Medication",
    readTime: "5 min read",
    date: "May 10, 2023",
    saved: false,
  },
  {
    id: 2,
    title: "The Importance of Medication Adherence",
    excerpt: "Discover why taking your medications as prescribed is crucial for managing chronic conditions.",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    category: "Health Tips",
    readTime: "4 min read",
    date: "April 28, 2023",
    saved: true,
  },
  {
    id: 3,
    title: "Managing Medication Side Effects",
    excerpt: "Practical tips for dealing with common medication side effects and when to talk to your doctor.",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2670&q=80",
    category: "Wellness",
    readTime: "6 min read",
    date: "April 15, 2023",
    saved: false,
  },
]

export default function HealthArticles() {
  const [articles, setArticles] = useState(MOCK_ARTICLES)
  const [selectedArticle, setSelectedArticle] = useState(null)

  const primaryColor = useThemeColor({ light: "#3b82f6", dark: "#60a5fa" }, "tint")
  const subtleColor = useThemeColor({ light: "#64748b", dark: "#94a3b8" }, "text")
  const cardBgColor = useThemeColor({ light: "#ffffff", dark: "#1f2937" }, "background")

  const handleArticlePress = (article) => {
    setSelectedArticle(article)
  }

  const handleBackToList = () => {
    setSelectedArticle(null)
  }

  const toggleSaveArticle = (articleId) => {
    setArticles(articles.map((article) => (article.id === articleId ? { ...article, saved: !article.saved } : article)))

    if (selectedArticle && selectedArticle.id === articleId) {
      setSelectedArticle({ ...selectedArticle, saved: !selectedArticle.saved })
    }
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: cardBgColor }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <BookOpen size={20} color={primaryColor} />
          <ThemedText style={styles.headerTitle}>Health Articles</ThemedText>
        </View>
        {selectedArticle && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
            <ThemedText style={[styles.backButtonText, { color: primaryColor }]}>Back to list</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {!selectedArticle ? (
        <ScrollView style={styles.articlesList} showsVerticalScrollIndicator={false}>
          {articles.map((article) => (
            <TouchableOpacity key={article.id} style={styles.articleItem} onPress={() => handleArticlePress(article)}>
              <Image source={{ uri: article.image }} style={styles.articleImage} />
              <View style={styles.articleContent}>
                <View style={styles.articleMeta}>
                  <View style={[styles.categoryTag, { backgroundColor: `${primaryColor}20` }]}>
                    <ThemedText style={[styles.categoryText, { color: primaryColor }]}>{article.category}</ThemedText>
                  </View>
                  <View style={styles.readTime}>
                    <Clock size={12} color={subtleColor} style={styles.readTimeIcon} />
                    <ThemedText style={styles.readTimeText} lightColor="#64748b" darkColor="#94a3b8">
                      {article.readTime}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.articleTitle}>{article.title}</ThemedText>
                <ThemedText style={styles.articleExcerpt} lightColor="#64748b" darkColor="#94a3b8" numberOfLines={2}>
                  {article.excerpt}
                </ThemedText>
                <View style={styles.articleFooter}>
                  <ThemedText style={styles.articleDate} lightColor="#64748b" darkColor="#94a3b8">
                    {article.date}
                  </ThemedText>
                  <TouchableOpacity onPress={() => toggleSaveArticle(article.id)}>
                    <Heart
                      size={16}
                      color={article.saved ? "#ef4444" : subtleColor}
                      fill={article.saved ? "#ef4444" : "none"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.articleDetail} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: selectedArticle.image }} style={styles.detailImage} />
          <View style={styles.detailContent}>
            <View style={styles.detailMeta}>
              <View style={[styles.categoryTag, { backgroundColor: `${primaryColor}20` }]}>
                <ThemedText style={[styles.categoryText, { color: primaryColor }]}>
                  {selectedArticle.category}
                </ThemedText>
              </View>
              <View style={styles.readTime}>
                <Clock size={12} color={subtleColor} style={styles.readTimeIcon} />
                <ThemedText style={styles.readTimeText} lightColor="#64748b" darkColor="#94a3b8">
                  {selectedArticle.readTime}
                </ThemedText>
              </View>
            </View>
            <ThemedText style={styles.detailTitle}>{selectedArticle.title}</ThemedText>
            <ThemedText style={styles.detailDate} lightColor="#64748b" darkColor="#94a3b8">
              {selectedArticle.date}
            </ThemedText>

            <View style={styles.detailActions}>
              <TouchableOpacity
                style={[styles.saveButton, { borderColor: selectedArticle.saved ? "#ef4444" : subtleColor }]}
                onPress={() => toggleSaveArticle(selectedArticle.id)}
              >
                <Heart
                  size={16}
                  color={selectedArticle.saved ? "#ef4444" : subtleColor}
                  fill={selectedArticle.saved ? "#ef4444" : "none"}
                  style={styles.saveButtonIcon}
                />
                <ThemedText style={[styles.saveButtonText, { color: selectedArticle.saved ? "#ef4444" : subtleColor }]}>
                  {selectedArticle.saved ? "Saved" : "Save"}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.shareButton, { backgroundColor: `${primaryColor}20` }]}
                onPress={() => alert("This would share the article in a real app")}
              >
                <ThemedText style={[styles.shareButtonText, { color: primaryColor }]}>Share</ThemedText>
              </TouchableOpacity>
            </View>

            <ThemedText style={styles.articleBody} lightColor="#334155" darkColor="#cbd5e1">
              {selectedArticle.excerpt}
              {"\n\n"}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl
              nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              {"\n\n"}
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
              {"\n\n"}• Take medications as prescribed
              {"\n"}• Monitor for side effects
              {"\n"}• Keep a medication log
              {"\n"}• Talk to your doctor about concerns
              {"\n\n"}
              Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
              euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
            </ThemedText>

            <View style={styles.relatedArticles}>
              <ThemedText style={styles.relatedTitle}>Related Articles</ThemedText>
              {articles
                .filter((article) => article.id !== selectedArticle.id)
                .slice(0, 2)
                .map((article) => (
                  <TouchableOpacity
                    key={article.id}
                    style={styles.relatedItem}
                    onPress={() => handleArticlePress(article)}
                  >
                    <ThemedText style={styles.relatedItemText}>{article.title}</ThemedText>
                    <ChevronRight size={16} color={subtleColor} />
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  backButton: {
    paddingVertical: 4,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  articlesList: {
    maxHeight: 500,
  },
  articleItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
    paddingBottom: 20,
  },
  articleImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  articleContent: {},
  articleMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryTag: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },
  readTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  readTimeIcon: {
    marginRight: 4,
  },
  readTimeText: {
    fontSize: 12,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  articleExcerpt: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  articleFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  articleDate: {
    fontSize: 12,
  },
  articleDetail: {
    maxHeight: 500,
  },
  detailImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailContent: {},
  detailMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  detailDate: {
    fontSize: 12,
    marginBottom: 16,
  },
  detailActions: {
    flexDirection: "row",
    marginBottom: 20,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
  saveButtonIcon: {
    marginRight: 6,
  },
  saveButtonText: {
    fontSize: 14,
  },
  shareButton: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  shareButtonText: {
    fontSize: 14,
  },
  articleBody: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  relatedArticles: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
    paddingTop: 16,
  },
  relatedTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  relatedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  relatedItemText: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
})
