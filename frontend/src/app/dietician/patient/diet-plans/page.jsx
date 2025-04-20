
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const dietPlan = {
  name: "Weight Management Plan",
  doctor: "Dr. Sarah Johnson",
  lastUpdated: "April 2, 2025",
  goal: "Gradual weight loss with balanced nutrition",
  dailyCalories: 2100,
  macros: {
    protein: 25,
    carbs: 45,
    fats: 30
  },
  meals: {
    breakfast: [
      { name: "Oatmeal with berries and nuts", calories: 320, protein: 12, carbs: 45, fat: 14 },
      { name: "Greek yogurt with honey and fruits", calories: 280, protein: 18, carbs: 32, fat: 10 },
      { name: "Whole grain toast with avocado and eggs", calories: 350, protein: 15, carbs: 28, fat: 18 }
    ],
    lunch: [
      { name: "Grilled chicken salad with olive oil dressing", calories: 420, protein: 35, carbs: 15, fat: 22 },
      { name: "Quinoa bowl with roasted vegetables and tofu", calories: 380, protein: 18, carbs: 50, fat: 12 }
    ],
    dinner: [
      { name: "Baked salmon with roasted vegetables", calories: 450, protein: 32, carbs: 20, fat: 25 },
      { name: "Lean beef stir fry with brown rice", calories: 480, protein: 30, carbs: 45, fat: 18 }
    ],
    snacks: [
      { name: "Greek yogurt", calories: 120, protein: 15, carbs: 8, fat: 0 },
      { name: "Apple with almond butter", calories: 180, protein: 5, carbs: 20, fat: 10 },
      { name: "Handful of mixed nuts", calories: 160, protein: 6, carbs: 7, fat: 14 }
    ]
  },
  recommendations: [
    "Drink at least 8 glasses of water daily",
    "Limit processed foods and added sugars",
    "Eat slowly and mindfully",
    "Include protein with each meal",
    "Aim for 30 minutes of moderate activity most days"
  ]
};

const DietPlan = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Diet Plan</h1>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{dietPlan.name}</CardTitle>
                <CardDescription>
                  Created by {dietPlan.doctor} • Last updated: {dietPlan.lastUpdated}
                </CardDescription>
              </div>
              <Badge className="bg-green-500">Active</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Goal</h3>
                <p>{dietPlan.goal}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Daily Calorie Target</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{dietPlan.dailyCalories} kcal</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Macronutrient Breakdown</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600">Protein</p>
                    <p className="text-xl font-bold">{dietPlan.macros.protein}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600">Carbs</p>
                    <p className="text-xl font-bold">{dietPlan.macros.carbs}%</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-sm text-amber-600">Fats</p>
                    <p className="text-xl font-bold">{dietPlan.macros.fats}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="breakfast">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="dinner">Dinner</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
          </TabsList>
          
          {Object.entries(dietPlan.meals).map(([mealType, options]) => (
            <TabsContent key={mealType} value={mealType} className="space-y-4">
              <h2 className="text-lg font-semibold capitalize">{mealType} Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((meal, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{meal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Calories</p>
                          <p className="font-medium">{meal.calories}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Protein</p>
                          <p className="font-medium">{meal.protein}g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Carbs</p>
                          <p className="font-medium">{meal.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Fat</p>
                          <p className="font-medium">{meal.fat}g</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {dietPlan.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="h-5 w-5 mt-0.5 text-green-500 flex-shrink-0">•</div>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            Like This Plan
          </Button>
          <Button className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Message My Dietician
          </Button>
        </div>
      </div>
    </>
  );
};

export default DietPlan;