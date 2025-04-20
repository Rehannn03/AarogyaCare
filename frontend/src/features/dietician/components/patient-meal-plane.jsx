import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function PatientMealPlan() {
  // Mock meal plan data
  const mealPlan = {
    monday: {
      breakfast: {
        meal: "Greek Yogurt with Berries",
        calories: 320,
        protein: "20g",
        carbs: "30g",
        fat: "12g",
        notes: "Use plain, non-fat Greek yogurt. Add 1 cup mixed berries and 1 tbsp honey.",
      },
      snack1: {
        meal: "Apple with Almond Butter",
        calories: 200,
        protein: "5g",
        carbs: "25g",
        fat: "10g",
        notes: "1 medium apple with 1 tbsp almond butter.",
      },
      lunch: {
        meal: "Grilled Chicken Salad",
        calories: 450,
        protein: "35g",
        carbs: "20g",
        fat: "25g",
        notes: "4oz grilled chicken breast, mixed greens, cherry tomatoes, cucumber, 1 tbsp olive oil dressing.",
      },
      snack2: {
        meal: "Protein Shake",
        calories: 180,
        protein: "25g",
        carbs: "10g",
        fat: "3g",
        notes: "1 scoop protein powder with water or almond milk.",
      },
      dinner: {
        meal: "Baked Salmon with Vegetables",
        calories: 520,
        protein: "40g",
        carbs: "25g",
        fat: "28g",
        notes: "5oz salmon fillet, 1 cup roasted Brussels sprouts, 1/2 cup quinoa.",
      },
    },
    // Other days would be defined similarly
  }

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  return (
    <Tabs defaultValue="monday" className="w-full">
      <TabsList className="grid grid-cols-7 mb-4">
        {days.map((day) => (
          <TabsTrigger key={day} value={day} className="text-xs md:text-sm">
            {day.charAt(0).toUpperCase() + day.slice(1, 3)}
          </TabsTrigger>
        ))}
      </TabsList>

      {days.map((day) => (
        <TabsContent key={day} value={day} className="space-y-4">
          {day === "monday" ? (
            <>
              <MealCard title="Breakfast" time="7:00 - 8:00 AM" meal={mealPlan.monday.breakfast} />
              <MealCard title="Morning Snack" time="10:00 - 10:30 AM" meal={mealPlan.monday.snack1} />
              <MealCard title="Lunch" time="12:30 - 1:30 PM" meal={mealPlan.monday.lunch} />
              <MealCard title="Afternoon Snack" time="3:30 - 4:00 PM" meal={mealPlan.monday.snack2} />
              <MealCard title="Dinner" time="6:30 - 7:30 PM" meal={mealPlan.monday.dinner} />
            </>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Meal plan for {day} not yet created</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}



function MealCard({ title, time, meal }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{time}</CardDescription>
          </div>
          <Badge>{meal.calories} cal</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-medium mb-2">{meal.meal}</h4>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="text-xs">
            <span className="text-muted-foreground">Protein:</span> {meal.protein}
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">Carbs:</span> {meal.carbs}
          </div>
          <div className="text-xs">
            <span className="text-muted-foreground">Fat:</span> {meal.fat}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">{meal.notes}</p>
      </CardContent>
    </Card>
  )
}

