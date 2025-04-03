import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, FileEdit, Apple, Heart, Wheat, Dumbbell } from "lucide-react"

// Mock data for diet plan templates
const templates = [
  {
    id: "1",
    name: "Weight Loss Plan",
    description: "Low-calorie, balanced nutrition plan for healthy weight loss",
    type: "Weight Management",
    meals: 5,
    duration: "12 weeks",
    icon: Apple,
  },
  {
    id: "2",
    name: "Diabetes Management",
    description: "Low glycemic index foods to help manage blood sugar levels",
    type: "Medical",
    meals: 6,
    duration: "Ongoing",
    icon: Heart,
  },
  {
    id: "3",
    name: "Gluten-Free Diet",
    description: "Complete meal plan free from gluten for celiac disease or sensitivity",
    type: "Allergy",
    meals: 5,
    duration: "Ongoing",
    icon: Wheat,
  },
  {
    id: "4",
    name: "Athletic Performance",
    description: "High protein, nutrient-dense plan for athletes and active individuals",
    type: "Sports",
    meals: 6,
    duration: "8 weeks",
    icon: Dumbbell,
  },
]

export function DietPlanTemplates() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {templates.map((template) => (
        <Card key={template.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <template.icon className="h-5 w-5 text-primary" />
                  {template.name}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </div>
              <Badge>{template.type}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Meals/Day:</span>
                <p>{template.meals}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <p>{template.duration}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Use Template
            </Button>
            <Button variant="ghost" size="icon">
              <FileEdit className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

